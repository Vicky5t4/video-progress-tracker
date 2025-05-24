"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Video, ArrowLeft } from "lucide-react"
import { VideoPlayer } from "@/components/video-player"
import { ProgressBar } from "@/components/progress-bar"
import { fetchLectureById } from "@/lib/api"
import { getUserProgress, saveUserProgress } from "@/lib/progress-service"
import { motion } from "framer-motion"

interface Lecture {
  id: number
  title: string
  description: string
  videoUrl: string
  durationInSeconds: number
}

interface UserProgress {
  progress: number
  watchedIntervals: [number, number][]
  lastPosition: number
}

export default function LecturePage() {
  const params = useParams()
  const lectureId = Number(params.id)

  const [lecture, setLecture] = useState<Lecture | null>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [watchedIntervals, setWatchedIntervals] = useState<[number, number][]>([])
  const [lastPosition, setLastPosition] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lectureData = await fetchLectureById(lectureId)
        setLecture(lectureData)

        const userProgress = await getUserProgress(lectureId)
        if (userProgress) {
          setProgress(userProgress.progress)
          setWatchedIntervals(userProgress.watchedIntervals)
          setLastPosition(userProgress.lastPosition)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [lectureId])

  const handleProgressUpdate = async (
    newProgress: number,
    newIntervals: [number, number][],
    currentPosition: number,
  ) => {
    setProgress(newProgress)
    setWatchedIntervals(newIntervals)
    setLastPosition(currentPosition)

    try {
      await saveUserProgress(lectureId, {
        progress: newProgress,
        watchedIntervals: newIntervals,
        lastPosition: currentPosition,
      })
    } catch (error) {
      console.error("Error saving progress:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!lecture) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Lecture not found</h1>
          <Link href="/lectures" className="text-purple-600 hover:text-purple-800 font-medium">
            Back to lectures
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white shadow-sm">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Video className="h-6 w-6 text-purple-600" />
          <span className="text-purple-800 font-bold">LearnTrack Pro</span>
        </Link>
        <div className="ml-auto">
          <Link href="/lectures" className="flex items-center text-purple-600 hover:text-purple-800 font-medium">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to lectures
          </Link>
        </div>
      </header>
      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">{lecture.title}</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <VideoPlayer
              videoUrl={lecture.videoUrl}
              initialTime={lastPosition}
              watchedIntervals={watchedIntervals}
              duration={lecture.durationInSeconds}
              onProgressUpdate={handleProgressUpdate}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 bg-white p-6 rounded-xl shadow-md border border-purple-100"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900">Your Progress</h2>
              <span className="text-lg font-bold text-purple-700">{Math.round(progress * 100)}%</span>
            </div>
            <ProgressBar progress={progress} watchedIntervals={watchedIntervals} duration={lecture.durationInSeconds} />
            <p className="text-sm text-gray-500 mt-2">
              Only unique parts of the video you've watched count toward your progress.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="prose max-w-none bg-white p-6 rounded-xl shadow-md border border-purple-100"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About this lecture</h2>
            <p className="text-gray-700">{lecture.description}</p>
          </motion.div>
        </div>
      </main>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <p className="text-gray-400">© 2025 LearnTrack Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
