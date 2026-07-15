/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X, Bot, User, Loader2, Sparkles } from "lucide-react";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Welcome to Amazing Grace Homecare for the Elderly. I am Grace, your virtual assistant. How can I support your family with booking professional eldercare, clinical physiotherapy, dementia help, or residential enrollment options today?"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Suggestions list
  const suggestions = [
    "What are your care plans & costs?",
    "Where is the care home in Akure?",
    "How can I book a nurse or caregiver?",
    "Tell me about Dr. Folorunsho's qualifications."
  ];

  // Auto scroll down
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = { sender: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend })
      });
      const data = await response.json();
      
      const botMsg: ChatMessage = {
        sender: "bot",
        text: data.reply || "I apologize, but I am currently experiencing an interruption. Please feel free to call our diaspora care support hotline at +234 803 111 2222."
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const botMsg: ChatMessage = {
        sender: "bot",
        text: "I am having difficulty connecting to our server right now, but we'd love to help! Our facility is located at Road 1, Phase 2, Ireakari, Akure, Ondo State. You can reach our head nurse at +234 803 111 2222."
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  return (
    <>
      {/* Floating Trigger Bubble */}
      <button
        id="chatbot-bubble-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 group border-2 border-white dark:border-navy-900"
        aria-label="Toggle Grace AI Assistant"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gold-500"></span>
          </span>
        )}
      </button>

      {/* Slide-In Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-[360px] sm:max-w-[400px] h-[520px] bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-navy-800 flex flex-col justify-between overflow-hidden animate-in slide-in-from-bottom-6 duration-300">
          
          {/* Header */}
          <div className="bg-emerald-950 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-emerald-800 text-gold-400">
                <Bot className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="font-display font-bold text-sm leading-tight flex items-center gap-1">
                  Grace AI Assistant
                  <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                </h3>
                <span className="text-[10px] text-emerald-200 block">Senior Care Specialist • Online</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-emerald-900 text-emerald-200"
              aria-label="Minimize Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Viewport */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 dark:bg-navy-950 space-y-4">
            
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 max-w-[85%] text-xs ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Sender Avatar */}
                <div className={`p-1.5 rounded-full shrink-0 h-7 w-7 flex items-center justify-center ${
                  msg.sender === "user" ? "bg-emerald-600 text-white" : "bg-emerald-800 text-gold-400"
                }`}>
                  {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Sender Message box */}
                <div className={`p-3 rounded-2xl leading-relaxed text-left text-xs ${
                  msg.sender === "user"
                    ? "bg-emerald-600 text-white rounded-tr-none"
                    : "bg-white dark:bg-navy-900 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-navy-800 rounded-tl-none shadow-xs"
                }`}>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}

            {/* Simulated typing placeholder */}
            {loading && (
              <div className="flex gap-3 max-w-[85%] text-xs mr-auto items-center">
                <div className="p-1.5 rounded-full bg-emerald-800 text-gold-400 shrink-0 h-7 w-7 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-2xl bg-white dark:bg-navy-900 text-slate-400 rounded-tl-none flex items-center gap-1.5 border border-slate-100 dark:border-navy-800 shadow-xs">
                  <span>Grace is formatting advice...</span>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions footer */}
          {messages.length === 1 && (
            <div className="p-3 bg-white dark:bg-navy-900 border-t border-slate-100 dark:border-navy-800">
              <p className="text-[10px] text-slate-400 text-left mb-2 uppercase font-mono font-bold">Suggested Topics</p>
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => sendMessage(sug)}
                    className="px-2.5 py-1 text-[10px] text-slate-600 dark:text-slate-300 bg-slate-50 hover:bg-slate-100 dark:bg-navy-850 dark:hover:bg-navy-800 rounded-full border border-slate-200/50 dark:border-navy-800/80 cursor-pointer"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form Input bar */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3 bg-white dark:bg-navy-900 border-t border-slate-100 dark:border-navy-800 flex gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Grace about care, costs, doctors..."
              className="flex-1 px-4 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 flex items-center justify-center cursor-pointer"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
