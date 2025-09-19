'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Container from '../ui/Container'
import { GalleryImage } from '@/types'

const galleryImages: GalleryImage[] = [
  {
    id: 'nebula1',
    title: 'Nebulosa del Águila',
    description: 'Los famosos "Pilares de la Creación" capturados por el Telescopio Hubble.',
    src: 'https://science.nasa.gov/wp-content/uploads/2023/05/hubble-pillars-of-creation-jpg.webp',
    alt: 'Nebulosa del Águila',
    credit: 'NASA/ESA/Hubble'
  },
  {
    id: 'mars-surface',
    title: 'Superficie de Marte',
    description: 'Vista panorámica de la superficie marciana tomada por el rover Perseverance.',
    src: 'https://mars.nasa.gov/system/news_items/main_images/9513_PIA25969-web.jpg',
    alt: 'Superficie de Marte',
    credit: 'NASA/JPL-Caltech'
  },
  {
    id: 'saturn-rings',
    title: 'Anillos de Saturno',
    description: 'Imagen detallada de los espectaculares anillos de Saturno.',
    src: 'https://science.nasa.gov/wp-content/uploads/2023/05/cassini-saturn-farewell-pia21344-jpg.webp',
    alt: 'Anillos de Saturno',
    credit: 'NASA/Cassini'
  },
  {
    id: 'earth-iss',
    title: 'Tierra desde la ISS',
    description: 'Nuestro planeta azul visto desde la Estación Espacial Internacional.',
    src: 'https://www.nasa.gov/wp-content/uploads/2023/01/iss042e340851.jpg',
    alt: 'Tierra desde la ISS',
    credit: 'NASA'
  },
  {
    id: 'galaxy',
    title: 'Galaxia Andrómeda',
    description: 'Nuestra galaxia vecina más cercana, a 2.5 millones de años luz.',
    src: 'https://science.nasa.gov/wp-content/uploads/2023/05/hubble-andromeda-galaxy-jpg.webp',
    alt: 'Galaxia Andrómeda',
    credit: 'NASA/Hubble'
  },
  {
    id: 'jupiter-storm',
    title: 'Gran Mancha Roja',
    description: 'La famosa tormenta de Júpiter, más grande que la Tierra.',
    src: 'https://science.nasa.gov/wp-content/uploads/2023/05/jupiter-great-red-spot-jpg.webp',
    alt: 'Gran Mancha Roja de Júpiter',
    credit: 'NASA/Juno'
  },
  {
    id: 'james-webb',
    title: 'Nebulosa Carina - James Webb',
    description: 'Una de las primeras imágenes del telescopio espacial James Webb.',
    src: 'https://science.nasa.gov/wp-content/uploads/2023/05/webb-carina-nebula-nircam-final-1280.jpg',
    alt: 'Nebulosa Carina por James Webb',
    credit: 'NASA/ESA/CSA/STScI'
  },
  {
    id: 'moon-phases',
    title: 'Fases de la Luna',
    description: 'Composición mostrando las diferentes fases lunares.',
    src: 'https://science.nasa.gov/wp-content/uploads/2023/05/moon-phases-jpg.webp',
    alt: 'Fases de la Luna',
    credit: 'NASA/GSFC'
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
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {image.title}
                </h3>
                <p className="text-gray-300 text-sm mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
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
            Imágenes reales cortesía de NASA, ESA y otras agencias espaciales.
          </p>
        </div>
      </Container>
      
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-full overflow-auto bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
            <div className="relative">
              <div className="relative w-full max-h-96 aspect-video">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-contain"
                />
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(null)
                }}
                className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                ×
              </button>
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