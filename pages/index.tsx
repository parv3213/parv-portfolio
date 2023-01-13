import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import About from '../components/About'
import ContactMe from '../components/ContactMe'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import WorkExperience from '../components/WorkExperience'
import { urlFor } from '../sanity'
import { Experience, PageInfo, Project, Skill, Social } from '../typings'
import { client } from '../sanity'
import { groq } from 'next-sanity'
import Image from 'next/image'

type Props = {
  pageInfo: PageInfo
  experiences: Experience[]
  socials: Social[]
  projects: Project[]
  skills: Skill[]
}

const Home = ({ pageInfo, experiences, socials, projects, skills }: Props) => {
  return (
    <div className="z-0	h-screen snap-y snap-mandatory overflow-y-scroll bg-zinc-50 text-zinc-900 scrollbar overflow-x-hidden scrollbar-track-zinc-400/20 scrollbar-thumb-yellow-700 dark:bg-zinc-800">
      <Head>
        <title>Parv | Portfolio</title>
        <meta
          name="description"
          content="Parv is a web3 full-stack developer. Skilled in software engineering and programming."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>

      <Header socials={socials} />

      <section id="hero" className="snap-start">
        <Hero pageInfo={pageInfo} />
      </section>

      <section id="about" className="snap-center">
        <About pageInfo={pageInfo} />
      </section>

      <section id="experience" className="snap-center">
        <WorkExperience experiences={experiences} />
      </section>

      <section id="skills" className="snap-start">
        <Skills skills={skills} />
      </section>

      <section id="projects" className="snap-start">
        <Projects projects={projects} />
      </section>

      <section id="contactMe" className="snap-center">
        <ContactMe />
      </section>

      <Link href={'#hero'}>
        <footer className="sticky bottom-5 w-full cursor-pointer">
          <div className="flex items-center justify-center">
            <Image
              className="h-10 w-10 cursor-pointer rounded-full object-contain object-center grayscale filter hover:grayscale-0"
              src={urlFor(pageInfo?.profilePic).url()}
              alt="hero image"
              width={10}
              height={10}
            />
          </div>
        </footer>
      </Link>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo: PageInfo = await client.fetch(groq`
  *[_type=="pageInfo"][0]
`)
  const experiences: Experience[] = await client.fetch(groq`*[_type=="experience"]{
    ...,
    technologies[]->
      
  } 
  | order(dateStarted desc)
  | order(dateEnded desc)
  | order(isCurrentlyWorkingHere desc)
`)
  const socials: Social[] = await client.fetch(groq`
  *[_type=="social"]
`)
  const skills: Skill[] = await client.fetch(groq`
  *[_type=="skill"]
`)
  const projects: Project[] = await client.fetch(groq`
  *[_type=="project"] | order(_createdAt asc)
`)

  return {
    props: {
      pageInfo,
      experiences,
      socials,
      skills,
      projects,
    },
    revalidate: 2 * 60 * 60,
  }
}
