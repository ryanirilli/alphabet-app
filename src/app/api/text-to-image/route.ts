import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { word } = await request.json();
  const key = `${word}-image`;
  try {
    const savedImageUrl: string | null = await kv.get(key);
    if (savedImageUrl) {
      return NextResponse.json({ imageUrl: savedImageUrl });
    }

    return NextResponse.json({ error: "No Image exists" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}
