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
  params: { slug: string[] }
}): Promise<Metadata> {
  const slugPath = decodeURI(params.slug.join('/'))
  const doc = allDocs.find((p) => p.slug === slugPath)
  if (!doc) {
    return {}
  }
  return genPageMetadata({
    title: doc.title,
    description: doc.summary,
  })
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slugPath = decodeURI(params.slug.join('/'))

  // 1. 获取并处理当前文档、前后导航及作者数据
  const sortedDocs = sortPosts(allDocs) as Doc[]
  const docIndex = sortedDocs.findIndex((p) => p.slug === slugPath)

  if (docIndex === -1) {
    return notFound()
  }

  const prev = coreContent(sortedDocs[docIndex + 1])
  const next = coreContent(sortedDocs[docIndex - 1])
  const doc = sortedDocs[docIndex]

  // --- 关键修复 1: 在这里定义 mainContent ---
  const mainContent = coreContent(doc)

  // --- 关键修复 2: 在这里定义 authorDetails ---
  const authorDetails = doc.authors?.map((authorId) => {
    const authorData = allAuthors.find((author) => author.slug === authorId)
    return coreContent(authorData as Authors)
  })

  // 2. 计算 statsData
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

  const allDates = [...publishedBlogs.map((p) => p.date), ...publishedDocs.map((d) => d.date)]
  allDates.forEach((dateString) => {
    if (dateString) {
      const date = new Date(dateString).toISOString().split('T')[0]
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
