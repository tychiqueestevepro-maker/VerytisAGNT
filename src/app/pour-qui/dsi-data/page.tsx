"use client";

import SegmentTemplate from "@/components/templates/SegmentTemplate";
import { useLanguage } from "@/context/LanguageContext";

export default function DSIDataPage() {
  const { language } = useLanguage();

  const content = {
    FR: {
      title: "DSI & Directions Data",
      subtitle: "Contrôle et Transparence",
      description: "Une architecture ouverte, sans effet 'boîte noire'. Nous déployons des agents qui respectent vos standards de sécurité et de gouvernance les plus stricts.",
      benefits: [
        "Traçabilité totale de chaque action effectuée par l'agent.",
        "Architecture modulaire facile à auditer et à maintenir.",
        "Intégration via API standardisées et sécurisées.",
        "Déploiement sur-mesure respectant vos contraintes infra."
      ]
    },
    EN: {
      title: "IT & Data Departments",
      subtitle: "Control and Transparency",
      description: "An open architecture, no 'black box' effect. We deploy agents that respect your strictest security and governance standards.",
      benefits: [
        "Full traceability of every action performed by the agent.",
        "Modular architecture that is easy to audit and maintain.",
        "Integration via standardized and secure APIs.",
        "Tailor-made deployment respecting your infra constraints."
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
