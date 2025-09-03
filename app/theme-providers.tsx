// app/theme-providers.tsx
'use client'

import { ThemeProvider, useTheme } from 'next-themes'
import siteMetadata from '@/data/siteMetadata'
import { useEffect } from 'react'

interface ThemeProvidersProps {
  children: React.ReactNode
}

export function ThemeProviders({ children }: ThemeProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem>
      <ThemeUpdater>{children}</ThemeUpdater>
    </ThemeProvider>
  )
}

function ThemeUpdater({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // 获取用户是否手动选择过主题
    const userChoice = localStorage.getItem('theme')

    // 如果没有选择或选择 system，则按时间自动切换
    if (!userChoice || userChoice === 'system') {
      const hour = new Date().getHours()
      if (hour >= 6 && hour < 18) {
        if (theme !== 'light') setTheme('light')
      } else {
        if (theme !== 'dark') setTheme('dark')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // 空依赖数组确保只在首次加载时执行

  return <>{children}</>
}
