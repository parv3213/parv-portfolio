import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import BackgroundCircles from './BackgroundCircles'

const Hero = () => {
  const [text, count] = useTypewriter({
    words: ["Hi, The Name's Parv Garg", '<Guy who loves to code/>'],
    delaySpeed: 2000,
    loop: true,
  })
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-8 overflow-hidden text-center">
      <BackgroundCircles />

      <div className="z-20 space-y-8">
        <Image
          className="mx-auto h-32 w-32 rounded-full object-cover"
          src="https://media.licdn.com/dms/image/D4D03AQEfGcqOu_2aFA/profile-displayphoto-shrink_800_800/0/1665142521830?e=1678320000&v=beta&t=Qj1Pe5P81IEaqpB-YFkRcTUt9IP48dEHKmN7194eoyI"
          alt="Parv's photo"
          width={128}
          height={128}
        />
        <h2 className="pb-2 text-sm uppercase tracking-[15px] text-zinc-500">Software engineer</h2>
        <h1 className="scroll-px-10 text-5xl font-semibold lg:text-6xl">
          <span className="mr-3">{text}</span>
          <Cursor cursorColor="#F7AB0A" />
        </h1>

        <div>
          <Link href="#about" className="heroButton">
            About
          </Link>
          <Link href="#experience" className="heroButton">
            Experience
          </Link>
          <Link href="#skills" className="heroButton">
            Skills
          </Link>
          <Link href="#projects" className="heroButton">
            Projects
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
