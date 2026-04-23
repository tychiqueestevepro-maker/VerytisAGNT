import SolutionTemplate from "@/components/SolutionTemplate";

export default function InfrastructurePage() {
  return (
    <SolutionTemplate
      title="Infrastructure & Connecteurs"
      subtitle=""
      description="Une IA n'est utile que si elle peut agir. Nous construisons les ponts sécurisés qui permettent à vos agents de 'parler' et d'agir directement sur vos logiciels métiers existants."
      processSteps={[
        {
          label: "Interconnexion",
          text: "Nous relions vos outils (Salesforce, Hubspot, SAP, etc.) à notre infrastructure sécurisée."
        },
        {
          label: "Fluidité",
          text: "Les informations circulent instantanément et sans erreur entre vos différents systèmes."
        },
        {
          label: "Gouvernance",
          text: "Vous contrôlez qui fait quoi. Chaque action de l'agent est tracée et soumise à vos règles de sécurité."
        }
      ]}
      features={[
        {
          title: "Compatibilité Totale",
          description: "Qu'il s'agisse d'un logiciel moderne ou d'un système ancien (Legacy), nos connecteurs s'adaptent partout."
        },
        {
          title: "Sécurité de Grade Bancaire",
          description: "Vos données restent chez vous. Nous utilisons les protocoles de chiffrement les plus stricts du marché."
        },
        {
          title: "Temps Réel",
          description: "Plus de décalage. L'agent réagit à une information dès qu'elle apparaît dans l'un de vos logiciels."
        },
        {
          title: "Scalabilité",
          description: "Une infrastructure conçue pour supporter des milliers d'actions simultanées sans ralentissement."
        }
      ]}
    />
  );
}
