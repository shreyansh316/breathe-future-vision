import React, { useState } from 'react';
import { GlobalHeader } from '@/components/GlobalHeader';
import { SubNavigation } from '@/components/SubNavigation';
import { WidgetShowcase } from '@/components/WidgetShowcase';
import { ComplianceReportGenerator } from '@/components/ComplianceReportGenerator';
import { MultiFeatureBar } from '@/components/MultiFeatureBar';
import { ProductHeroCarousel } from '@/components/ProductHeroCarousel';
import { RecentBlogsSlider } from '@/components/RecentBlogsSlider';
import { AppFooter } from '@/components/AppFooter';
import { PlatformShowcase } from '@/components/PlatformShowcase';
import { Hero } from '@/components/Hero';
import { AirQualityDashboard } from '@/components/AirQualityDashboard';
import { VayuNetDashboard } from '@/components/VayuNetDashboard';
import { EnhancedDataDashboard } from '@/components/EnhancedDataDashboard';
import { AIForecasting } from '@/components/AIForecasting';
import { FeatureGrid } from '@/components/FeatureGrid';
import { ParticleBackground } from '@/components/ParticleBackground';
import { ExposureDashboard } from '@/components/ExposureDashboard';
import { VillageQRScanner } from '@/components/VillageQRScanner';
import { AyurAQIDashboard } from '@/components/AyurAQIDashboard';
import { AgroCleanDashboard } from '@/components/AgroCleanDashboard';
import { ArAirFilter } from '@/components/ArAirFilter';
import { CarbonCreditsDashboard } from '@/components/CarbonCreditsDashboard';
import { CleanAirPanchayats } from '@/components/CleanAirPanchayats';
import { KisanEMitraDashboard } from '@/components/KisanEMitraDashboard';
import { VayuGuardAlerts } from '@/components/VayuGuardAlerts';
import { VayuGuardRuleEngine } from '@/components/VayuGuardRuleEngine';
import { AuthorityDispatcher } from '@/components/AuthorityDispatcher';
import { SystemObservability } from '@/components/SystemObservability';
import { CommandPalette } from '@/components/CommandPalette';
import { Earth3D } from '@/components/Earth3D';
import { UniqueTools } from '@/components/UniqueTools';
import { VayuRakshak2030 } from '@/components/VayuRakshak2030';
import { TechArchitecture } from '@/components/TechArchitecture';
import { CityComparison } from '@/components/CityComparison';
import { CitySelector } from '@/components/CitySelector';
import { usePollutionData } from '@/hooks/usePollutionData';
import { useFireData } from '@/hooks/useFireData';
import { useVayuGuard } from '@/hooks/useVayuGuard';
import { Card } from '@/components/ui/card';
import { PwaInstallPrompt } from '@/components/PwaInstallPrompt';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const Index = () => {
  const { cities } = usePollutionData();
  const majorCities = cities.filter(c => !c.isRuralNode);
  const [selectedCityName, setSelectedCityName] = useState(majorCities[0]?.name || 'Delhi');
  
  const selectedCity = majorCities.find(city => city.name === selectedCityName) || majorCities[0];

  const { fires } = useFireData();
  const { alertHistory, clearHistory, addAlert } = useVayuGuard(selectedCity.actualAqi || selectedCity.pm25, selectedCity.name, fires.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121416] via-[#1a1d20] to-[#25282c] relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10">
        <GlobalHeader />
        <SubNavigation />
        
        <Hero />
        <MultiFeatureBar />
        
        {/* High-Fidelity UI Presentation Dashboard */}
        <section className="py-12 px-4 relative z-20 -mt-16">
          <ErrorBoundary fallbackMessage="The Air Quality Dashboard failed to load. Please check your data connection.">
            <AirQualityDashboard />
          </ErrorBoundary>
        </section>

        {/* Dynamic Platform Showcase Tabs */}
        <section className="bg-gradient-to-b from-transparent to-[#121416]/50">
          <PlatformShowcase />
        </section>
        
        {/* Enhanced 3D Earth Section */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <ErrorBoundary fallbackMessage="3D WebGL Context Failed.">
              <Earth3D />
            </ErrorBoundary>
          </div>
        </section>
        
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ExposureDashboard />
            <VillageQRScanner />
          </div>
        </section>

        {/* AR Pollution Simulator Section */}
        <section className="py-12 px-4 relative z-20">
          <div className="max-w-7xl mx-auto">
            <ArAirFilter initialAQI={selectedCity.pm25 || 150} />
          </div>
        </section>

        {/* AyurAQI Wellness Section */}
        <section className="py-12 px-4 bg-[#F1F8E9]">
          <div className="max-w-7xl mx-auto">
            <AyurAQIDashboard currentAQI={selectedCity.actualAqi || selectedCity.pm25} />
          </div>
        </section>

        {/* AgroClean Module Section */}
        <section className="py-12 px-4 bg-[#FFFDE7]">
          <div className="max-w-7xl mx-auto">
            <AgroCleanDashboard />
            <KisanEMitraDashboard />
            <CleanAirPanchayats />
          </div>
        </section>
        
        {/* Carbon Credits Gamification Section */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <CarbonCreditsDashboard />
          </div>
        </section>

        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <ErrorBoundary fallbackMessage="VayuNet GIS Dashboard crashed. Recovering map state...">
              <VayuNetDashboard />
            </ErrorBoundary>
          </div>
        </section>
        
        {/* City Comparison Section */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <Card className="p-6 bg-background/95 backdrop-blur border-border/50 mb-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Select a city to compare:
                </h3>
                <CitySelector 
                  cities={majorCities} 
                  onCityChange={setSelectedCityName}
                  selectedCity={selectedCityName}
                />
                <p className="text-sm text-gray-500 mt-2 italic">
                  Showing {majorCities.length} of {cities.length} cities. Click map or search for more.
                </p>
              </div>
            </Card>
            <ErrorBoundary fallbackMessage="Comparison matrix failed to process.">
              <CityComparison selectedCity={selectedCity} allCities={majorCities} />
            </ErrorBoundary>
          </div>
        </section>
        
        {/* VayuRakshak 2030 Vision Section */}
        <VayuRakshak2030 />
        
        <EnhancedDataDashboard />
        
        {/* Technical Architecture */}
        <TechArchitecture />
        
        {/* Enterprise Compliance Report Generator */}
        <section className="py-12 px-4 bg-[#121416]">
          <div className="max-w-6xl mx-auto">
            <VayuGuardRuleEngine />
            <AuthorityDispatcher />
            <ComplianceReportGenerator />
            <SystemObservability />
          </div>
        </section>

        <AIForecasting />
        <UniqueTools />
        <FeatureGrid />
        
        <section className="bg-[#121416]">
          <ProductHeroCarousel />
          <RecentBlogsSlider />
        </section>
      </div>

      <CommandPalette />
      <PwaInstallPrompt />
      <VayuGuardAlerts 
        alertHistory={alertHistory} 
        onClear={clearHistory} 
        onTestAlarm={() => addAlert({
          type: 'CRITICAL_AQI',
          title: 'TEST EMERGENCY ALARM',
          message: 'This is a simulated Critical AQI emergency alert. GRAP Stage 4 protocols testing.',
          location: selectedCity.name
        })}
      />
      <AppFooter />
    </div>
  );
};

export default Index;
