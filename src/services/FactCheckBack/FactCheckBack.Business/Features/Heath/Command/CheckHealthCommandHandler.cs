using System.Diagnostics;
using LiteBus.Commands.Abstractions;
using FactCheckBack.Data.Core.UnitOfWork;
using FactCheckBack.Models.Configurations;

namespace FactCheckBack.Business.Features.Heath.Command;

public class CheckHealthCommandHandler : ICommandHandler<CheckHealthCommand, ApiResponse<CheckHealthCommandDto>>
{
    private readonly IFactCheckBackIoW _unitOfWork;

    public CheckHealthCommandHandler(IFactCheckBackIoW unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<ApiResponse<CheckHealthCommandDto>> HandleAsync(CheckHealthCommand message, CancellationToken cancellationToken = new CancellationToken())
    {
        var stopwatch = Stopwatch.StartNew();
        var response = new CheckHealthCommandDto
        {
            ServerTimeUtc = DateTime.UtcNow,
        };
        try
        {
            var canConnect = await _unitOfWork.CanConnectAsync();
            var isSuccess = await _unitOfWork.ExecuteHealthCheckCommandAsync();
            response.Status = (canConnect && isSuccess) ? "Up" : "Down";
            response.ResponseTime = stopwatch.Elapsed;
            
            return ApiResponse<CheckHealthCommandDto>.Success(response);
        }
        catch (Exception e)
        {
            response.Status = "Down";
            response.DatabaseConnected = false;
            response.ResponseTime = stopwatch.Elapsed;
            return ApiResponse<CheckHealthCommandDto>.Fail(e.Message, data: response);
        }
    }
}