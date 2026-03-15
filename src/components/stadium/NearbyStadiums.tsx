"use client";

import ScrollReveal from "../ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";

const nearbyStadiums = [
  {
    id: 'dy-patil-stadium',
    name: 'DY Patil Stadium',
    city: 'Navi Mumbai',
    distance: '12.5 km',
    image: '/images/stadiums/other/dypatilstadium.jpg',
  },
  {
    id: 'm-chinnaswamy-stadium',
    name: 'M. Chinnaswamy Stadium',
    city: 'Bengaluru',
    distance: '4.2 km',
    image: '/images/stadiums/other/chinnaswamystadium.jpg',
  },
];

export default function NearbyStadiums() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-rose/10">
      <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div>
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose font-bold block mb-4">Nearby</span>
          <h2 className="text-4xl md:text-6xl font-light text-plum">Recommended <span className="italic">Arenas</span></h2>
        </div>
        <Link href="/stadiums?nearby=true" className="group flex items-center gap-3 font-sans text-[11px] tracking-[0.2em] uppercase text-plum/60 hover:text-rose transition-colors">
          Explore Territory
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {nearbyStadiums.map((stadium, index) => (
          <ScrollReveal key={stadium.id} delay={(index + 1) as 1 | 2}>
            <Link href={`/stadium/${stadium.id}`} className="group relative block rounded-[2.5rem] overflow-hidden bg-plum shadow-2xl h-80">
              <Image 
                src={stadium.image} 
                alt={stadium.name}
                fill
                className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-75 group-hover:rotate-1"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-10 left-10 right-10">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="px-3 py-1 bg-rose/20 backdrop-blur-md rounded-full border border-rose/30">
                       <span className="text-blush text-[9px] font-sans tracking-widest font-bold uppercase">{stadium.distance}</span>
                    </div>
                    <span className="text-blush/60 text-[9px] font-sans tracking-widest uppercase font-bold italic">Nearby</span>
                 </div>
                 <h3 className="text-3xl md:text-4xl font-light text-blush group-hover:text-rose transition-colors duration-500 italic leading-none">{stadium.name}</h3>
                 <p className="text-blush/40 text-[10px] tracking-[0.2em] uppercase font-bold mt-4">{stadium.city}, Maharashtra</p>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
