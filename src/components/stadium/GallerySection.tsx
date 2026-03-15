"use client";

import ScrollReveal from "../ScrollReveal";
import Image from "next/image";
import { getOptimizedImageUrl } from "@/lib/cloudinary";

export default function GallerySection({ images }: { images: string[] }) {
  if (!images || images.length === 0) return null;

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div>
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose font-bold block mb-4">Architecture</span>
          <h2 className="text-4xl md:text-6xl font-light text-plum">Visual <span className="italic">Perspective</span></h2>
        </div>
        <p className="max-w-md text-plum/60 font-sans text-xs leading-loose italic">
          Capturing the architectural majesty and atmospheric brilliance of India&apos;s most iconic sporting theater.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        {images.map((img, i) => {
          const isLarge = i === 0 || i === 4;
          return (
            <ScrollReveal 
              key={i} 
              delay={(i % 3 + 1) as 1 | 2 | 3}
              className={`${isLarge ? "lg:col-span-8" : "lg:col-span-4"}`}
            >
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden group shadow-2xl hover:shadow-rose/10 transition-all duration-700">
                <Image 
                  src={getOptimizedImageUrl(img, { width: isLarge ? 1200 : 800, height: 800, crop: 'fill' })} 
                  alt={`Stadium View ${i + 1}`} 
                  fill 
                  className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1 saturate-[0.8] group-hover:saturate-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-rose font-sans text-[10px] uppercase tracking-[0.3em] font-bold mb-2 block">Frame {i + 1}</span>
                    <h4 className="text-blush text-xl font-light italic">Architectural Detail</h4>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
