import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2, Smartphone } from 'lucide-react';
import { GlobalHeader } from '@/components/GlobalHeader';
import { AppFooter } from '@/components/AppFooter';

const AppStoreRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const store = searchParams.get('store');

  useEffect(() => {
    // Simulate a brief redirect delay
    const timer = setTimeout(() => {
      if (store === 'ios') {
        window.location.href = 'https://www.apple.com/app-store/';
      } else if (store === 'android') {
        window.location.href = 'https://play.google.com/store';
      } else {
        navigate('/');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [store, navigate]);

  return (
    <div className="min-h-screen bg-[#121416] text-white flex flex-col">
      <GlobalHeader />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-[#1a1d20] border border-gray-800 rounded-3xl p-12 text-center max-w-md shadow-2xl">
          <Smartphone className="w-16 h-16 text-blue-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-2xl font-bold mb-4">
            Redirecting to {store === 'ios' ? 'App Store' : 'Google Play'}...
          </h1>
          <p className="text-gray-400 mb-8">
            Please wait while we transfer you to the official download page to get the VayuRakshak mobile app.
          </p>
          <Loader2 className="w-8 h-8 text-blue-500 mx-auto animate-spin" />
        </div>
      </main>
      <AppFooter />
    </div>
  );
};

export default AppStoreRedirect;
