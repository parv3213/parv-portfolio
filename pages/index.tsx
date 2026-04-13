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
      className="z-0 min-h-screen overflow-y-auto overflow-x-hidden bg-zinc-50 text-zinc-900 scrollbar scrollbar-track-zinc-400/20 scrollbar-thumb-brand dark:bg-zinc-800"
    >
      <Head>
        <title>Parv | Portfolio</title>
        <meta
          name="description"
          content="Parv is a full-stack software engineer. Skilled in software engineering and programming."
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
        {/* Open Graph */}
        <meta property="og:title" content="Parv | Software Engineer" />
        <meta
          property="og:description"
          content="Full-stack software engineer. Explore my work, experience, and skills."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Header socials={socials} />

      <main>
        <section id="hero">
          <Hero pageInfo={pageInfo} />
        </section>

        <section id="about">
          <About pageInfo={pageInfo} />
        </section>

        <section id="experience">
          <WorkExperience experiences={experiences} />
        </section>

        <section id="skills">
          <Skills skills={skills} />
        </section>

        <section id="projects">
          <Projects projects={projects} />
        </section>

        <section id="achievements">
          <Achievements achievements={achievements} />
        </section>

        <section id="contactMe">
          <ContactMe pageInfo={pageInfo} socials={socials} />
        </section>
      </main>

      <footer className="border-t border-zinc-200/60 dark:border-zinc-700/60 py-8 px-4 text-center">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3">
          <Link href="#hero" aria-label="Scroll to top">
            <Image
              className="h-8 w-8 cursor-pointer rounded-full object-contain object-center grayscale filter hover:grayscale-0 transition-all duration-300"
              src={urlFor(pageInfo?.profilePic).url()}
              alt={pageInfo?.name || "Back to top"}
              width={32}
              height={32}
              sizes="10vw"
            />
          </Link>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            © {new Date().getFullYear()} {pageInfo?.name}. Built with Next.js & Sanity.
          </p>
        </div>
      </footer>
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
