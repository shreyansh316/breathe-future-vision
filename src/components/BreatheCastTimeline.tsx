import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Clock, Calendar, AlertTriangle, FastForward } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BreatheCastTimelineProps {
  onTimeChange: (hoursAhead: number) => void;
  isPredicting: boolean;
}

export const BreatheCastTimeline = ({ onTimeChange, isPredicting }: BreatheCastTimelineProps) => {
  const [hoursAhead, setHoursAhead] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play functionality for the timeline
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setHoursAhead((prev) => {
          const next = prev + 3; // Jump 3 hours at a time for speed
          if (next > 120) {
            setIsPlaying(false);
            return 120;
          }
          return next;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Debounce the actual API call / state update to the parent
  useEffect(() => {
    const timeout = setTimeout(() => {
      onTimeChange(hoursAhead);
    }, 100);
    return () => clearTimeout(timeout);
  }, [hoursAhead, onTimeChange]);

  const targetDate = new Date();
  targetDate.setHours(targetDate.getHours() + hoursAhead);

  const formatDay = (date: Date) => {
    if (hoursAhead === 0) return 'Live Now';
    if (hoursAhead < 24 && date.getDate() === new Date().getDate()) return 'Today';
    if (hoursAhead < 48 && date.getDate() === new Date().getDate() + 1) return 'Tomorrow';
    return date.toLocaleDateString('en-IN', { weekday: 'long' });
  };

  return (
    <div className="w-full bg-white/80 backdrop-blur-md p-4 rounded-xl border border-indigo-100 shadow-lg mt-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div className="flex items-center space-x-2">
          <FastForward className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-[#263238]">BreatheCast AI Forecasting</h3>
          {hoursAhead > 0 && (
            <Badge className="bg-indigo-600 text-white animate-pulse ml-2">
              T+{hoursAhead} Hrs
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-4 mt-2 md:mt-0 text-sm font-medium">
          <div className="flex items-center text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDay(targetDate)}
          </div>
          <div className="flex items-center text-slate-700 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
            <Clock className="w-4 h-4 mr-1" />
            {targetDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className={`p-2 rounded-full transition-all ${isPlaying ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'}`}
        >
          {isPlaying ? (
            <span className="font-bold text-xs px-1">STOP</span>
          ) : (
            <span className="font-bold text-xs px-1">PLAY</span>
          )}
        </button>
        
        <div className="flex-1 relative">
          <Slider 
            defaultValue={[0]} 
            max={120} 
            step={1} 
            value={[hoursAhead]}
            onValueChange={(vals) => setHoursAhead(vals[0])}
            className="w-full"
            disabled={isPredicting}
          />
          
          <div className="flex justify-between text-xs text-slate-400 mt-2">
            <span>Now</span>
            <span>+24h</span>
            <span>+48h</span>
            <span>+72h</span>
            <span>+96h</span>
            <span>+120h</span>
          </div>
        </div>
      </div>
      
      {hoursAhead > 72 && (
        <div className="mt-3 text-xs flex items-center text-orange-600 bg-orange-50 p-2 rounded border border-orange-100">
          <AlertTriangle className="w-4 h-4 mr-1 flex-shrink-0" />
          <span>Long-term predictions (&gt;3 days) rely heavily on the Prophet seasonal model and may have higher variance.</span>
        </div>
      )}
    </div>
  );
};
