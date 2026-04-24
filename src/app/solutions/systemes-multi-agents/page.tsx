"use client";

import SolutionTemplate from "@/components/templates/SolutionTemplate";
import MultiAgentHero from "@/components/sections/MultiAgentHero";
import { useLanguage } from "@/context/LanguageContext";

export default function MultiAgentsPage() {
  const { language } = useLanguage();

  const content = {
    FR: {
      title: "Systèmes Multi-Agents",
      description: "Une flotte d'agents spécialisés qui collaborent en temps réel. Divisez vos projets complexes en micro-tâches gérées par des experts autonomes sous la supervision d'un agent maître.",
      processSteps: [
        {
          label: "La Stratégie",
          text: "L'agent superviseur analyse le projet, décompose les besoins et définit le rôle précis de chaque agent expert de la flotte."
        },
        {
          label: "La Collaboration",
          text: "Les agents échangent des données et coordonnent leurs actions en parallèle, garantissant une exécution synchronisée sans goulot d'étranglement."
        },
        {
          label: "La Livraison",
          text: "Les résultats individuels sont consolidés, vérifiés et assemblés pour une livraison finale d'une précision chirurgicale."
        }
      ],
      features: [
        {
          title: "Spécialisation Pointue",
          description: "Chaque agent est un expert vertical (Data, Vente, Support). L'association de ces talents crée une force de production sans équivalent.",
          image: "/images/solutions/specialization.png"
        },
        {
          title: "Vitesse Décuplée",
          description: "Grâce au travail en parallèle, vos processus sont exécutés jusqu'à 10 fois plus vite qu'avec un système linéaire classique.",
          image: "/images/solutions/speed.png"
        },
        {
          title: "Intelligence Collective",
          description: "Les agents se supervisent et se corrigent mutuellement, éliminant les erreurs et garantissant une qualité constante.",
          image: "/images/solutions/collective_intelligence.png"
        },
        {
          title: "Scalabilité Infinie",
          description: "Besoin de plus de puissance ? Ajoutez instantanément de nouveaux agents à votre flotte pour absorber toute charge de travail.",
          image: "/images/solutions/scalability.png"
        }
      ],
      cta: "Déployer ma flotte"
    },
    EN: {
      title: "Multi-Agent Systems",
      description: "A fleet of specialized agents collaborating in real-time. Break down your complex projects into micro-tasks managed by autonomous experts under the supervision of a master agent.",
      processSteps: [
        {
          label: "The Strategy",
          text: "The supervisor agent analyzes the project, breaks down the needs, and defines the precise role of each expert agent in the fleet."
        },
        {
          label: "The Collaboration",
          text: "Agents exchange data and coordinate their actions in parallel, ensuring synchronized execution without bottlenecks."
        },
        {
          label: "The Delivery",
          text: "Individual results are consolidated, verified, and assembled for a final delivery with surgical precision."
        }
      ],
      features: [
        {
          title: "Sharp Specialization",
          description: "Each agent is a vertical expert (Data, Sales, Support). The combination of these talents creates an unparalleled production force.",
          image: "/images/solutions/specialization.png"
        },
        {
          title: "Multiplied Speed",
          description: "Thanks to parallel work, your processes are executed up to 10 times faster than with a classic linear system.",
          image: "/images/solutions/speed.png"
        },
        {
          title: "Collective Intelligence",
          description: "Agents supervise and correct each other, eliminating errors and ensuring consistent quality.",
          image: "/images/solutions/collective_intelligence.png"
        },
        {
          title: "Infinite Scalability",
          description: "Need more power? Instantly add new agents to your fleet to absorb any workload.",
          image: "/images/solutions/scalability.png"
        }
      ],
      cta: "Deploy my fleet"
    }
  };

  const c = content[language] || content.FR;

  return (
    <SolutionTemplate
      title={c.title}
      subtitle=""
      heroVisual={<MultiAgentHero />}
      description={c.description}
      processSteps={c.processSteps}
      features={c.features}
      ctaText={c.cta}
    />
  );
}
