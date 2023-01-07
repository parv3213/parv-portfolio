import React from 'react'
import { motion } from 'framer-motion'

const ExperienceCard = () => {
  return (
    <article
      className="flex max-h-[70vh] w-[500px] flex-shrink-0 cursor-pointer snap-center flex-col items-center overflow-hidden 
    overflow-y-scroll rounded-lg bg-zinc-700/30 p-10 opacity-60 transition-opacity duration-200 hover:opacity-100 md:w-[600px] xl:w-[900px]">
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        src="https://pbs.twimg.com/profile_images/1433046911871864836/zVFeya5O_400x400.jpg"
        alt="Company Img"
        className="mb-7 h-28 w-28 rounded-full object-cover object-center xl:h-[100px] xl:w-[100px]"
      />

      <div className="px-0 md:px-10">
        <h4 className="text-2 xl font-light md:text-4xl">Blockchain | Web3 Developer</h4>
        <p className="mt-1 text-xl font-bold md:text-2xl">Rigor</p>
        <div className="my-2 flex space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src="https://camo.githubusercontent.com/87c727877ec1de86de16d00d2aa5611d267cdceb73a069ca8460f034c62669fa/68747470733a2f2f696d672e69636f6e73382e636f6d2f6e6f6c616e2f36342f657468657265756d2e706e67"
            alt="tech"
          />
          <img
            className="h-10 w-10 rounded-full"
            src="https://camo.githubusercontent.com/87c727877ec1de86de16d00d2aa5611d267cdceb73a069ca8460f034c62669fa/68747470733a2f2f696d672e69636f6e73382e636f6d2f6e6f6c616e2f36342f657468657265756d2e706e67"
            alt="tech"
          />
          <img
            className="h-10 w-10 rounded-full"
            src="https://camo.githubusercontent.com/87c727877ec1de86de16d00d2aa5611d267cdceb73a069ca8460f034c62669fa/68747470733a2f2f696d672e69636f6e73382e636f6d2f6e6f6c616e2f36342f657468657265756d2e706e67"
            alt="tech"
          />
          <img
            className="h-10 w-10 rounded-full"
            src="https://camo.githubusercontent.com/87c727877ec1de86de16d00d2aa5611d267cdceb73a069ca8460f034c62669fa/68747470733a2f2f696d672e69636f6e73382e636f6d2f6e6f6c616e2f36342f657468657265756d2e706e67"
            alt="tech"
          />
        </div>
        <p className="py-5 uppercase text-zinc-300">Started from ... Ended at</p>
        <ul className="ml-5 list-disc space-y-2 text-lg">
          <li>Work summary</li>
          <li>Work summary</li>
          <li>Work summary</li>
          <li>Work summary</li>
        </ul>
      </div>
    </article>
  )
}

export default ExperienceCard
