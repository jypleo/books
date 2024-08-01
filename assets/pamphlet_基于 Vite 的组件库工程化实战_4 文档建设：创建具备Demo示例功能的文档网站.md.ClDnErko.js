import{_ as s,c as n,o as a,a2 as p}from"./chunks/framework.D8Prfz4N.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"pamphlet/基于 Vite 的组件库工程化实战/4 文档建设：创建具备Demo示例功能的文档网站.md","filePath":"pamphlet/基于 Vite 的组件库工程化实战/4 文档建设：创建具备Demo示例功能的文档网站.md"}'),t={name:"pamphlet/基于 Vite 的组件库工程化实战/4 文档建设：创建具备Demo示例功能的文档网站.md"},e=p(`<p>可能有人会非常奇怪，为什么会在第四节就讲如何搭建文档系统。在软件工程中有这样一个概念：<strong>一个完整的软件是文档和代码的组合体</strong>，一堆不知道如何使用的代码没有任何价值。项目文档的建设工作应该越早越好。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea17ede6574b4f93baea01f160f7ec08~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>本章代码： <a href="https://github.com/smarty-team/smarty-admin/tree/chapter04/packages/smarty-ui-vite" target="_blank" rel="noreferrer">https://github.com/smarty-team/smarty-admin/tree/chapter04/packages/smarty-ui-vite</a></p><h2 id="用户故事-userstory" tabindex="-1">用户故事(UserStory) <a class="header-anchor" href="#用户故事-userstory" aria-label="Permalink to &quot;用户故事(UserStory)&quot;">​</a></h2><p>通过 Vitepress 创建一个文档网站，可以展示组件 Demo 示例、描述、模板代码。</p><h2 id="功能分解-task" tabindex="-1">功能分解(Task) <a class="header-anchor" href="#功能分解-task" aria-label="Permalink to &quot;功能分解(Task)&quot;">​</a></h2><ul><li>利用 Vitepress 搭建生成文档网站；</li><li>引用组件并展示到 Demo；</li><li>引用 Markdown 插件方便代码Demo示例编写。</li></ul><h2 id="功能实现" tabindex="-1">功能实现 <a class="header-anchor" href="#功能实现" aria-label="Permalink to &quot;功能实现&quot;">​</a></h2><p>文档建设一般会是一个静态网站的形式 ，这次采用 Vitepress 完成文档建设工作。</p><p>Vitepress 是一款基于Vite 的静态站点生成工具。开发的初衷就是为了建设 Vue 的文档。Vitepress 的方便之处在于，可以使用流行的 Markdown 语法进行编写，也可以直接运行 Vue 的代码。也就是说，它能很方便地完成展示组件 Demo 的任务。</p><p>使用 Vitepress 作为文档建设工具还有另外一个好处。由于 Vitepress 是基于 Vite 的，所以它也很好的继承了 Bundless 特性，开发的代码能以“秒级”速度在文档中看到运行效果，完全可以充当调试工具来使用。所以通常情况下我开发组件时，就会直接选择在 Vitepress 上进行调试。这个开发方式大家也可以尝试一下。</p><p>下面开始搭建 Vitepress文档。</p><h3 id="添加-vitepress-文档" tabindex="-1">添加 VitePress 文档 <a class="header-anchor" href="#添加-vitepress-文档" aria-label="Permalink to &quot;添加 VitePress 文档&quot;">​</a></h3><p>首先需要引入 Vitepress 文档。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm i vitepress@&quot;0.22.4&quot; -D</span></span></code></pre></div><p>配置 Vitepress 的 vite.config.ts。</p><p>默认 Vitepress 是无需配置 vitepress.config.ts 的，但是组件库中需要支持 JSX 语法与 UnoCSS，所以就需要添加配置文件。</p><p>docs/vite.config.ts</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { defineConfig } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;vite&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> vueJsx </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;@vitejs/plugin-vue-jsx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Unocss </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;../config/unocss&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// https://vitejs.dev/config/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 添加JSX插件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    vueJsx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(),</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    Unocss</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>创建首页文档文档。 在代码根目录下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>echo &#39;# SmartyUI&#39; &gt; docs/index.md</span></span></code></pre></div><p>增加启动脚本。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;scripts&quot;: {</span></span>
<span class="line"><span>    &quot;docs:dev&quot;: &quot;vitepress dev docs&quot;,</span></span>
<span class="line"><span>    &quot;docs:build&quot;: &quot;vitepress build docs&quot;,</span></span>
<span class="line"><span>    &quot;docs:serve&quot;: &quot;vitepress serve docs&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>启动后看一下效果。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0dd68f5d56bd4e9585b160b70370e1e6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>接着可以尝试用 Markdown 增加一点内容。 关于一个开源项目需要编写什么内容，后面的章节会给大家讲解。最后实现的效果如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa1e88ef3bfa44b4818ea4f1d3874792~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h3 id="配置菜单" tabindex="-1">配置菜单 <a class="header-anchor" href="#配置菜单" aria-label="Permalink to &quot;配置菜单&quot;">​</a></h3><p>对于组件库而言，需要将每一个组件的使用方法分一个页面呈现，所以需要配置一下菜单。</p><p>在 docs 文件夹中添加一个 config.ts 文件。config.ts 配置菜单项的基本信息：</p><ul><li>配置菜单项；</li><li>子菜单所对应的 markdwon 文件路径(默认页面 index.md)。</li></ul><p>docs/.vitepress/config.ts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const sidebar = {</span></span>
<span class="line"><span>  &#39;/&#39;: [</span></span>
<span class="line"><span>    { text: &#39;快速开始&#39;, link: &#39;/&#39; },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      text: &#39;通用&#39;,</span></span>
<span class="line"><span>      children: [</span></span>
<span class="line"><span>        { text: &#39;Button 按钮&#39;, link: &#39;/components/button/&#39; },</span></span>
<span class="line"><span>      ]</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    { text: &#39;导航&#39; },</span></span>
<span class="line"><span>    { text: &#39;反馈&#39; },</span></span>
<span class="line"><span>    { text: &#39;数据录入&#39; },</span></span>
<span class="line"><span>    { text: &#39;数据展示&#39; },</span></span>
<span class="line"><span>    { text: &#39;布局&#39; },</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>const config = {</span></span>
<span class="line"><span>  themeConfig: {</span></span>
<span class="line"><span>    sidebar,</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>export default config</span></span></code></pre></div><p>点击左侧菜单的 Button，看下效果：</p><p><a href="https://link.juejin.cn/?target=http://localhost:3000/components/button/" target="_blank" rel="noreferrer">http://localhost:3000/components/button/</a></p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbc5449be2c84a32a0a58fd5df0b4424~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h3 id="组件-demo-展示" tabindex="-1">组件 Demo 展示 <a class="header-anchor" href="#组件-demo-展示" aria-label="Permalink to &quot;组件 Demo 展示&quot;">​</a></h3><p>组件库文档一般都会有展示组件 Demo 的需求。组件的展示实际上就是将组件引用到 markdown 页面中。其实 markdown 是可以直接运行 html 代码的。而 Vitepress 中也含有 vue 实例，也就是说 vue 的代码也是可以直接运行的。唯一的问题就是如何将组件库加载。</p><p>通过编写一个主题 theme 就可以获取 vue 实例。只需要在 enhanceApp 方法中注册组件库插件就可以了。</p><p>docs/.vitepress/theme/index.ts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import Theme from &#39;vitepress/dist/client/theme-default&#39;</span></span>
<span class="line"><span>import SmartyUI from &#39;../../../src/entry&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  ...Theme,</span></span>
<span class="line"><span>  enhanceApp({ app }) {</span></span>
<span class="line"><span>    app.use(SmartyUI)</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>加载组件库后，尝试在 markdown 中引用组件的代码。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Button 按钮</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;div style=&quot;margin-bottom:20px;&quot;&gt;</span></span>
<span class="line"><span>    &lt;SButton color=&quot;blue&quot;&gt;主要按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>    &lt;SButton color=&quot;green&quot;&gt;绿色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>    &lt;SButton color=&quot;gray&quot;&gt;灰色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>    &lt;SButton color=&quot;yellow&quot;&gt;黄色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>    &lt;SButton color=&quot;red&quot;&gt;红色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span></code></pre></div><p>最后看一下运行效果。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ffde3441a2384eda9f710de6731b3112~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h2 id="引入-demo-演示插件优化阅读体验" tabindex="-1">引入 Demo 演示插件优化阅读体验 <a class="header-anchor" href="#引入-demo-演示插件优化阅读体验" aria-label="Permalink to &quot;引入 Demo 演示插件优化阅读体验&quot;">​</a></h2><p>这个时候，可能会有人问， ElementUI 那种同时演示 Demo 和代码的酷炫效果是怎么做的呢？ 其实那个只是一个前端效果，相信大家都会自己实现。只不过 Element 把它封装为一个 Markdown 插槽，更加容易使用。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66d6c557711f48fbb4eb5af3eaf52348~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>什么是markdown插槽？简单讲解一下，下面这种语法就是。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>::: slot name </span></span>
<span class="line"><span>:::</span></span></code></pre></div><p>这相当于一种 Markdown 的功能扩展。如果有兴趣的可以参考这个文档：<a href="https://www.vuepress.cn/guide/markdown-slot.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81-markdown-%E6%8F%92%E6%A7%BD" target="_blank" rel="noreferrer">VuePress 中文文档 | VuePress 中文网</a>。</p><p>Element 实际上就是实现 Markdown 插槽，来实现同时显示 Demo 与代码的。有一个开源项目 vitepress-theme-demoblock ，它是模仿了 Element 的这个功能实现的，可以达到类似的效果。我们的组件库中也引用它来实现。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm i vitepress-theme-demoblock@&quot;1.4.2&quot; -D</span></span></code></pre></div><p>首先安装 vitepress-theme-demoblock。</p><p>docs/.vitepress/config.ts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>module.exports = {</span></span>
<span class="line"><span>  markdown: {</span></span>
<span class="line"><span>    config: (md) =&gt; {</span></span>
<span class="line"><span>      // 添加DemoBlock插槽</span></span>
<span class="line"><span>      const { demoBlockPlugin } = require(&#39;vitepress-theme-demoblock&#39;)</span></span>
<span class="line"><span>      md.use(demoBlockPlugin)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>接着在 docs/.vitepress/theme/index.ts 中注册 vitepress-theme-demoblock 插件所需的 demo 和 demo-block 组件，如下面这样：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 主题样式</span></span>
<span class="line"><span>import &#39;vitepress-theme-demoblock/theme/styles/index.css&#39;</span></span>
<span class="line"><span>// 插件的组件，主要是demo组件</span></span>
<span class="line"><span>import Demo from &#39;vitepress-theme-demoblock/components/Demo.vue&#39;</span></span>
<span class="line"><span>import DemoBlock from &#39;vitepress-theme-demoblock/components/DemoBlock.vue&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  enhanceApp({ app }) {</span></span>
<span class="line"><span>    app.component(&#39;Demo&#39;, Demo)</span></span>
<span class="line"><span>    app.component(&#39;DemoBlock&#39;, DemoBlock)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>最后在 markdown 文档中编写一段带有 Demo 插槽的 markdown。</p><p>docs/components/index.md</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Button 按钮</span></span>
<span class="line"><span>常用操作按钮</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 基础用法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>基础的函数用法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:::demo 使用\`size\`、\`color\`、\`pain\`、\`round\`属性来定义 Button 的样式。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`vue</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span> &lt;div style=&quot;margin-bottom:20px;&quot;&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;blue&quot;&gt;主要按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;green&quot;&gt;绿色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;gray&quot;&gt;灰色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;yellow&quot;&gt;黄色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;red&quot;&gt;红色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span> &lt;/div&gt;</span></span>
<span class="line"><span> &lt;div style=&quot;margin-bottom:20px;&quot;</span></span>
<span class="line"><span> &gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;blue&quot; plain&gt;朴素按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;green&quot; plain&gt;绿色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;gray&quot; plain&gt;灰色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;yellow&quot; plain&gt;黄色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;red&quot; plain&gt;红色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span> &lt;/div&gt;</span></span>
<span class="line"><span> &lt;div style=&quot;margin-bottom:20px;&quot;&gt;</span></span>
<span class="line"><span>  &lt;SButton size=&quot;small&quot; plain&gt;小按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton size=&quot;medium&quot; plain&gt;中按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton size=&quot;large&quot; plain&gt;大按钮&lt;/SButton&gt;</span></span>
<span class="line"><span> &lt;/div&gt;</span></span>
<span class="line"><span> &lt;div style=&quot;margin-bottom:20px;&quot;&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;blue&quot; round plain icon=&quot;search&quot;&gt;搜索按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;green&quot; round plain icon=&quot;edit&quot;&gt;编辑按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;gray&quot; round plain icon=&quot;check&quot;&gt;成功按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;yellow&quot; round plain icon=&quot;message&quot;&gt;提示按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;red&quot; round plain icon=&quot;delete&quot;&gt;删除按钮&lt;/SButton&gt;</span></span>
<span class="line"><span> &lt;/div&gt;</span></span>
<span class="line"><span> &lt;div style=&quot;margin-bottom:20px;&quot;&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;blue&quot; round plain icon=&quot;search&quot;&gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;green&quot; round plain icon=&quot;edit&quot;&gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;gray&quot; round plain icon=&quot;check&quot;&gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;yellow&quot; round plain icon=&quot;message&quot;&gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;red&quot; round plain icon=&quot;delete&quot;&gt;&lt;/SButton&gt;</span></span>
<span class="line"><span> &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span>:::</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 图标按钮</span></span>
<span class="line"><span></span></span>
<span class="line"><span>带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:::demo 设置 icon 属性即可，icon 的列表可以参考 Element 的 icon 组件，也可以设置在文字右边的 icon ，只要使用 i 标签即可，可以使用自定义图标。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`vue</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span> &lt;div class=&quot;flex flex-row&quot;&gt;</span></span>
<span class="line"><span>  &lt;SButton icon=&quot;edit&quot; plain&gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton icon=&quot;delete&quot; plain&gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton icon=&quot;share&quot; plain&gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton round plain icon=&quot;search&quot;&gt;搜索&lt;/SButton&gt;</span></span>
<span class="line"><span> &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span>\`\`\`</span></span></code></pre></div><p>看看效果吧。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e7a042419c543c9b9e126ef16810832~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>本章代码： <a href="https://github.com/smarty-team/smarty-admin/tree/chapter04/packages/smarty-ui-vite" target="_blank" rel="noreferrer">https://github.com/smarty-team/smarty-admin/tree/chapter04/packages/smarty-ui-vite</a></p><h2 id="复盘" tabindex="-1">复盘 <a class="header-anchor" href="#复盘" aria-label="Permalink to &quot;复盘&quot;">​</a></h2><p>这节我们主要介绍的是如何给组件库进行文档建设。主要使用 Vitepress 实现。</p><p>大概总结如下：</p><ol><li>Vitepress 作为静态文档生成器，提供将 markdown 生成静态网站的能力；</li><li>通过配置主题获取 vue 实例，加载组件库，对组件库运行 Demo 进行展示；</li><li>通过引用 DemoBlock Markdown 插槽，可以达到同时展示 Demo 和代码块的酷炫效果。</li></ol><p>最后建议大家尝试一下，用 Vitepress 调试代码的开发方式。我认为这种方式非常理想。不但可以方便调试，并且可以同步编写文档。</p><p>大家可以将这种开发的使用感受在评论区分享。</p><p>最后留一些思考题帮助大家复习：</p><ul><li>如何配置 Vitepress 完成文档建设 ？</li><li>如何在 vitepress 中引用 vue 组件？</li><li>什么是 markdown 插槽 ？</li></ul><p>下节课，我们将给组件库添加单元测试，下节课见。</p>`,73),l=[e];function i(o,c,u,r,d,h){return a(),n("div",null,l)}const k=s(t,[["render",i]]);export{m as __pageData,k as default};
