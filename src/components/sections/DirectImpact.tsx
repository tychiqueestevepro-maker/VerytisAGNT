"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function DirectImpact() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
      });

      // Initial Reset (to ensure loop works correctly)
      tl.set([terminalRef.current, rulesRef.current, dashboardRef.current], { 
        display: "none", 
        opacity: 0 
      })
      .set(".terminal-line", { opacity: 0, y: 10 })
      .set(".terminal-final", { opacity: 0 })
      .set(".rule-block", { opacity: 0, x: -20 })
      .set(".dash-item", { scale: 0.8, opacity: 0 })
      .set(".dash-final", { opacity: 0 });

      // Phase 1: Terminal Analysis
      tl.to(terminalRef.current, { display: "flex", opacity: 1, duration: 0 })
      .fromTo(
        ".terminal-line",
        { opacity: 0, y: 10 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.05, 
          duration: 0.1,
          ease: "none"
        }
      )
      .to(".terminal-final", {
        opacity: 1,
        duration: 0.5,
        delay: 0.2
      })
      // Transition to Phase 2
      .to(terminalRef.current, {
        opacity: 0,
        display: "none",
        duration: 0.4,
        delay: 2
      })
      .fromTo(rulesRef.current, 
        { opacity: 0, display: "none" },
        { opacity: 1, display: "flex", duration: 0.4 }
      )
      
      // Phase 2: Business Rules
      .fromTo(".rule-block",
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          stagger: 0.8, 
          duration: 0.5,
          ease: "power2.out"
        }
      )

      // Transition to Phase 3
      .to(rulesRef.current, {
        opacity: 0,
        display: "none",
        duration: 0.4,
        delay: 2
      })
      .fromTo(dashboardRef.current,
        { opacity: 0, display: "none" },
        { opacity: 1, display: "grid", duration: 0.4 }
      )

      // Phase 3: Dashboard
      .fromTo(".dash-item",
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          stagger: 0.05, 
          duration: 0.4,
          ease: "back.out(1.7)"
        }
      )
      .to(".dash-final", {
        opacity: 1,
        duration: 0.5,
        delay: 0.2
      });

      // Continuous blinking for dots in Phase 3
      gsap.to(".status-dot", {
        opacity: 0.3,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.2,
          from: "random"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mock terminal data
  const terminalData = [
    "INIT_AGENT_IA_V2.0.4...",
    "CONNECTING_FLUX_GATEWAY...",
    "RECEIVING_ENCRYPTED_STREAM [24.5GB/s]",
    "ANALYZING_CORE_INTENT...",
    "PARSING_METADATA...",
    "MAPPING_SIGNALS...",
    "VALIDATING_SCHEMA...",
    "EXTRACTING_INTENT...",
    "AGENT_IA_HEURISTIC_ANALYSIS...",
    "MATCH_FOUND_SIG_4829",
    "AGENT_IA_EXECUTION_CORE...",
  ];

  return (
    <section id="impact-direct" ref={containerRef} className="bg-black py-32 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="flex flex-col gap-8">
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl leading-[1.1]">
              {t("home.impact_title")}
            </h2>
            
            <p className="text-lg text-white/60 max-w-md leading-relaxed">
              {t("home.impact_desc")}
            </p>

            <div className="flex flex-col gap-4 mt-4">
              {t("home.impact_list").map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white/40">
                  <div className="h-[1px] w-4 bg-violet-500/30" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Apple Style Window */}
          <div className="relative w-full">
            {/* Ambient Glow behind window */}
            <div className="absolute -inset-4 bg-violet-600/10 blur-[100px] rounded-full opacity-50" />
            
            <div 
              ref={windowRef}
              className="relative aspect-[16/11] rounded-2xl border border-white/10 bg-black/60 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
            >
              {/* Title Bar */}
              <div className="h-10 border-b border-white/5 bg-white/5 flex items-center px-4 gap-2 shrink-0">
                <div className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
                <div className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
                <div className="h-3 w-3 rounded-full bg-[#28c840]/80" />
                <div className="ml-4 text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">Verytis_Engine_v2.4.0</div>
              </div>

              {/* Window Content */}
              <div className="flex-1 p-8 font-mono text-sm overflow-hidden relative">
                
                {/* Phase 1: Terminal */}
                <div ref={terminalRef} className="flex flex-col gap-1.5">
                  {terminalData.map((line, i) => (
                    <div key={i} className="terminal-line text-violet-400/60 flex gap-2">
                      <span className="opacity-40">→</span>
                      {line}
                    </div>
                  ))}
                  <div className="terminal-final opacity-0 mt-6 text-base font-bold text-white tracking-tight flex items-center gap-2">
                    <span className="text-violet-500">{`> `}</span>
                    {t("home.terminal_status")}
                    <span className="h-4 w-2 bg-white/80 animate-pulse" />
                  </div>
                </div>

                {/* Phase 2: Rules */}
                <div ref={rulesRef} className="hidden h-full flex-col justify-center gap-6 max-w-sm mx-auto relative">
                  {/* Subtle data lines background */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none flex flex-col justify-around">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent" />
                    ))}
                  </div>

                  <div className="rule-block relative overflow-hidden bg-white/5 border border-white/10 p-5 rounded-xl backdrop-blur-md shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
                    <div className="text-violet-400 text-[10px] mb-2 tracking-[0.3em] font-bold">PROTOCOL_ALPHA</div>
                    <div className="text-white text-base font-sans">{t("home.rules_biz")}</div>
                  </div>

                  <div className="rule-block relative overflow-hidden bg-white/5 border border-white/10 p-5 rounded-xl backdrop-blur-md self-end shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                    <div className="text-purple-400 text-[10px] mb-2 tracking-[0.3em] font-bold text-right">ORCHESTRATOR_BETA</div>
                    <div className="text-white text-base font-sans">{t("home.rules_prior")}</div>
                  </div>
                </div>

                {/* Phase 3: Dashboard */}
                <div ref={dashboardRef} className="hidden h-full grid-cols-4 gap-4 items-center">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="dash-item aspect-square bg-white/[0.03] border border-white/10 rounded-xl p-4 flex flex-col justify-between group overflow-hidden relative">
                      {/* Active scan line for each cell */}
                      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 to-transparent h-1/2 w-full -translate-y-full group-hover:animate-[scan_2s_linear_infinite] opacity-0 group-hover:opacity-100" />
                      
                      <div className="flex justify-between items-start relative z-10">
                        <div className="h-1.5 w-1.5 rounded-full bg-violet-500 status-dot shadow-[0_0_12px_rgba(139,92,246,1)]" />
                        <div className="text-[8px] font-mono text-white/20 uppercase">Node_{i+1}</div>
                      </div>
                      
                      <div className="space-y-2 relative z-10">
                        <div className="flex justify-between items-end mb-1">
                           <div className="h-1 w-12 bg-white/5 rounded overflow-hidden">
                              <div 
                                className="h-full bg-violet-500/40 animate-[pulse_2s_ease-in-out_infinite]" 
                                style={{ width: `${Math.random() * 80 + 20}%` }} 
                              />
                           </div>
                           <div className="text-[8px] font-mono text-violet-400/50">{(Math.random() * 100).toFixed(1)}%</div>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded" />
                      </div>
                    </div>
                  ))}
                  <div className="dash-final opacity-0 col-span-4 mt-8 text-center text-base font-bold text-white tracking-[0.05em] drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                    {`> `} {t("home.terminal_final")}
                  </div>
                </div>

              </div>

              {/* Enhanced Visual Overlays */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
                {/* Scanlines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20" />
                {/* Global Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-violet-500/5 to-transparent opacity-50" />
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          from { transform: translateX(-5%); opacity: 0.5; }
          to { transform: translateX(5%); opacity: 1; }
        }
        @keyframes scan {
          from { transform: translateY(-100%); }
          to { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
