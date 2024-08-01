import{_ as n,c as s,o as a,a2 as p}from"./chunks/framework.D8Prfz4N.js";const b=JSON.parse('{"title":"9.技巧篇：选择器","description":"","frontmatter":{},"headers":[],"relativePath":"pamphlet/玩转css艺术之美/9.技巧篇：选择器.md","filePath":"pamphlet/玩转css艺术之美/9.技巧篇：选择器.md"}'),t={name:"pamphlet/玩转css艺术之美/9.技巧篇：选择器.md"},e=p(`<h1 id="_9-技巧篇-选择器" tabindex="-1">9.技巧篇：选择器 <a class="header-anchor" href="#_9-技巧篇-选择器" aria-label="Permalink to &quot;9.技巧篇：选择器&quot;">​</a></h1><h3 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h3><p>最近查看了几位同事的代码，发现很多CSS编写习惯都是清一色的类而无相应的选择器，层层嵌套的标签都包含至少一个类。有些同学会问，很多文章都说<code>选择器</code>有性能问题，为何还需使用<code>选择器</code>呢？</p><p>是的，<code>选择器</code>和<code>类</code>对比起来性能上确实没后者那么好，但是如今浏览器对于CSS的解析速度已得到大大的提升，完全可忽略<code>选择器</code>那丁点的性能问题。有兴趣的同学可自行百度搜索<code>CSS选择器性能</code>的相关问题学习。多一个技巧多一份保障！</p><p>本章不细说<code>选择器</code>的性能问题，而是细说怎样用好<code>选择器</code>。先来对<code>选择器</code>做一个功能性的分类。当然熟悉全部CSS选择器是玩转CSS的<code>最最最最最基本功</code>。</p><h3 id="分类" tabindex="-1">分类 <a class="header-anchor" href="#分类" aria-label="Permalink to &quot;分类&quot;">​</a></h3><p>在讲解<code>选择器</code>的奇妙用处前，还是先把选择器分类记忆吧。没错，笔者就是喜欢总结。由于<code>选择器</code>的标准概念上无作出明确的分类，以下的分类是为了方便记忆而整理的。</p><p>基础选择器</p><table tabindex="0"><thead><tr><th>选择器</th><th>别名</th><th>说明</th><th>版本</th></tr></thead><tbody><tr><td><code>tag</code></td><td>标签选择器</td><td>指定类型的<code>标签</code></td><td>1</td></tr><tr><td><code>#id</code></td><td>ID选择器</td><td>指定身份的<code>标签</code></td><td>1</td></tr><tr><td><code>.class</code></td><td>类选择器</td><td>指定类名的<code>标签</code></td><td>1</td></tr><tr><td><code>*</code></td><td>通配选择器</td><td>所有类型的<code>标签</code></td><td>2</td></tr></tbody></table><p>层次选择器</p><table tabindex="0"><thead><tr><th>选择器</th><th>别名</th><th>说明</th><th>版本</th></tr></thead><tbody><tr><td><code>elemP elemC</code></td><td><code>后代选择器</code></td><td>元素的<code>后代元素</code></td><td>1</td></tr><tr><td><code>elemP&gt;elemC</code></td><td><code>子代选择器</code></td><td>元素的<code>子代元素</code></td><td>2</td></tr><tr><td><code>elem1+elem2</code></td><td><code>相邻同胞选择器</code></td><td>元素相邻的<code>同胞元素</code></td><td>2</td></tr><tr><td><code>elem1~elem2</code></td><td><code>通用同胞选择器</code></td><td>元素后面的<code>同胞元素</code></td><td>3</td></tr></tbody></table><p>集合选择器</p><table tabindex="0"><thead><tr><th>选择器</th><th>别名</th><th>说明</th><th>版本</th></tr></thead><tbody><tr><td><code>elem1,elem2</code></td><td><code>并集选择器</code></td><td>多个指定的<code>元素</code></td><td>1</td></tr><tr><td><code>elem.class</code></td><td><code>交集选择器</code></td><td>指定类名的<code>元素</code></td><td>1</td></tr></tbody></table><p>条件选择器</p><table tabindex="0"><thead><tr><th>选择器</th><th>说明</th><th>版本</th></tr></thead><tbody><tr><td><code>:lang</code></td><td>指定标记语言的<code>元素</code></td><td>2</td></tr><tr><td><code>:dir()</code></td><td>指定编写方向的<code>元素</code></td><td>4</td></tr><tr><td><code>:has</code></td><td>包含指定元素的<code>元素</code></td><td>4</td></tr><tr><td><code>:is</code></td><td>指定条件的<code>元素</code></td><td>4</td></tr><tr><td><code>:not</code></td><td>非指定条件的<code>元素</code></td><td>4</td></tr><tr><td><code>:where</code></td><td>指定条件的<code>元素</code></td><td>4</td></tr><tr><td><code>:scope</code></td><td>指定<code>元素</code>作为参考点</td><td>4</td></tr><tr><td><code>:any-link</code></td><td>所有包含<code>href</code>的<code>链接元素</code></td><td>4</td></tr><tr><td><code>:local-link</code></td><td>所有包含<code>href</code>且属于绝对地址的<code>链接元素</code></td><td>4</td></tr></tbody></table><p>行为选择器</p><table tabindex="0"><thead><tr><th>选择器</th><th>说明</th><th>版本</th></tr></thead><tbody><tr><td><code>:active</code></td><td>鼠标激活的<code>元素</code></td><td>1</td></tr><tr><td><code>:hover</code></td><td>鼠标悬浮的<code>元素</code></td><td>1</td></tr><tr><td><code>::selection</code></td><td>鼠标选中的<code>元素</code></td><td>3</td></tr></tbody></table><p>状态选择器</p><table tabindex="0"><thead><tr><th>选择器</th><th>说明</th><th>版本</th></tr></thead><tbody><tr><td><code>:target</code></td><td>当前锚点的<code>元素</code></td><td>3</td></tr><tr><td><code>:link</code></td><td>未访问的<code>链接元素</code></td><td>1</td></tr><tr><td><code>:visited</code></td><td>已访问的<code>链接元素</code></td><td>1</td></tr><tr><td><code>:focus</code></td><td>输入聚焦的<code>表单元素</code></td><td>2</td></tr><tr><td><code>:required</code></td><td>输入必填的<code>表单元素</code></td><td>3</td></tr><tr><td><code>:valid</code></td><td>输入合法的<code>表单元素</code></td><td>3</td></tr><tr><td><code>:invalid</code></td><td>输入非法的<code>表单元素</code></td><td>3</td></tr><tr><td><code>:in-range</code></td><td>输入范围以内的<code>表单元素</code></td><td>3</td></tr><tr><td><code>:out-of-range</code></td><td>输入范围以外的<code>表单元素</code></td><td>3</td></tr><tr><td><code>:checked</code></td><td>选项选中的<code>表单元素</code></td><td>3</td></tr><tr><td><code>:optional</code></td><td>选项可选的<code>表单元素</code></td><td>3</td></tr><tr><td><code>:enabled</code></td><td>事件启用的<code>表单元素</code></td><td>3</td></tr><tr><td><code>:disabled</code></td><td>事件禁用的<code>表单元素</code></td><td>3</td></tr><tr><td><code>:read-only</code></td><td>只读的<code>表单元素</code></td><td>3</td></tr><tr><td><code>:read-write</code></td><td>可读可写的<code>表单元素</code></td><td>3</td></tr><tr><td><code>:target-within</code></td><td>内部锚点元素处于激活状态的<code>元素</code></td><td>4</td></tr><tr><td><code>:focus-within</code></td><td>内部表单元素处于聚焦状态的<code>元素</code></td><td>4</td></tr><tr><td><code>:focus-visible</code></td><td>输入聚焦的<code>表单元素</code></td><td>4</td></tr><tr><td><code>:blank</code></td><td>输入为空的<code>表单元素</code></td><td>4</td></tr><tr><td><code>:user-invalid</code></td><td>输入合法的<code>表单元素</code></td><td>4</td></tr><tr><td><code>:indeterminate</code></td><td>选项未定的<code>表单元素</code></td><td>4</td></tr><tr><td><code>:placeholder-shown</code></td><td>占位显示的<code>表单元素</code></td><td>4</td></tr><tr><td><code>:current()</code></td><td>浏览中的<code>元素</code></td><td>4</td></tr><tr><td><code>:past()</code></td><td>已浏览的<code>元素</code></td><td>4</td></tr><tr><td><code>:future()</code></td><td>未浏览的<code>元素</code></td><td>4</td></tr><tr><td><code>:playing</code></td><td>开始播放的<code>媒体元素</code></td><td>4</td></tr><tr><td><code>:paused</code></td><td>暂停播放的<code>媒体元素</code></td><td>4</td></tr></tbody></table><p>结构选择器</p><table tabindex="0"><thead><tr><th>选择器</th><th>说明</th><th>版本</th></tr></thead><tbody><tr><td><code>:root</code></td><td>文档的<code>根元素</code></td><td>3</td></tr><tr><td><code>:empty</code></td><td>无子元素的<code>元素</code></td><td>3</td></tr><tr><td><code>:first-letter</code></td><td>元素的<code>首字母</code></td><td>1</td></tr><tr><td><code>:first-line</code></td><td>元素的<code>首行</code></td><td>1</td></tr><tr><td><code>:nth-child(n)</code></td><td>元素中指定顺序索引的<code>元素</code></td><td>3</td></tr><tr><td><code>:nth-last-child(n)</code></td><td>元素中指定逆序索引的<code>元素</code></td><td>3</td></tr><tr><td><code>:first-child</code></td><td>元素中为首的<code>元素</code></td><td>2</td></tr><tr><td><code>:last-child</code></td><td>元素中为尾的<code>元素</code></td><td>3</td></tr><tr><td><code>:only-child</code></td><td>父元素仅有该元素的<code>元素</code></td><td>3</td></tr><tr><td><code>:nth-of-type(n)</code></td><td>标签中指定顺序索引的<code>标签</code></td><td>3</td></tr><tr><td><code>:nth-last-of-type(n)</code></td><td>标签中指定逆序索引的<code>标签</code></td><td>3</td></tr><tr><td><code>:first-of-type</code></td><td>标签中为首的<code>标签</code></td><td>3</td></tr><tr><td><code>:last-of-type</code></td><td>标签中为尾<code>标签</code></td><td>3</td></tr><tr><td><code>:only-of-type</code></td><td>父元素仅有该标签的<code>标签</code></td><td>3</td></tr></tbody></table><p>属性选择器</p><table tabindex="0"><thead><tr><th>选择器</th><th>说明</th><th>版本</th></tr></thead><tbody><tr><td><code>[attr]</code></td><td>指定属性的<code>元素</code></td><td>2</td></tr><tr><td><code>[attr=val]</code></td><td>属性等于指定值的<code>元素</code></td><td>2</td></tr><tr><td><code>[attr*=val]</code></td><td>属性包含指定值的<code>元素</code></td><td>3</td></tr><tr><td><code>[attr^=val]</code></td><td>属性以指定值开头的<code>元素</code></td><td>3</td></tr><tr><td><code>[attr$=val]</code></td><td>属性以指定值结尾的<code>元素</code></td><td>3</td></tr><tr><td><code>[attr~=val]</code></td><td>属性包含指定值(完整单词)的<code>元素</code>(不推荐使用)</td><td>2</td></tr><tr><td>\`[attr</td><td>=val]\`</td><td>属性以指定值(完整单词)开头的<code>元素</code>(不推荐使用)</td></tr></tbody></table><p>伪元素</p><table tabindex="0"><thead><tr><th>选择器</th><th>说明</th><th>版本</th></tr></thead><tbody><tr><td><code>::before</code></td><td>在元素前插入的内容</td><td>2</td></tr><tr><td><code>::after</code></td><td>在元素后插入的内容</td><td>2</td></tr></tbody></table><h3 id="优势" tabindex="-1">优势 <a class="header-anchor" href="#优势" aria-label="Permalink to &quot;优势&quot;">​</a></h3><p>话说选择器若无用处，那<code>W3C</code>还干嘛把它纳入到标准里呢？<code>选择器</code>的劣势就不啰嗦了，使用不当可能会引起<code>解析性能问题</code>，这个对于现代浏览器来说几乎可忽略，除非你还是<code>IExplorer</code>的忠实粉丝。使用选择器有什么好处呢？笔者给各位同学总结一下。</p><ul><li><p>对于那些结构与行为分离的写法，使用<code>sass/less</code>编写属性时结构会更清晰易读</p></li><li><p>减少很多无用或少用的类，保持<code>css文件</code>的整洁性和观赏性，代码也是一门艺术</p></li><li><p>减少修改类而有可能导致样式失效的问题，有时修改类但无确保HTML中和CSS中的一致而导致样式失效</p></li><li><p>减少无实质性使用的类，例如很多层嵌套的标签，这些标签可能只使用到一个CSS属性，就没必要建个类关联</p></li><li><p>使用选择器可实现一些看似只能由JS才能实现的效果，既可减少代码量也可减少JS对DOM的操作，使得交互效果更流畅</p></li></ul><h3 id="场景" tabindex="-1">场景 <a class="header-anchor" href="#场景" aria-label="Permalink to &quot;场景&quot;">​</a></h3><p>由于选择器太多，笔者选择几个最具代表性的耍耍，通过选择器的妙用实现一些看似只能由JS才能实现的效果。未提到的选择器可能在其他地方穿插着讲解，请各位同学放心学习。</p><h5 id="和" tabindex="-1">+和~ <a class="header-anchor" href="#和" aria-label="Permalink to &quot;+和~&quot;">​</a></h5><p><code>+/~</code>都是作用于当前节点后的同胞节点，但是两者有一个明显的区别，<code>+</code>是针对紧随该节点的节点，而<code>~</code>是针对后面所有的节点，包括紧随该节点的节点。<code>~</code>还可针对一些特定类和选择器的节点，所以其使用性更广泛。</p><p>另外，<code>+/~</code>通常都会结合<code>:checked</code>完成一些高难度的纯CSS效果，当<code>&lt;input&gt;</code>触发了<code>:checked</code>选中状态后可通过<code>+/~</code>带动后面指定的节点声明一些特别属性。</p><p>通常其CSS代码形式如下。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>input:checked + div {}</span></span>
<span class="line"><span>input:checked ~ div {}</span></span></code></pre></div><p><code>+/~</code>的用途很广，静态效果和动态效果都能用上它，是两个很关键的选择器。以下通过动静结合的方式展示<code>+/~</code>的用途。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/gif/2985494/1607320896713-404124c3-52c0-4bfa-96be-88df294e9a0b.gif" alt="img"></p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div class=&quot;specify-selector&quot;&gt;</span></span>
<span class="line"><span>    &lt;ul class=&quot;list&quot;&gt;</span></span>
<span class="line"><span>        &lt;li&gt;同胞元素&lt;/li&gt;</span></span>
<span class="line"><span>        &lt;li class=&quot;next&quot;&gt;当前元素&lt;/li&gt;</span></span>
<span class="line"><span>        &lt;li&gt;同胞元素&lt;/li&gt;</span></span>
<span class="line"><span>        &lt;li&gt;同胞元素&lt;/li&gt;</span></span>
<span class="line"><span>        &lt;li&gt;同胞元素&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;/ul&gt;</span></span>
<span class="line"><span>    &lt;ul class=&quot;list&quot;&gt;</span></span>
<span class="line"><span>        &lt;li&gt;同胞元素&lt;/li&gt;</span></span>
<span class="line"><span>        &lt;li class=&quot;next-all&quot;&gt;当前元素&lt;/li&gt;</span></span>
<span class="line"><span>        &lt;li&gt;同胞元素&lt;/li&gt;</span></span>
<span class="line"><span>        &lt;li&gt;同胞元素&lt;/li&gt;</span></span>
<span class="line"><span>        &lt;li&gt;同胞元素&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;/ul&gt;</span></span>
<span class="line"><span>    &lt;ul class=&quot;list&quot;&gt;</span></span>
<span class="line"><span>        &lt;li&gt;同胞元素&lt;/li&gt;</span></span>
<span class="line"><span>        &lt;li class=&quot;next-filter&quot;&gt;当前元素&lt;/li&gt;</span></span>
<span class="line"><span>        &lt;li&gt;同胞元素&lt;/li&gt;</span></span>
<span class="line"><span>        &lt;li class=&quot;filter&quot;&gt;同胞元素&lt;/li&gt;</span></span>
<span class="line"><span>        &lt;li&gt;同胞元素&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;/ul&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>&lt;div class=&quot;specify-selector&quot;&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;button&quot;&gt;</span></span>
<span class="line"><span>        &lt;input id=&quot;btn1&quot; type=&quot;radio&quot; name=&quot;btns&quot; hidden&gt;</span></span>
<span class="line"><span>        &lt;label for=&quot;btn1&quot;&gt;点击我切换样式&lt;/label&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;button&quot;&gt;</span></span>
<span class="line"><span>        &lt;input id=&quot;btn2&quot; type=&quot;radio&quot; name=&quot;btns&quot; hidden&gt;</span></span>
<span class="line"><span>        &lt;label for=&quot;btn2&quot;&gt;点击我切换样式&lt;/label&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;button&quot;&gt;</span></span>
<span class="line"><span>        &lt;input id=&quot;btn3&quot; type=&quot;radio&quot; name=&quot;btns&quot; hidden&gt;</span></span>
<span class="line"><span>        &lt;label for=&quot;btn3&quot;&gt;点击我切换样式&lt;/label&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>.specify-selector {</span></span>
<span class="line"><span>    display: flex;</span></span>
<span class="line"><span>    &amp; + .specify-selector {</span></span>
<span class="line"><span>        margin-top: 20px;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .list {</span></span>
<span class="line"><span>        border: 1px solid #f66;</span></span>
<span class="line"><span>        width: 200px;</span></span>
<span class="line"><span>        line-height: 2;</span></span>
<span class="line"><span>        font-weight: bold;</span></span>
<span class="line"><span>        font-size: 20px;</span></span>
<span class="line"><span>        color: #f66;</span></span>
<span class="line"><span>        &amp; + .list {</span></span>
<span class="line"><span>            margin-left: 20px;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        li {</span></span>
<span class="line"><span>            padding: 0 10px;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        .next {</span></span>
<span class="line"><span>            background-color: #66f;</span></span>
<span class="line"><span>            color: #fff;</span></span>
<span class="line"><span>            &amp; + li {</span></span>
<span class="line"><span>                background-color: #f90;</span></span>
<span class="line"><span>                color: #fff;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        .next-all {</span></span>
<span class="line"><span>            background-color: #66f;</span></span>
<span class="line"><span>            color: #fff;</span></span>
<span class="line"><span>            &amp; ~ li {</span></span>
<span class="line"><span>                background-color: #09f;</span></span>
<span class="line"><span>                color: #fff;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        .next-filter {</span></span>
<span class="line"><span>            background-color: #66f;</span></span>
<span class="line"><span>            color: #fff;</span></span>
<span class="line"><span>            &amp; ~ .filter {</span></span>
<span class="line"><span>                background-color: #09f;</span></span>
<span class="line"><span>                color: #fff;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .button {</span></span>
<span class="line"><span>        &amp; + .button {</span></span>
<span class="line"><span>            margin-left: 20px;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        label {</span></span>
<span class="line"><span>            display: block;</span></span>
<span class="line"><span>            padding: 0 10px;</span></span>
<span class="line"><span>            height: 40px;</span></span>
<span class="line"><span>            background-color: #3c9;</span></span>
<span class="line"><span>            cursor: pointer;</span></span>
<span class="line"><span>            line-height: 40px;</span></span>
<span class="line"><span>            font-size: 16px;</span></span>
<span class="line"><span>            color: #fff;</span></span>
<span class="line"><span>            transition: all 300ms;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        input:checked + label {</span></span>
<span class="line"><span>            padding: 0 20px;</span></span>
<span class="line"><span>            border-radius: 20px;</span></span>
<span class="line"><span>            background-color: #f66;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><ul><li>在线演示：<a href="https://codepen.io/JowayYoung/pen/BayRWgL" target="_blank" rel="noreferrer">Here</a></li><li>在线源码：<a href="https://github.com/JowayYoung/idea-css/blob/master/icss/src/components/behavior/%E4%BD%BF%E7%94%A8+%E6%88%96~%E9%80%89%E6%8B%A9%E6%8C%87%E5%AE%9A%E5%85%83%E7%B4%A0.vue" target="_blank" rel="noreferrer">Here</a></li></ul><h5 id="hover" tabindex="-1">:hover <a class="header-anchor" href="#hover" aria-label="Permalink to &quot;:hover&quot;">​</a></h5><p><code>:hover</code>作用于鼠标悬浮的节点，是一个很好用的选择器。在特定场景可代替<code>mouseenter</code>和<code>mouseleave</code>两个鼠标事件，加上<code>transtion</code>让节点的动画更丝滑。</p><p>结合<code>attr()</code>有一个很好用的场景，就是鼠标悬浮在某个节点上显示提示浮层，提示浮层里包含着该动作的文本。</p><ul><li><p>给节点标记一个用户属性<code>data-*</code></p></li><li><p>当鼠标悬浮在该节点上触发<code>:hover</code></p></li><li><p>通过<code>attr()</code>获取<code>data-*</code>的内容</p></li><li><p>将<code>data-*</code>的内容赋值到伪元素的<code>content</code>上</p></li></ul><p><img src="https://cdn.nlark.com/yuque/0/2020/gif/2985494/1607320896652-7046f7f7-52d7-4849-86d8-c9dfa6c38fe3.gif" alt="img"></p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;ul class=&quot;hover-tips&quot;&gt;</span></span>
<span class="line"><span>    &lt;li data-name=&quot;姨妈红&quot;&gt;&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;li data-name=&quot;基佬紫&quot;&gt;&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;li data-name=&quot;箩底橙&quot;&gt;&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;li data-name=&quot;姣婆蓝&quot;&gt;&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;li data-name=&quot;大粪青&quot;&gt;&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;li data-name=&quot;原谅绿&quot;&gt;&lt;/li&gt;</span></span>
<span class="line"><span>&lt;/ul&gt;</span></span>
<span class="line"><span>$color-list: #f66 #66f #f90 #09f #9c3 #3c9;</span></span>
<span class="line"><span>.hover-tips {</span></span>
<span class="line"><span>    display: flex;</span></span>
<span class="line"><span>    justify-content: space-between;</span></span>
<span class="line"><span>    width: 200px;</span></span>
<span class="line"><span>    li {</span></span>
<span class="line"><span>        position: relative;</span></span>
<span class="line"><span>        padding: 2px;</span></span>
<span class="line"><span>        border: 2px solid transparent;</span></span>
<span class="line"><span>        border-radius: 100%;</span></span>
<span class="line"><span>        width: 24px;</span></span>
<span class="line"><span>        height: 24px;</span></span>
<span class="line"><span>        background-clip: content-box;</span></span>
<span class="line"><span>        cursor: pointer;</span></span>
<span class="line"><span>        transition: all 300ms;</span></span>
<span class="line"><span>        &amp;::before,</span></span>
<span class="line"><span>        &amp;::after {</span></span>
<span class="line"><span>            position: absolute;</span></span>
<span class="line"><span>            left: 50%;</span></span>
<span class="line"><span>            bottom: 100%;</span></span>
<span class="line"><span>            opacity: 0;</span></span>
<span class="line"><span>            transform: translate3d(0, -30px, 0);</span></span>
<span class="line"><span>            transition: all 300ms;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;::before {</span></span>
<span class="line"><span>            margin: 0 0 12px -35px;</span></span>
<span class="line"><span>            border-radius: 5px;</span></span>
<span class="line"><span>            width: 70px;</span></span>
<span class="line"><span>            height: 30px;</span></span>
<span class="line"><span>            background-color: rgba(#000, .5);</span></span>
<span class="line"><span>            line-height: 30px;</span></span>
<span class="line"><span>            text-align: center;</span></span>
<span class="line"><span>            color: #fff;</span></span>
<span class="line"><span>            content: attr(data-name);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;::after {</span></span>
<span class="line"><span>            margin-left: -6px;</span></span>
<span class="line"><span>            border: 6px solid transparent;</span></span>
<span class="line"><span>            border-top-color: rgba(#000, .5);</span></span>
<span class="line"><span>            width: 0;</span></span>
<span class="line"><span>            height: 0;</span></span>
<span class="line"><span>            content: &quot;&quot;;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        @each $color in $color-list {</span></span>
<span class="line"><span>            $index: index($color-list, $color);</span></span>
<span class="line"><span>            &amp;:nth-child(#{$index}) {</span></span>
<span class="line"><span>                background-color: $color;</span></span>
<span class="line"><span>                &amp;:hover {</span></span>
<span class="line"><span>                    border-color: $color;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;:hover {</span></span>
<span class="line"><span>            &amp;::before,</span></span>
<span class="line"><span>            &amp;::after {</span></span>
<span class="line"><span>                opacity: 1;</span></span>
<span class="line"><span>                transform: translate3d(0, 0, 0);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><ul><li>在线演示：<a href="https://codepen.io/JowayYoung/pen/pojgxpg" target="_blank" rel="noreferrer">Here</a></li><li>在线源码：<a href="https://github.com/JowayYoung/idea-css/blob/master/icss/src/components/behavior/%E4%BD%BF%E7%94%A8@hover%E5%AE%9A%E5%88%B6%E6%82%AC%E6%B5%AE%E6%8F%90%E7%A4%BA.vue" target="_blank" rel="noreferrer">Here</a></li></ul><h5 id="valid和-invalid" tabindex="-1">:valid和:invalid <a class="header-anchor" href="#valid和-invalid" aria-label="Permalink to &quot;:valid和:invalid&quot;">​</a></h5><p>很多同学可能还会使用JS去判断表单输入内容是否合法，其实HTML5发布后，可用纯CSS完成这些工作，正确搭配一些属性能大大减少校验表单的代码量。</p><p>完成一个完整的表单验证，需以下HTML属性和选择器搭配。</p><ul><li><p><strong>placeholder</strong>：占位，在未输入内容时显示提示文本</p></li><li><p><strong>pattern</strong>：正则，在输入内容时触发正则验证</p></li><li><p><strong>:valid</strong>：作用于输入合法的表单节点</p></li><li><p><strong>:invalid</strong>：作用于输入非法的表单节点</p></li></ul><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;input type=&quot;text&quot; placeholder=&quot;&quot; pattern=&quot;&quot;&gt;</span></span>
<span class="line"><span>input:valid {}</span></span>
<span class="line"><span>input:invalid {}</span></span></code></pre></div><p>这个<code>pattern</code>与JS正则有点不同，JS的正则形式是<code>/regexp/</code>，而<code>pattern</code>的正则形式只需<code>/regexp/</code>里的<code>regexp</code>。这个校验过程是动态触发的，监听了<code>input</code>这个键盘事件，当输入内容合法时触发<code>:valid</code>，当输入内容非法时触发<code>:invalid</code>。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/gif/2985494/1607320896794-135b363f-2f63-41a1-9d0b-3f33f5f9665e.gif" alt="img"></p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;form class=&quot;form-validation&quot;&gt;</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>        &lt;label&gt;名字&lt;/label&gt;</span></span>
<span class="line"><span>        &lt;input type=&quot;text&quot; placeholder=&quot;请输入你的名字(1到10个中文)&quot; pattern=&quot;^[\\u4e00-\\u9fa5]{1,10}$&quot; required&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>        &lt;label&gt;手机&lt;/label&gt;</span></span>
<span class="line"><span>        &lt;input type=&quot;text&quot; placeholder=&quot;请输入你的手机&quot; pattern=&quot;^1[3456789]\\d{9}$&quot; required&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>        &lt;label&gt;简介&lt;/label&gt;</span></span>
<span class="line"><span>        &lt;textarea required&gt;&lt;/textarea&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/form&gt;</span></span>
<span class="line"><span>.form-validation {</span></span>
<span class="line"><span>    width: 500px;</span></span>
<span class="line"><span>    div + div {</span></span>
<span class="line"><span>        margin-top: 10px;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    label {</span></span>
<span class="line"><span>        display: block;</span></span>
<span class="line"><span>        padding-bottom: 5px;</span></span>
<span class="line"><span>        font-weight: bold;</span></span>
<span class="line"><span>        font-size: 16px;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    input,</span></span>
<span class="line"><span>    textarea {</span></span>
<span class="line"><span>        display: block;</span></span>
<span class="line"><span>        padding: 0 20px;</span></span>
<span class="line"><span>        border: 1px solid #ccc;</span></span>
<span class="line"><span>        width: 100%;</span></span>
<span class="line"><span>        height: 40px;</span></span>
<span class="line"><span>        outline: none;</span></span>
<span class="line"><span>        caret-color: #09f;</span></span>
<span class="line"><span>        transition: all 300ms;</span></span>
<span class="line"><span>        &amp;:valid {</span></span>
<span class="line"><span>            border-color: #3c9;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;:invalid {</span></span>
<span class="line"><span>            border-color: #f66;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    textarea {</span></span>
<span class="line"><span>        height: 122px;</span></span>
<span class="line"><span>        resize: none;</span></span>
<span class="line"><span>        line-height: 30px;</span></span>
<span class="line"><span>        font-size: 16px;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><ul><li>在线演示：<a href="https://codepen.io/JowayYoung/pen/QemxKr" target="_blank" rel="noreferrer">Here</a></li><li>在线源码：<a href="https://github.com/JowayYoung/idea-css/blob/master/icss/src/components/behavior/%E4%BD%BF%E7%94%A8@valid%E5%92%8C@invalid%E6%A0%A1%E9%AA%8C%E8%A1%A8%E5%8D%95%E5%86%85%E5%AE%B9.vue" target="_blank" rel="noreferrer">Here</a></li></ul><h5 id="checked" tabindex="-1">:checked <a class="header-anchor" href="#checked" aria-label="Permalink to &quot;:checked&quot;">​</a></h5><p><code>:checked</code>作用于选项选中的表单节点，当<code>&lt;input&gt;</code>的<code>type</code>设置成<code>radio</code>和<code>checkbox</code>时可用。在<strong>CSS神操作骚技巧</strong>中是一个很重要的技巧，主要是用于模拟鼠标点击事件。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/gif/2985494/1607320896858-c464c244-18e2-4b97-990a-4cb2c33ad461.gif" alt="img"></p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;input class=&quot;ios-switch&quot; type=&quot;checkbox&quot;&gt;</span></span>
<span class="line"><span>.btn {</span></span>
<span class="line"><span>    border-radius: 31px;</span></span>
<span class="line"><span>    width: 102px;</span></span>
<span class="line"><span>    height: 62px;</span></span>
<span class="line"><span>    background-color: #e9e9eb;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.ios-switch {</span></span>
<span class="line"><span>    position: relative;</span></span>
<span class="line"><span>    appearance: none;</span></span>
<span class="line"><span>    cursor: pointer;</span></span>
<span class="line"><span>    transition: all 100ms;</span></span>
<span class="line"><span>    @extend .btn;</span></span>
<span class="line"><span>    &amp;::before {</span></span>
<span class="line"><span>        position: absolute;</span></span>
<span class="line"><span>        content: &quot;&quot;;</span></span>
<span class="line"><span>        transition: all 300ms cubic-bezier(.45, 1, .4, 1);</span></span>
<span class="line"><span>        @extend .btn;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    &amp;::after {</span></span>
<span class="line"><span>        position: absolute;</span></span>
<span class="line"><span>        left: 4px;</span></span>
<span class="line"><span>        top: 4px;</span></span>
<span class="line"><span>        border-radius: 27px;</span></span>
<span class="line"><span>        width: 54px;</span></span>
<span class="line"><span>        height: 54px;</span></span>
<span class="line"><span>        background-color: #fff;</span></span>
<span class="line"><span>        box-shadow: 1px 1px 5px rgba(#000, .3);</span></span>
<span class="line"><span>        content: &quot;&quot;;</span></span>
<span class="line"><span>        transition: all 300ms cubic-bezier(.4, .4, .25, 1.35);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    &amp;:checked {</span></span>
<span class="line"><span>        background-color: #5eb662;</span></span>
<span class="line"><span>        &amp;::before {</span></span>
<span class="line"><span>            transform: scale(0);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;::after {</span></span>
<span class="line"><span>            transform: translateX(40px);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><ul><li>在线演示：<a href="https://codepen.io/JowayYoung/pen/PoqgbGV" target="_blank" rel="noreferrer">Here</a></li><li>在线源码：<a href="https://github.com/JowayYoung/idea-css/blob/master/icss/src/components/component/iOS%E5%BC%80%E5%85%B3%E6%8C%89%E9%92%AE.vue" target="_blank" rel="noreferrer">Here</a></li></ul><p><code>&lt;input&gt;</code>与<code>&lt;label&gt;</code>的巧妙搭配</p><p>上述有提到与<code>+/~</code>的搭配使用，在此还有一个很重要的技巧，就是结合<code>&lt;label&gt;</code>使用。为何要结合<code>&lt;label&gt;</code>呢？因为要让<code>input:checked + div {}</code>或<code>input:checked ~ div {}</code>起效，其HTML结构必须像以下那样。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;input type=&quot;radio&quot;&gt;</span></span>
<span class="line"><span>&lt;div&gt;&lt;/div&gt;</span></span></code></pre></div><p>这样就无法分离结构与行为了，导致CSS必须跟着HTML走，只能使用绝对定位将<code>&lt;input&gt;</code>固定到指定位置。使用<code>&lt;label&gt;</code>绑定<code>&lt;input&gt;</code>，可将<code>&lt;input&gt;</code>的鼠标选择事件转移到<code>&lt;label&gt;</code>上，由<code>&lt;label&gt;</code>控制选中状态。那么HTML结构可改为以下那样，此时的<code>&lt;input&gt;</code>可设置<code>hidden</code>隐藏起来，不参与任何排版。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;input type=&quot;radio&quot; id=&quot;btn&quot; hidden&gt;</span></span>
<span class="line"><span>&lt;div&gt;</span></span>
<span class="line"><span>    &lt;label for=&quot;btn&quot;&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span></code></pre></div><p><code>&lt;input&gt;</code>使用<code>id</code>与<code>&lt;label&gt;</code>使用<code>for</code>关联起来，而<code>hidden</code>使<code>&lt;input&gt;</code>隐藏起来，不占用页面任何位置，此时<code>&lt;label&gt;</code>放置在页面任何位置都行。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>input:checked + div {}</span></span>
<span class="line"><span>input:checked ~ div {}</span></span></code></pre></div><p>笔者使用纯CSS实现的<strong>标签导航</strong>是一个很好的学习用例，在第8章<strong>变量计算</strong>有提及。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/gif/2985494/1607320896648-94f39511-0386-4d0c-9ae3-a27c78410e9f.gif" alt="img"></p><hr><ul><li>在线演示：<a href="https://codepen.io/JowayYoung/pen/oNvzoZg" target="_blank" rel="noreferrer">Here</a></li><li>在线源码：<a href="https://github.com/JowayYoung/idea-css/blob/master/icss/src/components/component/%E6%A0%87%E7%AD%BE%E5%AF%BC%E8%88%AA.vue" target="_blank" rel="noreferrer">Here</a></li></ul><h5 id="focus-within" tabindex="-1">:focus-within <a class="header-anchor" href="#focus-within" aria-label="Permalink to &quot;:focus-within&quot;">​</a></h5><p><code>:focus-within</code>作用于内部表单节点处于聚焦状态的节点。它监听当前节点里是否有表单节点，且该表单节点是否处于聚焦状态。</p><p>有些同学听上去可能觉得拗口，其实它是一个简单易用的属性。表单控件触发<code>focus</code>和<code>blur</code>两个鼠标事件后往祖先节点冒泡，在祖先节点上通过<code>:focus-within</code>捕获该冒泡事件声明样式。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/gif/2985494/1607320897703-ed07ec25-3851-41fe-8b12-145c1085d96a.gif" alt="img"></p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;form class=&quot;bubble-distribution&quot;&gt;</span></span>
<span class="line"><span>    &lt;h3&gt;注册&lt;/h3&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;accout&quot;&gt;</span></span>
<span class="line"><span>        &lt;input type=&quot;text&quot; placeholder=&quot;请输入手机或邮箱&quot; pattern=&quot;^1[3456789]\\d{9}$|^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$&quot; required&gt;</span></span>
<span class="line"><span>        &lt;img src=&quot;https://b-gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png&quot;&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;password&quot;&gt;</span></span>
<span class="line"><span>        &lt;input type=&quot;password&quot; placeholder=&quot;请输入密码(6到20位字符)&quot; pattern=&quot;^[\\dA-Za-z_]{6,20}$&quot; required&gt;</span></span>
<span class="line"><span>        &lt;img src=&quot;https://b-gold-cdn.xitu.io/v3/static/img/blindfold.58ce423.png&quot;&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;code&quot;&gt;</span></span>
<span class="line"><span>        &lt;input type=&quot;text&quot; placeholder=&quot;请输入邀请码(6位数字)&quot; pattern=&quot;^[\\d]{6}$&quot; maxLength=&quot;6&quot; required&gt;</span></span>
<span class="line"><span>        &lt;button type=&quot;button&quot;&gt;查询&lt;/button&gt;</span></span>
<span class="line"><span>        &lt;img src=&quot;https://b-gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png&quot;&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;img src=&quot;https://b-gold-cdn.xitu.io/v3/static/img/normal.0447fe9.png&quot;&gt;</span></span>
<span class="line"><span>    &lt;ul&gt;</span></span>
<span class="line"><span>        &lt;li&gt;</span></span>
<span class="line"><span>            &lt;input id=&quot;male&quot; type=&quot;radio&quot; name=&quot;sex&quot;&gt;</span></span>
<span class="line"><span>            &lt;label for=&quot;male&quot;&gt;Boy&lt;/label&gt;</span></span>
<span class="line"><span>        &lt;/li&gt;</span></span>
<span class="line"><span>        &lt;li&gt;</span></span>
<span class="line"><span>            &lt;input id=&quot;female&quot; type=&quot;radio&quot; name=&quot;sex&quot;&gt;</span></span>
<span class="line"><span>            &lt;label for=&quot;female&quot;&gt;Girl&lt;/label&gt;</span></span>
<span class="line"><span>        &lt;/li&gt;</span></span>
<span class="line"><span>    &lt;/ul&gt;</span></span>
<span class="line"><span>    &lt;button type=&quot;button&quot;&gt;注册&lt;/button&gt;</span></span>
<span class="line"><span>&lt;/form&gt;</span></span>
<span class="line"><span>.bubble-distribution {</span></span>
<span class="line"><span>    position: relative;</span></span>
<span class="line"><span>    margin-top: 50px;</span></span>
<span class="line"><span>    padding: 25px;</span></span>
<span class="line"><span>    border-radius: 2px;</span></span>
<span class="line"><span>    width: 320px;</span></span>
<span class="line"><span>    background-color: #fff;</span></span>
<span class="line"><span>    h3 {</span></span>
<span class="line"><span>        font-size: 16px;</span></span>
<span class="line"><span>        color: #333;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    div {</span></span>
<span class="line"><span>        margin-top: 10px;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    img {</span></span>
<span class="line"><span>        position: absolute;</span></span>
<span class="line"><span>        left: 50%;</span></span>
<span class="line"><span>        bottom: 100%;</span></span>
<span class="line"><span>        margin: 0 0 -20px -60px;</span></span>
<span class="line"><span>        width: 120px;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    ul {</span></span>
<span class="line"><span>        display: flex;</span></span>
<span class="line"><span>        justify-content: space-between;</span></span>
<span class="line"><span>        align-items: center;</span></span>
<span class="line"><span>        margin-top: 10px;</span></span>
<span class="line"><span>        height: 30px;</span></span>
<span class="line"><span>        line-height: 30px;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    li {</span></span>
<span class="line"><span>        position: relative;</span></span>
<span class="line"><span>        width: 45%;</span></span>
<span class="line"><span>        transition: all 300ms;</span></span>
<span class="line"><span>        &amp;:focus-within {</span></span>
<span class="line"><span>            background: linear-gradient(90deg, #09f 50%, transparent 0) repeat-x,</span></span>
<span class="line"><span>                linear-gradient(90deg, #09f 50%, transparent 0) repeat-x,</span></span>
<span class="line"><span>                linear-gradient(0deg, #09f 50%, transparent 0) repeat-y,</span></span>
<span class="line"><span>                linear-gradient(0deg, #09f 50%, transparent 0) repeat-y;</span></span>
<span class="line"><span>            background-position: 0 0, 0 100%, 0 0, 100% 0;</span></span>
<span class="line"><span>            background-size: 8px 1px, 8px 1px, 1px 8px, 1px 8px;</span></span>
<span class="line"><span>            animation: move 500ms infinite linear;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    input[type=text],</span></span>
<span class="line"><span>    input[type=password] {</span></span>
<span class="line"><span>        padding: 10px;</span></span>
<span class="line"><span>        border: 1px solid #e9e9e9;</span></span>
<span class="line"><span>        border-radius: 2px;</span></span>
<span class="line"><span>        width: 100%;</span></span>
<span class="line"><span>        height: 40px;</span></span>
<span class="line"><span>        outline: none;</span></span>
<span class="line"><span>        transition: all 300ms;</span></span>
<span class="line"><span>        &amp;:focus:valid {</span></span>
<span class="line"><span>            border-color: #09f;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;:focus:invalid {</span></span>
<span class="line"><span>            border-color: #f66;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    input[type=radio] {</span></span>
<span class="line"><span>        position: absolute;</span></span>
<span class="line"><span>        width: 0;</span></span>
<span class="line"><span>        height: 0;</span></span>
<span class="line"><span>        &amp;:checked + label {</span></span>
<span class="line"><span>            border: 3px solid transparent;</span></span>
<span class="line"><span>            background-color: #09f;</span></span>
<span class="line"><span>            color: #fff;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    label {</span></span>
<span class="line"><span>        display: block;</span></span>
<span class="line"><span>        border-bottom: 1px solid #ccc;</span></span>
<span class="line"><span>        width: 100%;</span></span>
<span class="line"><span>        background-clip: padding-box;</span></span>
<span class="line"><span>        cursor: pointer;</span></span>
<span class="line"><span>        text-align: center;</span></span>
<span class="line"><span>        transition: all 300ms;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    button {</span></span>
<span class="line"><span>        overflow: hidden;</span></span>
<span class="line"><span>        margin-top: 10px;</span></span>
<span class="line"><span>        border: none;</span></span>
<span class="line"><span>        border-radius: 2px;</span></span>
<span class="line"><span>        width: 100%;</span></span>
<span class="line"><span>        height: 40px;</span></span>
<span class="line"><span>        outline: none;</span></span>
<span class="line"><span>        background-color: #09f;</span></span>
<span class="line"><span>        cursor: pointer;</span></span>
<span class="line"><span>        color: #fff;</span></span>
<span class="line"><span>        transition: all 300ms;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .accout,</span></span>
<span class="line"><span>    .password,</span></span>
<span class="line"><span>    .code {</span></span>
<span class="line"><span>        img {</span></span>
<span class="line"><span>            display: none;</span></span>
<span class="line"><span>            margin-bottom: -27px;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        &amp;:focus-within {</span></span>
<span class="line"><span>            img {</span></span>
<span class="line"><span>                display: block;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            &amp; ~ img {</span></span>
<span class="line"><span>                display: none;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .code {</span></span>
<span class="line"><span>        display: flex;</span></span>
<span class="line"><span>        justify-content: space-between;</span></span>
<span class="line"><span>        button {</span></span>
<span class="line"><span>            margin-top: 0;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        input {</span></span>
<span class="line"><span>            &amp;:not(:placeholder-shown) {</span></span>
<span class="line"><span>                width: 70%;</span></span>
<span class="line"><span>                &amp; + button {</span></span>
<span class="line"><span>                    width: 25%;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            &amp;:placeholder-shown {</span></span>
<span class="line"><span>                width: 100%;</span></span>
<span class="line"><span>                &amp; + button {</span></span>
<span class="line"><span>                    width: 0;</span></span>
<span class="line"><span>                    opacity: 0;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>@keyframes move {</span></span>
<span class="line"><span>    to {</span></span>
<span class="line"><span>        background-position: 6% 0, -6% 100%, 0 -6%, 100% 6%;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><ul><li>在线演示：<a href="https://codepen.io/JowayYoung/pen/BaBjaBP" target="_blank" rel="noreferrer">Here</a></li><li>在线源码：<a href="https://github.com/JowayYoung/idea-css/blob/master/icss/src/components/behavior/%E4%BD%BF%E7%94%A8@focus-within%E5%88%86%E5%8F%91%E5%86%92%E6%B3%A1%E5%93%8D%E5%BA%94.vue" target="_blank" rel="noreferrer">Here</a></li></ul><h5 id="empty" tabindex="-1">:empty <a class="header-anchor" href="#empty" aria-label="Permalink to &quot;:empty&quot;">​</a></h5><p>还有使用JS判断列表集合为空时显示占位符吗？相信很多使用MVVM框架开发的同学都会使用条件判断的方式渲染虚拟DOM，若列表长度不为0则渲染列表，否则渲染占位符。然而CSS提供了一个空判断的选择器<code>:empty</code>，这应该很少同学会注意到。</p><p><code>:empty</code>作用于无子节点的节点，这个子节点也包括行内匿名盒(<code>单独的文本内容</code>)，匿名盒在第4章<strong>盒模型</strong>有提及。以下三种情况均为非空状态，若不出现这三种状态则为空状态，此时<code>:empty</code>才会触发。</p><ul><li><p>仅存在节点：<code>&lt;div&gt;&lt;p&gt;CSS&lt;/p&gt;&lt;/div&gt;</code></p></li><li><p>仅存在文本：<code>&lt;div&gt;CSS&lt;/div&gt;</code></p></li><li><p>同时存在节点和文本：<code>&lt;div&gt;Hello &lt;p&gt;CSS&lt;/p&gt;&lt;/div&gt;</code></p></li></ul><p><img src="https://cdn.nlark.com/yuque/0/2020/png/2985494/1607320896574-ad51b9c1-eb59-48e8-94de-0f83ef10719a.png" alt="img"></p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;ul class=&quot;empty-list&quot;&gt;</span></span>
<span class="line"><span>    &lt;li v-for=&quot;v in 10&quot; :key=&quot;v&quot;&gt;Data {{v}}&lt;/li&gt;</span></span>
<span class="line"><span>&lt;/ul&gt;</span></span>
<span class="line"><span>&lt;ul class=&quot;empty-list&quot;&gt;&lt;/ul&gt;</span></span>
<span class="line"><span>$empty: &quot;https://yangzw.vip/img/empty.svg&quot;;</span></span>
<span class="line"><span>.empty-list {</span></span>
<span class="line"><span>    overflow: auto;</span></span>
<span class="line"><span>    width: 200px;</span></span>
<span class="line"><span>    height: 150px;</span></span>
<span class="line"><span>    outline: 1px solid #3c9;</span></span>
<span class="line"><span>    &amp;:empty {</span></span>
<span class="line"><span>        display: flex;</span></span>
<span class="line"><span>        justify-content: center;</span></span>
<span class="line"><span>        align-items: center;</span></span>
<span class="line"><span>        background: url($empty) no-repeat center/100px auto;</span></span>
<span class="line"><span>        &amp;::after {</span></span>
<span class="line"><span>            margin-top: 90px;</span></span>
<span class="line"><span>            font-weight: bold;</span></span>
<span class="line"><span>            content: &quot;没钱就没数据&quot;;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    &amp; + .empty-list {</span></span>
<span class="line"><span>        margin-left: 20px;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    li {</span></span>
<span class="line"><span>        padding: 0 10px;</span></span>
<span class="line"><span>        height: 30px;</span></span>
<span class="line"><span>        background-color: #09f;</span></span>
<span class="line"><span>        line-height: 30px;</span></span>
<span class="line"><span>        color: #fff;</span></span>
<span class="line"><span>        &amp;:nth-child(even) {</span></span>
<span class="line"><span>            background-color: #f90;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><ul><li>在线演示：<a href="https://codepen.io/JowayYoung/pen/PoPPbqg" target="_blank" rel="noreferrer">Here</a></li><li>在线源码：<a href="https://github.com/JowayYoung/idea-css/blob/master/icss/src/components/behavior/%E4%BD%BF%E7%94%A8@empty%E7%9B%91%E5%90%AC%E6%B8%85%E7%A9%BA%E7%8A%B6%E6%80%81.vue" target="_blank" rel="noreferrer">Here</a></li></ul><h5 id="before和-after" tabindex="-1">::before和::after <a class="header-anchor" href="#before和-after" aria-label="Permalink to &quot;::before和::after&quot;">​</a></h5><p>有时为了实现某个效果而往页面里反复添加标签变得很繁琐，添加太多标签反而不好处理而变得难以维护。此时会引入<code>伪元素</code>这个概念解决上述问题。</p><p><strong>伪元素</strong>指页面里不存在的元素。<code>伪元素</code>在HTML代码里未声明，却能正常显示，在页面渲染时看到这些本来不存在的元素发挥着重要作用。<code>:before</code>和<code>:after</code>是两个很重要的伪元素，早在CSS2就出现了。</p><p>起初<code>伪元素</code>的前缀使用<strong>单冒号语法</strong>。随着CSS改革，伪元素的前缀被修改成<strong>双冒号语法</strong>，<code>:before/:after</code>从此变成<code>::before/::after</code>，用来区分<code>伪类</code>。若兼容低版本浏览器，还需使用<code>:before</code>和<code>:after</code>，但是本小册均以<code>::before/::after</code>编写CSS代码。</p><p><code>伪元素</code>和<code>伪类</code>虽然都是选择器，但是它们还是存在一丝丝的差别。</p><ul><li><code>伪元素</code>通常是一些实体选择器，选择满足指定条件的DOM，例如<code>::selection</code>、<code>:nth-child(n)</code>和<code>:first-child</code></li><li><code>伪类</code>通常是一些状态选择器，选择处于特定状态的DOM，例如<code>:hover</code>、<code>:focus</code>和<code>:checked</code></li></ul><p><code>::before/::after</code>必须结合<code>content</code>使用，通常用作修饰节点，为节点插入一些多余的东西，但又不想内嵌一些其他标签。若插入2个以下(包含2个)的修饰，建议使用<code>::before/::after</code>。</p><p>以下两个HTML结构是等效的</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;p&gt;</span></span>
<span class="line"><span>    &lt;span&gt;:before&lt;/span&gt;</span></span>
<span class="line"><span>    CSS</span></span>
<span class="line"><span>    &lt;span&gt;:after&lt;/span&gt;</span></span>
<span class="line"><span>&lt;/p&gt;</span></span>
<span class="line"><span>&lt;p&gt;CSS&lt;/p&gt;</span></span>
<span class="line"><span>// 接上一个HTML结构</span></span>
<span class="line"><span>p {</span></span>
<span class="line"><span>    &amp;::before {</span></span>
<span class="line"><span>        content: &quot;:before&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    &amp;::after {</span></span>
<span class="line"><span>        content: &quot;:after&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>::before/::after</code>最常用的场景就是气泡对话框，圆滚滚的身子带上一个三角形的尾巴。像以下第二个挖空的气泡对话框，其实使用白色填充背景颜色，而小尾巴使用白色的<code>::after</code>叠加橙色的<code>::before</code>形成障眼法。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/png/2985494/1607320896681-d36941b9-c10f-44c5-b039-1b1c0adcf9f0.png" alt="img"></p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div class=&quot;bubble-box&quot;&gt;iCSS&lt;/div&gt;</span></span>
<span class="line"><span>&lt;div class=&quot;bubble-empty-box&quot;&gt;iCSS&lt;/div&gt;</span></span>
<span class="line"><span>.bubble-box {</span></span>
<span class="line"><span>    position: relative;</span></span>
<span class="line"><span>    border-radius: 5px;</span></span>
<span class="line"><span>    width: 200px;</span></span>
<span class="line"><span>    height: 50px;</span></span>
<span class="line"><span>    background-color: #f90;</span></span>
<span class="line"><span>    line-height: 50px;</span></span>
<span class="line"><span>    text-align: center;</span></span>
<span class="line"><span>    font-size: 20px;</span></span>
<span class="line"><span>    color: #fff;</span></span>
<span class="line"><span>    &amp;::after {</span></span>
<span class="line"><span>        position: absolute;</span></span>
<span class="line"><span>        left: 100%;</span></span>
<span class="line"><span>        top: 50%;</span></span>
<span class="line"><span>        margin-top: -5px;</span></span>
<span class="line"><span>        border: 5px solid transparent;</span></span>
<span class="line"><span>        border-left-color: #f90;</span></span>
<span class="line"><span>        content: &quot;&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.bubble-empty-box {</span></span>
<span class="line"><span>    position: relative;</span></span>
<span class="line"><span>    margin-top: 10px;</span></span>
<span class="line"><span>    border: 2px solid #f90;</span></span>
<span class="line"><span>    border-radius: 5px;</span></span>
<span class="line"><span>    width: 200px;</span></span>
<span class="line"><span>    height: 50px;</span></span>
<span class="line"><span>    line-height: 46px;</span></span>
<span class="line"><span>    text-align: center;</span></span>
<span class="line"><span>    font-size: 20px;</span></span>
<span class="line"><span>    color: #f90;</span></span>
<span class="line"><span>    &amp;::before {</span></span>
<span class="line"><span>        position: absolute;</span></span>
<span class="line"><span>        left: 100%;</span></span>
<span class="line"><span>        top: 50%;</span></span>
<span class="line"><span>        margin: -5px 0 0 2px;</span></span>
<span class="line"><span>        border: 5px solid transparent;</span></span>
<span class="line"><span>        border-left-color: #f90;</span></span>
<span class="line"><span>        content: &quot;&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    &amp;::after {</span></span>
<span class="line"><span>        position: absolute;</span></span>
<span class="line"><span>        left: 100%;</span></span>
<span class="line"><span>        top: 50%;</span></span>
<span class="line"><span>        margin-top: -4px;</span></span>
<span class="line"><span>        border: 4px solid transparent;</span></span>
<span class="line"><span>        border-left-color: #fff;</span></span>
<span class="line"><span>        content: &quot;&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><ul><li>在线演示：<a href="https://codepen.io/JowayYoung/pen/GRZBKJd" target="_blank" rel="noreferrer">Here</a></li><li>在线源码：<a href="https://github.com/JowayYoung/idea-css/blob/master/icss/src/components/component/%E6%B0%94%E6%B3%A1%E5%AF%B9%E8%AF%9D%E6%A1%86.vue" target="_blank" rel="noreferrer">Here</a></li></ul>`,104),l=[e];function c(d,o,i,r,u,g){return a(),s("div",null,l)}const f=n(t,[["render",c]]);export{b as __pageData,f as default};
