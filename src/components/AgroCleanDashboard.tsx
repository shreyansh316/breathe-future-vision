import React from 'react';
import { Card } from '@/components/ui/card';
import { Flame, Wind, Tractor, Sprout, HandCoins, AlertTriangle } from 'lucide-react';
import { useFireData } from '@/hooks/useFireData';

export const AgroCleanDashboard = () => {
  const { fires, isLoading } = useFireData();

  const totalFires = fires.length;
  // Determine if it's high risk based on fire count
  const isHighRisk = totalFires > 30;

  return (
    <Card className="p-6 bg-gradient-to-br from-[#FFF8E1] to-[#FFECB3] border-[#FFE082] shadow-xl relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -right-12 -bottom-12 text-[#FFE082] opacity-30 transform -rotate-12 pointer-events-none">
        <Tractor className="w-64 h-64" />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#F57F17] flex items-center space-x-2">
              <Tractor className="w-6 h-6" />
              <span>AgroClean / किसान ई-मित्र</span>
            </h2>
            <p className="text-[#F9A825] text-sm mt-1 font-medium">
              Stubble Burning Monitoring & Sustainable Alternatives
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-3 bg-white/70 px-4 py-2 rounded-full shadow-sm border border-white">
            <div className="flex items-center space-x-1">
              <Flame className={`w-5 h-5 ${isHighRisk ? 'text-red-500 animate-pulse' : 'text-orange-500'}`} />
              <span className="font-bold text-gray-800">
                {isLoading ? '...' : totalFires} Active Fires
              </span>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="flex items-center space-x-1 text-gray-600 text-sm">
              <Wind className="w-4 h-4 text-blue-500" />
              <span>Wind: NW (12 km/h)</span>
            </div>
          </div>
        </div>

        {isHighRisk && (
          <div className="mb-6 bg-red-50 border border-red-200 p-3 rounded-lg flex items-start space-x-3 text-red-800">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <strong>High Smoke Alert:</strong> Current wind patterns will carry smoke plumes from Punjab/Haryana towards the NCR region within the next 24-48 hours. Please avoid burning crop residue.
            </div>
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-white/60">
          <h3 className="text-lg font-bold text-[#F57F17] mb-4 flex items-center">
            <Sprout className="w-5 h-5 mr-2" /> Sustainable Alternatives (पराली प्रबंधन)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#E8F5E9] p-4 rounded-xl border border-[#C8E6C9] group hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-[#2E7D32]">Pusa Bio-Decomposer</h4>
                <Sprout className="w-5 h-5 text-[#4CAF50]" />
              </div>
              <p className="text-sm text-gray-700 mb-3">
                A microbial capsule that turns crop residue into manure in 15-20 days, improving soil fertility.
              </p>
              <div className="flex items-center text-xs font-bold text-[#388E3C] bg-white px-2 py-1 rounded inline-flex">
                <HandCoins className="w-3 h-3 mr-1" /> 100% Free via State Govt
              </div>
            </div>

            <div className="bg-[#FFF3E0] p-4 rounded-xl border border-[#FFE0B2] group hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-[#E65100]">Happy Seeder Machine</h4>
                <Tractor className="w-5 h-5 text-[#FF9800]" />
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Sows wheat directly without needing to burn the paddy residue. Saves water and labor.
              </p>
              <div className="flex items-center text-xs font-bold text-[#F57C00] bg-white px-2 py-1 rounded inline-flex">
                <HandCoins className="w-3 h-3 mr-1" /> 50-80% Subsidy Available
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
