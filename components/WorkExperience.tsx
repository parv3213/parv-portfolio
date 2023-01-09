import React from 'react'
import { motion } from 'framer-motion'
import ExperienceCard from './ExperienceCard'
import { Experience } from '../typings'

const WorkExperience = ({ experiences }: { experiences: Experience[] }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
      className="section">
      <div className="sectionContainer">
        <h3 className="sectionHeading">Experience</h3>

        <div className="scrollbarThin flex h-full w-full snap-x snap-mandatory space-x-5 overflow-x-auto p-10">
          {experiences.map((experience) => {
            return <ExperienceCard key={experience._id} experience={experience} />
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default WorkExperience
