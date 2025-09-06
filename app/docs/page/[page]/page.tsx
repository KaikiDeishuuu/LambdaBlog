import DocListLayout from '@/layouts/DocListLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allDocs, allBlogs, allAuthors } from 'contentlayer/generated'
import { slug } from 'github-slugger'
import { notFound } from 'next/navigation'
import type { Doc, Authors } from 'contentlayer/generated' // 导入 Authors
import LayoutWrapper from '@/components/LayoutWrapper'

// 定义每页显示的文档数量
const DOCS_PER_PAGE = 9

// --- 关键修复 1: 定义一个在 Vercel 构建时绝对兼容的 Props 类型 ---
interface PageProps {
  params: Promise<{ page: string }>
}

export const generateStaticParams = async () => {
  const publishedDocs = allDocs.filter((doc) => !doc.draft)
  const totalPages = Math.ceil(publishedDocs.length / DOCS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
  return paths
}

export default async function Page({ params }: PageProps) {
  // --- 关键修复 2: 在函数顶部 await Promise 类型的 params ---
  const resolvedParams = await params
  const pageNumber = parseInt(resolvedParams.page, 10)

  // 1. 计算 statsData
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

  // 健壮的日期格式化函数
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
    if (dateString) {
      const formattedDate = formatDateToYYYYMMDD(dateString)
      if (formattedDate) {
        dailyStats[formattedDate] = (dailyStats[formattedDate] || 0) + 1
      }
    }
  })

  const statsData = {
    totalPosts,
    totalDocs,
    totalComments: 0,
    tagCounts,
    dailyStats,
  }

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

  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

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
