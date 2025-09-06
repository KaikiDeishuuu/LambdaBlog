// src/components/TableOfContents.tsx
'use client'

import { Toc } from 'pliny/mdx-plugins/index'

// 定义一个接口，描述 TOC 节点的形状
interface TocNode {
  value: string
  url: string
  depth: number
}

/**
 * 递归地渲染 TOC 节点。
 * 这个函数让我们可以创建漂亮的嵌套列表。
 */
const renderTocNodes = (nodes: TocNode[]) => {
  return (
    <ul>
      {nodes.map((node) => (
        <li key={node.url}>
          <a
            href={node.url}
            // 根据标题深度，添加不同的左侧内边距，实现缩进效果
            className={`hover:text-primary-500 dark:hover:text-primary-400 block py-1 text-gray-500 transition-colors dark:text-gray-400`}
            style={{ paddingLeft: `${(node.depth - 1) * 1}rem` }}
          >
            {node.value}
          </a>
        </li>
      ))}
    </ul>
  )
}

const TableOfContents = ({ toc }: { toc: Toc }) => {
  // 我们只渲染 H2 和 H3 标题，H1 已经是页面主标题了
  const filteredToc = toc.filter((node) => node.depth === 2 || node.depth === 3)

  if (filteredToc.length === 0) {
    return null // 如果没有 H2/H3 标题，则不渲染任何东西
  }

  return <nav>{renderTocNodes(filteredToc)}</nav>
}

export default TableOfContents
