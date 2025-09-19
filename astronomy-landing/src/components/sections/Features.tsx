import React from 'react'
import Container from '../ui/Container'
import Card from '../ui/Card'
import { Planet } from '@/types'

const planets: Planet[] = [
  {
    id: 'mercury',
    name: 'Mercurio',
    description: 'El planeta más cercano al Sol, con temperaturas extremas y una superficie llena de cráteres.',
    distanceFromSun: '57.9 millones km',
    diameter: '4,879 km',
    color: 'from-gray-400 to-yellow-600'
  },
  {
    id: 'venus',
    name: 'Venus',
    description: 'El planeta más caliente del sistema solar, envuelto en una atmósfera tóxica.',
    distanceFromSun: '108.2 millones km',
    diameter: '12,104 km',
    color: 'from-orange-400 to-yellow-500'
  },
  {
    id: 'earth',
    name: 'Tierra',
    description: 'Nuestro hogar, el único planeta conocido que alberga vida.',
    distanceFromSun: '149.6 millones km',
    diameter: '12,756 km',
    color: 'from-blue-500 to-green-500'
  },
  {
    id: 'mars',
    name: 'Marte',
    description: 'El planeta rojo, objetivo de futuras misiones tripuladas.',
    distanceFromSun: '227.9 millones km',
    diameter: '6,792 km',
    color: 'from-red-600 to-orange-500'
  },
  {
    id: 'jupiter',
    name: 'Júpiter',
    description: 'El gigante gaseoso más grande, con más de 80 lunas conocidas.',
    distanceFromSun: '778.5 millones km',
    diameter: '142,984 km',
    color: 'from-orange-600 to-yellow-700'
  },
  {
    id: 'saturn',
    name: 'Saturno',
    description: 'Famoso por sus espectaculares anillos de hielo y roca.',
    distanceFromSun: '1.43 mil millones km',
    diameter: '120,536 km',
    color: 'from-yellow-500 to-amber-600'
  },
  {
    id: 'uranus',
    name: 'Urano',
    description: 'Un gigante de hielo que rota de lado, con anillos verticales.',
    distanceFromSun: '2.87 mil millones km',
    diameter: '51,118 km',
    color: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'neptune',
    name: 'Neptuno',
    description: 'El planeta más lejano, con vientos de hasta 2,100 km/h.',
    distanceFromSun: '4.50 mil millones km',
    diameter: '49,528 km',
    color: 'from-blue-600 to-indigo-700'
  }
]

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-purple-900/20">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Nuestro Sistema Solar
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explora los ocho planetas que orbitan nuestro Sol, cada uno con características únicas y fascinantes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {planets.map((planet) => (
            <Card key={planet.id} hover className="group cursor-pointer">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${planet.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}></div>
              
              <h3 className="text-xl font-bold text-center mb-3 text-white">
                {planet.name}
              </h3>
              
              <p className="text-gray-300 text-sm mb-4 overflow-hidden">
                {planet.description}
              </p>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Distancia al Sol:</span>
                  <span className="text-white">{planet.distanceFromSun}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Diámetro:</span>
                  <span className="text-white">{planet.diameter}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-gray-400 text-lg">
            ¿Sabías que podrían existir miles de millones de planetas en nuestra galaxia?
          </p>
        </div>
      </Container>
    </section>
  )
}