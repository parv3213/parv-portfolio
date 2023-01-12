import React from 'react'
import { motion } from 'framer-motion'
import { Experience } from '../typings'
import { urlFor } from '../sanity'
import { format } from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  return (
    <article className="flex h-full w-[100%] flex-shrink-0 snap-center flex-col items-center justify-evenly space-y-5 overflow-hidden rounded-lg bg-zinc-200 p-10 opacity-80 transition-opacity duration-200 hover:opacity-100 dark:bg-zinc-700/20 md:w-[600px] xl:w-[900px]">
      <Link href={experience?.companyUrl} target="_blank">
        <Image
          src={urlFor(experience?.companyImage).url()}
          alt="Company Img"
          className="max-h-[50px] max-w-[50px] sm:max-h-[100px] sm:min-h-[50px] sm:max-w-[100px]"
          height={100}
          width={100}
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
        className="scrollbarThin overflow-y-auto">
        <h4 className="text-2xl font-thin md:text-4xl">{experience?.jobTitle}</h4>
        <Link href={experience?.companyUrl} target="_blank">
          <p className="cursor-pointer text-xl font-bold underline md:text-2xl">{experience?.company}</p>
        </Link>

        <div className="my-4 flex items-center justify-start space-x-2">
          {experience?.technologies?.map((technology) => {
            return (
              <img
                key={technology._id}
                className="h-10 w-10 rounded-full"
                src={urlFor(technology?.image).url()}
                alt="technology"
              />
            )
          })}
        </div>
        <p className="mb-6 uppercase text-zinc-500 dark:text-zinc-300">
          {format(new Date(experience?.dateStarted), 'MMMM yyyy')} -{' '}
          {experience?.isCurrentlyWorkingHere ? 'Present' : format(new Date(experience?.dateEnded), 'MMMM yyyy')}
        </p>
        <ul className="ml-5 list-disc space-y-2 text-base md:text-lg">
          {experience?.points?.map((point, index) => {
            return <li key={index}>{point}</li>
          })}
        </ul>
      </motion.div>
    </article>
  )
}

export default ExperienceCard
