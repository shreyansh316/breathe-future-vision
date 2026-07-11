import React from 'react';
import { Card } from '@/components/ui/card';

interface AiMetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
  delay: number;
}

export const AiMetricCard: React.FC<AiMetricCardProps> = ({ title, value, icon, description, delay }) => {
  return (
    <Card 
      className="p-6 bg-white/90 backdrop-blur-sm border-white/50 shadow-xl"
      style={{ animationDelay: `${delay}s`, animationFillMode: 'both' }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 rounded-xl">
          {icon}
        </div>
        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full border border-emerald-100 uppercase tracking-wider">
          {value}
        </span>
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </Card>
  );
};
