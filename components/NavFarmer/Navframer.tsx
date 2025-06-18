'use client'

import { Suspense } from 'react'
import { DarkMode } from '@/components/Navbar/DarkMode'
import DropdownListMenu from '@/components/Navbar/DropdownListMenu'
import Logo from '@/components/Navbar/Logo'
import Search from '@/components/Navbar/Search'
import { m, LazyMotion, domAnimation, Variants } from 'framer-motion'

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
}

const NavbarFramer = () => {
  return (
    <LazyMotion features={domAnimation}>
      <m.nav
        className='shadow-xl xl:shadow-xl'
        initial='hidden'
        animate='show'
        variants={container}
      >
        <div className='container   flex flex-col justify-between py-6 sm:flex-row sm:items-center gap-4'>
          {/* Logo */}
          <m.div variants={item}>
            <Logo />
          </m.div>

          {/* Search */}
          <m.div
            className='w-full sm:w-auto'
            variants={item}
          >
            <Suspense>
              <Search />
            </Suspense>
          </m.div>

          <m.div
            className='flex items-center justify-between lg:justify-center gap-4'
            variants={item}
          >
            {/* darkmode */}
            <m.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <DarkMode />
            </m.div>
            <m.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <DropdownListMenu />
            </m.div>
          </m.div>
        </div>
      </m.nav>
    </LazyMotion>
  )
}
export default NavbarFramer