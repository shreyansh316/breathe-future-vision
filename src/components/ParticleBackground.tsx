import React, { useEffect, useRef } from 'react';

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: AtmosphericParticle[] = [];
    const particleCount = 60; // Kept balanced for continuous 60 FPS performance
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class AtmosphericParticle {
      x!: number;
      y!: number;
      radius!: number;
      speedX!: number;
      speedY!: number;
      alpha!: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height + canvas.height; // Always starts below or distributed
        this.radius = Math.random() * 2.5 + 0.5; // Varies sizes to simulate PM2.5 vs PM10
        this.speedX = Math.random() * 0.4 - 0.2; // Gentle side-to-side drift
        this.speedY = -(Math.random() * 0.6 + 0.2); // Upward air current motion
        this.alpha = Math.random() * 0.4 + 0.1; // Faded transparency to stay non-distracting
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Recycles particle loop smoothly once it floats off the top screen bounds
        if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
          this.reset();
          this.y = canvas.height + 10;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Emits a soft mist color to mimic airborne vectors cleanly
        ctx.fillStyle = `rgba(148, 163, 184, ${this.alpha})`;
        ctx.fill();
      }
    }

    // Instantiate particle array structures
    for (let i = 0; i < particleCount; i++) {
      const p = new AtmosphericParticle();
      // Pre-populate positions randomly over viewport space so it doesn't wait to load
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }

    const animate = () => {
      // Clears canvas frame updates cleanly
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="pollution-canvas-bg"
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        background: 'var(--bg-main, #0B0F19)',
        pointerEvents: 'none'
      }}
    />
  );
};
