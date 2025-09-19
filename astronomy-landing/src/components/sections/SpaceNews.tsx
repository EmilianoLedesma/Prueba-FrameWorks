'use client'

import React, { useState, useEffect } from 'react'
import Container from '../ui/Container'
import Card from '../ui/Card'
import Button from '../ui/Button'

interface SpaceNews {
  id: string
  title: string
  summary: string
  date: string
  agency: string
  category: 'mission' | 'discovery' | 'technology' | 'general'
  image?: string
  isBreaking?: boolean
  readTime: string
}

const mockSpaceNews: SpaceNews[] = [
  {
    id: '1',
    title: 'James Webb descubre galaxias más antiguas de lo esperado',
    summary: 'El telescopio espacial James Webb ha identificado galaxias que se formaron solo 400 millones de años después del Big Bang, desafiando los modelos actuales de formación galáctica.',
    date: '2025-09-18',
    agency: 'NASA/ESA',
    category: 'discovery',
    image: 'https://science.nasa.gov/wp-content/uploads/2023/05/webb-carina-nebula-nircam-final-1280.jpg',
    isBreaking: true,
    readTime: '3 min'
  },
  {
    id: '2',
    title: 'Artemis III: Preparativos para el regreso a la Luna',
    summary: 'La NASA continúa los preparativos para la misión Artemis III, que llevará a la primera mujer y la próxima persona a la superficie lunar en 2026.',
    date: '2025-09-17',
    agency: 'NASA',
    category: 'mission',
    image: 'https://www.nasa.gov/wp-content/uploads/2023/01/artemis-i-orion-spacecraft.jpg',
    readTime: '5 min'
  },
  {
    id: '3',
    title: 'Perseverance encuentra evidencia de vida microbiana antigua',
    summary: 'El rover Perseverance ha encontrado estructuras químicas en rocas marcianas que podrían indicar la presencia de vida microbiana hace miles de millones de años.',
    date: '2025-09-16',
    agency: 'NASA/JPL',
    category: 'discovery',
    image: 'https://mars.nasa.gov/system/news_items/main_images/9513_PIA25969-web.jpg',
    isBreaking: true,
    readTime: '4 min'
  },
  {
    id: '4',
    title: 'SpaceX planea misión tripulada a Marte para 2029',
    summary: 'Elon Musk anuncia que SpaceX está preparando una misión tripulada a Marte utilizando la nave Starship, con lanzamiento previsto para la ventana de 2029.',
    date: '2025-09-15',
    agency: 'SpaceX',
    category: 'mission',
    readTime: '6 min'
  },
  {
    id: '5',
    title: 'Nuevo exoplaneta habitable descubierto a 22 años luz',
    summary: 'Astrónomos han descubierto un exoplaneta del tamaño de la Tierra en la zona habitable de la estrella Wolf 1069, uno de los mundos potencialmente habitables más cercanos.',
    date: '2025-09-14',
    agency: 'ESO',
    category: 'discovery',
    readTime: '4 min'
  },
  {
    id: '6',
    title: 'Avances en tecnología de propulsión nuclear',
    summary: 'La NASA y el Departamento de Energía anuncian avances significativos en el desarrollo de sistemas de propulsión nuclear para futuras misiones a Marte.',
    date: '2025-09-13',
    agency: 'NASA/DOE',
    category: 'technology',
    readTime: '5 min'
  }
]

const getCategoryColor = (category: SpaceNews['category']) => {
  switch (category) {
    case 'mission': return 'bg-blue-500'
    case 'discovery': return 'bg-green-500'
    case 'technology': return 'bg-purple-500'
    default: return 'bg-gray-500'
  }
}

const getCategoryName = (category: SpaceNews['category']) => {
  switch (category) {
    case 'mission': return 'Misión'
    case 'discovery': return 'Descubrimiento'
    case 'technology': return 'Tecnología'
    default: return 'General'
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return 'Hace 1 día'
  if (diffDays < 7) return `Hace ${diffDays} días`
  return date.toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

export default function SpaceNews() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(false)
  const [newsData, setNewsData] = useState<SpaceNews[]>(mockSpaceNews)

  const categories = [
    { id: 'all', name: 'Todas las noticias', color: 'bg-gray-500' },
    { id: 'mission', name: 'Misiones', color: 'bg-blue-500' },
    { id: 'discovery', name: 'Descubrimientos', color: 'bg-green-500' },
    { id: 'technology', name: 'Tecnología', color: 'bg-purple-500' }
  ]

  const filteredNews = selectedCategory === 'all' 
    ? newsData 
    : newsData.filter(news => news.category === selectedCategory)

  const refreshNews = () => {
    setIsLoading(true)
    // Simular carga de noticias
    setTimeout(() => {
      setIsLoading(false)
      // En una aplicación real, aquí se haría una llamada a la API
    }, 2000)
  }

  const breakingNews = newsData.filter(news => news.isBreaking)

  return (
    <section className="py-20 bg-gradient-to-b from-green-900/20 to-blue-900/20">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Noticias Espaciales en Tiempo Real
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Mantente al día con los últimos descubrimientos, misiones y avances en la exploración espacial.
          </p>
          
          <Button 
            onClick={refreshNews}
            className="bg-green-600 hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Actualizando...
              </>
            ) : (
              <>
                🔄 Actualizar noticias
              </>
            )}
          </Button>
        </div>

        {/* Noticias destacadas */}
        {breakingNews.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="animate-pulse text-red-500 mr-2">🔴</span>
              Noticias de última hora
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {breakingNews.map((news) => (
                <Card key={news.id} className="border-red-500/50 bg-red-500/10">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="animate-pulse text-red-500 text-xs font-bold">BREAKING</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(news.category)} text-white`}>
                          {getCategoryName(news.category)}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">{news.title}</h4>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">{news.summary}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{news.agency}</span>
                        <span>{formatDate(news.date)} • {news.readTime}</span>
                      </div>
                    </div>
                    {news.image && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={news.image} 
                          alt={news.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Filtros de categorías */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === category.id 
                  ? `${category.color} text-white` 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Grid principal de noticias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredNews.filter(news => !news.isBreaking).map((news) => (
            <Card key={news.id} className="group cursor-pointer hover:border-blue-500/50 transition-all">
              {news.image && (
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPjwL'
                    }}
                  />
                </div>
              )}
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(news.category)} text-white`}>
                    {getCategoryName(news.category)}
                  </span>
                  <span className="text-xs text-gray-400">{news.readTime}</span>
                </div>
                
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                  {news.title}
                </h3>
                
                <p className="text-gray-300 text-sm line-clamp-3">
                  {news.summary}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-white/10">
                  <span className="font-medium">{news.agency}</span>
                  <span>{formatDate(news.date)}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Estadísticas de noticias */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-blue-400 mb-1">{newsData.length}</div>
            <div className="text-sm text-gray-400">Total noticias</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-green-400 mb-1">{breakingNews.length}</div>
            <div className="text-sm text-gray-400">Última hora</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {newsData.filter(n => n.category === 'discovery').length}
            </div>
            <div className="text-sm text-gray-400">Descubrimientos</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-orange-400 mb-1">
              {newsData.filter(n => n.category === 'mission').length}
            </div>
            <div className="text-sm text-gray-400">Misiones</div>
          </Card>
        </div>

        {/* Suscripción a alertas */}
        <Card className="p-6 text-center bg-gradient-to-r from-blue-900/20 to-purple-900/20">
          <h3 className="text-xl font-bold text-white mb-4">🚨 Alertas de Noticias Espaciales</h3>
          <p className="text-gray-300 mb-6">
            Recibe notificaciones instantáneas sobre los descubrimientos más importantes del espacio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button className="bg-blue-600 hover:bg-blue-700">
              Suscribirme
            </Button>
          </div>
        </Card>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-lg">
            🌌 El universo siempre tiene nuevos secretos por revelar.
          </p>
        </div>
      </Container>
    </section>
  )
}