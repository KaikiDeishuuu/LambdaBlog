import DocListLayout from '@/layouts/DocListLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allDocs, allBlogs, allAuthors } from 'contentlayer/generated'
import { slug } from 'github-slugger'
import LayoutWrapper from '@/components/LayoutWrapper'
import { genPageMetadata } from 'app/seo'
import type { Doc } from 'contentlayer/generated'
import { DOCS_PER_PAGE } from '@/config'

export const metadata = genPageMetadata({ title: 'Documentation' })

// 定义每页显示的文档数量

export default function DocsPage() {
  // --- 1. 计算 statsData ---
  const tagCounts: Record<string, number> = {}
  const dailyStats: Record<string, number> = {}
  allBlogs.forEach((blog) => {
    if (blog.draft !== true) {
      if (blog.tags) {
        blog.tags.forEach((tag) => {
          const formattedTag = slug(tag)
          tagCounts[formattedTag] = (tagCounts[formattedTag] || 0) + 1
        })
      }
      if (blog.date) {
        const date = new Date(blog.date).toISOString().split('T')[0]
        dailyStats[date] = (dailyStats[date] || 0) + 1
      }
    }
  })

  const statsData = {
    totalPosts: allBlogs.filter((p) => !p.draft).length,
    totalComments: 0,
    tagCounts,
    dailyStats,
  }

  // --- 2. 获取、排序、过滤并扩充文档数据 ---
  const sortedDocs = sortPosts(allDocs) as Doc[]
  const publishedDocs = sortedDocs
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

  // --- 3. 严格执行分页逻辑 ---
  const pageNumber = 1 // 主列表页永远是第 1 页
  const initialDisplayPosts = publishedDocs.slice(
    DOCS_PER_PAGE * (pageNumber - 1),
    DOCS_PER_PAGE * pageNumber
  ) // 只切出第一页的数据

  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(publishedDocs.length / DOCS_PER_PAGE), // 计算正确的总页数
  }

  return (
    <LayoutWrapper statsData={statsData}>
      <DocListLayout
        posts={publishedDocs} // 传递所有文档，用于搜索
        initialDisplayPosts={initialDisplayPosts} // 只传递第一页的文档
        pagination={pagination} // 传递正确的分页信息
        title="Documentation"
      />
    </LayoutWrapper>
  )
}
