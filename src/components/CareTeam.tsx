/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { TEAM } from "../data";
import { Award, Briefcase, ChevronRight, GraduationCap } from "lucide-react";

export default function CareTeam() {
  const [activeFilter, setActiveFilter] = useState<"All" | "Medical" | "Nursing" | "Therapy" | "Support">("All");
  const [expandedBioId, setExpandedBioId] = useState<string | null>(null);

  const filters: ("All" | "Medical" | "Nursing" | "Therapy" | "Support")[] = [
    "All",
    "Medical",
    "Nursing",
    "Therapy",
    "Support"
  ];

  const filteredTeam = activeFilter === "All"
    ? TEAM
    : TEAM.filter(member => member.department === activeFilter);

  return (
    <section id="care-team" className="py-20 lg:py-28 bg-white dark:bg-navy-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-bold">
            The Experts Behind the Grace
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-900 dark:text-white">
            Meet Our Elite Clinical & Care Coordination Team
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Our multi-disciplinary medical board combines geriatric experience, specialist nursing, and physical therapy to provide elite daily protection.
          </p>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full mt-4" />
        </div>

        {/* Department Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => {
                setActiveFilter(f);
                setExpandedBioId(null);
              }}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-all cursor-pointer ${
                activeFilter === f
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/15"
                  : "bg-slate-50 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-750"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTeam.map((member) => (
            <div
              key={member.id}
              className="group rounded-3xl bg-slate-50 dark:bg-navy-850 border border-slate-100 dark:border-navy-800/60 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300"
            >
              
              {/* Photo & Badge header */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Department label tag */}
                <div className="absolute top-4 right-4 px-3 py-1 text-[10px] font-mono uppercase font-bold rounded-full bg-navy-900/80 text-gold-400 backdrop-blur-sm border border-gold-500/25">
                  {member.department} Division
                </div>
              </div>

              {/* Information block */}
              <div className="p-6 space-y-4 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  
                  {/* Name and Role */}
                  <div>
                    <h3 className="text-lg font-display font-bold text-navy-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 mt-0.5">
                      {member.role}
                    </p>
                  </div>

                  {/* Stats & Qualifications */}
                  <div className="space-y-1.5 border-t border-slate-200/50 dark:border-navy-800/50 pt-3">
                    
                    {/* Qualification */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                      <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-medium line-clamp-1">{member.qualification}</span>
                    </div>

                    {/* Experience */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                      <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                      <span><strong>{member.experience} Years</strong> Professional Experience</span>
                    </div>

                  </div>

                  {/* Bio copy (expandable) */}
                  <div className="pt-2">
                    <p className={`text-xs text-slate-500 dark:text-slate-400 leading-relaxed transition-all ${
                      expandedBioId === member.id ? "" : "line-clamp-2"
                    }`}>
                      {member.bio}
                    </p>
                  </div>

                </div>

                {/* Read Bio Trigger */}
                <div className="pt-4 mt-auto border-t border-slate-200/50 dark:border-navy-800/50 flex items-center justify-between">
                  <button
                    onClick={() => setExpandedBioId(expandedBioId === member.id ? null : member.id)}
                    className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                  >
                    {expandedBioId === member.id ? "Hide Biography" : "Read Full Biography"}
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${expandedBioId === member.id ? "rotate-90" : ""}`} />
                  </button>
                  <span className="text-[10px] font-mono text-slate-400">ID: {member.id.toUpperCase()}</span>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Staffing Commitment Callout */}
        <div className="mt-16 p-6 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-100 dark:border-navy-800 text-slate-500 dark:text-slate-400 text-xs text-center flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>We are always growing our clinical circle in Akure, Ondo State. Are you an RN, RPN or Physical therapist?</span>
          <a href="#careers-section" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
            View Active Jobs & Apply Online →
          </a>
        </div>

      </div>
    </section>
  );
}
