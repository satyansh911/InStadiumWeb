"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  X, 
  MessageCircle, 
  Sparkles, 
  User, 
  ChevronRight, 
  MapPin, 
  Activity,
  UserCheck,
  Building2,
  Trophy
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  links?: any[];
  structured?: any[];
}

const SUGGESTIONS = [
  { label: "Top Players", icon: <UserCheck className="w-4 h-4" /> },
  { label: "Nearby Stadiums", icon: <MapPin className="w-4 h-4" /> },
  { label: "IPL Schedule", icon: <Activity className="w-4 h-4" /> },
  { label: "Stadium Guides", icon: <Building2 className="w-4 h-4" /> },
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Namaste! I'm InStadium AI. How can I help you explore Indian sports today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, location }),
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
        links: data.links,
        structured: data.structured
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-montserrat">
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-500 overflow-hidden bg-[var(--chat-red)] text-white"
        >
          <motion.div
            key="chat"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="relative w-full h-full"
          >
             <Image 
              src="https://res.cloudinary.com/daud2uqqf/image/upload/v1775915480/logobot_k3d6xa.gif"
              alt="AI bot"
              fill
              className="object-cover"
              unoptimized={true}
            />
          </motion.div>
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-2 right-0 w-[400px] h-[600px] rounded-3xl overflow-hidden shadow-2xl flex flex-col chat-panel"
          >
            {/* Header */}
            <div className="p-4 chat-header flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center overflow-hidden relative">
                  <Image 
                    src="https://res.cloudinary.com/daud2uqqf/image/upload/v1775915480/logobot_k3d6xa.gif"
                    alt="AI bot"
                    fill
                    className="object-cover"
                    unoptimized={true}
                  />
                </div>
                <div>
                  <h3 className="font-playfair font-bold text-lg leading-tight">InStadium AI</h3>
                  <div className="flex items-center gap-1.5 opacity-80 text-xs text-[#EEEBDD]">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Always active
                  </div>
                </div>
              </div>
              <motion.button 
                onClick={() => setIsOpen(false)} 
                whileHover={{ rotate: 90, scale: 1.1 }} 
                className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-xl text-white transition-all border border-white/20"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-end gap-2`}>
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-lg bg-[var(--chat-red)] flex-shrink-0 overflow-hidden relative border border-white/20 shadow-sm mb-1">
                      <Image 
                        src="https://res.cloudinary.com/daud2uqqf/image/upload/v1775915480/logobot_k3d6xa.gif"
                        alt="AI"
                        fill
                        className="object-cover"
                        unoptimized={true}
                      />
                    </div>
                  )}
                  <div className={`max-w-[85%] ${msg.role === "user" ? "chat-bubble-user" : "chat-bubble-assistant"} p-4 shadow-sm relative group`}>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    
                    {/* Entity Cards/Links */}
                    {msg.links && msg.links.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {msg.links.map((link, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                             {link.route.startsWith('http') ? (
                               <a 
                                 href={link.route}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="flex items-center justify-between p-3 rounded-xl bg-[var(--chat-red-light)] border border-[var(--chat-red-border)] hover:bg-[var(--chat-red)] hover:text-white transition-all group/link"
                               >
                                 <div className="flex flex-col">
                                   <span className="text-xs font-bold uppercase tracking-wider">{link.label}</span>
                                   <span className="text-[10px] opacity-70 italic">{link.subtitle}</span>
                                 </div>
                                 <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                               </a>
                             ) : (
                               <Link
                                 href={link.route}
                                 className="flex items-center justify-between p-3 rounded-xl bg-[var(--chat-red-light)] border border-[var(--chat-red-border)] hover:bg-[var(--chat-red)] hover:text-white transition-all group/link"
                               >
                                 <div className="flex flex-col">
                                   <span className="text-xs font-bold uppercase tracking-wider">{link.label}</span>
                                   <span className="text-[10px] opacity-70 italic">{link.subtitle}</span>
                                 </div>
                                 <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                               </Link>
                             )}
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                   <div className="chat-bubble-assistant p-4 flex gap-1">
                     <span className="w-1.5 h-1.5 bg-[var(--chat-red)] rounded-full animate-bounce" />
                     <span className="w-1.5 h-1.5 bg-[var(--chat-red)] rounded-full animate-bounce [animation-delay:0.2s]" />
                     <span className="w-1.5 h-1.5 bg-[var(--chat-red)] rounded-full animate-bounce [animation-delay:0.4s]" />
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 py-2 flex gap-2 flex-wrap bg-white/30 backdrop-blur-sm border-t border-[var(--chat-red-border)]">
                {SUGGESTIONS.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(s.label)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase bg-white border border-[var(--chat-red-border)] text-[var(--chat-red)] hover:bg-[var(--chat-red)] hover:text-white transition-all"
                  >
                    {s.icon}
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-[var(--chat-red-border)]">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about stadiums, players..."
                  className="flex-1 bg-[var(--chat-blush)] border border-[var(--chat-red-border)] rounded-2xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--chat-red-light)] placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 rounded-xl bg-[var(--chat-red)] text-white disabled:opacity-50 disabled:grayscale transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-900/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="mt-2 text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-[var(--chat-rose)]" />
                Powered by Sarvam AI for multilingual support
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
