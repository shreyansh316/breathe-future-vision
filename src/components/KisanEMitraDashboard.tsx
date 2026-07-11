import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Tractor, 
  Sprout, 
  CloudRain, 
  ThermometerSun, 
  Smartphone, 
  CheckCircle2, 
  Wind,
  AlertTriangle,
  Droplets
} from 'lucide-react';
import { usePollutionData } from '@/hooks/usePollutionData';

export const KisanEMitraDashboard = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // Use some global data for context
  const { cities } = usePollutionData();
  const avgAqi = Math.floor(cities.reduce((acc, c) => acc + (c.pm25 || 100), 0) / (cities.length || 1));
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setIsSubscribed(true);
      // Mock API call
      setTimeout(() => {
        setPhoneNumber('');
      }, 3000);
    }
  };

  return (
    <div className="w-full bg-[#f8fcf5] border border-[#e0f0d9] rounded-3xl overflow-hidden shadow-xl my-8">
      <div className="bg-[#4CAF50] text-white p-6 md:p-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-black flex items-center mb-2">
            <Tractor className="w-10 h-10 mr-4" />
            Kisan eMitra Dashboard
          </h2>
          <p className="text-[#e8f5e9] text-lg font-medium">Simple, actionable data for rural agriculture.</p>
        </div>
        <div className="hidden md:flex bg-white/20 p-4 rounded-xl backdrop-blur-sm items-center space-x-3">
          <ThermometerSun className="w-8 h-8" />
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider opacity-80">Local Temp</div>
            <div className="text-2xl font-bold">32°C</div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Soil & Crop Impact */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-emerald-100 pb-2">
            Crop Health & Environment
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-5 border-l-4 border-l-emerald-500 bg-white shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                  <Sprout className="w-6 h-6" />
                </div>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-sm">Wheat</span>
              </div>
              <h4 className="font-bold text-slate-700 mb-1">Growth Forecast</h4>
              <p className="text-sm text-slate-500">Current AQI ({avgAqi}) is reducing solar radiation by ~12%. Expect slight delay in maturation.</p>
            </Card>

            <Card className="p-5 border-l-4 border-l-blue-500 bg-white shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                  <Droplets className="w-6 h-6" />
                </div>
                <span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded text-sm">Soil Moisture</span>
              </div>
              <h4 className="font-bold text-slate-700 mb-1">Adequate (65%)</h4>
              <p className="text-sm text-slate-500">No immediate irrigation needed. Next predicted rainfall in 4 days.</p>
            </Card>

            <Card className="p-5 border-l-4 border-l-amber-500 bg-white shadow-sm sm:col-span-2">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-amber-100 text-amber-700 rounded-full flex-shrink-0">
                  <Wind className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">Harvesting Advisory</h4>
                  <p className="text-slate-600 mt-1">
                    Wind speeds are currently low (5 km/h). Ideal time for manual harvesting. Avoid any post-harvest burning as smoke will stagnate locally.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column: SMS Alerts */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-emerald-100 pb-2 flex items-center">
            <Smartphone className="w-6 h-6 mr-2 text-slate-600" /> Offline SMS Alerts
          </h3>
          
          <Card className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
            {!isSubscribed ? (
              <>
                <div className="flex items-start space-x-3 text-slate-700 mb-6">
                  <CloudRain className="w-8 h-8 text-blue-500 flex-shrink-0" />
                  <p className="font-medium leading-relaxed">
                    Don't have a smartphone? Get critical weather, extreme AQI, and parali (stubble burning) warnings directly via standard SMS on any basic phone.
                  </p>
                </div>

                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number (India)</label>
                    <div className="flex relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 font-bold border-r border-slate-300 pr-2 bg-slate-50 rounded-l-md">
                        +91
                      </span>
                      <Input 
                        type="tel" 
                        placeholder="98765 43210" 
                        className="pl-14 py-6 text-lg"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        required
                        minLength={10}
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full py-6 text-lg font-bold bg-[#4CAF50] hover:bg-[#388E3C] shadow-lg shadow-green-500/20"
                    disabled={phoneNumber.length < 10}
                  >
                    Subscribe for Free SMS
                  </Button>
                  <p className="text-xs text-center text-slate-500 mt-4 flex items-center justify-center">
                    <AlertTriangle className="w-3 h-3 mr-1" /> Standard SMS rates may apply. Opt-out anytime.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="inline-flex items-center justify-center p-4 bg-green-100 text-green-600 rounded-full mb-2">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-black text-slate-800">Successfully Subscribed!</h3>
                <p className="text-slate-600">
                  You will now receive SMS alerts for critical weather changes and high AQI levels in your registered pin code.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-6 border-slate-300"
                  onClick={() => setIsSubscribed(false)}
                >
                  Register Another Number
                </Button>
              </div>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
};
