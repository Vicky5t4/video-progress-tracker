import { mergeIntervals, calculateProgress } from "./progress-utils"

// Interface for user progress data
interface UserProgress {
  progress: number
  watchedIntervals: [number, number][]
  lastPosition: number
}

// In-memory storage for user progress (in a real app, this would be a database)
const userProgressStore: Record<string, UserProgress> = {}

/**
 * Get user progress for a specific lecture
 * @param lectureId Lecture ID
 * @returns User progress data or null if not found
 */
export async function getUserProgress(lectureId: number): Promise<UserProgress | null> {
  // In a real app, this would fetch from a database
  // For now, we'll use localStorage to persist between page refreshes
  if (typeof window !== "undefined") {
    const storedProgress = localStorage.getItem(`lecture-progress-${lectureId}`)
    if (storedProgress) {
      return JSON.parse(storedProgress)
    }
  }

  return userProgressStore[`lecture-${lectureId}`] || null
}

/**
 * Save user progress for a specific lecture
 * @param lectureId Lecture ID
 * @param progressData Progress data to save
 */
export async function saveUserProgress(lectureId: number, progressData: UserProgress): Promise<void> {
  // In a real app, this would save to a database
  userProgressStore[`lecture-${lectureId}`] = progressData

  // Also save to localStorage for persistence between page refreshes
  if (typeof window !== "undefined") {
    localStorage.setItem(`lecture-progress-${lectureId}`, JSON.stringify(progressData))
  }
}

/**
 * Update user progress with a new watched interval
 * @param lectureId Lecture ID
 * @param newInterval New interval that was watched [start, end]
 * @param totalDuration Total video duration in seconds
 * @returns Updated progress data
 */
export async function updateUserProgress(
  lectureId: number,
  newInterval: [number, number],
  totalDuration: number,
): Promise<UserProgress> {
  // Get existing progress
  const existingProgress = (await getUserProgress(lectureId)) || {
    progress: 0,
    watchedIntervals: [],
    lastPosition: 0,
  }

  // Add new interval and merge
  const updatedIntervals = mergeIntervals([...existingProgress.watchedIntervals, newInterval])

  // Calculate new progress percentage
  const newProgress = calculateProgress(updatedIntervals, totalDuration)

  // Create updated progress data
  const updatedProgressData: UserProgress = {
    progress: newProgress,
    watchedIntervals: updatedIntervals,
    lastPosition: newInterval[1], // Update last position to the end of the new interval
  }

  // Save updated progress
  await saveUserProgress(lectureId, updatedProgressData)

  return updatedProgressData
}
