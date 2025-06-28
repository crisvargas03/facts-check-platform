using System;
using System.Collections.Generic;

namespace FactCheckBack.Models.Entities;

/// <summary>
/// auth: stores authenticator method reference claims for multi factor authentication
/// </summary>
public partial class mfa_amr_claim
{
    public Guid session_id { get; set; }

    public DateTime created_at { get; set; }

    public DateTime updated_at { get; set; }

    public string authentication_method { get; set; } = null!;

    public Guid id { get; set; }

    public virtual session session { get; set; } = null!;
}
