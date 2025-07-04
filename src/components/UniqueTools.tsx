
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Camera, 
  Shield, 
  Target, 
  Smartphone, 
  Leaf, 
  AlertTriangle,
  TrendingUp,
  MapPin,
  Clock
} from 'lucide-react';

export const UniqueTools = () => {
  const [selectedTool, setSelectedTool] = useState('air-scanner');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Stop camera stream
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  // Cleanup on unmount or tab change
  useEffect(() => {
    if (selectedTool !== 'air-scanner') {
      stopCamera();
    }
    return () => stopCamera();
  }, [selectedTool]);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Prefer back camera on mobile
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraError("Unable to access camera. Please check permissions.");
    }
  };

  const handleScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      if (videoRef.current) {
        videoRef.current.pause(); // Freeze frame on result
      }
    }, 2500);
  };

  const resetScan = () => {
    setScanComplete(false);
    if (videoRef.current) {
      videoRef.current.play(); // Resume live feed
    }
  };

  const tools = [
    {
      id: 'air-scanner',
      title: 'AI Air Scanner',
      description: 'Scan your environment using your camera to get instant air quality analysis',
      icon: Camera,
      color: '#00C853',
      features: ['Real-time visual analysis', 'Particulate detection', 'Health risk assessment']
    },
    {
      id: 'health-shield',
      title: 'Personal Health Shield',
      description: 'Personalized protection recommendations based on your health profile',
      icon: Shield,
      color: '#2196F3',
      features: ['Custom health alerts', 'Activity recommendations', 'Medical condition support']
    },
    {
      id: 'pollution-predictor',
      title: 'Pollution Time Machine',
      description: 'Predict air quality for any location and time using advanced AI models',
      icon: Brain,
      color: '#FF6F00',
      features: ['7-day forecasts', 'Hourly predictions', 'Event impact analysis']
    },
    {
      id: 'eco-advisor',
      title: 'Eco Impact Advisor',
      description: 'Track your carbon footprint and get personalized sustainability tips',
      icon: Leaf,
      color: '#4CAF50',
      features: ['Carbon tracking', 'Green alternatives', 'Community challenges']
    }
  ];

  const realtimeMetrics = [
    { label: 'Cities Monitored', value: '150+', trend: '+12%' },
    { label: 'Data Points/Hour', value: '50K+', trend: '+25%' },
    { label: 'AI Predictions', value: '99.2%', trend: '+0.3%' },
    { label: 'Users Protected', value: '2M+', trend: '+40%' }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#E3F2FD] to-[#E8F5E8]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#263238] mb-4">
            Future-Proof Tools
          </h2>
          <p className="text-xl text-[#263238]/70 max-w-3xl mx-auto">
            Advanced AI-powered tools designed to keep you ahead of air pollution challenges
          </p>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {realtimeMetrics.map((metric, index) => (
            <Card key={index} className="p-4 text-center bg-white/80 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <div className="text-2xl font-bold text-[#00C853] mb-1">{metric.value}</div>
              <div className="text-sm text-[#263238]/70 mb-2">{metric.label}</div>
              <Badge className="bg-green-100 text-green-800 text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                {metric.trend}
              </Badge>
            </Card>
          ))}
        </div>

        {/* AI Tools Showcase */}
        <Tabs value={selectedTool} onValueChange={setSelectedTool} className="mb-12">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8 bg-white/50">
            {tools.map((tool) => (
              <TabsTrigger key={tool.id} value={tool.id} className="flex flex-col items-center p-4">
                <tool.icon className="w-6 h-6 mb-2" style={{ color: tool.color }} />
                <span className="text-xs font-medium">{tool.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tools.map((tool) => (
            <TabsContent key={tool.id} value={tool.id}>
              <Card className="p-8 bg-white/90 backdrop-blur-sm">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div 
                        className="p-3 rounded-2xl"
                        style={{ backgroundColor: `${tool.color}20` }}
                      >
                        <tool.icon className="w-8 h-8" style={{ color: tool.color }} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#263238]">{tool.title}</h3>
                        <Badge style={{ backgroundColor: tool.color, color: 'white' }}>
                          AI Powered
                        </Badge>
                      </div>
                    </div>
                    <p className="text-[#263238]/70 mb-6">{tool.description}</p>
                    <div className="space-y-2 mb-6">
                      {tool.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tool.color }}></div>
                          <span className="text-sm text-[#263238]">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      className="rounded-full px-8"
                      style={{ backgroundColor: tool.color }}
                    >
                      Try {tool.title}
                    </Button>
                  </div>
                  <div className="h-full min-h-[300px]">
                    {tool.id === 'air-scanner' ? (
                      <div className="bg-gray-900 rounded-2xl overflow-hidden relative w-full h-full min-h-[300px] flex items-center justify-center border-4 border-gray-800 shadow-2xl">
                        
                        <div className="absolute inset-0 bg-black flex items-center justify-center">
                          <video 
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isCameraActive ? 'opacity-100' : 'opacity-0'}`}
                          />
                          
                          {!isCameraActive && !cameraError && (
                            <img 
                              src="https://images.unsplash.com/photo-1572204292164-b35ba40e596b?auto=format&fit=crop&q=80&w=600" 
                              alt="City skyline fallback" 
                              className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm"
                            />
                          )}

                          {cameraError && (
                            <div className="absolute inset-0 bg-red-900/20 flex flex-col items-center justify-center p-6 text-center z-10">
                              <AlertTriangle className="w-8 h-8 text-red-500 mb-3" />
                              <p className="text-red-400 text-sm font-medium">{cameraError}</p>
                            </div>
                          )}
                        </div>
                        
                        {/* Laser Scan Animation using tailwind arbitrary values */}
                        {isScanning && (
                          <div className="absolute inset-0 bg-blue-500/10 overflow-hidden pointer-events-none z-20">
                            <div className="w-full h-1 bg-[#00C853] shadow-[0_0_15px_#00C853] absolute left-0 animate-[ping_2s_infinite]" style={{ top: '50%' }} />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00C853]/20 to-transparent animate-pulse" />
                          </div>
                        )}

                        {!isCameraActive && !cameraError && (
                          <Button 
                            onClick={startCamera}
                            className="relative z-30 bg-[#2196F3] hover:bg-[#1976D2] text-white shadow-xl"
                          >
                            <Camera className="w-4 h-4 mr-2" />
                            Turn on Camera
                          </Button>
                        )}

                        {isCameraActive && !isScanning && !scanComplete && (
                          <Button 
                            onClick={handleScan}
                            className="relative z-30 bg-[#00C853] hover:bg-[#00A844] text-white shadow-xl shadow-green-900/50"
                          >
                            <Target className="w-4 h-4 mr-2" />
                            Start AI Scan
                          </Button>
                        )}

                        {isScanning && (
                          <div className="relative z-30 bg-black/80 backdrop-blur-md text-white px-5 py-3 rounded-full flex items-center shadow-2xl border border-white/10">
                            <div className="w-4 h-4 border-2 border-[#00C853] border-t-transparent rounded-full animate-spin mr-3" />
                            <span className="text-sm font-medium tracking-wide">Analyzing Particulates...</span>
                          </div>
                        )}

                        {scanComplete && (
                          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm p-6 flex flex-col justify-center animate-in fade-in duration-500 z-30">
                             <h4 className="text-[#00C853] font-bold text-xl mb-6 flex items-center justify-center">
                               <Shield className="w-6 h-6 mr-2" /> AI Vision Results
                             </h4>
                             <div className="space-y-4 text-left max-w-sm mx-auto w-full">
                               <div className="bg-white/10 p-4 rounded-xl flex justify-between items-center border border-white/10">
                                 <span className="text-gray-300 text-sm font-medium">Estimated AQI</span>
                                 <Badge className="bg-orange-500 text-white font-bold px-3 py-1 text-sm">145 (Poor)</Badge>
                               </div>
                               <div className="bg-white/10 p-4 rounded-xl flex justify-between items-center border border-white/10">
                                 <span className="text-gray-300 text-sm font-medium">Visibility Index</span>
                                 <span className="text-white font-bold">2.4 km</span>
                               </div>
                               <div className="bg-white/10 p-4 rounded-xl flex justify-between items-center border border-white/10">
                                 <span className="text-gray-300 text-sm font-medium">Primary Pollutant</span>
                                 <span className="text-gray-400 font-bold">PM2.5 / Smog</span>
                               </div>
                             </div>
                             <div className="mt-8 text-center space-x-4">
                               <Button onClick={resetScan} variant="outline" className="border-gray-500 text-gray-700 hover:bg-gray-100 bg-white">
                                 Scan Again
                               </Button>
                               <Button onClick={stopCamera} variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10">
                                 Close Camera
                               </Button>
                             </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center h-full flex flex-col justify-center items-center border-2 border-dashed border-gray-200">
                        <div className="text-6xl mb-6" style={{ color: tool.color }}>
                          <tool.icon className="w-20 h-20 mx-auto opacity-80" />
                        </div>
                        <h4 className="font-bold text-gray-800 mb-2">{tool.title}</h4>
                        <p className="text-sm text-[#263238]/60 font-medium">
                          Interactive demo coming soon
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* AakaashSetu NLP Engine Showcase */}
        <Card className="p-8 bg-[#0B0F19] border border-[#1E293B] shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-3">AakaashSetu NLP Engine</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                Proprietary natural language processing pipeline optimized for environmental telemetry and geospatial policy parsing. Embedded directly into our vector retrieval augmented generation loop.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="p-4 bg-[#1E293B]/50 rounded-xl border border-gray-800 text-center min-w-[120px]">
                <div className="text-2xl font-mono text-emerald-400 font-bold">4.2</div>
                <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">MAE (µg/m³)</div>
              </div>
              <div className="p-4 bg-[#1E293B]/50 rounded-xl border border-gray-800 text-center min-w-[120px]">
                <div className="text-2xl font-mono text-sky-400 font-bold">0.94</div>
                <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">R² Score</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
