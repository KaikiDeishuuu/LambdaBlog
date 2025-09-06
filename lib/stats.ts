// src/lib/stats.ts

import { allBlogs, allDocs } from 'contentlayer/generated'
import { slug } from 'github-slugger'
import { StatsData } from '../types/stats'

// 健壮的日期格式化函数
const formatDateToYYYYMMDD = (date: string | Date): string => {
  if (!date) return ''
  try {
    const d = new Date(date)
    // 检查日期是否有效
    if (isNaN(d.getTime())) return ''

    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  } catch (e) {
    return ''
  }
}

export function getStatsData(): StatsData {
  const publishedBlogs = allBlogs.filter((p) => !p.draft)
  const publishedDocs = allDocs.filter((d) => !d.draft)

  const totalPosts = publishedBlogs.length
  const totalDocs = publishedDocs.length
  const totalComments = 0

  const tagCounts: Record<string, number> = {}
  publishedBlogs.forEach((blog) => {
    blog.tags?.forEach((tag) => {
      const formattedTag = slug(tag)
      tagCounts[formattedTag] = (tagCounts[formattedTag] || 0) + 1
    })
  })

  const dailyStats: Record<string, number> = {}

  const processDates = (contentItems: { date?: string }[]) => {
    contentItems.forEach((item) => {
      if (item.date) {
        const formattedDate = formatDateToYYYYMMDD(item.date)
        if (formattedDate) {
          dailyStats[formattedDate] = (dailyStats[formattedDate] || 0) + 1
        }
      }
    })
  }

  processDates(publishedBlogs)
  processDates(publishedDocs)

  return { tagCounts, dailyStats, totalPosts, totalDocs, totalComments }
}
