import { type NextRequest, NextResponse } from "next/server"
import { getUserProgress, saveUserProgress } from "@/lib/progress"

// GET /api/progress/:lectureId
export async function GET(request: NextRequest, { params }: { params: { lectureId: string } }) {
  try {
    const lectureId = Number.parseInt(params.lectureId)

    if (isNaN(lectureId)) {
      return NextResponse.json({ error: "Invalid lecture ID" }, { status: 400 })
    }

    const progress = await getUserProgress(lectureId)

    if (!progress) {
      return NextResponse.json({ error: "Progress not found" }, { status: 404 })
    }

    return NextResponse.json(progress)
  } catch (error) {
    console.error("Error fetching progress:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/progress/:lectureId
export async function POST(request: NextRequest, { params }: { params: { lectureId: string } }) {
  try {
    const lectureId = Number.parseInt(params.lectureId)

    if (isNaN(lectureId)) {
      return NextResponse.json({ error: "Invalid lecture ID" }, { status: 400 })
    }

    const body = await request.json()

    if (!body || !body.watchedIntervals || typeof body.progress !== "number") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    await saveUserProgress(lectureId, {
      progress: body.progress,
      watchedIntervals: body.watchedIntervals,
      lastPosition: body.lastPosition || 0,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving progress:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
