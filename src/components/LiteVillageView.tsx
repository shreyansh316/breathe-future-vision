import React, { useEffect, useState } from 'react';
import { useRealTimeTelemetry } from '@/hooks/useRealTimeTelemetry';

export const LiteVillageView = ({ villageCode }: { villageCode: string }) => {
  const [data, setData] = useState<any>(null);

  const liveData = useRealTimeTelemetry({
    aqi: 145,
    pm25: 85,
    pm10: 110,
    temperature: 32,
    humidity: 50,
  });

  useEffect(() => {
    // Simulate fetching data for the specific village
    setTimeout(() => {
      setData({
        name: "Rupnagar Panchayat",
        aqi: 145,
        pm25: 85,
        status: "खराब (Poor)", // Regional language support
        color: "#FF8F00", // Orange
        advisory: "बुजुर्गों और बच्चों को बाहर खेलने से बचना चाहिए। (Elderly and children should avoid playing outside.)"
      });
    }, 500);
  }, [villageCode]);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
        <div className="text-gray-600">लोड हो रहा है... (Loading...)</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      <div 
        className="w-full max-w-sm rounded-2xl shadow-xl overflow-hidden bg-white"
        style={{ borderTop: `8px solid ${data.color}` }}
      >
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{data.name}</h1>
          <p className="text-gray-500 text-sm mb-6">UID: {villageCode}</p>
          
          <div 
            className="w-32 h-32 mx-auto rounded-full flex flex-col items-center justify-center text-white mb-6 shadow-inner"
            style={{ backgroundColor: data.color }}
          >
            <span className="text-5xl font-black transition-all duration-500">{liveData.aqi}</span>
            <span className="text-sm font-medium">AQI</span>
          </div>
          
          <h2 className="text-xl font-bold mb-4" style={{ color: data.color }}>
            {data.status}
          </h2>
          
          <div className="bg-gray-100 p-4 rounded-xl text-left mb-6">
            <div className="flex justify-between items-center mb-2 border-b border-gray-200 pb-2">
              <span className="text-gray-600 font-medium">PM2.5</span>
              <span className="font-bold text-gray-800 transition-all duration-500">{liveData.pm25} µg/m³</span>
            </div>
            <p className="text-sm text-gray-700 mt-3 font-medium leading-relaxed">
              {data.advisory}
            </p>
          </div>
          
          <button 
            onClick={() => window.location.href = '/'}
            className="text-blue-600 text-sm font-bold underline"
          >
            Go to Full Map
          </button>
        </div>
      </div>
    </div>
  );
};
