import React from 'react'
import { motion } from 'framer-motion'

const Project = () => {
  return (
    <div className="flex h-screen max-h-[70vh] w-[500px] max-w-3xl flex-shrink-0 snap-center flex-col items-center justify-center space-y-10 overflow-y-scroll px-10 text-center">
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="h-32 w-32"
        src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png"
        alt="Project Image"
      />

      <h3 className="text-2xl md:text-4xl">Netflix Clone</h3>
      <p className="text-center md:text-left">
        Netflix clone is a streaming service that uses a subscription model to provide content to users. It is modeled
        after the popular streaming service Netflix and utilizes many of the same features, such as a library of movies
        and TV shows, personalized content recommendations, and streaming to a range of devices. Netflix clone can
        provide users with a great deal of convenience, allowing them to watch the content they want when they want. It
        also has advantages over traditional cable TV, such as the ability to set up profiles to customize viewing
        experiences and access content even when offline. Compared to Netflix, Netflix clone may offer different
        programming, including a more extensive selection of local content, as well as different pricing plans.
        Additionally, its user interface may be more basic and easier to navigate. Netflix clone can be an effective way
        for people to access streaming content without the higher cost associated with a subscription to Netflix.
      </p>
    </div>
  )
}

export default Project
