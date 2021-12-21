module.exports = {
  // basic site info (required)
  title: `Peng Sha's Blog`,
  author: 'Peng Sha',
  email: 'jack@shapeng1998.com',
  link: 'https://blog.shapeng1998.com',
  description: 'This gonna be an awesome website.',
  since: 2021,
  postsPerPage: 7,
  sortByDate: false,
  showAbout: true,
  showArchive: true,

  // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES']
  lang: 'en-US',

  // the automatically collapsed navigation bar
  autoCollapsedNavBar: false,

  // the link to generate OG image, don't end with a slash
  ogImageGenerateURL: 'https://og-image-craigary.vercel.app',

  socialLink: 'https://twitter.com/shapeng1998',
  seo: {
    keywords: ['Blog', 'Website', 'Notion'],
  },
  notionPageId: process.env.NOTION_PAGE_ID || '',

  // distinguish between development and production environment
  // ref: https://vercel.com/docs/environment-variables#system-environment-variables
  isProd: process.env.VERCEL_ENV === 'production',
};
