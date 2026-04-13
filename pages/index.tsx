import type { GetStaticProps } from "next";
import { groq } from "next-sanity";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import About from "../components/About";
import ContactMe from "../components/ContactMe";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import WorkExperience from "../components/WorkExperience";
import Achievements from "../components/Achievements";
import { client, urlFor } from "../sanity";
import { Experience, PageInfo, Project, Skill, Social, Achievement } from "../typings";

type Props = {
  pageInfo: PageInfo;
  experiences: Experience[];
  socials: Social[];
  projects: Project[];
  skills: Skill[];
  achievements: Achievement[];
};

const Home = ({ pageInfo, experiences, socials, projects, skills, achievements }: Props) => {
  return (
    <div
      id="layout-scroll"
      className="z-0 h-screen overflow-y-scroll bg-zinc-50 text-zinc-900 scrollbar overflow-x-hidden scrollbar-track-zinc-400/20 scrollbar-thumb-yellow-700 md:snap-y md:snap-mandatory dark:bg-zinc-800"
    >
      <Head>
        <title>Parv | Portfolio</title>
        <meta
          name="description"
          content="Parv is a web3 full-stack developer. Skilled in software engineering and programming."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>

      <Header socials={socials} />

      <main>
        <section id="hero" className="snap-start">
          <Hero pageInfo={pageInfo} />
        </section>

        <section id="about" className="snap-start">
          <About pageInfo={pageInfo} />
        </section>

        <section id="experience" className="snap-start">
          <WorkExperience experiences={experiences} />
        </section>

        <section id="skills" className="snap-start">
          <Skills skills={skills} />
        </section>

        <section id="projects" className="snap-start">
          <Projects projects={projects} />
        </section>

        <section id="achievements" className="snap-start">
          <Achievements achievements={achievements} />
        </section>

        <section id="contactMe" className="snap-start">
          <ContactMe pageInfo={pageInfo} />
        </section>
      </main>

      <Link href={"#hero"} aria-label="Scroll to top">
        <footer className="sticky bottom-5 hidden w-full cursor-pointer md:block">
          <div className="flex items-center justify-center">
            <Image
              className="h-10 w-10 cursor-pointer rounded-full object-contain object-center grayscale filter hover:grayscale-0"
              src={urlFor(pageInfo?.profilePic).url()}
              alt={pageInfo?.name || "Footer Image"}
              width={40}
              height={40}
              sizes="10vw"
            />
          </div>
        </footer>
      </Link>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo: PageInfo = await client.fetch(groq`
  *[_type=="pageInfo"][0]
`);
  const experiences: Experience[] =
    await client.fetch(groq`*[_type=="experience"]{
    ...,
    technologies[]->
      
  } 
  | order(dateStarted desc)
  | order(dateEnded desc)
  | order(isCurrentlyWorkingHere desc)
`);
  const socials: Social[] = await client.fetch(groq`
  *[_type=="social"]
`);
  const skills: Skill[] = await client.fetch(groq`
  *[_type=="skill"]
`);
  const projects: Project[] = await client.fetch(groq`
  *[_type=="project"]{
    ...,
    technologies[]->
  } | order(impactRank desc, _createdAt asc)
`);
  const achievements: Achievement[] = await client.fetch(groq`
  *[_type=="achievement"] | order(_createdAt asc)
`);

  return {
    props: {
      pageInfo,
      experiences,
      socials,
      skills,
      projects,
      achievements,
    },
  };
};
