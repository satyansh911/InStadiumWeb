import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import SportPageClient from "./SportPageClient";
import { ADDITIONAL_SPORTS_DATA } from "@/lib/sports-data";

export default async function SportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const sport = await prisma.sport.findUnique({
    where: { id },
    include: {
      stadiums: {
        include: {
          sportsPlayed: true
        }
      },
      players: true
    }
  });

  if (!sport) {
    notFound();
  }

  // Merge database data with static rich metadata
  const metadata = ADDITIONAL_SPORTS_DATA[id.toLowerCase()] || {
    id: sport.id,
    name: sport.name,
    description: sport.description,
    longDescription: sport.description,
    history: [],
    rulebook: [],
    tags: []
  };

  // Serialize data for client component
  const serializedSport = JSON.parse(JSON.stringify(sport));
  const serializedMetadata = JSON.parse(JSON.stringify(metadata));

  return (
    <SportPageClient 
      sport={serializedSport} 
      metadata={serializedMetadata} 
    />
  );
}

// Generate static params for faster loading
export async function generateStaticParams() {
  const sports = await prisma.sport.findMany({
    select: { id: true }
  });

  return sports.map((sport) => ({
    id: sport.id,
  }));
}
