// file: app/layout.tsx (最终的、纯净的版本)

import 'css/tailwind.css'
import 'css/mobile-nav.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'

import { Space_Grotesk } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider } from 'pliny/search'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  // ... metadata 内容 ...
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteMetadata.language}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          {siteMetadata.search ? (
            <SearchProvider searchConfig={siteMetadata.search}>{children}</SearchProvider>
          ) : (
            children
          )}
        </ThemeProviders>
      </body>
    </html>
  )
}
