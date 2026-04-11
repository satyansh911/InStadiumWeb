import { prisma } from "@/lib/prisma";
export const dynamic = 'force-dynamic';

import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StadiumHero from "@/components/stadium/StadiumHero";
import GallerySection from "@/components/stadium/GallerySection";
import TimelineSection from "@/components/stadium/TimelineSection";
import MatchesSection from "@/components/stadium/MatchesSection";
import PlayersSection from "@/components/stadium/PlayersSection";
import NearbyStadiums from "@/components/stadium/NearbyStadiums";
import ChatbotWidget from "@/components/stadium/ChatbotWidget";
import StadiumMapWrapper from "@/components/stadium/StadiumMapWrapper";


export default async function StadiumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const fallbackById: Record<string, Partial<any>> = {
    'dy-patil-stadium': {
      name: 'DY Patil Stadium',
      city: 'Navi Mumbai',
      state: 'Maharashtra',
      capacity: 55000,
      builtYear: 2008,
      description: 'A modern multi-purpose arena in Navi Mumbai known for hosting marquee cricket and football events.',
      heroImage: '/images/stadiums/other/dypatilstadium.jpg',
      gallery: ['/images/stadiums/other/dypatilstadium.jpg'],
      sports: ['Cricket', 'Football'],
    },
  };

  let stadiumData: any = null;
  try {
    stadiumData = await prisma.stadium.findUnique({
      where: { id },
      include: {
        SportToStadium: {
          include: {
            Sport: true
          }
        },
        PlayerToStadium: {
          include: {
            Player: true
          }
        },
      },
    });
  } catch (error) {
    console.error("Failed to load stadium from database:", error);
  }

  // Map Prisma Json fields to component props with fallbacks
  const stadium = stadiumData ? {
    ...stadiumData,
    gallery: Array.isArray(stadiumData.galleryImages) 
      ? (stadiumData.galleryImages as any[]).map(img => img.url || img) 
      : [],
    timeline: Array.isArray(stadiumData.historyTimeline) 
      ? (stadiumData.historyTimeline as any[]) 
      : [],
    matches: Array.isArray(stadiumData.upcomingMatches) 
      ? (stadiumData.upcomingMatches as any[]) 
      : [],
    sports: Array.isArray(stadiumData.SportToStadium) 
      ? (stadiumData.SportToStadium as any[]).map(ss => ss.Sport.name) 
      : [],
    players: Array.isArray(stadiumData.PlayerToStadium)
      ? (stadiumData.PlayerToStadium as any[]).map(ps => ps.Player)
      : [],
    heroImage: (Array.isArray(stadiumData.galleryImages) && stadiumData.galleryImages.length > 0)
      ? (stadiumData.galleryImages as any[])[0].url || (stadiumData.galleryImages as any[])[0]
      : "https://images.unsplash.com/photo-1540744158800-4785387f481c?q=80",
  } : {
    id: id,
    name: fallbackById[id]?.name || id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    city: fallbackById[id]?.city || 'Mumbai',
    state: fallbackById[id]?.state || 'Maharashtra',
    capacity: fallbackById[id]?.capacity || 33000,
    builtYear: fallbackById[id]?.builtYear || 1974,
    description: fallbackById[id]?.description || 'An international sporting sanctuary, home to legendary encounters and atmospheric brilliance.',
    heroImage: fallbackById[id]?.heroImage || '/images/stadiums/wankhedestadium.jpg',
    gallery: fallbackById[id]?.gallery || [
      '/images/stadiums/wankhedestadium.jpg',
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80',
      'https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80',
    ],
    timeline: [
      { year: '1974', event: 'Stadium Constructed' },
      { year: '2011', event: 'Hosted World Championship Finals' },
      { year: '2023', event: 'Modernization Program Completed' },
    ],
    sports: fallbackById[id]?.sports || ['Cricket', 'Football'],
    tournaments: ['Premier League', 'International Series'],
    matches: [
      { teams: 'Mumbai vs Bengaluru', date: '2026-04-12', tournament: 'Premier League' },
      { teams: 'India vs Australia', date: '2026-11-05', tournament: 'ODI Series' },
    ],
    players: [
      { name: 'Legendary Hero', role: 'Hall of Fame', image: 'https://images.unsplash.com/photo-1540744158800-4785387f481c?q=80' },
      { name: 'Emerging Talent', role: 'Active Captain', image: 'https://images.unsplash.com/photo-1540744158800-4785387f481c?q=80' },
    ]
  };

  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush">
      <Navbar />
      
      <StadiumHero stadium={stadium} />
      
      <GallerySection images={stadium.gallery} />
      
      <TimelineSection timeline={stadium.timeline} />
      
      <MatchesSection matches={stadium.matches} />
      
      <PlayersSection players={stadium.players} />

      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose font-bold block mb-4">Location</span>
          <h2 className="text-4xl md:text-6xl font-light text-plum leading-tight">Find your path to the <span className="italic">Arena</span></h2>
        </div>
        <StadiumMapWrapper
          lat={(stadium as any).latitude || 18.9389}
          lng={(stadium as any).longitude || 72.8258}
          stadiumName={stadium.name}
        />
      </section>

      <NearbyStadiums />

      <Footer />
      
      <ChatbotWidget stadiumName={stadium.name} />
    </main>
  );
}
