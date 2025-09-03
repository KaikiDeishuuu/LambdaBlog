// data/animeData.ts
export interface Anime {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const animeData: Anime[] = [
  {
    title: '物语系列',
    description: '《物语系列》是以21世纪初的日本某乡镇为舞台，描绘一名高中少年“阿良良木历”与少女们遇到许多日本民间传说的怪谈故事。真是史上最空洞不负责任的介绍……',
    imgSrc: '/static/images/monogatari.jpg',
    href: 'https://zh.moegirl.org.cn/%E7%89%A9%E8%AF%AD%E7%B3%BB%E5%88%97',
  },
  {
    title: '贝木泥舟',
    description: '只要活着，总会有好事发生的吧。',
    imgSrc: '/static/images/kaikideishuu.png',
    href: 'https://zh.moegirl.org.cn/%E8%B4%9D%E6%9C%A8%E6%B3%A5%E8%88%9F',
  },
  {
    title: '战场原荡漾',
    description: '如同强力磁场般，牢牢吸住了我。',
    imgSrc: '/static/images/senjougahara.png',
    href: 'https://zh.moegirl.org.cn/%E6%88%98%E5%9C%BA%E5%8E%9F%E9%BB%91%E4%BB%AA',
  },
]

export default animeData

