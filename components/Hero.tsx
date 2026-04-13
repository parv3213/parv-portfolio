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
      `Hi, The Name's ${pageInfo?.name}`,
      "<Guy who loves to code/>",
      "Exploring & building with AI 🤖",
      "Always upskilling 🚀",
    ],
    delaySpeed: 2000,
    loop: true,
  });
  return (
    <div className="dark:via-zinc-950 relative flex min-h-[100svh] flex-col items-center justify-center space-y-6 overflow-hidden bg-gradient-to-b from-white via-white to-zinc-50 px-4 pb-8 pt-24 text-center dark:from-zinc-900 dark:to-black sm:space-y-8 md:h-screen md:pt-20">
      <BackgroundCircles />

      <div className="z-20 flex flex-col items-center justify-center space-y-6 sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col items-center justify-center gap-6"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-green-500/30 bg-green-50/80 px-4 py-1.5 text-sm font-medium text-green-700 shadow-sm backdrop-blur-md dark:border-green-400/20 dark:bg-green-900/20 dark:text-green-400">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75 dark:bg-green-400"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500 dark:bg-green-400"></span>
            </span>
            <span>Available for Opportunities</span>
          </div>

          <Image
            priority
            className="mx-auto h-32 w-32 rounded-full object-cover shadow-lg"
            src={urlFor(pageInfo?.heroImage).url()}
            alt={pageInfo?.name || "Hero Image"}
            width={128}
            height={128}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        <div className="z-20">
          <h2 className="pb-2 text-[10px] uppercase tracking-[0.35em] text-zinc-500 sm:text-xs sm:tracking-[0.55em] md:text-sm md:tracking-[15px]">
            {pageInfo?.role}
          </h2>
          <h1 className="px-2 text-2xl font-semibold leading-tight sm:px-8 sm:text-3xl lg:text-6xl">
            <span className="mr-3 text-zinc-900 dark:text-zinc-50">{text}</span>
            <Cursor cursorColor="#F7AB0A" />
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-5 sm:gap-3">
            <Link href="#about" className="heroButton">
              About
            </Link>
            <Link href="#experience" className="heroButton">
              Experience
            </Link>
            <Link href="#skills" className="heroButton">
              Skills
            </Link>
            <Link href="#projects" className="heroButton">
              Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
