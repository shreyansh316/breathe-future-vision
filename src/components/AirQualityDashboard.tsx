import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, Droplets, Wind, Sun, ChevronRight, ChevronLeft, Calendar as CalendarIcon, ArrowUpRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBackendTelemetry } from '@/hooks/useBackendTelemetry';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const AirQualityDashboard = () => {
  const [sliderAnim, setSliderAnim] = useState(false);
  const [selectedCity, setSelectedCity] = useState('jaipur'); // Map this to dropdown later if needed
  
  // Real-time backend integrated telemetry (WebSocket Push)
  const { data: liveData, isLoading, error, isConnected } = useBackendTelemetry(selectedCity, {
    aqi: 78,
    pm25: 23,
    pm10: 102,
    temperature: 32.0,
    humidity: 56,
  });

  // Scroll reveal
  const { ref: dashboardRef, isVisible } = useScrollReveal();

  useEffect(() => {
    // Trigger animation for the slider pin on mount
    const timer = setTimeout(() => setSliderAnim(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Procedural Calendar Data
  const generateCalendar = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      let aqi = 60 + Math.random() * 60; // 60 to 120 mostly
      if (i % 7 === 0) aqi += 40; // some spikes
      
      let colorClass = "bg-yellow-400/80 text-yellow-900";
      if (aqi <= 50) colorClass = "bg-green-400/80 text-green-900";
      else if (aqi <= 100) colorClass = "bg-yellow-400/80 text-yellow-900";
      else if (aqi <= 150) colorClass = "bg-orange-400/80 text-orange-900";
      else if (aqi <= 200) colorClass = "bg-red-400/80 text-red-900";
      else colorClass = "bg-purple-400/80 text-purple-900";

      days.push({ day: i, aqi: Math.round(aqi), colorClass, isFuture: i > 25 });
    }
    return days;
  };

  const calendarDays = generateCalendar();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div 
      ref={dashboardRef}
      className={`w-full max-w-6xl mx-auto space-y-8 relative z-20 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      
      {/* Main Dashboard Card */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-50 border-amber-200 shadow-2xl rounded-3xl">
        
        {/* City Skyline Background Silhouette */}
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-10 pointer-events-none flex items-end justify-around">
          {/* Abstract SVG representing city buildings/monuments */}
          <svg viewBox="0 0 1000 100" className="w-full h-full fill-amber-900" preserveAspectRatio="none">
            <path d="M0,100 L0,80 L20,80 L20,60 L40,60 L40,80 L60,80 L60,40 L80,40 L80,50 L100,50 L100,30 L120,30 L120,70 L140,70 L140,20 L160,20 L160,80 L180,80 L180,50 L200,50 L200,100 Z" />
            <path d="M200,100 L200,40 L220,40 L220,60 L240,60 L240,20 L260,20 L260,70 L280,70 L280,30 L300,30 L300,80 L320,80 L320,10 L340,10 L340,60 L360,60 L360,90 L380,90 L380,50 L400,50 L400,100 Z" />
            {/* Repeating pattern for width */}
            <path d="M400,100 L400,80 L420,80 L420,60 L440,60 L440,80 L460,80 L460,40 L480,40 L480,50 L500,50 L500,30 L520,30 L520,70 L540,70 L540,20 L560,20 L560,80 L580,80 L580,50 L600,50 L600,100 Z" />
            <path d="M600,100 L600,40 L620,40 L620,60 L640,60 L640,20 L660,20 L660,70 L680,70 L680,30 L700,30 L700,80 L720,80 L720,10 L740,10 L740,60 L760,60 L760,90 L780,90 L780,50 L800,50 L800,100 Z" />
            <path d="M800,100 L800,80 L820,80 L820,60 L840,60 L840,80 L860,80 L860,40 L880,40 L880,50 L900,50 L900,30 L920,30 L920,70 L940,70 L940,20 L960,20 L960,80 L980,80 L980,50 L1000,50 L1000,100 Z" />
          </svg>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
          
          {/* Left Section: Live AQI Status */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-3xl font-black text-amber-950 tracking-tight">Air Quality Index</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-amber-800 font-medium">{selectedCity.toUpperCase()} Sensor Node</span>
                  <div className={`flex items-center space-x-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${isConnected ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    <div className="relative flex h-2 w-2 items-center justify-center">
                      {isConnected && (
                        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                      )}
                      <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`}></span>
                    </div>
                    <span>{isConnected ? 'LIVE FEED' : 'CONNECTING...'}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-7xl font-black text-amber-950 transition-all duration-500 font-mono tracking-tighter">
              {liveData.aqi}
            </div>
            
            <div className="flex space-x-6 text-sm font-medium text-amber-900">
              <div className="flex items-center space-x-1"><Leaf className="w-4 h-4" /> <span className="font-mono tracking-tighter">PM2.5: {liveData.pm25} µg/m³</span></div>
              <div className="flex items-center space-x-1"><Leaf className="w-4 h-4 opacity-50" /> <span className="font-mono tracking-tighter">PM10: {liveData.pm10} µg/m³</span></div>
            </div>

            {/* Linear Slider Scale */}
            <div className="pt-4">
              <div className="h-3 w-full rounded-full bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 via-pink-500 via-purple-600 to-red-600 relative shadow-inner">
                {/* Pin indicator */}
                <div 
                  className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-yellow-500 rounded-full shadow-md transition-all duration-1000 ease-out`}
                  style={{ left: sliderAnim ? '35%' : '0%' }}
                />
              </div>
              <div className="flex justify-between text-[10px] uppercase font-bold text-amber-700/60 mt-2">
                <span>Good</span>
                <span>Mod</span>
                <span>Poor</span>
                <span>UnH</span>
                <span>Sev</span>
                <span>Haz</span>
              </div>
            </div>
          </div>

          {/* Center Section: Illustration */}
          <div className="flex items-center justify-center p-4">
            {/* Abstract representation of boy in kurta using stylized SVG */}
            <div className="w-48 h-48 bg-white/40 rounded-full backdrop-blur-sm border-4 border-white/50 flex items-center justify-center shadow-xl transform transition-transform hover:scale-105 duration-300">
              <svg viewBox="0 0 100 100" className="w-32 h-32 opacity-80" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="50" cy="30" r="15" fill="#FDE68A" />
                {/* Torso/Kurta */}
                <path d="M30 90 L35 50 L65 50 L70 90 Z" fill="#FCD34D" strokeLinejoin="round" />
                {/* Scarf/Details */}
                <path d="M40 50 L50 70 L60 50" stroke="#B45309" strokeWidth="3" strokeLinejoin="round" />
                {/* Wind lines */}
                <path d="M10 40 Q 20 30, 30 40 T 50 40" stroke="#78350F" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
                <path d="M5 60 Q 15 50, 25 60 T 45 60" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" className="animate-pulse" style={{ animationDelay: '500ms' }} />
              </svg>
            </div>
          </div>

          {/* Right Section: Glassmorphism Weather Widget */}
          <div className="flex items-center justify-end">
            <div className="w-full max-w-sm glass-panel rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
              {/* Top-right button */}
              <button className="absolute top-4 right-4 w-8 h-8 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors duration-300">
                <ArrowUpRight className="w-4 h-4 text-amber-900 group-hover:scale-110 transition-transform" />
              </button>

              <div className="mb-6">
                <div className="flex items-center space-x-4">
                  <Sun className="w-12 h-12 text-yellow-600 drop-shadow-md" />
                  <div>
                    <div className="text-4xl font-light text-amber-950 transition-all duration-500 font-mono tracking-tighter">{liveData.temperature}°C</div>
                    <div className="text-sm font-semibold text-amber-800 uppercase tracking-wider">Mist</div>
                  </div>
                </div>
              </div>

              {/* 3-Column Split */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-amber-900/10">
                <div className="text-center group/item hover:-translate-y-1 transition-transform">
                  <Droplets className="w-5 h-5 mx-auto text-amber-700 mb-1" />
                  <div className="text-lg font-bold text-amber-950 transition-all duration-500 font-mono tracking-tighter">{liveData.humidity}%</div>
                  <div className="text-[10px] uppercase font-bold text-amber-800/60">Humidity</div>
                </div>
                <div className="text-center border-l border-r border-amber-900/10 group/item hover:-translate-y-1 transition-transform">
                  <Wind className="w-5 h-5 mx-auto text-amber-700 mb-1" />
                  <div className="text-lg font-bold text-amber-950 font-mono tracking-tighter">25.2</div>
                  <div className="text-[10px] uppercase font-bold text-amber-800/60">Wind km/h</div>
                </div>
                <div className="text-center group/item hover:-translate-y-1 transition-transform">
                  <Sun className="w-5 h-5 mx-auto text-amber-700 mb-1 opacity-80" />
                  <div className="text-lg font-bold text-amber-950 font-mono tracking-tighter">6.4</div>
                  <div className="text-[10px] uppercase font-bold text-amber-800/60">UV Index</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Card>

      {/* Air Quality Calendar Section */}
      <Card className="bg-[#1C2127] border-gray-800 rounded-3xl p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-100 flex items-center">
              <CalendarIcon className="w-6 h-6 mr-3 text-blue-400" />
              Air Quality Calendar 2026
            </h2>
            <p className="text-gray-400 text-sm mt-1">Jaipur, Rajasthan</p>
          </div>
          
          <div className="flex space-x-3">
            <Select defaultValue="2026">
              <SelectTrigger className="w-[100px] bg-gray-800/50 border-gray-700 text-gray-200">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="aqi">
              <SelectTrigger className="w-[120px] bg-gray-800/50 border-gray-700 text-gray-200">
                <SelectValue placeholder="Metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aqi">AQI (US)</SelectItem>
                <SelectItem value="pm25">PM2.5</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="mb-6">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-xs font-bold text-gray-500 uppercase">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2 sm:gap-4">
            {/* Empty slots for month offset (e.g. starting on a Wed) */}
            <div className="aspect-square rounded-xl bg-gray-800/20" />
            <div className="aspect-square rounded-xl bg-gray-800/20" />
            <div className="aspect-square rounded-xl bg-gray-800/20" />
            
            {calendarDays.map((day) => (
              <div 
                key={day.day} 
                className="aspect-square relative rounded-xl bg-gray-800/40 border border-gray-700/50 p-2 flex flex-col items-center justify-between group interactive-element cursor-pointer"
              >
                <span className="text-[10px] sm:text-xs text-gray-400 font-medium w-full text-left">{day.day} May</span>
                {day.isFuture ? (
                  <div 
                    className="w-full flex-1 flex items-center justify-center rounded-lg bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,255,0.05)_2px,rgba(255,255,255,0.05)_4px)] cursor-help"
                    title="Data Pending Inversion"
                  ></div>
                ) : (
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg ${day.colorClass} group-hover:ring-4 ring-black/20 transition-all`}>
                    {day.aqi}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-800 gap-4">
          <div className="flex items-center space-x-1 sm:space-x-2 text-[10px] uppercase font-bold text-gray-400">
            <span>Legend:</span>
            <div className="flex space-x-1">
              <span className="w-3 h-3 rounded-sm bg-green-400" title="Good"></span>
              <span className="w-3 h-3 rounded-sm bg-yellow-400" title="Moderate"></span>
              <span className="w-3 h-3 rounded-sm bg-orange-400" title="Poor"></span>
              <span className="w-3 h-3 rounded-sm bg-red-400" title="Unhealthy"></span>
              <span className="w-3 h-3 rounded-sm bg-purple-400" title="Severe"></span>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-300 hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-300 hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </Card>
    </div>
  );
};
