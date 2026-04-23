import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LivingSystemHero from "@/components/LivingSystemHero";
import GlassStrataSystem from "@/components/GlassStrataSystem";
import DirectImpact from "@/components/DirectImpact";

/* ─── DATA ─────────────────────────────────────────────────────────────── */

const integrations = [
  "OpenAI", "Anthropic", "Mistral AI", "Meta",
];



const useCases = [
  {
    domain: "Opérations",
    title: "Pilotage de flux métier",
    description:
      "Capture et distribution automatique de la donnée stratégique. Vos informations circulent sans friction vers les bons points d'exécution, garantissant une réactivité immédiate et une traçabilité totale de chaque décision.",
    href: "/cas-d-usage/operations",
  },
  {
    domain: "Data",
    title: "Traitement documentaire",
    description:
      "Extraction, structuration et archivage intelligent de documents complexes. Vos données brutes deviennent exploitables instantanément, éliminant les erreurs manuelles et accélérant vos cycles de validation.",
    href: "#cas-usage",
  },
  {
    domain: "Opérations",
    title: "Assistants opérationnels",
    description:
      "Agents autonomes dédiés à vos flux métier critiques. Les tâches répétitives sont traitées avec une précision absolue, permettant à vos équipes de se concentrer sur des missions à haute valeur ajoutée.",
    href: "#cas-usage",
  },
  {
    domain: "Interne",
    title: "Automatisations multi-étapes",
    description:
      "Pipelines complexes qui orchestrent plusieurs systèmes en séquence logique. Une seule entrée déclenche une série d'actions coordonnées et vérifiées, assurant la cohérence de votre infrastructure.",
    href: "#cas-usage",
  },
  {
    domain: "Sur-mesure",
    title: "Votre infrastructure dédiée",
    description:
      "Chaque entreprise est unique. Nous ne nous limitons pas à des modèles : nous analysons vos flux spécifiques pour bâtir le système qui s'adapte parfaitement à vos contraintes métier les plus complexes.",
    href: "#contact",
  },
];

const steps = [
  {
    n: "01",
    title: "Analyse des flux entrants",
    body: "Capture des signaux métier et qualification des données entrantes",
  },
  {
    n: "02",
    title: "Traitement contextuel",
    body: "Enrichissement logique, priorisation automatique et application des règles métier",
  },
  {
    n: "03",
    title: "Exécution & Suivi",
    body: "Déclenchement des actions, génération des sorties et suivi continu du système",
  },
];

/* ─── PAGE ──────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <LivingSystemHero />

      {/* ── Integrations marquee ── */}
      <section className="mt-12 border-y border-white/6 bg-black py-16 overflow-hidden">
        <div className="mb-12 text-center">
          <p className="mx-auto max-w-[600px] text-lg font-bold text-white">
            Nous travaillons avec les technologies les plus avancées du marché
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
      <section id="cas-usage" className="bg-black">
        <div className="mx-auto w-full max-w-[1000px] px-6 py-28 sm:px-10 lg:px-12">
          {/* Header */}
          <div className="mb-16 text-center">

            <h2 className="mx-auto mt-4 max-w-[600px] text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl">
              Des possibilités infinies, une exécution sur-mesure
            </h2>
            <p className="mx-auto mt-5 max-w-[600px] text-base leading-7 text-white/60">
              Chaque infrastructure que nous déployons est unique. Voici quelques exemples de flux stratégiques que nous transformons en actifs automatisés.
            </p>
          </div>

          {/* List — no cards */}
          <div className="divide-y divide-white/6">
            {useCases.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group grid grid-cols-[100px_1fr_24px] items-start gap-8 py-10 sm:grid-cols-[160px_1fr_24px] sm:gap-12"
              >
                {/* Column 1: Domain */}
                <span className="pt-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 transition-colors group-hover:text-violet-400/60">
                  {item.domain}
                </span>

                {/* Column 2: Content */}
                <div className="flex flex-col">
                  <p className="text-xl font-semibold text-white sm:text-2xl">{item.title}</p>
                  <p className="mt-3 text-base leading-relaxed text-white/60 sm:text-lg">
                    {item.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-400 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    En savoir plus
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>

                {/* Column 3: Arrow */}
                <div className="flex justify-end pt-2">
                  <ArrowRight className="h-5 w-5 text-white/10 transition-all duration-200 group-hover:text-white/40" />
                </div>
              </Link>
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
              Automatisez vos flux critiques dès aujourd'hui
            </h2>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/offre-devis"
                className="inline-flex items-center justify-center rounded-xl bg-white/10 border border-white/20 px-10 py-4 text-sm font-bold text-white backdrop-blur-md shadow-2xl transition-all duration-300 hover:bg-white/20 active:scale-[0.98]"
              >
                Book demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
