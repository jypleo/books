import{_ as n,c as s,o as a,a2 as p}from"./chunks/framework.D8Prfz4N.js";const b=JSON.parse('{"title":"14.实战篇：实战大操作-表单控件","description":"","frontmatter":{},"headers":[],"relativePath":"pamphlet/玩转css艺术之美/14.实战篇：实战大操作-表单控件.md","filePath":"pamphlet/玩转css艺术之美/14.实战篇：实战大操作-表单控件.md"}'),l={name:"pamphlet/玩转css艺术之美/14.实战篇：实战大操作-表单控件.md"},e=p(`<h1 id="_14-实战篇-实战大操作-表单控件" tabindex="-1">14.实战篇：实战大操作-表单控件 <a class="header-anchor" href="#_14-实战篇-实战大操作-表单控件" aria-label="Permalink to &quot;14.实战篇：实战大操作-表单控件&quot;">​</a></h1><h3 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h3><p>表单是网页中最常见的视觉元素，而<code>表单校验</code>是表单中最常见的操作。通常情况下，会结合<code>Angular/React/Vue</code>等MVVM框架完成相关的表单校验功能。</p><p>本次通过纯CSS完成一个可切换的<code>登录注册模块</code>，通过选择器实现一些看似只能由JS才能实现的效果，具体使用到如下选择器。</p><ul><li><p><strong>+</strong>：相邻同胞选择器</p></li><li><p><strong>~</strong>：通用同胞选择器</p></li><li><p><strong>:not()</strong>：非指定条件的元素</p></li><li><p><strong>:hover</strong>：鼠标悬浮的元素</p></li><li><p><strong>:focus</strong>：输入聚焦的表单元素</p></li><li><p><strong>:valid</strong>：输入合法的表单元素</p></li><li><p><strong>:invalid</strong>：输入非法的表单元素</p></li><li><p><strong>:checked</strong>：选项选中的表单元素</p></li><li><p><strong>:placeholder-shown</strong>：占位显示的表单元素</p></li><li><p><strong>:nth-child(n)</strong>：元素中指定顺序索引的元素</p></li></ul><h3 id="登录注册" tabindex="-1">登录注册 <a class="header-anchor" href="#登录注册" aria-label="Permalink to &quot;登录注册&quot;">​</a></h3><p>登录注册模块是每一个网站都可能具备的模块。本次实战需求是通过纯CSS编写一个<code>登录注册模块</code>，当然排除<code>登录</code>和<code>注册</code>的按钮点击事件。首先需明确有哪些功能。</p><ul><li><p>切换登录注册两个模块，可用<code>~</code>、<code>:checked</code>和<code>nth-child(n)</code>实现</p></li><li><p>悬浮模块导航时显示选中状态，可用<code>:hover</code>实现</p></li><li><p>判断输入框是否进入输入状态并校验内容，可用<code>:focus</code>、<code>:valid</code>和<code>:invalid</code>实现</p></li><li><p>判断输入框是否存在内容，可用<code>+</code>、<code>:not()</code>和<code>placeholder-shown</code>实现</p></li></ul><p>总体来说，可将登录注册模块分为两部分，分别是<code>模块切换</code>和<code>表单校验</code>。</p><p>模块切换</p><p>还记得第9章<strong>选择器</strong>如何构造这种纯CSS切换效果吗？若忘记了可回看这章，实现原理主要是结合<code>&lt;input&gt;</code>和<code>&lt;label&gt;</code>。<code>&lt;input&gt;</code>使用<code>id</code>与<code>&lt;label&gt;</code>使用<code>for</code>关联起来，而<code>hidden</code>使<code>&lt;input&gt;</code>隐藏起来，不占用页面任何位置，此时<code>&lt;label&gt;</code>放置在页面任何位置都行。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>input:checked + div {}</span></span>
<span class="line"><span>input:checked ~ div {}</span></span></code></pre></div><p>还记得第9章<strong>选择器</strong>的切换按钮的刹车动画吗？也搬过来使用吧，对使用刹车动画的节点声明<code>transition:all 300ms cubic-bezier(.4,.4,.25,1.35)</code>即可。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/gif/2985494/1607321632338-87d5ac21-8e48-44c7-983a-a1a874d433fb.gif" alt="img"></p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div class=&quot;auth&quot;&gt;</span></span>
<span class="line"><span>    &lt;input id=&quot;login-btn&quot; type=&quot;radio&quot; name=&quot;auth&quot; checked hidden&gt;</span></span>
<span class="line"><span>    &lt;input id=&quot;logon-btn&quot; type=&quot;radio&quot; name=&quot;auth&quot; hidden&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;auth-title&quot;&gt;</span></span>
<span class="line"><span>        &lt;label for=&quot;login-btn&quot;&gt;登录&lt;/label&gt;</span></span>
<span class="line"><span>        &lt;label for=&quot;logon-btn&quot;&gt;注册&lt;/label&gt;</span></span>
<span class="line"><span>        &lt;em&gt;&lt;/em&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;auth-form&quot;&gt;</span></span>
<span class="line"><span>        &lt;form&gt;登录&lt;/form&gt;</span></span>
<span class="line"><span>        &lt;form&gt;注册&lt;/form&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>.bruce {</span></span>
<span class="line"><span>    background-color: #999;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.auth {</span></span>
<span class="line"><span>    overflow: hidden;</span></span>
<span class="line"><span>    border-radius: 2px;</span></span>
<span class="line"><span>    width: 320px;</span></span>
<span class="line"><span>    background-color: #fff;</span></span>
<span class="line"><span>    .auth-title {</span></span>
<span class="line"><span>        display: flex;</span></span>
<span class="line"><span>        position: relative;</span></span>
<span class="line"><span>        border-bottom: 1px solid #eee;</span></span>
<span class="line"><span>        height: 40px;</span></span>
<span class="line"><span>        label {</span></span>
<span class="line"><span>            display: flex;</span></span>
<span class="line"><span>            justify-content: center;</span></span>
<span class="line"><span>            align-items: center;</span></span>
<span class="line"><span>            flex: 1;</span></span>
<span class="line"><span>            height: 100%;</span></span>
<span class="line"><span>            cursor: pointer;</span></span>
<span class="line"><span>            transition: all 300ms;</span></span>
<span class="line"><span>            &amp;:hover {</span></span>
<span class="line"><span>                color: #66f;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        em {</span></span>
<span class="line"><span>            position: absolute;</span></span>
<span class="line"><span>            left: 0;</span></span>
<span class="line"><span>            bottom: 0;</span></span>
<span class="line"><span>            border-radius: 1px;</span></span>
<span class="line"><span>            width: 50%;</span></span>
<span class="line"><span>            height: 2px;</span></span>
<span class="line"><span>            background-color: #f66;</span></span>
<span class="line"><span>            transition: all 300ms cubic-bezier(.4, .4, .25, 1.35);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .auth-form {</span></span>
<span class="line"><span>        display: flex;</span></span>
<span class="line"><span>        width: 200%;</span></span>
<span class="line"><span>        height: 250px;</span></span>
<span class="line"><span>        transition: all 300ms cubic-bezier(.4, .4, .25, 1.35);</span></span>
<span class="line"><span>        form {</span></span>
<span class="line"><span>            flex: 1;</span></span>
<span class="line"><span>            padding: 20px;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#login-btn:checked {</span></span>
<span class="line"><span>    &amp; ~ .auth-title {</span></span>
<span class="line"><span>        label:nth-child(1) {</span></span>
<span class="line"><span>            font-weight: bold;</span></span>
<span class="line"><span>            color: #f66;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        em {</span></span>
<span class="line"><span>            transform: translate(0, 0);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    &amp; ~ .auth-form {</span></span>
<span class="line"><span>        transform: translate(0, 0);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#logon-btn:checked {</span></span>
<span class="line"><span>    &amp; ~ .auth-title {</span></span>
<span class="line"><span>        label:nth-child(2) {</span></span>
<span class="line"><span>            font-weight: bold;</span></span>
<span class="line"><span>            color: #f66;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        em {</span></span>
<span class="line"><span>            transform: translate(160px, 0);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    &amp; ~ .auth-form {</span></span>
<span class="line"><span>        transform: translate(-50%, 0);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>表单校验</p><p>还记得第9章<strong>选择器</strong>的表单校验吗？通过以下几点结合能完成纯CSS表单校验，具体细节可回看这章。</p><p>完成一个完整的表单校验，需以下HTML属性和选择器搭配。</p><ul><li><p><strong>placeholder</strong>：占位，在未输入内容时显示提示文本</p></li><li><p><strong>pattern</strong>：正则，在输入内容时触发正则验证</p></li><li><p><strong>:valid</strong>：作用于输入合法的表单节点</p></li><li><p><strong>:invalid</strong>：作用于输入非法的表单节点</p></li></ul><p>以手机输入框为例，需满足以下HTML结构和CSS样式。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;input type=&quot;text&quot; placeholder=&quot;请输入手机&quot; pattern=&quot;^1[3456789]\\d{9}$&quot; required&gt;</span></span>
<span class="line"><span>input:valid {}</span></span>
<span class="line"><span>input:invalid {}</span></span></code></pre></div><p>但是存在一个问题，若直接声明<code>input:valid</code>和<code>input:invalid</code>，在页面初始化后或输入框内容为空时都会触发<code>:invalid</code>，导致表单校验还未开始就显示校验不通过的样式。为了只在输入内容时才触发<code>:valid</code>和<code>:invalid</code>，可在其前面添加<code>:focus</code>，表示在表单处于聚焦状态时才触发某些行为。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>input:focus:valid {}</span></span>
<span class="line"><span>input:focus:invalid {}</span></span></code></pre></div><p>在输入内容时，<code>有内容</code>和<code>无内容</code>可通过<code>:placeholder-shown</code>判断。<code>:placeholder-shown</code>表示占位显示的表单元素，而占位不显示的表单元素可用<code>:not()</code>取反，再结合<code>+</code>带动紧随该节点的节点。</p><ul><li>有内容就无占位：<code>:not(:placeholder-shown)</code></li><li>无内容就有占位：<code>:placeholder-shown</code></li></ul><p>本次实战主要是为了将上述选择器结合起来使用而提供一种场景，所以不写太多复杂的输入框了。将登录模块的HTML结构复制一份到注册模块，哈哈！最终代码如下。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/gif/2985494/1607321632754-10768366-65e8-45e5-b574-496c929d1f1a.gif" alt="img"></p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div class=&quot;auth&quot;&gt;</span></span>
<span class="line"><span>    &lt;input id=&quot;login-btn&quot; type=&quot;radio&quot; name=&quot;auth&quot; checked hidden&gt;</span></span>
<span class="line"><span>    &lt;input id=&quot;logon-btn&quot; type=&quot;radio&quot; name=&quot;auth&quot; hidden&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;auth-title&quot;&gt;</span></span>
<span class="line"><span>        &lt;label for=&quot;login-btn&quot;&gt;登录&lt;/label&gt;</span></span>
<span class="line"><span>        &lt;label for=&quot;logon-btn&quot;&gt;注册&lt;/label&gt;</span></span>
<span class="line"><span>        &lt;em&gt;&lt;/em&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;auth-form&quot;&gt;</span></span>
<span class="line"><span>        &lt;form&gt;</span></span>
<span class="line"><span>            &lt;div&gt;</span></span>
<span class="line"><span>                &lt;input type=&quot;text&quot; placeholder=&quot;请输入手机&quot; pattern=&quot;^1[3456789]\\d{9}$&quot; required&gt;</span></span>
<span class="line"><span>                &lt;label&gt;手机&lt;/label&gt;</span></span>
<span class="line"><span>            &lt;/div&gt;</span></span>
<span class="line"><span>            &lt;div&gt;</span></span>
<span class="line"><span>                &lt;input type=&quot;password&quot; placeholder=&quot;请输入密码(6到20位字符)&quot; pattern=&quot;^[\\dA-Za-z_]{6,20}$&quot; required&gt;</span></span>
<span class="line"><span>                &lt;label&gt;密码&lt;/label&gt;</span></span>
<span class="line"><span>            &lt;/div&gt;</span></span>
<span class="line"><span>            &lt;button type=&quot;button&quot;&gt;登录&lt;/button&gt;</span></span>
<span class="line"><span>        &lt;/form&gt;</span></span>
<span class="line"><span>        &lt;form&gt;</span></span>
<span class="line"><span>            &lt;div&gt;</span></span>
<span class="line"><span>                &lt;input type=&quot;text&quot; placeholder=&quot;请输入手机&quot; pattern=&quot;^1[3456789]\\d{9}$&quot; required&gt;</span></span>
<span class="line"><span>                &lt;label&gt;手机&lt;/label&gt;</span></span>
<span class="line"><span>            &lt;/div&gt;</span></span>
<span class="line"><span>            &lt;div&gt;</span></span>
<span class="line"><span>                &lt;input type=&quot;password&quot; placeholder=&quot;请输入密码(6到20位字符)&quot; pattern=&quot;^[\\dA-Za-z_]{6,20}$&quot; required&gt;</span></span>
<span class="line"><span>                &lt;label&gt;密码&lt;/label&gt;</span></span>
<span class="line"><span>            &lt;/div&gt;</span></span>
<span class="line"><span>            &lt;button type=&quot;button&quot;&gt;登录&lt;/button&gt;</span></span>
<span class="line"><span>        &lt;/form&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>.bruce {</span></span>
<span class="line"><span>    background-color: #999;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.auth {</span></span>
<span class="line"><span>    overflow: hidden;</span></span>
<span class="line"><span>    border-radius: 2px;</span></span>
<span class="line"><span>    width: 320px;</span></span>
<span class="line"><span>    background-color: #fff;</span></span>
<span class="line"><span>    .auth-title {</span></span>
<span class="line"><span>        display: flex;</span></span>
<span class="line"><span>        position: relative;</span></span>
<span class="line"><span>        border-bottom: 1px solid #eee;</span></span>
<span class="line"><span>        height: 40px;</span></span>
<span class="line"><span>        label {</span></span>
<span class="line"><span>            display: flex;</span></span>
<span class="line"><span>            justify-content: center;</span></span>
<span class="line"><span>            align-items: center;</span></span>
<span class="line"><span>            flex: 1;</span></span>
<span class="line"><span>            height: 100%;</span></span>
<span class="line"><span>            cursor: pointer;</span></span>
<span class="line"><span>            transition: all 300ms;</span></span>
<span class="line"><span>            &amp;:hover {</span></span>
<span class="line"><span>                color: #66f;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        em {</span></span>
<span class="line"><span>            position: absolute;</span></span>
<span class="line"><span>            left: 0;</span></span>
<span class="line"><span>            bottom: 0;</span></span>
<span class="line"><span>            border-radius: 1px;</span></span>
<span class="line"><span>            width: 50%;</span></span>
<span class="line"><span>            height: 2px;</span></span>
<span class="line"><span>            background-color: #f66;</span></span>
<span class="line"><span>            transition: all 300ms cubic-bezier(.4, .4, .25, 1.35);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .auth-form {</span></span>
<span class="line"><span>        display: flex;</span></span>
<span class="line"><span>        width: 200%;</span></span>
<span class="line"><span>        height: 250px;</span></span>
<span class="line"><span>        transition: all 300ms cubic-bezier(.4, .4, .25, 1.35);</span></span>
<span class="line"><span>        form {</span></span>
<span class="line"><span>            flex: 1;</span></span>
<span class="line"><span>            padding: 20px;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        div {</span></span>
<span class="line"><span>            display: flex;</span></span>
<span class="line"><span>            flex-direction: column-reverse;</span></span>
<span class="line"><span>            &amp; + div {</span></span>
<span class="line"><span>                margin-top: 10px;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        input {</span></span>
<span class="line"><span>            padding: 10px;</span></span>
<span class="line"><span>            border: 1px solid #e9e9e9;</span></span>
<span class="line"><span>            border-radius: 2px;</span></span>
<span class="line"><span>            width: 100%;</span></span>
<span class="line"><span>            height: 40px;</span></span>
<span class="line"><span>            outline: none;</span></span>
<span class="line"><span>            transition: all 300ms;</span></span>
<span class="line"><span>            &amp;:focus:valid {</span></span>
<span class="line"><span>                border-color: #09f;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            &amp;:focus:invalid {</span></span>
<span class="line"><span>                border-color: #f66;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            &amp;:not(:placeholder-shown) + label {</span></span>
<span class="line"><span>                height: 30px;</span></span>
<span class="line"><span>                opacity: 1;</span></span>
<span class="line"><span>                font-size: 14px;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        label {</span></span>
<span class="line"><span>            overflow: hidden;</span></span>
<span class="line"><span>            padding: 0 10px;</span></span>
<span class="line"><span>            height: 0;</span></span>
<span class="line"><span>            opacity: 0;</span></span>
<span class="line"><span>            line-height: 30px;</span></span>
<span class="line"><span>            font-weight: bold;</span></span>
<span class="line"><span>            font-size: 0;</span></span>
<span class="line"><span>            transition: all 300ms;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        button {</span></span>
<span class="line"><span>            margin-top: 10px;</span></span>
<span class="line"><span>            border: none;</span></span>
<span class="line"><span>            border-radius: 2px;</span></span>
<span class="line"><span>            width: 100%;</span></span>
<span class="line"><span>            height: 40px;</span></span>
<span class="line"><span>            outline: none;</span></span>
<span class="line"><span>            background-color: #09f;</span></span>
<span class="line"><span>            cursor: pointer;</span></span>
<span class="line"><span>            color: #fff;</span></span>
<span class="line"><span>            transition: all 300ms;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#login-btn:checked {</span></span>
<span class="line"><span>    &amp; ~ .auth-title {</span></span>
<span class="line"><span>        label:nth-child(1) {</span></span>
<span class="line"><span>            font-weight: bold;</span></span>
<span class="line"><span>            color: #f66;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        em {</span></span>
<span class="line"><span>            transform: translate(0, 0);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    &amp; ~ .auth-form {</span></span>
<span class="line"><span>        transform: translate(0, 0);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#logon-btn:checked {</span></span>
<span class="line"><span>    &amp; ~ .auth-title {</span></span>
<span class="line"><span>        label:nth-child(2) {</span></span>
<span class="line"><span>            font-weight: bold;</span></span>
<span class="line"><span>            color: #f66;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        em {</span></span>
<span class="line"><span>            transform: translate(160px, 0);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    &amp; ~ .auth-form {</span></span>
<span class="line"><span>        transform: translate(-50%, 0);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><ul><li>在线演示：<a href="https://codepen.io/JowayYoung/pen/OJXLBwZ" target="_blank" rel="noreferrer">Here</a></li><li>在线源码：<a href="https://github.com/JowayYoung/idea-css/blob/master/icss/src/components/component/%E7%99%BB%E5%BD%95%E6%B3%A8%E5%86%8C.vue" target="_blank" rel="noreferrer">Here</a></li></ul>`,30),i=[e];function t(c,o,d,r,u,g){return a(),s("div",null,i)}const m=n(l,[["render",t]]);export{b as __pageData,m as default};
