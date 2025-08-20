using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FactCheckBack.Business.Helpers
{
    public static class GenerateTitle
    {
        public static string GenerateTitleFromText(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return "Sin título";

            string candidate;

            // Try cutting it off at the first sentence.
            var firstSentenceEnd = text.IndexOfAny(new[] { '.', '!', '?', ',' });
            if (firstSentenceEnd > 0)
            {
                candidate = text.Substring(0, firstSentenceEnd);
            }
            else
            {
                // If there is no punctuation mark -> take the first 8 words
                var words = text.Split(' ', StringSplitOptions.RemoveEmptyEntries);
                candidate = string.Join(" ", words.Take(8));
            }

            // 30 characters maximum
            if (candidate.Length > 30)
                candidate = candidate.Substring(0, 30) + "...";

            // Capitalize first letter
            candidate = candidate.Trim();
            candidate = char.ToUpper(candidate[0]) + candidate.Substring(1);

            return candidate;
        }
    }
}
