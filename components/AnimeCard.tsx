// components/AnimeCard.tsx
import Image from 'next/image'
import Link from 'next/link'

interface AnimeCardProps {
  title: string
  description: string
  imgSrc?: string
  href?: string
}

export default function AnimeCard({ title, description, imgSrc, href }: AnimeCardProps) {
  const isExternal = href?.startsWith('http')

  if (isExternal) {
    // 外部链接，新标签页打开
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group m-4 w-full max-w-xs overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-900"
      >
        {imgSrc && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={imgSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-indigo-500 dark:text-gray-100">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </a>
    )
  }

  // 内部链接，Next.js 客户端导航
  return (
    <Link
      href={href || '#'}
      className="group m-4 w-full max-w-xs overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-900"
    >
      {imgSrc && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imgSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-indigo-500 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </Link>
  )
}
