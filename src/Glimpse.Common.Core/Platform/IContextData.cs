namespace Glimpse.Platform
{
    public interface IContextData<T>
    {
        T Value { get; set; }
    }
}