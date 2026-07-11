import React, { useState, useEffect } from 'react';

interface HealthRiskScorerProps {
  cityId: string;
  ageGroup?: 'children' | 'adult' | 'elderly' | 'pregnant';
}

interface RiskData {
  score: number;
  category: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  recommendations: string[];
}

export const HealthRiskScorer: React.FC<HealthRiskScorerProps> = ({ cityId, ageGroup = 'adult' }) => {
  const [riskData, setRiskData] = useState<RiskData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRiskScore();
  }, [cityId, ageGroup]);

  const fetchRiskScore = async () => {
    try {
      // In a real app this would call our public-api-service
      const response = await fetch(`/api/v2/health-risk/${cityId}?ageGroup=${ageGroup}`);
      if (!response.ok) throw new Error('API failed');
      const data = await response.json();
      setRiskData(data);
    } catch (e) {
      // Dummy data fallback
      setRiskData({
        score: 75.5,
        category: 'HIGH',
        recommendations: [
          'Limit prolonged outdoor exertion',
          'Consider wearing a mask if you must go outside',
          'Keep indoor air purifiers running'
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading || !riskData) return <div className="p-4">Loading health risk data...</div>;

  const riskColor = {
    'CRITICAL': '#d32f2f',
    'HIGH': '#f57c00',
    'MODERATE': '#fbc02d',
    'LOW': '#388e3c'
  }[riskData.category];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4" style={{ borderLeft: `6px solid ${riskColor}` }}>
      <h4 className="text-lg font-bold mb-2">Health Risk Score ({ageGroup})</h4>
      <div className="flex items-center space-x-4 mb-4">
        <div className="text-4xl font-extrabold" style={{ color: riskColor }}>
          {riskData.score.toFixed(1)}<span className="text-gray-500 text-lg font-normal">/100</span>
        </div>
        <div className="text-xl font-semibold px-3 py-1 rounded bg-gray-100" style={{ color: riskColor }}>
          {riskData.category}
        </div>
      </div>
      
      <div className="recommendations mt-4">
        <h5 className="font-semibold mb-2">Health Advisories:</h5>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          {riskData.recommendations.map((rec, idx) => (
            <li key={idx}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
