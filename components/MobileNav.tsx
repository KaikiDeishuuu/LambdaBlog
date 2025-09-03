'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { Fragment, useState, useEffect, useRef } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
// --- highlight-start ---
import ThemeSwitch from './ThemeSwitch' // 1. Import ThemeSwitch
import { ChartBarSquareIcon } from '@heroicons/react/24/outline' // 2. Import the icon
// --- highlight-end ---

// --- highlight-start ---
// 3. Accept the `onStatsClick` prop from the Header component
const MobileNav = ({ onStatsClick }) => {
  // --- highlight-end ---
  const [navShow, setNavShow] = useState(false)
  const navRef = useRef(null)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        enableBodyScroll(navRef.current)
      } else {
        disableBodyScroll(navRef.current)
      }
      return !status
    })
  }

  // --- highlight-start ---
  // 4. Create a handler that closes this nav and opens the stats panel
  const handleStatsClick = () => {
    onToggleNav() // First, close the mobile navigation
    onStatsClick() // Then, call the function passed from the parent to open the stats panel
  }
  // --- highlight-end ---

  useEffect(() => {
    return clearAllBodyScrollLocks
  }, [])

  return (
    <>
      <button aria-label="Toggle Menu" onClick={onToggleNav} className="sm:hidden">
        {/* Hamburger Icon SVG (no changes here) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="hover:text-primary-500 dark:hover:text-primary-400 h-8 w-8 text-gray-900 dark:text-gray-100"
        >
          {/* ... path data ... */}
        </svg>
      </button>
      <Transition appear show={navShow} as={Fragment} unmount={false}>
        <Dialog as="div" onClose={onToggleNav} unmount={false}>
          {/* ... TransitionChild for background overlay (no changes here) ... */}
          <TransitionChild
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            // ... other props ...
          >
            <DialogPanel className="fixed top-0 left-0 z-70 h-full w-full bg-white/95 duration-300 dark:bg-gray-950/98">
              {/* --- highlight-start --- */}
              {/* 5. Update the navigation panel content */}
              <nav
                ref={navRef}
                className="mt-8 flex h-full basis-0 flex-col overflow-y-auto px-8 pt-2 text-left"
              >
                {/* Main Navigation Links */}
                {headerNavLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="hover:text-primary-500 dark:hover:text-primary-400 mb-4 py-2 pr-4 text-2xl font-bold tracking-widest text-gray-900 outline-0 dark:text-gray-100"
                    onClick={onToggleNav}
                  >
                    {link.title}
                  </Link>
                ))}

                {/* Separator */}
                <div className="my-6 border-t border-gray-200 dark:border-gray-800" />

                {/* Secondary Actions */}
                <div className="flex flex-col gap-y-4">
                  {/* Statistics Button */}
                  <button
                    onClick={handleStatsClick}
                    className="hover:text-primary-500 dark:hover:text-primary-400 flex w-full items-center text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                  >
                    <ChartBarSquareIcon className="mr-4 h-8 w-8" />
                    Statistics
                  </button>

                  {/* Theme Switch */}
                  <div className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center justify-between text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100">
                    <span className="py-2">Theme</span>
                    <ThemeSwitch />
                  </div>
                </div>
              </nav>
              {/* --- highlight-end --- */}
              <button
                className="hover:text-primary-500 dark:hover:text-primary-400 fixed top-7 right-4 z-80 h-16 w-16 p-4 text-gray-900 dark:text-gray-100"
                aria-label="Toggle Menu"
                onClick={onToggleNav}
              >
                {/* Close Icon SVG (no changes here) */}
              </button>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileNav
