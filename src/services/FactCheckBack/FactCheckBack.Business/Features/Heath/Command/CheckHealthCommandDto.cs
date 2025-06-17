namespace FactCheckBack.Business.Features.Heath.Command;

public class CheckHealthCommandDto
{
    public string Status { get; set; } = string.Empty;
    public bool DatabaseConnected { get; set; }
    public TimeSpan ResponseTime { get; set; }
    public DateTime ServerTimeUtc { get; set; }
}