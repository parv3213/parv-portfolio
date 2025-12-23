import { format } from 'date-fns'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '../sanity'
import { Experience } from '../typings'

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  return (
    <article className="flex h-full w-[100%] flex-shrink-0 snap-center flex-col items-center justify-evenly space-y-5 overflow-hidden rounded-lg bg-zinc-200 p-10 opacity-80 transition-opacity duration-200 hover:opacity-100 dark:bg-zinc-700/20 md:w-[600px] xl:w-[900px]">
      <Link href={experience?.companyUrl} target="_blank">
        <Image
          src={urlFor(experience?.companyImage).url()}
          alt={experience?.company || "Company Image"}
          className="max-h-[50px] max-w-[50px] sm:max-h-[100px] sm:min-h-[50px] sm:max-w-[100px]"
          height={100}
          width={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
        <h4 className="text-2xl font-thin md:text-4xl">
          {experience?.jobTitle}
        </h4>
        <Link href={experience?.companyUrl} target="_blank">
          <p className="cursor-pointer text-xl font-bold underline md:text-2xl">
            {experience?.company}
          </p>
        </Link>

        <div className="my-4 flex items-center justify-start space-x-2">
          {experience?.technologies?.map((technology) => {
            return (
              <Image
                key={technology._id}
                className="h-10 w-10 rounded-full"
                src={urlFor(technology?.image)?.url()}
                alt={technology?.title || "Technology"}
                height={10}
                width={10}
                sizes="10vw"
              />
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
}

export default ExperienceCard
