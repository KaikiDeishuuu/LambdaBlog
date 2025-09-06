import DocListLayout from '@/layouts/DocListLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allDocs, allBlogs, allAuthors } from 'contentlayer/generated'
import { slug } from 'github-slugger'
import { notFound } from 'next/navigation'
import type { Doc, Authors } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import LayoutWrapper from '@/components/LayoutWrapper'

const DOCS_PER_PAGE = 9

export const generateStaticParams = async () => {
  const publishedDocs = allDocs.filter((doc) => !doc.draft)
  const totalPages = Math.ceil(publishedDocs.length / DOCS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
  return paths
}

export default async function Page({ params }: { params: { page: string } }) {
  const pageNumber = parseInt(params.page, 10)

  // --- 关键修复：在这里也使用最新的、包含 totalDocs 的 statsData 计算逻辑 ---
  const tagCounts: Record<string, number> = {}
  const dailyStats: Record<string, number> = {}

  const publishedBlogs = allBlogs.filter((p) => !p.draft)
  const publishedDocsForStats = allDocs.filter((d) => !d.draft)

  const totalPosts = publishedBlogs.length
  const totalDocs = publishedDocsForStats.length

  publishedBlogs.forEach((blog) => {
    if (blog.tags) {
      blog.tags.forEach((tag) => {
        const formattedTag = slug(tag)
        tagCounts[formattedTag] = (tagCounts[formattedTag] || 0) + 1
      })
    }
  })

  const formatDateToYYYYMMDD = (date: string | Date): string => {
    if (!date) return ''
    try {
      const d = new Date(date)
      if (isNaN(d.getTime())) return ''

      const year = d.getUTCFullYear()
      const month = String(d.getUTCMonth() + 1).padStart(2, '0')
      const day = String(d.getUTCDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    } catch (e) {
      return ''
    }
  }

  const allDates = [
    ...publishedBlogs.map((p) => p.date),
    ...publishedDocsForStats.map((d) => d.date),
  ]
  allDates.forEach((dateString) => {
    /* ... (日期统计逻辑) */
  })

  const statsData = {
    totalPosts,
    totalDocs, // <-- 现在 totalDocs 被正确地包含了进来
    totalComments: 0,
    tagCounts,
    dailyStats,
  }
  // --- 计算结束 ---

  // 2. 获取并处理要显示的文档数据
  const sortedDocs = sortPosts(allDocs) as Doc[]
  const publishedDocsForList = sortedDocs
    .filter((doc) => !doc.draft)
    .map((doc) => {
      const authorDetails = doc.authors?.map((authorId) => {
        const authorData = allAuthors.find((author) => author.slug === authorId)
        return authorData ? authorData.name : authorId
      })
      return { ...doc, authors: authorDetails } as Doc
    })

  // 3. 计算分页
  const totalPages = Math.ceil(publishedDocsForList.length / DOCS_PER_PAGE)
  if (isNaN(pageNumber) || pageNumber > totalPages || pageNumber < 1) {
    notFound()
  }

  const initialDisplayPosts = publishedDocsForList.slice(
    DOCS_PER_PAGE * (pageNumber - 1),
    DOCS_PER_PAGE * pageNumber
  )
  const pagination = { currentPage: pageNumber, totalPages }

  return (
    <LayoutWrapper statsData={statsData}>
      <DocListLayout
        posts={publishedDocsForList}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Documents"
      />
    </LayoutWrapper>
  )
}
