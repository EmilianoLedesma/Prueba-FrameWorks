import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import InteractivePlanets from '@/components/sections/InteractivePlanets'
import StarExplorer from '@/components/sections/StarExplorer'
import SpaceCalculator from '@/components/sections/SpaceCalculator'
import Rockets from '@/components/sections/Rockets'
import Timeline from '@/components/sections/Timeline'
import Gallery from '@/components/sections/Gallery'
import SpaceNews from '@/components/sections/SpaceNews'
import WeightCalculator from '@/components/sections/WeightCalculator'
import SpaceNewsFeed from '@/components/sections/SpaceNewsFeed'
import SpaceMissionDashboard from '@/components/sections/SpaceMissionDashboard'
import Footer from '@/components/sections/Footer'
import Container from '@/components/ui/Container'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <Features />
      <InteractivePlanets />
      <StarExplorer />
      <SpaceCalculator />
      
      {/* New Interactive Dashboard Section */}
      <section className="py-20 bg-gradient-to-b from-blue-900/20 to-purple-900/20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              🚀 Centro de Control Espacial
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Herramientas interactivas y información en tiempo real para explorar el cosmos desde tu computadora.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <WeightCalculator />
            <SpaceNewsFeed />
          </div>
          
          <div className="grid lg:grid-cols-1 gap-8">
            <SpaceMissionDashboard />
          </div>
        </Container>
      </section>
      
      <div id="rockets">
        <Rockets />
      </div>
      <Timeline />
      <div id="gallery">
        <Gallery />
      </div>
      <SpaceNews />
      <Footer />
    </div>
  );
}
