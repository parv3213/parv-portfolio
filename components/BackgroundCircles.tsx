import { motion } from 'framer-motion'

const BackgroundCircles = () => {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{
        opacity: 0,
      }}
      animate={{
        scale: [1, 2, 2, 3, 1],
        opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 1.0],
      }}
      transition={{
        duration: 2.5,
      }}
    >
      <div className="absolute mt-52 h-[260px] w-[260px] rounded-full bg-amber-200/20 blur-3xl dark:bg-amber-500/10" />

      <div className="absolute mt-52 h-[200px] w-[200px] animate-ping rounded-full border border-zinc-300 dark:border-zinc-700" />
      <div className="absolute mt-52 h-[320px] w-[320px] rounded-full border border-zinc-300 dark:border-zinc-700" />
      <div className="absolute mt-52 h-[520px] w-[520px] rounded-full border border-zinc-200 dark:border-zinc-800" />
      <div className="absolute mt-52 h-[680px] w-[680px] animate-pulse rounded-full border border-amber-400/60 dark:border-amber-500/30" />
      <div className="absolute mt-52 h-[860px] w-[860px] rounded-full border border-zinc-200 dark:border-zinc-800" />
    </motion.div>
  );
}

export default BackgroundCircles
