import React from 'react';
import { Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ProductHeroCarousel = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-8 py-12">
      {/* Carousel Container */}
      <div className="w-full bg-gradient-to-r from-[#121416] via-[#1a1d20] to-[#2c3338] rounded-3xl overflow-hidden shadow-2xl border border-gray-800 relative">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Content Column */}
          <div className="p-10 lg:p-16 flex flex-col justify-center space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-xl font-bold text-white tracking-widest uppercase">Prana Air</span>
            </div>
            
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-2">Cair +</h1>
              <h2 className="text-xl md:text-2xl font-medium text-gray-400">Indoor Air Quality Monitor</h2>
            </div>
            
            <p className="text-gray-500 max-w-md leading-relaxed text-sm md:text-base">
              Track indoor air quality with advanced connectivity and portability for real-time air quality data. Perfect for homes, offices, and schools.
            </p>
            
            <div className="pt-4">
              <Button className="bg-white hover:bg-gray-200 text-black font-bold py-6 px-10 rounded-full shadow-lg transition-transform hover:scale-105">
                Know More
              </Button>
            </div>
          </div>

          {/* Right Content Column (Hardware Presentation) */}
          <div className="relative min-h-[300px] md:min-h-full flex items-center justify-center p-10">
            {/* Ambient glowing backdrop */}
            <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen" />
            
            {/* Sleek Hardware Device Mockup */}
            <div className="relative z-10 w-72 h-48 bg-gray-100 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] border-[8px] border-white overflow-hidden transform md:rotate-[-5deg] hover:rotate-0 transition-transform duration-700 flex flex-col">
              {/* Screen Screen UI */}
              <div className="flex-1 bg-[#1a1d20] p-4 flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Living Room</span>
                  <div className="flex space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  </div>
                </div>
                
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-gray-500 font-bold">AQI</div>
                    <div className="text-4xl font-black text-green-400">42</div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-[10px] text-gray-300 font-bold bg-white/10 px-2 py-0.5 rounded">PM2.5: 12</div>
                    <div className="text-[10px] text-gray-300 font-bold bg-white/10 px-2 py-0.5 rounded">CO2: 400</div>
                    <div className="text-[10px] text-gray-300 font-bold bg-white/10 px-2 py-0.5 rounded">Temp: 24°C</div>
                  </div>
                </div>
              </div>
              {/* Hardware Base Grill */}
              <div className="h-6 bg-gray-200 border-t border-gray-300 flex items-center justify-center space-x-1">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="w-0.5 h-3 bg-gray-300 rounded-full" />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center items-center space-x-3 mt-8">
        <button className="w-2 h-2 rounded-full bg-gray-600 hover:bg-gray-400 transition-colors" aria-label="Slide 1" />
        <button className="w-8 h-2 rounded-full bg-white transition-colors shadow-[0_0_10px_rgba(255,255,255,0.5)]" aria-label="Slide 2 (Active)" />
        <button className="w-2 h-2 rounded-full bg-gray-600 hover:bg-gray-400 transition-colors" aria-label="Slide 3" />
      </div>
    </div>
  );
};
