// file: app/about/page.tsx

import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { allAuthors } from 'contentlayer/generated'
import { coreContent } from 'pliny/utils/contentlayer'
import AuthorLayout from '@/layouts/AuthorLayout'
import { genPageMetadata } from 'app/seo'
import { getStatsData } from '../../lib/stats' // 确保使用正确的相对路径
import LayoutWrapper from '@/components/LayoutWrapper'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default')!
  const mainContent = coreContent(author)
  const statsData = getStatsData()

  return (
    <LayoutWrapper statsData={statsData}>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </LayoutWrapper>
  )
}
