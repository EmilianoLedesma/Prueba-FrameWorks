'use client'

import React, { useState, useEffect } from 'react'
import Container from '../ui/Container'
import Button from '../ui/Button'
import InteractiveStats from '../ui/InteractiveStats'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 stars"></div>
      
      {/* Parallax planets */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-2/3 right-1/4 w-5 h-5 bg-red-400 rounded-full animate-pulse delay-500"></div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
      
      <Container className="relative z-10 text-center">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main title with enhanced animations */}
          <div className="relative mb-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent animate-pulse">
              Explora el Universo
            </h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-yellow-400/20 blur-3xl -z-10 animate-pulse"></div>
          </div>
          
          {/* Enhanced subtitle */}
          <p className={`text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            Descubre los misterios del cosmos, desde planetas distantes hasta galaxias inexploradas. 
            Únete a nosotros en un viaje extraordinario a través del espacio y el tiempo.
          </p>
          
          {/* Interactive buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-1000 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <Button 
              variant="primary" 
              size="lg" 
              className="min-w-48 group relative overflow-hidden"
              onClick={() => scrollToSection('rockets')}
            >
              <span className="relative z-10">Comenzar Exploración</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="min-w-48 group"
              onClick={() => scrollToSection('gallery')}
            >
              <span className="group-hover:text-yellow-400 transition-colors">Ver Galería</span>
            </Button>
          </div>
        </div>
        
        {/* Enhanced interactive stats */}
        <div className={`transition-all duration-1000 delay-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <InteractiveStats />
        </div>
      </Container>
      
      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer group">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full group-hover:border-white/80 transition-colors">
          <div className="w-1.5 h-3 bg-white/50 rounded-full mx-auto mt-2 animate-pulse group-hover:bg-white/80 transition-colors"></div>
        </div>
        <p className="text-white/50 text-xs mt-2 group-hover:text-white/80 transition-colors">Descubre más</p>
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-white/20 animate-float">✦</div>
        <div className="absolute top-40 right-20 text-white/20 animate-float-delayed">✧</div>
        <div className="absolute bottom-40 left-20 text-white/20 animate-float-delayed-2">✦</div>
        <div className="absolute bottom-20 right-10 text-white/20 animate-float">✧</div>
      </div>
    </section>
  )
}