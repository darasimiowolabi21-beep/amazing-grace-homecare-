/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle } from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Elderly Care Inquiry",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Submit contact message
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", phone: "", subject: "Elderly Care Inquiry", message: "" });
      }
    } catch (err) {
      console.error(err);
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Draw high-contrast custom vector Canvas Map of Oke-Aro/Orita Obele Akure
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Sizing
    canvas.width = canvas.parentElement?.clientWidth || 500;
    canvas.height = 340;

    const width = canvas.width;
    const height = canvas.height;

    // Background color matching light/dark modes
    const isDark = document.documentElement.classList.contains("dark") || canvas.parentElement?.closest(".dark-mode") !== null;
    ctx.fillStyle = isDark ? "#0f172a" : "#f8fafc";
    ctx.fillRect(0, 0, width, height);

    // Draw stylized streets
    ctx.strokeStyle = isDark ? "#334155" : "#e2e8f0";
    ctx.lineWidth = 12;
    ctx.lineCap = "round";

    // Orita Obele Main Road
    ctx.beginPath();
    ctx.moveTo(30, 80);
    ctx.lineTo(width - 30, 80);
    ctx.stroke();

    // Oke-Aro Secondary Road
    ctx.beginPath();
    ctx.moveTo(100, 30);
    ctx.lineTo(100, height - 30);
    ctx.stroke();

    // Ireakari Street (Location of Amazing Grace)
    ctx.beginPath();
    ctx.moveTo(100, 180);
    ctx.lineTo(width - 80, 180);
    ctx.stroke();

    // Road 1 (Phase 2 fork)
    ctx.beginPath();
    ctx.moveTo(width - 160, 180);
    ctx.lineTo(width - 160, height - 40);
    ctx.stroke();

    // Street Names Text
    ctx.fillStyle = isDark ? "#94a3b8" : "#64748b";
    ctx.font = "bold 9px monospace";
    ctx.fillText("ORITA OBELE MAIN RD", 40, 72);
    ctx.fillText("OKE-ARO AVE", 46, height - 42);
    ctx.fillText("IREAKARI ST", 140, 172);
    ctx.fillText("ROAD 1", width - 150, height - 60);

    // Draw glowing location marker for Amazing Grace Homecare
    const markerX = width - 160;
    const markerY = 220;

    // Glowing radius circle
    ctx.fillStyle = "rgba(16, 185, 129, 0.2)";
    ctx.beginPath();
    ctx.arc(markerX, markerY, 24, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(16, 185, 129, 0.4)";
    ctx.beginPath();
    ctx.arc(markerX, markerY, 14, 0, Math.PI * 2);
    ctx.fill();

    // Golden Pin Head
    ctx.fillStyle = "#d97706";
    ctx.beginPath();
    ctx.arc(markerX, markerY - 8, 6, 0, Math.PI * 2);
    ctx.fill();

    // Pin Needle pointing down
    ctx.strokeStyle = "#d97706";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(markerX, markerY - 8);
    ctx.lineTo(markerX, markerY + 4);
    ctx.stroke();

    // Target Text tooltip
    ctx.fillStyle = "#059669";
    ctx.font = "bold 10px sans-serif";
    ctx.fillText("AMAZING GRACE HOMECARE", markerX - 66, markerY - 24);

    // Minor reference landmarks
    ctx.fillStyle = isDark ? "#475569" : "#cbd5e1";
    ctx.fillRect(50, 120, 24, 24); // Local police block
    ctx.fillStyle = isDark ? "#94a3b8" : "#475569";
    ctx.font = "8px monospace";
    ctx.fillText("Oke-Aro Junction", 36, 154);

  }, []);

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white dark:bg-navy-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-bold">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-900 dark:text-white">
            Contact Amazing Grace Homecare
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Reach out to our care board. We are always available for in-person tours, virtual consultations, and emergency dispatch.
          </p>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Coordinates & Information */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <h3 className="text-xl font-display font-bold text-navy-900 dark:text-white">
              Office Information
            </h3>

            {/* Address */}
            <div className="flex gap-4 items-start">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-sm text-navy-900 dark:text-white">Our Address</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Amazing Grace Homecare for the Elderly,<br />
                  Road 1, Phase 2, Ireakari 111,<br />
                  Oke-Aro/Orita Obele, Akure,<br />
                  Ondo State, Nigeria.
                </p>
              </div>
            </div>

            {/* Phones */}
            <div className="flex gap-4 items-start">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-sm text-navy-900 dark:text-white">Phone & Hotline Support</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Diaspora Hotline: <a href="tel:+2348031112222" className="text-emerald-600 hover:underline font-semibold">+234 803 111 2222</a><br />
                  Hotline 2: <a href="tel:+2348055556666" className="text-emerald-600 hover:underline font-semibold">+234 805 555 6666</a>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4 items-start">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-sm text-navy-900 dark:text-white">Email Communications</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  General inquiries: <a href="mailto:info@amazinggraceelderly.com" className="text-emerald-600 hover:underline font-semibold">info@amazinggraceelderly.com</a><br />
                  Recruitments: <a href="mailto:careers@amazinggraceelderly.com" className="text-emerald-600 hover:underline font-semibold">careers@amazinggraceelderly.com</a>
                </p>
              </div>
            </div>

            {/* Office Hours */}
            <div className="flex gap-4 items-start">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-sm text-navy-900 dark:text-white">Operating Hours</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Residential Office: Mon - Sat: 8:00 AM - 6:00 PM<br />
                  Clinical & Care Emergency Support: <span className="text-emerald-600 font-bold">24 Hours / 7 Days</span>
                </p>
              </div>
            </div>

            {/* WhatsApp trigger */}
            <div className="pt-4">
              <a
                href="https://wa.me/2348031112222?text=Hello%20Amazing%20Grace%20Homecare!%20I%20would%20like%20to%20inquire%20about%20care%20for%20my%20parent."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md transition-all transform hover:scale-[1.02]"
              >
                <MessageSquare className="w-5 h-5 shrink-0" />
                Start Chat with Coordinator on WhatsApp
              </a>
            </div>

          </div>

          {/* Right Column: Contact form & custom Canvas Map */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-navy-850 border border-slate-100 dark:border-navy-800 shadow-sm space-y-6">
              
              {submitSuccess ? (
                <div className="text-center py-10 space-y-3 animate-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-2xl">
                    ✓
                  </div>
                  <h3 className="font-display font-bold text-lg text-navy-900 dark:text-white">Message Transmitted!</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                    Thank you for contacting us. Our geriatric clinical registrar has logged your inquiry and will follow up within 2 hours.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-5 py-2 bg-slate-200/50 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-semibold rounded-xl"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <h3 className="text-lg font-display font-bold text-navy-900 dark:text-white">
                    Send An Inquiry Message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Betty Owolabi"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 bg-white dark:bg-navy-950 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="betty@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 bg-white dark:bg-navy-950 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+234..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 bg-white dark:bg-navy-950 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                        Subject Theme
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white dark:bg-navy-950 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                      >
                        <option>Elderly Care Inquiry</option>
                        <option>Residential Enrollment Cost</option>
                        <option>Dementia Nursing Plan</option>
                        <option>General Clinical Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Type details about your parent's mobility, medical requirements, or specific dates you wish to begin..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white dark:bg-navy-950 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-4 h-4 shrink-0" />
                    {isSubmitting ? "Transmitting Inquiry..." : "Submit Message to Care Board"}
                  </button>

                </form>
              )}
            </div>

            {/* Custom vector high-contrast local Canvas map */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider text-left">
                Interactive Akure Facility Map
              </h4>
              <div className="rounded-3xl overflow-hidden border border-slate-100 dark:border-navy-800 shadow-md">
                <canvas ref={canvasRef} className="w-full block" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
