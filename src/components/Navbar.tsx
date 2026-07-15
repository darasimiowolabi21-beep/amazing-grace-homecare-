/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, Heart, ShieldAlert, PhoneCall } from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  onNavigateToSection: (sectionId: string) => void;
}

export default function Navbar({
  darkMode,
  setDarkMode,
  activeView,
  setActiveView,
  onNavigateToSection
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", section: "hero", view: "home" },
    { label: "About Us", section: "about", view: "home" },
    { label: "Our Services", section: "services", view: "home" },
    { label: "Why Choose Us", section: "why-choose-us", view: "home" },
    { label: "Our Care Team", section: "care-team", view: "home" },
    { label: "Gallery", section: "gallery", view: "home" },
    { label: "Testimonials", section: "testimonials", view: "home" },
    { label: "FAQ", section: "faq", view: "home" },
    { label: "Blog", section: "blog", view: "home" },
    { label: "Careers", section: "careers-section", view: "home" },
    { label: "Contact Us", section: "contact", view: "home" },
  ];

  const handleNavItemClick = (item: typeof navItems[0]) => {
    setMobileMenuOpen(false);
    if (activeView !== "home") {
      setActiveView("home");
      // Wait for React to render Home, then scroll
      setTimeout(() => {
        onNavigateToSection(item.section);
      }, 100);
    } else {
      onNavigateToSection(item.section);
    }
  };

  return (
    <header
      id="navbar"
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? darkMode
            ? "bg-navy-950/95 backdrop-blur-md border-navy-800 shadow-lg"
            : "bg-white/95 backdrop-blur-md border-slate-100 shadow-md"
          : darkMode
            ? "bg-navy-950/60 border-transparent"
            : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand Section */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              setActiveView("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-md group-hover:bg-emerald-700 transition-colors">
              <Heart className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-display font-bold text-lg leading-tight tracking-tight text-emerald-600 dark:text-emerald-500">
                  AMAZING GRACE
                </span>
              </div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400">
                Homecare for the Elderly
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavItemClick(item)}
                className="px-3 py-2 text-xs font-medium rounded-md transition-all text-slate-600 dark:text-slate-300 hover:text-emerald-600 hover:bg-emerald-500/5 dark:hover:text-emerald-400 dark:hover:bg-emerald-500/10 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions: Theme Toggle + Highlighed Order Now Button */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-full transition-all text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-800"
              aria-label="Toggle dark and light mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-gold-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Premium CTA: Order Now */}
            <button
              id="nav-order-now"
              onClick={() => setActiveView("order-now")}
              className={`relative px-5 py-2.5 text-xs font-display font-semibold rounded-full shadow-md transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer ${
                activeView === "order-now"
                  ? "bg-gold-500 text-white shadow-gold-500/30 hover:bg-gold-600"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20"
              }`}
            >
              Order Now
            </button>
          </div>

          {/* Mobile Actions and Burger */}
          <div className="flex xl:hidden items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-5 h-5 text-gold-400" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setActiveView("order-now")}
              className="px-4 py-2 text-xs font-display font-semibold rounded-full bg-emerald-600 text-white"
            >
              Order Now
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-100 dark:border-navy-800 bg-white dark:bg-navy-900 transition-all shadow-xl animate-in fade-in slide-in-from-top duration-200">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavItemClick(item)}
                className="block w-full text-left px-4 py-3 text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-navy-800 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 px-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveView("order-now");
                }}
                className="w-full py-3 px-4 text-center text-sm font-display font-semibold rounded-full bg-emerald-600 text-white hover:bg-emerald-700 shadow-md"
              >
                Book Care Service (Order Now)
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
