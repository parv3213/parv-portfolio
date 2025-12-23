import Image from 'next/image'
import Link from 'next/link'
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import { urlFor } from '../sanity'
import { PageInfo } from '../typings'
import BackgroundCircles from './BackgroundCircles'

const Hero = ({ pageInfo }: { pageInfo: PageInfo }) => {
  const [text] = useTypewriter({
    words: [`Hi, The Name's ${pageInfo?.name}`, '<Guy who loves to code/>'],
    delaySpeed: 2000,
    loop: true,
  })
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-8 overflow-hidden text-center">
      <BackgroundCircles />

      <div className="z-20 space-y-8">
        <Image
          priority
          className="mx-auto h-32 w-32 rounded-full object-cover"
          src={urlFor(pageInfo?.heroImage).url()}
          alt={pageInfo?.name || "Hero Image"}
          width={128}
          height={128}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <p className="pb-2 text-xs uppercase tracking-[0.5rem] text-zinc-500 sm:text-sm sm:tracking-[15px]">
          {pageInfo?.role}
        </p>
        <h1 className="scroll-px-10 text-base font-semibold sm:text-5xl lg:text-6xl">
          <span className="mr-3 text-zinc-900 dark:text-zinc-50">{text}</span>
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
  );
}

export default Hero
