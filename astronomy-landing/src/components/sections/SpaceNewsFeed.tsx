'use client'

import React, { useState } from 'react'

interface SpaceNews {
  id: string
  title: string
  summary: string
  category: 'misiones' | 'descubrimientos' | 'tecnologia' | 'eventos'
  source: string
  publishedAt: Date
  readTime: number
  image: string
  trending: boolean
}

const generateSpaceNews = (): SpaceNews[] => {
  const now = new Date()
  
  return [
    {
      id: '1',
      title: 'NASA Encuentra Evidencia de Agua Líquida en Europa',
      summary: 'El telescopio espacial James Webb detecta vapor de agua emanando de géiseres en la luna Europa de Júpiter, sugiriendo un océano activo bajo su superficie helada.',
      category: 'descubrimientos',
      source: 'NASA',
      publishedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 horas atrás
      readTime: 5,
      image: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?ixlib=rb-4.0.3&w=400',
      trending: true
    },
    {
      id: '2',
      title: 'SpaceX Completa Exitosamente Misión de Carga a la ISS',
      summary: 'La cápsula Dragon entrega 2.5 toneladas de suministros científicos y equipos de investigación a la Estación Espacial Internacional.',
      category: 'misiones',
      source: 'SpaceX',
      publishedAt: new Date(now.getTime() - 6 * 60 * 60 * 1000), // 6 horas atrás
      readTime: 3,
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&w=400',
      trending: false
    },
    {
      id: '3',
      title: 'Descubierto Exoplaneta Potencialmente Habitable',
      summary: 'TOI-715 b, un exoplaneta del tamaño de la Tierra, orbita dentro de la zona habitable de una estrella enana roja a 137 años luz de distancia.',
      category: 'descubrimientos',
      source: 'ESA',
      publishedAt: new Date(now.getTime() - 12 * 60 * 60 * 1000), // 12 horas atrás
      readTime: 4,
      image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&w=400',
      trending: true
    },
    {
      id: '4',
      title: 'Nuevo Motor de Propulsión Nuclear Pasa Pruebas',
      summary: 'El motor NERVA de la NASA completa exitosamente pruebas de laboratorio, prometiendo reducir el tiempo de viaje a Marte a solo 3 meses.',
      category: 'tecnologia',
      source: 'NASA',
      publishedAt: new Date(now.getTime() - 18 * 60 * 60 * 1000), // 18 horas atrás
      readTime: 6,
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&w=400',
      trending: false
    },
    {
      id: '5',
      title: 'Lluvia de Meteoros Ofrece Espectáculo Nocturno',
      summary: 'Las Perseidas alcanzarán su pico esta noche con hasta 100 meteoros por hora visible desde el hemisferio norte.',
      category: 'eventos',
      source: 'IAU',
      publishedAt: new Date(now.getTime() - 4 * 60 * 60 * 1000), // 4 horas atrás
      readTime: 2,
      image: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-4.0.3&w=400',
      trending: true
    },
    {
      id: '6',
      title: 'China Anuncia Misión a la Luna para 2025',
      summary: 'La misión Chang\'e 6 traerá muestras del lado oculto de la Luna, marcando un hito en la exploración lunar asiática.',
      category: 'misiones',
      source: 'CNSA',
      publishedAt: new Date(now.getTime() - 24 * 60 * 60 * 1000), // 1 día atrás
      readTime: 4,
      image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&w=400',
      trending: false
    }
  ]
}

const categoryColors = {
  misiones: 'from-blue-500/20 to-cyan-500/20 border-blue-400/30',
  descubrimientos: 'from-green-500/20 to-emerald-500/20 border-green-400/30',
  tecnologia: 'from-purple-500/20 to-pink-500/20 border-purple-400/30',
  eventos: 'from-yellow-500/20 to-orange-500/20 border-yellow-400/30'
}

const categoryNames = {
  misiones: 'Misiones',
  descubrimientos: 'Descubrimientos',
  tecnologia: 'Tecnología',
  eventos: 'Eventos'
}

const categoryEmojis = {
  misiones: '🚀',
  descubrimientos: '🔬',
  tecnologia: '⚙️',
  eventos: '🌟'
}

export default function SpaceNewsFeed() {
  const [news] = useState<SpaceNews[]>(generateSpaceNews())
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory)

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Hace menos de 1 hora'
    if (diffInHours < 24) return `Hace ${diffInHours} horas`
    return `Hace ${Math.floor(diffInHours / 24)} días`
  }

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">📰 Noticias Espaciales</h3>
        <div className="flex items-center text-green-400 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
          En vivo
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
            selectedCategory === 'all'
              ? 'bg-white/20 text-white border border-white/30'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          Todas
        </button>
        {Object.entries(categoryNames).map(([key, name]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
              selectedCategory === key
                ? 'bg-white/20 text-white border border-white/30'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            {categoryEmojis[key as keyof typeof categoryEmojis]} {name}
          </button>
        ))}
      </div>

      {/* News Feed */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredNews.map((article) => (
          <div
            key={article.id}
            className={`bg-gradient-to-r ${categoryColors[article.category]} rounded-lg p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02]`}
          >
            <div className="flex items-start space-x-4">
              <img
                src={article.image}
                alt={article.title}
                className="w-20 h-20 rounded-lg object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiMzMzMiLz48dGV4dCB4PSI0MCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vdGljaWE8L3RleHQ+PC9zdmc+'
                }}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{categoryEmojis[article.category]}</span>
                    <span className="text-xs bg-white/20 text-white px-2 py-1 rounded">
                      {categoryNames[article.category]}
                    </span>
                    {article.trending && (
                      <span className="text-xs bg-red-500/30 text-red-400 px-2 py-1 rounded">
                        🔥 Trending
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{getTimeAgo(article.publishedAt)}</span>
                </div>
                
                <h4 className="text-white font-semibold mb-2 text-sm leading-tight">
                  {article.title}
                </h4>
                
                <p className="text-gray-300 text-xs mb-2 line-clamp-2">
                  {article.summary}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>📰 {article.source}</span>
                  <span>⏱️ {article.readTime} min lectura</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>Última actualización: {new Date().toLocaleTimeString('es-ES')}</span>
          <button className="text-blue-400 hover:text-blue-300 transition-colors">
            Ver todas las noticias →
          </button>
        </div>
      </div>
    </div>
  )
}
