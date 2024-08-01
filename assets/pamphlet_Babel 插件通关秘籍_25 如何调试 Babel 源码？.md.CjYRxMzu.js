import{_ as s,c as a,o as i,a2 as p}from"./chunks/framework.D8Prfz4N.js";const E=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"pamphlet/Babel 插件通关秘籍/25 如何调试 Babel 源码？.md","filePath":"pamphlet/Babel 插件通关秘籍/25 如何调试 Babel 源码？.md"}'),e={name:"pamphlet/Babel 插件通关秘籍/25 如何调试 Babel 源码？.md"},t=p(`<p>这节我们来调试下 Babel 源码，很多疑问大家就可以自己 debug 源码来解决了。</p><p>我们知道，Babel 的 API 是这样用的：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> parser</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;@babel/parser&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> traverse</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;@babel/traverse&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).default;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> generate</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;@babel/generator&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).default;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> source</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \`</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    (async function() {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        console.log(&#39;hello guangguang&#39;);</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    })();</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ast</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> parser.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">parse</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(source);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">traverse</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ast, {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    StringLiteral</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        path.node.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> path.node.value.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">replace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;guangguang&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;dongdong&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">code</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> generate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ast, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    sourceMaps: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(code);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">JSON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">stringify</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(map));</span></span></code></pre></div><p>parse、traverse、generate 三个步骤。</p><p>traverse 过程中要声明对什么 AST 做什么修改， AST 可以在 <a href="https://www.astexplorer.net/#/gist/228d4ae6991065e13d9efe353ade9e6c/2772707aa4a88cf45ffa2a5cf24ad4db8bca1451" target="_blank" rel="noreferrer">astexplorer.net</a> 来查看。</p><p>比如可以看到这部分是 StringLiteral 字符串字面量，修改它的 value 即可。</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c39dd8b87cfc47da9bad5cf7d0c45261~tplv-k3u1fbpfcp-watermark.image?" alt=""></p><p>我们安装依赖之后跑一下：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ccb5ac952ed44bd1aad1a76ba0d6a791~tplv-k3u1fbpfcp-watermark.image?" alt=""></p><p>可以看到打印了修改以后的代码和 sourcemap。</p><p>我们的目标不是学怎么用 Babel 的 api，而是学怎么调试它的源码。</p><p>接下来我们创建个调试配置：</p><p>点击这里快速创建 launch.json 调试配置文件：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/75d6a18ae1574d408da2a290214d962b~tplv-k3u1fbpfcp-watermark.image?" alt=""></p><p>点击 add configuration 创建一个 nodejs 的调试配置：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15c4da670fb843748bbc934ea8f5eeb6~tplv-k3u1fbpfcp-watermark.image?" alt=""></p><p>设置 console 为内置的 terminal：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;node&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;request&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;launch&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Launch Program&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;skipFiles&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&lt;node_internals&gt;/**&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;console&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;integratedTerminal&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;program&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;\${workspaceFolder}/index.js&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>这样日志是输出在集成的 Terminal 里的，不然输出在 Debug Console，颜色之类的信息就都没了。</p><p>打几个断点，然后跑调试：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/378726d9d47a4eea9b7d514ce22a9e68~tplv-k3u1fbpfcp-watermark.image?" alt=""></p><p>可以看到 parse 之后的 AST，遍历修改时的节点，生成的目标代码。</p><p>然后我们进入这几个包内部看下源码。</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1eb3afe71f534b788b66d3c30efd52f1~tplv-k3u1fbpfcp-watermark.image?" alt=""></p><p>你会发现调试的是这几个包编译之后的代码：</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cff02ac534e64fdf979a036de3dbcc0c~tplv-k3u1fbpfcp-watermark.image?" alt=""></p><p>如果有 generator、async await 之类的，调试编译后的代码根本绕不明白。</p><p>怎么调试最初的源码呢？</p><p>sourcemap！</p><p>但是你去 node_modules 下看下这些包，会发现它们已经有 sourcemap 了，而且也关联了：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17d4f913b3de455c8bf5899c35c2f1eb~tplv-k3u1fbpfcp-watermark.image?" alt=""></p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/edb41a15ed714aa99e9fcd0b0fd4294f~tplv-k3u1fbpfcp-watermark.image?" alt=""></p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff2d5bb6a33c417e8576df540edc0f84~tplv-k3u1fbpfcp-watermark.image?" alt=""></p><p>那为什么调试的时候调试的不是源码呢？</p><p>这是因为 VSCode 的一个默认配置导致 sourcemap 不会生效。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07d47f246ddf476e981d6f76bc08076a~tplv-k3u1fbpfcp-watermark.image?" alt=""></p><p>resolveSourceMapLocations 是配置去哪里查找 sourcemap，VSCode Node Debugger 默认不会查找 node_modules 下的 sourcemap。</p><p>所以就算 babel 的包里带了 sourcemap 也不会生效。</p><p>把它去掉之后再跑一下：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/436c7e76571947719616b656b5b925b3~tplv-k3u1fbpfcp-watermark.image?" alt=""></p><p>你会发现现在调试的就是 babel 的 ts 源码了。</p><p>直接调试可读性更强的 ts 源码，理清它的实现逻辑就简单很多了。</p><p>而且，你还可以更进一步，调试 babel 源码的时候让 VSCode 直接定位到源码的目录：</p><p>这个只要 sourcemap 到的文件路径在当前 workspace 下就行。</p><p>看下现在的路径：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f34ecdfeea6c4bfe9514aec04b5c7cd2~tplv-k3u1fbpfcp-watermark.image?" alt=""></p><p>虽然调试的是源码的 ts 了，但是路径是 node_modules 包下的。</p><p>我们可以把 babel 项目下下来和测试项目放在一个 workspace 下：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c7090cd9398422aa1ffe2c4cbe39a78~tplv-k3u1fbpfcp-watermark.image?" alt=""></p><p>然后去 node_modules 下手动替换下 sourcemap 的 sources 路径：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/316475c535cf4fc3b3dfdf1b23eca957~tplv-k3u1fbpfcp-watermark.image?" alt=""></p><p>我这里是把 ../src/ 替换成了 /Users/guang/code/babel-debug/babel/packages/babel-parser/src/</p><p>然后在新的 workspace 创建个调试配置，这时目录改了，要指定下 cwd：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/635e3ce236874711a1efcca75a072076~tplv-k3u1fbpfcp-watermark.image?" alt=""></p><p>再跑调试：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8171019cb7eb442f889b99d4e8c16c97~tplv-k3u1fbpfcp-watermark.image?" alt=""></p><p>你就会发现现在 sourcemap 到的路径直接是 babel 源码下的文件路径了，然后调试的时候 VSCode 也会直接打开对应文件。</p><p>更重要的是，现在你可以直接在 babel 源码里打断点了，代码执行到那里就会断住：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76b8d282a9ee4d5f8fb5189b40e2a02e~tplv-k3u1fbpfcp-watermark.image?" alt=""></p><p>至此，我们就能愉快的调试 babel 源码了。</p><p>我们调试了 @babel/parser 包的源码，其余的包也是一样的方式。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>这节我们调试了 Babel 的源码。</p><p>Babel 分为 parse、traverse（或者叫 transform）、generate 三个阶段，分别对应 @babel/parser、@babel/traverse、@babel/generator 的包。</p><p>可以用 VSCode Debugger 来调试它。</p><p>直接断点调试会发现调试的是编译后的代码，但是 node_modules 下的这几个包都是有 sourcemap 的。</p><p>这是因为默认 resolveSourceMapLocations 排除了 node_modules 下的 sourcemap，去掉它重新跑调试，就可以直接调试 ts 源码了。</p><p>如果想调试的时候直接调试 babel 源码目录的文件，可以把测试项目和 babel 项目放到一个 workspace，然后改下 sourcemap 文件里的 sources 路径就可以了。这样就可以直接在 babel 源码里打断点。</p><p>当你对 babel 某部分功能的实现感兴趣的时候，就可以自己调试源码了！</p>`,69),n=[t];function l(k,h,r,c,d,g){return i(),a("div",null,n)}const b=s(e,[["render",l]]);export{E as __pageData,b as default};
