import { mergeIntervals, calculateProgress } from "./progress-utils"

interface UserProgress {
  progress: number
  watchedIntervals: [number, number][]
  lastPosition: number
}

export async function getUserProgress(lectureId: number): Promise<UserProgress | null> {
  if (typeof window !== "undefined") {
    const storedProgress = localStorage.getItem(`lecture-progress-${lectureId}`)
    if (storedProgress) {
      return JSON.parse(storedProgress)
    }
  }
  return null
}

export async function saveUserProgress(lectureId: number, progressData: UserProgress): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.setItem(`lecture-progress-${lectureId}`, JSON.stringify(progressData))
  }
}

export async function updateUserProgress(
  lectureId: number,
  newInterval: [number, number],
  totalDuration: number,
): Promise<UserProgress> {
  const existingProgress = (await getUserProgress(lectureId)) || {
    progress: 0,
    watchedIntervals: [],
    lastPosition: 0,
  }

  const updatedIntervals = mergeIntervals([...existingProgress.watchedIntervals, newInterval])
  const newProgress = calculateProgress(updatedIntervals, totalDuration)

  const updatedProgressData: UserProgress = {
    progress: newProgress,
    watchedIntervals: updatedIntervals,
    lastPosition: newInterval[1],
  }

  await saveUserProgress(lectureId, updatedProgressData)
  return updatedProgressData
}
