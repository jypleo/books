import{_ as e,c as a,o as r,a2 as l}from"./chunks/framework.D8Prfz4N.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"pamphlet/WebGL 入门与实践/33 结束了吗？一切刚刚开始.md","filePath":"pamphlet/WebGL 入门与实践/33 结束了吗？一切刚刚开始.md"}'),t={name:"pamphlet/WebGL 入门与实践/33 结束了吗？一切刚刚开始.md"},i=l('<p>至此，我们对 WebGL 的学习就告一段落了，坦白的说，我们还有一些 WebGL 细节没有在本小册呈现。但我相信，拥有了3D 数学的相关功底，你已经不再惧怕那些函数式 API 了，毕竟你连那么复杂的数学公式的推导过程都已经经历了。</p><p>当你看到本节时，我假设你已经掌握了以下内容：</p><ul><li>WebGL 的开发要素。</li><li>光照、颜色相关知识。</li><li>GLSL 语言。</li><li>3D 数学算法实现。</li></ul><p>此时你再去看一些 3D 框架，会对其中的概念有一见如故的感觉。不仅如此，我相信你会更容易地读懂它的源码。</p><h2 id="下一步如何走" tabindex="-1">下一步如何走 <a class="header-anchor" href="#下一步如何走" aria-label="Permalink to &quot;下一步如何走&quot;">​</a></h2><p>有的读者会问了，学完这些技术，下一步我该怎么走呢？我不能只是为了学习而学习吧。</p><p>首先，我必须要表扬你，你是有思想的同学。</p><p>学以致用是我们学习的目的。如果只学不用，那岂不是浪费我们宝贵的青春。</p><h3 id="如果你并不专职-webgl-领域" tabindex="-1">如果你并不专职 WebGL 领域 <a class="header-anchor" href="#如果你并不专职-webgl-领域" aria-label="Permalink to &quot;如果你并不专职 WebGL 领域&quot;">​</a></h3><p>如果不打算转向 WebGL 领域，那么建议你使用数学库配合 CSS3 中的 3D 属性，为自己的页面增加一些令人耳目一新的 3D 效果，比如 3D 照片墙， WebVR 等。</p><h4 id="使用-css-技术实现-3d-效果" tabindex="-1">使用 CSS 技术实现 3D 效果 <a class="header-anchor" href="#使用-css-技术实现-3d-效果" aria-label="Permalink to &quot;使用 CSS 技术实现 3D 效果&quot;">​</a></h4><p>如果你不想使用 webgl 技术，那你仍然可以使用 css3 中的 <code>transform</code> 和 <code>perspective</code> 等 3D 属性来实现三维效果。</p><p>还记得吗？transform 属性是用来对 dom 进行变换的。它接收两类值，分别是 matrix 和 matrix3d，其中 matrix 代表 2D 变换，是一个 3 阶矩阵，我们需要为其传入 9 个数字。 matrix3d 代表 3D 变换，是一个 4 阶矩阵，我们需要为其传入 16 个数字。</p><p>在中级进阶阶段，我们学习了变换矩阵的推导公式。大家只需利用这些推导算法，计算出变换矩阵，然后将其转化成 matrix 或者 matrix3d 所接收的字符串格式，赋值给 transform 即可。</p><blockquote><p>但请注意， matrix中包含 6 个数字，而非 3 阶矩阵中的 9 个数字。</p></blockquote><h4 id="css-中的摄像机" tabindex="-1">css 中的摄像机 <a class="header-anchor" href="#css-中的摄像机" aria-label="Permalink to &quot;css 中的摄像机&quot;">​</a></h4><p>perspective 属性用来设置摄像机和屏幕之间的远近，通常是在 Z 轴 上的距离，关于摄像机的原理，我们也在坐标系变换章节中也进行了详细的讲解，相信大家不会再惧怕这个概念了。</p><p>我们可以对父容器的 perspective 设置视距，transform-style:preserve-3d 设置成 3D 显示效果。</p><h3 id="如果你打算踏入-webgl-编程领域" tabindex="-1">如果你打算踏入 WebGL 编程领域 <a class="header-anchor" href="#如果你打算踏入-webgl-编程领域" aria-label="Permalink to &quot;如果你打算踏入 WebGL 编程领域&quot;">​</a></h3><p>如果你真的打算专职 WebGL 编程领域，建议你按照下面的步骤进行深入学习。</p><ul><li>深入了解 OpenGL 的底层知识。</li><li>熟练掌握 ThreeJS、Babylon 等框架提供的 API，如果有多余精力，再去深入学习它们的底层实现，相信你会有更多收获。</li><li>学会使用框架提供的模型拾取、碰撞检测等交互相关的关键技术。</li><li>做实际项目，只有在实战中才能大幅提升自己的技术。</li></ul><h4 id="_3d-小游戏" tabindex="-1">3D 小游戏 <a class="header-anchor" href="#_3d-小游戏" aria-label="Permalink to &quot;3D 小游戏&quot;">​</a></h4><p>每一个前端同学的心里都有过做一款属于自己的游戏的想法，只是苦于自己能力有限，只能望洋兴叹。</p><p>但是现在的你，是有能力实现一些 3D 小游戏了，只要有了创意，就去试试吧。</p><h2 id="一些学习网站" tabindex="-1">一些学习网站 <a class="header-anchor" href="#一些学习网站" aria-label="Permalink to &quot;一些学习网站&quot;">​</a></h2><p>另外，提供一些 3D 资源，供大家学习：</p><ul><li>框架： <ul><li><a href="https://github.com/mrdoob/three.js" target="_blank" rel="noreferrer">ThreeJS</a></li><li><a href="https://www.babylonjs.com/" target="_blank" rel="noreferrer">BabylonJs</a></li></ul></li><li>技术网站 <ul><li><a href="https://www.shuxuele.com/algebra/matrix-inverse-minors-cofactors-adjugate.html" target="_blank" rel="noreferrer">数学乐</a></li><li><a href="https://www.khronos.org/registry/webgl/specs/latest/2.0/" target="_blank" rel="noreferrer">WebGL 规范</a></li><li><a href="https://www.khronos.org/files/opengles_shading_language.pdf" target="_blank" rel="noreferrer">OpenGL ES 规范</a></li><li><a href="https://wgld.org/d/webgl/" target="_blank" rel="noreferrer">一个很好的日文 WebGL 学习网站</a></li></ul></li></ul>',27),o=[i];function s(p,n,h,c,d,b){return r(),a("div",null,o)}const u=e(t,[["render",s]]);export{m as __pageData,u as default};
