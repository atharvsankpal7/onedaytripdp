import { NextResponse } from "next/server";
import { createRegistration } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await createRegistration(data);
    
    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to process registration" },
      { status: 500 }
    );
  }
}