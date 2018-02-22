using System;
using System.Collections.Generic;

namespace Glimpse.Agent.Messages
{
    public class BeforeActionResultMessage
    {
        public string ActionId { get; set; }

        public string ActionDisplayName { get; set; }

        public string ActionName { get; set; }

        public string ActionControllerName { get; set; }

        public DateTime ActionResultStartTime { get; set; }
    }

    public class BeforeActionViewResultMessage : BeforeActionResultMessage
    {
        public int? StatusCode { get; set; }

        public string ViewName { get; set; }

        public string ContentType { get; set; }
    }

    public class BeforeActionContentResultMessage : BeforeActionResultMessage
    {
        public int? StatusCode { get; set; }

        // TODO: need make sure that these are serializable 
        public string Content { get; set; }

        public string ContentType { get; set; }
    }

    public class BeforeActionObjectResultMessage : BeforeActionResultMessage
    {
        public int? StatusCode { get; set; }

        // TODO: need make sure that these are serializable 
        public object Value { get; set; }

        public IEnumerable<Type> Formatters { get; set; }

        public IEnumerable<string> ContentTypes { get; set; }

        public Type DeclaredType { get; set; }
    }

    public class BeforeActionFileResultMessage : BeforeActionResultMessage
    {
        public string FileDownloadName { get; set; }

        public string ContentType { get; set; }
    }
}