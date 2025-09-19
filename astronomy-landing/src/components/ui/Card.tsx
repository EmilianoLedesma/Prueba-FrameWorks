import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  const hoverEffect = hover ? 'hover:scale-105 hover:shadow-2xl transition-all duration-300' : ''
  
  return (
    <div className={`bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 ${hoverEffect} ${className}`}>
      {children}
    </div>
  )
}