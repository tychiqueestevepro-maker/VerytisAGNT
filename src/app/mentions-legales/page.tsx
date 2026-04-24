"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function MentionsLegalesPage() {
  const { language } = useLanguage();

  const content = {
    FR: {
      title: "Mentions Légales",
      sections: [
        {
          title: "1. Édition du site",
          text: "En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site internet verytis.com l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :",
          details: [
            { label: "Propriétaire du site", value: "Tychique Esteve : For U Agency" },
            { label: "Contact", value: "contact@foruagency.com | 06 65 97 07 86" },
            { label: "Identification de l'entreprise", value: "EI Tychique Esteve : Verytis" },
            { label: "SIREN", value: "978 543 320" },
            { label: "Code APE", value: "62.01Z" },
            { label: "Directeur de la publication", value: "Tychique Esteve" }
          ]
        },
        {
          title: "2. Hébergement",
          text: "Le Site est hébergé par la société Vercel Inc., situé au 340 S Lemon Ave #4133 Walnut, CA 91789, USA.",
          link: { label: "Site web", url: "https://vercel.com" }
        },
        {
          title: "3. Propriété intellectuelle et contrefaçons",
          text: "Tychique Esteve est propriétaire des droits de propriété intellectuelle et détient les droits d'usage sur tous les éléments accessibles sur le site internet, notamment les textes, images, graphismes, logos, vidéos, architecture, icônes et sons.",
          subtext: "Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Tychique Esteve."
        },
        {
          title: "4. Limitations de responsabilité",
          text: "Tychique Esteve ne pourra être tenu pour responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site verytis.com.",
          subtext: "Tychique Esteve décline toute responsabilité quant à l'utilisation qui pourrait être faite des informations et contenus présents sur verytis.com."
        },
        {
          title: "5. CNIL et gestion des données personnelles",
          text: "Conformément aux dispositions de la loi 78-17 du 6 janvier 1978 modifiée, l'utilisateur du site verytis.com dispose d'un droit d'accès, de modification et de suppression des informations collectées. Pour exercer ce droit, envoyez un message à : contact@foruagency.com."
        },
        {
          title: "6. Liens hypertextes et cookies",
          text: "Le site verytis.com contient des liens hypertextes vers d'autres sites et décline toute responsabilité à propos de ces liens externes ou des liens créés par d'autres sites vers verytis.com.",
          subtext: "La navigation sur le site verytis.com est susceptible de provoquer l'installation de cookie(s) sur l'ordinateur de l'utilisateur. Un \"cookie\" est un fichier de petite taille qui enregistre des informations relatives à la navigation d'un utilisateur sur un site."
        }
      ]
    },
    EN: {
      title: "Legal Mentions",
      sections: [
        {
          title: "1. Site Edition",
          text: "Under Article 6 of Law No. 2004-575 of June 21, 2004, for confidence in the digital economy, the identity of the various parties involved in the creation and monitoring of the verytis.com website is specified to users:",
          details: [
            { label: "Site Owner", value: "Tychique Esteve: For U Agency" },
            { label: "Contact", value: "contact@foruagency.com | 06 65 97 07 86" },
            { label: "Company Identification", value: "EI Tychique Esteve: Verytis" },
            { label: "SIREN", value: "978 543 320" },
            { label: "APE Code", value: "62.01Z" },
            { label: "Publication Director", value: "Tychique Esteve" }
          ]
        },
        {
          title: "2. Hosting",
          text: "The Site is hosted by Vercel Inc., located at 340 S Lemon Ave #4133 Walnut, CA 91789, USA.",
          link: { label: "Website", url: "https://vercel.com" }
        },
        {
          title: "3. Intellectual Property and Counterfeiting",
          text: "Tychique Esteve owns the intellectual property rights and holds the usage rights for all elements accessible on the website, including text, images, graphics, logos, videos, architecture, icons, and sounds.",
          subtext: "Any reproduction, representation, modification, publication, or adaptation of all or part of the site's elements, regardless of the means or process used, is prohibited without the prior written authorization of Tychique Esteve."
        },
        {
          title: "4. Limitation of Liability",
          text: "Tychique Esteve cannot be held responsible for direct or indirect damage caused to the user's equipment when accessing the verytis.com site.",
          subtext: "Tychique Esteve declines all responsibility for the use that could be made of the information and content present on verytis.com."
        },
        {
          title: "5. CNIL and Personal Data Management",
          text: "In accordance with the provisions of Law 78-17 of January 6, 1978, as amended, the user of the verytis.com site has the right to access, modify, and delete information collected. To exercise this right, send a message to: contact@foruagency.com."
        },
        {
          title: "6. Hyperlinks and Cookies",
          text: "The verytis.com site contains hyperlinks to other sites and declines all responsibility for these external links or links created by other sites to verytis.com.",
          subtext: "Browsing the verytis.com site is likely to cause the installation of cookie(s) on the user's computer. A \"cookie\" is a small file that records information about a user's browsing on a site."
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
              {section.details && (
                <ul className="mt-4 space-y-2">
                  {section.details.map((detail, j) => (
                    <li key={j}><strong>{detail.label}:</strong> {detail.value}</li>
                  ))}
                </ul>
              )}
              {section.link && (
                <p className="mt-2">
                  {section.link.label}: <a href={section.link.url} className="text-violet-400 hover:underline">{section.link.url}</a>
                </p>
              )}
              {section.subtext && <p className="mt-4">{section.subtext}</p>}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
