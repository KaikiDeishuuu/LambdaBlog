import DocListLayout from '@/layouts/DocListLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allDocs, allBlogs, allAuthors } from 'contentlayer/generated'
import { slug } from 'github-slugger'
import LayoutWrapper from '@/components/LayoutWrapper'
import { genPageMetadata } from 'app/seo'
import type { Doc } from 'contentlayer/generated'

export const metadata = genPageMetadata({ title: 'Documentation' })

// 定义每页显示的文档数量
const DOCS_PER_PAGE = 9

export default function DocsPage() {
  // --- 关键修复：使用最新的、包含 totalDocs 的 statsData 计算逻辑 ---
  const tagCounts: Record<string, number> = {}
  const dailyStats: Record<string, number> = {}

  const publishedBlogs = allBlogs.filter((p) => !p.draft)
  const publishedDocs = allDocs.filter((d) => !d.draft)

  const totalPosts = publishedBlogs.length
  const totalDocs = publishedDocs.length

  publishedBlogs.forEach((blog) => {
    if (blog.tags) {
      blog.tags.forEach((tag) => {
        const formattedTag = slug(tag)
        tagCounts[formattedTag] = (tagCounts[formattedTag] || 0) + 1
      })
    }
  })

  // 健壮的日期格式化
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

  const allContentDates = [
    ...publishedBlogs.map((p) => p.date),
    ...publishedDocs.map((d) => d.date),
  ]
  allContentDates.forEach((dateString) => {
    if (dateString) {
      const formattedDate = formatDateToYYYYMMDD(dateString)
      if (formattedDate) {
        dailyStats[formattedDate] = (dailyStats[formattedDate] || 0) + 1
      }
    }
  })

  const statsData = {
    totalPosts,
    totalDocs, // <-- 现在 totalDocs 被正确地包含了进来
    totalComments: 0,
    tagCounts,
    dailyStats,
  }
  // --- 计算结束 ---

  // --- 获取、排序、过滤并扩充文档数据 ---
  const sortedDocs = sortPosts(allDocs) as Doc[]
  const docsForList = sortedDocs
    .filter((doc) => !doc.draft)
    .map((doc) => {
      const authorDetails = doc.authors?.map((authorId) => {
        const authorData = allAuthors.find((author) => author.slug === authorId)
        return authorData ? authorData.name : authorId
      })
      return {
        ...doc,
        authors: authorDetails,
      }
    })

  // --- 分页逻辑 ---
  const pageNumber = 1
  const initialDisplayPosts = docsForList.slice(0, DOCS_PER_PAGE)

  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(docsForList.length / DOCS_PER_PAGE),
  }

  return (
    <LayoutWrapper statsData={statsData}>
      <DocListLayout
        posts={docsForList}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Documentation"
      />
    </LayoutWrapper>
  )
}
