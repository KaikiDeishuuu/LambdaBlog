// src/components/KeyMetrics.tsx
'use client'

import { DocumentTextIcon, TagIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import CountUp from 'react-countup'

interface Props {
  totalPosts: number
  totalDocs: number
  totalTags: number
}

const metrics = [
  { name: '总文章', key: 'totalPosts', icon: DocumentTextIcon },
  { name: '总文档', key: 'totalDocs', icon: BookOpenIcon },
  { name: '总标签', key: 'totalTags', icon: TagIcon },
]

const KeyMetrics = ({ totalPosts, totalDocs, totalTags }: Props) => {
  const data = { totalPosts, totalDocs, totalTags }

  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">网站概览</h3>
      <dl className="grid grid-cols-3 gap-4">
        {metrics.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white p-4 text-center shadow-sm ring-1 ring-black/[.05] dark:bg-slate-800 dark:ring-white/[.1]"
          >
            <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
              {item.name}
            </dt>
            {/* --- 关键修复：添加了 text-gray-900 --- */}
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
              <CountUp end={data[item.key] || 0} duration={2} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default KeyMetrics
