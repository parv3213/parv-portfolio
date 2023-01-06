import React from 'react'
import { SocialIcon } from 'react-social-icons'
import { motion } from 'framer-motion'

const Header = () => {
  return (
    <header className="flex sticky top-0 justify-between items-start max-w-7xl mx-auto z-20 xl:items-center p-5">
      <motion.div
        initial={{
          x: -500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className="flex items-center">
        <SocialIcon url="https://www.linkedin.com/in/parv3213" fgColor="gray" bgColor="transparent" />
        <SocialIcon url="https://github.com/parv3213" fgColor="gray" bgColor="transparent" />
        <SocialIcon url="https://twitter.com/parv3213" bgColor="transparent" fgColor="gray" />
      </motion.div>

      <motion.div
        initial={{
          x: 500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className="flex items-center cursor-pointer">
        <SocialIcon network="email" fgColor="gray" bgColor="transparent" />
        <p className="uppercase hidden md:inline-flex text-sm text-gray-400">Get in touch</p>
      </motion.div>
    </header>
  )
}

export default Header
