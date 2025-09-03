// file: components/Header.tsx

'use client'

import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import Image from 'next/image'
import StatsPanel from './StatsPanel'
import { ChartBarSquareIcon } from '@heroicons/react/24/outline'

const Header = ({ statsData }) => {
  const [isStatsPanelOpen, setIsStatsPanelOpen] = useState(false)

  // Omit the `headerClass` definition for brevity, it remains the same.
  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  // --- highlight-start ---
  // A function to be passed to MobileNav to open the StatsPanel
  const handleStatsPanelOpen = () => setIsStatsPanelOpen(true)
  // --- highlight-end ---

  return (
    <>
      <header className={headerClass}>
        {/* Logo and Site Title Section (no changes here) */}
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          {/* ... code for logo and title remains the same */}
        </Link>

        <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
          {/* Desktop Navigation Links (no changes here) */}
          <div className="no-scrollbar hidden max-w-40 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
                >
                  {link.title}
                </Link>
              ))}
          </div>
          <SearchButton />

          {/* --- highlight-start --- */}
          {/* These buttons are now only visible on sm screens and larger */}
          <div className="hidden items-center space-x-4 sm:flex sm:space-x-6">
            <button
              onClick={handleStatsPanelOpen}
              aria-label="Show statistics panel"
              className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              <ChartBarSquareIcon className="h-6 w-6 text-gray-900 dark:text-gray-100" />
            </button>
            <ThemeSwitch />
          </div>
          {/* We pass the handler to MobileNav, which will be visible on mobile screens */}
          <MobileNav onStatsClick={handleStatsPanelOpen} />
          {/* --- highlight-end --- */}
        </div>
      </header>

      {/* The StatsPanel logic remains the same */}
      <StatsPanel
        isOpen={isStatsPanelOpen}
        onClose={() => setIsStatsPanelOpen(false)}
        statsData={statsData}
      />
    </>
  )
}

export default Header
