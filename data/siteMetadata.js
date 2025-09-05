/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: "Kaiki's Blog",
  author: 'KaikiDeishuu',
  headerTitle: 'HitagiBlog',
  description: 'A blog about my working and learning',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://lambda-blog-ten.vercel.app',
  siteRepo: 'https://github.com/KaikiDeishuuu/LambdaBlog',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/my_logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  mastodon: 'https://mastodon.social/@mastodonuser',
  email: 'kaikideishuuu@163.com',
  github: 'https://github.com/KaikiDeishuuu',
  locale: 'en-US',
  // set to true if you want a navbar fixed to the top
  stickyNav: false,
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    umamiAnalytics: {
      // We use an env variable for this site to avoid other users cloning our analytics ID
      umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
      // You may also need to overwrite the script if you're storing data in the US - ex:
      // src: 'https://us.umami.is/script.js'
      // Remember to add 'us.umami.is' in `next.config.js` as a permitted domain for the CSP
    },
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    // If you are hosting your own Plausible.
    //   src: '', // e.g. https://plausible.my-domain.com/js/script.js
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    // googleAnalytics: {
    //   googleAnalyticsId: '', // e.g. G-XXXXXXX
    // },
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  comments: {
    // 你必须提供一个 provider，这里我们选择 'giscus'
    provider: 'giscus',
    giscusConfig: {
      // 在这里填写你的 "用户名/仓库名"
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO || 'KaikiDeishuuu/LambdaBlog',
      // 下面这两个 ID 从 giscus.app 网站上复制过来
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID || 'R_kgDOPn8ZjQ',
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'Announcements',
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || 'DIC_kwDOPn8Zjc4Cu4jg',
      mapping: 'pathname', // 按路径名映射
      reactions: '1', // 启用评论的 emoji 反应
      // 元数据配置，'0' 表示不发送
      metadata: '0',
      // 主题设置
      theme: 'light',
      darkTheme: 'transparent_dark',
      // Giscus 组件的其他选项
      themeURL: '',
      lang: 'zh-CN', // 将 Giscus 界面设置为中文
    },
  },
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`, // path to load documents to search
    },
    // provider: 'algolia',
    // algoliaConfig: {
    //   // The application ID provided by Algolia
    //   appId: 'R2IYF7ETH7',
    //   // Public API key: it is safe to commit it
    //   apiKey: '599cec31baffa4868cae4e79f180729b',
    //   indexName: 'docsearch',
    // },
  },
  // 新增以下配置:License
  license: {
    enable: true, // 全局开关
    name: 'CC BY-NC-SA 4.0',
    url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
}

// --- highlight-start ---
// 在文件的这个位置添加 statsData 数组
siteMetadata.statsData = [
  { label: '总文章数', value: 128, icon: 'posts' },
  { label: '总评论数', value: 512, icon: 'comments' },
  { label: '标签总数', value: 64, icon: 'tags' },
  { label: '阅读总量', value: 10240, icon: 'views' },
  // 如果需要，您可以继续添加更多条目
]
// --- highlight-end ---

module.exports = siteMetadata
