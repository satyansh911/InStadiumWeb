"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "../ScrollReveal";

interface SportHeroProps {
  name: string;
  description: string;
  tags: string[];
}

export default function SportHero({ name, description, tags }: SportHeroProps) {
  return (
    <section className="relative pt-48 pb-32 px-6 bg-plum overflow-hidden">
      <div className="absolute inset-0 opacity-15 bg-pinstripe-light" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-rose/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="flex flex-col gap-12">
            <div className="max-w-4xl space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-wrap gap-4"
              >
                {tags.map((tag) => (
                  <span key={tag} className="px-4 py-1.5 rounded-full border border-rose/30 text-[9px] font-sans tracking-[0.3em] uppercase text-blush/60 bg-rose/5">
                    {tag}
                  </span>
                ))}
              </motion.div>
              
              <h1 className="text-6xl md:text-9xl font-light text-blush italic leading-[0.9]">
                The Art of <br />
                <span className="not-italic font-normal text-rose tracking-tight">{name}</span>
              </h1>
              
              <p className="text-blush/70 font-sans text-sm md:text-base leading-relaxed max-w-2xl tracking-wide">
                {description}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
