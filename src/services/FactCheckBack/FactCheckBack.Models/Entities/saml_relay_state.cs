using System;
using System.Collections.Generic;

namespace FactCheckBack.Models.Entities;

/// <summary>
/// Auth: Contains SAML Relay State information for each Service Provider initiated login.
/// </summary>
public partial class saml_relay_state
{
    public Guid id { get; set; }

    public Guid sso_provider_id { get; set; }

    public string request_id { get; set; } = null!;

    public string? for_email { get; set; }

    public string? redirect_to { get; set; }

    public DateTime? created_at { get; set; }

    public DateTime? updated_at { get; set; }

    public Guid? flow_state_id { get; set; }

    public virtual flow_state? flow_state { get; set; }

    public virtual sso_provider sso_provider { get; set; } = null!;
}
