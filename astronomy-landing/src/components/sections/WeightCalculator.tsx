'use client'

import React, { useState } from 'react'

interface Planet {
  name: string
  gravity: number
  emoji: string
  facts: string[]
  color: string
}

const planets: Planet[] = [
  {
    name: 'Mercurio',
    gravity: 0.378,
    emoji: '☿️',
    facts: ['El día más caliente llega a 427°C', 'No tiene atmósfera'],
    color: 'from-gray-400 to-gray-600'
  },
  {
    name: 'Venus',
    gravity: 0.907,
    emoji: '♀️',
    facts: ['La presión es 92 veces mayor que la Tierra', 'Llueve ácido sulfúrico'],
    color: 'from-yellow-400 to-orange-500'
  },
  {
    name: 'Marte',
    gravity: 0.377,
    emoji: '♂️',
    facts: ['Un día dura 24.6 horas terrestres', 'Tiene las tormentas de polvo más grandes'],
    color: 'from-red-400 to-red-600'
  },
  {
    name: 'Júpiter',
    gravity: 2.36,
    emoji: '♃',
    facts: ['Es más masivo que todos los planetas juntos', 'Tiene más de 80 lunas'],
    color: 'from-orange-400 to-yellow-600'
  },
  {
    name: 'Saturno',
    gravity: 0.916,
    emoji: '♄',
    facts: ['Sus anillos están hechos de hielo y roca', 'Podría flotar en agua'],
    color: 'from-yellow-300 to-yellow-500'
  },
  {
    name: 'Urano',
    gravity: 0.889,
    emoji: '♅',
    facts: ['Rota de lado como una pelota', 'Sus anillos son verticales'],
    color: 'from-cyan-400 to-blue-500'
  },
  {
    name: 'Neptuno',
    gravity: 1.13,
    emoji: '♆',
    facts: ['Tiene los vientos más rápidos del sistema solar', 'Llueven diamantes'],
    color: 'from-blue-500 to-indigo-600'
  },
  {
    name: 'Luna',
    gravity: 0.166,
    emoji: '🌙',
    facts: ['Los astronautas del Apollo saltaban muy alto', 'No tiene atmósfera'],
    color: 'from-gray-300 to-gray-500'
  },
  {
    name: 'Sol',
    gravity: 27.01,
    emoji: '☉',
    facts: ['Te aplastaría instantáneamente', 'Su gravedad mantiene todo el sistema unido'],
    color: 'from-yellow-400 to-orange-500'
  }
]

export default function WeightCalculator() {
  const [earthWeight, setEarthWeight] = useState<number>(70)
  const [selectedPlanet, setSelectedPlanet] = useState<Planet>(planets[0])

  const calculateWeight = (planet: Planet) => {
    return (earthWeight * planet.gravity).toFixed(1)
  }

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        ⚖️ Calculadora de Peso Intergaláctico
      </h3>
      
      <div className="mb-6">
        <label className="block text-white text-sm mb-2">
          Tu peso en la Tierra: {earthWeight} kg
        </label>
        <input
          type="range"
          min="10"
          max="200"
          value={earthWeight}
          onChange={(e) => setEarthWeight(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {planets.map((planet) => (
          <button
            key={planet.name}
            onClick={() => setSelectedPlanet(planet)}
            className={`p-3 rounded-lg transition-all duration-300 ${
              selectedPlanet.name === planet.name
                ? `bg-gradient-to-br ${planet.color} border border-white/30`
                : 'bg-white/5 hover:bg-white/10 border border-white/10'
            }`}
          >
            <div className="text-2xl mb-1">{planet.emoji}</div>
            <div className="text-sm text-white font-semibold">{planet.name}</div>
            <div className="text-xs text-gray-300">{calculateWeight(planet)} kg</div>
          </button>
        ))}
      </div>

      <div className={`bg-gradient-to-br ${selectedPlanet.color} rounded-lg p-6 text-center mb-4`}>
        <div className="text-4xl mb-2">{selectedPlanet.emoji}</div>
        <h4 className="text-2xl font-bold text-white mb-2">{selectedPlanet.name}</h4>
        <div className="text-3xl font-bold text-white mb-4">
          {calculateWeight(selectedPlanet)} kg
        </div>
        <div className="text-sm text-white/80">
          Gravedad: {selectedPlanet.gravity}g
        </div>
      </div>

      <div className="bg-white/10 rounded-lg p-4">
        <h5 className="font-semibold text-white mb-2">📚 Datos Curiosos:</h5>
        <ul className="space-y-1">
          {selectedPlanet.facts.map((fact, i) => (
            <li key={i} className="text-gray-300 text-sm flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
