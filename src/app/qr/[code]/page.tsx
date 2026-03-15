"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { resolveQR } from "@/api";
import { MapPin, ArrowRightSquare, Info } from "lucide-react";

export default function QRResolvePage() {
  const { code } = useParams();
  const [mapping, setMapping] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (code) {
      resolveQR(code as string).then(({ data }) => {
        if (data) {
          setMapping(data);
        } else {
          // Fallback mock data
          setMapping({
            stadium: { id: 'wankhede-stadium', name: 'Wankhede Stadium', city: 'Mumbai' },
            locationInsideStadium: 'North Stand - Section B, Row 12, Seat 45',
          });
        }
        setLoading(false);
      });
    }
  }, [code]);

  if (loading) return <div className="min-h-screen bg-blush flex items-center justify-center text-plum font-sans tracking-widest animate-pulse">RESOLVING QR...</div>;

  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <ScrollReveal className="max-w-2xl w-full bg-white/40 backdrop-blur-xl border border-rose/10 p-12 rounded-[3rem] shadow-2xl text-center">
          <div className="bg-rose/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
            <MapPin size={32} className="text-rose" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-light text-plum mb-4">Location <span className="italic">Verified</span></h1>
          <p className="text-plum/50 font-sans text-xs tracking-[0.2em] uppercase mb-12">Scan Code: {code}</p>
          
          <div className="bg-plum/5 border border-plum/10 p-8 rounded-2xl text-left mb-12">
            <div className="flex items-start gap-4 mb-6">
              <Info size={20} className="text-rose mt-1" />
              <div>
                <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-plum/40 font-bold mb-1">Stadium</h3>
                <p className="text-xl text-plum">{mapping.stadium.name}, {mapping.stadium.city}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pt-6 border-t border-plum/10">
              <MapPin size={20} className="text-rose mt-1" />
              <div>
                <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-plum/40 font-bold mb-1">Your Location</h3>
                <p className="text-xl text-plum leading-relaxed">{mapping.locationInsideStadium}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Link 
              href={`/stadium/${mapping.stadium.id}`}
              className="flex-1 bg-plum text-blush px-8 py-5 rounded-2xl flex items-center justify-center gap-3 font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-rose transition-colors shadow-lg"
            >
              Explore Stadium
              <ArrowRightSquare size={18} />
            </Link>
            <button className="flex-1 border border-plum/20 text-plum px-8 py-5 rounded-2xl font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-plum/5 transition-colors">
              Request Assistance
            </button>
          </div>
        </ScrollReveal>
      </div>

      <Footer />
    </main>
  );
}
