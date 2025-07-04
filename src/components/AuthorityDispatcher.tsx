import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Hospital, 
  Scale, 
  Landmark, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Webhook, 
  Terminal,
  AlertOctagon
} from 'lucide-react';

export const AuthorityDispatcher = () => {
  const [logs, setLogs] = useState<string[]>([
    "[10:04:22] SYNC: Validating 256-bit AES encryption keys...",
    "[10:04:25] SYNC: Connection established with NGT Primary Node.",
    "[10:45:12] ALERT: AQI threshold breached in Sector 42.",
    "[10:45:15] DISPATCH: Local hospitals notified (Payload 402kb).",
  ]);

  const authorities = [
    {
      id: 'hospitals',
      name: 'Local Hospitals & Clinics',
      icon: <Hospital className="w-6 h-6" />,
      trigger: 'T+0 Hrs (AQI > 400)',
      action: 'Prepare respiratory wards, mask distribution.',
      status: 'dispatched',
      color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
    },
    {
      id: 'collector',
      name: 'District Collector Office',
      icon: <Building2 className="w-6 h-6" />,
      trigger: 'T+12 Hrs (AQI > 450)',
      action: 'Halt all local construction, enforce odd-even.',
      status: 'pending',
      color: 'bg-amber-500/20 text-amber-400 border-amber-500/50'
    },
    {
      id: 'ngt',
      name: 'National Green Tribunal',
      icon: <Scale className="w-6 h-6" />,
      trigger: 'T+24 Hrs (AQI > 500)',
      action: 'Impose industrial fines, deploy task force.',
      status: 'pending',
      color: 'bg-orange-500/20 text-orange-400 border-orange-500/50'
    },
    {
      id: 'ndma',
      name: 'NDMA Command',
      icon: <Landmark className="w-6 h-6" />,
      trigger: 'T+48 Hrs (AQI > 500)',
      action: 'Declare regional emergency, initiate evacuation.',
      status: 'locked',
      color: 'bg-slate-800 text-slate-500 border-slate-700'
    }
  ];

  const simulateDispatch = () => {
    const newLog = `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] DISPATCH: Escalate to District Collector. Triggering webhook...`;
    setLogs(prev => [...prev, newLog]);
    
    setTimeout(() => {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] SUCCESS: 200 OK from Collector API.`]);
    }, 1500);
  };

  return (
    <div className="w-full bg-[#0a0f16] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl mt-8 text-slate-200">
      
      <div className="bg-slate-900 border-b border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black flex items-center mb-2 text-white">
            <Webhook className="w-8 h-8 mr-4 text-emerald-500" />
            Automated Authority Dispatcher
          </h2>
          <p className="text-slate-400 text-sm">
            Encrypted webhook matrix for multi-tier government and healthcare escalation.
          </p>
        </div>
        <div className="flex items-center space-x-3 bg-emerald-500/10 px-4 py-2 rounded-lg border border-emerald-500/30">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-mono text-emerald-400">End-to-End Encrypted</span>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Escalation Matrix Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center border-b border-slate-800 pb-2">
            <AlertOctagon className="w-5 h-5 mr-2 text-rose-500" /> Escalation Matrix
          </h3>
          
          <div className="relative border-l-2 border-slate-800 ml-4 space-y-8 pb-4">
            {authorities.map((auth, index) => (
              <div key={auth.id} className="relative pl-8">
                {/* Timeline Dot */}
                <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-[#0a0f16] flex items-center justify-center
                  ${auth.status === 'dispatched' ? 'bg-emerald-500' : 
                    auth.status === 'pending' ? 'bg-amber-500' : 'bg-slate-700'}`
                }>
                  {auth.status === 'dispatched' && <CheckCircle2 className="w-3 h-3 text-[#0a0f16]" />}
                </div>

                <Card className={`p-5 bg-slate-900 border ${auth.color} transition-all`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-300">
                        {auth.icon}
                      </div>
                      <h4 className={`text-lg font-bold ${auth.status === 'locked' ? 'text-slate-500' : 'text-white'}`}>
                        {auth.name}
                      </h4>
                    </div>
                    <Badge variant="outline" className={`font-mono text-xs ${auth.status === 'locked' ? 'border-slate-700 text-slate-600' : 'border-slate-600'}`}>
                      <Clock className="w-3 h-3 mr-1 inline" /> {auth.trigger}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className={`text-sm ${auth.status === 'locked' ? 'text-slate-600' : 'text-slate-400'}`}>
                      <ArrowRight className="w-4 h-4 inline mr-1 opacity-50" />
                      {auth.action}
                    </p>
                    
                    {auth.status === 'dispatched' && (
                      <span className="text-emerald-500 text-xs font-bold uppercase flex items-center bg-emerald-500/10 px-2 py-1 rounded">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Dispatched
                      </span>
                    )}
                    {auth.status === 'pending' && index === 1 && ( // Only allow simulating the NEXT one
                      <Button onClick={simulateDispatch} size="sm" className="bg-amber-600 hover:bg-amber-500 text-white text-xs">
                        Force Escalate
                      </Button>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Secure Webhook Logs */}
        <div className="space-y-6 flex flex-col h-full">
          <h3 className="text-lg font-bold text-white flex items-center border-b border-slate-800 pb-2">
            <Terminal className="w-5 h-5 mr-2 text-blue-400" /> Dispatch Logs
          </h3>
          
          <Card className="flex-grow bg-[#05080c] border border-slate-800 rounded-xl p-4 font-mono text-xs overflow-y-auto max-h-[400px]">
            <div className="space-y-2">
              {logs.map((log, i) => (
                <div key={i} className={`
                  ${log.includes('ALERT') ? 'text-rose-400' : ''}
                  ${log.includes('SUCCESS') ? 'text-emerald-400' : ''}
                  ${log.includes('DISPATCH') ? 'text-amber-400' : ''}
                  ${log.includes('SYNC') ? 'text-slate-500' : ''}
                `}>
                  {log}
                </div>
              ))}
              <div className="text-slate-600 flex items-center animate-pulse">
                <span className="w-2 h-4 bg-slate-500 mr-2 inline-block"></span>
                Waiting for incoming events...
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};
