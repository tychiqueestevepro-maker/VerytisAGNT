"use client";

import SolutionTemplate from "@/components/templates/SolutionTemplate";
import DataScannerHero from "@/components/sections/DataScannerHero";
import { useLanguage } from "@/context/LanguageContext";

export default function ExtractionDataPage() {
  const { language } = useLanguage();

  const content = {
    FR: {
      title: "Extraction & Data",
      description: "Transformez vos documents bruts en données exploitables. Nos agents analysent, extraient et structurent l'information de vos emails, PDF et images avec une précision chirurgicale.",
      processSteps: [
        {
          label: "L'Analyse",
          text: "L'agent parcourt le document, comprend le contexte sémantique et identifie les champs de données critiques."
        },
        {
          label: "L'Extraction",
          text: "Chaque donnée est capturée avec précision, quel que soit le format ou la complexité du document source."
        },
        {
          label: "La Structuration",
          text: "L'information est formatée selon vos besoins (JSON, Excel, CRM) et prête à être injectée dans vos systèmes."
        }
      ],
      features: [
        {
          title: "Précision 100%",
          description: "Grâce à notre technologie de deep-parsing, aucune donnée n'est oubliée ou mal interprétée.",
          image: "/images/solutions/data_parsing.png"
        },
        {
          title: "Intelligence Documentaire",
          description: "L'agent comprend le sens des mots, pas seulement leur position. Il traite les factures, contrats et formulaires complexes.",
          image: "/images/solutions/document_intelligence.png"
        },
        {
          title: "Sortie Structurée",
          description: "Recevez vos données dans le format exact dont vous avez besoin pour vos automatisations futures.",
          image: "/images/solutions/structured_output.png"
        },
        {
          title: "Traitement Temps Réel",
          description: "Dès qu'un document arrive, il est traité instantanément. Éliminez les délais de saisie manuelle.",
          image: "/images/solutions/data_speed.png"
        }
      ],
      cta: "Extraire mes données"
    },
    EN: {
      title: "Extraction & Data",
      description: "Transform your raw documents into actionable data. Our agents analyze, extract, and structure information from your emails, PDFs, and images with surgical precision.",
      processSteps: [
        {
          label: "The Analysis",
          text: "The agent scans the document, understands the semantic context, and identifies critical data fields."
        },
        {
          label: "The Extraction",
          text: "Every data point is captured with precision, regardless of the format or complexity of the source document."
        },
        {
          label: "The Structuring",
          text: "Information is formatted according to your needs (JSON, Excel, CRM) and ready to be injected into your systems."
        }
      ],
      features: [
        {
          title: "100% Precision",
          description: "Thanks to our deep-parsing technology, no data is forgotten or misinterpreted.",
          image: "/images/solutions/data_parsing.png"
        },
        {
          title: "Document Intelligence",
          description: "The agent understands the meaning of words, not just their position. It processes complex invoices, contracts, and forms.",
          image: "/images/solutions/document_intelligence.png"
        },
        {
          title: "Structured Output",
          description: "Receive your data in the exact format you need for your future automations.",
          image: "/images/solutions/structured_output.png"
        },
        {
          title: "Real-time Processing",
          description: "As soon as a document arrives, it is processed instantly. Eliminate manual entry delays.",
          image: "/images/solutions/data_speed.png"
        }
      ],
      cta: "Extract my data"
    }
  };

  const c = content[language] || content.FR;

  return (
    <SolutionTemplate
      title={c.title}
      subtitle=""
      heroVisual={<DataScannerHero />}
      description={c.description}
      processSteps={c.processSteps}
      features={c.features}
      ctaText={c.cta}
    />
  );
}
