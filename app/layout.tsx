import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KaamKaro — Get Work Done in Pakistan",
  description:
    "Pakistan's #1 freelance task marketplace. Post tasks, hire local Taskers, and get things done — from home services to tech support, all in PKR.",
  keywords: [
    "freelance pakistan",
    "hire taskers",
    "post tasks",
    "home services karachi",
    "kaamkaro",
    "airtasker pakistan",
  ],
  openGraph: {
    title: "KaamKaro — Get Work Done in Pakistan",
    description:
      "Post tasks, hire local Taskers, and get things done across Pakistan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-inter bg-white text-gray-900 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
