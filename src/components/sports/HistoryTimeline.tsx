"use client";

import { motion } from "framer-motion";
import ScrollReveal from "../ScrollReveal";
import { TimelineEvent } from "@/lib/sports-data";

interface HistoryTimelineProps {
  events: TimelineEvent[];
}

export default function HistoryTimeline({ events }: HistoryTimelineProps) {
  return (
    <section className="py-24 bg-blush">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="mb-20">
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose font-bold mb-4 block">Chronicles</span>
          <h2 className="text-4xl md:text-6xl font-light text-plum">A Journey Through <span className="italic">Time</span></h2>
          <div className="w-20 h-1 bg-rose mt-8 rounded-full" />
        </ScrollReveal>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-rose/10 md:translate-x-[-0.5px]" />

          <div className="space-y-16">
            {events.map((event, idx) => (
              <div key={idx} className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-rose shadow-lg shadow-rose/50 md:translate-x-[-6px] top-2 z-10" />

                {/* Content Card */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${idx % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 text-left"}`}>
                  <ScrollReveal delay={(idx % 3 + 1) as 1 | 2 | 3}>
                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-plum/5 border border-rose/5 hover:border-rose/20 transition-all duration-500 group">
                      <span className="inline-block px-4 py-1 bg-rose/10 text-rose font-sans text-sm font-bold rounded-full mb-4 group-hover:bg-rose group-hover:text-blush transition-colors">
                        {event.year}
                      </span>
                      <h4 className="text-2xl font-normal text-plum mb-4 group-hover:text-rose transition-colors">{event.event}</h4>
                      {event.description && (
                        <p className="text-plum/60 font-sans text-sm leading-relaxed italic">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </ScrollReveal>
                </div>

                {/* Empty Space for alignment on Desktop */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
