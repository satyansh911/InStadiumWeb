"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { Search, Filter, MapPin, Trophy, Users } from "lucide-react";
import { getStadiums } from "@/api";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import { motion, AnimatePresence } from "framer-motion";

export default function StadiumsPage() {
  const [stadiums, setStadiums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState("All");

  const sports = ["All", "Cricket", "Football", "Kabaddi", "Badminton", "Tennis", "Hockey"];

  useEffect(() => {
    getStadiums().then(({ data }) => {
      if (data) {
        setStadiums(data);
      }
      setLoading(false);
    });
  }, []);

  const filteredStadiums = stadiums.filter((stadium) => {
    const matchesSearch = 
      stadium.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stadium.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const sportsPlayed = stadium.sportsPlayed || [];
    const matchesSport = selectedSport === "All" || 
      sportsPlayed.some((s: any) => s.name.toLowerCase() === selectedSport.toLowerCase());

    return matchesSearch && matchesSport;
  });

  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush text-plum">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 px-6 bg-plum overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-pinstripe-light" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <ScrollReveal>
            <h1 className="text-5xl md:text-7xl font-light text-blush mb-6 italic">
              Iconic <span className="not-italic font-normal">Arenas</span>
            </h1>
            <p className="text-blush/60 font-sans text-xs tracking-[0.4em] uppercase max-w-2xl mx-auto leading-loose">
              Discover the most legendary sporting venues across the nation, crafted for the ultimate fan experience.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-[80px] z-40 bg-blush/80 backdrop-blur-md border-y border-rose/10 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-rose/40" size={18} />
            <input
              type="text"
              placeholder="Search by Stadium or City..."
              className="w-full pl-12 pr-6 py-3 bg-white border border-rose/10 rounded-full focus:outline-none focus:ring-2 focus:ring-rose/20 transition-all font-sans text-sm text-plum placeholder:text-plum/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
            <Filter size={16} className="text-rose shrink-0" />
            {sports.map((sport) => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`px-6 py-2 rounded-full font-sans text-[10px] tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-300 ${
                  selectedSport === sport
                    ? "bg-rose text-blush shadow-lg shadow-rose/20"
                    : "bg-white text-plum/60 border border-rose/5 hover:border-rose/20"
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stadium Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[3/4] bg-rose/5 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {filteredStadiums.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                <AnimatePresence mode="popLayout">
                  {filteredStadiums.map((stadium) => (
                    <motion.div
                      layout
                      key={stadium.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Link 
                        href={`/stadium/${stadium.id}`}
                        className="group flex flex-col card-hover"
                      >
                        <div className="relative aspect-[3/4] mb-8 overflow-hidden rounded-2xl bg-blush shadow-2xl border border-rose/10 text-plum">
                          <Image 
                            src={getOptimizedImageUrl(stadium.image || (stadium as any).galleryImages?.[0]?.url, { width: 800, height: 1000, crop: 'fill' })} 
                            alt={stadium.name}
                            fill
                            unoptimized
                            className="object-cover img-zoom saturate-[0.85] group-hover:saturate-100"
                          />
                          <div className="absolute top-6 left-6">
                            <span className="bg-rose/90 backdrop-blur-md text-blush px-4 py-1.5 rounded-full font-sans text-[9px] tracking-[0.2em] uppercase font-bold border border-white/20">
                              {stadium.sportsPlayed?.[0]?.name || 'Sports'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-rose/60">
                             <MapPin size={12} />
                             <span className="font-sans text-[10px] tracking-[0.2em] uppercase">{stadium.city}</span>
                          </div>
                          <h3 className="text-3xl font-light text-plum group-hover:italic group-hover:text-rose transition-all duration-300">
                            {stadium.name}
                          </h3>
                          <div className="flex items-center gap-6 pt-2 border-t border-rose/10">
                            <div className="flex items-center gap-2">
                              <Users size={14} className="text-rose/40" />
                              <span className="font-sans text-[10px] text-plum/60">{stadium.capacity.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Trophy size={14} className="text-rose/40" />
                              <span className="font-sans text-[10px] text-plum/60">Tier {stadium.tier || 1} Venue</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="py-32 text-center">
                <div className="w-20 h-20 bg-rose/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-rose/10">
                  <Search size={32} className="text-rose/20" />
                </div>
                <h3 className="text-2xl font-light text-plum mb-4">No Stadiums Found</h3>
                <p className="text-plum/40 font-sans text-sm max-w-md mx-auto">
                  We couldn&apos;t find any venues matching your search criteria. Try adjusting your filters or search terms.
                </p>
                <button 
                  onClick={() => { setSearchQuery(""); setSelectedSport("All"); }}
                  className="mt-12 font-sans text-[11px] uppercase tracking-[0.2em] text-rose border-b border-rose transition-all hover:tracking-[0.3em]"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}
