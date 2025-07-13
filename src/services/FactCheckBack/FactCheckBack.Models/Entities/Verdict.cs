using System;
using System.Collections.Generic;

namespace FactCheckBack.Models.Entities;

public partial class Verdict
{
    public string verdict_id { get; set; } = null!;

    public string desc_text { get; set; } = null!;
}
