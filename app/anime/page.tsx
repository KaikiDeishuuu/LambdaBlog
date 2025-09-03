// app/anime/page.tsx
import animeData from '@/data/animeData'
import AnimeCard from '@/components/AnimeCard'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Anime' })

export default function AnimePage() {
  return (
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
  )
}
