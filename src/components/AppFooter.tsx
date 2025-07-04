import React from 'react';
import { Instagram, Twitter, Linkedin, Youtube, Facebook, ArrowUpRight, Mail, MapPin } from 'lucide-react';

export const AppFooter = () => {
  return (
    <footer className="w-full bg-[#121416] text-white border-t border-gray-800 flex flex-col md:flex-row relative z-50 pb-8 md:pb-0">
      
      {/* Left Column (25%) */}
      <div className="w-full md:w-1/4 bg-[#1a1d20] p-10 lg:p-16 border-r border-gray-800 flex flex-col justify-between">
        <div>
          <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tighter mb-6">
            AQI
          </div>
          <p className="text-gray-400 text-sm leading-relaxed font-medium">
            Real-time Air quality and Weather data around the world.
          </p>
        </div>
        
        <div className="mt-12 text-xs text-gray-600 font-bold">
          © 2026 AQI. All rights reserved.
        </div>
      </div>

      {/* Right Content Grid (75%) */}
      <div className="w-full md:w-3/4 p-10 lg:p-16 flex flex-col justify-between">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1 */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-2">About AQI</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-medium">
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">AQI Monitor</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Air Quality Blog</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Climate Change</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-2">Air Quality</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-medium">
              <li><a href="#" className="hover:text-blue-400 transition-colors">AQI App</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">AQI TV App</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">AQI Map</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">AQI APIs</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">AQI Widgets</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Web Dashboard</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-2">Rankings</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-medium">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Live AQI City Ranking</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Historic AQI City Ranking</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Historic AQI Country Ranking</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Weather Ranking</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-2">Location & Support</h4>
            
            <a href="#" className="group flex items-center text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors mb-6">
              Support Desk 
              <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            
            <div className="space-y-4 text-xs text-gray-400">
              <div>
                <span className="block text-gray-500 font-bold mb-1 uppercase text-[10px]">Business Query</span>
                <a href="#" className="flex items-center hover:text-white transition-colors">
                  <Mail className="w-3 h-3 mr-2" /> business@aqi.in
                </a>
              </div>
              
              <div>
                <span className="block text-gray-500 font-bold mb-1 uppercase text-[10px]">Complaint / Support</span>
                <a href="#" className="flex items-center hover:text-white transition-colors">
                  <Mail className="w-3 h-3 mr-2" /> support@aqi.in
                </a>
              </div>
              
              <div>
                <span className="block text-gray-500 font-bold mb-1 uppercase text-[10px]">Office Location</span>
                <div className="flex items-start">
                  <MapPin className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">701, 7th Floor, D-Mall, Netaji Subhash Place, Delhi - 110034</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Social Link Strip */}
        <div className="w-full flex flex-col sm:flex-row justify-end items-center border-t border-gray-800 pt-8 gap-4">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Find us on:</span>
          <div className="flex space-x-3">
            {[Instagram, Twitter, Linkedin, Youtube, Facebook].map((Icon, idx) => (
              <a key={idx} href="#" className="w-8 h-8 rounded-full border border-gray-800 bg-[#1a1d20] flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

      </div>
      
      {/* VayuNet Footer Strip */}
      <div className="absolute bottom-0 w-full py-2 text-center text-[10px] text-gray-600 tracking-[0.2em] bg-[#0a0f16] border-t border-white/5 uppercase">
        Powered by VayuNet • Core Analytics Engine
      </div>
    </footer>
  );
};
