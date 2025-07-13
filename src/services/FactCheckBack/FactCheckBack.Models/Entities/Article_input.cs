using System;
using System.Collections.Generic;

namespace FactCheckBack.Models.Entities;

public partial class Article_input
{
    public string article_id { get; set; } = null!;

    public string user_id { get; set; } = null!;

    public string complete_text { get; set; } = null!;

    public DateTime created { get; set; }

    public string article_type_id { get; set; } = null!;

    public string title { get; set; } = null!;

    public virtual Article_type article_type { get; set; } = null!;

    public virtual Users users { get; set; } = null!;
}
