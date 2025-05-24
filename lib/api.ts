const lectures = [
  {
    id: 1,
    title: "Introduction to React Hooks",
    description:
      "Learn how to use React Hooks to manage state and side effects in functional components. This lecture covers useState, useEffect, useContext, and custom hooks with practical examples.",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    durationInSeconds: 734,
    duration: "12:14",
    thumbnail: "/placeholder.svg?height=200&width=300&text=React+Hooks",
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns",
    description:
      "Master advanced TypeScript concepts including generics, conditional types, mapped types, and utility types. Learn how to create type-safe APIs and improve your code quality.",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    durationInSeconds: 888,
    duration: "14:48",
    thumbnail: "/placeholder.svg?height=200&width=300&text=TypeScript",
  },
  {
    id: 3,
    title: "Building Responsive UIs with Tailwind CSS",
    description:
      "Discover how to rapidly build modern, responsive user interfaces using Tailwind CSS. This lecture covers core concepts, responsive design, customization, and best practices.",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    durationInSeconds: 596,
    duration: "9:56",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Tailwind+CSS",
  },
  {
    id: 4,
    title: "Next.js Server Components",
    description:
      "Explore the power of Server Components in Next.js. Learn how they differ from Client Components, when to use each, and how to optimize your application's performance.",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    durationInSeconds: 470,
    duration: "7:50",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Next.js",
  },
  {
    id: 5,
    title: "State Management with Redux Toolkit",
    description:
      "Learn modern Redux development using Redux Toolkit. This lecture covers creating slices, using thunks for async operations, and integrating with React applications.",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    durationInSeconds: 653,
    duration: "10:53",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Redux+Toolkit",
  },
  {
    id: 6,
    title: "Building APIs with Node.js and Express",
    description:
      "Learn how to create robust RESTful APIs using Node.js and Express. This lecture covers routing, middleware, error handling, authentication, and connecting to databases.",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    durationInSeconds: 653,
    duration: "10:53",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Node.js+APIs",
  },
]

export async function fetchLectures() {
  return new Promise<typeof lectures>((resolve) => {
    setTimeout(() => {
      resolve(lectures)
    }, 500)
  })
}

export async function fetchLectureById(id: number) {
  return new Promise<(typeof lectures)[0] | null>((resolve) => {
    setTimeout(() => {
      const lecture = lectures.find((lecture) => lecture.id === id) || null
      resolve(lecture)
    }, 500)
  })
}
