using System;
using Newtonsoft.Json;

namespace Glimpse.Server.Resources
{
    public class InvalidJsonProblemResponse : ExceptionProblemResponse
    {
        public InvalidJsonProblemResponse(JsonReaderException exception) : base(exception)
        {
            Extensions["LineNumber"] = exception.LineNumber;
            Extensions["LinePosition"] = exception.LinePosition;
        }

        public override Uri Type => new Uri("http://getglimpse.com/Docs/Troubleshooting/InvalidJson");

        public override string Title => "Invalid Json";
    }
}
