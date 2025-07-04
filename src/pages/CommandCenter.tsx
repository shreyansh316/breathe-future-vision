import React from 'react';
import { Card } from '@/components/ui/card';
import { Activity, Database, Server, Shield, ActivityIcon, Cpu } from 'lucide-react';
import { GlobalHeader } from '@/components/GlobalHeader';

export default function CommandCenter() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <GlobalHeader />
      <div className="max-w-7xl mx-auto px-4 py-8 mt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Shield className="w-8 h-8 text-emerald-500" />
              Administrative Command Center
            </h1>
            <p className="text-slate-400 mt-2">VayuRakshak Infrastructure & Operations Overview</p>
          </div>
          <div className="flex gap-4">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium border border-emerald-500/30 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              System Optimal
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-slate-900 border-slate-800">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-400 font-medium">Kafka Telemetry Streams</p>
                <h3 className="text-2xl font-bold text-white mt-1">12,450 /s</h3>
              </div>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <ActivityIcon className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-emerald-400">
              <span className="font-bold">100%</span>
              <span className="text-slate-500 ml-2">Schema Compliance</span>
            </div>
          </Card>

          <Card className="p-6 bg-slate-900 border-slate-800">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-400 font-medium">Redis Cache Hit Rate</p>
                <h3 className="text-2xl font-bold text-white mt-1">98.4%</h3>
              </div>
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Database className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-emerald-400">
              <span className="font-bold">+2.1%</span>
              <span className="text-slate-500 ml-2">from last hour</span>
            </div>
          </Card>

          <Card className="p-6 bg-slate-900 border-slate-800">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-400 font-medium">ONNX AI Inference Latency</p>
                <h3 className="text-2xl font-bold text-white mt-1">14ms</h3>
              </div>
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Cpu className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-amber-400">
              <span className="font-bold">-4ms</span>
              <span className="text-slate-500 ml-2">Optimized LSTM active</span>
            </div>
          </Card>

          <Card className="p-6 bg-slate-900 border-slate-800">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-400 font-medium">Active Nodes</p>
                <h3 className="text-2xl font-bold text-white mt-1">8,102</h3>
              </div>
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Server className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-emerald-400">
              <span className="font-bold">+124</span>
              <span className="text-slate-500 ml-2">new rural nodes</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
