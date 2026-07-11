import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Server, 
  Database, 
  CloudRain, 
  Cpu, 
  Wifi, 
  Globe2, 
  Radio, 
  TerminalSquare
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export const SystemObservability = () => {
  const [dataPoints, setDataPoints] = useState(1254300);
  const [activeNodes, setActiveNodes] = useState(7895);
  const [simulateFailure, setSimulateFailure] = useState(false);
  
  // Simulated live chart data
  const [throughputData, setThroughputData] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      time: i,
      reqs: Math.floor(Math.random() * 5000) + 15000
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => prev + Math.floor(Math.random() * 1000));
      setActiveNodes(prev => {
        const jump = Math.random() > 0.5 ? 1 : -1;
        return prev + jump;
      });
      
      setThroughputData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: prev[prev.length - 1].time + 1,
          reqs: Math.floor(Math.random() * 5000) + 15000
        });
        return newData;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const microservices = [
    { name: 'IoT MQTT Broker', status: 'Healthy', ping: '12ms', load: 45, icon: <Radio /> },
    { name: 'AQI Inference Engine (ML)', status: simulateFailure ? 'Interpolating' : 'Healthy', ping: simulateFailure ? '205ms' : '45ms', load: simulateFailure ? 98 : 82, icon: <Cpu /> },
    { name: 'National Data Lake', status: 'Healthy', ping: '8ms', load: 30, icon: <Database /> },
    { name: 'Webhook Dispatcher', status: 'Degraded', ping: '150ms', load: 95, icon: <Server /> },
    { name: 'Satellite Geo-Ingest', status: simulateFailure ? 'OFFLINE' : 'Healthy', ping: simulateFailure ? 'ERR' : '32ms', load: simulateFailure ? 0 : 60, icon: <Globe2 /> },
    { name: 'VayuCoin Ledger', status: 'Healthy', ping: '18ms', load: 25, icon: <Activity /> },
  ];

  return (
    <div className="w-full bg-[#050505] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl mt-8 text-slate-300 font-mono">
      
      {/* Header */}
      <div className="bg-slate-900/50 border-b border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black flex items-center mb-2 text-white font-sans">
            <TerminalSquare className="w-8 h-8 mr-4 text-cyan-500" />
            System Observability & Scale
          </h2>
          <p className="text-slate-500 text-sm font-sans">
            Real-time telemetry and infrastructure health for the National Air Quality Grid.
          </p>
        </div>
        <div className="flex items-center space-x-6 bg-black/40 px-6 py-3 rounded-xl border border-slate-800">
          <div className="text-center">
            <div className="text-xs text-slate-500 mb-1 uppercase tracking-widest">Active Nodes</div>
            <div className="text-xl font-bold text-emerald-400 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2"></span>
              {activeNodes.toLocaleString()}
            </div>
          </div>
          <div className="w-px h-10 bg-slate-800"></div>
          <div className="text-center">
            <div className="text-xs text-slate-500 mb-1 uppercase tracking-widest">Data Points / Sec</div>
            <div className="text-xl font-bold text-cyan-400">
              {(dataPoints / 100).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Live Throughput Chart */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center border-b border-slate-800 pb-2 font-sans">
            <Activity className="w-5 h-5 mr-2 text-cyan-500" /> API Gateway Throughput
          </h3>
          
          <Card className="p-4 bg-black/40 border-slate-800 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={throughputData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val / 1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#06b6d4' }}
                  labelStyle={{ display: 'none' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="reqs" 
                  stroke="#06b6d4" 
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
              <div className="text-xs text-slate-500 mb-1 uppercase">Avg Latency</div>
              <div className="text-2xl font-bold text-emerald-400">24ms</div>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
              <div className="text-xs text-slate-500 mb-1 uppercase">Error Rate</div>
              <div className="text-2xl font-bold text-emerald-400">0.02%</div>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
              <div className="text-xs text-slate-500 mb-1 uppercase">Uptime (30d)</div>
              <div className="text-2xl font-bold text-emerald-400">99.999%</div>
            </div>
          </div>
        </div>

        {/* Microservices Health */}
        <div className="space-y-6 flex flex-col h-full">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="text-lg font-bold text-white flex items-center font-sans">
              <Server className="w-5 h-5 mr-2 text-indigo-400" /> Service Mesh
            </h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setSimulateFailure(!simulateFailure)}
                className={`text-[10px] px-2 py-1 rounded border uppercase font-bold transition-colors ${simulateFailure ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'}`}
                title="Point 82: Structural Failure Mocking"
              >
                {simulateFailure ? 'Restore Satellites' : 'Kill Satellites'}
              </button>
              <Badge variant="outline" className={`border-emerald-500/30 text-emerald-400 bg-emerald-500/10 ${simulateFailure ? 'hidden' : ''}`}>All Systems Go</Badge>
              {simulateFailure && <Badge variant="outline" className="border-red-500/30 text-red-400 bg-red-500/10 animate-pulse">Critical Failures</Badge>}
            </div>
          </div>
          
          <div className="space-y-3">
            {microservices.map((service) => (
              <div key={service.name} className="bg-slate-900/40 border border-slate-800 p-3 rounded-xl hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="text-slate-400">
                      {React.cloneElement(service.icon, { className: "w-4 h-4" })}
                    </div>
                    <span className="text-sm font-semibold text-slate-200">{service.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs ${service.status === 'Healthy' ? 'text-emerald-500' : service.status === 'OFFLINE' ? 'text-red-500 font-bold' : 'text-amber-500'}`}>
                      {service.ping}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${service.status === 'Healthy' ? 'bg-emerald-500' : service.status === 'OFFLINE' ? 'bg-red-500' : 'bg-amber-500 animate-pulse'}`}></div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress 
                    value={service.load} 
                    className={`h-1.5 bg-slate-800 flex-grow ${service.load > 80 ? '[&>div]:bg-amber-500' : '[&>div]:bg-indigo-500'}`} 
                  />
                  <span className="text-[10px] text-slate-500 w-8 text-right">{service.load}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
