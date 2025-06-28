using System;
using System.Collections.Generic;

namespace FactCheckBack.Models.Entities;

/// <summary>
/// Auth: Stores user login data within a secure schema.
/// </summary>
public partial class user
{
    public Guid? instance_id { get; set; }

    public Guid id { get; set; }

    public string? aud { get; set; }

    public string? role { get; set; }

    public string? email { get; set; }

    public string? encrypted_password { get; set; }

    public DateTime? email_confirmed_at { get; set; }

    public DateTime? invited_at { get; set; }

    public string? confirmation_token { get; set; }

    public DateTime? confirmation_sent_at { get; set; }

    public string? recovery_token { get; set; }

    public DateTime? recovery_sent_at { get; set; }

    public string? email_change_token_new { get; set; }

    public string? email_change { get; set; }

    public DateTime? email_change_sent_at { get; set; }

    public DateTime? last_sign_in_at { get; set; }

    public string? raw_app_meta_data { get; set; }

    public string? raw_user_meta_data { get; set; }

    public bool? is_super_admin { get; set; }

    public DateTime? created_at { get; set; }

    public DateTime? updated_at { get; set; }

    public string? phone { get; set; }

    public DateTime? phone_confirmed_at { get; set; }

    public string? phone_change { get; set; }

    public string? phone_change_token { get; set; }

    public DateTime? phone_change_sent_at { get; set; }

    public DateTime? confirmed_at { get; set; }

    public string? email_change_token_current { get; set; }

    public short? email_change_confirm_status { get; set; }

    public DateTime? banned_until { get; set; }

    public string? reauthentication_token { get; set; }

    public DateTime? reauthentication_sent_at { get; set; }

    /// <summary>
    /// Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.
    /// </summary>
    public bool is_sso_user { get; set; }

    public DateTime? deleted_at { get; set; }

    public bool is_anonymous { get; set; }

    public virtual ICollection<identity> identities { get; set; } = new List<identity>();

    public virtual ICollection<mfa_factor> mfa_factors { get; set; } = new List<mfa_factor>();

    public virtual ICollection<one_time_token> one_time_tokens { get; set; } = new List<one_time_token>();

    public virtual ICollection<session> sessions { get; set; } = new List<session>();
}
