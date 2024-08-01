import{_ as s,c as n,o as a,a2 as p}from"./chunks/framework.D8Prfz4N.js";const b=JSON.parse('{"title":"6.进阶篇：布局样式","description":"","frontmatter":{},"headers":[],"relativePath":"pamphlet/玩转css艺术之美/6.进阶篇：布局样式.md","filePath":"pamphlet/玩转css艺术之美/6.进阶篇：布局样式.md"}'),l={name:"pamphlet/玩转css艺术之美/6.进阶篇：布局样式.md"},e=p(`<h1 id="_6-进阶篇-布局样式" tabindex="-1">6.进阶篇：布局样式 <a class="header-anchor" href="#_6-进阶篇-布局样式" aria-label="Permalink to &quot;6.进阶篇：布局样式&quot;">​</a></h1><h3 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h3><p>开发每一张网页都离不开布局，基于良好布局打下基础，才能使后续的开发更顺利。当然不能停留在<code>IExplorer时代</code>那种局限思维上，没办法解决的布局都用JS实现😂。今时不同往日，现代CSS属性能更好地快速实现各种布局，节约更多时间去摸鱼😉。</p><h3 id="布局" tabindex="-1">布局 <a class="header-anchor" href="#布局" aria-label="Permalink to &quot;布局&quot;">​</a></h3><p>为了方便记忆，笔者按照属性聚合度将跟布局有关系的属性分类，并划分为以下8种基本布局。</p><ul><li><p>普通布局：<code>display:block/inline</code></p></li><li><p>浮动布局：<code>float:left/right</code></p></li><li><p>定位布局：<code>position:relative/absolute/fixed</code>、<code>left/right/top/bottom/z-index</code></p></li><li><p>表格布局：<code>table系列属性</code></p></li><li><p>弹性布局：<code>display:flex/inline-flex</code>、<code>flex系列属性</code></p></li><li><p>多列布局：<code>column系列属性</code></p></li><li><p>格栅布局：<code>display:grid/inline-grid</code>、<code>grid系列属性</code></p></li><li><p>响应式布局：<code>em/rem/vw/vh/vmin/vmax</code>、<code>媒体查询</code></p></li></ul><p>众多跟布局有关的属性，到底要如何结合才能完成想要的布局，具体开发中使用何种属性更为合适，这些都是布局方式中必须得面对的问题。本章也着重从常用的布局技巧说起，怎么样的属性搭配才能玩转网页排版。</p><p>在8种基本布局中，笔者还是比较推荐<strong>浮动布局</strong>、<strong>定位布局</strong>和<strong>弹性布局</strong>，熟悉这三种布局基本上能解决大部分网页排版问题。<strong>表格布局</strong>尽量不要使用，在第3章<strong>回流重绘</strong>有提及，可能很小的一个改动就会造成整个<code>&lt;table&gt;</code>回流；<strong>格栅布局</strong>其实是一个很不错的布局方式，无奈兼容性不是很好，所以笔者比较少研究，后续兼容性上来了笔者会更新本章格栅布局相关内容。</p><p><code>弹性布局</code>是一个好东西，完全掌握后能创造出很多意想不到的事情。玩转<strong>CSS神操作骚技巧</strong>离不开布局方式，更离不开<code>弹性布局</code>。若还没接触过<code>弹性布局</code>相关属性的同学，可自行百度，网上一搜一大把就感觉没必要在此详细讲解了，贴上一篇还不错的的教程<a href="https://juejin.im/post/6844904116141948936" target="_blank" rel="noreferrer">《深度解析CSS弹性布局》</a>和<a href="https://juejin.im/post/6866914148387651592" target="_blank" rel="noreferrer">《48张小图带你领略Flex布局之美》</a>。若不能理解，推荐使用这个网站<a href="https://xluos.github.io/demo/flexbox" target="_blank" rel="noreferrer">Flexbox</a>同步查看相关属性的表现状态，相信也能快速学习到<code>弹性布局</code>的好玩之处。</p><p>清除浮动</p><p>在各种经典布局方式中，可能会结合<code>浮动布局</code>相关属性。在第4章<strong>盒模型</strong>有提及，使用<code>float</code>会使节点脱流导致父节点高度坍塌，若不对父节点显式声明高度则很有必要给父节点清除浮动。定义以下<code>clearfix</code>用于清除浮动，给父节点添加即可。值得注意，<code>clearfix</code>已占用<code>::after</code>，所以使用<code>clearfix</code>的父节点就不能再声明<code>::after</code>了，可改用<code>::before</code>。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.clearfix::after {</span></span>
<span class="line"><span>    display: block;</span></span>
<span class="line"><span>    visibility: hidden;</span></span>
<span class="line"><span>    clear: both;</span></span>
<span class="line"><span>    height: 0;</span></span>
<span class="line"><span>    font-size: 0;</span></span>
<span class="line"><span>    content: &quot;&quot;;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>笔者就不详细讲解清除浮动的原理和分析了，有兴趣的同学请查看<a href="https://stackoverflow.com/questions/211383/what-methods-of-clearfix-can-i-use" target="_blank" rel="noreferrer">Clearfix</a>。</p><h3 id="全屏布局" tabindex="-1">全屏布局 <a class="header-anchor" href="#全屏布局" aria-label="Permalink to &quot;全屏布局&quot;">​</a></h3><p>经典的<code>全屏布局</code>由顶部、底部、主体三部分组成，其特点为<code>三部分左右满屏拉伸</code>、<code>顶部底部高度固定</code>和<code>主体高度自适应</code>，主要应用在主体布局。该布局很常见，也是大部分Web应用主体的主流布局。通常使用<code>&lt;header&gt;</code>、<code>&lt;footer&gt;</code>和<code>&lt;main&gt;</code>三个标签语义化排版，<code>&lt;main&gt;</code>内还可插入<code>&lt;aside&gt;</code>作为侧栏。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/png/2985494/1607320503113-0d33785e-d20d-462d-94d2-c84b66a2955f.png" alt="img"></p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div class=&quot;fullscreen-layout&quot;&gt;</span></span>
<span class="line"><span>    &lt;header&gt;&lt;/header&gt;</span></span>
<span class="line"><span>    &lt;main&gt;&lt;/main&gt;</span></span>
<span class="line"><span>    &lt;footer&gt;&lt;/footer&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span></code></pre></div><p><strong>position + left/right/top/bottom</strong></p><p>顶部、底部和主体声明<code>left:0</code>和<code>right:0</code>将其左右部分满屏拉伸；顶部和底部声明<code>top:0</code>和<code>bottom:0</code>分别将其吸顶和吸底，并声明俩高度为固定值；将主体的<code>top</code>和<code>bottom</code>分别声明为顶部高度和底部高度。</p><p>移动端基本都是以该布局为主，不信打开你常用的App瞧瞧。实现起来比较简单，基于其左右满屏拉伸这个特点下手即可。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.fullscreen-layout {</span></span>
<span class="line"><span>    position: relative;</span></span>
<span class="line"><span>    width: 400px;</span></span>
<span class="line"><span>    height: 400px;</span></span>
<span class="line"><span>    header,</span></span>
<span class="line"><span>    footer,</span></span>
<span class="line"><span>    main {</span></span>
<span class="line"><span>        position: absolute;</span></span>
<span class="line"><span>        left: 0;</span></span>
<span class="line"><span>        right: 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    header {</span></span>
<span class="line"><span>        top: 0;</span></span>
<span class="line"><span>        height: 50px;</span></span>
<span class="line"><span>        background-color: #f66;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    footer {</span></span>
<span class="line"><span>        bottom: 0;</span></span>
<span class="line"><span>        height: 50px;</span></span>
<span class="line"><span>        background-color: #66f;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    main {</span></span>
<span class="line"><span>        top: 50px;</span></span>
<span class="line"><span>        bottom: 50px;</span></span>
<span class="line"><span>        background-color: #3c9;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>flex</strong></p><p>使用flex实现会更简洁。<code>display:flex</code>默认会令子节点横向排列，需声明<code>flex-direction:column</code>改变子节点排列方向为纵向排列；顶部和底部高度固定，所以主体声明<code>flex:1</code>让高度自适应即可。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.fullscreen-layout {</span></span>
<span class="line"><span>    display: flex;</span></span>
<span class="line"><span>    flex-direction: column;</span></span>
<span class="line"><span>    width: 400px;</span></span>
<span class="line"><span>    height: 400px;</span></span>
<span class="line"><span>    header {</span></span>
<span class="line"><span>        height: 50px;</span></span>
<span class="line"><span>        background-color: #f66;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    footer {</span></span>
<span class="line"><span>        height: 50px;</span></span>
<span class="line"><span>        background-color: #66f;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    main {</span></span>
<span class="line"><span>        flex: 1;</span></span>
<span class="line"><span>        background-color: #3c9;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><ul><li>在线演示：<a href="https://codepen.io/JowayYoung/pen/xxVzdoz" target="_blank" rel="noreferrer">Here</a></li><li>在线源码：<a href="https://github.com/JowayYoung/idea-css/blob/master/icss/src/components/layout/%E4%BD%BF%E7%94%A8flexbox%E6%8E%92%E7%89%88%E5%90%84%E7%A7%8D%E5%B8%83%E5%B1%80.vue" target="_blank" rel="noreferrer">Here</a></li></ul><h3 id="多列布局" tabindex="-1">多列布局 <a class="header-anchor" href="#多列布局" aria-label="Permalink to &quot;多列布局&quot;">​</a></h3><h5 id="两列布局" tabindex="-1">两列布局 <a class="header-anchor" href="#两列布局" aria-label="Permalink to &quot;两列布局&quot;">​</a></h5><p>经典的<code>两列布局</code>由左右两列组成，其特点为<code>一列宽度固定</code>、<code>另一列宽度自适应</code>和<code>两列高度固定且相等</code>。以下以左列宽度固定和右列宽度自适应为例，反之同理。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/png/2985494/1607320503158-a98abe43-e2a2-4703-8a5b-b9f8daae2b2c.png" alt="img"></p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div class=&quot;two-column-layout&quot;&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;left&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;right&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span></code></pre></div><p><strong>float + margin-left/right</strong></p><p>左列声明<code>float:left</code>和固定宽度，由于<code>float</code>使节点脱流，右列需声明<code>margin-left</code>为左列宽度，以保证两列不会重叠。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.two-column-layout {</span></span>
<span class="line"><span>    width: 400px;</span></span>
<span class="line"><span>    height: 400px;</span></span>
<span class="line"><span>    .left {</span></span>
<span class="line"><span>        float: left;</span></span>
<span class="line"><span>        width: 100px;</span></span>
<span class="line"><span>        height: 100%;</span></span>
<span class="line"><span>        background-color: #f66;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .right {</span></span>
<span class="line"><span>        margin-left: 100px;</span></span>
<span class="line"><span>        height: 100%;</span></span>
<span class="line"><span>        background-color: #66f;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>overflow + float</strong></p><p>左列声明同上，右列声明<code>overflow:hidden</code>使其形成BFC区域与外界隔离，详情可回看第4章<strong>盒模型</strong>。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.two-column-layout {</span></span>
<span class="line"><span>    width: 400px;</span></span>
<span class="line"><span>    height: 400px;</span></span>
<span class="line"><span>    .left {</span></span>
<span class="line"><span>        float: left;</span></span>
<span class="line"><span>        width: 100px;</span></span>
<span class="line"><span>        height: 100%;</span></span>
<span class="line"><span>        background-color: #f66;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .right {</span></span>
<span class="line"><span>        overflow: hidden;</span></span>
<span class="line"><span>        height: 100%;</span></span>
<span class="line"><span>        background-color: #66f;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>flex</strong></p><p>使用flex实现会更简洁。左列声明固定宽度，右列声明<code>flex:1</code>自适应宽度。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.two-column-layout {</span></span>
<span class="line"><span>    display: flex;</span></span>
<span class="line"><span>    width: 400px;</span></span>
<span class="line"><span>    height: 400px;</span></span>
<span class="line"><span>    .left {</span></span>
<span class="line"><span>        width: 100px;</span></span>
<span class="line"><span>        background-color: #f66;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .right {</span></span>
<span class="line"><span>        flex: 1;</span></span>
<span class="line"><span>        background-color: #66f;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><ul><li>在线演示：<a href="https://codepen.io/JowayYoung/pen/xxVzdoz" target="_blank" rel="noreferrer">Here</a></li><li>在线源码：<a href="https://github.com/JowayYoung/idea-css/blob/master/icss/src/components/layout/%E4%BD%BF%E7%94%A8flexbox%E6%8E%92%E7%89%88%E5%90%84%E7%A7%8D%E5%B8%83%E5%B1%80.vue" target="_blank" rel="noreferrer">Here</a></li></ul><h5 id="三列布局" tabindex="-1">三列布局 <a class="header-anchor" href="#三列布局" aria-label="Permalink to &quot;三列布局&quot;">​</a></h5><p>经典的<code>三列布局</code>由左中右三列组成，其特点为<code>连续两列宽度固定</code>、<code>剩余一列宽度自适应</code>和<code>三列高度固定且相等</code>。以下以左中列宽度固定和右列宽度自适应为例，反之同理。整体的实现原理与上述<strong>两列布局</strong>一致，以下就不啰嗦了，直接贴代码。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/png/2985494/1607320503073-bce8b790-3b82-4cd2-89f2-d3d28354a736.png" alt="img"></p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div class=&quot;three-column-layout&quot;&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;left&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;center&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;right&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span></code></pre></div><p>为了让右列宽度自适应计算，就不使用<code>float + margin-left</code>的方式了，若使用<code>margin-left</code>还得结合左中列宽度计算。</p><p><strong>overflow + float</strong></p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.three-column-layout {</span></span>
<span class="line"><span>    width: 400px;</span></span>
<span class="line"><span>    height: 400px;</span></span>
<span class="line"><span>    .left {</span></span>
<span class="line"><span>        float: left;</span></span>
<span class="line"><span>        width: 50px;</span></span>
<span class="line"><span>        height: 100%;</span></span>
<span class="line"><span>        background-color: #f66;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .center {</span></span>
<span class="line"><span>        float: left;</span></span>
<span class="line"><span>        width: 100px;</span></span>
<span class="line"><span>        height: 100%;</span></span>
<span class="line"><span>        background-color: #66f;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .right {</span></span>
<span class="line"><span>        overflow: hidden;</span></span>
<span class="line"><span>        height: 100%;</span></span>
<span class="line"><span>        background-color: #3c9;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>flex</strong></p><p>使用flex实现会更简洁，还是flex大法好。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.three-column-layout {</span></span>
<span class="line"><span>    display: flex;</span></span>
<span class="line"><span>    width: 400px;</span></span>
<span class="line"><span>    height: 400px;</span></span>
<span class="line"><span>    .left {</span></span>
<span class="line"><span>        width: 50px;</span></span>
<span class="line"><span>        background-color: #f66;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .center {</span></span>
<span class="line"><span>        width: 100px;</span></span>
<span class="line"><span>        background-color: #66f;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .right {</span></span>
<span class="line"><span>        flex: 1;</span></span>
<span class="line"><span>        background-color: #3c9;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><ul><li>在线演示：<a href="https://codepen.io/JowayYoung/pen/xxVzdoz" target="_blank" rel="noreferrer">Here</a></li><li>在线源码：<a href="https://github.com/JowayYoung/idea-css/blob/master/icss/src/components/layout/%E4%BD%BF%E7%94%A8flexbox%E6%8E%92%E7%89%88%E5%90%84%E7%A7%8D%E5%B8%83%E5%B1%80.vue" target="_blank" rel="noreferrer">Here</a></li></ul><h5 id="圣杯布局与双飞翼布局" tabindex="-1">圣杯布局与双飞翼布局 <a class="header-anchor" href="#圣杯布局与双飞翼布局" aria-label="Permalink to &quot;圣杯布局与双飞翼布局&quot;">​</a></h5><p>经典的<code>圣杯布局</code>和<code>双飞翼布局</code>都是由左中右三列组成，其特点为<code>左右两列宽度固定</code>、<code>中间一列宽度自适应</code>和<code>三列高度固定且相等</code>。其实也是上述<strong>两列布局</strong>和<strong>三列布局</strong>的变体，整体的实现原理与上述<code>N列布局</code>一致，可能就是一些细节需注意。</p><p><code>圣杯布局</code>和<code>双飞翼布局</code>在大体相同下也存在一点不同，区别在于<code>双飞翼布局</code>中间列需插入一个子节点。在常规的实现方式中也是在这个中间列里做文章，<code>如何使中间列内容不被左右列遮挡</code>。</p><ul><li><p>相同</p></li><li><ul><li>中间列放首位且声明其宽高占满父节点</li><li>被挤出的左右列使用<code>float</code>和<code>margin负值</code>将其拉回与中间列处在同一水平线上</li></ul></li><li><p>不同</p></li><li><ul><li>圣杯布局：父节点声明<code>padding</code>为左右列留出空位，将左右列固定在空位上</li><li>双飞翼布局：中间列插入子节点并声明<code>margin</code>为左右列让出空位，将左右列固定在空位上</li></ul></li></ul><p><img src="https://cdn.nlark.com/yuque/0/2020/png/2985494/1607320503225-d1570e99-652f-429b-bc37-35918fa86db9.png" alt="img"></p><p>圣杯布局<strong>float + margin-left/right + padding-left/right</strong></p><p>由于浮动节点在位置上不能高于前面或平级的非浮动节点，否则会导致浮动节点下沉。因此在编写HTML结构时，将中间列节点挪到右列节点后面。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div class=&quot;grail-layout&quot;&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;left&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;right&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;center&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>.grail-layout {</span></span>
<span class="line"><span>    padding: 0 100px;</span></span>
<span class="line"><span>    width: 400px;</span></span>
<span class="line"><span>    height: 400px;</span></span>
<span class="line"><span>    .left {</span></span>
<span class="line"><span>        float: left;</span></span>
<span class="line"><span>        margin-left: -100px;</span></span>
<span class="line"><span>        width: 100px;</span></span>
<span class="line"><span>        height: 100%;</span></span>
<span class="line"><span>        background-color: #f66;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .right {</span></span>
<span class="line"><span>        float: right;</span></span>
<span class="line"><span>        margin-right: -100px;</span></span>
<span class="line"><span>        width: 100px;</span></span>
<span class="line"><span>        height: 100%;</span></span>
<span class="line"><span>        background-color: #66f;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .center {</span></span>
<span class="line"><span>        height: 100%;</span></span>
<span class="line"><span>        background-color: #3c9;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>双飞翼布局<strong>float + margin-left/right</strong></p><p>HTML结构大体同上，只是在中间里里插入一个子节点<code>&lt;div&gt;</code>。根据两者区别，CSS声明会与上述<code>圣杯布局</code>有一点点出入，可观察对比找出不同地方。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div class=&quot;grail-layout&quot;&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;left&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;right&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;center&quot;&gt;</span></span>
<span class="line"><span>        &lt;div&gt;&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>.grail-layout {</span></span>
<span class="line"><span>    width: 400px;</span></span>
<span class="line"><span>    height: 400px;</span></span>
<span class="line"><span>    .left {</span></span>
<span class="line"><span>        float: left;</span></span>
<span class="line"><span>        width: 100px;</span></span>
<span class="line"><span>        height: 100%;</span></span>
<span class="line"><span>        background-color: #f66;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .right {</span></span>
<span class="line"><span>        float: right;</span></span>
<span class="line"><span>        width: 100px;</span></span>
<span class="line"><span>        height: 100%;</span></span>
<span class="line"><span>        background-color: #66f;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .center {</span></span>
<span class="line"><span>        margin: 0 100px;</span></span>
<span class="line"><span>        height: 100%;</span></span>
<span class="line"><span>        background-color: #3c9;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>圣杯布局/双飞翼布局<strong>flex</strong></p><p>使用flex实现<code>圣杯布局/双飞翼布局</code>可忽略上述分析，左右两列宽度固定，中间列宽度自适应。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div class=&quot;grail-layout&quot;&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;left&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;center&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;right&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>.grail-layout {</span></span>
<span class="line"><span>    display: flex;</span></span>
<span class="line"><span>    width: 400px;</span></span>
<span class="line"><span>    height: 400px;</span></span>
<span class="line"><span>    .left {</span></span>
<span class="line"><span>        width: 100px;</span></span>
<span class="line"><span>        background-color: #f66;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .center {</span></span>
<span class="line"><span>        flex: 1;</span></span>
<span class="line"><span>        background-color: #3c9;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .right {</span></span>
<span class="line"><span>        width: 100px;</span></span>
<span class="line"><span>        background-color: #66f;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><ul><li>在线演示：<a href="https://codepen.io/JowayYoung/pen/xxVzdoz" target="_blank" rel="noreferrer">Here</a></li><li>在线源码：<a href="https://github.com/JowayYoung/idea-css/blob/master/icss/src/components/layout/%E4%BD%BF%E7%94%A8flexbox%E6%8E%92%E7%89%88%E5%90%84%E7%A7%8D%E5%B8%83%E5%B1%80.vue" target="_blank" rel="noreferrer">Here</a></li></ul><h5 id="均分布局" tabindex="-1">均分布局 <a class="header-anchor" href="#均分布局" aria-label="Permalink to &quot;均分布局&quot;">​</a></h5><p>经典的<code>均分布局</code>由多列组成，其特点为<code>每列宽度相等</code>和<code>每列高度固定且相等</code>。总体来说，也是最简单的经典布局，由于每列宽度相等，所以很容易找到合适的方式处理。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/png/2985494/1607320503056-d2317ab7-4d8e-4d0e-94d2-3e777b33dfa1.png" alt="img"></p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div class=&quot;average-layout&quot;&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;one&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;two&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;three&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;four&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>.one {</span></span>
<span class="line"><span>    background-color: #f66;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.two {</span></span>
<span class="line"><span>    background-color: #66f;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.three {</span></span>
<span class="line"><span>    background-color: #f90;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.four {</span></span>
<span class="line"><span>    background-color: #09f;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>float + width</strong></p><p>每列宽度声明为相等的百分比，若有4列则声明<code>width:25%</code>。N列就用公式<code>100 / n</code>求出最终百分比宽度，记得保留2位小数，懒人还可用<code>width:calc(100% / n)</code>自动计算呢。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.average-layout {</span></span>
<span class="line"><span>    width: 400px;</span></span>
<span class="line"><span>    height: 400px;</span></span>
<span class="line"><span>    div {</span></span>
<span class="line"><span>        float: left;</span></span>
<span class="line"><span>        width: 25%;</span></span>
<span class="line"><span>        height: 100%;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>column</strong></p><p>使用column实现会令CSS代码语义化更明确。<code>column相关属性</code>是为列排版应运而生的，相对<code>flex相关属性</code>来说更易懂易学。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.average-layout {</span></span>
<span class="line"><span>    column-count: 4;</span></span>
<span class="line"><span>    column-gap: 0;</span></span>
<span class="line"><span>    width: 400px;</span></span>
<span class="line"><span>    height: 400px;</span></span>
<span class="line"><span>    div {</span></span>
<span class="line"><span>        height: 100%;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>flex</strong></p><p>使用flex实现会更简洁。节点声明<code>display:flex</code>后，生成的<code>FFC容器</code>里所有子节点的高度都相等，因为容器的<code>align-items</code>默认为<code>stretch</code>，所有子节点将占满整个容器的高度。每列声明<code>flex:1</code>自适应宽度。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.average-layout {</span></span>
<span class="line"><span>    display: flex;</span></span>
<span class="line"><span>    width: 400px;</span></span>
<span class="line"><span>    height: 400px;</span></span>
<span class="line"><span>    div {</span></span>
<span class="line"><span>        flex: 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><ul><li>在线演示：<a href="https://codepen.io/JowayYoung/pen/xxVzdoz" target="_blank" rel="noreferrer">Here</a></li><li>在线源码：<a href="https://github.com/JowayYoung/idea-css/blob/master/icss/src/components/layout/%E4%BD%BF%E7%94%A8flexbox%E6%8E%92%E7%89%88%E5%90%84%E7%A7%8D%E5%B8%83%E5%B1%80.vue" target="_blank" rel="noreferrer">Here</a></li></ul><h3 id="居中布局" tabindex="-1">居中布局 <a class="header-anchor" href="#居中布局" aria-label="Permalink to &quot;居中布局&quot;">​</a></h3><p><code>居中布局</code>不管在开发还是面试，都是一个出现率很高频的场景。很多同学可能都会死记硬背，若是根据不同场景使用不同<code>居中布局</code>，那死记硬背也不一定帮得上忙。所以剖析其原理和技巧再自由组合，相信能开发出更多的使用方式，当然死记硬背也不会存在了。</p><p>以下是笔者总结的<code>水平居中</code>和<code>垂直居中</code>的实现方式，分开了解水平居中和垂直居中的原理，是玩转<code>居中布局</code>里最重要的一步。</p><ul><li><p><strong>水平居中</strong></p></li><li><ul><li><strong>margin:0 auto + width:fit-content</strong>：<code>全部元素</code></li><li><strong>块级元素 + margin:0 auto + width</strong>：<code>块级元素</code></li></ul></li><li><ul><li><ul><li>若节点不是块级元素需声明<code>display:block</code></li><li>若节点宽度已隐式声明则无需显式声明<code>width</code></li></ul></li></ul></li><li><ul><li><strong>行内元素 + text-aligin:center</strong>：<code>行内元素</code></li></ul></li><li><ul><li><ul><li>父节点上声明<code>text-align</code></li><li>若节点不是行内元素需声明<code>display:inline/inline-block</code></li></ul></li></ul></li><li><ul><li><strong>position + left/right + margin-left/right + width</strong>：<code>全部元素</code></li><li><strong>position + left/right + transform:translateX(-50%)</strong>：<code>全部元素</code></li></ul></li><li><ul><li><strong>display:flex + justify-content:center</strong>：<code>全部元素</code></li></ul></li><li><ul><li><ul><li>父节点上声明<code>display</code>和<code>justify-content</code></li></ul></li></ul></li><li><p><strong>垂直居中</strong></p></li><li><ul><li><strong>块级元素 + padding-top/bottom</strong>：<code>块级元素</code></li></ul></li><li><ul><li><ul><li>父节点高度未声明或自适应</li><li>若节点不是块级元素需声明<code>display:block</code></li></ul></li></ul></li><li><ul><li><strong>行内元素 + line-height</strong>：<code>行内元素</code></li></ul></li><li><ul><li><ul><li>父节点上声明<code>line-height</code></li><li>若节点不是行内元素需声明<code>display:inline/inline-block</code></li></ul></li></ul></li><li><ul><li><strong>display:table + display:table-cell + vertical-align:middle</strong>：<code>全部元素</code></li></ul></li><li><ul><li><ul><li>父节点上声明<code>display:table</code></li></ul></li></ul></li><li><ul><li><strong>display:table-cell + vertical-align:middle</strong>：<code>全部元素</code></li></ul></li><li><ul><li><ul><li>父节点上声明<code>display</code>和<code>vertical-align</code></li></ul></li></ul></li><li><ul><li><strong>position + top/bottom + margin-top/bottom + height</strong>：<code>全部元素</code></li><li><strong>position + top/bottom + transform:translateY(-50%)</strong>：<code>全部元素</code></li></ul></li><li><ul><li><strong>display:flex + align-items:center</strong>：<code>全部元素</code></li></ul></li><li><ul><li><ul><li>父节点上声明<code>display</code>和<code>align-items</code></li></ul></li></ul></li><li><ul><li><strong>display:flex + margin:auto 0</strong>：<code>全部元素</code></li></ul></li><li><ul><li><ul><li>父节点上声明<code>display</code></li></ul></li></ul></li></ul><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>浏览器会为文本生成一个匿名行内盒，让文本参与IFC，所以可认为文本是行内元素，详情可回看第4章盒模型</span></span></code></pre></div><p>通过结合上述<code>水平居中</code>和<code>垂直居中</code>的实现方式完成一些常见的<code>水平垂直居中布局</code>，未出现的方式可在评论中补充，方便一起学习。注意注意，上述任何<code>水平居中</code>和<code>垂直居中</code>方式不是随意组合就能生效，这个需详细分析可行性。以下是一些组合成功的<code>水平垂直居中布局</code>。</p><p>假设节点是块级元素，意味着隐式声明<code>display:block</code>，例如以下的<code>&lt;div&gt;&lt;/div&gt;</code>，围绕着该<code>&lt;div&gt;</code>实现各种<code>水平垂直居中布局</code>。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/png/2985494/1607320503329-6d82d330-7bb6-4577-bd25-016fc883c18b.png" alt="img"></p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div class=&quot;center-layout&quot;&gt;</span></span>
<span class="line"><span>    &lt;div&gt;&lt;/div&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>.center-layout {</span></span>
<span class="line"><span>    width: 400px;</span></span>
<span class="line"><span>    height: 400px;</span></span>
<span class="line"><span>    background-color: #f66;</span></span>
<span class="line"><span>    div {</span></span>
<span class="line"><span>        width: 100px;</span></span>
<span class="line"><span>        height: 100px;</span></span>
<span class="line"><span>        background-color: #66f;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>display:inline-block</strong></p><p><code>&lt;div&gt;</code>声明display:inline-block将其变成行内块级元素，那么可用text-align和line-height声明水平垂直居中了，但是行内块级元素与匿名行内盒的基线对齐存在很大差异，所以需声明vertical-align:middle将其调整到垂直居中的位置，不过这也是近似垂直居中，父节点最后还需声明font-size:0消除该差异。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.center-layout {</span></span>
<span class="line"><span>    line-height: 400px;</span></span>
<span class="line"><span>    text-align: center;</span></span>
<span class="line"><span>    font-size: 0;</span></span>
<span class="line"><span>    div {</span></span>
<span class="line"><span>        display: inline-block;</span></span>
<span class="line"><span>        vertical-align: middle;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>display:table-cell</strong></p><p>父节点声明<code>display:table-cell</code>模拟<code>表格布局</code>的垂直居中；子节点声明<code>margin:0 auto</code>使其水平居中。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.center-layout {</span></span>
<span class="line"><span>    display: table-cell;</span></span>
<span class="line"><span>    vertical-align: middle;</span></span>
<span class="line"><span>    div {</span></span>
<span class="line"><span>        margin: 0 auto;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>position</strong></p><p>该方式也是最传统最稳定的<code>水平垂直居中布局</code>了，唯二的缺点就是<code>声明属性稍多</code>和<code>必须已知宽高</code>。要点是使用<code>margin负值</code>将节点拉回最中间，所以必须已知宽高才能计算<code>margin负值</code>，通常是<code>margin-left</code>和<code>margin-top</code>，可连写成<code>margin:-(height/2) 0 0 -(width/2)</code>。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.center-layout {</span></span>
<span class="line"><span>    position: relative;</span></span>
<span class="line"><span>    div {</span></span>
<span class="line"><span>        position: absolute;</span></span>
<span class="line"><span>        left: 50%;</span></span>
<span class="line"><span>        top: 50%;</span></span>
<span class="line"><span>        margin: -50px 0 0 -50px;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>自从CSS3的<code>transform</code>普及后，声明<code>transform:translate(-50%,-50%)</code>可代替<code>margin负值</code>了，这样就无需声明宽高和计算宽高的二分之一是多少，真正做到自适应水平垂直居中。</p><p>但是存在一个缺陷，若节点需额外使用<code>transform</code>，那么就比较麻烦了。将额外的<code>transform</code>合并到水平垂直居中的<code>transform:translate(-50%,-50%)</code>里，就会存在有一个比较棘手的变换顺序问题，在第12章<strong>变换与动画</strong>中会详细讲解。解决方式就是在节点外部套上一层<code>&lt;div&gt;</code>，把<code>transform:translate(-50%,-50%)</code>转嫁到<code>&lt;div&gt;</code>上，那么节点就能自由使用<code>transform</code>了。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.center-layout {</span></span>
<span class="line"><span>    position: relative;</span></span>
<span class="line"><span>    div {</span></span>
<span class="line"><span>        position: absolute;</span></span>
<span class="line"><span>        left: 50%;</span></span>
<span class="line"><span>        top: 50%;</span></span>
<span class="line"><span>        transform: translate(-50%, -50%);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>flex</p><p>目前最强大的方式，不用说，常用<code>flex</code>的各位同学都会知道。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.center-layout {</span></span>
<span class="line"><span>    display: flex;</span></span>
<span class="line"><span>    justify-content: center;</span></span>
<span class="line"><span>    align-items: center;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>当然还有一个隐藏的终极方式，也是史上最简方式。只需声明两个重要属性！</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.center-layout {</span></span>
<span class="line"><span>    display: flex;</span></span>
<span class="line"><span>    div {</span></span>
<span class="line"><span>        margin: auto;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这个<strong>CSS神操作骚技巧</strong>在后续里会经常使用，各位同学期待下啦。</p><hr><ul><li>在线演示：<a href="https://codepen.io/JowayYoung/pen/xxVzdoz" target="_blank" rel="noreferrer">Here</a></li><li>在线源码：<a href="https://github.com/JowayYoung/idea-css/blob/master/icss/src/components/layout/%E4%BD%BF%E7%94%A8flexbox%E6%8E%92%E7%89%88%E5%90%84%E7%A7%8D%E5%B8%83%E5%B1%80.vue" target="_blank" rel="noreferrer">Here</a></li></ul><h3 id="文字布局" tabindex="-1">文字布局 <a class="header-anchor" href="#文字布局" aria-label="Permalink to &quot;文字布局&quot;">​</a></h3><h5 id="文本环绕" tabindex="-1">文本环绕 <a class="header-anchor" href="#文本环绕" aria-label="Permalink to &quot;文本环绕&quot;">​</a></h5><p>利用<code>float</code>使节点脱流的原理实现，详情可回看第4章<strong>盒模型</strong>。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/png/2985494/1607320503097-911b5c39-7db0-4d76-b6b4-57691860e314.png" alt="img"></p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div class=&quot;text-wrapping&quot;&gt;</span></span>
<span class="line"><span>    &lt;img src=&quot;https://static.yangzw.vip/codepen/thor.jpg&quot;&gt;</span></span>
<span class="line"><span>    XXXXX......(很多个X)</span></span>
<span class="line"><span>&lt;/div&gt;</span></span></code></pre></div><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.text-wrapping {</span></span>
<span class="line"><span>    overflow: hidden;</span></span>
<span class="line"><span>    width: 400px;</span></span>
<span class="line"><span>    height: 300px;</span></span>
<span class="line"><span>    font-size: 20px;</span></span>
<span class="line"><span>    color: #f66;</span></span>
<span class="line"><span>    word-break: break-all;</span></span>
<span class="line"><span>    img {</span></span>
<span class="line"><span>        float: left;</span></span>
<span class="line"><span>        margin: 10px;</span></span>
<span class="line"><span>        height: 200px;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><ul><li>在线演示：<a href="https://codepen.io/JowayYoung/pen/yLOEoQd" target="_blank" rel="noreferrer">Here</a></li><li>在线源码：<a href="https://github.com/JowayYoung/idea-css/blob/master/icss/src/components/layout/%E4%BD%BF%E7%94%A8float%E6%8E%92%E7%89%88%E6%96%87%E6%9C%AC%E7%8E%AF%E7%BB%95.vue" target="_blank" rel="noreferrer">Here</a></li></ul><h5 id="文字溢出" tabindex="-1">文字溢出 <a class="header-anchor" href="#文字溢出" aria-label="Permalink to &quot;文字溢出&quot;">​</a></h5><p>嘿嘿，最常用的<code>单行文字溢</code>出和<code>多行问题溢</code>出来啦。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/png/2985494/1607320503202-112fb2cf-11f1-4f05-830e-eaa59be8158e.png" alt="img"></p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div class=&quot;text-ellipsis&quot;&gt;</span></span>
<span class="line"><span>    &lt;p class=&quot;s-line s-ellipsis&quot;&gt;玩转CSS的艺术之美...&lt;/p&gt;</span></span>
<span class="line"><span>    &lt;p class=&quot;m-line m-ellipsis&quot;&gt;玩转CSS的艺术之美...&lt;/p&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span></code></pre></div><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.text-ellipsis {</span></span>
<span class="line"><span>    width: 400px;</span></span>
<span class="line"><span>    p {</span></span>
<span class="line"><span>        padding: 0 10px;</span></span>
<span class="line"><span>        line-height: 40px;</span></span>
<span class="line"><span>        text-align: justify;</span></span>
<span class="line"><span>        font-size: 20px;</span></span>
<span class="line"><span>        color: #fff;</span></span>
<span class="line"><span>        &amp;.s-line {</span></span>
<span class="line"><span>            background-color: #f66;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;.m-line {</span></span>
<span class="line"><span>            background-color: #66f;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>单行文字溢出<strong>overflow + text-overflow</strong></p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.s-ellipsis {</span></span>
<span class="line"><span>    overflow: hidden;</span></span>
<span class="line"><span>    text-overflow: ellipsis;</span></span>
<span class="line"><span>    white-space: nowrap;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>多行文字溢出<strong>flex + overflow + text-overflow</strong></p><p>使用<code>旧版弹性布局</code>模拟<code>多行文字溢出</code>，只能在<code>Webkit内核</code>中使用，局限性太大了。</p><ul><li><p><code>display:-webkit-box</code>：将容器作为弹性伸缩盒模型</p></li><li><p><code>-webkit-box-orient</code>：弹性伸缩盒模型子节点的排列方式</p></li><li><p><code>-webkit-line-clamp</code>：限制容器最多显示多少行文本</p></li></ul><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.m-ellipsis {</span></span>
<span class="line"><span>    display: -webkit-box;</span></span>
<span class="line"><span>    overflow: hidden;</span></span>
<span class="line"><span>    text-overflow: ellipsis;</span></span>
<span class="line"><span>    word-break: break-all;</span></span>
<span class="line"><span>    -webkit-box-orient: vertical;</span></span>
<span class="line"><span>    -webkit-line-clamp: 3;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>所以得通过一些兼容性稳定的属性模拟该<code>溢出省略号</code>，当然是使用伪元素<code>::after</code>胜任这个工作了。结合<code>max-height</code>和<code>line-height</code>计算最大显示行数，通过定位布局把<code>省略号</code>定位到整段文字的右下角，使用<code>linear-gradient()</code>调整渐变背景颜色稍微润色下省略号使其看上去自然一些。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.m-ellipsis {</span></span>
<span class="line"><span>    overflow: hidden;</span></span>
<span class="line"><span>    position: relative;</span></span>
<span class="line"><span>    max-height: 120px;</span></span>
<span class="line"><span>    line-height: 40px;</span></span>
<span class="line"><span>    &amp;::after {</span></span>
<span class="line"><span>        position: absolute;</span></span>
<span class="line"><span>        right: 0;</span></span>
<span class="line"><span>        bottom: 0;</span></span>
<span class="line"><span>        padding-left: 20px;</span></span>
<span class="line"><span>        background: linear-gradient(to right, transparent, #fff 50%);</span></span>
<span class="line"><span>        content: &quot;...&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>虽然该方式兼容性比较好，但是单行文字也会出现省略号，只能结合JS额外处理了。</p><hr><ul><li>在线演示：<a href="https://codepen.io/JowayYoung/pen/mdbPmyy" target="_blank" rel="noreferrer">Here</a></li><li>在线源码：<a href="https://github.com/JowayYoung/idea-css/blob/master/icss/src/components/layout/%E4%BD%BF%E7%94%A8text-overflow%E6%8E%A7%E5%88%B6%E6%96%87%E6%9C%AC%E6%BA%A2%E5%87%BA.vue" target="_blank" rel="noreferrer">Here</a></li></ul>`,138),i=[e];function t(o,c,d,r,g,h){return a(),n("div",null,i)}const v=s(l,[["render",t]]);export{b as __pageData,v as default};
