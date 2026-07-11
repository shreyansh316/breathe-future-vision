import React from 'react';
import { Card } from '@/components/ui/card';
import { useAyurAQI } from '@/hooks/useAyurAQI';
import { Leaf, Droplets, Wind, Apple, Activity, HeartPulse } from 'lucide-react';

interface AyurAQIDashboardProps {
  currentAQI: number;
}

export const AyurAQIDashboard = ({ currentAQI }: AyurAQIDashboardProps) => {
  const { diet, yoga, lifestyle } = useAyurAQI(currentAQI);

  const getIcon = (type: string) => {
    switch (type) {
      case 'leaf': return <Leaf className="w-5 h-5" />;
      case 'water':
      case 'droplet': return <Droplets className="w-5 h-5" />;
      case 'wind':
      case 'lungs': return <Wind className="w-5 h-5" />;
      case 'fruit': return <Apple className="w-5 h-5" />;
      default: return <HeartPulse className="w-5 h-5" />;
    }
  };

  // Determine severity text for the header
  let severityText = "Normal Routine";
  if (currentAQI > 200) severityText = "Intensive Care Focus";
  else if (currentAQI > 100) severityText = "Preventative Focus";

  return (
    <Card className="p-6 bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] border-[#A5D6A7] shadow-xl relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -right-8 -top-8 text-[#A5D6A7] opacity-20 transform rotate-45 pointer-events-none">
        <Leaf className="w-48 h-48" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#2E7D32] flex items-center space-x-2">
              <Leaf className="w-6 h-6" />
              <span>AyurAQI Wellness Mode</span>
            </h2>
            <p className="text-[#388E3C] text-sm mt-1">
              Ancient wisdom adapting to today's air quality (AQI: <strong>{currentAQI}</strong>)
            </p>
          </div>
          <div className="bg-[#43A047] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
            {severityText}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Diet Section */}
          <div className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-white">
            <h3 className="text-lg font-bold text-[#2E7D32] mb-4 flex items-center border-b border-[#A5D6A7] pb-2">
              <Apple className="w-5 h-5 mr-2" /> Daily Diet
            </h3>
            <div className="space-y-4">
              {diet.map(tip => (
                <div key={tip.id} className="group">
                  <div className="font-semibold text-gray-800 flex items-center">
                    <span className="p-1.5 bg-[#E8F5E9] text-[#43A047] rounded-lg mr-2 group-hover:bg-[#43A047] group-hover:text-white transition-colors">
                      {getIcon(tip.iconType)}
                    </span>
                    {tip.title}
                  </div>
                  <p className="text-sm text-gray-600 mt-2 pl-9">{tip.description}</p>
                  <p className="text-xs text-[#2E7D32] mt-1 pl-9 italic font-medium">Why? {tip.benefits}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Yoga Section */}
          <div className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-white">
            <h3 className="text-lg font-bold text-[#2E7D32] mb-4 flex items-center border-b border-[#A5D6A7] pb-2">
              <Activity className="w-5 h-5 mr-2" /> Yoga & Breath
            </h3>
            <div className="space-y-4">
              {yoga.map(tip => (
                <div key={tip.id} className="group">
                  <div className="font-semibold text-gray-800 flex items-center">
                    <span className="p-1.5 bg-[#E8F5E9] text-[#43A047] rounded-lg mr-2 group-hover:bg-[#43A047] group-hover:text-white transition-colors">
                      {getIcon(tip.iconType)}
                    </span>
                    {tip.title}
                  </div>
                  <p className="text-sm text-gray-600 mt-2 pl-9">{tip.description}</p>
                  <p className="text-xs text-[#2E7D32] mt-1 pl-9 italic font-medium">Why? {tip.benefits}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Lifestyle Section */}
          <div className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-white">
            <h3 className="text-lg font-bold text-[#2E7D32] mb-4 flex items-center border-b border-[#A5D6A7] pb-2">
              <HeartPulse className="w-5 h-5 mr-2" /> Lifestyle Routine
            </h3>
            <div className="space-y-4">
              {lifestyle.map(tip => (
                <div key={tip.id} className="group">
                  <div className="font-semibold text-gray-800 flex items-center">
                    <span className="p-1.5 bg-[#E8F5E9] text-[#43A047] rounded-lg mr-2 group-hover:bg-[#43A047] group-hover:text-white transition-colors">
                      {getIcon(tip.iconType)}
                    </span>
                    {tip.title}
                  </div>
                  <p className="text-sm text-gray-600 mt-2 pl-9">{tip.description}</p>
                  <p className="text-xs text-[#2E7D32] mt-1 pl-9 italic font-medium">Why? {tip.benefits}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
