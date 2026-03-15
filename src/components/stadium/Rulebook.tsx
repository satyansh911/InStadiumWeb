"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Play, Info, Trophy } from "lucide-react";

interface RuleSection {
  title: string;
  content: string;
}

interface RulebookProps {
  sportName: string;
  rules: RuleSection[];
}

export default function Rulebook({ sportName, rules }: RulebookProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-plum text-blush rounded-3xl overflow-hidden shadow-2xl border border-white/5 h-full">
      <div className="p-8 md:p-12">
        <div className="flex items-center gap-4 mb-12">
           <div className="w-10 h-10 rounded-full bg-rose flex items-center justify-center">
             <Info size={18} className="text-blush" />
           </div>
           <div>
             <h3 className="text-2xl md:text-3xl font-light tracking-tight italic">
               The <span className="not-italic font-normal">Official</span> Rulebook
             </h3>
             <p className="font-sans text-[10px] tracking-[0.2em] uppercase opacity-40 mt-1">Master the game of {sportName}</p>
           </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Navigation */}
          <div className="w-full md:w-1/3 flex flex-col gap-3">
            {rules.map((rule, index) => (
              <button
                key={rule.title}
                onClick={() => setActiveIndex(index)}
                className={`group flex items-center justify-between p-5 rounded-2xl font-sans text-[11px] tracking-[0.15em] uppercase text-left transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-rose text-blush shadow-lg shadow-rose/20"
                    : "bg-white/5 text-blush/40 hover:bg-white/10 hover:text-blush"
                }`}
              >
                <span>{rule.title}</span>
                <ChevronRight 
                  size={14} 
                  className={`transition-transform duration-300 ${activeIndex === index ? "translate-x-1" : "opacity-0 group-hover:opacity-100"}`} 
                />
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="w-full md:w-2/3 min-h-[300px] flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col h-full"
              >
                <h4 className="text-2xl font-normal mb-6 text-rose">
                  {rules[activeIndex].title}
                </h4>
                <div className="font-sans text-sm leading-relaxed text-blush/70 space-y-4">
                  {rules[activeIndex].content.split('\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                
                <div className="mt-auto pt-10 flex items-center gap-8 border-t border-white/10">
                  <div className="flex flex-col gap-1">
                    <span className="font-sans text-[9px] tracking-[0.2em] uppercase opacity-40">Skill Level</span>
                    <div className="flex gap-1">
                       {[1, 2, 3, 4, 5].map(i => (
                         <div key={i} className={`w-3 h-1 rounded-full ${i <= (activeIndex + 2) ? "bg-rose" : "bg-white/10"}`} />
                       ))}
                    </div>
                  </div>
                  <button className="flex items-center gap-2 group ml-auto font-sans text-[10px] tracking-[0.2em] uppercase text-rose hover:text-blush transition-colors">
                    <Play size={12} className="fill-current" />
                    <span className="border-b border-transparent group-hover:border-current">Watch Video Guide</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
