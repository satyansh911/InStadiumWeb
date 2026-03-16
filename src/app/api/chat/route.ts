import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message, stadiumName } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ reply: `I'm your assistant for ${stadiumName}. I can help you with venue history, seating, and match schedules!` });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful sports stadium guide for ${stadiumName}. Provide detailed information about its history, seating arrangements, food options, and match day tips. Keep responses concise and engaging.`
        },
        {
          role: "user",
          content: message
        }
      ],
    });

    const reply = response.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('AI Error:', error);
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}
