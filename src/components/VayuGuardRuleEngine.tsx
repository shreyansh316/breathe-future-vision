import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { 
  ShieldAlert, 
  Activity, 
  Siren, 
  AlertTriangle, 
  Network,
  Settings2,
  BellRing
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot
} from 'recharts';

export const VayuGuardRuleEngine = () => {
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [anomalySensitivity, setAnomalySensitivity] = useState('High');

  // Mock data for Isolation Forest Anomaly Detection
  const anomalyData = [
    { time: '00:00', value: 45 },
    { time: '04:00', value: 42 },
    { time: '08:00', value: 68 },
    { time: '10:00', value: 85 },
    { time: '11:30', value: 340, isAnomaly: true }, // Spike!
    { time: '12:00', value: 290 },
    { time: '16:00', value: 110 },
    { time: '20:00', value: 75 },
    { time: '24:00', value: 60 },
  ];

  const ndmaStages = [
    { 
      stage: 'Stage 1', aqi: '201 - 300', label: 'Poor', color: 'bg-orange-500', 
      actions: ['Strict enforcement of dust control', 'Ban on open waste burning', 'Traffic rationing prep']
    },
    { 
      stage: 'Stage 2', aqi: '301 - 400', label: 'Very Poor', color: 'bg-red-500', 
      actions: ['Ban on diesel generators', 'Increased parking fees', 'Enhanced bus/metro services']
    },
    { 
      stage: 'Stage 3', aqi: '401 - 450', label: 'Severe', color: 'bg-rose-700', 
      actions: ['Ban on BS-III petrol & BS-IV diesel cars', 'Halt construction activities', 'Closure of brick kilns']
    },
    { 
      stage: 'Stage 4', aqi: '450+', label: 'Severe+', color: 'bg-purple-900', 
      actions: ['Entry of trucks banned', 'Halt all construction', 'Schools moved online', 'Offices at 50% capacity']
    },
  ];

  return (
    <div className="w-full bg-[#0a0f16] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl my-12 text-slate-200">
      
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-black flex items-center mb-2 text-white">
            <ShieldAlert className="w-10 h-10 mr-4 text-red-500" />
            VayuGuard Command Center
          </h2>
          <p className="text-slate-400 text-lg">
            National Disaster Management Authority (NDMA) automated rule engine & ML anomaly detection.
          </p>
        </div>
        <div className="flex items-center space-x-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center space-x-3">
            <Siren className="w-6 h-6 text-blue-500 animate-pulse" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-500 uppercase">Auto-Dispatch</span>
              <span className={`text-sm font-bold ${autoDispatch ? 'text-green-500' : 'text-slate-600'}`}>
                {autoDispatch ? 'ACTIVE' : 'MANUAL'}
              </span>
            </div>
          </div>
          <Switch 
            checked={autoDispatch} 
            onCheckedChange={setAutoDispatch}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* ML Anomaly Detection Model Visualization */}
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="text-xl font-bold text-white flex items-center">
              <Network className="w-5 h-5 mr-2 text-indigo-400" /> Isolation Forest Model
            </h3>
            <div className="flex space-x-2">
              <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 bg-indigo-500/10">Active</Badge>
            </div>
          </div>
          <p className="text-sm text-slate-400">
            Detects sudden, non-seasonal spikes in SO2, CO, and VOCs that indicate industrial leaks or localized fires.
          </p>

          <Card className="p-4 bg-slate-900 border-slate-800 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={anomalyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <ReferenceLine y={250} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'top', value: 'Threshold', fill: '#ef4444', fontSize: 12 }} />
                
                {/* The Anomaly Dot */}
                <ReferenceDot x="11:30" y={340} r={6} fill="#ef4444" stroke="#7f1d1d" strokeWidth={2} />
                
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#6366f1" 
                  strokeWidth={2}
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
          
          <div className="bg-red-950/30 border border-red-900/50 p-4 rounded-xl flex items-start space-x-4">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-red-400 font-bold mb-1">Anomaly Detected (11:30 AM)</h4>
              <p className="text-red-200/70 text-sm">
                Sudden SO2 spike detected in Industrial Zone B. Deviation exceeds 3σ. Local authorities automatically notified.
              </p>
            </div>
          </div>
        </div>

        {/* NDMA GRAP Matrix */}
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="text-xl font-bold text-white flex items-center">
              <Settings2 className="w-5 h-5 mr-2 text-emerald-400" /> GRAP Rule Matrix
            </h3>
            <span className="text-xs text-slate-500 uppercase tracking-widest">Auto-Enforcement</span>
          </div>
          
          <div className="space-y-3">
            {ndmaStages.map((s, idx) => (
              <div key={s.stage} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-slate-700 transition-colors">
                <div className="flex-shrink-0 w-32">
                  <div className={`text-white text-xs font-bold px-2 py-1 rounded inline-flex items-center gap-1 mb-1 ${s.color}`}>
                    {(s.label === 'Poor' || s.label === 'Very Poor') && <AlertTriangle className="w-3 h-3" />}
                    {(s.label === 'Severe' || s.label === 'Severe+') && <ShieldAlert className="w-3 h-3" />}
                    <span>{s.label} ({s.stage})</span>
                  </div>
                  <div className="text-white font-mono font-bold text-lg">
                    {s.aqi}
                  </div>
                </div>
                
                <div className="flex-grow">
                  <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
                    {s.actions.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex-shrink-0 sm:self-center">
                  <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white w-full sm:w-auto">
                    <BellRing className="w-4 h-4 mr-2" /> Simulate
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-xs text-slate-600 text-center mt-4">
            Rules mapped according to the official Graded Response Action Plan for Delhi-NCR (Revised 2023).
          </p>
        </div>

      </div>
    </div>
  );
};

// Helper for inline badge
const Badge = ({ children, className, variant }: any) => {
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
}
