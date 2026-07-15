/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { TESTIMONIALS } from "../data";
import { ChevronLeft, ChevronRight, MessageSquareCode, Quote, Star } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localReviews, setLocalReviews] = useState(TESTIMONIALS);
  
  // Custom review form states
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    relation: "",
    rating: 5,
    text: ""
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : localReviews.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < localReviews.length - 1 ? prev + 1 : 0));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    const submittedReview = {
      id: `test-custom-${Date.now()}`,
      name: newReview.name,
      relation: newReview.relation || "Family Relative",
      rating: newReview.rating,
      text: newReview.text,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" // Placeholder
    };

    setLocalReviews([submittedReview, ...localReviews]);
    setSubmitSuccess(true);
    setCurrentIndex(0);

    setTimeout(() => {
      setShowReviewForm(false);
      setSubmitSuccess(false);
      setNewReview({ name: "", relation: "", rating: 5, text: "" });
    }, 2500);
  };

  const currentTestimonial = localReviews[currentIndex];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white dark:bg-navy-900 transition-colors relative overflow-hidden">
      
      {/* Decorative quotes background graphic */}
      <div className="absolute top-24 left-12 text-slate-100 dark:text-navy-850 select-none">
        <Quote className="w-48 h-48 opacity-15" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-bold">
            Stories of Reassurance
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-900 dark:text-white">
            What Loving Families Say About Amazing Grace
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full mt-4" />
        </div>

        {/* Testimonials Carousel Interface */}
        {currentTestimonial && (
          <div className="relative p-6 sm:p-12 rounded-3xl bg-slate-50 dark:bg-navy-850 border border-slate-100 dark:border-navy-800 shadow-xl max-w-4xl mx-auto min-h-[340px] flex flex-col justify-between text-left">
            
            <div className="space-y-6">
              
              {/* Stars and rating badge */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-5 h-5 shrink-0 ${
                      idx < currentTestimonial.rating
                        ? "text-gold-500 fill-gold-500"
                        : "text-slate-300 dark:text-slate-700"
                    }`}
                  />
                ))}
                <span className="text-xs font-mono font-bold text-slate-400 ml-2">
                  5.0 / 5.0 Rating
                </span>
              </div>

              {/* Review Text */}
              <blockquote className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-light italic">
                “{currentTestimonial.text}”
              </blockquote>

            </div>

            {/* User Bio and Carousel buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 mt-6 border-t border-slate-200/50 dark:border-navy-800/50">
              
              {/* Photo & Name */}
              <div className="flex items-center gap-4">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-emerald-600 shadow-md"
                />
                <div>
                  <h4 className="font-display font-bold text-base text-navy-900 dark:text-white">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400">
                    {currentTestimonial.relation}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-navy-800 transition-colors cursor-pointer"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-navy-800 transition-colors cursor-pointer"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>
        )}

        {/* Carousel indicator pips */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          {localReviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentIndex === idx ? "w-6 bg-emerald-600" : "w-2 bg-slate-300 dark:bg-slate-700"
              }`}
            />
          ))}
        </div>

        {/* Call to action for reviews */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-5 py-2.5 text-xs font-semibold rounded-full bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            {showReviewForm ? "Close Review Panel" : "Share Your Amazing Grace Story"}
          </button>
        </div>

        {/* Submittable form panel */}
        {showReviewForm && (
          <div className="max-w-xl mx-auto mt-8 p-6 rounded-3xl bg-slate-50 dark:bg-navy-850 border border-slate-100 dark:border-navy-800 animate-in slide-in-from-top duration-300">
            {submitSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-xl">
                  ✓
                </div>
                <h4 className="font-display font-bold text-navy-900 dark:text-white">Story Added!</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Your heartfelt testimonial has been added to our slideshow carousel successfully.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4 text-left">
                <div className="text-center">
                  <h4 className="font-display font-bold text-base text-navy-900 dark:text-white">
                    Submit Family Feedback
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Your reassurance helps diaspora and local families make confident choices.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Betty Owolabi"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full px-4 py-2 bg-white dark:bg-navy-950 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Relationship to Resident
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Daughter of Resident"
                      value={newReview.relation}
                      onChange={(e) => setNewReview({ ...newReview, relation: e.target.value })}
                      className="w-full px-4 py-2 bg-white dark:bg-navy-950 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1 font-mono">
                    Rating (1 - 5 Stars)
                  </label>
                  <div className="flex gap-1.5 items-center">
                    {Array.from({ length: 5 }).map((_, starIdx) => {
                      const ratingVal = starIdx + 1;
                      return (
                        <button
                          key={starIdx}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: ratingVal })}
                          className="p-1 focus:outline-none cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              ratingVal <= newReview.rating
                                ? "text-gold-500 fill-gold-500"
                                : "text-slate-300 dark:text-slate-700"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Your Testimonial Story
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe how our caregivers supported your parent with dignity, nutrition, safety, or medical support..."
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white dark:bg-navy-950 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-md cursor-pointer"
                >
                  Publish Testimonial
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
