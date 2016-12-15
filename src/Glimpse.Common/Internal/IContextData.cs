namespace Glimpse.Internal
{
    public interface IContextData<T>
    {
        T Value { get; set; }
    }
}