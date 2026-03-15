"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { getEventById } from "@/api";
import { ArrowLeft, MapPin, Calendar, Users, Star } from "lucide-react";

export default function EventDetail() {
  const params = useParams();
  const id = params.id as string;
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEventById(id).then(({ data }) => {
      setEvent(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-blush flex items-center justify-center">
         <p className="font-serif italic text-2xl text-plum/30 animate-pulse">Unveiling the archive...</p>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="min-h-screen bg-blush flex flex-col items-center justify-center p-6 text-center">
         <h1 className="text-4xl font-light text-plum mb-6">Archive <span className="italic">Not Found</span></h1>
         <Link href="/portfolio" className="font-sans text-xs tracking-[0.2em] uppercase text-rose border-b border-rose/30 pb-1">Return to Portfolio</Link>
      </main>
    );
  }

  const primaryImage = event.event_images?.find((img: any) => img.is_primary)?.url 
    ?? event.event_images?.[0]?.url 
    ?? "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80";

  const gallery = (event.event_images || []).length > 1 
    ? event.event_images.slice(1) 
    : [
        { url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80" },
        { url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80" }
      ];

  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush">
      <div className="bg-rose h-24 w-full fixed top-0 z-40"></div>
      <Navbar />

      <section className="pt-48 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <ScrollReveal className="mb-12">
          <Link href="/portfolio" className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-plum/40 hover:text-rose transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Header & Details */}
          <div className="space-y-16">
            <ScrollReveal direction="left">
               <div className="flex items-center gap-3 mb-6 font-sans text-[10px] tracking-[0.3em] uppercase text-rose">
                  <span className="opacity-60">{event.category}</span>
                  <span className="w-8 h-[1px] bg-rose/20"></span>
                  <span>{new Date(event.date || "").getFullYear()}</span>
               </div>
               <h1 className="text-6xl md:text-8xl font-light text-plum leading-[1.05] mb-8">
                 {event.title.split(' ').slice(0, -1).join(' ')} <span className="italic">{event.title.split(' ').pop()}</span>
               </h1>
               <p className="font-serif text-2xl text-plum/70 italic border-l-2 border-rose/20 pl-8 ml-2">
                 {event.client_name}
               </p>
            </ScrollReveal>

            <ScrollReveal delay={2} className="space-y-8 font-serif text-xl tracking-wide text-plum/80 leading-relaxed max-w-lg">
               <p>{event.description || "A meticulously curated celebration focusing on the finest details and a unique client vision."}</p>
               
               <div className="pt-12 grid grid-cols-2 gap-12 border-t border-rose/10">
                  <div className="space-y-2">
                    <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-plum/40">Location</p>
                    <p className="flex items-center gap-2 text-plum"><MapPin size={16} className="text-rose" /> {event.location}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-plum/40">Season</p>
                    <p className="flex items-center gap-2 text-plum"><Calendar size={16} className="text-rose" /> {new Date(event.date || "").toLocaleDateString(undefined, { month: 'long' })}</p>
                  </div>
               </div>
            </ScrollReveal>

            {event.testimonial && (
              <ScrollReveal delay={3} className="bg-rose/[0.03] p-12 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 text-rose/10 group-hover:text-rose/20 transition-colors">
                    <Star size={48} fill="currentColor" />
                 </div>
                 <p className="font-serif text-lg italic text-plum/70 relative z-10 leading-relaxed">
                   &ldquo;{event.testimonial}&rdquo;
                 </p>
                 <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/40 mt-8 relative z-10">&mdash; The Clients</p>
              </ScrollReveal>
            )}
          </div>

          {/* Featured Image */}
          <ScrollReveal direction="right" className="relative aspect-[3/4] w-full bg-rose/5 group overflow-hidden shadow-2xl shadow-rose/5">
             <Image 
               src={primaryImage} 
               alt={event.title}
               fill
               unoptimized
               className="object-cover img-zoom"
             />
             <div className="absolute inset-0 bg-pinstripe opacity-10" />
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery Wash */}
      <section className="bg-peach/15 py-48 px-6 md:px-12 my-32">
         <div className="max-w-7xl mx-auto">
            <ScrollReveal className="mb-24 text-center">
               <h2 className="text-3xl md:text-5xl font-light text-plum">Visual <span className="italic">Fragments</span></h2>
               <div className="w-24 h-[1px] bg-rose/30 mx-auto mt-8" />
            </ScrollReveal>
            
            <div className="columns-1 md:columns-2 gap-12 space-y-12">
               {gallery.map((img: any, idx: number) => (
                  <ScrollReveal 
                    key={idx} 
                    delay={(idx % 2 + 1) as 1|2}
                    className="break-inside-avoid relative group cursor-pointer overflow-hidden shadow-xl"
                  >
                     <img 
                       src={img.url} 
                       alt="detail" 
                       className="w-full grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105" 
                     />
                  </ScrollReveal>
               ))}
            </div>
         </div>
      </section>

      {/* Next Project Nav */}
      <section className="py-48 px-6 text-center">
         <ScrollReveal>
           <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-plum/40 mb-12">Next Discovery</p>
           <h3 className="text-4xl md:text-6xl font-light text-plum hover:text-rose transition-colors cursor-pointer group">
              Venetian <span className="italic">Masquerade</span>
           </h3>
           <Link href="/portfolio" className="inline-block mt-16 font-sans text-[11px] tracking-[0.2em] uppercase text-rose border-b border-rose/30 pb-1">All Work</Link>
         </ScrollReveal>
      </section>

      <Footer />
    </main>
  );
}
