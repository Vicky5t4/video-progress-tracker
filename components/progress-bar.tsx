interface ProgressBarProps {
  progress: number
  watchedIntervals?: [number, number][]
  duration?: number
}

export function ProgressBar({ progress, watchedIntervals, duration }: ProgressBarProps) {
  const percentage = Math.round(progress * 100)

  return (
    <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {watchedIntervals && duration && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {watchedIntervals.map((interval, index) => {
            const startPercent = (interval[0] / duration) * 100
            const widthPercent = ((interval[1] - interval[0]) / duration) * 100

            return (
              <div
                key={index}
                className="absolute h-1 top-1/2 -translate-y-1/2 bg-white opacity-30"
                style={{
                  left: `${startPercent}%`,
                  width: `${widthPercent}%`,
                }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
