import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
export const dynamic = 'force-dynamic';

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlayerHero from "@/components/player/PlayerHero";
import PlayerStory from "@/components/player/PlayerStory";
import PlayerTimeline from "@/components/player/PlayerTimeline";
import PlayerStadiums from "@/components/player/PlayerStadiums";
import ScrollReveal from "@/components/ScrollReveal";

async function getPlayer(id: string) {
  // Use raw query to bypass potential Prisma client caching/mapping issues
  const players = await prisma.$queryRaw`SELECT * FROM "Player" WHERE id = ${id}`;
  const playerBase = (players as any[])[0];
  
  if (!playerBase) return null;

  // Still need the relations
  const playerWithRelations = await prisma.player.findUnique({
    where: { id },
    include: {
      Sport: true,
      PlayerToStadium: {
        include: {
          Stadium: true
        }
      },
    },
  });

  const fullPlayer = {
    ...playerWithRelations,
    ...playerBase,
    sport: (playerWithRelations as any)?.Sport || { name: "Sport" },
    name: playerBase?.name || (playerWithRelations as any)?.name || "Legendary Player",
    bio: playerBase?.bio || (playerWithRelations as any)?.bio || "",
  };

  return fullPlayer;
}

export default async function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const player = await getPlayer(id);

  if (!player) {
    notFound();
  }

  // Map the join-table relations to the stadium objects
  const stadiums = (player.PlayerToStadium || []).map((pts: any) => ({
    id: pts.Stadium?.id,
    name: pts.Stadium?.name,
    city: pts.Stadium?.city,
    image: (pts.Stadium?.galleryImages as any)?.[0]?.url || '/images/stadium.jpg'
  })).filter((s: any) => s.id);

  return (
    <main className="min-h-screen bg-blush selection:bg-rose selection:text-blush">
      <Navbar />

      {/* Main Content */}
      <PlayerHero player={player as any} />
      
      <PlayerStory bio={player.bio} />
      
      <PlayerTimeline timeline={player.careerTimeline as any} />

      {stadiums.length > 0 && (
        <PlayerStadiums stadiums={stadiums} playerName={player.name} />
      )}

      {/* Achievements Section (Simple Layout) */}
      <section className="py-32 bg-plum text-blush">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="mb-20">
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose font-bold mb-4 block">Hall of Fame</span>
            <h2 className="text-4xl md:text-6xl font-light">Honors & <span className="italic text-rose">Awards</span></h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(player.achievements as string[] || []).map((achievement, i) => (
              <ScrollReveal key={i} delay={((i % 4) + 1) as any}>
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-rose/20 flex items-center justify-center mb-6">
                    <span className="text-rose font-sans text-xs font-bold">{i + 1}</span>
                  </div>
                  <p className="font-sans text-xs tracking-widest uppercase leading-loose text-blush/80">
                    {achievement}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


      <Footer />
    </main>
  );
}
