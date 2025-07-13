using System;
using System.Collections.Generic;

namespace FactCheckBack.Models.Entities;

public partial class Plan
{
    public string plans_id { get; set; } = null!;

    public string price { get; set; } = null!;

    public string plan_type_id { get; set; } = null!;

    public int max_attempts { get; set; }

    public string period_type { get; set; } = null!;

    public int duration { get; set; }

    public virtual ICollection<User_plan> User_plans { get; set; } = new List<User_plan>();
    public virtual ICollection<Plan_Options> Plan_Options { get; set; } = new List<Plan_Options>();

    public virtual Plan_type plan_type { get; set; } = null!;
}
