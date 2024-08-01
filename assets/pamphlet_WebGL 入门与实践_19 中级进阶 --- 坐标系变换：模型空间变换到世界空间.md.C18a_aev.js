import{_ as a,c as s,o as i,a2 as t}from"./chunks/framework.D8Prfz4N.js";const E=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"pamphlet/WebGL 入门与实践/19 中级进阶 --- 坐标系变换：模型空间变换到世界空间.md","filePath":"pamphlet/WebGL 入门与实践/19 中级进阶 --- 坐标系变换：模型空间变换到世界空间.md"}'),e={name:"pamphlet/WebGL 入门与实践/19 中级进阶 --- 坐标系变换：模型空间变换到世界空间.md"},p=t('<p>上一节我们学习了基本变换的原理与实现，本节我们学习如何把这些变换应用到坐标系变换中。</p><h2 id="坐标系变换的分类" tabindex="-1">坐标系变换的分类 <a class="header-anchor" href="#坐标系变换的分类" aria-label="Permalink to &quot;坐标系变换的分类&quot;">​</a></h2><p>前面我们讲过，在 3D 编程中，可控制的坐标系变换分为3类，分别是：</p><ul><li>模型变换 <ul><li>模型变换负责将模型坐标转换成世界坐标。</li></ul></li><li>视图变换 <ul><li>视图变换负责将世界坐标转换成相机坐标。</li></ul></li><li>投影变换 <ul><li>投影变换负责将相机坐标转换成裁剪坐标，也就是将 3D 坐标投影到 2D 平面上。</li></ul></li></ul><p>需要强调一点变换矩阵相乘的顺序，假设最终变换矩阵为 F，模型矩阵为 M， 视图矩阵为 V，投影矩阵为 P，那么有：</p><p>$ F = P \\times V \\times M $</p><p>这个顺序不能有错，否则效果与预想的会不一致。</p><p>接下来，我们从第一个变换<code>模型变换</code>讲起。</p><h2 id="坐标系变换的起点" tabindex="-1">坐标系变换的起点 <a class="header-anchor" href="#坐标系变换的起点" aria-label="Permalink to &quot;坐标系变换的起点&quot;">​</a></h2><p>编程之初，我们首先能拿到的是模型数据，模型中各个点的位置是相对于模型的某个位置确定的，一般这个位置是模型的中心点，下面这个坐标系就是模型坐标系，立方体的所有顶点坐标都是相对于中心位置。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/11/1/166cd2eb7d531b0b~tplv-t2oaga2asx-image.image" alt=""></p><p>默认情况下，模型坐标系和世界坐标系重合，所有创建好的模型首先会放置在世界坐标系中心位置，我们创建一个立方体和一个球体：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/11/1/166cd5693a608e92~tplv-t2oaga2asx-image.image" alt=""></p><p>可以看到，我们创建的模型叠加在了一起。</p><p>那么，我们需要将我们的模型摆放在 3D 世界中的特定位置，3D 世界所遵循的参照就是世界坐标系。</p><p>这就涉及到模型变换了，模型变换的作用是将模型顶点从<code>模型坐标系</code>转换到<code>世界坐标系</code>。</p><h2 id="模型变换" tabindex="-1">模型变换 <a class="header-anchor" href="#模型变换" aria-label="Permalink to &quot;模型变换&quot;">​</a></h2><p>模型变换是由多个基本变换组合而成，那么对矩阵而言，就是由多个基本变换矩阵相乘而得到，既然提到相乘，那么<code>相乘的顺序</code>就至关重要，因为矩阵不满足交换律，两个矩阵相乘顺序不同，结果也不同。体现到坐标系变换上，就会发现模型经过变换后的坐标也不同，这一点很重要，请大家一定要牢记。</p><h3 id="变换顺序" tabindex="-1">变换顺序 <a class="header-anchor" href="#变换顺序" aria-label="Permalink to &quot;变换顺序&quot;">​</a></h3><p>接下来我们演示下，对一个立方体进行平移旋转变换。</p><h4 id="平移与旋转" tabindex="-1">平移与旋转 <a class="header-anchor" href="#平移与旋转" aria-label="Permalink to &quot;平移与旋转&quot;">​</a></h4><p>我们先将立方体平移5 个单位，然后逆时针旋转 45 度，看一下立方体是什么状态。</p><p>平移矩阵：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> translateMatrix </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> matrix.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">translate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><p>旋转矩阵:</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> rotateMatrix </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> matrix.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rotateX</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Math.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">PI</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> /</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 180</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 45</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><p>创建两个立方体，红色立方体先旋转再平移，黄色立方体先平移再旋转。</p><p>先旋转再平移矩阵：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> redMatrix </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> matrix.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">multiply</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(translationMatrix, rotateMatrix);</span></span></code></pre></div><p>先平移再旋转矩阵：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> yellowMatrix </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> matrix.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">multiply</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(rotateMatrix, translationMatrix);</span></span></code></pre></div><p>将两个矩阵应用到立方体上，我们可以看到下面的效果：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/11/1/166ce31a5fe2ff25~tplv-t2oaga2asx-image.image" alt=""></p><p>很容易发现，当我们需要模型自身绕着模型中心旋转时，要先执行旋转再平移，党需要模型绕世界中心旋转时，需要先平移再旋转。但通常情况，我们都是先执行旋转再执行平移，也就是红色立方体的旋转效果。</p><h4 id="考虑缩放" tabindex="-1">考虑缩放 <a class="header-anchor" href="#考虑缩放" aria-label="Permalink to &quot;考虑缩放&quot;">​</a></h4><p>当然，除了平移与旋转，有时也会涉及到模型缩放，很显然，对模型进行缩放也是要放在平移之前，但是缩放和旋转哪个在先，哪个在后呢？</p><p><strong>先缩放再旋转，还是先旋转再缩放？</strong></p><p>依然通过两个立方体来比较，红色立方体先执行缩放，再进行旋转，黄色立方体则先旋转再缩放，在这里缩放比例采用 X 轴放大 2 倍， Y 轴放大 1.5 倍来处理。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/11/1/166ce9597ae0d78e~tplv-t2oaga2asx-image.image" alt=""></p><p>可以看到，先旋转再缩放的黄色立方体不是我们所期望的结果，它会改变模型的形状。而<code>先缩放再旋转</code>的红色立方体则是我们所期望的。</p><p>上例我们采用的是不一样的缩放比例，大家能很容易地看出差别，这次我们采用一样的缩放比例，看下效果：</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/11/1/166cea140d8adf1c~tplv-t2oaga2asx-image.image" alt=""></p><p>可以看到，当缩放矩阵的缩放比例一致时，旋转与缩放的顺序就不那么重要了，表现都是一样的。</p><h4 id="模型变换公式" tabindex="-1">模型变换公式 <a class="header-anchor" href="#模型变换公式" aria-label="Permalink to &quot;模型变换公式&quot;">​</a></h4><p>假设模型变换矩阵为 M，其中缩放矩阵为 S，旋转矩阵为 R，平移矩阵为 T，考虑到我们是列主序，所以有如下公式：</p><p>$M = T（平移矩阵） \\times R（旋转矩阵） \\times S（缩放矩阵） $</p><h2 id="模型变换的意义" tabindex="-1">模型变换的意义 <a class="header-anchor" href="#模型变换的意义" aria-label="Permalink to &quot;模型变换的意义&quot;">​</a></h2><p>前面我们讲了，3D 世界中会有很多模型，每个模型所处的位置和朝向都不一样，这就需要我们对它们进行安放，模型变换就是我们安放模型的手段。</p><h2 id="回顾" tabindex="-1">回顾 <a class="header-anchor" href="#回顾" aria-label="Permalink to &quot;回顾&quot;">​</a></h2><p>本节主要讲解坐标系变换的分类，以及<code>模型变换</code>的作用以及使用时需要注意的地方，主要是矩阵相乘顺序。</p><p>下一节，我们讲解视图变换的推导与应用。</p>',51),l=[p];function h(n,r,d,o,k,c){return i(),s("div",null,l)}const m=a(e,[["render",h]]);export{E as __pageData,m as default};
