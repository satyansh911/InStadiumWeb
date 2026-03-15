import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { Lock, FileText, Image as ImageIcon, MessageSquare, ExternalLink } from "lucide-react";

export default function ClientPortal() {
  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush">
      <div className="bg-rose h-24 w-full fixed top-0 z-40"></div>
      <Navbar />

      <section className="pt-48 pb-32 px-6 max-w-7xl mx-auto">
        <ScrollReveal className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24 border-b border-rose/20 pb-12">
           <div className="max-w-2xl">
             <div className="flex items-center gap-3 mb-6">
                <span className="bg-rose/10 text-rose px-3 py-1 font-sans text-[10px] tracking-[0.2em] uppercase">Private Portal</span>
                <span className="text-plum/30 flex items-center gap-1 font-sans text-[10px] tracking-[0.1em] uppercase"><Lock size={10} /> Secure</span>
             </div>
             <h1 className="text-5xl md:text-7xl font-light text-plum">
               Sophie &amp; <span className="italic">James</span>
             </h1>
             <p className="font-sans text-xs tracking-[0.2em] uppercase text-plum/60 mt-6">June 15, 2026 &mdash; Château de Villette, France</p>
           </div>
           
           <div className="flex gap-4">
              <button className="bg-rose text-blush px-8 py-4 font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-plum transition-all duration-300">View Timeline</button>
           </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Workspace */}
          <div className="lg:col-span-8 space-y-16">
             {/* Planning Status */}
             <ScrollReveal className="bg-white p-12 border border-rose/5 shadow-xl shadow-rose/5">
                <h2 className="text-2xl font-serif text-plum mb-8">Planning Progress</h2>
                <div className="space-y-8">
                   <div className="space-y-3">
                      <div className="flex justify-between font-sans text-[10px] tracking-[0.15em] uppercase text-plum/60">
                         <span>Design &amp; Concept</span>
                         <span>85%</span>
                      </div>
                      <div className="h-1 w-full bg-rose/10">
                         <div className="h-full bg-rose w-[85%] transition-all duration-1000 delay-500" />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <div className="flex justify-between font-sans text-[10px] tracking-[0.15em] uppercase text-plum/60">
                         <span>Vendor Selection</span>
                         <span>60%</span>
                      </div>
                      <div className="h-1 w-full bg-rose/10">
                         <div className="h-full bg-rose w-[60%] transition-all duration-1000 delay-700" />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <div className="flex justify-between font-sans text-[10px] tracking-[0.15em] uppercase text-plum/60">
                         <span>Logistics &amp; Travel</span>
                         <span>40%</span>
                      </div>
                      <div className="h-1 w-full bg-rose/10">
                         <div className="h-full bg-rose w-[40%] transition-all duration-1000 delay-900" />
                      </div>
                   </div>
                </div>
             </ScrollReveal>

             {/* Deliverables Section */}
             <section>
                <h3 className="text-2xl font-serif text-plum mb-12 border-b border-rose/10 pb-4">Recent Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {[
                     { name: "Catering Proposal v3", type: "PDF", size: "2.4MB" },
                     { name: "Lighting Design Layout", type: "Blueprint", size: "15MB" },
                     { name: "Budget Overview - April", type: "Sheet", size: "0.5MB" },
                     { name: "Floral Palette Selection", type: "Deck", size: "18MB" }
                   ].map((doc, idx) => (
                      <ScrollReveal key={idx} delay={(idx % 2 + 1) as 1|2} className="flex items-center gap-6 p-6 bg-rose/[0.02] border border-rose/10 hover:border-rose/30 transition-all cursor-pointer group">
                         <div className="w-12 h-12 bg-rose/10 flex items-center justify-center text-rose group-hover:bg-rose group-hover:text-blush transition-colors">
                            <FileText size={20} />
                         </div>
                         <div>
                            <p className="font-serif text-lg text-plum underline decoration-rose/30 group-hover:decoration-rose">{doc.name}</p>
                            <p className="font-sans text-[10px] tracking-[0.1em] uppercase text-plum/40 mt-1">{doc.type} &mdash; {doc.size}</p>
                         </div>
                      </ScrollReveal>
                   ))}
                </div>
             </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            <ScrollReveal direction="right" className="bg-plum p-10 text-blush">
               <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase opacity-50 mb-8">Concept Deck</h3>
               <div className="relative aspect-square w-full mb-8 bg-white/10 group cursor-pointer overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80"
                    alt="Concept Cover"
                    fill
                    className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-plum/40 opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="font-sans text-[10px] tracking-[0.3em] uppercase border border-blush px-4 py-2">Open Gallery</span>
                  </div>
               </div>
               <button className="w-full border border-blush/20 py-4 font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-blush hover:text-plum transition-all">Download Brand Guidelines</button>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={2} className="p-10 border border-plum/10">
               <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase text-plum/50 mb-8">Your Team</h3>
               <div className="space-y-8">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all border border-rose/20">
                        <img src="https://images.unsplash.com/photo-1544005313-94ff9c7c443e?q=80&w=150" alt="Lead" />
                     </div>
                     <div>
                        <p className="font-serif text-plum italic underline decoration-rose/30">Julianne Ross</p>
                        <p className="font-sans text-[9px] tracking-[0.1em] uppercase text-plum/40">Lead Strategist</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all border border-rose/20">
                        <img src="https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?q=80&w=150" alt="Design" />
                     </div>
                     <div>
                        <p className="font-serif text-plum italic underline decoration-rose/30">Marcus Vane</p>
                        <p className="font-sans text-[9px] tracking-[0.1em] uppercase text-plum/40">Art Director</p>
                     </div>
                  </div>
               </div>
               <button className="mt-12 flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 hover:text-rose transition-colors">
                  <MessageSquare size={14} /> Send a Message
               </button>
            </ScrollReveal>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
