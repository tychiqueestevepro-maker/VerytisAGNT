"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import DemoButton from "@/components/ui/DemoButton";
import { useLanguage } from "@/context/LanguageContext";

interface SolutionTemplateProps {
  title: string;
  subtitle: string;
  description: string;
  features?: {
    title: string;
    description: string;
    image?: string;
  }[];
  processSteps?: {
    label: string;
    text: string;
  }[];
  heroVisual?: React.ReactNode;
  footerSection?: React.ReactNode;
  ctaText?: string;
}

export default function SolutionTemplate({
  title,
  subtitle,
  description,
  features = [],
  processSteps,
  heroVisual,
  footerSection,
  ctaText,
}: SolutionTemplateProps) {
  const { language, t } = useLanguage();
  const defaultCta = ctaText || t("nav.book_demo");

  return (
    <div className="bg-black min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-violet-600/10 blur-[120px] pointer-events-none" />
      
      <div className="relative mx-auto max-w-[1300px] px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 mb-32">
          <div className="max-w-2xl text-left">
            {subtitle && (
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-violet-400">
                {subtitle}
              </span>
            )}
            <h1 className="text-[2.6rem] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[3.4rem] lg:text-[4.2rem] mt-6">
              {title}
            </h1>
            <p className="mt-8 text-xl text-white/50 leading-relaxed max-w-xl">
              {description}
            </p>
            <div className="mt-12 flex gap-4">
              <DemoButton
                label={defaultCta}
                variant="ghost"
                icon={<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
              />
            </div>
          </div>

          <div className="relative w-full lg:w-1/2 min-h-[400px]">
            {heroVisual ? (
              heroVisual
            ) : (
              <div className="relative aspect-square rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2/3 h-2/3 border border-violet-500/20 rounded-full animate-pulse" />
                  <div className="absolute w-1/2 h-1/2 border border-violet-500/40 rounded-full animate-pulse delay-75" />
                  <div className="absolute w-1/3 h-1/3 bg-violet-500/20 blur-2xl rounded-full" />
                  <span className="relative text-xs font-mono text-violet-300 tracking-tighter uppercase opacity-50">
                    {language === "FR" ? "Autonome" : "Autonomous"}
                  </span>
                </div>
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/40 backdrop-blur-md border border-white/5">
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2">
                      {language === "FR" ? "Statut en direct" : "Live Status"}
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-sm text-white/80 font-medium italic">
                          {language === "FR" ? "Traitement du flux opérationnel..." : "Processing operational flow..."}
                        </span>
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Simplification: The "Before / After" or "How it works" simplified */}
        {processSteps && (
          <div className="mb-48">
            <div className="relative max-w-4xl mx-auto py-12">

              {/* Vertical Spine */}
              <div className="absolute top-0 left-[11px] w-px h-full bg-white/5" />
              
              {/* Kinetic Beam (The "Soul" of the process) */}
              <div className="absolute top-0 left-[11px] w-px h-24 bg-gradient-to-b from-transparent via-violet-400 to-transparent shadow-[0_0_15px_rgba(167,139,250,0.5)] animate-flow-vertical z-20" />
              
              <div className="space-y-40">
                {processSteps.map((step, i) => (
                  <div key={i} className="relative group pl-16">
                    {/* Active Node with Pulse */}
                    <div className="absolute top-2 left-0 w-6 h-6 rounded-full border border-white/10 bg-black flex items-center justify-center group-hover:border-violet-500 transition-all duration-500 z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-violet-400 transition-colors" />
                      
                      {/* Pulse Effect */}
                      <div className="absolute inset-0 rounded-full bg-violet-500/20 animate-ping opacity-0 group-hover:opacity-100" />
                      
                      {/* Internal Processing Micro-animation */}
                      {i === 1 && (
                        <div className="absolute -inset-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute top-0 left-1/2 w-0.5 h-0.5 bg-violet-400 rounded-full animate-orbit-1" />
                          <div className="absolute top-1/2 left-0 w-0.5 h-0.5 bg-violet-400 rounded-full animate-orbit-2" />
                        </div>
                      )}
                    </div>
                    
                    {/* Number Background */}
                    <span className="absolute -top-10 right-0 text-[12rem] font-bold text-white/[0.02] select-none pointer-events-none transition-all duration-700 group-hover:text-violet-500/[0.06] group-hover:-translate-y-4">
                      0{i + 1}
                    </span>
                    
                    <div className="relative transform transition-all duration-500 group-hover:translate-x-2">
                      <h3 className="text-4xl font-semibold text-white mb-6 group-hover:text-violet-400 transition-colors">
                        {step.label}
                      </h3>
                      <p className="text-xl text-white/40 leading-relaxed max-w-2xl group-hover:text-white/70 transition-colors">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="border-t border-white/5 pt-32">
          <div className="space-y-20">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                  i % 2 !== 0 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image side */}
                <div className="w-full lg:w-[45%]">
                  {feature.image && (
                    <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-white/5 group">
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>
                  )}
                </div>

                {/* Text side */}
                <div className="w-full lg:w-[40%] text-left">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-base text-white/40 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional footer section (e.g. IntegrationArch, CaseStudySection) */}
        {footerSection && (
          <div className="mt-32">{footerSection}</div>
        )}
      </div>
    </div>
  );
}
