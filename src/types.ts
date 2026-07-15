/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "Clinical" | "Daily Support" | "Specialized" | "Therapy";
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  qualification: string;
  experience: number;
  bio: string;
  image: string;
  department: "Medical" | "Nursing" | "Therapy" | "Support";
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  relation: string;
  rating: number;
  text: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}
