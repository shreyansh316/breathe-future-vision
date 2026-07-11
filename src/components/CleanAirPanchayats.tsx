import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Award, Leaf, ShieldCheck, Flame, Factory, MapPin, Sprout } from 'lucide-react';

export const CleanAirPanchayats = () => {
  // Mock data for Panchayats (Villages)
  const leaderBoard = [
    { rank: 1, name: 'Sukhmagro', district: 'Ludhiana', zeroBurnDays: 142, adoptionRate: 94 },
    { rank: 2, name: 'Balaram Pur', district: 'Ambala', zeroBurnDays: 120, adoptionRate: 88 },
    { rank: 3, name: 'Chanalon', district: 'Mohali', zeroBurnDays: 115, adoptionRate: 85 },
    { rank: 4, name: 'Khanna', district: 'Ludhiana', zeroBurnDays: 98, adoptionRate: 76 },
    { rank: 5, name: 'Kurali', district: 'Rupnagar', zeroBurnDays: 85, adoptionRate: 71 },
  ];

  return (
    <div className="w-full bg-white border border-[#e0f0d9] rounded-3xl overflow-hidden shadow-xl mt-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] text-white p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black flex items-center mb-2">
              <Award className="w-10 h-10 mr-4 text-yellow-300" />
              Clean Air Panchayats
            </h2>
            <p className="text-[#e8f5e9] text-lg font-medium max-w-2xl">
              Tracking and rewarding villages that have adopted zero-burn harvesting and sustainable farming technology.
            </p>
          </div>
          
          <div className="bg-white/20 p-4 rounded-xl backdrop-blur-md flex items-center space-x-4 border border-white/30">
            <ShieldCheck className="w-10 h-10 text-yellow-300" />
            <div>
              <div className="text-sm font-semibold uppercase tracking-wider text-green-50">Total Subsidies Unlocked</div>
              <div className="text-2xl font-bold">₹4.2 Cr</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Leaderboard Column (Spans 2 columns on lg) */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-bold text-slate-800 flex items-center">
            <MapPin className="w-6 h-6 mr-2 text-green-600" /> Regional Leaderboard
          </h3>
          
          <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-500 uppercase text-xs tracking-wider border-b border-slate-200">
                    <th className="p-4 font-bold">Rank</th>
                    <th className="p-4 font-bold">Panchayat (Village)</th>
                    <th className="p-4 font-bold hidden sm:table-cell">District</th>
                    <th className="p-4 font-bold">Zero-Burn Days</th>
                    <th className="p-4 font-bold text-right">Equipment Adoption</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {leaderBoard.map((village, idx) => (
                    <tr key={village.name} className="hover:bg-white transition-colors">
                      <td className="p-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          village.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                          village.rank === 2 ? 'bg-slate-200 text-slate-700' :
                          village.rank === 3 ? 'bg-amber-100 text-amber-800' :
                          'bg-green-50 text-green-700'
                        }`}>
                          #{village.rank}
                        </div>
                      </td>
                      <td className="p-4 font-bold text-slate-800">
                        {village.name}
                        {village.rank === 1 && <Badge className="ml-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-none hidden sm:inline-flex">Top Performer</Badge>}
                      </td>
                      <td className="p-4 text-slate-500 hidden sm:table-cell">{village.district}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2 text-slate-700 font-semibold">
                          <Flame className="w-4 h-4 text-orange-400 opacity-50 line-through" />
                          <span>{village.zeroBurnDays}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col items-end w-full">
                          <span className="text-sm font-bold text-green-700 mb-1">{village.adoptionRate}%</span>
                          <Progress value={village.adoptionRate} className="h-2 w-24 bg-slate-200 [&>div]:bg-green-500" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Incentive Highlights */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-800 flex items-center">
            <Factory className="w-6 h-6 mr-2 text-blue-600" /> Smart Equipment
          </h3>
          
          <Card className="p-6 bg-emerald-50 border-emerald-200 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-all">
            <div className="relative z-10">
              <Badge className="bg-emerald-500 hover:bg-emerald-600 mb-4 text-white">Most Adopted</Badge>
              <h4 className="text-xl font-bold text-emerald-900 mb-2">Happy Seeder Machine</h4>
              <p className="text-emerald-700 text-sm mb-4 leading-relaxed">
                Directly sows wheat without the need to burn the rice stubble from the previous harvest.
              </p>
              <div className="bg-white/60 p-3 rounded-lg border border-emerald-100 flex items-center justify-between">
                <span className="text-emerald-800 font-semibold text-sm">State Subsidy</span>
                <span className="text-lg font-black text-emerald-600">80% OFF</span>
              </div>
            </div>
            <Leaf className="absolute -bottom-6 -right-6 w-32 h-32 text-emerald-500 opacity-10 group-hover:scale-110 transition-transform duration-500" />
          </Card>

          <Card className="p-6 bg-blue-50 border-blue-200 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-all">
            <div className="relative z-10">
              <Badge className="bg-blue-500 hover:bg-blue-600 mb-4 text-white">Bio-Solution</Badge>
              <h4 className="text-xl font-bold text-blue-900 mb-2">Pusa Bio-Decomposer</h4>
              <p className="text-blue-700 text-sm mb-4 leading-relaxed">
                A microbial solution that rapidly turns crop residue into manure, enriching the soil.
              </p>
              <div className="bg-white/60 p-3 rounded-lg border border-blue-100 flex items-center justify-between">
                <span className="text-blue-800 font-semibold text-sm">Panchayat Reward</span>
                <span className="text-lg font-black text-blue-600">FREE Kit</span>
              </div>
            </div>
            <Sprout className="absolute -bottom-6 -right-6 w-32 h-32 text-blue-500 opacity-10 group-hover:scale-110 transition-transform duration-500" />
          </Card>
        </div>

      </div>
    </div>
  );
};
