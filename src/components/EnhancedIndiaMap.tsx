import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Zap, Activity } from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { useFireData } from '@/hooks/useFireData';

interface City {
  name: string;
  pm25: number;
  pm10: number;
  aqi: string;
  color: string;
  state: string;
  coordinates: [number, number];
  actualAqi?: number;
}

interface EnhancedIndiaMapProps {
  cities: City[];
  selectedCity: string;
  onCitySelect: (cityName: string) => void;
  showHeatmap?: boolean;
  hoursAhead?: number;
  showFires?: boolean;
}

// Component to handle flying to selected city
const MapController = ({ selectedCity, cities }: { selectedCity: string, cities: City[] }) => {
  const map = useMap();
  useEffect(() => {
    const city = cities.find(c => c.name === selectedCity);
    if (city && city.coordinates) {
      map.flyTo([city.coordinates[1], city.coordinates[0]], 6, {
        duration: 1.5
      });
    }
  }, [selectedCity, cities, map]);
  return null;
};

// Helper to get color based on forecasted PM2.5
const getForecastColor = (pm25: number) => {
  if (pm25 <= 35) return '#4CAF50';
  if (pm25 <= 55) return '#FFA726';
  if (pm25 <= 150) return '#FF8F00';
  if (pm25 <= 250) return '#DC143C';
  return '#8B0000';
};

// Heatmap Layer Component
const HeatmapLayer = ({ cities, hoursAhead = 0 }: { cities: City[], hoursAhead?: number }) => {
  const map = useMap();
  useEffect(() => {
    if (!(L as any).heatLayer) return;
    
    // Generate data points for heatmap [lat, lng, intensity]
    // We add some synthetic points around cities to simulate the rural grid fusion
    const points: any[] = [];
    
    cities.forEach(city => {
      const lat = city.coordinates[1];
      const lng = city.coordinates[0];
      
      // Simulate forecasting trend (worse at night, generally trending up over 5 days)
      const trend = 1 + (hoursAhead / 120) * 1.5;
      const forecastedPm25 = city.pm25 * trend;
      const intensity = forecastedPm25 * 3;
      
      points.push([lat, lng, intensity]);
      
      // Simulate rural fusion spread
      points.push([lat + 0.5, lng + 0.5, intensity * 0.6]);
      points.push([lat - 0.5, lng - 0.5, intensity * 0.6]);
      points.push([lat + 0.8, lng - 0.2, intensity * 0.4]);
      points.push([lat - 0.2, lng + 0.8, intensity * 0.4]);
    });
    
    const heatLayer = (L as any).heatLayer(points, {
      radius: 35,
      blur: 25,
      maxZoom: 10,
      max: 1000,
      gradient: {0.2: 'blue', 0.4: 'lime', 0.6: 'yellow', 0.8: 'orange', 1.0: 'red'}
    }).addTo(map);
    
    return () => {
      map.removeLayer(heatLayer);
    };
  }, [cities, map]);
  
  return null;
};

// Fire Layer Component
const FireLayer = ({ showFires }: { showFires?: boolean }) => {
  const { fires } = useFireData();
  
  if (!showFires) return null;

  return (
    <>
      {fires.map(fire => (
        <CircleMarker
          key={fire.id}
          center={[fire.lat, fire.lng]}
          radius={4 + (fire.intensity / 20)}
          pathOptions={{
            fillColor: '#FF3D00',
            fillOpacity: 0.8,
            color: '#DD2C00',
            weight: 1,
            className: 'animate-pulse'
          }}
        >
          <Popup>
            <div className="p-1">
              <h4 className="font-bold text-red-600 mb-1">Active Stubble Fire</h4>
              <p className="text-xs text-gray-600">Intensity: {fire.intensity.toFixed(1)} FRP</p>
              <p className="text-xs text-gray-600">Detected: {new Date(fire.timestamp).toLocaleTimeString()}</p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </>
  );
};

export const EnhancedIndiaMap = ({ cities, selectedCity, onCitySelect, showHeatmap = false, hoursAhead = 0, showFires = false }: EnhancedIndiaMapProps) => {
  
  // Center of India approximately
  const defaultCenter: [number, number] = [20.5937, 78.9629];

  // CSS styles for the scrollbar
  const scrollbarStyles = `
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #00C853 transparent;
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: #00C853;
      border-radius: 2px;
    }
    
    .leaflet-container {
      background: #E3F2FD;
      z-index: 10;
    }
  `;

  return (
    <div className="relative w-full">
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      
      <div className="h-[600px] w-full rounded-xl overflow-hidden border-2 border-indigo-100 shadow-inner">
        <MapContainer 
          center={defaultCenter} 
          zoom={5} 
          className="h-full w-full"
          zoomControl={false}
          scrollWheelZoom={true}
          preferCanvas={true}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Standard View">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
            </LayersControl.BaseLayer>
            
            <LayersControl.BaseLayer name="Satellite View">
              <TileLayer
                attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            </LayersControl.BaseLayer>
          </LayersControl>
          
          <MapController selectedCity={selectedCity} cities={cities} />
          
          {showHeatmap && <HeatmapLayer cities={cities} hoursAhead={hoursAhead} />}
          
          <FireLayer showFires={showFires} />

          {!showHeatmap && cities.map((city, index) => {
            const isSelected = city.name === selectedCity;
            const trend = 1 + (hoursAhead / 120) * 1.5;
            const forecastedPm25 = hoursAhead > 0 ? city.pm25 * trend : city.pm25;
            const forecastColor = hoursAhead > 0 ? getForecastColor(forecastedPm25) : city.color;
            
            // Rural nodes are rendered as tiny dots without popups for performance
            if (city.isRuralNode) {
              return (
                <CircleMarker
                  key={`rural-${index}`}
                  center={[city.coordinates[1], city.coordinates[0]]}
                  radius={2}
                  pathOptions={{
                    fillColor: forecastColor,
                    fillOpacity: 0.8,
                    color: forecastColor,
                    weight: 0,
                    interactive: false // Disable interaction for pure visual speed
                  }}
                />
              );
            }

            const radius = Math.min(Math.max(6, forecastedPm25 / 10), 24);
            
            return (
              <CircleMarker
                key={`city-${city.name}`}
                center={[city.coordinates[1], city.coordinates[0]]}
                radius={isSelected ? radius + 4 : radius}
                pathOptions={{
                  fillColor: forecastColor,
                  fillOpacity: 0.7,
                  color: isSelected ? '#FFFFFF' : forecastColor,
                  weight: isSelected ? 3 : 1
                }}
                eventHandlers={{
                  click: () => onCitySelect(city.name),
                }}
              >
                <Popup>
                  <div className="p-1">
                    <h3 className="font-bold text-lg mb-1">{city.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{city.state}</p>
                    {hoursAhead > 0 && (
                      <Badge className="bg-indigo-600 mb-2">T+{hoursAhead} Forecast</Badge>
                    )}
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold">{hoursAhead > 0 ? 'Predicted AQI:' : 'AQI:'}</span>
                      <Badge style={{ backgroundColor: forecastColor, color: '#fff' }}>
                        {hoursAhead > 0 ? Math.round(forecastedPm25 * 1.5) : city.aqi}
                      </Badge>
                    </div>
                    <div className="text-sm">
                      <p><strong>PM2.5:</strong> {Math.round(forecastedPm25)} µg/m³</p>
                      <p><strong>PM10:</strong> {Math.round(forecastedPm25 * 1.6)} µg/m³</p>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
      
      <div className="absolute top-2 right-2 md:top-4 md:right-4 flex space-x-2 z-[1000]">
        <Badge className="bg-[#00C853] text-white animate-pulse shadow-md">
          <Activity className="w-3 h-3 mr-1" />
          Live Data
        </Badge>
        <Badge className="bg-[#FF6F00] text-white shadow-md">
          <Zap className="w-3 h-3 mr-1" />
          Real-time
        </Badge>
      </div>

      {/* Enhanced city selector grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-4 text-xs max-h-56 overflow-y-auto custom-scrollbar">
        {cities.slice(0, 25).map((city) => (
          <button
            key={city.name}
            onClick={() => onCitySelect(city.name)}
            className={`p-2 rounded-lg transition-all duration-300 text-left transform hover:scale-105 ${
              selectedCity === city.name
                ? 'bg-gradient-to-r from-[#00C853]/20 to-[#00C853]/10 border-2 border-[#00C853]/50 shadow-lg scale-105'
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
                <div className="text-[#263238]/60 truncate flex items-center space-x-1">
                  <span>{city.aqi}</span>
                  {city.actualAqi && (
                    <span className="text-[#00C853] font-semibold">({city.actualAqi})</span>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {cities.length > 25 && (
        <div className="text-center mt-2">
          <span className="text-xs text-[#263238]/60">
            Showing 25 of {cities.length} cities. Click map or search for more.
          </span>
        </div>
      )}
    </div>
  );
};
