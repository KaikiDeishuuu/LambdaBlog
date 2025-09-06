// src/components/TagPieChart.tsx
'use client'

import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useTheme } from 'next-themes'
import type { ChartData, ChartOptions } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  tagCounts: Record<string, number>
}

const TagPieChart = ({ tagCounts }: Props) => {
  const { theme } = useTheme()
  const labels = Object.keys(tagCounts)
  const dataValues = Object.values(tagCounts)

  const generateColors = (numColors: number): string[] => {
    const colors: string[] = []
    const baseHue = 200
    for (let i = 0; i < numColors; i++) {
      const hue = (baseHue + i * (360 / 1.618)) % 360 // Golden ratio
      colors.push(`hsla(${hue}, 80%, 60%, 1)`)
    }
    return colors
  }

  const data: ChartData<'doughnut'> = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: generateColors(labels.length),
        borderColor: theme === 'dark' ? '#1e293b' : '#ffffff', // slate-800 or white
        borderWidth: 3,
      },
    ],
  }

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '50%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: theme === 'dark' ? '#94a3b8' : '#64748b', // slate-400 or slate-500
          font: { size: 15 },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'rectRounded',
        },
      },
      title: { display: false },
    },
  }

  if (labels.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-md dark:bg-slate-800">
        <h3 className="mb-4 text-center text-lg font-bold text-gray-800 dark:text-gray-200">
          标签分布
        </h3>
        <div className="flex h-64 items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">暂无标签数据</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-md dark:bg-slate-800">
      <h3 className="mb-4 text-center text-lg font-bold text-gray-800 dark:text-gray-200">
        标签分布
      </h3>
      <div className="relative mx-auto h-[450px] w-full max-w-[450px] sm:h-[400px] sm:max-w-[400px]">
        <Doughnut options={options} data={data} />
      </div>
    </div>
  )
}

export default TagPieChart
