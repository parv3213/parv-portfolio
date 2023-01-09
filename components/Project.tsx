import React from 'react'
import { motion } from 'framer-motion'
import { Project } from '../typings'
import { urlFor } from '../sanity'
import Link from 'next/link'

const Project = ({ project }: { project: Project }) => {
  return (
    <div
      className="flex h-full w-screen flex-shrink-0 snap-center flex-col 
      items-center justify-center space-y-10 overflow-y-scroll px-10 text-center">
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="w-[50%]"
        src={urlFor(project?.image).url()}
        alt="Project Image"
      />

      <Link href={project?.linkToBuild} target="_blank">
        <h3 className="text-2xl underline decoration-yellow-500/30 md:text-4xl">{project?.title}</h3>
      </Link>

      <p className="text-center md:w-[80%] md:text-left">{project?.summary}</p>
    </div>
  )
}

export default Project
