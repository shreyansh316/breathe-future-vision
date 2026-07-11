import React, { useState, useEffect } from 'react';
import { Globe, User, ArrowUpRight, Search, Menu, X, CloudSun, ChevronDown, LocateFixed } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { LanguageSwitcher } from './LanguageSwitcher';
import { RankingMegaMenu } from './RankingMegaMenu';
import { ProductsMegaMenu } from './ProductsMegaMenu';
import { ResourcesMegaMenu } from './ResourcesMegaMenu';

export const GlobalHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSupabaseLogin = async () => {
    try {
      // Phase 39: Polyglot Database Auth (Supabase)
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
      });
      if (error) throw error;
      alert("Redirecting to Supabase OAuth Provider...");
    } catch (error: any) {
      alert(`Supabase Auth Required: Ensure your .env keys are valid.\nError: ${error.message}`);
    }
  };

  useEffect(() => {
    // Dispatch event to update SubNavigation
    window.dispatchEvent(new CustomEvent('update-location', { detail: { location: 'Mumbai, India' } }));

    // Phase 1 Security: Listen for Supabase Auth changes and sync with Backend HTTPOnly Cookie
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        try {
          await fetch('http://localhost:5000/api/v2/auth/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ access_token: session.access_token })
          });
          console.log("Secure HTTPOnly session established with backend.");
        } catch (error) {
          console.error("Failed to establish secure backend session:", error);
        }
      } else if (event === 'SIGNED_OUT') {
        try {
          await fetch('http://localhost:5000/api/v2/auth/logout', { method: 'POST' });
        } catch (error) {
          console.error("Failed to clear backend session:", error);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="bg-[#111827] border-b border-gray-800 sticky top-0 z-50 px-6 py-3 transition-all">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Brand & Search */}
        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
          <span className="text-2xl font-black tracking-wider text-sky-400 cursor-pointer">
            AQI<span className="text-white text-xs align-super font-normal">®</span>
          </span>
          <div className="relative w-64 lg:w-80 hidden sm:block">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search any Location..." 
              className="w-full bg-[#1f2327] border border-gray-700 rounded-lg pl-9 pr-9 py-1.5 text-sm focus:outline-none focus:border-sky-500 text-gray-200 transition-colors" 
            />
            <button 
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-sky-400 transition-colors"
              title="Locate Me"
            >
              <LocateFixed className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-300">
          <div className="relative group cursor-pointer hover:text-white flex items-center gap-1 transition-colors py-4">
            Ranking <ChevronDown className="w-3 h-3 text-gray-500 group-hover:text-white" />
            <RankingMegaMenu />
          </div>
          <div className="relative group cursor-pointer hover:text-white flex items-center gap-1 transition-colors py-4">
            Products <ChevronDown className="w-3 h-3 text-gray-500 group-hover:text-white" />
            <ProductsMegaMenu />
          </div>
          <div className="relative group cursor-pointer hover:text-white flex items-center gap-1 transition-colors py-4">
            Resources <ChevronDown className="w-3 h-3 text-gray-500 group-hover:text-white" />
            <ResourcesMegaMenu />
          </div>
        </div>

        {/* Right Settings & CTA */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
          <LanguageSwitcher />
          
          <button className="text-gray-400 hover:text-yellow-400 p-1 transition-colors">
            <CloudSun className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handleSupabaseLogin}
            className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transform hover:-translate-y-0.5"
          >
            <span>Login</span> <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </nav>
  );
};
