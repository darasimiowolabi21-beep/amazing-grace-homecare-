/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Heart, Award, CreditCard, Sparkles, Home, MessageSquare, PhoneCall, ShieldAlert, ShieldCheck } from "lucide-react";

export default function WhyChooseUs() {
  const [familiesCount, setFamiliesCount] = useState(0);
  const [caregiversCount, setCaregiversCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [hoursCount, setHoursCount] = useState(0);

  // Simulated Counter Animations
  useEffect(() => {
    const duration = 2000;
    const intervalTime = 50;
    const steps = duration / intervalTime;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setFamiliesCount(Math.min(Math.round((150 / steps) * step), 150));
      setCaregiversCount(Math.min(Math.round((45 / steps) * step), 45));
      setYearsCount(Math.min(Math.round((15 / steps) * step), 15));
      setHoursCount(Math.min(Math.round((52000 / steps) * step), 52000));

      if (step >= steps) clearInterval(timer);
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const coreFeatures = [
    { title: "Compassionate Care", icon: Heart, desc: "We nurture seniors with gentle concern, addressing emotional and mental wellness alongside physical needs." },
    { title: "Experienced Caregivers", icon: Award, desc: "Our professionals undergo intensive background verification, regular clinical coaching, and skill audits." },
    { title: "Affordable Care Plans", icon: CreditCard, desc: "Customized hourly, shift-based, or residential packages designed to respect diverse family budget targets." },
    { title: "Personalized Services", icon: Sparkles, desc: "Bespoke nursing and lifestyle routines custom-tailored to perfectly match personal habits and schedules." },
    { title: "Modern Facilities", icon: Home, desc: "Premium senior-safe suites featuring comfortable bedding, medical equipment, and recreational hubs." },
    { title: "Family Communication", icon: MessageSquare, desc: "Direct daily messenger reporting (including safety photos and vital logs) for absolute reassurance, even from overseas." },
    { title: "Emergency Response", icon: PhoneCall, desc: "Standby critical support networks, continuous nurse logs, and ambulance partnerships active 24/7." },
    { title: "Medical Supervision", icon: ShieldAlert, desc: "Bespoke clinical blueprints directed and reviewed daily by our resident geriatric doctor, Dr. Folorunsho." },
    { title: "Safe Environment", icon: ShieldCheck, desc: "Advanced slip-resistant flooring, bedside emergency panic signals, and 24/7 guard safety logs." }
  ];

  return (
    <section id="why-choose-us" className="py-20 lg:py-28 bg-cream-warm dark:bg-navy-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-bold">
            The Amazing Grace Difference
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-900 dark:text-white">
            Why Families Worldwide Trust Our Compassionate Care
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full mt-4" />
        </div>

        {/* Interactive Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {coreFeatures.map((feat) => (
            <div
              key={feat.title}
              className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-100 dark:border-navy-800 shadow-sm hover:shadow-md transition-all group text-left"
            >
              <div className="flex gap-4 items-start">
                <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 h-12 w-12 flex items-center justify-center transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                  <feat.icon className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-display font-bold text-base text-navy-900 dark:text-white">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Animated Counters Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-emerald-900 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl" />
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 text-center">
            
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gold-400">
                {familiesCount}+
              </div>
              <h4 className="text-xs font-semibold text-emerald-100 uppercase tracking-wider font-mono">
                Happy Families
              </h4>
              <p className="text-[10px] text-emerald-200">Across Nigeria & Diaspora</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gold-400">
                {caregiversCount}+
              </div>
              <h4 className="text-xs font-semibold text-emerald-100 uppercase tracking-wider font-mono">
                Licensed Caregivers
              </h4>
              <p className="text-[10px] text-emerald-200">Physios, Doctors & Nurses</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gold-400">
                {yearsCount}+
              </div>
              <h4 className="text-xs font-semibold text-emerald-100 uppercase tracking-wider font-mono">
                Years of Excellence
              </h4>
              <p className="text-[10px] text-emerald-200">Of Dedicated Senior Support</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gold-400">
                {(hoursCount / 1000).toFixed(0)}k+
              </div>
              <h4 className="text-xs font-semibold text-emerald-100 uppercase tracking-wider font-mono">
                Care Hours Delivered
              </h4>
              <p className="text-[10px] text-emerald-200">With 100% Safety Record</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
