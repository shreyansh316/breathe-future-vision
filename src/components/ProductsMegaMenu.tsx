import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowUpRight } from 'lucide-react';

export const ProductsMegaMenu = () => {
  const products = [
    {
      title: 'Mobile App',
      description: 'AQI Air Quality App to see what you are breathing.',
      image: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent), url("https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=600")',
      link: '/download?store=ios'
    },
    {
      title: 'Web Dashboard',
      description: 'Check real-time air quality condition of any area.',
      image: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent), url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600")',
      link: '#'
    },
    {
      title: 'TV App',
      description: 'Monitor air quality status on big screen with TV app connectivity.',
      image: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent), url("https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=600")',
      link: '#'
    },
    {
      title: 'API',
      description: '',
      image: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent), url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600")',
      link: '/api-contact'
    },
    {
      title: 'Widgets',
      description: '',
      image: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent), url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600")',
      link: '/widgets'
    },
    {
      title: 'Get an AQI Monitor',
      description: 'Join the AQI.IN community and help build a worldwide air quality monitoring network.',
      image: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent), url("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600")',
      link: '#'
    }
  ];

  return (
    <div className="absolute top-full left-1/2 mt-2 w-[1100px] -translate-x-1/2 bg-[#1e2329] border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform origin-top group-hover:scale-100 scale-95 cursor-default">
      <div className="flex gap-6">
        
        {/* Left Side: Map */}
        <div className="w-1/3 flex flex-col">
          <h3 className="text-sky-400 font-semibold mb-4 text-left">Air quality map</h3>
          <a href="#" className="flex-1 group/card block">
            <Card 
              className="h-full min-h-[300px] border border-slate-700/50 overflow-hidden relative transition-transform duration-300 group-hover/card:-translate-y-1 rounded-xl"
              style={{ 
                backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600")', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              
              <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-white group-hover/card:text-sky-400 transition-colors">Air Quality Map</h4>
                  <ArrowUpRight className="w-5 h-5 text-white opacity-0 group-hover/card:opacity-100 transition-opacity" />
                </div>
                <p className="text-gray-300 text-xs mt-2">
                  Interactive air quality maps to easily check the air quality in your area.
                </p>
              </div>
            </Card>
          </a>
        </div>

        {/* Right Side: Products Grid */}
        <div className="w-2/3 flex flex-col">
          <h3 className="text-sky-400 font-semibold mb-4 text-left">Air quality products</h3>
          <div className="grid grid-cols-3 gap-4">
            {products.map((prod) => (
              <a key={prod.title} href={prod.link} className="block group/card">
                <Card 
                  className="h-[140px] border border-slate-700/50 overflow-hidden relative transition-transform duration-300 group-hover/card:-translate-y-1 rounded-xl"
                  style={{ backgroundImage: prod.image, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white group-hover/card:text-sky-400 transition-colors">{prod.title}</h4>
                      <ArrowUpRight className="w-4 h-4 text-white opacity-0 group-hover/card:opacity-100 transition-opacity" />
                    </div>
                    {prod.description && (
                      <p className="text-gray-300 text-[10px] mt-1 leading-tight line-clamp-2">
                        {prod.description}
                      </p>
                    )}
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
