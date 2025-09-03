// file: components/ActivityCalendar.tsx
'use client'

import ActivityCalendar from 'react-activity-calendar'
import { useTheme } from 'next-themes'

interface Props {
  dailyStats?: Record<string, number> // 改为可选
}

const PostActivityCalendar = ({ dailyStats = {} }: Props) => {
  const { theme } = useTheme()

  // 将数据转换为 react-activity-calendar 需要的格式
  const data = Object.entries(dailyStats).map(([date, count]) => ({
    date,
    count,
    level: Math.min(count, 4), // level 决定颜色深度, 0-4
  }))

  const colorScheme = theme === 'dark' ? 'dark' : 'light'

  // 如果 data 为空，渲染提示文字或占位
  if (data.length === 0) {
    return (
      <div>
        <h3 className="mb-4 text-center text-lg font-bold text-gray-800 dark:text-gray-200">
          文章贡献日历
        </h3>
        <p className="text-center text-gray-500 dark:text-gray-400">暂无数据</p>
      </div>
    )
  }

  return (
    <div>
      <h3 className="mb-4 text-center text-lg font-bold text-gray-800 dark:text-gray-200">
        文章贡献日历
      </h3>
      <ActivityCalendar
        data={data}
        theme={{
          light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
          dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
        }}
        colorScheme={colorScheme}
        showWeekdayLabels
      />
    </div>
  )
}

export default PostActivityCalendar
