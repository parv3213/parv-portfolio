import { motion } from 'framer-motion'

/**
 * Subtle ambient background for the hero — two soft gradient orbs that
 * slowly breathe. Much less recognizable than the concentric ring pattern.
 */
const BackgroundCircles = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Primary warm orb — top-left quadrant */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-brand/10 blur-[120px] dark:bg-brand/8"
      />

      {/* Secondary cool orb — bottom-right quadrant */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0.4, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full bg-zinc-400/10 blur-[100px] dark:bg-zinc-500/10"
      />

      {/* Subtle centre glow behind the avatar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/6 blur-[80px] dark:bg-brand/5"
      />
    </div>
  )
}

export default BackgroundCircles
