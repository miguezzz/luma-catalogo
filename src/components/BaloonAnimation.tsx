"use client"

import { useEffect, useState } from "react"

interface Balloon {
  id: number
  x: number
  y: number
  size: number
  speed: number
  color: string
}

export default function BalloonAnimation() {
  const [balloons, setBalloons] = useState<Balloon[]>([])

  useEffect(() => {
    const colors = ["#FF5E5B", "#D8D8D8", "#FFED66", "#00CECB", "#FFAAFF"]
    const newBalloons: Balloon[] = []

    for (let i = 0; i < 10; i++) {
      newBalloons.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100 + 100,
        size: Math.random() * 30 + 20,
        speed: Math.random() * 1 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    setBalloons(newBalloons)

    const interval = setInterval(() => {
      setBalloons((prev) =>
        prev.map((balloon) => {
          let newY = balloon.y - balloon.speed
          if (newY < -20) {
            newY = 120
            balloon.x = Math.random() * 100
          }
          return { ...balloon, y: newY }
        }),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="absolute rounded-full"
          style={{
            left: `${balloon.x}%`,
            top: `${balloon.y}%`,
            width: `${balloon.size}px`,
            height: `${balloon.size * 1.2}px`,
            backgroundColor: balloon.color,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transform: "translateY(0)",
            transition: "transform 0.2s ease-in-out",
          }}
        >
          <div
            className="absolute bg-gray-300"
            style={{
              width: "1px",
              height: `${balloon.size * 0.8}px`,
              bottom: `-${balloon.size * 0.8}px`,
              left: "50%",
            }}
          ></div>
        </div>
      ))}
    </>
  )
}
