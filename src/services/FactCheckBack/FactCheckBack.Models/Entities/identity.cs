using System;
using System.Collections.Generic;

namespace FactCheckBack.Models.Entities;

/// <summary>
/// Auth: Stores identities associated to a user.
/// </summary>
public partial class identity
{
    public string provider_id { get; set; } = null!;

    public Guid user_id { get; set; }

    public string identity_data { get; set; } = null!;

    public string provider { get; set; } = null!;

    public DateTime? last_sign_in_at { get; set; }

    public DateTime? created_at { get; set; }

    public DateTime? updated_at { get; set; }

    /// <summary>
    /// Auth: Email is a generated column that references the optional email property in the identity_data
    /// </summary>
    public string? email { get; set; }

    public Guid id { get; set; }

    public virtual user user { get; set; } = null!;
}
