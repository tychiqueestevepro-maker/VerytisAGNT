import SegmentTemplate from "@/components/SegmentTemplate";

export default function GrandsGroupesPage() {
  return (
    <SegmentTemplate
      title="Grands Groupes & ETI"
      subtitle="Modernisation agile"
      description="Ajoutez une couche d'intelligence autonome sur vos systèmes existants. Pas de 'rip-and-replace', juste une orchestration fluide de vos flux complexes."
      benefits={[
        "Interconnexion fluide de systèmes legacy isolés.",
        "Automatisation de processus inter-départements complexes.",
        "Respect total de vos normes de sécurité et de conformité.",
        "Réduction des erreurs de saisie et de transfert de données."
      ]}
    />
  );
}
