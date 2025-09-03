// file: types/stats.d.ts

export type StatsData = {
  totalPosts: number
  totalComments: number
  tagCounts: Record<string, number>
  dailyStats: Record<string, number>
}
