import SegmentTemplate from "@/components/SegmentTemplate";

export default function EquipesOpsPage() {
  return (
    <SegmentTemplate
      title="Équipes Opérationnelles"
      subtitle="Libérez vos talents"
      description="Sales, Support, Logistique : redonnez du temps à vos équipes. L'Agent IA gère l'exécution, vos collaborateurs gèrent la stratégie et les exceptions."
      benefits={[
        "Suppression des tâches de saisie et de mise à jour manuelle.",
        "Accélération fulgurante du temps de réponse client.",
        "Fiabilisation des flux logistiques et administratifs.",
        "Meilleure satisfaction collaborateur (focus sur l'humain)."
      ]}
    />
  );
}
