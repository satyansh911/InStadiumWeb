"use client";

import Link from "next/link";
import Image from "next/image";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import ScrollReveal from "../ScrollReveal";
import { MapPin } from "lucide-react";

interface Stadium {
  id: string;
  name: string;
  city: string;
  image: string;
}

interface PlayerStadiumsProps {
  stadiums: Stadium[];
  playerName: string;
}

export default function PlayerStadiums({ stadiums, playerName }: PlayerStadiumsProps) {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="mb-20">
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose font-bold mb-4 block">Arenas of Glory</span>
          <h2 className="text-4xl md:text-6xl font-light text-plum">Where {playerName.split(' ')[0]} <span className="italic">Conquered</span></h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stadiums.map((stadium, idx) => (
            <ScrollReveal key={stadium.id} delay={((idx % 3) + 1) as any}>
              <Link href={`/stadium/${stadium.id}`} className="group block">
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  <Image
                    src={getOptimizedImageUrl(stadium.image, { width: 600, height: 400, crop: 'fill' })}
                    alt={stadium.name}
                    fill
                    unoptimized
                    className="object-cover saturate-[0.8] group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-plum/60 via-transparent to-transparent opacity-60" />
                </div>
                <div>
                  <h4 className="text-xl font-light text-plum group-hover:text-rose transition-colors mb-2 italic">
                    {stadium.name}
                  </h4>
                  <div className="flex items-center gap-2 text-plum/40 font-sans text-[10px] tracking-widest uppercase font-bold">
                    <MapPin size={12} className="text-rose" />
                    {stadium.city}
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
