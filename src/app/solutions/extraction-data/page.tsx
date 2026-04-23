import SolutionTemplate from "@/components/SolutionTemplate";

export default function ExtractionDataPage() {
  return (
    <SolutionTemplate
      title="Extraction & Data"
      subtitle=""
      description="Transformez le chaos de vos documents en informations exploitables. Nos agents lisent, comprennent et classent vos fichiers avec une vitesse et une précision surhumaines."
      processSteps={[
        {
          label: "Capture",
          text: "L'agent récupère vos documents : factures, contrats, emails ou rapports, quel que soit leur format."
        },
        {
          label: "Analyse",
          text: "Grâce à une compréhension contextuelle, il extrait les données clés et détecte les anomalies éventuelles."
        },
        {
          label: "Synchronisation",
          text: "Les données propres sont injectées directement dans vos outils (CRM, Excel, ERP) sans saisie manuelle."
        }
      ]}
      features={[
        {
          title: "Zéro Saisie Manuelle",
          description: "Libérez vos équipes des tâches répétitives d'entrée de données pour les concentrer sur l'analyse."
        },
        {
          title: "Lecture Multi-Format",
          description: "PDF scannés, photos, textes manuscrits ou emails complexes : rien n'échappe à l'œil de l'agent."
        },
        {
          title: "Précision Chirurgicale",
          description: "Éliminez les erreurs de frappe et les oublis grâce à une vérification croisée automatique des informations."
        },
        {
          title: "Recherche Instantanée",
          description: "Retrouvez n'importe quelle information cachée dans des milliers de pages en quelques secondes."
        }
      ]}
    />
  );
}
