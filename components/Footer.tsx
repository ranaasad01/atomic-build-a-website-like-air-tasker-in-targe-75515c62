"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle as Twitter, Globe as Facebook, Briefcase as Linkedin, Camera as Instagram } from 'lucide-react';
import { navLinks, APP_NAME, APP_TAGLINE } from "@/lib/data";
import { staggerContainer, fadeInUp } from "@/lib/motion";

const footerSections = [
  {
    title: "For Clients",
    links: [
      { label: "Post a Task", href: "#post-task" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Browse Taskers", href: "#taskers" },
      { label: "Categories", href: "#categories" },
    ],
  },
  {
    title: "For Taskers",
    links: [
      { label: "Become a Tasker", href: "#taskers" },
      { label: "Browse Tasks", href: "#categories" },
      { label: "Tasker Guidelines", href: "#about" },
      { label: "Earnings & Payments", href: "#about" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About KaamKaro", href: "#about" },
      { label: "Contact Us", href: "#contact" },
      { label: "Privacy Policy", href: "#about" },
      { label: "Terms of Service", href: "#about" },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  const pathname = usePathname();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      if (pathname === "/") {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const getHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  return (
    <footer className="bg-[#1A1A2E] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10"
        >
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1DBF73] to-[#17a862] flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl font-poppins">K</span>
              </div>
              <span className="font-poppins font-bold text-2xl text-white">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              {APP_TAGLINE} — Pakistan's trusted marketplace connecting clients
              with skilled local Taskers across every city.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin size={15} className="text-[#1DBF73] flex-shrink-0" />
                <span>Blue Area, Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone size={15} className="text-[#1DBF73] flex-shrink-0" />
                <span>+92 51 111 526 626</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={15} className="text-[#1DBF73] flex-shrink-0" />
                <span>hello@kaamkaro.pk</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#1DBF73] flex items-center justify-center transition-colors duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={fadeInUp}>
              <h4 className="font-poppins font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={getHref(link.href)}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm text-gray-400 hover:text-[#1DBF73] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">Secure payments via:</span>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-white/10 rounded-md text-xs font-semibold text-white">
                  JazzCash
                </span>
                <span className="px-3 py-1 bg-white/10 rounded-md text-xs font-semibold text-white">
                  EasyPaisa
                </span>
                <span className="px-3 py-1 bg-white/10 rounded-md text-xs font-semibold text-white">
                  Bank Transfer
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} KaamKaro. All rights reserved. Made with ❤️ in Pakistan 🇵🇰
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}