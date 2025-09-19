'use client'

import React, { useState, useEffect, useRef } from 'react'
import Container from '../ui/Container'
import Card from '../ui/Card'
import { Planet } from '@/types'

interface Planet3D extends Planet {
  x: number
  y: number
  z: number
  rotationSpeed: number
  orbitSpeed: number
  currentAngle: number
  moons?: number
  atmosphere?: string
  gravity: string
  dayLength: string
  temperature: string
}

const planets3D: Planet3D[] = [
  {
    id: 'mercury',
    name: 'Mercurio',
    description: 'El planeta más cercano al Sol, con temperaturas extremas y una superficie llena de cráteres.',
    distanceFromSun: '57.9 millones km',
    diameter: '4,879 km',
    color: '#8C7853',
    x: 80,
    y: 200,
    z: 0,
    rotationSpeed: 0.02,
    orbitSpeed: 0.04,
    currentAngle: 0,
    moons: 0,
    atmosphere: 'Prácticamente inexistente',
    gravity: '3.7 m/s²',
    dayLength: '58.6 días terrestres',
    temperature: '-173°C a 427°C'
  },
  {
    id: 'venus',
    name: 'Venus',
    description: 'El planeta más caliente del sistema solar, envuelto en una atmósfera tóxica.',
    distanceFromSun: '108.2 millones km',
    diameter: '12,104 km',
    color: '#FFC649',
    x: 120,
    y: 200,
    z: 0,
    rotationSpeed: -0.01,
    orbitSpeed: 0.03,
    currentAngle: 45,
    moons: 0,
    atmosphere: 'Dióxido de carbono (96%)',
    gravity: '8.87 m/s²',
    dayLength: '243 días terrestres',
    temperature: '462°C'
  },
  {
    id: 'earth',
    name: 'Tierra',
    description: 'Nuestro hogar, el único planeta conocido que alberga vida.',
    distanceFromSun: '149.6 millones km',
    diameter: '12,756 km',
    color: '#6B93D6',
    x: 160,
    y: 200,
    z: 0,
    rotationSpeed: 0.05,
    orbitSpeed: 0.025,
    currentAngle: 90,
    moons: 1,
    atmosphere: 'Nitrógeno (78%), Oxígeno (21%)',
    gravity: '9.8 m/s²',
    dayLength: '24 horas',
    temperature: '-89°C a 58°C'
  },
  {
    id: 'mars',
    name: 'Marte',
    description: 'El planeta rojo, objetivo de futuras misiones tripuladas.',
    distanceFromSun: '227.9 millones km',
    diameter: '6,792 km',
    color: '#CD5C5C',
    x: 200,
    y: 200,
    z: 0,
    rotationSpeed: 0.04,
    orbitSpeed: 0.02,
    currentAngle: 135,
    moons: 2,
    atmosphere: 'Dióxido de carbono (95%)',
    gravity: '3.71 m/s²',
    dayLength: '24.6 horas',
    temperature: '-87°C a -5°C'
  },
  {
    id: 'jupiter',
    name: 'Júpiter',
    description: 'El gigante gaseoso más grande del Sistema Solar.',
    distanceFromSun: '778.5 millones km',
    diameter: '142,984 km',
    color: '#D8CA9D',
    x: 280,
    y: 200,
    z: 0,
    rotationSpeed: 0.08,
    orbitSpeed: 0.01,
    currentAngle: 180,
    moons: 83,
    atmosphere: 'Hidrógeno (89%), Helio (10%)',
    gravity: '24.79 m/s²',
    dayLength: '9.9 horas',
    temperature: '-108°C'
  },
  {
    id: 'saturn',
    name: 'Saturno',
    description: 'Famoso por sus espectaculares anillos de hielo y roca.',
    distanceFromSun: '1.43 mil millones km',
    diameter: '120,536 km',
    color: '#FAD5A5',
    x: 340,
    y: 200,
    z: 0,
    rotationSpeed: 0.07,
    orbitSpeed: 0.008,
    currentAngle: 225,
    moons: 146,
    atmosphere: 'Hidrógeno (96%), Helio (3%)',
    gravity: '10.44 m/s²',
    dayLength: '10.7 horas',
    temperature: '-139°C'
  }
]

export default function InteractivePlanets() {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet3D | null>(planets3D[2]) // Tierra por defecto
  const [isAnimating, setIsAnimating] = useState(true)
  const [planetsState, setPlanetsState] = useState(planets3D)
  const [viewMode, setViewMode] = useState<'orbit' | 'comparison'>('orbit')
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    if (isAnimating) {
      const animate = () => {
        setPlanetsState(prev => prev.map(planet => ({
          ...planet,
          currentAngle: planet.currentAngle + planet.orbitSpeed,
          x: viewMode === 'orbit' 
            ? 200 + Math.cos(planet.currentAngle * Math.PI / 180) * (50 + planets3D.indexOf(planet) * 30)
            : 80 + planets3D.indexOf(planet) * 60,
          y: viewMode === 'orbit'
            ? 200 + Math.sin(planet.currentAngle * Math.PI / 180) * (30 + planets3D.indexOf(planet) * 15)
            : 200
        })))
        animationRef.current = requestAnimationFrame(animate)
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isAnimating, viewMode])

  const getPlanetSize = (diameter: string) => {
    const numDiameter = parseInt(diameter.replace(/[^\d]/g, ''))
    if (numDiameter > 100000) return 40 // Júpiter, Saturno
    if (numDiameter > 50000) return 32  // Gigantes de hielo
    if (numDiameter > 10000) return 24  // Tierra, Venus
    return 16 // Planetas pequeños
  }

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-purple-900/30 to-indigo-900/20">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
            Sistema Solar Interactivo 3D
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explora los planetas de nuestro sistema solar en tiempo real. Haz clic en cualquier planeta para ver información detallada.
          </p>
          
          {/* Controles */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={toggleAnimation}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                isAnimating 
                  ? 'bg-green-500 text-white' 
                  : 'bg-red-500 text-white'
              }`}
            >
              {isAnimating ? '⏸️ Pausar órbitas' : '▶️ Reanudar órbitas'}
            </button>
            
            <button
              onClick={() => setViewMode(viewMode === 'orbit' ? 'comparison' : 'orbit')}
              className="px-6 py-2 rounded-full text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-all"
            >
              {viewMode === 'orbit' ? '📏 Ver comparación' : '🌍 Ver órbitas'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Visualizador 3D */}
          <div className="relative">
            <div 
              className="relative h-96 bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden border border-white/20"
              style={{
                background: 'radial-gradient(circle at center, #1a1a2e 0%, #000000 70%)'
              }}
            >
              {/* Sol */}
              <div 
                className="absolute w-8 h-8 bg-yellow-400 rounded-full"
                style={{
                  left: viewMode === 'orbit' ? '200px' : '40px',
                  top: '200px',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 30px #FDB813',
                  animation: 'pulse 2s ease-in-out infinite alternate'
                }}
              />
              
              {/* Planetas */}
              {planetsState.map((planet) => {
                const size = getPlanetSize(planet.diameter)
                const isSelected = selectedPlanet?.id === planet.id
                
                return (
                  <div
                    key={planet.id}
                    className={`absolute cursor-pointer transition-all duration-300 ${
                      isSelected ? 'z-10 scale-125' : 'hover:scale-110'
                    }`}
                    style={{
                      left: `${planet.x}px`,
                      top: `${planet.y}px`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onClick={() => setSelectedPlanet(planet)}
                  >
                    <div
                      className={`rounded-full relative ${isSelected ? 'animate-pulse' : ''}`}
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: planet.color,
                        boxShadow: isSelected 
                          ? `0 0 25px ${planet.color}` 
                          : `0 0 10px ${planet.color}`,
                        animation: isAnimating 
                          ? `spin ${Math.abs(planet.rotationSpeed) * 50}s linear infinite ${planet.rotationSpeed < 0 ? 'reverse' : ''}` 
                          : 'none'
                      }}
                    >
                      {/* Anillos para Saturno */}
                      {planet.id === 'saturn' && (
                        <div
                          className="absolute border border-gray-400 rounded-full opacity-70"
                          style={{
                            width: `${size * 1.8}px`,
                            height: `${size * 1.8}px`,
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                          }}
                        />
                      )}
                      
                      {/* Indicador de lunas */}
                      {planet.moons && planet.moons > 0 && (
                        <div className="absolute -top-1 -right-1 bg-gray-300 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                          {planet.moons > 9 ? '9+' : planet.moons}
                        </div>
                      )}
                    </div>
                    
                    {/* Nombre del planeta */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-white text-xs font-medium whitespace-nowrap">
                      {planet.name}
                    </div>
                  </div>
                )
              })}
              
              {/* Órbitas */}
              {viewMode === 'orbit' && (
                <>
                  {planets3D.map((_, index) => (
                    <div
                      key={index}
                      className="absolute border border-white/20 rounded-full"
                      style={{
                        width: `${(50 + index * 30) * 2}px`,
                        height: `${(30 + index * 15) * 2}px`,
                        left: '200px',
                        top: '200px',
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                  ))}
                </>
              )}
              
              {/* Información de modo */}
              <div className="absolute bottom-4 left-4 text-gray-400 text-xs">
                Modo: {viewMode === 'orbit' ? 'Órbitas' : 'Comparación de tamaños'}
              </div>
            </div>
          </div>

          {/* Panel de información */}
          <div className="space-y-6">
            {selectedPlanet ? (
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-12 h-12 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: selectedPlanet.color,
                      boxShadow: `0 0 20px ${selectedPlanet.color}`
                    }}
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedPlanet.name}</h3>
                    <p className="text-gray-400">Distancia del Sol: {selectedPlanet.distanceFromSun}</p>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  {selectedPlanet.description}
                </p>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3">Características físicas</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-400">Diámetro:</span>
                        <span className="text-white ml-2">{selectedPlanet.diameter}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Gravedad:</span>
                        <span className="text-white ml-2">{selectedPlanet.gravity}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Duración del día:</span>
                        <span className="text-white ml-2">{selectedPlanet.dayLength}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Lunas:</span>
                        <span className="text-white ml-2">{selectedPlanet.moons || 0}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3">Atmósfera y clima</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-400">Atmósfera:</span>
                        <span className="text-white ml-2">{selectedPlanet.atmosphere}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Temperatura:</span>
                        <span className="text-white ml-2">{selectedPlanet.temperature}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Datos curiosos específicos por planeta */}
                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <h5 className="text-blue-400 font-semibold mb-2">💡 Dato curioso</h5>
                  <p className="text-gray-300 text-sm">
                    {selectedPlanet.id === 'venus' && 'Venus rota hacia atrás, por lo que el Sol sale por el oeste.'}
                    {selectedPlanet.id === 'mars' && 'Marte tiene las montañas más altas del Sistema Solar, incluyendo el Olympus Mons.'}
                    {selectedPlanet.id === 'jupiter' && 'La Gran Mancha Roja de Júpiter es una tormenta más grande que la Tierra.'}
                    {selectedPlanet.id === 'saturn' && 'Saturno es menos denso que el agua, ¡flotaría en un océano gigante!'}
                    {selectedPlanet.id === 'earth' && 'La Tierra es el único planeta conocido que alberga vida.'}
                    {selectedPlanet.id === 'mercury' && 'Mercurio no tiene atmósfera, por lo que no hay viento ni clima.'}
                  </p>
                </div>
              </Card>
            ) : (
              <Card className="p-6 text-center">
                <div className="text-4xl mb-4">🪐</div>
                <h3 className="text-xl font-bold text-white mb-2">Selecciona un planeta</h3>
                <p className="text-gray-300 text-sm">
                  Haz clic en cualquier planeta del sistema solar para explorar información detallada.
                </p>
              </Card>
            )}
            
            {/* Datos del sistema solar */}
            <Card className="p-4">
              <h4 className="font-semibold text-white mb-3">📊 Datos del Sistema Solar</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Planetas:</span>
                  <span className="text-white ml-2">8</span>
                </div>
                <div>
                  <span className="text-gray-400">Lunas totales:</span>
                  <span className="text-white ml-2">290+</span>
                </div>
                <div>
                  <span className="text-gray-400">Edad:</span>
                  <span className="text-white ml-2">4.6 mil millones años</span>
                </div>
                <div>
                  <span className="text-gray-400">Planeta más grande:</span>
                  <span className="text-white ml-2">Júpiter</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-lg">
            🌌 Cada planeta cuenta una historia única de la formación de nuestro sistema solar.
          </p>
        </div>
      </Container>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}