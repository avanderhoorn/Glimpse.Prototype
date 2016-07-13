namespace Glimpse.Agent.Inspectors
{
    public interface IInspectorFunction
    {
        void Configure(IInspectorFunctionBuilder inspectorBuilder);
    }
}