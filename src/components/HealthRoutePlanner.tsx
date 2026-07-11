import React, { useState } from 'react';
import { Map, Navigation, ShieldCheck, Heart, Wind, AlertTriangle, Route } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const HealthRoutePlanner = () => {
  const [activeRoute, setActiveRoute] = useState<'fastest' | 'healthiest'>('healthiest');

  const routes = {
    fastest: {
      name: 'Fastest Route',
      time: '24 mins',
      distance: '6.2 km',
      avgAqi: 245, // Unhealthy
      pm25Exposure: '85 μg',
      color: 'bg-red-500',
      icon: Navigation
    },
    healthiest: {
      name: 'Eco-Safe Route',
      time: '28 mins',
      distance: '7.1 km',
      avgAqi: 110, // Poor but better
      pm25Exposure: '32 μg',
      color: 'bg-emerald-500',
      icon: Heart
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 py-16">
      <div className="mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full mb-4 border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-sm font-bold tracking-wide">ECO-ROUTING ENGINE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-100 mb-4 tracking-tight">Safe Navigation</h2>
          <p className="text-slate-400 text-lg">
            Bypassing pollution hotspots. Calculate walking and cycling routes that minimize your exposure to severe PM2.5 and PM10 concentrations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Route Selection Panel */}
        <div className="lg:col-span-1 space-y-4">
          {(Object.keys(routes) as Array<keyof typeof routes>).map((key) => {
            const route = routes[key];
            const Icon = route.icon;
            const isActive = activeRoute === key;
            
            return (
              <Card 
                key={key}
                onClick={() => setActiveRoute(key)}
                className={`p-6 cursor-pointer transition-all duration-300 border-2 ${
                  isActive 
                    ? `border-${route.color.split('-')[1]}-500 bg-slate-900 shadow-lg` 
                    : 'border-slate-800 bg-slate-900/50 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${isActive ? route.color : 'bg-slate-800'} ${isActive ? 'text-white' : 'text-slate-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`font-bold ${isActive ? 'text-slate-100' : 'text-slate-300'}`}>{route.name}</h3>
                      <p className="text-sm text-slate-500">{route.time} • {route.distance}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400 flex items-center"><Wind className="w-4 h-4 mr-2" /> Avg AQI Encountered</span>
                    <span className={`font-bold ${route.avgAqi > 200 ? 'text-red-400' : 'text-emerald-400'}`}>{route.avgAqi}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400 flex items-center"><AlertTriangle className="w-4 h-4 mr-2" /> Total PM2.5 Exposure</span>
                    <span className="font-bold text-slate-200">{route.pm25Exposure}</span>
                  </div>
                </div>
              </Card>
            );
          })}

          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <h4 className="text-blue-400 font-bold mb-2 flex items-center"><Route className="w-4 h-4 mr-2" /> Why choose Eco-Safe?</h4>
            <p className="text-sm text-slate-300">
              The Eco-Safe route takes 4 minutes longer but avoids the industrial corridor, reducing your particle inhalation by over <strong className="text-emerald-400">60%</strong>.
            </p>
          </div>
        </div>

        {/* Map Visualization Panel */}
        <div className="lg:col-span-2 relative min-h-[400px] lg:min-h-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl flex items-center justify-center">
          {/* Abstract Map Background Simulation */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>
          
          {/* Map Content */}
          <div className="relative z-10 w-full h-full p-8 flex flex-col items-center justify-center">
            
            <div className="relative w-full max-w-lg aspect-square">
              {/* Hotspots Simulation */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/20 blur-2xl rounded-full"></div>
              <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-purple-500/20 blur-2xl rounded-full"></div>
              
              {/* Route SVGs */}
              <svg className="w-full h-full drop-shadow-xl" viewBox="0 0 100 100">
                {/* Fastest Route (Red, intersects hotspots) */}
                <path 
                  d="M10,90 Q50,50 90,10" 
                  fill="none" 
                  stroke={activeRoute === 'fastest' ? '#EF4444' : '#334155'} 
                  strokeWidth="2" 
                  strokeDasharray="4,2" 
                  className={`transition-all duration-500 ${activeRoute === 'fastest' ? 'opacity-100' : 'opacity-30'}`}
                />
                
                {/* Healthiest Route (Green, bypasses hotspots) */}
                <path 
                  d="M10,90 Q10,20 90,10" 
                  fill="none" 
                  stroke={activeRoute === 'healthiest' ? '#10B981' : '#334155'} 
                  strokeWidth="3" 
                  className={`transition-all duration-500 ${activeRoute === 'healthiest' ? 'opacity-100' : 'opacity-30'}`}
                />
                
                {/* Points */}
                <circle cx="10" cy="90" r="3" fill="#FFF" />
                <circle cx="90" cy="10" r="3" fill="#FFF" />
                
                {/* Labels */}
                <text x="5" y="98" fill="#94A3B8" fontSize="4" fontWeight="bold">HOME</text>
                <text x="85" y="8" fill="#94A3B8" fontSize="4" fontWeight="bold">OFFICE</text>
              </svg>
            </div>

            {/* Active Route HUD */}
            <div className="absolute bottom-6 left-6 right-6 glass-panel rounded-xl p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Map className={`w-6 h-6 ${activeRoute === 'healthiest' ? 'text-emerald-400' : 'text-red-400'}`} />
                <div>
                  <div className="text-white font-bold tracking-wide">Navigating to Office</div>
                  <div className="text-xs text-slate-400">Arriving in {routes[activeRoute].time}</div>
                </div>
              </div>
              <button className="bg-white text-slate-900 px-6 py-2 rounded-lg font-bold text-sm hover:bg-slate-200 transition-colors">
                Start Route
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
