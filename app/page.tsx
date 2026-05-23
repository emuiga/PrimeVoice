'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import ServicesAndSamples from '@/components/ServicesAndSamples'
import Clients from '@/components/Clients'
import Reviews from '@/components/Reviews'
import WhyUs from '@/components/WhyUs'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <ServicesAndSamples />
        <Clients />
        <Reviews />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
