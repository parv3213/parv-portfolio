import React from 'react'
import { motion } from 'framer-motion'
import { Project } from '../typings'
import { urlFor } from '../sanity'
import Link from 'next/link'
import Image from 'next/image'

const Project = ({ project }: { project: Project }) => {
  return (
    <div className="flex h-full w-full flex-shrink-0 snap-center flex-col items-center justify-center space-y-5 p-10 text-center">
      <Image
        className="z-20 mb-5 h-[50%] rounded-lg"
        src={urlFor(project?.image).url()}
        alt="Project Image"
        height={1200}
        width={800}
        placeholder="empty"
      />

      <Link href={project?.linkToBuild} target="_blank">
        <h3 className="text-2xl underline md:text-4xl">{project?.title}</h3>
      </Link>

      <motion.p
        initial={{
          y: 50,
          opacity: 0,
        }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="scrollbarThin overflow-y-auto text-center md:w-[80%] md:text-left">
        {project?.summary}
      </motion.p>
    </div>
  )
}

export default Project
