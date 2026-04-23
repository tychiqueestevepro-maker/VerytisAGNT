"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function KineticFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let w = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    let h = canvas.height = canvas.offsetHeight * window.devicePixelRatio;

    const particles: Particle[] = [];
    const particleCount = 40;
    const coreX = w * 0.5;
    const coreWidth = w * 0.15;
    const coreHeight = h * 0.4;

    class Particle {
      x: number;
      y: number;
      size: number;
      speed: number;
      color: string;
      shape: 'circle' | 'square' | 'triangle';
      opacity: number;
      progress: number; // 0 to 1

      constructor() {
        this.reset();
        // Distribute initially
        this.x = Math.random() * w;
      }

      reset() {
        this.x = -20;
        this.y = (h * 0.5) + (Math.random() - 0.5) * (h * 0.3);
        this.size = 2 + Math.random() * 4;
        this.speed = 1 + Math.random() * 2;
        this.opacity = 0;
        this.progress = 0;
        const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
        this.shape = shapes[Math.floor(Math.random() * shapes.length)];
        this.color = `rgba(255, 255, 255, ${0.1 + Math.random() * 0.2})`;
      }

      update() {
        // Progress through the pipeline
        if (this.x < coreX - coreWidth) {
          // Input Phase
          this.x += this.speed;
          this.y += Math.sin(this.x * 0.05) * 0.5; // Slight wave
          this.opacity = Math.min(this.opacity + 0.02, 0.4);
        } else if (this.x < coreX + coreWidth) {
          // Processing Phase
          this.x += this.speed * 0.5; // Slow down in core
          // Move towards center line
          this.y += (h * 0.5 - this.y) * 0.05;
          this.size += (3 - this.size) * 0.05;
          this.color = 'rgba(167, 139, 250, 0.8)'; // Violet
        } else {
          // Output Phase
          this.x += this.speed * 3; // Accelerate
          this.y = h * 0.5; // Perfectly straight
          this.shape = 'circle';
          this.color = 'rgba(255, 255, 255, 0.9)';
          this.opacity -= 0.01;
        }

        if (this.x > w + 20 || this.opacity <= 0) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.x > coreX - coreWidth ? 15 : 0;
        ctx.shadowColor = this.color;

        ctx.beginPath();
        if (this.shape === 'circle') {
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        } else if (this.shape === 'square') {
          ctx.rect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
        } else {
          ctx.moveTo(this.x, this.y - this.size);
          ctx.lineTo(this.x + this.size, this.y + this.size);
          ctx.lineTo(this.x - this.size, this.y + this.size);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw Core Background (Glassmorphism effect)
      const grad = ctx.createRadialGradient(coreX, h * 0.5, 0, coreX, h * 0.5, coreWidth);
      grad.addColorStop(0, 'rgba(139, 92, 246, 0.15)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(coreX - coreWidth * 2, 0, coreWidth * 4, h);

      // Draw Core Ring
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(coreX, h * 0.5, coreWidth, coreHeight, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Draw Connection Lines (Subtle)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      ctx.moveTo(0, h * 0.5);
      ctx.lineTo(w, h * 0.5);
      ctx.stroke();

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      w = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[400px]">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))' }}
      />
      
      {/* Overlay Core Lueur */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-64 bg-violet-500/20 blur-[60px] pointer-events-none rounded-full"
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-violet-400 to-transparent opacity-50"
      />
    </div>
  );
}
