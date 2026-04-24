"use client";

import React from "react";
import { motion } from "motion/react";
import { 
  CheckCircle2,
  ArrowRight,
  Rocket
} from "lucide-react";
import Link from "next/link";
import DemoButton from "@/components/ui/DemoButton";
import { useLanguage } from "@/context/LanguageContext";

const stepsData = {
  FR: [
    {
      id: "01",
      title: "Diagnostic & Analyse des Flux",
      description: "Tout commence par une immersion dans votre réalité opérationnelle. Nous échangeons avec vos équipes pour comprendre non seulement 'quoi' faire, mais surtout 'comment' et 'pourquoi'.",
      details: [
        "Audit complet de vos processus actuels",
        "Identification des goulots d'étranglement",
        "Définition des indicateurs de succès (KPIs)"
      ],
    },
    {
      id: "02",
      title: "Conception de l'Écosystème",
      description: "Sur la base du diagnostic, nous concevons une liste d'agents spécialisés. Chaque agent est paramétré pour une mission précise, garantissant une modularité et une robustesse maximale.",
      details: [
        "Cartographie des agents requis",
        "Design des flux de communication",
        "Validation des schémas de données"
      ],
    },
    {
      id: "03",
      title: "Architecture de Solution",
      description: "Nous arbitrons entre différentes architectures : systèmes multi-agents complexes, extraction massive de données ou agents end-to-end. Le choix est dicté par l'efficacité et la scalabilité.",
      details: [
        "Sélection du stack technologique",
        "Optimisation des coûts d'inférence",
        "Design de la redondance système"
      ],
    },
    {
      id: "04",
      title: "Déploiement Opérationnel",
      description: "Nos ingénieurs procèdent à la mise en place technique du système dans votre environnement. Nous assurons l'interopérabilité parfaite avec vos outils métiers.",
      details: [
        "Configuration des environnements",
        "Tests de charge et de sécurité",
        "Optimisation de la latence"
      ],
    },
    {
      id: "05",
      title: "Propulsion & Monitoring",
      description: "Les agents sont propulsés sur nos serveurs haute performance. Nous déployons les interfaces de connectivité (API) pour que vous receviez vos données structurées en temps réel.",
      details: [
        "Monitoring continu des performances",
        "Ajustement dynamique des modèles",
        "Support technique dédié"
      ],
    }
  ],
  EN: [
    {
      id: "01",
      title: "Diagnostic & Flow Analysis",
      description: "It all starts with an immersion in your operational reality. We talk with your teams to understand not just 'what' to do, but especially 'how' and 'why'.",
      details: [
        "Complete audit of your current processes",
        "Identification of bottlenecks",
        "Definition of success indicators (KPIs)"
      ],
    },
    {
      id: "02",
      title: "Ecosystem Design",
      description: "Based on the diagnostic, we design a list of specialized agents. Each agent is configured for a specific mission, ensuring maximum modularity and robustness.",
      details: [
        "Mapping of required agents",
        "Communication flow design",
        "Data schema validation"
      ],
    },
    {
      id: "03",
      title: "Solution Architecture",
      description: "We decide between different architectures: complex multi-agent systems, massive data extraction, or end-to-end agents. The choice is driven by efficiency and scalability.",
      details: [
        "Tech stack selection",
        "Inference cost optimization",
        "System redundancy design"
      ],
    },
    {
      id: "04",
      title: "Operational Deployment",
      description: "Our engineers handle the technical setup of the system in your environment. We ensure perfect interoperability with your business tools.",
      details: [
        "Environment configuration",
        "Load and security testing",
        "Latency optimization"
      ],
    },
    {
      id: "05",
      title: "Propulsion & Monitoring",
      description: "Agents are deployed on our high-performance servers. We deploy connectivity interfaces (APIs) so you receive your structured data in real-time.",
      details: [
        "Continuous performance monitoring",
        "Dynamic model adjustment",
        "Dedicated technical support"
      ],
    }
  ]
};

const visuals = [
  (
    <div className="relative aspect-square flex items-center justify-center overflow-hidden">
      <div className="relative w-48 h-48">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.2, 0.8],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              delay: i * 1.3,
              ease: "easeInOut" 
            }}
            className="absolute inset-0 rounded-full border border-violet-500/30"
          />
        ))}
        <motion.div 
          animate={{ 
            rotate: 360,
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-t border-violet-500/60 rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_20px_rgba(167,139,250,1)]" />
        </div>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: i * 0.4 
            }}
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
            }}
            className="absolute h-1 w-1 bg-white rounded-full"
          />
        ))}
      </div>
    </div>
  ),
  (
    <div className="relative aspect-square flex items-center justify-center overflow-hidden">
      <div className="relative w-80 h-80">
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: 0.5 }}>
            <line x1="100" y1="100" x2="40" y2="40" stroke="white" strokeWidth="0.5" />
            <line x1="100" y1="100" x2="160" y2="40" stroke="white" strokeWidth="0.5" />
            <line x1="100" y1="100" x2="40" y2="160" stroke="white" strokeWidth="0.5" />
            <line x1="100" y1="100" x2="160" y2="160" stroke="white" strokeWidth="0.5" />
          </motion.g>

          {[
            { x1: 100, y1: 100, x2: 40, y2: 40 },
            { x1: 100, y1: 100, x2: 160, y2: 40 },
            { x1: 100, y1: 100, x2: 40, y2: 160 },
            { x1: 100, y1: 100, x2: 160, y2: 160 }
          ].map((path, i) => (
            <motion.circle
              key={i}
              r="1.5"
              fill="#8b5cf6"
              initial={{ cx: path.x1, cy: path.y1, opacity: 0 }}
              animate={{ 
                cx: [path.x1, path.x2],
                cy: [path.y1, path.y2],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}

          <motion.circle
            cx="100"
            cy="100"
            r="6"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="1"
            animate={{ r: [6, 8, 6], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <circle cx="100" cy="100" r="2" fill="#8b5cf6" />

          {[
            { x: 40, y: 40 },
            { x: 160, y: 40 },
            { x: 40, y: 160 },
            { x: 160, y: 160 }
          ].map((node, i) => (
            <g key={i}>
              <motion.rect
                x={node.x - 6}
                y={node.y - 6}
                width="12"
                height="12"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.4 }}
                transition={{ delay: 1 + i * 0.2 }}
              />
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="1.5"
                fill="#8b5cf6"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  ),
  (
    <div className="relative aspect-square flex items-center justify-center">
      <motion.div 
        animate={{ rotate: 45 }}
        className="w-48 h-48 border border-white/10 flex items-center justify-center"
      >
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-32 h-32 border border-violet-500/20 flex items-center justify-center"
        >
          <div className="w-16 h-16 bg-violet-500/40" />
        </motion.div>
      </motion.div>
    </div>
  ),
  (
    <div className="relative aspect-square flex items-center justify-center overflow-hidden font-mono text-[10px] text-white/30 p-8 leading-tight">
      <pre className="whitespace-pre-wrap">
{`// INITIALIZING AGENTS...
const agent_01 = new VerytisAgent({
  role: "Extraction",
  source: "ERP_STREAM",
  rules: CUSTOM_RULES
});

agent_01.deploy({ 
  env: "PRODUCTION",
  region: "EU-WEST"
});`}
      </pre>
    </div>
  ),
  (
    <div className="relative aspect-square flex items-center justify-center">
      <div className="relative">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="h-32 w-32 rounded-full border-2 border-violet-500/20 border-t-violet-500" 
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Rocket className="h-10 w-10 text-white" />
          </motion.div>
        </div>
      </div>
    </div>
  )
];

export default function FonctionnementPage() {
  const { language, t } = useLanguage();
  const steps = stepsData[language] || stepsData.FR;

  return (
    <div className="bg-black min-h-screen text-white selection:bg-violet-500/30">
      <main>
        {/* Hero Section */}
        <section className="pt-40 pb-24 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-full pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-violet-500/5 blur-[100px] rounded-full" />
          </div>

          <div className="mx-auto max-w-[1100px] px-6 sm:px-10 relative">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl font-semibold tracking-tight text-white sm:text-7xl mt-6 leading-[1.05]"
            >
              {language === "FR" ? (
                <>De l'analyse à <br /><span className="text-white/30 italic font-light">la propulsion.</span></>
              ) : (
                <>From analysis to <br /><span className="text-white/30 italic font-light">propulsion.</span></>
              )}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-10 text-xl text-white/50 leading-relaxed max-w-2xl font-light"
            >
              {language === "FR" 
                ? "Nous ne déployons pas simplement des outils. Nous bâtissons l'infrastructure autonome qui devient le moteur de votre croissance."
                : "We don't just deploy tools. We build the autonomous infrastructure that becomes the engine of your growth."}
            </motion.p>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20">
          <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
            <div className="space-y-40">
              {steps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <motion.div 
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={index % 2 === 1 ? "md:order-2" : ""}
                  >
                    <span className="text-sm font-mono text-violet-500/60 mb-4 block">
                      {language === "FR" ? `Étape ${step.id}` : `Step ${step.id}`}
                    </span>
                    <h2 className="text-3xl font-semibold mb-8 text-white tracking-tight">{step.title}</h2>
                    <p className="text-lg text-white/50 leading-relaxed mb-10 font-light">
                      {step.description}
                    </p>
                    <div className="space-y-4">
                      {step.details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-4 text-sm text-white/40 group">
                          <div className="h-[1px] w-4 bg-violet-500/30 transition-all group-hover:w-6 group-hover:bg-violet-500" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`relative group ${index % 2 === 1 ? "md:order-1" : ""}`}
                  >
                    <div className="absolute -inset-4 bg-gradient-to-tr from-violet-500/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    {visuals[index]}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-40 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent" />
          <div className="mx-auto max-w-[800px] px-6 text-center relative">
            <h2 className="text-4xl font-semibold mb-8 tracking-tight">
              {language === "FR" ? "Prêt à transformer vos opérations ?" : "Ready to transform your operations?"}
            </h2>
            <p className="text-xl text-white/40 mb-14 font-light leading-relaxed">
              {language === "FR" 
                ? "Discutons de vos flux et concevons ensemble le système autonome qui propulsera votre activité."
                : "Let's discuss your flows and design together the autonomous system that will propel your business."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <DemoButton
                label={t("nav.book_demo")}
                variant="primary"
                icon={<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
              />
              <Link 
                href="/solutions/agent-end-to-end"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-10 py-4 text-sm font-medium text-white/60 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.05] hover:text-white active:scale-[0.98]"
              >
                {language === "FR" ? "Voir nos solutions" : "See our solutions"}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
