import { useState, useEffect } from 'react';

export interface FireHotspot {
  id: string;
  lat: number;
  lng: number;
  intensity: number; // e.g. FRP (Fire Radiative Power)
  timestamp: string;
}

export const useFireData = () => {
  const [fires, setFires] = useState<FireHotspot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching VIIRS/MODIS satellite data
    const fetchFires = () => {
      setIsLoading(true);
      
      // Generate synthetic fire data primarily in Punjab/Haryana region during autumn
      // Bounding box for Punjab/Haryana roughly: Lat 29.0 to 32.5, Lng 73.5 to 77.5
      
      const syntheticFires: FireHotspot[] = [];
      const numFires = Math.floor(Math.random() * 40) + 20; // 20-60 active fires
      
      for (let i = 0; i < numFires; i++) {
        syntheticFires.push({
          id: `fire-${i}-${Date.now()}`,
          lat: 29.0 + Math.random() * 3.5,
          lng: 73.5 + Math.random() * 4.0,
          intensity: Math.random() * 100 + 10,
          timestamp: new Date().toISOString()
        });
      }

      // Add a few random fires elsewhere in India for realism
      for (let i = 0; i < 5; i++) {
        syntheticFires.push({
          id: `fire-rand-${i}-${Date.now()}`,
          lat: 10.0 + Math.random() * 15.0,
          lng: 74.0 + Math.random() * 10.0,
          intensity: Math.random() * 50 + 5,
          timestamp: new Date().toISOString()
        });
      }

      setFires(syntheticFires);
      setIsLoading(false);
    };

    fetchFires();
    
    // Refresh fire data every 5 minutes (simulating a satellite pass interval, compressed for demo)
    const interval = setInterval(fetchFires, 300000); 
    
    return () => clearInterval(interval);
  }, []);

  return { fires, isLoading };
};
