// file: components/MobileNav.tsx (The Final, Cleaned Version, v4 Compatible)

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
        if (status) {
          enableBodyScroll(navRef.current)
        } else {
          disableBodyScroll(navRef.current)
        }
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
      {/* --- 关键修改：按钮现在变得非常干净和语义化 --- */}
      <button
        aria-label="Toggle Menu"
        aria-expanded={navShow} // 这个属性是 CSS 动画的“开关”
        onClick={onToggleNav}
        className="hamburger-button" // <<< 1. 只使用我们刚刚在 CSS 中定义的 .hamburger-button 类
      >
        {/* 2. 三条线现在也只使用 .hamburger-line 类，不再需要任何动态的 Tailwind 类 */}
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* 侧边栏的 Transition 和 Dialog 部分完全保持不变 */}
      <Transition appear show={navShow} as={Fragment}>
        <Dialog ref={navRef} as="div" className="fixed inset-0 z-40" onClose={onToggleNav}>
          {/* ... (侧边栏内部的所有逻辑和样式都保持不变) ... */}
          <TransitionChild as={Fragment} /*...*/ >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </TransitionChild>
          <div className="fixed inset-0 flex justify-end">
            <TransitionChild as={Fragment} /*...*/ >
              <DialogPanel className="flex h-full w-full max-w-xs flex-col bg-white/90 p-6 backdrop-blur-lg dark:bg-gray-950/90">
                 <nav className="flex-grow overflow-y-auto py-8">
                  {/* ... (menuItems.map 的逻辑保持不变) ... */}
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
