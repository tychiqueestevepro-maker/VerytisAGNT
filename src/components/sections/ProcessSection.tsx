"use client";

import React from "react";
import { motion } from "motion/react";

const steps = [
  {
    n: "01",
    title: "Analyse",
    body: "Nous analysons votre organisation et votre manière de travailler pour identifier les leviers d’optimisation.",
  },
  {
    n: "02",
    title: "Conception",
    body: "Nous construisons une solution adaptée à vos besoins réels.",
  },
  {
    n: "03",
    title: "Déploiement",
    body: "Nous mettons en place le système dans votre environnement.",
  },
  {
    n: "04",
    title: "Exploitation",
    body: "Le système fonctionne et évolue avec votre activité.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="bg-black py-32 border-t border-white/5">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        
        {/* Header */}
        <div className="mb-24">
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Comment ça marche
          </h2>
          <div className="mt-4 h-1 w-12 bg-violet-500 rounded-full" />
        </div>

        {/* Steps List */}
        <div className="flex flex-col gap-16 relative">
          {/* Vertical Line Connector */}
          <div className="absolute left-[11px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-violet-500/50 via-violet-500/20 to-transparent hidden sm:block" />

          {steps.map((step, i) => (
            <motion.div 
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative pl-0 sm:pl-12 group"
            >
              {/* Number Dot */}
              <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full border border-violet-500/30 bg-black flex items-center justify-center z-10 transition-colors group-hover:border-violet-500 hidden sm:flex">
                <div className="h-1.5 w-1.5 rounded-full bg-violet-500" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-12">
                <span className="font-mono text-sm text-violet-500 font-bold shrink-0 pt-1">
                  {step.n}
                </span>
                
                <div className="max-w-xl">
                  <h3 className="text-2xl font-medium text-white mb-4">
                    {step.title}
                  </h3>
                  <div className="flex items-start">
                    <p className="text-lg text-white/60 leading-relaxed font-light">
                      {step.body}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
