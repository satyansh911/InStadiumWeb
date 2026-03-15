"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SportHero from "@/components/sports/SportHero";
import HistoryTimeline from "@/components/sports/HistoryTimeline";
import Rulebook from "@/components/stadium/Rulebook";
import AffiliatedStadiums from "@/components/sports/AffiliatedStadiums";
import IconicPlayers from "@/components/sports/IconicPlayers";
import ScrollReveal from "@/components/ScrollReveal";
import { SportMetadata } from "@/lib/sports-data";

interface SportPageClientProps {
  sport: any;
  metadata: SportMetadata;
}

export default function SportPageClient({ sport, metadata }: SportPageClientProps) {
  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush">
      <Navbar />
      
      <SportHero 
        name={metadata.name} 
        description={metadata.longDescription}
        tags={metadata.tags}
      />

      {/* History Section */}
      {metadata.history && metadata.history.length > 0 && (
        <HistoryTimeline events={metadata.history} />
      )}

      {/* Rulebook Section */}
      <section className="py-24 bg-peach/30 border-y border-rose/5">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="mb-20">
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose font-bold mb-4 block">Regulations</span>
            <h2 className="text-4xl md:text-6xl font-light text-plum">The Interactive <span className="italic">Rulebook</span></h2>
            <div className="w-20 h-1 bg-rose mt-8 rounded-full" />
          </ScrollReveal>
          
          <div className="lg:max-w-5xl mx-auto">
            <Rulebook sportName={metadata.name} rules={metadata.rulebook} />
          </div>
        </div>
      </section>

      {/* Stadiums Section */}
      <AffiliatedStadiums 
        stadiums={sport.stadiums} 
        sportName={metadata.name} 
      />

      {/* Players Section */}
      <IconicPlayers 
        players={sport.players} 
        sportName={metadata.name} 
      />

      {/* Footer Call to Action */}
      <section className="py-32 px-6 bg-blush text-center overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.03] bg-pinstripe-dark pointer-events-none" />
        <ScrollReveal>
          <div className="max-w-4xl mx-auto space-y-12">
            <h3 className="text-4xl md:text-7xl font-light text-plum leading-[1.1]">
              Witness the <span className="italic">passion</span> on India&apos;s grandest stages.
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <button className="px-10 py-4 bg-rose text-blush rounded-full font-sans text-xs tracking-[0.3em] uppercase hover:bg-plum transition-all duration-500 shadow-xl shadow-rose/20">
                Book Stadium Tour
              </button>
              <button className="px-10 py-4 border border-plum/10 text-plum rounded-full font-sans text-xs tracking-[0.3em] uppercase hover:bg-plum hover:text-blush transition-all duration-500">
                Contact Federation
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </main>
  );
}
