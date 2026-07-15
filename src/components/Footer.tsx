/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ArrowUp, Facebook, Heart, Instagram, Linkedin, MapPin, Mail, Phone, Twitter } from "lucide-react";

interface FooterProps {
  setActiveView: (view: string) => void;
}

export default function Footer({ setActiveView }: FooterProps) {
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (view: string, hashId?: string) => {
    setActiveView(view);
    if (hashId) {
      setTimeout(() => {
        const target = document.getElementById(hashId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-navy-950 text-white pt-16 pb-8 relative overflow-hidden transition-colors border-t border-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Segment: Brand & Sitemaps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-navy-900">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full bg-emerald-600 flex items-center justify-center border border-gold-500/30">
                <span className="text-white font-display font-black text-sm">AG</span>
              </div>
              <h3 className="font-display font-bold text-lg leading-tight tracking-tight text-white">
                Amazing Grace <br />
                <span className="text-xs text-gold-400 font-mono tracking-widest block">HOMECARE</span>
              </h3>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              We are a premium elderly care sanctuary located in Akure, Ondo State. Empowering local and diaspora families with professional geriatric nursing, clinical physical therapy, safe dementia rehabilitation, and specialized assisted living services.
            </p>

            {/* Social handles */}
            <div className="flex gap-2.5 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-navy-900 hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors" aria-label="Facebook Link">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-navy-900 hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors" aria-label="Twitter Link">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-navy-900 hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors" aria-label="Instagram Link">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-navy-900 hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors" aria-label="LinkedIn Link">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h4 className="text-xs font-mono font-bold text-gold-400 uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleLinkClick("home")} className="hover:text-white transition-colors cursor-pointer text-left">
                  Home Portal
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("home", "about-us")} className="hover:text-white transition-colors cursor-pointer text-left">
                  Our Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("home", "services")} className="hover:text-white transition-colors cursor-pointer text-left">
                  Care Services
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("home", "why-choose-us")} className="hover:text-white transition-colors cursor-pointer text-left">
                  Why Choose Us
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("home", "care-team")} className="hover:text-white transition-colors cursor-pointer text-left">
                  Meet Our Care Team
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Careers */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h4 className="text-xs font-mono font-bold text-gold-400 uppercase tracking-widest">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleLinkClick("home", "gallery")} className="hover:text-white transition-colors cursor-pointer text-left">
                  Virtual Tour
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("home", "testimonials")} className="hover:text-white transition-colors cursor-pointer text-left">
                  Family Testimonials
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("home", "faq")} className="hover:text-white transition-colors cursor-pointer text-left">
                  Help / FAQ
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("home", "blog")} className="hover:text-white transition-colors cursor-pointer text-left">
                  Wellness Blog
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("careers")} className="hover:text-white transition-colors cursor-pointer text-left font-semibold text-emerald-400">
                  Careers (Join Us)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact details summary */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <h4 className="text-xs font-mono font-bold text-gold-400 uppercase tracking-widest">
              Facility Address
            </h4>
            
            <div className="space-y-3.5 text-xs text-slate-400">
              <div className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Road 1, Phase 2, Ireakari 111, Oke-Aro / Orita Obele, Akure, Ondo State, Nigeria.</span>
              </div>
              <div className="flex gap-2 items-center">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>+234 803 111 2222, +234 805 555 6666</span>
              </div>
              <div className="flex gap-2 items-center">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>info@amazinggraceelderly.com</span>
              </div>
            </div>

            {/* Assessment booking fast-track CTA */}
            <div className="p-3 bg-navy-900 rounded-xl border border-navy-850 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[9px] font-mono uppercase text-gold-400 font-bold block">Need Help Fast?</span>
                <span className="text-[11px] text-white">Initiate a callback booking.</span>
              </div>
              <button
                onClick={() => handleLinkClick("order-now")}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[10px]"
              >
                Book Care
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Segment: Copyright, Accessibility & Legal declarations */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-left">
          
          <div className="space-y-1">
            <p className="flex items-center gap-1">
              &copy; {new Date().getFullYear()} Amazing Grace Homecare for the Elderly. All rights reserved.
            </p>
            <p className="text-[10px] text-slate-600">
              Geriatric nursing operations under board registry standard logs of Akure Clinical Wellness.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-[11px]">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#accessibility" className="hover:text-white transition-colors">Accessibility Declaration (WCAG 2.2 compliant)</a>
            <button
              onClick={handleScrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              aria-label="Back to Top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
