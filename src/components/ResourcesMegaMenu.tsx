import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowUpRight, Mail, MapPin, Briefcase, HelpCircle, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ResourcesMegaMenu = () => {
  return (
    <div className="absolute top-full right-0 mt-2 w-[1200px] bg-[#1e2329] border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform origin-top group-hover:scale-100 scale-95 cursor-default text-left">
      <div className="flex gap-8">
        
        {/* Left Column: Blogs */}
        <div className="w-1/2 flex flex-col">
          <h3 className="text-2xl font-bold text-white mb-6">Blogs</h3>
          
          <div className="flex gap-4 mb-4 h-[300px]">
            {/* Big Blog */}
            <Link to="/blog/world-top-10-hottest-cities-india-2026" className="w-1/2 block group/card h-full">
              <Card className="h-full border border-slate-700/50 overflow-hidden relative transition-transform duration-300 group-hover/card:-translate-y-1 rounded-xl">
                <img src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h4 className="text-sm font-bold text-white group-hover/card:text-sky-400 transition-colors leading-tight">
                    World Top 10 Hottest Cities Are All in India Again - May 2026
                  </h4>
                </div>
              </Card>
            </Link>

            {/* Two Small Blogs */}
            <div className="w-1/2 flex flex-col gap-4 h-full">
              <Link to="/blog/delhi-implements-ai-smog-towers" className="h-[142px] block group/card">
                <Card className="h-full border border-slate-700/50 overflow-hidden relative transition-transform duration-300 group-hover/card:-translate-y-1 rounded-xl">
                  <img src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h4 className="text-xs font-bold text-white group-hover/card:text-sky-400 transition-colors leading-tight">
                      Delhi Air Quality 2026 vs 6-Year Historical PM2.5 Data
                    </h4>
                  </div>
                </Card>
              </Link>
              <Link to="/blog/impact-ev-adoption-particulate-matter" className="h-[142px] block group/card">
                <Card className="h-full border border-slate-700/50 overflow-hidden relative transition-transform duration-300 group-hover/card:-translate-y-1 rounded-xl">
                  <img src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h4 className="text-xs font-bold text-white group-hover/card:text-sky-400 transition-colors leading-tight">
                      What 17 Years of Delhi Temperature Data Reveal About May's Heatwave Escalation
                    </h4>
                  </div>
                </Card>
              </Link>
            </div>
          </div>
          
          <a href="#" className="text-sm font-semibold text-gray-300 hover:text-white flex items-center justify-between border-t border-slate-700/50 pt-4 transition-colors">
            See all Blogs <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Middle Column: About Us & FAQs */}
        <div className="w-1/4 flex flex-col pt-14 gap-4">
          <a href="#" className="block group/card h-[250px]">
            <Card className="h-full border border-slate-700/50 overflow-hidden relative transition-transform duration-300 group-hover/card:-translate-y-1 rounded-xl">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 p-4 flex justify-between items-end">
                <h4 className="text-sm font-bold text-white group-hover/card:text-sky-400 transition-colors">About Us</h4>
                <ArrowUpRight className="w-4 h-4 text-white opacity-0 group-hover/card:opacity-100 transition-opacity" />
              </div>
            </Card>
          </a>
          
          <a href="#" className="flex-1 block group/card">
            <Card className="h-full border border-slate-700/50 bg-[#121416] hover:bg-[#1a1d20] transition-colors rounded-xl flex items-center p-4">
              <HelpCircle className="w-5 h-5 text-gray-400 mr-3" />
              <span className="text-sm font-bold text-white group-hover/card:text-sky-400 transition-colors">FAQs</span>
              <ArrowUpRight className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover/card:opacity-100 transition-opacity" />
            </Card>
          </a>
        </div>

        {/* Right Column: Contact & Quick Links */}
        <div className="w-1/4 flex flex-col pt-14 gap-4">
          <Card className="flex-1 border border-slate-700/50 bg-transparent rounded-xl p-5 flex flex-col relative overflow-hidden group/contact">
            <div className="space-y-4 mb-6">
              <div className="flex items-start text-sm text-gray-300">
                <Mail className="w-4 h-4 mr-3 mt-0.5 text-gray-400" />
                <span>info@aqi.in</span>
              </div>
              <div className="flex items-start text-sm text-gray-300">
                <MapPin className="w-4 h-4 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                <span className="leading-tight">Crown Heights, 7th Floor, 706, Sector - 10, Rohini, New Delhi 110085, India</span>
              </div>
            </div>
            <a href="#" className="mt-auto flex justify-between items-center text-sm font-bold text-white border-t border-slate-700/50 pt-4 group-hover/contact:text-sky-400 transition-colors">
              Contact <ArrowUpRight className="w-4 h-4" />
            </a>
          </Card>

          <a href="#" className="block group/card">
            <Card className="border border-slate-700/50 bg-[#121416] hover:bg-[#1a1d20] transition-colors rounded-xl flex items-center p-4">
              <Briefcase className="w-5 h-5 text-gray-400 mr-3" />
              <span className="text-sm font-bold text-white group-hover/card:text-sky-400 transition-colors">Career</span>
              <ArrowUpRight className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover/card:opacity-100 transition-opacity" />
            </Card>
          </a>

          <a href="#" className="block group/card">
            <Card className="border border-slate-700/50 bg-[#121416] hover:bg-[#1a1d20] transition-colors rounded-xl flex items-center p-4">
              <User className="w-5 h-5 text-gray-400 mr-3" />
              <span className="text-sm font-bold text-white group-hover/card:text-sky-400 transition-colors">Support Desk</span>
              <ArrowUpRight className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover/card:opacity-100 transition-opacity" />
            </Card>
          </a>
        </div>

      </div>
    </div>
  );
};
