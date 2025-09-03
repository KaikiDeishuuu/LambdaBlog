// file: components/KeyMetrics.tsx
'use client'

import { DocumentTextIcon, TagIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import CountUp from 'react-countup'

interface Props {
  totalPosts: number
  totalTags: number
  totalComments: number // 假设有这个数据
}

const metrics = [
  { name: '总文章', key: 'totalPosts', icon: DocumentTextIcon },
  { name: '总标签', key: 'totalTags', icon: TagIcon },
  { name: '总评论', key: 'totalComments', icon: ChatBubbleLeftRightIcon },
]

const KeyMetrics = ({ totalPosts, totalTags, totalComments }: Props) => {
  const data = { totalPosts, totalTags, totalComments }

  return (
    <dl className="grid grid-cols-3 gap-4">
      {metrics.map((item) => (
        <div
          key={item.name}
          className="overflow-hidden rounded-lg bg-white px-4 py-5 text-center shadow dark:bg-gray-800"
        >
          <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
            {item.name}
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            <CountUp end={data[item.key]} duration={2} />
          </dd>
        </div>
      ))}
    </dl>
  )
}

export default KeyMetrics
