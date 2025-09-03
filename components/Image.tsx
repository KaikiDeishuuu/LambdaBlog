// components/Image.tsx

import NextImage, { type ImageProps } from 'next/image'

const basePath = process.env.BASE_PATH || ''

const Image = ({ src, ...rest }: ImageProps) => {
  // 1. 我们保留了对 src 的处理逻辑，确保图片路径正确
  const imageSrc = `${basePath}${src}`

  return (
    // 👇 2. 用一个 div 作为相对定位的容器
    <div className="relative">
      {/* 3. 将处理后的 imageSrc 和其他 props 传递给 NextImage 组件 */}
      <NextImage src={imageSrc} {...rest} />

      {/* 👇 4. 在图片上方添加一个绝对定位的、完全覆盖的透明浮层 */}
      {/* 这个浮层会拦截所有的鼠标右键和拖拽事件 */}
      <div className="absolute inset-0" />
    </div>
  )
}

export default Image
