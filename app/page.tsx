'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import WorkSamples from '@/components/WorkSamples'
import Clients from '@/components/Clients'
import Reviews from '@/components/Reviews'
import WhyUs from '@/components/WhyUs'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  // Single source of truth — both Services and WorkSamples read from here
  const [activeSample, setActiveSample] = useState(0)

  const handleViewSamples = (index: number) => {
    setActiveSample(index)
    const el = document.getElementById('samples')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services activeSample={activeSample} onViewSamples={handleViewSamples} />
        <WorkSamples activeIndex={activeSample} onIndexChange={setActiveSample} />
        <Clients />
        <Reviews />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
