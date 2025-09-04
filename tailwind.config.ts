import type { Config } from 'tailwindcss'
// --- 关键修复 1: 将所有 require() 替换为 ESM import ---
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
// --- 修复结束 ---

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // 扫描 app 文件夹下的所有 JavaScript/TypeScript 文件
    './components/**/*.{js,ts,jsx,tsx}', // 扫描 components 文件夹下的所有文件
    './layouts/**/*.{js,ts,jsx,tsx}', // 扫描 layouts 文件夹下的所有文件
    './data/**/*.mdx', // 扫描 data 文件夹下的所有 .mdx 文件
    './css/**/*.css', // 扫描 css 文件夹下的所有 .css 文件
  ],
  darkMode: 'class', // 使用 class 控制 dark 模式
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.pink,
        gray: colors.gray,
      },
      // --- 关键修复 2: 为 theme 提供一个具体的类型，替换 'any' ---
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: theme('colors.primary.600'),
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            code: {
              color: theme('colors.indigo.500'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: theme('colors.primary.400'),
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
      // --- 修复结束 ---
    },
  },
  // --- 关键修复 3: 使用导入的变量 ---
  plugins: [forms, typography],
}

export default config
