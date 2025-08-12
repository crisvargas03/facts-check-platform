using System;
using System.Collections.Generic;

namespace FactCheckBack.Models.Entities;

public partial class Result
{
    public string result_id { get; set; } = null!;

    public string article_id { get; set; } = null!;

    public string verdict_id { get; set; } = null!;

    public DateTime created { get; set; }

    public decimal percentaje_trust { get; set; }

    public string motive { get; set; } = null!;

    public decimal reliable_source { get; set; }

    public decimal scientific_evidence { get; set; }

    public decimal citations_and_references { get; set; }

    public decimal target_language { get; set; }

    public decimal context_and_limitations { get; set; }

    public virtual Article_input Article_input { get; set; } = null!;

    public virtual Verdict Verdict { get; set; } = null!;
}
