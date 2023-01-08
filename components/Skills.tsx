import React from 'react'
import { motion } from 'framer-motion'
import Skill from './Skill'
import { Skill as SkillType } from '../typings'

const Skills = ({ skills }: { skills: SkillType[] }) => {
  return (
    <motion.div
      initial={{
        y: -100,
        opacity: 0,
      }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
      className="relative mx-auto flex h-screen min-h-screen max-w-[2000px] flex-col items-center justify-center text-center md:text-left xl:flex-row
  xl:space-y-0 xl:px-10">
      <h3 className="absolute top-24 text-lg uppercase tracking-[15px] text-zinc-500 sm:text-2xl sm:tracking-[20px]">
        Skills
      </h3>

      <h3 className="absolute top-36 text-sm uppercase tracking-wider text-zinc-500 md:tracking-[3px]">
        Hover over a skill for currency proficiency
      </h3>

      <div className="grid grid-cols-4 gap-5 p-5">
        {skills?.map((skill) => (
          <Skill key={skill._id} directionLeft={true} skill={skill} />
        ))}
      </div>
    </motion.div>
  )
}

export default Skills
