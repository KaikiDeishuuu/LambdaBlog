// file: components/MobileNav.tsx (The Final, Prettier-Compliant Version)

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
      {/* 汉堡按钮 (Prettier 格式化) */}
      <button
        aria-label="Toggle Menu"
        aria-expanded={navShow}
        onClick={onToggleNav}
        className="relative z-50 flex h-8 w-8 flex-col items-center justify-center space-y-1 text-gray-900 dark:text-gray-100"
      >
        <span
          className={`h-0.5 w-7 rounded bg-current transition-transform duration-300 ${
            navShow ? 'translate-y-2 rotate-45' : ''
          }`}
        />
        <span
          className={`h-0.5 w-7 rounded bg-current transition-opacity duration-300 ${
            navShow ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`h-0.5 w-7 rounded bg-current transition-transform duration-300 ${
            navShow ? '-translate-y-2 -rotate-45' : ''
          }`}
        />
      </button>

      {/* 侧边栏 */}
      <Transition appear show={navShow} as={Fragment}>
        <Dialog ref={navRef} as="div" className="fixed inset-0 z-40" onClose={onToggleNav}>
          {/* 遮罩 */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black/30"
              onClick={onToggleNav}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onToggleNav()}
            />
          </TransitionChild>

          {/* Panel */}
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
              <DialogPanel
                onClick={(e) => e.stopPropagation()}
                className="flex h-full w-full max-w-xs flex-col items-center justify-center bg-white/80 p-6 backdrop-blur-lg dark:bg-gray-950/80"
              >
                <nav className="flex h-full flex-col items-center justify-center">
                  {menuItems.map((item, index) => (
                    <div
                      key={item.title || `item-${index}`}
                      className="my-4 flex w-full justify-center"
                      style={{
                        transitionProperty: 'all',
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDuration: '300ms',
                        transitionDelay: `${index * 50}ms`,
                      }}
                    >
                      {item.type === 'separator' ? (
                        <div className="w-24 border-t border-gray-300 dark:border-gray-700" />
                      ) : item.type === 'theme' ? (
                        <div className="flex w-full max-w-[180px] items-center justify-between py-2 text-2xl font-medium text-gray-900 dark:text-gray-100">
                          <span>{item.title}</span>
                          <ThemeSwitch />
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={onToggleNav}
                          className="py-2 text-2xl font-medium text-gray-900 dark:text-gray-100"
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