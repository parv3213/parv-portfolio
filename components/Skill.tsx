import React from 'react'
import { motion } from 'framer-motion'

type Props = {
  directionLeft?: boolean
}

const Skill = (props: Props) => {
  return (
    <div className="group relative flex cursor-pointer">
      <motion.img
        initial={{
          x: props.directionLeft ? -50 : 50,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="h-20 w-20 rounded-full border border-zinc-400 object-cover object-center p-2 filter transition duration-300 ease-in-out
        group-hover:grayscale xl:h-24 xl:w-24"
        src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png"
        alt=""
      />

      <div className="absolute z-0 h-20 w-20 rounded-full opacity-0 transition duration-300 ease-in group-hover:bg-white group-hover:opacity-70 xl:h-24 xl:w-24">
        <div className="flex h-full items-center justify-center">
          <p className="text-xl font-bold text-black opacity-100">100%</p>
        </div>
      </div>
    </div>
  )
}

export default Skill
