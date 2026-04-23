import Link from "next/link";

const links = {
  Solutions: [
    { label: "Systèmes IA complets", href: "#solutions" },
    { label: "Automatisation métier", href: "#fonctionnement" },
    { label: "Intégration native", href: "#fonctionnement" },
    { label: "Traitement des données", href: "#cas-usage" },
  ],
  "Cas d'usage": [
    { label: "Acquisition", href: "/cas-d-usage/acquisition" },
    { label: "Opérations", href: "#cas-usage" },
    { label: "Data", href: "#cas-usage" },
    { label: "Support interne", href: "#cas-usage" },
  ],
  Entreprise: [
    { label: "À propos", href: "#solutions" },
    { label: "Contact", href: "#contact" },
  ],
};

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/6 bg-black">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-16 sm:px-10">
        {/* Top row */}
        <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white">
              Verytis
            </Link>
            <p className="max-w-[240px] text-sm leading-6 text-white/38">
              Des systèmes IA conçus pour opérer, pas seulement impressionner.
            </p>
            <a
              href="mailto:contact@verytis.ai"
              className="text-sm text-white/38 transition-colors duration-200 hover:text-white/70"
            >
              contact@verytis.ai
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-white/28">
                {category}
              </p>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/42 transition-colors duration-200 hover:text-white/80"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-3 border-t border-white/6 pt-6 text-xs text-white/24 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Verytis. Architecture IA et automatisation métier.</p>
          <p>Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
