// file: components/TagPieChart.tsx
'use client'

import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useTheme } from 'next-themes'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  tagCounts: Record<string, number>
}

const TagPieChart = ({ tagCounts }: Props) => {
  const { theme } = useTheme()

  const labels = Object.keys(tagCounts)
  const dataValues = Object.values(tagCounts)

  // 动态生成颜色，使其看起来更丰富
  const generateColors = (numColors) => {
    const colors: string[] = []
    for (let i = 0; i < numColors; i++) {
      const hue = (i * 360) / numColors
      colors.push(`hsla(${hue}, 70%, 60%, 0.8)`)
    }
    return colors
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: '文章数',
        data: dataValues,
        backgroundColor: generateColors(labels.length),
        borderColor: theme === 'dark' ? 'hsl(224, 71%, 4%)' : 'hsl(0, 0%, 100%)',
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: theme === 'dark' ? '#cbd5e1' : '#475569',
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: '标签分布',
        color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
        font: {
          size: 18,
          weight: 'bold' as const,
        },
      },
    },
  }

  return <Doughnut options={options} data={data} />
}

export default TagPieChart
