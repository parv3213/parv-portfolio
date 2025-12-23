import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { urlFor } from "../sanity";
import { PageInfo } from "../typings";
import BackgroundCircles from "./BackgroundCircles";

const Hero = ({ pageInfo }: { pageInfo: PageInfo }) => {
  const [text] = useTypewriter({
    words: [`Hi, The Name's ${pageInfo?.name}`, "<Guy who loves to code/>"],
    delaySpeed: 2000,
    loop: true,
  });
  return (
    <div className="dark:via-zinc-950 relative flex h-screen flex-col items-center justify-center space-y-8 overflow-hidden bg-gradient-to-b from-white via-white to-zinc-50 text-center dark:from-zinc-900 dark:to-black">
      <BackgroundCircles />

      <div className="z-20 flex flex-col items-center justify-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            priority
            className="mx-auto h-32 w-32 rounded-full object-cover"
            src={urlFor(pageInfo?.heroImage).url()}
            alt={pageInfo?.name || "Hero Image"}
            width={128}
            height={128}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        <div className="z-20">
          <h2 className="pb-2 text-sm uppercase tracking-[15px] text-zinc-500">
            {pageInfo?.role}
          </h2>
          <h1 className="px-10 text-3xl font-semibold lg:text-6xl">
            <span className="mr-3 text-zinc-900 dark:text-zinc-50">{text}</span>
            <Cursor cursorColor="#F7AB0A" />
          </h1>

          <div className="pt-5">
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
