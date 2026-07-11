
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, MapPin, Zap, TrendingUp, AlertTriangle } from 'lucide-react';

export const SmartSearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchSuggestions = [
    'Air quality in Delhi',
    'PM2.5 levels Mumbai',
    'Health recommendations for today',
    'Best time for outdoor exercise',
    'Air pollution forecast tomorrow',
    'AQI comparison between cities',
    'Pollution hotspots near me',
    'Indoor air quality tips'
  ];

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (value.length > 2) {
      const filtered = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const quickFilters = [
    { label: 'Current AQI', icon: Zap, color: '#00C853' },
    { label: 'Forecast', icon: TrendingUp, color: '#FF6F00' },
    { label: 'Alerts', icon: AlertTriangle, color: '#F44336' },
    { label: 'Nearby', icon: MapPin, color: '#2196F3' }
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <Input
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Search by coordinate, city, or district..."
          className="pl-12 pr-20 py-4 text-lg bg-white/90 backdrop-blur-sm border-2 border-[#00C853]/20 focus:border-[#00C853] rounded-2xl shadow-lg"
        />
        <Button 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#00C853] to-[#FF6F00] hover:shadow-lg rounded-xl"
        >
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="flex space-x-2 mt-4 justify-center">
        {quickFilters.map((filter, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="hover:scale-105 transition-transform duration-200"
            style={{ borderColor: filter.color }}
          >
            <filter.icon className="w-4 h-4 mr-1" style={{ color: filter.color }} />
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full mt-2 w-full bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl z-30 animate-fade-in">
          <div className="p-2">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-3 hover:bg-[#00C853]/10 rounded-xl cursor-pointer transition-colors duration-200"
                onClick={() => {
                  setQuery(suggestion);
                  setShowSuggestions(false);
                }}
              >
                <div className="flex items-center space-x-3">
                  <Search className="w-4 h-4 text-[#00C853]" />
                  <span className="text-sm text-[#263238]">{suggestion}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
