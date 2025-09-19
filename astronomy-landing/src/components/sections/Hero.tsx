import React from 'react'
import Container from '../ui/Container'
import Button from '../ui/Button'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden stars">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
      
      <Container className="relative z-10 text-center">
        <div className="animate-pulse">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent">
            Explora el Universo
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Descubre los misterios del cosmos, desde planetas distantes hasta galaxias inexploradas. 
          Únete a nosotros en un viaje extraordinario a través del espacio y el tiempo.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="primary" size="lg" className="min-w-48">
            Comenzar Exploración
          </Button>
          <Button variant="outline" size="lg" className="min-w-48">
            Ver Galería
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-yellow-400">8</div>
            <div className="text-gray-300">Planetas</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-blue-400">100+</div>
            <div className="text-gray-300">Misiones Espaciales</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-purple-400">∞</div>
            <div className="text-gray-300">Posibilidades</div>
          </div>
        </div>
      </Container>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full">
          <div className="w-1.5 h-3 bg-white/50 rounded-full mx-auto mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}