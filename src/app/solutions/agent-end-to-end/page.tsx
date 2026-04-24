"use client";

import SolutionTemplate from "@/components/templates/SolutionTemplate";
import KineticFlow from "@/components/visuals/KineticFlow";
import { useLanguage } from "@/context/LanguageContext";

export default function AgentEndToEndPage() {
  const { language } = useLanguage();

  const content = {
    FR: {
      title: "Agent End-to-End",
      description: "L'agent qui prend le relais de A à Z. Plus besoin de surveiller chaque étape : donnez un objectif à votre agent, il s'occupe de l'exécution complète, sans intervention humaine.",
      processSteps: [
        {
          label: "La Mission",
          text: "Vous définissez l'objectif final. L'agent comprend le contexte métier et les règles à respecter."
        },
        {
          label: "L'Action",
          text: "L'agent navigue dans vos outils, traite les informations et exécute les tâches de manière autonome."
        },
        {
          label: "Le Résultat",
          text: "Le flux est complété avec une précision de 100%. Vous êtes notifié du succès de l'opération."
        }
      ],
      features: [
        {
          title: "Zéro Surveillance",
          description: "L'agent gère les imprévus et ne vous sollicite qu'en cas d'exception majeure. Vous gagnez un temps précieux.",
          image: "/images/solutions/zero_surveillance.png"
        },
        {
          title: "Intégration Directe",
          description: "Il utilise vos logiciels actuels (CRM, ERP, Emails) exactement comme un collaborateur humain le ferait.",
          image: "/images/solutions/direct_integration.png"
        },
        {
          title: "Fiabilité Absolue",
          description: "Chaque action est vérifiée. Contrairement à un humain, l'agent ne connaît ni la fatigue ni l'inattention.",
          image: "/images/solutions/absolute_reliability.png"
        },
        {
          title: "Disponibilité 24/7",
          description: "Vos processus critiques continuent de tourner jour et nuit, garantissant une réactivité instantanée.",
          image: "/images/solutions/availability_247.png"
        }
      ],
      cta: "Démarrer mon projet"
    },
    EN: {
      title: "End-to-End Agent",
      description: "The agent that takes over from A to Z. No more need to monitor every step: give your agent an objective, it handles the complete execution, without human intervention.",
      processSteps: [
        {
          label: "The Mission",
          text: "You define the final goal. The agent understands the business context and the rules to follow."
        },
        {
          label: "The Action",
          text: "The agent navigates your tools, processes information, and executes tasks autonomously."
        },
        {
          label: "The Result",
          text: "The flow is completed with 100% precision. You are notified of the operation's success."
        }
      ],
      features: [
        {
          title: "Zero Monitoring",
          description: "The agent handles unexpected events and only requests your input for major exceptions. You save valuable time.",
          image: "/images/solutions/zero_surveillance.png"
        },
        {
          title: "Direct Integration",
          description: "It uses your current software (CRM, ERP, Emails) exactly as a human employee would.",
          image: "/images/solutions/direct_integration.png"
        },
        {
          title: "Absolute Reliability",
          description: "Every action is verified. Unlike a human, the agent knows neither fatigue nor inattention.",
          image: "/images/solutions/absolute_reliability.png"
        },
        {
          title: "24/7 Availability",
          description: "Your critical processes keep running day and night, ensuring instant responsiveness.",
          image: "/images/solutions/availability_247.png"
        }
      ],
      cta: "Start my project"
    }
  };

  const c = content[language] || content.FR;

  return (
    <SolutionTemplate
      title={c.title}
      subtitle=""
      heroVisual={<KineticFlow />}
      description={c.description}
      processSteps={c.processSteps}
      features={c.features}
      ctaText={c.cta}
    />
  );
}
