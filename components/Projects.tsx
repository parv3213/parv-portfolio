import React from 'react'
import { motion } from 'framer-motion'
import Project from './Project'
import { Project as ProjectType } from '../typings'

const Projects = ({ projects }: { projects: ProjectType[] }) => {
  return (
    <motion.div
      initial={{
        y: -100,
        opacity: 0,
      }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
      className="section relative w-full max-w-full">
      <div className="sectionContainer h-full">
        <h3 className="sectionHeading">Projects</h3>

        <div className="absolute top-[30%] left-0 h-[40vh] w-full -skew-y-12 bg-yellow-700/20 dark:bg-yellow-500/10" />

        <div className="scrollbarThin flex h-full w-full snap-x snap-mandatory space-x-5 overflow-x-auto overflow-y-hidden">
          {projects?.map((project) => (
            <Project key={project?._id} project={project} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Projects
