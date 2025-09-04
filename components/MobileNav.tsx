'use client'

import { useState, useRef, useEffect, Fragment, JSX } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import ThemeSwitch from './ThemeSwitch'
import { FiHome, FiFileText, FiTag, FiFilm, FiInfo, FiMoon, FiSun, FiX } from 'react-icons/fi'

interface LinkItem {
  type: 'link'
  title: string
  href: string
  icon?: JSX.Element
}

interface ThemeItem {
  type: 'theme'
  title: string
  icon?: JSX.Element
}

interface SeparatorItem {
  type: 'separator'
}

type MenuItem = LinkItem | ThemeItem | SeparatorItem

interface MobileNavProps {
  isOtherPanelOpen?: boolean
}

const MobileNav: React.FC<MobileNavProps> = ({ isOtherPanelOpen = false }) => {
  const [navShow, setNavShow] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

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
    return () => clearAllBodyScrollLocks()
  }, [])

  const menuItems: MenuItem[] = [
    {
      type: 'link',
      title: 'Home',
      href: '/',
      icon: <FiHome className="mr-3 inline-block text-xl" />,
    },
    {
      type: 'link',
      title: 'Blog',
      href: '/blog',
      icon: <FiFileText className="mr-3 inline-block text-xl" />,
    },
    {
      type: 'link',
      title: 'Tags',
      href: '/tags',
      icon: <FiTag className="mr-3 inline-block text-xl" />,
    },
    {
      type: 'link',
      title: 'Anime',
      href: '/anime',
      icon: <FiFilm className="mr-3 inline-block text-xl" />,
    },
    {
      type: 'link',
      title: 'About',
      href: '/about',
      icon: <FiInfo className="mr-3 inline-block text-xl" />,
    },
    { type: 'separator' },
    {
      type: 'theme',
      title: 'Theme',
      icon: <FiMoon className="mr-3 inline-block text-xl" />,
    },
  ]

  if (isOtherPanelOpen) return null

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
              <DialogPanel className="flex h-full w-full max-w-xs flex-col bg-white/90 p-6 shadow-lg backdrop-blur-lg dark:bg-gray-950/90">
                <nav className="flex-grow overflow-y-auto py-8">
                  {menuItems.map((item) => (
                    <div key={item.type + (item.type !== 'separator' ? item.title : '')}>
                      {item.type === 'separator' ? (
                        <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                      ) : item.type === 'theme' ? (
                        <div className="flex w-full items-center justify-between py-2 text-2xl font-medium text-gray-900 dark:text-gray-100">
                          <span className="flex items-center">
                            {item.icon} {item.title}
                          </span>
                          <ThemeSwitch />
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={onToggleNav}
                          className="flex w-full items-center py-2 text-2xl font-medium text-gray-900 dark:text-gray-100"
                        >
                          {item.icon} {item.title}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
                <div className="flex justify-end">
                  <button
                    onClick={onToggleNav}
                    aria-label="Close Menu"
                    className="rounded-full p-2 text-gray-900 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-800"
                  >
                    <FiX className="text-2xl" />
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default MobileNav
