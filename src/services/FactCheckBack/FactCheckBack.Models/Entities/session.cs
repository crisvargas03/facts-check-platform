using System;
using System.Collections.Generic;
using System.Net;

namespace FactCheckBack.Models.Entities;

/// <summary>
/// Auth: Stores session data associated to a user.
/// </summary>
public partial class session
{
    public Guid id { get; set; }

    public Guid user_id { get; set; }

    public DateTime? created_at { get; set; }

    public DateTime? updated_at { get; set; }

    public Guid? factor_id { get; set; }

    /// <summary>
    /// Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.
    /// </summary>
    public DateTime? not_after { get; set; }

    public DateTime? refreshed_at { get; set; }

    public string? user_agent { get; set; }

    public IPAddress? ip { get; set; }

    public string? tag { get; set; }

    public virtual ICollection<mfa_amr_claim> mfa_amr_claims { get; set; } = new List<mfa_amr_claim>();

    public virtual ICollection<refresh_token> refresh_tokens { get; set; } = new List<refresh_token>();

    public virtual user user { get; set; } = null!;
}
