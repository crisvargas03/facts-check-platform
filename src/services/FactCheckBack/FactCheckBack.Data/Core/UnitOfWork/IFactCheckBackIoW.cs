using FactCheckBack.Data.Core.Interfaces;

namespace FactCheckBack.Data.Core.UnitOfWork
{
    public interface IFactCheckBackIoW
    {
        IUserRepository Users { get; }
        IUserPlanRepository User_plan { get; }
        IPlanRepository Plan { get; }
        IArticleInputRepository ArticleInput { get; }
        IResultRepository Result { get; }

        Task<int> CompleteAsync();
        Task<bool> CanConnectAsync();
        Task<bool> ExecuteHealthCheckCommandAsync();
        void Dispose();
    }
}
