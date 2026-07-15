/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { BLOG_POSTS } from "../data";
import { BlogPost as BlogPostType } from "../types";
import { Calendar, Clock, Search, Tag, User, X } from "lucide-react";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [readingPost, setReadingPost] = useState<BlogPostType | null>(null);

  const categories = ["All", "Healthy Aging Tips", "Nutrition", "Dementia Care", "Caregiver Advice", "Family Wellness", "Healthcare Updates", "Mental Health", "Exercise for Seniors"];

  // Filter posts
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pick first article as Featured
  const featuredPost = BLOG_POSTS[0];
  const otherPosts = filteredPosts.filter((post) => post.id !== featuredPost.id);

  // Pick related posts based on category
  const getRelatedPosts = (post: BlogPostType) => {
    return BLOG_POSTS.filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some(t => post.tags.includes(t)))).slice(0, 2);
  };

  return (
    <section id="blog" className="py-20 lg:py-28 bg-white dark:bg-navy-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-bold">
            Grace Clinical Insights
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-900 dark:text-white">
            Our Senior Care and Wellness Blog
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Professional advice, healthy eating guides, cognitive games tips, and mental exercises designed to enrich aging lifestyles.
          </p>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full mt-4" />
        </div>

        {/* Search and Category Filter Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-12">
          
          {/* Category Tabs */}
          <div className="lg:col-span-8 flex flex-wrap gap-1.5 justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-medium uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-50 dark:bg-navy-850 text-slate-500 hover:bg-slate-100 dark:hover:bg-navy-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="lg:col-span-4 relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search health articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900 dark:text-white"
            />
          </div>

        </div>

        {/* FEATURED POST BANNER (Only shown when not filtering or if it matches) */}
        {selectedCategory === "All" && searchQuery === "" && featuredPost && (
          <div
            onClick={() => setReadingPost(featuredPost)}
            className="mb-16 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-navy-850 border border-slate-100 dark:border-navy-800/80 shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer text-left group"
          >
            {/* Image Col */}
            <div className="lg:col-span-6 overflow-hidden rounded-2xl h-64 sm:h-80">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
            </div>

            {/* Content Col */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] uppercase font-mono font-bold text-gold-500 bg-gold-500/10 px-2.5 py-1 rounded-full border border-gold-500/20">
                FEATURED WRITING
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-navy-900 dark:text-white leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {featuredPost.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light line-clamp-3">
                {featuredPost.excerpt}
              </p>
              
              {/* Meta tags */}
              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-3 border-t border-slate-200/50 dark:border-navy-800/50">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{featuredPost.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{featuredPost.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BLOG GRID (Other Posts) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(selectedCategory !== "All" || searchQuery !== "" ? filteredPosts : otherPosts).map((post) => (
            <article
              key={post.id}
              onClick={() => setReadingPost(post)}
              className="group flex flex-col justify-between rounded-3xl bg-slate-50 dark:bg-navy-850 border border-slate-100 dark:border-navy-800/80 overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 hover:-translate-y-1 text-left"
            >
              
              {/* Image banner */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-navy-900/80 backdrop-blur-xs text-[10px] font-mono text-gold-400 border border-gold-500/20 uppercase font-bold">
                  {post.category}
                </div>
              </div>

              {/* Text content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-base text-navy-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer specs */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-3 border-t border-slate-200/50 dark:border-navy-800/50">
                  <div className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    <span className="line-clamp-1">{post.author}</span>
                  </div>
                  <span>{post.readTime}</span>
                </div>
              </div>

            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center p-12 bg-slate-50 dark:bg-navy-850 rounded-3xl border border-slate-100 dark:border-navy-800">
            <p className="text-sm text-slate-500">No senior care articles match your query.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-3 text-xs font-semibold text-emerald-600 hover:underline"
            >
              Clear Search filters
            </button>
          </div>
        )}

        {/* DETAILED ARTICLE READER MODAL WITH RELATED POSTS */}
        {readingPost && (
          <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
            <div
              className="w-full max-w-4xl bg-white dark:bg-navy-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-navy-800 my-8 text-slate-900 dark:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Header image collage with close button */}
              <div className="relative h-64 sm:h-96">
                <img
                  src={readingPost.image}
                  alt={readingPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/25 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={() => setReadingPost(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-navy-900/85 hover:bg-navy-900 text-white border border-white/10"
                  aria-label="Close reader"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Floating Meta titles */}
                <div className="absolute bottom-6 left-6 right-6 text-left space-y-2">
                  <span className="px-3 py-1 rounded-full bg-gold-500 text-white text-[10px] font-mono font-bold uppercase">
                    {readingPost.category}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-display font-bold text-white leading-tight">
                    {readingPost.title}
                  </h2>
                </div>
              </div>

              {/* Main Content & Side layout */}
              <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                
                {/* Story Body */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Article Stats */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pb-4 border-b border-slate-100 dark:border-navy-800">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>By {readingPost.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Published {readingPost.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{readingPost.readTime}</span>
                    </div>
                  </div>

                  {/* Core Content paragraphs */}
                  <div className="space-y-4 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                    {readingPost.content.split("\n\n").map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                    <p className="mt-4">
                      At Amazing Grace Homecare for the Elderly, our caregivers are specifically instructed on these wellness tips. We monitor dietary values daily, integrate gentle stretching routines under clinical oversight, and manage cognitive therapy programs to keep seniors safe, sharp, and secure.
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-2 pt-4">
                    <Tag className="w-4 h-4 text-slate-400" />
                    <div className="flex flex-wrap gap-1">
                      {readingPost.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono bg-slate-100 dark:bg-navy-800 text-slate-500 dark:text-slate-400 px-2.5 py-0.5 rounded">
                          #{tag.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Related writing side list */}
                <div className="lg:col-span-4 space-y-6 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-navy-800 pt-6 lg:pt-0 lg:pl-6">
                  <h4 className="font-display font-bold text-sm uppercase text-slate-400 tracking-wider">
                    Related Articles
                  </h4>
                  
                  <div className="space-y-4">
                    {getRelatedPosts(readingPost).map((related) => (
                      <div
                        key={related.id}
                        onClick={() => setReadingPost(related)}
                        className="flex gap-3 items-center cursor-pointer group"
                      >
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-16 h-16 object-cover rounded-xl shrink-0"
                        />
                        <div className="text-left space-y-0.5">
                          <h5 className="font-display font-bold text-xs text-navy-900 dark:text-white group-hover:text-emerald-600 line-clamp-2 leading-snug">
                            {related.title}
                          </h5>
                          <span className="text-[9px] text-slate-400 font-mono block uppercase">
                            {related.category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA card */}
                  <div className="p-4 rounded-2xl bg-emerald-950 text-white text-center space-y-3">
                    <p className="text-[11px] leading-relaxed text-emerald-200">
                      Looking for customized nutritional, dementia, or nursing care for an aging relative?
                    </p>
                    <button
                      onClick={() => {
                        setReadingPost(null);
                        const orderButton = document.getElementById("nav-order-now");
                        if (orderButton) orderButton.click();
                      }}
                      className="w-full py-2 bg-gold-500 hover:bg-gold-600 text-white text-xs font-semibold rounded-xl"
                    >
                      Book Professional Care
                    </button>
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
