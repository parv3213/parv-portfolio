import React from 'react'
import { motion } from 'framer-motion'
import ExperienceCard from './ExperienceCard'

const WorkExperience = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
      className="relative mx-auto flex h-screen max-w-full flex-col items-center justify-evenly overflow-hidden px-10 text-left md:flex-row">
      <h3 className="absolute top-24 text-lg uppercase tracking-[15px] text-zinc-500 sm:text-2xl sm:tracking-[20px]">
        Experience
      </h3>

      <div className="mt-12 flex w-full snap-x snap-mandatory space-x-5 overflow-x-scroll p-10 sm:mt-24 md:mt-36">
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
      </div>
    </motion.div>
  )
}

export default WorkExperience
