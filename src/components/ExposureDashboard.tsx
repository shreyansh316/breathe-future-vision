import React from 'react';
import { Card } from '@/components/ui/card';
import { useExposureTracker } from '@/hooks/useExposureTracker';
import { Shield, Play, Square, MapPin, Award, HeartPulse, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const ExposureDashboard = () => {
  const { exposure, isTracking, startTracking, stopTracking, location } = useExposureTracker();

  // Progress ring calculation (Daily limit is 360)
  const maxLimit = 360; 
  const percentage = Math.min(100, (exposure.cumulativeExposure / maxLimit) * 100);
  const ringColor = percentage > 80 ? 'text-red-500' : (percentage > 50 ? 'text-yellow-500' : 'text-green-500');

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white border-gray-700 shadow-2xl relative">
      <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
        <h3 className="font-bold flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-400" />
          <span>My Exposure Tracker</span>
        </h3>
        {isTracking ? (
          <button 
            onClick={stopTracking}
            className="bg-red-500/20 text-red-400 p-2 rounded-full hover:bg-red-500/30 transition-colors"
          >
            <Square className="w-4 h-4" />
          </button>
        ) : (
          <button 
            onClick={startTracking}
            className="bg-green-500/20 text-green-400 p-2 rounded-full hover:bg-green-500/30 transition-colors"
          >
            <Play className="w-4 h-4 ml-0.5" />
          </button>
        )}
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Linear Exposure Spectrum Bar */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0 pr-0 md:pr-6 border-b md:border-b-0 md:border-r border-[#1E293B] pb-4 md:pb-0">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-sm font-semibold text-gray-400">Cumulative Load</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-mono font-bold text-white">{Math.round(exposure.cumulativeExposure)}</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">µg/m³ hr</span>
              </div>
            </div>
            
            <div className="relative pt-2">
              <div className="h-2 w-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 shadow-inner"></div>
              {/* Sharp Needle Pointer */}
              <div 
                className="absolute top-0 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white transition-all duration-1000 ease-out drop-shadow-md"
                style={{ left: `calc(${percentage}% - 6px)` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-2">
              <span>0</span>
              <span>{maxLimit / 2}</span>
              <span>{maxLimit} LIMIT</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 grid grid-cols-2 gap-4 w-full">
            <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
              <div className="text-xs text-gray-400 flex items-center mb-1">
                <HeartPulse className="w-3 h-3 mr-1 text-pink-400" /> Current Env
              </div>
              <div className="font-bold text-xl">{Math.round(exposure.currentPM25)} <span className="text-sm font-normal text-gray-400">PM2.5</span></div>
            </div>
            
            <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
              <div className="text-xs text-gray-400 flex items-center mb-1">
                <MapPin className="w-3 h-3 mr-1 text-blue-400" /> Location
              </div>
              <div className="font-bold text-sm truncate">
                {location ? `${location.lat.toFixed(2)}, ${location.lon.toFixed(2)}` : 'GPS / CoreLocation API Stream'}
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
              <div className="text-xs text-gray-400 flex items-center mb-1">
                <Clock className="w-3 h-3 mr-1 text-purple-400" /> Tracked Time
              </div>
              <div className="font-bold text-xl">{exposure.timeTracked} <span className="text-sm font-normal text-gray-400">mins</span></div>
            </div>
            
            <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
              <div className="text-xs text-gray-400 flex items-center mb-1">
                <Shield className="w-3 h-3 mr-1 text-green-400" /> Safe Remaining
              </div>
              <div className="font-bold text-xl">{exposure.safeHoursRemaining.toFixed(1)} <span className="text-sm font-normal text-gray-400">hrs</span></div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-6 border-t border-gray-700 pt-4">
          <h4 className="text-sm text-gray-400 mb-3 flex items-center">
            <Award className="w-4 h-4 mr-1 text-yellow-400" /> Earned Badges
          </h4>
          <div className="flex flex-wrap gap-2">
            {exposure.badges.map(badge => (
              <Badge key={badge} className="bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border border-blue-500/30">
                {badge}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Warning Toast */}
        {exposure.healthStatus === 'Critical' && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
            Warning: Critical PM2.5 detected in your area!
          </div>
        )}
      </div>
    </Card>
  );
};
