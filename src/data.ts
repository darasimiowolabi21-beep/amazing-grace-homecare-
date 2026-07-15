/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceItem, TeamMember, GalleryItem, TestimonialItem, FAQItem, BlogPost, JobPosition } from "./types";

export const SERVICES: ServiceItem[] = [
  {
    id: "assisted-living",
    title: "Assisted Living",
    description: "Supportive residential care offering assistance with daily activities while promoting personal independence and active senior community life.",
    icon: "Home",
    category: "Daily Support"
  },
  {
    id: "elderly-homecare",
    title: "Elderly Homecare",
    description: "Personalized premium in-home care services custom-tailored to support comfort, safety, and dignity in the comfort of your own residence.",
    icon: "Heart",
    category: "Daily Support"
  },
  {
    id: "nursing-care",
    title: "24-Hour Nursing Care",
    description: "Round-the-clock professional medical and clinical supervision delivered by fully certified and registered healthcare professionals.",
    icon: "ShieldAlert",
    category: "Clinical"
  },
  {
    id: "hygiene-assistance",
    title: "Personal Hygiene Assistance",
    description: "Compassionate, highly respectful personal grooming, bathing, and dressing support maintaining the highest standards of dignity.",
    icon: "Sparkles",
    category: "Daily Support"
  },
  {
    id: "medication-management",
    title: "Medication Management",
    description: "Precise administration, tracking, and pharmacist-aligned monitoring of all medical prescriptions and custom health regimens.",
    icon: "Activity",
    category: "Clinical"
  },
  {
    id: "dementia-care",
    title: "Alzheimer's & Dementia Care",
    description: "Specialized cognitive support programs, sensory activities, and safety protocols led by certified memory care experts.",
    icon: "Brain",
    category: "Specialized"
  },
  {
    id: "stroke-recovery",
    title: "Stroke Recovery",
    description: "Structured neuro-rehabilitation support focusing on muscle strengthening, speech development, and cognitive coordination.",
    icon: "TrendingUp",
    category: "Specialized"
  },
  {
    id: "post-hospital-recovery",
    title: "Post-Hospital Recovery",
    description: "Transition plans bridging clinical discharge to home-comfort stability, avoiding readmissions and accelerating healing.",
    icon: "Sparkles",
    category: "Clinical"
  },
  {
    id: "companionship",
    title: "Companionship Services",
    description: "Engaging conversations, mental games, physical outings, and shared hobbies to foster emotional wellness and alleviate loneliness.",
    icon: "Smile",
    category: "Daily Support"
  },
  {
    id: "meal-preparation",
    title: "Meal Preparation",
    description: "Dietitian-approved, culturally familiar (including healthy Nigerian delicacies), and medically tailored meals cooked fresh daily.",
    icon: "Utensils",
    category: "Daily Support"
  },
  {
    id: "housekeeping",
    title: "Housekeeping",
    description: "Thorough light cleaning, laundry services, bed linens refreshment, and home sanitation to preserve a pristine environment.",
    icon: "CheckSquare",
    category: "Daily Support"
  },
  {
    id: "physiotherapy",
    title: "Physiotherapy Assistance",
    description: "Therapeutic exercises, stretching, and physical training designed to restore range of motion and overall flexibility.",
    icon: "Dumbbell",
    category: "Therapy"
  },
  {
    id: "mobility-support",
    title: "Mobility Support",
    description: "Attentive assistance with walking, standing, wheelchair transfers, and specialized posture correction techniques.",
    icon: "Accessibility",
    category: "Therapy"
  },
  {
    id: "palliative-care",
    title: "Palliative Care",
    description: "Symptom mitigation and holistic pain management focused on delivering maximum life comfort for chronic conditions.",
    icon: "Activity",
    category: "Specialized"
  },
  {
    id: "respite-care",
    title: "Respite Care",
    description: "Short-term temporary care plans designed to provide absolute peace of mind and rest for primary family caregivers.",
    icon: "Coffee",
    category: "Specialized"
  },
  {
    id: "wellness-monitoring",
    title: "Wellness Monitoring",
    description: "Continuous vital metrics logging, oxygen level tracking, hydration supervision, and routine preventative health audits.",
    icon: "Pulse",
    category: "Clinical"
  },
  {
    id: "family-support",
    title: "Family Caregiver Support",
    description: "One-on-one professional guidance, emotional support groups, and skills training for family members managing elderly care.",
    icon: "Users",
    category: "Specialized"
  },
  {
    id: "transportation",
    title: "Transportation Assistance",
    description: "Safe, escorted transport to medical checkups, places of worship, social visits, and recreational outings in Ondo State.",
    icon: "Car",
    category: "Daily Support"
  }
];

export const TEAM: TeamMember[] = [
  {
    id: "dr-folorunsho",
    name: "Dr. Adebayo Folorunsho",
    role: "Medical Director & Geriatric Specialist",
    qualification: "MD, FWACP (Geriatrics & Internal Medicine)",
    experience: 22,
    bio: "Dr. Folorunsho leads the clinical strategy, ensuring that all our medical oversight, pharmaceutical, and diagnosis interventions meet strict international standards of safety and clinical excellence.",
    image: "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&w=400&q=80",
    department: "Medical"
  },
  {
    id: "nurse-funmi",
    name: "Mrs. Funmilayo Adesida",
    role: "Chief Nursing Officer",
    qualification: "B.Sc Nursing, Registered Nurse (RN)",
    experience: 18,
    bio: "Nurse Adesida coordinates the round-the-clock nursing staff, bringing close to two decades of specialized geriatric care experience from leading healthcare establishments.",
    image: "https://images.unsplash.com/photo-1622960748096-19d36881794e?auto=format&fit=crop&w=400&q=80",
    department: "Nursing"
  },
  {
    id: "physio-chidi",
    name: "Mr. Chidinma Okafor",
    role: "Lead Geriatric Physiotherapist",
    qualification: "B.Physiotherapy, MCSP",
    experience: 12,
    bio: "Chidi designs bespoke mobility and strength restoration programs for our elderly residents, helping stroke survivors and post-hospital patients regain active, joyful lives.",
    image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=400&q=80",
    department: "Therapy"
  },
  {
    id: "nutritionist-yetunde",
    name: "Mrs. Yetunde Babalola",
    role: "Consultant Senior Nutritionist",
    qualification: "M.Sc Food & Nutrition (Dietetics)",
    experience: 10,
    bio: "Yetunde creates clinical dietary outlines and tasty, digestible meal schedules featuring balanced, nutrient-rich local ingredients tailored for the metabolic needs of aging citizens.",
    image: "https://images.unsplash.com/photo-1579684389782-b15c7a6c6246?auto=format&fit=crop&w=400&q=80",
    department: "Support"
  },
  {
    id: "care-biyi",
    name: "Mr. Olabiyi Alao",
    role: "Senior Care Coordinator",
    qualification: "Diploma in Social Work & Elderly Support",
    experience: 8,
    bio: "Olabiyi manages the daily schedule of our dedicated care assistants, ensuring home care programs align perfectly with the unique lifestyle rhythms of every family we serve.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=400&q=80",
    department: "Support"
  },
  {
    id: "nurse-joy",
    name: "Ms. Joy Amadi",
    role: "Registered Nurse & Dementia Therapist",
    qualification: "RN, Cognitive Behavior Specialist",
    experience: 7,
    bio: "Joy focuses on cognitive therapy for Alzheimer's and Dementia residents, creating structured safety games and soothing activities that protect and calm memory-challenged seniors.",
    image: "https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&w=400&q=80",
    department: "Nursing"
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: "gal-bedroom",
    title: "Premium Luxury Assisted Suite",
    category: "Bedrooms",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-garden",
    title: "Serene Therapeutic Gardens",
    category: "Gardens",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-recreation",
    title: "Social Lounge and Activity Hall",
    category: "Recreation Areas",
    image: "https://images.unsplash.com/photo-1517502884422-41eaaced0168?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-therapy",
    title: "State-of-the-art Physiotherapy Session",
    category: "Therapy Sessions",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-dining",
    title: "Nutritious Family Dining Area",
    category: "Dining Areas",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-family",
    title: "Warm Family Reunion Lawn",
    category: "Family Visits",
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-medical",
    title: "Clinical Wellness Monitoring",
    category: "Medical Care",
    image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-activities",
    title: "Daily Cognitive Stimulation Session",
    category: "Daily Activities",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80"
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Dr. Kunle Balogun",
    relation: "Son of Resident (Lagos/Akure)",
    rating: 5,
    text: "Deciding on elderly care for my aging father was very stressful. Finding Amazing Grace Homecare was an absolute blessing. Their medical team is professional, and they treated my father with the exact respect, tenderness, and absolute dignity he deserves.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "test-2",
    name: "Mrs. Chioma Nwachukwu",
    relation: "Daughter of Resident (UK Diaspora)",
    rating: 5,
    text: "Living in the UK while my mom resided in Ondo State was painful. Amazing Grace completely closed the distance gap. They send regular updates, manage her daily stroke recovery therapy, and coordinate her medications flawlessly. God bless this amazing team!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "test-3",
    name: "Engr. Segun Adeoye",
    relation: "Nephew of Palliative Care Recipient",
    rating: 5,
    text: "During my aunt's palliative care stage, Amazing Grace provided round-the-clock nursing care that focused heavily on comfort, pain management, and peace of mind. Their compassionate approach made a tremendously difficult period manageable for our entire family.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-admission",
    question: "What is the admission and enrollment process like?",
    answer: "It starts with a complimentary physical or virtual nursing and wellness assessment. We review medical records, understand dietary and mobility preferences, and build a custom, family-aligned Care Plan. Once signed, care can commence within 24 to 48 hours.",
    category: "Admission Process"
  },
  {
    id: "faq-visiting",
    question: "What are the visiting hours for families at your assisted living facility?",
    answer: "We advocate for active family presence. Visiting hours are daily from 9:00 AM to 7:00 PM. Special accommodations are made for diasporic family reunions, clinical occurrences, and festive holiday dinners.",
    category: "Visiting Hours"
  },
  {
    id: "faq-costs",
    question: "How are care services priced, and do you offer customizable budgets?",
    answer: "Costs depend entirely on the level of clinical support, duration (e.g. daily, live-in, 24-hour shift), and whether services are in-home or residential. We outline fully transparent billing with zero hidden fees, and customize packages to fit families.",
    category: "Costs"
  },
  {
    id: "faq-medical",
    question: "How do you handle medical situations and medication routines?",
    answer: "All treatments are directed by our Medical Director, Dr. Folorunsho, in coordination with the patient's personal doctors. We administer medicines strictly via double-verified nurse logs and monitor vitals continuously.",
    category: "Medical Support"
  },
  {
    id: "faq-plans",
    question: "Can we adjust our care schedule as our parent's health situation changes?",
    answer: "Yes, our care plans are highly flexible. We conduct automated reviews every 30 days and modify hours, nurse skills, physical therapies, or nutrition protocols immediately whenever needs shift.",
    category: "Care Plans"
  },
  {
    id: "faq-safety",
    question: "What safety protocols are active in your facilities?",
    answer: "We feature slip-resistant senior-friendly wet areas, continuous safety handle railings, CCTV in shared hallways, strict visitor logs, smoke sensors, and immediate bedside panic buttons to avoid falls and ensure ultimate protection.",
    category: "Safety Measures"
  },
  {
    id: "faq-emergency",
    question: "How does the emergency response network operate?",
    answer: "We maintain on-site certified nurses, standby emergency vehicles, and priority agreements with leading hospital clinics in Akure, Ondo State. Families are notified instantly through a dedicated clinical coordinator.",
    category: "Emergency Response"
  },
  {
    id: "faq-payment",
    question: "What payment structures do you support?",
    answer: "We support standard bank transfers, card payments through secure gateways, corporate checks, and monthly direct debits. Invoices are dispatched digitally to primary family sponsors worldwide.",
    category: "Payment Options"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "10 Crucial Tips for Healthy and Graceful Aging",
    excerpt: "Discover the vital pillars of physical activity, cognitive training, hydration, and nutritional planning that can keep seniors living active, independent lives.",
    content: "Aging gracefully requires a proactive focus on physical, social, and emotional health. From engaging in light exercises like walking or geriatric stretching to maintaining robust cognitive challenges (like solving puzzle games, reading, or participating in family storytelling), keeping active prevents cellular stagnation. Hydration is incredibly critical for seniors, who often experience diminished thirst sensation. We recommend planning small, frequent intakes of mineral-rich water and fiber-dense local fruits to maintain optimal metabolic function and keep the digestive system vibrant.",
    category: "Healthy Aging Tips",
    date: "July 12, 2026",
    author: "Dr. Adebayo Folorunsho",
    readTime: "5 mins read",
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=600&q=80",
    tags: ["Aging", "Nutrition", "Longevity"]
  },
  {
    id: "blog-2",
    title: "Superfoods for Seniors: Nutritional Guidance for Longevity",
    excerpt: "What are the most effective native and accessible superfoods to support bone density, cognitive recall, and immune defense in seniors?",
    content: "As metabolism shifts, seniors require foods dense in antioxidants, calcium, and lean protein. Including nutrient-rich ingredients such as local vegetables (Ugu, Ewedu), complex slow-release fibers (Unripe Plantain flour, Oatmeal), and calcium-dense elements is perfect. Reducing processed sodium while utilizing natural, aromatic herbs (ginger, garlic, turmeric) keeps cardiovascular health intact while preserving appetizing flavors for seniors with dulled taste senses.",
    category: "Nutrition",
    date: "July 05, 2026",
    author: "Mrs. Yetunde Babalola",
    readTime: "4 mins read",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=600&q=80",
    tags: ["Diet", "Superfoods", "Geriatrics"]
  },
  {
    id: "blog-3",
    title: "Understanding Alzheimer's & Dementia: A Guide for Families",
    excerpt: "Learn how to recognize early signs of cognitive shifts and create a calming, protective home environment for memory-challenged loved ones.",
    content: "Cognitive conditions like Alzheimer's can trigger confusion and emotional vulnerability. Families must learn to avoid direct confrontation during memory slips, and instead focus on validation and warm redirection. Creating a stable routine with visual calendar boards, consistent lighting to avoid sundowning anxiety, and removing tripping hazards forms a secure sanctuary. Memory games, simple household chores, and sensory music play can stimulate nerve pathways and preserve cognitive capacity.",
    category: "Dementia Care",
    date: "June 28, 2026",
    author: "Mrs. Funmilayo Adesida",
    readTime: "6 mins read",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80",
    tags: ["Dementia", "Memory Care", "Family Tips"]
  },
  {
    id: "blog-4",
    title: "Balancing Career and Caregiving: Avoiding Burnout",
    excerpt: "Primary family caregivers face enormous mental stress. Learn proven stress-relief exercises and how respite programs can provide essential relief.",
    content: "Caring for a senior parent while managing career deadlines frequently triggers physical and mental burnout. It is vital to establish boundaries, schedule micro-breaks, and lean on professional respite systems. Accepting assistance is not a failure—it ensures your loved one receives skilled medical care while you recharge. Remember, to give care of quality, you must first keep your own health, rest, and emotional well-being intact.",
    category: "Caregiver Advice",
    date: "June 15, 2026",
    author: "Mr. Olabiyi Alao",
    readTime: "5 mins read",
    image: "https://images.unsplash.com/photo-1576765608622-067973a79f53?auto=format&fit=crop&w=600&q=80",
    tags: ["Respite", "Stress Relief", "Caregivers"]
  }
];

export const JOBS: JobPosition[] = [
  {
    id: "job-rn",
    title: "Registered Nurse (RN) - Geriatric Specialty",
    department: "Nursing Division",
    location: "Akure, Ondo State",
    type: "Full-Time (Shift-based)",
    description: "We are seeking compassionate, fully certified Registered Nurses to lead our clinical support shifts and provide 24/7 care monitoring for our elderly residents and in-home patients.",
    requirements: [
      "Registered Nurse (RN) or Registered Midwife (RM) license in active standing.",
      "Minimum of 3 years clinical care experience, ideally in geriatrics, palliative, or ICU units.",
      "Excellent communication, diagnostic record-keeping, and empathetic bedside manner.",
      "Proactive crisis management skills and medication safety knowledge."
    ],
    benefits: [
      "Highly competitive salary package with prompt monthly payouts.",
      "Paid annual clinical development and certificate courses.",
      "Comprehensive medical insurance including dental and vision benefits.",
      "Subsidized transport, accommodation options, and premium staff meals."
    ]
  },
  {
    id: "job-ca",
    title: "Elderly Care Assistant",
    department: "Daily Support Team",
    location: "Akure, Ondo State",
    type: "Full-Time / Part-Time",
    description: "Support our beloved elderly residents with physical mobility, personal hygiene, delicious dietary intake, and uplifting cognitive companionship.",
    requirements: [
      "Certified First Aid / Caregiving training or Diploma in Social Work.",
      "Genuine patience, outstanding compassion, and physical stamina for senior assistance.",
      "Fluency in English and Yoruba is highly preferred to foster rich conversations.",
      "Strong references showing integrity, honesty, and reliable character."
    ],
    benefits: [
      "Warm, supportive, and safe team working atmosphere.",
      "Continuous hands-on nursing, dementia, and safety training.",
      "Flexible shift planning matching your personal schedule.",
      "Overtime bonuses and outstanding career development opportunities."
    ]
  },
  {
    id: "job-physio",
    title: "Geriatric Physiotherapy Assistant",
    department: "Therapeutic Division",
    location: "Akure, Ondo State",
    type: "Contract / Part-Time",
    description: "Collaborate with our lead Physiotherapist to implement customized mobility, flexibility, and post-stroke recovery exercise programs.",
    requirements: [
      "Degree or Diploma in Physiotherapy, Kinesiology, or Sports Science.",
      "Familiarity with senior-safe exercises, transfer protocols, and massage therapies.",
      "Ability to inspire positive mood and perseverance during physical exercises.",
      "Accurate progress reporting and scheduling discipline."
    ],
    benefits: [
      "Attractive session-based premium payout rates.",
      "Referrals to high-profile private in-home client contracts.",
      "Integration into a world-class professional health panel.",
      "Paid workshops on modern neuro-rehabilitation techniques."
    ]
  }
];
