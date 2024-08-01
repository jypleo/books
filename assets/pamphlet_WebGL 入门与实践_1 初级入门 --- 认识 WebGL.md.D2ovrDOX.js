import{_ as e,c as o,o as c,a2 as a}from"./chunks/framework.D8Prfz4N.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"pamphlet/WebGL 入门与实践/1 初级入门 --- 认识 WebGL.md","filePath":"pamphlet/WebGL 入门与实践/1 初级入门 --- 认识 WebGL.md"}'),d={name:"pamphlet/WebGL 入门与实践/1 初级入门 --- 认识 WebGL.md"},l=a('<p>如果你在看这本小册，说明你或多或少地了解一些 WebGL 的相关内容，并且对它有浓厚的兴趣，我想我们在这点上一定是志同道合的。接下来的一段时间，我将借助本小册，带领大家一起学习 WebGL 开发过程中所用到的知识。</p><div class="language-! vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">!</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>因为 WebGL 涉及很多专业术语以及 API，而我或许不能一一向大家阐述清楚，希望大家见谅。我会尽可能的对一些关键概念或 API 进行通俗化的解释，如果大家在阅读时发现某个概念理解不了，建议到权威网站比如 MDN， 浏览一下官方解释~</span></span></code></pre></div><ul><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API" target="_blank" rel="noreferrer">MDN 传送门</a></li></ul><h2 id="webgl-产生的背景" tabindex="-1">WebGL 产生的背景 <a class="header-anchor" href="#webgl-产生的背景" aria-label="Permalink to &quot;WebGL 产生的背景&quot;">​</a></h2><p>在学习 <code>WebGL</code> 之前，我们先简单了解一下 <code>WebGL</code> 产生的背景。WebGL 规范产生以前，浏览器如果想实现 3D 动画效果，只能借助一些浏览器插件，比如 Adobe 的 <code>Flash</code>、微软的 <code>SilverLight</code> 等来实现，那么，为了打破这一局限，各大知名公司联手制定了一种跨平台的 3D 开发标准，也就是 <code>WebGL 规范</code>。</p><h2 id="webgl-是什么" tabindex="-1">WebGL 是什么？ <a class="header-anchor" href="#webgl-是什么" aria-label="Permalink to &quot;WebGL 是什么？&quot;">​</a></h2><p>那么，WebGL 是什么？一言以蔽之，WebGL 是一组基于 JavaScript 语言的图形规范，浏览器厂商按照这组规范进行实现，为 Web 开发者提供一套<code>3D图形</code>相关的 API。那么，这些 API 能够帮助 Web 开发者做些什么呢？</p><p>这些 API 能够让 Web 开发者使用 JavaScript 语言直接和显卡（GPU）进行通信。当然 WebGL 的 GPU 部分也有对应的编程语言，简称 <code>GLSL</code>。我们用它来编写运行在 GPU 上的着色器程序。着色器程序需要接收 CPU（WebGL 使用 JavaScript） 传递过来的数据，然后对这些数据进行流水线处理，最终显示在屏幕上，进而实现丰富多彩的 3D 应用，比如 3D 图表，网页游戏，3D 地图，WebVR 等。</p><h2 id="webgl-工作原理" tabindex="-1">WebGL 工作原理 <a class="header-anchor" href="#webgl-工作原理" aria-label="Permalink to &quot;WebGL 工作原理&quot;">​</a></h2><p>3D 模型数据从诞生到最终显示在屏幕上，这期间经历了什么样的过程呢？大家可以想象一下<code>流水线</code>的生产过程，流水线按照既定的步骤对原料进行加工，当前步骤只对前一步骤的结果进行处理，然后将处理后的结果传递给下一步骤，最终将原材料生产成完整的产品。WebGL 的工作方式和流水线类似，也是按照流水线的方式将 3D 模型数据渲染到 2D 屏幕上的，业界把这种渲染方式称为<code>图形管线</code>或者<code>渲染管线</code>，大家以后碰到这两个名词，应该能明白什么意思了。</p><blockquote><p>之后的章节，我们也会遵循业界用语，用<code>渲染管线</code>表示 WebGL 的渲染过程。</p></blockquote><p>我们知道，WebGL 只能够绘制<code>点</code>、<code>线段</code>、<code>三角形</code>这三种基本图元，但是我们经常看到 WebGL 程序中含有立方体、球体、圆柱体等规则形体，甚至很多更复杂更逼真的不规则模型，那么 WebGL 是如何绘制它们的呢？其实这些模型本质上是由一个一个的<code>点</code>组成，GPU 将这些点用<code>三角形图元</code>绘制成一个个的微小平面，这些平面之间互相连接，从而组成各种各样的立体模型。</p><p>因此，我们的首要任务是创建组成这些模型的顶点数据。</p><p>一般情况下，最初的顶点坐标是相对于<code>模型中心</code>的，不能直接传递到着色器中，我们需要对<code>顶点坐标</code>按照一系列步骤执行<code>模型转换</code>，<code>视图转换</code>，<code>投影转换</code>，转换之后的坐标才是 WebGL 可接受的坐标，即<code>裁剪空间坐标</code>。我们把最终的<code>变换矩阵</code>和<code>原始顶点坐标</code>传递给 <code>GPU</code>，GPU 的渲染管线对它们执行流水线作业。</p><p>GPU 渲染管线的主要处理过程如下：</p><ul><li>首先进入顶点着色器阶段，利用 GPU 的并行计算优势对顶点逐个进行坐标变换。</li><li>然后进入图元装配阶段，将顶点按照图元类型组装成图形。</li><li>接下来来到光栅化阶段，光栅化阶段将图形用不包含颜色信息的像素填充。</li><li>在之后进入片元着色器阶段，该阶段为像素着色，并最终显示在屏幕上。</li></ul><blockquote><p>事实上，这其中每个环节还有一些细微的处理没有列举出来，比如<code>深度测试</code>、<code>模板测试</code>等。</p></blockquote><h2 id="开发者需要掌握的技能" tabindex="-1">开发者需要掌握的技能 <a class="header-anchor" href="#开发者需要掌握的技能" aria-label="Permalink to &quot;开发者需要掌握的技能&quot;">​</a></h2><p>那么，WebGL 这么有吸引力，我相信很多开发者已经迫不及待的想上手了。但在此之前，我想我们还是先了解一下需要掌握哪些技能，之后再学习也不迟。</p><p>对于开发者来说，需要掌握哪些技能呢？</p><p>首先，我们分析一下一般的 Web 网页和 WebGL 应用在开发过程中有哪些不同？</p><h3 id="普通的-web-网页" tabindex="-1">普通的 Web 网页 <a class="header-anchor" href="#普通的-web-网页" aria-label="Permalink to &quot;普通的 Web 网页&quot;">​</a></h3><ul><li>HTML</li><li>CSS</li><li>JavaScript</li><li>...</li></ul><p>一般情况，我们只需掌握 HTML、CSS、JavaScript，就可以进行 Web 开发了，入门比较容易。</p><h3 id="webgl-程序" tabindex="-1">WebGL 程序 <a class="header-anchor" href="#webgl-程序" aria-label="Permalink to &quot;WebGL 程序&quot;">​</a></h3><ul><li><p>HTML<br> 因为 WebGL 应用是网页程序，所以我们仍然需要掌握HTML，至少要知道怎么使用 <code>canvas</code>。</p></li><li><p>JavaScript<br> 我们需要使用 JavaScript 声明 WebGL 运行的载体 <code>canvas</code>，设置 <code>canvas</code> 的初始大小，获取 WebGL 的<code>上下文</code>，对模型顶点的<code>坐标</code>、<code>颜色</code>、<code>法向量</code>等信息进行处理，并将这些处理好的数据传递给 GPU 。对于复杂的 WebGL 应用，顶点、纹理、光照等数据甚至需要从外部<code>模型文件</code>中获取，所以我们还需要用 JavaScript <code>解析加载</code>模型数据。</p></li><li><p>GLSL(着色器语言)。<br> 不同于普通网页的开发，除了 JavaScript 语言需要熟练掌握之外，开发者还需要熟练使用 <code>GLSL</code> 语言。因为一个完整的 3D 应用离不开 JavaScript 程序和 GLSL 程序，二者缺一不可。我们需要用 GLSL 编写着色器程序，并配合 JavaScript 共同实现 3D 效果。</p></li><li><p>3D数学知识<br> 除了掌握必要的编程语言，还需要掌握一定的 3D 数学知识，特别是<code>向量</code>和<code>矩阵</code>之间的表示和运算。在 WebGL 中顶点位置的<code>坐标系变换</code>、<code>光照效果</code>等都需要有 3D 数学的功底才能真正灵活运用。</p></li></ul><h2 id="什么是-glsl" tabindex="-1">什么是 GLSL？ <a class="header-anchor" href="#什么是-glsl" aria-label="Permalink to &quot;什么是 GLSL？&quot;">​</a></h2><p><code>GLSL</code> 的中文意思是 OpenGL 着色语言，英文全称是 OpenGL Shading Language，它是用来在 OpenGL 编写<code>着色器程序</code>的语言。</p><blockquote><p>为了书写方便，在之后的章节我们用 <code>GLSL</code> 指代<code>OpenGL 着色语言</code>。</p></blockquote><ul><li>着色器程序<br> 我们知道了 GLSL 是用来编写着色器程序的语言，那么新的问题来了，着色器程序是用来做什么的呢？ 简单地说，着色器程序是在显卡（GPU）上运行的简短程序，代替了 GPU <code>固定渲染管线</code>的一部分，使 GPU 渲染过程中的某些部分允许开发者通过<code>编程</code>进行控制。</li></ul><p>上面这段解释有些长，用一句话来说：着色器程序允许我们通过编程来控制 GPU 的渲染。</p><p>那么 GPU 渲染过程中的哪些部分允许开发者控制呢？下图是对 WebGL 渲染管线的简单演示：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a8dc3be028ca3~tplv-t2oaga2asx-image.image" alt=""></p><p>上图简单演示了 WebGL 对一个红色三角形的渲染过程，绿色部分为开发者可以通过编程控制的部分：</p><ul><li>JavaScript 程序<br> 处理着色器需要的<code>顶点坐标</code>、<code>法向量</code>、<code>颜色</code>、<code>纹理</code>等信息，并负责为<code>着色器</code>提供这些数据，上图为了演示方便，只是提供了三角形顶点的位置数据。</li><li>顶点着色器<br> 接收 JavaScript 传递过来的<code>顶点信息</code>，将顶点绘制到对应坐标。</li><li>图元装配阶段<br> 将三个顶点装配成指定<code>图元类型</code>，上图采用的是三角形图元。</li><li>光栅化阶段 将三角形内部区域用空像素进行填充。</li><li>片元着色器 为三角形内部的像素填充颜色信息，上图为暗红色。</li></ul><p>实际上，对顶点信息的变换操作既可以在 <code>JavaScript</code> 中进行，也可以在<code>着色器程序</code>中进行。通常我们都是在 <code>JavaScript</code> 中生成一个包含了所有变换的最终变换矩阵，然后将该矩阵传递给着色器，利用 GPU 并行计算优势对所有顶点执行变换。</p><blockquote><p>WebGL 开发中具体都有哪些变换，我们会在后面章节中详细介绍，请大家拭目以待。</p></blockquote><blockquote><p>虽然我们还需要学习一门新的语言 GLSL，但是它的学习成本比 JavaScript 要低一些，而且常用的知识点也比较少，多加练习即可掌握，这点大家不用担心。GLSL 本质上是在 C 语言的基础上，增加了一些数据类型和数学函数。而我们需要编写的着色器程序，往往是最简单的 main 函数。</p></blockquote><p>从上面可以看出，WebGL 程序比起一般的网页开发需要多掌握一门 GLSL 语言，但由于我们用到的着色器程序都比较简单，学习 GLSL 所占用的时间比重不是很大，所以大家不用过于担心。</p><blockquote><p>WebGL 的入门难度不在语言层面，而在于理解各种矩阵变换的原理。</p></blockquote><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>本文是学习 WebGL 开发前的一个铺垫，读完本小节，相信大家会对 WebGL 有了一个整体认识：</p><ul><li>WebGL 是一组图形 API，允许我们使用 JavaScript 控制 GPU 渲染过程，进行 3D 绘图。</li><li>WebGL 应用由 JavaScript 程序和着色器程序构成。</li><li>WebGL 如何将 3D 模型数据显示在 2D 屏幕上。</li><li>WebGL 编程要素：开发者需要针对 CPU 和 GPU 进行编程，CPU 部分是 JavaScript 程序，GPU 部分是着色器程序。</li></ul><p>接下来的章节，我们进入初级入门阶段，这个阶段带大家进行基础练习，让大家学会如何正确地使用 WebGL，并穿插着介绍 WebGL 的细枝末节。</p><p>那么，打开您的爱机，让我们开始 WebGL 的学习之旅吧~</p>',45),i=[l];function t(p,b,r,L,G,s){return c(),o("div",null,i)}const W=e(d,[["render",t]]);export{h as __pageData,W as default};
