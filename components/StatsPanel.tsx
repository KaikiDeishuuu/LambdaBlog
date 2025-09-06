// src/components/StatsPanel.tsx
'use client'

import { Fragment } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import TagPieChart from './TagPieChart'
// import PostActivityCalendar from './ActivityCalendar'
import KeyMetrics from './KeyMetrics'
import { StatsData } from '../types/stats'

interface Props {
  isOpen: boolean
  onClose: () => void
  statsData?: StatsData
}

const StatsPanel = ({ isOpen, onClose, statsData }: Props) => {
  // 提供一个类型安全的默认值
  const defaultData: StatsData = {
    tagCounts: {},
    dailyStats: {},
    totalPosts: 0,
    totalDocs: 0,
    totalComments: 0,
  }

  const data = statsData || defaultData
  const totalTags = Object.keys(data.tagCounts).length

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
            <DialogPanel className="flex h-full w-full max-w-lg transform flex-col bg-gray-100 text-left align-middle shadow-xl transition-all dark:bg-slate-900">
              <div className="flex items-center justify-between p-4">
                <h3 className="text-xl font-semibold text-gray-100">网站统计</h3>
                <button
                  type="button"
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-800"
                  onClick={onClose}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-grow space-y-6 overflow-y-auto p-6">
                <KeyMetrics
                  totalPosts={data.totalPosts}
                  totalDocs={data.totalDocs}
                  totalTags={totalTags}
                />
                <PostActivityCalendar dailyStats={data.dailyStats} />
                <TagPieChart tagCounts={data.tagCounts} />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}

export default StatsPanel
