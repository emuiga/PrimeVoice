'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import ServicesAndSamples from '@/components/ServicesAndSamples'
import Clients from '@/components/Clients'
import WhyUs from '@/components/WhyUs'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <ServicesAndSamples />
        <Clients />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
