import React, { useState, useEffect } from 'react';
import { Command } from 'cmdk';
import { Search, Bot, MapPin, Activity, Settings, User } from 'lucide-react';
import { usePollutionData } from '@/hooks/usePollutionData';

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const { cities } = usePollutionData();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4 backdrop-blur-md bg-black/40">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={() => setOpen(false)} />
      
      <div className="relative w-full max-w-2xl bg-[#0a0f16]/90 border border-white/10 rounded-xl shadow-2xl overflow-hidden glass-panel">
        <Command label="Global Command Menu" className="w-full flex flex-col">
          <div className="flex items-center border-b border-white/10 px-4">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <Command.Input 
              placeholder="Ask AakaashSetu AI or search cities..." 
              className="flex-1 bg-transparent border-0 outline-none text-gray-200 placeholder-gray-500 py-4 px-3 text-lg font-mono tracking-tighter"
              autoFocus
            />
          </div>

          <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-800">
            <Command.Empty className="py-6 text-center text-sm text-gray-500">
              No results found. Type to query AakaashSetu AI.
            </Command.Empty>

            <Command.Group heading="AakaashSetu AI" className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-widest mt-2 mb-1">
              <Command.Item className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-lg hover:bg-white/10 cursor-pointer data-[selected=true]:bg-white/10 transition-colors">
                <Bot className="w-4 h-4 text-emerald-400" />
                <span>Explain the current AQI situation in my area</span>
              </Command.Item>
              <Command.Item className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-lg hover:bg-white/10 cursor-pointer data-[selected=true]:bg-white/10 transition-colors">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Predict tomorrow's PM2.5 levels</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Major Cities" className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-widest mt-4 mb-1">
              {cities.slice(0, 5).map(city => (
                <Command.Item key={city.name} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-lg hover:bg-white/10 cursor-pointer data-[selected=true]:bg-white/10 transition-colors">
                  <MapPin className="w-4 h-4 text-sky-400" />
                  <span>{city.name}</span>
                  <span className="ml-auto text-xs font-mono text-gray-500">AQI: {city.aqi}</span>
                </Command.Item>
              ))}
            </Command.Group>
            
            <Command.Group heading="System" className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-widest mt-4 mb-1">
              <Command.Item className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-lg hover:bg-white/10 cursor-pointer data-[selected=true]:bg-white/10 transition-colors">
                <Settings className="w-4 h-4 text-gray-400" />
                <span>Preferences</span>
              </Command.Item>
              <Command.Item className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-lg hover:bg-white/10 cursor-pointer data-[selected=true]:bg-white/10 transition-colors">
                <User className="w-4 h-4 text-gray-400" />
                <span>Account Profile</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
        
        <div className="bg-black/50 px-4 py-2 text-xs text-gray-500 flex justify-between items-center border-t border-white/5">
          <span>Powered by AakaashSetu NLP</span>
          <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};
