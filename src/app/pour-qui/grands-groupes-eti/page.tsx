"use client";

import SegmentTemplate from "@/components/templates/SegmentTemplate";
import { useLanguage } from "@/context/LanguageContext";

export default function GrandsGroupesPage() {
  const { language } = useLanguage();

  const content = {
    FR: {
      title: "Grands Groupes & ETI",
      subtitle: "Modernisation agile",
      description: "Ajoutez une couche d'intelligence autonome sur vos systèmes existants. Pas de 'rip-and-replace', juste une orchestration fluide de vos flux complexes.",
      benefits: [
        "Interconnexion fluide de systèmes legacy isolés.",
        "Automatisation de processus inter-départements complexes.",
        "Respect total de vos normes de sécurité et de conformité.",
        "Réduction des erreurs de saisie et de transfert de données."
      ]
    },
    EN: {
      title: "Enterprises & Mid-market",
      subtitle: "Agile Modernization",
      description: "Add a layer of autonomous intelligence over your existing systems. No 'rip-and-replace', just fluid orchestration of your complex flows.",
      benefits: [
        "Fluid interconnection of isolated legacy systems.",
        "Automation of complex inter-departmental processes.",
        "Full compliance with your security and compliance standards.",
        "Reduction of entry and data transfer errors."
      ]
    }
  };

  const c = content[language] || content.FR;

  return (
    <SegmentTemplate
      title={c.title}
      subtitle={c.subtitle}
      description={c.description}
      benefits={c.benefits}
    />
  );
}
