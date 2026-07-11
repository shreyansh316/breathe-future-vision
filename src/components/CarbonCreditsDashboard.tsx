import React from 'react';
import { Card } from '@/components/ui/card';
import { useCarbonCredits } from '@/hooks/useCarbonCredits';
import { Button } from '@/components/ui/button';
import { Trophy, Leaf, Coins, Bus, Trees, CarFront, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

export const CarbonCreditsDashboard = () => {
  const { coins, co2Saved, quests, completeQuest } = useCarbonCredits();

  const getIcon = (type: string) => {
    switch (type) {
      case 'bus': return <Bus className="w-5 h-5" />;
      case 'tree': return <Trees className="w-5 h-5" />;
      case 'carpool': return <CarFront className="w-5 h-5" />;
      case 'energy': return <Zap className="w-5 h-5" />;
      default: return <Leaf className="w-5 h-5" />;
    }
  };

  // Mock Leaderboard Data
  const leaderboard = [
    { rank: 1, name: 'Aarav M.', coins: 1250, badge: 'Eco-Champion' },
    { rank: 2, name: 'Priya S.', coins: 980, badge: 'Tree Hugger' },
    { rank: 3, name: 'Rahul K.', coins: 840, badge: 'Transit Master' },
    { rank: 4, name: 'You', coins: coins, badge: coins > 500 ? 'Rising Star' : 'Beginner' },
  ].sort((a, b) => b.coins - a.coins); // Re-sort to place "You" correctly

  // Fix rank numbers after sorting
  leaderboard.forEach((user, index) => { user.rank = index + 1; });

  return (
    <div className="w-full bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4 rounded-3xl my-12 border border-emerald-100 shadow-xl">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 text-emerald-600 rounded-full mb-2">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#263238]">
            Green Citizen Hub
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Turn your daily commute into climate action. Complete eco-quests to earn VayuCoins, track your CO2 savings, and redeem credits for real-world rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Wallet & Rewards */}
          <div className="space-y-8">
            {/* Wallet Card */}
            <Card className="p-8 bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-none shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-10">
                <Leaf className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <h3 className="text-emerald-100 font-bold uppercase tracking-wider text-sm mb-4">Your Vayu Wallet</h3>
                <div className="flex items-end space-x-3 mb-6">
                  <Coins className="w-12 h-12 text-yellow-300 mb-1" />
                  <span className="text-6xl font-black">{coins}</span>
                  <span className="text-emerald-100 font-bold pb-2">Coins</span>
                </div>
                
                <div className="bg-white/20 rounded-xl p-4 flex justify-between items-center backdrop-blur-md">
                  <div>
                    <div className="text-emerald-100 text-xs font-semibold uppercase mb-1">Total CO2 Saved</div>
                    <div className="text-2xl font-bold">{co2Saved} kg</div>
                  </div>
                  <Trees className="w-8 h-8 text-emerald-200" />
                </div>
              </div>
            </Card>

            {/* Rewards Store */}
            <Card className="p-6 bg-white border border-emerald-100 shadow-md">
              <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center">
                <ArrowRight className="w-5 h-5 mr-2 text-emerald-500" /> Redeem Rewards
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-100 cursor-pointer">
                  <div>
                    <h4 className="font-bold text-sm text-slate-700">Metro Day Pass</h4>
                    <p className="text-xs text-slate-500">Free unlimited public transit</p>
                  </div>
                  <span className="font-bold text-emerald-600 text-sm bg-emerald-100 px-2 py-1 rounded">500 Coins</span>
                </div>
                <div className="flex justify-between items-center p-3 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-100 cursor-pointer">
                  <div>
                    <h4 className="font-bold text-sm text-slate-700">N95 Mask Pack</h4>
                    <p className="text-xs text-slate-500">Pack of 5 high-quality masks</p>
                  </div>
                  <span className="font-bold text-emerald-600 text-sm bg-emerald-100 px-2 py-1 rounded">300 Coins</span>
                </div>
                <div className="flex justify-between items-center p-3 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-100 cursor-pointer">
                  <div>
                    <h4 className="font-bold text-sm text-slate-700">HEPA Filter Discount</h4>
                    <p className="text-xs text-slate-500">20% off verified purifiers</p>
                  </div>
                  <span className="font-bold text-emerald-600 text-sm bg-emerald-100 px-2 py-1 rounded">1000 Coins</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Middle Column: Daily Quests */}
          <Card className="p-6 bg-white border border-emerald-100 shadow-md lg:col-span-1">
            <h3 className="font-bold text-xl text-slate-800 mb-6 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-amber-500" /> Daily Eco-Quests
            </h3>
            <div className="space-y-4">
              {quests.map((quest) => (
                <div key={quest.id} className={`p-4 rounded-xl border-2 transition-all ${quest.completed ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 bg-white hover:border-emerald-200'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${quest.completed ? 'bg-emerald-200 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                        {getIcon(quest.iconType)}
                      </div>
                      <h4 className={`font-bold ${quest.completed ? 'text-emerald-800' : 'text-slate-800'}`}>{quest.title}</h4>
                    </div>
                    {quest.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <span className="font-bold text-sm text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-200">
                        +{quest.rewardCoins}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mb-4 ${quest.completed ? 'text-emerald-700/70' : 'text-slate-500'}`}>
                    {quest.description}
                  </p>
                  {!quest.completed ? (
                    <Button 
                      onClick={() => completeQuest(quest.id)}
                      className="w-full bg-slate-900 hover:bg-emerald-600 text-white transition-colors shadow-md"
                    >
                      Complete Quest
                    </Button>
                  ) : (
                    <div className="w-full text-center py-2 text-sm font-bold text-emerald-600 bg-emerald-100/50 rounded-md">
                      Reward Claimed! (-{quest.co2SavedKg}kg CO2)
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Right Column: Leaderboard */}
          <Card className="p-6 bg-white border border-emerald-100 shadow-md">
            <h3 className="font-bold text-xl text-slate-800 mb-6 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" /> Local Leaderboard
            </h3>
            <p className="text-sm text-slate-500 mb-6">Compete with your neighbors in Delhi-NCR to become the ultimate Eco-Champion.</p>
            
            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div 
                  key={user.name} 
                  className={`flex items-center justify-between p-3 rounded-lg border ${user.name === 'You' ? 'bg-emerald-50 border-emerald-200 shadow-sm' : 'bg-slate-50 border-transparent'}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      user.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                      user.rank === 2 ? 'bg-slate-200 text-slate-700' :
                      user.rank === 3 ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      #{user.rank}
                    </div>
                    <div>
                      <h4 className={`font-bold text-sm ${user.name === 'You' ? 'text-emerald-700' : 'text-slate-700'}`}>
                        {user.name}
                      </h4>
                      <p className="text-xs text-slate-500">{user.badge}</p>
                    </div>
                  </div>
                  <div className="font-bold text-slate-800 flex items-center">
                    {user.coins} <Coins className="w-3 h-3 ml-1 text-yellow-500" />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-800">
              <strong className="block mb-1">Did you know?</strong>
              The top 100 players every month receive an official 'Green Citizen' digital certificate from the Ministry of Environment!
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
};
