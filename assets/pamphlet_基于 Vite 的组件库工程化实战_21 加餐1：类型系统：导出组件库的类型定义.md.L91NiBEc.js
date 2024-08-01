import{_ as s,c as a,o as p,a2 as n}from"./chunks/framework.D8Prfz4N.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"pamphlet/基于 Vite 的组件库工程化实战/21 加餐1：类型系统：导出组件库的类型定义.md","filePath":"pamphlet/基于 Vite 的组件库工程化实战/21 加餐1：类型系统：导出组件库的类型定义.md"}'),e={name:"pamphlet/基于 Vite 的组件库工程化实战/21 加餐1：类型系统：导出组件库的类型定义.md"},t=n(`<p>随着前端技术日趋复杂化，越来越多的项目都会选择使用TypeScript语言。TypeScript语言最显著的特点是提供了类型系统的支持。 类型系统有助于增加大型项目的可维护性。利用类型检查机制在编译期阶段可以发现更多的错误。从开发理论上讲，越早发现错误，解决错误的成本就会越低。这样的话就会使编写效率明显提高。这样的话也就可以更早下班，陪家人。</p><p>当然使用Typescript也不是只有好处。最大的问题是需要付出相应的学习成本，和多余的工作量用于定义类型系统。，因为对于使用Typescript 多了一套类型定义的心智负担。简单的类型还没什么也许只是给变量设置 string 或 number。其实也不跟你没什么卵用。</p><p>复杂的类型系统包含复杂的类型推导，泛型等内容，以下是 Vue 源码中 ractive 的返回对象。给大家一个截图大家可以感受一下。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef10aa25a839431b8ff89722c677de53~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>很多小伙伴都在过度迷恋强类型语言，其实大可不必。弱类型语言晚于强类型语言出现的。也就是说弱类型语言是强类型语言的进化版。就是为了增加开发效率才会引入弱类型。我的观点是，对于业务逻辑型开发并不太适合使用Typescript。</p><p>实际上，未必使用Typescript编写逻辑才能体现类型检查机制的好处。即使你使用 Javascript 语言开发，使用可 Typescript 编写的库也可以同样享受类型的收益。连接两者的的桥梁就是类型定义文件 d.ts。好了下面就到我们这节课的主题了为组件库添加类型定义。</p><h2 id="前置知识" tabindex="-1">前置知识 <a class="header-anchor" href="#前置知识" aria-label="Permalink to &quot;前置知识&quot;">​</a></h2><h3 id="类型定义文件的作用" tabindex="-1">类型定义文件的作用 <a class="header-anchor" href="#类型定义文件的作用" aria-label="Permalink to &quot;类型定义文件的作用&quot;">​</a></h3><p>下面我们用一个简单的例子来演示类型定义的作用。</p><p>创建一个文件 utils.ts</p><p>首先使用 Typescript 创建一个函数。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function add(a: number, b: number): number {</span></span>
<span class="line"><span>    return a + b</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>interface Person {</span></span>
<span class="line"><span>    name: string,</span></span>
<span class="line"><span>    age?: number</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>export { add, Person }</span></span></code></pre></div><p>如果在 index.ts 引用这个库，可以得到明确的类型提示。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { Person, add } from &#39;./utils&#39;</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>const a: Person = {</span></span>
<span class="line"><span>    name: &#39;abc&#39;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>add(1, 2)</span></span></code></pre></div><p>并且可以正常的进行类型检查的。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cca14f674153425fae0cc4517a39a9dc~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>但是如果将 utils.ts 编译为 utils.js 文件。这个时候类型定义就会丢失。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76dc13cfede84a8ba12116efc9984e6f~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>那调用的时候自然也不会有类型检查。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cfd961b295fa4623bc181c05c3733e15~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>可以看到调用 add 方法的时候，类型是 any。</p><p>如果想要保留类型定义，就需要生成类型定义文件，将类型保留到类型定义文件中 d.ts。这个时候编辑器就可以依据类型定义文件进行类型检查了。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1532941d53249a99bbfc8f849cbcb49~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>utils.ts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>declare function add(a: number, b: number): number;</span></span>
<span class="line"><span>interface Person {</span></span>
<span class="line"><span>    name: string;</span></span>
<span class="line"><span>    age?: number;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>export { add, Person };</span></span></code></pre></div><p>这个时候，在使用index.js的时候就可以看到类型定义了。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66c19c7ffb7a4c80a22eed9c519f2aa1~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>最后的结论，就是想得到类型定义的恩惠，未必一定要使用Typescript作为开发语言。比如： 使用 Javascript 语言开发，只要使用了Typescript 开发的库，一样可以享受到类型系统提示和检查。</p><h3 id="typescript导出类型定义" tabindex="-1">Typescript导出类型定义 <a class="header-anchor" href="#typescript导出类型定义" aria-label="Permalink to &quot;Typescript导出类型定义&quot;">​</a></h3><p>一个标准的 Typescript 项目导出类型定义，只需要在 tsconfig.json 中添加declaration 选项就可以实现。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f1f2e6251b3941b193dd818af9e2c0d3~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这个时候使用 tsc 编译的时候就可以导出类型定义。</p><h2 id="用户故事-userstory" tabindex="-1">用户故事(UserStory) <a class="header-anchor" href="#用户故事-userstory" aria-label="Permalink to &quot;用户故事(UserStory)&quot;">​</a></h2><p>为组件库添加类型定义，使组件具备类型提示功能</p><h2 id="任务分解-task" tabindex="-1">任务分解(Task) <a class="header-anchor" href="#任务分解-task" aria-label="Permalink to &quot;任务分解(Task)&quot;">​</a></h2><ul><li>配置 vite-plugin-dts 插件</li></ul><ul><li>生成软件包的类型定义入口</li></ul><ul><li>注册全局组件</li></ul><ul><li>编写模版脚本</li></ul><ul><li>测试类型系统</li></ul><h3 id="配置vite-plugin-dts插件" tabindex="-1">配置vite-plugin-dts插件 <a class="header-anchor" href="#配置vite-plugin-dts插件" aria-label="Permalink to &quot;配置vite-plugin-dts插件&quot;">​</a></h3><p>想让组件库具有类型定义，第一步必须要将组件库源码中的类型定义导出。虽然可以使用 tsc 导出类型定义。但是组件涉及 .vue 文件。所以需要 vite-plugin-dts 插件来完成。</p><p>在 vite.config.ts 中增加插件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm i vite-plugin-dts</span></span>
<span class="line"><span>import dts from &quot;vite-plugin-dts&quot;;</span></span>
<span class="line"><span>export const config = {</span></span>
<span class="line"><span>  plugins: [</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>    dts({</span></span>
<span class="line"><span>      outputDir: &quot;./dist/types&quot;,</span></span>
<span class="line"><span>      insertTypesEntry: false, // 插入TS 入口</span></span>
<span class="line"><span>      copyDtsFiles: true, // 是否将源码里的 .d.ts 文件复制到 outputDir</span></span>
<span class="line"><span>    }),</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  }</span></span></code></pre></div><p>这里面有三个配置</p><ul><li>outputDir： 是为了设置类型定义的位置</li></ul><ul><li>insertTypesEntry： 这个选项是为了生成入口，由于默认入口还不能完全满足要求所以选择 false。不接受导出。 后续会通过自定义脚本生成。</li></ul><ul><li><p>copyDtsFiles： 目的是可以自动复制源码中的类型定义，这个需要有。</p><ul><li>增加插件定义后，重新执行build后的效果</li><li><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm build</span></span></code></pre></div></li><li><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6213341d00184ae689ec1ebdfc156250~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></li></ul></li></ul><h3 id="定义类型定义入口" tabindex="-1">定义类型定义入口 <a class="header-anchor" href="#定义类型定义入口" aria-label="Permalink to &quot;定义类型定义入口&quot;">​</a></h3><p>类型定义入口文件是靠编写编译脚本实现的。如何编写这个脚本在后面介绍。现在大家先弄清生成后的样子。对于一个软件包来讲，类型定义文件的位置通过 package.json 的 types 属性确定。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74caf907d6af4d43b414a893e687cf3a~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>入口文件 smarty-ui.d.ts 其实就是引用了 entry.d.ts 。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export * from &#39;./types/entry&#39;</span></span>
<span class="line"><span>import SmartyUI from &#39;./types/entry&#39;</span></span>
<span class="line"><span>export default SmartyUI</span></span></code></pre></div><h3 id="注册全局组件" tabindex="-1">注册全局组件 <a class="header-anchor" href="#注册全局组件" aria-label="Permalink to &quot;注册全局组件&quot;">​</a></h3><p>什么是注册全局组件呢。举一个例子，在 Typescript 中一切变量都不能凭空捏造。比如在 node 全局作用域中需要某个全局变量的存在，也需要在全局作用域中注册。这样 Typescript 才认为他是合法的。对于组件库的组件，本来在全局进行注册，依然需要一个类型定义的声明。这样才可以，在 vue 文件中使用的时候可以找到对应的类型定义。这个声明的意思大概就是在所有的 vue 文件中存在某些全局组件。</p><p>以组件库为例，其中的 SButton 需要在 vue 文件中使用， 就需要注册为全局组件。实际上组件库中的所有组件都需要注册为全局组件。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b764efeffa64435e9b2d21434ac9fdef~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>具体写法为</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1204b6735de43aa88dd241359f65e96~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>这段描述，需要增加到类型定义中。</p><p>综合考虑前面需要生成类型入口，从实现上考虑这段代码比较适合写在入口文件中。这样便于脚本的编写。</p><h3 id="编写模版脚本" tabindex="-1">编写模版脚本 <a class="header-anchor" href="#编写模版脚本" aria-label="Permalink to &quot;编写模版脚本&quot;">​</a></h3><p>上面搞清了类型定义的格式，就需要编写一个脚本自动生成这部分代码。这部分代码主要围绕着入口文件的生成展开，其实就是利用模版来生成代码，方法和 CLI 工具章节中的模版生成代码方法一致这里就不赘述。</p><p>第一步，要实现声明全局组件。</p><p>首先需要获取全局组件的列表。这个功能可以通过对 entry.ts 的反射遍历完成。</p><p>type.ts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/**</span></span>
<span class="line"><span> * 获取组件列表</span></span>
<span class="line"><span> * 通过解析entry.ts模块获取组件数据</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>async function getComponents(input) {</span></span>
<span class="line"><span>    const entry = await import(input)</span></span>
<span class="line"><span>    return Object.keys(entry)</span></span>
<span class="line"><span>        .filter(k =&gt; k !== &#39;default&#39;)</span></span>
<span class="line"><span>        .map(k =&gt; ({</span></span>
<span class="line"><span>            name: entry[k].name,</span></span>
<span class="line"><span>            component: k</span></span>
<span class="line"><span>        }))</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>然后是编写一个入口代码模板，这个模版主要是需要遍历组件列表生成全局组件接口。</p><p>entry.d.ts.hbs</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export * from &#39;./types/entry&#39;</span></span>
<span class="line"><span>import SmartyUI from &#39;./types/entry&#39;</span></span>
<span class="line"><span>export default SmartyUI</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>declare module &#39;vue&#39; {</span></span>
<span class="line"><span>    export interface GlobalComponents {</span></span>
<span class="line"><span>        {{#each components}}</span></span>
<span class="line"><span>            {{name}}: typeof import(&quot;./types/entry&quot;).{{component}},</span></span>
<span class="line"><span>        {{/each}}</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>下一步是编写脚本生成类型定义文件。</p><p>type.ts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/**</span></span>
<span class="line"><span> * 生成类型定义文件 d.ts</span></span>
<span class="line"><span> * @param components </span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>export async function generateDTS(entryPath) {</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>    const template = resolve(__dirname, &#39;./entry.d.ts.hbs&#39;)</span></span>
<span class="line"><span>    const dts = resolve(__dirname, entryPath.replace(&#39;.esm.js&#39;, &#39;.d.ts&#39;))</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>    // 组件库数据</span></span>
<span class="line"><span>    const components = await getComponents(entryPath)</span></span>
<span class="line"><span>    // console.log(&#39;list&#39;, list)</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>    // 生成模版</span></span>
<span class="line"><span>    generateCode({</span></span>
<span class="line"><span>        components</span></span>
<span class="line"><span>    }, dts, template)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>然后把完成的入口生成函数加入到 build.ts 文件中。顺便增加入口的位置定义。</p><p>build.ts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ...</span></span>
<span class="line"><span> packageJson.types = &quot;smarty-ui.d.ts&quot;;</span></span>
<span class="line"><span>// ...</span></span>
<span class="line"><span>  // 生成配置DTS配置文件入口</span></span>
<span class="line"><span>  generateDTS(path.resolve(config.build.outDir, \`smarty-ui.esm.js\`),)</span></span></code></pre></div><p>最后的效果</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/087716ac2f7c446ca647e9a079b9b833~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h2 id="测试类型提示" tabindex="-1">测试类型提示 <a class="header-anchor" href="#测试类型提示" aria-label="Permalink to &quot;测试类型提示&quot;">​</a></h2><p>Typescript的类型提示支持VsCode原生。但是如果让 Vue 单文件也得到类型提示，就需要安装相应的插件。比如使用的 Volar 插件。</p><p><strong>这个插件目前我测试的结果仅支持 TS版本的Vue项目。这个大家一定要注意。</strong> 这是插件的限制并不是 Typescript 类型系统的限制。实际上是完全有可能实现 JS 项目中也具备 Vue 文件的类型提示。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bffe18884a054d7f900df9a572929a06~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>首先需要把新版本发布上线。</p><p>然后可以使用前面章节创建的 create-smarty 创建一个模版项目。当然这里面还需要升级模版项目引用最新版的 smary-ui-vite。这些过程就不再赘述。</p><p>这时候在新创建的项目中就可以看到类型提示了。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/523a0ca11b134bf5832549d780a4d6b1~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><h2 id="复盘" tabindex="-1">复盘 <a class="header-anchor" href="#复盘" aria-label="Permalink to &quot;复盘&quot;">​</a></h2><p>这节课我们主要讲了如何给组件库添加类型定义。类型定义可以在使用组件库的时候获得类型提示。提高使用者的开发体验。从而充分的享受 Typescript 类型系统带来的恩惠。</p><p>当然这个章节还有遗憾，就是现有版本只能支持对全量组件引入的类型提示。并不支持在分包下的类型提示。这个地方然叔就留给读者去考虑一下如何去实现。实际上原理是一致的，难点在于如何合理用脚本实现。也欢迎同学们将这个答案 PR 到咱们的项目中。</p><p><a href="https://github.com/smarty-team/smarty-admin" target="_blank" rel="noreferrer">https://github.com/smarty-team/smarty-admin</a></p><p>最后留一些思考题帮助大家复习，也欢迎在留言区讨论。</p><ul><li>类型定义文件的作用 ？</li></ul><ul><li>如何确定软件包 package 中的类型定义入口？</li></ul>`,93),i=[t];function l(c,o,r,d,u,m){return p(),a("div",null,i)}const g=s(e,[["render",l]]);export{h as __pageData,g as default};
