import { NextResponse } from "next/server";
export async function GET() { return NextResponse.json({ success: true }); }

export async function POST(request: Request) {
	if (process.env.NODE_ENV === "production") {
		return NextResponse.json({ error: "Not available in production" }, { status: 403 });
	}

	try {
		const body = await request.json().catch(() => ({}));

		if (
			body?.action !== "syncSaltLakeVideoUrls" &&
			body?.action !== "syncNarendraModiVideoUrls" &&
			body?.action !== "syncAdditionalStadiumDetails"
		) {
			return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
		}

		const { prisma } = await import("@/lib/prisma");

		if (body?.action === "syncAdditionalStadiumDetails") {
			const updates = [
				{
					id: "kalinga",
					data: {
						description: "A world-class hockey venue in Bhubaneswar that helped define India's modern hockey resurgence.",
						latitude: 20.2961,
						longitude: 85.8245,
						historyTimeline: [
							{ year: 1978, title: "Foundation Era", event: "Kalinga Stadium began as a multi-sport venue and later evolved into India's hockey capital.", thumbnail: "/images/stadiums/kalingastadium.jpg", type: "milestone" },
							{ year: 2018, title: "Hockey World Cup Host", event: "Hosted the Men's Hockey World Cup and delivered a world-class fan atmosphere.", thumbnail: "/images/stadiums/kalingastadium.jpg", type: "match" },
							{ year: 2023, title: "World Cup Returns", event: "Again hosted major Hockey World Cup fixtures, strengthening its status as a global hockey venue.", thumbnail: "/images/stadiums/kalingastadium.jpg", type: "match" }
						],
						tournaments: [
							{ name: "Men's Hockey World Cup", year: 2018, winner: "Belgium" },
							{ name: "Men's Hockey World Cup", year: 2023, winner: "Germany" }
						],
						upcomingMatches: [
							{ teams: "India vs Australia", date: "2026-06-14", tournament: "FIH Pro League" },
							{ teams: "Odisha Warriors vs Bengaluru Blades", date: "2026-09-02", tournament: "Hockey India League" }
						]
					}
				},
				{
					id: "prakash-padukone",
					data: {
						description: "A premier high-performance badminton academy that has produced and hosted elite Indian badminton talent.",
						latitude: 13.0086,
						longitude: 77.5931,
						historyTimeline: [
							{ year: 1994, title: "Academy Established", event: "Prakash Padukone Badminton Academy was founded to build India's next generation of champions.", thumbnail: "/images/stadiums/prakashpadukonebadmintonacademy.jpg", type: "milestone" },
							{ year: 2010, title: "National Elite Hub", event: "Became a major training base for top shuttlers competing at global events.", thumbnail: "/images/stadiums/prakashpadukonebadmintonacademy.jpg", type: "milestone" },
							{ year: 2022, title: "Premier Domestic Events", event: "Hosted high-intensity national circuit matches featuring rising Indian stars.", thumbnail: "/images/stadiums/prakashpadukonebadmintonacademy.jpg", type: "match" }
						],
						tournaments: [
							{ name: "Senior National Ranking Series", year: 2022, winner: "Multiple Champions" },
							{ name: "Junior National Camp Showcase", year: 2024, winner: "Academy Prospects" }
						],
						upcomingMatches: [
							{ teams: "Karnataka Smashers vs Hyderabad Racquets", date: "2026-07-08", tournament: "Indian Badminton League" },
							{ teams: "Elite Training Exhibition", date: "2026-08-19", tournament: "PPBA Invitational" }
						]
					}
				},
				{
					id: "rk-khanna",
					data: {
						description: "India's premier tennis venue in New Delhi, known for Davis Cup ties and major ATP/WTA-level competition windows.",
						latitude: 28.5919,
						longitude: 77.2243,
						historyTimeline: [
							{ year: 1982, title: "National Tennis Landmark", event: "R.K. Khanna Tennis Stadium emerged as a flagship destination for Indian tennis.", thumbnail: "/images/stadiums/rkkhannastadium.jpg", type: "milestone" },
							{ year: 2010, title: "Commonwealth Spotlight", event: "Hosted high-profile tennis events during India's global sporting calendar.", thumbnail: "/images/stadiums/rkkhannastadium.jpg", type: "match" },
							{ year: 2023, title: "Davis Cup Nights", event: "Welcomed packed crowds for national-team tennis ties in a high-pressure atmosphere.", thumbnail: "/images/stadiums/rkkhannastadium.jpg", type: "match" }
						],
						tournaments: [
							{ name: "Davis Cup", year: 2023, winner: "International Tie Rotation" },
							{ name: "Delhi Open", year: 2024, winner: "Tour Champion" }
						],
						upcomingMatches: [
							{ teams: "India vs Japan", date: "2026-09-12", tournament: "Davis Cup" },
							{ teams: "Delhi Aces vs Mumbai Baseliners", date: "2026-10-03", tournament: "Indian Tennis League" }
						]
					}
				}
			];

			for (const update of updates) {
				await prisma.stadium.update({ where: { id: update.id }, data: update.data as any });
			}

			return NextResponse.json({ success: true, updatedStadiums: updates.map((x) => x.id) });
		}

		const targetStadiumId = body?.action === "syncNarendraModiVideoUrls" ? "narendra-modi" : "salt-lake";
		const stadium = await prisma.stadium.findUnique({
			where: { id: targetStadiumId },
			select: { historyTimeline: true },
		});

		if (!stadium) {
			return NextResponse.json({ error: `${targetStadiumId} not found` }, { status: 404 });
		}

		const timeline = Array.isArray(stadium.historyTimeline)
			? (stadium.historyTimeline as any[])
			: [];

		const updatedTimeline = timeline.map((item) => {
			if (body?.action === "syncSaltLakeVideoUrls" && item?.title === "Lionel Messi in Kolkata") {
				return {
					...item,
					videoUrl: "https://www.youtube.com/watch?v=QzuTXIRUcbw",
					thumbnail: "https://img.youtube.com/vi/QzuTXIRUcbw/hqdefault.jpg",
				};
			}
			if (body?.action === "syncSaltLakeVideoUrls" && item?.title === "FIFA U-17 World Cup Final") {
				return {
					...item,
					videoUrl: "https://www.youtube.com/watch?v=sRxsW91x0Rg",
					thumbnail: "https://img.youtube.com/vi/sRxsW91x0Rg/hqdefault.jpg",
				};
			}
			if (body?.action === "syncNarendraModiVideoUrls" && item?.title === "IPL Grand Finale") {
				return { ...item, videoUrl: "https://www.youtube.com/watch?v=VEcmXpIEN2Y" };
			}
			if (body?.action === "syncNarendraModiVideoUrls" && item?.title === "World Cup Final") {
				return { ...item, videoUrl: "https://www.youtube.com/shorts/OBEgDfJXP24" };
			}
			return item;
		});

		await prisma.stadium.update({
			where: { id: targetStadiumId },
			data: { historyTimeline: updatedTimeline as any },
		});

		return NextResponse.json({ success: true, updatedCount: updatedTimeline.length });
	} catch (error) {
		console.error("Debug sync failed:", error);
		return NextResponse.json({ error: "Failed to sync data" }, { status: 500 });
	}
}
