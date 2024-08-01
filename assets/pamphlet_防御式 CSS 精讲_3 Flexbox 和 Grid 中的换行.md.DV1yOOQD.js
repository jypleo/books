import{_ as s,c as i,o as a,a2 as n}from"./chunks/framework.D8Prfz4N.js";const c=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"pamphlet/防御式 CSS 精讲/3 Flexbox 和 Grid 中的换行.md","filePath":"pamphlet/防御式 CSS 精讲/3 Flexbox 和 Grid 中的换行.md"}'),p={name:"pamphlet/防御式 CSS 精讲/3 Flexbox 和 Grid 中的换行.md"},l=n(`<p>CSS Flexbox 和 Grid 布局技术已经成为现代 Web 布局的主流技术之一。它们的强大特性给 Web 开发者带来很多的便利，也能更好地让 Web 开发者以最少的代码量实现带有各种创意性的 Web 布局。</p><p>不过，Web 开发者在使用 CSS Flexbox 或 CSS Grid 来实现 Web 布局时总是会碰到一些问题，比如因为空间不足，不会自动换行。其实类似这样的问题，在我们编写代码的时候就可以完美规避掉。</p><p>在这节课中，我们就主要探讨下如何更好地处理 Flexbox 和 Grid 布局中的换行，避免因不换行而打破 Web 布局。</p><h2 id="flexbox-布局中的换行" tabindex="-1">Flexbox 布局中的换行 <a class="header-anchor" href="#flexbox-布局中的换行" aria-label="Permalink to &quot;Flexbox 布局中的换行&quot;">​</a></h2><p>CSS Flexbox 已然成为当前最受欢迎的布局技术之一。只需要在容器元素上显式设置 <code>display</code> 属性的值为 <code>flex</code> 或 <code>inline-flex</code> ，其子元素（包括其伪元素 <code>::before</code> 和 <code>::after</code> 以及匿名元素）会自动沿着 Flex 容器的主轴方向排成一行（或列）。但总是有一些因素会造成 Flex 容器无法容纳所有的 Flex 项目，比如：</p><ul><li>Web 内容的变多：原本设计稿模板提供的内容（Flex 项目）是三个，但服务端实际输出的内容可能比三个多；</li><li>终端设备视窗变小：Web 页面会在不同的终端设备上呈现，当终端设备的浏览器视窗宽度变窄时，也会造成 Flex 容器没有足够的空间来容纳所有 Flex 项目。</li></ul><p>此时，它将会直接打破 Web 布局：<strong>内容（Flex 项目）溢出容器（Flex 容器）或容器（Flex 容器）出现水平滚动条</strong>。如下图所示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db80d9d0d58c4a8aa8e7ed5043de167b~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><blockquote><p>Demo 地址：<a href="https://codepen.io/airen/full/oNPNrrp" target="_blank" rel="noreferrer">https://codepen.io/airen/full/oNPNrrp</a></p></blockquote><p>在使用 CSS Flexbox 构建 Web 布局时，一旦将容器声明为 Flex 容器之后，其所有 Flex 项目就会排列成一行（或列），即使 Flex 容器没有足够空间容纳所有 Flex 项目时，Flex 项目也不会自动换行。</p><p>所以说，这种行为是一种预知的行为，并不能说是渲染问题，只不过它和我们预期或者说与设计师期望的效果不同。要解决这个问题，很简单，<strong>只需要在 Flexbox 容器上显式设置</strong> <strong><code>flex-wrap</code></strong> <strong>的值为</strong> <strong><code>wrap</code></strong> <strong>或</strong> <strong><code>wrap-reverse</code>（其默认值为</strong> <strong><code>nowrap</code>）</strong> ：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c769297b16924cc89a17ba0becc2fd81~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><div class="language-CSS vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">CSS</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.card__content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">flex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    flex-wrap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">wrap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/279886278b8c462fb7f7764206ca1fb2~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><blockquote><p>Demo 地址：<a href="https://codepen.io/airen/full/poOvddB" target="_blank" rel="noreferrer">https://codepen.io/airen/full/poOvddB</a></p></blockquote><p>因此，<strong>在使用 CSS Flexbox 构建布局时，应该尽量在 Flexbox 容器上设置</strong> <strong><code>flex-wrap:wrap</code></strong> <strong>来避免意外布局的行为</strong> 。这样编写的 CSS 或者构建的 Web 布局具有一定的防御性：</p><div class="language-CSS vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">CSS</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 不具防御性的 CSS */</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.flex-container</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">flex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 或 inline-flex */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 具有防御性的 CSS */</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.flex-container</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">flex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 或 inline-flex */</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    flex-wrap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">wrap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>有一点需要注意是，<strong><code>flex-wrap: wrap</code></strong> <strong>(或</strong> <strong><code>flex-wrap: wrap-reverse</code>)只有在 Flex 容器没有足够空间容纳 Flex 项目时（即，同一 Flex 行所有 Flex 项目最小内容宽度总和大于 Flex 容器宽度），才会让 Flex 项目换行（或列）</strong> 。</p><p>虽然在 Flexbox 容器中显式设置 <code>flex-wrap: wrap</code> 可以预防布局溢出，但并不代表着在所有 Flexbox 容器上都设置，我们应该在具体使用的过程中有一个心理预判。比如下面这个是使用了 <code>flex-wrap: wrap</code> 的效果：</p><div class="language-HTML vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">HTML</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;card&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">img</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> src</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://picsum.photos/400/300?random=1&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> alt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;content&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;防御式 CSS&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;如何编写防御式 CSS，使你的代码变得更健壮！&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;阅读全文&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.card {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    display: flex;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    flex-wrap: wrap;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bcb3fac0498a46f0b66827ab5a57c09e~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>事实上，更好的效果应该是下面这种：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3e3c42b706d49f8b69d1a1a0cee9145~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><blockquote><p>Demo 地址：<a href="https://codepen.io/airen/full/vYzEWQp" target="_blank" rel="noreferrer">https://codepen.io/airen/full/vYzEWQp</a></p></blockquote><p>关键的 CSS 代码如下：</p><div class="language-CSS vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">CSS</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.card</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">flex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    flex-wrap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">wrap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    gap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">rem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.card</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;"> img</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    flex-shrink</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 防止图片因容器空间不足被挤压 */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.card</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> .content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    flex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 自动匹配 Flex 容器的剩余空间 */</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    min-width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.card</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;"> h4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    white-space</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">nowrap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    overflow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">hidden</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    text-overflow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ellipsis</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.card</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;"> p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    overflow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">hidden</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    text-overflow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ellipsis</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-webkit-box</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    -webkit-line-clamp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    -webkit-box-orient</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">vertical</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.card</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;"> button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    margin-block</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">auto</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 垂直居中 */</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    margin-inline-start</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">auto</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 居右对齐 */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="grid-布局中的换行" tabindex="-1">Grid 布局中的换行 <a class="header-anchor" href="#grid-布局中的换行" aria-label="Permalink to &quot;Grid 布局中的换行&quot;">​</a></h2><p>现在我们知道了，CSS Flexbox 布局时，在 Flexbox 容器上设置 <code>flex-wrap:wrap</code> 可以实现换行，让 Web 布局具有相应的防御性能力。不过，它存在一定的缺陷。就拿卡片列并排布局为例，<strong>当卡片（Flex 项目）显式设置了</strong> <strong><code>flex: 1 1 0%</code></strong> <strong>，并且卡片数量不是列数的倍数时，最后一排卡片宽度会自动扩展：</strong></p><div class="language-CSS vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">CSS</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.cards</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">flex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    flex-wrap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">wrap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    gap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">rem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.card</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    flex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7a858ab212943babe0a97a5a6c357d4~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><blockquote><p>Demo 地址：<a href="https://codepen.io/airen/full/RwYNyRB" target="_blank" rel="noreferrer">https://codepen.io/airen/full/RwYNyRB</a></p></blockquote><p>正如上面效果所示，它并没有打破 Web 布局，但和设计师所期望的效果还是有一定差异的：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/43ddba7f6e124a7e9af3c6e0897d06b6~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>当然，要在 CSS Flexbox 布局中规避这种现象也不是不可以，比如 @张鑫旭 老师的《<a href="https://www.zhangxinxu.com/wordpress/2019/08/css-flex-last-align/" target="_blank" rel="noreferrer">让CSS flex 布局最后一行列表左对齐的 N 种方法</a>》一文中就介绍了多种解决方案。只是相比于 CSS Grid 布局中的 RAM 布局方案要显得略差一点。</p><blockquote><p><strong>RAM 布局技术指的是在定义网格时，使用了</strong> <strong><code>repeat()</code></strong> <strong>和</strong> <strong><code>minmax()</code></strong> <strong>函数，并且在</strong> <strong><code>repeat()</code></strong> <strong>函数中使用</strong> <strong><code>auto-fit</code></strong> <strong>或</strong> <strong><code>auto-fill</code></strong> <strong>关键词来指定网格轨道数量</strong> 。</p></blockquote><p>RAM 布局技术对于<a href="https://codepen.io/airen/full/RwYNyRB" target="_blank" rel="noreferrer">上面示例</a>布局场景（称之为换行）具有天然的优势，而且它的使用也非常简单：</p><div class="language-CSS vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">CSS</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.cards</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">grid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    grid-template-columns</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">repeat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">auto-fit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">minmax</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">300</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">fr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">));</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    gap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">rem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c61d2ada4de44bcb8f6082f753c6977c~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><blockquote><p>Demo 地址：<a href="https://codepen.io/airen/full/rNZavqz" target="_blank" rel="noreferrer">https://codepen.io/airen/full/rNZavqz</a></p></blockquote><p>这里有几个关键的技术点简单向大家介绍一下。首先是用于定义网格轨道的 <code>repeat()</code> 和 <code>minmax()</code> 函数。当你发现网格轨道的尺寸相同时，就可以使用 <code>repeat()</code> 函数来定义，比如：</p><div class="language-CSS vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">CSS</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.grid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">grid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    grid-template-columns</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">fr</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">fr</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">fr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    /* 等同于 */</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    grid-template-columns</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">repeat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">fr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><code>minmax()</code> 可以给网格轨道尺寸指定一个 <code>MIN ~ MAX</code> 之间的区间值，比如：</p><div class="language-CSS vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">CSS</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.grid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    grid-template-columns</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">repeat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">minmax</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">300</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">fr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>注意，<code>fr</code> 是一个 CSS 单位，只可以用于 CSS Grid 中，将 <code>fr</code> 单位值和 <code>minmax()</code> 函数结合在一起定义网格轨道尺寸时是自动的 ，即<strong>网格轨道尺寸是自动匹配的（在一个范围内）</strong> 。</p><blockquote><p>有关于 <code>fr</code> 更详细的介绍，可以移步阅读《<a href="https://juejin.cn/book/7161370789680250917/section/7161624007702216735" target="_blank" rel="noreferrer">Grid 布局中的计算</a>》一文。</p></blockquote><p>前面提到了，RAM 布局技术有一个关键点，那就是要在 <code>repeat()</code> 函数中使用 <code>auto-fill</code> 或 <code>auto-fit</code> 关键词来替代具体的数值。它们会告诉浏览器处理网格轨道的大小和断行（或断列），以便当容器空间不足以容纳元素时，元素会自动换行（或列）而不会造成溢出。</p><p>不过， <code>auto-fill</code> 和 <code>auto-fit</code> 两者之间还是有一些细微差异的：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72fe9afbbf444b52ab513c48f5cc1ee1~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><ul><li><code>auto-fill</code> ：当使用 <code>minmax()</code> 函数时，<code>auto-fill</code> 在不改变网格项目宽度的情况下保留可用空间；</li><li><code>auto-fit</code> ：当使用 <code>minmax()</code> 函数时，<code>auto-fit</code> 关键词将扩展网格项目来填充可用空间。</li></ul><p>简单地说，<strong><code>auto-fit</code></strong> <strong>将扩展网格项目以填补可用空间，而</strong> <strong><code>auto-fill</code></strong> <strong>不会扩展网格项目。相反，<code>auto-fill</code>将保留可用的空间，而不改变网格项目的宽度</strong> 。</p><p>所以说，如果 <code>auto-fit</code> 和 <code>auto-fill</code> 使用不当，就有可能导致意想不到的结果。比如，在实际使用过程中，网格容器中有多个和仅有一个网格项目时，使用 <code>auto-fill</code> 与 <code>auto-fit</code> 的差异如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2626c877e984960b2862079796cfa88~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><p>我想你也已经感受到了该场景使用 RAM 技术优势所在。但它也有一定的缺陷，当浏览器视窗的宽度小于 <code>minmax(MIN, MAX)</code> 中的 <code>MIN</code> 值时，浏览器就会出现水平滚动条或溢出内容被裁剪：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1dd5c9f130541e7a476d17232551744~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><blockquote><p>Demo 地址：<a href="https://codepen.io/airen/full/rNZavqz" target="_blank" rel="noreferrer">https://codepen.io/airen/full/rNZavqz</a></p></blockquote><p>如果你不想让卡片溢出容器或容器出现水平滚动条，只需要在 <code>minmax(MIN, MAX)</code> 函数中嵌套 CSS 的比较函数（<code>min()</code> 、<code>max()</code> 、<code>clamp()</code>），可以让该布局更为完美。比如，你可以在 <code>minmax(MIN, MAX)</code> 函数中嵌套一个 <code>min()</code> 函数：</p><div class="language-CSS vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">CSS</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.grid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    grid-template-columns</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">repeat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">auto-fit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">minmax</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">min</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">300</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">fr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e41a4edcdc1d4d92b6c4a3914e3fb002~tplv-k3u1fbpfcp-zoom-1.image" alt="img"></p><blockquote><p>Demo 地址：<a href="https://codepen.io/airen/full/OJoPEqm" target="_blank" rel="noreferrer">https://codepen.io/airen/full/OJoPEqm</a></p></blockquote><p>如此一来，效果就比较完美了。如果你想更深入的了解这方面的知识，强烈建议你阅读《<a href="https://juejin.cn/book/7161370789680250917/section/7161624041885958151" target="_blank" rel="noreferrer">可用于 Grid 布局中的函数</a>》一文！</p><h2 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h2><p>文章中我们分别介绍了 CSS Flexbox 和 CSS Grid 布局中换行的技术方案。使用 Flexbox 布局时，请不要忘记在 Flex 容器中显式设置 <code>flex-wrap: wrap</code> ，这样做的好处是，你的布局不会因为动态内容输出（多输出）和视窗宽度变小，而打破布局的美感。</p><p>如果你使用 Grid 布局时，可以采用 RAM 布局技术来实现自动换行。只不过，Grid 的 RAM 自动换行更适用于多列相等的业务场景（等宽布局），如果不是等宽布局，则建议使用 CSS Flexbox 布局。</p>`,63),t=[l];function e(h,k,r,d,E,o){return a(),i("div",null,t)}const y=s(p,[["render",e]]);export{c as __pageData,y as default};
