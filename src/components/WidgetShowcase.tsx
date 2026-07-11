import React, { useState } from 'react';
import { ArrowUpRight, CloudRain, Wind, Activity } from 'lucide-react';

export const WidgetShowcase = () => {
  const [activeTab, setActiveTab] = useState('Widgets');
  const tabs = ['Mobile App', 'Smart TV App', 'Web Dashboard', 'API', 'Widgets'];

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-8 py-20 relative z-20">
      
      {/* Top Segmented Control */}
      <div className="flex justify-center mb-10">
        <div className="bg-[#1a1d20] border border-gray-800 rounded-full p-1 inline-flex space-x-1 shadow-lg">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === tab 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-gradient-to-br from-[#1a1d20] to-[#121416] border border-gray-800 rounded-[2.5rem] p-8 lg:p-16 shadow-2xl relative overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Overlapping Mockups */}
          <div className="relative h-[400px] sm:h-[500px] w-full flex items-center justify-center lg:justify-start">
            
            {/* Screen 1: AQI + Weather (Background Left) */}
            <div className="absolute top-10 left-0 sm:left-4 z-10 w-64 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-gray-100 p-5 transform -rotate-6 hover:rotate-0 hover:z-40 hover:scale-105 transition-all duration-500">
              <div className="flex justify-between items-center mb-4">
                <div className="font-bold text-gray-800">Jaipur</div>
                <CloudRain className="w-5 h-5 text-gray-500" />
              </div>
              <div className="flex justify-center mb-4 relative">
                {/* Arc Gauge Simulation */}
                <div className="w-32 h-16 border-t-[12px] border-l-[12px] border-r-[12px] border-green-400 rounded-t-full relative">
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-4xl font-black text-gray-800">42</div>
                </div>
              </div>
              <div className="bg-green-100 text-green-700 text-center font-bold py-1.5 rounded-lg mb-4 text-sm">GOOD</div>
              <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>32°C</span>
                <span>Humidity: 45%</span>
              </div>
              {/* Speech bubble tail */}
              <div className="absolute -bottom-3 left-8 w-6 h-6 bg-white border-b-4 border-l-4 border-gray-100 transform -rotate-45" />
            </div>

            {/* Screen 2: Multi-location Grid (Center Right) */}
            <div className="absolute top-24 right-0 sm:right-4 z-20 w-72 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-gray-100 p-4 transform rotate-3 hover:rotate-0 hover:z-40 hover:scale-105 transition-all duration-500">
              <div className="font-bold text-gray-800 mb-3 px-1 text-sm">Saved Locations</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { city: 'Delhi', aqi: 185, col: 'bg-red-100 text-red-700' },
                  { city: 'Mumbai', aqi: 75, col: 'bg-yellow-100 text-yellow-700' },
                  { city: 'Pune', aqi: 45, col: 'bg-green-100 text-green-700' },
                  { city: 'Agra', aqi: 120, col: 'bg-orange-100 text-orange-700' },
                ].map(loc => (
                  <div key={loc.city} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <div className="text-[10px] text-gray-500 font-bold mb-1">{loc.city}</div>
                    <div className={`text-sm font-black w-full text-center py-1 rounded-md ${loc.col}`}>{loc.aqi}</div>
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-3 right-12 w-6 h-6 bg-white border-b-4 border-r-4 border-gray-100 transform rotate-45" />
            </div>

            {/* Screen 3: AQI + Parameters (Bottom Center) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 w-72 bg-white rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] border-4 border-gray-100 p-5 transform hover:-translate-y-4 hover:scale-105 transition-all duration-500">
              <div className="flex items-center space-x-2 mb-4 text-gray-800 font-bold">
                <Activity className="w-5 h-5 text-blue-500" />
                <span>Detailed Analysis</span>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                <div className="flex justify-between items-end mb-2">
                  <div className="text-3xl font-black text-gray-800">112</div>
                  <div className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-md mb-1">POOR</div>
                </div>
                <div className="h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-orange-500 rounded-full w-full relative">
                  <div className="absolute top-1/2 -translate-y-1/2 right-4 w-3 h-3 bg-white border-2 border-orange-500 rounded-full shadow-sm" />
                </div>
              </div>
              
              {/* Pollutant Breakdown */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'PM2.5', val: '45' },
                  { name: 'PM10', val: '112' },
                  { name: 'O3', val: '22' }
                ].map(p => (
                  <div key={p.name} className="text-center">
                    <div className="text-[10px] text-gray-400 font-bold mb-0.5">{p.name}</div>
                    <div className="text-xs font-bold text-gray-800">{p.val}</div>
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-b-4 border-r-4 border-gray-100 transform rotate-45" />
            </div>

          </div>

          {/* Right Side: Marketing Text */}
          <div className="text-center lg:text-left space-y-6 max-w-lg mx-auto lg:mx-0 relative z-40">
            <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-sm rounded-full tracking-wider uppercase">
              Widgets
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              Free AQI Widgets:<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Easy Integration for Real-Time Air Quality!
              </span>
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed">
              Embed pixel-perfect, hyper-local air quality intelligence directly into your website or application. Zero configuration, completely customizable, and always real-time.
            </p>
            
            <button className="bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold py-4 px-8 rounded-full flex items-center justify-center mx-auto lg:mx-0 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] group">
              Get Widgets
              <ArrowUpRight className="ml-2 h-5 w-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
