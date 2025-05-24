export function mergeIntervals(intervals: [number, number][]): [number, number][] {
  if (intervals.length === 0) return []

  const sortedIntervals = [...intervals].sort((a, b) => a[0] - b[0])
  const result: [number, number][] = [sortedIntervals[0]]

  for (let i = 1; i < sortedIntervals.length; i++) {
    const current = sortedIntervals[i]
    const lastMerged = result[result.length - 1]

    if (current[0] <= lastMerged[1] + 1) {
      lastMerged[1] = Math.max(lastMerged[1], current[1])
    } else {
      result.push(current)
    }
  }

  return result
}

export function calculateProgress(intervals: [number, number][], totalDuration: number): number {
  if (intervals.length === 0 || totalDuration === 0) return 0

  const totalWatched = intervals.reduce((sum, interval) => {
    return sum + (interval[1] - interval[0])
  }, 0)

  return Math.min(1, totalWatched / totalDuration)
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}
