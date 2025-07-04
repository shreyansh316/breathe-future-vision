import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { ShieldAlert, Bell, Info, XCircle, Activity, Wind, Volume2, VolumeX, AlertOctagon } from 'lucide-react';
import { VayuGuardAlert } from '@/hooks/useVayuGuard';
import { Button } from '@/components/ui/button';

// A short, high-pitched "Emergency Beep" sound encoded in Base64 so we don't need external assets
const ALARM_SOUND_BASE64 = "data:audio/wav;base64,UklGRn4AAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YVoAAAAAEADg//3/g/8CAND/5//x/+n/6v/h/+P/2v/T/8//xv/E/7v/uP+x/6n/pf+h/5n/lf+O/4n/hP9+/3v/df9x/2z/aP9k/1//XP9Y/1T/Uv9P/0z/Sf9H/0T/Qf8=";

interface VayuGuardAlertsProps {
  alertHistory: VayuGuardAlert[];
  onClear: () => void;
  onTestAlarm?: () => void; // Optional test trigger
}

export const VayuGuardAlerts = ({ alertHistory, onClear, onTestAlarm }: VayuGuardAlertsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeEmergency, setActiveEmergency] = useState<VayuGuardAlert | null>(null);
  
  const previousAlertCount = useRef(alertHistory.length);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const unreadCount = alertHistory.length;

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(ALARM_SOUND_BASE64);
    audioRef.current.loop = true; // Loop until dismissed
  }, []);

  // Monitor for new alerts
  useEffect(() => {
    if (alertHistory.length > previousAlertCount.current) {
      const latestAlert = alertHistory[0]; // newest is at index 0
      
      // If it's a CRITICAL alert, trigger the emergency protocol
      if (latestAlert && latestAlert.type === 'CRITICAL_AQI') {
        setActiveEmergency(latestAlert);
        if (!isMuted && audioRef.current) {
          audioRef.current.play().catch(e => console.warn('Audio play blocked by browser. User interaction needed.', e));
        }
      }
    }
    previousAlertCount.current = alertHistory.length;
  }, [alertHistory, isMuted]);

  const dismissEmergency = () => {
    setActiveEmergency(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

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
      {/* Emergency Full-Screen Overlay */}
      {activeEmergency && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-red-900/80 backdrop-blur-md animate-pulse">
          <div className="bg-red-50 border-4 border-red-600 rounded-2xl p-8 max-w-lg text-center shadow-2xl animate-scale-in">
            <AlertOctagon className="w-24 h-24 text-red-600 mx-auto mb-6 animate-bounce" />
            <h1 className="text-4xl font-black text-red-700 mb-4 uppercase tracking-wider">
              CRITICAL ALERT
            </h1>
            <p className="text-xl font-bold text-gray-900 mb-2">{activeEmergency.title}</p>
            <p className="text-md text-red-800 mb-8">{activeEmergency.message}</p>
            
            <Button 
              onClick={dismissEmergency}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-lg w-full"
            >
              ACKNOWLEDGE ALARM
            </Button>
          </div>
        </div>
      )}

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
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsMuted(!isMuted)} 
                className={`p-1.5 rounded-full transition-colors ${isMuted ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}
                title={isMuted ? "Unmute Alarms" : "Mute Alarms"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="p-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center text-xs text-gray-500 font-medium">
            <div className="flex items-center space-x-1">
              <Bell className="w-3 h-3" />
              <span>National AI Alert Log</span>
            </div>
            <div className="flex space-x-2">
              {onTestAlarm && (
                 <button onClick={onTestAlarm} className="text-red-600 font-bold hover:underline">Test Alarm</button>
              )}
              {unreadCount > 0 && (
                <button onClick={onClear} className="text-blue-600 hover:underline">Clear</button>
              )}
            </div>
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
      {isOpen && !activeEmergency && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[998] sm:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

