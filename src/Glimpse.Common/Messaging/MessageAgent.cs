namespace Glimpse
{
    public class MessageAgent
    {
        public readonly static MessageAgent Default = new MessageAgent();

        public string Soruce { get { return "server"; } }
    }
}
