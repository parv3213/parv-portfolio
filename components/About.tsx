import React from 'react'
import { motion } from 'framer-motion'
import { PageInfo } from '../typings'
import { urlFor } from '../sanity'

const About = ({ pageInfo }: { pageInfo: PageInfo }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
      className="relative mx-auto flex h-screen max-w-7xl items-center justify-center">
      <h3 className="absolute top-24 text-lg uppercase tracking-[15px] text-zinc-500 sm:text-2xl sm:tracking-[20px]">
        About
      </h3>

      <div className="flex flex-col items-center justify-center space-y-2 px-10 text-center sm:space-y-5 md:flex-row md:space-y-2 md:space-x-5 md:text-left">
        <motion.img
          initial={{
            x: -200,
            opacity: 0,
          }}
          transition={{ duration: 1 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          src={urlFor(pageInfo?.profilePic).url()}
          alt="Parv about"
          className="h-12 w-12 rounded-full object-cover sm:h-36 sm:w-36 md:mb-0 md:h-96 md:w-64 md:rounded-lg xl:h-[500px] xl:w-[400px]"
        />

        <div className="flex max-h-[50vh] flex-col space-y-2 overflow-y-scroll sm:space-y-5">
          <h4 className="text-2xl font-semibold tracking-wide sm:text-4xl">
            Here is a <span className="underline decoration-yellow-700">little</span> background
          </h4>
          <p className="text-sm md:max-w-max md:text-lg">{pageInfo?.backgroundInformation}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default About
