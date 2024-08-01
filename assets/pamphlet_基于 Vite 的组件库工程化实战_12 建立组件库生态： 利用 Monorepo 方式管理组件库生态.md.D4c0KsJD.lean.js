import{_ as a,c as s,o as n,a2 as p}from"./chunks/framework.D8Prfz4N.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"pamphlet/基于 Vite 的组件库工程化实战/12 建立组件库生态： 利用 Monorepo 方式管理组件库生态.md","filePath":"pamphlet/基于 Vite 的组件库工程化实战/12 建立组件库生态： 利用 Monorepo 方式管理组件库生态.md"}'),t={name:"pamphlet/基于 Vite 的组件库工程化实战/12 建立组件库生态： 利用 Monorepo 方式管理组件库生态.md"},e=p(`<p>组件库一般都会配有周边产品，比如 Admin 、Template、CLI 工具等等。周边产品相当于有关联的多个项目，更准确的说法是多个软件包。这个时候就应该使用 Monorepo 方式组织代码，方便频繁在多个项目间同时交替开发，同时发布，保持版本间没有冲突。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ac5c7b7c94044489885ad7d27c30356~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><h2 id="传统-mutirepo-方式的不足" tabindex="-1">传统 Mutirepo 方式的不足 <a class="header-anchor" href="#传统-mutirepo-方式的不足" aria-label="Permalink to &quot;传统 Mutirepo 方式的不足&quot;">​</a></h2><p>所谓传统方式，我们称之为 Multirepo 方式，或者可以称之为 MutiPackage-MultiRepo 方式。就是说遇到多个软件包的场景，使用多个 Repo 仓库的方式组织代码。</p><p>换句话说就是，一个软件包一个 Repo 仓库。其实我们常见的前端项目默认就是这样的模式。这种方式最大的问题就是在多个项目间切换开发会非常不方便。比如： 在开发 Admin 项目的时候，发现 UI 库需要增加了一个功能，那你需要以下步骤：</p><ul><li>从 Git 库克隆 UI 库代码；</li><li>修改 UI 库代码；</li><li>推送 UI 库到 Git 库；</li><li>推送 UI 库到 Npm 库；</li><li>在 Admin 中更新最新的 UI 库。</li></ul><p>这个过程假设一次修改不满意频繁更新，那么整个过程还会不断重复。</p><p>优化的方案，是使用 npm link 方式把几个项目的本地目录链接起来。但是这种方法依然有弊端，比如在团队开发的时候，你必须随时同步所有的代码仓库。另外如果你的代码不希望公开到 Npm 上，你还需要建立私有的 Npm 仓库。</p><h2 id="monorepo-的优势" tabindex="-1">Monorepo 的优势 <a class="header-anchor" href="#monorepo-的优势" aria-label="Permalink to &quot;Monorepo 的优势&quot;">​</a></h2><p>Monorepo 其实就是将多个项目 （pacakage 软件包）放到同一个仓库 （Repo） 中进行管理。这种代码组织形式可以更好地管理多 Package 项目。主要的优点有：</p><ul><li>可见性 （Visibility）: 每个开发者都可以方便地查看多个包的代码，方便修改跨 Package 的 Bug。比如开发 Admin 的时候发现UI 有问题，随手就可以修改。</li></ul><ul><li>更简单的包管理方式（Simpler dependency management）： 由于共享依赖简单，因此所有模块都托管在同一个存储库中，因此都不需要私有包管理器。</li></ul><ul><li>唯一依赖源（Single source of truth）： 每个依赖只有一个版本，可以防止版本冲突，没有依赖地狱。</li></ul><ul><li>原子提交： 方便大规模重构，开发者可以一次提交多个包（package）。</li></ul><p>同样是上面的那个同时开发 Admin 和 UI 的场景。当你开发 Admin 时，发现UI 有要修改之处，只需要切换目录修改，这时候马上就可以验证修改后的效果了，无需提交软件包，无需担心软件冲突。</p><p>越复杂的场景，你会发现这种好处会更加明显。比如一个 UI 库对应两个Admin 。这时候你希望重构一下某个组件的属性。这种重构需要同时调整三个包中的代码。使用 Monorepo ，你可以不必有任何心智负担，调整后立刻验证两个 Admin 效果，同时发布就好。</p><h2 id="用户故事-userstory" tabindex="-1">用户故事(UserStory) <a class="header-anchor" href="#用户故事-userstory" aria-label="Permalink to &quot;用户故事(UserStory)&quot;">​</a></h2><p>将组件库重构为 Monorepo 风格管理，方便后续组件库生态建设。</p><h2 id="任务分解-task" tabindex="-1">任务分解(Task) <a class="header-anchor" href="#任务分解-task" aria-label="Permalink to &quot;任务分解(Task)&quot;">​</a></h2><ul><li>Monorepo方案选型；</li><li>重构Monorepo；</li><li>测试Monorepo效果。</li></ul><h3 id="方案选型" tabindex="-1">方案选型 <a class="header-anchor" href="#方案选型" aria-label="Permalink to &quot;方案选型&quot;">​</a></h3><p>目前 JS 中常见的 Monorepo 大概有两种选择：Lerna、Pnpm workspace。</p><p>其实在 Pnpm 横空出世前，基本上就是 lerna 一统天下的局面。连 Vue3 早期都是使用 lerna 做的 Monorepo 方案。</p><p>lernaJS 是由 Babel 团队编写的多包管理工具。因为 Babel 体系的规模庞大后有很多子包需要管理，放在多个仓库管理起来比较困难。</p><p><a href="https://github.com/babel/babel/tree/main/packages" target="_blank" rel="noreferrer">https://github.com/babel/babel/tree/main/packages</a></p><p>小伙伴们可以欣赏一下，一眼望不到边。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df9f7889594a4fcb8af9cf2e42923a05~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>无奈长江后浪推前浪，2021 年底 Pnpm 横空出世，闪电般的性能一下子征服了所有前端开发者。更重要的是它还附带 monorepo 方案。这个时候基本上没有任何开发者会抵挡这种诱惑，包括Vue3.0。</p><p>最终毫无疑问，我们选择 Pnpm 来搭建我们的技术方案。</p><h3 id="修改软件包目录结构" tabindex="-1">修改软件包目录结构 <a class="header-anchor" href="#修改软件包目录结构" aria-label="Permalink to &quot;修改软件包目录结构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>├── packages</span></span>
<span class="line"><span>|   ├── smarty-ui-vite  // UI组件库</span></span>
<span class="line"><span>|   |   ├── package.json</span></span>
<span class="line"><span>|   ├── docs-ui-vite // docs文档</span></span>
<span class="line"><span>|   |   ├── package.json</span></span>
<span class="line"><span>├── package.json</span></span></code></pre></div><p>首先将原有的组件库代码移动至 smarty-ui-vite目录。</p><h3 id="初始化monorepo软件包" tabindex="-1">初始化Monorepo软件包 <a class="header-anchor" href="#初始化monorepo软件包" aria-label="Permalink to &quot;初始化Monorepo软件包&quot;">​</a></h3><p>在根目录重新初始化一个 npm。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm init</span></span></code></pre></div><p>然后需要在软件包中禁用 npm 和 yarn。这一步的目的是允许项目使用 pnpm 进行模块管理。不然的话会出现不兼容问题。</p><p>方法是添加 preinstall npm hook 钩子，这个钩子会在安装模块前触发，检查该代码是否是使用 pnpm 运行。如果不是的话会推出并提示错误。</p><p>package.json</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;scripts&quot;: {</span></span>
<span class="line"><span>  &quot;preinstall&quot;: &quot;node ./scripts/preinstall.js&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>实现当运行 npm install 或 yarn，就会发生错误并且不会继续安装。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (!/pnpm/.test(process.env.npm_execpath || &#39;&#39;)) {</span></span>
<span class="line"><span>  console.log(&#39;不懂问然叔&#39;)</span></span>
<span class="line"><span>  console.warn(</span></span>
<span class="line"><span>    \`\\u001b[33mThis repository requires using pnpm as the package manager \` +</span></span>
<span class="line"><span>      \` for scripts to work properly.\\u001b[39m\\n\`</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>  process.exit(1)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>或者可以考虑使用</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;scripts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;preinstall&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;npx only-allow pnpm&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="初始化工作空间" tabindex="-1">初始化工作空间 <a class="header-anchor" href="#初始化工作空间" aria-label="Permalink to &quot;初始化工作空间&quot;">​</a></h3><p>在monorepo项目中，每个软件包会存放在工作空间，方便管理。</p><p>首先需要创建一个 pnpm-workspace.yaml，这个文件用于声明所有软件包全部存放在 packages 目录之中。其实目前 monorepo 风格的项目也普遍使用 packages 作为默认软件包目录位置。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>packages:</span></span>
<span class="line"><span>  # all packages in subdirs of packages/ and components/</span></span>
<span class="line"><span>  - &#39;packages/**&#39;</span></span></code></pre></div><h3 id="创建一个新的软件包" tabindex="-1">创建一个新的软件包 <a class="header-anchor" href="#创建一个新的软件包" aria-label="Permalink to &quot;创建一个新的软件包&quot;">​</a></h3><p>由于 smarty-ui-vite 这个组件库包已经放在 packages 目录之中了。无需其他过多的设置，它就可以当做 monorepo 工程中的一个项目了。</p><p>下面我们试试从零开始如何使用 pnpm 创建一个子软件包，并正确引用组件库。</p><p>比如：创建一个 docs-vite 用于文档化建设。在做文档化时需要引用 smarty-ui-vite 这个库，用于在网页上直接展示组件运行效果。</p><ol><li>初始化项目</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 在 packages 目录下</span></span>
<span class="line"><span>mkdir docs-vite</span></span>
<span class="line"><span>pnpm init</span></span></code></pre></div><ol start="2"><li>安装 Vite</li></ol><p>这个时候就可以做一个选择了，假设我们认为 Vite 多个软件包都需要依赖，这个时候就可以选择将依赖安装到 workspace 中，这样每个包都可以使用 vite 而无需单独安装。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 安装 workspace 中</span></span>
<span class="line"><span>pnpm i vite -w</span></span></code></pre></div><p>如果只安装在子 package 里面，可以使用 -r ，比如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 子package安装</span></span>
<span class="line"><span>pnpm i vue -r --filter smarty-ui-vite</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 或者 直接在 docs-vite 目录下</span></span>
<span class="line"><span>pnpm i vue</span></span></code></pre></div><p>下面需要做的是将 smarty-ui-vite 安装到 docs-vite 中。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 内部依赖package安装</span></span>
<span class="line"><span>pnpm i  smarty-ui-vite -r --filter docs-vite</span></span></code></pre></div><p>在安装后， docs-vite 中 smarty-ui-vite 的位置会指向到 workspace ，这也是 monorepo 的精髓所在。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb9d1d4bc23e411fa5ed7bbc43126c74~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>编辑一个页面测试一下, 直接加载 node_module 中的 smarty-ui-vite 的 module 和 css。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span>    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;</span></span>
<span class="line"><span>    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;</span></span>
<span class="line"><span>    &lt;title&gt;Document&lt;/title&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;h1&gt;🔨 SmartyUI Demo&lt;/h1&gt;</span></span>
<span class="line"><span>    &lt;div id=&quot;app&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;script type=&quot;module&quot;&gt;</span></span>
<span class="line"><span>        import style from &quot;smarty-ui-vite/dist/style.css&quot;</span></span>
<span class="line"><span>        import { createApp } from &quot;vue/dist/vue.esm-bundler.js&quot;;</span></span>
<span class="line"><span>        import SmartyUI, { SFCButton, JSXButton, SButton } from &quot;smarty-ui-vite/dist/smarty-ui.es.js&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        createApp({</span></span>
<span class="line"><span>            template: \`</span></span>
<span class="line"><span>        &lt;div style=&quot;margin-bottom:20px;&quot;&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;blue&quot;&gt;主要按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;green&quot;&gt;绿色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;gray&quot;&gt;灰色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;yellow&quot;&gt;黄色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;red&quot;&gt;红色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div style=&quot;margin-bottom:20px;&quot;</span></span>
<span class="line"><span>        &gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;blue&quot; plain&gt;朴素按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;green&quot; plain&gt;绿色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;gray&quot; plain&gt;灰色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;yellow&quot; plain&gt;黄色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;red&quot; plain&gt;红色按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div style=&quot;margin-bottom:20px;&quot;&gt;</span></span>
<span class="line"><span>            &lt;SButton size=&quot;small&quot; plain&gt;小按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton size=&quot;medium&quot; plain&gt;中按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton size=&quot;large&quot; plain&gt;大按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div style=&quot;margin-bottom:20px;&quot;&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;blue&quot; round plain icon=&quot;search&quot;&gt;搜索按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;green&quot; round plain icon=&quot;edit&quot;&gt;编辑按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;gray&quot; round plain icon=&quot;check&quot;&gt;成功按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;yellow&quot; round plain icon=&quot;message&quot;&gt;提示按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;red&quot; round plain icon=&quot;delete&quot;&gt;删除按钮&lt;/SButton&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div style=&quot;margin-bottom:20px;&quot;&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;blue&quot; round plain icon=&quot;search&quot;&gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;green&quot; round plain icon=&quot;edit&quot;&gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;gray&quot; round plain icon=&quot;check&quot;&gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;yellow&quot; round plain icon=&quot;message&quot;&gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>            &lt;SButton color=&quot;red&quot; round plain icon=&quot;delete&quot;&gt;&lt;/SButton&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>    \`}).use(SmartyUI).mount(&#39;#app&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;/script&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre></div><p>运行 dev 测试一下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm dev</span></span></code></pre></div><p>测试一下效果。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/430fff20c27440428a5c117223fd1982~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><h2 id="复盘" tabindex="-1">复盘 <a class="header-anchor" href="#复盘" aria-label="Permalink to &quot;复盘&quot;">​</a></h2><p>这节课的主要内容是利用Monorepo方式管理组件库生态。组件库的周边可以包括 cli 工具、admin、插件等内容，使用 monorepo 风格非常符合这样的应用场景。</p><p>最后留一些思考题帮助大家复习，也欢迎在留言区讨论。</p><ul><li>monorepo是什么</li><li>monorepo的应用场景和优点是什么 ？</li><li>如何使用 pnpm workspace 实现 monorepo 风格的项目 ？</li></ul><p>下节课，我们将给大家讲解如何用对组件库实现按需加载，下节课见。</p>`,73),l=[e];function o(i,c,u,r,d,g){return n(),s("div",null,l)}const q=a(t,[["render",o]]);export{m as __pageData,q as default};
