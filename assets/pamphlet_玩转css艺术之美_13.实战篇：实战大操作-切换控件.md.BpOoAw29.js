import{_ as n,c as s,o as a,a2 as p}from"./chunks/framework.D8Prfz4N.js";const b=JSON.parse('{"title":"13.实战篇：实战大操作-切换控件","description":"","frontmatter":{},"headers":[],"relativePath":"pamphlet/玩转css艺术之美/13.实战篇：实战大操作-切换控件.md","filePath":"pamphlet/玩转css艺术之美/13.实战篇：实战大操作-切换控件.md"}'),e={name:"pamphlet/玩转css艺术之美/13.实战篇：实战大操作-切换控件.md"},l=p(`<h1 id="_13-实战篇-实战大操作-切换控件" tabindex="-1">13.实战篇：实战大操作-切换控件 <a class="header-anchor" href="#_13-实战篇-实战大操作-切换控件" aria-label="Permalink to &quot;13.实战篇：实战大操作-切换控件&quot;">​</a></h1><h3 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h3><p>前面几章学习了一些零零散散的<strong>CSS神操作骚技巧</strong>，每个单独的技巧都很强大，若组合起来岂不是更强大？本章以及后两章都是对这些学习过的<strong>CSS神操作骚技巧</strong>做一个总结和应用。学到的东西必须学以致用才行，不然就白学了。</p><p>以下准备3个<code>jQuery时代</code>的Web组件，当然它们不是基于<code>jQuery</code>开发，而是基于纯CSS开发。合理将<strong>CSS神操作骚技巧</strong>结合，也许能制作出一些出乎意料的效果。</p><p>本章的主题是<strong>切换控件</strong>，主要是用于鼠标悬浮或点击时选中组件中的单个部分。常见控件有<code>手风琴</code>和<code>折叠面板</code>。</p><h3 id="手风琴" tabindex="-1">手风琴 <a class="header-anchor" href="#手风琴" aria-label="Permalink to &quot;手风琴&quot;">​</a></h3><p><code>手风琴</code>在<code>jQuery时代</code>很常见，主要用于电商网站的商品栏目展示。笔者清楚记得10年前的淘宝首页就有这个<code>手风琴</code>效果，不过那时CSS3作为一个新生代的Web技术，由于兼容问题也很难应用到网页中。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/gif/2985494/1607321524481-490dba74-e4fa-4a12-bf08-d8058d657703.gif" alt="img"></p><p>其特点是鼠标悬浮到组件的某个部分，该部分就会扩张开来并挤压旁边的部分，当鼠标离开时就恢复原状。若鼠标快速在其上面略过，就会产生<code>手风琴</code>弹琴的效果。</p><p>使用JS实现<code>手风琴</code>效果，必须监听<code>mouseenter</code>和<code>mouseleave</code>两个鼠标事件，而<code>:hover</code>可代替两者的效果。所以纯CSS实现<code>手风琴效</code>果的关键就是<code>:hover</code>，核心代码如下。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>li {</span></span>
<span class="line"><span>    // 鼠标未悬浮状态</span></span>
<span class="line"><span>    &amp;:hover {</span></span>
<span class="line"><span>        // 鼠标悬浮状态</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>手风琴</code>的静态效果是一个内部横向排列着等宽子容器的大容器。换成CSS术语就是子节点水平排列且高度一致，在不触发悬浮效果时各个子节点的宽度都一致。依据其特征可用<code>Flex布局</code>完成这个排版。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;ul class=&quot;accordion&quot;&gt;</span></span>
<span class="line"><span>    &lt;li&gt;&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;li&gt;&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;li&gt;&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;li&gt;&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;li&gt;&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;li&gt;&lt;/li&gt;</span></span>
<span class="line"><span>&lt;/ul&gt;</span></span></code></pre></div><p>当鼠标悬浮任意子节点时会触发<code>:hover</code>，此时让<code>li:hover</code>声明一些相关状态即可，为了让<code>&lt;li&gt;</code>在悬浮前和悬浮后的外观过渡不那么生硬，声明<code>transition:all 300ms</code>会更好。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.accordion {</span></span>
<span class="line"><span>    display: flex;</span></span>
<span class="line"><span>    width: 600px;</span></span>
<span class="line"><span>    height: 200px;</span></span>
<span class="line"><span>    li {</span></span>
<span class="line"><span>        flex: 1;</span></span>
<span class="line"><span>        cursor: pointer;</span></span>
<span class="line"><span>        transition: all 300ms;</span></span>
<span class="line"><span>        &amp;:nth-child(1) {</span></span>
<span class="line"><span>            background-color: #f66;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;:nth-child(2) {</span></span>
<span class="line"><span>            background-color: #66f;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;:nth-child(3) {</span></span>
<span class="line"><span>            background-color: #f90;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;:nth-child(4) {</span></span>
<span class="line"><span>            background-color: #09f;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;:nth-child(5) {</span></span>
<span class="line"><span>            background-color: #9c3;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;:nth-child(6) {</span></span>
<span class="line"><span>            background-color: #3c9;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;:hover {</span></span>
<span class="line"><span>            flex: 2;</span></span>
<span class="line"><span>            background-color: #ccc;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>后续出现相关状态切换的节点，最好都声明<code>transition</code>，这样能让整个动画过渡变得更自然，除了某些情况，可回看第12章<strong>变换与动画</strong>。</p><hr><ul><li>在线演示：<a href="https://codepen.io/JowayYoung/pen/qBZQNjX" target="_blank" rel="noreferrer">Here</a></li><li>在线源码：<a href="https://github.com/JowayYoung/idea-css/blob/master/icss/src/components/component/%E6%89%8B%E9%A3%8E%E7%90%B4.vue" target="_blank" rel="noreferrer">Here</a></li></ul><h3 id="折叠面板" tabindex="-1">折叠面板 <a class="header-anchor" href="#折叠面板" aria-label="Permalink to &quot;折叠面板&quot;">​</a></h3><p><code>折叠面板</code>其实是手风琴的一个垂直版本，手风琴的子节点是水平排版的，而<code>折叠面板</code>的子节点是垂直排版的。<code>折叠面板</code>通常都是点击子菜单，显示更多的子菜单，可同时打开也可单独打开。本次通过纯CSS完成一个多选的<code>折叠面板</code>。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/gif/2985494/1607321524322-5ef263c1-cf88-41a7-bebd-0f0e3dab6081.gif" alt="img"></p><p>还记得在第9章<strong>选择器</strong>里<code>&lt;input&gt;</code>和<code>&lt;label&gt;</code>的巧妙搭配吗？在此通过<code>&lt;input&gt;</code>和<code>&lt;label&gt;</code>模拟按钮的点击事件，为何这样处理可回看第9章<strong>选择器</strong>。</p><p><code>&lt;input&gt;</code>和<code>&lt;article&gt;</code>成为同胞元素且让<code>&lt;input&gt;</code>放置在最前面，是为了方便使用<code>+/~</code>在<code>&lt;input&gt;</code>触发<code>:checked</code>时带动<code>&lt;article&gt;</code>也进入选中状态。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>input:checked + article {}</span></span>
<span class="line"><span>input:checked ~ article {}</span></span></code></pre></div><p>此时就可通过上述CSS代码就能让<code>&lt;article&gt;</code>动起来了。由于将<code>&lt;input&gt;</code>的鼠标选择事件转移到<code>&lt;label&gt;</code>上，由<code>&lt;label&gt;</code>控制选中状态，所以需对<code>&lt;input&gt;</code>设置隐藏。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div class=&quot;accordion&quot;&gt;</span></span>
<span class="line"><span>    &lt;input id=&quot;collapse1&quot; type=&quot;checkbox&quot; hidden&gt;</span></span>
<span class="line"><span>    &lt;input id=&quot;collapse2&quot; type=&quot;checkbox&quot; hidden&gt;</span></span>
<span class="line"><span>    &lt;input id=&quot;collapse3&quot; type=&quot;checkbox&quot; hidden&gt;</span></span>
<span class="line"><span>    &lt;article&gt;</span></span>
<span class="line"><span>        &lt;label for=&quot;collapse1&quot;&gt;列表1&lt;/label&gt;</span></span>
<span class="line"><span>        &lt;p&gt;内容1&lt;br&gt;内容2&lt;br&gt;内容3&lt;br&gt;内容4&lt;/p&gt;</span></span>
<span class="line"><span>    &lt;/article&gt;</span></span>
<span class="line"><span>    &lt;article&gt;</span></span>
<span class="line"><span>        &lt;label for=&quot;collapse2&quot;&gt;列表2&lt;/label&gt;</span></span>
<span class="line"><span>        &lt;p&gt;内容1&lt;br&gt;内容2&lt;br&gt;内容3&lt;br&gt;内容4&lt;/p&gt;</span></span>
<span class="line"><span>    &lt;/article&gt;</span></span>
<span class="line"><span>    &lt;article&gt;</span></span>
<span class="line"><span>        &lt;label for=&quot;collapse3&quot;&gt;列表3&lt;/label&gt;</span></span>
<span class="line"><span>        &lt;p&gt;内容1&lt;br&gt;内容2&lt;br&gt;内容3&lt;br&gt;内容4&lt;/p&gt;</span></span>
<span class="line"><span>    &lt;/article&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span></code></pre></div><p>上述结构未为<code>&lt;article&gt;</code>设置单独类，由于同级结构中存在<code>&lt;input&gt;</code>和<code>&lt;article&gt;</code>，所以不能使用<code>:nth-child(n)</code>，而是使用<code>:nth-of-type(n)</code>选择指定的<code>&lt;article&gt;</code>。</p><p>折叠内容在实际使用场景的高度是不固定或很难预测的，有些同学会声明<code>height:auto</code>。若声明了<code>transtion</code>，<code>height</code>从<code>0</code>变更到<code>auto</code>是无任何过渡效果的，与不声明<code>transtion</code>一样显得很生硬。但是<code>max-height</code>可借助<code>transtion</code>过渡，在隐藏折叠内容时声明<code>max-height:0</code>，在展开折叠内容时声明<code>max-height:1000px</code>，这个<code>1000px</code>只是一个示例，反正比预计的高度大即可，声明<code>2000px</code>也无所谓。当然还必须声明<code>overflow:hidden</code>隐藏超出内容区域的内容。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.accordion {</span></span>
<span class="line"><span>    width: 300px;</span></span>
<span class="line"><span>    article {</span></span>
<span class="line"><span>        cursor: pointer;</span></span>
<span class="line"><span>        &amp; + article {</span></span>
<span class="line"><span>            margin-top: 5px;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    input {</span></span>
<span class="line"><span>        &amp;:nth-child(1):checked ~ article:nth-of-type(1) p,</span></span>
<span class="line"><span>        &amp;:nth-child(2):checked ~ article:nth-of-type(2) p,</span></span>
<span class="line"><span>        &amp;:nth-child(3):checked ~ article:nth-of-type(3) p {</span></span>
<span class="line"><span>            border-bottom-width: 1px;</span></span>
<span class="line"><span>            max-height: 600px;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    label {</span></span>
<span class="line"><span>        display: block;</span></span>
<span class="line"><span>        padding: 0 20px;</span></span>
<span class="line"><span>        height: 40px;</span></span>
<span class="line"><span>        background-color: #f66;</span></span>
<span class="line"><span>        cursor: pointer;</span></span>
<span class="line"><span>        line-height: 40px;</span></span>
<span class="line"><span>        font-size: 16px;</span></span>
<span class="line"><span>        color: #fff;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    p {</span></span>
<span class="line"><span>        overflow: hidden;</span></span>
<span class="line"><span>        padding: 0 20px;</span></span>
<span class="line"><span>        border: 1px solid #f66;</span></span>
<span class="line"><span>        border-top: none;</span></span>
<span class="line"><span>        border-bottom-width: 0;</span></span>
<span class="line"><span>        max-height: 0;</span></span>
<span class="line"><span>        line-height: 30px;</span></span>
<span class="line"><span>        transition: all 500ms;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><ul><li>在线演示：<a href="https://codepen.io/JowayYoung/pen/NWKRMjo" target="_blank" rel="noreferrer">Here</a></li><li>在线源码：<a href="https://github.com/JowayYoung/idea-css/blob/master/icss/src/components/component/%E6%8A%98%E5%8F%A0%E9%9D%A2%E6%9D%BF.vue" target="_blank" rel="noreferrer">Here</a></li></ul><h3 id="暗黑模式" tabindex="-1">暗黑模式 <a class="header-anchor" href="#暗黑模式" aria-label="Permalink to &quot;暗黑模式&quot;">​</a></h3><p>笔者曾经发表过一篇<a href="https://juejin.im/post/6862599699334725639" target="_blank" rel="noreferrer">《纯CSS免费让掘金社区拥有暗黑模式切换功能》</a>，详情请查看原文，在此就不啰嗦了。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/gif/2985494/1607321524603-4372e0b6-bf7f-4165-897b-a59da9904fe5.gif" alt="img"></p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div class=&quot;dark-theme&quot;&gt;</span></span>
<span class="line"><span>    &lt;input class=&quot;ios-switch&quot; type=&quot;checkbox&quot;&gt;</span></span>
<span class="line"><span>    &lt;iframe class=&quot;main&quot; src=&quot;https://juejin.im&quot;&gt;&lt;/iframe&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>.btn {</span></span>
<span class="line"><span>    border-radius: 31px;</span></span>
<span class="line"><span>    width: 102px;</span></span>
<span class="line"><span>    height: 62px;</span></span>
<span class="line"><span>    background-color: #e9e9eb;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.dark-theme {</span></span>
<span class="line"><span>    display: flex;</span></span>
<span class="line"><span>    .ios-switch {</span></span>
<span class="line"><span>        position: relative;</span></span>
<span class="line"><span>        appearance: none;</span></span>
<span class="line"><span>        cursor: pointer;</span></span>
<span class="line"><span>        transition: all 100ms;</span></span>
<span class="line"><span>        @extend .btn;</span></span>
<span class="line"><span>        &amp;::before {</span></span>
<span class="line"><span>            position: absolute;</span></span>
<span class="line"><span>            content: &quot;&quot;;</span></span>
<span class="line"><span>            transition: all 300ms cubic-bezier(.45, 1, .4, 1);</span></span>
<span class="line"><span>            @extend .btn;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;::after {</span></span>
<span class="line"><span>            position: absolute;</span></span>
<span class="line"><span>            left: 4px;</span></span>
<span class="line"><span>            top: 4px;</span></span>
<span class="line"><span>            border-radius: 27px;</span></span>
<span class="line"><span>            width: 54px;</span></span>
<span class="line"><span>            height: 54px;</span></span>
<span class="line"><span>            background-color: #fff;</span></span>
<span class="line"><span>            box-shadow: 1px 1px 5px rgba(#000, .3);</span></span>
<span class="line"><span>            content: &quot;&quot;;</span></span>
<span class="line"><span>            transition: all 300ms cubic-bezier(.4, .4, .25, 1.35);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;:checked {</span></span>
<span class="line"><span>            background-color: #5eb662;</span></span>
<span class="line"><span>            &amp;::before {</span></span>
<span class="line"><span>                transform: scale(0);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            &amp;::after {</span></span>
<span class="line"><span>                transform: translateX(40px);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            &amp; + .main {</span></span>
<span class="line"><span>                filter: invert(1) hue-rotate(180deg);</span></span>
<span class="line"><span>                img,</span></span>
<span class="line"><span>                video,</span></span>
<span class="line"><span>                .avatar,</span></span>
<span class="line"><span>                .image,</span></span>
<span class="line"><span>                .thumb {</span></span>
<span class="line"><span>                    filter: invert(1) hue-rotate(180deg);</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .main {</span></span>
<span class="line"><span>        margin-left: 20px;</span></span>
<span class="line"><span>        border: 1px solid #3c9;</span></span>
<span class="line"><span>        width: 1000px;</span></span>
<span class="line"><span>        height: 400px;</span></span>
<span class="line"><span>        background-color: #fff;</span></span>
<span class="line"><span>        transition: all 300ms;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><ul><li>在线演示：<a href="https://codepen.io/JowayYoung/pen/mdPEjoz" target="_blank" rel="noreferrer">Here</a></li><li>在线源码：<a href="https://github.com/JowayYoung/idea-css/blob/master/icss/src/components/color/%E4%BD%BF%E7%94%A8filter%E5%BC%80%E5%90%AF%E6%9A%97%E9%BB%91%E6%A8%A1%E5%BC%8F.vue" target="_blank" rel="noreferrer">Here</a></li></ul>`,37),t=[l];function c(i,o,d,r,h,g){return a(),s("div",null,t)}const m=n(e,[["render",c]]);export{b as __pageData,m as default};
