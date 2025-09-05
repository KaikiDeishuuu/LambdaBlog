// src/components/License.tsx

import siteMetadata from '@/data/siteMetadata'
import Link from './Link'

interface LicenseProps {
  title: string
  author?: string
  pubDate: string
  url: string
  licenseName?: string
  licenseUrl?: string
  sourceLink?: string
}

const CreativeCommonsLogo = () => (
  <svg
    width="0.97em"
    height="1em"
    className="pointer-events-none absolute top-1/2 right-6 -translate-y-1/2 text-[8rem] text-black/5 transition dark:text-white/5"
    data-icon="fa6-brands:creative-commons"
  >
    <symbol id="ai:fa6-brands:creative-commons" viewBox="0 0 496 512">
      <path
        fill="currentColor"
        d="m245.83 214.87l-33.22 17.28c-9.43-19.58-25.24-19.93-27.46-19.93c-22.13 0-33.22 14.61-33.22 43.84c0 23.57 9.21 43.84 33.22 43.84c14.47 0 24.65-7.09 30.57-21.26l30.55 15.5c-6.17 11.51-25.69 38.98-65.1 38.98c-22.6 0-73.96-10.32-73.96-77.05c0-58.69 43-77.06 72.63-77.06c30.72-.01 52.7 11.95 65.99 35.86m143.05 0l-32.78 17.28c-9.5-19.77-25.72-19.93-27.9-19.93c-22.14 0-33.22 14.61-33.22 43.84c0 23.55 9.23 43.84 33.22 43.84c14.45 0 24.65-7.09 30.54-21.26l31 15.5c-2.1 3.75-21.39 38.98-65.09 38.98c-22.69 0-73.96-9.87-73.96-77.05c0-58.67 42.97-77.06 72.63-77.06c30.71-.01 52.58 11.95 65.56 35.86M247.56 8.05C104.74 8.05 0 123.11 0 256.05c0 138.49 113.6 248 247.56 248c129.93 0 248.44-100.87 248.44-248c0-137.87-106.62-248-248.44-248m.87 450.81c-112.54 0-203.7-93.04-203.7-202.81c0-105.42 85.43-203.27 203.72-203.27c112.53 0 202.82 89.46 202.82 203.26c-.01 121.69-99.68 202.82-202.84 202.82"
      ></path>
    </symbol>
    <use href="#ai:fa6-brands:creative-commons"></use>
  </svg>
)

export default function License({
  title,
  author,
  pubDate,
  url,
  licenseName,
  licenseUrl,
  sourceLink,
}: LicenseProps) {
  const finalLicenseName = licenseName || siteMetadata.license?.name
  const finalLicenseUrl = licenseUrl || siteMetadata.license?.url
  const displayUrl = sourceLink || url

  if (!finalLicenseName) {
    return null
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <CreativeCommonsLogo />
      <div className="relative z-10">
        <div className="mb-2 font-semibold text-gray-800 dark:text-gray-200">{title}</div>
        <Link
          href={displayUrl}
          className="text-primary-500 mb-4 block truncate text-sm hover:underline"
        >
          {displayUrl}
        </Link>
        {/* --- 关键修复: 添加了响应式类，让网格在手机上垂直堆叠 --- */}
        <div className="grid grid-cols-1 gap-y-6 border-t border-gray-200 pt-4 sm:grid-cols-3 sm:gap-y-0 dark:border-gray-600">
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">作者</div>
            <div className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-100">
              {author || siteMetadata.author}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">发布于</div>
            <div className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-100">
              {pubDate}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">许可协议</div>
            <Link
              href={finalLicenseUrl}
              className="text-primary-500 mt-1 block text-sm font-medium hover:underline"
            >
              {finalLicenseName}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
