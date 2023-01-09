import type { GetStaticProps, NextPage } from 'next'
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
import { fetchExperiences } from '../utils/fetchExperiences'
import { fetchPageInfo } from '../utils/fetchPageInfo'
import { fetchProjects } from '../utils/fetchProjects'
import { fetchSkills } from '../utils/fetchSkills'
import { fetchSocials } from '../utils/fetchSocials'

type Props = {
  pageInfo: PageInfo
  experiences: Experience[]
  socials: Social[]
  projects: Project[]
  skills: Skill[]
}

const Home = ({ pageInfo, experiences, socials, projects, skills }: Props) => {
  return (
    <div className="z-0	h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll bg-zinc-800 text-white scrollbar scrollbar-track-zinc-400/20 scrollbar-thumb-yellow-700">
      <Head>
        {pageInfo?.name ? <title>{pageInfo.name.split(' ')[0]}'s Portfolio</title> : <title>Portfolio</title>}
        <link rel="icon" href="/favicon.ico" />
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
            <img
              className="h-10 w-10 cursor-pointer rounded-full object-contain object-center grayscale filter hover:grayscale-0"
              src={urlFor(pageInfo?.profilePic).url()}
              alt="hero image"
            />
          </div>
        </footer>
      </Link>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo: PageInfo = await fetchPageInfo()
  const experiences: Experience[] = await fetchExperiences()
  const socials: Social[] = await fetchSocials()
  const skills: Skill[] = await fetchSkills()
  const projects: Project[] = await fetchProjects()

  return {
    props: {
      pageInfo,
      experiences,
      socials,
      skills,
      projects,
    },
    revalidate: 60 * 60,
  }
}
