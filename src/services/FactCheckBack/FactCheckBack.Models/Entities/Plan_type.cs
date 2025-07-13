using System;
using System.Collections.Generic;

namespace FactCheckBack.Models.Entities;

public partial class Plan_type
{
    public string plan_type_id { get; set; } = null!;

    public string desc_text { get; set; } = null!;

    public virtual ICollection<Plan> Plans { get; set; } = new List<Plan>();
}
