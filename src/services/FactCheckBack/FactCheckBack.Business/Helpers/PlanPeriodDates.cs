namespace FactCheckBack.Business.Helpers
{
    public static class PlanPeriodDates
    {
        public static DateTime GetPlanEndDate (string periodType, int duration)
        {
            if (duration <= 0)
                throw new ArgumentException("Duration must be greater than zero.", nameof(duration));

            if (string.IsNullOrWhiteSpace(periodType))
                throw new ArgumentException("Period type cannot be null or empty.", nameof(periodType));

            var startDate = DateTime.UtcNow;
            var endDate = periodType switch
            {
                "day" => startDate.AddDays(duration),
                "month" => startDate.AddMonths(duration),
                "year" => startDate.AddYears(duration),
                _ => throw new Exception("Period type not supported for the plan")
            };

            return endDate;
        }
    }
}
