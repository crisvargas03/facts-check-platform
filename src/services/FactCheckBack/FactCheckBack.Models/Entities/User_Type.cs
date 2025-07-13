using System;
using System.Collections.Generic;

namespace FactCheckBack.Models.Entities;

public partial class User_Type
{
    public string user_type_id { get; set; } = null!;

    public string desc_text { get; set; } = null!;

    public virtual ICollection<Users> User1s { get; set; } = new List<Users>();
}
