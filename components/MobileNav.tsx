// file: components/MobileNav.tsx

'use client'

import { useState, useRef, useEffect, Fragment } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import ThemeSwitch from './ThemeSwitch'
// The ChartBarSquareIcon is no longer needed here, you can remove it if you wish
// import { ChartBarSquareIcon } from '@heroicons/react/24/outline'

// --- highlight-start ---
// 1. Removed the `onStatsClick` prop from the component definition
const MobileNav = () => {
  // --- highlight-end ---
  const [navShow, setNavShow] = useState(false)
  const navRef = useRef(null)

  const onToggleNav = () => {
    // ...function body remains the same
  }

  // --- highlight-start ---
  // 2. The `handleStatsClick` function is no longer needed and has been removed.
  // --- highlight-end ---

  useEffect(() => {
    return clearAllBodyScrollLocks
  }, [])

  // --- highlight-start ---
  // 3. Removed the 'stats' object from the menuItems array
  const menuItems = [
    ...headerNavLinks.map((link) => ({
      ...link,
      type: 'link' as const,
    })),
    { type: 'separator' as const },
    // { type: 'stats' as const, title: 'Statistics' }, // This line is now gone
    { type: 'theme' as const, title: 'Theme' },
  ]
  // --- highlight-end ---

  return (
    <>
      <button /* ... hamburger button ... */>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      <Transition appear show={navShow} as={Fragment}>
        <Dialog ref={navRef} as="div" className="relative z-50" onClose={onToggleNav}>
          {/* ... Dialog implementation ... */}
          <DialogPanel /* ... props ... */>
            <nav className="flex h-full flex-col items-center justify-center">
              {menuItems.map((item, index) => (
                <TransitionChild key={item.title || `item-${index}`} /* ... props ... */>
                  {/* --- highlight-start --- */}
                  {/* The rendering logic for 'stats' is gone now. The rest remains. */}
                  {item.type === 'separator' ? (
                    <div className="w-24 border-t border-gray-300 dark:border-gray-700" />
                  ) : item.type === 'theme' ? (
                    <div className="hover:text-primary-500 dark:hover:text-primary-400 flex w-full max-w-[180px] items-center justify-between py-2 text-3xl font-medium text-gray-900 dark:text-gray-100">
                      <span>{item.title}</span>
                      <ThemeSwitch />
                    </div>
                  ) : (
                    <Link href={item.href} /* ... props ... */>{item.title}</Link>
                  )}
                  {/* --- highlight-end --- */}
                </TransitionChild>
              ))}
            </nav>
          </DialogPanel>
          {/* ... closing tags ... */}
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileNav
