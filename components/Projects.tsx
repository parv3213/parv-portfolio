import React from 'react'
import { motion } from 'framer-motion'
import Project from './Project'

const Projects = () => {
  return (
    <motion.div
      initial={{
        y: -100,
        opacity: 0,
      }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
      className="relative mx-auto flex h-screen min-h-screen max-w-[2000px] flex-col items-center justify-center text-center md:text-left
xl:flex-row xl:space-y-0 xl:px-10">
      <h3 className="absolute top-24 text-lg uppercase tracking-[15px] text-zinc-500 sm:text-2xl sm:tracking-[20px]">
        Projects
      </h3>

      <div className="absolute top-[30%] left-0 h-[40vh] w-full -skew-y-12 bg-yellow-500/10" />

      <div className="relative z-20 flex w-full snap-x snap-mandatory space-x-5 overflow-x-scroll overflow-y-hidden scrollbar-thin scrollbar-track-zinc-400/20 scrollbar-thumb-yellow-700">
        <Project />
        <Project />
        <Project />
        <Project />
      </div>
    </motion.div>
  )
}

export default Projects