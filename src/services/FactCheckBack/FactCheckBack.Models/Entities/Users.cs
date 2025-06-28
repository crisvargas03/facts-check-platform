using System;
using System.Collections.Generic;

namespace FactCheckBack.Models.Entities;

public partial class Users
{
    public string user_id { get; set; } = null!;

    public string name { get; set; } = null!;

    public string email { get; set; } = null!;

    public DateTime created { get; set; }

    public string user_type_id { get; set; } = null!;

    public string password { get; set; } = null!;

    public virtual ICollection<Article_input> Article_inputs { get; set; } = new List<Article_input>();

    public virtual User_plan? User_plan { get; set; }

    public virtual User_Type user_type { get; set; } = null!;
}
