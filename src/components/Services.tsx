/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import * as Icons from "lucide-react";
import { SERVICES } from "../data";
import { ServiceItem } from "../types";

interface ServicesProps {
  setActiveView: (view: string) => void;
  setPreselectedService: (serviceTitle: string) => void;
}

export default function Services({ setActiveView, setPreselectedService }: ServicesProps) {
  const [activeTab, setActiveTab] = useState<"All" | "Clinical" | "Daily Support" | "Specialized" | "Therapy">("All");
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);

  const categories: ("All" | "Clinical" | "Daily Support" | "Specialized" | "Therapy")[] = [
    "All",
    "Clinical",
    "Daily Support",
    "Specialized",
    "Therapy"
  ];

  const filteredServices = activeTab === "All"
    ? SERVICES
    : SERVICES.filter(s => s.category === activeTab);

  const handleOrderClick = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    setActiveView("order-now");
  };

  // Helper component to render dynamic icons safely
  const ServiceIcon = ({ name, className }: { name: string; className: string }) => {
    const IconComponent = (Icons as any)[name];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    return <Icons.Heart className={className} />;
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-white dark:bg-navy-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-bold">
            What We Provide
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-900 dark:text-white">
            Comprehensive Senior Care Built on Medical Integrity
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Explore our 18 certified senior care packages designed to offer robust clinical safety, medication assistance, physical restoration, and loving companionship.
          </p>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full mt-4" />
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeTab === cat
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/15"
                  : "bg-slate-50 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-750"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 18 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, idx) => (
            <div
              key={service.id}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-100/60 dark:border-navy-800/60 hover:border-emerald-600/20 dark:hover:border-emerald-500/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left group hover:-translate-y-1"
            >
              <div className="space-y-4">
                
                {/* Header Row: Icon & Category badge */}
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl bg-white dark:bg-navy-900 text-emerald-600 dark:text-emerald-400 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <ServiceIcon name={service.icon} className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-full bg-slate-200/50 dark:bg-navy-800 text-slate-500 dark:text-slate-400 uppercase">
                    {service.category}
                  </span>
                </div>

                {/* Title & Desc */}
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-lg text-navy-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200/40 dark:border-navy-800/40">
                <button
                  onClick={() => setSelectedServiceDetail(service)}
                  className="flex-1 py-2 text-center text-xs font-medium rounded-lg border border-slate-200 dark:border-navy-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors cursor-pointer"
                >
                  Learn More
                </button>
                <button
                  onClick={() => handleOrderClick(service.title)}
                  className="flex-1 py-2 text-center text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-sm transition-colors cursor-pointer"
                >
                  Order Now
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic Detail Modal (Learn More) */}
        {selectedServiceDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-navy-900 p-6 sm:p-8 text-slate-900 dark:text-white border border-slate-100 dark:border-navy-800 shadow-2xl">
              
              {/* Close Icon */}
              <button
                onClick={() => setSelectedServiceDetail(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-50 dark:bg-navy-800"
              >
                ✕
              </button>

              <div className="space-y-6">
                
                {/* Modal Header */}
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <ServiceIcon name={selectedServiceDetail.icon} className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {selectedServiceDetail.category} Package
                    </span>
                    <h3 className="text-xl font-display font-bold text-navy-900 dark:text-white">
                      {selectedServiceDetail.title}
                    </h3>
                  </div>
                </div>

                {/* Detailed description */}
                <div className="space-y-4 text-left">
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {selectedServiceDetail.description}
                  </p>
                  
                  {/* Custom Checklist depending on category */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950 space-y-2 border border-slate-100 dark:border-navy-850">
                    <h4 className="text-xs font-bold text-navy-900 dark:text-white flex items-center gap-2">
                      <Icons.CheckCircle className="w-4 h-4 text-emerald-500" />
                      What's Included in this Plan:
                    </h4>
                    <ul className="space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400 list-disc pl-4 leading-normal">
                      <li>Professional caregiver or certified registered nurse placement.</li>
                      <li>Double-checked medication adherence and logging schedules.</li>
                      <li>Regular digital health progress updates shared with family worldwide.</li>
                      <li>Seamless integration with our standby doctor assessment reviews.</li>
                    </ul>
                  </div>

                  <p className="text-[10px] text-slate-400 italic">
                    Note: Our services can be customized on a daily, weekly, or 24/7 live-in shift basis.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 border-t border-slate-100 dark:border-navy-800 pt-4">
                  <button
                    onClick={() => setSelectedServiceDetail(null)}
                    className="flex-1 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 transition-all cursor-pointer"
                  >
                    Close Description
                  </button>
                  <button
                    onClick={() => {
                      const title = selectedServiceDetail.title;
                      setSelectedServiceDetail(null);
                      handleOrderClick(title);
                    }}
                    className="flex-1 py-2.5 text-xs rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md shadow-emerald-600/10 transition-all cursor-pointer"
                  >
                    Select & Book Plan
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
