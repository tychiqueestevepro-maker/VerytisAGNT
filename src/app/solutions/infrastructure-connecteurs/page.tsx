"use client";

import SolutionTemplate from "@/components/templates/SolutionTemplate";
import InfrastructureHero from "@/components/sections/InfrastructureHero";
import IntegrationArch from "@/components/visuals/IntegrationArch";
import { useLanguage } from "@/context/LanguageContext";

export default function InfrastructurePage() {
  const { language } = useLanguage();

  const content = {
    FR: {
      title: "Infrastructure & Connecteurs",
      description: "Connectez vos agents à l'ensemble de votre stack logicielle. Une infrastructure robuste et sécurisée pour synchroniser vos données et automatiser vos actions sur tous vos outils métier.",
      processSteps: [
        {
          label: "La Connexion",
          text: "Authentification sécurisée et liaison directe avec vos applications via API ou interface utilisateur."
        },
        {
          label: "La Synchronisation",
          text: "Mise à jour bidirectionnelle des données en temps réel pour garantir une cohérence parfaite entre vos outils."
        },
        {
          label: "L'Exécution",
          text: "Déclenchement d'actions automatiques (envoi d'emails, mise à jour CRM, création de documents) sans friction."
        }
      ],
      cta: "Bâtir mon infrastructure"
    },
    EN: {
      title: "Infrastructure & Connectors",
      description: "Connect your agents to your entire software stack. A robust and secure infrastructure to synchronize your data and automate your actions across all your business tools.",
      processSteps: [
        {
          label: "The Connection",
          text: "Secure authentication and direct linking with your applications via API or user interface."
        },
        {
          label: "The Synchronization",
          text: "Real-time bidirectional data updates to ensure perfect consistency between your tools."
        },
        {
          label: "The Execution",
          text: "Triggering automatic actions (sending emails, updating CRM, creating documents) without friction."
        }
      ],
      cta: "Build my infrastructure"
    }
  };

  const c = content[language] || content.FR;

  return (
    <SolutionTemplate
      title={c.title}
      subtitle=""
      heroVisual={<InfrastructureHero />}
      description={c.description}
      processSteps={c.processSteps}
      ctaText={c.cta}
      footerSection={<IntegrationArch />}
    />
  );
}
