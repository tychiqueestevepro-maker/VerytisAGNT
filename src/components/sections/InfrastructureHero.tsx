"use client";

import React, { useEffect, useRef } from "react";

export default function InfrastructureHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let w: number, h: number;
    let time = 0;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener("resize", resize);
    resize();

    const displayW = canvas.offsetWidth;
    const displayH = canvas.offsetHeight;

    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, displayW, displayH);
      
      const centerX = displayW / 2;
      const centerY = displayH / 2;

      // Draw Connection Lines (Grid background)
      ctx.strokeStyle = "rgba(167, 139, 250, 0.05)";
      ctx.lineWidth = 1;
      for (let i = 0; i < displayW; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i, displayH);
        ctx.stroke();
      }
      for (let i = 0; i < displayH; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i); ctx.lineTo(displayW, i);
        ctx.stroke();
      }

      // Draw Main Hub (Verytis Core)
      const hubPulse = 50 + Math.sin(time * 2) * 5;
      const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, hubPulse * 1.5);
      grad.addColorStop(0, "rgba(167, 139, 250, 0.2)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, hubPulse * 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(167, 139, 250, 0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
      ctx.stroke();

      // Satellite Nodes (Representing External Apps)
      const satellites = 8;
      for (let i = 0; i < satellites; i++) {
        const angle = (i / satellites) * Math.PI * 2 + time * 0.2;
        const x = centerX + Math.cos(angle) * 150;
        const y = centerY + Math.sin(angle) * 150;

        // Connection line
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "rgba(167, 139, 250, 0.1)";
        ctx.stroke();

        // Node
        ctx.fillStyle = "rgba(167, 139, 250, 0.8)";
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Data packet moving along connection
        const pProgress = (time * 0.5 + i / satellites) % 1;
        const px = centerX + (x - centerX) * pProgress;
        const py = centerY + (y - centerY) * pProgress;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Verytis Logo (Simplified V)
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(centerX - 10, centerY - 10);
      ctx.lineTo(centerX, centerY + 10);
      ctx.lineTo(centerX + 10, centerY - 10);
      ctx.stroke();

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
