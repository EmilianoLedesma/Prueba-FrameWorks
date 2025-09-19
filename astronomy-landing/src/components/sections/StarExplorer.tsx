'use client'

import React, { useState, useEffect, useRef } from 'react'
import Container from '../ui/Container'
import Card from '../ui/Card'

interface Star {
  id: string
  name: string
  constellation: string
  magnitude: number
  distance: string
  color: string
  x: number
  y: number
  z: number
  description: string
}

const stars: Star[] = [
  {
    id: 'sirius',
    name: 'Sirius',
    constellation: 'Can Mayor',
    magnitude: -1.46,
    distance: '8.6 años luz',
    color: '#b4c7ff',
    x: 150,
    y: 200,
    z: 0.8,
    description: 'La estrella más brillante del cielo nocturno, un sistema binario con una enana blanca.'
  },
  {
    id: 'canopus',
    name: 'Canopus',
    constellation: 'Carina',
    magnitude: -0.74,
    distance: '310 años luz',
    color: '#ffffcc',
    x: 320,
    y: 180,
    z: 0.9,
    description: 'La segunda estrella más brillante, una supergigante amarillo-blanca.'
  },
  {
    id: 'rigil-kent',
    name: 'Rigil Kentaurus',
    constellation: 'Centauro',
    magnitude: -0.27,
    distance: '4.37 años luz',
    color: '#fff2a1',
    x: 280,
    y: 320,
    z: 0.7,
    description: 'El sistema estelar más cercano al Sol, también conocido como Alpha Centauri.'
  },
  {
    id: 'arcturus',
    name: 'Arcturus',
    constellation: 'Boyero',
    magnitude: -0.05,
    distance: '36.7 años luz',
    color: '#ffcc99',
    x: 200,
    y: 150,
    z: 0.6,
    description: 'Una gigante roja y la estrella más brillante del hemisferio norte.'
  },
  {
    id: 'vega',
    name: 'Vega',
    constellation: 'Lira',
    magnitude: 0.03,
    distance: '25 años luz',
    color: '#a2c5ff',
    x: 100,
    y: 100,
    z: 0.5,
    description: 'Una de las estrellas más estudiadas, fue la estrella polar hace 12,000 años.'
  },
  {
    id: 'capella',
    name: 'Capella',
    constellation: 'Auriga',
    magnitude: 0.08,
    distance: '42.9 años luz',
    color: '#fff4ea',
    x: 180,
    y: 80,
    z: 0.4,
    description: 'En realidad un sistema de cuatro estrellas que orbitan entre sí.'
  },
  {
    id: 'rigel',
    name: 'Rigel',
    constellation: 'Orión',
    magnitude: 0.13,
    distance: '860 años luz',
    color: '#b7d4ff',
    x: 350,
    y: 250,
    z: 1.0,
    description: 'Una supergigante azul, una de las estrellas más luminosas conocidas.'
  },
  {
    id: 'procyon',
    name: 'Procyon',
    constellation: 'Can Menor',
    magnitude: 0.34,
    distance: '11.5 años luz',
    color: '#fff5b4',
    x: 120,
    y: 280,
    z: 0.3,
    description: 'Un sistema binario con una enana blanca compañera.'
  }
]

const constellations = [
  { name: 'Orión', stars: ['rigel'] },
  { name: 'Can Mayor', stars: ['sirius'] },
  { name: 'Boyero', stars: ['arcturus'] },
  { name: 'Lira', stars: ['vega'] },
  { name: 'Auriga', stars: ['capella'] },
  { name: 'Can Menor', stars: ['procyon'] },
  { name: 'Carina', stars: ['canopus'] },
  { name: 'Centauro', stars: ['rigil-kent'] }
]

export default function StarExplorer() {
  const [selectedStar, setSelectedStar] = useState<Star | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [selectedConstellation, setSelectedConstellation] = useState<string>('all')
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        })
        
        setRotation({
          x: (e.clientY - rect.top - rect.height / 2) / rect.height * 20,
          y: (e.clientX - rect.left - rect.width / 2) / rect.width * 20
        })
      }
    }

    const canvas = canvasRef.current
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove)
      return () => canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const filteredStars = selectedConstellation === 'all' 
    ? stars 
    : stars.filter(star => star.constellation === selectedConstellation)

  const getStarSize = (magnitude: number) => {
    // Las magnitudes más bajas = estrellas más brillantes = tamaño más grande
    const size = Math.max(4, 20 - magnitude * 8)
    return Math.min(size, 24)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-indigo-900/20 to-purple-900/30">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Explorador de Estrellas 3D
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explora las estrellas más brillantes del cielo nocturno. Mueve el cursor para rotar la vista 3D.
          </p>
          
          {/* Filtros de constelaciones */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setSelectedConstellation('all')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedConstellation === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Todas las estrellas
            </button>
            {constellations.map((constellation) => (
              <button
                key={constellation.name}
                onClick={() => setSelectedConstellation(constellation.name)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedConstellation === constellation.name 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {constellation.name}
              </button>
            ))}
          </div>
        </div>

        {/* Canvas 3D de estrellas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div 
            ref={canvasRef}
            className="relative h-96 bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden cursor-crosshair border border-white/20"
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Fondo estrellado */}
            <div className="absolute inset-0 stars opacity-50"></div>
            
            {/* Estrellas interactivas */}
            <div 
              className="absolute inset-0 transition-transform duration-500"
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
              }}
            >
              {filteredStars.map((star) => {
                const size = getStarSize(star.magnitude)
                return (
                  <div
                    key={star.id}
                    className="absolute cursor-pointer transition-all duration-300 hover:scale-150"
                    style={{
                      left: `${star.x}px`,
                      top: `${star.y}px`,
                      width: `${size}px`,
                      height: `${size}px`,
                      backgroundColor: star.color,
                      borderRadius: '50%',
                      boxShadow: `0 0 ${size}px ${star.color}`,
                      transform: `translateZ(${star.z * 100}px)`,
                      animation: 'twinkle 2s ease-in-out infinite alternate'
                    }}
                    onClick={() => setSelectedStar(star)}
                    title={star.name}
                  />
                )
              })}
            </div>
            
            {/* Información de coordenadas */}
            <div className="absolute bottom-4 right-4 text-gray-400 text-xs">
              Rotación: X:{rotation.x.toFixed(1)}° Y:{rotation.y.toFixed(1)}°
            </div>
          </div>

          {/* Panel de información */}
          <div className="space-y-6">
            {selectedStar ? (
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-8 h-8 rounded-full"
                    style={{
                      backgroundColor: selectedStar.color,
                      boxShadow: `0 0 20px ${selectedStar.color}`
                    }}
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedStar.name}</h3>
                    <p className="text-gray-400">Constelación: {selectedStar.constellation}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-400">Magnitud:</span>
                    <span className="text-white ml-2">{selectedStar.magnitude}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Distancia:</span>
                    <span className="text-white ml-2">{selectedStar.distance}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  {selectedStar.description}
                </p>
                
                <div className="mt-4 p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-400">
                    💡 Dato curioso: La magnitud aparente indica qué tan brillante vemos la estrella desde la Tierra. 
                    Números negativos = más brillante.
                  </p>
                </div>
              </Card>
            ) : (
              <Card className="p-6 text-center">
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="text-xl font-bold text-white mb-2">Selecciona una estrella</h3>
                <p className="text-gray-300 text-sm">
                  Haz clic en cualquier estrella del canvas 3D para ver información detallada.
                  Mueve el cursor para rotar la vista.
                </p>
              </Card>
            )}
            
            {/* Estadísticas */}
            <Card className="p-4">
              <h4 className="font-semibold text-white mb-3">Estadísticas del explorador</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Estrellas visibles:</span>
                  <span className="text-white ml-2">{filteredStars.length}</span>
                </div>
                <div>
                  <span className="text-gray-400">Constelaciones:</span>
                  <span className="text-white ml-2">{constellations.length}</span>
                </div>
                <div>
                  <span className="text-gray-400">Estrella más cercana:</span>
                  <span className="text-white ml-2">Rigil Kentaurus</span>
                </div>
                <div>
                  <span className="text-gray-400">Más brillante:</span>
                  <span className="text-white ml-2">Sirius</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-lg">
            🌟 Cada punto de luz en el cielo nocturno cuenta una historia de millones de años.
          </p>
        </div>
      </Container>

      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.7; }
          100% { opacity: 1; }
        }
      `}</style>
    </section>
  )
}