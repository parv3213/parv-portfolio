import { format } from "date-fns";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../sanity";
import { Experience } from "../typings";

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  return (
    <article className="flex h-full w-[100%] flex-shrink-0 snap-center flex-col items-center justify-evenly space-y-5 overflow-hidden rounded-lg bg-zinc-200 p-10 opacity-80 transition-opacity duration-200 hover:opacity-100 dark:bg-zinc-700/20 md:w-[600px] xl:w-[900px]">
      <Link
        href={experience?.companyUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${experience?.company} website`}
      >
        <Image
          src={urlFor(experience?.companyImage).url()}
          alt={experience?.company || "Company Image"}
          className="rounded-md bg-zinc-50 object-contain p-1 dark:bg-zinc-800/60"
          height={80}
          width={80}
          sizes="80px"
          loading="lazy"
        />
      </Link>

      <motion.div
        initial={{
          y: 50,
          opacity: 0,
        }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="scrollbarThin overflow-y-auto"
      >
        <h3 className="text-2xl font-thin md:text-4xl">
          {experience?.jobTitle}
        </h3>
        <Link
          href={experience?.companyUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="cursor-pointer text-xl font-bold underline md:text-2xl">
            {experience?.company}
          </p>
        </Link>

        <div className="my-4 flex items-center justify-start space-x-2">
          {experience?.technologies?.map((technology) => {
            return (
              <div
                key={technology._id}
                className="flex items-center justify-center rounded-md bg-zinc-50 p-1 dark:bg-zinc-800/60"
                title={technology?.title}
                aria-label={technology?.title}
              >
                <Image
                  src={urlFor(technology?.image)?.url()}
                  alt={technology?.title || "Technology"}
                  className="object-contain"
                  height={36}
                  width={36}
                  sizes="36px"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
        <p className="mb-6 uppercase text-zinc-500 dark:text-zinc-300">
          {format(new Date(experience?.dateStarted), "MMMM yyyy")} -{" "}
          {experience?.isCurrentlyWorkingHere
            ? "Present"
            : format(new Date(experience?.dateEnded), "MMMM yyyy")}
        </p>
        <ul className="ml-5 list-disc space-y-2 text-base md:text-lg">
          {experience?.points?.map((point, index) => {
            return <li key={index}>{point}</li>;
          })}
        </ul>
      </motion.div>
    </article>
  );
};

export default ExperienceCard;
