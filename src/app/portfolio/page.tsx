"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { getEvents } from "@/api";
import ScrollReveal from "@/components/ScrollReveal";

export default function Portfolio() {
  const [events, setEvents] = useState<any[]>([]);
  const [filter, setFilter] = useState("All Work");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents().then(({ data }) => {
      if (data && data.length > 0) {
        setEvents(data);
      }
      setLoading(false);
    });
  }, []);

  const filteredEvents = filter === "All Work" 
    ? events 
    : events.filter(e => e.category === filter.replace(/s$/, ''));

  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush">
      <div className="bg-rose h-16 w-full fixed top-0 z-40"></div>
      <Navbar />
      
      <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24">
          <ScrollReveal>
            <h1 className="text-6xl md:text-7xl font-light text-plum">The <span className="italic">Portfolio</span></h1>
          </ScrollReveal>
          
          <ScrollReveal delay={1} className="flex space-x-8 mt-12 md:mt-0 font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase text-plum/60 overflow-x-auto pb-4 md:pb-0">
            {["All Work", "Weddings", "Galas", "Private"].map((cat) => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`transition-colors hover:text-rose ${filter === cat ? "text-plum border-b border-rose/30 pb-1" : ""}`}
              >
                {cat}
              </button>
            ))}
          </ScrollReveal>
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <p className="animate-pulse font-serif text-plum/40 italic text-2xl">Loading the archive...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-32 gap-x-12 lg:gap-x-16">
            {filteredEvents.map((item, index) => {
              const mtClass = index % 3 === 1 ? "lg:mt-32" : index % 3 === 2 ? "lg:mt-16" : "";
              const mdMtClass = index % 2 === 1 ? "md:mt-24 lg:mt-0" : "";
              
              const primaryImage = item.event_images?.find((img: any) => img.is_primary)?.url 
                ?? item.event_images?.[0]?.url 
                ?? "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80";

              return (
                <ScrollReveal 
                  key={item.id} 
                  delay={(index % 3 + 1) as 1|2|3}
                  className={`${mtClass} ${mdMtClass}`}
                >
                  <EventCard 
                    id={item.id}
                    title={item.title}
                    client={item.client_name}
                    image={primaryImage}
                    type={item.category}
                    aspectRatio={index % 2 === 0 ? "portrait" : "square"}
                  />
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {!loading && filteredEvents.length === 0 && (
          <div className="text-center py-32">
            <p className="font-serif text-plum/40 italic text-xl">No events found in this category.</p>
          </div>
        )}
      </section>
      
      <Footer />
    </main>
  );
}
