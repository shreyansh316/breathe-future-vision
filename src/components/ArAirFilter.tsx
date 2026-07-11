import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Camera, CameraOff, SlidersHorizontal, AlertTriangle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export const ArAirFilter = ({ initialAQI = 50 }: { initialAQI?: number }) => {
  const [isActive, setIsActive] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [simulatedAQI, setSimulatedAQI] = useState(initialAQI);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const requestRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  // Calculate smog parameters based on AQI
  const getSmogConfig = (aqi: number) => {
    // Max values at AQI 500
    const normalized = Math.min(Math.max(aqi, 0), 500) / 500;
    return {
      particleCount: Math.floor(normalized * 300), // Up to 300 particles
      baseOpacity: normalized * 0.8, // Up to 80% opacity for deep smog
      color: `rgba(${120 + normalized * 80}, ${100 + normalized * 50}, ${80 + normalized * 20}, `, // Brownish grey
      speedMultiplier: 0.5 + normalized * 2, // Faster/turbulent at high AQI
      sizeMultiplier: 1 + normalized * 3, // Larger clumps
    };
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setHasPermission(true);
      setIsActive(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setHasPermission(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  };

  // Canvas Drawing Loop
  const renderLoop = () => {
    if (!canvasRef.current || !videoRef.current || !isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Sync canvas size to video size
    if (canvas.width !== videoRef.current.videoWidth && videoRef.current.videoWidth > 0) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
    }

    const { width, height } = canvas;
    if (width === 0 || height === 0) {
      requestRef.current = requestAnimationFrame(renderLoop);
      return;
    }

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const config = getSmogConfig(simulatedAQI);

    // Global ambient smog layer (solid color overlay)
    ctx.fillStyle = `${config.color}${config.baseOpacity * 0.5})`;
    ctx.fillRect(0, 0, width, height);

    // Initialize or adjust particles array length
    let particles = particlesRef.current;
    if (particles.length < config.particleCount) {
      for (let i = particles.length; i < config.particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: (Math.random() * 20 + 5) * config.sizeMultiplier,
          speedX: (Math.random() - 0.5) * config.speedMultiplier,
          speedY: (Math.random() * 0.5 + 0.1) * config.speedMultiplier, // Float downwards
          opacity: Math.random() * config.baseOpacity
        });
      }
    } else if (particles.length > config.particleCount) {
      particles.length = config.particleCount; // Trim excess
    }

    // Draw and update particles
    particles.forEach(p => {
      // Create radial gradient for soft particle edges
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
      gradient.addColorStop(0, `${config.color}${p.opacity})`);
      gradient.addColorStop(1, `${config.color}0)`);
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Update position
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around edges
      if (p.y > height + p.size) p.y = -p.size;
      if (p.x > width + p.size) p.x = -p.size;
      if (p.x < -p.size) p.x = width + p.size;
    });

    requestRef.current = requestAnimationFrame(renderLoop);
  };

  useEffect(() => {
    if (isActive) {
      requestRef.current = requestAnimationFrame(renderLoop);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isActive, simulatedAQI]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopCamera();
  }, []);

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { label: 'Good', color: 'text-green-500' };
    if (aqi <= 100) return { label: 'Satisfactory', color: 'text-yellow-500' };
    if (aqi <= 200) return { label: 'Moderate', color: 'text-orange-500' };
    if (aqi <= 300) return { label: 'Poor', color: 'text-red-500' };
    if (aqi <= 400) return { label: 'Very Poor', color: 'text-purple-500' };
    return { label: 'Severe', color: 'text-rose-700' };
  };

  const status = getAQIStatus(simulatedAQI);

  return (
    <Card className="overflow-hidden border border-slate-200/50 bg-white/50 backdrop-blur-xl shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        
        {/* Controls Panel */}
        <div className="p-8 border-b lg:border-b-0 lg:border-r border-slate-200/50 flex flex-col justify-between bg-gradient-to-br from-slate-50 to-white">
          <div>
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 text-blue-600 rounded-xl mb-6">
              <Eye className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black text-[#263238] tracking-tight mb-4">
              See the Invisible.
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Air pollution is often invisible until it's too late. Use this Augmented Reality simulator to visualize what the current (or projected) AQI actually looks like in your immediate environment.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700 flex items-center"><SlidersHorizontal className="w-4 h-4 mr-2" /> Simulate AQI</span>
                <span className={`font-black text-xl ${status.color}`}>{simulatedAQI}</span>
              </div>
              <Slider 
                value={[simulatedAQI]} 
                onValueChange={(val) => setSimulatedAQI(val[0])} 
                max={500} 
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase">
                <span>Good (0)</span>
                <span>Hazardous (500)</span>
              </div>
            </div>

            {hasPermission === false && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-start space-x-3 mb-6">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium">Camera access denied. Please allow camera permissions in your browser to use the AR feature.</p>
              </div>
            )}
          </div>

          <Button 
            onClick={isActive ? stopCamera : startCamera}
            size="lg"
            variant={isActive ? "destructive" : "default"}
            className={`w-full py-6 text-lg font-bold shadow-xl transition-all ${!isActive ? 'bg-[#00C853] hover:bg-[#00A844] hover:shadow-green-500/25' : ''}`}
          >
            {isActive ? (
              <><CameraOff className="w-5 h-5 mr-2" /> Stop Simulation</>
            ) : (
              <><Camera className="w-5 h-5 mr-2" /> Launch AR Lens</>
            )}
          </Button>
        </div>

        {/* Camera/Canvas Output */}
        <div className="col-span-2 relative bg-black min-h-[400px] lg:min-h-[600px] flex items-center justify-center overflow-hidden">
          {!isActive ? (
            <div className="text-center text-slate-500 flex flex-col items-center p-8">
              <Camera className="w-16 h-16 mb-4 opacity-20" />
              <p className="font-medium text-lg">Camera is inactive.</p>
              <p className="text-sm">Click "Launch AR Lens" to begin.</p>
            </div>
          ) : (
            <>
              {/* Native Video Feed */}
              <video 
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover transform -scale-x-100" // Mirror the video
                autoPlay 
                playsInline
                muted
              />
              {/* Canvas Overlay for Smog */}
              <canvas 
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover transform -scale-x-100 pointer-events-none"
              />
              
              {/* Live Overlay HUD */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none z-10">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl">
                  <div className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">Simulated Threat Level</div>
                  <div className={`text-2xl font-black ${status.color}`}>{status.label}</div>
                </div>
                
                <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-white font-mono text-sm tracking-widest uppercase">REC</span>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </Card>
  );
};
