"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import ScrollReveal from "../ScrollReveal";

interface PlayerHeroProps {
  player: {
    name: string;
    image: string;
    bio: string;
    sport: { name: string };
    country: string;
    stats: any;
  };
}

export default function PlayerHero({ player }: PlayerHeroProps) {
  const stats = Array.isArray(player.stats) ? player.stats : [];

  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-24 px-6 overflow-hidden bg-plum">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10 bg-pinstripe-light" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose/10 rounded-full blur-[100px]" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-rose/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <ScrollReveal>
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose font-bold mb-6 block">
                The Legend of {player.sport?.name || "Sport"}
              </span>
              <h1 className="text-6xl md:text-8xl font-light text-blush mb-8 leading-tight">
                {(player.name || "Legendary Player").split(' ').map((word, i) => (
                  <span key={i} className={i === 1 ? "italic block" : "block"}>
                    {word}
                  </span>
                ))}
              </h1>
              <p className="text-blush/60 font-sans text-sm md:text-base leading-relaxed max-w-xl mb-12 italic">
                "{player.bio?.split('\n')[0]}"
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-8 border-t border-rose/20 pt-12">
                {stats.map((stat: any, i: number) => (
                  <div key={i}>
                    <p className="text-3xl md:text-4xl font-light text-blush mb-2">{stat.value}</p>
                    <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-rose font-bold">{stat.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Image Container */}
          <div className="order-1 lg:order-2 relative aspect-[4/5] lg:aspect-square">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-2xl shadow-black/50 border border-rose/10"
            >
              <Image
                src={getOptimizedImageUrl(player.image, { width: 1000, height: 1000, crop: 'fill' })}
                alt={player.name}
                fill
                priority
                unoptimized
                className="object-cover saturate-[0.85] hover:saturate-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum via-transparent to-transparent opacity-40" />
            </motion.div>
            
            {/* Minimal Achievement Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -right-6 top-12 bg-rose backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/10 hidden md:block"
            >
              <div className="text-center">
                <p className="text-2xl font-light text-blush mb-1 italic">Champion</p>
                <p className="font-sans text-[8px] tracking-[0.3em] uppercase text-blush/60 font-bold">{player.country}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
