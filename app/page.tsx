// file: app/page.tsx
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import Main from './Main'
import { allBlogs } from 'contentlayer/generated'
import { getStatsData } from '../lib/stats' // <<< 导入工具函数
import LayoutWrapper from '@/components/LayoutWrapper' // <<< 导入 Wrapper

export default async function Page() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const statsData = getStatsData() // <<< 获取统计数据

  return (
    <LayoutWrapper statsData={statsData}>
      <Main posts={posts} />
    </LayoutWrapper>
  )
}
