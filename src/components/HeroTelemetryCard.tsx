import React, { useEffect, useState } from 'react';
import { Sun, Wind, Droplets, ArrowUpRight, CloudRain, Leaf } from 'lucide-react';
import { useRealTimeTelemetry } from '@/hooks/useRealTimeTelemetry';

export const HeroTelemetryCard = () => {
  const [mounted, setMounted] = useState(false);
  const liveData = useRealTimeTelemetry({
    aqi: 78,
    pm25: 23,
    pm10: 162,
    temperature: 32,
    humidity: 56,
    wind: 25.2,
    uv: 6.4
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculateSliderPosition = (aqi: number) => {
    // 0 to 500 scale mapped to 0% to 100%
    return Math.min(Math.max((aqi / 500) * 100, 0), 100);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 relative mt-20">
      {/* Light warm background contrasting with the dark mode app */}
      <div className="relative w-full rounded-[2rem] overflow-hidden bg-[#FFF8E1] shadow-2xl min-h-[400px]">
        
        {/* City Skyline Silhouette Background */}
        <div 
          className="absolute bottom-0 left-0 w-full h-48 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 200'%3E%3Cpath fill='%23BCAAA4' d='M0,200 L0,150 L50,150 L50,120 L80,120 L80,160 L120,160 L120,80 L180,80 L180,140 L220,140 L220,100 L260,100 L260,170 L300,170 L300,90 L350,90 L350,130 L400,130 L400,60 L450,60 L450,150 L500,150 L500,110 L550,110 L550,180 L600,180 L600,70 L660,70 L660,140 L700,140 L700,100 L750,100 L750,160 L800,160 L800,80 L850,80 L850,150 L900,150 L900,120 L950,120 L950,170 L1000,170 L1000,200 Z'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat-x',
            backgroundPosition: 'bottom',
            backgroundSize: '1000px 200px'
          }}
        />

        <div className="relative z-10 p-6 md:p-12 flex flex-col md:flex-row justify-between items-center h-full gap-8 md:gap-4">
          
          {/* Left: AQI Info */}
          <div className="flex-1 flex flex-col space-y-4 md:space-y-6 w-full text-center md:text-left items-center md:items-start">
            <div>
              <h2 className="text-4xl font-black text-[#3E2723] mb-1 font-sans tracking-tight">Air Quality Index</h2>
              <div className="flex items-center space-x-2 text-[#5D4037] font-semibold text-sm">
                <span className="uppercase tracking-wider">JAIPUR Sensor Node</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8F00] animate-ping"></span>
                <span className="text-[#FF8F00] text-xs">CONNECTING...</span>
              </div>
            </div>

            <div className="text-[5rem] md:text-[6rem] font-black text-[#3E2723] leading-none tracking-tighter">
              {liveData.aqi}
            </div>

            <div className="flex space-x-4 md:space-x-6 text-[#5D4037] font-mono font-bold text-sm md:text-base">
              <span className="flex items-center"><Leaf className="w-4 h-4 mr-1 text-[#4CAF50]" /> PM2.5: {liveData.pm25} μg/m³</span>
              <span className="flex items-center"><Wind className="w-4 h-4 mr-1 text-[#8D6E63]" /> PM10: {liveData.pm10} μg/m³</span>
            </div>

            {/* AQI Gradient Slider */}
            <div className="w-full max-w-md mt-6">
              <div className="relative h-3 rounded-full bg-gradient-to-r from-[#10B981] via-[#F59E0B] to-[#7F1D1D] mb-2">
                {/* Tracking Marker */}
                <div 
                  className="absolute top-1/2 -mt-2.5 w-5 h-5 bg-white border-2 border-[#FF8F00] rounded-full shadow-lg transition-all duration-1000 ease-out"
                  style={{ left: `${mounted ? calculateSliderPosition(liveData.aqi) : 0}%`, transform: 'translateX(-50%)' }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-[#8D6E63] uppercase tracking-wider">
                <span>Good</span>
                <span>Mod</span>
                <span>Poor</span>
                <span>Unh</span>
                <span>Sev</span>
                <span>Haz</span>
              </div>
            </div>
          </div>

          {/* Center: Avatar */}
          <div className="flex-1 flex justify-center items-center relative z-20 w-full my-4 md:my-0">
            {/* The animation speed maps to AQI. Higher AQI = faster, stressful breathing */}
            <div className={`w-40 h-40 md:w-48 md:h-48 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/60 shadow-[0_0_50px_rgba(255,255,255,0.5)] ${liveData.aqi > 200 ? 'animate-breathe-fast' : liveData.aqi > 100 ? 'animate-breathe-medium' : 'animate-breathe-slow'}`}>
              {/* Abstract avatar graphic simulating breathing */}
              <div className="relative scale-75 md:scale-100">
                <div className="w-16 h-16 rounded-full border-4 border-[#3E2723] bg-[#FFE082] mx-auto z-10 relative"></div>
                <div className="w-24 h-24 border-t-0 border-x-4 border-b-4 border-[#3E2723] bg-[#FFD54F] rounded-b-xl -mt-2 relative z-0">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-12 border-b-2 border-[#3E2723] rotate-45 opacity-30"></div>
                </div>
                {/* Wind lines */}
                <svg className="absolute top-4 -left-12 w-16 h-8 text-[#8D6E63]" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M10,10 Q30,5 50,15 T90,15" className="animate-pulse" />
                  <path d="M20,30 Q40,25 60,35 T90,25" className="animate-pulse delay-150" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right: Weather Widget Overlap */}
          <div className="flex-1 flex justify-center md:justify-end w-full md:w-auto relative z-30">
            <div className="bg-[#2D333B] text-white p-5 md:p-6 rounded-3xl shadow-2xl w-full max-w-xs border border-slate-700/50 transform md:translate-x-4 md:-translate-y-4">
              <button className="absolute top-4 right-4 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-slate-600 transition-colors">
                <ArrowUpRight className="w-4 h-4 text-slate-300" />
              </button>
              
              <div className="flex items-center mb-8">
                <Sun className="w-12 h-12 text-[#FF8F00] mr-4" />
                <div>
                  <div className="text-4xl font-light tracking-tighter text-[#FF8F00]">{liveData.temperature}°C</div>
                  <div className="text-sm font-bold text-[#FF8F00] tracking-widest uppercase">Mist</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center border-t border-slate-700/50 pt-6">
                <div>
                  <Droplets className="w-5 h-5 text-[#FF8F00] mx-auto mb-2" />
                  <div className="font-bold text-[#FF8F00]">{liveData.humidity}%</div>
                  <div className="text-[9px] uppercase tracking-widest text-[#FF8F00]/60 font-bold mt-1">Humidity</div>
                </div>
                <div className="border-x border-slate-700/50">
                  <Wind className="w-5 h-5 text-[#FF8F00] mx-auto mb-2" />
                  <div className="font-bold text-[#FF8F00]">{liveData.wind}</div>
                  <div className="text-[9px] uppercase tracking-widest text-[#FF8F00]/60 font-bold mt-1">Wind KM/H</div>
                </div>
                <div>
                  <Sun className="w-5 h-5 text-[#FF8F00] mx-auto mb-2 opacity-50" />
                  <div className="font-bold text-[#FF8F00]">{liveData.uv}</div>
                  <div className="text-[9px] uppercase tracking-widest text-[#FF8F00]/60 font-bold mt-1">UV Index</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
