"use client";

import { motion } from "framer-motion";
import ScrollReveal from "../ScrollReveal";

interface TimelineEvent {
  year: number;
  event: string;
}

interface PlayerTimelineProps {
  timeline: TimelineEvent[];
}

export default function PlayerTimeline({ timeline }: PlayerTimelineProps) {
  const events = Array.isArray(timeline) ? timeline : [];

  return (
    <section className="py-32 bg-blush overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="mb-24 text-center">
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose font-bold mb-4 block">The Journey</span>
          <h2 className="text-4xl md:text-6xl font-light text-plum">Career <span className="italic">Milestones</span></h2>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-rose/20 -translate-x-1/2" />

          <div className="space-y-24">
            {events.map((item, idx) => (
              <div key={idx} className="relative">
                <div className={`flex flex-col md:flex-row items-center gap-12 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Content Column */}
                  <div className="w-full md:w-1/2">
                    <ScrollReveal delay={((idx % 3) + 1) as any}>
                      <div className={`p-10 rounded-[2rem] bg-white border border-rose/5 shadow-xl shadow-plum/5 hover:border-rose/20 transition-all duration-500 ${idx % 2 !== 0 ? 'md:text-left' : 'md:text-right'}`}>
                        <span className="text-4xl font-light text-rose mb-4 block italic">{item.year}</span>
                        <p className="text-plum/70 font-sans text-sm md:text-base leading-relaxed tracking-wide">
                          {item.event}
                        </p>
                      </div>
                    </ScrollReveal>
                  </div>

                  {/* Dot in Middle */}
                  <div className="absolute left-0 md:left-1/2 top-10 md:top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
                    <div className="w-3 h-3 rounded-full bg-rose shadow-[0_0_15px_rgba(183,110,121,0.5)] border-4 border-blush" />
                  </div>

                  {/* Empty Column for Layout */}
                  <div className="hidden md:block w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
