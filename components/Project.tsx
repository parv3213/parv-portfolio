import React from 'react'
import { motion } from 'framer-motion'
import { Project } from '../typings'
import { urlFor } from '../sanity'
import Link from 'next/link'

const Project = ({ project }: { project: Project }) => {
  return (
    <div className="flex h-full w-full flex-shrink-0 snap-center flex-col items-center justify-center space-y-5 p-10 text-center">
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="mb-5 h-[50%] rounded-lg"
        src={urlFor(project?.image).url()}
        alt="Project Image"
      />

      <Link href={project?.linkToBuild} target="_blank">
        <h3 className="text-2xl underline md:text-4xl">{project?.title}</h3>
      </Link>

      <p className="scrollbarThin overflow-y-auto text-center md:w-[80%] md:text-left">{project?.summary}</p>
    </div>
  )
}

export default Project
