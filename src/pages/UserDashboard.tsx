import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Home, 
  MonitorSmartphone, 
  Link as LinkIcon, 
  QrCode, 
  Download, 
  Users, 
  Clock, 
  UserCircle, 
  Map as MapIcon,
  Plus,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const UserDashboard = () => {
  // State to toggle between the populated "Dashboard" and the "Empty State" from the screenshots
  const [hasDevices, setHasDevices] = useState(false);
  // State for user dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans">
      
      {/* Top Navigation Bar */}
      <header className="bg-[#1F2937] text-white flex items-center justify-between px-6 h-14 sticky top-0 z-50 shadow-md">
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link to="/" className="text-xl font-black text-[#38BDF8] tracking-tighter">
            AQI<span className="text-white text-[10px] align-top ml-1">™</span>
          </Link>

          {/* Main Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 text-sm font-medium text-slate-300">
            <Link to="/dashboard" className="flex items-center px-3 py-1.5 rounded-md hover:bg-slate-700/50 hover:text-white transition-colors">
              <Home className="w-4 h-4 mr-2 opacity-70" /> Home
            </Link>
            <Link to="/dashboard" className="flex items-center px-3 py-1.5 rounded-md bg-slate-700 text-white transition-colors">
              <MonitorSmartphone className="w-4 h-4 mr-2 opacity-70" /> Devices
            </Link>
            <Link to="/dashboard" className="flex items-center px-3 py-1.5 rounded-md hover:bg-slate-700/50 hover:text-white transition-colors">
              <LinkIcon className="w-4 h-4 mr-2 opacity-70" /> Link
            </Link>
            <Link to="/dashboard" className="flex items-center px-3 py-1.5 rounded-md hover:bg-slate-700/50 hover:text-white transition-colors">
              <QrCode className="w-4 h-4 mr-2 opacity-70" /> QR Code
            </Link>
            <Link to="/data-download" className="flex items-center px-3 py-1.5 rounded-md hover:bg-slate-700/50 hover:text-white transition-colors">
              <Download className="w-4 h-4 mr-2 opacity-70" /> Export Data
            </Link>
            <Link to="/dashboard" className="flex items-center px-3 py-1.5 rounded-md hover:bg-slate-700/50 hover:text-white transition-colors">
              <Users className="w-4 h-4 mr-2 opacity-70" /> Grouping
            </Link>
            <Link to="/dashboard" className="flex items-center px-3 py-1.5 rounded-md hover:bg-slate-700/50 hover:text-white transition-colors">
              <Clock className="w-4 h-4 mr-2 opacity-70" /> Real Time
            </Link>
            <Link to="/dashboard" className="flex items-center px-3 py-1.5 rounded-md hover:bg-slate-700/50 hover:text-white transition-colors">
              <UserCircle className="w-4 h-4 mr-2 opacity-70" /> Personalized
            </Link>
            <Link to="/dashboard" className="flex items-center px-3 py-1.5 rounded-md hover:bg-slate-700/50 hover:text-white transition-colors">
              <MapIcon className="w-4 h-4 mr-2 opacity-70" /> Map
            </Link>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center bg-slate-800 rounded px-3 py-1 border border-slate-700 text-xs">
            <span className="text-slate-400 mr-2">AQI Standard</span>
            <span className="flex items-center"><img src="https://flagcdn.com/w20/us.png" alt="US" className="w-4 h-3 mr-1" /> AQI (US)</span>
          </div>
          <button className="text-slate-300 hover:text-white">
            <Bell className="w-5 h-5" />
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-8 h-8 rounded-full border border-slate-600 overflow-hidden ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img src="https://ui-avatars.com/api/?name=Shreyansh+Choolet&background=0D8ABC&color=fff" alt="User" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-slate-200 z-50 text-sm text-slate-700 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center space-x-3">
                  <img src="https://ui-avatars.com/api/?name=Shreyansh+Choolet&background=0D8ABC&color=fff" alt="User" className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="font-semibold text-slate-800">Shreyansh Choolet</div>
                    <div className="text-xs text-slate-500 truncate w-40">shreyanshchoolet@gmail.com</div>
                  </div>
                </div>
                
                <div className="py-2">
                  <Link to="/account/profile" className="flex items-center px-4 py-2 hover:bg-slate-50">
                    <UserCircle className="w-4 h-4 mr-3 text-slate-500" /> My Account
                  </Link>
                  <Link to="/account/admins" className="flex items-center px-4 py-2 hover:bg-slate-50">
                    <Users className="w-4 h-4 mr-3 text-slate-500" /> Manage Admins
                  </Link>
                  <Link to="/account/transactions" className="flex items-center px-4 py-2 hover:bg-slate-50 border-b border-slate-100 pb-3 mb-1">
                    <Clock className="w-4 h-4 mr-3 text-slate-500" /> My Transactions
                  </Link>
                  
                  <Link to="/account/devices" className="flex flex-col px-4 py-2 hover:bg-slate-50 border-b border-slate-100 pb-3 mb-1">
                    <div className="flex items-center">
                      <MonitorSmartphone className="w-4 h-4 mr-3 text-slate-500" /> Manage Devices
                    </div>
                    <span className="text-xs text-slate-400 ml-7">Renew / Remove</span>
                  </Link>

                  <Link to="/account/favorites" className="flex items-center px-4 py-2 hover:bg-slate-50 border-b border-slate-100 pb-3 mb-1">
                    <MapIcon className="w-4 h-4 mr-3 text-slate-500" /> Favorites
                  </Link>

                  <Link to="/account/plans" className="flex items-center px-4 py-2 hover:bg-slate-50 border-b border-slate-100 pb-3 mb-1">
                    <svg className="w-4 h-4 mr-3 text-amber-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> Explore Plans
                  </Link>

                  <Link to="/download" className="flex items-center px-4 py-2 hover:bg-slate-50 border-b border-slate-100 pb-3 mb-1">
                    <MonitorSmartphone className="w-4 h-4 mr-3 text-slate-500" /> Get Mobile App
                  </Link>

                  <a href="https://aqi.in" target="_blank" rel="noreferrer" className="flex items-center px-4 py-2 hover:bg-slate-50 text-blue-500 border-b border-slate-100 pb-3 mb-1">
                    <LinkIcon className="w-4 h-4 mr-3" /> AQI Website
                  </a>

                  <button className="flex items-center px-4 py-2 hover:bg-slate-50 w-full text-left text-red-500 mt-1">
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto p-8 pt-12">
        
        {/* Page Breadcrumb/Header */}
        <div className="mb-8">
          <div className="text-sm text-slate-500 mb-2">AQI &gt; Dashboard</div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-slate-800">
              Hello, Shreyansh Choolet <span className="opacity-0">Shreyansh Choolet</span>
            </h1>
            {/* Toggle switch just for demonstration purposes to switch between states */}
            <button 
              onClick={() => setHasDevices(!hasDevices)}
              className="text-xs text-blue-500 underline"
            >
              Toggle Empty State (For Demo)
            </button>
          </div>
        </div>

        {hasDevices ? (
          /* Populated State (Screenshot 3) */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Start Monitoring Card */}
            <Card className="bg-white rounded-2xl overflow-hidden border-0 shadow-sm flex flex-col md:flex-row h-full">
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs font-medium mb-6 border border-red-100">
                    <MonitorSmartphone className="w-3 h-3 mr-1.5" /> No Device added yet
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 leading-tight mb-4">
                    Start monitoring your <br/> <span className="text-[#4EA3FC]">air quality</span> in minutes
                  </h2>
                  <a href="#" className="text-[#4EA3FC] text-sm flex items-center hover:underline font-medium mb-8">
                    Learn More <ArrowRight className="w-3 h-3 ml-1" />
                  </a>
                </div>
                <Button className="w-full bg-[#4EA3FC] hover:bg-[#3B82F6] text-white shadow-md rounded-lg">
                  <Plus className="w-4 h-4 mr-2" /> Add Device
                </Button>
              </div>
              <div className="bg-slate-100 md:w-[45%] relative min-h-[200px]">
                <img 
                  src="https://images.unsplash.com/photo-1593113063529-679df6b4d3f3?q=80&w=1000&auto=format&fit=crop" 
                  alt="AQI Device Placeholder" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </Card>

            {/* Data Download Card */}
            <Card className="bg-white rounded-2xl overflow-hidden border-0 shadow-sm flex flex-col md:flex-row h-full">
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-50 text-slate-600 text-xs font-medium mb-6 border border-slate-200">
                    <Download className="w-3 h-3 mr-1.5" /> Data Download
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 leading-tight mb-8">
                    Get <span className="text-[#4EA3FC]">Public Outdoor Station's Historical</span> Air<br/> quality <span className="text-[#4EA3FC]">Raw</span> Data
                  </h2>
                </div>
                <Button className="w-full bg-[#4EA3FC] hover:bg-[#3B82F6] text-white shadow-md rounded-lg mt-auto">
                  <Download className="w-4 h-4 mr-2" /> Download Data <ArrowRight className="w-4 h-4 ml-auto" />
                </Button>
              </div>
              <div className="md:w-[40%] flex items-center justify-center p-6 bg-slate-50/50">
                {/* Abstract illustration placeholder for the folders */}
                <div className="relative w-full aspect-square max-w-[160px]">
                  <div className="absolute top-4 right-0 w-24 h-32 bg-slate-200 rounded-md shadow-sm border border-slate-300 transform rotate-6"></div>
                  <div className="absolute top-2 left-4 w-28 h-36 bg-white rounded-md shadow-md border border-slate-200 flex flex-col p-2">
                    <div className="w-full h-2 bg-slate-100 rounded mb-2"></div>
                    <div className="w-3/4 h-2 bg-slate-100 rounded mb-4"></div>
                    <div className="flex-1 border border-slate-100 rounded"></div>
                  </div>
                  <div className="absolute bottom-4 left-0 w-24 h-20 bg-amber-400 rounded-lg shadow-lg border border-amber-500 z-10 flex flex-col">
                    <div className="w-1/2 h-4 bg-amber-300 rounded-tl-lg rounded-tr-md -mt-3 ml-2"></div>
                  </div>
                  <div className="absolute top-1/2 -left-4 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow z-20">PM2.5</div>
                  <div className="absolute bottom-8 -right-2 bg-slate-700 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow z-20">AQI</div>
                </div>
              </div>
            </Card>

          </div>
        ) : (
          /* Empty State (Screenshots 4 & 5) */
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-2xl border-0 shadow-sm min-h-[500px]">
            <div className="mb-6 relative">
              {/* Abstract minimalist device icon */}
              <div className="w-16 h-20 border-4 border-slate-500 rounded-[24px] flex items-end justify-center pb-3">
                <div className="w-2 h-2 rounded-full bg-slate-500"></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No Device Yet!</h2>
            <p className="text-sm text-slate-500 text-center max-w-sm mb-8 leading-relaxed">
              No device is added to your account. Add device from below link.
            </p>
            <Button className="bg-[#4EA3FC] hover:bg-[#3B82F6] text-white shadow-md rounded-lg px-6 h-10">
              <Plus className="w-4 h-4 mr-2" /> Add Device
            </Button>
          </div>
        )}

      </main>
    </div>
  );
};

export default UserDashboard;
