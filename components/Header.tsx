// src/components/Header.tsx
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
import { StatsData } from '../types/stats'
// 关键：直接导入我们自己的 ReadingProgressBar 组件，不再需要 dynamic
import ReadingProgressBar from './ReadingProgressBar'

const Header = ({ statsData }: { statsData: StatsData }) => {
  const [isStatsPanelOpen, setIsStatsPanelOpen] = useState(false)
  const handleStatsPanelOpen = () => setIsStatsPanelOpen(true)

  const headerClass = `sticky top-0 z-40 flex items-center justify-between bg-white/70 py-6 backdrop-blur-sm dark:bg-gray-950/70`

  return (
    <>
      {/* 直接渲染我们自己的、100% 兼容的阅读进度条 */}
      <ReadingProgressBar />

      <header className={headerClass}>
        {/* 左侧的 Logo 和标题 */}
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Image src={siteMetadata.siteLogo} alt="logo" width={184} height={184} />
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

        {/* 右侧导航区 */}
        <div className="flex items-center space-x-2 text-sm leading-5 sm:space-x-4">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hidden font-medium text-gray-900 sm:block dark:text-gray-100"
              >
                {link.title}
              </Link>
            ))}

          <SearchButton />

          <button onClick={handleStatsPanelOpen} aria-label="Show statistics panel" className="p-1">
            <ChartBarSquareIcon className="h-6 w-6 text-gray-900 dark:text-gray-100" />
          </button>

          <ThemeSwitch />

          <MobileNav isOtherPanelOpen={isStatsPanelOpen} />
        </div>
      </header>

      <StatsPanel
        isOpen={isStatsPanelOpen}
        onClose={() => setIsStatsPanelOpen(false)}
        statsData={statsData}
      />
    </>
  )
}

export default Header
