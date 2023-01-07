import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import About from '../components/About'
import ContactMe from '../components/ContactMe'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import WorkExperience from '../components/WorkExperience'

const Home: NextPage = () => {
  return (
    <div className="z-0	h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll bg-zinc-800 text-white scrollbar scrollbar-track-zinc-400/20 scrollbar-thumb-yellow-700">
      <Head>
        <title>Parv's Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <section id="hero" className="snap-start">
        <Hero />
      </section>

      <section id="about" className="snap-center">
        <About />
      </section>

      <section id="experience" className="snap-center">
        <WorkExperience />
      </section>

      <section id="skills" className="snap-start">
        <Skills />
      </section>

      <section id="projects" className="snap-start">
        <Projects />
      </section>

      <section id="contactMe" className="snap-center">
        <ContactMe />
      </section>

      <Link href={'#hero'}>
        <footer className="sticky bottom-5 w-full cursor-pointer">
          <div className="flex items-center justify-center">
            <img
              className="h-10 w-10 cursor-pointer rounded-full object-contain object-center grayscale filter hover:grayscale-0"
              src="https://media.licdn.com/dms/image/D4D03AQEfGcqOu_2aFA/profile-displayphoto-shrink_800_800/0/1665142521830?e=1678320000&v=beta&t=Qj1Pe5P81IEaqpB-YFkRcTUt9IP48dEHKmN7194eoyI"
              alt=""
            />
          </div>
        </footer>
      </Link>
    </div>
  )
}

export default Home
