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
import { StatsData } from '../types/stats'

const Header = ({ statsData }: { statsData: StatsData }) => {
  const [isStatsPanelOpen, setIsStatsPanelOpen] = useState(false)
  const handleStatsPanelOpen = () => setIsStatsPanelOpen(true)

  const headerClass =
    'flex items-center justify-between bg-white py-10 dark:bg-gray-950' +
    (siteMetadata.stickyNav ? ' sticky top-0 z-50' : '')

  return (
    <>
      <header className={headerClass}>
        {/* 左侧的 Logo 和标题，保持不变 */}
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Image src={siteMetadata.siteLogo} alt="logo" width={194} height={184} />
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

        {/* --- 这是唯一的、最终的修改 --- */}
        {/* 右侧的所有导航和按钮 */}
        <div className="flex items-center text-sm leading-5">
          {/* 盒子一：桌面工具箱 (只在 sm 及以上屏幕显示: "hidden sm:flex") */}
          <div className="hidden items-center space-x-4 sm:flex">
            {/* 桌面端的文字链接 */}
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="font-medium text-gray-900 dark:text-gray-100"
                >
                  {link.title}
                </Link>
              ))}
            {/* 桌面端的图标按钮 */}
            <SearchButton />
            <button onClick={handleStatsPanelOpen} aria-label="Show statistics panel">
              <ChartBarSquareIcon className="h-6 w-6 text-gray-900 dark:text-gray-100" />
            </button>
            <ThemeSwitch />
          </div>

          {/* 盒子二：手机工具箱 (只在 sm 以下屏幕显示，因为 MobileNav 内部有 "sm:hidden") */}
          <MobileNav />
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
