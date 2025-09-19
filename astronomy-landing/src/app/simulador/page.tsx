'use client'

import React, { useState, useEffect } from 'react'
import Container from '@/components/ui/Container'

interface SpaceDestination {
  name: string
  distance: number // en millones de km
  travelTime: {
    chemical: number // en años
    ion: number
    nuclear: number
  }
  fuelCost: number // en millones de USD
  difficulty: 'Fácil' | 'Moderado' | 'Difícil' | 'Extremo'
  description: string
  facts: string[]
  emoji: string
}

const destinations: SpaceDestination[] = [
  {
    name: 'Luna',
    distance: 0.384,
    travelTime: { chemical: 0.01, ion: 0.05, nuclear: 0.005 },
    fuelCost: 1.5,
    difficulty: 'Fácil',
    description: 'Nuestro satélite natural, ya visitado por los humanos.',
    emoji: '🌙',
    facts: [
      'Apollo 11 tardó 4 días en llegar',
      'Tiene 1/6 de la gravedad de la Tierra',
      'No tiene atmósfera'
    ]
  },
  {
    name: 'Marte',
    distance: 225,
    travelTime: { chemical: 0.8, ion: 1.5, nuclear: 0.3 },
    fuelCost: 50,
    difficulty: 'Moderado',
    description: 'El planeta rojo, objetivo de futuras misiones tripuladas.',
    emoji: '🔴',
    facts: [
      'Un día marciano dura 24.6 horas',
      'Tiene dos lunas: Fobos y Deimos',
      'Contiene evidencia de agua antigua'
    ]
  },
  {
    name: 'Estación Espacial Internacional',
    distance: 0.0004,
    travelTime: { chemical: 0.002, ion: 0.01, nuclear: 0.001 },
    fuelCost: 0.1,
    difficulty: 'Fácil',
    description: 'Laboratorio en órbita terrestre baja.',
    emoji: '🛰️',
    facts: [
      'Orbita a 408 km de altura',
      'Da una vuelta a la Tierra cada 90 minutos',
      'Alberga astronautas permanentemente'
    ]
  },
  {
    name: 'Europa (Luna de Júpiter)',
    distance: 628,
    travelTime: { chemical: 6, ion: 8, nuclear: 2 },
    fuelCost: 200,
    difficulty: 'Difícil',
    description: 'Luna helada con océano subterráneo que podría albergar vida.',
    emoji: '🧊',
    facts: [
      'Tiene más agua que todos los océanos de la Tierra',
      'Su superficie está cubierta de hielo',
      'Podría tener vida microbiana'
    ]
  },
  {
    name: 'Titán (Luna de Saturno)',
    distance: 1200,
    travelTime: { chemical: 7, ion: 10, nuclear: 3 },
    fuelCost: 350,
    difficulty: 'Difícil',
    description: 'Luna con atmósfera densa y lagos de metano.',
    emoji: '🪐',
    facts: [
      'Tiene una atmósfera más densa que la Tierra',
      'Llueve metano líquido',
      'Tiene lagos y ríos de hidrocarburos'
    ]
  },
  {
    name: 'Próxima Centauri b',
    distance: 40000000,
    travelTime: { chemical: 73000, ion: 18000, nuclear: 100 },
    fuelCost: 1000000,
    difficulty: 'Extremo',
    description: 'El exoplaneta habitable más cercano a la Tierra.',
    emoji: '🌍',
    facts: [
      'Está en la zona habitable de su estrella',
      'Probablemente tiene mareas extremas',
      'Es el objetivo de Project Breakthrough Starshot'
    ]
  }
]

const propulsionTypes = [
  {
    type: 'chemical',
    name: 'Cohetes Químicos',
    description: 'Tecnología actual usada en misiones espaciales',
    speed: '11 km/s',
    pros: ['Tecnología probada', 'Alta potencia inicial'],
    cons: ['Muy ineficiente', 'Requiere mucho combustible']
  },
  {
    type: 'ion',
    name: 'Propulsión Iónica',
    description: 'Motores eléctricos de alta eficiencia',
    speed: '90 km/s',
    pros: ['Muy eficiente', 'Larga duración'],
    cons: ['Aceleración muy lenta', 'Requiere energía solar/nuclear']
  },
  {
    type: 'nuclear',
    name: 'Propulsión Nuclear',
    description: 'Motores nucleares del futuro',
    speed: '100+ km/s',
    pros: ['Muy rápido', 'Alta potencia'],
    cons: ['Tecnología en desarrollo', 'Riesgos de radiación']
  }
]

export default function SimuladorPage() {
  const [selectedDestination, setSelectedDestination] = useState<SpaceDestination>(destinations[0])
  const [selectedPropulsion, setSelectedPropulsion] = useState<'chemical' | 'ion' | 'nuclear'>('chemical')
  const [crewSize, setCrewSize] = useState(4)
  const [cargoWeight, setCargoWeight] = useState(1000) // kg
  const [isCalculating, setIsCalculating] = useState(false)
  const [missionResults, setMissionResults] = useState<any>(null)

  const calculateMission = () => {
    setIsCalculating(true)
    
    setTimeout(() => {
      const baseTravelTime = selectedDestination.travelTime[selectedPropulsion]
      const crewFactor = 1 + (crewSize - 1) * 0.1
      const cargoFactor = 1 + (cargoWeight - 1000) / 10000
      
      const totalTravelTime = baseTravelTime * crewFactor * cargoFactor
      const totalFuelCost = selectedDestination.fuelCost * crewFactor * cargoFactor
      const totalMissionCost = totalFuelCost * 2.5 // includes other costs
      
      const riskFactors = {
        'Fácil': 0.02,
        'Moderado': 0.15,
        'Difícil': 0.35,
        'Extremo': 0.75
      }
      
      const successProbability = Math.max(0.1, 1 - riskFactors[selectedDestination.difficulty] - (crewSize * 0.02))
      
      setMissionResults({
        travelTime: totalTravelTime,
        fuelCost: totalFuelCost,
        totalCost: totalMissionCost,
        successProbability: successProbability * 100,
        roundTripTime: totalTravelTime * 2.2
      })
      setIsCalculating(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
      <Container>
        <div className="py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              🚀 Simulador de Viajes Espaciales
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Planifica tu misión espacial y descubre cuánto tiempo, dinero y riesgo implica viajar a destinos cósmicos fascinantes.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mission Planning */}
            <div className="space-y-6">
              {/* Destination Selection */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <h3 className="text-2xl font-bold text-white mb-4">🎯 Selecciona tu Destino</h3>
                <div className="grid gap-3">
                  {destinations.map((destination) => (
                    <button
                      key={destination.name}
                      onClick={() => setSelectedDestination(destination)}
                      className={`text-left p-4 rounded-lg transition-all duration-300 ${
                        selectedDestination.name === destination.name
                          ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/50'
                          : 'bg-white/5 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl mr-3">{destination.emoji}</span>
                          <span className="font-semibold text-white">{destination.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-400">{destination.distance}M km</div>
                          <div className={`text-xs px-2 py-1 rounded ${
                            destination.difficulty === 'Fácil' ? 'bg-green-500/20 text-green-400' :
                            destination.difficulty === 'Moderado' ? 'bg-yellow-500/20 text-yellow-400' :
                            destination.difficulty === 'Difícil' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {destination.difficulty}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mt-2">{destination.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Propulsion System */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <h3 className="text-2xl font-bold text-white mb-4">⚡ Sistema de Propulsión</h3>
                <div className="space-y-3">
                  {propulsionTypes.map((propulsion) => (
                    <button
                      key={propulsion.type}
                      onClick={() => setSelectedPropulsion(propulsion.type as any)}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                        selectedPropulsion === propulsion.type
                          ? 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border border-blue-400/50'
                          : 'bg-white/5 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      <div className="font-semibold text-white">{propulsion.name}</div>
                      <div className="text-sm text-gray-400 mb-2">{propulsion.description}</div>
                      <div className="text-xs text-gray-500">Velocidad máxima: {propulsion.speed}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mission Parameters */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <h3 className="text-2xl font-bold text-white mb-4">⚙️ Parámetros de la Misión</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white text-sm mb-2">
                      Tamaño de la tripulación: {crewSize} personas
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={crewSize}
                      onChange={(e) => setCrewSize(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-2">
                      Peso de la carga: {cargoWeight.toLocaleString()} kg
                    </label>
                    <input
                      type="range"
                      min="500"
                      max="50000"
                      step="500"
                      value={cargoWeight}
                      onChange={(e) => setCargoWeight(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={calculateMission}
                disabled={isCalculating}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100"
              >
                {isCalculating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                    Calculando misión...
                  </div>
                ) : (
                  '🧮 Calcular Misión'
                )}
              </button>
            </div>

            {/* Results and Info */}
            <div className="space-y-6">
              {/* Destination Info */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{selectedDestination.emoji}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedDestination.name}</h3>
                    <p className="text-gray-400">Distancia: {selectedDestination.distance} millones de km</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{selectedDestination.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Datos fascinantes:</h4>
                  {selectedDestination.facts.map((fact, i) => (
                    <p key={i} className="text-sm text-gray-300 flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      {fact}
                    </p>
                  ))}
                </div>
              </div>

              {/* Mission Results */}
              {missionResults && (
                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-md rounded-xl border border-green-400/30 p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">📊 Resultados de la Misión</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-400">
                        {missionResults.travelTime < 1 
                          ? `${(missionResults.travelTime * 365).toFixed(0)} días`
                          : `${missionResults.travelTime.toFixed(1)} años`
                        }
                      </div>
                      <div className="text-sm text-gray-400">Tiempo de viaje</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-400">
                        ${missionResults.totalCost.toFixed(0)}M
                      </div>
                      <div className="text-sm text-gray-400">Costo total</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-2xl font-bold text-purple-400">
                        {missionResults.successProbability.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-400">Probabilidad de éxito</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-2xl font-bold text-yellow-400">
                        {missionResults.roundTripTime < 1 
                          ? `${(missionResults.roundTripTime * 365).toFixed(0)} días`
                          : `${missionResults.roundTripTime.toFixed(1)} años`
                        }
                      </div>
                      <div className="text-sm text-gray-400">Viaje redondo</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white/5 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">💡 Análisis de la Misión</h4>
                    <p className="text-gray-300 text-sm">
                      {missionResults.successProbability > 80 && "¡Excelente! Esta misión tiene altas probabilidades de éxito."}
                      {missionResults.successProbability > 60 && missionResults.successProbability <= 80 && "Misión viable con riesgos moderados. Se recomienda tecnología adicional."}
                      {missionResults.successProbability > 40 && missionResults.successProbability <= 60 && "Misión arriesgada. Requiere tecnología avanzada y preparación extensa."}
                      {missionResults.successProbability <= 40 && "Misión extremadamente peligrosa. Solo para los más aventureros del espacio."}
                    </p>
                  </div>
                </div>
              )}

              {/* Propulsion Info */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-4">🔧 Sistema Seleccionado</h3>
                {propulsionTypes.find(p => p.type === selectedPropulsion) && (
                  <div>
                    <h4 className="font-semibold text-white">
                      {propulsionTypes.find(p => p.type === selectedPropulsion)!.name}
                    </h4>
                    <p className="text-gray-400 text-sm mb-3">
                      {propulsionTypes.find(p => p.type === selectedPropulsion)!.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-green-400 text-sm font-semibold mb-1">Ventajas:</h5>
                        <ul className="text-xs text-gray-300">
                          {propulsionTypes.find(p => p.type === selectedPropulsion)!.pros.map((pro, i) => (
                            <li key={i}>• {pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-red-400 text-sm font-semibold mb-1">Desventajas:</h5>
                        <ul className="text-xs text-gray-300">
                          {propulsionTypes.find(p => p.type === selectedPropulsion)!.cons.map((con, i) => (
                            <li key={i}>• {con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
