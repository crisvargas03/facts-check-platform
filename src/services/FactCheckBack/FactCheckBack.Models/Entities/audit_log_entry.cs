using System;
using System.Collections.Generic;

namespace FactCheckBack.Models.Entities;

/// <summary>
/// Auth: Audit trail for user actions.
/// </summary>
public partial class audit_log_entry
{
    public Guid? instance_id { get; set; }

    public Guid id { get; set; }

    public string? payload { get; set; }

    public DateTime? created_at { get; set; }

    public string ip_address { get; set; } = null!;
}
