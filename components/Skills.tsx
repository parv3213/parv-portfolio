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
      className="section">
      <div className="sectionContainer">
        <h3 className="sectionHeading">Skills</h3>
        <h3 className="text-sm uppercase tracking-wider text-zinc-500 md:tracking-[3px]">
          Hover over a skill for current proficiency
        </h3>

        <div className="flex h-full items-center justify-center">
          {/* TODO fix when screen size is small */}
          <div className="grid grid-cols-3 gap-5 p-5 md:grid-cols-4">
            {skills?.map((skill) => (
              <Skill key={skill._id} directionLeft={true} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Skills
