import{_ as s,c as n,o as a,a2 as p}from"./chunks/framework.D8Prfz4N.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"pamphlet/基于 Vite 的组件库工程化实战/3 CSS样式：用UnoCSS实现原子化CSS.md","filePath":"pamphlet/基于 Vite 的组件库工程化实战/3 CSS样式：用UnoCSS实现原子化CSS.md"}'),t={name:"pamphlet/基于 Vite 的组件库工程化实战/3 CSS样式：用UnoCSS实现原子化CSS.md"},e=p(`<p>相信大家在挑选组件库的时候，样式风格都是一个非常重要的考量目标。这节课的任务是给组件库添加样式系统，让组件库可以拥有一套统一风格的样式。</p><p>大家可以先看看成品的效果。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19471b0f0ca840c09cfcd6b4daf2f441~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>本章参考代码： <a href="https://github.com/smarty-team/smarty-admin/tree/chapter03/packages/smarty-ui-vite" target="_blank" rel="noreferrer">https://github.com/smarty-team/smarty-admin/tree/chapter03/packages/smarty-ui-vite</a></p><h2 id="用户故事-userstory" tabindex="-1">用户故事(UserStory)： <a class="header-anchor" href="#用户故事-userstory" aria-label="Permalink to &quot;用户故事(UserStory)：&quot;">​</a></h2><p>通过UnoCSS为组件库添加样式系统，可以通过属性定制组件样式。</p><h2 id="任务分解-task" tabindex="-1">任务分解(Task) <a class="header-anchor" href="#任务分解-task" aria-label="Permalink to &quot;任务分解(Task)&quot;">​</a></h2><ul><li>引入 UnoCSS 样式；</li><li>实现组件属性定制按钮样式；</li><li>实现【Icon图标按钮】。</li></ul><h2 id="「atomic-utility-first-css」与「semantic-css-」的选择" tabindex="-1">「Atomic/Utility-First CSS」与「Semantic CSS 」的选择 <a class="header-anchor" href="#「atomic-utility-first-css」与「semantic-css-」的选择" aria-label="Permalink to &quot;「Atomic/Utility-First CSS」与「Semantic CSS 」的选择&quot;">​</a></h2><p>每个组件库都有一套完备的样式系统，确保组件样式风格的统一。经典的组件库 (ElementUI) 的样式系统都是遵循「Semantic CSS 」(语义化 CSS )搭建的。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62c1c51020654c77a9faf94c6146f43f~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>组件库通常都需要搭建一个 CSS 子工程，用于实现自己的类型系统。比如 Element 就是基于 Sass + Gulp 搭建的。不过随着原子样式的出现，有了一些替代方案，无需搭建样式系统也可以完成类似效果。首先先简单介绍一个原子样式是什么。</p><p>2020年一种叫做AtomicCSS的组件风格横空出世，代表作就是 TailwindCSS。最近两年，TailwindCSS 一直保持高热度。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae8ccde88ae94e388216eb2c39c15d53~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>大家可以看一下 Vite 的社区模板库，tailwind 几乎就是标配。</p><p><a href="https://github.com/vitejs/awesome-vite#templates" target="_blank" rel="noreferrer">https://github.com/vitejs/awesome-vite#templates</a></p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/042bb600c2e44f33929d467fcc9b0da5~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>从组件库开发角度讲，使用 Tailwind 提供的样式系统，可以很好地降低 UI 库的开发难度。<strong>利用原子化风格</strong>* *，<strong><strong>完全就可以高效完成样式的定制</strong></strong>，**<strong>未必一定需要定制一套语义化样式系统。</strong></p><h2 id="为什么选-unocss-实现-atomiccss" tabindex="-1">为什么选 UnoCSS 实现 AtomicCSS？ <a class="header-anchor" href="#为什么选-unocss-实现-atomiccss" aria-label="Permalink to &quot;为什么选 UnoCSS 实现 AtomicCSS？&quot;">​</a></h2><p><a href="https://github.com/unocss/unocss" target="_blank" rel="noreferrer">UnoCSS的github地址</a></p><p>原子样式也有很多选择，最著名的就是 Tailwind。 Tailwind 虽然好，但是性能上有一些不足。由于Tailwind 会生成大量样式定义。全量的 CSS 文件往往体积会多至数 MB。这个对于页面性能是完全不可接受的。如果在开发时进行动态的按需剪裁，又会影响编译性能，降低开发体验。为了解决性能问题，开源界一个叫做 Antfu 的大神设计了 UnoCSS。UnoCSS 是一个拥有高性能且具灵活性的即时原子化 CSS 引擎，可以兼顾产物体积和开发性能。</p><p>除此以外UnoCSS还可以有更强的可定制性和易用性。</p><ul><li><a href="https://github.com/antfu/unocss#configurations" target="_blank" rel="noreferrer">完全可定制</a> - 没有核心实用程序，所有功能都通过预设提供。</li><li>无需解析、无需 AST、无需扫描，它是<strong>即时的</strong>（比 Windi CSS 或 Tailwind JIT 快 200 倍）</li><li>~3.5kb min+gzip - 零依赖和浏览器友好。</li><li><a href="https://github.com/antfu/unocss#shortcuts" target="_blank" rel="noreferrer">快捷方式</a> - 动态别名实用程序。</li><li><a href="https://github.com/antfu/unocss/tree/main/packages/preset-attributify/" target="_blank" rel="noreferrer">属性模式</a> - 在属性中分组实用程序</li><li><a href="https://github.com/antfu/unocss/tree/main/packages/preset-icons/" target="_blank" rel="noreferrer">纯 CSS 图标</a> - 使用任何图标作为单个类。</li><li><a href="https://github.com/antfu/unocss#inspector" target="_blank" rel="noreferrer">检查器</a> - 以交互方式检查和调试。</li><li><a href="https://github.com/antfu/unocss/tree/main/packages/runtime" target="_blank" rel="noreferrer">CSS-in-JS 运行时版本</a>。</li><li><a href="https://github.com/antfu/unocss#css-scoping" target="_blank" rel="noreferrer">CSS Scoping</a>。</li><li>CSS 代码拆分 - 为 MPA 提供最小的 CSS。</li><li>库友好 - 随你的组件库提供原子样式并安全地限定范围。</li></ul><p>另外基于 Vite 良好的支持，也是选择UnoCSS的一个重要原因。我认为 UnoCSS 也可以算是 Vite 社区的一个重要的产品。</p><h2 id="功能实现" tabindex="-1">功能实现 <a class="header-anchor" href="#功能实现" aria-label="Permalink to &quot;功能实现&quot;">​</a></h2><p><a href="https://github.com/unocss/unocss" target="_blank" rel="noreferrer">https://github.com/unocss/unocss</a></p><p>首先通过 Vite 插件的形式引入 UnoCSS。</p><h3 id="引入unocss" tabindex="-1">引入UnoCSS <a class="header-anchor" href="#引入unocss" aria-label="Permalink to &quot;引入UnoCSS&quot;">​</a></h3><p>安装 UnoCSS 库。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm i -D unocss@&quot;0.45.6&quot;</span></span>
<span class="line"><span>pnpm i -D @iconify-json/ic@&quot;1.1.4&quot;</span></span></code></pre></div><p>在 Vite 中添加 UnoCSS 插件。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { presetUno, presetAttributify, presetIcons } from &quot;unocss&quot;;</span></span>
<span class="line"><span>import Unocss from &quot;unocss/vite&quot;;</span></span>
<span class="line"><span>export default defineConfig({</span></span>
<span class="line"><span>  plugins: [</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>    // 添加UnoCSS插件</span></span>
<span class="line"><span>    Unocss({</span></span>
<span class="line"><span>        presets: [presetUno(), presetAttributify(), presetIcons()],</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>});</span></span></code></pre></div><p>下面就可以在插件中引入 UnoCSS 了。加载 Unocss 插件后，Vite 会通过分析 class 的使用状况提供相应的样式定义。</p><p>在 Button 组件中引入 UnoCSS。</p><p>/src/button/index.tsx</p><blockquote><p>注意: 这个地方文件名已经从 index.ts变为 index.tsx</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { defineComponent,PropType,toRefs} from &quot;vue&quot;;</span></span>
<span class="line"><span>import &quot;uno.css&quot;;</span></span>
<span class="line"><span>export default defineComponent({</span></span>
<span class="line"><span>  name: &quot;SButton&quot;,</span></span>
<span class="line"><span>  setup(props, {slots}) {</span></span>
<span class="line"><span>    return () =&gt; &lt;button </span></span>
<span class="line"><span>      class={\`</span></span>
<span class="line"><span>      py-2 </span></span>
<span class="line"><span>      px-4 </span></span>
<span class="line"><span>      font-semibold </span></span>
<span class="line"><span>      rounded-lg </span></span>
<span class="line"><span>      shadow-md </span></span>
<span class="line"><span>      text-white </span></span>
<span class="line"><span>      bg-green-500 </span></span>
<span class="line"><span>      hover:bg-green-700 </span></span>
<span class="line"><span>      border-none </span></span>
<span class="line"><span>      cursor-pointer </span></span>
<span class="line"><span>      \`}</span></span>
<span class="line"><span>        &gt; </span></span>
<span class="line"><span>        {slots.default ? slots.default() : &#39;&#39;}</span></span>
<span class="line"><span>     &lt;/button&gt;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>});</span></span></code></pre></div><p>在 index.ts 中添加一个测试代码。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>createApp({</span></span>
<span class="line"><span>        template:\`</span></span>
<span class="line"><span>            &lt;div&gt;</span></span>
<span class="line"><span>                &lt;SButton&gt;普通按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;/div&gt;</span></span>
<span class="line"><span>        \`</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>.use(SmartyUI)</span></span>
<span class="line"><span>.mount(&quot;#app&quot;);</span></span></code></pre></div><p>最终呈现的效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0011645188d3478b9d96d2f5156078ca~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>到此为止，说明 UnoCSS 已经正常引入了。</p><h3 id="实现组件属性定制按钮样式" tabindex="-1">实现组件属性定制按钮样式 <a class="header-anchor" href="#实现组件属性定制按钮样式" aria-label="Permalink to &quot;实现组件属性定制按钮样式&quot;">​</a></h3><p>下面要实现根据属性定制按钮样式功能。比如，通过color属性定制颜色。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> &lt;div&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;blue&quot;&gt;蓝色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;green&quot;&gt;绿色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;gray&quot;&gt;灰色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;yellow&quot;&gt;黄色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>  &lt;SButton color=&quot;red&quot;&gt;红色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span> &lt;/div&gt;</span></span></code></pre></div><p>首先需要定义组件的属性类型。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { defineComponent,PropType,toRefs} from &quot;vue&quot;;</span></span>
<span class="line"><span>import &quot;uno.css&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export type IColor = &#39;black&#39; | &#39;gray&#39; | &#39;red&#39; | &#39;yellow&#39; | &#39;green&#39;|&#39;blue&#39;|&#39;indigo&#39;|&#39;purple&#39;|&#39;pink&#39;</span></span>
<span class="line"><span>export const props = {</span></span>
<span class="line"><span>  color: {</span></span>
<span class="line"><span>    type: String as PropType&lt;IColor&gt;,</span></span>
<span class="line"><span>    default: &#39;blue&#39;  // 设定默认颜色</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>export default defineComponent({</span></span>
<span class="line"><span>  name: &quot;SButton&quot;,</span></span>
<span class="line"><span>  props,  // 注册属性</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>});</span></span></code></pre></div><p>下面就可以用属性变量拼装 UnoCSS。看到这里大家就可以感受到原子 CSS 的好处。基本常用的属性定义都可以通过简单的字符串拼装完成。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default defineComponent({</span></span>
<span class="line"><span>  name: &quot;SButton&quot;,</span></span>
<span class="line"><span>  props,</span></span>
<span class="line"><span>  setup(props, {slots}) {</span></span>
<span class="line"><span>    return () =&gt; &lt;button </span></span>
<span class="line"><span>        class={\`</span></span>
<span class="line"><span>          py-2 </span></span>
<span class="line"><span>          px-4 </span></span>
<span class="line"><span>          font-semibold </span></span>
<span class="line"><span>          rounded-lg </span></span>
<span class="line"><span>          shadow-md </span></span>
<span class="line"><span>          text-white </span></span>
<span class="line"><span>          bg-\${props.color}-500 </span></span>
<span class="line"><span>          hover:bg-\${props.color}-700 </span></span>
<span class="line"><span>          border-none </span></span>
<span class="line"><span>          cursor-pointer </span></span>
<span class="line"><span>          m-1</span></span>
<span class="line"><span>          \`}</span></span>
<span class="line"><span>        &gt; </span></span>
<span class="line"><span>        {slots.default ? slots.default() : &#39;&#39;}</span></span>
<span class="line"><span>     &lt;/button&gt;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>});</span></span></code></pre></div><p>下面看一下效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7820a51c7e2a4b169d0804b0b3e7f927~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>嗯，怎么没看见颜色呢？？出了什么事情。</p><p>仔细研究 UnoCSS 的文档才发现问题。主要原因是 UnoCSS 默认是按需生成方式。也就是说只生成代码中使用过的样式。那如果在 class 属性中使用变量，是无法分析变量的取值的。这样也就无法动态生成样式了。</p><p>为了解决这个问题，UnoCSS 提供了安全列表选项。也就是说，把样式定义中变量的取值添加到 Safelist 中去。这样 UnoCSS 就会根据 Safelist 生成样式了。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de83381a618c4a39a7b8aef063e3f924~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>下面开始定制安全列表。安全列表属性应该定义在 UnoCSS 插件的配置中。</p><p>这里面要做一个配置上的重构。考虑到后续会在 Safelist 中添加大量配置，所以我们将 UnoCSS 配置拆成一个新的 ts 模块，然后引用到 vite.config.ts 中。</p><p>项目在搭建的过程中会不断地进行重构。希望大家在开发的过程中，一定要积极思考如何编写更加合理易于维护的代码。</p><p>config/unocss.ts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { presetUno, presetAttributify, presetIcons } from &quot;unocss&quot;;</span></span>
<span class="line"><span>import Unocss from &quot;unocss/vite&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const colors = [</span></span>
<span class="line"><span>  &quot;white&quot;,</span></span>
<span class="line"><span>  &quot;black&quot;,</span></span>
<span class="line"><span>  &quot;gray&quot;,</span></span>
<span class="line"><span>  &quot;red&quot;,</span></span>
<span class="line"><span>  &quot;yellow&quot;,</span></span>
<span class="line"><span>  &quot;green&quot;,</span></span>
<span class="line"><span>  &quot;blue&quot;,</span></span>
<span class="line"><span>  &quot;indigo&quot;,</span></span>
<span class="line"><span>  &quot;purple&quot;,</span></span>
<span class="line"><span>  &quot;pink&quot;,</span></span>
<span class="line"><span>];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const safelist = [</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ...colors.map((v) =&gt; \`bg-\${v}-500\`),</span></span>
<span class="line"><span>  ...colors.map((v) =&gt; \`hover:bg-\${v}-700\`),</span></span>
<span class="line"><span>];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default () =&gt;</span></span>
<span class="line"><span>  Unocss({</span></span>
<span class="line"><span>    safelist,</span></span>
<span class="line"><span>    presets: [presetUno(), presetAttributify(), presetIcons()],</span></span>
<span class="line"><span>  });</span></span></code></pre></div><p>vite.config.ts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import Unocss from &quot;./config/unocss&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default defineConfig({</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  plugins: [</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Unocss(),</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span></span></span>
<span class="line"><span>})</span></span></code></pre></div><p>最后看看是不是缤纷的颜色已经出现了。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8613673a6dc4c34b7b73547bbce8505~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>参考代码放在这 ：<a href="https://github.com/smarty-team/smarty-admin/" target="_blank" rel="noreferrer">https://github.com/smarty-team/smarty-admin/</a></p><p>使用同样的方式，给按钮定制各种样式。这里面就不赘述。最后看一下效果。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48a319814f1e4f0598e37e0220970638~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h3 id="【-icon-图标按钮】实现" tabindex="-1">【 Icon 图标按钮】实现 <a class="header-anchor" href="#【-icon-图标按钮】实现" aria-label="Permalink to &quot;【 Icon 图标按钮】实现&quot;">​</a></h3><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/16b0e63fbfaf469a8ea5e642a6735ea0~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>接下来要给按钮增加图标定制功能。实现图标按钮，首先需要引入字体图标库。</p><p>在 UnoCSS 中引入图标，只需要加载 @unocss/preset-icons 预设就可以了。它提供了 iconify 图标框架中大量的图表集。</p><p>引入的过程是以下这样的。</p><p>在 <a href="https://icones.js.org/" target="_blank" rel="noreferrer">iconfy</a> 网站中有上万个字体图标可以选择。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b3c1022116a48a78ca902a78cf3b774~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>如果你想使用一个 【 🔍 】 搜索，首先可以在 <a href="https://icones.js.org/" target="_blank" rel="noreferrer">iconfy</a> 使用【search】搜索，然后选择一个心仪的图标。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bda5a16eb8264a479095c11fa563857d~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>然后根据页面信息，Uno中使用 class=&quot;i-ic-baseline-search&quot;，系统就会自动引用这个图标，非常的方便。</p><p>下面开始引入这个功能，首先在 Unocss 插件中添加 presetIcons 预设。</p><p>/config/unocss.ts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default () =&gt;</span></span>
<span class="line"><span>  Unocss({</span></span>
<span class="line"><span>    safelist,</span></span>
<span class="line"><span>    presets: [</span></span>
<span class="line"><span>        presetUno(),   </span></span>
<span class="line"><span>        presetAttributify(), </span></span>
<span class="line"><span>        presetIcons(),  // 添加图标预设</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  });</span></span></code></pre></div><p>为了能够在 UnoCSS 中使用变量定义字体图标，需要将使用的图标名加入到 safelist 中。</p><p>/config/unocss.ts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const safelist = [</span></span>
<span class="line"><span>  ...[</span></span>
<span class="line"><span>    &quot;search&quot;,</span></span>
<span class="line"><span>    &quot;edit&quot;,</span></span>
<span class="line"><span>    &quot;check&quot;,</span></span>
<span class="line"><span>    &quot;message&quot;,</span></span>
<span class="line"><span>    &quot;star-off&quot;,</span></span>
<span class="line"><span>    &quot;delete&quot;,</span></span>
<span class="line"><span>    &quot;add&quot;,</span></span>
<span class="line"><span>    &quot;share&quot;,</span></span>
<span class="line"><span>  ].map((v) =&gt; \`i-ic-baseline-\${v}\`),</span></span>
<span class="line"><span>];</span></span></code></pre></div><p>最后在 Button 中添加字体图标。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>return () =&gt; &lt;button </span></span>
<span class="line"><span>        class={\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          py-\${size[props.size].y}</span></span>
<span class="line"><span>            ...</span></span>
<span class="line"><span>          mx-1</span></span>
<span class="line"><span>          \`}</span></span>
<span class="line"><span>        &gt; </span></span>
<span class="line"><span>        { props.icon !== &quot;&quot; ? &lt;i class={\`i-ic-baseline-\${props.icon} p-3\`}&gt;&lt;/i&gt; : &quot;&quot;}</span></span>
<span class="line"><span>        {slots.default ? slots.default() : &#39;&#39;}</span></span>
<span class="line"><span> &lt;/button&gt;</span></span></code></pre></div><p>最后编写一行测试代码实验一下效果。</p><p>index.ts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>     &lt;div&gt;</span></span>
<span class="line"><span>         &lt;SButton color=&quot;blue&quot; round plain icon=&quot;search&quot; &gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>         &lt;SButton color=&quot;green&quot; round plain icon=&quot;edit&quot; &gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>         &lt;SButton color=&quot;gray&quot; round plain icon=&quot;check&quot; &gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>         &lt;SButton color=&quot;yellow&quot; round plain icon=&quot;message&quot; &gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>         &lt;SButton color=&quot;red&quot; round plain icon=&quot;delete&quot; &gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>     &lt;/div&gt;</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ab75c05a672404a9942383016a0d3cb~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h3 id="build-时单独导出-css" tabindex="-1">Build 时单独导出 CSS <a class="header-anchor" href="#build-时单独导出-css" aria-label="Permalink to &quot;Build 时单独导出 CSS&quot;">​</a></h3><p>使用 unocss 后，如果运行 pnpm build 的时候会报错。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e024e824201e410ca3fb85937c670d05~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>解决办法是根据提示增加编译选项 cssCodeSplit vite.config.ts</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  build</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ...</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    cssCodeSplit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,   </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 追加</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span></code></pre></div><p>简单解释一下原因： cssCodeSplit 这个选项是为了决定在编译的时候是否要独立输出 css。显然这里面应该选择为 true。</p><p>同样在调用组件库的时候需要引入 style.css 才可以让样式生效。</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5122a914a764fbd87940c24aa77374f~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ef0a151099545f897f47e005a507d62~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>本章参考代码： <a href="https://github.com/smarty-team/smarty-admin/tree/chapter03/packages/smarty-ui-vite" target="_blank" rel="noreferrer">https://github.com/smarty-team/smarty-admin/tree/chapter03/packages/smarty-ui-vite</a></p><h2 id="复盘" tabindex="-1">复盘 <a class="header-anchor" href="#复盘" aria-label="Permalink to &quot;复盘&quot;">​</a></h2><p>这节课主要的内容是为组件库添加样式系统。我们是通过引入 UnoCSS 来实现的。</p><p>总结如下：</p><ol><li>引入UnoCSS实现原子化CSS样式；</li><li>使用安全列表实现在UnoCSS中使用变量定制样式；</li><li>引入 @unocss/preset-icons预设实现字体图标按钮</li></ol><p>随着技术的进步，出现了 UnoCSS 这样的原子化 CSS 引擎，可以让我们类型系统构建变得更加轻松。UnoCSS 配合 JSX 语法也非常具有可读性。</p><p>最后留一些思考题帮助大家复习，也欢迎在留言区讨论。</p><ul><li>Tailwind 与 UnoCSS 的关系 ？</li><li>怎样在 UnoCSS 中使用变量定制样式 ？</li><li>怎样在 UnoCSS 中引入字体图标 ？</li></ul><p>下节课，我们将给组件库添加文档系统，下节课见。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8a3ece64eb54824b3b464809505f42f~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p>`,108),i=[e];function l(o,c,r,u,g,d){return a(),n("div",null,i)}const b=s(t,[["render",l]]);export{m as __pageData,b as default};
