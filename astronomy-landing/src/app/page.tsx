import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import Timeline from '@/components/sections/Timeline'
import Gallery from '@/components/sections/Gallery'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <Features />
      <Timeline />
      <Gallery />
      <Footer />
    </div>
  );
}
