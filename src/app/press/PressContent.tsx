"use client";

import { useState, useEffect } from "react";
import { getPressFeatures } from "@/api";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import { ExternalLink, Camera } from "lucide-react";
import Footer from "@/components/Footer";

export default function PressContent() {
  const [pressItems, setPressItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    getPressFeatures().then(({ data }) => {
      if (data) setPressItems(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-6 flex flex-col items-center justify-center bg-blush">
        <div className="w-12 h-12 border-2 border-rose/30 border-t-rose rounded-full animate-spin mb-4" />
        <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-plum/60">Curating the Archive...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-32 bg-blush selection:bg-rose selection:text-blush">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-24 text-center">
          <ScrollReveal direction="up">
            <h1 className="text-5xl md:text-7xl font-garamond italic text-plum mb-6">Archive & Press</h1>
            <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-rose font-medium">Selected Editorial Features</p>
          </ScrollReveal>
        </header>

        <div className="space-y-16">
          {pressItems.map((item, index) => (
            <ScrollReveal key={item.id} direction="up" delay={(index % 4 + 1) as 1 | 2 | 3 | 4}>
              <div className="group border-b border-rose/10 pb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8 transition-all duration-700 group-hover:pl-8 md:group-hover:pl-12">
                  <div className="flex-1">
                    <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-rose mb-3">
                      {item.publication} &bull; {new Date(item.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    </p>
                    <button 
                      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                      className="text-left group/headline"
                    >
                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-garamond text-plum group-hover/headline:italic transition-all duration-700 cursor-pointer tracking-tight">
                        {item.headline}
                      </h2>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    {item.images?.length > 0 && (
                      <button 
                        onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                        className="flex items-center space-x-2 font-sans text-[10px] tracking-[0.2em] uppercase text-rose hover:text-plum transition-colors"
                      >
                        <Camera size={14} />
                        <span>{expandedId === item.id ? "Close Gallery" : `View Gallery (${item.images.length})`}</span>
                      </button>
                    )}
                    <a 
                      href={item.url || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 font-sans text-[10px] tracking-[0.2em] uppercase text-plum/40 hover:text-rose transition-colors"
                    >
                      <span>Read Online</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                {/* Interactive Gallery */}
                {expandedId === item.id && item.images?.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-up">
                    {item.images.map((img: any, i: number) => (
                      <div key={img.id} className="relative aspect-[4/5] overflow-hidden bg-rose/5 group/gallery">
                        <Image
                          src={img.url || "https://images.unsplash.com/photo-1540744158800-4785387f481c?q=80"}
                          alt={`${item.headline} gallery image ${i + 1}`}
                          fill
                          className="object-cover img-zoom"
                        />
                        <div className="absolute inset-0 bg-plum/10 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-700" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
