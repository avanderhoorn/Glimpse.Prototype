using System;
using Glimpse.Agent.AspNet.Messages;
using Glimpse.Agent.Inspectors;
using Microsoft.AspNet.Http;
using Microsoft.Extensions.DependencyInjection;

namespace Glimpse.Agent
{
    public abstract class Tab : Inspector
    {
        public override void Before(HttpContext context)
        {
            if (TabExecuteWhen == TabExecute.BeforeResponse)
                Publish(context);
        }

        public override void After(HttpContext context)
        {
            if (TabExecuteWhen == TabExecute.AfterResponse)
                Publish(context);
        }

        private void Publish(HttpContext context)
        {
            object data = null;
            try
            {
                data = GetData(context);
            }
            catch (Exception exception)
            {
                data = exception;
            }
            
            var broker = context.RequestServices.GetService<IAgentBroker>();

            broker.SendMessage(new TabMessage(Name, data));
        }

        public virtual TabExecute TabExecuteWhen => TabExecute.AfterResponse;

        public abstract string Name { get; }
        
        public abstract object GetData(HttpContext context);
    }
}