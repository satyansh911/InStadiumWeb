import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  // Update Wankhede
  await prisma.stadium.update({
    where: { id: "wankhede" },
    data: {
      historyTimeline: [
        { 
          year: 1974, 
          title: "The Birth of a Sanctuary",
          event: "Wankhede Stadium was constructed in a record 6 months, replacing the Brabourne Stadium as the primary venue.",
          type: "milestone"
        },
        { 
          year: 1987, 
          title: "World Cup Semi-Final",
          event: "Hosted the high-voltage semi-final between India and England.",
          type: "match"
        },
        { 
          year: 2011, 
          title: "World Cup Glory",
          event: "The iconic MS Dhoni finish. India lifted the World Cup after 28 years on home soil.",
          videoUrl: "https://www.youtube.com/watch?v=N4y2Wk5C3-E",
          thumbnail: "https://img.youtube.com/vi/N4y2Wk5C3-E/maxresdefault.jpg",
          type: "match"
        },
        { 
          year: 2013, 
          title: "Sachin's Farewell",
          event: "The Master Blaster, Sachin Tendulkar, played his final international innings, leaving a nation in tears.",
          videoUrl: "https://www.youtube.com/watch?v=28eSrkY6f2A",
          thumbnail: "https://img.youtube.com/vi/28eSrkY6f2A/maxresdefault.jpg",
          type: "milestone"
        },
        {
          year: 2023,
          title: "Kohli's 50th Century",
          event: "Virat Kohli broke Sachin's record for most ODI centuries during the World Cup semi-final.",
          videoUrl: "https://www.youtube.com/watch?v=M7WzVv8x8XU",
          type: "match"
        }
      ]
    }
  });

  // Update Narendra Modi
  await prisma.stadium.update({
    where: { id: "narendra-modi" },
    data: {
      historyTimeline: [
        { 
          year: 2020, 
          title: "Inauguration",
          event: "The massive reconstruction was completed, making it the largest cricket stadium in the world.",
          type: "milestone"
        },
        { 
          year: 2022, 
          title: "IPL Grand Finale",
          event: "Hosted its first IPL Final with a record crowd of over 100,000 people.",
          videoUrl: "https://www.youtube.com/watch?v=Xh0p9-Y0I4U",
          type: "match"
        },
        { 
          year: 2023, 
          title: "World Cup Final",
          event: "The grand finale of the ICC Men's Cricket World Cup 2023 between India and Australia.",
          videoUrl: "https://www.youtube.com/watch?v=o0vVp_O0V28",
          type: "match"
        }
      ]
    }
  });

  // Update Salt Lake
  await prisma.stadium.update({
    where: { id: "salt-lake" },
    data: {
      historyTimeline: [
        { 
          year: 1984, 
          title: "The Opening",
          event: "The stadium was inaugurated, providing India with a world-class multi-sport venue.",
          type: "milestone"
        },
        { 
          year: 2011, 
          title: "Lionel Messi in Kolkata",
          event: "The legendary Lionel Messi led Argentina against Venezuela in a historic friendly match.",
          videoUrl: "https://www.youtube.com/watch?v=X_pDkUe2Ams",
          type: "match"
        },
        { 
          year: 2017, 
          title: "FIFA U-17 World Cup Final",
          event: "Hosted the final between England and Spain, setting attendance records for a youth tournament.",
          videoUrl: "https://www.youtube.com/watch?v=KzYIdcskv0M",
          type: "match"
        }
      ]
    }
  });

  const stadiums = await prisma.stadium.findMany({
    select: {
      id: true,
      name: true,
      historyTimeline: true
    }
  });
  return NextResponse.json({ success: true, stadiums });
}
