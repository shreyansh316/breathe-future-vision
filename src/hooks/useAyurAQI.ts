import { useState, useEffect } from 'react';
import { ayurvedaKnowledgeBase, WellnessTip } from '@/data/ayurvedaData';

export const useAyurAQI = (currentAQI: number) => {
  const [recommendations, setRecommendations] = useState<{
    diet: WellnessTip[];
    yoga: WellnessTip[];
    lifestyle: WellnessTip[];
  }>({ diet: [], yoga: [], lifestyle: [] });

  useEffect(() => {
    // Filter knowledge base by the current severity
    // Sort by descending minAqi so the most relevant/urgent tips for high pollution come first
    const applicableTips = ayurvedaKnowledgeBase
      .filter(tip => tip.minAqi <= currentAQI)
      .sort((a, b) => b.minAqi - a.minAqi);

    // Group by category and take the top 2 for each to not overwhelm the user
    const diet = applicableTips.filter(t => t.category === 'Diet').slice(0, 2);
    const yoga = applicableTips.filter(t => t.category === 'Yoga').slice(0, 2);
    const lifestyle = applicableTips.filter(t => t.category === 'Lifestyle').slice(0, 2);

    setRecommendations({ diet, yoga, lifestyle });
  }, [currentAQI]);

  return recommendations;
};
