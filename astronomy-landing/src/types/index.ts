export interface Planet {
  id: string
  name: string
  description: string
  distanceFromSun: string
  diameter: string
  color: string
  image?: string
}

export interface Mission {
  id: string
  name: string
  year: number
  description: string
  agency: string
  image?: string
  status: 'completed' | 'ongoing' | 'planned'
}

export interface GalleryImage {
  id: string
  title: string
  description: string
  src: string
  alt: string
  credit: string
}