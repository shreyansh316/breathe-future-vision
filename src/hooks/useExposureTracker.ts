import { useState, useEffect, useRef } from 'react';

export interface ExposureData {
  currentPM25: number;
  cumulativeExposure: number; // in ug/m3 hours
  timeTracked: number; // in minutes
  badges: string[];
  healthStatus: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
  safeHoursRemaining: number;
}

const STORAGE_KEY = 'janaqi_exposure_data';
const DAILY_LIMIT = 360; // Daily WHO safe limit is roughly 15 ug/m3 * 24 hours

const defaultData: ExposureData = {
  currentPM25: 45,
  cumulativeExposure: 0,
  timeTracked: 0,
  badges: ['Early Bird'],
  healthStatus: 'Good',
  safeHoursRemaining: 24,
};

export const useExposureTracker = () => {
  const [exposure, setExposure] = useState<ExposureData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not load exposure data from local storage', e);
    }
    return defaultData;
  });

  const [isTracking, setIsTracking] = useState(false);
  const [location, setLocation] = useState<{lat: number, lon: number} | null>(null);
  
  const watchIdRef = useRef<number | null>(null);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(exposure));
    } catch (e) {
      console.warn('Could not save exposure data to local storage', e);
    }
  }, [exposure]);

  const startTracking = () => {
    setIsTracking(true);
    if ("geolocation" in navigator) {
      // Use watchPosition for real-time tracking
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
          // In a real app, fetch nearby AQI node from VayuNet based on lat/lon
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
    }
  };

  const stopTracking = () => {
    setIsTracking(false);
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  // Tracking loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTracking) {
      interval = setInterval(() => {
        setExposure(prev => {
          // Simulate dynamic AQI based on movement (random walk)
          const fluctuation = Math.random() > 0.5 ? 5 : -5;
          const newPM25 = Math.max(10, Math.min(300, prev.currentPM25 + fluctuation));
          
          // Calculate exposure (1 sec real = 1 min simulated for demo)
          const exposureThisMinute = newPM25 / 60;
          const newCumulative = prev.cumulativeExposure + exposureThisMinute;
          const newTimeTracked = prev.timeTracked + 1;
          
          let status: ExposureData['healthStatus'] = 'Good';
          if (newPM25 < 20) status = 'Excellent';
          else if (newPM25 > 150) status = 'Critical';
          else if (newPM25 > 100) status = 'Poor';
          else if (newPM25 > 50) status = 'Fair';
          
          const remainingExposure = DAILY_LIMIT - newCumulative;
          const safeHoursRemaining = remainingExposure > 0 ? (remainingExposure / newPM25) : 0;
          
          const newBadges = [...prev.badges];
          if (newCumulative < 50 && newTimeTracked > 60 && !newBadges.includes('Clean Lungs')) {
            newBadges.push('Clean Lungs');
          }
          if (newTimeTracked > 120 && !newBadges.includes('Avid Tracker')) {
            newBadges.push('Avid Tracker');
          }

          return {
            ...prev,
            currentPM25: newPM25,
            cumulativeExposure: newCumulative,
            timeTracked: newTimeTracked,
            healthStatus: status,
            safeHoursRemaining: safeHoursRemaining,
            badges: newBadges
          };
        });
      }, 1000);
    }
    
    return () => {
      clearInterval(interval);
      if (!isTracking && watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [isTracking]);

  return { exposure, isTracking, startTracking, stopTracking, location };
};
