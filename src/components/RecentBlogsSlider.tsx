import React from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const RecentBlogsSlider = () => {
  const blogs = [
    {
      id: 1,
      title: "World Top 10 Hottest Cities Are All in India Again - May 2026",
      date: "4 Jun 2026",
      author: "Gyane Haobijam",
      image: "linear-gradient(135deg, #FF6B6B, #C0392B)",
    },
    {
      id: 2,
      title: "Delhi Implements Advanced AI Smog Towers Across NCR Region",
      date: "28 May 2026",
      author: "Priya Sharma",
      image: "linear-gradient(135deg, #4facfe, #00f2fe)",
    },
    {
      id: 3,
      title: "The Impact of EV Adoption on Urban Particulate Matter",
      date: "15 May 2026",
      author: "Rahul Verma",
      image: "linear-gradient(135deg, #43e97b, #38f9d7)",
    }
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-8 py-16">
      
      {/* Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6 border-b border-gray-800 pb-6">
        <div>
          <h2 className="text-3xl font-black text-white mb-2">Recent AQI Blogs</h2>
          <a href="#" className="text-blue-500 hover:text-blue-400 font-bold text-sm tracking-wide transition-colors">
            Read the latest news →
          </a>
        </div>
        
        <div className="max-w-md">
          <p className="text-gray-500 text-sm md:text-base">
            Here are some latest blogs that you can go through to find out more air pollution.
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="w-10 h-10 rounded-full border border-gray-700 bg-[#1a1d20] flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 transition-colors group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button className="w-10 h-10 rounded-full border border-blue-600 bg-blue-600 flex items-center justify-center text-white hover:bg-blue-500 hover:border-blue-500 transition-colors group shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Cards Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Card key={blog.id} className="bg-transparent border-none shadow-none group cursor-pointer">
            {/* Thumbnail Image Container */}
            <div 
              className="w-full aspect-[4/3] rounded-2xl mb-5 relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]"
              style={{ background: blog.image }}
            >
              {/* Overlay styling to make it look like a photo placeholder */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              
              {/* Shortcut Button Pinned Top Right */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <ArrowUpRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-200 mb-4 line-clamp-2 group-hover:text-blue-400 transition-colors">
              {blog.title}
            </h3>

            {/* Metadata Badges */}
            <div className="flex items-center space-x-3 text-xs font-bold text-gray-500">
              <span className="px-3 py-1 rounded-full border border-gray-800 bg-[#1a1d20]/50 tracking-wide">
                {blog.date}
              </span>
              <span className="px-3 py-1 rounded-full border border-gray-800 bg-[#1a1d20]/50 tracking-wide">
                {blog.author}
              </span>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
};
