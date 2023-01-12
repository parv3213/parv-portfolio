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
    <div className="group relative flex cursor-pointer rounded-full border border-zinc-400 hover:scale-105">
      <motion.img
        initial={{
          x: directionLeft ? -50 : 50,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="-z-1 h-20 w-20 rounded-full object-contain p-2 xl:h-24 xl:w-24"
        src={urlFor(skill?.image).url()}
        alt="skill"
      />

      <p className="absolute -top-14 z-20 flex w-full items-center justify-center text-lg opacity-0 group-hover:opacity-100">
        <span className="rounded-lg bg-zinc-200 p-3 dark:bg-zinc-900">{skill?.title}</span>
      </p>
    </div>
  )
}

export default Skill
