
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export const AIForecasting = () => {
  const [selectedModel, setSelectedModel] = useState('ensemble');

  const models = [
    { id: 'random-forest', name: 'Random Forest', accuracy: '94.2%', status: 'Active' },
    { id: 'lstm', name: 'LSTM Neural', accuracy: '91.8%', status: 'Active' },
    { id: 'ensemble', name: 'Ensemble Model', accuracy: '97.1%', status: 'Primary' }
  ];

  const forecasts = [
    { time: 'Next Hour', pm25: 78, confidence: 95 },
    { time: '6 Hours', pm25: 89, confidence: 88 },
    { time: '12 Hours', pm25: 94, confidence: 82 },
    { time: '24 Hours', pm25: 67, confidence: 76 }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#263238] mb-4">
            AI-Powered Forecasting
          </h2>
          <p className="text-xl text-[#263238]/70 max-w-3xl mx-auto">
            Machine learning models trained on satellite AOD, meteorological data, and ground measurements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Model Selection */}
          <div className="space-y-6">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-xl font-bold text-[#263238] mb-4">AI Models</h3>
              <div className="space-y-3">
                {models.map((model) => (
                  <div
                    key={model.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedModel === model.id 
                        ? 'bg-[#00C853]/20 border border-[#00C853]' 
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                    onClick={() => setSelectedModel(model.id)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-[#263238]">{model.name}</span>
                      <Badge variant={model.status === 'Primary' ? 'default' : 'secondary'}>
                        {model.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-[#263238]/70">
                      Accuracy: <span className="font-bold text-[#00C853]">{model.accuracy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-lg font-bold text-[#263238] mb-4">Feature Importance</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-[#263238]/70">AOD (Satellite)</span>
                  <span className="text-sm font-bold text-[#FF6F00]">32%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#263238]/70">Wind Speed</span>
                  <span className="text-sm font-bold text-[#FF6F00]">28%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#263238]/70">Humidity</span>
                  <span className="text-sm font-bold text-[#FF6F00]">22%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#263238]/70">Temperature</span>
                  <span className="text-sm font-bold text-[#FF6F00]">18%</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Forecasting Results */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-[#263238]">
                  PM2.5 Predictions - {models.find(m => m.id === selectedModel)?.name}
                </h3>
                <Button 
                  variant="outline" 
                  className="border-[#00C853] text-[#00C853] hover:bg-[#00C853] hover:text-white"
                >
                  Refresh Forecast
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {forecasts.map((forecast, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-white/10 to-white/5 rounded-lg p-4 border border-white/20"
                  >
                    <div className="text-lg font-bold text-[#263238] mb-1">
                      {forecast.time}
                    </div>
                    <div className="text-3xl font-bold text-[#FF6F00] mb-2">
                      {forecast.pm25} μg/m³
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-[#263238]/70">Confidence:</div>
                      <div className="text-sm font-bold text-[#00C853]">
                        {forecast.confidence}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Tabs defaultValue="validation" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="validation">Validation</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="alerts">Alerts</TabsTrigger>
                </TabsList>
                <TabsContent value="validation" className="mt-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-[#263238] mb-3">Model Performance</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-[#263238]/70">RMSE</div>
                        <div className="text-lg font-bold text-[#00C853]">12.4 μg/m³</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#263238]/70">R² Score</div>
                        <div className="text-lg font-bold text-[#00C853]">0.94</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="features" className="mt-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-[#263238] mb-3">Input Sources</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#263238]/70">INSAT-3D AOD</span>
                        <span className="text-[#00C853]">✓ Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#263238]/70">MERRA-2 Reanalysis</span>
                        <span className="text-[#00C853]">✓ Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#263238]/70">CPCB Ground Data</span>
                        <span className="text-[#00C853]">✓ Active</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="alerts" className="mt-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-[#263238] mb-3">Health Alerts</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-[#FF6F00] rounded-full"></div>
                        <span className="text-sm text-[#263238]">High pollution expected in 6 hours</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-[#00C853] rounded-full"></div>
                        <span className="text-sm text-[#263238]">Air quality improving by evening</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
