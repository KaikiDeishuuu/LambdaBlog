// file: components/StatsPanel.tsx
'use client'

import { Fragment } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

// 导入我们刚刚创建的三个组件
import TagPieChart from './TagPieChart'
import PostActivityCalendar from './ActivityCalendar'
import KeyMetrics from './KeyMetrics'

// 定义 Props 接口，statsData 可选
interface Props {
  isOpen: boolean
  onClose: () => void
  statsData?: {
    tagCounts?: Record<string, number>
    dailyStats?: Record<string, number>
    totalPosts?: number
    totalComments?: number
  }
}

// 模拟的默认空数据，以防数据还未加载
const defaultData = {
  tagCounts: {},
  dailyStats: {},
  totalPosts: 0,
  totalComments: 0,
}

const StatsPanel = ({ isOpen, onClose, statsData }: Props) => {
  // 使用默认值保证安全
  const {
    tagCounts = {},
    dailyStats = {},
    totalPosts = 0,
    totalComments = 0,
  } = statsData || defaultData

  const totalTags = Object.keys(tagCounts).length

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 flex justify-end">
          <TransitionChild
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-200 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="flex h-full w-full max-w-lg transform flex-col bg-gray-100 text-left align-middle shadow-xl transition-all dark:bg-gray-900">
              <div className="flex items-center justify-between border-b border-gray-200 bg-white/50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">网站统计</h3>
                <button
                  type="button"
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
                  onClick={onClose}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-grow space-y-8 overflow-y-auto p-6">
                {/* 瀑布流动画包裹每个模块 */}
                <TransitionChild
                  as="div"
                  enter="transition-all ease-in-out duration-300"
                  enterFrom="opacity-0 transform -translate-y-4"
                  enterTo="opacity-100 transform translate-y-0"
                  style={{ transitionDelay: `100ms` }}
                >
                  <KeyMetrics
                    totalPosts={totalPosts}
                    totalTags={totalTags}
                    totalComments={totalComments}
                  />
                </TransitionChild>

                <TransitionChild
                  as="div"
                  enter="transition-all ease-in-out duration-300"
                  enterFrom="opacity-0 transform -translate-y-4"
                  enterTo="opacity-100 transform translate-y-0"
                  style={{ transitionDelay: `200ms` }}
                >
                  <PostActivityCalendar dailyStats={dailyStats} />
                </TransitionChild>

                <TransitionChild
                  as="div"
                  enter="transition-all ease-in-out duration-300"
                  enterFrom="opacity-0 transform -translate-y-4"
                  enterTo="opacity-100 transform translate-y-0"
                  style={{ transitionDelay: `300ms` }}
                >
                  <TagPieChart tagCounts={tagCounts} />
                </TransitionChild>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}

export default StatsPanel
