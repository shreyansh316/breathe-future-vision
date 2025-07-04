import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CitySelector } from './CitySelector';
import { Badge } from '@/components/ui/badge';
import { EnhancedIndiaMap } from './EnhancedIndiaMap';
import { Satellite, MapPin, Wind, Eye, TrendingUp, RefreshCw, Activity } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePollutionData } from '@/hooks/usePollutionData';

export const PollutionMap = () => {
  const { t } = useLanguage();
  const { cities, loading, lastUpdated, refreshData } = usePollutionData();
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const currentCity = cities.find(city => city.name === selectedCity);

  return (
    <section id="pollution-map" className="py-12 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#263238] mb-4 flex items-center justify-center space-x-2 sm:space-x-3 flex-wrap">
            <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-[#00C853] animate-pulse" />
            <span className="text-center">{t('livePollutionMapping')}</span>
            <Satellite className="w-8 h-8 sm:w-10 sm:h-10 text-[#FF6F00] animate-bounce" />
          </h2>
          <p className="text-lg sm:text-xl text-[#263238]/70 max-w-3xl mx-auto px-4">
            {t('pollutionDescription')} - Enhanced real-time monitoring across {cities.length} major Indian cities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Enhanced Interactive Map */}
          <div className="lg:col-span-2">
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50/90 to-green-50/90 backdrop-blur-sm border-[#00C853]/20 shadow-xl animate-scale-in">
              <div className="mb-4 flex items-center justify-between">
                <CitySelector 
                  selectedCity={selectedCity}
                  onCityChange={setSelectedCity}
                  cities={cities}
                />
                <div className="flex items-center space-x-2">
                  {loading && <RefreshCw className="w-4 h-4 animate-spin text-[#00C853]" />}
                  <Badge className="bg-[#00C853] text-white animate-pulse">
                    <Activity className="w-3 h-3 mr-1" />
                    {cities.length} Cities
                  </Badge>
                </div>
              </div>
              
              {/* Enhanced India Map */}
              {loading ? (
                <div className="h-[600px] w-full rounded-2xl bg-[#0B0F19] animate-pulse flex items-center justify-center border border-[#1E293B] shadow-inner relative overflow-hidden">
                   <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
                   <div className="text-slate-500 font-mono text-sm uppercase tracking-widest flex items-center space-x-2 z-10">
                     <Activity className="w-4 h-4 animate-bounce text-sky-500" /> 
                     <span>Initializing WebGL Engine...</span>
                  </div>
                </div>
              ) : (
                <EnhancedIndiaMap 
                  cities={cities}
                  selectedCity={selectedCity}
                  onCitySelect={setSelectedCity}
                />
              )}
              
              <div className="mt-4 text-xs text-center text-[#263238]/60">
                Data source: World Air Quality Index (WAQI) | 
                {lastUpdated && ` Last updated: ${lastUpdated.toLocaleTimeString()}`}
              </div>
            </Card>
          </div>

          {/* Enhanced city details section */}
          <div className="space-y-4 sm:space-y-6">
            {currentCity && (
              <Card className="p-4 sm:p-6 bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-sm border-[#00C853]/20 shadow-xl animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#263238] flex items-center space-x-2">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#00C853] animate-pulse" />
                    <span className="truncate">{currentCity.name}</span>
                  </h3>
                  <Badge className="text-sm animate-bounce" style={{ backgroundColor: currentCity.color, color: 'white' }}>
                    {currentCity.aqi}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg transform hover:scale-105 transition-all duration-300">
                    <span className="text-[#263238]/70 font-medium">PM2.5</span>
                    <span className="font-bold text-lg" style={{ color: currentCity.color }}>
                      {currentCity.pm25} μg/m³
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg transform hover:scale-105 transition-all duration-300">
                    <span className="text-[#263238]/70 font-medium">PM10</span>
                    <span className="font-bold text-lg" style={{ color: currentCity.color }}>
                      {currentCity.pm10} μg/m³
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg transform hover:scale-105 transition-all duration-300">
                    <span className="text-[#263238]/70 font-medium">State</span>
                    <span className="font-medium text-[#263238] truncate">
                      {currentCity.state}
                    </span>
                  </div>
                  {currentCity.actualAqi && (
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#00C853]/10 to-[#00C853]/5 rounded-lg">
                      <span className="text-[#263238]/70 font-medium">Real AQI</span>
                      <span className="font-bold text-lg text-[#00C853]">
                        {currentCity.actualAqi}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 p-3 bg-gradient-to-r from-[#00C853]/10 to-[#FF6F00]/10 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-[#00C853]" />
                    <span className="text-sm font-semibold text-[#263238]">Health Advisory</span>
                  </div>
                  <p className="text-xs text-[#263238]/70">
                    {currentCity.aqi === 'Good' ? 'Air quality is good for outdoor activities.' :
                     currentCity.aqi === 'Satisfactory' ? 'Air quality is acceptable for most people.' :
                     currentCity.aqi === 'Moderate' ? 'Sensitive individuals should consider limiting outdoor activities.' :
                     currentCity.aqi === 'Poor' ? 'Everyone should reduce outdoor activities and wear masks.' :
                     currentCity.aqi === 'Very Poor' ? 'Avoid outdoor activities. Health warnings for everyone.' :
                     'Emergency conditions. Avoid all outdoor activities.'}
                  </p>
                </div>
              </Card>
            )}

            {/* tabs and data refresh section */}
            <Tabs defaultValue="satellite" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/80">
                <TabsTrigger value="satellite" className="data-[state=active]:bg-[#00C853] data-[state=active]:text-white text-sm">
                  WAQI Data
                </TabsTrigger>
                <TabsTrigger value="ground" className="data-[state=active]:bg-[#FF6F00] data-[state=active]:text-white text-sm">
                  Coverage
                </TabsTrigger>
              </TabsList>
              <TabsContent value="satellite">
                <Card className="p-4 bg-gradient-to-br from-blue-50/90 to-white/90 backdrop-blur-sm border-[#00C853]/20">
                  <h4 className="font-semibold text-[#263238] mb-2 flex items-center space-x-2">
                    <Satellite className="w-4 h-4 text-[#00C853]" />
                    <span>World Air Quality Index</span>
                  </h4>
                  <p className="text-sm text-[#263238]/70 mb-3">
                    Real-time air quality data from global monitoring network
                  </p>
                  <div className="text-2xl font-bold text-[#00C853] mb-2">
                    {cities.filter(city => city.aqi !== 'Good').length} / {cities.length}
                  </div>
                  <Badge className="bg-[#00C853]/10 text-[#00C853] border-[#00C853]/20">
                    Cities with Poor+ AQI
                  </Badge>
                </Card>
              </TabsContent>
              <TabsContent value="ground">
                <Card className="p-4 bg-gradient-to-br from-orange-50/90 to-white/90 backdrop-blur-sm border-[#FF6F00]/20">
                  <h4 className="font-semibold text-[#263238] mb-2 flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-[#FF6F00]" />
                    <span>Geographic Coverage</span>
                  </h4>
                  <p className="text-sm text-[#263238]/70 mb-3">
                    Monitoring stations across all major Indian states
                  </p>
                  <div className="text-2xl font-bold text-[#FF6F00] mb-2">
                    {new Set(cities.map(city => city.state)).size} States
                  </div>
                  <Badge className="bg-[#FF6F00]/10 text-[#FF6F00] border-[#FF6F00]/20">
                    Complete Coverage
                  </Badge>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="p-4 bg-gradient-to-br from-green-50/90 to-white/90 backdrop-blur-sm border-[#00C853]/20">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-[#263238]">Data Refresh</h4>
                <Button 
                  size="sm" 
                  onClick={refreshData}
                  disabled={loading}
                  className="bg-[#00C853] hover:bg-[#00A844] transform hover:scale-105 transition-all duration-300"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Refresh
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-[#263238]/60">
                {lastUpdated ? `Last updated: ${lastUpdated.toLocaleString()}` : 'Data loading...'}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
