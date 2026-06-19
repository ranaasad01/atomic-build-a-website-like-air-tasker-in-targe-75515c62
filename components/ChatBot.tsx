"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, ChevronDown } from 'lucide-react';

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
  timestamp: Date;
}

const QUICK_REPLIES = [
  "How do I post a task?",
  "How do I become a Tasker?",
  "What are the service charges?",
  "Which cities are supported?",
  "How does payment work?",
];

const BOT_RESPONSES: Record<string, string> = {
  default:
    "I'm not sure about that, but our support team is happy to help! You can reach us at hello@kaamkaro.pk or call +92 51 111 526 626.",
  greeting:
    "Hello! 👋 Welcome to KaamKaro — Pakistan's #1 task marketplace. How can I help you today?",
  "how do i post a task":
    "Posting a task is easy! 🎉\n\n1. Click **Post a Task** in the navigation bar.\n2. Fill in your task title, description, category, and budget in PKR.\n3. Select your city and submit.\n4. Taskers will start bidding within minutes!",
  "how do i become a tasker":
    "Becoming a Tasker on KaamKaro is simple! 🛠️\n\n1. Sign up and select the **Tasker** role.\n2. Complete your profile with skills, experience, and a photo.\n3. Get verified by our team.\n4. Start browsing and bidding on tasks near you!",
  "what are the service charges":
    "KaamKaro charges a small platform fee of **10%** on completed tasks. There are no upfront costs — you only pay when a task is successfully completed. 💚",
  "which cities are supported":
    "We currently support tasks in:\n\n🏙️ Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Sialkot, Gujranwala, Hyderabad, and Abbottabad.\n\nMore cities coming soon!",
  "how does payment work":
    "Payments on KaamKaro are safe and secure! 💳\n\n1. Funds are held in escrow when you accept a bid.\n2. The Tasker completes the job.\n3. You confirm completion and release payment.\n4. Payments are made in **PKR** via bank transfer, JazzCash, or EasyPaisa.",
  "categories":
    "We support a wide range of categories:\n\n🏠 Home Services\n🧹 Cleaning\n🚚 Delivery & Moving\n📚 Tutoring\n💻 Tech Support\n💅 Beauty & Wellness\n🔧 Repairs & Handyman\n📷 Photography\n\nAnd many more!",
  "contact":
    "You can reach our support team at:\n\n📧 hello@kaamkaro.pk\n📞 +92 51 111 526 626\n📍 Blue Area, Islamabad, Pakistan",
  "hi": "Hello! 👋 Welcome to KaamKaro. How can I assist you today?",
  "hello": "Hi there! 👋 I'm KaamBot, your KaamKaro assistant. What can I help you with?",
  "help": "Sure! Here are some things I can help you with:\n\n• Posting a task\n• Becoming a Tasker\n• Service charges & fees\n• Supported cities\n• Payment process\n• Contact information",
};

function getBotResponse(input: string): string {
  const normalized = input.toLowerCase().trim();

  for (const key of Object.keys(BOT_RESPONSES)) {
    if (key === "default" || key === "greeting") continue;
    if (normalized.includes(key)) {
      return BOT_RESPONSES[key];
    }
  }

  if (
    normalized.includes("category") ||
    normalized.includes("service") ||
    normalized.includes("what do you offer")
  ) {
    return BOT_RESPONSES["categories"];
  }

  if (
    normalized.includes("contact") ||
    normalized.includes("email") ||
    normalized.includes("phone") ||
    normalized.includes("reach")
  ) {
    return BOT_RESPONSES["contact"];
  }

  return BOT_RESPONSES["default"];
}

function formatText(text: string): React.ReactNode[] {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={j} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
    return (
      <span key={i}>
        {parts}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    );
  });
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "bot",
      text: BOT_RESPONSES["greeting"],
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        text: getBotResponse(text),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 900 + Math.random() * 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#1DBF73] to-[#17a862] shadow-lg shadow-green-300/40 flex items-center justify-center text-white"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFC107] rounded-full border-2 border-white" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl shadow-black/15 border border-gray-100 flex flex-col overflow-hidden"
            style={{ height: "520px" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1DBF73] to-[#17a862] px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-poppins font-semibold text-white text-sm">
                  KaamBot
                </p>
                <p className="text-green-100 text-xs">KaamKaro Support Assistant</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                <span className="text-green-100 text-xs">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#F5F5F5]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
                      msg.role === "bot"
                        ? "bg-gradient-to-br from-[#1DBF73] to-[#17a862]"
                        : "bg-[#1A1A2E]"
                    }`}
                  >
                    {msg.role === "bot" ? (
                      <Bot size={14} className="text-white" />
                    ) : (
                      <User size={14} className="text-white" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[78%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "bot"
                        ? "bg-white text-gray-800 rounded-bl-sm shadow-sm"
                        : "bg-[#1DBF73] text-white rounded-br-sm"
                    }`}
                  >
                    {formatText(msg.text)}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-end gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1DBF73] to-[#17a862] flex items-center justify-center flex-shrink-0">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto scrollbar-hide">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => sendMessage(reply)}
                    className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-[#1DBF73] text-[#1DBF73] hover:bg-green-50 transition-colors whitespace-nowrap"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-3 py-3 bg-white border-t border-gray-100 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 text-sm px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1DBF73] focus:ring-2 focus:ring-green-100 transition-all bg-gray-50"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 rounded-xl bg-[#1DBF73] disabled:opacity-40 flex items-center justify-center text-white transition-opacity flex-shrink-0"
              >
                <Send size={15} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
