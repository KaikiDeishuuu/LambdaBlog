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
  const handleStatsPanelOpen = () => setIsStatsPanelOpen(true)

  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <>
      <header className={headerClass}>
        {/* Logo and Title (Left side) - No changes here */}
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Image
                src={siteMetadata.siteLogo}
                alt="logo"
                width={194}
                height={184}
                className="dark:invert-0"
              />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>

        {/* Action Buttons (Right side) */}
        <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
          {/* Desktop Nav links - No changes here */}
          <div className="no-scrollbar hidden max-w-40 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link key={link.title} href={link.href} /* ...props */>
                  {link.title}
                </Link>
              ))}
          </div>

          <SearchButton />

          {/* --- highlight-start --- */}
          {/* 1. Statistics button is now outside the responsive div, so it's always visible */}
          <button
            onClick={handleStatsPanelOpen}
            aria-label="Show statistics panel"
            className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <ChartBarSquareIcon className="h-6 w-6 text-gray-900 dark:text-gray-100" />
          </button>

          {/* 2. This div now ONLY contains the ThemeSwitch and is hidden on mobile */}
          <div className="hidden sm:block">
            <ThemeSwitch />
          </div>

          {/* 3. MobileNav no longer needs the onStatsClick prop */}
          <MobileNav />
          {/* --- highlight-end --- */}
        </div>
      </header>

      {/* StatsPanel - No changes here */}
      <StatsPanel
        isOpen={isStatsPanelOpen}
        onClose={() => setIsStatsPanelOpen(false)}
        statsData={statsData}
      />
    </>
  )
}

export default Header
