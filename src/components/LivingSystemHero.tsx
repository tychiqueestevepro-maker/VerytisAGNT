import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MeshGradient from "@/components/MeshGradient";

export default function LivingSystemHero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-start justify-end overflow-hidden bg-black">

      {/* WebGL 3D Liquid Mesh Gradient */}
      <MeshGradient />

      {/* Radial vignette — darkens edges, text stays readable */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 46%, transparent 25%, rgba(0,0,0,0.45) 65%, rgba(0,0,0,0.82) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom fade to black (matches rest of page) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-b from-transparent to-black" aria-hidden="true" />

      {/* ── Content ── */}
      <div className="relative z-10 flex w-full flex-col items-start px-6 pb-32 pt-36 text-left sm:px-12 lg:px-24">
        <div className="flex max-w-[900px] flex-col items-start">



          {/* Headline */}
          <h1 className="text-[2.6rem] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[3.4rem] lg:text-[4.2rem]">
            Automatisez votre activité sans complexité
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-[540px] text-lg leading-8 text-white/70">
            Des systèmes qui organisent, traitent et exécutent pour vous
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
            <Link
              href="/offre-devis"
              className="inline-flex items-center justify-center rounded-xl bg-white/10 border border-white/20 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/20 hover:border-white/30 active:scale-[0.98]"
            >
              Book demo
            </Link>
            <Link
              href="#solutions"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-8 py-3.5 text-sm font-medium text-white/60 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.05] hover:text-white"
            >
              Voir les solutions
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
