import { useState, useEffect } from 'react';

interface TelemetryData {
  aqi: number;
  pm25: number;
  pm10: number;
  temperature: number;
  humidity: number;
}

export function useRealTimeTelemetry(initialData: TelemetryData) {
  const [data, setData] = useState<TelemetryData>(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        aqi: Math.max(0, Math.round(prev.aqi + (Math.random() * 4 - 2))), // +/- 2
        pm25: Math.max(0, Math.round(prev.pm25 + (Math.random() * 2 - 1))), // +/- 1
        pm10: Math.max(0, Math.round(prev.pm10 + (Math.random() * 6 - 3))), // +/- 3
        temperature: Number((prev.temperature + (Math.random() * 0.2 - 0.1)).toFixed(1)), // +/- 0.1
        humidity: Math.max(0, Math.min(100, Math.round(prev.humidity + (Math.random() * 2 - 1)))), // +/- 1
      }));
    }, 4000); // Update every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return data;
}
