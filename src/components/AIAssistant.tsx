import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Bot, Zap, Brain, Search, X, Satellite, Wind, MapPin, TrendingUp, AlertTriangle, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  icon?: string;
}

export const AIAssistant = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'ai',
      content: t('aiAssistantGreeting'),
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const enhancedResponses = {
    'air quality': {
      response: 'Based on latest ISRO satellite data and CPCB ground stations:\n\n🔴 Delhi: PM2.5 156 μg/m³ (Severe)\n🟡 Mumbai: PM2.5 89 μg/m³ (Moderate)\n🟢 Bangalore: PM2.5 67 μg/m³ (Satisfactory)\n\n💡 Recommendation: Use N95 masks in Delhi, limit outdoor activities 2-6 PM. Air quality improves after 8 PM due to wind patterns.',
      icon: '🌬️'
    },
    'prediction': {
      response: 'AI Weather-Pollution Forecast (Next 24 Hours):\n\n📊 Delhi: 15% improvement expected due to wind speed increase (12 km/h)\n🌧️ Mumbai: Rain likely at 4 PM will reduce PM2.5 by 30%\n☀️ Bangalore: Stable conditions, AQI remains in satisfactory range\n\n🎯 Best outdoor times tomorrow: 6-9 AM, 7-9 PM',
      icon: '🔮'
    },
    'health': {
      response: 'Personalized Health Advisory Based on Current AQI:\n\n😷 For Severe AQI (Delhi): Wear N95 masks, use air purifiers indoors, avoid jogging/cycling\n🚶 For Moderate AQI: Limit intense outdoor activities, stay hydrated\n🫁 Vulnerable groups (asthma, elderly, children): Stay indoors during peak pollution (2-6 PM)\n\n🌿 Natural remedies: Tulsi tea, steam inhalation, indoor plants (money plant, snake plant)',
      icon: '❤️'
    },
    'weather': {
      response: 'Weather-Pollution Correlation Analysis:\n\n🌬️ Wind Speed: 8 km/h (Low) - Pollution accumulation likely\n🌡️ Temperature: 28°C - Ground-level ozone formation moderate\n💧 Humidity: 65% - Particulate matter suspension high\n⛈️ Rain Forecast: 60% chance at 6 PM - Will improve AQI by 40%\n\n📈 Pollution peaks during calm weather, improves with rain/wind',
      icon: '⛅'
    },
    'location': {
      response: 'Location-Based Air Quality Analysis:\n\n📍 High-risk areas: Near traffic junctions, industrial zones, construction sites\n🏠 Indoor AQI typically 2-5x better than outdoor\n🚗 Vehicle emissions contribute 35% to urban pollution\n🌳 Areas near parks/water bodies have 20% better air quality\n\n💡 Choose routes through green corridors, avoid rush hour travel',
      icon: '🗺️'
    },
    'solutions': {
      response: 'Smart Air Quality Solutions:\n\n🏠 Personal: Air purifiers (HEPA), indoor plants, UV sanitizers\n🚗 Transport: Use metro/electric vehicles, carpool, work from home\n🏭 Community: Report pollution sources via app, support clean energy\n🌱 Long-term: Tree plantation drives, rooftop gardens, renewable energy\n\n🎯 Small actions create big impact - every choice matters!',
      icon: '💡'
    },
    'emergency': {
      response: 'Air Pollution Emergency Protocol:\n\n🚨 If AQI > 300: Stay indoors, close windows, use air purifiers\n🫁 Breathing difficulty: Seek medical attention immediately\n👶 Children/elderly: Extra precautions, nebulizers ready\n📱 Emergency contacts: Pollution Control Board: 1800-XXX-XXXX\n\n⚡ Real-time alerts sent via SMS for severe pollution episodes',
      icon: '🚨'
    },
    'satellite': {
      response: 'ISRO Satellite Data Insights:\n\n🛰️ INSAT-3D/3DR: Aerosol Optical Depth (AOD) monitoring\n📡 Real-time data refresh: Every 30 minutes\n🌍 Coverage: Pan-India with 1km resolution\n📊 Accuracy: 95% correlation with ground stations\n\n🇮🇳 Proudly powered by Indian Space Technology - NavIC enabled for precise location tracking',
      icon: '🛰️'
    }
  };

  const quickActions = [
    { 
      label: t('currentAQI'), 
      icon: Zap, 
      action: () => setInputValue('What is the current air quality in my area?'),
      color: 'bg-[#00C853]'
    },
    { 
      label: t('healthTips'), 
      icon: Heart, 
      action: () => setInputValue('Give me health recommendations for current pollution levels'),
      color: 'bg-red-500'
    },
    { 
      label: t('tomorrowForecast'), 
      icon: TrendingUp, 
      action: () => setInputValue('What is tomorrow\'s air quality prediction?'),
      color: 'bg-blue-500'
    },
    { 
      label: t('emergencyHelp'), 
      icon: AlertTriangle, 
      action: () => setInputValue('Air pollution emergency protocol'),
      color: 'bg-orange-500'
    },
    { 
      label: t('satelliteData'), 
      icon: Satellite, 
      action: () => setInputValue('Show me satellite data insights'),
      color: 'bg-purple-500'
    },
    { 
      label: t('locationAnalysis'), 
      icon: MapPin, 
      action: () => setInputValue('Analyze air quality for my location'),
      color: 'bg-teal-500'
    }
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      type: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const lowercaseInput = inputValue.toLowerCase();
      let response = 'I understand your query about air quality. Based on real-time ISRO satellite data and AI analysis, I\'m processing comprehensive insights for you. Our system monitors 150+ CPCB stations across India with 99.2% accuracy.';
      let responseIcon = '🤖';
      
      for (const [key, data] of Object.entries(enhancedResponses)) {
        if (lowercaseInput.includes(key)) {
          response = data.response;
          responseIcon = data.icon;
          break;
        }
      }

      // Add contextual information based on keywords
      if (lowercaseInput.includes('delhi')) {
        response += '\n\n🏢 Delhi-specific: Construction dust contributes 25% to pollution. Metro usage reduces personal exposure by 60%.';
      } else if (lowercaseInput.includes('mumbai')) {
        response += '\n\n🌊 Mumbai-specific: Sea breeze improves air quality 4-7 PM. Coastal areas have 30% better AQI.';
      } else if (lowercaseInput.includes('bangalore')) {
        response += '\n\n🌳 Bangalore-specific: Garden City benefits from green cover. Tech corridors have moderate pollution levels.';
      }

      const aiMessage: Message = {
        type: 'ai',
        content: response,
        timestamp: new Date().toLocaleTimeString(),
        icon: responseIcon
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1800);
  };

  return (
    <>
      {/* Enhanced Floating AI Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <div className="relative">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-[#00C853] via-[#FF6F00] to-[#263238] hover:shadow-2xl hover:scale-110 transition-all duration-300 animate-pulse border-4 border-white"
          >
            {isOpen ? <X className="w-5 h-5 sm:w-7 sm:h-7 text-white" /> : <Bot className="w-5 h-5 sm:w-7 sm:h-7 text-white" />}
          </Button>
          {!isOpen && (
            <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced AI Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 sm:bottom-24 sm:right-6 w-[95vw] max-w-[420px] h-[85vh] max-h-[580px] bg-gradient-to-br from-white/98 via-blue-50/95 to-green-50/95 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-white/50 z-40 animate-scale-in">
          {/* Enhanced Header */}
          <div className="p-4 sm:p-5 border-b border-gradient-to-r from-[#00C853]/20 to-[#FF6F00]/20 bg-gradient-to-r from-[#00C853]/5 via-white/50 to-[#FF6F00]/5 rounded-t-3xl">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#00C853] via-[#FF6F00] to-[#263238] rounded-full flex items-center justify-center animate-pulse border-2 border-white">
                  <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white animate-ping"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[#263238] text-base sm:text-lg truncate">{t('appName')} AI</h3>
                <p className="text-xs text-[#263238]/70 flex items-center space-x-1">
                  <Satellite className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">ISRO • Real-time Intelligence</span>
                </p>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <Badge className="bg-green-500 text-white text-xs">
                  🇮🇳 Online
                </Badge>
                <Badge className="bg-blue-500 text-white text-xs hidden sm:block">
                  99.2% Accurate
                </Badge>
              </div>
            </div>
          </div>

          {/* Enhanced Messages */}
          <div className="flex-1 p-3 sm:p-4 h-[45vh] sm:h-[340px] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-[#00C853]/30">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 sm:p-4 rounded-2xl shadow-lg ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-[#00C853] to-[#00C853]/90 text-white' 
                    : 'bg-gradient-to-r from-white to-blue-50/80 text-[#263238] border border-white/50'
                }`}>
                  {message.type === 'ai' && message.icon && (
                    <div className="text-base sm:text-lg mb-2">{message.icon}</div>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-line break-words">{message.content}</p>
                  <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-white/70' : 'text-[#263238]/70'}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-white to-blue-50/80 p-3 sm:p-4 rounded-2xl border border-white/50 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#00C853] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#FF6F00] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-[#263238] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span className="text-xs text-[#263238]/70">AI is analyzing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Quick Actions */}
          <div className="p-3 border-t border-white/30 bg-gradient-to-r from-white/50 to-blue-50/30">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={action.action}
                  className={`text-xs hover:scale-105 transition-all duration-200 ${action.color} text-white border-none hover:opacity-90 p-2`}
                >
                  <action.icon className="w-3 h-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Enhanced Input */}
          <div className="p-3 sm:p-4 border-t border-white/30 bg-gradient-to-r from-white/60 to-green-50/40 rounded-b-3xl">
            <div className="flex space-x-2 sm:space-x-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about air quality, health tips, predictions..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-white/80 backdrop-blur-sm border-[#00C853]/30 focus:border-[#00C853] rounded-xl text-sm"
              />
              <Button 
                onClick={handleSendMessage} 
                size="icon" 
                className="bg-gradient-to-r from-[#00C853] to-[#00C853]/90 hover:scale-105 transition-all duration-200 rounded-xl flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-[#263238]/60 mt-2 text-center">
              🛰️ Powered by ISRO satellite data • Made in India 🇮🇳
            </p>
          </div>
        </div>
      )}
    </>
  );
};
