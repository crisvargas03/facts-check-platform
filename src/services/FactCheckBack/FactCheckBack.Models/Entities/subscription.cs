using System;
using System.Collections.Generic;

namespace FactCheckBack.Models.Entities;

public partial class subscription
{
    public long id { get; set; }

    public Guid subscription_id { get; set; }

    public string claims { get; set; } = null!;

    public DateTime created_at { get; set; }
}
