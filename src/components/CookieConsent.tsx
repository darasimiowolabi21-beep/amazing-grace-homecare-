/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ShieldAlert } from "lucide-react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem("agh-cookie-consent");
    if (!hasConsent) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 3000); // Appear after 3 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("agh-cookie-consent", "granted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-sm w-full bg-white dark:bg-navy-900 border border-slate-100 dark:border-navy-800 rounded-2xl shadow-2xl p-5 text-left text-slate-800 dark:text-slate-200 animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex gap-3 items-start">
        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="space-y-3">
          <div className="space-y-1">
            <h4 className="font-display font-bold text-xs">Privacy & Secure Connection</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              We leverage browser logs to store your local care booking sessions securely and optimize coordination for diaspora relatives.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAccept}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-semibold transition-colors cursor-pointer"
            >
              Accept Credentials
            </button>
            <button
              onClick={() => setVisible(false)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-navy-800 text-slate-500 hover:bg-slate-50 text-[10px]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
