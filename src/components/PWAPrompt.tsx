import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const PWAPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the prompt to the user
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    
    setDeferredPrompt(null);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[9999] md:w-96 md:left-auto">
      <Card className="p-4 bg-gradient-to-r from-green-500 to-green-600 border-none shadow-2xl text-white">
        <div className="flex justify-between items-start">
          <div className="flex space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold">Install JanAQI App</h4>
              <p className="text-xs text-green-50 mt-1">Get real-time air quality alerts directly on your home screen. Uses minimal data.</p>
            </div>
          </div>
          <button 
            onClick={() => setShowPrompt(false)}
            className="text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-4 flex space-x-2">
          <button 
            onClick={handleInstallClick}
            className="flex-1 bg-white text-green-700 font-bold py-2 rounded-lg text-sm flex justify-center items-center space-x-2 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Add to Home Screen</span>
          </button>
        </div>
      </Card>
    </div>
  );
};
