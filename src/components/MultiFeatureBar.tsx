import React from 'react';
import { BarChart3, HeartPulse, MonitorSmartphone, AlertTriangle, Clock, Activity, Download } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const MultiFeatureBar = () => {
  const { ref: featureRef, isVisible } = useScrollReveal();

  return (
    <div 
      ref={featureRef}
      className={`w-full max-w-6xl mx-auto mt-8 mb-16 relative z-20 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      {/* Dark Feature Strip */}
      <div className="w-full bg-[#181a1c] border-y border-gray-800 text-gray-300 hidden md:block">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-20 grid grid-cols-3 divide-x divide-gray-800">
          <div className="flex items-center justify-center space-x-4 px-6 hover:text-white transition-colors cursor-pointer group">
            <BarChart3 className="w-6 h-6 text-cyan-500 group-hover:scale-110 transition-transform flex-shrink-0" />
            <span className="text-sm font-medium tracking-wide">Your area's real-time data with detailed parameters.</span>
          </div>
          <div className="flex items-center justify-center space-x-4 px-6 hover:text-white transition-colors cursor-pointer group">
            <HeartPulse className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform flex-shrink-0" />
            <span className="text-sm font-medium tracking-wide">Personalized health recommendations based on air quality.</span>
          </div>
          <div className="flex items-center justify-center space-x-4 px-6 hover:text-white transition-colors cursor-pointer group">
            <MonitorSmartphone className="w-6 h-6 text-purple-500 group-hover:scale-110 transition-transform flex-shrink-0" />
            <span className="text-sm font-medium tracking-wide">Connect and control your air quality devices.</span>
          </div>
        </div>
      </div>

      {/* Floating Glassmorphic Dock */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-[90%] max-w-2xl z-40">
        <div className="glass-panel shadow-[0_0_30px_rgba(255,255,255,0.1)] rounded-full p-2 flex items-center justify-between overflow-x-auto no-scrollbar">
          <button className="flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-full hover:bg-white/10 transition-colors text-white whitespace-nowrap interactive-element">
            <span className="text-lg">📍</span>
            <span className="font-bold text-sm tracking-wider uppercase">Map</span>
          </button>
          <div className="w-px h-8 bg-white/20 flex-shrink-0"></div>
          <button className="flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-full hover:bg-white/10 transition-colors text-white whitespace-nowrap interactive-element">
            <span className="text-lg">🔥</span>
            <span className="font-bold text-sm tracking-wider uppercase">Climate Change</span>
          </button>
          <div className="w-px h-8 bg-white/20 flex-shrink-0"></div>
          <button className="flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-full hover:bg-white/10 transition-colors text-white whitespace-nowrap interactive-element">
            <span className="text-lg">🌈</span>
            <span className="font-bold text-sm tracking-wider uppercase">AQI Near Me?</span>
          </button>
        </div>
      </div>
    </div>
  );
};
