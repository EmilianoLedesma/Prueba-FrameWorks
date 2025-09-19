'use client'

import React, { useState, useEffect } from 'react'

interface Stat {
  id: string
  label: string
  value: string
  finalValue: number
  suffix: string
  color: string
  icon: string
}

const stats: Stat[] = [
  {
    id: 'planets',
    label: 'Planetas en nuestro Sistema Solar',
    value: '8',
    finalValue: 8,
    suffix: '',
    color: 'from-yellow-400 to-orange-500',
    icon: '🪐'
  },
  {
    id: 'missions',
    label: 'Misiones Espaciales Exitosas',
    value: '150',
    finalValue: 150,
    suffix: '+',
    color: 'from-blue-400 to-cyan-500',
    icon: '🚀'
  },
  {
    id: 'discoveries',
    label: 'Exoplanetas Descubiertos',
    value: '5000',
    finalValue: 5000,
    suffix: '+',
    color: 'from-purple-400 to-pink-500',
    icon: '🌍'
  },
  {
    id: 'distance',
    label: 'Años luz a la galaxia más cercana',
    value: '2.5M',
    finalValue: 2.5,
    suffix: 'M',
    color: 'from-green-400 to-emerald-500',
    icon: '🌌'
  }
]

interface CountUpProps {
  target: number
  suffix: string
  duration?: number
}

function CountUp({ target, suffix, duration = 2000 }: CountUpProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(target * easeOutQuart)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration])

  const formatNumber = (num: number): string => {
    if (suffix === 'M') {
      return num.toFixed(1)
    }
    return Math.floor(num).toString()
  }

  return (
    <span className="font-bold text-3xl">
      {formatNumber(count)}{suffix}
    </span>
  )
}

export default function InteractiveStats() {
  const [hoveredStat, setHoveredStat] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className={`relative group cursor-pointer transition-all duration-300 ${
            hoveredStat === stat.id ? 'scale-105' : ''
          }`}
          onMouseEnter={() => setHoveredStat(stat.id)}
          onMouseLeave={() => setHoveredStat(null)}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 text-center relative overflow-hidden">
            {/* Background gradient effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 transition-opacity duration-300 ${
              hoveredStat === stat.id ? 'opacity-20' : ''
            }`}></div>
            
            {/* Icon */}
            <div className="text-4xl mb-3 relative z-10 transform transition-transform duration-300 group-hover:scale-110">
              {stat.icon}
            </div>
            
            {/* Animated Counter */}
            <div className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 relative z-10`}>
              <CountUp target={stat.finalValue} suffix={stat.suffix} />
            </div>
            
            {/* Label */}
            <div className="text-gray-300 text-sm font-medium relative z-10">
              {stat.label}
            </div>
            
            {/* Hover effect lines */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
          </div>
        </div>
      ))}
    </div>
  )
}