"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { getStadiums } from "@/api";
import { getOptimizedImageUrl } from "@/lib/cloudinary";

export default function FeaturedStadiums() {
  const [stadiums, setStadiums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStadiums().then(({ data }) => {
      if (data && data.length > 0) {
        // Filter for featured only if applicable, otherwise take top 3
        const featured = data.slice(0, 3);
        setStadiums(featured);
      } else {
        // Fallback mock data if API is not yet seeded or returning empty
        setStadiums([
          {
            id: 'wankhede-stadium',
            name: 'Wankhede Stadium',
            city: 'Mumbai',
            capacity: 33000,
            image: '/images/stadiums/wankhedestadium.jpg',
            sport: 'Cricket'
          },
          {
            id: 'narendra-modi-stadium',
            name: 'Narendra Modi Stadium',
            city: 'Ahmedabad',
            capacity: 132000,
            image: '/images/stadiums/narendramodistadium.jpg',
            sport: 'Cricket'
          },
          {
            id: 'salt-lake',
            name: 'Salt Lake Stadium',
            city: 'Kolkata',
            capacity: 85000,
            image: '/images/stadiums/saltlakestadium.jpg',
            sport: 'Football'
          }
        ]);
      }
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto">
      <ScrollReveal className="text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-light mb-6 text-plum">Explore <span className="italic">Iconic</span> Venues</h2>
        <Link
          href="/stadiums"
          className="link-underline font-sans text-[11px] uppercase tracking-[0.2em] text-plum/60 hover:text-rose transition-colors duration-300"
        >
          View All Stadiums
        </Link>
      </ScrollReveal>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-pulse">
           {[1,2,3].map(i => (
             <div key={i} className="aspect-[3/4] bg-rose/5 border border-rose/10 rounded-lg" />
           ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12 lg:gap-x-16">
          {stadiums.map((stadium, index) => {
            const primaryImage = stadium.image || stadium.galleryImages?.[0]?.url || "https://images.unsplash.com/photo-1540744158800-4785387f481c?q=80";

            return (
              <ScrollReveal
                key={stadium.id}
                delay={(index + 1) as 1 | 2 | 3}
                className={`${index === 1 ? "md:mt-32" : ""} ${index === 2 ? "lg:mt-16" : ""}`}
              >
                <Link 
                  href={`/stadium/${stadium.id}`}
                  className="group flex flex-col card-hover"
                >
                  <div className="relative w-full aspect-[3/4] mb-8 overflow-hidden bg-blush border border-rose/10 rounded-lg shadow-lg">
                    <Image 
                      src={getOptimizedImageUrl(primaryImage, { width: 600, height: 800, crop: 'fill' })} 
                      alt={stadium.name}
                      fill
                      unoptimized
                      className="object-cover img-zoom saturate-[0.85] group-hover:saturate-100"
                    />
                    {/* Subtle hover overlay */}
                    <div className="absolute inset-0 bg-rose/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </div>
                  
                  <div className="flex flex-col space-y-3">
                    <div className="flex justify-between items-center font-sans text-[10px] tracking-[0.2em] uppercase text-plum/50">
                      <span>{stadium.city}</span>
                      <span>{stadium.sport}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-normal text-plum group-hover:italic group-hover:text-rose transition-all duration-400">
                      {stadium.name}
                    </h3>
                    <div className="flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-rose" />
                       <p className="text-[10px] tracking-[0.1em] text-plum/40 uppercase">
                         Capacity: {stadium.capacity?.toLocaleString()}
                       </p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      )}
    </section>
  );
}
