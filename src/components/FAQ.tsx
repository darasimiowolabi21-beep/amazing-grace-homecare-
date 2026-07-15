/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { FAQS } from "../data";
import { ChevronDown, HelpCircle, Search } from "lucide-react";

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-admission"); // Defaults to first open

  const categories = ["All", "Admission Process", "Visiting Hours", "Costs", "Medical Support", "Care Plans", "Safety Measures", "Emergency Response", "Payment Options"];

  const filteredFaqs = FAQS.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="faq" className="py-20 lg:py-28 bg-cream-warm dark:bg-navy-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-bold">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full mt-4" />
        </div>

        {/* Search Bar & Categories Selection */}
        <div className="space-y-6 mb-12">
          
          {/* Search box */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search help topics (e.g. costs, emergency, admission)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900 dark:text-white"
            />
          </div>

          {/* Quick Group Selection Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-3xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenFaqId(null);
                }}
                className={`px-3.5 py-2 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Accordions Stack */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-100 dark:border-navy-800/85 overflow-hidden transition-all duration-300"
                >
                  
                  {/* Accordion header button */}
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="font-display font-semibold text-sm sm:text-base text-navy-900 dark:text-white leading-tight">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Accordion content area */}
                  <div className={`transition-all duration-300 ${
                    isOpen ? "max-h-96 opacity-100 border-t border-slate-100 dark:border-navy-850" : "max-h-0 opacity-0 pointer-events-none"
                  }`}>
                    <div className="px-6 py-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-left bg-slate-50/50 dark:bg-navy-950/40">
                      <p className="mb-2">{faq.answer}</p>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-4 pt-3 border-t border-slate-100 dark:border-navy-900">
                        <span>TOPIC GROUP: {faq.category.toUpperCase()}</span>
                        <span>AGH HELP TEAM</span>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })
          ) : (
            <div className="text-center p-12 bg-white dark:bg-navy-900 rounded-3xl border border-slate-100 dark:border-navy-800">
              <p className="text-sm text-slate-500">No frequently asked questions match your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-3 text-xs font-semibold text-emerald-600 hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* Still Have Questions Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-emerald-950 text-white text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-display font-bold text-lg">Still have unanswered questions?</h3>
            <p className="text-xs text-emerald-200">
              Our live AI support assistant Grace is always active on the bottom right.
            </p>
          </div>
          <button
            onClick={() => {
              const chatbotButton = document.getElementById("chatbot-bubble-trigger");
              if (chatbotButton) chatbotButton.click();
            }}
            className="px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-600 text-white font-semibold text-xs shadow-md"
          >
            Ask Grace AI
          </button>
        </div>

      </div>
    </section>
  );
}
