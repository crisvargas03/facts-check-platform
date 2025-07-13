using System;
using System.Collections.Generic;

namespace FactCheckBack.Models.Entities;

public partial class Result
{
    public string result_id { get; set; } = null!;

    public string article_id { get; set; } = null!;

    public string verdict_id { get; set; } = null!;

    public DateTime created { get; set; }

    public decimal percentaje_trust { get; set; }

    public string motive { get; set; } = null!;
}
