import { useState, useEffect } from 'react';
import { ayurvedaKnowledgeBase, WellnessTip } from '@/data/ayurvedaData';

export const useAyurAQI = (currentAQI: number, userDosha: string | null) => {
  const [recommendations, setRecommendations] = useState<{
    diet: WellnessTip[];
    yoga: WellnessTip[];
    lifestyle: WellnessTip[];
  }>({ diet: [], yoga: [], lifestyle: [] });

  useEffect(() => {
    // 1. Filter by AQI Severity
    let applicableTips = ayurvedaKnowledgeBase.filter(tip => tip.minAqi <= currentAQI);

    // 2. Score and Sort tips based on Dosha match and AQI relevance
    applicableTips.sort((a, b) => {
      let scoreA = a.minAqi; // Base score is the severity threshold
      let scoreB = b.minAqi;

      if (userDosha) {
        if (a.doshaTarget === userDosha || a.doshaTarget === 'All') scoreA += 500;
        if (b.doshaTarget === userDosha || b.doshaTarget === 'All') scoreB += 500;
      }

      return scoreB - scoreA; // Descending order
    });

    // 3. Group by category and take the top 2 for each
    const diet = applicableTips.filter(t => t.category === 'Diet').slice(0, 2);
    const yoga = applicableTips.filter(t => t.category === 'Yoga').slice(0, 2);
    const lifestyle = applicableTips.filter(t => t.category === 'Lifestyle').slice(0, 2);

    setRecommendations({ diet, yoga, lifestyle });
  }, [currentAQI, userDosha]);

  return recommendations;
};
