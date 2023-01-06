import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
      className="relative mx-auto flex h-screen max-w-7xl flex-col items-center justify-center p-5 px-10 text-center sm:justify-evenly md:flex-row md:text-left">
      <h3 className="absolute top-24 text-lg uppercase tracking-wider text-zinc-500 sm:text-2xl sm:tracking-[20px]">
        About
      </h3>

      <motion.img
        initial={{
          x: -200,
          opacity: 0,
        }}
        transition={{ duration: 1 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        src="https://avatars.githubusercontent.com/u/45873074?v=4"
        alt="Parv about"
        className="mb-10 h-36 w-36 rounded-full object-cover sm:-mb-28 sm:h-36 sm:w-36 md:mb-0 md:h-96 md:w-64 md:rounded-lg xl:h-[600px] xl:w-[500px]"
      />

      <div className="flex flex-col space-y-2 px-0 sm:space-y-5 md:px-10">
        <h4 className="text-base font-semibold tracking-wide sm:text-xl">
          Here is a <span className="underline decoration-yellow-700">little</span> background
        </h4>
        <p className="text-xs sm:text-sm md:text-base">
          I am a software developer with a strong background in Solidity, a programming language used for developing
          smart contracts on the Ethereum blockchain. In addition to my work with blockchain technology, I am also
          experienced in React and Node, popular front-end and back-end JavaScript libraries, respectively. With my
          skills in Solidity, I am able to create self-executing contracts that can facilitate, verify, and enforce the
          negotiation or performance of a contract. This allows me to build decentralized applications (DApps) on the
          Ethereum platform, which provide secure and transparent processes on the blockchain. In addition to my work
          with blockchain technology, my experience with React and Node allows me to create dynamic and interactive user
          interfaces and build efficient server-side applications. This combination of skills makes me a valuable asset
          to any team working on projects involving both blockchain and web development.
        </p>
      </div>
    </motion.div>
  )
}

export default About
