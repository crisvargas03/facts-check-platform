using LiteBus.Commands.Abstractions;
using FactCheckBack.Models.Configurations;

namespace FactCheckBack.Business.Features.Heath.Command;

public class CheckHealthCommand : ICommand<ApiResponse<CheckHealthCommandDto>>
{
}