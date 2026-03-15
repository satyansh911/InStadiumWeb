"use client";

import ScrollReveal from "../ScrollReveal";

export default function TimelineSection({ timeline }: { timeline: any[] }) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <section className="py-32 bg-peach/30 border-y border-rose/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal className="mb-24 text-center space-y-4">
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose font-bold">The Legacy</span>
          <h2 className="text-4xl md:text-6xl font-light text-plum">Heritage & <span className="italic">History</span></h2>
          <div className="w-16 h-[1px] bg-rose/30 mx-auto mt-8" />
        </ScrollReveal>

        <div className="relative">
          {/* Central Line with gradient */}
          <div className="absolute left-[30px] md:left-1/2 top-0 w-[1px] h-full bg-gradient-to-b from-rose/40 via-rose/10 to-transparent" />
          
          <div className="space-y-24">
            {timeline.map((item, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className={`w-full md:w-1/2 px-12 md:px-20 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <ScrollReveal delay={(i % 2 + 1) as 1 | 2}>
                    <div className="inline-block">
                      <span className="text-5xl md:text-8xl font-serif italic text-rose/20 block mb-2">{item.year}</span>
                      <h3 className="text-2xl md:text-3xl font-light text-plum leading-tight mb-4">{item.event}</h3>
                      <p className="text-plum/50 font-sans text-xs tracking-wide leading-relaxed max-w-sm ml-auto mr-auto md:ml-0 md:mr-0">
                        A milestone in the evolution of this sporting sanctuary, cementing its place in the annals of global competition.
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
                
                {/* Center Node */}
                <div className="absolute left-[24px] md:left-1/2 md:-translate-x-1/2 top-4 md:top-12">
                   <div className="w-4 h-4 rounded-full bg-rose shadow-[0_0_15px_rgba(183,110,121,0.5)] z-10 border-4 border-blush" />
                </div>
                
                <div className="w-full md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
