import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useAyurAQI } from '@/hooks/useAyurAQI';
import { Leaf, Droplets, Wind, Apple, Activity, HeartPulse, Sparkles, X, ChevronRight } from 'lucide-react';

interface AyurAQIDashboardProps {
  currentAQI: number;
}

const quizQuestions = [
  {
    question: "What is your natural body frame?",
    options: [
      { text: "Thin & Light", type: "Vata" },
      { text: "Medium & Athletic", type: "Pitta" },
      { text: "Broad & Heavy", type: "Kapha" }
    ]
  },
  {
    question: "How is your digestion typically?",
    options: [
      { text: "Irregular (sometimes heavy, sometimes light)", type: "Vata" },
      { text: "Fast & Strong (always hungry)", type: "Pitta" },
      { text: "Slow & Steady (can skip meals)", type: "Kapha" }
    ]
  },
  {
    question: "How do you react under stress?",
    options: [
      { text: "Anxious & Worried", type: "Vata" },
      { text: "Angry & Irritable", type: "Pitta" },
      { text: "Withdrawn & Stubborn", type: "Kapha" }
    ]
  }
];

export const AyurAQIDashboard = ({ currentAQI }: AyurAQIDashboardProps) => {
  const [userDosha, setUserDosha] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  
  const { diet, yoga, lifestyle } = useAyurAQI(currentAQI, userDosha);

  useEffect(() => {
    const savedDosha = localStorage.getItem('janaqi_dosha');
    if (savedDosha) setUserDosha(savedDosha);
  }, []);

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type];
    if (quizStep < quizQuestions.length - 1) {
      setAnswers(newAnswers);
      setQuizStep(prev => prev + 1);
    } else {
      // Calculate result
      const counts = newAnswers.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const dominantDosha = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
      
      setUserDosha(dominantDosha);
      localStorage.setItem('janaqi_dosha', dominantDosha);
      setShowQuiz(false);
      setQuizStep(0);
      setAnswers([]);
    }
  };

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

  let severityText = "Normal Routine";
  if (currentAQI > 200) severityText = "Intensive Care Focus";
  else if (currentAQI > 100) severityText = "Preventative Focus";

  return (
    <Card className="p-6 bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] border-[#A5D6A7] shadow-xl relative overflow-hidden">
      <div className="absolute -right-8 -top-8 text-[#A5D6A7] opacity-20 transform rotate-45 pointer-events-none">
        <Leaf className="w-48 h-48" />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#2E7D32] flex items-center space-x-2">
              <Leaf className="w-6 h-6" />
              <span>AyurAQI Wellness Mode</span>
            </h2>
            <p className="text-[#388E3C] text-sm mt-1">
              Ancient wisdom adapting to today's air quality (AQI: <strong>{currentAQI}</strong>)
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            {userDosha && (
              <div className="bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7] px-3 py-1.5 rounded-full text-xs font-bold flex items-center shadow-sm">
                <Sparkles className="w-3 h-3 mr-1" />
                {userDosha} Profile
                <button 
                  onClick={() => { setUserDosha(null); localStorage.removeItem('janaqi_dosha'); }}
                  className="ml-2 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            <div className="bg-[#43A047] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
              {severityText}
            </div>
          </div>
        </div>

        {/* Dosha Assessment Banner */}
        {!userDosha && !showQuiz && (
          <div className="bg-white/80 backdrop-blur-sm border border-[#A5D6A7] rounded-xl p-4 mb-6 flex items-center justify-between shadow-sm">
            <div>
              <h4 className="font-bold text-[#2E7D32] flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
                Personalize your Remedies
              </h4>
              <p className="text-sm text-gray-600 mt-1">Take the 3-question Prakriti assessment to get Dosha-specific respiratory tips.</p>
            </div>
            <button 
              onClick={() => setShowQuiz(true)}
              className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-md whitespace-nowrap"
            >
              Take Quiz
            </button>
          </div>
        )}

        {/* Quiz Overlay */}
        {showQuiz && (
          <div className="bg-white rounded-xl p-6 mb-6 shadow-lg border border-[#A5D6A7] relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 bg-[#43A047] transition-all" style={{ width: `${((quizStep) / quizQuestions.length) * 100}%` }}></div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-[#2E7D32]">Question {quizStep + 1} of {quizQuestions.length}</h4>
              <button onClick={() => setShowQuiz(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-lg text-gray-800 mb-4">{quizQuestions[quizStep].question}</p>
            <div className="space-y-2">
              {quizQuestions[quizStep].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.type)}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-[#43A047] hover:bg-[#E8F5E9] transition-all flex justify-between items-center group text-sm md:text-base"
                >
                  <span className="text-gray-700 font-medium group-hover:text-[#2E7D32]">{opt.text}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#43A047]" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
