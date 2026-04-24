"use client";

import React from "react";
import { TrendingUp, Building2, Users2, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const segmentsData = {
  FR: [
    {
      title: "Scale-ups & PME",
      subtitle: "Croissance sans friction",
      description: "Scalez vos opérations sans multiplier les effectifs. Nos agents absorbent la charge de travail répétitive pour vous laisser vous concentrer sur la croissance.",
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      title: "Grands Groupes & ETI",
      subtitle: "Modernisation agile",
      description: "Ajoutez une couche d'intelligence autonome sur vos systèmes existants. Pas de 'rip-and-replace', juste une orchestration fluide de vos flux complexes.",
      icon: <Building2 className="h-6 w-6" />,
    },
    {
      title: "Équipes Opérationnelles",
      subtitle: "Libérez vos talents",
      description: "Sales, Support, Logistique : redonnez du temps à vos équipes. L'Agent IA gère l'exécution, vos collaborateurs gèrent la stratégie et les exceptions.",
      icon: <Users2 className="h-6 w-6" />,
    },
    {
      title: "DSI & Directions Data",
      subtitle: "Contrôle et Transparence",
      description: "Une architecture ouverte, sans effet 'boîte noire'. Nous déployons des agents qui respectent vos standards de sécurité et de gouvernance les plus stricts.",
      icon: <ShieldCheck className="h-6 w-6" />,
    },
  ],
  EN: [
    {
      title: "Scale-ups & SMEs",
      subtitle: "Frictionless Growth",
      description: "Scale your operations without multiplying headcount. Our agents absorb repetitive workloads so you can focus on growth.",
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      title: "Enterprises & Mid-market",
      subtitle: "Agile Modernization",
      description: "Add a layer of autonomous intelligence over your existing systems. No 'rip-and-replace', just fluid orchestration of your complex flows.",
      icon: <Building2 className="h-6 w-6" />,
    },
    {
      title: "Operational Teams",
      subtitle: "Free Your Talents",
      description: "Sales, Support, Logistics: give time back to your teams. The AI Agent handles execution, while your people manage strategy and exceptions.",
      icon: <Users2 className="h-6 w-6" />,
    },
    {
      title: "IT & Data Departments",
      subtitle: "Control and Transparency",
      description: "An open architecture, no 'black box' effect. We deploy agents that respect your strictest security and governance standards.",
      icon: <ShieldCheck className="h-6 w-6" />,
    },
  ]
};

export default function ForWhom() {
  const { language } = useLanguage();
  const segments = segmentsData[language] || segmentsData.FR;

  return (
    <section id="pour-qui" className="bg-black py-32 border-t border-white/5">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <div className="mb-20">
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl leading-[1.1] mb-6">
            {language === "FR" ? (
              <>Conçu pour ceux qui <br /><span className="text-white/40 italic">refusent le statu quo.</span></>
            ) : (
              <>Built for those who <br /><span className="text-white/40 italic">refuse the status quo.</span></>
            )}
          </h2>
          <p className="text-lg text-white/60 max-w-xl">
            {language === "FR" 
              ? "Nos Agents IA s'adaptent à votre maturité technologique pour transformer vos flux de travail en actifs stratégiques."
              : "Our AI Agents adapt to your technological maturity to transform your workflows into strategic assets."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {segments.map((segment, i) => (
            <div 
              key={i}
              className="group relative p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 overflow-hidden"
            >
              {/* Decorative gradient corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 blur-[60px] group-hover:bg-violet-600/10 transition-colors" />
              
              <div className="relative z-10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center border border-white/10 bg-black text-violet-400 group-hover:border-violet-500/50 transition-colors">
                  {segment.icon}
                </div>
                <div className="mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-violet-500/70">
                    {segment.subtitle}
                  </span>
                  <h3 className="text-2xl font-semibold text-white mt-1">
                    {segment.title}
                  </h3>
                </div>
                <p className="text-white/50 leading-relaxed text-sm max-w-sm">
                  {segment.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
