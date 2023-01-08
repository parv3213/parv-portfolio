import React from 'react'
import { motion } from 'framer-motion'
import { Experience } from '../typings'
import { urlFor } from '../sanity'
import { format } from 'date-fns'
import Link from 'next/link'

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  return (
    <Link href={experience?.companyUrl} target="_blank">
      <article
        className="flex h-full max-h-[70vh] w-[500px] flex-shrink-0 cursor-pointer snap-center flex-col items-center 
    overflow-hidden overflow-y-scroll rounded-lg bg-zinc-700/30 p-10 opacity-60 transition-opacity duration-200 hover:opacity-100 md:w-[600px] xl:w-[900px]">
        <motion.img
          initial={{
            y: -100,
            opacity: 0,
          }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          src={urlFor(experience?.companyImage).url()}
          alt="Company Img"
          className="mb-7 h-28 w-28 rounded-full object-cover object-center xl:h-[100px] xl:w-[100px]"
        />

        <div className="px-0 md:px-10">
          <h4 className="text-2 xl font-light md:text-4xl">{experience?.jobTitle}</h4>
          <p className="mt-1 text-xl font-bold md:text-2xl">{experience?.company}</p>
          <div className="my-2 flex space-x-2">
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
          <p className="py-5 uppercase text-zinc-300">
            {format(new Date(experience?.dateStarted), 'MMMM yyyy')} -{' '}
            {experience?.isCurrentlyWorkingHere ? 'Present' : format(new Date(experience?.dateEnded), 'MMMM yyyy')}
          </p>
          <ul className="ml-5 list-disc space-y-2 text-lg">
            {experience?.points?.map((point, index) => {
              return <li key={index}>{point}</li>
            })}
          </ul>
        </div>
      </article>
    </Link>
  )
}

export default ExperienceCard
