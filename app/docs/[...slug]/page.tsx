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

export const generateStaticParams = async () => {
  return allDocs.map((p) => ({ slug: p.slug.split('/') }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const resolvedParams = await params // Await params
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

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params // Await params
  const slugPath = decodeURI(resolvedParams.slug.join('/'))

  // 1. 获取并处理当前文档的数据
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

  // --- 统计数据计算逻辑 ---
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
    totalComments: 0, // 暂时硬编码为 0
    tagCounts,
    dailyStats,
  }
  // --- 计算结束 ---

  return (
    <LayoutWrapper statsData={statsData}>
      <DocLayout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXLayoutRenderer code={doc.body.code} />
      </DocLayout>
    </LayoutWrapper>
  )
}
