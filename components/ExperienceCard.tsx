import { format } from "date-fns";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { urlFor } from "../sanity";
import { Experience } from "../typings";

const ExperienceCard = ({ experience }: { experience: Experience }) => {
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
    <article className="flex h-[640px] w-full flex-shrink-0 snap-center flex-col items-center justify-start overflow-hidden rounded-3xl bg-zinc-100/90 p-8 opacity-100 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl dark:border dark:border-zinc-800 dark:bg-zinc-900/50 md:w-[600px] xl:w-[900px]">
      {/* logo moved into the scrollable content so it scrolls with the details */}

      <div className="relative h-full w-full">
        <motion.div
          initial={{
            y: 50,
            opacity: 0,
          }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          viewport={{ once: true }}
          onScroll={handleScroll}
          className="scrollbarThin flex h-full w-full flex-col items-center overflow-y-auto px-4"
        >
          <div className="relative mb-4 flex-shrink-0 overflow-hidden rounded-2xl bg-white shadow-md dark:bg-zinc-800">
            <Link
              href={experience?.companyUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${experience?.company} website`}
              className="relative mx-auto block h-20 w-20 md:h-24 md:w-24"
            >
              <Image
                src={urlFor(experience?.companyImage).url()}
                alt={experience?.company || "Company Image"}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 80px, 96px"
                loading="lazy"
              />
            </Link>
          </div>

          <h3 className="text-center text-2xl font-light tracking-wide text-zinc-800 dark:text-zinc-100 md:text-3xl">
            {experience?.jobTitle}
          </h3>
          <Link
            href={experience?.companyUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <p className="mt-1 text-center text-xl font-semibold text-zinc-600 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-200 md:text-2xl">
              {experience?.company}
            </p>
          </Link>

          <div className="my-4 flex flex-wrap justify-center gap-3">
            {experience?.technologies?.map((technology) => {
              return (
                <div
                  key={technology._id}
                  className="relative h-10 w-10 overflow-hidden rounded-full border border-zinc-200 bg-white p-1 shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
                  title={technology?.title}
                  aria-label={technology?.title}
                >
                  <Image
                    src={urlFor(technology?.image)?.url()}
                    alt={technology?.title || "Technology"}
                    fill
                    className="object-contain p-1"
                    sizes="40px"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
          <p className="mb-6 text-sm font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            {format(new Date(experience?.dateStarted), "MMM yyyy")} -{" "}
            {experience?.isCurrentlyWorkingHere
              ? "Present"
              : format(new Date(experience?.dateEnded), "MMM yyyy")}
          </p>
          <ul className="ml-0 w-full list-none space-y-3 text-base text-zinc-600 dark:text-zinc-300 md:text-lg">
            {experience?.points?.map((point, index) => {
              return (
                <li key={index} className="flex items-start space-x-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                  <span className="flex-1 leading-relaxed">{point}</span>
                </li>
              );
            })}
          </ul>
        </motion.div>
        {/* Gradient fade at bottom to indicate more content */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-100/90 via-zinc-100/50 to-transparent transition-opacity duration-300 dark:from-zinc-900/50 dark:via-zinc-900/25"
          style={{ opacity: scrollFadeOpacity }}
        />
      </div>
    </article>
  );
};

export default ExperienceCard;
