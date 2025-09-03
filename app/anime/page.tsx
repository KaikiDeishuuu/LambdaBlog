// file: app/anime/page.tsx

// --- 关键修改 1: 添加必要的 imports ---
import LayoutWrapper from '@/components/LayoutWrapper'
import { getStatsData } from '../../lib/stats'

// --- 以下是您提供的、完全没有改动的原始代码 ---
import animeData from '@/data/animeData'
import AnimeCard from '@/components/AnimeCard'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Anime' })

export default function AnimePage() {
  // --- 关键修改 2: 获取统计数据 ---
  const statsData = getStatsData()

  return (
    // --- 关键修改 3: 用 LayoutWrapper 将您原来的代码包裹起来 ---
    <LayoutWrapper statsData={statsData}>
      {/* vvvvvvvvvv 这里面的所有代码都是您原来的，一行未改 vvvvvvvvvv */}
      <div className="container mx-auto py-12">
        <h1 className="mb-8 text-center text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          Anime Collection
        </h1>
        <div className="flex flex-wrap justify-center">
          {animeData.map((anime) => (
            <AnimeCard
              key={anime.title}
              title={anime.title}
              description={anime.description}
              imgSrc={anime.imgSrc}
              href={anime.href}
            />
          ))}
        </div>
      </div>
      {/* ^^^^^^^^^^ 这里面的所有代码都是您原来的，一行未改 ^^^^^^^^^^ */}
    </LayoutWrapper>
  )
}
