using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Concurrency;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using System.Threading;
using System.Threading.Tasks;
using Glimpse.Server.Internal.Extensions;
using Glimpse.Server.Resources;
using Microsoft.AspNetCore.Http.Features;

namespace Glimpse.Server.Internal.Resources
{
    public class MessageStreamResource : IResourceStartup
    {
        private readonly IServerBroker _serverBroker;
        private readonly ISubject<Container> _senderSubject;
        private readonly SemaphoreSlim _syncLock = new SemaphoreSlim(1);

        public MessageStreamResource(IServerBroker serverBroker)
        {
            _serverBroker = serverBroker;

            _senderSubject = new Subject<Container>();

            // setup heart beat to keep alive client connections
            Observable.Interval(new TimeSpan(0, 0, 20), TaskPoolScheduler.Default).Subscribe(x => _senderSubject.OnNext(Container.Ping()));
            
            // TODO: See if we can get Defered working there
            // lets subscribe, hope of the thread and then broadcast to all connections
            //_serverBroker.OffRecieverThread.ListenAll().Subscribe(message => Observable.Defer(() => Observable.Start(() => ProcessMessage(message), TaskPoolScheduler.Default)));
            _serverBroker.OffRecieverThread.ListenAll().Subscribe(message => Observable.Start(() => ProcessMessage(message), TaskPoolScheduler.Default));
        }

        public void Configure(IResourceBuilder resourceBuilder)
        {
            resourceBuilder.Run("message-stream", "{?types,contextId}", ResourceType.Client, async (context, parameters) =>
            {
                var continueTask = new TaskCompletionSource<bool>();

                // Disable request compression
                var buffering = context.Features.Get<IHttpBufferingFeature>();
                if (buffering != null)
                {
                    buffering.DisableRequestBuffering();
                }

                var types = parameters.ParseEnumerable("types").ToArray();
                var contextId = parameters.ParseGuid("contextId");
                var filter = GetStreamFilter(types, contextId);

                var sse = await context.RespondWith(new ServerSentEventResponse());
                await sse.SetRetry(TimeSpan.FromSeconds(5));

                var unSubscribe = (IDisposable)null;
                unSubscribe = _senderSubject.Where(c =>  c.Event == "ping" || filter(c)).Subscribe(async t =>
                {
                    await _syncLock.WaitAsync();

                    try
                    {
                        try
                        {
                            await sse.SendData(data: $"[{t.Data}]", @event: t.Event);
                        }
                        catch (Exception)
                        {
                            continueTask.TrySetResult(true);
                            unSubscribe?.Dispose();  // TODO: Need to review this
                        }
                    }
                    finally 
                    {
                        _syncLock.Release();
                    }
                });

                context.RequestAborted.Register(() =>
                {
                    continueTask.SetResult(true);
                    unSubscribe.Dispose();
                });

                await continueTask.Task;
            });
        }

        private static Func<Container, bool> GetStreamFilter(string[] types, Guid? contextId)
        {
            Func<Container, bool> filter = c => true;
            // Filter when types are present
            if (types.Length > 0)
                filter = c => c.Types.Intersect(types).Any();

            if (contextId.HasValue)
                filter = c => c.ContextId == contextId;

            if (types.Length > 0 && contextId.HasValue)
                filter = c => c.Types.Intersect(types).Any() && c.ContextId == contextId;
            return filter;
        }

        public ResourceType Type => ResourceType.Client;

        private void ProcessMessage(IMessage message)
        {
            _senderSubject.OnNext(Container.Message(message.Types, message.Payload, message.Context.Id));
        }

        private class Container
        {
            private Container(string @event, IEnumerable<string> types, string data, Guid? contextId)
            {
                Event = @event;
                Data = data;
                Types = types;
                ContextId = contextId;
            }

            public static Container Ping()
            {
                return new Container("ping", Enumerable.Empty<string>(), "", null);
            }

            public static Container Message(IEnumerable<string> types, string data, Guid contextId)
            {
                return new Container("message", types, data, contextId);
            }

            public string Data { get; }

            public IEnumerable<string> Types { get; }

            public string Event { get; }

            public Guid? ContextId { get; }
        }
    }
}
