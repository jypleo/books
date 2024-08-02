import{_ as s,c as n,o as a,a2 as p}from"./chunks/framework.D8Prfz4N.js";const q=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"pamphlet/基于 Vite 的组件库工程化实战/13 按需引入实现组件库的按需引入功能.md","filePath":"pamphlet/基于 Vite 的组件库工程化实战/13 按需引入实现组件库的按需引入功能.md"}'),t={name:"pamphlet/基于 Vite 的组件库工程化实战/13 按需引入实现组件库的按需引入功能.md"},i=p(`<p>组件库会包含几十甚至上百个组件，但是应用的时候往往只使用其中的一部分。这个时候如果全部引入到项目中，就会使输出产物体积变大。按需加载的支持是组件库中必须考虑的问题。</p><p>目前组件的按需引入会分成两个方法：</p><ul><li>经典方法：组件单独分包 + 按需导入 + babel-plugin-component ( 自动化按需引入)；</li><li>次时代方法：ESModule + Treeshaking + 自动按需 import（unplugin-vue-components 自动化配置）。</li></ul><h3 id="分包与树摇-treeshaking" tabindex="-1">分包与树摇（Treeshaking） <a class="header-anchor" href="#分包与树摇-treeshaking" aria-label="Permalink to &quot;分包与树摇（Treeshaking）&quot;">​</a></h3><p>传统的解决方案就是将组件库分包导出，比如将组件库分为 List、Button、Card，用到哪个加载哪个，简单粗暴。这样写有两个弊端：</p><ul><li>需要了解软件包内部构造 例： import &quot;ui/xxx&quot; or import &quot;ui/package/xxx&quot;；</li><li>需要不断手工调整组件加载预注册。</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 全部导入</span></span>
<span class="line"><span>const SmartyUI = require(&quot;smarty-ui-vite&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 单独导入</span></span>
<span class="line"><span>const Button = require(&quot;smarty-ui-vite/button&quot;)</span></span></code></pre></div><p>好在后面有 babel-plugin-component，解决了需要了解软件包构造的问题。当然你需要按照约定规则导出软件包。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 转换前</span></span>
<span class="line"><span>const { Button } = require(&quot;smarty-ui-vite&quot;)</span></span>
<span class="line"><span>// 转换后</span></span>
<span class="line"><span>const Button = require(&quot;smarty-ui-vite/button&quot;)</span></span></code></pre></div><p>随着时代的发展，esmodule 已经成为了前端开发的主流。esmodule 带来好处是静态编译，也就是说，在编译阶段就可以判断需要导入哪些包。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 动态引入的不可确定性</span></span>
<span class="line"><span>const m = (Math.random() &gt; 0.5) ? require(&quot;a&quot;) : require(&quot;b&quot;)</span></span></code></pre></div><p>这样就给 Treeshaking 提供了可能。Treeshaking 是一种通过语法分析去除无用代码的方法。目前，Treeshaking 逐渐成为了构建工具的标配，Rollup、Vite、新版本的 Webpack 都支持了这个功能。</p><p>比如：组件库只使用了 Button。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { Button } from &#39;smarty-ui-vite&#39;</span></span></code></pre></div><p>使用 ES 模块并且只引用了 Button，编译器会自动将其他组件的代码去掉。</p><h3 id="自动导入黑科技" tabindex="-1">自动导入黑科技 <a class="header-anchor" href="#自动导入黑科技" aria-label="Permalink to &quot;自动导入黑科技&quot;">​</a></h3><p>unplugin-vue-components 的 auto importing 支持。</p><h2 id="用户故事-userstory" tabindex="-1">用户故事(UserStory) <a class="header-anchor" href="#用户故事-userstory" aria-label="Permalink to &quot;用户故事(UserStory)&quot;">​</a></h2><p>为组件库添加按组件分包导出功能，适配按需加载需要。</p><h2 id="任务分解-task" tabindex="-1">任务分解(Task) <a class="header-anchor" href="#任务分解-task" aria-label="Permalink to &quot;任务分解(Task)&quot;">​</a></h2><ul><li>实现分包导出脚本；</li><li>测试按需加载。</li></ul><h3 id="实现分包导出" tabindex="-1">实现分包导出 <a class="header-anchor" href="#实现分包导出" aria-label="Permalink to &quot;实现分包导出&quot;">​</a></h3><p>分包导出相当于将组件库形成无数各子软件包，软件包必须满足一下要求：</p><ul><li>文件名即组件名；</li><li>独立的 package.json 定义，包含 esm 和 umd 的入口定义；</li><li>每个组件必须以 Vue 插件形式进行加载；</li><li>每个软件包还需要有单独的 css 导出。</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0e75d7befd44a4195cf771fe7682a93~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><ol><li><strong>重构代码结构</strong></li></ol><p>首先需要在原有代码上进行重构：</p><ul><li>首先将组件目录由 【button】 改为 【Button】</li></ul><blockquote><p>特别提醒：git 提交的时候注意，默认 git 修改的时候是忽略大小写的。需要修改一下 git 配置才可以提交。</p></blockquote><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 禁止忽略大小写</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> core.ignorecase</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span></span></code></pre></div><ul><li>Button 组件入口 index.ts 默认作为插件导出。</li></ul><p>重构前：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import Button from &quot;./Button&quot;;</span></span>
<span class="line"><span>import { App } from &quot;vue&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 导出 Button 组件</span></span>
<span class="line"><span>export default Button</span></span></code></pre></div><p>重构后：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import Button from &quot;./Button&quot;;</span></span>
<span class="line"><span>import { App } from &quot;vue&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 导出Button组件</span></span>
<span class="line"><span>export { Button };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 导出Vue插件</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  install(app: App) {</span></span>
<span class="line"><span>    app.component(Button.name, Button);</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>另外要注意的是，原 uno.css 是在 entry.ts 中引入的，在子组件包中将不会以 entry.ts 为入口。如果希望 uno.css 能够正常 build，需要在子组件包入口 index.ts 引入 uno.css。</p><ol start="2"><li><strong>编写分包导出脚本</strong></li></ol><p>默认导出方式是通过配置 vite.config.ts 的 build 属性完成。但是在分包导出的时候需要每个组件都分别配置自己的配置文件，而且需要由程序自动读取组件文件夹，根据文件夹的名字遍历打包，还需要为每个子组件包配上一个 package.json 文件。</p><p>新建一个 scripts/build.ts 文件。</p><p>首先需要学会的是如何使用代码让 vite 打包。</p><p>导入 vite.config.ts中的配置，然后调用 vite 的 build api 打包。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 读取 vite 配置</span></span>
<span class="line"><span>import { config } from &quot;../vite.config&quot;;</span></span>
<span class="line"><span>import { build, InlineConfig, defineConfig, UserConfig } from &quot;vite&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 全量打包</span></span>
<span class="line"><span>build(defineConfig(config as UserConfig) as InlineConfig);</span></span></code></pre></div><p>读取组件文件夹遍历组件库文件夹。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const srcDir = path.resolve(__dirname, &quot;../src/&quot;);</span></span>
<span class="line"><span>  fs.readdirSync(srcDir)</span></span>
<span class="line"><span>    .filter((name) =&gt; {</span></span>
<span class="line"><span>      // 过滤文件只保留包含index.ts</span></span>
<span class="line"><span>      const componentDir = path.resolve(srcDir, name);</span></span>
<span class="line"><span>      const isDir = fs.lstatSync(componentDir).isDirectory();</span></span>
<span class="line"><span>      return isDir &amp;&amp; fs.readdirSync(componentDir).includes(&quot;index.ts&quot;);</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    .forEach(async (name) =&gt; {</span></span>
<span class="line"><span>      // 文件夹遍历</span></span>
<span class="line"><span>     });</span></span></code></pre></div><p>为每个模块定制不同的编译规则。编译规则如下：</p><ul><li>导出文件夹为 dist/ &lt;组件名&gt;/ 例： dist/Button；</li><li>导出模块名为： index.es.js、index.umd.js；</li><li>导出模块名为： &lt;组件名&gt; iffe 中绑定到全局的名字。</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  const outDir = path.resolve(config.build.outDir, name);</span></span>
<span class="line"><span>  const custom = {</span></span>
<span class="line"><span>    lib: {</span></span>
<span class="line"><span>      entry: path.resolve(srcDir, name),</span></span>
<span class="line"><span>      name, // 导出模块名</span></span>
<span class="line"><span>      fileName: \`index\`,</span></span>
<span class="line"><span>      formats: [\`esm\`, \`umd\`],</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    outDir,</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Object.assign(config.build, custom);</span></span>
<span class="line"><span>  await build(defineConfig(config as UserConfig) as InlineConfig);</span></span></code></pre></div><p>最后还需要为每个子组件包定制一个自己的 package.json。因为根据 npm 软件包规则，当你 import 子组件包的时候，会根据子包中的 package.json 文件找到对应的模块。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 读取</span></span>
<span class="line"><span>import Button from &quot;smarty-ui-vite/Button&quot;</span></span></code></pre></div><p>子包的 package.json。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>      &quot;name&quot;: &quot;smarty-ui-vite/Button&quot;,</span></span>
<span class="line"><span>      &quot;main&quot;: &quot;index.umd.js&quot;,</span></span>
<span class="line"><span>      &quot;module&quot;: &quot;index.umd.js&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>生成 package.json 使用模版字符串实现。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>      fs.outputFile(</span></span>
<span class="line"><span>        path.resolve(outDir, \`package.json\`),</span></span>
<span class="line"><span>        \`{</span></span>
<span class="line"><span>          &quot;name&quot;: &quot;smarty-ui-vite/\${name}&quot;,</span></span>
<span class="line"><span>          &quot;main&quot;: &quot;index.umd.js&quot;,</span></span>
<span class="line"><span>          &quot;module&quot;: &quot;index.umd.js&quot;,</span></span>
<span class="line"><span>        }\`,</span></span>
<span class="line"><span>        \`utf-8\`</span></span>
<span class="line"><span>      );</span></span></code></pre></div><p>最后把上面的代码组合一下就可以了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import fs from &quot;fs-extra&quot;;</span></span>
<span class="line"><span>import path from &quot;path&quot;;</span></span>
<span class="line"><span>import { config } from &quot;../vite.config&quot;;</span></span>
<span class="line"><span>import { build, InlineConfig, defineConfig, UserConfig } from &quot;vite&quot;;</span></span>
<span class="line"><span>const buildAll = async () =&gt; {</span></span>
<span class="line"><span>  // const inline: InlineConfig =</span></span>
<span class="line"><span>  //   viteConfig;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 全量打包</span></span>
<span class="line"><span>  await build(defineConfig(config as UserConfig) as InlineConfig);</span></span>
<span class="line"><span>  // await build(defineConfig({}))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const srcDir = path.resolve(__dirname, &quot;../src/&quot;);</span></span>
<span class="line"><span>  fs.readdirSync(srcDir)</span></span>
<span class="line"><span>    .filter((name) =&gt; {</span></span>
<span class="line"><span>      // 只要目录不要文件，且里面包含index.ts</span></span>
<span class="line"><span>      const componentDir = path.resolve(srcDir, name);</span></span>
<span class="line"><span>      const isDir = fs.lstatSync(componentDir).isDirectory();</span></span>
<span class="line"><span>      return isDir &amp;&amp; fs.readdirSync(componentDir).includes(&quot;index.ts&quot;);</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    .forEach(async (name) =&gt; {</span></span>
<span class="line"><span>      const outDir = path.resolve(config.build.outDir, name);</span></span>
<span class="line"><span>      const custom = {</span></span>
<span class="line"><span>        lib: {</span></span>
<span class="line"><span>          entry: path.resolve(srcDir, name),</span></span>
<span class="line"><span>          name, // 导出模块名</span></span>
<span class="line"><span>          fileName: \`index\`,</span></span>
<span class="line"><span>          formats: [\`es\`, \`umd\`],</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        outDir,</span></span>
<span class="line"><span>      };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      Object.assign(config.build, custom);</span></span>
<span class="line"><span>      await build(defineConfig(config as UserConfig) as InlineConfig);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      fs.outputFile(</span></span>
<span class="line"><span>        path.resolve(outDir, \`package.json\`),</span></span>
<span class="line"><span>        \`{</span></span>
<span class="line"><span>          &quot;name&quot;: &quot;smarty-ui-vite/\${name}&quot;,</span></span>
<span class="line"><span>          &quot;main&quot;: &quot;index.umd.js&quot;,</span></span>
<span class="line"><span>          &quot;module&quot;: &quot;index.umd.js&quot;,</span></span>
<span class="line"><span>        }\`,</span></span>
<span class="line"><span>        \`utf-8\`</span></span>
<span class="line"><span>      );</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>buildAll();</span></span></code></pre></div><p>由于脚本是使用typescript编写的所以需要使用 esno 运行。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> esno</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -D</span></span></code></pre></div><p>在package.json中添加脚本</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;scripts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;build&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;pnpm build:components&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;build:all&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;vite build&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;build:components&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;esno ./scripts/build.ts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span></code></pre></div><p>运行代码</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span></span></code></pre></div><h3 id="测试按需加载" tabindex="-1">测试按需加载 <a class="header-anchor" href="#测试按需加载" aria-label="Permalink to &quot;测试按需加载&quot;">​</a></h3><p>假设页面中只使用 Button 按钮，那么只调用Button子包中的 js、css 就可以了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;h1&gt;Demo IFFE OnDemand&lt;/h1&gt;</span></span>
<span class="line"><span>&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>&lt;link rel=&quot;stylesheet&quot; href=&quot;../../dist/style.css&quot;&gt;</span></span>
<span class="line"><span>&lt;script src=&quot;../../node_modules/vue/dist/vue.global.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>&lt;script src=&quot;../../dist/button/index.iife.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>    const { createApp } = Vue</span></span>
<span class="line"><span>    console.log(&#39;vue&#39;, Vue)</span></span>
<span class="line"><span>    console.log(&#39;SmartyUI&#39;, Button)</span></span>
<span class="line"><span>    createApp({</span></span>
<span class="line"><span>        template: \`</span></span>
<span class="line"><span>        &lt;div style=&quot;margin-bottom:20px;&quot;&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;blue&quot;&gt;主要按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;green&quot;&gt;绿色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;gray&quot;&gt;灰色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;yellow&quot;&gt;黄色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;red&quot;&gt;红色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div style=&quot;margin-bottom:20px;&quot;</span></span>
<span class="line"><span>        &gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;blue&quot; plain&gt;朴素按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;green&quot; plain&gt;绿色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;gray&quot; plain&gt;灰色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;yellow&quot; plain&gt;黄色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;red&quot; plain&gt;红色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div style=&quot;margin-bottom:20px;&quot;&gt;</span></span>
<span class="line"><span>            &lt;SButton size=&quot;small&quot; plain&gt;小按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton size=&quot;medium&quot; plain&gt;中按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton size=&quot;large&quot; plain&gt;大按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div style=&quot;margin-bottom:20px;&quot;&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;blue&quot; round plain icon=&quot;search&quot;&gt;搜索按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;green&quot; round plain icon=&quot;edit&quot;&gt;编辑按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;gray&quot; round plain icon=&quot;check&quot;&gt;成功按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;yellow&quot; round plain icon=&quot;message&quot;&gt;提示按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;red&quot; round plain icon=&quot;delete&quot;&gt;删除按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div style=&quot;margin-bottom:20px;&quot;&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;blue&quot; round plain icon=&quot;search&quot;&gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;green&quot; round plain icon=&quot;edit&quot;&gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;gray&quot; round plain icon=&quot;check&quot;&gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;yellow&quot; round plain icon=&quot;message&quot;&gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;red&quot; round plain icon=&quot;delete&quot;&gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>    \`</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>        .use(Button.default)</span></span>
<span class="line"><span>        .mount(&#39;#app&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre></div><h2 id="复盘" tabindex="-1">复盘 <a class="header-anchor" href="#复盘" aria-label="Permalink to &quot;复盘&quot;">​</a></h2><p>这节课的主要内容是为组件库添加分包导出功能，使组件库提供按需加载。组件库具备良好的按需加载能力，可以使提高页面性能。虽然目前 ESM Treeshaking 已经非常流行，但是还是有很多场合需要分包按需引入的支持。</p><p>另外，分包引入需要每个子组件包都分别使用不同的配置调用 vite 导出。这需要编写相对较为复杂的脚本完成。工程化中很重要的一部分就是要根据实际需求编写自动化的脚本。</p><p>这节课已进行了一个简单的实践，在编写的时候特别要注意配置的复用性。比如：子包与主包是在一个一个配置文件下做的不同的配置，这个然叔都是动了一番脑筋才实现的。</p><p>最后留一些思考题帮助大家复习，也欢迎在留言区讨论。</p><ul><li>组件如何才能实现按需引入？</li><li>如何实现组件分包导出？</li><li>如何批量生成 package.json 文件？</li></ul><p>下节课，我们将给大家讲解如何将开发文档发布上线，下节课见。</p>`,71),l=[i];function e(o,c,u,r,d,g){return a(),n("div",null,l)}const m=s(t,[["render",e]]);export{q as __pageData,m as default};
