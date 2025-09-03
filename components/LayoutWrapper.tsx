// file: components/LayoutWrapper.tsx

import SectionContainer from './SectionContainer'
import Footer from './Footer'
import { ReactNode } from 'react'
import Header from './Header'
import { StatsData } from '../types/stats'

// --- 关键修复 1: 删除了 `import { Inter } from 'next/font/google'` ---
// --- 关键修复 2: 删除了 `const inter = Inter(...)` ---

interface Props {
  children: ReactNode
  statsData: StatsData
}

const LayoutWrapper = ({ children, statsData }: Props) => {
  return (
    <SectionContainer>
      {/* --- 关键修复 3: 从 className 中移除了 `${inter.className}` --- */}
      {/* `font-sans` 会自动从 tailwind.config.ts 中继承您定义的 Space Grotesk 字体 */}
      <div className="flex h-screen flex-col justify-between font-sans">
        <Header statsData={statsData} />
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
