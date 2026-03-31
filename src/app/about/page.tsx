import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <ScrollReveal>
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose font-bold mb-6 block">Our Heritage</span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-plum leading-[0.9] tracking-tighter mb-12">
            The Soul of <br />
            <span className="italic font-serif">the Arena.</span>
          </h1>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <ScrollReveal direction="left" className="relative group overflow-hidden rounded-[2.5rem]">
            <div className="aspect-4/5 relative">
              <Image 
                src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80" 
                alt="Elite Stadium Atmosphere"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-plum/40 to-transparent" />
            </div>
          </ScrollReveal>

          <div className="space-y-12">
            <ScrollReveal delay={1}>
              <h2 className="text-3xl md:text-4xl font-light text-plum leading-tight">
                Instadium was born from a singular obsession: to honor the monuments where legends are forged.
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={2} className="space-y-6 text-plum/60 text-lg leading-relaxed">
              <p>
                We believe a stadium is more than steel and turf; it is a repository of a nation's collective memory. From the hallowed silence before the first ball is bowled to the deafening roar of 100,000 voices in unison, we document the visceral pulse of Indian sports.
              </p>
              <p>
                Our platform merges architectural appreciation with the raw emotion of the game, providing a luxury portal to the inner sanctums of the world's most iconic sporting arenas.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={3} className="pt-8">
              <div className="flex gap-16">
                <div>
                  <p className="text-4xl font-light text-rose mb-2 italic">14+</p>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-plum/40">Elite Venues</p>
                </div>
                <div>
                  <p className="text-4xl font-light text-rose mb-2 italic">8</p>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-plum/40">Core Sports</p>
                </div>
                <div>
                  <p className="text-4xl font-light text-rose mb-2 italic">360°</p>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-plum/40">Immersive Access</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-32 bg-plum overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                title: "Heritage",
                desc: "Preserving the legacy of every blade of grass and beam of steel through meticulous documentation and storytelling.",
                num: "01"
              },
              {
                title: "Atmosphere",
                desc: "Curating the sensory experience—the light, the sound, the tension—that defines the world's most intense rivalries.",
                num: "02"
              },
              {
                title: "Access",
                desc: "Going beyond the boundary. We provide unrivaled digital entry to the inner sanctums where athletes become legends.",
                num: "03"
              }
            ].map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={i as 1 | 2 | 3}>
                <div className="group border-t border-white/10 pt-12">
                  <span className="font-serif italic text-rose/40 text-4xl block mb-8">{pillar.num}</span>
                  <h3 className="text-2xl font-light text-blush mb-6 group-hover:text-rose transition-colors">{pillar.title}</h3>
                  <p className="text-blush/50 leading-relaxed font-light">{pillar.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-48 px-6 bg-blush relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40rem] font-serif italic text-rose/3 select-none pointer-events-none">
          History
        </div>
        <ScrollReveal className="max-w-4xl mx-auto text-center relative z-10">
           <h2 className="text-4xl md:text-6xl leading-[1.2] font-light text-plum">
             &ldquo;We don&apos;t just visit venues. We inhabit <span className="italic text-rose">history</span>&mdash;where every roar, sweat, and victory is a deliberate pulse in the nation&apos;s heartbeat.&rdquo;
           </h2>
        </ScrollReveal>
      </section>

      {/* Team Grid */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-plum/5">
        <ScrollReveal className="mb-20">
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose font-bold mb-4 block">The Keepers</span>
          <h2 className="text-4xl md:text-5xl font-light text-plum italic">Creators <span className="not-italic font-normal">of the Arena</span></h2>
        </ScrollReveal>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-20 gap-y-20 max-w-4xl">
            {[
              {
                name: "Satyansh Singh",
                role: "Founding Creator",
                image: "/images/team/satyanshsingh.jpg",
              },
              {
                name: "Prakshit Suthar",
                role: "Founding Creator",
                image: "/images/team/prakshitsuthar.jpeg",
              },
            ].map((member, index) => (
               <ScrollReveal key={member.name} delay={(index % 4) as 0 | 1 | 2 | 3} className="group cursor-default">
                 <div className="relative w-full aspect-4/5 mb-8 grayscale group-hover:grayscale-0 transition-all duration-700 rounded-3xl overflow-hidden border border-plum/5">
                    <Image 
                      src={member.image}
                      alt={member.name}
                      fill
                      unoptimized
                      className="object-cover transition-all duration-700 scale-110 group-hover:scale-100"
                    />
                 </div>
                 <div className="space-y-1">
                   <h3 className="font-sans text-[11px] tracking-[0.2em] uppercase text-plum/40 group-hover:text-rose transition-colors duration-300 font-bold">{member.role}</h3>
                   <p className="text-3xl font-light text-plum italic">{member.name}</p>
                 </div>
               </ScrollReveal>
            ))}
         </div>
      </section>

      <section className="pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <ScrollReveal className="mb-16">
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose font-bold mb-4 block">Mentor</span>
          <h2 className="text-4xl md:text-5xl font-light text-plum italic">Faculty <span className="not-italic font-normal">Guidance</span></h2>
        </ScrollReveal>

        <ScrollReveal className="group cursor-default max-w-md">
          <div className="relative w-full aspect-4/5 mb-8 grayscale group-hover:grayscale-0 transition-all duration-700 rounded-3xl overflow-hidden border border-plum/5">
            <Image
              src="/images/team/facultyphoto.jpg"
              alt="Faculty Mentor"
              fill
              unoptimized
              className="object-cover transition-all duration-700 scale-110 group-hover:scale-100"
            />
          </div>
          <div className="space-y-1">
            <h3 className="font-sans text-[11px] tracking-[0.2em] uppercase text-plum/40 group-hover:text-rose transition-colors duration-300 font-bold">Faculty Mentor</h3>
            <p className="text-3xl font-light text-plum italic">Dr. Mukesh Mann</p>
            <p className="text-sm font-sans text-plum/60">Head Of Department</p>
            <p className="text-sm font-sans text-plum/60">Information Technology</p>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </main>
  );
}
