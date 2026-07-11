import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { QrCode, Printer, MapPin, Download, CheckCircle2 } from 'lucide-react';
import html2canvas from 'html2canvas';

export const VillageQRScanner = () => {
  const [villageCode, setVillageCode] = useState('PUN-104-VIL');
  const [villageName, setVillageName] = useState('Rupnagar Panchayat');
  const [language, setLanguage] = useState('en');
  const [isDownloading, setIsDownloading] = useState(false);
  const stickerRef = useRef<HTMLDivElement>(null);
  
  // Construct the deep link that the QR code will point to
  // Point 86: Minify Dynamic QR Payload Data (Use short hashed UID)
  // Encode the village code into a highly compressed base64-url-safe tracking ID
  const trackingUid = btoa(villageCode).replace(/=/g, '').substring(0, 8);
  const qrData = `${window.location.origin}/lite/${trackingUid}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}&color=000000`;

  const getLanguageInstruction = () => {
    switch(language) {
      case 'hi': return 'स्कैन करें - लाइव वायु गुणवत्ता';
      case 'pa': return 'ਸਕੈਨ ਕਰੋ - ਲਾਈਵ ਹਵਾ ਦੀ ਗੁਣਵੱਤਾ';
      default: return 'SCAN FOR LIVE AIR QUALITY';
    }
  };

  const handleDownload = async () => {
    if (!stickerRef.current) return;
    
    try {
      setIsDownloading(true);
      const canvas = await html2canvas(stickerRef.current, {
        scale: 3, // High resolution for printing
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = `VayuRakshak_Sticker_${villageCode}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error generating sticker", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card className="p-6 bg-white border border-gray-200 shadow-lg">
      <div className="flex items-center space-x-2 mb-4 text-green-700">
        <QrCode className="w-6 h-6" />
        <h3 className="font-bold text-lg">Panchayat Board Generator</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-6">
        Generate and download high-resolution, low-bandwidth (2G) landing page QR stickers to print and mount on village Panchayat boards.
      </p>
      
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 space-y-4 w-full">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Village Name</label>
            <input 
              type="text" 
              value={villageName}
              onChange={(e) => setVillageName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm font-medium"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Village UID</label>
              <input 
                type="text" 
                value={villageCode}
                onChange={(e) => setVillageCode(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm font-mono text-gray-700"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Sticker Language</label>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm font-medium bg-white"
              >
                <option value="en">English (Default)</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
              </select>
            </div>
          </div>
          
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center justify-center space-x-2 w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white p-3 rounded-lg transition-colors text-sm font-bold shadow-md mt-4"
          >
            {isDownloading ? (
              <span className="flex items-center space-x-2">
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                <span>Generating HD Sticker...</span>
              </span>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Printable Sticker (PNG)</span>
              </>
            )}
          </button>

          <div className="flex items-start space-x-2 text-xs text-green-700 bg-green-50 p-3 rounded-lg border border-green-200">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p><strong>Ready for Production:</strong> The downloaded sticker is high-resolution (300 DPI equivalent) and formatted for standard A6 or A5 label printers.</p>
          </div>
        </div>
        
        {/* Visual Sticker Preview Area */}
        <div className="flex-1 flex flex-col items-center justify-center w-full bg-gray-50 p-6 rounded-xl border-2 border-dashed border-gray-300">
          
          {/* The actual printable sticker card */}
          <div 
            ref={stickerRef}
            className="bg-white rounded-lg shadow-sm border-2 border-gray-800 overflow-hidden w-full max-w-[320px] flex flex-col items-center relative"
          >
            {/* Top Saffron/Green Gov Bar */}
            <div className="w-full h-2 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>
            
            {/* Header */}
            <div className="w-full bg-gray-50 py-3 px-4 border-b border-gray-200 flex flex-col items-center">
              <div className="text-[10px] font-black text-gray-500 tracking-[0.2em] uppercase mb-1">Government Initiative</div>
              <div className="text-sm font-black text-green-700 uppercase tracking-widest">VayuRakshak Node</div>
            </div>

            {/* QR Area */}
            <div className="p-6 pb-2 flex flex-col items-center bg-white">
              <div className="p-1 border-4 border-gray-900 rounded-xl mb-4 bg-white relative">
                {/* Scanner targeting corners */}
                <div className="absolute -top-2 -left-2 w-4 h-4 border-t-4 border-l-4 border-green-600"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 border-t-4 border-r-4 border-green-600"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-4 border-l-4 border-green-600"></div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-4 border-r-4 border-green-600"></div>
                
                <img 
                  src={qrImageUrl} 
                  crossOrigin="anonymous"
                  alt="Village QR Code" 
                  className="w-40 h-40 object-contain"
                />
              </div>
              <div className="text-center">
                <h2 className="text-lg font-black text-gray-900 mb-1 leading-tight">{getLanguageInstruction()}</h2>
              </div>
            </div>

            {/* Footer Location Details */}
            <div className="w-full bg-gray-900 p-3 mt-4 flex flex-col items-center justify-center text-center">
              <div className="font-bold text-white text-base flex items-center justify-center">
                <MapPin className="w-4 h-4 text-red-500 mr-1.5" />
                {villageName}
              </div>
              <div className="text-[11px] text-gray-400 font-mono mt-1 font-bold tracking-widest">ID: {villageCode}</div>
            </div>
          </div>
          
          <div className="mt-4 text-[11px] text-center text-gray-400 uppercase tracking-wider font-bold">
            Sticker Print Preview
          </div>
        </div>
      </div>
    </Card>
  );
};
