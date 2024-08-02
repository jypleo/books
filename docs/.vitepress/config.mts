import { defineConfig } from 'vitepress';
import { generateSidebar } from 'vitepress-sidebar';

const pamphletList = [
  {
    title: 'Webpack5 核心原理与应用实践',
    path: 'webpack5',
    index: '1 重新认识 Webpack：旧时代的破局者.md',
  },
  {
    title: 'TypeScript全面进阶指南',
    path: 'advanced-guide-to-mastering-typeScript',
    index: '1.开篇：用正确的方式学习 TypeScript.md',
  },
  {
    title: '玩转css艺术之美',
    index: '1.准备篇：学前准备.md',
  },
  {
    title: '防御式 CSS 精讲',
    index: '1 推荐序｜克军：写好 CSS 是需要经验的.md',
  },
  {
    title: '基于 Vite 的组件库工程化实战',
    index: '1 开篇词：学习前端工程化就从搭建组件库开始.md',
  },
  {
    title: '前端算法与数据结构面试：底层逻辑解读与大厂真题训练',
    index: '1 面试总有套路，算法不是玄学——写给普通人的前端算法面试攻略.md',
  },
  {
    title: 'Babel 插件通关秘籍',
    index: '1 Babel 的介绍.md',
  },
  {
    title: 'WebGL 入门与实践',
    index: '1 初级入门 --- 认识 WebGL.md',
  },
];

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
        items: pamphletList.map((m) => ({
          text: m.title,
          link: `/pamphlet/${m.path || m.title}/${m.index}`,
        })),
      },
    ],
    sidebar: generateSidebar(
      pamphletList.map((m) => ({
        documentRootPath: `/docs/pamphlet/${m.path || m.title}`,
        resolvePath: `/pamphlet/${m.path || m.title}/`,
        sortMenusOrderNumericallyFromTitle: true,
      })),
    ),
    socialLinks: [{ icon: 'github', link: 'https://github.com/jypleo/books' }],
  },
  vite: {
    assetsInclude: ['**/*.awebp'],
  },
  ignoreDeadLinks: true,
});
