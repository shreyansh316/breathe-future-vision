import React, { useState } from 'react';
import { GlobalHeader } from '@/components/GlobalHeader';
import { AppFooter } from '@/components/AppFooter';
import { Code, Copy, LayoutTemplate, Palette, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const WidgetBuilder = () => {
  const { toast } = useToast();
  const [theme, setTheme] = useState('dark');
  const [size, setSize] = useState('standard');

  const widgetCode = `<iframe 
  src="https://vayurakshak.in/embed/aqi?theme=${theme}&size=${size}" 
  width="${size === 'wide' ? '600' : '300'}" 
  height="${size === 'tall' ? '400' : '250'}" 
  frameborder="0" 
  style="border-radius: 12px; border: 1px solid ${theme === 'dark' ? '#333' : '#e5e7eb'};"
></iframe>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(widgetCode);
    toast({
      title: "Copied to clipboard!",
      description: "You can now paste this HTML snippet into your website.",
    });
  };

  return (
    <div className="min-h-screen bg-[#121416] text-white flex flex-col selection:bg-emerald-500/30">
      <GlobalHeader />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-16 md:py-24">
        
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-6">
            <LayoutTemplate className="w-3 h-3 mr-2" /> Embedded Solutions
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
            Free AQI <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">Widgets</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Provide real-time air quality data directly on your blog or corporate website. Customize your widget below and copy the embed code instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Configuration Panel */}
          <div className="bg-[#1a1d20] border border-slate-800 p-8 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <Palette className="w-6 h-6 mr-3 text-emerald-400" /> Customize Design
            </h3>
            
            <div className="space-y-8">
              {/* Theme Selection */}
              <div>
                <label className="text-sm font-semibold text-slate-300 block mb-4">Color Theme</label>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setTheme('dark')}
                    className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-[#121416] border-slate-700 text-slate-400 hover:border-slate-500'}`}
                  >
                    {theme === 'dark' && <CheckCircle2 className="w-4 h-4 mr-2" />} Dark Mode
                  </button>
                  <button 
                    onClick={() => setTheme('light')}
                    className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center transition-all ${theme === 'light' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-[#121416] border-slate-700 text-slate-400 hover:border-slate-500'}`}
                  >
                    {theme === 'light' && <CheckCircle2 className="w-4 h-4 mr-2" />} Light Mode
                  </button>
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <label className="text-sm font-semibold text-slate-300 block mb-4">Widget Layout</label>
                <div className="grid grid-cols-3 gap-3">
                  {['standard', 'wide', 'tall'].map((s) => (
                    <button 
                      key={s}
                      onClick={() => setSize(s)}
                      className={`py-3 px-2 rounded-xl border text-sm capitalize transition-all ${size === s ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-[#121416] border-slate-700 text-slate-400 hover:border-slate-500'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Output */}
              <div className="pt-4 border-t border-slate-800">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-semibold text-slate-300 flex items-center">
                    <Code className="w-4 h-4 mr-2" /> Embed Code
                  </label>
                  <button 
                    onClick={copyToClipboard}
                    className="text-xs flex items-center text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20"
                  >
                    <Copy className="w-3 h-3 mr-1" /> Copy HTML
                  </button>
                </div>
                <div className="relative">
                  <pre className="bg-[#0b0c0e] border border-slate-800 p-4 rounded-xl text-emerald-400 text-xs font-mono overflow-x-auto">
                    <code>{widgetCode}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview Panel */}
          <div className="lg:sticky lg:top-24">
            <h3 className="text-xl font-bold text-white mb-6 pl-2">Live Preview</h3>
            
            <div className={`w-full rounded-3xl p-8 flex items-center justify-center transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0b0c0e] border border-slate-800' : 'bg-white border border-gray-200'}`}>
              
              {/* Mock Widget Visualizer */}
              <div 
                className={`transition-all duration-300 ${size === 'wide' ? 'w-full max-w-lg' : size === 'tall' ? 'w-[300px]' : 'w-[300px]'} ${theme === 'dark' ? 'bg-[#1a1d20] border-slate-700 text-white' : 'bg-gray-50 border-gray-200 text-slate-900'} border rounded-2xl p-6 shadow-2xl relative overflow-hidden`}
                style={{ height: size === 'tall' ? '400px' : '250px' }}
              >
                {/* Live Indicator */}
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  <span className={`text-[10px] font-bold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider`}>Live</span>
                </div>

                <div className="flex flex-col h-full">
                  <h4 className={`text-sm font-semibold mb-6 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>New Delhi, IN</h4>
                  
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-end gap-3 mb-2">
                      <span className="text-5xl font-black text-rose-500">342</span>
                      <span className={`text-sm font-bold pb-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>AQI</span>
                    </div>
                    <span className="inline-block px-3 py-1 bg-rose-500/10 text-rose-500 text-xs font-bold rounded-lg border border-rose-500/20 w-max">
                      Hazardous
                    </span>
                  </div>

                  <div className={`mt-auto pt-4 border-t ${theme === 'dark' ? 'border-slate-800 text-slate-500' : 'border-gray-200 text-slate-400'} text-[10px] flex justify-between`}>
                    <span>Powered by VayuRakshak</span>
                    <span>Updated 2m ago</span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

      </main>

      <AppFooter />
    </div>
  );
};

export default WidgetBuilder;
