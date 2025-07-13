namespace FactCheckBack.Models.Entities
{
    public class Plan_Options
    {
        public int plan_options_id { get; set; }
        public string plan_id { get; set; } = string.Empty;
        public string description { get; set; } = string.Empty;

        public virtual Plan Plan { get; set; } = null!;
    }
}
