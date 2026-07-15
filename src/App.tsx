/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import CareTeam from "./components/CareTeam";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Blog from "./components/Blog";
import ContactUs from "./components/ContactUs";
import OrderForm from "./components/OrderForm";
import Careers from "./components/Careers";
import Footer from "./components/Footer";
import AIChatbot from "./components/AIChatbot";
import CookieConsent from "./components/CookieConsent";

export default function App() {
  const [activeView, setActiveView] = useState<string>("home"); // "home" | "order-now" | "careers"
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [preselectedService, setPreselectedService] = useState<string>("");

  // Sync theme with HTML class
  useEffect(() => {
    const savedTheme = localStorage.getItem("agh-theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // Default to light theme as per visual instructions
      localStorage.setItem("agh-theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("agh-theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleBookingTrigger = (serviceTitle?: string) => {
    if (serviceTitle) {
      setPreselectedService(serviceTitle);
    } else {
      setPreselectedService("");
    }
    setActiveView("order-now");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-navy-950 text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300">
      
      {/* Dynamic Navigation Headbar */}
      <Navbar
        darkMode={theme === "dark"}
        setDarkMode={toggleTheme}
        activeView={activeView}
        setActiveView={setActiveView}
        onNavigateToSection={(sectionId) => {
          const target = document.getElementById(sectionId);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }}
      />

      {/* Main Layout Router Switch */}
      <main className="pt-16">
        {activeView === "home" && (
          <div className="space-y-0">
            {/* Hero Splash Area */}
            <Hero
              setActiveView={setActiveView}
              onNavigateToSection={(sectionId) => {
                const target = document.getElementById(sectionId);
                if (target) {
                  target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
            />

            {/* Core Narrative Philosophy */}
            <AboutUs />

            {/* Medical Services grid list */}
            <Services
              setActiveView={setActiveView}
              setPreselectedService={setPreselectedService}
            />

            {/* Why Choose Us features list with counters */}
            <WhyChooseUs />

            {/* Clinical Board Profiles */}
            <CareTeam />

            {/* Virtual photo walkthrough */}
            <Gallery />

            {/* Family testimonials logs & reviewer board */}
            <Testimonials />

            {/* Accordion FAQ Board */}
            <FAQ />

            {/* Senior Care Health Articles Blog */}
            <Blog />

            {/* Maps & Message forms */}
            <ContactUs />
          </div>
        )}

        {/* Dedicated Booking request portal */}
        {activeView === "order-now" && (
          <OrderForm preselectedService={preselectedService} />
        )}

        {/* Dedicated jobs application board */}
        {activeView === "careers" && (
          <Careers />
        )}
      </main>

      {/* Structured Sitemap Footer */}
      <Footer setActiveView={setActiveView} />

      {/* AI Bot Grace Assistant Widget */}
      <AIChatbot />

      {/* Security Privacy policy alert */}
      <CookieConsent />

    </div>
  );
}
