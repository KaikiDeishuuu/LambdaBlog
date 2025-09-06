// src/types/stats.ts

export interface StatsData {
  tagCounts: Record<string, number>
  dailyStats: Record<string, number>
  totalPosts: number
  totalDocs: number
  totalComments: number
}
