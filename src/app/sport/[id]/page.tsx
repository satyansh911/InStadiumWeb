import { prisma } from "@/lib/prisma";
export const dynamic = 'force-dynamic';

import { notFound } from "next/navigation";
import SportPageClient from "./SportPageClient";
import { ADDITIONAL_SPORTS_DATA } from "@/lib/sports-data";

export default async function SportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const sport = await prisma.sport.findUnique({
    where: { id },
    include: {
      SportToStadium: {
        include: {
          Stadium: {
            include: {
              SportToStadium: {
                include: {
                  Sport: true
                }
              }
            }
          }
        }
      },
      Player: true
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

  // Map Prisma relation data for client component
  const mappingStadiums = (sport.SportToStadium || []).map((ss: any) => {
    const s = ss.Stadium;
    return {
      ...s,
      sports: (s.SportToStadium || []).map((inner: any) => inner.Sport.name)
    };
  });

  const serializedSport = {
    ...JSON.parse(JSON.stringify(sport)),
    stadiums: mappingStadiums,
    players: sport.Player || []
  };
  const serializedMetadata = JSON.parse(JSON.stringify(metadata));

  return (
    <SportPageClient 
      sport={serializedSport} 
      metadata={serializedMetadata} 
    />
  );
}

