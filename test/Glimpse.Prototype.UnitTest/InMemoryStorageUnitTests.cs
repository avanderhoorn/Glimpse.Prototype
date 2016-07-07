using Glimpse.Server.Storage;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Glimpse.FunctionalTest
{
    public class InMemoryStorageUnitTests
    {
        private static int messageCount = 0;
        private string testUrl = "http://testurl.com:1234";

        [Fact]
        public void TestAddMessage()
        {
            var storage = new InMemoryStorage();
            var context1 = new MessageContext() { Id = Guid.NewGuid(), Type = "request" };
            var context2 = new MessageContext() { Id = Guid.NewGuid(), Type = "request" };

            storage.Persist(CreateBeginRequestMessage(context1));
            storage.Persist(CreateBeginRequestMessage(context2));
            storage.Persist(CreateEndRequestMessage(context2));
            storage.Persist(CreateEndRequestMessage(context1));

            Guid[] idsToCheck = { context1.Id, context2.Id };

            foreach (Guid requestId in idsToCheck)
            {
                var messages = storage.GetMessagesByRequestId(requestId);
                Assert.Equal(2, messages.Count());
                foreach (IMessage m in messages)
                {
                    Assert.Equal(requestId, m.Context.Id);
                }
            }

            // TODO - test store's other query mechanisms
        }

        [Fact]
        public async Task TestMessageCleanup()
        {
            int maxRequests = 500;
            int numThreads = 25;
            int totalRequests = 1000;
            int requestsPerThread = totalRequests / numThreads;

            var storage = new InMemoryStorage(maxRequests);
            var tasks = new List<Task>();
            var requestGuids = new List<Guid>();

            for (int i = 0; i < numThreads; i++)
            {
                var task = Task.Factory.StartNew(() =>
                {
                    for (int j = 0; j < requestsPerThread; j++)
                    {
                        MessageContext context = new MessageContext() { Id = Guid.NewGuid(), Type = "request" };
                        storage.Persist(CreateBeginRequestMessage(context));
                        storage.Persist(CreateEndRequestMessage(context));
                        lock (requestGuids)
                        {
                            requestGuids.Add(context.Id);
                        }
                    }
                });

                tasks.Add(task);
            }


            await Task.WhenAll(tasks).ContinueWith((task) =>
            {
                Assert.InRange(storage.GetRequestCount(), maxRequests - (maxRequests / 10), maxRequests + 1);

                Assert.Equal(totalRequests, requestGuids.Count());

                foreach (Guid g in requestGuids)
                {
                    Assert.Equal(true, storage.GetMessagesByRequestId(g).Count() == 0 || storage.GetMessagesByRequestId(g).Count() == 2);
                }

                Assert.Equal(true, storage.CheckConsistency());
            });
        }
        
        /// <summary>
        /// This test simulates simultaneous readers & writers of the same request.  It repros some specific exceptions
        /// that occur when RequestInfo's Messages list is updated when calling GetMessagesByRequestId(...)
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task TestMessageStoreSynchronization()
        {
            int numWriteThreads = 5;
            int numReadThreads = 5;

            var storage = new InMemoryStorage();
            var tasks = new List<Task>();
            var exceptions = new SimpleSyncrhonizedList<Exception>();

            MessageContext context = new MessageContext() { Id = Guid.NewGuid(), Type = "request" };

            for (int i = 0; i < numWriteThreads; i++)
            {
                var task = Task.Factory.StartNew(() =>
                {
                    Thread.Sleep(1000);
                    for (int j = 0; j < 1000 && exceptions.Count == 0; j++)
                    {
                        try
                        {
                            storage.Persist(CreateBeginRequestMessage(context));
                            storage.Persist(CreateEndRequestMessage(context));
                        }
                        catch (Exception e)
                        {
                            exceptions.SyncAdd(e);
                        }
                    }
                });
                tasks.Add(task);
            }

            for (int i = 0; i < numReadThreads; i++)
            {
                var task = Task.Factory.StartNew(() =>
                {
                    Thread.Sleep(1000);
                    for (int j = 0; j < 10000 && exceptions.Count == 0; j++)
                    {
                        try
                        {
                            // this seems to trigger an exception on the ToArray() call if the underlying messages array for the request
                            // is modified. 
                            IEnumerable<string> payloads = storage.GetMessagesByRequestId(context.Id).Select(m => m.Payload).ToArray();

                            foreach (string s in payloads)
                            {
                                // no-op, we just want something that's going to iterate through the payloads.  Assuming this won't get opimized away.
                            }
                        }
                        catch (Exception e)
                        {
                            exceptions.SyncAdd(e);
                        }
                    }
                });
                tasks.Add(task);
            }


            await Task.WhenAll(tasks).ContinueWith((task) =>
                {
                    Assert.Equal(storage.GetRequestCount(), 1);

                    Assert.Equal(true, storage.CheckConsistency());

                    Assert.Equal(0, exceptions.Count);
                });
        }


        private IMessage CreateMessage(MessageContext context, Dictionary<string, string> data, string[] types, IReadOnlyDictionary<string, object> indices)
        {
            var message = new Message();
            message.Id = Guid.NewGuid();
            message.Ordinal = messageCount++;
            message.Context = context;
            message.Types = types;
            message.Indices = indices;

            var payload = new Dictionary<string, object>()
               {
                    {"id", message.Id },
                    { "payload", data},
                    {"ordinal", message.Ordinal},
                    {"context", message.Context},
                    {"types", message.Types}
               };

            message.Payload = JsonConvert.SerializeObject(payload);

            return message;
        }

        public IMessage CreateBeginRequestMessage(MessageContext context)
        {
            var data = new Dictionary<string, string>()
            {
                { "url", testUrl }
            };

            string[] types = new string[] { "begin-request-message" };

            var indices = new Dictionary<string, object>()
            {
                { "request-url", testUrl }
            };

            return CreateMessage(context, data, types, indices);

        }

        public IMessage CreateEndRequestMessage(MessageContext context)
        {
            var startTime = DateTime.Parse("5/4/2014 14:57:00");
            var endTime = DateTime.Parse("5/4/2014 14:54:01");
            var duration = (long)(endTime - startTime).TotalMilliseconds;
            var data = new Dictionary<string, string>
            {
                {"duration", "" +  duration},
                {"startTime", startTime.ToString() },
                {"endTime", endTime.ToString() },
                {"url", testUrl },
                {"method", "GET" },
                {"contentType","text/html; charset=utf-8" },
                {"statusCode", "200"}
            };

            var indices = new Dictionary<string, object>()
            {
                { "request-duration", duration },
                { "request-datetime", startTime.ToString()},
                { "request-url", testUrl},
                { "request-method", "GET" },
                { "request-content-type", "text/html; charset=utf-8"},
                { "request-status-code", "200" }
            };

            var types = new string[] { "end-request-message" };

            return CreateMessage(context, data, types, indices);
        }
        
        /// <summary>
        /// For some reason, SynchonizedCollection isn't available (.net version this project is targeting?). This is a quick & dirty alternative. 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        public class SimpleSyncrhonizedList<T> : List<T>
        {
            private object syncLock = new object();
            public void SyncAdd(T t)
            {
                lock (syncLock)
                {
                    this.Add(t);
                }
            }
        }
    }
}