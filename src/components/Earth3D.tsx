import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Satellite, Globe, Zap, MapPin, Wind, RefreshCw, Thermometer, Droplets, Gauge } from 'lucide-react';
import { CitySelector } from './CitySelector';
import { EnhancedIndiaMap } from './EnhancedIndiaMap';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePollutionData } from '@/hooks/usePollutionData';

export const Earth3D = () => {
  const { t } = useLanguage();
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const { cities, loading, lastUpdated, error, refreshData, retryCount } = usePollutionData();

  const currentCity = cities.find(city => city.name === selectedCity);

  return (
    <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50/95 via-indigo-50/95 to-purple-50/95 border-2 border-[#00C853]/20 shadow-2xl backdrop-blur-sm">
      <div className="text-center mb-4">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#263238] mb-2 flex items-center justify-center space-x-2 flex-wrap">
          <Globe className="w-6 h-6 sm:w-7 sm:h-7 text-[#00C853] animate-spin" />
          <span className="text-center">{t('liveSatelliteMapping')}</span>
          <Satellite className="w-6 h-6 sm:w-7 sm:h-7 text-[#FF6F00] animate-bounce" />
        </h3>
        <p className="text-sm text-[#263238]/70 flex items-center justify-center space-x-2 flex-wrap">
          <span className="text-center">{t('satelliteDescription')}</span>
          <Wind className="w-4 h-4 text-blue-500 animate-pulse" />
        </p>
      </div>

      <div className="mb-4 sm:mb-6">
        <CitySelector 
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          cities={cities}
        />
      </div>

      {/* Enhanced India Map */}
      <div className="flex justify-center mb-4 sm:mb-6">
        <div className="relative w-full max-w-3xl">
          <EnhancedIndiaMap 
            cities={cities}
            selectedCity={selectedCity}
            onCitySelect={setSelectedCity}
          />
        </div>
      </div>

      {currentCity && (
        <div className="mb-4 p-4 bg-gradient-to-r from-white/70 to-blue-50/70 rounded-xl border border-white/50 backdrop-blur-sm animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-[#263238] flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#00C853] animate-pulse" />
              <span className="truncate">{currentCity.name}, {currentCity.state}</span>
            </h4>
            <div className="flex items-center space-x-2">
              <Badge style={{ backgroundColor: currentCity.color, color: 'white' }} className="animate-pulse">
                PM2.5: {currentCity.pm25}
              </Badge>
              {currentCity.actualAqi && (
                <Badge className="bg-[#00C853] text-white animate-bounce">
                  AQI: {currentCity.actualAqi}
                </Badge>
              )}
            </div>
          </div>
          
          {/* Enhanced data display with WAQI information */}
          <div className="grid grid-cols-2 gap-3 text-sm mb-3">
            <div className="flex justify-between">
              <span className="text-[#263238]/70">PM2.5:</span>
              <span className="font-bold" style={{ color: currentCity.color }}>
                {currentCity.pm25} μg/m³
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#263238]/70">PM10:</span>
              <span className="font-bold" style={{ color: currentCity.color }}>
                {currentCity.pm10} μg/m³
              </span>
            </div>
            {currentCity.temperature && (
              <div className="flex justify-between">
                <span className="text-[#263238]/70 flex items-center">
                  <Thermometer className="w-3 h-3 mr-1" />
                  Temp:
                </span>
                <span className="font-bold text-blue-600">
                  {currentCity.temperature}°C
                </span>
              </div>
            )}
            {currentCity.humidity && (
              <div className="flex justify-between">
                <span className="text-[#263238]/70 flex items-center">
                  <Droplets className="w-3 h-3 mr-1" />
                  Humidity:
                </span>
                <span className="font-bold text-blue-600">
                  {currentCity.humidity}%
                </span>
              </div>
            )}
            {currentCity.pressure && (
              <div className="flex justify-between">
                <span className="text-[#263238]/70 flex items-center">
                  <Gauge className="w-3 h-3 mr-1" />
                  Pressure:
                </span>
                <span className="font-bold text-gray-600">
                  {currentCity.pressure} hPa
                </span>
              </div>
            )}
            {currentCity.windSpeed && (
              <div className="flex justify-between">
                <span className="text-[#263238]/70 flex items-center">
                  <Wind className="w-3 h-3 mr-1" />
                  Wind:
                </span>
                <span className="font-bold text-green-600">
                  {currentCity.windSpeed} m/s
                </span>
              </div>
            )}
          </div>

          {/* Additional pollutants if available */}
          {(currentCity.no2 || currentCity.o3 || currentCity.so2 || currentCity.co) && (
            <div className="border-t pt-3 mt-3">
              <h5 className="text-xs font-semibold text-[#263238] mb-2">Other Pollutants:</h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {currentCity.no2 && (
                  <div className="flex justify-between">
                    <span className="text-[#263238]/70">NO₂:</span>
                    <span className="font-bold text-orange-600">{currentCity.no2}</span>
                  </div>
                )}
                {currentCity.o3 && (
                  <div className="flex justify-between">
                    <span className="text-[#263238]/70">O₃:</span>
                    <span className="font-bold text-purple-600">{currentCity.o3}</span>
                  </div>
                )}
                {currentCity.so2 && (
                  <div className="flex justify-between">
                    <span className="text-[#263238]/70">SO₂:</span>
                    <span className="font-bold text-red-600">{currentCity.so2}</span>
                  </div>
                )}
                {currentCity.co && (
                  <div className="flex justify-between">
                    <span className="text-[#263238]/70">CO:</span>
                    <span className="font-bold text-gray-600">{currentCity.co}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Dominant pollutant and last update */}
          {(currentCity.dominentPol || currentCity.lastUpdate) && (
            <div className="border-t pt-2 mt-3 text-xs text-[#263238]/60">
              {currentCity.dominentPol && (
                <div className="mb-2 flex items-center justify-between bg-slate-100 px-2 py-1.5 rounded-md border border-slate-200">
                  <span className="font-semibold text-slate-600 flex items-center gap-1">
                    Dominant Pollutant
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="bg-white px-2 py-0.5 rounded text-xs font-bold font-mono tracking-tighter text-slate-800 shadow-sm">
                      {currentCity.dominentPol.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">
                      78% Load
                    </span>
                  </div>
                </div>
              )}
              {currentCity.lastUpdate && (
                <div>
                  <strong>Last Updated:</strong> {currentCity.lastUpdate}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="mb-4 bg-[#0a0f16]/40 backdrop-blur-md rounded-xl p-3 border border-white/10 shadow-lg w-full max-w-sm mx-auto">
        <div className="flex justify-between text-[10px] uppercase font-bold text-slate-300 mb-1.5 px-1">
          <span>Good</span>
          <span>Mod</span>
          <span>Poor</span>
          <span>Sev</span>
          <span>Haz</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gradient-to-r from-green-500 via-yellow-400 via-orange-400 via-red-500 to-purple-600 relative shadow-inner overflow-hidden border border-white/5">
          <div className="absolute top-0 bottom-0 left-[20%] w-[1px] bg-white/30" />
          <div className="absolute top-0 bottom-0 left-[40%] w-[1px] bg-white/30" />
          <div className="absolute top-0 bottom-0 left-[60%] w-[1px] bg-white/30" />
          <div className="absolute top-0 bottom-0 left-[80%] w-[1px] bg-white/30" />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1.5 px-1">
          <span>0</span>
          <span>50</span>
          <span>100</span>
          <span>200</span>
          <span>300</span>
          <span>500+</span>
        </div>
      </div>

      <div className="flex justify-center space-x-2 sm:space-x-4 flex-wrap gap-2 mb-4">
        <Badge className="bg-[#00C853] text-white flex items-center space-x-1 animate-pulse">
          <Zap className="w-3 h-3" />
          <span>Live Data</span>
        </Badge>
        <Badge className="bg-[#FF6F00] text-white flex items-center space-x-1">
          <Satellite className="w-3 h-3" />
          <span>WAQI API</span>
        </Badge>
        <Badge className="bg-blue-600 text-white flex items-center space-x-1">
          <Globe className="w-3 h-3" />
          <span>{cities.length} Cities</span>
        </Badge>
      </div>

      {/* Enhanced data refresh controls */}
      <div className="flex items-center justify-between text-xs text-[#263238]/60">
        <div className="flex items-center space-x-1">
          {loading && <RefreshCw className="w-3 h-3 animate-spin" />}
          <span>
            {loading ? 'Updating...' : 
             error ? `${error} ${retryCount > 0 ? `(Retry ${retryCount}/3)` : ''}` :
             lastUpdated ? `Updated: ${lastUpdated.toLocaleTimeString()}` : 'Ready'}
          </span>
        </div>
        <button 
          onClick={refreshData}
          disabled={loading}
          className="flex items-center space-x-1 px-3 py-1 bg-[#00C853]/10 rounded-full hover:bg-[#00C853]/20 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>
    </Card>
  );
};
