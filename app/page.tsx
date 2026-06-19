"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Star, CheckCircle, ArrowRight, Shield, Clock, Award, Users, ChevronDown, MapPin, Briefcase, Heart, Zap, ThumbsUp, MessageCircle } from 'lucide-react';
import {
  APP_NAME,
  APP_TAGLINE,
  APP_DESCRIPTION,
  CATEGORIES,
  PAKISTANI_CITIES,
  formatPKR,
  type Tasker,
  type Task,
} from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const FEATURED_TASKS: Task[] = [
  {
    id: "t1",
    title: "Need AC Repair & Gas Refilling at Home",
    category: "Home Services",
    budget: 3500,
    location: "Karachi",
    description:
      "My split AC is not cooling properly. Need a technician to check gas levels and repair if needed.",
    status: "open",
    postedAt: "2 hours ago",
    bidsCount: 7,
    clientName: "Asad Mehmood",
    clientAvatar: "/images/client-asad-mehmood.jpg",
  },
  {
    id: "t2",
    title: "Math & Physics Tutor for Matric Student",
    category: "Tutoring",
    budget: 8000,
    location: "Lahore",
    description:
      "Looking for an experienced tutor for my son who is in 10th grade. 5 days a week, 2 hours per session.",
    status: "open",
    postedAt: "5 hours ago",
    bidsCount: 12,
    clientName: "Sana Iqbal",
    clientAvatar: "/images/client-sana-iqbal.jpg",
  },
  {
    id: "t3",
    title: "Office Deep Cleaning — 3 Floors",
    category: "Cleaning",
    budget: 12000,
    location: "Islamabad",
    description:
      "Need a professional cleaning team for a 3-floor office building. Weekend availability preferred.",
    status: "open",
    postedAt: "1 day ago",
    bidsCount: 5,
    clientName: "Tariq Enterprises",
    clientAvatar: "/images/client-tariq-enterprises.jpg",
  },
  {
    id: "t4",
    title: "Laptop Repair — Screen Replacement",
    category: "Tech Support",
    budget: 6500,
    location: "Rawalpindi",
    description:
      "Dell laptop screen cracked. Need genuine replacement screen and professional installation.",
    status: "open",
    postedAt: "3 hours ago",
    bidsCount: 9,
    clientName: "Bilal Chaudhry",
    clientAvatar: "/images/client-bilal-chaudhry.jpg",
  },
  {
    id: "t5",
    title: "Wedding Photography — 2-Day Event",
    category: "Photography",
    budget: 45000,
    location: "Faisalabad",
    description:
      "Looking for a professional photographer for a 2-day wedding event. Must have portfolio.",
    status: "open",
    postedAt: "6 hours ago",
    bidsCount: 18,
    clientName: "Nadia Hussain",
    clientAvatar: "/images/client-nadia-hussain.jpg",
  },
  {
    id: "t6",
    title: "Furniture Moving — 3BHK Apartment",
    category: "Delivery & Moving",
    budget: 9000,
    location: "Multan",
    description:
      "Moving to a new apartment. Need 4-5 helpers and a truck for furniture and boxes.",
    status: "open",
    postedAt: "12 hours ago",
    bidsCount: 6,
    clientName: "Kamran Ali",
    clientAvatar: "/images/client-kamran-ali.jpg",
  },
];

const TOP_TASKERS: Tasker[] = [
  {
    id: "tk1",
    name: "Usman Farooq",
    avatar: "/images/tasker-usman-farooq.jpg",
    skills: ["Plumbing", "Electrical", "AC Repair"],
    rating: 4.9,
    reviewCount: 214,
    completedTasks: 312,
    hourlyRate: 800,
    location: "Karachi",
    bio: "Certified electrician and plumber with 8+ years of experience. Available 7 days a week.",
    verified: true,
  },
  {
    id: "tk2",
    name: "Ayesha Raza",
    avatar: "/images/tasker-ayesha-raza.jpg",
    skills: ["Tutoring", "Math", "Physics", "Chemistry"],
    rating: 4.8,
    reviewCount: 178,
    completedTasks: 245,
    hourlyRate: 1200,
    location: "Lahore",
    bio: "MSc Physics graduate from LUMS. Specialized in O/A-Level and Matric exam preparation.",
    verified: true,
  },
  {
    id: "tk3",
    name: "Hamza Sheikh",
    avatar: "/images/tasker-hamza-sheikh.jpg",
    skills: ["Photography", "Videography", "Editing"],
    rating: 4.9,
    reviewCount: 132,
    completedTasks: 189,
    hourlyRate: 2500,
    location: "Islamabad",
    bio: "Professional photographer with 6 years of experience in weddings, events, and commercial shoots.",
    verified: true,
  },
  {
    id: "tk4",
    name: "Fatima Malik",
    avatar: "/images/tasker-fatima-malik.jpg",
    skills: ["Cleaning", "Deep Cleaning", "Laundry"],
    rating: 4.7,
    reviewCount: 96,
    completedTasks: 143,
    hourlyRate: 600,
    location: "Rawalpindi",
    bio: "Professional cleaning specialist with eco-friendly products. Residential and commercial.",
    verified: true,
  },
];

const TESTIMONIALS = [
  {
    id: "r1",
    name: "Zara Ahmed",
    city: "Karachi",
    avatar: "/images/review-zara-ahmed.jpg",
    rating: 5,
    text: "KaamKaro ne meri zindagi aasan kar di! AC repair ke liye ek ghante mein technician aa gaya. Bahut professional service thi.",
    task: "AC Repair",
  },
  {
    id: "r2",
    name: "Imran Butt",
    city: "Lahore",
    avatar: "/images/review-imran-butt.jpg",
    rating: 5,
    text: "My son's grades improved dramatically after hiring a tutor through KaamKaro. The platform made it so easy to find a verified, qualified teacher.",
    task: "Tutoring",
  },
  {
    id: "r3",
    name: "Mehwish Tariq",
    city: "Islamabad",
    avatar: "/images/review-mehwish-tariq.jpg",
    rating: 5,
    text: "Hired a photographer for my wedding through KaamKaro. The photos were absolutely stunning. Highly recommend this platform!",
    task: "Wedding Photography",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Briefcase,
    title: "Post Your Task",
    description:
      "Describe what you need done, set your budget, and choose your city. It's free and takes less than 2 minutes.",
    color: "from-green-400 to-emerald-500",
  },
  {
    step: "02",
    icon: Users,
    title: "Receive Bids",
    description:
      "Verified local Taskers will send you competitive bids. Review their profiles, ratings, and past work.",
    color: "from-blue-400 to-indigo-500",
  },
  {
    step: "03",
    icon: MessageCircle,
    title: "Choose & Chat",
    description:
      "Select the best Tasker, discuss details via our secure chat, and confirm the job with confidence.",
    color: "from-purple-400 to-violet-500",
  },
  {
    step: "04",
    icon: ThumbsUp,
    title: "Get It Done",
    description:
      "Your Tasker completes the job. Release payment only when you're 100% satisfied. Leave a review.",
    color: "from-orange-400 to-amber-500",
  },
];

const VALUE_PROPS = [
  {
    icon: Shield,
    title: "Verified Taskers",
    description:
      "Every Tasker goes through CNIC verification and background checks before joining KaamKaro.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Clock,
    title: "Fast Response",
    description:
      "Post a task and receive your first bid within minutes. Most tasks are filled within 2 hours.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description:
      "Not satisfied? We'll make it right. Our satisfaction guarantee protects every transaction.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Zap,
    title: "Secure Payments",
    description:
      "Pay safely via JazzCash, EasyPaisa, or bank transfer. Funds are held securely until job completion.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

const STATS = [
  { value: "50,000+", label: "Tasks Completed" },
  { value: "12,000+", label: "Verified Taskers" },
  { value: "35+", label: "Cities Covered" },
  { value: "4.8★", label: "Average Rating" },
];

// ─── Sub-components (inline) ─────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={13}
          className={
            i <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
    </div>
  );
}

function CategoryBadge({ name }: { name: string }) {
  const colorMap: Record<string, string> = {
    "Home Services": "bg-green-100 text-green-700",
    Cleaning: "bg-blue-100 text-blue-700",
    "Delivery & Moving": "bg-orange-100 text-orange-700",
    Tutoring: "bg-purple-100 text-purple-700",
    "Tech Support": "bg-indigo-100 text-indigo-700",
    "Beauty & Wellness": "bg-pink-100 text-pink-700",
    "Repairs & Handyman": "bg-teal-100 text-teal-700",
    Photography: "bg-yellow-100 text-yellow-700",
  };
  const cls = colorMap[name] ?? "bg-gray-100 text-gray-700";
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${cls}`}>
      {name}
    </span>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Karachi");
  const [activeCategory, setActiveCategory] = useState("all");
  const [postTaskName, setPostTaskName] = useState("");
  const [postTaskDesc, setPostTaskDesc] = useState("");
  const [postTaskBudget, setPostTaskBudget] = useState("");
  const [postTaskCity, setPostTaskCity] = useState("Karachi");
  const [postTaskCategory, setPostTaskCategory] = useState("Home Services");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredTasks =
    activeCategory === "all"
      ? FEATURED_TASKS
      : FEATURED_TASKS.filter((t) => t.category === activeCategory);

  function handlePostTask(e: React.FormEvent) {
    e.preventDefault();
    setFormSubmitted(true);
  }

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#f0fdf4] via-white to-[#e8f5e9] pt-20">
        {/* Decorative blobs */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-green-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Pakistan's #1 Task Marketplace
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight font-poppins">
                  Hire Local{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1DBF73] to-[#17a862]">
                    Experts
                  </span>{" "}
                  for Any Task
                </h1>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-gray-600 leading-relaxed max-w-lg"
              >
                {APP_DESCRIPTION} From home repairs to tutoring, cleaning to
                photography — find trusted Taskers in your city within minutes.
              </motion.p>

              {/* Search bar */}
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-xl shadow-green-100/50 p-2 flex flex-col sm:flex-row gap-2 border border-green-100"
              >
                <div className="flex items-center gap-3 flex-1 px-4 py-2">
                  <Search size={20} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="What task do you need done?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 outline-none text-gray-800 placeholder-gray-400 text-sm bg-transparent"
                  />
                </div>
                <div className="flex items-center gap-2 px-4 py-2 border-t sm:border-t-0 sm:border-l border-gray-100">
                  <MapPin size={16} className="text-gray-400 flex-shrink-0" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="outline-none text-gray-700 text-sm bg-transparent cursor-pointer"
                  >
                    {PAKISTANI_CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gradient-to-r from-[#1DBF73] to-[#17a862] text-white font-semibold px-6 py-3 rounded-xl text-sm shadow-lg shadow-green-200 hover:shadow-green-300 transition-shadow"
                >
                  Search Tasks
                </motion.button>
              </motion.div>

              {/* Popular searches */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap items-center gap-2"
              >
                <span className="text-sm text-gray-500">Popular:</span>
                {["AC Repair", "Tutoring", "Cleaning", "Photography", "Plumber"].map(
                  (tag) => (
                    <motion.button
                      key={tag}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSearchQuery(tag)}
                      className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-green-400 hover:text-green-600 transition-colors shadow-sm"
                    >
                      {tag}
                    </motion.button>
                  )
                )}
              </motion.div>

              {/* Stats row */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-6 pt-2"
              >
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-gray-900 font-poppins">
                      {s.value}
                    </p>
                    <p className="text-xs text-gray-500">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — floating task cards */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="relative hidden lg:block"
            >
              <div className="relative w-full h-[520px]">
                {/* Main card */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-8 left-4 right-4 bg-white rounded-2xl shadow-2xl shadow-gray-200/60 p-6 border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <CategoryBadge name="Home Services" />
                      <h3 className="font-semibold text-gray-900 mt-2 text-lg">
                        AC Repair & Gas Refilling
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
                        <MapPin size={13} />
                        <span>Karachi, DHA Phase 5</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-[#1DBF73]">
                        {formatPKR(3500)}
                      </p>
                      <p className="text-xs text-gray-400">Budget</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                        A
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-700">
                          Asad Mehmood
                        </p>
                        <p className="text-xs text-gray-400">2 hours ago</p>
                      </div>
                    </div>
                    <span className="text-xs bg-green-50 text-green-600 font-medium px-3 py-1 rounded-full">
                      7 Bids
                    </span>
                  </div>
                </motion.div>

                {/* Floating badge — tasker accepted */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute bottom-28 right-0 bg-white rounded-xl shadow-xl shadow-gray-200/60 p-4 border border-gray-100 w-56"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      U
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">
                        Usman Farooq
                      </p>
                      <div className="flex items-center gap-1">
                        <StarRating rating={4.9} />
                        <span className="text-xs text-gray-500">4.9</span>
                      </div>
                      <p className="text-xs text-green-600 font-medium mt-0.5">
                        ✓ Bid Accepted
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating badge — payment */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute bottom-4 left-4 bg-white rounded-xl shadow-xl shadow-gray-200/60 p-3 border border-gray-100 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                    <Shield size={18} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      Secure Payment
                    </p>
                    <p className="text-xs text-gray-500">JazzCash · EasyPaisa</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400"
        >
          <span className="text-xs">Scroll to explore</span>
          <ChevronDown size={18} />
        </motion.div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block bg-green-50 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
            >
              Simple & Fast
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-gray-900 font-poppins mb-4"
            >
              How KaamKaro Works
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-500 max-w-xl mx-auto text-lg"
            >
              From posting a task to getting it done — the whole process is
              designed to be effortless for both clients and Taskers.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {HOW_IT_WORKS.map((step, idx) => (
              <motion.div
                key={step.step}
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="relative bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/60 p-8 text-center group hover:border-green-200 transition-colors"
              >
                {/* Connector line */}
                {idx < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-8 h-0.5 bg-gradient-to-r from-gray-200 to-gray-100 z-10" />
                )}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <step.icon size={26} className="text-white" />
                </div>
                <span className="text-xs font-bold text-gray-300 tracking-widest">
                  STEP {step.step}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3 font-poppins">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────────────── */}
      <section
        id="categories"
        className="py-24 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
            >
              Browse by Category
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-gray-900 font-poppins mb-4"
            >
              Find the Right Service
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-500 max-w-xl mx-auto"
            >
              Thousands of skilled Taskers across every service category, ready
              to help you in your city.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {CATEGORIES.map((cat) => (
              <motion.div
                key={cat.id}
                variants={scaleIn}
                whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.97 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-md shadow-gray-100/50 p-6 cursor-pointer hover:border-green-200 hover:shadow-green-100/60 transition-all group"
                style={{ backgroundColor: cat.color }}
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-[#1DBF73] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {(cat.taskCount ?? 0).toLocaleString()} tasks
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED TASKS ───────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
          >
            <div>
              <motion.span
                variants={fadeInUp}
                className="inline-block bg-orange-50 text-orange-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
              >
                Live Tasks
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl sm:text-4xl font-bold text-gray-900 font-poppins"
              >
                Tasks Open Right Now
              </motion.h2>
            </div>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`text-xs font-medium px-4 py-2 rounded-full border transition-all ${
                  activeCategory === "all"
                    ? "bg-[#1DBF73] text-white border-[#1DBF73]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-green-300"
                }`}
              >
                All
              </button>
              {CATEGORIES.slice(0, 4).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`text-xs font-medium px-4 py-2 rounded-full border transition-all ${
                    activeCategory === cat.name
                      ? "bg-[#1DBF73] text-white border-[#1DBF73]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-green-300"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {(filteredTasks.length > 0 ? filteredTasks : FEATURED_TASKS).map(
              (task) => (
                <motion.div
                  key={task.id}
                  variants={fadeInUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 p-6 hover:border-green-200 hover:shadow-green-100/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <CategoryBadge name={task.category} />
                    <span className="text-xs text-gray-400">{task.postedAt}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1DBF73] transition-colors leading-snug">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                    {task.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
                    <MapPin size={13} className="text-gray-400" />
                    <span>{task.location}</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-lg font-bold text-[#1DBF73]">
                        {formatPKR(task.budget)}
                      </p>
                      <p className="text-xs text-gray-400">Budget</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                        {(task.clientName ?? "?").charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-700">
                          {task.clientName}
                        </p>
                        <p className="text-xs text-gray-400">
                          {task.bidsCount} bids
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-white border-2 border-[#1DBF73] text-[#1DBF73] font-semibold px-8 py-3.5 rounded-xl hover:bg-green-50 transition-colors"
            >
              View All Tasks <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── TOP TASKERS ──────────────────────────────────────────────────── */}
      <section
        id="taskers"
        className="py-24 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block bg-purple-50 text-purple-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
            >
              Top Rated
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-gray-900 font-poppins mb-4"
            >
              Meet Our Top Taskers
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-500 max-w-xl mx-auto"
            >
              Verified professionals with proven track records. Hire with
              confidence knowing every Tasker is background-checked.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {TOP_TASKERS.map((tasker) => (
              <motion.div
                key={tasker.id}
                variants={scaleIn}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 p-6 text-center hover:border-green-200 hover:shadow-green-100/50 transition-all group cursor-pointer"
              >
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-lg">
                    {(tasker.name ?? "?").charAt(0)}
                  </div>
                  {tasker.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                      <CheckCircle size={12} className="text-white" />
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 mb-1 font-poppins group-hover:text-[#1DBF73] transition-colors">
                  {tasker.name}
                </h3>
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <StarRating rating={tasker.rating} />
                  <span className="text-xs font-semibold text-gray-700">
                    {tasker.rating}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({tasker.reviewCount})
                  </span>
                </div>
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-3">
                  <MapPin size={11} />
                  <span>{tasker.location}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                  {(tasker.skills ?? []).slice(0, 2).map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm">
                  <div>
                    <p className="font-bold text-gray-900">
                      {tasker.completedTasks}
                    </p>
                    <p className="text-xs text-gray-400">Tasks Done</p>
                  </div>
                  <div>
                    <p className="font-bold text-[#1DBF73]">
                      {formatPKR(tasker.hourlyRate)}/hr
                    </p>
                    <p className="text-xs text-gray-400">Rate</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full mt-4 bg-gradient-to-r from-[#1DBF73] to-[#17a862] text-white text-sm font-semibold py-2.5 rounded-xl shadow-md shadow-green-200 hover:shadow-green-300 transition-shadow"
                >
                  View Profile
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY KAAMKARO ─────────────────────────────────────────────────── */}
      <section
        id="about"
        className="py-24 bg-gradient-to-br from-[#1DBF73]/5 via-white to-emerald-50/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-8"
            >
              <div>
                <span className="inline-block bg-green-50 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
                  Why Choose Us
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-poppins mb-4">
                  Pakistan Ka Apna Task Platform
                </h2>
                <p className="text-gray-500 leading-relaxed">
                  KaamKaro is built specifically for Pakistan — supporting Urdu,
                  local payment methods like JazzCash and EasyPaisa, and
                  understanding the unique needs of Pakistani households and
                  businesses.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {VALUE_PROPS.map((vp) => (
                  <motion.div
                    key={vp.title}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="bg-white rounded-xl border border-gray-100 shadow-md shadow-gray-100/50 p-5 hover:border-green-200 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 ${vp.bg} rounded-xl flex items-center justify-center mb-3`}
                    >
                      <vp.icon size={20} className={vp.color} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1.5 text-sm">
                      {vp.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {vp.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/60 p-8 border border-gray-100">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {STATS.map((s) => (
                    <div
                      key={s.label}
                      className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 text-center border border-green-100"
                    >
                      <p className="text-3xl font-bold text-[#1DBF73] font-poppins">
                        {s.value}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {[
                    "✓ CNIC-verified Taskers only",
                    "✓ JazzCash & EasyPaisa payments",
                    "✓ Urdu & English support",
                    "✓ 24/7 customer service",
                    "✓ Money-back guarantee",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-gray-700"
                    >
                      <span className="text-[#1DBF73] font-bold">{item.slice(0, 1)}</span>
                      <span>{item.slice(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block bg-yellow-50 text-yellow-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
            >
              Customer Stories
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-gray-900 font-poppins mb-4"
            >
              What Our Users Say
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-500 max-w-xl mx-auto"
            >
              Thousands of satisfied clients and Taskers across Pakistan trust
              KaamKaro every day.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-3 gap-6"
          >
            {TESTIMONIALS.map((review) => (
              <motion.div
                key={review.id}
                variants={fadeInUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 p-7 hover:border-green-200 transition-all"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={15}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {(review.name ?? "?").charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {review.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {review.city} · {review.task}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── POST A TASK CTA ───────────────────────────────────────────────── */}
      <section
        id="post-task"
        className="py-24 bg-gradient-to-br from-[#1DBF73] to-[#17a862]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left copy */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-white space-y-6"
            >
              <h2 className="text-3xl sm:text-4xl font-bold font-poppins leading-tight">
                Ready to Get Your Task Done?
              </h2>
              <p className="text-green-100 text-lg leading-relaxed">
                Post your task for free and receive competitive bids from
                verified local Taskers within minutes. No commitment until you
                choose.
              </p>
              <div className="space-y-3">
                {[
                  "Free to post — no upfront cost",
                  "Receive bids within minutes",
                  "Pay only when satisfied",
                  "Secure JazzCash & EasyPaisa payments",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-white flex-shrink-0" />
                    <span className="text-green-50 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — post task form */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <div className="bg-white rounded-3xl shadow-2xl shadow-black/10 p-8">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-[#1DBF73]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">
                      Task Posted!
                    </h3>
                    <p className="text-gray-500 text-sm mb-6">
                      Your task has been posted. Taskers will start bidding
                      shortly.
                    </p>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setPostTaskName("");
                        setPostTaskDesc("");
                        setPostTaskBudget("");
                      }}
                      className="text-[#1DBF73] font-semibold text-sm hover:underline"
                    >
                      Post Another Task
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handlePostTask} className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1 font-poppins">
                        Post a Task
                      </h3>
                      <p className="text-sm text-gray-500">
                        Tell us what you need — it's free!
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Task Title
                      </label>
                      <input
                        type="text"
                        value={postTaskName}
                        onChange={(e) => setPostTaskName(e.target.value)}
                        placeholder="e.g. Need AC repair at home"
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#1DBF73] focus:ring-2 focus:ring-green-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Description
                      </label>
                      <textarea
                        value={postTaskDesc}
                        onChange={(e) => setPostTaskDesc(e.target.value)}
                        placeholder="Describe your task in detail..."
                        rows={3}
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#1DBF73] focus:ring-2 focus:ring-green-100 transition-all resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Category
                        </label>
                        <select
                          value={postTaskCategory}
                          onChange={(e) => setPostTaskCategory(e.target.value)}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#1DBF73] focus:ring-2 focus:ring-green-100 transition-all bg-white"
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          City
                        </label>
                        <select
                          value={postTaskCity}
                          onChange={(e) => setPostTaskCity(e.target.value)}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#1DBF73] focus:ring-2 focus:ring-green-100 transition-all bg-white"
                        >
                          {PAKISTANI_CITIES.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Budget (PKR)
                      </label>
                      <input
                        type="number"
                        value={postTaskBudget}
                        onChange={(e) => setPostTaskBudget(e.target.value)}
                        placeholder="e.g. 5000"
                        min="0"
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#1DBF73] focus:ring-2 focus:ring-green-100 transition-all"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#1DBF73] to-[#17a862] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-200 hover:shadow-green-300 transition-shadow text-sm"
                    >
                      Post Task for Free →
                    </motion.button>
                    <p className="text-xs text-gray-400 text-center">
                      By posting, you agree to our Terms of Service & Privacy
                      Policy.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-6"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block bg-indigo-50 text-indigo-700 text-sm font-semibold px-4 py-2 rounded-full"
            >
              Get In Touch
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-gray-900 font-poppins"
            >
              We're Here to Help
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-500 max-w-xl mx-auto"
            >
              Have questions about KaamKaro? Our support team is available 7
              days a week to assist clients and Taskers across Pakistan.
            </motion.p>
            <motion.div
              variants={staggerContainer}
              className="grid sm:grid-cols-3 gap-6 mt-10"
            >
              {[
                {
                  icon: "📞",
                  title: "Call Us",
                  value: "+92 51 111 526 626",
                  sub: "Mon–Sat, 9am–6pm",
                },
                {
                  icon: "✉️",
                  title: "Email Us",
                  value: "hello@kaamkaro.pk",
                  sub: "Reply within 24 hours",
                },
                {
                  icon: "💬",
                  title: "WhatsApp",
                  value: "+92 300 526 6260",
                  sub: "Quick support chat",
                },
              ].map((c) => (
                <motion.div
                  key={c.title}
                  variants={scaleIn}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-gray-50 rounded-2xl border border-gray-100 shadow-md p-6 hover:border-green-200 transition-all"
                >
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{c.title}</h3>
                  <p className="text-[#1DBF73] font-medium text-sm">{c.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{c.sub}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── BECOME A TASKER BANNER ────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-[#1A1A2E] to-[#16213E]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center space-y-6"
          >
            <motion.div variants={fadeInUp} className="text-5xl">
              💼
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-white font-poppins"
            >
              Earn Money Doing What You Love
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-400 max-w-xl mx-auto text-lg"
            >
              Join 12,000+ Taskers across Pakistan earning on their own
              schedule. Set your rates, choose your tasks, and grow your
              business with KaamKaro.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-[#1DBF73] to-[#17a862] text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-green-900/30 hover:shadow-green-900/50 transition-shadow"
              >
                Become a Tasker — It's Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="border-2 border-gray-600 text-gray-300 font-semibold px-8 py-4 rounded-xl hover:border-gray-400 hover:text-white transition-colors"
              >
                Learn More
              </motion.button>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-8 pt-6"
            >
              {[
                { value: "PKR 45,000+", label: "Avg. monthly earnings" },
                { value: "Flexible", label: "Work on your schedule" },
                { value: "Free", label: "No joining fee" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-bold text-[#1DBF73] font-poppins">
                    {s.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}