import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowUpRight } from 'lucide-react';

export const RankingMegaMenu = () => {
  const menuItems = [
    {
      id: 'live-aqi',
      badge: 'Live',
      badgeColor: 'bg-rose-500 text-white',
      title: 'AQI Ranking',
      description: 'Check real-time global AQI rankings to compare your location with other cities worldwide.',
      image: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600")',
      link: '#'
    },
    {
      id: 'live-weather',
      badge: 'Live',
      badgeColor: 'bg-rose-500 text-white',
      title: 'Weather Ranking',
      description: 'Get real-time weather rankings of the hottest and coldest cities worldwide to know conditions.',
      image: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1561553590-267fc716698a?auto=format&fit=crop&q=80&w=600")',
      link: '#'
    },
    {
      id: 'historic-city',
      badge: '2025 City',
      badgeColor: 'bg-indigo-500 text-white',
      title: 'Historic AQI Ranking',
      description: 'Stay informed of historical AQI rankings for cities worldwide to track air quality trends over time.',
      image: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.9)), url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600")',
      link: '#'
    },
    {
      id: 'historic-country',
      badge: '2025 Country',
      badgeColor: 'bg-indigo-500 text-white',
      title: 'Historic AQI Ranking',
      description: 'Know about most polluted countries worldwide to learn their air quality challenges.',
      image: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600")',
      link: '#'
    }
  ];

  return (
    <div className="absolute top-full left-0 mt-2 w-[1200px] -translate-x-1/4 bg-[#1e2329] border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform origin-top group-hover:scale-100 scale-95">
      <div className="grid grid-cols-4 gap-6">
        {menuItems.map((item) => (
          <a key={item.id} href={item.link} className="block group/card">
            <Card 
              className="h-[400px] border-none overflow-hidden relative transition-transform duration-300 group-hover/card:-translate-y-1"
              style={{ backgroundImage: item.image, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 group-hover/card:bg-black/40 transition-colors duration-300"></div>
              
              <div className="absolute inset-0 p-6 flex flex-col items-center text-center">
                <span className={`px-3 py-1 rounded text-sm font-bold shadow-lg mb-4 ${item.badgeColor}`}>
                  {item.badge === 'Live' && <span className="inline-block w-2 h-2 rounded-full bg-white mr-2 animate-pulse"></span>}
                  {item.badge}
                </span>
                
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed max-w-[200px]">
                  {item.description}
                </p>

                {/* Hover overlay icon */}
                <div className="mt-auto opacity-0 transform translate-y-4 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
};
