// src/lib/stats.ts

import { allBlogs, allDocs } from 'contentlayer/generated'
import { slug } from 'github-slugger'
import { StatsData } from '../types/stats'

// 这是一个更健壮、能避免时区问题的日期格式化函数
const formatDateToYYYYMMDD = (date: string | Date): string => {
  if (!date) return ''
  try {
    const d = new Date(date)
    // 检查日期是否有效
    if (isNaN(d.getTime())) return ''

    // 使用 getUTC... 方法来避免本地时区的影响
    const year = d.getUTCFullYear()
    const month = String(d.getUTCMonth() + 1).padStart(2, '0')
    const day = String(d.getUTCDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  } catch (e) {
    return '' // 如果 new Date() 失败，返回空字符串
  }
}

export function getStatsData(): StatsData {
  const publishedBlogs = allBlogs.filter((p) => !p.draft)
  const publishedDocs = allDocs.filter((d) => !d.draft)

  const totalPosts = publishedBlogs.length
  const totalDocs = publishedDocs.length
  const totalComments = 0

  const tagCounts: Record<string, number> = {
    /* ... */
  }

  const dailyStats: Record<string, number> = {}

  const processDates = (contentItems: { date?: string }[]) => {
    contentItems.forEach((item) => {
      if (item.date) {
        // --- 确保这里使用了新的、健壮的格式化函数 ---
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
