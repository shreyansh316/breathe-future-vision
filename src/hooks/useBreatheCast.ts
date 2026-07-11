import { useState, useEffect } from 'react';

export interface ForecastDay {
  date: string;
  predicted_aqi: number;
  predicted_pm25: number;
  predicted_pm10: number;
  health_risk_zone: 'GREEN' | 'ORANGE' | 'RED';
  confidence_score: number;
}

export interface ForecastData {
  success: boolean;
  city: string;
  engine: string;
  forecast: ForecastDay[];
}

export const useBreatheCast = (city: string | null) => {
  const [data, setData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) {
      setData(null);
      return;
    }

    const fetchForecast = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/v1/predict/5-day/${city}`);
        if (!response.ok) {
          throw new Error('Failed to fetch AI forecast');
        }
        const json: ForecastData = await response.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || 'Error communicating with BreatheCast AI');
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  return { forecast: data, loading, error };
};
