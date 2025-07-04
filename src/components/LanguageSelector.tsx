
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageSelector = () => {
  const { currentLanguage, setLanguage, languages } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-white/90 backdrop-blur-sm border-[#00C853]/30 hover:bg-white/95 hover:border-[#00C853]/50 transition-all duration-200 shadow-lg"
        >
          <Globe className="w-4 h-4 mr-2 text-[#00C853]" />
          <span className="mr-1">{currentLanguage.flag}</span>
          <span className="font-medium text-[#263238]">{currentLanguage.nativeName}</span>
          <ChevronDown className="w-4 h-4 ml-2 text-[#263238]/70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-white/95 backdrop-blur-lg border-[#00C853]/20 shadow-2xl">
        <div className="p-2">
          <div className="text-xs font-semibold text-[#263238]/70 mb-2 px-2">
            Select Language / भाषा चुनें
          </div>
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => setLanguage(language)}
              className={`cursor-pointer p-3 rounded-lg transition-all duration-200 ${
                currentLanguage.code === language.code
                  ? 'bg-[#00C853]/10 border border-[#00C853]/30'
                  : 'hover:bg-[#00C853]/5'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{language.flag}</span>
                  <div>
                    <div className="font-medium text-[#263238]">{language.nativeName}</div>
                    <div className="text-xs text-[#263238]/60">{language.name}</div>
                  </div>
                </div>
                {currentLanguage.code === language.code && (
                  <Badge className="bg-[#00C853] text-white text-xs">
                    Active
                  </Badge>
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
