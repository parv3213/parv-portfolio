import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SocialIcon } from 'react-social-icons'
import { Social } from '../typings'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#contactMe', label: 'Contact' },
]

const Header = ({ socials }: { socials: Social[] }) => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [loaded, setLoaded] = useState(false)
  const [heroBackdrop, setHeroBackdrop] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isDark = theme === 'dark' || resolvedTheme === 'dark'

  useEffect(() => setLoaded(true), [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  useEffect(() => {
    const scrollRoot = document.getElementById("layout-scroll")
    const hero = document.getElementById("hero")
    if (!scrollRoot || !hero) return

    const updateHeroBackdrop = () => {
      const rect = hero.getBoundingClientRect()
      setHeroBackdrop(rect.bottom > 120 && rect.top < window.innerHeight * 0.55)
    }

    updateHeroBackdrop()
    scrollRoot.addEventListener("scroll", updateHeroBackdrop, { passive: true })
    window.addEventListener("resize", updateHeroBackdrop)
    return () => {
      scrollRoot.removeEventListener("scroll", updateHeroBackdrop)
      window.removeEventListener("resize", updateHeroBackdrop)
    }
  }, [])

  const shellClass = heroBackdrop
    ? "border-b border-zinc-200/35 bg-gradient-to-b from-white/90 via-white/75 to-white/40 shadow-none backdrop-blur-md dark:border-zinc-800/40 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900 dark:shadow-none dark:backdrop-blur-none"
    : "border-b border-zinc-200/80 bg-zinc-50/90 shadow-sm backdrop-blur-md dark:border-zinc-700/80 dark:bg-zinc-800/90"

  const iconColor = isDark ? 'gray' : 'rgb(113 113 122)'

  return (
    <>
      <header
        className={`fixed top-0 z-40 w-full transition-[background-color,box-shadow,border-color] duration-300 ease-out ${shellClass}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2.5 sm:p-5">
          {/* Social Icons — left side (desktop) */}
          <motion.div
            initial={{ x: -500, opacity: 0, scale: 0.5 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="flex items-center"
          >
            {socials.map((social) => (
              <SocialIcon
                key={social?._id}
                url={social?.url}
                fgColor={iconColor}
                bgColor="transparent"
                className="h-9 w-9 transition-all duration-150 ease-in-out hover:scale-105 sm:h-10 sm:w-10"
                aria-label={social?.title || 'Social Link'}
              />
            ))}
          </motion.div>

          {/* Right side controls */}
          <motion.div
            initial={{ x: 500, opacity: 0, scale: 0.5 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="flex items-center gap-1 sm:gap-2"
          >
            {/* Contact link (desktop only) */}
            <Link
              href="#contactMe"
              className="mr-1 hidden items-center transition-all duration-150 ease-in-out hover:scale-[1.03] md:flex"
              aria-label="Contact Me"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke={iconColor}
                className="h-5 w-5 sm:h-6 sm:w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </Link>

            {/* Theme toggle */}
            {loaded && (
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="flex cursor-pointer items-center justify-center rounded-lg p-1"
                aria-label="Toggle Theme"
              >
                {isDark ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 fill-zinc-400 hover:fill-zinc-100 sm:h-6 sm:w-6">
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 fill-zinc-400 hover:fill-zinc-900 sm:h-6 sm:w-6">
                    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            )}

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="flex items-center justify-center rounded-lg p-1.5 md:hidden"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
              <svg
                className="h-6 w-6 text-zinc-600 dark:text-zinc-300"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </motion.div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.nav
              key="mobile-nav-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-zinc-50 shadow-2xl dark:bg-zinc-900 md:hidden"
              aria-label="Mobile navigation"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between border-b border-zinc-200/80 px-5 py-4 dark:border-zinc-800">
                <span className="font-display text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  Navigation
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-200/60 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  aria-label="Close menu"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <ul className="flex flex-1 flex-col gap-1 px-3 py-4">
                {NAV_LINKS.map(({ href, label }, i) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.05 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center rounded-xl px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-200/60 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    >
                      {label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Social icons at bottom */}
              <div className="border-t border-zinc-200/80 px-5 py-4 dark:border-zinc-800">
                <div className="flex items-center gap-1">
                  {socials.map((social) => (
                    <SocialIcon
                      key={social?._id}
                      url={social?.url}
                      fgColor={iconColor}
                      bgColor="transparent"
                      className="h-9 w-9"
                      aria-label={social?.title || 'Social Link'}
                    />
                  ))}
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
