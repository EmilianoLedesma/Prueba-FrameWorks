import React, { useState } from 'react'
import Container from '../ui/Container'
import Button from '../ui/Button'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Suscripción:', email)
    setEmail('')
    alert('¡Gracias por suscribirte! Te mantendremos informado sobre las últimas noticias del espacio.')
  }

  return (
    <footer className="bg-gradient-to-b from-transparent to-black">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Mantente Conectado con el Cosmos
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Suscríbete a nuestro boletín para recibir las últimas noticias sobre misiones espaciales, 
                descubrimientos astronómicos y eventos cósmicos.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="flex-1 px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <Button type="submit" variant="primary" size="lg">
                  Suscribirme
                </Button>
              </form>
            </div>
            
            <div className="text-center lg:text-right">
              <div className="inline-block">
                <div className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-400 bg-clip-text text-transparent mb-4">
                  ∞
                </div>
                <p className="text-gray-300 text-lg">
                  El universo es infinito,<br />
                  y nuestra curiosidad también.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Exploración</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sistema Solar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Galaxias Lejanas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Agujeros Negros</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Exoplanetas</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Misiones</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Mars 2020</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Artemis</a></li>
                <li><a href="#" className="hover:text-white transition-colors">James Webb</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Europa Clipper</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Recursos</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Educación</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Investigación</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Noticias</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 py-6 text-center">
          <p className="text-gray-400">
            © 2024 Exploración Espacial. Creado con ❤️ para los amantes del cosmos.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Imágenes cortesía de NASA, ESA y otras agencias espaciales.
          </p>
        </div>
      </Container>
    </footer>
  )
}