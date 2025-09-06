// src/layouts/DocLayout.tsx

import { ReactNode } from 'react'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Doc, Authors } from 'contentlayer/generated' // <--- 导入 Authors
import { allDocs } from 'contentlayer/generated'
import { sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import Image from '@/components/Image' // <--- 导入 Image
import TableOfContents from '@/components/TableOfContents'

interface LayoutProps {
  content: CoreContent<Doc>
  authorDetails?: CoreContent<Authors>[] // <--- 新增 authorDetails
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function DocLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { title, date, path, toc } = content
  const sortedDocs = sortPosts(allDocs)
  const currentDocIndex = sortedDocs.findIndex((doc) => doc.path === path)

  return (
    <div className="flex flex-col md:flex-row md:justify-between">
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto py-8 pr-8 md:block">
        <h3 className="mb-4 text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          Documentation
        </h3>
        <nav>
          <ul>
            {sortedDocs.map((doc, index) => (
              <li key={doc.slug}>
                <Link
                  href={`/${doc.path}`}
                  className={`block py-2 text-base transition-colors duration-200 ${
                    index === currentDocIndex
                      ? 'text-primary-500 font-semibold'
                      : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                  }`}
                >
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="w-full min-w-0 flex-auto py-8">
        <article>
          <header className="mb-8 space-y-4">
            <PageTitle>{title}</PageTitle>
            <div className="flex items-center space-x-4">
              {authorDetails?.map((author) => (
                <div key={author.name} className="flex items-center space-x-2">
                  {author.avatar && (
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      width={196}
                      height={196}
                      quality={100}
                      className="h-12 w-12 rounded-full object-cover"
                      priority
                    />
                  )}
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {author.name}
                  </span>
                </div>
              ))}
              <span className="text-gray-500 dark:text-gray-400">•</span>
              <p className="text-base text-gray-500 dark:text-gray-400">
                Last updated on {new Date(date).toLocaleDateString(siteMetadata.locale)}
              </p>
            </div>
          </header>
          <div className="prose dark:prose-invert max-w-none">{children}</div>

          {/* 文档页脚导航 */}
          <footer className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700">
            <div className="divide-y divide-gray-200 text-sm leading-5 font-medium dark:divide-gray-700">
              {(next || prev) && (
                // --- 这是从 PostLayout 精确复制而来，并只修改了颜色的最终版本 ---
                <div className="flex flex-col gap-8 py-4 xl:flex-row xl:justify-between xl:gap-0 xl:space-y-0 xl:py-8">
                  {prev && prev.path && (
                    <div>
                      {' '}
                      {/* 保持 text-left (默认) */}
                      <h2 className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        Previous Article
                      </h2>
                      {/* --- 颜色已修改 --- */}
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link href={`/${prev.path}`}>{prev.title}</Link>
                      </div>
                    </div>
                  )}

                  {next && next.path && (
                    <div className="text-right xl:text-left">
                      {' '}
                      {/* <-- 保留了您喜欢的独特对齐 */}
                      <h2 className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        Next Article
                      </h2>
                      {/* --- 颜色已修改 --- */}
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link href={`/${next.path}`}>{next.title}</Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </footer>
        </article>
      </main>
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 py-8 pl-8 xl:block">
        <h3 className="mb-2 text-sm font-semibold tracking-wide text-gray-700 uppercase dark:text-gray-300">
          On This Page
        </h3>
        <TableOfContents toc={toc} />
      </aside>
      {/* --- 添加结束 --- */}
    </div>
  )
}
