"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, Clock, BookOpen } from "lucide-react"
import { motion } from "framer-motion"
import { fetchLectures } from "@/lib/api"

interface Lecture {
  id: number
  title: string
  duration: string
  thumbnail: string
  durationInSeconds: number
  description: string
}

export default function LecturesPage() {
  const [lectures, setLectures] = useState<Lecture[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getLectures = async () => {
      try {
        const data = await fetchLectures()
        setLectures(data)
      } catch (error) {
        console.error("Failed to fetch lectures:", error)
      } finally {
        setLoading(false)
      }
    }

    getLectures()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
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
          <Link href="/" className="text-purple-600 hover:text-purple-800 font-medium">
            Home
          </Link>
        </div>
      </header>
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Available Lectures</h1>
            <p className="text-gray-600 mb-8">Select a lecture to start learning with accurate progress tracking</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lectures.map((lecture, index) => (
              <motion.div
                key={lecture.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/lectures/${lecture.id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-purple-100 h-full flex flex-col">
                    <div className="aspect-video relative">
                      <img
                        src={lecture.thumbnail || "/placeholder.svg"}
                        alt={lecture.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {lecture.duration}
                      </div>
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-lg text-gray-900">{lecture.title}</CardTitle>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                        {lecture.description.substring(0, 100)}...
                      </p>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 mt-auto">
                      <div className="flex items-center text-sm text-purple-600">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>Start learning</span>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
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
