'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeUpdater() {
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    const userChoice = localStorage.getItem('theme')

    if (!userChoice || userChoice === 'system') {
      const hour = new Date().getHours()
      const autoTheme = hour >= 6 && hour < 18 ? 'light' : 'dark'
      if (theme !== autoTheme) setTheme(autoTheme)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
