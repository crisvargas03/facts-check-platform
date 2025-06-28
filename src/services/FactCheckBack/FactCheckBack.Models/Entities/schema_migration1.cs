using System;
using System.Collections.Generic;

namespace FactCheckBack.Models.Entities;

public partial class schema_migration1
{
    public long version { get; set; }

    public DateTime? inserted_at { get; set; }
}
