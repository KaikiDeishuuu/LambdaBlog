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

        {/* 右侧导航区 */}
        <div className="flex items-center space-x-2 text-sm leading-5 sm:space-x-4">
          
          {/* --- 关键修复 1: 这些控件在所有尺寸下都应该可见 --- */}
          <SearchButton />
          <button onClick={handleStatsPanelOpen} aria-label="Show statistics panel" className="p-1">
            <ChartBarSquareIcon className="h-6 w-6 text-gray-900 dark:text-gray-100" />
          </button>

          {/* --- 关键修复 2: 创建一个只在桌面端显示的容器 --- */}
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
            {/* 桌面端的主题切换按钮 */}
            <ThemeSwitch />
          </div>

          {/* --- 关键修复 3: MobileNav 组件自己负责在移动端显示 --- */}
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
