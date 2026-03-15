"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, ChevronRight } from "lucide-react";
import ScrollReveal from "../ScrollReveal";
import { getOptimizedImageUrl } from "@/lib/cloudinary";

interface Stadium {
  id: string;
  name: string;
  city: string;
  capacity: number;
  image: string;
  country: string;
}

interface AffiliatedStadiumsProps {
  stadiums: Stadium[];
  sportName: string;
}

export default function AffiliatedStadiums({ stadiums, sportName }: AffiliatedStadiumsProps) {
  // Filter for Indian stadiums only (as per user request)
  const indianStadiums = stadiums.filter(s => s.country === "India" || !s.country);

  return (
    <section className="py-24 bg-plum overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose font-bold mb-4 block">Venues</span>
              <h2 className="text-4xl md:text-6xl font-light text-blush italic">Associated <span className="not-italic font-normal">Arenas</span></h2>
            </div>
            <Link 
              href="/stadiums" 
              className="group flex items-center gap-3 font-sans text-[11px] tracking-[0.2em] uppercase text-blush/40 hover:text-rose transition-colors"
            >
              All Indian Venues
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {indianStadiums.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {indianStadiums.map((stadium, idx) => (
              <ScrollReveal key={stadium.id} delay={(idx % 3 + 1) as 1 | 2 | 3}>
                <Link 
                  href={`/stadium/${stadium.id}`}
                  className="group block relative aspect-[16/10] overflow-hidden rounded-3xl bg-blush/5 border border-white/5"
                >
                  {/* Safely get an image: stadium.image (if exists) or first gallery image */}
                  {(() => {
                    const stadiumImage = stadium.image || (stadium as any).galleryImages?.[0]?.url;
                    return (
                      <Image 
                        src={getOptimizedImageUrl(stadiumImage, { width: 800, height: 500, crop: 'fill' })} 
                        alt={stadium.name}
                        fill
                        unoptimized
                        className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-50"
                      />
                    );
                  })()}
                  
                  {/* Glass Overlay on Hover */}
                  <div className="absolute inset-x-4 bottom-4 p-6 bg-plum/40 backdrop-blur-md rounded-2xl border border-white/10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={10} className="text-rose" />
                      <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-blush/60">{stadium.city}</span>
                    </div>
                    <h4 className="text-xl font-light text-blush mb-4">{stadium.name}</h4>
                    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <Users size={12} className="text-rose/60" />
                        <span className="font-sans text-[9px] tracking-widest uppercase text-blush/50">{stadium.capacity.toLocaleString()} Capacity</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center border border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
            <p className="font-sans text-xs tracking-widest text-blush/20 uppercase">No dedicated Indian venues listed for {sportName}</p>
          </div>
        )}
      </div>
    </section>
  );
}
