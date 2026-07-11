import React from 'react';
import { useBreatheCast } from '@/hooks/useBreatheCast';
import { Brain, CloudRain, Wind, AlertTriangle, Loader2 } from 'lucide-react';

export const BreatheCastPanel = ({ selectedCity }: { selectedCity: string | null }) => {
  const { forecast, loading, error } = useBreatheCast(selectedCity);

  if (!selectedCity) return null;

  return (
    <div className="bg-[#0B0F19] border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden mt-6">
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/5 to-transparent pointer-events-none" />
      
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg font-bold text-slate-100 flex items-center">
          <Brain className="w-5 h-5 mr-2 text-sky-400" />
          BreatheCast AI: 5-Day Forecast for {selectedCity}
        </h4>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
          PROPHET-LSTM HYBRID
        </span>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 space-y-3">
          <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
          <p className="text-sm text-slate-400 animate-pulse">Running neural network inference...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-10 text-rose-400 text-sm">
          <AlertTriangle className="w-4 h-4 mr-2" /> {error}
        </div>
      ) : forecast?.forecast ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {forecast.forecast.map((day, idx) => {
            const dateObj = new Date(day.date);
            const dayName = idx === 0 ? "Tomorrow" : dateObj.toLocaleDateString('en-US', { weekday: 'short' });
            
            const isRed = day.health_risk_zone === 'RED';
            const isOrange = day.health_risk_zone === 'ORANGE';
            
            return (
              <div 
                key={day.date} 
                className={`flex flex-col items-center p-4 rounded-xl border transition-all ${
                  isRed 
                    ? 'bg-rose-500/10 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.1)]' 
                    : isOrange
                      ? 'bg-amber-500/10 border-amber-500/30'
                      : 'bg-[#1E293B]/50 border-slate-700'
                }`}
              >
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  {dayName}
                </span>
                
                <div className="text-3xl font-black mb-1" style={{ 
                  color: isRed ? '#FB7185' : isOrange ? '#FBBF24' : '#34D399' 
                }}>
                  {day.predicted_aqi}
                </div>
                <span className="text-[10px] text-slate-500 font-mono mb-3">AQI</span>

                <div className="w-full space-y-1 mt-auto">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span className="flex items-center"><CloudRain className="w-3 h-3 mr-1" />PM2.5</span>
                    <span className="font-mono">{day.predicted_pm25}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span className="flex items-center"><Wind className="w-3 h-3 mr-1" />PM10</span>
                    <span className="font-mono">{day.predicted_pm10}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 text-slate-500 text-sm">Select a city to generate forecast.</div>
      )}
    </div>
  );
};
