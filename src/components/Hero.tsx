/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { CheckCircle2, Shield, Heart, Clock, UserCheck, PhoneCall, Sparkles } from "lucide-react";

interface HeroProps {
  setActiveView: (view: string) => void;
  onNavigateToSection: (sectionId: string) => void;
}

export default function Hero({ setActiveView, onNavigateToSection }: HeroProps) {
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [assessmentStep, setAssessmentStep] = useState(1);
  const [assessmentForm, setAssessmentForm] = useState({
    parentName: "",
    parentAge: "",
    primaryNeed: "General Care & Companionship",
    contactName: "",
    contactPhone: "",
    timeOfDay: "Morning"
  });

  const handleAssessmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAssessmentStep(2);
  };

  const trustBadges = [
    { label: "Licensed Caregivers", icon: UserCheck, desc: "Certified healthcare professionals" },
    { label: "24/7 Professional Care", icon: Clock, desc: "Always available medical support" },
    { label: "Personalized Care Plans", icon: Sparkles, desc: "Customized to individual requirements" },
    { label: "Safe & Secure Environment", icon: Shield, desc: "Senior-safe facility & home protocols" },
    { label: "Family-Focused Support", icon: Heart, desc: "Constant updates and diaspora liaison" },
    { label: "Emergency Assistance", icon: PhoneCall, desc: "Rapid medical response networks" }
  ];

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 lg:py-24">
      
      {/* Premium Photographic Background with gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1576765608622-067973a79f53?auto=format&fit=crop&w=1920&q=80"
          alt="Compassionate Caregiver helping a smiling senior woman"
          className="w-full h-full object-cover filter brightness-[0.25]"
        />
        {/* Soft, rich gradients transitioning from Emerald Green to Navy Blue */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-navy-950/90 to-navy-950/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy Column */}
          <div className="lg:col-span-7 space-y-8 text-left animate-in fade-in slide-in-from-left duration-700">
            
            {/* Soft Greeting Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono tracking-widest uppercase">
              <Sparkles className="w-4 h-4 text-gold-400" />
              Premier Assisted Living & Home Care
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight">
              Providing Compassionate Care with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-gold-400 to-emerald-300">Love, Dignity & Excellence</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 font-light max-w-xl leading-relaxed">
              Helping seniors live healthier, happier, and more comfortable lives through professional homecare, assisted living, and personalized support. Rest assured, your loved ones are in professional, caring hands in Akure, Ondo State.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => setActiveView("order-now")}
                className="px-8 py-4 text-sm font-semibold rounded-full bg-gold-500 hover:bg-gold-600 text-white shadow-lg shadow-gold-500/30 transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer text-center"
              >
                Order Now
              </button>
              <button
                onClick={() => setShowAssessmentModal(true)}
                className="px-8 py-4 text-sm font-semibold rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer text-center"
              >
                Book Free Assessment
              </button>
              <button
                onClick={() => onNavigateToSection("about")}
                className="px-6 py-4 text-sm font-medium text-emerald-300 hover:text-white transition-all cursor-pointer text-center"
              >
                Learn More →
              </button>
            </div>
            
          </div>

          {/* Elegant Quick Highlight Panel Column */}
          <div className="lg:col-span-5 animate-in fade-in slide-in-from-right duration-700 delay-200">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl space-y-6">
              <h3 className="text-lg font-display font-semibold border-b border-white/10 pb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Why Families Trust Amazing Grace
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trustBadges.slice(0, 4).map((badge) => (
                  <div key={badge.label} className="flex gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0 h-10 w-10 flex items-center justify-center">
                      <badge.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">{badge.label}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs">
                <span className="text-slate-400">Questions? Live call with Nurse</span>
                <a href="tel:+2348030000000" className="text-gold-400 font-bold hover:underline flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5" /> Call Assistant
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Full Trust Badges Grid (Desktop Bottom) */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {trustBadges.map((badge) => (
            <div key={badge.label} className="flex flex-col items-center text-center space-y-2 group">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-400 transition-transform duration-300 group-hover:scale-110">
                <badge.icon className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-white tracking-tight">{badge.label}</h4>
              <p className="text-[10px] text-slate-400 leading-normal">{badge.desc}</p>
            </div>
          ))}
        </div>

      </div>

      {/* COMPLIMENTARY ASSESSMENT SCHEDULING MODAL */}
      {showAssessmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-navy-900 text-slate-900 dark:text-white p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-navy-800">
            <button
              onClick={() => {
                setShowAssessmentModal(false);
                setAssessmentStep(1);
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <CheckCircle2 className="w-5 h-5 rotate-45" />
            </button>

            {assessmentStep === 1 ? (
              <form onSubmit={handleAssessmentSubmit} className="space-y-5">
                <div className="text-center space-y-2">
                  <span className="text-[10px] font-mono tracking-wider text-emerald-600 dark:text-emerald-400 uppercase font-bold">
                    Free Consultation
                  </span>
                  <h3 className="text-2xl font-display font-bold text-navy-900 dark:text-white">
                    Book Your Elder Assessment
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                    Let Mrs. Funmilayo Adesida coordinate a clinical review for your parent.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Senior Loved One's Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chief Samuel Balogun"
                      value={assessmentForm.parentName}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, parentName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-navy-800 bg-slate-50 dark:bg-navy-950 text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                        Age
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 78"
                        value={assessmentForm.parentAge}
                        onChange={(e) => setAssessmentForm({ ...assessmentForm, parentAge: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-navy-800 bg-slate-50 dark:bg-navy-950 text-sm focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                        Preferred Call Window
                      </label>
                      <select
                        value={assessmentForm.timeOfDay}
                        onChange={(e) => setAssessmentForm({ ...assessmentForm, timeOfDay: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-navy-800 bg-slate-50 dark:bg-navy-950 text-sm focus:outline-none focus:border-emerald-500"
                      >
                        <option>Morning (8AM - 12PM)</option>
                        <option>Afternoon (12PM - 4PM)</option>
                        <option>Evening (4PM - 7PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Primary Care Focus Need
                    </label>
                    <select
                      value={assessmentForm.primaryNeed}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, primaryNeed: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-navy-800 bg-slate-50 dark:bg-navy-950 text-sm focus:outline-none focus:border-emerald-500"
                    >
                      <option>General Care & Companionship</option>
                      <option>Post-Hospital / Stroke Recovery</option>
                      <option>Alzheimer's & Dementia Nursing</option>
                      <option>Residential Assisted Living</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-navy-800 pt-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                        Sponsor / Contact Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={assessmentForm.contactName}
                        onChange={(e) => setAssessmentForm({ ...assessmentForm, contactName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-navy-800 bg-slate-50 dark:bg-navy-950 text-sm focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                        Sponsor Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 803..."
                        value={assessmentForm.contactPhone}
                        onChange={(e) => setAssessmentForm({ ...assessmentForm, contactPhone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-navy-800 bg-slate-50 dark:bg-navy-950 text-sm focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all"
                >
                  Schedule Free Consultation Call
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-3xl">
                  ✓
                </div>
                <h3 className="text-xl font-display font-bold">Consultation Scheduled!</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Thank you for trusting Amazing Grace, <strong>{assessmentForm.contactName}</strong>. Our lead care coordinator will contact you at <strong>{assessmentForm.contactPhone}</strong> within 3 hours to configure a clinical assessment for <strong>{assessmentForm.parentName}</strong> ({assessmentForm.parentAge} years).
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setShowAssessmentModal(false);
                      setAssessmentStep(1);
                    }}
                    className="px-6 py-2 bg-slate-100 dark:bg-navy-850 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-semibold rounded-full"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
