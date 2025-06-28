using System;
using System.Collections.Generic;
using System.Net;

namespace FactCheckBack.Models.Entities;

/// <summary>
/// auth: stores metadata about challenge requests made
/// </summary>
public partial class mfa_challenge
{
    public Guid id { get; set; }

    public Guid factor_id { get; set; }

    public DateTime created_at { get; set; }

    public DateTime? verified_at { get; set; }

    public IPAddress ip_address { get; set; } = null!;

    public string? otp_code { get; set; }

    public string? web_authn_session_data { get; set; }

    public virtual mfa_factor factor { get; set; } = null!;
}
