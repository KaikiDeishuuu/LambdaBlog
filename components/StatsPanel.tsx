// components/StatsPanel.tsx

'use client'

import { Bar, Line, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js'
import ActivityCalendar from 'react-activity-calendar'
import { XMarkIcon } from '@heroicons/react/24/solid'

// 注册 Chart.js 模块
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
)

// 定义组件接收的 props 类型
interface StatsPanelProps {
  isOpen: boolean
  onClose: () => void
  statsData: {
    tagCounts: Record<string, number>
    monthlyLabels: string[]
    monthlyData: number[]
    dailyStats: Record<string, number>
  }
}

export default function StatsPanel({ isOpen, onClose, statsData }: StatsPanelProps) {
  if (!isOpen) {
    return null // 如果没打开，不渲染任何东西
  }

  const { tagCounts, monthlyLabels, monthlyData, dailyStats } = statsData

  // 排序后的标签
  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])

  // 前 10 热门标签
  const topTags = sortedTags.slice(0, 10)

  // 饼图数据
  const pieData = {
    labels: topTags.map(([tag]) => tag),
    datasets: [
      {
        data: topTags.map(([, count]) => count),
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
          '#14b8a6',
          '#f97316',
          '#84cc16',
          '#ec4899',
          '#6366f1',
        ],
      },
    ],
  }

  // 条形图数据（所有标签）
  const barData = {
    labels: sortedTags.map(([tag]) => tag),
    datasets: [
      {
        label: '标签数量',
        data: sortedTags.map(([, count]) => count),
        backgroundColor: '#6366f1',
      },
    ],
  }

  // 折线图数据（月度统计）
  const lineData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: '文章发布数',
        data: monthlyData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  }

  // 日历数据
  const activityData = Object.entries(dailyStats).map(([date, count]) => ({
    date,
    count,
    level: Math.min(count, 4) as 0 | 1 | 2 | 3 | 4,
  }))

  return (
    // 全屏覆盖层
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-start justify-center bg-black backdrop-blur-sm">
      {/* 实际的面板容器 */}
      <div className="relative mt-8 max-h-[90vh] w-11/12 max-w-6xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl md:p-8 dark:bg-gray-900">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h1 className="mb-6 text-2xl font-bold">博客统计</h1>

        {/* 图表网格布局 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="col-span-1 rounded-lg bg-gray-50 p-4 md:col-span-2 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold">动态日历</h2>
            <ActivityCalendar data={activityData} colorScheme="light" showWeekdayLabels />
          </div>
          <div className="col-span-1 rounded-lg bg-gray-50 p-4 md:col-span-2 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold">发布统计图</h2>
            <Line data={lineData} />
          </div>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold">热门标签</h2>
            <Pie data={pieData} />
          </div>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold">所有标签统计</h2>
            <Bar data={barData} options={{ indexAxis: 'y' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
