'use client'

import React, { useState } from 'react'
import Container from '@/components/ui/Container'

interface PlanetData {
  name: string
  emoji: string
  diameter: number // km
  mass: number // relative to Earth
  gravity: number // relative to Earth
  temperature: { min: number; max: number } // Celsius
  dayLength: number // hours
  yearLength: number // Earth days
  moons: number
  atmosphere: string
  composition: string[]
  distanceFromSun: number // AU
  funFacts: string[]
  color: string
}

const planetsData: PlanetData[] = [
  {
    name: 'Tierra',
    emoji: '🌍',
    diameter: 12756,
    mass: 1,
    gravity: 1,
    temperature: { min: -89, max: 58 },
    dayLength: 24,
    yearLength: 365,
    moons: 1,
    atmosphere: '78% N₂, 21% O₂',
    composition: ['Hierro', 'Níquel', 'Silicatos'],
    distanceFromSun: 1,
    color: 'from-blue-400 to-green-500',
    funFacts: [
      'El único planeta conocido con vida',
      'La superficie está cubierta 71% por agua',
      'Tiene un campo magnético protector'
    ]
  },
  {
    name: 'Marte',
    emoji: '🔴',
    diameter: 6792,
    mass: 0.107,
    gravity: 0.38,
    temperature: { min: -125, max: 20 },
    dayLength: 24.6,
    yearLength: 687,
    moons: 2,
    atmosphere: '95% CO₂, 3% N₂',
    composition: ['Hierro oxidado', 'Silicatos', 'Hielo'],
    distanceFromSun: 1.52,
    color: 'from-red-400 to-orange-600',
    funFacts: [
      'Tiene el volcán más grande del sistema solar',
      'Sus días son casi iguales a los de la Tierra',
      'Alguna vez tuvo océanos'
    ]
  },
  {
    name: 'Júpiter',
    emoji: '🟤',
    diameter: 142984,
    mass: 318,
    gravity: 2.36,
    temperature: { min: -145, max: -108 },
    dayLength: 9.9,
    yearLength: 4333,
    moons: 95,
    atmosphere: '89% H₂, 10% He',
    composition: ['Hidrógeno', 'Helio', 'Metano'],
    distanceFromSun: 5.2,
    color: 'from-yellow-600 to-orange-700',
    funFacts: [
      'Es más masivo que todos los planetas juntos',
      'Su Gran Mancha Roja es una tormenta gigante',
      'Protege a la Tierra de asteroides'
    ]
  },
  {
    name: 'Venus',
    emoji: '🟡',
    diameter: 12104,
    mass: 0.815,
    gravity: 0.91,
    temperature: { min: 462, max: 462 },
    dayLength: 5832,
    yearLength: 225,
    moons: 0,
    atmosphere: '96% CO₂, 3.5% N₂',
    composition: ['Hierro', 'Níquel', 'Silicatos'],
    distanceFromSun: 0.72,
    color: 'from-yellow-400 to-orange-500',
    funFacts: [
      'Es el planeta más caliente del sistema solar',
      'Rota al revés (retrogrado)',
      'Un día es más largo que un año'
    ]
  },
  {
    name: 'Saturno',
    emoji: '🪐',
    diameter: 120536,
    mass: 95,
    gravity: 0.92,
    temperature: { min: -178, max: -139 },
    dayLength: 10.7,
    yearLength: 10759,
    moons: 146,
    atmosphere: '96% H₂, 3% He',
    composition: ['Hidrógeno', 'Helio'],
    distanceFromSun: 9.5,
    color: 'from-yellow-300 to-yellow-600',
    funFacts: [
      'Podría flotar en agua',
      'Sus anillos están hechos de hielo',
      'Tiene hexágonos en sus polos'
    ]
  },
  {
    name: 'Neptuno',
    emoji: '🔵',
    diameter: 49528,
    mass: 17,
    gravity: 1.13,
    temperature: { min: -218, max: -200 },
    dayLength: 16.1,
    yearLength: 60190,
    moons: 16,
    atmosphere: '80% H₂, 19% He, 1% CH₄',
    composition: ['Hidrógeno', 'Helio', 'Metano', 'Hielo'],
    distanceFromSun: 30,
    color: 'from-blue-500 to-indigo-600',
    funFacts: [
      'Tiene los vientos más rápidos',
      'Llueven diamantes en su interior',
      'Fue descubierto por cálculos matemáticos'
    ]
  }
]

export default function PlanetComparison() {
  const [selectedPlanets, setSelectedPlanets] = useState<PlanetData[]>([planetsData[0], planetsData[2]])
  const [comparisonMetric, setComparisonMetric] = useState<'size' | 'mass' | 'temperature' | 'distance'>('size')

  const selectPlanet = (planet: PlanetData, index: number) => {
    const newSelection = [...selectedPlanets]
    newSelection[index] = planet
    setSelectedPlanets(newSelection)
  }

  const getComparisonValue = (planet: PlanetData, metric: string) => {
    switch (metric) {
      case 'size': return planet.diameter
      case 'mass': return planet.mass
      case 'temperature': return (planet.temperature.min + planet.temperature.max) / 2
      case 'distance': return planet.distanceFromSun
      default: return 0
    }
  }

  const getComparisonUnit = (metric: string) => {
    switch (metric) {
      case 'size': return 'km'
      case 'mass': return '× Tierra'
      case 'temperature': return '°C'
      case 'distance': return 'UA'
      default: return ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
      <Container>
        <div className="py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              ⚖️ Comparador de Planetas
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Compara las características de diferentes planetas lado a lado y descubre las increíbles diferencias del cosmos.
            </p>
          </div>

          {/* Planet Selectors */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[0, 1].map((selectorIndex) => (
              <div key={selectorIndex} className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Planeta {selectorIndex + 1}
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {planetsData.map((planet) => (
                    <button
                      key={planet.name}
                      onClick={() => selectPlanet(planet, selectorIndex)}
                      className={`p-3 rounded-lg transition-all duration-300 ${
                        selectedPlanets[selectorIndex]?.name === planet.name
                          ? `bg-gradient-to-br ${planet.color} border border-white/30`
                          : 'bg-white/5 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      <div className="text-2xl mb-1">{planet.emoji}</div>
                      <div className="text-xs text-white font-semibold">{planet.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Metrics */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">📊 Comparar por:</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { key: 'size', label: 'Tamaño', emoji: '📏' },
                { key: 'mass', label: 'Masa', emoji: '⚖️' },
                { key: 'temperature', label: 'Temperatura', emoji: '🌡️' },
                { key: 'distance', label: 'Distancia del Sol', emoji: '☀️' }
              ].map((metric) => (
                <button
                  key={metric.key}
                  onClick={() => setComparisonMetric(metric.key as any)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    comparisonMetric === metric.key
                      ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/50'
                      : 'bg-white/5 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <span className="mr-2">{metric.emoji}</span>
                  {metric.label}
                </button>
              ))}
            </div>
          </div>

          {/* Comparison Results */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {selectedPlanets.map((planet, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${planet.color} rounded-xl border border-white/20 p-8`}
              >
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{planet.emoji}</div>
                  <h2 className="text-3xl font-bold text-white">{planet.name}</h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-black/20 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-3">📊 Estadísticas</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-300">Diámetro:</span>
                        <div className="text-white font-semibold">{planet.diameter.toLocaleString()} km</div>
                      </div>
                      <div>
                        <span className="text-gray-300">Masa:</span>
                        <div className="text-white font-semibold">{planet.mass}× Tierra</div>
                      </div>
                      <div>
                        <span className="text-gray-300">Gravedad:</span>
                        <div className="text-white font-semibold">{planet.gravity}g</div>
                      </div>
                      <div>
                        <span className="text-gray-300">Lunas:</span>
                        <div className="text-white font-semibold">{planet.moons}</div>
                      </div>
                      <div>
                        <span className="text-gray-300">Día:</span>
                        <div className="text-white font-semibold">{planet.dayLength}h</div>
                      </div>
                      <div>
                        <span className="text-gray-300">Año:</span>
                        <div className="text-white font-semibold">{planet.yearLength}d</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/20 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-3">🌡️ Ambiente</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-300">Temperatura:</span>
                        <div className="text-white">{planet.temperature.min}°C a {planet.temperature.max}°C</div>
                      </div>
                      <div>
                        <span className="text-gray-300">Atmósfera:</span>
                        <div className="text-white">{planet.atmosphere}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/20 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-3">💡 Datos Curiosos</h4>
                    <ul className="space-y-1">
                      {planet.funFacts.map((fact, i) => (
                        <li key={i} className="text-gray-300 text-sm flex items-start">
                          <span className="text-yellow-400 mr-2">•</span>
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Visual Comparison */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              📊 Comparación Visual: {getComparisonUnit(comparisonMetric)}
            </h3>
            
            <div className="space-y-6">
              {selectedPlanets.map((planet, index) => {
                const value = getComparisonValue(planet, comparisonMetric)
                const maxValue = Math.max(...selectedPlanets.map(p => getComparisonValue(p, comparisonMetric)))
                const percentage = (value / maxValue) * 100
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{planet.emoji}</span>
                        <span className="text-white font-semibold">{planet.name}</span>
                      </div>
                      <span className="text-white font-bold">
                        {value.toLocaleString()} {getComparisonUnit(comparisonMetric)}
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-4">
                      <div 
                        className={`bg-gradient-to-r ${planet.color} h-4 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                La barra más larga representa el valor más alto en la comparación actual.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
