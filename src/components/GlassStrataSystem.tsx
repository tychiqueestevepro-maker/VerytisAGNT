"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const steps = [
  {
    id: "01",
    title: "Captation & Normalisation",
    description: "Chaque signal métier est capté et structuré en temps réel. Le système élimine le bruit pour ne garder que l'essentiel.",
  },
  {
    id: "02",
    title: "Intelligence & Orchestration",
    description: "Le système interprète le contexte et applique vos protocoles métier. Il priorise et oriente les décisions sans délai.",
  },
  {
    id: "03",
    title: "Exécution & Impact",
    description: "Le système génère des sorties structurées prêtes à l'emploi pour alimenter vos décisions et votre production.",
  },
];

export default function GlassStrataSystem() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="solutions" className="bg-black py-28">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 items-center">
          
          {/* Left: Text Content */}
          <div className="flex flex-col gap-12">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Infrastructure complète
              </h2>
              <p className="mt-6 text-lg text-white/60 max-w-md">
                Pas un chatbot, pas un script. Une architecture structurée qui capte, traite et agit en temps réel.
              </p>
            </div>

            <div className="flex flex-col divide-y divide-white/10 border-t border-white/10">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  onMouseEnter={() => setActiveStep(index + 1)}
                  className={`group relative flex cursor-default flex-col py-8 transition-colors ${
                    activeStep === index + 1 ? "text-white" : "text-white/40"
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-sm tracking-widest text-white/30 group-hover:text-violet-400 transition-colors">
                      {step.id}
                    </span>
                    <h3 className="text-2xl font-medium tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <AnimatePresence>
                    {activeStep === index + 1 && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 pl-12 text-base leading-relaxed text-white/60 overflow-hidden"
                      >
                        {step.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual Schema (The Glass Strata) */}
          <div className="relative flex aspect-square w-full max-w-[500px] items-center justify-center lg:ml-auto">
            
            {/* Background Glow */}
            <div className="absolute inset-0 bg-violet-500/10 blur-[120px] rounded-full" />

            <div className="relative h-[300px] w-[400px] perspective-[1000px]">
              
              {/* Step 01: Bottom Plate */}
              <motion.div
                initial={{ opacity: 0, y: 40, rotateX: 45, rotateZ: -10 }}
                animate={{ 
                  opacity: activeStep >= 1 ? 1 : 0.1, 
                  y: 40, 
                  rotateX: 45, 
                  rotateZ: -10 
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 rounded-2xl border border-white/20 bg-white/[0.03] shadow-2xl backdrop-blur-xl"
              >
                {/* Internal shine */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-50" />
              </motion.div>

              {/* Step 03: Fluid (Between plates) */}
              <AnimatePresence>
                {activeStep >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 15 }}
                    exit={{ opacity: 0, scale: 0.8, y: 15 }}
                    className="absolute inset-4 rounded-xl rotateX-[45deg] rotateZ-[-10deg] overflow-hidden"
                  >
                    <motion.div 
                      className="h-full w-full bg-gradient-to-br from-violet-500/40 via-purple-500/40 to-magenta-400/40"
                      animate={{ 
                        background: [
                          "linear-gradient(to bottom right, rgba(139,92,246,0.4), rgba(168,85,247,0.4))",
                          "linear-gradient(to bottom right, rgba(217,70,239,0.4), rgba(139,92,246,0.4))",
                          "linear-gradient(to bottom right, rgba(139,92,246,0.4), rgba(168,85,247,0.4))"
                        ]
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Particles/Fluid movement effect */}
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-white/20" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 02: Top Plate */}
              <motion.div
                initial={{ opacity: 0, y: -40, rotateX: 45, rotateZ: -10 }}
                animate={{ 
                  opacity: activeStep >= 2 ? 1 : 0, 
                  y: -20, 
                  rotateX: 45, 
                  rotateZ: -10 
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="absolute inset-0 rounded-2xl border border-white/20 bg-white/[0.05] shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-lg"
              >
                {/* Depth reflection of the bottom plate */}
                <div className="absolute -bottom-4 left-4 h-full w-full rounded-2xl bg-white/5 blur-sm -z-10" />
                
                {/* Shine line */}
                <div className="absolute top-0 left-1/4 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </motion.div>

              {/* Decorative Labels for Step 03 */}
              <AnimatePresence>
                {activeStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,1)]" />
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Active System</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
