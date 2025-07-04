
import React from 'react';
import { Satellite, Globe, Zap, Wind, Sun } from 'lucide-react';

export const AnimatedLogo = () => {
  return (
    <div className="flex items-center space-x-4 group cursor-pointer">
      <div className="relative">
        {/* Main satellite with Indian flag colors orbit */}
        <div className="relative w-14 h-14 animate-spin" style={{ animationDuration: '10s' }}>
          {/* Tricolor orbit rings */}
          <div className="absolute inset-0 border-2 border-orange-500/40 rounded-full animate-pulse"></div>
          <div className="absolute inset-1 border-2 border-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          <div className="absolute inset-2 border-2 border-green-600/40 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
          
          {/* Central satellite */}
          <Satellite className="w-7 h-7 text-[#00C853] absolute inset-0 m-auto transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" />
          
          {/* Ashoka Chakra inspired spinning element */}
          <div className="absolute inset-0 border border-blue-800/30 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
            <div className="w-1 h-1 bg-blue-800 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="w-1 h-1 bg-blue-800 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="w-1 h-1 bg-blue-800 rounded-full absolute left-0 top-1/2 transform -translate-y-1/2"></div>
            <div className="w-1 h-1 bg-blue-800 rounded-full absolute right-0 top-1/2 transform -translate-y-1/2"></div>
          </div>
        </div>
        
        {/* Signal waves with Indian tricolor */}
        <div className="absolute -top-2 -right-2">
          <div className="w-4 h-4 bg-orange-500 rounded-full animate-ping"></div>
          <div className="w-4 h-4 bg-white rounded-full absolute top-0 animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-4 h-4 bg-green-600 rounded-full absolute top-0 animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Sanskrit/Devanagari inspired decorative elements */}
        <div className="absolute -bottom-2 -left-2 text-[#FF6F00] text-xs animate-pulse">
          ॐ
        </div>
      </div>

      {/* Logo Text with Indian flavor */}
      <div className="flex flex-col">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-500 via-white to-green-600 bg-clip-text text-transparent animate-pulse">
          आकाशसेतु
        </h1>
        <h2 className="text-xl font-semibold bg-gradient-to-r from-[#00C853] via-[#FF6F00] to-[#263238] bg-clip-text text-transparent">
          AakaashSetu
        </h2>
        <p className="text-xs text-[#263238]/70 font-medium tracking-wide flex items-center space-x-1">
          <span>स्वच्छ वायु • Clean Air Intelligence</span>
          <Sun className="w-3 h-3 text-orange-500 animate-pulse" />
        </p>
      </div>

      {/* Enhanced floating elements with Indian theme */}
      <div className="hidden md:flex flex-col space-y-2">
        <div className="flex space-x-2">
          <Globe className="w-4 h-4 text-[#00C853] animate-bounce" style={{ animationDelay: '0.2s' }} />
          <Wind className="w-4 h-4 text-blue-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
          <Zap className="w-4 h-4 text-[#FF6F00] animate-bounce" style={{ animationDelay: '0.6s' }} />
        </div>
        <div className="text-xs text-[#263238]/60 font-medium text-center">
          भारत से
        </div>
      </div>
    </div>
  );
};
