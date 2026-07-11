import { useState, useEffect, useCallback } from 'react';
import { initialCitiesData, type City } from '@/data/cities';

export const usePollutionData = () => {
  const [cities, setCities] = useState<City[]>(initialCitiesData);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return '#00C853';
    if (aqi <= 100) return '#FFEB3B';
    if (aqi <= 200) return '#FF9800';
    if (aqi <= 300) return '#F44336';
    return '#9C27B0';
  };

  const loadPollutionData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching live AQI from Node.js backend...');
      // Note: In production, this would be an env var like VITE_API_URL
      const response = await fetch('http://localhost:5000/api/v1/aqi/live');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const json = await response.json();
      
      if (json.success && json.data) {
        // Map backend schema to frontend City schema
        const updatedCities: City[] = json.data.map((item: any) => ({
          name: item.city,
          state: item.state,
          // Backend sends GeoJSON [lng, lat], maplibre uses [lng, lat] natively
          coordinates: item.location.coordinates,
          pm25: item.pm25,
          pm10: item.pm10,
          aqi: item.aqi.toString(),
          color: item.color || getAqiColor(item.aqi),
          actualAqi: item.aqi
        }));
        
        setCities(updatedCities);
        setLastUpdated(new Date());
        setRetryCount(0);
      }
    } catch (error) {
      console.error('Failed to load from backend API, using cached/mock data:', error);
      setError('Failed to fetch real-time data, showing cached data');
      setRetryCount(prev => prev + 1);
      // fallback to initialCitiesData happens naturally as state isn't overwritten
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPollutionData();
    // Refresh every 5 minutes
    const interval = setInterval(loadPollutionData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [loadPollutionData]);

  return {
    cities,
    loading,
    lastUpdated,
    error,
    refreshData: loadPollutionData,
    retryCount
  };
};
