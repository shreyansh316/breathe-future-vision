
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin } from 'lucide-react';

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
  cities: Array<{
    name: string;
    pm25: number;
    pm10: number;
    aqi: string;
    color: string;
    state: string;
    coordinates: [number, number];
  }>;
}

export const CitySelector = ({ selectedCity, onCityChange, cities }: CitySelectorProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center space-x-3 mb-3">
        <MapPin className="w-5 h-5 text-[#00C853]" />
        <h3 className="text-lg font-semibold text-[#263238]">Select City</h3>
      </div>
      <Select value={selectedCity} onValueChange={onCityChange}>
        <SelectTrigger className="w-full bg-white/80 backdrop-blur-sm border-[#00C853]/30">
          <SelectValue placeholder="Choose a city to view pollution data" />
        </SelectTrigger>
        <SelectContent>
          {cities.map((city) => (
            <SelectItem key={city.name} value={city.name}>
              <div className="flex items-center justify-between w-full">
                <span>{city.name}, {city.state}</span>
                <div 
                  className="w-3 h-3 rounded-full ml-2" 
                  style={{ backgroundColor: city.color }}
                ></div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
