// app/layout.tsx

import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'
import { SpeedInsights } from '@vercel/speed-insights/next'

// --- ADDED: 导入 Contentlayer 相关的工具 ---
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
// --- END ADDED ---

import { Space_Grotesk } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  // ... (您的 metadata 保持不变)
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

// --- MODIFIED: 将函数转换为 async ---
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // --- ADDED: 在服务器端计算所有统计数据 ---
  const posts = allCoreContent(sortPosts(allBlogs))
  const tagCounts: Record<string, number> = {}
  posts.forEach((post) => post.tags.forEach((tag) => (tagCounts[tag] = (tagCounts[tag] || 0) + 1)))

  const monthlyStats: Record<string, number> = {}
  posts.forEach((post) => {
    const month = post.date.substring(0, 7)
    monthlyStats[month] = (monthlyStats[month] || 0) + 1
  })
  const sortedMonthlyStats = Object.entries(monthlyStats).sort(
    (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
  )
  const monthlyLabels = sortedMonthlyStats.map((item) => item[0])
  const monthlyData = sortedMonthlyStats.map((item) => item[1])

  const dailyStats: Record<string, number> = {}
  posts.forEach((post) => {
    const day = post.date.substring(0, 10)
    dailyStats[day] = (dailyStats[day] || 0) + 1
  })

  const statsData = { tagCounts, monthlyLabels, monthlyData, dailyStats }
  // --- END ADDED ---

  const basePath = process.env.BASE_PATH || ''

  return (
    <html
      lang={siteMetadata.language}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      {/* ... (您的 <link> 和 <meta> 标签保持不变) ... */}
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={`${basePath}/static/favicons/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${basePath}/static/favicons/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${basePath}/static/favicons/favicon-16x16.png`}
      />
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <SectionContainer>
            <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
              {/* --- MODIFIED: 将 statsData 作为 prop 传递给 Header --- */}
              <Header statsData={statsData} />
              <main className="mb-auto">{children}</main>
            </SearchProvider>
            <Footer />
          </SectionContainer>
        </ThemeProviders>
        <SpeedInsights />
      </body>
    </html>
  )
}
