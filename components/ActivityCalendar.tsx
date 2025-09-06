// src/components/ActivityCalendar.tsx
'use client'

import type { ThemeInput, Activity } from 'react-activity-calendar'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/components/ui/select'

const ActivityCalendar = dynamic(() => import('react-activity-calendar'), { ssr: false })

interface Props {
  dailyStats?: Record<string, number>
}

const PostActivityCalendar = ({ dailyStats = {} }: Props) => {
  const { theme } = useTheme()
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(currentYear)

  // 生成年份范围（近 5 年）
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i)

  const startDate = new Date(`${selectedYear}-01-01`)
  const endDate = new Date(`${selectedYear}-12-31`)

  // 生成全年日期
  const allDates: string[] = []
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    allDates.push(d.toISOString().slice(0, 10))
  }

  const data: Activity[] = allDates.map((date) => {
    const count = dailyStats[date] || 0
    return {
      date,
      count,
      level: Math.min(count, 4),
    }
  })

  const colorTheme: ThemeInput = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  }

  if (data.every((d) => d.count === 0)) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-md dark:bg-slate-800">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">文章贡献日历</h3>
          <Select
            value={String(selectedYear)}
            onValueChange={(val) => setSelectedYear(Number(val))}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="选择年份" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex h-32 animate-pulse items-center justify-center rounded-md bg-gray-100 text-gray-500 dark:bg-gray-900/50 dark:text-gray-400">
          <p>暂无贡献数据</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-md dark:bg-slate-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">文章贡献日历</h3>
        <Select value={String(selectedYear)} onValueChange={(val) => setSelectedYear(Number(val))}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="选择年份" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={String(year)}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedYear} // 关键点：切换年份时触发重新渲染
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
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
                weekdays: ['Mon', 'Wed', 'Fri'],
                totalCount: `{{count}} contributions in ${selectedYear}`,
                legend: { less: 'Less', more: 'More' },
              }}
              showWeekdayLabels
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default PostActivityCalendar
