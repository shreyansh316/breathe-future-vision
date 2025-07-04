import React from 'react';
import { Leaf, AlertCircle, AlertTriangle, Skull, Activity, ShieldAlert } from 'lucide-react';

const aqiLevels = [
  {
    range: '0-50',
    label: 'Good',
    description: 'When the AQI level (air quality index) is below 50, people are breathing fresh, clean air.',
    color: '#10B981', // Emerald
    bgColor: 'bg-[#10B981]/10',
    icon: Leaf
  },
  {
    range: '51-100',
    label: 'Moderate',
    description: 'AQI level between 51-100 signifies an acceptable level for a healthy adult but may still pose a threat to sensitive group.',
    color: '#F59E0B', // Amber
    bgColor: 'bg-[#F59E0B]/10',
    icon: Activity
  },
  {
    range: '101-200',
    label: 'Poor',
    description: 'With AQI levels between 101-200, the poor air quality can affect people’s health and cause discomfort to people with heart diseases.',
    color: '#EF4444', // Red
    bgColor: 'bg-[#EF4444]/10',
    icon: AlertCircle
  },
  {
    range: '201-300',
    label: 'Unhealthy',
    description: 'AQI level between 201-300 is considered unhealthy and can cause various health issues for all age groups.',
    color: '#8B5CF6', // Purple
    bgColor: 'bg-[#8B5CF6]/10',
    icon: AlertTriangle
  },
  {
    range: '301-400',
    label: 'Severe',
    description: 'With AQI levels reaching severe, the deadly air pollutants are making their way in your lungs causing you severe discomfort and health issues.',
    color: '#D946EF', // Fuchsia
    bgColor: 'bg-[#D946EF]/10',
    icon: ShieldAlert
  },
  {
    range: '401-500',
    label: 'Hazardous',
    description: 'Hazardous level can cause long term disorders like Lung cancer, chronic obstructive pulmonary disease, emphysema etc.',
    color: '#7F1D1D', // Dark Blood Red
    bgColor: 'bg-[#7F1D1D]/10',
    icon: Skull
  }
];

export const AqiScaleGuide = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-slate-100 mb-4">Know What You Breathe</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Understanding the Air Quality Index (AQI) categories and how they directly impact your long-term health and daily activities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aqiLevels.map((level, idx) => {
          const Icon = level.icon;
          return (
            <div 
              key={level.label}
              className={`dashboard-card p-6 flex flex-col h-full transform transition-all duration-300 hover:scale-105 border-t-4`}
              style={{ borderTopColor: level.color }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100">{level.label}</h3>
                  <span className="inline-block mt-1 px-3 py-1 rounded-full text-sm font-black tracking-wider" style={{ backgroundColor: level.color, color: '#fff' }}>
                    {level.range}
                  </span>
                </div>
                <div className={`p-3 rounded-xl ${level.bgColor}`}>
                  <Icon className="w-6 h-6" style={{ color: level.color }} />
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed flex-grow text-sm">
                {level.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
