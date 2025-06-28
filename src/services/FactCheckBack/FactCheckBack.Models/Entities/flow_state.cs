using System;
using System.Collections.Generic;

namespace FactCheckBack.Models.Entities;

/// <summary>
/// stores metadata for pkce logins
/// </summary>
public partial class flow_state
{
    public Guid id { get; set; }

    public Guid? user_id { get; set; }

    public string auth_code { get; set; } = null!;

    public string code_challenge { get; set; } = null!;

    public string provider_type { get; set; } = null!;

    public string? provider_access_token { get; set; }

    public string? provider_refresh_token { get; set; }

    public DateTime? created_at { get; set; }

    public DateTime? updated_at { get; set; }

    public string authentication_method { get; set; } = null!;

    public DateTime? auth_code_issued_at { get; set; }

    public virtual ICollection<saml_relay_state> saml_relay_states { get; set; } = new List<saml_relay_state>();
}
