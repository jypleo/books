import{_ as s,c as a,o as i,a2 as n}from"./chunks/framework.D8Prfz4N.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"pamphlet/Babel 插件通关秘籍/23 实战案例-模块遍历.md","filePath":"pamphlet/Babel 插件通关秘籍/23 实战案例-模块遍历.md"}'),p={name:"pamphlet/Babel 插件通关秘籍/23 实战案例-模块遍历.md"},t=n(`<p>babel 能够做静态分析，分析代码然后得出一些信息。我们经常用的打包工具就需要通过静态分析的方式得出模块间的依赖关系，然后构造成依赖图，之后对这个依赖图做各种处理，最后输出成文件。</p><p>比如 webpack 的打包过程：从入口模块分析依赖，构造模块依赖图，然后把一些模块合并到同个分组（chunk）里，生成 chunk 依赖图，最后把 chunk 通过模版打印为 assets，输出为文件。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ad6cc6cb7e84f3da779adf1f79a773d~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p>从入口模块开始，对每个模块的依赖关系的分析就是基于 AST，这种就可以用 babel parser （或者直接用 acorn）来处理。</p><p>这一节我们就来实现下依赖分析的功能，也就是遍历所有的模块。</p><p>写这个的好处一个是能够加深我们对打包工具的认识，二是当做一些独立的工具的时候，可能也需要分析模块依赖关系。</p><h2 id="思路分析" tabindex="-1">思路分析 <a class="header-anchor" href="#思路分析" aria-label="Permalink to &quot;思路分析&quot;">​</a></h2><p>模块依赖分析也就是要分析 import 和 export，从入口模块开始，读取文件内容，通过 babel parser 把内容 parse 成 ast，之后通过 babel traverse 来对 AST 进行遍历。分别对 ImportDeclaration、ExportDeclaration 做处理：</p><p>ImportDeclaration：收集 import 信息，确定依赖的模块和引入的变量，之后再递归处理该模块 ExportDeclaration：收集 export 信息，确定导出的变量</p><p>我们可以设计这样一个结构来表示每个模块的信息：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> DependencyNode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    constructor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">path</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">imports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {}, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">exports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> []) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.path </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> path;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.imports </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> imports;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.exports </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> exports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.subModules </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {};</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>path 表示当前模块路径， imports 表示从什么模块引入了什么变量，exports 表示导出了什么变量。</p><p>接下来我们要完成 traverseModule 这个方法，也就是对每个模块的处理</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> dependencyGraph</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> traverseModule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(入口模块路径);</span></span></code></pre></div><p>具体处理的过程就是：</p><ul><li>读取文件内容</li><li>通过 babel parser 把文件内容 parse 成 ast</li><li>遍历 AST，对 ImportDeclaration、ExportDeclaration 分别做处理</li><li>对分析出的依赖路径进行处理，变成绝对路径，并尝试补全</li><li>递归处理分析出来的依赖路径</li></ul><p>如果没有后缀名的依赖路径，要分别尝试 .js、.jsx、.ts、.tsx 的路径，如果存在就补全成该路径，并且目录还要补全 index 文件名。</p><p>通过递归处理依赖模块，就可以完成依赖图的构建，我们可以保存根节点和所有模块的信息：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> dependencyGraph</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    root: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> DependencyNode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    allModules: {}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><p>当处理完所有模块后，就得到了完整的 dependencyGraph。</p><p>接下来我们来写下代码。</p><h2 id="代码实现" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现" aria-label="Permalink to &quot;代码实现&quot;">​</a></h2><p>首先我们定义要返回的 dependencyGraph，</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> DependencyNode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    constructor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">path</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">imports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {}, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">exports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> []) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.path </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> path;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.imports </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> imports;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.exports </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> exports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.subModules </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {};</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">curModulePath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> dependencyGraph</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        root: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> DependencyNode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        allModules: {}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    };</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    traverseJsModule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(curModulePath, dependencyGraph.root, dependencyGraph.allModules);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dependencyGraph;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>接下来实现遍历的方法，也就是之前分析的 <strong>读取文件内容、parse 成 AST、travese AST 提取模块信息和依赖信息、递归遍历依赖（先把路径处理成绝对路径）</strong> 的过程。</p><blockquote><p>要注意的是，ts、jsx、tsx 等用的 babel 插件不同，要根据 extname 来做不同的插件的引入。</p></blockquote><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> resolveBabelSyntaxtPlugins</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">modulePath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> plugins</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [];</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ([</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;.tsx&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;.jsx&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">].</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">ext</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> modulePath.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">endsWith</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ext))) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        plugins.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;jsx&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ([</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;.ts&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;.tsx&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">].</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">ext</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> modulePath.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">endsWith</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ext))) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        plugins.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;typescript&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> plugins;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> traverseJsModule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">curModulePath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">dependencyGrapthNode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">allModules</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> moduleFileContent</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> fs.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">readFileSync</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(curModulePath, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        encoding: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;utf-8&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    dependencyGrapthNode.path </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> curModulePath;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ast</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> parser.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">parse</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(moduleFileContent, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        sourceType: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;unambiguous&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        plugins: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">resolveBabelSyntaxtPlugins</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(curModulePath)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    traverse</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ast, {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        ImportDeclaration</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // 收集import 信息</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // 递归处理依赖模块</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            traverseJsModule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(subModulePath, subModule, allModules);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            dependencyGrapthNode.subModules[subModule.path] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> subModule;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        },</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        ExportDeclaration</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            //收集 export 信息</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    allModules[curModulePath] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dependencyGrapthNode;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>上面省略了对 ImportDeclaration 和 ExportDeclaration 的处理，接下来我们来分别处理下这两种节点：</p><p>ImportDeclaration 分为三种：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 这种我们叫 deconstruct import（解构引入）</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { a, b </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> bb} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;aa&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 这种我们叫 namespace import（命名空间引入）</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> c </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;cc&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 这种我们叫 default import（默认引入）</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> b </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;b&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><p>可以用 astexplorer.net 看一下<a href="https://astexplorer.net/#/gist/efdc75203c127c7bdb9986bdb83fe2c7/60eb8c67f86b303f89a0e3e6d65d5edd60dea8cf" target="_blank" rel="noreferrer">它们的 AST</a>。</p><p>我们要根据具体的类型来提取信息，三种不同的 import 的 AST 提取信息的方式不同。</p><p>先定义下三种 import 类型：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> IMPORT_TYPE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    deconstruct: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;deconstruct&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    default: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;default&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    namespace: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;namespace&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>然后 visitor 里对不同类型的 AST 做不同的处理：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ImportDeclaration</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(path) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> subModulePath</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> moduleResolver</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(curModulePath, path.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;source.value&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).node);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">subModulePath) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> specifierPaths</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> path.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;specifiers&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    dependencyGrapthNode.imports[subModulePath] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> specifierPaths.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">specifierPath</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (specifierPath.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isImportSpecifier</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                type: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">IMPORT_TYPE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.deconstruct,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                imported: specifierPath.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;imported&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).node.name,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                local: specifierPath.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;local&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).node.name</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (specifierPath.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isImportDefaultSpecifier</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                type: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">IMPORT_TYPE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.default,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                local: specifierPath.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;local&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).node.name</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                type: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">IMPORT_TYPE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.namespace,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                local: specifierPath.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;local&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).node.name</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> subModule</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> DependencyNode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    traverseJsModule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(subModulePath, subModule, allModules);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    dependencyGrapthNode.subModules[subModule.path] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> subModule;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>上面我们通过记录了 import 信息到 dependencyGrapthNode.imports 中，并且递归处理了依赖模块。而且在处理依赖模块之前，我们做了把路径转成绝对路径和路径补全的处理。</p><p>平时写 js 依赖是可以忽略后缀的，甚至还可以忽略文件名（比如 index.js），但是我们解析依赖要给它补全后缀名。</p><p>路径补全的处理就是分别尝试 .tsx,.ts,.jsx,.js的路径是否存在，如果是目录的话，还要连同 index 一起补全，也就是 index.tsx、index.ts、index.jsx、index.js</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> completeModulePath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">modulePath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> EXTS</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;.tsx&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;.ts&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;.jsx&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (modulePath.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">match</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">\\.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">[a-zA-Z]</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> modulePath;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> tryCompletePath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">resolvePath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> EXTS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">length</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> tryPath </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> resolvePath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">EXTS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[i]);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (fs.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">existsSync</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tryPath)) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">                return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> tryPath;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> reportModuleNotFoundError</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">modulePath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        throw</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;module not found: &#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> modulePath;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isDirectory</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(modulePath)) {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//如果是目录</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> tryModulePath</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> tryCompletePath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">ext</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> path.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">join</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(modulePath, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;index&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ext));</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tryModulePath) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            reportModuleNotFoundError</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(modulePath);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> tryModulePath;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">EXTS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">some</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">ext</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> modulePath.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">endsWith</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ext))) {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//如果补全后的路径存在</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> tryModulePath</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> tryCompletePath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">ext</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> modulePath </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ext);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tryModulePath) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            reportModuleNotFoundError</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(modulePath);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> tryModulePath;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> modulePath;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>当然，我们还要收集下 export 的信息，也是分为三种类型：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 全部导出(all export)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;a&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 默认导出 (default export)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> b;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 命名导出 (named export)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { c </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> cc };</span></span></code></pre></div><p>然后分别对这三种 AST 做不同的信息收集：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ExportDeclaration</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(path) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(path.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isExportNamedDeclaration</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> specifiers</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> path.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;specifiers&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        dependencyGrapthNode.exports </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> specifiers.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">specifierPath</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            type: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">EXPORT_TYPE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.named,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            exported: specifierPath.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;exported&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).node.name,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            local: specifierPath.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;local&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).node.name</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (path.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isExportDefaultDeclaration</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> exportName;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> declarationPath</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> path.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;declaration&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(declarationPath.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isAssignmentExpression</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            exportName </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> declarationPath.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;left&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">toString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            exportName </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> declarationPath.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">toString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        dependencyGrapthNode.exports.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            type: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">EXPORT_TYPE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.default,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            exported: exportName</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        dependencyGrapthNode.exports.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            type: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">EXPORT_TYPE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.all,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            exported: path.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;exported&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).node.name,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            source: path.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;source&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).node.value</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>递归处理每一个模块就完成了依赖图的构建。</p><h2 id="效果演示" tabindex="-1">效果演示 <a class="header-anchor" href="#效果演示" aria-label="Permalink to &quot;效果演示&quot;">​</a></h2><p>首先我们写一个测试项目：</p><p><strong>index.js</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { aa1, aa2 } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./a&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(aa1);</span></span></code></pre></div><p><strong>a.js</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> b </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./b&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> aa1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> aa2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(b);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    aa1,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    aa2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><strong>b.js</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { cc  </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> renamedCc } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./c&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> b </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><p><strong>c/index.js</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> cc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    cc</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><p>然后使用 traverseModule 方法对入口模块 index 进行处理：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> traverseModule</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;./traverseModule&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> path</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;path&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> dependencyGraph</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> traverseModule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(path.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(__dirname, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;../test-project/index.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">JSON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">stringify</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(dependencyGraph, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">));</span></span></code></pre></div><p>结果如下，我们成功构建出了整个依赖图：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;root&quot;: {</span></span>
<span class="line"><span>        &quot;path&quot;: &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/index.js&quot;,</span></span>
<span class="line"><span>        &quot;imports&quot;: {</span></span>
<span class="line"><span>            &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/a.js&quot;: [</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    &quot;type&quot;: &quot;deconstruct&quot;,</span></span>
<span class="line"><span>                    &quot;imported&quot;: &quot;aa1&quot;,</span></span>
<span class="line"><span>                    &quot;local&quot;: &quot;aa1&quot;</span></span>
<span class="line"><span>                },</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    &quot;type&quot;: &quot;deconstruct&quot;,</span></span>
<span class="line"><span>                    &quot;imported&quot;: &quot;aa2&quot;,</span></span>
<span class="line"><span>                    &quot;local&quot;: &quot;aa2&quot;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            ]</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        &quot;exports&quot;: [],</span></span>
<span class="line"><span>        &quot;subModules&quot;: {</span></span>
<span class="line"><span>            &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/a.js&quot;: {</span></span>
<span class="line"><span>                &quot;path&quot;: &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/a.js&quot;,</span></span>
<span class="line"><span>                &quot;imports&quot;: {</span></span>
<span class="line"><span>                    &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/b.js&quot;: [</span></span>
<span class="line"><span>                        {</span></span>
<span class="line"><span>                            &quot;type&quot;: &quot;default&quot;,</span></span>
<span class="line"><span>                            &quot;local&quot;: &quot;b&quot;</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                    ]</span></span>
<span class="line"><span>                },</span></span>
<span class="line"><span>                &quot;exports&quot;: [</span></span>
<span class="line"><span>                    {</span></span>
<span class="line"><span>                        &quot;type&quot;: &quot;named&quot;,</span></span>
<span class="line"><span>                        &quot;exported&quot;: &quot;aa1&quot;,</span></span>
<span class="line"><span>                        &quot;local&quot;: &quot;aa1&quot;</span></span>
<span class="line"><span>                    },</span></span>
<span class="line"><span>                    {</span></span>
<span class="line"><span>                        &quot;type&quot;: &quot;named&quot;,</span></span>
<span class="line"><span>                        &quot;exported&quot;: &quot;aa2&quot;,</span></span>
<span class="line"><span>                        &quot;local&quot;: &quot;aa2&quot;</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                ],</span></span>
<span class="line"><span>                &quot;subModules&quot;: {</span></span>
<span class="line"><span>                    &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/b.js&quot;: {</span></span>
<span class="line"><span>                        &quot;path&quot;: &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/b.js&quot;,</span></span>
<span class="line"><span>                        &quot;imports&quot;: {</span></span>
<span class="line"><span>                            &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/c/index.js&quot;: [</span></span>
<span class="line"><span>                                {</span></span>
<span class="line"><span>                                    &quot;type&quot;: &quot;deconstruct&quot;,</span></span>
<span class="line"><span>                                    &quot;imported&quot;: &quot;cc&quot;,</span></span>
<span class="line"><span>                                    &quot;local&quot;: &quot;renamedCc&quot;</span></span>
<span class="line"><span>                                }</span></span>
<span class="line"><span>                            ]</span></span>
<span class="line"><span>                        },</span></span>
<span class="line"><span>                        &quot;exports&quot;: [</span></span>
<span class="line"><span>                            {</span></span>
<span class="line"><span>                                &quot;type&quot;: &quot;default&quot;,</span></span>
<span class="line"><span>                                &quot;exported&quot;: &quot;b&quot;</span></span>
<span class="line"><span>                            }</span></span>
<span class="line"><span>                        ],</span></span>
<span class="line"><span>                        &quot;subModules&quot;: {</span></span>
<span class="line"><span>                            &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/c/index.js&quot;: {</span></span>
<span class="line"><span>                                &quot;path&quot;: &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/c/index.js&quot;,</span></span>
<span class="line"><span>                                &quot;imports&quot;: {},</span></span>
<span class="line"><span>                                &quot;exports&quot;: [</span></span>
<span class="line"><span>                                    {</span></span>
<span class="line"><span>                                        &quot;type&quot;: &quot;named&quot;,</span></span>
<span class="line"><span>                                        &quot;exported&quot;: &quot;cc&quot;,</span></span>
<span class="line"><span>                                        &quot;local&quot;: &quot;cc&quot;</span></span>
<span class="line"><span>                                    }</span></span>
<span class="line"><span>                                ],</span></span>
<span class="line"><span>                                &quot;subModules&quot;: {}</span></span>
<span class="line"><span>                            }</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    &quot;allModules&quot;: {</span></span>
<span class="line"><span>        &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/c/index.js&quot;: {</span></span>
<span class="line"><span>            &quot;path&quot;: &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/c/index.js&quot;,</span></span>
<span class="line"><span>            &quot;imports&quot;: {},</span></span>
<span class="line"><span>            &quot;exports&quot;: [</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    &quot;type&quot;: &quot;named&quot;,</span></span>
<span class="line"><span>                    &quot;exported&quot;: &quot;cc&quot;,</span></span>
<span class="line"><span>                    &quot;local&quot;: &quot;cc&quot;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            ],</span></span>
<span class="line"><span>            &quot;subModules&quot;: {}</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/b.js&quot;: {</span></span>
<span class="line"><span>            &quot;path&quot;: &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/b.js&quot;,</span></span>
<span class="line"><span>            &quot;imports&quot;: {</span></span>
<span class="line"><span>                &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/c/index.js&quot;: [</span></span>
<span class="line"><span>                    {</span></span>
<span class="line"><span>                        &quot;type&quot;: &quot;deconstruct&quot;,</span></span>
<span class="line"><span>                        &quot;imported&quot;: &quot;cc&quot;,</span></span>
<span class="line"><span>                        &quot;local&quot;: &quot;renamedCc&quot;</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                ]</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            &quot;exports&quot;: [</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    &quot;type&quot;: &quot;default&quot;,</span></span>
<span class="line"><span>                    &quot;exported&quot;: &quot;b&quot;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            ],</span></span>
<span class="line"><span>            &quot;subModules&quot;: {</span></span>
<span class="line"><span>                &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/c/index.js&quot;: {</span></span>
<span class="line"><span>                    &quot;path&quot;: &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/c/index.js&quot;,</span></span>
<span class="line"><span>                    &quot;imports&quot;: {},</span></span>
<span class="line"><span>                    &quot;exports&quot;: [</span></span>
<span class="line"><span>                        {</span></span>
<span class="line"><span>                            &quot;type&quot;: &quot;named&quot;,</span></span>
<span class="line"><span>                            &quot;exported&quot;: &quot;cc&quot;,</span></span>
<span class="line"><span>                            &quot;local&quot;: &quot;cc&quot;</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                    ],</span></span>
<span class="line"><span>                    &quot;subModules&quot;: {}</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/a.js&quot;: {</span></span>
<span class="line"><span>            &quot;path&quot;: &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/a.js&quot;,</span></span>
<span class="line"><span>            &quot;imports&quot;: {</span></span>
<span class="line"><span>                &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/b.js&quot;: [</span></span>
<span class="line"><span>                    {</span></span>
<span class="line"><span>                        &quot;type&quot;: &quot;default&quot;,</span></span>
<span class="line"><span>                        &quot;local&quot;: &quot;b&quot;</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                ]</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            &quot;exports&quot;: [</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    &quot;type&quot;: &quot;named&quot;,</span></span>
<span class="line"><span>                    &quot;exported&quot;: &quot;aa1&quot;,</span></span>
<span class="line"><span>                    &quot;local&quot;: &quot;aa1&quot;</span></span>
<span class="line"><span>                },</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    &quot;type&quot;: &quot;named&quot;,</span></span>
<span class="line"><span>                    &quot;exported&quot;: &quot;aa2&quot;,</span></span>
<span class="line"><span>                    &quot;local&quot;: &quot;aa2&quot;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            ],</span></span>
<span class="line"><span>            &quot;subModules&quot;: {</span></span>
<span class="line"><span>                &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/b.js&quot;: {</span></span>
<span class="line"><span>                    &quot;path&quot;: &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/b.js&quot;,</span></span>
<span class="line"><span>                    &quot;imports&quot;: {</span></span>
<span class="line"><span>                        &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/c/index.js&quot;: [</span></span>
<span class="line"><span>                            {</span></span>
<span class="line"><span>                                &quot;type&quot;: &quot;deconstruct&quot;,</span></span>
<span class="line"><span>                                &quot;imported&quot;: &quot;cc&quot;,</span></span>
<span class="line"><span>                                &quot;local&quot;: &quot;renamedCc&quot;</span></span>
<span class="line"><span>                            }</span></span>
<span class="line"><span>                        ]</span></span>
<span class="line"><span>                    },</span></span>
<span class="line"><span>                    &quot;exports&quot;: [</span></span>
<span class="line"><span>                        {</span></span>
<span class="line"><span>                            &quot;type&quot;: &quot;default&quot;,</span></span>
<span class="line"><span>                            &quot;exported&quot;: &quot;b&quot;</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                    ],</span></span>
<span class="line"><span>                    &quot;subModules&quot;: {</span></span>
<span class="line"><span>                        &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/c/index.js&quot;: {</span></span>
<span class="line"><span>                            &quot;path&quot;: &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/c/index.js&quot;,</span></span>
<span class="line"><span>                            &quot;imports&quot;: {},</span></span>
<span class="line"><span>                            &quot;exports&quot;: [</span></span>
<span class="line"><span>                                {</span></span>
<span class="line"><span>                                    &quot;type&quot;: &quot;named&quot;,</span></span>
<span class="line"><span>                                    &quot;exported&quot;: &quot;cc&quot;,</span></span>
<span class="line"><span>                                    &quot;local&quot;: &quot;cc&quot;</span></span>
<span class="line"><span>                                }</span></span>
<span class="line"><span>                            ],</span></span>
<span class="line"><span>                            &quot;subModules&quot;: {}</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/index.js&quot;: {</span></span>
<span class="line"><span>            &quot;path&quot;: &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/index.js&quot;,</span></span>
<span class="line"><span>            &quot;imports&quot;: {</span></span>
<span class="line"><span>                &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/a.js&quot;: [</span></span>
<span class="line"><span>                    {</span></span>
<span class="line"><span>                        &quot;type&quot;: &quot;deconstruct&quot;,</span></span>
<span class="line"><span>                        &quot;imported&quot;: &quot;aa1&quot;,</span></span>
<span class="line"><span>                        &quot;local&quot;: &quot;aa1&quot;</span></span>
<span class="line"><span>                    },</span></span>
<span class="line"><span>                    {</span></span>
<span class="line"><span>                        &quot;type&quot;: &quot;deconstruct&quot;,</span></span>
<span class="line"><span>                        &quot;imported&quot;: &quot;aa2&quot;,</span></span>
<span class="line"><span>                        &quot;local&quot;: &quot;aa2&quot;</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                ]</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            &quot;exports&quot;: [],</span></span>
<span class="line"><span>            &quot;subModules&quot;: {</span></span>
<span class="line"><span>                &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/a.js&quot;: {</span></span>
<span class="line"><span>                    &quot;path&quot;: &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/a.js&quot;,</span></span>
<span class="line"><span>                    &quot;imports&quot;: {</span></span>
<span class="line"><span>                        &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/b.js&quot;: [</span></span>
<span class="line"><span>                            {</span></span>
<span class="line"><span>                                &quot;type&quot;: &quot;default&quot;,</span></span>
<span class="line"><span>                                &quot;local&quot;: &quot;b&quot;</span></span>
<span class="line"><span>                            }</span></span>
<span class="line"><span>                        ]</span></span>
<span class="line"><span>                    },</span></span>
<span class="line"><span>                    &quot;exports&quot;: [</span></span>
<span class="line"><span>                        {</span></span>
<span class="line"><span>                            &quot;type&quot;: &quot;named&quot;,</span></span>
<span class="line"><span>                            &quot;exported&quot;: &quot;aa1&quot;,</span></span>
<span class="line"><span>                            &quot;local&quot;: &quot;aa1&quot;</span></span>
<span class="line"><span>                        },</span></span>
<span class="line"><span>                        {</span></span>
<span class="line"><span>                            &quot;type&quot;: &quot;named&quot;,</span></span>
<span class="line"><span>                            &quot;exported&quot;: &quot;aa2&quot;,</span></span>
<span class="line"><span>                            &quot;local&quot;: &quot;aa2&quot;</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                    ],</span></span>
<span class="line"><span>                    &quot;subModules&quot;: {</span></span>
<span class="line"><span>                        &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/b.js&quot;: {</span></span>
<span class="line"><span>                            &quot;path&quot;: &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/b.js&quot;,</span></span>
<span class="line"><span>                            &quot;imports&quot;: {</span></span>
<span class="line"><span>                                &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/c/index.js&quot;: [</span></span>
<span class="line"><span>                                    {</span></span>
<span class="line"><span>                                        &quot;type&quot;: &quot;deconstruct&quot;,</span></span>
<span class="line"><span>                                        &quot;imported&quot;: &quot;cc&quot;,</span></span>
<span class="line"><span>                                        &quot;local&quot;: &quot;renamedCc&quot;</span></span>
<span class="line"><span>                                    }</span></span>
<span class="line"><span>                                ]</span></span>
<span class="line"><span>                            },</span></span>
<span class="line"><span>                            &quot;exports&quot;: [</span></span>
<span class="line"><span>                                {</span></span>
<span class="line"><span>                                    &quot;type&quot;: &quot;default&quot;,</span></span>
<span class="line"><span>                                    &quot;exported&quot;: &quot;b&quot;</span></span>
<span class="line"><span>                                }</span></span>
<span class="line"><span>                            ],</span></span>
<span class="line"><span>                            &quot;subModules&quot;: {</span></span>
<span class="line"><span>                                &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/c/index.js&quot;: {</span></span>
<span class="line"><span>                                    &quot;path&quot;: &quot;/Users/guang/code/babel-plugin-exercize/exercize-module-iterator/test-project/c/index.js&quot;,</span></span>
<span class="line"><span>                                    &quot;imports&quot;: {},</span></span>
<span class="line"><span>                                    &quot;exports&quot;: [</span></span>
<span class="line"><span>                                        {</span></span>
<span class="line"><span>                                            &quot;type&quot;: &quot;named&quot;,</span></span>
<span class="line"><span>                                            &quot;exported&quot;: &quot;cc&quot;,</span></span>
<span class="line"><span>                                            &quot;local&quot;: &quot;cc&quot;</span></span>
<span class="line"><span>                                        }</span></span>
<span class="line"><span>                                    ],</span></span>
<span class="line"><span>                                    &quot;subModules&quot;: {}</span></span>
<span class="line"><span>                                }</span></span>
<span class="line"><span>                            }</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>有了依赖图之后，就可以做进一步的处理，比如：</p><ul><li>合并一些模块成 chunk graph</li><li>通过 export 和 import 的关系的分析，实现 treeshking</li></ul><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>打包工具 webpack 就是基于 AST 来做的依赖分析，通过构建模块依赖图，之后进一步的处理。这节我们基于 babel parser 和 babel traverse 做了模块的遍历和依赖图的生成。</p><p>每个模块的处理都是 <strong>读取内容、parse、遍历 AST提取 import 和 export 信息、递归遍历依赖</strong> 的过程。</p><p>其中要注意的是parse 的插件要根据后缀名来决定，路径要做下补全。</p><p>遍历 AST 是要确定什么属性，遍历模块则是要解析 require，然后处理路径。</p><p>依赖图分析完之后就可以做进一步的处理，比如合并 chunk、treeshking 等，然后输出成文件，这就是打包工具。</p><p>（代码在<a href="https://github.com/QuarkGluonPlasma/babel-plugin-exercize" target="_blank" rel="noreferrer">这里</a>，建议 git clone 下来通过 node 跑一下）</p>`,68),l=[t];function e(h,k,E,r,d,o){return i(),a("div",null,l)}const u=s(p,[["render",e]]);export{g as __pageData,u as default};
