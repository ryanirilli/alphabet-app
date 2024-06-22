import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { word } = await request.json();
  const key = `${word}-audio`;
  try {
    const audioUrl: string | null = await kv.get(key);
    if (audioUrl) {
      const audioBlob = await fetch(audioUrl).then((response) =>
        response.blob()
      );
      return new Response(audioBlob, {
        headers: { "Content-Type": "audio/mp3" },
      });
    }
    return NextResponse.json({ error: "No audio exists" }, { status: 404 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch audio" },
      { status: 500 }
    );
  }
}
