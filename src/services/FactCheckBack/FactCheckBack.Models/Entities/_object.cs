using System;
using System.Collections.Generic;

namespace FactCheckBack.Models.Entities;

public partial class _object
{
    public Guid id { get; set; }

    public string? bucket_id { get; set; }

    public string? name { get; set; }

    /// <summary>
    /// Field is deprecated, use owner_id instead
    /// </summary>
    public Guid? owner { get; set; }

    public DateTime? created_at { get; set; }

    public DateTime? updated_at { get; set; }

    public DateTime? last_accessed_at { get; set; }

    public string? metadata { get; set; }

    public List<string>? path_tokens { get; set; }

    public string? version { get; set; }

    public string? owner_id { get; set; }

    public string? user_metadata { get; set; }

    public virtual bucket? bucket { get; set; }
}
