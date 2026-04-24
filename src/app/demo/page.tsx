"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function DemoPage() {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [answers, setAnswers] = useState({
    nom: "",
    prenom: "",
    email: "",
    phone: "",
    role: "",
    orgType: "",
    activity: "",
    mainTask: "",
    frequency: "",
    impact: "",
    volume: "",
    intention: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    
    try {
      const response = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...answers, language }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setErrorMsg(data.error || "Une erreur est survenue lors de l'envoi.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setErrorMsg("Erreur de connexion au serveur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const labels = {
    FR: {
      title: "Scalez avec Verytis",
      subtitle: "Rejoignez les équipes qui accélèrent leur déploiement avec Verytis. Réservez une démonstration 1:1 pour commencer.",
      success: "Merci de nous avoir contactés ! Nous reviendrons vers vous très prochainement.",
      firstName: "Prénom*",
      lastName: "Nom*",
      orgType: "Type d'organisation*",
      role: "Rôle / Fonction*",
      email: "Email professionnel*",
      phone: "Téléphone*",
      impactLabel: "Impact actuel de la tâche :*",
      impactOpts: ["Perte de temps importante", "Perte de revenus", "Faible impact"],
      intentionLabel: "Que souhaitez-vous faire ?*",
      intentionOpts: ["Mettre en place une solution rapidement", "Explorer les possibilités", "Juste me renseigner"],
      messagePlaceholder: "Décrivez votre projet en détails (tâches, volume...)*",
      submit: "Envoyer ma demande",
      legal: "En soumettant ce formulaire, vous acceptez que vos informations soient traitées conformément à notre",
      privacy: "politique de confidentialité"
    },
    EN: {
      title: "Scale with Verytis",
      subtitle: "Join the teams accelerating their deployment with Verytis. Book a 1:1 demonstration to get started.",
      success: "Thanks for reaching out! We'll be in touch shortly.",
      firstName: "First Name*",
      lastName: "Last Name*",
      orgType: "Organization Type*",
      role: "Role / Function*",
      email: "Work Email*",
      phone: "Phone*",
      impactLabel: "Current task impact:*",
      impactOpts: ["Significant time loss", "Revenue loss", "Low impact"],
      intentionLabel: "What would you like to do?*",
      intentionOpts: ["Implement a solution quickly", "Explore possibilities", "Just looking for info"],
      messagePlaceholder: "Describe your project in detail (tasks, volume...)*",
      submit: "Send my request",
      legal: "By submitting this form, you agree that your information will be processed in accordance with our",
      privacy: "privacy policy"
    }
  };

  const l = labels[language] || labels.FR;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 lg:p-20 pt-40 pb-20">
      <div className="max-w-[640px] w-full">
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight text-center md:text-left">{l.title}</h1>
        <p className="text-white/60 text-lg mb-12 leading-relaxed text-center md:text-left">
          {l.subtitle}
        </p>

        {errorMsg && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm text-center">
              {errorMsg}
            </p>
          </div>
        )}

        {submitted ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-block px-4 py-2 rounded-lg bg-white/5 border border-white/10 mb-8">
              <p className="text-white/80 font-medium text-sm">
                {l.success}
              </p>
            </div>
            <div className="pt-4">
               <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-white/40 hover:text-white transition-colors group">
                <ArrowRight className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                {t("demo.back_home")}
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                required 
                type="text" 
                placeholder={l.firstName} 
                value={answers.prenom} 
                onChange={e => setAnswers({...answers, prenom: e.target.value})}
                className="w-full bg-[#111] border border-white/10 rounded-lg py-3 px-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all"
              />
              <input 
                required 
                type="text" 
                placeholder={l.lastName} 
                value={answers.nom} 
                onChange={e => setAnswers({...answers, nom: e.target.value})}
                className="w-full bg-[#111] border border-white/10 rounded-lg py-3 px-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                required 
                type="text" 
                placeholder={l.orgType} 
                value={answers.orgType} 
                onChange={e => setAnswers({...answers, orgType: e.target.value})}
                className="w-full bg-[#111] border border-white/10 rounded-lg py-3 px-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all"
              />
              <input 
                required 
                type="text" 
                placeholder={l.role} 
                value={answers.role} 
                onChange={e => setAnswers({...answers, role: e.target.value})}
                className="w-full bg-[#111] border border-white/10 rounded-lg py-3 px-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all"
              />
            </div>

            <input 
              required 
              type="email" 
              placeholder={l.email} 
              value={answers.email} 
              onChange={e => setAnswers({...answers, email: e.target.value})}
              className="w-full bg-[#111] border border-white/10 rounded-lg py-3 px-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all"
            />

            <input 
              required 
              type="tel" 
              placeholder={l.phone} 
              value={answers.phone} 
              onChange={e => setAnswers({...answers, phone: e.target.value.replace(/\D/g, "")})}
              className="w-full bg-[#111] border border-white/10 rounded-lg py-3 px-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all"
            />

            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold text-white/50 uppercase tracking-wider">{l.impactLabel}</p>
              <div className="space-y-2">
                {l.impactOpts.map(opt => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer group w-fit">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="radio" 
                        name="impact" 
                        required 
                        onChange={() => setAnswers({...answers, impact: opt})}
                        className="peer appearance-none w-4 h-4 border border-white/20 rounded-full checked:border-white transition-all"
                      />
                      <div className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-all" />
                    </div>
                    <span className="text-sm text-white/60 group-hover:text-white transition-colors">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold text-white/50 uppercase tracking-wider">{l.intentionLabel}</p>
              <div className="space-y-2">
                {l.intentionOpts.map(opt => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer group w-fit">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="radio" 
                        name="intention" 
                        required 
                        onChange={() => setAnswers({...answers, intention: opt})}
                        className="peer appearance-none w-4 h-4 border border-white/20 rounded transition-all checked:bg-white/20 checked:border-white"
                      />
                      <CheckCircle2 className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-all" />
                    </div>
                    <span className="text-sm text-white/60 group-hover:text-white transition-colors">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <textarea 
              rows={3} 
              placeholder={l.messagePlaceholder} 
              value={answers.message} 
              onChange={e => setAnswers({...answers, message: e.target.value})}
              className="w-full bg-[#111] border border-white/10 rounded-lg py-3 px-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all resize-none"
            />

            <div className="pt-6">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/20 px-10 py-4 text-sm font-bold text-white backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/20 hover:border-white/30 active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {l.submit}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-white/40 leading-relaxed text-center">
              {l.legal} <Link href="/confidentialite" className="text-white/60 hover:text-white underline underline-offset-2">{l.privacy}</Link>.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
