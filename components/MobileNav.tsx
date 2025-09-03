'use client'

import { useState, useRef, useEffect, Fragment } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import ThemeSwitch from './ThemeSwitch'

interface MobileNavProps {
  isOtherPanelOpen?: boolean
}

const MobileNav: React.FC<MobileNavProps> = ({ isOtherPanelOpen = false }) => {
  const [navShow, setNavShow] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  const onToggleNav = () => {
  setNavShow((status) => {
    if (navRef.current) {
      status && enableBodyScroll(navRef.current)
      !status && disableBodyScroll(navRef.current)
    }
    return !status
  })
}

  useEffect(() => {
    return () => clearAllBodyScrollLocks()
  }, [])

  const menuItems = [
    ...headerNavLinks.map((link) => ({ ...link, type: 'link' as const })),
    { type: 'separator' as const },
    { type: 'theme' as const, title: 'Theme' },
  ]

  if (isOtherPanelOpen) return null // 当其他面板打开时隐藏汉堡按钮

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-label="Toggle Menu"
        aria-expanded={navShow}
        onClick={onToggleNav}
        className="hamburger-button"
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>

      <Transition appear show={navShow} as={Fragment}>
        <Dialog ref={navRef} as="div" className="fixed inset-0 z-50" onClose={onToggleNav}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
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
              <DialogPanel className="flex h-full w-full max-w-xs flex-col bg-white/90 p-6 backdrop-blur-lg dark:bg-gray-950/90">
                <nav className="flex-grow overflow-y-auto py-8">
                  {menuItems.map((item) => (
                    <div key={item.title || `item-${item.type}`} className="my-4 flex w-full">
                      {item.type === 'separator' ? (
                        <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                      ) : item.type === 'theme' ? (
                        <div className="flex w-full items-center justify-between py-2 text-2xl font-medium text-gray-900 dark:text-gray-100">
                          <span>{item.title}</span>
                          <ThemeSwitch />
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={onToggleNav}
                          className="w-full py-2 text-2xl font-medium text-gray-900 dark:text-gray-100"
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

