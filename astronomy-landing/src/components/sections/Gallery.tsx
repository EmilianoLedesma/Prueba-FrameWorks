'use client'

import React, { useState } from 'react'
import Container from '../ui/Container'
import { GalleryImage } from '@/types'

const galleryImages: GalleryImage[] = [
  {
    id: 'nebula1',
    title: 'Nebulosa del Águila',
    description: 'Los famosos "Pilares de la Creación" capturados por el Telescopio Hubble.',
    src: '/api/placeholder/600/400',
    alt: 'Nebulosa del Águila',
    credit: 'NASA/ESA/Hubble'
  },
  {
    id: 'mars-surface',
    title: 'Superficie de Marte',
    description: 'Vista panorámica de la superficie marciana tomada por el rover Perseverance.',
    src: '/api/placeholder/600/400',
    alt: 'Superficie de Marte',
    credit: 'NASA/JPL-Caltech'
  },
  {
    id: 'saturn-rings',
    title: 'Anillos de Saturno',
    description: 'Imagen detallada de los espectaculares anillos de Saturno.',
    src: '/api/placeholder/600/400',
    alt: 'Anillos de Saturno',
    credit: 'NASA/Cassini'
  },
  {
    id: 'earth-iss',
    title: 'Tierra desde la ISS',
    description: 'Nuestro planeta azul visto desde la Estación Espacial Internacional.',
    src: '/api/placeholder/600/400',
    alt: 'Tierra desde la ISS',
    credit: 'NASA'
  },
  {
    id: 'galaxy',
    title: 'Galaxia Andrómeda',
    description: 'Nuestra galaxia vecina más cercana, a 2.5 millones de años luz.',
    src: '/api/placeholder/600/400',
    alt: 'Galaxia Andrómeda',
    credit: 'NASA/Hubble'
  },
  {
    id: 'jupiter-storm',
    title: 'Gran Mancha Roja',
    description: 'La famosa tormenta de Júpiter, más grande que la Tierra.',
    src: '/api/placeholder/600/400',
    alt: 'Gran Mancha Roja de Júpiter',
    credit: 'NASA/Juno'
  }
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  return (
    <section className="py-20 bg-gradient-to-b from-blue-900/20 to-transparent">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Galería Cósmica
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Imágenes impresionantes del universo capturadas por telescopios espaciales y misiones de exploración.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div 
              key={image.id}
              className="group cursor-pointer overflow-hidden rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:scale-105 transition-all duration-300"
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <div className="text-2xl mb-2">🌌</div>
                  <div className="text-sm opacity-75">Imagen del espacio</div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {image.title}
                </h3>
                <p className="text-gray-300 text-sm mb-2 overflow-hidden">
                  {image.description}
                </p>
                <p className="text-gray-400 text-xs">
                  Crédito: {image.credit}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-400">
            * Las imágenes mostradas son placeholders. En un proyecto real, se cargarían imágenes reales de NASA/ESA.
          </p>
        </div>
      </Container>
      
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-full overflow-auto bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
            <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <div className="text-white text-center p-8">
                <div className="text-4xl mb-4">🌌</div>
                <div className="text-lg">{selectedImage.title}</div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-4">{selectedImage.title}</h3>
              <p className="text-gray-300 mb-4">{selectedImage.description}</p>
              <p className="text-gray-400 text-sm">Crédito: {selectedImage.credit}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}