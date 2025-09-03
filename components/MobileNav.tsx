// file: components/MobileNav.tsx (The One True Final Version)

'use client'

import { useState, useRef, useEffect, Fragment } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
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
    ...headerNavLinks.map((link) => ({
      ...link,
      type: 'link' as const,
    })),
    { type: 'separator' as const },
    { type: 'theme' as const, title: 'Theme' },
  ]

  return (
    // 关键结构 1: 根容器，用 sm:hidden 来全权负责“只在手机上显示”
    <div className="sm:hidden">
      {/* 汉堡包按钮，它只负责自己的外观和点击事件 */}
      <button
        aria-label="Toggle Menu"
        aria-expanded={navShow}
        onClick={onToggleNav}
        className="hamburger-button h-8 w-8 rounded text-gray-900 dark:text-gray-100"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* 我们之前精心制作的、功能完整的 Transition 和 Dialog 弹窗 */}
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
                    <TransitionChild
                      key={item.title || `item-${index}`}
                      as="div"
                      className="my-4"
                      enter="transition-all ease-in-out duration-300"
                      enterFrom="opacity-0 transform -translate-y-4"
                      enterTo="opacity-100 transform translate-y-0"
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      {item.type === 'separator' ? (
                        <div className="w-24 border-t border-gray-300 dark:border-gray-700" />
                      ) : item.type === 'theme' ? (
                        <div className="flex w-full max-w-[180px] items-center justify-between py-2 text-3xl font-medium text-gray-900 dark:text-gray-100">
                          <span>{item.title}</span>
                          <ThemeSwitch />
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="py-2 text-3xl font-medium text-gray-900 dark:text-gray-100"
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
    </div>
  )
}

export default MobileNav
