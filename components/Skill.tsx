import React from 'react'
import { motion } from 'framer-motion'
import { Skill } from '../typings'
import { urlFor } from '../sanity'

type Props = {
  skill: Skill
  directionLeft?: boolean
}

const Skill = ({ skill, directionLeft }: Props) => {
  return (
    <div className="group relative flex h-20 w-20 cursor-pointer xl:h-24 xl:w-24">
      <motion.img
        initial={{
          x: directionLeft ? -50 : 50,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="h-20 w-20 rounded-full border border-zinc-400 object-cover object-center p-2 filter transition duration-150 ease-in-out
        group-hover:grayscale xl:h-24 xl:w-24"
        src={urlFor(skill?.image).url()}
        alt="skill"
      />

      <p className="absolute -top-14 z-20 flex w-full items-center justify-center text-lg opacity-0 group-hover:opacity-100">
        <span className="rounded-lg bg-zinc-900 p-3">{skill?.title}</span>
      </p>
    </div>
  )
}

export default Skill
