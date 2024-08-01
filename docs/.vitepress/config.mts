import { defineConfig } from 'vitepress';
import { generateSidebar } from 'vitepress-sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '刘云露',
  description: '一些有意思的东西',
  base: '/books/',
  head: [['meta', { name: 'referrer', content: 'no-referrer' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: '小册',
        items: [
          {
            text: 'Webpack5 核心原理与应用实践',
            link: '/pamphlet/webpack5/1 重新认识 Webpack：旧时代的破局者.md',
          },
          {
            text: 'TypeScript全面进阶指南',
            link: '/pamphlet/advanced-guide-to-mastering-typeScript/1.开篇：用正确的方式学习 TypeScript.md',
          },
        ],
      },
      { text: 'Examples', link: '/markdown-examples' },
    ],
    sidebar: generateSidebar({
      documentRootPath: '/docs',
      sortMenusOrderNumericallyFromTitle: true,
    }),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  vite: {
    assetsInclude: ['**/*.awebp'],
  },
});
