import { type NextRequest, NextResponse } from "next/server"
import { fetchLectureById } from "@/lib/api"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const lectureId = Number.parseInt(params.id)

    if (isNaN(lectureId)) {
      return NextResponse.json({ error: "Invalid lecture ID" }, { status: 400 })
    }

    const lecture = await fetchLectureById(lectureId)

    if (!lecture) {
      return NextResponse.json({ error: "Lecture not found" }, { status: 404 })
    }

    return NextResponse.json(lecture)
  } catch (error) {
    console.error("Error fetching lecture:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
