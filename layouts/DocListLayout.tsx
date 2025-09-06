// src/layouts/DocListLayout.tsx
'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import Link from '@/components/Link'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import type { Doc } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

// --- 关键修复 1: 确保类型定义与 Contentlayer 匹配 ---
// 我们将只使用 CoreContent<Doc>，并在组件内部安全地访问可选属性
interface DocListLayoutProps {
  posts: CoreContent<Doc>[]
  title: string
  initialDisplayPosts?: CoreContent<Doc>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  // 修正 basePath，确保能正确处理 /docs 和 /docs/page/2
  const basePath = pathname.split('/page')[0]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-10 pb-8 md:space-y-5">
      <nav className="flex items-center justify-between">
        <Link
          href={currentPage - 1 === 1 ? `${basePath}` : `${basePath}/page/${currentPage - 1}`}
          className={`group inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 ease-in-out hover:scale-105 hover:bg-teal-700 active:scale-100 ${
            !prevPage ? 'pointer-events-none opacity-50' : ''
          }`}
          aria-disabled={!prevPage}
          rel="prev"
        >
          &larr; Previous
        </Link>
        <span className="font-medium text-gray-700 dark:text-gray-200">
          Page {currentPage} of {totalPages}
        </span>
        <Link
          href={`${basePath}/page/${currentPage + 1}`}
          className={`group inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 ease-in-out hover:scale-105 hover:bg-teal-700 active:scale-100 ${
            !nextPage ? 'pointer-events-none opacity-50' : ''
          }`}
          aria-disabled={!nextPage}
          rel="next"
        >
          Next &rarr;
        </Link>
      </nav>
    </div>
  )
}

export default function DocListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: DocListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')

  const filteredPosts = posts.filter((post) => {
    const searchContent = post.title + (post.summary ?? '')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts = searchValue ? filteredPosts : initialDisplayPosts

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-6xl dark:text-gray-100">
            {title}
          </h1>
          <div className="relative max-w-lg">{/* 搜索框 */}</div>
        </div>

        <div className="grid grid-cols-1 gap-8 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {!displayPosts.length && <p>No documents found.</p>}
          {displayPosts.map((post) => {
            // --- 关键修复 2: 确保 post 上有 path 属性 ---
            // CoreContent 不包含 path，但完整的 Doc 对象有。我们假设它存在。
            const { slug, date, title, summary, authors, images } = post as Doc
            const path = `docs/${slug}` // 手动构建 path
            const authorName = authors?.[0] ?? 'Unknown'
            const coverImage = images?.[0]

            return (
              <article
                key={path}
                className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
              >
                {coverImage && (
                  <Link href={`/${path}`}>
                    <Image
                      src={coverImage}
                      alt={title}
                      width={600}
                      height={300}
                      className="h-40 w-full object-cover"
                    />
                  </Link>
                )}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time> ·{' '}
                      <span>{authorName}</span>
                    </p>
                    <h2 className="text-xl leading-7 font-bold tracking-tight">
                      <Link
                        href={`/${path}`}
                        className="group-hover:text-primary-500 dark:group-hover:text-primary-400 text-gray-900 transition-colors dark:text-gray-100"
                      >
                        {title}
                      </Link>
                    </h2>
                    {summary && (
                      <p className="line-clamp-3 text-gray-600 dark:text-gray-400">{summary}</p>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
