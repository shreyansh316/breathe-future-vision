import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface VayuGuardAlert {
  id: string;
  type: 'CRITICAL_AQI' | 'SMOKE_PLUME' | 'SYSTEM_UPDATE';
  title: string;
  message: string;
  timestamp: string;
  location?: string;
}

export const useVayuGuard = (currentCityAQI: number, cityName: string, fireCount: number) => {
  const [alertHistory, setAlertHistory] = useState<VayuGuardAlert[]>([]);

  const addAlert = (alert: Omit<VayuGuardAlert, 'id' | 'timestamp'>) => {
    const newAlert: VayuGuardAlert = {
      ...alert,
      id: `alert-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    
    setAlertHistory(prev => [newAlert, ...prev]);
    
    // Trigger the global toast
    if (alert.type === 'CRITICAL_AQI') {
      toast.error(alert.title, {
        description: alert.message,
        duration: 8000,
      });
    } else if (alert.type === 'SMOKE_PLUME') {
      toast.warning(alert.title, {
        description: alert.message,
        duration: 8000,
      });
    } else {
      toast.info(alert.title, {
        description: alert.message,
        duration: 5000,
      });
    }
  };

  // Simulate incoming alerts based on current state
  useEffect(() => {
    // 1. Check for Critical AQI
    if (currentCityAQI > 300) {
      const hasFiredRecently = alertHistory.some(
        a => a.type === 'CRITICAL_AQI' && a.location === cityName
      );
      
      if (!hasFiredRecently) {
        // Delay slightly for realism
        const timer = setTimeout(() => {
          addAlert({
            type: 'CRITICAL_AQI',
            title: `Emergency: Hazardous AQI in ${cityName}`,
            message: `AQI has breached 300. Mandatory GRAP Stage 4 protocols are now active. Please remain indoors.`,
            location: cityName
          });
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [currentCityAQI, cityName]);

  useEffect(() => {
    // 2. Check for Smoke Plumes from AgroClean
    if (fireCount > 30) {
      const hasFiredRecently = alertHistory.some(a => a.type === 'SMOKE_PLUME');
      
      if (!hasFiredRecently) {
        const timer = setTimeout(() => {
          addAlert({
            type: 'SMOKE_PLUME',
            title: `VayuGuard Alert: Approaching Smoke Plume`,
            message: `Satellite detects ${fireCount} active agricultural fires. Wind trajectory indicates smoke will impact Northern plains in 24 hrs.`,
            location: 'North India'
          });
        }, 8000); // Fire a bit later
        return () => clearTimeout(timer);
      }
    }
  }, [fireCount]);
  
  // Initial system boot alert
  useEffect(() => {
    if (alertHistory.length === 0) {
      addAlert({
        type: 'SYSTEM_UPDATE',
        title: 'VayuGuard Network Online',
        message: 'Connected to National Air Quality Grid. Monitoring 7,900+ nodes and ISRO satellite feeds.',
        location: 'All India'
      });
    }
  }, []);

  const clearHistory = () => setAlertHistory([]);

  return { alertHistory, clearHistory, addAlert };
};
