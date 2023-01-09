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
      className="mx-auto h-screen max-w-7xl">
      <div className="flex h-[calc(100%-5rem)] w-full flex-col items-center justify-start overflow-hidden">
        <h3 className="sectionHeading">About</h3>

        <div className="flex h-full flex-col items-center justify-center space-y-5 overflow-hidden px-10 text-center md:flex-row md:space-y-0 md:space-x-5 md:text-left">
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
            className="h-36 w-36 rounded-full object-cover object-center md:h-96 md:w-64 md:rounded-lg xl:h-[500px] xl:w-[400px]"
          />

          <div className="flex flex-col justify-start space-y-5 overflow-y-scroll">
            <h4 className="text-2xl font-semibold tracking-wide sm:text-4xl">
              Here is a <span className="underline">little</span> background
            </h4>
            <p className="text-sm md:text-lg">{pageInfo?.backgroundInformation}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default About
