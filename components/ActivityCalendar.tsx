// src/components/ActivityCalendar.tsx
'use client'

import type { ThemeInput, Activity } from 'react-activity-calendar'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const ActivityCalendar = dynamic(() => import('react-activity-calendar'), { ssr: false })

interface Props {
  dailyStats?: Record<string, number>
}

const PostActivityCalendar = ({ dailyStats = {} }: Props) => {
  const { theme } = useTheme()

  const data: Activity[] = Object.entries(dailyStats).map(([date, count]) => ({
    date,
    count,
    level: Math.min(count, 4),
  }))

  const colorTheme: ThemeInput = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  }

  if (data.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-md dark:bg-slate-800">
        <h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-gray-200">文章贡献日历</h3>
        <div className="flex h-32 animate-pulse items-center justify-center rounded-md bg-gray-100 text-gray-500 dark:bg-gray-900/50 dark:text-gray-400">
          <p>暂无贡献数据</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-md dark:bg-slate-800">
      <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-gray-200">文章贡献日历</h3>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="text-gray-700 dark:text-gray-300">
          <ActivityCalendar
            data={data}
            theme={colorTheme}
            labels={{
              months: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              totalCount: '{{count}} contributions in {{year}}',
              legend: { less: 'Less', more: 'More' },
            }}
            showWeekdayLabels
          />
        </div>
      </motion.div>
    </div>
  )
}

export default PostActivityCalendar
