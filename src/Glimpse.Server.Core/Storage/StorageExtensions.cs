namespace Glimpse.Server.Storage
{
    public static class StorageExtensions
    {
        public static T As<T>(this IStorage storage) where T : class
        {
            return storage as T;
        }

        public static bool Supports<T>(this IStorage storage) where T : class
        {
            return storage.As<T>() != null;
        }
    }
}