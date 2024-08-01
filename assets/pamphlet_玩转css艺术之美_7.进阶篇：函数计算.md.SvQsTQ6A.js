import{_ as n,c as s,o as a,a2 as p}from"./chunks/framework.D8Prfz4N.js";const m=JSON.parse('{"title":"7.进阶篇：函数计算","description":"","frontmatter":{},"headers":[],"relativePath":"pamphlet/玩转css艺术之美/7.进阶篇：函数计算.md","filePath":"pamphlet/玩转css艺术之美/7.进阶篇：函数计算.md"}'),e={name:"pamphlet/玩转css艺术之美/7.进阶篇：函数计算.md"},l=p(`<h1 id="_7-进阶篇-函数计算" tabindex="-1">7.进阶篇：函数计算 <a class="header-anchor" href="#_7-进阶篇-函数计算" aria-label="Permalink to &quot;7.进阶篇：函数计算&quot;">​</a></h1><h3 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h3><p>各位同学都知道，CSS只是一门声明式的语言，主要为标记语言HTML服务。很多前端开发者都会鄙视它，不愿意深入学习，更多会抛出一个原因：现在不是有很多UI框架吗，我还编写CSS干嘛！</p><p>虽然CSS看上去弱不禁风，常用的也就是一堆静态属性声明而已。然而，这只是完全不了解CSS且还停留在编写属性声明的同学对CSS的理解而已。时至今日，随着前端技术的不断变革，也让曾经被鄙视的CSS变得越来越强大。过去只有声明式的CSS，现在也拥有了具有运算能力的函数。</p><p>CSS能做的事情可多了，JS有<code>变量</code>和<code>函数</code>，CSS也有。本章先摸透一些常用的函数，因为函数在后面章节中各种客串出场。</p><h3 id="函数" tabindex="-1">函数 <a class="header-anchor" href="#函数" aria-label="Permalink to &quot;函数&quot;">​</a></h3><p><strong>CSS函数</strong>指复杂类型或调用特殊处理的组件值类型。为单调的属性声明增加了更强大的点缀，让简单的CSS变得更有艺术感。其语法也很简单，编写形式为<code>function(params)</code>，JS里的函数调用一致。在CSS代码中，只要带有<code>()</code>的属性值都是函数。</p><p>有了函数后，可将一系列相关计算交给浏览器处理，可减少大量人工计算甚至无需人工计算，大大提高了CSS代码的编写效率。</p><h3 id="分类" tabindex="-1">分类 <a class="header-anchor" href="#分类" aria-label="Permalink to &quot;分类&quot;">​</a></h3><p>笔者敢相信，大部分同学常用到的函数只有<code>url()</code>、<code>rgb()</code>和<code>rgba()</code>，稍微深入一点的也只有<code>calc()</code>、<code>cubic-bezier()</code>和<code>linear-gradient()</code>。</p><p>其实不然，函数怎么会只有这几个。从W3C文档详情发现总共存在<code>86</code>个可用的函数，一点也不比属性少。按照惯例，笔者又对其进行了合理的记忆分类，以下分类均为笔者使用过的函数，暂未得到浏览器支持且在<a href="https://www.caniuse.com/" target="_blank" rel="noreferrer">Caniuse</a>上未收录的函数就不在分类范围内了。</p><p>颜色函数</p><ul><li><p><strong>rgb()</strong>：RGB色彩模式</p></li><li><p><strong>rgba()</strong>：RGBA色彩模式</p></li><li><p><strong>hsl()</strong>：HSL色彩模式</p></li><li><p><strong>hsla()</strong>：HSLA色彩模式</p></li><li><p><strong>color()</strong>：色彩模式，基于当前颜色衍生出其他颜色</p></li></ul><p>属性函数</p><ul><li><strong>attr()</strong>：属性</li><li><strong>var()</strong>：变量</li></ul><p>数学函数</p><ul><li><p><strong>clamp()</strong>：区间范围值</p></li><li><p><strong>counter()</strong>：计数器</p></li><li><p><strong>counters()</strong>：嵌套计数器</p></li><li><p><strong>calc()</strong>：计算</p></li><li><p><strong>max()</strong>：最大值</p></li><li><p><strong>min()</strong>：最小值</p></li></ul><p>背景函数</p><ul><li><p><strong>url()</strong>：图像路径</p></li><li><p><strong>element()</strong>：图像映射，渲染指定元素为图像</p></li><li><p><strong>image-set()</strong>：图像集合，根据屏幕分辨率匹配合适图像</p></li><li><p><strong>linear-gradient()</strong>：线性渐变</p></li><li><p><strong>radial-gradient()</strong>：径向渐变</p></li><li><p><strong>conic-gradient()</strong>：锥形渐变</p></li><li><p><strong>repeating-linear-gradient()</strong>：重复线性渐变</p></li><li><p><strong>repeating-radial-gradient()</strong>：重复径向渐变</p></li><li><p><strong>repeating-conic-gradient()</strong>：重复锥形渐变</p></li></ul><p>滤镜函数</p><ul><li><p><strong>blur()</strong>：模糊</p></li><li><p><strong>brightness()</strong>：亮度</p></li><li><p><strong>contrast()</strong>：对比度</p></li><li><p><strong>drop-shadow()</strong>：阴影</p></li><li><p><strong>grayscale()</strong>：灰度</p></li><li><p><strong>hue-rotate()</strong>：色相旋转</p></li><li><p><strong>invert()</strong>：反相</p></li><li><p><strong>opacity()</strong>：透明度</p></li><li><p><strong>saturate()</strong>：饱和度</p></li><li><p><strong>sepia()</strong>：褐色</p></li></ul><p>图像函数</p><ul><li><p><strong>circle()</strong>：圆形</p></li><li><p><strong>ellipse()</strong>：椭圆形</p></li><li><p><strong>inset()</strong>：矩形</p></li><li><p><strong>path()</strong>：路径</p></li><li><p><strong>polygon()</strong>：多边行</p></li></ul><p>变换函数</p><ul><li><p><strong>matrix()</strong>：矩阵</p></li><li><p><strong>matrix3d()</strong>：3D矩阵</p></li><li><p><strong>perspective()</strong>：视距</p></li><li><p><strong>rotate()</strong>：旋转</p></li><li><p><strong>rotate3d()</strong>：3D旋转</p></li><li><p><strong>rotateX()</strong>：X轴旋转</p></li><li><p><strong>rotateY()</strong>：Y轴旋转</p></li><li><p><strong>rotateZ()</strong>：Z轴旋转</p></li><li><p><strong>scale()</strong>：缩放</p></li><li><p><strong>scale3d()</strong>：3D缩放</p></li><li><p><strong>scaleX()</strong>：X轴缩放</p></li><li><p><strong>scaleY()</strong>：Y轴缩放</p></li><li><p><strong>scaleZ()</strong>：Z轴缩放</p></li><li><p><strong>skew()</strong>：扭曲</p></li><li><p><strong>skewX()</strong>：X轴扭曲</p></li><li><p><strong>skewY()</strong>：Y轴扭曲</p></li><li><p><strong>translate()</strong>：位移</p></li><li><p><strong>translate3d()</strong>：3D位移</p></li><li><p><strong>translateX()</strong>：X轴位移</p></li><li><p><strong>translateY()</strong>：Y轴位移</p></li><li><p><strong>translateZ()</strong>：Z轴位移</p></li></ul><p>缓动函数</p><ul><li><strong>cubic-bezier()</strong>：贝塞尔曲线</li><li><strong>steps()</strong>：逐帧</li></ul><h3 id="颜色函数" tabindex="-1">颜色函数 <a class="header-anchor" href="#颜色函数" aria-label="Permalink to &quot;颜色函数&quot;">​</a></h3><p><code>颜色函数</code>是最常用的函数，没有之一。<code>颜色函数</code>可用在<code>border-color</code>、<code>outline-color</code>、<code>background-color</code>、<code>box-shadow</code>、<code>color</code>、<code>caret-color</code>等属性上使用。</p><p>RGB色彩模式：rgb()、rgba()</p><p>例如将文本声明成白色，普通的声明可用<code>color:white</code>和<code>color:#fff</code>。有了<code>颜色函数</code>后，可用<code>rgb()</code>和<code>rgba()</code>声明。将原来的声明改成成<code>color:rgb(255,255,255)</code>或<code>rgba(255,255,255,1)</code>。</p><p><code>rgb()</code>里的R表示<strong>红色</strong>，G表示<strong>绿色</strong>，B表示<strong>蓝色</strong>，而<code>rgba()</code>多出来的A表示透明度，这个A与<code>opacity</code>声明的透明度不同，<code>rgba()</code>声明的透明度不会应用到子节点上，而<code>opacity</code>声明的透明度会应用到子节点上。</p><p>建议在声明普通颜色时使用<code>HEX色彩模式</code>(16进制色彩模式)，若颜色存在透明度的需求，可用<code>rgba()</code>。但是<code>rgba()</code>的参数不太友好，得把<code>HEX</code>转换成<code>RGB</code>。由于本小册使用<code>sass</code>作为样式预处理语言，编写<code>rgb()</code>和<code>rgba()</code>时使用<code>HEX</code>代替<code>RGB</code>即可。将原来的声明改成成<code>color:rgb(#fff)</code>或<code>rgba(#fff,1)</code>。</p><p>HSL色彩模式：hsl()、hsla()</p><p><strong>HSL色彩模式</strong>是一种工业界的色彩标准，因为它能涵盖到人类视觉所能感知的所有颜色，所以在工业界广泛应用。</p><p><code>hsl()</code>和<code>hsla()</code>这两个颜色函数与上述两个颜色在CSS和<code>sass</code>上用法相似。H表示<strong>色相</strong>，S表示<strong>饱和度</strong>，L表示<strong>亮度</strong>，A表示<strong>透明度</strong>。</p><p><strong>色相</strong>又名<strong>色盘</strong>，指色彩的基本属性。就是常说的颜色名称，例如红色、绿色等，此时应该想起画家那个装满不同颜料的色盘吧。色相的单位是<code>deg</code>，值的范围在<code>0~360deg</code>间，若超过<code>360deg</code>则相当绕N圈再计算剩余的值。<code>0deg</code>和<code>360deg</code>为红色，<code>120deg</code>为绿色，<code>240deg</code>为蓝色。</p><p><strong>饱和度</strong>指色彩的纯度。越高色彩越纯，越低色彩越灰。饱和度的单位是<code>%</code>，值的范围在<code>0~100%</code>间。<code>0%</code>为灰色，<code>100%</code>为全色。</p><p><strong>亮度</strong>指色彩的发光强度。越高色彩越亮，越低色彩越暗。亮度的单位是<code>%</code>，值的范围在<code>0~100%</code>间。<code>0%</code>为最暗，<code>100%</code>为最亮。若你想亮瞎别人的狗眼，把该值调整为<code>100%</code>即可。</p><p>饱和度和亮度的单位即使是<code>0</code>也得写成<code>0%</code>，否则整个函数都会失效。</p><p><strong>HSL色彩模式</strong>其实是一种将<code>RGB色彩模式</code>中的点在圆柱坐标系中标记出来的表示法，该表示法试图做到比基于笛卡尔坐标系的几何结构RGB更直观。</p><h3 id="属性函数" tabindex="-1">属性函数 <a class="header-anchor" href="#属性函数" aria-label="Permalink to &quot;属性函数&quot;">​</a></h3><p>attr()</p><p><code>attr(val)</code>用于返回节点属性，通常结合伪元素的<code>content</code>使用，是一个很优雅的函数。兼容性好不说了，还极其低调，导致很多同学以为它是一个CSS3特性。。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;h1 class=&quot;hello&quot; data-name=&quot;玩转CSS的艺术之美&quot;&gt;&lt;/h1&gt;</span></span>
<span class="line"><span>h1 {</span></span>
<span class="line"><span>    &amp;::before {</span></span>
<span class="line"><span>        content: attr(class);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    &amp;::after {</span></span>
<span class="line"><span>        content: attr(data-name);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>::before</code>通过<code>attr()</code>获取<code>&lt;h1 class&gt;</code>的属性值并赋值到<code>content</code>上，<code>::after</code>通过<code>attr()</code>获取<code>&lt;h1 data-name&gt;</code>的属性值并赋值到<code>content</code>上，最终<code>&lt;h1&gt;</code>的<code>innerText</code>是<code>hello玩转CSS的艺术之美</code>。</p><p><code>attr()</code>可灵活结合<code>选择器</code>返回节点属性并赋值到伪元素的<code>content</code>上，通过<code>attr()</code>结合<code>:hover</code>和<code>:empty</code>抓取节点需显示的内容是一个很不错的技巧。</p><ul><li>在<code>按钮1</code>触发悬浮状态<code>:hover</code>时，通过<code>attr()</code>获取节点的<code>data-msg</code>并赋值到<code>::after</code>的<code>content</code>上</li><li>当<code>按钮2</code>内容为空<code>:empty</code>时，通过<code>attr()</code>获取节点的<code>href</code>并赋值到<code>::after</code>的<code>content</code>上</li></ul><p><img src="https://cdn.nlark.com/yuque/0/2020/gif/2985494/1607320618013-46597b24-78d9-46c0-bf28-4dfdad1fa11e.gif" alt="img"></p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;a class=&quot;hover-tips btn-1&quot; href=&quot;https://www.baidu.com&quot; data-msg=&quot;Hello World&quot;&gt;提示框&lt;/a&gt;</span></span>
<span class="line"><span>&lt;a class=&quot;hover-tips btn-2&quot; href=&quot;https://www.baidu.com&quot;&gt;&lt;/a&gt;</span></span>
<span class="line"><span>.hover-tips {</span></span>
<span class="line"><span>    position: relative;</span></span>
<span class="line"><span>    padding: 0 20px;</span></span>
<span class="line"><span>    border-radius: 10px;</span></span>
<span class="line"><span>    height: 40px;</span></span>
<span class="line"><span>    background-color: #66f;</span></span>
<span class="line"><span>    line-height: 40px;</span></span>
<span class="line"><span>    color: #fff;</span></span>
<span class="line"><span>    &amp; + .hover-tips {</span></span>
<span class="line"><span>        margin-top: 10px;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    &amp;.btn-1 {</span></span>
<span class="line"><span>        &amp;::after {</span></span>
<span class="line"><span>            position: absolute;</span></span>
<span class="line"><span>            left: 0;</span></span>
<span class="line"><span>            top: 0;</span></span>
<span class="line"><span>            border-radius: 5px;</span></span>
<span class="line"><span>            width: 100%;</span></span>
<span class="line"><span>            height: 100%;</span></span>
<span class="line"><span>            background-color: rgba(#000, .5);</span></span>
<span class="line"><span>            opacity: 0;</span></span>
<span class="line"><span>            text-align: center;</span></span>
<span class="line"><span>            font-size: 12px;</span></span>
<span class="line"><span>            content: attr(data-msg);</span></span>
<span class="line"><span>            transition: all 300ms;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;:hover::after {</span></span>
<span class="line"><span>            left: calc(100% + 20px);</span></span>
<span class="line"><span>            opacity: 1;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    &amp;.btn-2:empty::after {</span></span>
<span class="line"><span>        content: attr(href);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><ul><li>在线演示：<a href="https://codepen.io/JowayYoung/pen/voRdKX" target="_blank" rel="noreferrer">Here</a></li><li>在线源码：<a href="https://github.com/JowayYoung/idea-css/blob/master/icss/src/components/behavior/%E4%BD%BF%E7%94%A8attr()%E6%8A%93%E5%8F%96%E8%8A%82%E7%82%B9%E5%B1%9E%E6%80%A7.vue" target="_blank" rel="noreferrer">Here</a></li></ul><p>var()</p><p><code>var()</code>用于引用自定义属性，是CSS变量的组成之一，在第8章<strong>变量计算</strong>会详细讲解<code>var()</code>，在此就不再讲解了。</p><h3 id="数学函数" tabindex="-1">数学函数 <a class="header-anchor" href="#数学函数" aria-label="Permalink to &quot;数学函数&quot;">​</a></h3><p>counter()/counters()</p><p><code>counter()</code>用于返回计数器迭代值，必须结合伪元素的<code>content</code>使用。它以计数器名称作为参数，并作为值传递给<code>content</code>。<code>counters()</code>用于返回嵌套计数器迭代值，情况和<code>counter()</code>一致。</p><p>在使用<code>counter()</code>和<code>counters()</code>时，必须与<code>counter-reset</code>和<code>counter-increment</code>一起使用。</p><ul><li><code>counter-reset</code>：重置计数器名称与初始值，编写形式为<code>counter-reset:name val</code></li><li><code>counter-increment</code>：对指定计数器累计其计数值，编写形式为<code>counter-increment:name</code>，在使用到的地方声明就会累加</li></ul><p>对于一些迭代需求通常都会使用HTML模板，例如Vue模板、Pug模板等，所以<code>counter()</code>和<code>counters()</code>使用场景不多，笔者也很少发掘它的用处。以下就使用<code>counter()</code>巧妙搭配完成一个显示权重的迭代计数器。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/gif/2985494/1607320618161-63de76e3-e057-4ff2-94eb-89da367cbc3a.gif" alt="img"></p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div class=&quot;iterative-counter&quot;&gt;</span></span>
<span class="line"><span>    &lt;ul&gt;</span></span>
<span class="line"><span>        &lt;li&gt;</span></span>
<span class="line"><span>            &lt;input id=&quot;angular&quot; type=&quot;checkbox&quot;&gt;</span></span>
<span class="line"><span>            &lt;label for=&quot;angular&quot;&gt;Angular&lt;/label&gt;</span></span>
<span class="line"><span>        &lt;/li&gt;</span></span>
<span class="line"><span>        &lt;li&gt;</span></span>
<span class="line"><span>            &lt;input id=&quot;react&quot; type=&quot;checkbox&quot;&gt;</span></span>
<span class="line"><span>            &lt;label for=&quot;react&quot;&gt;React&lt;/label&gt;</span></span>
<span class="line"><span>        &lt;/li&gt;</span></span>
<span class="line"><span>        &lt;li&gt;</span></span>
<span class="line"><span>            &lt;input id=&quot;vue&quot; type=&quot;checkbox&quot;&gt;</span></span>
<span class="line"><span>            &lt;label for=&quot;vue&quot;&gt;Vue&lt;/label&gt;</span></span>
<span class="line"><span>        &lt;/li&gt;</span></span>
<span class="line"><span>    &lt;/ul&gt;</span></span>
<span class="line"><span>    &lt;p class=&quot;count&quot; data-unit=&quot;个&quot;&gt;框架：&lt;/p&gt;</span></span>
<span class="line"><span>    &lt;p class=&quot;weight&quot; data-unit=&quot;%&quot;&gt;权重：&lt;/p&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>.iterative-counter {</span></span>
<span class="line"><span>    ul {</span></span>
<span class="line"><span>        counter-reset: index 0 count 0 weight 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    li {</span></span>
<span class="line"><span>        display: flex;</span></span>
<span class="line"><span>        position: relative;</span></span>
<span class="line"><span>        align-items: center;</span></span>
<span class="line"><span>        counter-increment: index 1;</span></span>
<span class="line"><span>        &amp;::before {</span></span>
<span class="line"><span>            content: counter(index)&quot;、&quot;;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp; + li {</span></span>
<span class="line"><span>            margin-top: 10px;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    input {</span></span>
<span class="line"><span>        overflow: hidden;</span></span>
<span class="line"><span>        position: absolute;</span></span>
<span class="line"><span>        width: 0;</span></span>
<span class="line"><span>        height: 0;</span></span>
<span class="line"><span>        opacity: 0;</span></span>
<span class="line"><span>        &amp;:checked + label::before {</span></span>
<span class="line"><span>            color: #3c9;</span></span>
<span class="line"><span>            content: &quot;\\2713&quot;;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    label {</span></span>
<span class="line"><span>        display: flex;</span></span>
<span class="line"><span>        align-items: center;</span></span>
<span class="line"><span>        height: 20px;</span></span>
<span class="line"><span>        &amp;::before {</span></span>
<span class="line"><span>            margin-right: 5px;</span></span>
<span class="line"><span>            border: 1px solid #3c9;</span></span>
<span class="line"><span>            width: 20px;</span></span>
<span class="line"><span>            height: 20px;</span></span>
<span class="line"><span>            cursor: pointer;</span></span>
<span class="line"><span>            line-height: 20px;</span></span>
<span class="line"><span>            text-align: center;</span></span>
<span class="line"><span>            color: transparent;</span></span>
<span class="line"><span>            content: &quot;&quot;;</span></span>
<span class="line"><span>            transition: all 300ms;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    p {</span></span>
<span class="line"><span>        margin-top: 10px;</span></span>
<span class="line"><span>        &amp;.count::after {</span></span>
<span class="line"><span>            content: counter(count) attr(data-unit);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;.weight::after {</span></span>
<span class="line"><span>            content: counter(weight) attr(data-unit);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#angular:checked {</span></span>
<span class="line"><span>    counter-increment: count 1 weight 20;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#react:checked {</span></span>
<span class="line"><span>    counter-increment: count 1 weight 50;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#vue:checked {</span></span>
<span class="line"><span>    counter-increment: count 1 weight 30;</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><ul><li>在线演示：<a href="https://codepen.io/JowayYoung/pen/rXqRPo" target="_blank" rel="noreferrer">Here</a></li><li>在线源码：<a href="https://github.com/JowayYoung/idea-css/blob/master/icss/src/components/component/%E8%BF%AD%E4%BB%A3%E8%AE%A1%E6%95%B0%E5%99%A8.vue" target="_blank" rel="noreferrer">Here</a></li></ul><p>calc()</p><p><code>calc(exp)</code>用于动态计算单位，<code>数值</code>、<code>长度</code>、<code>角度</code>、<code>时间</code>和<code>百分比</code>都能作为参数。由于执行<code>数学表达式</code>后返回运算后的计算值，所以可减少大量人工计算甚至无需人工计算，是笔者认为最有用的函数，没有之一。</p><p><code>calc()</code>饥不择食，所有计量单位都能作为参数参加整个动态计算。</p><ul><li><p><strong>数值</strong>：<code>整数</code>、<code>浮点数</code></p></li><li><p><strong>长度</strong>：<code>px</code>、<code>em</code>、<code>rem</code>、<code>vw</code>、<code>vh</code>等(详情可回看第5章<strong>样式计算</strong>)</p></li><li><p><strong>角度</strong>：<code>deg</code>、<code>turn</code></p></li><li><p><strong>时间</strong>：<code>s</code>、<code>ms</code></p></li><li><p><strong>百分比</strong>：<code>%</code></p></li></ul><p><code>calc()</code>虽然好用，但是新手难免会遇到一些坑，谨记以下特点，相信就能玩转<code>calc()</code>了。</p><ul><li><p>四则运算：只能使用<code>+</code>、<code>-</code>、<code>*</code>、<code>/</code>作为运算符号</p></li><li><p>运算顺序：遵循加减乘除运算顺序，可用<code>()</code>提升运算等级</p></li><li><p>符号连接：每个运算符号必须使用<code>空格</code>间隔起来</p></li><li><p>混合计算：可混合不同计量单位动态计算</p></li></ul><p>第三点尤为重要，若未能遵守，浏览器直接忽略该属性。</p><p>还记得第5章<strong>样式计算</strong>的一行CSS代码让页面自适应吗？<code>font-size:calc(100vw / 7.5)</code>，其实就是根据设计图与浏览器视窗的比例动态计算<code>&lt;html&gt;</code>的<code>font-size</code>：<code>100/750 = x/100vw</code>。</p><p>在SPA里有遇过因为有滚动条或没滚动条而导致页面路由在跳转过程中发生向左或向右的抖动吗？这让强迫症患者很不舒服，此时可用<code>calc()</code>巧妙解决该问题。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.elem {</span></span>
<span class="line"><span>    padding-right: calc(100vw - 100%);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>100vw</code>是视窗宽度，<code>100%</code>内容宽度，那么<code>100vw - 100%</code>就是滚动条宽度了，声明<code>padding-right</code>用于保留滚动条出现的位置，这样滚动条出不出现都不会让页面抖动了。</p><p>上述两个示例都是很常用的场景，<code>calc()</code>需结合变量才好玩，后续章节都会有<code>calc()</code>乱入，各位同学记得注意喔。</p><p>clamp()/max()/min()</p><p><code>clamp()/max()/min()</code>都和<code>calc()</code>类似，所有计量单位都能作为参数参加整个动态计算。这三个函数和<code>calc()</code>可互相嵌套使用的。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.elem {</span></span>
<span class="line"><span>    width: calc(min(1200px, 100%) / 5);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>max(...val)</code>用于返回最大值，<code>min(...val)</code>用于返回最小值，支持一个或多个值或数学表达式。虽然<code>max()</code>名称是最大值，但实质上是用来限制最大值的；<code>min()</code>名称是最小值，但实质上是用来限制最小值的。</p><p>在响应式开发中，通常会声明内容宽度<code>100%</code>自适应且最大值不超过<code>1200px</code>。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.elem {</span></span>
<span class="line"><span>    width: 100%;</span></span>
<span class="line"><span>    max-width: 1200px;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>若用<code>min()</code>表示，只需一行声明即可。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.elem {</span></span>
<span class="line"><span>    width: min(1200px, 100%);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>clamp(min, val, max)</code>用于返回区间范围值。<code>val</code>在<code>min~max</code>间则返回<code>val</code>，<code>val</code>小于<code>min</code>则返回<code>min</code>，<code>val</code>大于<code>max</code>则返回<code>max</code>，妥妥的响应式函数样子。</p><p><code>clamp(min, val, max)</code>等价于<code>max(min, min(val, max))</code>。<code>clamp()</code>可用于响应式开发中，很好地履行了响应式的义务，让组件属性在特定条件下使用特定的值。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.elem {</span></span>
<span class="line"><span>    width: clamp(100px, 25vw, 300px);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>节点宽度声明在<code>100~300px</code>间，节点随着视窗宽度变化而变化。若视窗宽度大于<code>300px</code>则节点宽度一直保持<code>300px</code>，若视窗宽度在<code>100~300px</code>间则节点宽度为<code>25vw</code>转化后的<code>px值</code>，若视窗宽度小于<code>100px</code>则节点宽度一直保持<code>100px</code>。</p><h3 id="图形函数" tabindex="-1">图形函数 <a class="header-anchor" href="#图形函数" aria-label="Permalink to &quot;图形函数&quot;">​</a></h3><p><code>clip-path</code>用于创建一个只有节点的部分区域可显示的剪切区域。裁剪完成后，内部区域显示，外部区域隐藏。一般应用在<code>SVG</code>上，但是也可当作裁剪效果用在节点上。当节点使用<code>clip-path</code>声明裁剪路径时，可用这5个图形函数裁剪区域了，除了<code>path()</code>其他4个函数的兼容性还行。</p><p>以下使用<code>circle()</code>、<code>ellipse()</code>和<code>polygon()</code>描绘一些常见的图像。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/png/2985494/1607320617875-5ea9cbf9-c1c0-49df-9d01-9e7581e7a852.png" alt="img"></p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;ul class=&quot;figure-box&quot; style=&quot;--count: 12&quot;&gt;</span></span>
<span class="line"><span>    &lt;li class=&quot;star&quot; style=&quot;--index: 0&quot;&gt;&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;li class=&quot;ellipse&quot; style=&quot;--index: 1&quot;&gt;&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;li class=&quot;circle&quot; style=&quot;--index: 2&quot;&gt;&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;li class=&quot;triangle&quot; style=&quot;--index: 3&quot;&gt;&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;li class=&quot;rhombus&quot; style=&quot;--index: 4&quot;&gt;&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;li class=&quot;trapezoid&quot; style=&quot;--index: 5&quot;&gt;&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;li class=&quot;parallelogram&quot; style=&quot;--index: 6&quot;&gt;&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;li class=&quot;pentagon&quot; style=&quot;--index: 7&quot;&gt;&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;li class=&quot;left-arrow&quot; style=&quot;--index: 8&quot;&gt;&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;li class=&quot;right-arrow&quot; style=&quot;--index: 9&quot;&gt;&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;li class=&quot;close&quot; style=&quot;--index: 10&quot;&gt;&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;li class=&quot;message&quot; style=&quot;--index: 11&quot;&gt;&lt;/li&gt;</span></span>
<span class="line"><span>&lt;/ul&gt;</span></span>
<span class="line"><span>.figure-box {</span></span>
<span class="line"><span>    display: flex;</span></span>
<span class="line"><span>    flex-wrap: wrap;</span></span>
<span class="line"><span>    justify-content: center;</span></span>
<span class="line"><span>    max-width: 720px;</span></span>
<span class="line"><span>    li {</span></span>
<span class="line"><span>        --Θ: calc(var(--index) / var(--count) * 1turn);</span></span>
<span class="line"><span>        margin: 10px;</span></span>
<span class="line"><span>        width: 100px;</span></span>
<span class="line"><span>        height: 100px;</span></span>
<span class="line"><span>        background-color: #3c9;</span></span>
<span class="line"><span>        filter: hue-rotate(var(--Θ));</span></span>
<span class="line"><span>        &amp;.star {</span></span>
<span class="line"><span>            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;.ellipse {</span></span>
<span class="line"><span>            clip-path: ellipse(40% 50% at 50% 50%);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;.circle {</span></span>
<span class="line"><span>            clip-path: circle(50% at 50% 50%);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;.triangle {</span></span>
<span class="line"><span>            clip-path: polygon(50% 0%, 0% 100%, 100% 100%);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;.rhombus {</span></span>
<span class="line"><span>            clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;.trapezoid {</span></span>
<span class="line"><span>            clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;.parallelogram {</span></span>
<span class="line"><span>            clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;.pentagon {</span></span>
<span class="line"><span>            clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;.left-arrow {</span></span>
<span class="line"><span>            clip-path: polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;.right-arrow {</span></span>
<span class="line"><span>            clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;.close {</span></span>
<span class="line"><span>            clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;.message {</span></span>
<span class="line"><span>            clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>整体来说很简单，在特定坐标上标记连线的点即可。推荐一个裁剪路径的网站<a href="https://bennettfeely.com/clippy" target="_blank" rel="noreferrer">Clippy</a>，轻松绘制出各种由线条组成的裁剪区域。<code>clip-path</code>有一个明显的限制，就是只能裁剪折线形成的图形，不能裁剪曲线形成的图形。</p><hr><ul><li>在线演示：<a href="https://codepen.io/JowayYoung/pen/vYNXvXq" target="_blank" rel="noreferrer">Here</a></li><li>在线源码：<a href="https://github.com/JowayYoung/idea-css/blob/master/icss/src/components/figure/%E4%BD%BF%E7%94%A8clip-path%E6%8F%8F%E7%BB%98%E5%90%84%E7%A7%8D%E5%9B%BE%E5%BD%A2.vue" target="_blank" rel="noreferrer">Here</a></li></ul><h3 id="其他函数" tabindex="-1">其他函数 <a class="header-anchor" href="#其他函数" aria-label="Permalink to &quot;其他函数&quot;">​</a></h3><p>由于后续章节的每一章都单独挂钩<code>背景函数</code>、<code>滤镜函数</code>、<code>变换函数</code>和<code>缓动函数</code>，所以本节就不再讲解这四个函数了。后续章节都会对这些函数进行一些详细的讲解。</p>`,98),o=[l];function c(t,i,d,r,g,u){return a(),s("div",null,o)}const b=n(e,[["render",c]]);export{m as __pageData,b as default};
