"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DemoButton from "@/components/ui/DemoButton";
import LivingSystemHero from "@/components/sections/LivingSystemHero";
import GlassStrataSystem from "@/components/visuals/GlassStrataSystem";
import DirectImpact from "@/components/sections/DirectImpact";
import ForWhom from "@/components/sections/ForWhom";
import { useLanguage } from "@/context/LanguageContext";

/* ─── DATA ─────────────────────────────────────────────────────────────── */

const useCasesData = {
  FR: [
    {
      domain: "Opérations",
      title: "Pilotage de flux métier",
      description:
        "Capture et distribution automatique de la donnée stratégique. Vos informations circulent sans friction vers les bons points d'exécution, garantissant une réactivité immédiate et une traçabilité totale de chaque décision.",
    },
    {
      domain: "Data",
      title: "Traitement documentaire",
      description:
        "Extraction, structuration et archivage intelligent de documents complexes. Vos données brutes deviennent exploitables instantanément, éliminant les erreurs manuelles et accélérant vos cycles de validation.",
    },
    {
      domain: "Opérations",
      title: "Assistants opérationnels",
      description:
        "Agents autonomes dédiés à vos flux métier critiques. Les tâches répétitives sont traitées avec une précision absolue, permettant à vos équipes de se concentrer sur des missions à haute valeur ajoutée.",
    },
    {
      domain: "Interne",
      title: "Automatisations multi-étapes",
      description:
        "Pipelines complexes qui orchestrent plusieurs systèmes en séquence logique. Une seule entrée déclenche une série d'actions coordonnées et vérifiées, assurant la cohérence de votre infrastructure.",
    },
    {
      domain: "Sur-mesure",
      title: "Votre infrastructure dédiée",
      description:
        "Chaque entreprise est unique. Nous ne nous limitons pas à des modèles : nous analysons vos flux spécifiques pour bâtir le système qui s'adapte parfaitement à vos contraintes métier les plus complexes.",
    },
  ],
  EN: [
    {
      domain: "Operations",
      title: "Business Flow Management",
      description:
        "Automatic capture and distribution of strategic data. Your information flows frictionlessly to the right execution points, ensuring immediate responsiveness and full traceability of every decision.",
    },
    {
      domain: "Data",
      title: "Document Processing",
      description:
        "Extraction, structuring, and intelligent archiving of complex documents. Your raw data becomes instantly usable, eliminating manual errors and accelerating your validation cycles.",
    },
    {
      domain: "Operations",
      title: "Operational Assistants",
      description:
        "Autonomous agents dedicated to your critical business flows. Repetitive tasks are handled with absolute precision, allowing your teams to focus on high-value missions.",
    },
    {
      domain: "Internal",
      title: "Multi-step Automations",
      description:
        "Complex pipelines that orchestrate multiple systems in logical sequence. A single input triggers a series of coordinated and verified actions, ensuring infrastructure consistency.",
    },
    {
      domain: "Tailor-made",
      title: "Your Dedicated Infrastructure",
      description:
        "Every company is unique. We don't limit ourselves to models: we analyze your specific flows to build the system that perfectly fits your most complex business constraints.",
    },
  ]
};

/* ─── PAGE ──────────────────────────────────────────────────────────────── */

export default function Home() {
  const { t, language } = useLanguage();
  const useCases = useCasesData[language] || useCasesData.FR;

  return (
    <>
      <LivingSystemHero />

      {/* ── Integrations marquee ── */}
      <section className="mt-12 border-y border-white/6 bg-black py-16 overflow-hidden">
        <div className="mb-12 text-center">
          <p className="mx-auto max-w-[600px] text-lg font-bold text-white">
            {t("home.tech_title")}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-20 gap-y-10 transition-all">
          {[
            { name: "OpenAI", domain: "openai.com" },
            { name: "Anthropic", domain: "anthropic.com" },
            { name: "Mistral AI", domain: "mistral.ai" },
            { name: "Meta", domain: "meta.com" },
          ].map((brand) => (
            <div key={brand.name} className="group flex items-center gap-6 transition-all opacity-50 grayscale hover:opacity-100 hover:grayscale-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`}
                alt={brand.name} 
                className="h-12 w-12 object-contain invert mix-blend-screen" 
              />
              <span className="text-xl font-bold tracking-tight text-white/70 group-hover:text-white">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Platform ── */}
      <GlassStrataSystem />

      {/* ── Use cases ── */}
      <section className="bg-black">
        <div className="mx-auto w-full max-w-[1000px] px-6 py-28 sm:px-10 lg:px-12">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 className="mx-auto mt-4 max-w-[600px] text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl">
              {t("home.possibilities")}
            </h2>
            <p className="mx-auto mt-5 max-w-[600px] text-base leading-7 text-white/60">
              {t("home.possibilities_desc")}
            </p>
          </div>

          {/* List — no cards */}
          <div className="divide-y divide-white/6">
            {useCases.map((item) => (
              <div
                key={item.title}
                className="group grid grid-cols-[100px_1fr] items-start gap-8 py-10 sm:grid-cols-[160px_1fr] sm:gap-12"
              >
                {/* Column 1: Domain */}
                <span className="pt-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                  {item.domain}
                </span>

                {/* Column 2: Content */}
                <div className="flex flex-col">
                  <p className="text-xl font-semibold text-white sm:text-2xl">{item.title}</p>
                  <p className="mt-3 text-base leading-relaxed text-white/60 sm:text-lg">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact Direct ── */}
      <DirectImpact />

      {/* ── Final CTA ── */}
      <section id="contact" className="border-t border-white/6 bg-black">
        <div className="relative mx-auto w-full max-w-[1000px] overflow-hidden px-6 py-32 text-center sm:px-10 lg:px-12">
          <div className="relative">
            <h2 className="mx-auto mt-5 max-w-[700px] text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl">
              {t("home.cta_final")}
            </h2>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <DemoButton
                label={t("nav.book_demo")}
                variant="primary"
                icon={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
