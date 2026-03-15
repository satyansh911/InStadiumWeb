"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";

const sports = [
  { name: "Cricket", icon: "/images/sportsIcon/cricket.png", color: "bg-rose", delay: 1 },
  { name: "Football", icon: "/images/sportsIcon/football.png", color: "bg-plum", delay: 2 },
  { name: "Kabaddi", icon: "/images/sportsIcon/kabaddi.png", color: "bg-rose", delay: 3 },
  { name: "Badminton", icon: "/images/sportsIcon/badminton.png", color: "bg-plum", delay: 1 },
  { name: "Tennis", icon: "/images/sportsIcon/tennis.png", color: "bg-rose", delay: 2 },
  { name: "Hockey", icon: "/images/sportsIcon/hockey.png", color: "bg-plum", delay: 3 },
];

export default function SportsGrid() {
  return (
    <section className="py-24 bg-blush/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-plum">Browse by <span className="italic font-normal">Sport</span></h2>
          <div className="w-16 h-1 bg-rose mx-auto mt-4 rounded-full" />
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {sports.map((sport) => {
            return (
              <ScrollReveal 
                key={sport.name} 
                delay={sport.delay as 1 | 2 | 3}
                className="group"
              >
                <Link 
                  href={`/sport/${sport.name.toLowerCase()}`}
                  className="flex flex-col items-center p-8 bg-blush border border-rose/10 rounded-2xl transition-all duration-500 hover:shadow-xl hover:shadow-rose/5 hover:-translate-y-2 group cursor-pointer"
                >
                  <div className={`${sport.color} p-4 rounded-xl mb-4 text-blush transition-transform duration-500 group-hover:scale-110 shadow-lg`}>
                    <div className="relative w-8 h-8">
                       <Image 
                         src={sport.icon}
                         alt={sport.name}
                         fill
                         className="object-contain invert brightness-0"
                       />
                    </div>
                  </div>
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 group-hover:text-rose font-bold transition-colors">
                    {sport.name}
                  </span>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
