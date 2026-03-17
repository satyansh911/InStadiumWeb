"use client";

import Image from "next/image";
import ScrollReveal from "../ScrollReveal";
import { Calendar, Users, MapPin, Trophy } from "lucide-react";
import { getOptimizedImageUrl } from "@/lib/cloudinary";

export default function StadiumHero({ stadium }: { stadium: any }) {
  const heroImage = stadium.heroImage || stadium.image || "https://images.unsplash.com/photo-1540744158800-4785387f481c?q=80";
  const isLocalHeroImage = typeof heroImage === "string" && heroImage.startsWith("/");

  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with sophisticated overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={getOptimizedImageUrl(heroImage, { width: 1920, height: 1080, crop: 'fill' })} 
          alt={stadium.name} 
          fill 
          className="object-cover"
          priority
          unoptimized={isLocalHeroImage}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-plum/60 via-plum/40 to-blush z-[1]" />
        <div className="absolute inset-0 bg-black/20 z-[1]" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center text-blush">
        <ScrollReveal>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-rose/30 bg-rose/10 backdrop-blur-sm mb-8">
            <MapPin size={12} className="text-rose" />
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase font-bold">{stadium.city}, {stadium.state}</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-light mb-12 tracking-tight leading-none">
            {stadium.name.split(' ').map((word: string, i: number) => (
              <span key={i} className={i === stadium.name.split(' ').length - 1 ? "italic font-normal text-rose" : ""}>
                {word}{" "}
              </span>
            ))}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mt-16 font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold">
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-plum/80 flex items-center justify-center border border-rose/20 group-hover:bg-rose transition-colors duration-500">
                <Users size={18} className="text-blush" />
              </div>
              <div className="flex flex-col">
                <span className="text-rose text-lg mb-0.5">{stadium.capacity?.toLocaleString()}</span>
                <span className="opacity-60">Seating Capacity</span>
              </div>
            </div>

            <div className="w-px h-16 bg-rose/20 hidden md:block" />

            <div className="flex flex-col items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-plum/80 flex items-center justify-center border border-rose/20 group-hover:bg-rose transition-colors duration-500">
                <Calendar size={18} className="text-blush" />
              </div>
              <div className="flex flex-col">
                <span className="text-rose text-lg mb-0.5">{stadium.builtYear}</span>
                <span className="opacity-60">Established Year</span>
              </div>
            </div>

            <div className="w-px h-16 bg-rose/20 hidden md:block" />

            <div className="flex flex-col items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-plum/80 flex items-center justify-center border border-rose/20 group-hover:bg-rose transition-colors duration-500">
                <Trophy size={18} className="text-blush" />
              </div>
              <div className="flex flex-col">
                <span className="text-rose text-lg mb-0.5">{stadium.sports?.join(', ') || 'Multi-sport'}</span>
                <span className="opacity-60">Primary Disciplines</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-[1px] h-12 bg-gradient-to-b from-rose to-transparent" />
      </div>
    </section>
  );
}
