// app/provider.tsx (或者你找到的那个文件名)
'use client'

import { ThemeProvider, useTheme } from 'next-themes'
import siteMetadata from '@/data/siteMetadata'
import { useEffect } from 'react'

// 👇 这是我们的主组件，它现在会使用下面的逻辑组件
export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem>
      <ThemeUpdater>{children}</ThemeUpdater>
    </ThemeProvider>
  )
}

// 👇 这是包含我们自动切换逻辑的新组件
function ThemeUpdater({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // 检查用户是否已经手动选择过主题
    const userChoice = localStorage.getItem('theme')

    // 如果用户没有选择，或者选择的是“跟随系统”，则执行自动切换
    if (!userChoice || userChoice === 'system') {
      const currentHour = new Date().getHours() // 获取当前小时 (0-23)

      // 6:00 (含) 到 18:00 (不含) --> 浅色主题
      if (currentHour >= 6 && currentHour < 18) {
        if (theme !== 'light') {
          setTheme('light')
        }
      } else {
        // 其他时间 --> 深色主题
        if (theme !== 'dark') {
          setTheme('dark')
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // 空依赖数组确保此逻辑仅在页面首次加载时运行一次

  return <>{children}</>
}
