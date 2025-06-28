using System;
using System.Collections.Generic;

namespace FactCheckBack.Models.Entities;

public partial class one_time_token
{
    public Guid id { get; set; }

    public Guid user_id { get; set; }

    public string token_hash { get; set; } = null!;

    public string relates_to { get; set; } = null!;

    public DateTime created_at { get; set; }

    public DateTime updated_at { get; set; }

    public virtual user user { get; set; } = null!;
}
