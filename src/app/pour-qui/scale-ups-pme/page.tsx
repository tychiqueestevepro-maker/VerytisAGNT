"use client";

import SegmentTemplate from "@/components/templates/SegmentTemplate";
import { useLanguage } from "@/context/LanguageContext";

export default function ScaleUpsPage() {
  const { language } = useLanguage();

  const content = {
    FR: {
      title: "Scale-ups & PME",
      subtitle: "Croissance sans friction",
      description: "Scalez vos opérations sans multiplier les effectifs. Nos agents absorbent la charge de travail répétitive pour vous laisser vous concentrer sur la croissance et l'innovation.",
      benefits: [
        "Réduction drastique des coûts opérationnels liés au scaling.",
        "Traitement 24/7 des flux entrants (leads, commandes, tickets).",
        "Mise en place rapide sans modification de votre stack existante.",
        "Précision constante, même lors de pics d'activité soudains."
      ]
    },
    EN: {
      title: "Scale-ups & SMEs",
      subtitle: "Frictionless Growth",
      description: "Scale your operations without multiplying headcount. Our agents absorb repetitive workloads so you can focus on growth and innovation.",
      benefits: [
        "Drastic reduction in operational costs related to scaling.",
        "24/7 processing of incoming flows (leads, orders, tickets).",
        "Rapid implementation without modifying your existing stack.",
        "Consistent precision, even during sudden activity peaks."
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
