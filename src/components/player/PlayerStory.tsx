'use client';

import { motion } from 'framer-motion';

interface PlayerStoryProps {
  bio: string | null;
}

export default function PlayerStory({ bio }: PlayerStoryProps) {
  if (!bio) return null;

  // Split bio into paragraphs. Handling both \n and \n\n
  const paragraphs = bio.split(/\n+/).filter(p => p.trim() !== '');

  return (
    <section className="py-24 bg-rose-50/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif italic text-rose-950 mb-6 underline decoration-rose-200 underline-offset-8">
            The Legend's Legacy
          </h2>
          <div className="h-1 w-24 bg-rose-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 gap-12">
          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`text-lg md:text-xl leading-relaxed text-rose-900/80 font-light tracking-wide
                ${index === 0 ? 'first-letter:text-7xl first-letter:font-serif first-letter:mr-4 first-letter:float-left first-letter:text-rose-700 first-letter:leading-none' : ''}
              `}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 pt-8 border-t border-rose-200 text-center"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-rose-400 font-medium">
            Story narrated by Instadium Editorial
          </span>
        </motion.div>
      </div>
    </section>
  );
}
