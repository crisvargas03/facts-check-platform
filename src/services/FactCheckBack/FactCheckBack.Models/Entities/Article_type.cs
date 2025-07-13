using System;
using System.Collections.Generic;

namespace FactCheckBack.Models.Entities;

public partial class Article_type
{
    public string article_type_id { get; set; } = null!;

    public string desc_text { get; set; } = null!;

    public virtual ICollection<Article_input> Article_inputs { get; set; } = new List<Article_input>();
}
