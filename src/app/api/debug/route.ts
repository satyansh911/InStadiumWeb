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
			body?.action !== "syncNarendraModiVideoUrls"
		) {
			return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
		}

		const { prisma } = await import("@/lib/prisma");
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
