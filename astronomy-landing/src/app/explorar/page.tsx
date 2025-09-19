'use client'

import React, { useState, useEffect } from 'react'
import Container from '@/components/ui/Container'

interface Constellation {
  id: string
  name: string
  latinName: string
  story: string
  stars: { x: number; y: number; brightness: number; name?: string }[]
  connections: { from: number; to: number }[]
  visibility: string
  facts: string[]
}

const constellations: Constellation[] = [
  {
    id: 'orion',
    name: 'Orión',
    latinName: 'Orion',
    story: 'Orión era un gran cazador en la mitología griega. Según la leyenda, presumió de que podía matar a cualquier animal de la Tierra. Esto enfureció a Gaia, quien envió un escorpión para matarlo. Zeus colocó tanto a Orión como al escorpión en el cielo, pero en lados opuestos para que nunca se encuentren.',
    stars: [
      { x: 300, y: 100, brightness: 0.2, name: 'Betelgeuse' },
      { x: 250, y: 150, brightness: 0.4, name: 'Bellatrix' },
      { x: 280, y: 200, brightness: 0.8, name: 'Alnitak' },
      { x: 300, y: 210, brightness: 0.8, name: 'Alnilam' },
      { x: 320, y: 220, brightness: 0.8, name: 'Mintaka' },
      { x: 350, y: 150, brightness: 0.1, name: 'Rigel' },
      { x: 320, y: 280, brightness: 0.6, name: 'Saiph' }
    ],
    connections: [
      { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 },
      { from: 0, to: 2 }, { from: 5, to: 4 }, { from: 5, to: 6 }, { from: 2, to: 6 }
    ],
    visibility: 'Diciembre - Febrero',
    facts: [
      'Contiene la famosa Nebulosa de Orión',
      'Betelgeuse es una supergigante roja que podría explotar como supernova',
      'El cinturón de Orión apunta hacia Sirio, la estrella más brillante del cielo',
      'Rigel es aproximadamente 40,000 veces más luminosa que el Sol'
    ]
  },
  {
    id: 'ursa-major',
    name: 'Osa Mayor',
    latinName: 'Ursa Major',
    story: 'En la mitología griega, Zeus se enamoró de la ninfa Calisto. Cuando Hera se enteró, transformó a Calisto en una osa. Años después, su hijo Arcas casi la mata mientras cazaba. Zeus intervino y colocó a ambos en el cielo: Calisto como la Osa Mayor y Arcas como la Osa Menor.',
    stars: [
      { x: 100, y: 100, brightness: 0.4, name: 'Dubhe' },
      { x: 150, y: 110, brightness: 0.4, name: 'Merak' },
      { x: 200, y: 130, brightness: 0.5, name: 'Phecda' },
      { x: 250, y: 120, brightness: 0.3, name: 'Megrez' },
      { x: 300, y: 110, brightness: 0.4, name: 'Alioth' },
      { x: 350, y: 130, brightness: 0.6, name: 'Mizar' },
      { x: 400, y: 160, brightness: 0.5, name: 'Alkaid' }
    ],
    connections: [
      { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 },
      { from: 4, to: 5 }, { from: 5, to: 6 }, { from: 0, to: 3 }, { from: 4, to: 6 }
    ],
    visibility: 'Todo el año (hemisferio norte)',
    facts: [
      'El "Gran Carro" es la parte más reconocible de la constelación',
      'Mizar es una estrella doble visible a simple vista',
      'Las estrellas Dubhe y Merak apuntan hacia la Estrella Polar',
      'Es una de las 48 constelaciones listadas por Ptolomeo'
    ]
  },
  {
    id: 'cassiopeia',
    name: 'Casiopea',
    latinName: 'Cassiopeia',
    story: 'Casiopea era la reina de Etiopía en la mitología griega. Era muy vanidosa y presumía de que ella y su hija Andrómeda eran más hermosas que las Nereidas. Como castigo, Poseidón envió un monstruo marino para devastar el reino. Casiopea fue colocada en el cielo, condenada a dar vueltas cabeza abajo alrededor del polo norte.',
    stars: [
      { x: 150, y: 200, brightness: 0.3, name: 'Schedar' },
      { x: 200, y: 150, brightness: 0.4, name: 'Caph' },
      { x: 250, y: 100, brightness: 0.5, name: 'Gamma Cas' },
      { x: 300, y: 140, brightness: 0.6, name: 'Ruchbah' },
      { x: 350, y: 190, brightness: 0.4, name: 'Segin' }
    ],
    connections: [
      { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 }
    ],
    visibility: 'Todo el año (hemisferio norte)',
    facts: [
      'Tiene forma de "W" o "M" dependiendo de su orientación',
      'Gamma Cassiopeiae es una estrella variable muy brillante',
      'Contiene varios cúmulos estelares abiertos',
      'Es circumpolar en latitudes medias del hemisferio norte'
    ]
  }
]

export default function ExplorePage() {
  const [selectedConstellation, setSelectedConstellation] = useState<Constellation>(constellations[0])
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  const [showConnections, setShowConnections] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-900/20 to-black">
      <Container>
        <div className="py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              🌟 Explorador de Constelaciones
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Descubre las historias legendarias escritas en las estrellas y aprende sobre las constelaciones que han guiado a la humanidad durante milenios.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Constellation Selector */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 sticky top-24">
                <h3 className="text-2xl font-bold mb-6 text-white">Constelaciones</h3>
                <div className="space-y-3">
                  {constellations.map((constellation) => (
                    <button
                      key={constellation.id}
                      onClick={() => setSelectedConstellation(constellation)}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                        selectedConstellation.id === constellation.id
                          ? 'bg-gradient-to-r from-purple-500/30 to-blue-500/30 border border-purple-400/50'
                          : 'bg-white/5 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      <div className="font-semibold text-white">{constellation.name}</div>
                      <div className="text-sm text-gray-400">{constellation.latinName}</div>
                      <div className="text-xs text-gray-500 mt-1">{constellation.visibility}</div>
                    </button>
                  ))}
                </div>

                {/* Controls */}
                <div className="mt-8 space-y-4">
                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={showConnections}
                        onChange={(e) => setShowConnections(e.target.checked)}
                        className="rounded bg-white/10 border-white/20 text-purple-500 focus:ring-purple-500"
                      />
                      <span className="text-white">Mostrar conexiones</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-2">
                      Velocidad de animación: {animationSpeed}x
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.5"
                      value={animationSpeed}
                      onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Constellation Viewer */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-b from-black to-blue-900/20 rounded-xl border border-white/10 p-8 min-h-[500px] relative overflow-hidden">
                <h2 className="text-3xl font-bold text-white mb-4">{selectedConstellation.name}</h2>
                <p className="text-gray-400 mb-6">{selectedConstellation.latinName}</p>

                {/* Star Map */}
                <div className="relative w-full h-80 bg-black/50 rounded-lg overflow-hidden mb-6">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 500 350"
                    className="absolute inset-0"
                  >
                    {/* Background stars */}
                    {Array.from({ length: 50 }).map((_, i) => (
                      <circle
                        key={`bg-star-${i}`}
                        cx={Math.random() * 500}
                        cy={Math.random() * 350}
                        r="0.5"
                        fill="white"
                        opacity={Math.random() * 0.5 + 0.2}
                        className="animate-pulse"
                        style={{ animationDuration: `${2 + Math.random() * 3}s` }}
                      />
                    ))}

                    {/* Constellation connections */}
                    {showConnections && selectedConstellation.connections.map((connection, i) => (
                      <line
                        key={`connection-${i}`}
                        x1={selectedConstellation.stars[connection.from].x}
                        y1={selectedConstellation.stars[connection.from].y}
                        x2={selectedConstellation.stars[connection.to].x}
                        y2={selectedConstellation.stars[connection.to].y}
                        stroke="rgba(147, 51, 234, 0.6)"
                        strokeWidth="2"
                        className="animate-pulse"
                        style={{ animationDuration: `${2 / animationSpeed}s` }}
                      />
                    ))}

                    {/* Constellation stars */}
                    {selectedConstellation.stars.map((star, i) => (
                      <g key={`star-${i}`}>
                        <circle
                          cx={star.x}
                          cy={star.y}
                          r={4 + (1 - star.brightness) * 4}
                          fill="white"
                          className={`cursor-pointer transition-all duration-300 ${
                            hoveredStar === i ? 'drop-shadow-lg' : ''
                          }`}
                          style={{
                            filter: `drop-shadow(0 0 ${8 + (1 - star.brightness) * 8}px rgba(255, 255, 255, 0.8))`,
                            animation: `pulse ${2 / animationSpeed}s ease-in-out infinite`
                          }}
                          onMouseEnter={() => setHoveredStar(i)}
                          onMouseLeave={() => setHoveredStar(null)}
                        />
                        {hoveredStar === i && star.name && (
                          <text
                            x={star.x}
                            y={star.y - 15}
                            textAnchor="middle"
                            fill="white"
                            fontSize="12"
                            className="font-medium"
                          >
                            {star.name}
                          </text>
                        )}
                      </g>
                    ))}
                  </svg>
                </div>

                {/* Story and Facts */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-lg p-6">
                    <h4 className="text-xl font-bold text-white mb-3">📖 Historia Mitológica</h4>
                    <p className="text-gray-300 leading-relaxed">{selectedConstellation.story}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-6">
                    <h4 className="text-xl font-bold text-white mb-3">⭐ Datos Fascinantes</h4>
                    <ul className="space-y-2">
                      {selectedConstellation.facts.map((fact, i) => (
                        <li key={i} className="text-gray-300 text-sm flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fun Interactive Section */}
          <div className="mt-16 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-white/10 p-8">
            <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              🎯 ¿Sabías que...?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white/5 rounded-lg">
                <div className="text-4xl mb-4">🌌</div>
                <h4 className="text-xl font-bold text-white mb-2">88 Constelaciones</h4>
                <p className="text-gray-300">La Unión Astronómica Internacional reconoce oficialmente 88 constelaciones que cubren toda la esfera celeste.</p>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-lg">
                <div className="text-4xl mb-4">🧭</div>
                <h4 className="text-xl font-bold text-white mb-2">Navegación Antigua</h4>
                <p className="text-gray-300">Los marineros antiguos usaban las constelaciones como GPS celeste para navegar por los océanos durante miles de años.</p>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-lg">
                <div className="text-4xl mb-4">🌟</div>
                <h4 className="text-xl font-bold text-white mb-2">Perspectiva 2D</h4>
                <p className="text-gray-300">Las estrellas de una constelación pueden estar a distancias muy diferentes de la Tierra, pero las vemos como si estuvieran en el mismo plano.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
