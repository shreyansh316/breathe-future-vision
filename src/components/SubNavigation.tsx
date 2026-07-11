import React, { useState, useEffect } from 'react';
import { MapPin, Clock } from 'lucide-react';

const metrics = [
  { id: 'aqi', label: 'AQI' },
  { id: 'history', label: 'History', icon: Clock },
  { id: 'pm25', label: 'PM2.5' },
  { id: 'pm10', label: 'PM10' },
  { id: 'co', label: 'CO' },
  { id: 'so2', label: 'SO2' },
  { id: 'no2', label: 'NO2' },
  { id: 'o3', label: 'O3' },
];

export const SubNavigation = () => {
  const [activeMetric, setActiveMetric] = useState('aqi');
  const [location, setLocation] = useState('Delhi, India');

  useEffect(() => {
    // Listen for the custom event from the Geolocation button in GlobalHeader
    const handleLocationUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.location) {
        setLocation(customEvent.detail.location);
      }
    };

    window.addEventListener('update-location', handleLocationUpdate);
    return () => window.removeEventListener('update-location', handleLocationUpdate);
  }, []);

  const handleMetricClick = (metricId: string) => {
    setActiveMetric(metricId);
    // Phase 2: Dynamic Metric Binding
    // Dispatch event to update dashboard widgets dynamically
    window.dispatchEvent(new CustomEvent('update-metric', { detail: { metric: metricId } }));
  };

  return (
    <div className="bg-[#181b1e] border-b border-gray-800 px-6 py-2.5 sticky top-[68px] z-40 transition-all">
      <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left Indicator */}
        <div className="flex items-center gap-2 text-sm text-gray-300 font-semibold bg-gray-800/30 px-3 py-1.5 rounded-full border border-gray-700/50">
          <MapPin className="w-4 h-4 text-sky-400" /> 
          <span className="tracking-wide">{location}</span>
        </div>

        {/* Right Parameter Control Deck */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {metrics.map((metric) => {
            const isActive = activeMetric === metric.id;
            const Icon = metric.icon;

            return (
              <button
                key={metric.id}
                onClick={() => handleMetricClick(metric.id)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-sky-500 text-white border-transparent shadow-[0_0_10px_rgba(14,165,233,0.4)] transform scale-105'
                    : 'bg-transparent text-gray-400 border-gray-700 border hover:border-gray-500 hover:text-white interactive-element'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {metric.label}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
