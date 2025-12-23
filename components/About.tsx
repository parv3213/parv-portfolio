import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from "react";
import { urlFor } from '../sanity'
import { PageInfo } from '../typings'

const About = ({ pageInfo }: { pageInfo: PageInfo }) => {
  const [scrollFadeOpacity, setScrollFadeOpacity] = useState(1);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;
    const scrollBottom = scrollHeight - scrollTop - clientHeight;

    // Calculate opacity based on distance from bottom (fade out in last 50px)
    const fadeDistance = 50;
    const opacity = Math.min(scrollBottom / fadeDistance, 1);
    setScrollFadeOpacity(opacity);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
      className="section"
    >
      <div className="sectionContainer">
        <h2 className="sectionHeading">About</h2>

        <div className="sectionBody">
          <div className="flex w-full flex-col items-center justify-center gap-5 px-6 md:flex-row md:gap-14">
            <motion.div
              initial={{
                x: -200,
                opacity: 0,
              }}
              transition={{
                duration: 1.2,
              }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative flex-shrink-0"
            >
              <Image
                src={urlFor(pageInfo?.profilePic).url()}
                alt={pageInfo?.name || "About Image"}
                width={500}
                height={600}
                className="h-40 w-40 rounded-full border-4 border-zinc-200/50 object-cover shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-zinc-700/50 md:h-96 md:w-80 md:rounded-2xl xl:h-[500px] xl:w-[400px]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>

            <motion.div
              initial={{
                x: 200,
                opacity: 0,
              }}
              transition={{ duration: 1 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="rounded-3xl border border-zinc-200 bg-zinc-100/80 p-6 shadow-lg backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/60 md:p-10">
                <h4 className="mb-4 text-2xl font-semibold text-zinc-800 dark:text-zinc-100 md:text-4xl">
                  Here is a{" "}
                  <span className="underline decoration-[#F7AB0A]/50 decoration-4 underline-offset-4">
                    little
                  </span>{" "}
                  background
                </h4>
                <div className="relative">
                  <div
                    onScroll={handleScroll}
                    className="scrollbarThin max-h-[400px] overflow-y-auto pr-2"
                  >
                    <div
                      className="text-justify text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 md:text-lg"
                      dangerouslySetInnerHTML={{
                        __html: pageInfo?.backgroundInformation || "",
                      }}
                    />
                  </div>
                  {/* Gradient fade at bottom to indicate more content */}
                  <div
                    className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-zinc-100/80 via-zinc-100/40 to-transparent transition-opacity duration-300 dark:from-zinc-900/60 dark:via-zinc-900/30"
                    style={{ opacity: scrollFadeOpacity }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default About
