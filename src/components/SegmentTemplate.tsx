import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SegmentTemplateProps {
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  ctaText?: string;
}

export default function SegmentTemplate({
  title,
  subtitle,
  description,
  benefits,
  ctaText = "Book demo",
}: SegmentTemplateProps) {
  return (
    <div className="bg-black min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
        <div className="mb-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-violet-500/70">
            {subtitle}
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl mt-4 leading-[1.1]">
            {title}
          </h1>
          <p className="mt-8 text-xl text-white/60 leading-relaxed max-w-2xl">
            {description}
          </p>
          <div className="mt-10">
            <Link
              href="/offre-devis"
              className="inline-flex items-center justify-center rounded-xl bg-white/10 border border-white/20 px-10 py-4 text-sm font-bold text-white backdrop-blur-md shadow-2xl transition-all duration-300 hover:bg-white/20 active:scale-[0.98]"
            >
              {ctaText}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 border-t border-white/5 pt-20">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">Pourquoi choisir Verytis ?</h2>
            <p className="text-white/50 leading-relaxed">
              Nos agents ne sont pas de simples chatbots. Ce sont des travailleurs numériques autonomes conçus pour s'intégrer à votre infrastructure existante et exécuter des tâches complexes avec une précision absolue.
            </p>
          </div>
          <div className="space-y-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,1)]" />
                <p className="text-white/70 text-base">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
