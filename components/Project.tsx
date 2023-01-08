import React from 'react'
import { motion } from 'framer-motion'
import { Project } from '../typings'
import { urlFor } from '../sanity'

const Project = ({ project }: { project: Project }) => {
  return (
    <div className="flex h-screen max-h-[70vh] w-[500px] max-w-3xl flex-shrink-0 snap-center flex-col items-center justify-center space-y-10 overflow-y-scroll px-10 text-center">
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="h-32 w-32"
        src={urlFor(project?.image).url()}
        alt="Project Image"
      />

      <h3 className="text-2xl md:text-4xl">{project?.title}</h3>
      <p className="text-center md:text-left">{project?.summary}</p>
    </div>
  )
}

export default Project
