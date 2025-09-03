// file: components/MobileNav.tsx

'use client'

// 1. 所有必需的 React hooks都在这里导入
import { useState, useRef, useEffect, Fragment } from 'react'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import ThemeSwitch from './ThemeSwitch'
import { ChartBarSquareIcon } from '@heroicons/react/24/outline'

const MobileNav = ({ onStatsClick }) => {
  // 2. State 和 Ref 的完整定义
  const [navShow, setNavShow] = useState(false)
  const navRef = useRef(null)

  // 3. 完整的函数实现
  const onToggleNav = () => {
    setNavShow((status) => {
      // 使用 DialogPanel 的 ref 来锁定滚动
      if (navRef.current) {
        if (status) {
          enableBodyScroll(navRef.current)
        } else {
          disableBodyScroll(navRef.current)
        }
      }
      return !status
    })
  }

  const handleStatsClick = () => {
    onToggleNav() // 先关闭此菜单
    onStatsClick() // 再打开统计面板
  }

  // 组件卸载时清除所有滚动锁定
  useEffect(() => {
    return clearAllBodyScrollLocks
  }, [])

  // 4. 类型安全的 menuItems 数组，确保每个对象都有 'type' 属性
  const menuItems = [
    ...headerNavLinks.map((link) => ({
      ...link,
      type: 'link' as const, // 将这些标识为 'link' 类型
    })),
    { type: 'separator' as const },
    { type: 'stats' as const, title: 'Statistics' },
    { type: 'theme' as const, title: 'Theme' },
  ]

  return (
    <>
      <button
        aria-label="Toggle Menu"
        aria-expanded={navShow}
        onClick={onToggleNav}
        className="hamburger-button h-8 w-8 rounded text-gray-900 sm:hidden dark:text-gray-100"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      <Transition appear show={navShow} as={Fragment}>
        <Dialog ref={navRef} as="div" className="relative z-50" onClose={onToggleNav}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </TransitionChild>

          <div className="fixed inset-0 flex justify-end">
            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-200 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel className="w-full bg-white/80 p-6 backdrop-blur-lg dark:bg-gray-950/80">
                <nav className="flex h-full flex-col items-center justify-center">
                  {menuItems.map((item, index) => (
                    // 5. 使用 'as="div"' 替代 'as={Fragment}' 来应用 style 属性
                    <TransitionChild
                      key={item.title || `item-${index}`}
                      as="div"
                      className="my-4"
                      enter="transition-all ease-in-out duration-300"
                      enterFrom="opacity-0 transform -translate-y-4"
                      enterTo="opacity-100 transform translate-y-0"
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      {/* 根据 'type' 属性渲染，现在不会有 TS 错误 */}
                      {item.type === 'separator' ? (
                        <div className="w-24 border-t border-gray-300 dark:border-gray-700" />
                      ) : item.type === 'stats' ? (
                        <button
                          onClick={handleStatsClick}
                          className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center py-2 text-3xl font-medium text-gray-900 dark:text-gray-100"
                        >
                          <ChartBarSquareIcon className="mr-3 h-7 w-7" />
                          {item.title}
                        </button>
                      ) : item.type === 'theme' ? (
                        <div className="hover:text-primary-500 dark:hover:text-primary-400 flex w-full max-w-[180px] items-center justify-between py-2 text-3xl font-medium text-gray-900 dark:text-gray-100">
                          <span>{item.title}</span>
                          <ThemeSwitch />
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="hover:text-primary-500 dark:hover:text-primary-400 py-2 text-3xl font-medium text-gray-900 dark:text-gray-100"
                          onClick={onToggleNav}
                        >
                          {item.title}
                        </Link>
                      )}
                    </TransitionChild>
                  ))}
                </nav>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileNav
