"use client";

import ScrollReveal from "../ScrollReveal";
import { Ticket } from "lucide-react";

export default function MatchesSection({ matches }: { matches: any[] }) {
  if (!matches || matches.length === 0) return null;

  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-rose/10 pb-12">
        <div>
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose font-bold block mb-4">Live Events</span>
          <h2 className="text-4xl md:text-6xl font-light text-plum">Upcoming <span className="italic">Spectacles</span></h2>
        </div>
        <p className="max-w-xs text-plum/50 font-sans text-[10px] tracking-widest uppercase text-right md:text-left">
          Exclusive access to the most anticipated encounters of the season.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-12">
        {matches.map((match, i) => (
          <ScrollReveal key={i} delay={(i % 3 + 1) as 1 | 2 | 3}>
            <div className="group relative grid grid-cols-1 lg:grid-cols-12 items-center gap-8 p-12 bg-blush border border-rose/5 rounded-[2rem] hover:border-rose/20 transition-all duration-700 hover:shadow-2xl hover:shadow-rose/10 overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                 <span className="px-4 py-1 rounded-full border border-rose/10 bg-rose/[0.03] text-[9px] font-sans tracking-widest uppercase text-plum/40">VIP Inclusive</span>
              </div>

              <div className="lg:col-span-3 flex flex-col items-center lg:items-start">
                <div className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-plum text-blush shadow-xl group-hover:bg-rose transition-colors duration-500">
                  <span className="text-3xl font-serif italic leading-none">{new Date(match.date).getDate()}</span>
                  <span className="text-[10px] uppercase tracking-widest mt-1 opacity-60">
                    {new Date(match.date).toLocaleString('default', { month: 'short' })}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose/10 text-[9px] font-sans tracking-[0.2em] uppercase text-rose font-bold mb-4">
                   <div className="w-1 h-1 rounded-full bg-rose animate-pulse" />
                   {match.tournament}
                </div>
                <h3 className="text-3xl md:text-5xl font-light text-plum group-hover:italic transition-all duration-500">{match.teams}</h3>
              </div>

              <div className="lg:col-span-3 flex justify-center lg:justify-end">
                <button className="px-10 py-5 bg-plum text-blush rounded-2xl flex items-center gap-4 font-sans text-xs uppercase tracking-[0.3em] font-normal hover:bg-rose hover:scale-105 transition-all duration-500 shadow-xl">
                  <Ticket size={16} className="text-rose group-hover:text-blush" />
                  Reserve Seat
                </button>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
