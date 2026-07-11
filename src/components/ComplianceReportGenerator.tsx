import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, CheckCircle2, Loader2, BarChart, ShieldCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const ComplianceReportGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [statusText, setStatusText] = useState('Initiate Compliance Scan');

  const generateReport = () => {
    setIsGenerating(true);
    setProgress(0);
    setIsComplete(false);
    
    // Simulating a complex generation process
    setTimeout(() => { setProgress(25); setStatusText('Compiling historical telemetry...'); }, 1000);
    setTimeout(() => { setProgress(50); setStatusText('Cross-referencing WHO guidelines...'); }, 2500);
    setTimeout(() => { setProgress(75); setStatusText('Generating AI predictive summary...'); }, 4000);
    setTimeout(() => { 
      setProgress(100); 
      setStatusText('Report Ready'); 
      setIsGenerating(false);
      setIsComplete(true);
    }, 5500);
  };

  return (
    <Card className="p-8 bg-[#1a1d20] border-gray-800 shadow-xl rounded-3xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <ShieldCheck className="w-48 h-48 text-blue-500" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
        
        {/* Left Side: Info */}
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold tracking-wider uppercase">
            <BarChart className="w-4 h-4" />
            <span>Enterprise Feature</span>
          </div>
          
          <h3 className="text-3xl font-black text-white tracking-tight">
            Automated Compliance Reports
          </h3>
          
          <p className="text-gray-400 text-sm leading-relaxed max-w-md">
            Generate official, audit-ready PDF reports for local jurisdictions. Our AI cross-references real-time IoT data with national pollution guidelines to certify your facility's environmental impact.
          </p>

          <div className="pt-4 flex items-center space-x-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-[#1a1d20] flex items-center justify-center text-[10px] font-bold text-gray-400">PDF</div>
              <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-[#1a1d20] flex items-center justify-center text-[10px] font-bold text-gray-400">CSV</div>
              <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-[#1a1d20] flex items-center justify-center text-[10px] font-bold text-gray-400">API</div>
            </div>
            <span className="text-xs text-gray-500 font-medium">Export Formats Supported</span>
          </div>
        </div>

        {/* Right Side: Interactive Generator */}
        <div className="w-full md:w-[400px] bg-[#121416] p-6 rounded-2xl border border-gray-800 shadow-inner">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-200">Jaipur District - Sector 4</div>
              <div className="text-xs text-gray-500">Trailing 30-Day Analysis</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-xs font-medium text-gray-400">
              <span>Status</span>
              <span className={isComplete ? "text-green-400" : "text-blue-400"}>{statusText}</span>
            </div>
            
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ease-out ${isComplete ? "bg-green-500" : "bg-blue-500"}`}
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="pt-4">
              {!isComplete ? (
                <Button 
                  onClick={generateReport} 
                  disabled={isGenerating}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Official Report'
                  )}
                </Button>
              ) : (
                <Button 
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-bold transition-all animate-fade-in"
                  onClick={() => {
                    alert("Simulated PDF Download Started!");
                    setIsComplete(false);
                    setProgress(0);
                    setStatusText('Initiate Compliance Scan');
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Complete Report
                </Button>
              )}
            </div>

            {isComplete && (
              <div className="flex items-center justify-center space-x-2 text-green-400 text-xs font-medium pt-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>Digitally Signed & Certified</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </Card>
  );
};
