'use client'

import React, { useState, useEffect } from 'react'
import Container from '../ui/Container'
import Card from '../ui/Card'

interface CelestialBody {
  id: string
  name: string
  type: 'planet' | 'moon' | 'star'
  distanceFromSun: number // en millones de km
  radius: number // en km
  color: string
  description: string
  funFact: string
}

const celestialBodies: CelestialBody[] = [
  {
    id: 'sun',
    name: 'Sol',
    type: 'star',
    distanceFromSun: 0,
    radius: 696340,
    color: '#FDB813',
    description: 'Nuestra estrella madre, fuente de vida en la Tierra.',
    funFact: 'El Sol contiene 99.86% de toda la masa del Sistema Solar.'
  },
  {
    id: 'mercury',
    name: 'Mercurio',
    type: 'planet',
    distanceFromSun: 57.9,
    radius: 2440,
    color: '#8C7853',
    description: 'El planeta más cercano al Sol.',
    funFact: 'Un día en Mercurio dura 59 días terrestres.'
  },
  {
    id: 'venus',
    name: 'Venus',
    type: 'planet',
    distanceFromSun: 108.2,
    radius: 6052,
    color: '#FFC649',
    description: 'El planeta más caliente del Sistema Solar.',
    funFact: 'Venus rota en dirección opuesta a la mayoría de planetas.'
  },
  {
    id: 'earth',
    name: 'Tierra',
    type: 'planet',
    distanceFromSun: 149.6,
    radius: 6371,
    color: '#6B93D6',
    description: 'Nuestro hogar, el único planeta conocido con vida.',
    funFact: 'La Tierra es el planeta más denso del Sistema Solar.'
  },
  {
    id: 'mars',
    name: 'Marte',
    type: 'planet',
    distanceFromSun: 227.9,
    radius: 3390,
    color: '#CD5C5C',
    description: 'El planeta rojo, objetivo de futuras misiones tripuladas.',
    funFact: 'Marte tiene las montañas más altas del Sistema Solar.'
  },
  {
    id: 'jupiter',
    name: 'Júpiter',
    type: 'planet',
    distanceFromSun: 778.5,
    radius: 69911,
    color: '#D8CA9D',
    description: 'El gigante gaseoso más grande del Sistema Solar.',
    funFact: 'Júpiter tiene más de 80 lunas conocidas.'
  },
  {
    id: 'saturn',
    name: 'Saturno',
    type: 'planet',
    distanceFromSun: 1432,
    radius: 58232,
    color: '#FAD5A5',
    description: 'Famoso por sus espectaculares anillos.',
    funFact: 'Saturno es menos denso que el agua.'
  },
  {
    id: 'uranus',
    name: 'Urano',
    type: 'planet',
    distanceFromSun: 2867,
    radius: 25362,
    color: '#4FD0E3',
    description: 'Un gigante de hielo que rota de lado.',
    funFact: 'Urano tiene anillos verticales en lugar de horizontales.'
  },
  {
    id: 'neptune',
    name: 'Neptuno',
    type: 'planet',
    distanceFromSun: 4515,
    radius: 24622,
    color: '#4B70DD',
    description: 'El planeta más lejano y ventoso.',
    funFact: 'Los vientos en Neptuno pueden alcanzar 2,100 km/h.'
  },
  {
    id: 'moon',
    name: 'Luna',
    type: 'moon',
    distanceFromSun: 149.6, // Aproximadamente igual a la Tierra
    radius: 1737,
    color: '#C0C0C0',
    description: 'El único satélite natural de la Tierra.',
    funFact: 'La Luna se aleja de la Tierra 3.8 cm cada año.'
  }
]

interface TravelOption {
  name: string
  speed: number // km/h
  description: string
  color: string
}

const travelOptions: TravelOption[] = [
  {
    name: 'Caminando',
    speed: 5,
    description: 'Velocidad promedio humana',
    color: '#10B981'
  },
  {
    name: 'Automóvil',
    speed: 100,
    description: 'Velocidad en autopista',
    color: '#3B82F6'
  },
  {
    name: 'Avión Comercial',
    speed: 900,
    description: 'Boeing 737',
    color: '#8B5CF6'
  },
  {
    name: 'Cohete Apollo',
    speed: 11000,
    description: 'Velocidad máxima Apollo 11',
    color: '#F59E0B'
  },
  {
    name: 'Voyager 1',
    speed: 61000,
    description: 'Sonda más rápida actualmente',
    color: '#EF4444'
  },
  {
    name: 'Velocidad de la Luz',
    speed: 1079252848800, // 300,000 km/s convertido a km/h
    description: 'Límite universal de velocidad',
    color: '#EC4899'
  }
]

interface CalculationResult {
  distance: number
  timeInHours: number
  timeInSeconds: number
  timeInMinutes: number
  timeInDays: number
  timeInYears: number
  fuelCost: number
}

export default function SpaceCalculator() {
  const [fromBody, setFromBody] = useState<CelestialBody>(celestialBodies[3]) // Tierra
  const [toBody, setToBody] = useState<CelestialBody>(celestialBodies[4]) // Marte
  const [selectedTravel, setSelectedTravel] = useState<TravelOption>(travelOptions[3]) // Cohete Apollo
  const [isCalculating, setIsCalculating] = useState(false)
  const [result, setResult] = useState<CalculationResult | null>(null)

  const calculateDistance = React.useCallback(() => {
    setIsCalculating(true)
    
    setTimeout(() => {
      const distance = Math.abs(toBody.distanceFromSun - fromBody.distanceFromSun) * 1000000 // convertir a km
      const timeInHours = distance / selectedTravel.speed
      
      const seconds = timeInHours * 3600
      const minutes = timeInHours * 60
      const days = timeInHours / 24
      const years = days / 365.25
      
      setResult({
        distance,
        timeInHours,
        timeInSeconds: seconds,
        timeInMinutes: minutes,
        timeInDays: days,
        timeInYears: years,
        fuelCost: distance * 0.001 // Cálculo aproximado
      })
      
      setIsCalculating(false)
    }, 1000)
  }, [fromBody.distanceFromSun, toBody.distanceFromSun, selectedTravel.speed])

  const formatNumber = (num: number): string => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)} billones`
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)} mil millones`
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)} millones`
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)} mil`
    return num.toFixed(2)
  }

  const formatTime = (years: number, days: number, hours: number): string => {
    if (years >= 1) return `${formatNumber(years)} años`
    if (days >= 1) return `${formatNumber(days)} días`
    if (hours >= 1) return `${formatNumber(hours)} horas`
    return `${formatNumber(hours * 60)} minutos`
  }

  useEffect(() => {
    calculateDistance()
  }, [calculateDistance])

  return (
    <section className="py-20 bg-gradient-to-b from-purple-900/20 to-blue-900/30">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Calculadora de Distancias Espaciales
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descubre cuánto tardarías en viajar entre planetas con diferentes métodos de transporte.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Panel de selección */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-white mb-6">Configura tu viaje espacial</h3>
            
            {/* Desde */}
            <div className="mb-6">
              <label className="block text-gray-300 mb-3 font-semibold">Desde:</label>
              <div className="grid grid-cols-2 gap-2">
                {celestialBodies.map((body) => (
                  <button
                    key={body.id}
                    onClick={() => setFromBody(body)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      fromBody.id === body.id
                        ? 'bg-blue-500 text-white border-2 border-blue-400'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: body.color }}
                      />
                      {body.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Hasta */}
            <div className="mb-6">
              <label className="block text-gray-300 mb-3 font-semibold">Hasta:</label>
              <div className="grid grid-cols-2 gap-2">
                {celestialBodies.map((body) => (
                  <button
                    key={body.id}
                    onClick={() => setToBody(body)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      toBody.id === body.id
                        ? 'bg-green-500 text-white border-2 border-green-400'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: body.color }}
                      />
                      {body.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Método de viaje */}
            <div className="mb-6">
              <label className="block text-gray-300 mb-3 font-semibold">Método de viaje:</label>
              <div className="space-y-2">
                {travelOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => setSelectedTravel(option)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedTravel.name === option.name
                        ? 'border-2 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20 border-2 border-transparent'
                    }`}
                    style={{
                      backgroundColor: selectedTravel.name === option.name ? option.color : undefined,
                      borderColor: selectedTravel.name === option.name ? option.color : undefined
                    }}
                  >
                    <div className="font-medium">{option.name}</div>
                    <div className="text-sm opacity-80">{option.description}</div>
                    <div className="text-xs opacity-60">{formatNumber(option.speed)} km/h</div>
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Resultados */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-white mb-6">Resultados del viaje</h3>
            
            {isCalculating ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p className="text-gray-300 mt-4">Calculando ruta espacial...</p>
              </div>
            ) : result ? (
              <div className="space-y-6">
                {/* Resumen del viaje */}
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: fromBody.color }}
                      />
                      <span className="text-white font-medium">{fromBody.name}</span>
                    </div>
                    <div className="text-2xl">🚀</div>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-medium">{toBody.name}</span>
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: toBody.color }}
                      />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-1">Distancia total</div>
                    <div className="text-2xl font-bold text-white">
                      {formatNumber(result.distance)} km
                    </div>
                  </div>
                </div>

                {/* Tiempo de viaje */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-300 mb-1">Tiempo de viaje con {selectedTravel.name}</div>
                      <div className="text-xl font-bold text-white">
                        {formatTime(result.timeInYears, result.timeInDays, result.timeInHours)}
                      </div>
                    </div>
                  </div>

                  {/* Comparaciones de tiempo */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-white/5 rounded p-3 text-center">
                      <div className="text-gray-400">En segundos</div>
                      <div className="text-white font-medium">{formatNumber(result.timeInSeconds)}</div>
                    </div>
                    <div className="bg-white/5 rounded p-3 text-center">
                      <div className="text-gray-400">En días</div>
                      <div className="text-white font-medium">{formatNumber(result.timeInDays)}</div>
                    </div>
                  </div>
                </div>

                {/* Datos curiosos */}
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">💡 Dato curioso</h4>
                  <p className="text-gray-300 text-sm mb-2">{toBody.funFact}</p>
                  {result.timeInYears > 100 && (
                    <p className="text-gray-300 text-sm">
                      ¡Este viaje tomaría más de {Math.floor(result.timeInYears)} generaciones humanas!
                    </p>
                  )}
                </div>

                {/* Comparación con velocidad de la luz */}
                {selectedTravel.name !== 'Velocidad de la Luz' && (
                  <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
                    <h4 className="text-pink-400 font-semibold mb-2">⚡ A la velocidad de la luz</h4>
                    <p className="text-gray-300 text-sm">
                      Este mismo viaje tomaría solo {formatTime(
                        result.distance / 1079252848800 / 24 / 365.25,
                        result.distance / 1079252848800 / 24,
                        result.distance / 1079252848800
                      )}
                    </p>
                  </div>
                )}
              </div>
            ) : null}
          </Card>
        </div>

        {/* Visualización del sistema solar mejorada */}
        <Card className="p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4 text-center">🌌 Mapa del Sistema Solar</h3>
          <div className="relative h-40 bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-lg overflow-hidden border border-white/10">
            {/* Estrellas de fondo */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>

            {/* Sol en el centro izquierdo */}
            <div className="absolute inset-0 flex items-center">
              <div
                className="absolute z-20"
                style={{ left: '5%', transform: 'translateX(-50%)' }}
                title="Sol"
              >
                <div 
                  className="w-6 h-6 rounded-full bg-yellow-400 animate-pulse"
                  style={{
                    background: 'radial-gradient(circle, #FDB813 0%, #FF8C00 100%)',
                    boxShadow: '0 0 20px #FDB813, 0 0 40px rgba(253, 184, 19, 0.3)'
                  }}
                />
                <div className="absolute top-7 left-1/2 transform -translate-x-1/2 text-xs text-yellow-300 font-semibold whitespace-nowrap">
                  ☀️ Sol
                </div>
              </div>

              {/* Planetas */}
              {celestialBodies.filter(body => body.type !== 'moon').map((body) => {
                // Usar escala logarítmica para mejor distribución visual
                const logDistance = Math.log10(body.distanceFromSun)
                const position = ((logDistance - 1.76) / (3.65 - 1.76)) * 85 + 10 // Escala de 10% a 95%
                const isSelected = body.id === fromBody.id || body.id === toBody.id
                const planetSize = Math.max(6, Math.min(16, Math.log(body.radius) * 1.8))
                
                return (
                  <div
                    key={body.id}
                    className={`absolute transition-all duration-300 z-10 ${isSelected ? 'scale-150' : 'hover:scale-125'}`}
                    style={{
                      left: `${position}%`,
                      transform: 'translateX(-50%)',
                    }}
                    title={`${body.name} - ${body.distanceFromSun}`}
                  >
                    <div
                      className={`rounded-full border-2 ${isSelected ? 'animate-pulse border-white' : 'border-transparent'}`}
                      style={{
                        width: `${planetSize}px`,
                        height: `${planetSize}px`,
                        backgroundColor: body.color,
                        boxShadow: isSelected 
                          ? `0 0 25px ${body.color}, 0 0 50px ${body.color}` 
                          : `0 0 8px ${body.color}`
                      }}
                    />
                    {/* Nombre del planeta */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs text-white font-medium whitespace-nowrap opacity-90">
                      {body.name}
                    </div>
                    
                    {/* Anillos especiales */}
                    {body.id === 'saturn' && (
                      <div 
                        className="absolute rounded-full border border-gray-400 opacity-40"
                        style={{
                          width: `${planetSize * 1.6}px`,
                          height: `${planetSize * 1.6}px`,
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      />
                    )}
                  </div>
                )
              })}
            </div>
            
            {/* Línea de viaje mejorada */}
            {fromBody && toBody && fromBody.id !== toBody.id && (
              <div className="absolute inset-0 flex items-center z-5">
                <div
                  className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 opacity-80 rounded-full animate-pulse"
                  style={{
                    left: `${((Math.log10(fromBody.distanceFromSun) - 1.76) / (3.65 - 1.76)) * 85 + 10}%`,
                    width: `${Math.abs(((Math.log10(toBody.distanceFromSun) - 1.76) / (3.65 - 1.76)) * 85 + 10) - ((Math.log10(fromBody.distanceFromSun) - 1.76) / (3.65 - 1.76)) * 85 - 10}%`,
                    boxShadow: '0 0 10px rgba(147, 51, 234, 0.5)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-ping" />
                </div>
              </div>
            )}

            {/* Información de distancias */}
            <div className="absolute bottom-2 left-2 right-2 flex justify-between text-xs text-gray-400">
              <span>0 UA</span>
              <span>5 UA</span>
              <span>20 UA</span>
              <span>30 UA</span>
            </div>
          </div>
          
          {/* Leyenda */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400 mb-2">
              Representación logarítmica de distancias. 1 UA = 149.6 millones km
            </p>
            <div className="flex justify-center items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span>Origen</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>Destino</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-green-400 rounded"></div>
                <span>Ruta de viaje</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <p className="text-gray-400 text-lg">
            🌌 Las distancias en el espacio son verdaderamente astronómicas.
          </p>
        </div>
      </Container>
    </section>
  )
}