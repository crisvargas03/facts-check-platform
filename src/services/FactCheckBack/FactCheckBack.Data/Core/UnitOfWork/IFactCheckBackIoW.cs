using FactCheckBack.Data.Core.Interfaces;

namespace FactCheckBack.Data.Core.UnitOfWork
{
    public interface IFactCheckBackIoW
    {
        IUserRepository Users { get; }

        Task<int> CompleteAsync();
        Task<bool> CanConnectAsync();
        Task<bool> ExecuteHealthCheckCommandAsync();
        void Dispose();
    }
}
