import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import ServicesAndSamples from '@/components/ServicesAndSamples'
import Clients from '@/components/Clients'
import WhyUs from '@/components/WhyUs'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import { getPortfolioItems, getClients } from '@/lib/sanity/queries'

export default async function Home() {
  const [portfolioItems, clients] = await Promise.all([getPortfolioItems(), getClients()])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <ServicesAndSamples portfolioItems={portfolioItems} />
        <Clients clients={clients} />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
