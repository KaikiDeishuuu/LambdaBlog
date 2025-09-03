import { Inter } from 'next/font/google'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import { ReactNode } from 'react'
import Header from './Header'

interface Props {
  children: ReactNode
  statsData?: {
    tagCounts: Record<string, number>
    monthlyLabels: string[]
    monthlyData: number[]
    dailyStats: Record<string, number>
  }
}

const inter = Inter({
  subsets: ['latin'],
})

const LayoutWrapper = ({ children, statsData }: Props) => {
  // 默认空数据
  const defaultStatsData = {
    tagCounts: {},
    monthlyLabels: [],
    monthlyData: [],
    dailyStats: {},
  }

  return (
    <SectionContainer>
      <div className={`${inter.className} flex h-screen flex-col justify-between font-sans`}>
        <Header statsData={statsData || defaultStatsData} />
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
