"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { mergeIntervals, calculateProgress } from "@/lib/progress-utils"
import { FastForward, Pause, Play, Rewind, Volume2, VolumeX } from "lucide-react"

interface VideoPlayerProps {
  videoUrl: string
  initialTime: number
  watchedIntervals: [number, number][]
  duration: number
  onProgressUpdate: (progress: number, intervals: [number, number][], currentPosition: number) => void
}

export function VideoPlayer({ videoUrl, initialTime, watchedIntervals, duration, onProgressUpdate }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [currentIntervals, setCurrentIntervals] = useState<[number, number][]>(watchedIntervals || [])
  const [trackingInterval, setTrackingInterval] = useState<NodeJS.Timeout | null>(null)
  const [lastTrackedTime, setLastTrackedTime] = useState<number | null>(null)
  const [videoDuration, setVideoDuration] = useState(duration || 0)

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = initialTime || 0

      const handleLoadedMetadata = () => {
        if (videoRef.current) {
          setVideoDuration(videoRef.current.duration)
        }
      }

      videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata)

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata)
        }
      }
    }
  }, [initialTime])

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (videoRef.current) {
          const currentVideoTime = Math.floor(videoRef.current.currentTime)

          if (lastTrackedTime === null || Math.abs(currentVideoTime - lastTrackedTime) > 1) {
            setLastTrackedTime(currentVideoTime)
          } else {
            const newInterval: [number, number] = [lastTrackedTime, currentVideoTime]

            setCurrentIntervals((prevIntervals) => {
              const updatedIntervals = [...prevIntervals, newInterval]
              const mergedIntervals = mergeIntervals(updatedIntervals)
              const newProgress = calculateProgress(mergedIntervals, videoDuration)

              setTimeout(() => {
                onProgressUpdate(newProgress, mergedIntervals, currentVideoTime)
              }, 0)

              return mergedIntervals
            })

            setLastTrackedTime(currentVideoTime)
          }
        }
      }, 1000)

      setTrackingInterval(interval)
    } else if (trackingInterval) {
      clearInterval(trackingInterval)
      setTrackingInterval(null)
    }

    return () => {
      if (trackingInterval) {
        clearInterval(trackingInterval)
      }
    }
  }, [isPlaying, lastTrackedTime, videoDuration, onProgressUpdate])

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      const newTime = value[0]
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
      setLastTrackedTime(null)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      const newVolume = value[0]
      videoRef.current.volume = newVolume
      setVolume(newVolume)

      if (newVolume === 0) {
        setIsMuted(true)
      } else if (isMuted) {
        setIsMuted(false)
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10)
    }
  }

  const handleFastForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 10)
    }
  }

  return (
    <div className="flex flex-col w-full bg-black rounded-xl overflow-hidden shadow-xl border border-purple-200">
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full"
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
      </div>

      <div className="bg-gray-900 text-white p-4">
        <div className="mb-2">
          <Slider
            value={[currentTime]}
            min={0}
            max={videoDuration || 100}
            step={1}
            onValueChange={handleSeek}
            className="w-full [&>span:first-child]:h-1.5 [&>span:first-child]:bg-gray-700 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-purple-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleRewind} className="text-white hover:bg-gray-800">
              <Rewind className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" onClick={togglePlay} className="text-white hover:bg-gray-800">
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>

            <Button variant="ghost" size="icon" onClick={handleFastForward} className="text-white hover:bg-gray-800">
              <FastForward className="h-5 w-5" />
            </Button>

            <div className="text-sm ml-2">
              {formatTime(currentTime)} / {formatTime(videoDuration)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-gray-800">
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>

            <div className="w-24">
              <Slider
                value={[isMuted ? 0 : volume]}
                min={0}
                max={1}
                step={0.1}
                onValueChange={handleVolumeChange}
                className="w-full [&>span:first-child]:h-1.5 [&>span:first-child]:bg-gray-700 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-purple-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
