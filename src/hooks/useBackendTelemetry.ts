import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const BACKEND_URL = 'http://localhost:5000';

interface TelemetryData {
  aqi: number;
  pm25: number;
  pm10: number;
  temperature: number;
  humidity: number;
  status?: string;
}

export function useBackendTelemetry(cityKey: string, initialFallback: TelemetryData) {
  const [data, setData] = useState<TelemetryData>(initialFallback);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let socket: ReturnType<typeof io> | null = null;

    const setupConnection = async () => {
      try {
        setIsLoading(true);
        // Step 1: Fetch initial payload over HTTP
        const response = await fetch(`${BACKEND_URL}/api/v2/live/${cityKey}`);
        if (!response.ok) throw new Error("Network query response failed parsing.");
        
        const result = await response.json();
        
        const current = result.data.current;
        setData({
          aqi: current.aqi,
          pm25: current.pm25,
          pm10: current.pm10,
          temperature: current.temperature || 32,
          humidity: current.humidity || 56,
          status: current.status
        });

        // Step 2: Establish WebSocket Connection for push updates
        socket = io(BACKEND_URL);

        socket.on('connect', () => {
          console.log(`[Socket.io] Connected to telemetry stream for ${cityKey}`);
          setIsConnected(true);
        });

        socket.on('disconnect', () => {
          setIsConnected(false);
        });

        socket.on('telemetry-update', (dbMatrix: any) => {
          // Check if our city has data in the broadcast payload
          if (dbMatrix[cityKey] && dbMatrix[cityKey].current) {
            const freshData = dbMatrix[cityKey].current;
            setData((prev) => ({
              ...prev,
              aqi: freshData.aqi,
              pm25: freshData.pm25,
              pm10: freshData.pm10,
              status: freshData.status
            }));
          }
        });

      } catch (err: any) {
        console.error("Critical framework failure synchronization engine error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setupConnection();

    // Cleanup socket on unmount or when city changes
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [cityKey]);

  return { data, isLoading, error, originalStatus: data.status, isConnected };
}
