import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, X } from 'lucide-react';

export const PwaInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-96 bg-[#0B0F19] border border-sky-500/50 shadow-2xl shadow-sky-500/10 rounded-2xl p-4 z-50 flex items-start space-x-4 animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="bg-sky-500/20 p-3 rounded-full flex-shrink-0">
        <Download className="w-6 h-6 text-sky-400" />
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-slate-100 mb-1">{t('pwa.install_title')}</h3>
        <p className="text-xs text-slate-400 mb-4">{t('pwa.install_desc')}</p>
        <div className="flex space-x-3">
          <button 
            onClick={handleInstallClick}
            className="flex-1 bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
          >
            {t('pwa.install_btn')}
          </button>
          <button 
            onClick={() => setShowPrompt(false)}
            className="px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-colors"
          >
            {t('pwa.dismiss')}
          </button>
        </div>
      </div>
      <button onClick={() => setShowPrompt(false)} className="absolute top-2 right-2 text-slate-500 hover:text-slate-300">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
