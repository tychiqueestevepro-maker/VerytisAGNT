import SolutionTemplate from "@/components/SolutionTemplate";
import KineticFlow from "@/components/KineticFlow";

export default function AgentEndToEndPage() {
  return (
    <SolutionTemplate
      title="Agent End-to-End"
      subtitle=""
      heroVisual={<KineticFlow />}
      description="L'agent qui prend le relais de A à Z. Plus besoin de surveiller chaque étape : donnez un objectif à votre agent, il s'occupe de l'exécution complète, sans intervention humaine."
      processSteps={[
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
      ]}
      features={[
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
      ]}
    />
  );
}
