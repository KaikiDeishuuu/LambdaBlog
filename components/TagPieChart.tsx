import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useTheme } from 'next-themes'
import type { ChartData, ChartOptions } from 'chart.js'
import { motion } from 'framer-motion'

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
    const baseHue = 100 // 从一个柔和的蓝色/青色开始
    for (let i = 0; i < numColors; i++) {
      const hue = (baseHue + i * (360 / (numColors + 1))) % 360
      // 降低饱和度 (S)，调整亮度 (L)，并设置透明度 (A)
      colors.push(`hsla(${hue}, 80%, 60%, 1)`)
    }
    return colors
  }

  const data: ChartData<'doughnut'> = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: generateColors(labels.length),
        borderColor: theme === 'dark' ? '#1f2937' : '#f9fafb',
        borderWidth: 2,
      },
    ],
  }

  const totalDuration = 1200

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '40%',
    // --- 关键修复：扇子展开动画的正确实现 ---
    animation: {
      delay: (context) => {
        let delay = 0
        if (context.type === 'animation' && context.mode === 'normal') {
          // 每个扇区都比前一个延迟一点出现，形成展开效果
          delay = context.dataIndex * (totalDuration / dataValues.length)
        }
        return delay
      },
      duration: totalDuration,
      easing: 'easeOutQuart',
    },
    plugins: {
      // --- 关键修改 4: 极简化的图例 ---
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
          font: { size: 19 },
          padding: 25,
          usePointStyle: true,
          pointStyle: 'rect', // 使用与您图片中类似的小方块
          boxWidth: 17,
          boxHeight: 17,
        },
      },
      // 我们不再需要标题和 datalabels，让图表本身说话
      title: { display: false },
      tooltip: {
        enabled: true, // 保留 Tooltip 功能
        backgroundColor: '#111827',
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        padding: 12,
        cornerRadius: 8,
      },
    },
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-md dark:bg-slate-800">
      <h3 className="mb-4 text-center text-lg font-bold text-gray-800 dark:text-gray-200">
        标签分布
      </h3>
      {/* --- 关键修改：为图表本身创建一个有明确尺寸的容器 --- */}
      <div className="relative mx-auto h-[350px] w-full max-w-[350px] sm:h-[400px] sm:max-w-[400px]">
        <Doughnut options={options} data={data} />
      </div>
    </div>
  )
}

export default TagPieChart
