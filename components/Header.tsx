import React from 'react'
import { SocialIcon } from 'react-social-icons'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Social } from '../typings'
import Image from 'next/image'

const Header = ({ socials }: { socials: Social[] }) => {
  return (
    <header className="sticky top-0 z-20 mx-auto flex max-w-7xl items-start justify-between p-5 xl:items-center">
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
        {socials.map((social) => {
          return <SocialIcon key={social?._id} url={social?.url} fgColor="gray" bgColor="transparent" />
        })}
        {/* <SocialIcon url="https://github.com/parv3213" fgColor="gray" bgColor="transparent" />
        <SocialIcon url="https://twitter.com/parv3213" bgColor="transparent" fgColor="gray" /> */}
      </motion.div>

      <Link href="#contactMe">
        <motion.span
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
          className="flex cursor-pointer items-center">
          <Image src="/mailIcon.svg" alt="Mail Icon" height={25} width={25} className="mx-2 stroke-zinc-400" />
          <p className="hidden text-sm uppercase text-zinc-400 md:inline-flex">Get in touch</p>
        </motion.span>
      </Link>
    </header>
  )
}

export default Header
