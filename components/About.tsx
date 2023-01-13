import { motion } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '../sanity'
import { PageInfo } from '../typings'

const About = ({ pageInfo }: { pageInfo: PageInfo }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
      className="section">
      <div className="sectionContainer">
        <h3 className="sectionHeading">About</h3>

        <div className="flex h-full flex-col items-center justify-center space-y-5 overflow-hidden px-10 text-center md:flex-row md:space-y-0 md:space-x-10 md:text-left">
          <Image
            height={500}
            width={400}
            src={urlFor(pageInfo?.profilePic).url()}
            alt="Parv about"
            className="h-36 w-36 rounded-full object-cover object-center md:h-96 md:w-64 md:rounded-lg xl:h-[500px] xl:w-[400px]"
          />

          <motion.div
            initial={{
              x: 200,
              opacity: 0,
            }}
            transition={{ duration: 1 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="scrollbarThin flex flex-col justify-start space-y-5 overflow-y-auto">
            <h4 className="text-2xl font-semibold tracking-wide sm:text-4xl">
              Here is a <span className="underline">little</span> background
            </h4>
            <p className="text-sm md:text-lg">{pageInfo?.backgroundInformation}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default About
