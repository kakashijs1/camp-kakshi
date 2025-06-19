"use client";

import { Suspense } from "react";
import { DarkMode } from "@/components/Navbar/DarkMode";
import DropdownListMenu from "@/components/Navbar/DropdownListMenu";
import Logo from "@/components/Navbar/Logo";
import Search from "@/components/Navbar/Search";
import { m, LazyMotion, domAnimation, Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0, y: -100 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      staggerChildren: 0.1,
      delayChildren: 0.3,
      stiffness: 100,
      damping: 10,
      delay: 0.1
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      delay: 0.3
    },
  },
};

const NavbarFramer = () => {
  return (
    <LazyMotion features={domAnimation}>
      <m.nav
        className="shadow-md xl:shadow-xl rounded-b-2xl border"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <div className="container px-4 py-4 sm:py-6">
          {/* Mobile Layout: Logo + Controls in one row, Search below */}
          <div className="flex sm:hidden items-center justify-between mb-3">
            <m.div variants={item}>
              <Logo />
            </m.div>
            
            <m.div
              className="flex items-center gap-3"
              variants={item}
            >
              <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <DarkMode />
              </m.div>
              <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <DropdownListMenu />
              </m.div>
            </m.div>
          </div>
          
          {/* Mobile Search */}
          <m.div className="sm:hidden w-full" variants={item}>
            <Suspense>
              <Search />
            </Suspense>
          </m.div>

          {/* Desktop Layout: All in one row */}
          <div className="hidden sm:flex items-center justify-between gap-4">
            <m.div variants={item}>
              <Logo />
            </m.div>

            <m.div className="flex-1 max-w-md mx-8" variants={item}>
              <Suspense>
                <Search />
              </Suspense>
            </m.div>

            <m.div
              className="flex items-center gap-4"
              variants={item}
            >
              <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <DarkMode />
              </m.div>
              <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <DropdownListMenu />
              </m.div>
            </m.div>
          </div>
        </div>
      </m.nav>
    </LazyMotion>
  );
};
export default NavbarFramer;
