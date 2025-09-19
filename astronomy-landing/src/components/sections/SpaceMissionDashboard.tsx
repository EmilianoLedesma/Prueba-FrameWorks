'use client'

import React, { useState } from 'react'

interface SpaceMission {
  id: string
  name: string
  agency: string
  launchDate: string
  status: 'Activa' | 'Completada' | 'Planeada' | 'Cancelada'
  destination: string
  type: 'Robótica' | 'Tripulada' | 'Observatorio' | 'Sonda'
  description: string
  achievements: string[]
  cost: number // en millones USD
  duration: string
  emoji: string
  image: string
}

const missions: SpaceMission[] = [
  {
    id: 'perseverance',
    name: 'Mars Perseverance',
    agency: 'NASA',
    launchDate: '2020-07-30',
    status: 'Activa',
    destination: 'Marte',
    type: 'Robótica',
    description: 'Rover que busca signos de vida antigua en Marte y recolecta muestras para futuras misiones de retorno.',
    achievements: [
      'Primer helicóptero en volar en otro planeta (Ingenuity)',
      'Producción de oxígeno en Marte',
      'Recolección de muestras de roca marciana'
    ],
    cost: 2700,
    duration: '2+ años',
    emoji: '🔴',
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&w=400'
  },
  {
    id: 'artemis',
    name: 'Artemis Program',
    agency: 'NASA',
    launchDate: '2024-12-01',
    status: 'Planeada',
    destination: 'Luna',
    type: 'Tripulada',
    description: 'Programa para llevar de vuelta humanos a la Luna, incluyendo la primera mujer astronauta.',
    achievements: [
      'Primera mujer en la Luna',
      'Base lunar permanente',
      'Preparación para misiones a Marte'
    ],
    cost: 93000,
    duration: '10+ años',
    emoji: '🌙',
    image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&w=400'
  },
  {
    id: 'webb',
    name: 'James Webb Space Telescope',
    agency: 'NASA/ESA/CSA',
    launchDate: '2021-12-25',
    status: 'Activa',
    destination: 'Punto Lagrange L2',
    type: 'Observatorio',
    description: 'El telescopio espacial más potente jamás construido, observando el universo en infrarrojo.',
    achievements: [
      'Imágenes más profundas del universo',
      'Descubrimiento de galaxias primordiales',
      'Análisis de atmósferas de exoplanetas'
    ],
    cost: 10000,
    duration: '5-10 años',
    emoji: '🔭',
    image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&w=400'
  },
  {
    id: 'voyager',
    name: 'Voyager 1 & 2',
    agency: 'NASA',
    launchDate: '1977-09-05',
    status: 'Activa',
    destination: 'Espacio Interestelar',
    type: 'Sonda',
    description: 'Las sondas más lejanas de la humanidad, ahora explorando el espacio interestelar.',
    achievements: [
      'Primer objeto humano en el espacio interestelar',
      'Grand Tour de los planetas exteriores',
      'Disco Dorado con mensaje para extraterrestres'
    ],
    cost: 865,
    duration: '45+ años',
    emoji: '🛰️',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&w=400'
  },
  {
    id: 'europa-clipper',
    name: 'Europa Clipper',
    agency: 'NASA',
    launchDate: '2024-10-01',
    status: 'Planeada',
    destination: 'Europa (Luna de Júpiter)',
    type: 'Robótica',
    description: 'Misión para estudiar la habitabilidad del océano subsuperficial de Europa.',
    achievements: [
      'Mapeo completo de Europa',
      'Análisis del océano subterráneo',
      'Búsqueda de signos de vida'
    ],
    cost: 5200,
    duration: '6 años',
    emoji: '🧊',
    image: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?ixlib=rb-4.0.3&w=400'
  },
  {
    id: 'starship-mars',
    name: 'Starship Mars Mission',
    agency: 'SpaceX',
    launchDate: '2026-01-01',
    status: 'Planeada',
    destination: 'Marte',
    type: 'Tripulada',
    description: 'Primera misión tripulada a Marte usando la nave Starship de SpaceX.',
    achievements: [
      'Primeros humanos en Marte',
      'Establecimiento de base marciana',
      'Inicio de la colonización'
    ],
    cost: 50000,
    duration: '2+ años',
    emoji: '🚀',
    image: 'https://images.unsplash.com/photo-1614732414444-096040ec8c5c?ixlib=rb-4.0.3&w=400'
  }
]

const statusColors = {
  'Activa': 'from-green-500/20 to-emerald-500/20 border-green-400/30 text-green-400',
  'Completada': 'from-blue-500/20 to-cyan-500/20 border-blue-400/30 text-blue-400',
  'Planeada': 'from-yellow-500/20 to-orange-500/20 border-yellow-400/30 text-yellow-400',
  'Cancelada': 'from-red-500/20 to-rose-500/20 border-red-400/30 text-red-400'
}

const typeColors = {
  'Robótica': 'from-purple-500/20 to-pink-500/20 border-purple-400/30',
  'Tripulada': 'from-blue-500/20 to-indigo-500/20 border-blue-400/30',
  'Observatorio': 'from-cyan-500/20 to-blue-500/20 border-cyan-400/30',
  'Sonda': 'from-yellow-500/20 to-orange-500/20 border-yellow-400/30'
}

export default function SpaceMissionDashboard() {
  const [selectedMission, setSelectedMission] = useState<SpaceMission | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')

  const filteredMissions = missions.filter(mission => {
    const statusMatch = filterStatus === 'all' || mission.status === filterStatus
    const typeMatch = filterType === 'all' || mission.type === filterType
    return statusMatch && typeMatch
  })

  const totalCost = missions.reduce((sum, mission) => sum + mission.cost, 0)
  const activeMissions = missions.filter(m => m.status === 'Activa').length
  const plannedMissions = missions.filter(m => m.status === 'Planeada').length

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">🚀 Centro de Misiones Espaciales</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span className="text-gray-300">{activeMissions} Activas</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
            <span className="text-gray-300">{plannedMissions} Planeadas</span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white/10 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-400">{missions.length}</div>
          <div className="text-xs text-gray-400">Misiones Totales</div>
        </div>
        <div className="bg-white/10 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-400">${totalCost.toLocaleString()}M</div>
          <div className="text-xs text-gray-400">Inversión Total</div>
        </div>
        <div className="bg-white/10 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-purple-400">{new Set(missions.map(m => m.destination)).size}</div>
          <div className="text-xs text-gray-400">Destinos</div>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3 mb-6">
        <div>
          <label className="block text-white text-sm mb-2">Estado de la Misión:</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-full text-xs transition-all duration-300 ${
                filterStatus === 'all'
                  ? 'bg-white/20 text-white border border-white/30'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              Todas
            </button>
            {Object.keys(statusColors).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded-full text-xs transition-all duration-300 ${
                  filterStatus === status
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-white text-sm mb-2">Tipo de Misión:</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-full text-xs transition-all duration-300 ${
                filterType === 'all'
                  ? 'bg-white/20 text-white border border-white/30'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              Todas
            </button>
            {Object.keys(typeColors).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded-full text-xs transition-all duration-300 ${
                  filterType === type
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Missions List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredMissions.map((mission) => (
          <div
            key={mission.id}
            onClick={() => setSelectedMission(mission)}
            className={`bg-gradient-to-r ${typeColors[mission.type]} rounded-lg p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02]`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{mission.emoji}</span>
                <div>
                  <h4 className="text-white font-semibold text-sm">{mission.name}</h4>
                  <p className="text-gray-400 text-xs">{mission.agency} • {mission.destination}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded text-xs bg-gradient-to-r ${statusColors[mission.status]}`}>
                  {mission.status}
                </span>
                <div className="text-gray-400 text-xs mt-1">
                  ${mission.cost.toLocaleString()}M
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 text-xs mb-2 line-clamp-2">{mission.description}</p>
            
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>🗓️ {new Date(mission.launchDate).toLocaleDateString('es-ES')}</span>
              <span>⏱️ {mission.duration}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredMissions.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">🔍</div>
          <p className="text-gray-400">No se encontraron misiones con estos filtros.</p>
        </div>
      )}

      {/* Mission Detail Modal */}
      {selectedMission && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedMission(null)}
        >
          <div 
            className="max-w-2xl max-h-[90vh] overflow-auto bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <span className="text-4xl mr-4">{selectedMission.emoji}</span>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedMission.name}</h2>
                  <p className="text-gray-400">{selectedMission.agency}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMission(null)}
                className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                ×
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <img
                  src={selectedMission.image}
                  alt={selectedMission.name}
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1pc2nDs24gRXNwYWNpYWw8L3RleHQ+PC9zdmc+'
                  }}
                />
              </div>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">📊 Información</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-400">Estado:</span> <span className="text-white">{selectedMission.status}</span></div>
                    <div><span className="text-gray-400">Tipo:</span> <span className="text-white">{selectedMission.type}</span></div>
                    <div><span className="text-gray-400">Destino:</span> <span className="text-white">{selectedMission.destination}</span></div>
                    <div><span className="text-gray-400">Lanzamiento:</span> <span className="text-white">{new Date(selectedMission.launchDate).toLocaleDateString('es-ES')}</span></div>
                    <div><span className="text-gray-400">Duración:</span> <span className="text-white">{selectedMission.duration}</span></div>
                    <div><span className="text-gray-400">Costo:</span> <span className="text-white">${selectedMission.cost.toLocaleString()}M USD</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-white mb-3">📖 Descripción</h4>
              <p className="text-gray-300">{selectedMission.description}</p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">🏆 Logros y Objetivos</h4>
              <ul className="space-y-2">
                {selectedMission.achievements.map((achievement, i) => (
                  <li key={i} className="text-gray-300 text-sm flex items-start">
                    <span className="text-yellow-400 mr-2">⭐</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
