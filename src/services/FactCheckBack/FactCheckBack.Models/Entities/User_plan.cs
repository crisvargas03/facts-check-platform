using System;
using System.Collections.Generic;

namespace FactCheckBack.Models.Entities;

public partial class User_plan
{
    public string user_id { get; set; } = null!;

    public string plans_id { get; set; } = null!;

    public DateTime start_date_agreement_ { get; set; }

    public DateTime end_date_agreement_ { get; set; }

    public int attempts_used { get; set; }

    public virtual Plan plans { get; set; } = null!;

    public virtual Users users { get; set; } = null!;
}
