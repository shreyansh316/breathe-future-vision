import { useState, useEffect } from 'react';

export interface ExposureData {
  currentPM25: number;
  cumulativeExposure: number; // in ug/m3 hours
  timeTracked: number; // in minutes
  badges: string[];
  healthStatus: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
  safeHoursRemaining: number;
}

export const useExposureTracker = () => {
  const [exposure, setExposure] = useState<ExposureData>({
    currentPM25: 45, // Default/Mock value
    cumulativeExposure: 0,
    timeTracked: 0,
    badges: ['Early Bird'],
    healthStatus: 'Good',
    safeHoursRemaining: 24,
  });

  const [isTracking, setIsTracking] = useState(false);
  const [location, setLocation] = useState<{lat: number, lon: number} | null>(null);
  
  // Daily WHO safe limit is roughly 15 ug/m3 * 24 hours = 360 cumulative exposure limit
  const DAILY_LIMIT = 360; 

  const startTracking = () => {
    if ("geolocation" in navigator) {
      setIsTracking(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
          // In a real app, we would fetch the nearest PM2.5 from VayuNet API based on lat/lon
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to mock tracking
        }
      );
    } else {
      setIsTracking(true); // Fallback mock
    }
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  // Simulate tracking loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTracking) {
      interval = setInterval(() => {
        setExposure(prev => {
          // Simulate wandering into different pollution zones
          const fluctuation = Math.random() > 0.5 ? 5 : -5;
          const newPM25 = Math.max(10, Math.min(300, prev.currentPM25 + fluctuation));
          
          // Add PM2.5 exposure for this minute (pm25 * 1 minute / 60 minutes)
          const exposureThisMinute = newPM25 / 60;
          const newCumulative = prev.cumulativeExposure + exposureThisMinute;
          const newTimeTracked = prev.timeTracked + 1;
          
          let status: ExposureData['healthStatus'] = 'Good';
          if (newPM25 < 20) status = 'Excellent';
          else if (newPM25 > 150) status = 'Critical';
          else if (newPM25 > 100) status = 'Poor';
          else if (newPM25 > 50) status = 'Fair';
          
          // Calculate safe hours remaining
          const remainingExposure = DAILY_LIMIT - newCumulative;
          const safeHoursRemaining = remainingExposure > 0 ? (remainingExposure / newPM25) : 0;
          
          // Give badges
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
      }, 1000); // 1 real second = 1 minute simulated time for demo purposes
    }
    
    return () => clearInterval(interval);
  }, [isTracking]);

  return { exposure, isTracking, startTracking, stopTracking, location };
};
