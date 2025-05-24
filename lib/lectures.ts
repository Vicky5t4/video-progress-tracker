// Mock data for lectures
const lectures = [
  {
    id: 1,
    title: "Introduction to React",
    description:
      "Learn the basics of React, including components, props, and state management. This lecture covers the fundamental concepts you need to know to start building React applications.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    durationInSeconds: 596, // 9:56
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    description:
      "Dive deep into advanced JavaScript concepts like closures, prototypes, and asynchronous programming. This lecture will help you understand the inner workings of JavaScript.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    durationInSeconds: 653, // 10:53
  },
  {
    id: 3,
    title: "Building APIs with Node.js",
    description:
      "Learn how to build RESTful APIs using Node.js and Express. This lecture covers routing, middleware, error handling, and connecting to databases.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    durationInSeconds: 180, // 3:00
  },
]

/**
 * Get all lectures
 * @returns Array of lectures
 */
export async function getLectures() {
  // In a real app, this would fetch from an API
  return lectures
}

/**
 * Get a lecture by ID
 * @param id Lecture ID
 * @returns Lecture object or null if not found
 */
export async function getLectureById(id: number) {
  // In a real app, this would fetch from an API
  return lectures.find((lecture) => lecture.id === id) || null
}
