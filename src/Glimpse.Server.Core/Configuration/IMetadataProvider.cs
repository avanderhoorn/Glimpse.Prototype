namespace Glimpse.Server.Configuration
{
    public interface IMetadataProvider
    {
        Metadata BuildInstance();
    }
}