import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// --- Types from Mobile Backend ---
type ChatAction = 'answer_only' | 'show_links' | 'ask_clarification';
type EntityType = 'player' | 'stadium' | 'sport' | 'external';

type ChatLink = {
  id: string;
  entityType: EntityType;
  label: string;
  subtitle?: string;
  route: string;
  score: number;
};

type ChatResponse = {
  reply: string;
  action: ChatAction;
  links: ChatLink[];
  clarifications: string[];
  structured: Array<{ title: string; items: string[] }>;
};

type SarvamExtraction = {
  intent: 'player_info' | 'stadium_info' | 'sport_info' | 'general_query' | 'navigation';
  entityType: EntityType | null;
  entityName: string | null;
  entityNameEnglish: string | null;
  isDomainRelevant: boolean;
  answerLanguage: 'en' | 'hi';
};

type SearchCandidate = {
  id: string;
  name: string;
  entityType: EntityType;
  subtitle?: string;
  locationMatch?: boolean;
};

// --- Constants ---
const MIN_CANDIDATE_SCORE = 0.4;

// --- Utilities ---
function normalizeText(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function containsDevanagari(value: string): boolean {
  return /[\u0900-\u097F]/.test(value);
}

function scoreCandidate(query: string, candidateName: string): number {
  const q = normalizeText(query);
  const c = normalizeText(candidateName);
  if (!q || !c) return 0;
  if (q === c) return 1;
  if (c.startsWith(q) || q.startsWith(c)) return 0.9;
  if (c.includes(q) || q.includes(c)) return 0.8;
  return 0.4;
}

function buildRoute(entityType: EntityType, id: string): string {
  if (entityType === 'player') return `/player/${id}`;
  if (entityType === 'stadium') return `/stadium/${id}`;
  return `/sport/${id}`;
}

function buildWikipediaLink(entityName: string, language: 'en' | 'hi'): ChatLink | null {
  const slug = entityName.trim().replace(/\s+/g, '_');
  if (!slug) return null;
  const langCode = language === 'hi' ? 'hi' : 'en';
  return {
    id: `wiki:${slug.toLowerCase()}`,
    entityType: 'external',
    label: `${entityName} (Wikipedia)`,
    subtitle: 'Open external reference',
    route: `https://${langCode}.wikipedia.org/wiki/${encodeURIComponent(slug)}`,
    score: 0.78,
  };
}

// --- Sarvam API Calls ---
async function callSarvamExtraction(query: string): Promise<SarvamExtraction | null> {
  const apiKey = process.env.SARVAM_API_KEY;
  if (!apiKey) return null;

  const prompt = [
    'You are an intent and entity extractor for InStadium, a friendly sports companion app.',
    'Return only strict JSON: {"intent": "player_info"|"stadium_info"|"sport_info"|"general_query"|"navigation", "entityType": "player"|"stadium"|"sport"|null, "entityName": string|null, "entityNameEnglish": string|null, "isDomainRelevant": boolean, "answerLanguage": "en"|"hi"}',
    `User query: ${query}`
  ].join('\n');

  try {
    const response = await fetch(process.env.SARVAM_CHAT_URL!, {
      method: 'POST',
      headers: { 'api-subscription-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.SARVAM_MODEL,
        temperature: 0.1,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) return null;
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    const startIdx = content.indexOf('{');
    const endIdx = content.lastIndexOf('}');
    
    if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
      const jsonStr = content.substring(startIdx, endIdx + 1);
      const parsed = JSON.parse(jsonStr);
      // Clean extracted names just in case they contain reasoning tags
      if (parsed.entityName) parsed.entityName = parsed.entityName.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
      if (parsed.entityNameEnglish) parsed.entityNameEnglish = parsed.entityNameEnglish.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

async function callSarvamContextAnswer(query: string, language: 'en' | 'hi', context: string): Promise<string | null> {
  const apiKey = process.env.SARVAM_API_KEY;
  if (!apiKey) return null;

  const instruction = `You are InStadium AI. Reply in ${language === 'hi' ? 'Hindi' : 'English'}. Concise 2-4 sentences. Context: ${context}. User: ${query}`;

  try {
    const response = await fetch(process.env.SARVAM_CHAT_URL!, {
      method: 'POST',
      headers: { 'api-subscription-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.SARVAM_MODEL,
        temperature: 0.3,
        messages: [{ role: 'user', content: instruction }]
      })
    });

    if (!response.ok) return null;
    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content?.trim() || "";
    
    // Clean reply: Remove <think>...</think> or unclosed <think> blocks
    const reply = rawContent
      .replace(/<think>[\s\S]*?<\/think>/gi, '') // Remove closed blocks
      .replace(/<think>[\s\S]*$/gi, '')           // Remove unclosed blocks at the end
      .trim();
      
    return reply || null;
  } catch {
    return null;
  }
}

// --- DB Handlers ---
async function searchEntities(term: string, type: EntityType | null): Promise<SearchCandidate[]> {
  const candidates: SearchCandidate[] = [];

  if (!type || type === 'player') {
    const players = await prisma.player.findMany({
      where: { name: { contains: term, mode: 'insensitive' } },
      include: { Sport: true },
      take: 3
    });
    candidates.push(...players.map(p => ({ id: p.id, name: p.name, entityType: 'player' as const, subtitle: p.Sport.name })));
  }

  if (!type || type === 'stadium') {
    const stadiums = await prisma.stadium.findMany({
      where: {
        OR: [
          { name: { contains: term, mode: 'insensitive' } },
          { city: { contains: term, mode: 'insensitive' } },
          { state: { contains: term, mode: 'insensitive' } },
          { country: { contains: term, mode: 'insensitive' } }
        ]
      },
      take: 4
    });
    candidates.push(...stadiums.map(s => ({ 
      id: s.id, 
      name: s.name, 
      entityType: 'stadium' as const, 
      subtitle: `${s.city}, ${s.state}`,
      locationMatch: s.city.toLowerCase().includes(term.toLowerCase()) || s.state.toLowerCase().includes(term.toLowerCase())
    })));
  }

  if (!type || type === 'sport') {
    const sports = await prisma.sport.findMany({
      where: { name: { contains: term, mode: 'insensitive' } },
      take: 3
    });
    candidates.push(...sports.map(s => ({ id: s.id, name: s.name, entityType: 'sport' as const, subtitle: 'Sport profile' })));
  }

  return candidates;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = (body.message as string || "").trim();
    const location = body.location as { lat: number; lng: number } | undefined;
    
    if (!query) return NextResponse.json({ error: "Empty query" }, { status: 400 });

    const answerLanguage = containsDevanagari(query) ? 'hi' : 'en';

    // --- Special Button Handlers ---
    
    // 1. Top Players
    if (query.toLowerCase().includes("top players")) {
      const players = await prisma.player.findMany({
        include: { Sport: true },
        take: 10
      });
      
      const links = players.map(p => ({
        id: p.id,
        entityType: 'player' as const,
        label: p.name,
        subtitle: p.Sport.name,
        route: `/player/${p.id}`,
        score: 1.0
      }));

      return NextResponse.json({
        reply: answerLanguage === 'hi' 
          ? "InStadium par hamare top players ye rahe sport wise cards ke roop mein." 
          : "Check out the top players on InStadium across different sports below.",
        action: 'show_links',
        links,
        clarifications: [],
        structured: [{ title: 'Players', items: links.map(l => l.label) }]
      });
    }

    // 2. Nearby Stadiums
    if (query.toLowerCase().includes("nearby stadiums")) {
      const stadiums = await prisma.stadium.findMany();
      
      let sortedStadiums = stadiums;
      if (location) {
        sortedStadiums = stadiums
          .filter(s => s.latitude !== null && s.longitude !== null)
          .map(s => {
            const dist = Math.sqrt(
              Math.pow((s.latitude as number) - location.lat, 2) + 
              Math.pow((s.longitude as number) - location.lng, 2)
            );
            return { ...s, dist };
          })
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 5);
      } else {
        sortedStadiums = stadiums.slice(0, 5);
      }

      const links = sortedStadiums.map(s => ({
        id: s.id,
        entityType: 'stadium' as const,
        label: s.name,
        subtitle: `${s.city}, ${s.state}`,
        route: `/stadium/${s.id}`,
        score: 1.0
      }));

      return NextResponse.json({
        reply: location 
          ? (answerLanguage === 'hi' ? "Aapke paas ke stadiums ye rahe." : "Here are the stadiums nearest to your current location.")
          : (answerLanguage === 'hi' ? "Kripya location access dein, filhal ye kuch stadiums hain." : "Please grant location access for exact results. Here are some popular stadiums:"),
        action: 'show_links',
        links,
        clarifications: [],
        structured: [{ title: 'Stadiums', items: links.map(l => l.label) }]
      });
    }

    // 3. IPL Schedule
    if (query.toLowerCase().includes("ipl schedule")) {
      const stadiums = await prisma.stadium.findMany({
        select: { name: true, id: true, upcomingMatches: true }
      });

      const today = new Date("2026-04-12"); // Fixed date as per user context
      const allMatches: any[] = [];

      stadiums.forEach(s => {
        const matches = s.upcomingMatches as any[];
        if (matches && Array.isArray(matches)) {
          matches.forEach(m => {
            if (m.date && m.tournament?.includes("IPL") && m.date >= "2026-04-12") {
              allMatches.push({
                teams: m.teams,
                date: m.date,
                stadium: s.name,
                stadiumId: s.id
              });
            }
          });
        }
      });

      const nextMatches = allMatches
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 3);

      const links = nextMatches.map((m, idx) => ({
        id: `match-${idx}`,
        entityType: 'stadium' as const,
        label: `${m.teams}`,
        subtitle: `${m.date} @ ${m.stadium}`,
        route: `/stadium/${m.stadiumId}`,
        score: 1.0
      }));

      return NextResponse.json({
        reply: answerLanguage === 'hi'
          ? "IPL 2026 ke agle 3 matches ka schedule ye raha."
          : "Here is the schedule for the next 3 IPL 2026 matches.",
        action: 'show_links',
        links,
        clarifications: [],
        structured: [{ title: 'Schedule', items: links.map(l => `${l.label} (${l.subtitle})`) }]
      });
    }

    // 4. Stadium Guides
    if (query.toLowerCase().includes("stadium guides")) {
      const stadiums = await prisma.stadium.findMany({ take: 10 });
      const links = stadiums.map(s => ({
        id: s.id,
        entityType: 'stadium' as const,
        label: s.name,
        subtitle: `Guide for ${s.name}`,
        route: `/stadium/${s.id}`,
        score: 1.0
      }));

      return NextResponse.json({
        reply: answerLanguage === 'hi'
          ? "InStadium par uplabdh stadium guides ye rahi."
          : "Find the detailed stadium guides for these venues on InStadium.",
        action: 'show_links',
        links,
        clarifications: [],
        structured: [{ title: 'Guides', items: links.map(l => l.label) }]
      });
    }

    // --- Default Search Logic ---
    // 1. Extraction
    const extracted = await callSarvamExtraction(query);
    let searchTerm = extracted?.entityNameEnglish || extracted?.entityName || query;
    
    // Cleanup search term
    searchTerm = searchTerm
      .replace(/stadiums? in /gi, '')
      .replace(/info about /gi, '')
      .replace(/details on /gi, '')
      .replace(/where is /gi, '')
      .trim();

    // 2. Search
    const rawCandidates = await searchEntities(searchTerm, extracted?.entityType || null);
    const rankedLinks: ChatLink[] = (rawCandidates as any[])
      .map(c => {
        let score = scoreCandidate(query, c.name);
        
        const locationStr = (c.subtitle || "").toLowerCase();
        const queryLower = query.toLowerCase();
        const termLower = searchTerm.toLowerCase();
        
        // High-confidence location boost
        if (c.locationMatch || 
            (termLower.length > 2 && locationStr.includes(termLower)) ||
            (queryLower.includes('delhi') && locationStr.includes('delhi'))) {
          score = Math.max(score, 0.95);
        }
        
        return {
          id: c.id,
          entityType: c.entityType,
          label: c.name,
          subtitle: c.subtitle || undefined,
          score: score,
          route: buildRoute(c.entityType, c.id)
        };
      })
      .filter(l => l.score >= MIN_CANDIDATE_SCORE)
      .sort((a, b) => b.score - a.score);

    // 3. Contextual Answer
    const context = rankedLinks.length > 0 
      ? `Found relevant pages: ${rankedLinks.slice(0, 2).map(l => l.label).join(', ')}` 
      : "No direct app pages found.";
    
    const reply = await callSarvamContextAnswer(query, answerLanguage, context);
    
    const links = [...rankedLinks.slice(0, 3)];
    const wikiLink = buildWikipediaLink(searchTerm, answerLanguage);
    if (wikiLink) links.push(wikiLink);

    const response: ChatResponse = {
      reply: reply || (answerLanguage === 'hi' ? 'Main aapki madad kar sakta hoon. Kripya dhyan dein.' : 'I can help you with that. Please take a look.'),
      action: links.length > 0 ? 'show_links' : 'answer_only',
      links,
      clarifications: [],
      structured: [
        {
          title: answerLanguage === 'hi' ? 'Relative Jaankari' : 'Related Information',
          items: links.map(l => l.label)
        }
      ]
    };

    return NextResponse.json(response);

  } catch (error: any) {
    console.error("Chat Error:", error);
    return NextResponse.json({ error: "Process failed" }, { status: 500 });
  }
}
