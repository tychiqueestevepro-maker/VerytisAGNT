"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function CookiesPage() {
  const { language } = useLanguage();

  const content = {
    FR: {
      title: "Politique de Cookies",
      sections: [
        {
          title: "1. Engagement de Confidentialité",
          text: "Chez Verytis, nous croyons en une technologie performante qui respecte la vie privée. Contrairement à la majorité des sites web, notre plateforme est conçue pour fonctionner sans cookies de suivi, de publicité ou d'analyse comportementale."
        },
        {
          title: "2. Absence de cookies tiers",
          text: "Nous n'utilisons aucun outil de tracking tiers (Google Analytics, Facebook Pixel, etc.) qui nécessiterait votre consentement préalable. Votre navigation est totalement anonyme et vos données ne sont jamais partagées avec des régies publicitaires."
        },
        {
          title: "3. Cookies techniques et essentiels",
          text: "Seuls des cookies \"techniques\", strictement nécessaires au bon fonctionnement du site (comme la sécurité ou le chargement des polices de caractères hébergées localement), peuvent être déposés par votre navigateur ou notre infrastructure d'hébergement. Ces cookies ne collectent aucune donnée personnelle."
        },
        {
          title: "4. Services externes",
          text: "Si vous utilisez certains de nos outils interactifs (comme le formulaire de diagnostic ou la prise de rendez-vous), ces services tiers peuvent occasionnellement déposer des cookies fonctionnels nécessaires à leur propre exécution. Nous vous invitons à consulter leurs politiques de confidentialité respectives lors de leur utilisation."
        },
        {
          title: "5. Gestion de vos préférences",
          text: "Bien que nous n'utilisions pas de cookies de suivi, vous pouvez configurer votre navigateur pour bloquer tout type de cookie. Notez cependant que cela pourrait dégrader certaines fonctionnalités interactives du site."
        }
      ]
    },
    EN: {
      title: "Cookie Policy",
      sections: [
        {
          title: "1. Privacy Commitment",
          text: "At Verytis, we believe in high-performance technology that respects privacy. Unlike most websites, our platform is designed to function without tracking, advertising, or behavioral analysis cookies."
        },
        {
          title: "2. Absence of Third-Party Cookies",
          text: "We do not use any third-party tracking tools (Google Analytics, Facebook Pixel, etc.) that would require your prior consent. Your browsing is completely anonymous, and your data is never shared with advertising agencies."
        },
        {
          title: "3. Technical and Essential Cookies",
          text: "Only \"technical\" cookies, strictly necessary for the proper functioning of the site (such as security or loading locally hosted fonts), may be placed by your browser or our hosting infrastructure. These cookies do not collect any personal data."
        },
        {
          title: "4. External Services",
          text: "If you use some of our interactive tools (such as the diagnostic form or appointment booking), these third-party services may occasionally place functional cookies necessary for their own execution. We invite you to consult their respective privacy policies when using them."
        },
        {
          title: "5. Managing Your Preferences",
          text: "Although we do not use tracking cookies, you can configure your browser to block any type of cookie. Note, however, that this could degrade some interactive features of the site."
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
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
