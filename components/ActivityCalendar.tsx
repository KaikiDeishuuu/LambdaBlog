'use client'

// --- 关键修改 1: 只从库中导入类型 ---
import type { ThemeInput, Activity } from 'react-activity-calendar'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
// --- 关键修改 2: 导入 'dynamic' ---
import dynamic from 'next/dynamic'

const LoadingPlaceholder = () => (
  <div className="flex h-32 animate-pulse items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
    <p className="text-gray-500">Loading Calendar...</p>
  </div>
)
// --- 关键修改 3: 使用 dynamic 异步加载并禁用 SSR ---
const ActivityCalendar = dynamic(() => import('react-activity-calendar'), {
  ssr: false,
  // --- 在这里添加 loading 属性 ---
  loading: () => <LoadingPlaceholder />,
})

interface Props {
  dailyStats?: Record<string, number>
}

// Enhanced CustomTooltip with arrow and smoother animation
const CustomTooltip = ({ activity }: { activity: Activity }) => {
  return (
    <div className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 -translate-y-[calc(100%+12px)] transform rounded-lg bg-gray-900 px-3 py-2 text-xs text-white opacity-0 shadow-xl transition-all duration-300 ease-in-out group-hover:-translate-y-[calc(100%+8px)] group-hover:opacity-100 dark:bg-gray-800">
      <strong className="text-teal-300">{activity.count} contributions</strong> on {activity.date}
      {/* Arrow (您可以根据喜好取消注释)
      <div className="absolute -bottom-1 left-1/2 h-0 w-0 -translate-x-1/2 border-x-8 border-t-8 border-x-transparent border-t-gray-900 dark:border-t-gray-800" />
      */}
    </div>
  )
}

const PostActivityCalendar = ({ dailyStats = {} }: Props) => {
  const { theme } = useTheme()

  const data: Activity[] = Object.entries(dailyStats).map(([date, count]) => ({
    date,
    count,
    level: Math.min(count, 4),
  }))

  const colorTheme: ThemeInput = {
    light: ['#ebedf0', '#99d8c9', '#66c2a5', '#36a783', '#0d9488'],
    dark: ['#171717', '#0d9488', '#14b8a6', '#5eead4', '#f0fdfa'],
  }

  if (data.length === 0) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-gray-200">文章贡献日历</h3>
        <div className="flex h-32 animate-pulse items-center justify-center rounded-md bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
          <p>暂无贡献数据</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-md transition-shadow duration-300 hover:shadow-xl dark:border-gray-800 dark:from-gray-900 dark:to-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-gray-200">文章贡献日历</h3>
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
            legend: {
              less: 'Less',
              more: 'More',
            },
          }}
          renderBlock={(block, activity) => (
            <div className="group relative transition-all duration-300 ease-in-out hover:z-20 hover:scale-125 hover:shadow-md">
              <CustomTooltip activity={activity} />
              {block}
            </div>
          )}
          showWeekdayLabels
        />
      </div>
    </motion.div>
  )
}
export default PostActivityCalendar
