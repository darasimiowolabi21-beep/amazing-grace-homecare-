/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ShieldCheck, HeartHandshake, Eye, Award, CheckCircle, Users } from "lucide-react";

export default function AboutUs() {
  const coreValues = [
    { name: "Unmatched Compassion", desc: "Treating every senior as our own family, responding with warmth, empathy, and love.", icon: HeartHandshake },
    { name: "Utmost Dignity", desc: "Preserving personal independence, privacy, and cultural respect across all daily routines.", icon: ShieldCheck },
    { name: "Uncompromising Professionalism", desc: "Rigorous clinical tracking directed by certified nursing and medical specialists.", icon: Award },
    { name: "Absolute Integrity", desc: "Transparent family reporting, honest billing structures, and reliable care assistance.", icon: CheckCircle }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-cream-warm dark:bg-navy-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-bold">
            Who We Are
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-900 dark:text-white">
            Rooted in Dignity, Committed to Compassionate Care
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full mt-4" />
        </div>

        {/* Narrative & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: Story Image Collage or Highlights */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-emerald-600/10 rounded-3xl transform rotate-2 z-0" />
            <img
              src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=600&q=80"
              alt="Joyful elderly man and woman smiling together"
              className="relative z-10 w-full h-[380px] object-cover rounded-3xl shadow-xl border-4 border-white dark:border-navy-900"
            />
            
            {/* Embedded Quote banner */}
            <div className="absolute bottom-4 left-4 right-4 z-20 p-4 rounded-2xl bg-white/90 dark:bg-navy-900/90 border border-slate-100 dark:border-navy-800 backdrop-blur-sm shadow-lg flex items-center gap-3">
              <span className="text-3xl text-gold-500 font-display">“</span>
              <p className="text-xs italic text-slate-700 dark:text-slate-300">
                To care for those who once cared for us is one of the highest honors.
              </p>
            </div>
          </div>

          {/* Right Column: Narrative Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h3 className="text-2xl font-display font-bold text-navy-900 dark:text-white">
              Our Story & Heritage
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Amazing Grace Homecare for the Elderly was founded in Akure out of a simple, profound necessity: to provide senior citizens in Ondo State with access to the same elite, compassionate, and medically accurate care found in the world’s leading senior living programs. 
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We recognize that families, whether living locally or managing the care of elderly parents from the diaspora, face unique emotional and logistics hurdles. We step in as a trusted extension of your family—ensuring proper clinical monitoring, nutritional planning, and lively social companionship.
            </p>

            {/* Mission & Vision Mini cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-100 dark:border-navy-800 shadow-sm space-y-2">
                <div className="text-emerald-600 dark:text-emerald-400">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-sm text-navy-900 dark:text-white">Our Mission</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                  To enrich the lifestyle of our senior residents by providing loving, dignified, safety-first in-home and residential assisted living care.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-100 dark:border-navy-800 shadow-sm space-y-2">
                <div className="text-gold-500">
                  <Eye className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-sm text-navy-900 dark:text-white">Our Vision</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                  To be recognized as the gold standard of senior care, nursing services, and caregiver excellence across Sub-Saharan Africa.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Philosophy & Values section */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-display font-bold text-navy-900 dark:text-white">
              Our Philosophy & Core Values
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The ethical guidelines driving every health assessment, daily meal preparation, and medical shift.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, idx) => (
              <div
                key={value.name}
                className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-100 dark:border-navy-800 shadow-sm space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <value.icon className="w-6 h-6" />
                </div>
                <div className="space-y-1 text-left">
                  <h4 className="font-display font-bold text-sm text-navy-900 dark:text-white">
                    {value.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commitment Banner */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-800 to-emerald-950 text-white text-left relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-[10px] font-mono tracking-widest uppercase text-gold-400 font-bold">
              Commitment to Excellence
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold">
              Why Families Trust Us with Their Senior Loved Ones
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
              We understand that choosing care for an aging parent is a monumental family decision. That is why Amazing Grace commits to total diagnostic transparency, daily messaging channels (with video/photo proof of safety), and immediate physician-backed responses.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
