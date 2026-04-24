"use client";

import { useEffect, useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: "FR", label: "Français", flag: "🇫🇷" },
  { code: "EN", label: "English", flag: "🇬🇧" },
];

import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/translations";

export default function LanguageSelector({ position = "top" }: { position?: "top" | "bottom" }) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only auto-detect if no language is saved
    const saved = localStorage.getItem("language");
    if (!saved) {
      const detectLocation = async () => {
        try {
          const response = await fetch("https://ipapi.co/json/");
          const data = await response.json();
          const country = data.country_code;

          if (country === "FR" || country === "BE") {
            setLanguage("FR");
          } else {
            setLanguage("EN");
          }
        } catch (error) {
          console.error("Error detecting location:", error);
          setLanguage("FR");
        }
      };
      detectLocation();
    }
  }, [setLanguage]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white/70 transition-all hover:bg-white/10 hover:text-white"
        aria-label="Select language"
      >
        <Globe className="h-4 w-4" />
        <span className="font-medium">{language}</span>
        <ChevronDown 
          className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            
            <motion.div
              initial={{ opacity: 0, y: position === "top" ? 10 : -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: position === "top" ? 10 : -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`absolute right-0 ${
                position === "top" ? "bottom-full mb-2" : "top-full mt-2"
              } w-32 overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0A]/95 backdrop-blur-xl z-50 shadow-2xl shadow-black/50`}
            >
              <div className="p-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as Language);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      language === lang.code
                        ? "bg-white/10 text-white"
                        : "text-white/50 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="text-base leading-none">{lang.flag}</span>
                    <span className="font-medium">{lang.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
