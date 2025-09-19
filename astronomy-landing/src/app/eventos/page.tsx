'use client'

import React, { useState, useEffect } from 'react'
import Container from '@/components/ui/Container'

interface AstronomicalEvent {
  id: string
  title: string
  date: Date
  type: 'eclipse' | 'meteor' | 'conjunction' | 'transit' | 'opposition' | 'occultation'
  description: string
  visibility: string[]
  difficulty: 'Fácil' | 'Moderado' | 'Difícil'
  bestTime: string
  equipment: string
  tips: string[]
  emoji: string
}

// Generar eventos dinámicos basados en la fecha actual
const generateEvents = (): AstronomicalEvent[] => {
  const now = new Date()
  const events: AstronomicalEvent[] = []

  // Lluvia de meteoros mensual
  const nextMeteorShower = new Date(now)
  nextMeteorShower.setDate(now.getDate() + Math.floor(Math.random() * 30) + 1)
  events.push({
    id: 'meteor-shower-1',
    title: 'Lluvia de Meteoros de las Gemínidas',
    date: nextMeteorShower,
    type: 'meteor',
    description: 'Una de las lluvias de meteoros más espectaculares del año, con hasta 120 meteoros por hora.',
    visibility: ['Mundial', 'Mejor desde hemisferio norte'],
    difficulty: 'Fácil',
    bestTime: '2:00 AM - 5:00 AM',
    equipment: 'A simple vista, manta cómoda',
    tips: [
      'Busca un lugar oscuro alejado de las luces',
      'Acuéstate y mira hacia el noreste',
      'Dale a tus ojos 20 minutos para adaptarse',
      'No uses telescopio, es mejor a simple vista'
    ],
    emoji: '☄️'
  })

  // Eclipse lunar
  const nextLunarEclipse = new Date(now)
  nextLunarEclipse.setDate(now.getDate() + Math.floor(Math.random() * 180) + 30)
  events.push({
    id: 'lunar-eclipse-1',
    title: 'Eclipse Lunar Total',
    date: nextLunarEclipse,
    type: 'eclipse',
    description: 'La Luna se volverá de color rojizo cuando pase por la sombra de la Tierra.',
    visibility: ['América', 'Europa occidental', 'África'],
    difficulty: 'Fácil',
    bestTime: '23:30 - 02:30',
    equipment: 'A simple vista, binoculares opcionales',
    tips: [
      'Es completamente seguro mirar directamente',
      'La Luna se verá roja durante la totalidad',
      'Binoculares revelarán más detalles',
      'Fotografía con exposición larga'
    ],
    emoji: '🌙'
  })

  // Conjunción planetaria
  const nextConjunction = new Date(now)
  nextConjunction.setDate(now.getDate() + Math.floor(Math.random() * 60) + 7)
  events.push({
    id: 'conjunction-1',
    title: 'Conjunción de Venus y Júpiter',
    date: nextConjunction,
    type: 'conjunction',
    description: 'Venus y Júpiter aparecerán muy cerca en el cielo, separados por menos de 1 grado.',
    visibility: ['Mundial'],
    difficulty: 'Fácil',
    bestTime: '18:30 - 20:00',
    equipment: 'A simple vista, telescopio recomendado',
    tips: [
      'Busca hacia el oeste después del atardecer',
      'Venus será el más brillante',
      'Con telescopio podrás ver ambos en el mismo campo',
      'Excelente oportunidad fotográfica'
    ],
    emoji: '🪐'
  })

  // Estación Espacial Internacional
  const nextISSPass = new Date(now)
  nextISSPass.setHours(now.getHours() + Math.floor(Math.random() * 48) + 2)
  events.push({
    id: 'iss-pass-1',
    title: 'Paso de la Estación Espacial Internacional',
    date: nextISSPass,
    type: 'transit',
    description: 'La ISS será visible como un punto brillante moviéndose rápidamente por el cielo.',
    visibility: ['Tu ubicación específica'],
    difficulty: 'Fácil',
    bestTime: '20:15 - 20:21 (6 minutos)',
    equipment: 'A simple vista',
    tips: [
      'Aparecerá desde el noroeste',
      'Se verá como una estrella brillante en movimiento',
      'No parpadea como los aviones',
      'Durará unos 6 minutos visible'
    ],
    emoji: '🛰️'
  })

  // Oposición de Marte
  const nextMarsOpposition = new Date(now)
  nextMarsOpposition.setDate(now.getDate() + Math.floor(Math.random() * 400) + 100)
  events.push({
    id: 'mars-opposition-1',
    title: 'Oposición de Marte',
    date: nextMarsOpposition,
    type: 'opposition',
    description: 'Marte estará en su punto más cercano y brillante, ideal para observación.',
    visibility: ['Mundial'],
    difficulty: 'Moderado',
    bestTime: '22:00 - 04:00',
    equipment: 'Telescopio recomendado',
    tips: [
      'Marte se verá notablemente rojo',
      'Con telescopio podrás ver casquetes polares',
      'Mejor momento para fotografía de Marte',
      'Busca hacia el sur a medianoche'
    ],
    emoji: '🔴'
  })

  // Ocultación lunar
  const nextOccultation = new Date(now)
  nextOccultation.setDate(now.getDate() + Math.floor(Math.random() * 90) + 15)
  events.push({
    id: 'occultation-1',
    title: 'Ocultación Lunar de Aldebarán',
    date: nextOccultation,
    type: 'occultation',
    description: 'La Luna pasará frente a la estrella Aldebarán, ocultándola temporalmente.',
    visibility: ['Asia', 'Europa', 'África del Norte'],
    difficulty: 'Difícil',
    bestTime: '01:45 - 02:30',
    equipment: 'Telescopio o binoculares',
    tips: [
      'La estrella desaparecerá súbitamente',
      'Reaparecerá por el otro lado de la Luna',
      'Binoculares mostrarán el evento claramente',
      'Cronometra el momento exacto'
    ],
    emoji: '🌟'
  })

  return events.sort((a, b) => a.date.getTime() - b.date.getTime())
}

const typeColors = {
  eclipse: 'from-yellow-500/20 to-orange-500/20 border-yellow-400/30',
  meteor: 'from-blue-500/20 to-cyan-500/20 border-blue-400/30',
  conjunction: 'from-purple-500/20 to-pink-500/20 border-purple-400/30',
  transit: 'from-green-500/20 to-emerald-500/20 border-green-400/30',
  opposition: 'from-red-500/20 to-rose-500/20 border-red-400/30',
  occultation: 'from-indigo-500/20 to-blue-500/20 border-indigo-400/30'
}

const typeNames = {
  eclipse: 'Eclipse',
  meteor: 'Lluvia de Meteoros',
  conjunction: 'Conjunción',
  transit: 'Tránsito',
  opposition: 'Oposición',
  occultation: 'Ocultación'
}

export default function EventosPage() {
  const [events] = useState<AstronomicalEvent[]>(generateEvents())
  const [selectedEvent, setSelectedEvent] = useState<AstronomicalEvent | null>(null)
  const [filterType, setFilterType] = useState<string>('all')
  const [countdown, setCountdown] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const newCountdown: { [key: string]: string } = {}

      events.forEach(event => {
        const timeDiff = event.date.getTime() - now.getTime()
        
        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
          const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
          
          if (days > 0) {
            newCountdown[event.id] = `${days}d ${hours}h ${minutes}m`
          } else if (hours > 0) {
            newCountdown[event.id] = `${hours}h ${minutes}m`
          } else {
            newCountdown[event.id] = `${minutes}m`
          }
        } else {
          newCountdown[event.id] = 'En curso'
        }
      })

      setCountdown(newCountdown)
    }, 60000) // actualizar cada minuto

    return () => clearInterval(timer)
  }, [events])

  const filteredEvents = filterType === 'all' 
    ? events 
    : events.filter(event => event.type === filterType)

  const upcomingEvents = filteredEvents.filter(event => event.date > new Date())

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
      <Container>
        <div className="py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              📅 Eventos Astronómicos
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              No te pierdas los espectáculos cósmicos más increíbles. Conoce cuándo y cómo observar los eventos astronómicos más emocionantes.
            </p>
          </div>

          {/* Current Time */}
          <div className="text-center mb-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 max-w-md mx-auto">
            <div className="text-gray-400 text-sm">Hora actual</div>
            <div className="text-2xl font-bold text-white">
              {new Date().toLocaleString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 sticky top-24">
                <h3 className="text-2xl font-bold text-white mb-6">🔍 Filtrar Eventos</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setFilterType('all')}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                      filterType === 'all'
                        ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/50'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <div className="font-semibold text-white">Todos los eventos</div>
                  </button>
                  
                  {Object.entries(typeNames).map(([type, name]) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                        filterType === type
                          ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/50'
                          : 'bg-white/5 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      <div className="font-semibold text-white">{name}</div>
                      <div className="text-sm text-gray-400">
                        {events.filter(e => e.type === type).length} eventos
                      </div>
                    </button>
                  ))}
                </div>

                {/* Next Event Countdown */}
                {upcomingEvents.length > 0 && (
                  <div className="mt-8 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-4 border border-green-400/30">
                    <h4 className="text-lg font-bold text-white mb-2">⏰ Próximo Evento</h4>
                    <div className="text-sm text-gray-300 mb-1">{upcomingEvents[0].title}</div>
                    <div className="text-xl font-bold text-green-400">
                      {countdown[upcomingEvents[0].id] || 'Calculando...'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Events List */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`bg-gradient-to-r ${typeColors[event.type]} backdrop-blur-md rounded-xl border p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02]`}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <span className="text-3xl mr-3">{event.emoji}</span>
                        <div>
                          <h3 className="text-xl font-bold text-white">{event.title}</h3>
                          <p className="text-gray-300 text-sm">{typeNames[event.type]}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">
                          {countdown[event.id] || 'Calculando...'}
                        </div>
                        <div className="text-sm text-gray-400">
                          {event.date.toLocaleDateString('es-ES', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4">{event.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-gray-400 text-sm">Dificultad: </span>
                        <span className={`text-sm px-2 py-1 rounded ${
                          event.difficulty === 'Fácil' ? 'bg-green-500/20 text-green-400' :
                          event.difficulty === 'Moderado' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {event.difficulty}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Mejor hora: </span>
                        <span className="text-white text-sm">{event.bestTime}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {event.visibility.map((region, i) => (
                        <span key={i} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">
                          {region}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

                {upcomingEvents.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔭</div>
                    <h3 className="text-2xl font-bold text-white mb-2">No hay eventos próximos</h3>
                    <p className="text-gray-400">Prueba cambiando el filtro para ver otros eventos.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Event Details Modal */}
          {selectedEvent && (
            <div 
              className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedEvent(null)}
            >
              <div 
                className="max-w-2xl max-h-[90vh] overflow-auto bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <span className="text-4xl mr-4">{selectedEvent.emoji}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedEvent.title}</h2>
                      <p className="text-gray-400">{typeNames[selectedEvent.type]}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    ×
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">📅 Información del Evento</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-gray-400">Fecha:</span> <span className="text-white">{selectedEvent.date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
                      <div><span className="text-gray-400">Hora:</span> <span className="text-white">{selectedEvent.bestTime}</span></div>
                      <div><span className="text-gray-400">Dificultad:</span> <span className="text-white">{selectedEvent.difficulty}</span></div>
                      <div><span className="text-gray-400">Equipo:</span> <span className="text-white">{selectedEvent.equipment}</span></div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">🌍 Visibilidad</h4>
                    <div className="space-y-1">
                      {selectedEvent.visibility.map((region, i) => (
                        <div key={i} className="text-sm text-gray-300">• {region}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">📖 Descripción</h4>
                  <p className="text-gray-300">{selectedEvent.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">💡 Consejos para la Observación</h4>
                  <ul className="space-y-2">
                    {selectedEvent.tips.map((tip, i) => (
                      <li key={i} className="text-gray-300 text-sm flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
