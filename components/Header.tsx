import { Mail, Menu, Moon, Sun, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Social } from '../typings'
import SocialLink from './SocialLink'

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
              <SocialLink
                key={social?._id}
                social={social}
                color={iconColor}
                size={22}
                className="p-2 transition-all duration-150 ease-in-out hover:scale-110"
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
              <Mail className="h-5 w-5 sm:h-6 sm:w-6" color={iconColor} strokeWidth={1.5} />
            </Link>

            {/* Theme toggle */}
            {loaded && (
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="flex cursor-pointer items-center justify-center rounded-lg p-1"
                aria-label="Toggle Theme"
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-zinc-400 hover:text-zinc-100 sm:h-6 sm:w-6" strokeWidth={1.5} />
                ) : (
                  <Moon className="h-5 w-5 text-zinc-400 hover:text-zinc-900 sm:h-6 sm:w-6" strokeWidth={1.5} />
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
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" strokeWidth={1.5} />
                ) : (
                  <Menu className="h-6 w-6" strokeWidth={1.5} />
                )}
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
                  <X className="h-5 w-5" strokeWidth={1.5} />
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
                    <SocialLink
                      key={social?._id}
                      social={social}
                      color={iconColor}
                      size={24}
                      className="p-2 transition-all duration-150 ease-in-out hover:scale-110"
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
