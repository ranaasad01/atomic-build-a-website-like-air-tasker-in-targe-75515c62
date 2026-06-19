export const APP_NAME = "KaamKaro";
export const APP_TAGLINE = "Get Work Done — Kaam Karo!";
export const APP_DESCRIPTION =
  "Pakistan's #1 freelance task marketplace connecting clients with skilled local Taskers.";

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Categories", href: "#categories" },
  { label: "Top Taskers", href: "#taskers" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const CTA_PRIMARY = { label: "Post a Task", href: "#post-task" };
export const CTA_SECONDARY = { label: "Become a Tasker", href: "#taskers" };

// Shared TypeScript types used across pages
export interface Task {
  id: string;
  title: string;
  category: string;
  budget: number;
  location: string;
  description: string;
  status: "open" | "in-progress" | "completed" | "cancelled";
  postedAt: string;
  bidsCount: number;
  clientName: string;
  clientAvatar: string;
}

export interface Tasker {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  rating: number;
  reviewCount: number;
  completedTasks: number;
  hourlyRate: number;
  location: string;
  bio: string;
  verified: boolean;
}

export interface Bid {
  id: string;
  taskerId: string;
  taskerName: string;
  taskerAvatar: string;
  amount: number;
  message: string;
  rating: number;
  completedTasks: number;
  submittedAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  taskCount: number;
  color: string;
}

export const PAKISTANI_CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
  "Abbottabad",
];

export const CATEGORIES: Category[] = [
  { id: "home-services", name: "Home Services", icon: "🏠", taskCount: 1240, color: "#E8F5E9" },
  { id: "cleaning", name: "Cleaning", icon: "🧹", taskCount: 876, color: "#E3F2FD" },
  { id: "delivery", name: "Delivery & Moving", icon: "🚚", taskCount: 654, color: "#FFF3E0" },
  { id: "tutoring", name: "Tutoring", icon: "📚", taskCount: 543, color: "#F3E5F5" },
  { id: "tech-support", name: "Tech Support", icon: "💻", taskCount: 432, color: "#E8EAF6" },
  { id: "beauty", name: "Beauty & Wellness", icon: "💅", taskCount: 389, color: "#FCE4EC" },
  { id: "repairs", name: "Repairs & Handyman", icon: "🔧", taskCount: 712, color: "#E0F2F1" },
  { id: "photography", name: "Photography", icon: "📷", taskCount: 298, color: "#FFF8E1" },
];

export const formatPKR = (amount: number): string =>
  `PKR ${amount.toLocaleString("en-PK")}`;