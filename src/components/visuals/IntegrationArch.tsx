"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const integrations = [
  { name: "Salesforce", domain: "salesforce.com" },
  { name: "HubSpot", domain: "hubspot.com" },
  { name: "Slack", domain: "slack.com" },
  { name: "Notion", domain: "notion.so" },
  { name: "Google Drive", domain: "drive.google.com" },
  { name: "Teams", domain: "microsoft.com" },
  { name: "Stripe", domain: "stripe.com" },
];

export default function IntegrationArch() {
  const { language } = useLanguage();

  return (
    <div className="relative w-full py-24 flex flex-col items-center">
      <div className="relative w-full max-w-6xl aspect-[2/1] mb-12">
        {/* The Arch Base (Verytis Core) */}
        <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-48 h-48 flex items-center justify-center z-20">
          <div className="absolute inset-0 bg-violet-500/20 blur-[100px] rounded-full animate-pulse" />
          <div className="relative w-16 h-16 rounded-full border-2 border-white bg-black flex items-center justify-center shadow-[0_0_50px_rgba(167,139,250,0.5)]">
            <div className="w-3 h-3 bg-violet-400 rounded-full" />
          </div>
        </div>

        {/* The Arc Path */}
        <svg viewBox="0 0 1000 600" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="rgba(167, 139, 250, 0.5)" />
              <stop offset="100%" stopColor="rgba(167, 139, 250, 0)" />
            </linearGradient>
          </defs>
          
          {integrations.map((app, i) => {
            const total = integrations.length;
            const angle = (i / (total - 1)) * Math.PI; // 0 to PI
            const radius = 400;
            const x = 500 - Math.cos(angle) * radius;
            const y = 530 - Math.sin(angle) * radius; // baseY moved to 530

            return (
              <g key={i}>
                {/* Connecting Line */}
                <motion.line
                  x1="500"
                  y1="530"
                  x2={x}
                  y2={y}
                  stroke="url(#lineGrad)"
                  strokeWidth="1.5"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 0.3, pathLength: 1 }}
                  transition={{ delay: i * 0.1, duration: 1.5 }}
                />
                
                {/* Data Packets along the lines */}
                <motion.circle
                  r="2"
                  fill="#fff"
                  initial={{ offset: 0 }}
                  animate={{ 
                    cx: [500, x],
                    cy: [530, y],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />

                {/* App Node Container */}
                <foreignObject x={x - 40} y={y - 40} width="80" height="80">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="w-full h-full flex flex-col items-center justify-center group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:border-violet-500/50 group-hover:bg-white/10 transition-all duration-500 overflow-hidden p-3.5">
                      <img 
                        src={`https://www.google.com/s2/favicons?domain=${app.domain}&sz=64`} 
                        alt={app.name}
                        className="w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                      />
                    </div>
                  </motion.div>
                </foreignObject>
              </g>
            );
          })}
        </svg>

        {/* Coming Soon Overlay Effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="mt-20 px-8 py-3 rounded-full border border-violet-500/30 bg-violet-500/5 backdrop-blur-md">
              <span className="text-sm font-bold uppercase tracking-[0.4em] text-violet-400">
                {language === "FR" ? "Prochainement" : "Coming Soon"}
              </span>
           </div>
        </div>
      </div>

      {/* The Message */}
      <div className="max-w-3xl text-center px-6">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white/90 leading-tight">
          {language === "FR" ? (
            <>Bientôt, vos agents pourront se connecter à votre <span className="text-violet-400">stack applicative</span> pour explorer la pleine puissance de vos données et faire partie intégrante de vos <span className="text-violet-400">workflows</span>.</>
          ) : (
            <>Soon, your agents will be able to connect to your <span className="text-violet-400">app stack</span> to explore the full power of your data and become an integral part of your <span className="text-violet-400">workflows</span>.</>
          )}
        </h3>
        <p className="mt-8 text-white/30 text-lg">
           {language === "FR" ? "Interopérabilité totale. Sans friction. Sans limites." : "Total interoperability. Frictionless. No limits."}
        </p>
      </div>
    </div>
  );
}
