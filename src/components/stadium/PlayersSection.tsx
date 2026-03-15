"use client";

import ScrollReveal from "../ScrollReveal";
import Image from "next/image";
import Link from "next/link";

export default function PlayersSection({ players }: { players: any[] }) {
  if (!players || players.length === 0) return null;

  return (
    <section className="py-32 bg-plum overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose font-bold block mb-4">Hall of Fame</span>
            <h2 className="text-4xl md:text-6xl font-light text-blush">Iconic <span className="italic text-rose">Figures</span></h2>
          </div>
          <div className="w-24 h-[1px] bg-rose/30 hidden md:block mb-4" />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
          {players.map((player, i) => {
            const playerCard = (
              <div className="group relative">
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-8 shadow-2xl transition-all duration-700 group-hover:translate-y-[-1rem]">
                  <Image 
                    src={player.image} 
                    alt={player.name} 
                    fill 
                    className="object-cover saturate-0 group-hover:saturate-100 transition-all duration-1000 scale-100 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-plum via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                  
                  {/* Decorative frame */}
                  <div className="absolute inset-4 border border-blush/10 rounded-2xl pointer-events-none group-hover:border-rose/40 transition-colors duration-500" />

                  {/* View Journey Overlay */}
                  {player.id && (
                    <div className="absolute inset-0 bg-plum/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-blush font-bold border-b border-blush/30 pb-2">View Journey</span>
                    </div>
                  )}
                </div>
                
                <div className="text-center group-hover:translate-y-[-0.5rem] transition-transform duration-500">
                  <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-rose font-bold block mb-2">{player.role || 'Legend'}</span>
                  <h3 className="text-2xl font-light text-blush tracking-wide group-hover:italic transition-all duration-500">{player.name}</h3>
                </div>
              </div>
            );

            return (
              <ScrollReveal key={i} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                {player.id ? (
                  <Link href={`/player/${player.id}`} className="block">
                    {playerCard}
                  </Link>
                ) : (
                  playerCard
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
