"use client";

import SegmentTemplate from "@/components/templates/SegmentTemplate";
import { useLanguage } from "@/context/LanguageContext";

export default function EquipesOpsPage() {
  const { language } = useLanguage();

  const content = {
    FR: {
      title: "Équipes Opérationnelles",
      subtitle: "Libérez vos talents",
      description: "Sales, Support, Logistique : redonnez du temps à vos équipes. L'Agent IA gère l'exécution, vos collaborateurs gèrent la stratégie et les exceptions.",
      benefits: [
        "Suppression des tâches de saisie et de mise à jour manuelle.",
        "Accélération fulgurante du temps de réponse client.",
        "Fiabilisation des flux logistiques et administratifs.",
        "Meilleure satisfaction collaborateur (focus sur l'humain)."
      ]
    },
    EN: {
      title: "Operational Teams",
      subtitle: "Free Your Talents",
      description: "Sales, Support, Logistics: give time back to your teams. The AI Agent handles execution, while your people manage strategy and exceptions.",
      benefits: [
        "Elimination of manual entry and update tasks.",
        "Lightning-fast acceleration of customer response times.",
        "Reliability of logistical and administrative flows.",
        "Improved employee satisfaction (focus on the human element)."
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
