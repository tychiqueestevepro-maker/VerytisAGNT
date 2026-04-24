"use client";

import { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { X, ArrowRight, ArrowLeft, Building2, Zap, Clock, User, Mail, CheckCircle2, Phone, Briefcase, Activity, Target, MessageSquare } from "lucide-react";

interface DiagnosticModalProps {
  open: boolean;
  onClose: () => void;
}

type QuestionStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export default function DemoModal({ open, onClose }: DiagnosticModalProps) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<QuestionStep>(1);
  const [answers, setAnswers] = useState({
    // Step 1
    nom: "",
    prenom: "",
    email: "",
    phone: "",
    role: "",
    // Step 2
    orgType: "",
    activity: "",
    // Step 3
    mainTask: "",
    frequency: "",
    // Step 4
    impact: "",
    volume: "",
    // Step 5
    intention: "",
    // Step 6
    message: "",
  });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      // Reset state on close after animation
      setTimeout(() => {
        setStep(1);
        setAnswers({
          nom: "", prenom: "", email: "", phone: "", role: "",
          orgType: "", activity: "",
          mainTask: "", frequency: "",
          impact: "", volume: "",
          intention: "",
          message: "",
        });
      }, 300);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  const nextStep = () => {
    setStep(prev => (prev + 1) as QuestionStep);
  };

  const prevStep = () => {
    setStep(prev => (prev - 1) as QuestionStep);
  };

  const handleOptionSelect = (field: keyof typeof answers, value: string, autoNext = true) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    if (autoNext) {
      setTimeout(() => {
        nextStep();
      }, 300);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });

      if (response.ok) {
        setStep(7); // Success Step
      } else {
        console.error("Erreur lors de la soumission du diagnostic");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] grid place-items-center p-4 sm:p-6"
      style={{ animation: "diagFadeIn 0.2s ease-out both" }}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="relative z-10 w-full max-w-2xl overflow-y-auto max-h-[90vh] rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-[0_0_80px_rgba(139,92,246,0.15)]"
        style={{ animation: "diagSlideUp 0.3s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        {/* Progress Bar */}
        {step < 7 && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
            <div 
              className="h-full bg-violet-500 transition-all duration-500 ease-out"
              style={{ width: `${((step - 1) / 6) * 100}%` }}
            />
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/60 transition hover:bg-white/20 hover:text-white"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-8 sm:p-12 min-h-[500px] flex flex-col">
          
          {step > 1 && step < 7 && (
            <button 
              onClick={prevStep}
              className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-8 w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
          )}

          {/* STEP 1 - Contact Info */}
          {step === 1 && (
            <div className="flex-1 animate-fade-in">
              <div className="mb-8 text-center">
                <span className="text-violet-400 text-sm font-bold tracking-[0.2em] uppercase mb-3 block">Étape 1/6</span>
                <h2 className="text-3xl font-bold text-white tracking-tight">Informations de contact</h2>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/50 ml-1">Nom</label>
                    <input 
                      required
                      type="text" 
                      value={answers.nom}
                      onChange={(e) => setAnswers(prev => ({...prev, nom: e.target.value}))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-violet-500 transition-all"
                      placeholder="Dupont"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/50 ml-1">Prénom</label>
                    <input 
                      required
                      type="text" 
                      value={answers.prenom}
                      onChange={(e) => setAnswers(prev => ({...prev, prenom: e.target.value}))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-violet-500 transition-all"
                      placeholder="Jean"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/50 ml-1">Email professionnel</label>
                  <input 
                    required
                    type="email" 
                    value={answers.email}
                    onChange={(e) => setAnswers(prev => ({...prev, email: e.target.value}))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-violet-500 transition-all"
                    placeholder="jean@entreprise.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/50 ml-1">Numéro de téléphone</label>
                  <input 
                    required
                    type="tel" 
                    value={answers.phone}
                    onChange={(e) => setAnswers(prev => ({...prev, phone: e.target.value}))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-violet-500 transition-all"
                    placeholder="06 00 00 00 00"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/50 ml-1">Profession / rôle</label>
                  <input 
                    required
                    type="text" 
                    value={answers.role}
                    onChange={(e) => setAnswers(prev => ({...prev, role: e.target.value}))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-violet-500 transition-all"
                    placeholder="ex: Dirigeant, DSI..."
                  />
                </div>
                <button type="submit" className="w-full mt-6 bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group">
                  Suivant
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          )}

          {/* STEP 2 - Organisation */}
          {step === 2 && (
            <div className="flex-1 animate-fade-in">
              <div className="mb-8 text-center">
                <span className="text-violet-400 text-sm font-bold tracking-[0.2em] uppercase mb-3 block">Étape 2/6</span>
                <h2 className="text-3xl font-bold text-white tracking-tight">Votre Organisation</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-white/70 block mb-4">Quel type d’organisation êtes-vous ?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {["Indépendant / Freelance", "PME", "Scale-up", "ETI", "Grande entreprise", "Autre"].map(type => (
                      <button
                        key={type}
                        onClick={() => handleOptionSelect("orgType", type, false)}
                        className={`py-3 px-2 rounded-xl border text-sm transition-all ${
                          answers.orgType === type 
                            ? "border-violet-500 bg-violet-500/10 text-white shadow-[0_0_15px_rgba(139,92,246,0.1)]" 
                            : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-white/70 block">Quelle est votre activité ?</label>
                  <input 
                    required
                    type="text" 
                    value={answers.activity}
                    onChange={(e) => setAnswers(prev => ({...prev, activity: e.target.value}))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-violet-500 transition-all"
                    placeholder="ex: E-commerce, Logistique..."
                  />
                </div>
                <button 
                  onClick={() => answers.orgType && answers.activity && nextStep()}
                  disabled={!answers.orgType || !answers.activity}
                  className="w-full mt-6 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group"
                >
                  Suivant
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 - Besoin */}
          {step === 3 && (
            <div className="flex-1 animate-fade-in">
              <div className="mb-8 text-center">
                <span className="text-violet-400 text-sm font-bold tracking-[0.2em] uppercase mb-3 block">Étape 3/6</span>
                <h2 className="text-3xl font-bold text-white tracking-tight">Votre Besoin</h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70 block">Quelle tâche vous prend le plus de temps aujourd’hui ?</label>
                  <textarea 
                    required
                    rows={3}
                    value={answers.mainTask}
                    onChange={(e) => setAnswers(prev => ({...prev, mainTask: e.target.value}))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-violet-500 transition-all resize-none"
                    placeholder="Décrivez brièvement la tâche..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white/70 block mb-4">À quelle fréquence réalisez-vous cette tâche ?</label>
                  <div className="grid grid-cols-1 gap-3">
                    {["Tous les jours", "Plusieurs fois par semaine", "Occasionnellement"].map(freq => (
                      <button
                        key={freq}
                        onClick={() => handleOptionSelect("frequency", freq, false)}
                        className={`py-4 px-4 rounded-xl border text-left transition-all flex items-center justify-between group ${
                          answers.frequency === freq 
                            ? "border-violet-500 bg-violet-500/10 text-white" 
                            : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <span>{freq}</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${answers.frequency === freq ? "border-violet-500 bg-violet-500" : "border-white/10"}`}>
                          {answers.frequency === freq && <CheckCircle2 className="w-3 h-3 text-white" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => answers.mainTask && answers.frequency && nextStep()}
                  disabled={!answers.mainTask || !answers.frequency}
                  className="w-full mt-6 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group"
                >
                  Suivant
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 - Impact */}
          {step === 4 && (
            <div className="flex-1 animate-fade-in">
              <div className="mb-8 text-center">
                <span className="text-violet-400 text-sm font-bold tracking-[0.2em] uppercase mb-3 block">Étape 4/6</span>
                <h2 className="text-3xl font-bold text-white tracking-tight">L'Impact</h2>
              </div>
              <div className="space-y-8">
                <div>
                  <label className="text-sm font-medium text-white/70 block mb-4">Quel est l’impact aujourd’hui ?</label>
                  <div className="grid grid-cols-1 gap-3">
                    {["Perte de temps importante", "Perte d’opportunités / revenus", "Faible impact"].map(imp => (
                      <button
                        key={imp}
                        onClick={() => handleOptionSelect("impact", imp, false)}
                        className={`py-4 px-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                          answers.impact === imp 
                            ? "border-violet-500 bg-violet-500/10 text-white" 
                            : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {imp}
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${answers.impact === imp ? "border-violet-500 bg-violet-500" : "border-white/10"}`}>
                          {answers.impact === imp && <CheckCircle2 className="w-3 h-3 text-white" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-white/70 block mb-4">Quel volume traitez-vous ?</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Faible", "Moyen", "Élevé"].map(vol => (
                      <button
                        key={vol}
                        onClick={() => handleOptionSelect("volume", vol, false)}
                        className={`py-3 rounded-xl border text-center transition-all ${
                          answers.volume === vol 
                            ? "border-violet-500 bg-violet-500/10 text-white" 
                            : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {vol}
                      </button>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => answers.impact && answers.volume && nextStep()}
                  disabled={!answers.impact || !answers.volume}
                  className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group"
                >
                  Suivant
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5 - Intention */}
          {step === 5 && (
            <div className="flex-1 animate-fade-in flex flex-col justify-center">
              <div className="mb-10 text-center">
                <span className="text-violet-400 text-sm font-bold tracking-[0.2em] uppercase mb-3 block">Étape 5/6</span>
                <h2 className="text-3xl font-bold text-white tracking-tight">Que souhaitez-vous faire ?</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: "fast", label: "Mettre en place une solution rapidement", icon: Zap },
                  { id: "explore", label: "Explorer les possibilités", icon: Target },
                  { id: "info", label: "Juste me renseigner", icon: Activity },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleOptionSelect("intention", opt.label)}
                    className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 ${
                      answers.intention === opt.label 
                        ? "border-violet-500 bg-violet-500/10 shadow-[0_0_30px_rgba(139,92,246,0.15)]" 
                        : "border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className={`p-3 rounded-xl transition-colors ${answers.intention === opt.label ? "bg-violet-500/20 text-violet-400" : "bg-white/5 text-white/30 group-hover:text-white/60"}`}>
                      <opt.icon className="w-6 h-6" />
                    </div>
                    <div className="text-lg font-semibold text-white text-left">{opt.label}</div>
                    <ArrowRight className={`ml-auto w-5 h-5 transition-all ${answers.intention === opt.label ? "text-violet-400 translate-x-0 opacity-100" : "text-white/0 -translate-x-4 opacity-0"}`} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6 - Message Libre */}
          {step === 6 && (
            <div className="flex-1 animate-fade-in flex flex-col justify-center">
              <div className="mb-8 text-center">
                <span className="text-violet-400 text-sm font-bold tracking-[0.2em] uppercase mb-3 block">Dernière Étape</span>
                <h2 className="text-3xl font-bold text-white tracking-tight">Message libre</h2>
                <p className="text-white/40 mt-2">Souhaitez-vous ajouter une précision ? (Optionnel)</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group">
                  <div className="absolute top-4 left-4 text-white/20 group-focus-within:text-violet-500 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <textarea 
                    rows={5}
                    value={answers.message}
                    onChange={(e) => setAnswers(prev => ({...prev, message: e.target.value}))}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-violet-500 transition-all resize-none"
                    placeholder="Vos commentaires, besoins spécifiques ou questions..."
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-[0_10px_20px_-5px_rgba(139,92,246,0.4)]"
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Envoyer ma demande
                      <CheckCircle2 className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* STEP 7 - SUCCESS */}
          {step === 7 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in py-8">
              <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-8 border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">Demande reçue !</h2>
              <p className="text-white/60 text-lg max-w-md mx-auto mb-10 leading-relaxed">
                Merci {answers.prenom}. Vos informations ont été transmises à nos experts. Nous reviendrons vers vous rapidement pour discuter de votre projet d'automatisation.
              </p>
              <button 
                onClick={onClose}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-10 rounded-xl transition-all duration-300 active:scale-[0.98]"
              >
                Retourner au site
              </button>
            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes diagFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes diagSlideUp { from{opacity:0;transform:translateY(20px) scale(0.98)} to{opacity:1;transform:none} }
        .animate-fade-in { animation: fadeIn 0.4s ease-out both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>,
    document.body
  );
}
