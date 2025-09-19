import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import InteractivePlanets from '@/components/sections/InteractivePlanets'
import StarExplorer from '@/components/sections/StarExplorer'
import SpaceCalculator from '@/components/sections/SpaceCalculator'
import Rockets from '@/components/sections/Rockets'
import Timeline from '@/components/sections/Timeline'
import Gallery from '@/components/sections/Gallery'
import SpaceNews from '@/components/sections/SpaceNews'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <Features />
      <InteractivePlanets />
      <StarExplorer />
      <SpaceCalculator />
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
