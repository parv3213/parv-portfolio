import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { urlFor } from "../sanity";
import { PageInfo } from "../typings";
import BackgroundCircles from "./BackgroundCircles";

const Hero = ({ pageInfo }: { pageInfo: PageInfo }) => {
  const [text] = useTypewriter({
    words: [
      `Hi, I'm ${pageInfo?.name}`,
      "<FullStack Developer />",
      "Exploring & building with AI 🤖",
      "Always upskilling 🚀",
    ],
    delaySpeed: 2000,
    loop: true,
  });

  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center space-y-6 overflow-hidden bg-gradient-to-b from-white via-white to-zinc-50 px-4 pb-8 pt-24 text-center dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 sm:space-y-8 md:pt-20">
      <BackgroundCircles />

      <div className="z-20 flex flex-col items-center justify-center space-y-6 sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="flex flex-col items-center justify-center gap-5"
        >
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-green-500/30 bg-green-50/80 px-4 py-1.5 text-sm font-medium text-green-700 shadow-sm backdrop-blur-md dark:border-green-400/20 dark:bg-green-900/20 dark:text-green-400">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75 dark:bg-green-400" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500 dark:bg-green-400" />
            </span>
            <span>Available for Opportunities</span>
          </div>

          {/* Avatar */}
          <Image
            priority
            className="mx-auto h-32 w-32 rounded-full object-cover shadow-lg ring-2 ring-brand/20"
            src={urlFor(pageInfo?.heroImage).url()}
            alt={pageInfo?.name || "Hero Image"}
            width={128}
            height={128}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        <div className="z-20 space-y-2">
          {/* Role label */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[10px] uppercase tracking-[0.35em] text-zinc-500 sm:text-xs sm:tracking-[0.55em] md:text-sm md:tracking-[15px]"
          >
            {pageInfo?.role}
          </motion.p>

          {/* Typewriter heading */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-display px-2 text-2xl font-bold leading-tight text-zinc-900 dark:text-zinc-50 sm:px-8 sm:text-3xl lg:text-5xl xl:text-6xl"
          >
            <span className="mr-2">{text}</span>
            <Cursor cursorColor="#F7AB0A" />
          </motion.h1>

          {/* Navigation CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col items-center gap-4 pt-6"
          >
            {/* Section nav links */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <Link href="#about" className="heroButton">About</Link>
              <Link href="#experience" className="heroButton">Experience</Link>
              <Link href="#skills" className="heroButton">Skills</Link>
              <Link href="#projects" className="heroButton">Projects</Link>
            </div>

            {/* Resume CTA — only renders once resumeUrl is set in Sanity */}
            {pageInfo?.resumeUrl && (
              <a
                href={pageInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-md transition-all hover:bg-brand/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Download Resume
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
