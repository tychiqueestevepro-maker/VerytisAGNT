import SegmentTemplate from "@/components/SegmentTemplate";

export default function DSIDataPage() {
  return (
    <SegmentTemplate
      title="DSI & Directions Data"
      subtitle="Contrôle et Transparence"
      description="Une architecture ouverte, sans effet 'boîte noire'. Nous déployons des agents qui respectent vos standards de sécurité et de gouvernance les plus stricts."
      benefits={[
        "Traçabilité totale de chaque action effectuée par l'agent.",
        "Architecture modulaire facile à auditer et à maintenir.",
        "Intégration via API standardisées et sécurisées.",
        "Déploiement sur-mesure respectant vos contraintes infra."
      ]}
    />
  );
}
