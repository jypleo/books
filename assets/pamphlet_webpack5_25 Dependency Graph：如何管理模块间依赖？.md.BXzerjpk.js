import{_ as s,c as i,o as a,a2 as e}from"./chunks/framework.CSIwbkbz.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"pamphlet/webpack5/25 Dependency Graph：如何管理模块间依赖？.md","filePath":"pamphlet/webpack5/25 Dependency Graph：如何管理模块间依赖？.md"}'),n={name:"pamphlet/webpack5/25 Dependency Graph：如何管理模块间依赖？.md"},p=e(`<p>Dependency Graph 概念来自官网 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconcepts%2Fdependency-graph%2F" target="_blank" rel="noreferrer">Dependency Graph | webpack</a> 一文，原文解释：</p><blockquote><p>Any time one file depends on another, webpack treats this as a <em>dependency</em>. This allows webpack to take non-code assets, such as images or web fonts, and also provide them as <em>dependencies</em> for your application.</p><p>When webpack processes your application, it starts from a list of modules defined on the command line or in its configuration file. Starting from these <em><a href="https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconcepts%2Fentry-points%2F" target="_blank" rel="noreferrer">entry points</a></em>, webpack recursively builds a <em>dependency graph</em> that includes every module your application needs, then bundles all of those modules into a small number of <em>bundles</em> - often, just one - to be loaded by the browser.</p></blockquote><p>大意：Webpack 处理应用代码时，会从开发者提供的 <code>entry</code> 开始递归地组建起包含所有模块的 <strong>Dependency Graph</strong>，之后再将这些 <code>module</code> 打包为 <code>bundles</code> 。</p><p>然而事实远不止官网描述的这么简单，Dependency Graph 贯穿 Webpack 整个运行周期，从「<strong>构建阶段</strong>」的模块解析，到「<strong>生成阶段</strong>」的 Chunk 生成，以及 Tree-shaking 等功能都高度依赖于Dependency Graph ，是 Webpack 资源构建流程中一个非常核心的数据结构。</p><p>本文将围绕 Webpack5 的 Dependency Graph 实现，展开讨论如下内容：</p><ul><li>模块依赖关系图的概念；</li><li>Webpack5 如何收集、管理、消费模块依赖关系图。</li></ul><h2 id="dependency-graph-是什么" tabindex="-1">Dependency Graph 是什么？ <a class="header-anchor" href="#dependency-graph-是什么" aria-label="Permalink to &quot;Dependency Graph 是什么？&quot;">​</a></h2><p>正式介绍 Dependency Graph 结构之前，我们先 <strong>简单</strong> 回顾一下 Webpack 构建阶段的关键过程：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/923e83d508b445b0bd0d4bfbc2300365~tplv-k3u1fbpfcp-zoom-in-crop-mark_3024_0_0_0.awebp?" alt="image.png"></p><ol><li>首先根据 <code>entry</code> 配置信息创建若干 <code>EntryDependency</code> 对象；</li><li>调用 <code>NormalModuleFactory</code> ，根据 <code>EntryDependency</code> 对象的资源路径创建 <code>Module</code> 子类对象；</li><li>将 <code>Module</code> 代码解析为 AST 结构；</li><li>遍历 AST，找到所有模块导入语句（<code>import/require</code>）；</li><li>根据导入语句创建对应的 <code>Dependency</code> 子类对象；</li><li>递归执行步骤 2，直到所有项目文件都处理完毕。</li></ol><p>这个过程从 <code>entry</code> 模块开始，逐步递归找出所有依赖文件，模块之间隐式形成了以 <code>entry</code> 为起点，以模块为节点，以导入导出依赖为边的有向图关系 —— 也就是 Webpack 官网所说的 Dependency Graph。</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eca01f5a133a49bca2ed14be69d2b303~tplv-k3u1fbpfcp-zoom-in-crop-mark_3024_0_0_0.awebp?" alt="image.png"></p><p>这个 Dependency Graph 是 Webpack 内部非常重要的过程信息之一，后续封装 Chunk、Code Splits、Tree-Shaking、Hot Module Replacement 等等，几乎所有功能都需要依赖这一信息实现。</p><p>Webpack5 之前，Dependency Graph 关系隐含在 Dependence、Module 对象的一系列属性中，例如：</p><ul><li>通过 <code>module.dependencies</code> 数组记录模块依赖对象；</li><li>通过 <code>dependency.module</code> 记录依赖对应的模块对象引用；</li><li>通过 <code>module.issuer</code> 记录父模块引用。</li></ul><p>这种设计存在很多问题，例如：模块之间的关系非常隐晦难懂；模块搜索算法与模块资源构建逻辑耦合在同一个 Class 实体内，<code>Module</code> 职责不单一且复杂度非常高；同一个 Module 对象无法在多个 Dependency Graph 之间共享，等等。</p><p>为此，Webpack5 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fblog%2F2020-10-10-webpack-5-release%2F%23module-and-chunk-graph" target="_blank" rel="noreferrer">重构</a> 了 Dependency Graph 的具体实现，将依赖关系从 <code>Dependence/Module</code> 类型中解耦出来，以一套独立的 Graph 数据结构记录模块间依赖关系，并基于 <code>Map/Set</code> 等原生模块实现更高效的模块搜索、校验、遍历算法。</p><h2 id="dependency-graph-数据结构详解" tabindex="-1">Dependency Graph 数据结构详解 <a class="header-anchor" href="#dependency-graph-数据结构详解" aria-label="Permalink to &quot;Dependency Graph 数据结构详解&quot;">​</a></h2><p>Webpack 5.0 之后的 Dependency Graph 涉及如下数据类型：</p><ul><li><code>ModuleGraph</code>：记录 Dependency Graph 信息的容器，记录构建过程中涉及到的所有 <code>module</code>、<code>dependency</code> 对象，以及这些对象互相之间的引用；</li><li><code>ModuleGraphConnection</code> ：记录模块间引用关系的数据结构，内部通过 <code>originModule</code> 属性记录引用关系中的父模块，通过 <code>module</code> 属性记录子模块；</li><li><code>ModuleGraphModule</code> ：<code>Module</code> 对象在 Dependency Graph 体系下的补充信息，包含模块对象的 <code>incomingConnections</code> —— 指向模块本身的 <code>ModuleGraphConnection</code> 集合，即谁引用了模块自身；<code>outgoingConnections</code> —— 该模块对外的依赖，即该模块引用了其他那些模块。</li></ul><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa6ad679ab4c4ce8944608dd23714d21~tplv-k3u1fbpfcp-zoom-in-crop-mark_3024_0_0_0.awebp?" alt="image.png"></p><p>这些类型之间关系的基本逻辑是：</p><ul><li><p><code>Compilation</code> 类内部会维护一个全局唯一的 <code>ModuleGraph</code> 实例对象；</p></li><li><p>每次解析出新模块后，将 Module、Dependency，以及模块之间的关系 —— <code>ModuleConnection</code> 记录到 <code>compilation.moduleGraph</code> 对象中；</p></li><li><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ModuleGraph</span></span></code></pre></div><p>除了记录依赖关系外，还提供了许多工具方法，方便使用者迅速读取出</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>module</span></span></code></pre></div><p>或</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dependency</span></span></code></pre></div><p>附加的信息。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ModuleGraph</span></span></code></pre></div><p>内部有两个关键属性：</p><ul><li>通过 <code>_dependencyMap</code> 属性记录 <code>Dependency</code> 对象与 <code>ModuleGraphConnection</code> 连接对象之间的映射关系，后续的处理中可以基于这层映射迅速找到 <code>Dependency</code> 实例对应的引用与被引用者；</li><li>通过 <code>_moduleMap</code> 属性记录 <code>Module</code> 与 <code>ModuleGraphModule</code> 之间的映射关系。</li></ul></li></ul><p>最终，通过 <code>ModuleGraph</code>、<code>ModuleGraphConnection</code>、<code>ModuleGraphModule</code> 三种类型的协作，在主体的 <code>Module</code>、<code>Dependency</code> 体系之外，记录模块之间的依赖信息。</p><p>依赖关系收集过程，主要发生在构建阶段的两个节点：</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/107d8f9e0c5647b8ae75e105fb7ccbfa~tplv-k3u1fbpfcp-zoom-in-crop-mark_3024_0_0_0.awebp?" alt="image.png"></p><ul><li><code>addDependency</code> ：webpack 从模块内容中解析出引用关系后，创建适当的 <code>Dependency</code> 子类并调用该方法记录到 <code>module</code> 实例；</li><li><code>handleModuleCreation</code> ：模块解析完毕后，webpack 遍历父模块的依赖集合，调用该方法创建 <code>Dependency</code> 对应的子模块对象，之后调用 <code>moduleGraph.setResolvedModule</code> 方法将父子引用信息记录到 <code>moduleGraph</code> 对象上。</li></ul><p><code>moduleGraph.setResolvedModule</code> 方法的逻辑大致为：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ModuleGraph</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    constructor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        /** </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> {Map&lt;Dependency, ModuleGraphConnection&gt;}</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._dependencyMap </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        /** </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> {Map&lt;Module, ModuleGraphModule&gt;}</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._moduleMap </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    /**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">     * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@param</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> {Module}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> originModule</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> the referencing module</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">     * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@param</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> {Dependency}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dependency</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> the referencing dependency</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">     * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@param</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> {Module}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> module</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> the referenced module</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">     * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@returns</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> {void}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">     */</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    setResolvedModule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">originModule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> connection</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ModuleGraphConnection</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            originModule,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            dependency,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            dependency.weak,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            dependency.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getCondition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        );</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._dependencyMap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(dependency, connection);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> connections</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_getModuleGraphModule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).incomingConnections;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        connections.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(connection);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> mgm</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">_getModuleGraphModule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(originModule);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (mgm.outgoingConnections </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            mgm.outgoingConnections </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        mgm.outgoingConnections.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(connection);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>主要更改了 <code>_dependencyMap</code> 及 <code>moduleGraphModule</code> 的出入 <code>connections</code> 属性，以此收集当前模块的上下游依赖关系。</p><h2 id="实例解析" tabindex="-1">实例解析 <a class="header-anchor" href="#实例解析" aria-label="Permalink to &quot;实例解析&quot;">​</a></h2><p>看个简单例子，对于下面的依赖关系：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30eb7b3522c14eb8a207c39f83cdd7d5~tplv-k3u1fbpfcp-zoom-in-crop-mark_3024_0_0_0.awebp?" alt="image.png"></p><p>Webpack 启动后：</p><ol><li>首先创建 <code>index.js</code> 对应的 <code>EntryDependency</code> 对象；</li><li>调用 <code>NormalModuleFactory</code> 创建 <code>EntryDependency</code> 对应的 <code>NormalModule</code> 实例；</li><li>执行 <code>compilation.handleModuleCreation</code>，经过解析、遍历 AST 等操作，最终得到 <code>a.js</code>、<code>b.js</code> 两个新 Dependency 对象；</li><li>调用 <code>NormalModuleFactory</code> 为这两个 Dependency 对象创建对应的 <code>NormalModule</code> 对象；</li><li>调用 <code>moduleGraph.setResolvedModule</code> 记录 <code>entry</code> 模块与 <code>a/b</code> 模块的依赖关系。</li></ol><p>最终生成如下数据结果：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ModuleGraph</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    _dependencyMap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        { </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            EntryDependency{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./src/index.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ModuleGraphConnection{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">                module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: NormalModule{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./src/index.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                // 入口模块没有引用者，故设置为 null</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">                originModule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">null</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            } </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        { </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            HarmonyImportSideEffectDependency{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./src/a.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ModuleGraphConnection{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">                module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: NormalModule{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./src/a.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">                originModule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: NormalModule{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./src/index.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            } </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        { </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            HarmonyImportSideEffectDependency{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./src/a.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ModuleGraphConnection{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">                module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: NormalModule{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./src/b.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">                originModule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: NormalModule{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./src/index.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            } </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    _moduleMap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        NormalModule{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./src/index.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ModuleGraphModule{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            incomingConnections</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) [</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                // entry 模块，对应 originModule 为null</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                ModuleGraphConnection{ module: NormalModule{request: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./src/index.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, originModule:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            ],</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            outgoingConnections</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) [</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                // 从 index 指向 a 模块</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                ModuleGraphConnection{ module: NormalModule{request: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./src/a.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, originModule: NormalModule{request: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./src/index.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} },</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                // 从 index 指向 b 模块</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                ModuleGraphConnection{ module: NormalModule{request: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./src/b.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, originModule: NormalModule{request: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./src/index.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        NormalModule{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./src/a.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ModuleGraphModule{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            incomingConnections</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                ModuleGraphConnection{ module: NormalModule{request: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./src/a.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, originModule: NormalModule{request: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./src/index.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            ],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // a 模块没有其他依赖，故 outgoingConnections 属性值为 undefined</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            outgoingConnections</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">undefined</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        NormalModule{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./src/b.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ModuleGraphModule{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            incomingConnections</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                ModuleGraphConnection{ module: NormalModule{request: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./src/b.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, originModule: NormalModule{request: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./src/index.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            ],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // b 模块没有其他依赖，故 outgoingConnections 属性值为 undefined</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            outgoingConnections</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">undefined</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>从上面的 Dependency Graph 可以看出，本质上 <code>ModuleGraph._moduleMap</code> 已经形成了一个有向无环图结构，其中字典 <code>_moduleMap</code> 的 key 为图的节点，对应 value <code>ModuleGraphModule</code> 结构中的 <code>outgoingConnections</code> 属性为图的边，则上例中从起点 <code>index.js</code> 出发沿 <code>outgoingConnections</code> 向前可遍历出图的所有顶点。</p><h2 id="作用" tabindex="-1">作用 <a class="header-anchor" href="#作用" aria-label="Permalink to &quot;作用&quot;">​</a></h2><p>Webpack5 中，关键字 <code>moduleGraph</code> 出现了 1000 多次，几乎覆盖了 <code>webpack/lib</code> 文件夹下的所有文件，其作用可见一斑。虽然出现的频率很高，但总的来说可以看出有两个主要作用：信息索引，以及辅助构建 ChunkGraph。</p><p>信息索引是 ModuleGraph 最重要的功能，在 <code>ModuleGraph</code> 类型中提供了很多实现 <code>module</code> / <code>dependency</code> 信息查询的工具函数，例如：</p><ul><li><code>getModule(dep: Dependency)</code> ：根据 <code>dep</code> 查找对应的 <code>module</code> 实例；</li><li><code>getOutgoingConnections(module)</code> ：查找 <code>module</code> 实例的所有依赖；</li><li><code>getIssuer(module: Module)</code> ：查找 <code>module</code> 在何处被引用；</li><li>等等。</li></ul><p>Webpack5 内部的许多插件、Dependency 子类、Module 子类的实现都需要用到这些工具函数查找特定模块、依赖的信息，例如：</p><ul><li><code>SplitChunksPlugin</code> 在优化 <code>chunks</code> 处理中，需要使用 <code>moduleGraph.getExportsInfo</code> 查询各个模块的 <code>exportsInfo</code> (模块导出的信息集合，与 tree-shaking 强相关，后续会单出一篇文章讲解)信息以确定如何分离 chunk。</li><li>在 <code>compilation.seal</code> 函数中，需要遍历 <code>entry</code> 对应的 dep 并调用 <code>moduleGraph.getModule</code> 获取完整的 <code>module</code> 定义</li><li>...</li></ul><p>所以，你在编写插件时，可以考虑适度参考 <code>webpack/lib/ModuleGraph.js</code> 中提供的方法，确认可以获取使用哪些函数，获取到你所需要的信息。</p><p>此外，在 Webpack 完成模块构建，进入「<strong>生成阶段</strong>」之后，会按一系列规则将模块逐一分配到不同 Chunk 对象中，在 Webpack4 时，这个过程主要围绕 <code>Chunk</code> 及 <code>ChunkGroup</code> 两个类型展开。</p><p>而 5.0 之后，对 Chunk 之间的依赖关系管理也做了一次大型 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fblog%2F2020-10-10-webpack-5-release%2F%23module-and-chunk-graph" target="_blank" rel="noreferrer">重构</a>：首先根据默认规则为每一个 <code>entry</code> 创建对应 Chunk 对象 ，之后调用 <code>buildChunkGraph</code> 方法，遍历 <code>moduleGraph</code> 对象，找出入口模块对应的所有 <code>Module</code> 对象，并将依赖关系转化为 ChunkGraph 对象，这一块的逻辑也特别复杂，我们放在下一章节讲解。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>综上，Webpack 构建过程中会持续收集模块之间的引用、被引用关系，并记录到 Dependency Graph 结构中，后续的 Chunk 封装、Code Split、Tree-Shaking 等，但凡需要分析模块关系的功能都强依赖于 Dependency Graph。</p><p>可以说，Dependency Graph 是 Webpack 底层最关键的模块地图数据，因此在 Webpack5 之后，Dependency Graph 结构被解耦抽离为以 <code>ModuleGraph</code> 为中心的若干独立类型，架构逻辑更合理，模块搜索、分析效率也得到不同程度优化，进而使得 Webpack5 构建速度也有明显提升。</p><p>学习 Dependency Graph，一是能帮助我们从数据结构角度，更深入理解 Webpack 模块读入与分析处理的过程；二是编写自定义插件时，可以通过 <code>ModuleGraph</code> 提供的若干工具函数了解模块之间的相互依赖关系。</p><h2 id="思考题" tabindex="-1">思考题 <a class="header-anchor" href="#思考题" aria-label="Permalink to &quot;思考题&quot;">​</a></h2><p>Dependency Graph 在 Webpack 的「构建阶段」与「生成阶段」分别扮演什么样的角色？</p>`,53),l=[p];function h(t,k,d,o,c,r){return a(),i("div",null,l)}const y=s(n,[["render",h]]);export{g as __pageData,y as default};
