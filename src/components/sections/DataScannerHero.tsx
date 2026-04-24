"use client";

import React, { useEffect, useRef } from "react";

export default function DataScannerHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let w: number, h: number;
    let scanPos = 0;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener("resize", resize);
    resize();

    const displayW = canvas.offsetWidth;
    const displayH = canvas.offsetHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      isStructured: boolean;
    }

    const particles: Particle[] = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * displayW,
      y: Math.random() * displayH,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      isStructured: false
    }));

    const draw = () => {
      ctx.clearRect(0, 0, displayW, displayH);
      
      scanPos = (scanPos + 2) % displayW;

      // Draw Background Grid
      ctx.strokeStyle = "rgba(167, 139, 250, 0.05)";
      ctx.lineWidth = 1;
      for (let i = 0; i < displayW; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i, displayH);
        ctx.stroke();
      }
      for (let i = 0; i < displayH; i += 30) {
        ctx.beginPath();
        ctx.moveTo(0, i); ctx.lineTo(displayW, i);
        ctx.stroke();
      }

      // Scanner Line
      const scanGrad = ctx.createLinearGradient(scanPos - 50, 0, scanPos, 0);
      scanGrad.addColorStop(0, "transparent");
      scanGrad.addColorStop(1, "rgba(167, 139, 250, 0.8)");
      
      ctx.fillStyle = scanGrad;
      ctx.fillRect(scanPos - 2, 0, 2, displayH);
      
      // Scanner Glow
      const glowGrad = ctx.createLinearGradient(scanPos - 100, 0, scanPos, 0);
      glowGrad.addColorStop(0, "transparent");
      glowGrad.addColorStop(1, "rgba(167, 139, 250, 0.1)");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(scanPos - 100, 0, 100, displayH);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = displayW;
        if (p.x > displayW) p.x = 0;
        if (p.y < 0) p.y = displayH;
        if (p.y > displayH) p.y = 0;

        // Effect based on scanner position
        const isPastScanner = p.x < scanPos;
        
        if (isPastScanner) {
            // Structured look
            const gridX = Math.round(p.x / 30) * 30;
            const gridY = Math.round(p.y / 30) * 30;
            
            p.x += (gridX - p.x) * 0.1;
            p.y += (gridY - p.y) * 0.1;
            
            ctx.fillStyle = "rgba(167, 139, 250, 0.8)";
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw small connection lines for structured data
            ctx.strokeStyle = "rgba(167, 139, 250, 0.1)";
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + 30, p.y);
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x, p.y + 30);
            ctx.stroke();
        } else {
            // Chaotic look
            ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
            ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', maxWidth: '600px' }}
        className="aspect-square opacity-80"
      />
    </div>
  );
}
