"use client";

import Link from "next/link";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";

export default function SiteFooter() {
  const { t } = useLanguage();

  const solutionsHrefs = [
    "/solutions/agent-end-to-end",
    "/solutions/systemes-multi-agents",
    "/solutions/extraction-data",
    "/solutions/infrastructure-connecteurs"
  ];
  const forWhoHrefs = [
    "/pour-qui/scale-ups-pme",
    "/pour-qui/grands-groupes-eti",
    "/pour-qui/equipes-operationnelles",
    "/pour-qui/dsi-data"
  ];

  const translatedSolutions = t("nav.solutions_items").map((item: any, i: number) => ({
    label: item.label,
    href: solutionsHrefs[i]
  }));

  const translatedForWho = t("nav.for_who_items").map((item: any, i: number) => ({
    label: item.label,
    href: forWhoHrefs[i]
  }));

  const categories = [
    { title: t("footer.categories.solutions"), items: translatedSolutions },
    { title: t("footer.categories.for_who"), items: translatedForWho },
    { title: t("footer.categories.functioning"), items: t("footer.functioning_items") },
    { title: t("footer.categories.legal"), items: t("footer.legal_items") },
  ];

  return (
    <footer className="border-t border-white/6 bg-black">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-16 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white">
              Verytis
            </Link>

            <p className="text-sm text-white/38">
              {t("footer.brand_desc")}
            </p>

            <a
              href="mailto:contact@verytis.com"
              className="text-sm text-white/38 transition-colors duration-200 hover:text-white/70"
            >
              contact@verytis.com
            </a>
          </div>

          {categories.map((cat) => (
            <div key={cat.title}>
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-white/28">
                {cat.title}
              </p>
              <ul className="flex flex-col gap-3">
                {cat.items.map((item: any) => (
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

        <div className="mt-16 flex flex-col gap-6 border-t border-white/6 pt-6 text-xs text-white/24 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
            <p>© 2026 Verytis. {t("footer.brand_desc")}</p>
            <p>{t("footer.rights")}</p>
          </div>
          
          <div className="flex items-center">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </footer>
  );
}
