import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EnhancedIndiaMap } from './EnhancedIndiaMap';
import { usePollutionData } from '@/hooks/usePollutionData';
import { Activity, Layers, Radio, Satellite, Map as MapIcon, Database, Flame } from 'lucide-react';
import { BreatheCastTimeline } from './BreatheCastTimeline';

export const VayuNetDashboard = () => {
  const { cities } = usePollutionData();
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showFires, setShowFires] = useState(false);
  const [hoursAhead, setHoursAhead] = useState(0);
  const [isPredicting, setIsPredicting] = useState(false);

  return (
    <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50/95 via-indigo-50/95 to-purple-50/95 border-2 border-blue-500/20 shadow-2xl backdrop-blur-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#263238] flex items-center space-x-2">
            <Radio className="w-6 h-6 text-blue-600 animate-pulse" />
            <span>VayuNet Command Center</span>
          </h2>
          <p className="text-sm text-gray-600 mt-1">Bharat-Wide Environmental Grid (Monitoring 7,900+ Nodes)</p>
        </div>
        
        <div className="flex mt-4 md:mt-0 space-x-2 bg-white/50 p-2 rounded-lg border border-white/60 flex-wrap gap-y-2">
          <button 
            onClick={() => setShowHeatmap(false)}
            className={`px-4 py-2 rounded-md flex items-center space-x-2 text-sm font-medium transition-all ${!showHeatmap ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-white/80'}`}
          >
            <MapIcon className="w-4 h-4" />
            <span>Sensors (City)</span>
          </button>
          <button 
            onClick={() => setShowHeatmap(true)}
            className={`px-4 py-2 rounded-md flex items-center space-x-2 text-sm font-medium transition-all ${showHeatmap ? 'bg-purple-600 text-white shadow-md' : 'text-gray-600 hover:bg-white/80'}`}
          >
            <Layers className="w-4 h-4" />
            <span>AI Fusion (Grid)</span>
          </button>
          <button 
            onClick={() => setShowFires(!showFires)}
            className={`px-4 py-2 rounded-md flex items-center space-x-2 text-sm font-medium transition-all ${showFires ? 'bg-orange-500 text-white shadow-md' : 'text-gray-600 hover:bg-white/80'}`}
          >
            <Flame className="w-4 h-4" />
            <span>Satellite Fires</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/70 p-4 rounded-xl border border-white shadow-sm flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-medium">Active Nodes</div>
            <div className="text-lg font-bold">1,204</div>
          </div>
        </div>
        <div className="bg-white/70 p-4 rounded-xl border border-white shadow-sm flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg text-green-600">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-medium">CPCB/OpenAQ</div>
            <div className="text-lg font-bold">Live</div>
          </div>
        </div>
        <div className="bg-white/70 p-4 rounded-xl border border-white shadow-sm flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
            <Satellite className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-medium">ISRO Grid</div>
            <div className="text-lg font-bold text-purple-700">Syncing...</div>
          </div>
        </div>
        <div className="bg-white/70 p-4 rounded-xl border border-white shadow-sm flex items-center space-x-3">
          <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-medium">Rural IoT</div>
            <div className="text-lg font-bold text-orange-700">450 online</div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <EnhancedIndiaMap 
          cities={cities}
          selectedCity={selectedCity}
          onCitySelect={setSelectedCity}
          showHeatmap={showHeatmap}
          hoursAhead={hoursAhead}
          showFires={showFires}
        />
      </div>
      
      <div className="w-full">
        <BreatheCastTimeline 
          onTimeChange={(val) => {
            setIsPredicting(true);
            setHoursAhead(val);
            // Simulate API delay
            setTimeout(() => setIsPredicting(false), 300);
          }}
          isPredicting={isPredicting}
        />
      </div>
      
      {showHeatmap && (
        <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-100 flex items-start space-x-3">
          <Activity className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-purple-900">
            <strong>AI Sensor Fusion Active:</strong> The map is currently displaying continuous PM2.5 estimates across rural and unmonitored regions, generated by fusing sparse ground sensor data with ISRO satellite AOD grids using Gaussian Process Regression (Kriging).
          </div>
        </div>
      )}
    </Card>
  );
};
