namespace FactCheckBack.Data.Core.UnitOfWork
{
    public interface IFactCheckBackIoW
    {
        Task<int> CompleteAsync();
        Task<bool> CanConnectAsync();
        Task<bool> ExecuteHealthCheckCommandAsync();
        void Dispose();
    }
}
