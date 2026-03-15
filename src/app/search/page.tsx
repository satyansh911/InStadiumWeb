"use client";

import { useEffect, useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { Search, Filter, MapPin, Trophy, Users, LayoutGrid, Map as MapIcon, X } from "lucide-react";
import { getStadiums } from "@/api";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import { motion, AnimatePresence } from "framer-motion";
import GlobalStadiumMap from "@/components/stadium/GlobalStadiumMap";

export default function SearchPage() {
  const [stadiums, setStadiums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const sports = ["All", "Cricket", "Football", "Kabaddi", "Badminton", "Tennis", "Hockey"];

  useEffect(() => {
    getStadiums().then(({ data }) => {
      if (data) {
        setStadiums(data);
      }
      setLoading(false);
    });
  }, []);

  const filteredStadiums = useMemo(() => {
    return stadiums.filter((stadium) => {
      const matchesSearch = 
        stadium.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stadium.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stadium.state?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const sportsPlayed = stadium.sportsPlayed || [];
      const matchesSport = selectedSport === "All" || 
        sportsPlayed.some((s: any) => s.name.toLowerCase() === selectedSport.toLowerCase());

      return matchesSearch && matchesSport;
    });
  }, [stadiums, searchQuery, selectedSport]);

  const uniqueCities = useMemo(() => {
     const cities = stadiums.map(s => s.city);
     return ["All Cities", ...Array.from(new Set(cities))].sort();
  }, [stadiums]);

  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush flex flex-col">
      <Navbar />

      {/* Hero / Header */}
      <section className="pt-32 pb-12 px-6 md:px-12 bg-white/30 backdrop-blur-sm border-b border-rose/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
            <ScrollReveal>
                <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose font-bold mb-4 block">Discovery</span>
                <h1 className="text-5xl md:text-7xl font-light text-plum tracking-tight leading-[1.1]">
                    Find your <br />
                    <span className="italic font-serif">Arena.</span>
                </h1>
            </ScrollReveal>

            <ScrollReveal delay={1} className="flex items-center gap-4 bg-plum/5 p-1.5 rounded-2xl border border-plum/5">
                <button 
                    onClick={() => setViewMode("grid")}
                    className={`flex items-center gap-3 px-6 py-3 rounded-xl font-sans text-[10px] tracking-widest uppercase transition-all duration-500 ${viewMode === "grid" ? "bg-plum text-blush shadow-xl shadow-plum/20" : "text-plum/50 hover:text-plum"}`}
                >
                    <LayoutGrid size={14} /> Grid View
                </button>
                <button 
                    onClick={() => setViewMode("map")}
                    className={`flex items-center gap-3 px-6 py-3 rounded-xl font-sans text-[10px] tracking-widest uppercase transition-all duration-500 ${viewMode === "map" ? "bg-plum text-blush shadow-xl shadow-plum/20" : "text-plum/50 hover:text-plum"}`}
                >
                    <MapIcon size={14} /> Map View
                </button>
            </ScrollReveal>
        </div>
      </section>

      {/* Controls Bar */}
      <section className="sticky top-[75px] z-40 bg-white/80 backdrop-blur-xl border-b border-rose/10 py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-center justify-between">
            <div className="relative w-full lg:max-w-xl group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-rose/30 group-focus-within:text-rose transition-colors duration-300" size={20} />
                <input
                    type="text"
                    placeholder="Search by Venue, City, or State..."
                    className="w-full pl-16 pr-8 py-4 bg-plum/5 border-none rounded-2xl focus:ring-2 focus:ring-rose/20 transition-all font-sans text-[13px] text-plum placeholder:text-plum/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <button 
                        onClick={() => setSearchQuery("")}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-plum/20 hover:text-plum transition-colors"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            <div className="flex items-center gap-4 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-hide">
                <div className="flex items-center gap-2 mr-2">
                    <Filter size={16} className="text-rose shrink-0" />
                    <span className="font-sans text-[10px] tracking-widest uppercase text-rose/60 font-bold hidden sm:block">Filters</span>
                </div>
                {sports.map((sport) => (
                    <button
                        key={sport}
                        onClick={() => setSelectedSport(sport)}
                        className={`px-6 py-2.5 rounded-xl font-sans text-[9px] tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-500 border ${
                            selectedSport === sport
                                ? "bg-rose text-blush border-rose shadow-lg shadow-rose/20 scale-105"
                                : "bg-white text-plum/40 border-rose/5 hover:border-rose/20 hover:text-plum"
                        }`}
                    >
                        {sport}
                    </button>
                ))}
            </div>
        </div>
      </section>

      <section className="flex-1 flex flex-col">
        {loading ? (
            <div className="p-12 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="aspect-[4/5] bg-rose/[0.03] rounded-3xl animate-pulse" />
                    ))}
                </div>
            </div>
        ) : (
            <div className="relative flex-1 min-h-[600px]">
                <AnimatePresence mode="wait">
                    {viewMode === "grid" ? (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="p-12 max-w-7xl mx-auto w-full"
                        >
                            {filteredStadiums.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-24">
                                    {filteredStadiums.map((stadium, i) => (
                                        <ScrollReveal key={stadium.id} delay={(i % 3) as 0|1|2}>
                                            <Link href={`/stadium/${stadium.id}`} className="group block focus:outline-none focus:ring-2 focus:ring-rose/20 rounded-3xl transition-all">
                                                <div className="relative aspect-[4/5] mb-8 overflow-hidden rounded-[2.5rem] bg-plum shadow-2xl border border-rose/10 transition-transform duration-700 group-hover:-translate-y-2">
                                                    <Image 
                                                        src={getOptimizedImageUrl(stadium.image || (stadium as any).galleryImages?.[0]?.url, { width: 800, height: 1000, crop: 'fill' })} 
                                                        alt={stadium.name}
                                                        fill
                                                        unoptimized
                                                        className="object-cover transition-all duration-1000 saturate-[0.8] group-hover:saturate-100 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-plum/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                                                    <div className="absolute top-8 left-8">
                                                        <div className="px-5 py-2 bg-rose/20 backdrop-blur-xl rounded-full border border-rose/30">
                                                            <span className="text-blush text-[8px] font-sans tracking-[0.25em] font-bold uppercase italic">
                                                                {stadium.sportsPlayed?.[0]?.name || 'Elite Arena'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="px-2">
                                                    <div className="flex items-center gap-3 text-rose/50 mb-3">
                                                       <MapPin size={12} />
                                                       <span className="font-sans text-[9px] tracking-[0.3em] uppercase font-bold">{stadium.city}</span>
                                                    </div>
                                                    <h3 className="text-3xl font-light text-plum group-hover:text-rose transition-all duration-500 leading-none mb-6">
                                                        {stadium.name}
                                                    </h3>
                                                    <div className="flex items-center gap-8 pt-6 border-t border-rose/5 group-hover:border-rose/20 transition-colors duration-500">
                                                        <div className="flex items-center gap-2">
                                                            <Users size={14} className="text-rose/30" />
                                                            <span className="font-sans text-[10px] tracking-widest text-plum/40 font-bold uppercase">{stadium.capacity.toLocaleString()}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Trophy size={14} className="text-rose/30" />
                                                            <span className="font-sans text-[10px] tracking-widest text-plum/40 font-bold uppercase italic">Tier {stadium.tier || 1}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-40 text-center">
                                    <div className="w-24 h-24 bg-rose/5 rounded-full flex items-center justify-center mx-auto mb-10 border border-rose/10">
                                        <Search size={32} className="text-rose/20" />
                                    </div>
                                    <h3 className="text-3xl font-light text-plum mb-6 italic">No Results <span className="not-italic font-normal">Found</span></h3>
                                    <p className="text-plum/30 font-sans text-xs tracking-widest uppercase max-w-md mx-auto leading-loose">
                                        The arena you are seeking hasn&apos;t been discovered yet. Try refining your search parameters.
                                    </p>
                                    <button 
                                        onClick={() => { setSearchQuery(""); setSelectedSport("All"); }}
                                        className="mt-12 font-sans text-[10px] uppercase tracking-[0.4em] text-rose font-bold border-b border-rose transition-all hover:tracking-[0.5em] pb-1"
                                    >
                                        Reset Discovery
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="map"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 z-0 p-6 md:p-12"
                        >
                            <GlobalStadiumMap stadiums={filteredStadiums} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
