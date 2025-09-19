'use client'

import React, { useState } from 'react'
import Container from '../ui/Container'
import Card from '../ui/Card'
import { Rocket } from '@/types'

const rockets: Rocket[] = [
  {
    id: 'falcon-heavy',
    name: 'Falcon Heavy',
    agency: 'SpaceX',
    height: '70 m',
    diameter: '3.66 m',
    mass: '1,420,788 kg',
    payload: '63,800 kg (LEO)',
    firstFlight: 2018,
    status: 'active',
    description: 'El cohete operacional más potente del mundo, compuesto por tres boosters Falcon 9.',
    achievements: [
      'Primer cohete súper pesado reutilizable',
      'Lanzó el Tesla Roadster al espacio',
      'Carga útil más alta en órbita baja'
    ],
    specs: {
      stages: 2,
      thrust: '22,819 kN',
      fuelType: 'RP-1/LOX'
    }
  },
  {
    id: 'saturn-v',
    name: 'Saturn V',
    agency: 'NASA',
    height: '110.6 m',
    diameter: '10.1 m',
    mass: '2,970,000 kg',
    payload: '48,600 kg (TLI)',
    firstFlight: 1967,
    status: 'retired',
    description: 'El cohete que llevó a los astronautas a la Luna durante el programa Apollo.',
    achievements: [
      'Llevó humanos a la Luna',
      'Cohete más potente completado exitosamente',
      '13 lanzamientos, 12 exitosos'
    ],
    specs: {
      stages: 3,
      thrust: '34,020 kN',
      fuelType: 'RP-1/LOX + LH2/LOX'
    }
  },
  {
    id: 'starship',
    name: 'Starship',
    agency: 'SpaceX',
    height: '120 m',
    diameter: '9 m',
    mass: '5,000,000 kg',
    payload: '100,000+ kg (LEO)',
    firstFlight: 2023,
    status: 'development',
    description: 'Sistema de transporte espacial completamente reutilizable diseñado para misiones a Marte.',
    achievements: [
      'Mayor cohete construido',
      'Completamente reutilizable',
      'Diseñado para colonización de Marte'
    ],
    specs: {
      stages: 2,
      thrust: '74,400 kN',
      fuelType: 'CH4/LOX'
    }
  },
  {
    id: 'artemis-sls',
    name: 'SLS (Artemis)',
    agency: 'NASA',
    height: '98 m',
    diameter: '8.4 m',
    mass: '2,600,000 kg',
    payload: '95,000 kg (LEO)',
    firstFlight: 2022,
    status: 'active',
    description: 'Sistema de lanzamiento espacial para las misiones Artemis de regreso a la Luna.',
    achievements: [
      'Regreso de humanos a la Luna',
      'Cohete más potente de NASA actualmente',
      'Misión Artemis I exitosa'
    ],
    specs: {
      stages: 2,
      thrust: '39,140 kN',
      fuelType: 'LH2/LOX + SRB'
    }
  },
  {
    id: 'new-shepard',
    name: 'New Shepard',
    agency: 'Blue Origin',
    height: '18.3 m',
    diameter: '3.7 m',
    mass: '75,000 kg',
    payload: '6 pasajeros',
    firstFlight: 2015,
    status: 'active',
    description: 'Vehículo suborbital reutilizable para turismo espacial y investigación.',
    achievements: [
      'Primer turismo espacial comercial',
      'Aterrizaje vertical exitoso',
      '100% reutilizable'
    ],
    specs: {
      stages: 1,
      thrust: '490 kN',
      fuelType: 'LH2/LOX'
    }
  },
  {
    id: 'long-march-5',
    name: 'Long March 5',
    agency: 'CNSA (China)',
    height: '57 m',
    diameter: '5 m',
    mass: '869,000 kg',
    payload: '25,000 kg (LEO)',
    firstFlight: 2016,
    status: 'active',
    description: 'Cohete pesado chino utilizado para misiones lunares y a Marte.',
    achievements: [
      'Misión Chang\'e a la Luna',
      'Rover Zhurong a Marte',
      'Construcción de estación espacial china'
    ],
    specs: {
      stages: 2,
      thrust: '10,565 kN',
      fuelType: 'RP-1/LOX + LH2/LOX'
    }
  }
]

const getStatusColor = (status: Rocket['status']) => {
  switch (status) {
    case 'active': return 'bg-green-500'
    case 'retired': return 'bg-gray-500'
    case 'development': return 'bg-blue-500'
    default: return 'bg-gray-500'
  }
}

const getStatusText = (status: Rocket['status']) => {
  switch (status) {
    case 'active': return 'Activo'
    case 'retired': return 'Retirado'
    case 'development': return 'En Desarrollo'
    default: return 'Desconocido'
  }
}

export default function Rockets() {
  const [selectedRocket, setSelectedRocket] = useState<Rocket | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredRockets = filterStatus === 'all' 
    ? rockets 
    : rockets.filter(rocket => rocket.status === filterStatus)

  return (
    <section className="py-20 bg-gradient-to-b from-transparent via-indigo-900/10 to-purple-900/20">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
            Cohetes Espaciales Legendarios
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Desde los pioneros que nos llevaron a la Luna hasta los modernos que nos llevarán a Marte.
          </p>
          
          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                filterStatus === 'all' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                filterStatus === 'active' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Activos
            </button>
            <button
              onClick={() => setFilterStatus('development')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                filterStatus === 'development' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              En Desarrollo
            </button>
            <button
              onClick={() => setFilterStatus('retired')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                filterStatus === 'retired' 
                  ? 'bg-gray-500 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Históricos
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredRockets.map((rocket) => (
            <Card 
              key={rocket.id} 
              hover 
              className="group cursor-pointer overflow-hidden"
              onClick={() => setSelectedRocket(rocket)}
            >
              {/* Rocket Visual */}
              <div className="relative h-40 bg-gradient-to-t from-gray-900 to-blue-900 rounded-lg mb-4 overflow-hidden">
                <div className="absolute inset-0 bg-stars opacity-30"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-24 bg-gradient-to-t from-orange-500 via-yellow-500 to-red-500 rounded-t-full relative group-hover:h-28 transition-all duration-300">
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-gradient-to-t from-orange-600 to-transparent rounded-full opacity-70"></div>
                  </div>
                </div>
                <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(rocket.status)} text-white`}>
                  {getStatusText(rocket.status)}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {rocket.name}
                  </h3>
                  <span className="text-sm text-gray-400">{rocket.agency}</span>
                </div>
                
                <p className="text-gray-300 text-sm overflow-hidden">
                  {rocket.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-400">Altura:</span>
                    <span className="text-white ml-1">{rocket.height}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Carga útil:</span>
                    <span className="text-white ml-1">{rocket.payload}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Primer vuelo:</span>
                    <span className="text-white ml-1">{rocket.firstFlight}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Empuje:</span>
                    <span className="text-white ml-1">{rocket.specs.thrust}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-gray-400 text-lg">
            🚀 La exploración espacial está en su edad dorada: cada lanzamiento nos acerca más a las estrellas.
          </p>
        </div>
      </Container>
      
      {/* Modal detallado */}
      {selectedRocket && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedRocket(null)}
        >
          <div className="max-w-4xl max-h-[90vh] overflow-auto bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">{selectedRocket.name}</h3>
                <div className="flex items-center gap-4">
                  <span className="text-lg text-gray-300">{selectedRocket.agency}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedRocket.status)} text-white`}>
                    {getStatusText(selectedRocket.status)}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedRocket(null)}
                className="text-white hover:text-red-400 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-white mb-4">Descripción</h4>
                <p className="text-gray-300 mb-6">{selectedRocket.description}</p>
                
                <h4 className="text-xl font-semibold text-white mb-4">Logros Principales</h4>
                <ul className="space-y-2 mb-6">
                  {selectedRocket.achievements.map((achievement, index) => (
                    <li key={index} className="text-gray-300 flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold text-white mb-4">Especificaciones Técnicas</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Altura:</span>
                        <span className="text-white ml-2">{selectedRocket.height}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Diámetro:</span>
                        <span className="text-white ml-2">{selectedRocket.diameter}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Masa:</span>
                        <span className="text-white ml-2">{selectedRocket.mass}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Carga útil:</span>
                        <span className="text-white ml-2">{selectedRocket.payload}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Etapas:</span>
                        <span className="text-white ml-2">{selectedRocket.specs.stages}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Empuje:</span>
                        <span className="text-white ml-2">{selectedRocket.specs.thrust}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-400">Combustible:</span>
                        <span className="text-white ml-2">{selectedRocket.specs.fuelType}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}