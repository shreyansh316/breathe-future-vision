import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ShieldAlert, Bell, Info, XCircle, Activity, Wind } from 'lucide-react';
import { VayuGuardAlert } from '@/hooks/useVayuGuard';

interface VayuGuardAlertsProps {
  alertHistory: VayuGuardAlert[];
  onClear: () => void;
}

export const VayuGuardAlerts = ({ alertHistory, onClear }: VayuGuardAlertsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = alertHistory.length;

  const getAlertIcon = (type: VayuGuardAlert['type']) => {
    switch (type) {
      case 'CRITICAL_AQI': return <Activity className="w-5 h-5 text-red-500" />;
      case 'SMOKE_PLUME': return <Wind className="w-5 h-5 text-orange-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getAlertBg = (type: VayuGuardAlert['type']) => {
    switch (type) {
      case 'CRITICAL_AQI': return 'bg-red-50 border-red-200';
      case 'SMOKE_PLUME': return 'bg-orange-50 border-orange-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-4 z-[999] bg-gray-900 text-white p-3 rounded-full shadow-2xl hover:bg-gray-800 transition-all flex items-center justify-center border-2 border-red-500/50 hover:border-red-500"
      >
        <div className="relative">
          <ShieldAlert className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
              {unreadCount}
            </span>
          )}
        </div>
      </button>

      {/* Slide-out Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-[1000] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-gray-900 text-white p-5 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-6 h-6 text-red-500" />
              <h2 className="font-bold text-lg">VayuGuard System</h2>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center text-xs text-gray-500 font-medium">
            <div className="flex items-center space-x-1">
              <Bell className="w-3 h-3" />
              <span>National AI Alert Log</span>
            </div>
            {unreadCount > 0 && (
              <button onClick={onClear} className="text-blue-600 hover:underline">Clear History</button>
            )}
          </div>

          {/* Scrollable Alert List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {alertHistory.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2">
                <ShieldAlert className="w-12 h-12 opacity-20" />
                <p>No active alerts.</p>
              </div>
            ) : (
              alertHistory.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-3 rounded-lg border ${getAlertBg(alert.type)} animate-in fade-in slide-in-from-right-4 duration-300`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm text-gray-900">{alert.title}</h4>
                        <span className="text-[10px] text-gray-500 flex-shrink-0 ml-2">
                          {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-gray-700 mt-1">{alert.message}</p>
                      {alert.location && (
                        <div className="mt-2 text-[10px] font-mono bg-white/50 px-2 py-0.5 rounded inline-block text-gray-600 border border-black/5">
                          ZONE: {alert.location.toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[998] sm:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
