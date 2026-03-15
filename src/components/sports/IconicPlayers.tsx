"use client";

import Image from "next/image";
import ScrollReveal from "../ScrollReveal";
import { Trophy, Star } from "lucide-react";
import { getOptimizedImageUrl } from "@/lib/cloudinary";

interface Player {
  id: string;
  name: string;
  image: string;
  country: string;
  achievements: string[];
}

interface IconicPlayersProps {
  players: Player[];
  sportName: string;
}

export default function IconicPlayers({ players, sportName }: IconicPlayersProps) {
  // Filter for Indian players only (as per user request)
  const indianPlayers = players.filter(p => p.country === "India");

  return (
    <section className="py-24 bg-blush border-t border-rose/5">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="mb-20">
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose font-bold mb-4 block">Legends</span>
          <h2 className="text-4xl md:text-6xl font-light text-plum">Iconic <span className="italic">Indian</span> Athletes</h2>
          <div className="w-20 h-1 bg-rose mt-8 rounded-full" />
        </ScrollReveal>

        {indianPlayers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {indianPlayers.map((player, idx) => (
              <ScrollReveal key={player.id} delay={(idx % 3 + 1) as 1 | 2 | 3}>
                <div className="group relative">
                  {/* Player Image with Background Decoration */}
                  <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl shadow-plum/20">
                    <Image 
                      src={getOptimizedImageUrl(player.image, { width: 600, height: 800, crop: 'fill' })} 
                      alt={player.name}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-plum/80 via-transparent to-transparent opacity-60" />
                    
                    {/* Badge */}
                    <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-rose/90 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <Star size={20} className="text-blush fill-current" />
                    </div>
                  </div>

                  {/* Player Info */}
                  <div className="space-y-6 px-4">
                    <div>
                      <h4 className="text-3xl font-light text-plum group-hover:text-rose transition-colors duration-300 italic">{player.name}</h4>
                      <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-plum/40 mt-1 font-bold">India &bull; {sportName}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {player.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-1 bg-rose/5 border border-rose/10 rounded-full">
                          <Trophy size={10} className="text-rose" />
                          <span className="font-sans text-[9px] tracking-widest uppercase text-plum/60">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="font-sans text-xs tracking-widest text-plum/30 uppercase italic">Showcasing the next generation of {sportName} stars...</p>
          </div>
        )}
      </div>
    </section>
  );
}
