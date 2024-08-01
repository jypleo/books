import{_ as s,c as n,o as a,a2 as p}from"./chunks/framework.D8Prfz4N.js";const h=JSON.parse('{"title":"软件包封装： 如何发布兼容多种 JS 模块标准的软件包？","description":"","frontmatter":{},"headers":[],"relativePath":"pamphlet/基于 Vite 的组件库工程化实战/8 软件包封装： 如何发布兼容多种 JS 模块标准的软件包？.md","filePath":"pamphlet/基于 Vite 的组件库工程化实战/8 软件包封装： 如何发布兼容多种 JS 模块标准的软件包？.md"}'),t={name:"pamphlet/基于 Vite 的组件库工程化实战/8 软件包封装： 如何发布兼容多种 JS 模块标准的软件包？.md"},l=p(`<h1 id="软件包封装-如何发布兼容多种-js-模块标准的软件包" tabindex="-1">软件包封装： 如何发布兼容多种 JS 模块标准的软件包？ <a class="header-anchor" href="#软件包封装-如何发布兼容多种-js-模块标准的软件包" aria-label="Permalink to &quot;软件包封装： 如何发布兼容多种 JS 模块标准的软件包？&quot;">​</a></h1><p>为了方便用户使用，一款成熟的类库都会提供多种模块封装形式，比如大家最常用到的 Vue，就提供了cjs、esm、umd 等多种封装模式，并且还会提供对应的压缩版本，方便在生产环境下使用。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4cf98deb6412405d9bff0d587a9706da~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p><strong>第一，需要考虑的是需要支持哪些模块规范。</strong></p><p>目前常见的模块规范有： - IFFE：使用立即执行函数实现模块化 例：(function()) {}； - CJS：基于 CommonJS 标准的模块化； - AMD：使用 Require 编写； - CMD：使用 SeaJS 编写； - ESM：ES 标准的模块化方案 ( ES6 标准提出 )； - UMD：兼容 CJS 与 AMD、IFFE 规范。</p><p>其中最常用的有三类：ESM、CJS 和 IFFE。 ESM 标准目前已经是前端开发的标配，无论是选用 Webpack 还是 Vite ，都会采用这种模块规范。其次是 CJS，不可否认，有大量的存量代码还使用 CJS 规范，完全没有必要因为引入一个库去更改编译规则。最后是 IFFE 这种类型，非常适用于逻辑简单，无需搭建工程化环境的前端应用。</p><p><strong>第二，需要考虑的是代码的压缩和混淆问题。</strong></p><p>代码压缩是指去除代码中的空格、制表符、换行符等内容，将代码压缩至几行内容甚至一行，这样可以提高网站的加载速度。混淆是将代码转换成一种功能上等价，但是难以阅读和理解的形式。混淆的主要目的是增加反向工程的难度，同时也可以相对减少代码的体积，比如将变量名缩短就会减少代码的体积。</p><p><strong>第三，还需要考虑 SourceMap 配置。</strong></p><p>SourceMap 就是一个信息文件，里面存储了代码打包转换后的位置信息，实质是一个 json 描述文件，维护了打包前后的代码映射关系。通</p><p>常输出的模块不会提供 SourceMap，因为通过 sourcemap 就很容易还原原始代码。但是如果你想在浏览器中断点调试你的代码，或者希望在异常监控工具中定位出错位置，SourceMap 就非常有必要。所以还是要正确掌握 SourceMap 的生成方法。</p><h2 id="用户故事-userstory" tabindex="-1">用户故事(UserStory) <a class="header-anchor" href="#用户故事-userstory" aria-label="Permalink to &quot;用户故事(UserStory)&quot;">​</a></h2><p>让组件库能够兼容多种组件库打包格式，并可以输出压缩版本。</p><h2 id="任务分解-task" tabindex="-1">任务分解(Task) <a class="header-anchor" href="#任务分解-task" aria-label="Permalink to &quot;任务分解(Task)&quot;">​</a></h2><ul><li><p>配置Vite 输出多种格式模块；</p></li><li><p>配置SourceMap映射；</p></li><li><p>测试打包结果。</p></li></ul><h2 id="任务实现" tabindex="-1">任务实现 <a class="header-anchor" href="#任务实现" aria-label="Permalink to &quot;任务实现&quot;">​</a></h2><h3 id="配置-vite-的打包方案" tabindex="-1">配置 Vite 的打包方案 <a class="header-anchor" href="#配置-vite-的打包方案" aria-label="Permalink to &quot;配置 Vite 的打包方案&quot;">​</a></h3><p>如果你使用过 Rollup 实现过多模块方案输出，你就会对 Vite 超级简单的配置所折服。在 Rollup 时代，通常这一步都需要自己编写复杂的 JS 脚本实现。比如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const outputs = [&quot;esm&quot;, &quot;cjs&quot;, &quot;iife&quot;, &quot;umd&quot;].map((format) =&gt; ({</span></span>
<span class="line"><span>  file: \`dist/smartyui.\${format}.js\`,</span></span>
<span class="line"><span>  name: &quot;SmartyUI&quot;,</span></span>
<span class="line"><span>  format,</span></span>
<span class="line"><span>  exports: &quot;named&quot;,</span></span>
<span class="line"><span>  globals: {</span></span>
<span class="line"><span>    vue: &quot;Vue&quot;,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>}));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const packageConfigs = outputs</span></span>
<span class="line"><span>  .map((output) =&gt; createConfig(output))</span></span>
<span class="line"><span>  .concat(outputs.map((output) =&gt; createMinifiedConfig(output)));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function createPackageJSON() {</span></span>
<span class="line"><span>  const data = require(&quot;./package.json&quot;);</span></span>
<span class="line"><span>  (data.main = &quot;dist/smartyui.cjs.js&quot;), (data.module = &quot;dist/smartui.esm.js&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  fs.outputFileSync(</span></span>
<span class="line"><span>    resolve(&quot;./dist&quot;, &quot;package.json&quot;),</span></span>
<span class="line"><span>    JSON.stringify(data, &quot;\\t&quot;, &quot;\\t&quot;),</span></span>
<span class="line"><span>    &quot;utf-8&quot;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>作为对比，看一下 Vite 的配置，就显得非常的简洁。</p><p>vite.config.ts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> const rollupOptions = {</span></span>
<span class="line"><span>  external: [&quot;vue&quot;],</span></span>
<span class="line"><span>  output: {</span></span>
<span class="line"><span>    globals: {</span></span>
<span class="line"><span>      vue: &quot;Vue&quot;,</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>这里面有几个配置需要说明一下。</p><p>首先是 rollupOptions 配置。由于 Vite 的构建是通过 rollup 完成的，所以 rollup 中的一些配置通过这个属性传递给 rollup。其中需要配置的两个属性如下：</p><ul><li><p>external： 作用是将该模块保留在 bundle 之外，比如在数组中添加了 vue ，就是为了不让 vue 打包到组件库中；</p></li><li><p>output： 这个配置用于 umd/iffe 包中，意思是全局中的某个模块在组件库中叫什么名字。比如：</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import $ from &#39;jquery&#39;;</span></span></code></pre></div><p>意味着<code>jquery</code> 模块的 id 等同于 <code>$</code> 变量:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var MyBundle = (function ($) {</span></span>
<span class="line"><span>  // 代码到这里</span></span>
<span class="line"><span>}(window.jQuery));</span></span></code></pre></div><p>接着：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default defineConfig({</span></span>
<span class="line"><span> build: {</span></span>
<span class="line"><span>    rollupOptions,</span></span>
<span class="line"><span>    minify: &#39;terser&#39;, // boolean | &#39;terser&#39; | &#39;esbuild&#39;</span></span>
<span class="line"><span>    sourcemap: true, // 输出单独 source文件</span></span>
<span class="line"><span>    brotliSize: true,  // 生成压缩大小报告</span></span>
<span class="line"><span>    cssCodeSplit: true,</span></span>
<span class="line"><span>    lib: {</span></span>
<span class="line"><span>      entry: &quot;./src/entry.ts&quot;,</span></span>
<span class="line"><span>      name: &quot;SmartyUI&quot;,</span></span>
<span class="line"><span>      fileName: &quot;smarty-ui&quot;,</span></span>
<span class="line"><span>      formats: [&quot;esm&quot;, &quot;umd&quot;, &quot;iife&quot;], // 导出模块类型</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>});</span></span></code></pre></div><p>由于使用了 terser 用于代码压缩需要单独安装一下</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> terser@&quot;5.4.0&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -D</span></span></code></pre></div><p>其他属性：</p><ul><li><p>formats： [&quot;esm&quot;, &quot;umd&quot;, &quot;iife&quot;] 是输出模块类型；</p></li><li><p>fileName：是文件名，其实只是一个输出文件名的前缀，默认情况下会和模块类型配合组成最终的文件名。</p></li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e915b72fdaac45669b1789e0b060ac61~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><ul><li><p>name 属性 : 生成包的名字，在 <code>iife</code>/<code>umd</code> 包，同一页上的其他脚本可以访问它。</p></li><li><p>minify 属性： 是混淆的意思，这里面有两个混淆工具可以选择，即 terser 和 esbuild。我目前选择了比较老牌的压缩工具 terser，毕竟从 Rollup 时代开始就一直在用。</p></li></ul><p>这时候运行 pnpm build 就可以输出模块了。</p><h3 id="配置-sourcemap-映射" tabindex="-1">配置 SourceMap 映射 <a class="header-anchor" href="#配置-sourcemap-映射" aria-label="Permalink to &quot;配置 SourceMap 映射&quot;">​</a></h3><p>下面说一下 SourceMap 配置。</p><p>如果希望导出 SourceMap， 只需要添加 SourceMap 属性就好了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default defineConfig({</span></span>
<span class="line"><span> build: {</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>    sourcemap: true, // 输出单独 source文件</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>});</span></span></code></pre></div><p>此时，构建的时候会生成 SourceMap。</p><p>有了 SourceMap ，就可以在 Chrome 调试工具中进行断点调试了。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80272273623147148284beefc188bf3b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h3 id="测试打包结果" tabindex="-1">测试打包结果 <a class="header-anchor" href="#测试打包结果" aria-label="Permalink to &quot;测试打包结果&quot;">​</a></h3><p>最后编写一个测试页来确定输出模块效果OK。</p><p>先测试是 IFFE 模块。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;h1&gt;Demo IFFE&lt;/h1&gt;</span></span>
<span class="line"><span>&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>&lt;link rel=&quot;stylesheet&quot; href=&quot;../dist/style.css&quot;&gt;</span></span>
<span class="line"><span>&lt;script src=&quot;../node_modules/vue/dist/vue.global.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>&lt;script src=&quot;../dist/smarty-ui.iife.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>    console.log(&#39;111&#39;)</span></span>
<span class="line"><span>    const { createApp } = Vue</span></span>
<span class="line"><span>    console.log(&#39;vue&#39;, Vue)</span></span>
<span class="line"><span>    console.log(&#39;SmartyUI&#39;, SmartyUI)</span></span>
<span class="line"><span>    createApp({</span></span>
<span class="line"><span>        template: \`</span></span>
<span class="line"><span>        &lt;div style=&quot;margin-bottom:20px;&quot;&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;blue&quot;&gt;主要按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;green&quot;&gt;绿色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;gray&quot;&gt;灰色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;yellow&quot;&gt;黄色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;red&quot;&gt;红色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div style=&quot;margin-bottom:20px;&quot;</span></span>
<span class="line"><span>        &gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;blue&quot; plain&gt;朴素按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;green&quot; plain&gt;绿色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;gray&quot; plain&gt;灰色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;yellow&quot; plain&gt;黄色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;red&quot; plain&gt;红色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div style=&quot;margin-bottom:20px;&quot;&gt;</span></span>
<span class="line"><span>            &lt;SButton size=&quot;small&quot; plain&gt;小按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton size=&quot;medium&quot; plain&gt;中按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton size=&quot;large&quot; plain&gt;大按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div style=&quot;margin-bottom:20px;&quot;&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;blue&quot; round plain icon=&quot;search&quot;&gt;搜索按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;green&quot; round plain icon=&quot;edit&quot;&gt;编辑按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;gray&quot; round plain icon=&quot;check&quot;&gt;成功按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;yellow&quot; round plain icon=&quot;message&quot;&gt;提示按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;red&quot; round plain icon=&quot;delete&quot;&gt;删除按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div style=&quot;margin-bottom:20px;&quot;&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;blue&quot; round plain icon=&quot;search&quot;&gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;green&quot; round plain icon=&quot;edit&quot;&gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;gray&quot; round plain icon=&quot;check&quot;&gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;yellow&quot; round plain icon=&quot;message&quot;&gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;red&quot; round plain icon=&quot;delete&quot;&gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>    \`}).use(SmartyUI.default).mount(&#39;#app&#39;)</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/279b17ea110a47518cee9a6f6421ad4c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h2 id="复盘" tabindex="-1">复盘 <a class="header-anchor" href="#复盘" aria-label="Permalink to &quot;复盘&quot;">​</a></h2><p>这节课我们讲了如何让组件库兼容多种模块化标准。</p><p>我们希望组件一次编写处处执行，希望组件库可以有更广阔的应用场景。无论是在 Webpack 或者 Vite 甚至直接在简单网页中都可以使用。还需要同时兼顾运行性能和调试的便利性。每种应用场景都需要不同的模块配置配合，输出模块需要考虑：支持模块风格、混淆压缩策略、Sourcemap三方面内容。这样才能够成为一个合格的组件库。</p><p>最后留一些思考题帮助大家复习，也欢迎大家在评论区讨论。</p><ul><li>常用的 JS 模块化标准都有哪些 ？</li><li>UMD 都兼容哪些模块标准 ？</li><li>sourcemap 的作用是什么 ？</li></ul><p>下节课，我们将完成软件包的封装，下节课见。</p>`,55),e=[l];function o(i,u,c,r,d,g){return a(),n("div",null,e)}const m=s(t,[["render",o]]);export{h as __pageData,m as default};
