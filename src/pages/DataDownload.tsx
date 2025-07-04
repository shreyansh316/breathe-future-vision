import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search,
  Check,
  MapPin,
  BarChart2,
  ThermometerSun,
  ChevronDown,
  Edit2,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const DataDownload = () => {
  // Toggle between empty state and dark configuration view for demonstration
  const [showConfig, setShowConfig] = useState(false);

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans flex flex-col">
      
      {/* Top Navigation Bar - Matching UserDashboard */}
      <header className="bg-[#1F2937] text-white flex items-center justify-between px-6 h-14 sticky top-0 z-50 shadow-md">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-xl font-black text-[#38BDF8] tracking-tighter">
            AQI<span className="text-white text-[10px] align-top ml-1">™</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-1 text-sm font-medium text-slate-300">
            <Link to="/dashboard" className="px-3 py-1.5 hover:text-white transition-colors">Home</Link>
            <Link to="/dashboard" className="px-3 py-1.5 hover:text-white transition-colors">Devices</Link>
            <Link to="/dashboard" className="px-3 py-1.5 hover:text-white transition-colors">Widgets</Link>
            <Link to="/data-download" className="px-3 py-1.5 bg-slate-700 text-white rounded-md transition-colors">Data Download</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center bg-slate-800 rounded px-3 py-1 border border-slate-700 text-xs text-slate-400">
            <span className="flex items-center"><img src="https://flagcdn.com/w20/us.png" alt="US" className="w-4 h-3 mr-1" /> AQI (US)</span>
          </div>
          <button className="w-8 h-8 rounded-full border border-slate-600 overflow-hidden ml-2">
            <img src="https://ui-avatars.com/api/?name=Shreyansh+Choolet&background=0D8ABC&color=fff" alt="User" />
          </button>
        </div>
      </header>

      {!showConfig ? (
        /* ============================ */
        /* LIGHT MODE EMPTY STATE       */
        /* ============================ */
        <main className="max-w-7xl mx-auto w-full p-6 pt-8 flex-1 flex flex-col">
          <div className="bg-white rounded-lg border border-slate-200 p-4 mb-4 flex items-center justify-between shadow-sm">
            <h1 className="text-lg font-bold text-slate-800">Data Download</h1>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input placeholder="Search" className="pl-9 h-9 w-64 text-sm border-slate-200 bg-slate-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 flex-1 flex flex-col items-center justify-center p-12 shadow-sm min-h-[500px]">
            <div className="w-20 h-20 bg-slate-100 rounded-xl transform rotate-45 mb-8 flex items-center justify-center border border-slate-200">
               <div className="transform -rotate-45 flex space-x-1">
                 <div className="w-1.5 h-8 bg-slate-300 rounded-full"></div>
                 <div className="w-1.5 h-8 bg-slate-300 rounded-full"></div>
               </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">No Data to show</h2>
            <Button 
              onClick={() => setShowConfig(true)}
              className="bg-[#4EA3FC] hover:bg-[#3B82F6] text-white shadow-md rounded-lg px-8 h-10"
            >
              Get Data
            </Button>
          </div>
        </main>
      ) : (
        /* ============================ */
        /* DARK MODE CONFIGURATION VIEW */
        /* ============================ */
        <div className="flex-1 bg-[#1A222C] w-full relative">
          
          {/* Sub Header for Dark Mode */}
          <div className="bg-[#1F2937] border-b border-slate-700 h-16 flex items-center justify-between px-6">
            <div className="relative w-96">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input 
                placeholder="Search any Location, City, State or Country" 
                className="pl-9 h-10 bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500 rounded-lg focus-visible:ring-slate-600" 
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                <MapPin className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center space-x-6 text-sm text-slate-300">
               <div className="flex items-center cursor-pointer">Ranking <ChevronDown className="w-4 h-4 ml-1 opacity-50" /></div>
               <div className="flex items-center cursor-pointer">Products <ChevronDown className="w-4 h-4 ml-1 opacity-50" /></div>
               <div className="flex items-center cursor-pointer">Resources <ChevronDown className="w-4 h-4 ml-1 opacity-50" /></div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto p-8 pt-12 flex space-x-8">
            
            {/* Left Sidebar - Locations */}
            <div className="w-[300px] bg-[#2A3441] rounded-2xl p-6 border border-slate-700 h-fit">
              <h3 className="text-white font-medium mb-6">Select locations</h3>
              
              <div className="bg-[#374151] rounded-xl p-4 border border-slate-600 relative mb-6">
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <div className="text-slate-200 text-sm font-medium">Jaipur, Rajasthan, India</div>
                    <div className="text-slate-500 text-xs mt-1">Report 1</div>
                  </div>
                </div>
                <button className="absolute top-4 right-4 text-blue-400 hover:text-blue-300">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col items-center justify-center py-10 mt-20">
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center mb-6">
                  <Plus className="w-4 h-4 mr-1" /> Add More Location
                </button>
                <p className="text-xs text-slate-500 text-center leading-relaxed px-4">
                  Note: Total amount will increase with additional locations
                </p>
              </div>
            </div>

            {/* Main Configuration Area */}
            <div className="flex-1 bg-[#2A3441] rounded-2xl p-8 border border-slate-700 pb-20 relative">
              <div className="border-b border-slate-700 pb-2 mb-8">
                <span className="text-blue-400 font-medium pb-2 border-b-2 border-blue-400 px-2">Daily</span>
              </div>

              {/* Parameter Selection */}
              <div className="mb-8">
                <h3 className="text-white text-sm font-medium mb-4">Select Parameters Group</h3>
                <div className="flex space-x-4">
                  {/* Primary Box */}
                  <label className="flex-1 bg-[#374151] rounded-xl p-4 border border-slate-600 cursor-pointer flex items-start">
                    <div className="w-5 h-5 rounded bg-blue-500 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <div className="text-slate-300 text-xs mb-1">Primary Parameters</div>
                      <div className="text-slate-100 text-sm font-medium tracking-wide">AQI-US | AQI (IN) | PM2.5 | PM10</div>
                    </div>
                  </label>
                  
                  {/* Secondary Box */}
                  <label className="flex-1 bg-transparent rounded-xl p-4 border border-slate-700 cursor-pointer flex items-start opacity-70">
                    <div className="w-5 h-5 rounded border border-slate-500 flex items-center justify-center mr-3 mt-0.5"></div>
                    <div>
                      <div className="text-slate-400 text-xs mb-1 flex items-center">Secondary Parameters <span className="w-3 h-3 rounded-full border border-slate-500 flex items-center justify-center ml-1 text-[8px]">i</span></div>
                      <div className="text-slate-300 text-sm font-medium tracking-wide">CO | SO2 | NO2 | O3</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Data Plan */}
              <div className="mb-8">
                <h3 className="text-white text-sm font-medium mb-4">Choose Your Data Plan</h3>
                <div className="flex space-x-2">
                  <button className="bg-[#374151] text-blue-400 px-6 py-2.5 rounded-lg border border-slate-600 text-sm font-medium flex items-center">
                    <Check className="w-4 h-4 mr-2" /> Free
                  </button>
                  <button className="bg-transparent text-slate-400 px-8 py-2.5 rounded-lg border border-slate-700 text-sm font-medium">
                    Paid
                  </button>
                </div>
              </div>

              {/* Duration Dropdown */}
              <div className="mb-8 w-64">
                <h3 className="text-white text-sm font-medium mb-4">Choose Duration</h3>
                <div className="relative">
                  <select className="w-full bg-transparent border border-slate-600 text-slate-300 text-sm rounded-lg h-10 px-4 appearance-none focus:outline-none focus:border-slate-500">
                    <option>Last 1 month</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* File Format */}
              <div className="mb-8">
                <h3 className="text-white text-sm font-medium mb-4">File Format</h3>
                <label className="flex items-center cursor-pointer">
                  <div className="w-4 h-4 rounded-full border border-blue-500 flex items-center justify-center mr-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <span className="text-slate-300 text-sm">CSV</span>
                </label>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-slate-500 leading-relaxed max-w-3xl mb-8">
                Disclaimer: AQI.in data is compiled from two sources: our own proprietary monitoring network, deployed and maintained directly by us across India and worldwide, and government monitoring station feeds. Data from both sources is ingested into and processed through o... <a href="#" className="text-blue-400">Read more</a>
              </p>

              {/* Checkout Action */}
              <div className="absolute bottom-8 right-8 flex flex-col items-end">
                <Button className="bg-[#4EA3FC] hover:bg-[#3B82F6] text-white rounded-lg px-10 h-10 shadow-lg">
                  Checkout
                </Button>
                
                {/* Back to demo toggle */}
                <button 
                  onClick={() => setShowConfig(false)}
                  className="text-xs text-slate-500 underline mt-4"
                >
                  (Back to Empty State Demo)
                </button>
              </div>

            </div>

          </div>

          {/* Bottom App Nav Pills (from screenshot) */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-[#374151]/80 backdrop-blur-md rounded-full border border-slate-600 flex items-center px-2 py-1 space-x-2">
             <button className="flex items-center text-slate-300 text-xs px-4 py-1.5 hover:text-white rounded-full"><MapPin className="w-3 h-3 mr-2 text-red-400" /> Map</button>
             <button className="flex items-center text-slate-300 text-xs px-4 py-1.5 hover:text-white rounded-full bg-slate-600/50"><BarChart2 className="w-3 h-3 mr-2 text-blue-400" /> Ranking</button>
             <button className="flex items-center text-slate-300 text-xs px-4 py-1.5 hover:text-white rounded-full"><ThermometerSun className="w-3 h-3 mr-2 text-orange-400" /> Climate Change</button>
          </div>
          
        </div>
      )}

    </div>
  );
};

export default DataDownload;
