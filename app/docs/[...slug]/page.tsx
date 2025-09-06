import { allDocs, allBlogs, allAuthors } from 'contentlayer/generated'
import { coreContent, sortPosts } from 'pliny/utils/contentlayer'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { notFound } from 'next/navigation'
import { slug } from 'github-slugger'
import LayoutWrapper from '@/components/LayoutWrapper'
import DocLayout from '@/layouts/DocLayout'
import { Metadata } from 'next'
import { genPageMetadata } from 'app/seo'
import type { Doc, Authors } from 'contentlayer/generated'

// --- 关键修复 1: 定义一个在 Vercel 构建时绝对兼容的 Props 类型 ---
// 注意：Page 和 generateMetadata 接收的 params 在构建时可能被视为 Promise
interface PageProps {
  params: { slug: string[] }
}
interface PromisePageProps {
  params: Promise<{ slug: string[] }>
}

export const generateStaticParams = async () => {
  return allDocs.map((p) => ({ slug: p.slug.split('/') }))
}

// --- 关键修复 2: 在 generateMetadata 中 await params ---
export async function generateMetadata({ params }: PromisePageProps): Promise<Metadata> {
  const resolvedParams = await params
  const slugPath = decodeURI(resolvedParams.slug.join('/'))
  const doc = allDocs.find((p) => p.slug === slugPath)
  if (!doc) {
    return {}
  }
  return genPageMetadata({
    title: doc.title,
    description: doc.summary,
  })
}

// --- 关键修复 3: 在 Page 组件中也 await params ---
export default async function Page({ params }: PromisePageProps) {
  const resolvedParams = await params
  const slugPath = decodeURI(resolvedParams.slug.join('/'))

  // ... (文件的其余所有数据获取和渲染逻辑保持完全不变) ...
  const sortedDocs = sortPosts(allDocs) as Doc[]
  const docIndex = sortedDocs.findIndex((p) => p.slug === slugPath)

  if (docIndex === -1) {
    return notFound()
  }

  const prev = coreContent(sortedDocs[docIndex + 1])
  const next = coreContent(sortedDocs[docIndex - 1])
  const doc = sortedDocs[docIndex]
  const mainContent = coreContent(doc)

  const authorDetails = doc.authors?.map((authorId) => {
    const authorData = allAuthors.find((author) => author.slug === authorId)
    return coreContent(authorData as Authors)
  })
  const publishedBlogs = allBlogs.filter((p) => !p.draft)
  const publishedDocs = allDocs.filter((d) => !d.draft)

  // 2. 定义并计算所有必需的变量
  const totalPosts: number = publishedBlogs.length
  const totalDocs: number = publishedDocs.length

  const tagCounts: Record<string, number> = {}
  publishedBlogs.forEach((blog) => {
    blog.tags?.forEach((tag) => {
      const formattedTag = slug(tag)
      tagCounts[formattedTag] = (tagCounts[formattedTag] || 0) + 1
    })
  })

  const dailyStats: Record<string, number> = {}
  const allDates = [...publishedBlogs.map((p) => p.date), ...publishedDocs.map((d) => d.date)]
  allDates.forEach((dateString) => {
    if (dateString) {
      const date = new Date(dateString).toISOString().split('T')[0] // 注意：这里的日期格式化可能需要我们之前更健壮的版本
      dailyStats[date] = (dailyStats[date] || 0) + 1
    }
  })
  const statsData = {
    totalPosts,
    totalDocs,
    totalComments: 0,
    tagCounts,
    dailyStats,
  }

  return (
    <LayoutWrapper statsData={statsData}>
      <DocLayout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXLayoutRenderer code={doc.body.code} />
      </DocLayout>
    </LayoutWrapper>
  )
}
