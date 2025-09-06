// src/app/layout.tsx

import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'
import NextTopLoader from 'nextjs-toploader'

import { Space_Grotesk } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // --- 关键修复: 将搜索逻辑移到 return 外部 ---
  let searchProvider: React.ReactNode
  if (siteMetadata.search) {
    // 在这个 if 块内部，TypeScript 100% 确定 siteMetadata.search 不是 undefined
    // 我们将其明确断言为 SearchConfig 类型，确保万无一失
    searchProvider = (
      <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>{children}</SearchProvider>
    )
  } else {
    searchProvider = children
  }

  return (
    <html
      lang={siteMetadata.language}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>

      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <NextTopLoader
          color="#0d9488"
          height={3}
          showSpinner={false}
          shadow="0 0 10px #0d9488,0 0 5px #0d9488"
        />

        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />

          {/* 在这里渲染我们处理好的 searchProvider 变量 */}
          {searchProvider}
        </ThemeProviders>
      </body>
    </html>
  )
}
