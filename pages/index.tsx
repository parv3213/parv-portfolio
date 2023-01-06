import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Hero from '../components/Hero'

const Home: NextPage = () => {
  return (
    <div className="z-0	h-screen snap-y snap-mandatory overflow-scroll bg-zinc-800 text-white">
      <Head>
        <title>Parv's Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* Hero */}
      <section id="hero" className="snap-center">
        <Hero />
      </section>

      {/* About */}

      {/* Experience */}

      {/* Skills */}

      {/* Projects */}

      {/* Contact Me */}
    </div>
  )
}

export default Home
