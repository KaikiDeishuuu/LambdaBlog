// src/components/ReadingProgressBar.tsx
'use client'

import { useEffect, useState } from 'react'

export const ReadingProgressBar = () => {
  const [width, setWidth] = useState(0)

  // 监听滚动事件来更新进度
  useEffect(() => {
    const scrollListener = () => {
      const element = document.documentElement
      const totalHeight = element.scrollHeight - element.clientHeight
      setWidth((element.scrollTop / totalHeight) * 100)
    }

    // 添加事件监听
    window.addEventListener('scroll', scrollListener)

    // 在组件卸载时移除事件监听
    return () => window.removeEventListener('scroll', scrollListener)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 z-50 h-1 bg-teal-600 transition-all duration-300 ease-out"
      style={{
        width: `${width}%`,
        // 添加一点漂亮的辉光效果
        boxShadow: `0 0 10px #0d9488, 0 0 5px #0d9488`,
      }}
    />
  )
}

export default ReadingProgressBar
