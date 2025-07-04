import React, { useState, useEffect } from 'react';
import { LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ForecastPoint {
  timestamp: number;
  pm25_prediction: number;
  confidence_lower: number;
  confidence_upper: number;
}

interface PredictiveForecastProps {
  cityId: string;
}

export const PredictiveForecast: React.FC<PredictiveForecastProps> = ({ cityId }) => {
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchForecast();
  }, [cityId]);

  const fetchForecast = async () => {
    try {
      // In a real app this would call our prediction-service endpoint via API Gateway
      const response = await fetch(`/api/v2/predictions/${cityId}?hours=168`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      
      const chartData = data.forecast.map((point: ForecastPoint) => ({
        time: new Date(point.timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        pm25: point.pm25_prediction,
        lower: point.confidence_lower,
        upper: point.confidence_upper
      }));
      
      setForecastData(chartData);
    } catch (error) {
      console.error('Failed to fetch forecast:', error);
      // Fallback dummy data for visual demo if API fails
      setForecastData([
        { time: '10:00', pm25: 45, lower: 35, upper: 55 },
        { time: '11:00', pm25: 60, lower: 45, upper: 75 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4">Loading 7-day forecast...</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h3 className="text-xl font-bold mb-4">7-Day PM2.5 Forecast ({cityId.toUpperCase()})</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={forecastData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorPM25" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="pm25"
            stroke="#8884d8"
            fillOpacity={0}
            strokeWidth={1.5}
            fill="url(#colorPM25)"
            name="Predicted PM2.5"
          />
          <Line
            type="monotone"
            dataKey="upper"
            stroke="#ff7300"
            strokeDasharray="5 5"
            dot={false}
            name="Upper Bound (95%)"
          />
          <Line
            type="monotone"
            dataKey="lower"
            stroke="#ff7300"
            strokeDasharray="5 5"
            dot={false}
            name="Lower Bound (95%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
