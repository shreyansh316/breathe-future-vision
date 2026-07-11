import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Satellite, Activity, Map } from 'lucide-react';
import { AnimatedLogo } from './AnimatedLogo';
import { SmartSearchBar } from './SmartSearchBar';
import { LanguageSelector } from './LanguageSelector';

export const Hero = () => {
  const scrollToMap = () => {
    document.getElementById('pollution-map')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-[#0B0F19]">
      {/* Grid Pattern Background for technical feel */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.5)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none"></div>
      
      {/* Language Selector */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSelector />
      </div>

      <div className="text-center max-w-6xl mx-auto mb-8 sm:mb-12 pt-20 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-900/50 bg-sky-900/20 text-sky-400 text-xs font-mono uppercase tracking-widest mb-6">
          <Satellite className="w-3 h-3" />
          Live Copernicus Sentinel-5P Telemetry Active
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight px-4 font-sans tracking-tight">
          High-Resolution Satellite AOD Inversion & <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
            Hyperlocal Air Quality Forecasting.
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed px-4 font-light">
          Proprietary geospatial analytics engine integrating CPCB ground truth with real-time Earth Observation datasets for precision atmospheric modeling.
        </p>

        {/* Smart Search Bar */}
        <div className="w-full max-w-2xl mx-auto mb-12 px-4 relative">
          <div className="absolute inset-0 bg-sky-500/10 blur-3xl -z-10 rounded-full"></div>
          <SmartSearchBar />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 px-4">
          <Button 
            onClick={scrollToMap}
            className="bg-sky-600 hover:bg-sky-500 text-white px-8 py-6 text-sm font-semibold rounded-lg shadow-lg hover:shadow-sky-500/25 transition-all duration-300 flex gap-2"
          >
            <Map className="w-4 h-4" /> Initialize Map Viewer
          </Button>
          <Button 
            variant="outline"
            className="border-slate-700 bg-slate-800/50 text-white hover:bg-slate-700 hover:text-white px-8 py-6 text-sm font-semibold rounded-lg transition-all duration-300 flex gap-2 backdrop-blur-md"
          >
            <Activity className="w-4 h-4" /> View Model Validation
          </Button>
        </div>

        {/* Engineering Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8 px-4 w-full">
          <div className="bg-[#111827]/80 backdrop-blur-md border border-slate-800 rounded-xl p-6 text-center shadow-2xl">
            <div className="text-3xl font-mono font-bold text-emerald-400 mb-1">150+</div>
            <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Active CPCB Nodes</div>
          </div>
          <div className="bg-[#111827]/80 backdrop-blur-md border border-slate-800 rounded-xl p-6 text-center shadow-2xl">
            <div className="text-3xl font-mono font-bold text-sky-400 mb-1">4.2</div>
            <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Mean Absolute Error (µg/m³)</div>
          </div>
          <div className="bg-[#111827]/80 backdrop-blur-md border border-slate-800 rounded-xl p-6 text-center shadow-2xl">
            <div className="text-3xl font-mono font-bold text-indigo-400 mb-1">0.94</div>
            <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Validation R² Score</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ArrowDown className="text-slate-500 hover:text-sky-400 transition-colors w-6 h-6 cursor-pointer" onClick={scrollToMap} />
      </div>
    </section>
  );
};
