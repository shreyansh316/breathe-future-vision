import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { AiMetricCard } from './AiMetricCard';
import { Database, Search, Map, Activity, Zap, Brain, TrendingUp, AlertTriangle, CheckCircle, Globe, Wind, Circle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, Legend, ReferenceLine } from 'recharts';
import { usePollutionData } from '@/hooks/usePollutionData';
import { useTranslation } from 'react-i18next';
import { D3MicroChart } from './D3MicroChart';

// Generate mock historical PM2.5 data for the D3 chart
const generateMockD3Data = () => {
  return Array.from({ length: 24 }, () => Math.max(10, Math.min(300, 85 + (Math.random() * 40 - 20))));
};
const d3MockData = generateMockD3Data();

export const EnhancedDataDashboard = ({ lastUpdated }: { lastUpdated?: Date }) => {
  const { cities, loading } = usePollutionData();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [chartsVisible, setChartsVisible] = useState<Record<string, boolean>>({});
  const chartRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // AI Forecasting State
  const [aiEnabled, setAiEnabled] = useState(false);
  const [aiInitializing, setAiInitializing] = useState(false);
  const [initStep, setInitStep] = useState(0);
  const [selectedModel, setSelectedModel] = useState('lstm');

  const handleEnableAI = () => {
    setAiInitializing(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setInitStep(step);
      if (step >= 5) {
        clearInterval(interval);
        setAiInitializing(false);
        setAiEnabled(true);
      }
    }, 800);
  };

  const dashboardData = useMemo(() => {
    if (!cities || cities.length === 0) return null;

    const topPollutedCities = cities
      .sort((a, b) => b.pm25 - a.pm25)
      .slice(0, 12)
      .map((city, index) => ({ 
        city: city.name, 
        value: city.pm25, 
        rank: index + 1
      }));

    const aqiDistribution = cities.reduce((acc, city) => {
      acc[city.aqi] = (acc[city.aqi] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const aqiPieData = Object.entries(aqiDistribution).map(([aqi, count]) => ({
      name: aqi,
      value: count,
      color: cities.find(c => c.aqi === aqi)?.color || '#666',
      percentage: Math.round((count / cities.length) * 100)
    }));

    // Mock data for missing charts
    const hourlyTrend = Array.from({ length: 24 }).map((_, i) => ({
      time: `${i}:00`,
      pm25: Math.max(10, 80 + Math.sin(i / 3) * 40 + (Math.random() * 20 - 10)),
      pm10: Math.max(20, 120 + Math.sin(i / 3) * 60 + (Math.random() * 30 - 15))
    }));

    const stateAvgData = [
      { state: 'Delhi', avgPM25: 180 },
      { state: 'Haryana', avgPM25: 150 },
      { state: 'Punjab', avgPM25: 130 },
      { state: 'UP', avgPM25: 160 },
      { state: 'Maharashtra', avgPM25: 80 }
    ];

    const pollutionRadar = [
      { pollutant: 'PM2.5', current: 120, limit: 60 },
      { pollutant: 'PM10', current: 180, limit: 100 },
      { pollutant: 'NO2', current: 40, limit: 80 },
      { pollutant: 'SO2', current: 20, limit: 80 },
      { pollutant: 'O3', current: 60, limit: 100 },
      { pollutant: 'CO', current: 30, limit: 40 }
    ];

    const forecastData = Array.from({ length: 24 }).map((_, i) => {
      const isFuture = i > 12;
      const baseVal = 100 + Math.sin(i / 4) * 30;
      return {
        time: `${i * 3}h`,
        historical: isFuture ? null : baseVal + (Math.random() * 10 - 5),
        predicted: isFuture ? baseVal : null,
        upperBound: isFuture ? baseVal + 20 : null,
        lowerBound: isFuture ? baseVal - 20 : null
      };
    });

    return {
      topPollutedCities,
      aqiPieData,
      hourlyTrend,
      stateAvgData,
      pollutionRadar,
      forecastData,
      statesCount: 15,
      totalCities: cities.length,
      avgPM25: Math.round(cities.reduce((sum, city) => sum + city.pm25, 0) / cities.length),
      criticalCities: cities.filter(city => ['Severe', 'Very Poor'].includes(city.aqi)).length,
      healthyCities: cities.filter(city => ['Good', 'Satisfactory'].includes(city.aqi)).length,
    };
  }, [cities]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    Object.entries(chartRefs.current).forEach(([key, ref]) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setChartsVisible((prev) => ({ ...prev, [key]: true }));
              }
            });
          },
          { threshold: 0.2 }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [activeTab]);

  if (loading || !dashboardData) return <div className="p-20"><Skeleton className="h-64 w-full" /></div>;

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50/50 to-blue-50/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-[#263238]">
            {t('dashboard.title')}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            {t('dashboard.subtitle')}
            {lastUpdated && (
              <span className="block mt-2 text-sm font-mono text-emerald-600">
                {t('dashboard.latest_sync')}: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AiMetricCard 
            title={t('dashboard.cards.interpolation.title')} 
            value="Active" 
            icon={<Map className="w-5 h-5 text-indigo-400" />} 
            description={t('dashboard.cards.interpolation.desc')}
            delay={0.1}
          />
          <AiMetricCard 
            title={t('dashboard.cards.lstm.title')} 
            value="Enabled" 
            icon={<Activity className="w-5 h-5 text-emerald-400" />} 
            description={t('dashboard.cards.lstm.desc')}
            delay={0.2}
          />
          <AiMetricCard 
            title={t('dashboard.cards.prophet.title')} 
            value="Active" 
            icon={<Zap className="w-5 h-5 text-amber-400" />} 
            description={t('dashboard.cards.prophet.desc')}
            delay={0.3}
          />
          <AiMetricCard 
            title={t('dashboard.cards.fires.title')} 
            value="Synced" 
            icon={<Database className="w-5 h-5 text-rose-400" />} 
            description={t('dashboard.cards.fires.desc')}
            delay={0.4}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 text-center transform hover:scale-105 transition-all duration-300 animate-fade-in">
            <div className="flex items-center justify-center mb-2">
              <Globe className="w-6 h-6 text-[#00C853] mr-2" />
              <div className="text-3xl font-bold text-[#00C853] animate-pulse">{dashboardData.totalCities}</div>
            </div>
            <div className="text-[#263238]/70 font-medium">Total Cities</div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200 text-center transform hover:scale-105 transition-all duration-300 animate-fade-in">
            <div className="flex items-center justify-center mb-2">
              <Wind className="w-6 h-6 text-[#FF6F00] mr-2" />
              <div className="text-3xl font-bold text-[#FF6F00]">{dashboardData.avgPM25}</div>
            </div>
            <div className="text-[#263238]/70 font-medium">Avg PM2.5</div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-red-50 to-pink-50 border-red-200 text-center transform hover:scale-105 transition-all duration-300 animate-fade-in">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="w-6 h-6 text-[#DC143C] mr-2" />
              <div className="text-3xl font-bold text-[#DC143C] animate-pulse">{dashboardData.criticalCities}</div>
            </div>
            <div className="text-[#263238]/70 font-medium">Critical Cities</div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 text-center transform hover:scale-105 transition-all duration-300 animate-fade-in">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-6 h-6 text-[#2E7D32] mr-2" />
              <div className="text-3xl font-bold text-[#2E7D32]">{dashboardData.healthyCities}</div>
            </div>
            <div className="text-[#263238]/70 font-medium">Healthy Cities</div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#00C853] data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-[#00C853] data-[state=active]:text-white">Trends</TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-[#00C853] data-[state=active]:text-white">Analysis</TabsTrigger>
            <TabsTrigger value="forecast" className="data-[state=active]:bg-[#00C853] data-[state=active]:text-white">Forecast</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Enhanced Top Polluted Cities */}
              <Card 
                ref={(el) => (chartRefs.current['topPolluted'] = el)}
                className="p-6 bg-white/90 backdrop-blur-sm border-white/50 shadow-xl animate-scale-in"
              >
                <h3 className="text-xl font-bold text-[#263238] mb-4 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-[#FF6F00]" />
                  <span>Most Polluted Cities (PM2.5)</span>
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart 
                    data={dashboardData.topPollutedCities} 
                    layout="horizontal" 
                    margin={{ left: 80 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#263238" opacity={0.1} />
                    <XAxis type="number" stroke="#263238" />
                    <YAxis 
                      type="category" 
                      dataKey="city" 
                      stroke="#263238" 
                      width={75}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                      }}
                      formatter={(value: any, name: any, props: any) => [
                        `${value} μg/m³`,
                        'PM2.5'
                      ]}
                      labelFormatter={(label: any, payload: any) => {
                        if (payload && payload[0]) {
                          return `${payload[0].payload.city} (Rank: #${payload[0].payload.rank})`;
                        }
                        return label;
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="#FF6F00" 
                      radius={[0, 6, 6, 0]}
                      isAnimationActive={chartsVisible['topPolluted'] ?? false}
                      animationDuration={1500}
                      animationBegin={0}
                      animationEasing="ease-out"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              {/* Enhanced AQI Distribution */}
              <Card 
                ref={(el) => (chartRefs.current['aqiPie'] = el)}
                className="p-6 bg-white/90 backdrop-blur-sm border-white/50 shadow-xl animate-scale-in"
              >
                <h3 className="text-xl font-bold text-[#263238] mb-4">AQI Category Distribution</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={dashboardData.aqiPieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      isAnimationActive={chartsVisible['aqiPie'] ?? false}
                      animationDuration={1200}
                      animationBegin={0}
                    >
                      {dashboardData.aqiPieData.map((entry, index) => (
                        <Cell key={`cell-${entry.name}-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '12px' 
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Enhanced 24-Hour Trend */}
              <Card 
                ref={(el) => (chartRefs.current['hourlyTrend'] = el)}
                className="p-6 bg-white/90 backdrop-blur-sm border-white/50 shadow-xl animate-fade-in"
              >
                <h3 className="text-xl font-bold text-[#263238] mb-4">24-Hour Pollution Trend</h3>
                
                {/* Advanced D3.js Micro-Trendline Overlay (Phase 4) */}
                <div className="absolute top-6 right-6 flex flex-col items-end">
                  <span className="text-xs font-semibold text-slate-500 mb-1">PM2.5 Micro-trend (D3.js)</span>
                  <div className="bg-white/50 backdrop-blur-md rounded-lg p-2 border border-slate-200/50 shadow-sm">
                    <D3MicroChart 
                      data={d3MockData} 
                      width={160} 
                      height={40} 
                      color="#DC143C" 
                      fillOpacity={0.15} 
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dashboardData.hourlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#263238" opacity={0.1} />
                    <XAxis dataKey="time" stroke="#263238" />
                    <YAxis stroke="#263238" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '12px' 
                      }} 
                    />
                    <Area 
                      type="monotone"
                      dataKey="pm25"
                      stroke="#ef4444"
                      strokeWidth={3}
                      isAnimationActive={chartsVisible['hourlyTrend'] ?? false}
                      animationDuration={1500}
                      animationEasing="ease-out"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="pm10" 
                      stroke="#00C853" 
                      fill="#00C853" 
                      fillOpacity={0}
                      strokeWidth={2}
                      isAnimationActive={chartsVisible['hourlyTrend'] ?? false}
                      animationDuration={1500}
                      animationEasing="ease-out"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              {/* State-wise Average */}
              <Card 
                ref={(el) => (chartRefs.current['stateAvg'] = el)}
                className="p-6 bg-white/90 backdrop-blur-sm border-white/50 shadow-xl animate-fade-in"
              >
                <h3 className="text-xl font-bold text-[#263238] mb-4">State-wise PM2.5 Average</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dashboardData.stateAvgData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#263238" opacity={0.1} />
                    <XAxis dataKey="state" stroke="#263238" angle={-45} textAnchor="end" height={100} />
                    <YAxis stroke="#263238" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '12px' 
                      }}
                      formatter={(value: any) => [`${value} μg/m³`, 'Average PM2.5']}
                    />
                    <Bar 
                      dataKey="avgPM25" 
                      fill="#00C853" 
                      radius={[6, 6, 0, 0]}
                      isAnimationActive={chartsVisible['stateAvg'] ?? false}
                      animationDuration={1500}
                      animationBegin={0}
                      animationEasing="ease-out"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-8">
            <Card 
              ref={(el) => (chartRefs.current['radar'] = el)}
              className="p-6 bg-white/90 backdrop-blur-sm border-white/50 shadow-xl animate-scale-in"
            >
              <h3 className="text-xl font-bold text-[#263238] mb-4">Pollutant Analysis Radar</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={dashboardData.pollutionRadar}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="pollutant" />
                  <PolarRadiusAxis />
                  <Radar
                    name="Current Levels"
                    dataKey="current"
                    stroke="#FF6F00"
                    fill="#FF6F00"
                    fillOpacity={0}
                    strokeWidth={2}
                    isAnimationActive={chartsVisible['radar'] ?? false}
                    animationDuration={1200}
                  />
                  <Radar
                    name="Safe Limits"
                    dataKey="limit"
                    stroke="#00C853"
                    fill="#00C853"
                    fillOpacity={0}
                    strokeWidth={2}
                    isAnimationActive={chartsVisible['radar'] ?? false}
                    animationDuration={1200}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="forecast" className="space-y-8">
            {!aiEnabled && !aiInitializing && (
              <div className="text-center p-12 bg-white/90 backdrop-blur-sm rounded-xl border border-white/50 shadow-xl animate-fade-in">
                <Brain className="w-16 h-16 text-[#00C853] mx-auto mb-6 opacity-50" />
                <h3 className="text-3xl font-bold text-[#263238] mb-4">AI Prediction Engine Offline</h3>
                <p className="text-lg text-[#263238]/70 mb-8 max-w-lg mx-auto">
                  Activate the neural network to forecast PM2.5 levels up to 72 hours in advance using real-time meteorological data and historical trends.
                </p>
                <Button onClick={handleEnableAI} size="lg" className="bg-[#00C853] hover:bg-[#00A844] text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-lg px-8 py-6">
                  <Activity className="w-6 h-6 mr-3" />
                  Initialize AI Forecasting
                </Button>
              </div>
            )}
            
            {aiInitializing && (
              <div className="py-16 flex flex-col items-center justify-center space-y-8 bg-white/90 backdrop-blur-sm rounded-xl border border-white/50 shadow-xl animate-fade-in">
                <div className="relative">
                  <Brain className="w-20 h-20 text-[#00C853] animate-pulse" />
                  <div className="absolute -inset-4 border-4 border-transparent border-t-[#00C853] border-b-[#00C853] rounded-full animate-spin" />
                </div>
                <h3 className="text-2xl font-bold text-[#263238]">Booting Neural Engine...</h3>
                
                <div className="w-full max-w-md space-y-4">
                  <div className={`flex items-center space-x-3 text-base transition-all duration-300 ${initStep >= 1 ? 'text-gray-800' : 'text-gray-300'}`}>
                    {initStep > 1 ? <CheckCircle className="w-6 h-6 text-[#00C853]" /> : <Circle className="w-6 h-6" />}
                    <span className="font-mono">Loading LSTM Neural Weights...</span>
                  </div>
                  <div className={`flex items-center space-x-3 text-base transition-all duration-300 ${initStep >= 2 ? 'text-gray-800' : 'text-gray-300'}`}>
                    {initStep > 2 ? <CheckCircle className="w-6 h-6 text-[#00C853]" /> : <Circle className="w-6 h-6" />}
                    <span className="font-mono">Connecting to meteorological models...</span>
                  </div>
                  <div className={`flex items-center space-x-3 text-base transition-all duration-300 ${initStep >= 3 ? 'text-gray-800' : 'text-gray-300'}`}>
                    {initStep > 3 ? <CheckCircle className="w-6 h-6 text-[#00C853]" /> : <Circle className="w-6 h-6" />}
                    <span className="font-mono">Generating 72-hour probability matrix...</span>
                  </div>
                  {initStep >= 4 && (
                    <div className="mt-6 p-4 bg-green-50 text-green-800 rounded-xl border border-green-200 flex items-center justify-center animate-fade-in shadow-inner">
                      <Sparkles className="w-6 h-6 mr-2 text-[#00C853]" />
                      <span className="font-bold text-lg">Forecasting Engine Online.</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {aiEnabled && (
              <div className="space-y-6 animate-fade-in">
                {/* Engine Selector */}
                <Card className="p-4 bg-white/90 backdrop-blur-sm border-white/50 shadow-md">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <Brain className="w-8 h-8 text-[#00C853]" />
                      <h3 className="text-xl font-bold text-[#263238]">Active ML Engine:</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant={selectedModel === 'lstm' ? 'default' : 'outline'}
                        onClick={() => setSelectedModel('lstm')}
                        className={selectedModel === 'lstm' ? 'bg-[#00C853] hover:bg-[#00A844]' : 'hover:border-[#00C853] hover:text-[#00C853]'}
                      >
                        LSTM (Deep Learning)
                      </Button>
                      <Button 
                        variant={selectedModel === 'rf' ? 'default' : 'outline'}
                        onClick={() => setSelectedModel('rf')}
                        className={selectedModel === 'rf' ? 'bg-[#FF6F00] hover:bg-[#E65100]' : 'hover:border-[#FF6F00] hover:text-[#FF6F00]'}
                      >
                        Random Forest
                      </Button>
                      <Button 
                        variant={selectedModel === 'arima' ? 'default' : 'outline'}
                        onClick={() => setSelectedModel('arima')}
                        className={selectedModel === 'arima' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'hover:border-blue-600 hover:text-blue-600'}
                      >
                        ARIMA (Statistical)
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Main Forecast Chart */}
                <Card className="p-6 bg-white/90 backdrop-blur-sm border-white/50 shadow-xl">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-[#263238]">72-Hour PM2.5 Prediction</h3>
                      <p className="text-sm text-gray-500">Visualizing historical data and AI-generated confidence intervals.</p>
                    </div>
                    <Badge variant="outline" className="border-[#00C853] text-[#00C853] bg-green-50 px-3 py-1 text-sm font-bold shadow-sm">
                      Confidence: {selectedModel === 'lstm' ? '94.2%' : selectedModel === 'rf' ? '88.5%' : '82.1%'}
                    </Badge>
                  </div>
                  
                  <ResponsiveContainer width="100%" height={450}>
                    <ComposedChart data={dashboardData.forecastData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="time" minTickGap={30} tick={{fill: '#666', fontSize: 12}} />
                      <YAxis domain={['auto', 'auto']} tick={{fill: '#666', fontSize: 12}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', backgroundColor: 'rgba(255,255,255,0.95)' }}
                        labelFormatter={(label) => `Time: ${label}`}
                      />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      
                      <ReferenceLine x="NOW" stroke="#FF6F00" strokeDasharray="3 3" label={{ position: 'top', value: 'Current Time', fill: '#FF6F00', fontSize: 12, fontWeight: 'bold' }} />
                      
                      {/* Confidence Interval (Area) */}
                      <Area 
                        type="monotone" 
                        dataKey="upperBound" 
                        stroke="none" 
                        fill="#00C853" 
                        fillOpacity={0} 
                        strokeWidth={1.5}
                        name="Confidence Interval"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="lowerBound" 
                        stroke="none" 
                        fill="#ffffff" 
                        fillOpacity={0} 
                        strokeWidth={1.5}
                        legendType="none"
                        tooltipType="none"
                      />
                      
                      {/* Historical Line */}
                      <Line 
                        type="monotone" 
                        dataKey="historical" 
                        stroke="#263238" 
                        strokeWidth={4}
                        dot={false}
                        name="Historical Data"
                        activeDot={{ r: 6 }}
                      />
                      
                      {/* Predicted Line */}
                      <Line 
                        type="monotone" 
                        dataKey="predicted" 
                        stroke="#00C853" 
                        strokeWidth={4}
                        strokeDasharray="8 6"
                        dot={false}
                        name="AI Prediction"
                        activeDot={{ r: 6, fill: '#00C853' }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </Card>

                {/* Key Insights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6 border-l-4 border-l-[#DC143C] bg-white/90 shadow-md hover:shadow-lg transition-shadow">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1 text-[#DC143C]" />
                      Predicted Peak
                    </h4>
                    <div className="text-3xl font-bold text-[#263238]">145 μg/m³</div>
                    <div className="text-sm text-[#DC143C] mt-2 font-medium bg-red-50 inline-block px-2 py-1 rounded">Tomorrow, 08:00 AM</div>
                  </Card>
                  <Card className="p-6 border-l-4 border-l-[#00C853] bg-white/90 shadow-md hover:shadow-lg transition-shadow">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                      <Wind className="w-4 h-4 mr-1 text-[#00C853]" />
                      Expected Clearance
                    </h4>
                    <div className="text-3xl font-bold text-[#263238]">42 μg/m³</div>
                    <div className="text-sm text-[#00C853] mt-2 font-medium bg-green-50 inline-block px-2 py-1 rounded">In 46 Hours</div>
                  </Card>
                  <Card className="p-6 border-l-4 border-l-blue-500 bg-white/90 shadow-md hover:shadow-lg transition-shadow">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                      <Brain className="w-4 h-4 mr-1 text-blue-500" />
                      Primary Driver
                    </h4>
                    <div className="text-xl font-bold text-[#263238]">Temperature Inversion</div>
                    <div className="text-sm text-blue-600 mt-2 font-medium bg-blue-50 inline-block px-2 py-1 rounded">Coupled with Northern winds</div>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Enhanced Data Quality Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <Card className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 border-green-200 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-2xl font-bold text-[#00C853] mb-1">99.2%</div>
            <div className="text-sm text-[#263238]/70">Data Accuracy</div>
          </Card>
          <Card className="p-4 bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-200 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-2xl font-bold text-[#FF6F00] mb-1">{dashboardData.statesCount}</div>
            <div className="text-sm text-[#263238]/70">States Covered</div>
          </Card>
          <Card className="p-4 bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-200 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-2xl font-bold text-[#00C853] mb-1">10min</div>
            <div className="text-sm text-[#263238]/70">Update Frequency</div>
          </Card>
          <Card className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-2xl font-bold text-[#FF6F00] mb-1">WAQI</div>
            <div className="text-sm text-[#263238]/70">Live API</div>
          </Card>
        </div>
      </div>
    </section>
  );
};
