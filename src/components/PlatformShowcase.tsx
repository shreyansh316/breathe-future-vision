import React, { useState, useEffect } from 'react';
import { Download, Monitor, Smartphone, LayoutGrid, Terminal, Boxes, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const tabs = [
  { id: 'mobile', label: 'Mobile App', icon: Smartphone },
  { id: 'tv', label: 'Smart TV App', icon: Monitor },
  { id: 'web', label: 'Web Dashboard', icon: LayoutGrid },
  { id: 'api', label: 'API', icon: Terminal },
  { id: 'widgets', label: 'Widgets', icon: Boxes },
];

const platformData = {
  mobile: {
    tag: 'MOBILE APP',
    headline: 'Empower Your Decisions with Reliable Data',
    image: '/assets/mobile_app_aqi.png',
    primaryButton: 'App Store ↗',
    primaryLink: 'https://apps.apple.com/in/app/aqi/id1439684571',
    secondaryButton: 'Google Play ↗',
    secondaryLink: 'https://play.google.com/store/apps/details?id=com.aqi.data'
  },
  tv: {
    tag: 'SMART TV APP',
    headline: 'AQI Data Monitoring on the Big Screen',
    image: '/assets/smart_tv_aqi.png',
    primaryButton: 'Download TV App ↗',
    primaryLink: 'https://aqi.app/',
    secondaryButton: null,
    secondaryLink: null
  },
  web: {
    tag: 'WEB DASHBOARD',
    headline: 'Stay informed with real-time geographic telemetry',
    image: '/assets/web_dashboard_aqi.png',
    primaryButton: 'View Dashboard ↗',
    primaryLink: '#',
    secondaryButton: null,
    secondaryLink: null
  },
  api: {
    tag: 'API',
    headline: 'Easy Air Quality API Integration: Connect Instantly!',
    image: '/assets/api_developer_aqi.png',
    primaryButton: 'Get APIs ↗',
    primaryLink: '/api-contact',
    secondaryButton: 'Read Docs ↗',
    secondaryLink: '#'
  },
  widgets: {
    tag: 'WIDGETS',
    headline: 'Free AQI Widgets: Real-Time Air Quality for your Site',
    image: '/assets/widgets_aqi.png',
    primaryButton: 'Get Widgets ↗',
    primaryLink: '/widgets',
    secondaryButton: null,
    secondaryLink: null
  }
};

export const PlatformShowcase = () => {
  const [activeTab, setActiveTab] = useState('mobile');
  const [isFading, setIsFading] = useState(false);
  const [currentContent, setCurrentContent] = useState(platformData.mobile);

  const handleTabChange = (tabId: string) => {
    if (tabId === activeTab) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setCurrentContent(platformData[tabId as keyof typeof platformData]);
      setIsFading(false);
    }, 300);
  };

  return (
    <div className="w-full bg-[#0d0f11] py-24 text-gray-100 font-sans border-t border-[#1f2937]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Tab Controller */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-[#14171a] p-1.5 rounded-full border border-gray-800 shadow-2xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                      : 'text-gray-400 hover:text-gray-200 hover:bg-[#1f2328]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Showcase Split-Card */}
        <div className="bg-[#14171a] border border-gray-800 rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[600px] transition-opacity duration-300 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            
            {/* Left Column: Image Canvas */}
            <div className="relative w-full h-[400px] lg:h-auto bg-[#0a0c0e] flex items-center justify-center p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-emerald-600/5 mix-blend-screen z-0"></div>
              {/* Dynamic Image Component */}
              <div className="relative z-10 w-full h-full max-w-lg mx-auto flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
                <img 
                  src={currentContent.image} 
                  alt={currentContent.headline}
                  className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Right Column: Copy & Actions */}
            <div className="flex flex-col justify-center p-12 lg:p-20 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none"></div>
              
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 rounded-full border border-gray-700 bg-gray-800/50 text-[11px] font-bold tracking-widest text-gray-300 uppercase shadow-sm">
                  {currentContent.tag}
                </span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-12 max-w-xl">
                {currentContent.headline}
              </h2>
              
              <div className="flex flex-wrap gap-4 mt-auto">
                {currentContent.primaryLink ? (
                  currentContent.primaryLink.startsWith('http') ? (
                    <a href={currentContent.primaryLink} target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-bold tracking-wide transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] flex items-center gap-2">
                      {currentContent.primaryButton}
                    </a>
                  ) : (
                    <Link to={currentContent.primaryLink} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-bold tracking-wide transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] flex items-center gap-2">
                      {currentContent.primaryButton}
                    </Link>
                  )
                ) : (
                  <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-bold tracking-wide transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] flex items-center gap-2">
                    {currentContent.primaryButton}
                  </button>
                )}
                
                {currentContent.secondaryButton && (
                  currentContent.secondaryLink ? (
                    currentContent.secondaryLink.startsWith('http') ? (
                      <a href={currentContent.secondaryLink} target="_blank" rel="noopener noreferrer" className="bg-transparent hover:bg-white/5 border-2 border-gray-700 text-white px-8 py-3.5 rounded-xl font-bold tracking-wide transition-all flex items-center gap-2">
                        {currentContent.secondaryButton}
                      </a>
                    ) : (
                      <Link to={currentContent.secondaryLink} className="bg-transparent hover:bg-white/5 border-2 border-gray-700 text-white px-8 py-3.5 rounded-xl font-bold tracking-wide transition-all flex items-center gap-2">
                        {currentContent.secondaryButton}
                      </Link>
                    )
                  ) : (
                    <button className="bg-transparent hover:bg-white/5 border-2 border-gray-700 text-white px-8 py-3.5 rounded-xl font-bold tracking-wide transition-all flex items-center gap-2">
                      {currentContent.secondaryButton}
                    </button>
                  )
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
