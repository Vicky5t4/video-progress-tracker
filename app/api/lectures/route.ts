import { NextResponse } from "next/server"
import { fetchLectures } from "@/lib/api"

export async function GET() {
  try {
    const lectures = await fetchLectures()
    return NextResponse.json(lectures)
  } catch (error) {
    console.error("Error fetching lectures:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
