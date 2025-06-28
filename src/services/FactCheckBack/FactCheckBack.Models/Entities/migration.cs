using System;
using System.Collections.Generic;

namespace FactCheckBack.Models.Entities;

public partial class migration
{
    public int id { get; set; }

    public string name { get; set; } = null!;

    public string hash { get; set; } = null!;

    public DateTime? executed_at { get; set; }
}
