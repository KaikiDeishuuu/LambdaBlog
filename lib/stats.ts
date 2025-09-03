// file: lib/stats.ts

import { allBlogs } from 'contentlayer/generated'
import { StatsData } from '../types/stats' // <<< 1. 导入共享类型

export const getStatsData = (): StatsData => {
  // <<< 2. 明确函数的返回类型
  const totalPosts: number = allBlogs.length
  const totalComments: number = 0

  const tagCounts: Record<string, number> = {}
  allBlogs.forEach((blog) => {
    blog.tags?.forEach((tag: string) => (tagCounts[tag] = (tagCounts[tag] || 0) + 1))
  })

  const dailyStats: Record<string, number> = {}
  allBlogs.forEach((blog) => {
    if (blog.date) {
      const date = blog.date.split('T')[0]
      dailyStats[date] = (dailyStats[date] || 0) + 1
    }
  })

  // <<< 3. 返回的对象现在会经过严格的类型检查
  return { totalPosts, totalComments, tagCounts, dailyStats }
}
