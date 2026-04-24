"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import DemoButton from "@/components/ui/DemoButton";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ArrowRight
} from "lucide-react";

interface DropdownItem {
  label: string;
  description: string;
  href: string;
}

interface NavDropdown {
  label: string;
  items: DropdownItem[];
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M2 3.5l3.5 3.5 3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SiteHeader() {
  const { t } = useLanguage();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Define HREFs mapping
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
    ...item,
    href: solutionsHrefs[i]
  }));

  const translatedForWho = t("nav.for_who_items").map((item: any, i: number) => ({
    ...item,
    href: forWhoHrefs[i]
  }));

  const navDropdowns: NavDropdown[] = [
    {
      label: t("nav.solutions"),
      items: translatedSolutions,
    },
    {
      label: t("nav.for_who"),
      items: translatedForWho,
    },
  ];

  const simpleLinks = [{ href: "/fonctionnement", label: t("nav.how_it_works") }];

  const openDropdown = (label: string) => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setActiveDropdown(label);
  };

  const scheduleClose = () => {
    leaveTimerRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6 sm:px-10">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white">
          Verytis
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {/* Main Dropdowns */}
          {navDropdowns.map((dropdown) => (
            <div
              key={dropdown.label}
              className="relative"
              onMouseEnter={() => openDropdown(dropdown.label)}
              onMouseLeave={scheduleClose}
            >
              <button className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm text-white/58 transition-colors duration-200 hover:text-white">
                {dropdown.label}
                <ChevronIcon open={activeDropdown === dropdown.label} />
              </button>

              <div
                className={`absolute left-1/2 top-full -translate-x-1/2 pt-2 transition-all duration-200 ${
                  activeDropdown === dropdown.label
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1.5 opacity-0"
                }`}
                onMouseEnter={() => openDropdown(dropdown.label)}
                onMouseLeave={scheduleClose}
              >
                <div className={`${dropdown.label === t("nav.for_who") ? "min-w-[540px]" : "min-w-[320px]"} overflow-hidden rounded-none border border-white/10 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.9)]`}>
                  <div className="p-2">
                    <div className={`grid gap-1 ${dropdown.label === t("nav.for_who") ? "grid-cols-2" : "grid-cols-1"}`}>
                      {dropdown.items.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="flex items-start gap-4 rounded-none px-4 py-3.5 transition-all duration-200 hover:bg-white/[0.04] group"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold text-white transition-colors group-hover:text-violet-400">{item.label}</span>
                            <span className="text-[11px] leading-relaxed text-white/30 group-hover:text-white/50">{item.description}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white/[0.03] px-6 py-5 border-t border-white/5">
                    <div className={`flex items-center justify-between gap-6 ${dropdown.label === t("nav.for_who") ? "flex-row" : "flex-col gap-4 text-center"}`}>
                      <p className="text-xs text-white/40">
                        {t("nav.custom_needs")}
                      </p>
                      <Link 
                        href="/demo" 
                        className="group/cta flex items-center justify-center gap-2 text-xs font-bold text-violet-400 transition-all hover:text-violet-300"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {t("nav.book_demo")}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Simple Links */}
          {simpleLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2.5 text-sm text-white/58 transition-colors duration-200 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <DemoButton
            label={t("nav.book_demo")}
            variant="primary"
            className="!hidden !rounded-xl !bg-white/10 !border !border-white/20 !px-5 !py-2 !text-sm md:!inline-flex"
          />

          <button
            className="flex h-9 w-9 items-center justify-center text-white/58 hover:text-white md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/8 bg-black md:hidden">
          <div className="px-6 py-6 overflow-y-auto max-h-[80vh]">
            {navDropdowns.map((dropdown) => (
              <div key={dropdown.label} className="mb-4">
                <button
                  className="flex w-full items-center justify-between py-2 text-xs font-bold uppercase tracking-widest text-white/30"
                  onClick={() =>
                    setMobileExpanded(mobileExpanded === dropdown.label ? null : dropdown.label)
                  }
                >
                  {dropdown.label}
                  <ChevronIcon open={mobileExpanded === dropdown.label} />
                </button>
                <div className={`mt-2 flex flex-col gap-1 transition-all ${mobileExpanded === dropdown.label ? "block" : "hidden"}`}>
                  {dropdown.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-4 rounded-none py-3"
                      onClick={() => setMobileOpen(false)}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium text-white">{item.label}</span>
                        <span className="text-[10px] text-white/30">{item.description}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-8 flex flex-col gap-4">
              {simpleLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <DemoButton
                label={t("nav.book_demo")}
                variant="primary"
                className="mt-4 !block !w-full !rounded-none !border !border-white/20 !bg-white/10 !px-4 !py-4 !text-center"
                onClick={() => setMobileOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
