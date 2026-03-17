"use client";

import { useState, type SyntheticEvent } from "react";
import ScrollReveal from "../ScrollReveal";
import { Play } from "lucide-react";
import VideoModal from "./VideoModal";
import { motion } from "framer-motion";

export default function TimelineSection({ timeline }: { timeline: any[] }) {
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);

  const extractYouTubeId = (url?: string) => {
    if (!url) return null;

    try {
      const parsedUrl = new URL(url);
      const host = parsedUrl.hostname.replace(/^www\./, "");

      if (host === "youtu.be") {
        return parsedUrl.pathname.split("/").filter(Boolean)[0] || null;
      }

      if (host === "youtube.com" || host === "m.youtube.com") {
        if (parsedUrl.pathname === "/watch") {
          return parsedUrl.searchParams.get("v");
        }

        if (parsedUrl.pathname.startsWith("/shorts/")) {
          return parsedUrl.pathname.split("/")[2] || null;
        }

        if (parsedUrl.pathname.startsWith("/embed/")) {
          return parsedUrl.pathname.split("/")[2] || null;
        }
      }
    } catch {
      return null;
    }

    return null;
  };

  const getTimelineThumbnail = (item: any) => {
    if (item.thumbnail) return item.thumbnail;
    const videoId = extractYouTubeId(item.videoUrl);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  const handleThumbnailError = (event: SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    const source = image.src;

    if (source.includes('/maxresdefault.jpg')) {
      image.src = source.replace('/maxresdefault.jpg', '/hqdefault.jpg');
      return;
    }

    if (source.includes('/hqdefault.jpg')) {
      image.src = source.replace('/hqdefault.jpg', '/mqdefault.jpg');
    }
  };

  if (!timeline || timeline.length === 0) return null;

  return (
    <section className="py-32 bg-peach/30 border-y border-rose/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal className="mb-32 text-center space-y-6">
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose font-bold block">The Legacy</span>
          <h2 className="text-5xl md:text-7xl font-light text-plum">Heritage & <span className="italic">History</span></h2>
          <div className="w-24 h-px bg-rose/30 mx-auto mt-12" />
        </ScrollReveal>

        <div className="relative">
          {/* Central Line with improved styling */}
          <div className="absolute left-7.5 md:left-1/2 top-0 w-0.5 h-full bg-linear-to-b from-rose/60 via-rose/20 to-transparent" />
          
          <div className="space-y-40">
            {timeline.map((item, i) => {
              const thumbnailUrl = getTimelineThumbnail(item);

              return (
              <div key={i} className={`relative flex flex-col md:flex-row items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className={`w-full md:w-1/2 px-12 md:px-24 mb-12 md:mb-0 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <ScrollReveal delay={(i % 2 + 1) as 1 | 2} direction={i % 2 === 0 ? "left" : "right"}>
                    <div className="relative group">
                      <span className="text-6xl md:text-9xl font-serif italic text-rose/10 absolute -top-12 md:-top-20 left-0 md:left-auto right-0 -z-10 select-none">
                        {item.year}
                      </span>
                      
                      <div className="inline-block relative z-10">
                        <span className="text-rose font-serif text-xl italic mb-4 block">{item.year}</span>
                        <h3 className="text-3xl md:text-4xl font-light text-plum leading-tight mb-6 group-hover:text-rose transition-colors duration-500">
                          {item.title || item.event}
                        </h3>
                        <p className="text-plum/60 font-sans text-sm tracking-wide leading-relaxed max-w-md mx-auto md:mx-0">
                          {item.description || item.event}
                        </p>

                        {item.videoUrl && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedVideo({ url: item.videoUrl, title: item.title || item.event })}
                            className="mt-8 flex items-center gap-4 bg-rose text-white px-6 py-3 rounded-full font-sans text-xs tracking-widest uppercase hover:bg-plum transition-all duration-500 shadow-xl shadow-rose/20"
                          >
                            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                              <Play size={14} fill="currentColor" />
                            </span>
                            Relive the Moment
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
                
                {/* Center Node with pulse effect */}
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-4 md:top-1/2 md:-translate-y-1/2 z-20">
                   <div className="relative">
                     <div className="w-4 h-4 rounded-full bg-rose z-10 border-4 border-blush shadow-lg" />
                     <div className="absolute inset-0 w-4 h-4 rounded-full bg-rose animate-ping opacity-20 scale-150" />
                   </div>
                </div>
                
                <div className="w-full md:w-1/2 px-12 md:px-24">
                  {thumbnailUrl && (
                    <ScrollReveal delay={0.3 as any}>
                      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-rose/10 group cursor-pointer"
                           onClick={() => item.videoUrl && setSelectedVideo({ url: item.videoUrl, title: item.title || item.event })}>
                        <img 
                          src={thumbnailUrl} 
                          alt={item.title}
                          onError={handleThumbnailError}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-plum/40 group-hover:bg-plum/20 transition-colors duration-500 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <Play size={24} className="text-white ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  )}
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.url || ""}
        title={selectedVideo?.title || ""}
      />
    </section>
  );
}
