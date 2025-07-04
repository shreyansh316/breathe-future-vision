
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Database, Cloud, Cpu, Satellite, Globe, Shield, 
  Zap, Brain, MapPin, Activity, Server, Smartphone
} from 'lucide-react';

export const TechArchitecture = () => {
  const techStack = [
    {
      category: 'Frontend',
      technologies: [
        { name: 'React + TypeScript', icon: Globe, color: '#61DAFB' },
        { name: 'Tailwind CSS', icon: Zap, color: '#38BDF8' },
        { name: 'Mapbox GL JS', icon: MapPin, color: '#000000' },
        { name: 'Progressive Web App', icon: Smartphone, color: '#4285F4' }
      ]
    },
    {
      category: 'AI/ML Backend',
      technologies: [
        { name: 'Python + FastAPI', icon: Server, color: '#009688' },
        { name: 'TensorFlow/PyTorch', icon: Brain, color: '#FF6F00' },
        { name: 'Time Series Models', icon: Activity, color: '#9C27B0' },
        { name: 'XGBoost + LSTM', icon: Cpu, color: '#FF5722' }
      ]
    },
    {
      category: 'Data Sources',
      technologies: [
        { name: 'WAQI + CPCB APIs', icon: Database, color: '#4CAF50' },
        { name: 'ISRO Satellite Data', icon: Satellite, color: '#FF9800' },
        { name: 'IoT Sensor Network', icon: Activity, color: '#2196F3' },
        { name: 'Weather APIs', icon: Cloud, color: '#607D8B' }
      ]
    },
    {
      category: 'Infrastructure',
      technologies: [
        { name: 'Cloud Computing', icon: Cloud, color: '#4285F4' },
        { name: 'Real-time Processing', icon: Zap, color: '#FFEB3B' },
        { name: 'Security & Privacy', icon: Shield, color: '#F44336' },
        { name: 'Edge Computing', icon: Server, color: '#795548' }
      ]
    }
  ];

  const dataFlow = [
    { step: '1', title: 'Data Collection', description: 'Multi-source air quality data aggregation', color: '#4CAF50' },
    { step: '2', title: 'AI Processing', description: 'Machine learning models analyze patterns', color: '#FF6F00' },
    { step: '3', title: 'Prediction Engine', description: 'Generate forecasts and health alerts', color: '#2196F3' },
    { step: '4', title: 'Real-time Delivery', description: 'Push insights to users and authorities', color: '#9C27B0' }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50/80 to-blue-50/80">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#263238] mb-4 flex items-center justify-center space-x-3">
            <Cpu className="w-8 h-8 text-[#00C853]" />
            <span>Technical Architecture</span>
            <Brain className="w-8 h-8 text-[#FF6F00]" />
          </h2>
          <p className="text-lg text-[#263238]/70 max-w-3xl mx-auto">
            Built on cutting-edge technologies for scalable, reliable environmental intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {techStack.map((category, index) => (
            <Card key={index} className="p-6 bg-white/90 backdrop-blur-sm border border-white/50 shadow-lg">
              <h3 className="text-xl font-bold text-[#263238] mb-6 text-center">
                {category.category}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {category.technologies.map((tech, techIndex) => (
                  <div 
                    key={techIndex}
                    className="flex items-center space-x-3 p-3 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-all duration-300"
                  >
                    <tech.icon 
                      className="w-5 h-5 flex-shrink-0" 
                      style={{ color: tech.color }} 
                    />
                    <span className="text-sm font-medium text-[#263238]">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-8 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm border border-white/50 shadow-xl">
          <h3 className="text-2xl font-bold text-[#263238] mb-8 text-center">
            🔄 Data Processing Pipeline
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {dataFlow.map((step, index) => (
              <div key={index} className="text-center">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto"
                  style={{ backgroundColor: step.color }}
                >
                  {step.step}
                </div>
                <h4 className="font-semibold text-[#263238] mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-[#263238]/70">
                  {step.description}
                </p>
                {index < dataFlow.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-6 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 transform translate-x-2"></div>
                )}
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Badge className="bg-[#00C853]/10 text-[#00C853] p-3 text-center">
            <div className="font-bold text-lg">99.2%</div>
            <div className="text-xs">Uptime</div>
          </Badge>
          <Badge className="bg-[#FF6F00]/10 text-[#FF6F00] p-3 text-center">
            <div className="font-bold text-lg">&lt;2s</div>
            <div className="text-xs">Response Time</div>
          </Badge>
          <Badge className="bg-[#2196F3]/10 text-[#2196F3] p-3 text-center">
            <div className="font-bold text-lg">24/7</div>
            <div className="text-xs">Monitoring</div>
          </Badge>
          <Badge className="bg-[#9C27B0]/10 text-[#9C27B0] p-3 text-center">
            <div className="font-bold text-lg">10M+</div>
            <div className="text-xs">Data Points/Day</div>
          </Badge>
        </div>
      </div>
    </section>
  );
};
