
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    title: "Hyperlocal AQI Mapping",
    description: "Street-level air quality predictions using satellite downscaling techniques",
    status: "Live",
    color: "#00C853"
  },
  {
    title: "3D Pollution Visualization",
    description: "Interactive WebGL globe showing pollution patterns across India",
    status: "Beta",
    color: "#FF6F00"
  },
  {
    title: "IoT Sensor Integration",
    description: "Real-time data fusion from distributed air quality sensors",
    status: "Live",
    color: "#00C853"
  },
  {
    title: "Health Risk Assessment",
    description: "Population-weighted exposure analysis with demographic overlays",
    status: "Live",
    color: "#00C853"
  },
  {
    title: "Policy Impact Analysis",
    description: "AI-powered recommendations for pollution control measures",
    status: "Beta",
    color: "#FF6F00"
  },
  {
    title: "Multi-satellite Fusion",
    description: "Combined data from INSAT-3D, Sentinel-5P, and MODIS satellites",
    status: "Live",
    color: "#00C853"
  },
  {
    title: "Community Reporting",
    description: "Crowdsourced pollution reports with AI validation",
    status: "Beta",
    color: "#FF6F00"
  },
  {
    title: "Voice-Activated Search",
    description: "Ask about air quality anywhere in India using natural language",
    status: "Live",
    color: "#00C853"
  },
  {
    title: "Historical Trend Analysis",
    description: "15+ years of pollution data with seasonal pattern recognition",
    status: "Live",
    color: "#00C853"
  },
  {
    title: "Mobile Offline Mode",
    description: "Cached predictions for areas with poor internet connectivity",
    status: "Beta",
    color: "#FF6F00"
  },
  {
    title: "Public API Access",
    description: "RESTful API for developers to integrate pollution data",
    status: "Live",
    color: "#00C853"
  },
  {
    title: "Geo-fenced Alerts",
    description: "Location-based notifications for pollution threshold breaches",
    status: "Live",
    color: "#00C853"
  }
];

export const FeatureGrid = () => {
  return (
    <section className="py-20 px-4 bg-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#263238] mb-4">
            Platform Features
          </h2>
          <p className="text-xl text-[#263238]/70 max-w-3xl mx-auto">
            Comprehensive air quality monitoring solution combining cutting-edge technology with user-centric design
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-[#263238] leading-tight">
                  {feature.title}
                </h3>
                <Badge 
                  variant="secondary" 
                  style={{ 
                    backgroundColor: `${feature.color}20`, 
                    color: feature.color,
                    border: `1px solid ${feature.color}40`
                  }}
                >
                  {feature.status}
                </Badge>
              </div>
              <p className="text-[#263238]/70 text-sm leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#00C853]/10 to-[#FF6F00]/10 rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-[#263238] mb-4">
              Air Pollution Monitoring Platform
            </h3>
            <p className="text-[#263238]/70 mb-6 max-w-4xl mx-auto">
              This platform demonstrates the integration of satellite remote sensing, artificial intelligence, 
              and ground-based observations to create a comprehensive air quality monitoring system for India. 
              Built with modern web technologies and designed for scalability and real-world deployment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-[#00C853] text-white px-4 py-2">Satellite Data Integration</Badge>
              <Badge className="bg-[#FF6F00] text-white px-4 py-2">Machine Learning</Badge>
              <Badge className="bg-[#263238] text-white px-4 py-2">Real-time Processing</Badge>
              <Badge className="bg-[#00C853] text-white px-4 py-2">Public Health Impact</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
