"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Video, Clock, BarChart } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Home() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white shadow-sm">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Video className="h-6 w-6 text-purple-600" />
          <span className="text-purple-800 font-bold">LearnTrack Pro</span>
        </Link>
        <div className="ml-auto flex gap-4">
          <Link href="/lectures" className="text-purple-600 hover:text-purple-800 font-medium">
            Lectures
          </Link>
          <Link href="/" className="text-purple-600 hover:text-purple-800 font-medium">
            About
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-800">
                  Smart Learning Platform
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-violet-600 to-indigo-700">
                  Track Real Learning Progress
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl lg:text-2xl">
                  Our advanced tracking system ensures you only get credit for content you actually watch. No more
                  skipping or rewatching to game the system.
                </p>
                <div className="space-y-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/lectures">
                      <Button className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-8 text-lg font-medium text-white shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300">
                        Start Learning
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative lg:ml-auto"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 z-10"></div>
                  <img
                    src="/placeholder.svg?height=500&width=700"
                    alt="Learning dashboard"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-200 rounded-full blur-2xl opacity-80"></div>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-200 rounded-full blur-2xl opacity-80"></div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-white to-purple-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-700">
                How It Works
              </h2>
              <p className="mt-4 text-gray-600 md:text-xl">Our intelligent system tracks your real learning progress</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ y: -5 }}
                className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg border border-purple-100"
              >
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Unique Viewing</h3>
                <p className="text-gray-600 text-center">
                  Only counts parts of videos you haven't seen before, preventing duplicate progress.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg border border-purple-100"
              >
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Prevent Skipping</h3>
                <p className="text-gray-600 text-center">
                  Skipping ahead doesn't count as progress. You must actually watch the content.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg border border-purple-100"
              >
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Accurate Progress</h3>
                <p className="text-gray-600 text-center">
                  Your progress percentage reflects exactly how much unique content you've watched.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <Video className="h-6 w-6 text-purple-400" />
                <span>LearnTrack Pro</span>
              </div>
              <p className="text-gray-400">Advanced video progress tracking for real learning measurement.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/lectures" className="text-gray-400 hover:text-white transition-colors">
                    Lectures
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <p className="text-gray-400">support@learntrackpro.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 LearnTrack Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
