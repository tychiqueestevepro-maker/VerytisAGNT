"use client";

import React, { useEffect, useRef } from "react";

export default function MultiAgentHero() {
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

    interface Particle {
        x: number;
        y: number;
        targetId: number;
        progress: number;
        speed: number;
        size: number;
    }

    interface Agent {
        id: number;
        angle: number;
        distance: number;
        orbitSpeed: number;
        size: number;
        pulse: number;
        x: number;
        y: number;
    }

    const agents: Agent[] = Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        angle: (i / 6) * Math.PI * 2,
        distance: 140 + Math.random() * 40,
        orbitSpeed: 0.002 + Math.random() * 0.002,
        size: 8 + Math.random() * 4,
        pulse: Math.random() * Math.PI,
        x: 0,
        y: 0
    }));

    const dataPackets: Particle[] = [];

    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, displayW, displayH);
      
      const centerX = displayW / 2;
      const centerY = displayH / 2;

      // Update agents first to get their latest coordinates
      agents.forEach((agent) => {
        agent.angle += agent.orbitSpeed;
        agent.x = centerX + Math.cos(agent.angle) * agent.distance;
        agent.y = centerY + Math.sin(agent.angle) * agent.distance;
        agent.pulse += 0.05;
      });

      // --- 1. Background Grid/Ambience ---
      ctx.strokeStyle = "rgba(167, 139, 250, 0.03)";
      ctx.lineWidth = 1;
      for(let i = 0; i < displayW; i += 40) {
          ctx.beginPath();
          ctx.moveTo(i, 0); ctx.lineTo(i, displayH);
          ctx.stroke();
      }
      for(let i = 0; i < displayH; i += 40) {
          ctx.beginPath();
          ctx.moveTo(0, i); ctx.lineTo(displayW, i);
          ctx.stroke();
      }

      // --- 2. Central Supervisor Node (The Brain) ---
      // Outer Rotating Ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, 50, time, time + Math.PI * 1.5);
      ctx.strokeStyle = "rgba(167, 139, 250, 0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Middle Counter-Rotating Ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40, -time * 1.5, -time * 1.5 + Math.PI * 1.2);
      ctx.strokeStyle = "rgba(167, 139, 250, 0.3)";
      ctx.stroke();

      // Inner Core Glow
      const supGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 35);
      supGlow.addColorStop(0, "rgba(167, 139, 250, 0.3)");
      supGlow.addColorStop(0.5, "rgba(167, 139, 250, 0.1)");
      supGlow.addColorStop(1, "transparent");
      ctx.fillStyle = supGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 35, 0, Math.PI * 2);
      ctx.fill();

      // Supervisor Center Point
      ctx.fillStyle = "#fff";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "rgba(167, 139, 250, 0.8)";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // --- 3. Expert Agents & Connections ---
      agents.forEach((agent) => {
        // Connection Line (Glowing Filament)
        const lineGrad = ctx.createLinearGradient(centerX, centerY, agent.x, agent.y);
        lineGrad.addColorStop(0, "rgba(167, 139, 250, 0.3)");
        lineGrad.addColorStop(0.5, "rgba(167, 139, 250, 0.1)");
        lineGrad.addColorStop(1, "rgba(167, 139, 250, 0.4)");
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(agent.x, agent.y);
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Agent Core
        const agentGlow = ctx.createRadialGradient(agent.x, agent.y, 0, agent.x, agent.y, agent.size * 2);
        agentGlow.addColorStop(0, "rgba(167, 139, 250, 0.5)");
        agentGlow.addColorStop(1, "transparent");
        ctx.fillStyle = agentGlow;
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, agent.size * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Agent Orbit Ring (Mini)
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, agent.size + 4, time * 2, time * 2 + Math.PI * 0.5);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.stroke();

        // Spawn Data Packets
        if (Math.random() < 0.015) {
            dataPackets.push({
                x: centerX,
                y: centerY,
                targetId: agent.id,
                progress: 0,
                speed: 0.01 + Math.random() * 0.01,
                size: 1 + Math.random() * 1
            });
        }
      });

      // --- 4. Data Packets (Dynamic Tracking) ---
      for (let i = dataPackets.length - 1; i >= 0; i--) {
        const p = dataPackets[i];
        const targetAgent = agents[p.targetId];
        
        p.progress += p.speed;

        // Dynamic target coordinates
        const x = p.x + (targetAgent.x - p.x) * p.progress;
        const y = p.y + (targetAgent.y - p.y) * p.progress;

        // Trail
        const trailX = p.x + (targetAgent.x - p.x) * Math.max(0, p.progress - 0.08);
        const trailY = p.y + (targetAgent.y - p.y) * Math.max(0, p.progress - 0.08);

        const trailGrad = ctx.createLinearGradient(x, y, trailX, trailY);
        trailGrad.addColorStop(0, "rgba(167, 139, 250, 0.8)");
        trailGrad.addColorStop(1, "transparent");
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(trailX, trailY);
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = p.size;
        ctx.stroke();

        // Head
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(x, y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();

        if (p.progress >= 1) {
            dataPackets.splice(i, 1);
        }
      }


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
        className="aspect-square opacity-90"
      />
    </div>
  );
}
