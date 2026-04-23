import SolutionTemplate from "@/components/SolutionTemplate";

export default function MultiAgentsPage() {
  return (
    <SolutionTemplate
      title="Systèmes Multi-Agents"
      subtitle=""
      description="Pourquoi se contenter d'un seul agent quand vous pouvez avoir une équipe ? Nous déployons des écosystèmes où plusieurs agents collaborent en harmonie pour gérer vos projets les plus complexes."
      processSteps={[
        {
          label: "Coordination",
          text: "Un agent 'chef d'orchestre' reçoit votre demande et la décompose en plusieurs missions spécifiques."
        },
        {
          label: "Collaboration",
          text: "Chaque agent expert réalise sa part du travail et échange ses résultats avec les autres en temps réel."
        },
        {
          label: "Livraison Globale",
          text: "Les travaux sont fusionnés et vérifiés pour vous livrer une solution complète et cohérente."
        }
      ]}
      features={[
        {
          title: "Intelligence Collective",
          description: "Chaque agent est spécialisé (Vente, Juridique, Technique), garantissant une expertise pointue sur chaque facette de votre projet."
        },
        {
          title: "Résolution de Problèmes",
          description: "Les agents débattent et vérifient mutuellement leurs résultats pour éliminer les erreurs de jugement."
        },
        {
          title: "Puissance de Frappe",
          description: "Traitez des volumes de travail massifs en faisant travailler des dizaines d'agents en parallèle sans perte de qualité."
        },
        {
          title: "Flexibilité Totale",
          description: "Votre équipe virtuelle s'agrandit ou se réduit instantanément selon vos besoins du moment."
        }
      ]}
    />
  );
}
