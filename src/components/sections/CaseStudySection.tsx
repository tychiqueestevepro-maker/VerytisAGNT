"use client";

import React, { useState } from "react";
import { Check, X, ArrowRight, Database, FileText, Cpu, Zap, Users } from "lucide-react";

interface CaseStudyProps {
  title: string;
  description: string;
  before: {
    title: string;
    items: string[];
  };
  after: {
    title: string;
    items: string[];
  };
  workflow: {
    step: string;
    desc: string;
  }[];
}

export default function CaseStudySection({ 
  title, 
  description, 
  before, 
  after, 
  workflow 
}: CaseStudyProps) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {title}
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Before / After Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
          {/* Before */}
          <div className="group relative rounded-3xl border border-white/5 bg-white/[0.02] p-10 transition-all hover:border-red-500/20 hover:bg-red-500/[0.02]">
            <div className="absolute top-6 right-8 text-[10px] font-bold uppercase tracking-widest text-red-500/50">
              Avant
            </div>
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                <X className="h-4 w-4" />
              </span>
              {before.title}
            </h3>
            <ul className="space-y-6">
              {before.items.map((item, i) => (
                <li key={i} className="flex gap-4 text-white/40 group-hover:text-white/60 transition-colors">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500/30" />
                  <span className="text-lg leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="group relative rounded-3xl border border-violet-500/30 bg-violet-500/[0.05] p-10 transition-all hover:border-violet-500/50 hover:bg-violet-500/[0.08] shadow-[0_0_50px_-12px_rgba(167,139,250,0.2)]">
            <div className="absolute top-6 right-8 text-[10px] font-bold uppercase tracking-widest text-violet-400">
              Avec Verytis Agent
            </div>
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 text-black">
                <Check className="h-4 w-4" />
              </span>
              {after.title}
            </h3>
            <ul className="space-y-6">
              {after.items.map((item, i) => (
                <li key={i} className="flex gap-4 text-white/80 transition-colors">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                  <span className="text-lg leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Workflow Section */}
        <div className="relative">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-violet-400 block mb-4">
              Intelligence Opérationnelle
            </span>
            <h3 className="text-3xl font-bold text-white">Comment travaille l'agent</h3>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent z-0" />
            
            {workflow.map((step, i) => (
              <div 
                key={i} 
                className={`relative z-10 flex flex-col items-center text-center group cursor-pointer transition-all duration-500 ${
                  activeStep === i ? "scale-105" : "opacity-60 grayscale"
                }`}
                onMouseEnter={() => setActiveStep(i)}
              >
                <div className={`mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border transition-all duration-500 ${
                  activeStep === i 
                    ? "border-violet-500 bg-violet-500/10 shadow-[0_0_30px_-5px_rgba(167,139,250,0.4)]" 
                    : "border-white/10 bg-white/5"
                }`}>
                  {i === 0 && <FileText className={`h-10 w-10 ${activeStep === i ? "text-violet-400" : "text-white/30"}`} />}
                  {i === 1 && <Cpu className={`h-10 w-10 ${activeStep === i ? "text-violet-400" : "text-white/30"}`} />}
                  {i === 2 && <Database className={`h-10 w-10 ${activeStep === i ? "text-violet-400" : "text-white/30"}`} />}
                </div>
                
                <h4 className={`text-xl font-bold mb-4 transition-colors ${activeStep === i ? "text-white" : "text-white/50"}`}>
                  {step.step}
                </h4>
                <p className={`text-sm leading-relaxed transition-colors ${activeStep === i ? "text-white/60" : "text-white/20"}`}>
                  {step.desc}
                </p>

                {/* Animated Beam between steps */}
                {i < workflow.length - 1 && (
                  <div className="hidden lg:block absolute -right-[10%] top-12 w-6 h-6 z-20">
                     <div className="w-full h-full flex items-center justify-center">
                        <Zap className="h-4 w-4 text-violet-500 animate-pulse" />
                     </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Detailed Output visualization for active step */}
          <div className="mt-20 rounded-2xl border border-white/5 bg-white/[0.01] p-8 overflow-hidden relative">
             <div className="absolute top-0 left-0 w-1 h-full bg-violet-500" />
             <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                   <h5 className="text-violet-400 font-mono text-xs uppercase tracking-widest mb-4">Focus Étape {activeStep + 1}</h5>
                   <p className="text-white text-xl font-medium leading-relaxed">
                      {workflow[activeStep].desc}
                   </p>
                </div>
                <div className="w-full md:w-1/3 bg-black rounded-lg p-4 font-mono text-[10px] text-violet-300 border border-white/10">
                   {activeStep === 0 && (
                     <div className="space-y-1 opacity-60">
                        <p>--- SOURCE_INPUT ---</p>
                        <p>FILE: fact_2024_08.pdf</p>
                        <p>TYPE: application/pdf</p>
                        <p>SCANNING_RAW_TEXT...</p>
                        <p className="text-white/20">"Total à payer: 1240.50€..."</p>
                     </div>
                   )}
                   {activeStep === 1 && (
                     <div className="space-y-1">
                        <p className="text-emerald-400 animate-pulse">&gt;&gt;&gt; ANALYZING_ENTITIES</p>
                        <p>IDENTIFYING: Amount -&gt; 1240.50</p>
                        <p>IDENTIFYING: Date -&gt; 2024-08-12</p>
                        <p>CROSS_CHECKING_TAX_ID...</p>
                        <p className="text-violet-400">CONTEXT_MAPPING: SUCCESS</p>
                     </div>
                   )}
                   {activeStep === 2 && (
                     <div className="space-y-1">
                        <p className="text-blue-400">+++ PUSHING_TO_STDOUT +++</p>
                        <p>&#123;</p>
                        <p className="pl-4">"id": "INV-882",</p>
                        <p className="pl-4">"total": 1240.50,</p>
                        <p className="pl-4">"status": "ready"</p>
                        <p>&#125;</p>
                        <p className="text-white/30 italic mt-2">// Injecté via API</p>
                     </div>
                   )}
                </div>
             </div>
          </div>
        {/* Human Impact Section */}
        <div className="mt-48 grid lg:grid-cols-2 gap-20 items-center border-t border-white/5 pt-32">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-400 block mb-6">
              Synergie Homme-Machine
            </span>
            <h3 className="text-4xl font-bold text-white mb-8 leading-tight">
              L'humain au centre, <br />
              <span className="text-white/40">l'agent à l'exécution.</span>
            </h3>
            <p className="text-lg text-white/50 leading-relaxed mb-10">
              Nos agents ne remplacent pas votre expertise : ils la codifient. En se basant sur votre "base métier" lors de la conception, l'agent reproduit vos processus avec une fidélité absolue, sans jamais perdre un seul détail.
            </p>
            <div className="space-y-6">
              {[
                { 
                  title: "Zéro détail perdu", 
                  desc: "Chaque exception, chaque nuance métier est intégrée dans la logique de l'agent dès sa conception." 
                },
                { 
                  title: "Expertise préservée", 
                  desc: "L'agent s'adapte à votre manière de travailler, à vos outils et à vos data, pas l'inverse." 
                },
                { 
                  title: "Libération cognitive", 
                  desc: "Vos équipes sont libérées des tâches répétitives pour se concentrer sur la prise de décision stratégique." 
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                    <Check className="h-3 w-3" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-white/40">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square">
             {/* Visual representation of Human + Agent synergy */}
             <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-emerald-500/20 blur-3xl opacity-30" />
             <div className="relative h-full w-full border border-white/10 rounded-full flex items-center justify-center">
                <div className="absolute inset-4 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-12 border border-violet-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                <div className="z-10 flex flex-col items-center">
                   <div className="h-20 w-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 backdrop-blur-sm">
                      <Users className="h-10 w-10 text-white" />
                   </div>
                   <div className="h-px w-12 bg-gradient-to-r from-transparent via-violet-500 to-transparent my-2" />
                   <div className="h-20 w-20 rounded-2xl bg-violet-500 border border-violet-400 flex items-center justify-center shadow-[0_0_40px_-10px_rgba(167,139,250,0.6)]">
                      <Cpu className="h-10 w-10 text-black" />
                   </div>
                </div>
                {/* Orbital nodes */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-4 w-4 rounded-full bg-violet-400 shadow-[0_0_15px_rgba(167,139,250,0.8)]" />
             </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
