// file: components/LayoutWrapper.tsx

import { Inter } from 'next/font/google'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import { ReactNode } from 'react'
import Header from './Header'

// --- 关键修复 1: 导入我们创建的共享类型 ---
import { StatsData } from '../types/stats'

interface Props {
  children: ReactNode
  // --- 关键修复 2: 使用具体的 StatsData 类型替换 any ---
  statsData: StatsData
}

const inter = Inter({
  subsets: ['latin'],
})

const LayoutWrapper = ({ children, statsData }: Props) => {
  return (
    <SectionContainer>
      <div className={`${inter.className} flex h-screen flex-col justify-between font-sans`}>
        <Header statsData={statsData} />
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
