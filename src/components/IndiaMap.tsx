
import React, { useRef, useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Zap } from 'lucide-react';
import { cityPositions } from '@/data/cities';

interface City {
  name: string;
  pm25: number;
  pm10: number;
  aqi: string;
  color: string;
  state: string;
  coordinates: [number, number];
  position?: { x: number; y: number };
}

interface IndiaMapProps {
  cities: City[];
  selectedCity: string;
  onCitySelect: (cityName: string) => void;
}

export const IndiaMap = ({ cities, selectedCity, onCitySelect }: IndiaMapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mapDimensions, setMapDimensions] = useState({ width: 500, height: 400 });

  const citiesWithPositions = React.useMemo(() => {
    return cities.map(city => ({
      ...city,
      position: cityPositions[city.name as keyof typeof cityPositions] || { x: 0.5, y: 0.5 }
    }));
  }, [cities]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const container = canvas.parentElement;
        if (container) {
          const containerWidth = container.clientWidth;
          const width = Math.min(containerWidth - 32, 600);
          const height = width * 0.8;
          setMapDimensions({ width, height });
        }
      }, 150); // Point 54: Debounce heavy UI operations
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = mapDimensions.width;
    canvas.height = mapDimensions.height;

    // Enhanced India map outline with better detail
    const drawIndiaMap = () => {
      ctx.fillStyle = '#E8F5E8';
      ctx.strokeStyle = '#00C853';
      ctx.lineWidth = 2;

      // Main India outline (simplified but more accurate)
      ctx.beginPath();
      
      // Kashmir region
      ctx.moveTo(mapDimensions.width * 0.35, mapDimensions.height * 0.15);
      ctx.quadraticCurveTo(mapDimensions.width * 0.40, mapDimensions.height * 0.12, mapDimensions.width * 0.45, mapDimensions.height * 0.15);
      ctx.quadraticCurveTo(mapDimensions.width * 0.50, mapDimensions.height * 0.18, mapDimensions.width * 0.52, mapDimensions.height * 0.20);
      
      // Northern border
      ctx.lineTo(mapDimensions.width * 0.70, mapDimensions.height * 0.25);
      
      // Eastern border (through West Bengal, Assam)
      ctx.quadraticCurveTo(mapDimensions.width * 0.75, mapDimensions.height * 0.30, mapDimensions.width * 0.78, mapDimensions.height * 0.40);
      ctx.quadraticCurveTo(mapDimensions.width * 0.75, mapDimensions.height * 0.50, mapDimensions.width * 0.70, mapDimensions.height * 0.60);
      
      // Eastern coast (Odisha, Andhra Pradesh)
      ctx.lineTo(mapDimensions.width * 0.65, mapDimensions.height * 0.70);
      ctx.quadraticCurveTo(mapDimensions.width * 0.60, mapDimensions.height * 0.80, mapDimensions.width * 0.55, mapDimensions.height * 0.85);
      
      // Southern tip (Kanyakumari)
      ctx.quadraticCurveTo(mapDimensions.width * 0.50, mapDimensions.height * 0.90, mapDimensions.width * 0.45, mapDimensions.height * 0.85);
      
      // Western coast (Kerala, Karnataka, Goa)
      ctx.quadraticCurveTo(mapDimensions.width * 0.40, mapDimensions.height * 0.80, mapDimensions.width * 0.38, mapDimensions.height * 0.70);
      ctx.lineTo(mapDimensions.width * 0.35, mapDimensions.height * 0.60);
      
      // Maharashtra coast
      ctx.quadraticCurveTo(mapDimensions.width * 0.32, mapDimensions.height * 0.50, mapDimensions.width * 0.30, mapDimensions.height * 0.40);
      
      // Gujarat coast
      ctx.quadraticCurveTo(mapDimensions.width * 0.25, mapDimensions.height * 0.35, mapDimensions.width * 0.22, mapDimensions.height * 0.30);
      ctx.quadraticCurveTo(mapDimensions.width * 0.25, mapDimensions.height * 0.25, mapDimensions.width * 0.30, mapDimensions.height * 0.20);
      
      // Back to Kashmir
      ctx.quadraticCurveTo(mapDimensions.width * 0.32, mapDimensions.height * 0.17, mapDimensions.width * 0.35, mapDimensions.height * 0.15);
      
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Add some internal state boundaries for detail
      ctx.strokeStyle = '#00C853';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;
      
      // Gujarat-Rajasthan border
      ctx.beginPath();
      ctx.moveTo(mapDimensions.width * 0.28, mapDimensions.height * 0.25);
      ctx.lineTo(mapDimensions.width * 0.35, mapDimensions.height * 0.35);
      ctx.stroke();
      
      // Maharashtra-Karnataka border
      ctx.beginPath();
      ctx.moveTo(mapDimensions.width * 0.35, mapDimensions.height * 0.62);
      ctx.lineTo(mapDimensions.width * 0.55, mapDimensions.height * 0.62);
      ctx.stroke();
      
      // Andhra-Tamil Nadu border
      ctx.beginPath();
      ctx.moveTo(mapDimensions.width * 0.48, mapDimensions.height * 0.72);
      ctx.lineTo(mapDimensions.width * 0.60, mapDimensions.height * 0.75);
      ctx.stroke();
      
      ctx.globalAlpha = 1;
    };

    drawIndiaMap();

    // Draw cities with enhanced visualization for 51 cities
    citiesWithPositions.forEach((city) => {
      const x = city.position.x * mapDimensions.width;
      const y = city.position.y * mapDimensions.height;
      const isSelected = city.name === selectedCity;
      const baseSize = 6;
      const intensity = city.pm25 / 200;
      const size = baseSize + intensity * 8;

      // City glow effect for selected city
      if (isSelected) {
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, size + 12);
        glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(x, y, size + 12, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();
      }

      // Pollution visualization with gradient
      const pollutionGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      pollutionGradient.addColorStop(0, city.color + 'FF');
      pollutionGradient.addColorStop(0.6, city.color + 'BB');
      pollutionGradient.addColorStop(1, city.color + '44');
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = pollutionGradient;
      ctx.fill();

      // City border
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.strokeStyle = isSelected ? '#FFFFFF' : city.color;
      ctx.lineWidth = isSelected ? 2.5 : 1.5;
      ctx.stroke();

      // Pulse animation for severe pollution
      if (city.pm25 > 150) {
        const pulseSize = size + Math.sin(Date.now() * 0.008) * 3;
        ctx.beginPath();
        ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
        ctx.strokeStyle = city.color + '60';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // City name for selected city
      if (isSelected) {
        ctx.fillStyle = '#263238';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(city.name, x, y - size - 8);
      }
    });

  }, [mapDimensions, citiesWithPositions, selectedCity]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Check if click is near any city
    citiesWithPositions.forEach((city) => {
      const cityX = city.position.x * mapDimensions.width;
      const cityY = city.position.y * mapDimensions.height;
      const distance = Math.sqrt((clickX - cityX) ** 2 + (clickY - cityY) ** 2);
      
      if (distance < 20) { // Click tolerance
        onCitySelect(city.name);
      }
    });
  };

  return (
    <div className="relative w-full">
      <div className="flex justify-center mb-4">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="cursor-pointer rounded-xl shadow-lg border-2 border-white/50 bg-gradient-to-br from-blue-50/80 to-green-50/80"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
      
      {/* Live indicator */}
      <div className="absolute top-2 right-2 md:top-4 md:right-4">
        <Badge className="bg-[#00C853] text-white">
          <Zap className="w-3 h-3 mr-1" />
          Live WAQI
        </Badge>
      </div>

      {/* Enhanced city labels grid for mobile - showing more cities */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-4 text-xs max-h-48 overflow-y-auto">
        {citiesWithPositions.slice(0, 20).map((city) => (
          <button
            key={city.name}
            onClick={() => onCitySelect(city.name)}
            className={`p-2 rounded-lg transition-all duration-200 text-left ${
              selectedCity === city.name
                ? 'bg-white/90 border-2 border-[#00C853]/50 shadow-md'
                : 'bg-white/60 border border-white/50 hover:bg-white/80'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: city.color }}
              />
              <div className="min-w-0 flex-1">
                <div className="font-medium text-[#263238] truncate">{city.name}</div>
                <div className="text-[#263238]/60 truncate">{city.aqi}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {citiesWithPositions.length > 20 && (
        <div className="text-center mt-2">
          <span className="text-xs text-[#263238]/60">
            Showing 20 of {citiesWithPositions.length} cities. Click on map for more.
          </span>
        </div>
      )}
    </div>
  );
};
