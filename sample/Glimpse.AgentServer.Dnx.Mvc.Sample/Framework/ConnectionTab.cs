using Microsoft.AspNet.Http;
using Glimpse.Agent;

namespace Glimpse.AgentServer.Dnx.Mvc.Sample.Framework
{
    public class ConnectionTab : Tab
    {
        public override string Name => "Connection";

        public override object GetData(HttpContext context)
        {
            var connection = context.Connection;
            return new
            {
                ClientCertificate = connection.ClientCertificate?.ToString(),
                connection.IsLocal,
                LocalIpAddress = connection.LocalIpAddress.ToString(),
                connection.LocalPort,
                RemoteIpAddress = connection.RemoteIpAddress.ToString(),
                connection.RemotePort
            };
        }

        public override TabExecute TabExecuteWhen => TabExecute.BeforeResponse;
    }
}
