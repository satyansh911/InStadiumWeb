"use client";

import { useEffect, useState } from "react";
import ScrollReveal from "../ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import { getStadiums } from "@/api";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import { calculateDistance } from "@/lib/geo";

interface StadiumWithDistance {
  id: string;
  name: string;
  city: string;
  image: string;
  galleryImages?: any[];
  latitude?: number;
  longitude?: number;
  distance?: number;
  state?: string;
}

export default function NearbyStadiums() {
  const [stadiums, setStadiums] = useState<StadiumWithDistance[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationPermitted, setLocationPermitted] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const { data: rawData } = await getStadiums();
        const data = rawData as StadiumWithDistance[] | null;
        if (!data) return;

        // Try to get location
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocationPermitted(true);

            const processed = data.map((s: any) => ({
              ...s,
              distance: s.latitude && s.longitude 
                ? calculateDistance(latitude, longitude, s.latitude, s.longitude)
                : undefined
            }))
            .sort((a: any, b: any) => (a.distance || 999999) - (b.distance || 999999));

            setStadiums(processed.slice(0, 3));
            setLoading(false);
          },
          () => {
            // Permission denied or error
            setLocationPermitted(false);
            setStadiums(data.slice(0, 3));
            setLoading(false);
          }
        );
      } catch (error) {
        console.error("Error fetching nearby stadiums:", error);
        setLoading(false);
      }
    }

    init();
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-rose/10">
        <div className="animate-pulse flex items-center justify-center h-64 bg-plum/5 rounded-[2.5rem]">
           <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose/30">Locating Premium Venues...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-rose/10">
      <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div>
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose font-bold block mb-4">Nearby</span>
          <h2 className="text-4xl md:text-6xl font-light text-plum">Recommended <span className="italic">Arenas</span></h2>
        </div>
        <Link href="/stadiums" className="group flex items-center gap-3 font-sans text-[11px] tracking-[0.2em] uppercase text-plum/60 hover:text-rose transition-colors">
          Explore Territory
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {stadiums.map((stadium, index) => (
          <ScrollReveal key={stadium.id} delay={(index % 3) as any}>
            <Link href={`/stadium/${stadium.id}`} className="group relative block rounded-[2.5rem] overflow-hidden bg-plum shadow-2xl h-[450px]">
              <Image 
                src={getOptimizedImageUrl(stadium.image || stadium.galleryImages?.[0]?.url, { width: 800, height: 1000, crop: 'fill' })} 
                alt={stadium.name}
                fill
                className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-75 group-hover:rotate-1"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-10 left-10 right-10">
                 <div className="flex items-center gap-3 mb-4">
                    {locationPermitted && stadium.distance !== undefined && (
                      <div className="px-3 py-1 bg-rose/20 backdrop-blur-md rounded-full border border-rose/30">
                        <span className="text-blush text-[9px] font-sans tracking-widest font-bold uppercase">
                          {stadium.distance < 1 
                            ? `${(stadium.distance * 1000).toFixed(0)} m` 
                            : `${stadium.distance.toFixed(1)} km`}
                        </span>
                      </div>
                    )}
                    <span className="text-blush/60 text-[9px] font-sans tracking-widest uppercase font-bold italic">Nearby</span>
                 </div>
                 <h3 className="text-3xl font-light text-blush group-hover:text-rose transition-colors duration-500 italic leading-[1.1] mb-2">{stadium.name}</h3>
                 <div className="flex items-center gap-2 text-blush/40 font-sans text-[9px] tracking-[0.2em] uppercase font-bold">
                    <MapPin size={10} />
                    <span>{stadium.city}{stadium.state ? `, ${stadium.state}` : ''}</span>
                 </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
