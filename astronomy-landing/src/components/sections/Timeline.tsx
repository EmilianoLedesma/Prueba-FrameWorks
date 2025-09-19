import React from 'react'
import Container from '../ui/Container'
import Card from '../ui/Card'
import { Mission } from '@/types'

const missions: Mission[] = [
  {
    id: 'sputnik',
    name: 'Sputnik 1',
    year: 1957,
    description: 'El primer satélite artificial lanzado al espacio, marcando el inicio de la era espacial.',
    agency: 'Unión Soviética',
    status: 'completed'
  },
  {
    id: 'apollo11',
    name: 'Apollo 11',
    year: 1969,
    description: 'Primera misión tripulada que logró llegar a la Luna y regresar a la Tierra.',
    agency: 'NASA',
    status: 'completed'
  },
  {
    id: 'voyager1',
    name: 'Voyager 1',
    year: 1977,
    description: 'Sonda espacial que estudió Júpiter y Saturno, ahora en el espacio interestelar.',
    agency: 'NASA',
    status: 'ongoing'
  },
  {
    id: 'hubble',
    name: 'Telescopio Hubble',
    year: 1990,
    description: 'Telescopio espacial que ha revolucionado nuestra comprensión del universo.',
    agency: 'NASA/ESA',
    status: 'ongoing'
  },
  {
    id: 'iss',
    name: 'Estación Espacial Internacional',
    year: 1998,
    description: 'Laboratorio orbital donde viven y trabajan astronautas de todo el mundo.',
    agency: 'Internacional',
    status: 'ongoing'
  },
  {
    id: 'perseverance',
    name: 'Mars Perseverance',
    year: 2021,
    description: 'Rover que busca signos de vida pasada en Marte y recolecta muestras.',
    agency: 'NASA',
    status: 'ongoing'
  },
  {
    id: 'artemis',
    name: 'Programa Artemis',
    year: 2025,
    description: 'Misión para regresar humanos a la Luna y establecer una base lunar.',
    agency: 'NASA',
    status: 'planned'
  },
  {
    id: 'mars-mission',
    name: 'Misión Tripulada a Marte',
    year: 2030,
    description: 'Ambiciosa misión para enviar los primeros humanos al planeta rojo.',
    agency: 'SpaceX/NASA',
    status: 'planned'
  }
]

export default function Timeline() {
  const getStatusColor = (status: Mission['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'ongoing': return 'bg-blue-500'
      case 'planned': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: Mission['status']) => {
    switch (status) {
      case 'completed': return 'Completada'
      case 'ongoing': return 'En curso'
      case 'planned': return 'Planificada'
      default: return 'Desconocido'
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-purple-900/20 to-blue-900/20">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Historia de la Exploración Espacial
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Desde los primeros pasos en el espacio hasta las misiones futuras hacia Marte.
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
          
          <div className="space-y-12">
            {missions.map((mission, index) => (
              <div key={mission.id} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}>
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <Card hover className="group cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {mission.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(mission.status)} text-white`}>
                        {getStatusText(mission.status)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-2xl font-bold text-yellow-400">{mission.year}</span>
                      <span className="text-sm text-gray-400">{mission.agency}</span>
                    </div>
                    
                    <p className="text-gray-300 text-sm">
                      {mission.description}
                    </p>
                  </Card>
                </div>
                
                <div className="relative z-10 w-6 h-6 bg-white rounded-full border-4 border-blue-500 my-4 md:my-0"></div>
                
                <div className="w-full md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-16">
          <p className="text-gray-400 text-lg">
            El futuro de la exploración espacial está lleno de posibilidades infinitas.
          </p>
        </div>
      </Container>
    </section>
  )
}