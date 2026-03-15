import { prisma } from "@/lib/prisma";
import SportsClient from "./SportsClient";

export default async function SportsPage() {
  const sports = await prisma.sport.findMany();
  const stadiums = await prisma.stadium.findMany({
    include: {
      sportsPlayed: true,
    },
  });

  // Convert Prisma data to plain JS objects for the client components
  const serializedSports = JSON.parse(JSON.stringify(sports));
  const serializedStadiums = JSON.parse(JSON.stringify(stadiums));

  return <SportsClient initialSports={serializedSports} initialStadiums={serializedStadiums} />;
}
