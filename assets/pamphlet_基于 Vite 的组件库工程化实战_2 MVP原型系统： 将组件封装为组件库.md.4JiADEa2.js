import{_ as s,c as a,o as n,a2 as i}from"./chunks/framework.D8Prfz4N.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"pamphlet/基于 Vite 的组件库工程化实战/2 MVP原型系统： 将组件封装为组件库.md","filePath":"pamphlet/基于 Vite 的组件库工程化实战/2 MVP原型系统： 将组件封装为组件库.md"}'),p={name:"pamphlet/基于 Vite 的组件库工程化实战/2 MVP原型系统： 将组件封装为组件库.md"},t=i(`<p>今天带大家从零实现一个组件库。为了给大家带来更加真实的开发体验，使用敏捷方式。每节课讲述一个主题，作为一个 Sprint 冲刺过程。从一个 MVP 开始，每个冲刺都会给组件添加一种特性，最终成为一个完整的组件库。</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6247205bef5641918482184958dfdf79~tplv-k3u1fbpfcp-watermark.image?" alt="eeb5791e9a6c415f27eddba6b7b5e990.jpeg"></p><p>本章节参考代码： <a href="https://github.com/smarty-team/smarty-admin/tree/chapter02" target="_blank" rel="noreferrer">https://github.com/smarty-team/smarty-admin/tree/chapter02</a></p><h2 id="用户故事-userstory" tabindex="-1">用户故事(UserStory)： <a class="header-anchor" href="#用户故事-userstory" aria-label="Permalink to &quot;用户故事(UserStory)：&quot;">​</a></h2><blockquote><p>通过 Vite 将一个组件封装为组件库，组件库可以被其他Vue项目作为插件直接进行使用。</p></blockquote><p>这一节的核心任务是完成一个组件库的 MVP。MVP (Minimum Viable Product) 是最简化可实行产品的意思。在组件库中，最小的 MVP，可以定义为： 将一个组件以组件库的形式封装起来。组件库实际上就是一个 JS 的库文件，可以被 Vue 项目引用其封装的组件。</p><p>搭建这样一个环境需要解决以下问题：</p><ul><li>如何配置构建工具？</li><li>如何搭建一个调试环境？</li><li>组件以什么样的形式封装？</li><li>如何让组件库支持使用 JSX、SFC 单文件组件等语法？</li></ul><h2 id="功能实现" tabindex="-1">功能实现 <a class="header-anchor" href="#功能实现" aria-label="Permalink to &quot;功能实现&quot;">​</a></h2><h3 id="vite搭建开发环境" tabindex="-1">Vite搭建开发环境 <a class="header-anchor" href="#vite搭建开发环境" aria-label="Permalink to &quot;Vite搭建开发环境&quot;">​</a></h3><p>搭建一个项目，首先要创建一个开发目录并且初始化软件包信息(Npm)。</p><p>创建一个目录：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mkdir smarty-ui-vite</span></span>
<span class="line"><span>cd smarty-ui-vite</span></span></code></pre></div><p>这个项目的包管理工作选择目前比较流行的 Pnpm 完成。选择 Pnpm ，首先是由于 Pnpm 优秀的管理机制，使得安装依赖非常迅速且节省空间。更重要的是，项目后期需要开发组件库的周边，比如 CLI 工具等。CLI工具以单独软件包的形式发布在 npm 仓库之中，这样的话，一个 Repo 多个软件包的项目结构需要使用 monorepo 风格进行管理。pnpm 拥有的 workspace 功能可以很好地完成这样的工作。</p><p>下面使用 pnpm 初始软件包配置：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm init</span></span></code></pre></div><p>初始化完成后，下一步是利用 Vite 搭建一个组件库的调试环境。为什么选择 Vite ，开篇词中已经介绍了，这里面我们就不再赘述。</p><p>如果使用 Vite 搭建普通项目的话，我推荐使用 Vite 脚手架工具搭建。这样可以免去大量的工程化配置工作。<strong>但是作为一个需要长期维护的组件库，我希望所有的工程化搭建细节都掌控在自己的手中。所以这次，就从零开始自己搭建Vite项目。</strong></p><p>首先安装 Vite。Vite 作为开发调试工具，只会在在开发环境中使用，所以需要在安装时加上 -d 。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm i vite@&quot;3.0.7&quot; -D</span></span></code></pre></div><p>下面创建创建一个测试页面，测试Vite是否安装正常。</p><p>index.html</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;!</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">DOCTYPE</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">html</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> lang</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;en&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">head</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">meta</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> charset</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;UTF-8&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">meta</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> http-equiv</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;X-UA-Compatible&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;IE=edge&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">meta</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;viewport&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;width=device-width, initial-scale=1.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;Document&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">head</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;Hello Smarty UI&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>启动 Vite。启动 Vite 的时候使用 npx。这是一个 Npm5.2 新增加的命令，用于执行软件包中的可执行文件。 以往的可执行文件只能通过全局安装或者从 node_modules/.bin 中查找，要不然很难直接运行。这个升级体验还是非常赞 👍 。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npx vite</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b8973b4df44410ba951b5cc179fd191~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>看到页面可以正常显示，说明Vite安装正确。</p><p>在 src/index.ts 中编写一个 Typescript 代码，确认 Vite 是否可以调试 Typescript。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const s: string = &#39;Hello Typescript&#39;</span></span>
<span class="line"><span>console.log(s)</span></span></code></pre></div><p>在 index.html 中添加引用。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;h1&gt;Hello Smarty UI&lt;/h1&gt;</span></span>
<span class="line"><span>&lt;script src=&quot;./src/index.ts&quot; type=&quot;module&quot;&gt;&lt;/script&gt;</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f59d3690f56d4c0fadf11f4cc7cdcdc1~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>看到调试窗口中的【 Hello Typescript 】的日志，说明 Vite 已经可以正常地调试 Typescript 代码了。</p><p>我觉得这个就是 Vite 体验好的地方。无需任何配置就可以提供一个Typescript 的前端开发环境，支持自动热更新。如果你是一个 前端 Typescript 党，可以考虑把 Vite 安装到全局。这样你就可以全局使用 Typescript 开发前端了。</p><p>最后在 package.json 中添加一个启动脚本，下次在启动开发环境运行 pnpm dev ，就可以启动 Vite 开发代码了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  &quot;scripts&quot;: {</span></span>
<span class="line"><span>    &quot;dev&quot;: &quot;vite&quot;</span></span>
<span class="line"><span>  },</span></span></code></pre></div><h3 id="开发一个vue组件" tabindex="-1">开发一个Vue组件 <a class="header-anchor" href="#开发一个vue组件" aria-label="Permalink to &quot;开发一个Vue组件&quot;">​</a></h3><p><strong>基础组件</strong></p><p>下面尝试在 Vite 开发环境上开发 Vue 组件。</p><p>首先安装 Vue3.0 软件包。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm i vue@&quot;3.2.37&quot;</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94bed03c838e4a2bb9fc102d4007fa2a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>接着尝试编写一个简单的 Button 组件。</p><p>编写一个 /src/button/index.ts 组件。</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { defineComponent, h } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;vue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineComponent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;SButton&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // template:&#39;&lt;button&gt;MyButton&lt;/button&gt;&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> h</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;button&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;MyButton&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>在 src/index.ts 中启动 Vue 实例。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { createApp } from &quot;vue&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import SButton from &quot;./button&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>createApp(SButton).mount(&quot;#app&quot;);</span></span></code></pre></div><p>还需要在 index.html 中添加一个容器。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42a07e332f354127b5b3ffa3ab7ce9f8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>启动Vite进行调试。在浏览器中打开 localhost:3000。就可以看到一个按钮已经显示到浏览器中了。</p><p><strong>单文件组件</strong></p><p>写到这里大家可能有点疑问：<strong>为什么是使用 render 函数，而不是熟悉的 template 语法编写呢？</strong></p><p>这是因为 Vue3.0 默认的包是不支持模板编译功能的。也就是说， template 语法现在还不能用。在 Vue3.0 中编译功能推荐在构建阶段完成，而不是放到浏览器中运行。如果希望在浏览器中的话，可以选择 ./node_modules/vue/dist/vue.global.js 这个包。</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc5342f402e447bca8786fabf82f21d5~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"> 如果让 Vite 可以编译 Vue 模版，可以通过安装 Vite 的 Vue 插件实现。你可以这样理解， Vite 默认只能支持 TS 代码。而 Vue 的模板需要在编译阶段转换为 Typescript 代码 (渲染函数)才可以运行。Vue 插件不但提供了模板的编译，同时还支持 Vue 单文件 (SFC) 组件的编译。下面用一张图来说明一下。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bf1f4ca17214689a8477c5f79460b15~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><ul><li>提供 Vue 3 单文件组件支持</li><li><a href="https://github.com/vitejs/vite/tree/main/packages/plugin-vue" target="_blank" rel="noreferrer">https://github.com/vitejs/vite/tree/main/packages/plugin-vue</a></li></ul><p>安装 Vite 的Vue插件。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm i @vitejs/plugin-vue@&quot;3.0.3&quot; -D</span></span></code></pre></div><p>添加一个 vite.config.ts。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { defineConfig } from &quot;vite&quot;;</span></span>
<span class="line"><span>import vue from &quot;@vitejs/plugin-vue&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// https://vitejs.dev/config/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default defineConfig({</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  plugins: [vue()],</span></span>
<span class="line"><span></span></span>
<span class="line"><span>});</span></span></code></pre></div><p>编写一个 SFC单文件组件 (也就是 .vue 文件) 使用template语法 来测试一下。</p><p>src/SFCButton.vue</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;button&gt;SFC Button&lt;/button&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  name: &quot;SFCButton&quot;,</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre></div><p>引用到 index.ts 中测试一下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { createApp } from &quot;vue&quot;;</span></span>
<span class="line"><span>import SFCButton from &quot;./SFCButton.vue&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>createApp(SFCButton)</span></span>
<span class="line"><span>.mount(&quot;#app&quot;);</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc689ad964474b1a9f3521f0ec1d6b8b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>在引用 .vue 模块时候，编辑器中 import 语句会有红色的警告。这是因为Typescript 默认是不支持 .vue 类型的模块的。可以通过添加一个模块的类型定义来解决这个问题。</p><p>src/shims-vue.d.ts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>declare module &quot;*.vue&quot; {</span></span>
<span class="line"><span>  import { DefineComponent } from &quot;vue&quot;;</span></span>
<span class="line"><span>  const component: DefineComponent&lt;{}, {}, any&gt;;</span></span>
<span class="line"><span>  export default component;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>添加后可以看到红色警告随即消失。</p><p>最后测试一下结果。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45be8fa77107405fbe4031d99eb83140~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p><strong>JSX 组件</strong></p><p>JSX 是一种 Javascript 的语法扩展，最早运用于 React 架构中。JSX 也可以当作一种模板语言使用。虽然有人会质疑利用JSX语法编写 Vue3 代码是否合理， 比如怀疑 JSX 语法是否兼容 Vue3 的静态提升特性。但是现在很多基于 Vue 的组件库都大量使用 JSX 语法，对于工程化搭建，还是以开发者的使用习惯优先，我们支持了再说。</p><p>想要支持 JSX语法，还是需要就需要转译工具的支持。一般会使用 Babel。在 Vite 里，已经有人提前写好了对应的插件。就是下面这位【林成璋（Amour1688)】同学，大家可以膜拜一下。好像 Vue2 的 JSX 插件也是他写的。</p><p><a href="https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx" target="_blank" rel="noreferrer">https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx</a></p><ul><li>提供 Vue 3 JSX 支持（通过 <a href="https://github.com/vuejs/jsx-next" target="_blank" rel="noreferrer">专用的 Babel 转换插件</a>）。</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/452dbe5c712b4bb092429896788bb7c8~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>有了现成的插件，只需要安装这个插件就可以了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm i @vitejs/plugin-vue-jsx@&quot;2.0.0&quot; -D</span></span></code></pre></div><p>vite.config.ts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import vueJsx from &#39;@vitejs/plugin-vue-jsx&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default defineConfig({</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  plugins: [</span></span>
<span class="line"><span>    // 添加JSX插件</span></span>
<span class="line"><span>    vueJsx({</span></span>
<span class="line"><span>      // options are passed on to @vue/babel-plugin-jsx</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span></span></span>
<span class="line"><span>})</span></span></code></pre></div><p>新建一个JSX组件 (使用TS语言所以是TSX)。</p><p>/src/JSXButton.tsx</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { defineComponent, h } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;vue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineComponent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;JSXButton&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;JSX Button&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>由于在ts中使用 JSX 语法，在 vscode编辑器中会提示错误。</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e6689deeb7d4d32acb66c4a4e8b2a17~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>这个提示的意思是不支持 JSX 语法造成的。而不是需要安装 React。只需要在 tsconfig 中配置一下 jsx 语法支持就行了。</p><p>./tsconfig.json</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;compilerOptions&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;declaration&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 生成相关的 &#39;.d.ts&#39; 文件。 */</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;declarationDir&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./dist/types&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* &#39;.d.ts&#39; 文件输出目录 */</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;jsx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;preserve&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;include&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;./**/*.*&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;./shims-vue.d.ts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;exclude&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;node_modules&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;esModuleInterop&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;allowSyntheticDefaultImports&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;true&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/009059d346464d48b10344bbd678314f~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h3 id="库文件封装" tabindex="-1">库文件封装 <a class="header-anchor" href="#库文件封装" aria-label="Permalink to &quot;库文件封装&quot;">​</a></h3><p>为了搞清楚如何封装一个组件库，先带大家研究一下Element组件库是怎么做的。</p><p>参考一下 Element 的使用指南。可以看到组件库有两种引入形态：</p><ul><li>完整引入 ：一次性引入全部组件，使用 Vue.use 以 Vue 插件的形式引入；</li><li>按需引入 ：按需引入，导出单个组件，使用 Vue.component 注册。</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Vue </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vue&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Element </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;element-ui&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 完整引入</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Vue.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">use</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Element)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// or</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Select,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Button</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // ...</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;element-ui&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 按需引入</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Vue.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">component</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Select.name, Select)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Vue.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">component</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Button.name, Button)</span></span></code></pre></div><p>综上所述，组件库的形态应该是这样的结构：</p><p>可以满足以下的要求：</p><ul><li>默认导出为Vue插件；</li><li>每个组件可以单独导出。</li></ul><p>当然，利用 Vite 还有更复杂的自动按需加载方案，这个计划我们后续放在单独章节介绍。</p><p>首先设计一个入口，包含两个功能：</p><ul><li>导出全部组件；</li><li>实现一个 Vue 插件，插件中编写 install 方法，将所有组件安装到 vue 实例中。</li></ul><p>/src/entry.ts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { App } from &quot;vue&quot;;</span></span>
<span class="line"><span>import MyButton from &quot;./button&quot;;</span></span>
<span class="line"><span>import SFCButton from &quot;./SFCButton.vue&quot;;</span></span>
<span class="line"><span>import JSXButton from &quot;./JSXButton&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 导出单独组件</span></span>
<span class="line"><span>export { MyButton, SFCButton, JSXButton };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 编写一个插件，实现一个install方法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  install(app: App): void {</span></span>
<span class="line"><span>    app.component(MyButton.name, MyButton);</span></span>
<span class="line"><span>    app.component(SFCButton.name, SFCButton);</span></span>
<span class="line"><span>    app.component(JSXButton.name, JSXButton);</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>};</span></span></code></pre></div><p>默认 Vite 就是可以支持构建，使用 Vite 的 build 命令就可以打包输出。如果导出的是一个库文件的话，还需要配置【导出模块类型】并确定导出的文件名。配置如下:</p><p>vite.config.ts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const rollupOptions = {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  external: [&quot;vue&quot;, &quot;vue-router&quot;],</span></span>
<span class="line"><span>  output: {</span></span>
<span class="line"><span>    globals: {</span></span>
<span class="line"><span>      vue: &quot;Vue&quot;,</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default defineConfig({</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  .....  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 添加库模式配置</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  build: {</span></span>
<span class="line"><span>    rollupOptions,</span></span>
<span class="line"><span>    minify:false,</span></span>
<span class="line"><span>    lib: {</span></span>
<span class="line"><span>      entry: &quot;./src/entry.ts&quot;,</span></span>
<span class="line"><span>      name: &quot;SmartyUI&quot;,</span></span>
<span class="line"><span>      fileName: &quot;smarty-ui&quot;,</span></span>
<span class="line"><span>      // 导出模块格式</span></span>
<span class="line"><span>      formats: [&quot;esm&quot;, &quot;umd&quot;,&quot;iife&quot;],</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>});</span></span></code></pre></div><p>接着添加一个 npm 运行脚本，方便运行。</p><p>package.json</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;scripts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;build&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;vite build&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e950b72dcad545ef8474812d5b022178~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>看到提示说明正常导出了。最后编写一个验证页面，测试一下打包结果是否正确。</p><p>验证的过程还是基于Vite。首先测试加载全部组件，引用构建完的 smarty-ui.esm.js 文件。</p><p>demo/esm/index.html</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;h1&gt;Demo&lt;/h1&gt;</span></span>
<span class="line"><span>&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>&lt;script type=&quot;module&quot;&gt;</span></span>
<span class="line"><span>    import { createApp } from &quot;vue/dist/vue.esm-bundler.js&quot;;</span></span>
<span class="line"><span>    import SmartyUI, { SFCButton, JSXButton, MyButton } from &quot;../../dist/smarty-ui.esm.js&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    createApp({</span></span>
<span class="line"><span>        template: \`</span></span>
<span class="line"><span>      &lt;SButton/&gt;</span></span>
<span class="line"><span>      &lt;JSXButton/&gt;</span></span>
<span class="line"><span>      &lt;SFCButton/&gt;</span></span>
<span class="line"><span>    \`}).use(SmartyUI).mount(&#39;#app&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre></div><p>然后是加载单独组件。</p><p>demo/esm/button.html</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;h1&gt;Demo&lt;/h1&gt;</span></span>
<span class="line"><span>&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>&lt;script type=&quot;module&quot;&gt;</span></span>
<span class="line"><span>    import { createApp } from &quot;vue/dist/vue.esm-bundler.js&quot;;</span></span>
<span class="line"><span>    import SmartyUI, {</span></span>
<span class="line"><span>        SFCButton,</span></span>
<span class="line"><span>        JSXButton,</span></span>
<span class="line"><span>        MyButton,</span></span>
<span class="line"><span>    } from &quot;../../dist/smarty-ui.esm.js&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    createApp({</span></span>
<span class="line"><span>        template: \`</span></span>
<span class="line"><span>&lt;SButton/&gt;</span></span>
<span class="line"><span>&lt;JSXButton/&gt;</span></span>
<span class="line"><span>&lt;SFCButton/&gt;</span></span>
<span class="line"><span>\`,</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>        .component(SFCButton.name, SFCButton)</span></span>
<span class="line"><span>        .component(JSXButton.name, JSXButton)</span></span>
<span class="line"><span>        .component(MyButton.name, MyButton)</span></span>
<span class="line"><span>        .mount(&quot;#app&quot;);</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre></div><p>启动 vite</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev</span></span></code></pre></div><p>访问url： <a href="http://localhost:5173/demo/esm/index.html" target="_blank" rel="noreferrer">http://localhost:5173/demo/esm/index.html</a></p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c119f99ecca74214b394bf1cc06f6675~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>最后验证结果，证明 MVP 已经完成，虽然还很初级。</p><p>本章节参考代码： <a href="https://github.com/smarty-team/smarty-admin/tree/chapter02" target="_blank" rel="noreferrer">https://github.com/smarty-team/smarty-admin/tree/chapter02</a></p><h2 id="复盘" tabindex="-1">复盘 <a class="header-anchor" href="#复盘" aria-label="Permalink to &quot;复盘&quot;">​</a></h2><p>这节课是组件库开发的第一天，旨在搭建一个最小可用系统，了解如何使用 Vite 编写组件库。目前，这个工程可以实现组件库的【编写】、【调试】、【封装】的整个闭环。</p><p>最后留一些思考题帮助大家复习，也欢迎大家在评论区讨论。</p><ul><li>如何使用Vite 从零搭建 Vue 开发环境 ？</li><li>如何让 Vite 支持 SFC 与 JSX 语法 ？</li><li>组件库的封装形态是什么样子 ？</li><li>如何使用 Vite 完成库文件的构建 ？</li></ul><p>下节课，我们将给组件添加上五彩斑斓的颜色，下节课见。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e43fd1753cc4616a2b7d1a7045b7c32~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,132),e=[t];function l(h,o,c,k,d,u){return n(),a("div",null,e)}const E=s(p,[["render",l]]);export{g as __pageData,E as default};
