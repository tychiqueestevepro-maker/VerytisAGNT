import SegmentTemplate from "@/components/SegmentTemplate";

export default function ScaleUpsPage() {
  return (
    <SegmentTemplate
      title="Scale-ups & PME"
      subtitle="Croissance sans friction"
      description="Scalez vos opérations sans multiplier les effectifs. Nos agents absorbent la charge de travail répétitive pour vous laisser vous concentrer sur la croissance et l'innovation."
      benefits={[
        "Réduction drastique des coûts opérationnels liés au scaling.",
        "Traitement 24/7 des flux entrants (leads, commandes, tickets).",
        "Mise en place rapide sans modification de votre stack existante.",
        "Précision constante, même lors de pics d'activité soudains."
      ]}
    />
  );
}
