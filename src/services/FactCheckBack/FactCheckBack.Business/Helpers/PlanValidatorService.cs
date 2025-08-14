using FactCheckBack.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FactCheckBack.Business.Helpers
{
    public static class PlanValidatorService
    {
        public static User_plan RefreshPlanIfExpired(User_plan userPlan, Plan plan)
        {
            var now = DateTime.UtcNow;

            if (now > userPlan.end_date_agreement)
            {
                userPlan.attempts_used = 0;
                userPlan.start_date_agreement = now;
                userPlan.end_date_agreement = PlanPeriodDates.GetPlanEndDate(plan.period_type, plan.duration);
            }

            return userPlan;
        }
        public static void EnsureAttemptsAvailable(User_plan userPlan, Plan plan)
        {
            if (userPlan.attempts_used >= plan.max_attempts)
                throw new InvalidOperationException("You have reached the maximum number of allowed article analyses for your current plan.");
        }
    }
}
