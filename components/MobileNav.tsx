// file: components/MobileNav.tsx (The Final, Correct, and Polished Version)

'use client'

import { useState, useRef, useEffect, Fragment } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import ThemeSwitch from './ThemeSwitch'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const navRef = useRef(null)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (navRef.current) {
        if (status) enableBodyScroll(navRef.current)
        else disableBodyScroll(navRef.current)
      }
      return !status
    })
  }

  useEffect(() => {
    return clearAllBodyScrollLocks
  }, [])

  const menuItems = [
    ...headerNavLinks.map((link) => ({ ...link, type: 'link' as const })),
    { type: 'separator' as const },
    { type: 'theme' as const, title: 'Theme' },
  ]

  return (
    <div className="sm:hidden">
      {/* 1. 唯一的“汉堡/X”按钮 */}
      {/* 提高了 z-index (z-50) 确保它永远在最上层 */}
      <button
        aria-label="Toggle Menu"
        aria-expanded={navShow}
        onClick={onToggleNav}
        className="relative z-50 flex h-8 w-8 flex-col items-center justify-center space-y-1"
      >
        <span
          className={`h-0.5 w-7 rounded bg-current transition-transform duration-300 ${
            navShow ? 'translate-y-1.5 rotate-45' : ''
          }`}
        />
        <span
          className={`h-0.5 w-7 rounded bg-current transition-opacity duration-300 ${
            navShow ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`h-0.5 w-7 rounded bg-current transition-transform duration-300 ${
            navShow ? '-translate-y-1.5 -rotate-45' : ''
          }`}
        />
      </button>

      {/* 侧边栏 */}
      <Transition appear show={navShow} as={Fragment}>
        <Dialog
          ref={navRef}
          as="div"
          className="fixed inset-0 z-40" // 侧边栏本身层级较低 (z-40)
          onClose={onToggleNav}
        >
          {/* 背景遮罩 */}
          <TransitionChild as={Fragment} /* ... */>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </TransitionChild>

          {/* 侧边栏面板 */}
          <div className="fixed inset-0 flex justify-end">
            <TransitionChild as={Fragment} /* ... */>
              {/* 2. 解决了遮挡和滚动问题 */}
              {/* flex-col 让内容垂直排列，overflow-y-auto 允许在内容过多时滚动 */}
              <DialogPanel
                className="flex h-full w-full max-w-xs flex-col bg-white/90 p-6 backdrop-blur-lg dark:bg-gray-950/90"
                onClick={(e) => e.stopPropagation()}
              >
                {/* 
                  3. 移除了所有多余的、丑陋的、功能损坏的 'X' 按钮。
                  现在关闭菜单的唯一方式就是：
                  - 点击已经变成 'X' 的汉堡包按钮
                  - 点击背景遮罩
                  - 点击任意一个导航链接
                */}
                <nav className="flex-grow overflow-y-auto py-8">
                  {menuItems.map((item, index) => (
                    <div
                      key={item.title || `item-${index}`}
                      className="my-4 flex w-full"
                      // ... (动画部分保持不变)
                    >
                      {item.type === 'separator' ? (
                        <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                      ) : item.type === 'theme' ? (
                        <div className="flex w-full items-center justify-between text-2xl font-medium text-gray-900 dark:text-gray-100">
                          <span>{item.title}</span>
                          <ThemeSwitch />
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={onToggleNav}
                          className="w-full text-2xl font-medium text-gray-900 dark:text-gray-100"
                        >
                          {item.title}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default MobileNav
