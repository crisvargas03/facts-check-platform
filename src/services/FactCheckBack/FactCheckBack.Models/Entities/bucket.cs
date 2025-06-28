using System;
using System.Collections.Generic;

namespace FactCheckBack.Models.Entities;

public partial class bucket
{
    public string id { get; set; } = null!;

    public string name { get; set; } = null!;

    /// <summary>
    /// Field is deprecated, use owner_id instead
    /// </summary>
    public Guid? owner { get; set; }

    public DateTime? created_at { get; set; }

    public DateTime? updated_at { get; set; }

    public bool? _public { get; set; }

    public bool? avif_autodetection { get; set; }

    public long? file_size_limit { get; set; }

    public List<string>? allowed_mime_types { get; set; }

    public string? owner_id { get; set; }

    public virtual ICollection<_object> _objects { get; set; } = new List<_object>();

    public virtual ICollection<s3_multipart_upload> s3_multipart_uploads { get; set; } = new List<s3_multipart_upload>();

    public virtual ICollection<s3_multipart_uploads_part> s3_multipart_uploads_parts { get; set; } = new List<s3_multipart_uploads_part>();
}
