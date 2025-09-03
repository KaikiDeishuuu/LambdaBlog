// file: components/Header.tsx

'use client' // 1. Convert to a Client Component

import { useState } from 'react' // 2. Import useState
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import Image from 'next/image'
import StatsPanel from './StatsPanel' // 3. Import our new panel component
import { ChartBarSquareIcon } from '@heroicons/react/24/outline' // 4. Import an icon for the button

// 5. Modify the component to accept the `statsData` prop
const Header = ({ statsData }) => {
  // 6. Add state to manage the panel's visibility
  const [isStatsPanelOpen, setIsStatsPanelOpen] = useState(false)

  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    // We wrap everything in a React Fragment (<>) to render the panel alongside the header
    <>
      <header className={headerClass}>
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
        <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
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

          {/* 7. Add the new button to open the stats panel */}
          <button
            onClick={() => setIsStatsPanelOpen(true)}
            aria-label="Show statistics panel"
            className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <ChartBarSquareIcon className="h-6 w-6 text-gray-900 dark:text-gray-100" />
          </button>

          <ThemeSwitch />
          <MobileNav />
        </div>
      </header>

      {/* 8. Render the panel, passing the state, data, and a function to close it */}
      <StatsPanel
        isOpen={isStatsPanelOpen}
        onClose={() => setIsStatsPanelOpen(false)}
        statsData={statsData}
      />
    </>
  )
}

export default Header
