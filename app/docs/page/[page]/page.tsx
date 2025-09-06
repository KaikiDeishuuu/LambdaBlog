import DocListLayout from '@/layouts/DocListLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allDocs, allBlogs, allAuthors } from 'contentlayer/generated'
import { slug } from 'github-slugger'
import { notFound } from 'next/navigation'
import type { Doc, Authors } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import LayoutWrapper from '@/components/LayoutWrapper'
import { DOCS_PER_PAGE } from '@/config'

export const generateStaticParams = async () => {
  const publishedDocs = allDocs.filter((doc) => !doc.draft)
  const totalPages = Math.ceil(publishedDocs.length / DOCS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
  return paths
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  // Await params to resolve the promise
  const { params } = props
  const resolvedParams = await params
  const pageNumber = parseInt(resolvedParams.page, 10)

  // 1. 计算 statsData，确保导航栏能显示
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

  // 2. 统一的、类型安全的数据处理流程
  const sortedDocs = sortPosts(allDocs) as Doc[]
  const posts = allCoreContent(sortedDocs).filter((doc) => !doc.draft) as CoreContent<Doc>[]

  const enrichedPosts = posts.map((post) => {
    const originalDoc = allDocs.find((doc) => doc.slug === post.slug)
    const authorDetails = originalDoc?.authors?.map((authorId) => {
      const authorData = allAuthors.find((author) => author.slug === authorId)
      return authorData ? authorData.name : authorId
    })
    return {
      ...post,
      authors: authorDetails || [],
      images: originalDoc?.images || [], // 确保 images 字段也被补充回来
    }
  })

  // 3. 计算分页
  const totalPages = Math.ceil(enrichedPosts.length / DOCS_PER_PAGE)
  if (pageNumber > totalPages || pageNumber <= 0 || isNaN(pageNumber)) {
    return notFound()
  }

  const initialDisplayPosts = enrichedPosts.slice(
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
        posts={enrichedPosts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Documentation"
      />
    </LayoutWrapper>
  )
}
