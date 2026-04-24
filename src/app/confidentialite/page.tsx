"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function ConfidentialitePage() {
  const { language } = useLanguage();

  const content = {
    FR: {
      title: "Politique de Confidentialité",
      sections: [
        {
          title: "1. Collecte de l'information",
          text: "Nous recueillons des informations lorsque vous utilisez notre formulaire de contact ou de demande de devis. Les informations recueillies incluent votre nom, votre adresse e-mail et toute autre information que vous choisissez de nous communiquer."
        },
        {
          title: "2. Utilisation des informations",
          text: "Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :",
          list: [
            "Personnaliser votre expérience et répondre à vos besoins individuels",
            "Fournir un contenu publicitaire personnalisé",
            "Améliorer notre site Web",
            "Améliorer le service client et vos besoins de prise en charge",
            "Vous contacter par e-mail"
          ]
        },
        {
          title: "3. Confidentialité du commerce en ligne",
          text: "Nous sommes les seuls propriétaires des informations collectées sur ce site. Vos informations personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société pour n'importe quelle raison, sans votre consentement."
        },
        {
          title: "4. Divulgation à des tiers",
          text: "Nous ne vendons, n'échangeons et ne transférons pas vos informations personnelles identifiables à des tiers. Cela ne comprend pas les tierce parties de confiance qui nous aident à exploiter notre site Web ou à mener nos affaires, tant que ces parties conviennent de garder ces informations confidentielles."
        },
        {
          title: "5. Protection des informations",
          text: "Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations sensibles transmises en ligne. Nous protégeons également vos informations hors ligne."
        },
        {
          title: "6. Consentement",
          text: "En utilisant notre site, vous consentez à notre politique de confidentialité."
        }
      ]
    },
    EN: {
      title: "Privacy Policy",
      sections: [
        {
          title: "1. Information Collection",
          text: "We collect information when you use our contact form or request a quote. The information collected includes your name, email address, and any other information you choose to provide."
        },
        {
          title: "2. Information Use",
          text: "Any information we collect from you may be used to:",
          list: [
            "Personalize your experience and meet your individual needs",
            "Provide personalized advertising content",
            "Improve our website",
            "Improve customer service and your support needs",
            "Contact you by email"
          ]
        },
        {
          title: "3. E-commerce Privacy",
          text: "We are the sole owners of the information collected on this site. Your personal information will not be sold, exchanged, transferred, or given to another company for any reason without your consent."
        },
        {
          title: "4. Third-Party Disclosure",
          text: "We do not sell, trade, or otherwise transfer your personally identifiable information to third parties. This does not include trusted third parties who assist us in operating our website or conducting our business, so long as those parties agree to keep this information confidential."
        },
        {
          title: "5. Information Protection",
          text: "We implement a variety of security measures to maintain the safety of your personal information. We use state-of-the-art encryption to protect sensitive information transmitted online. We also protect your information offline."
        },
        {
          title: "6. Consent",
          text: "By using our site, you consent to our privacy policy."
        }
      ]
    }
  };

  const c = content[language] || content.FR;

  return (
    <div className="bg-black min-h-screen text-white pt-40 pb-24 selection:bg-violet-500/30">
      <div className="mx-auto max-w-[800px] px-6 sm:px-10">
        <h1 className="text-4xl font-semibold tracking-tight mb-12">{c.title}</h1>
        
        <div className="space-y-12 text-white/60 leading-relaxed font-light">
          {c.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-xl font-medium text-white mb-4">{section.title}</h2>
              <p>{section.text}</p>
              {section.list && (
                <ul className="mt-4 list-disc list-inside space-y-2">
                  {section.list.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
