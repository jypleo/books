Flexbox 和 Grid 布局已然成为 Web 布局的主流技术，在互联网上随处都可以看到它们的身影，但很多 Web 开发者使用它们构建 Web 布局时，总是会碰到一些奇怪的问题（现象）。比如：

- `flex:1` 或 `1fr` 无法实现真正的均分列的布局效果；
- 在 Flex 项目或 Grid 项目上显式设置 `overflow-wrap: break-word` 无法让长字符断行；
- 撑破弹性布局；
- ……

这些问题给 Web 开发者带来了不少的困惑，甚至不知道如何排查和修复，最终让自己开发的 Web 页面或应用带病上线。其中主要原因是 Flexbox 和 Grid 布局中有着不为人知的一面，比如我们将要说的最小内容尺寸，就会给布局埋下天坑，足以让很多 Web 开发者感到困惑和忽略，以至于不知其中所以然。

如果你也认为自己是其中一员，那请继续往下阅读，你将从文章中了解到 Flexbox 和 Grid 中的最小内容尺寸会给 Web 布局引起哪些血案，又要如何修复或避免。

## 最小内容尺寸是什么？

熟悉 CSS 的同学都知道，CSS 中任何一个盒子都有尺寸大小的。Web 开发者在没有显式使用 CSS 尺寸属性（比如 `width` 、`height` 、`min-width` 、`min-height` 、`max-width` 、`max-height` 、`inline-size` 、`block-size` 、`min-inline-size` 、`min-block-size` 、`max-inline-size` 和 `max-block-size` 等）对元素盒子进行大小设置时，一般会以元素盒子内部内容来决定其尺寸大小，即 `width` （或 `inline-size`）、`height` （或 `block-size`）属性的值为 `auto` 。

> **需要注意，CSS 中的** **`border`** **、`padding`** **和** **`box-sizing`** **也会影响元素盒子的大小** 。这涉及到了 CSS 盒模型相关的知识与计算，这里不做过多阐述。 

有意思的是，每个元素盒子都会有一个最小内容的尺寸。一般情况下：

- 如果元素的内容仅是字符串，那么它的最小内容尺寸会等于内容中最长字符串的宽度；
- 如果元素的内容是图文混合，那么它的最小内容尺寸会等于图片的原始尺寸。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e06b3ad2f6ea48f7ae6d2f0558e95d28~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/xxaGRQB

需要注意的是，如果元素盒子中只有字符串内容，那么其内容最小尺寸会受到 CSS 的 `font-family` （字体）、`font-size` （字号）、`font-weight` （粗细权重）等相关属性值的影响。

另外，我们可以使用关键词 `min-content` 来描述元素内容最小尺寸值。如果你想让元素的尺寸刚好等于其内容最小尺寸的话，可以将定义尺寸的属性值设置为 `min-content` ，比如 `width: min-content` ，它将会告诉浏览器，元素的宽度是 `min-content` ，只不过浏览器计算出来的 `width` 值会根据元素内容以及相应字体样式来决定。

也就是说，如果你将元素的尺寸设置为小于 `min-content` （最小内容尺寸）时，那么就会产生内容溢出或出现滚动条等现象。比如，浏览器计算出来的内容最小尺寸（`min-content`）值是 `230px` ，但你给元素设置宽度是 `100px` ，此时元素内容就会溢出，或该元素盒子会有水平滚动条（元素设置 `oveflow: auto` 或 `overflow: scroll` 情况下）：

```CSS
.box {
    width: 100px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0938d56192740e49eb77956402fde9b~tplv-k3u1fbpfcp-zoom-1.image)

上图也从侧面说明，如果给元素的 `width` 或 `inline-size` 设置值为 `min-content` 的话，该元素盒子可以获得一个最佳的宽度或内联尺寸。

换句话说，**最小内容尺寸是一个值，浏览器最终可以根据最小内容计算出来个真实的值（像素值），即** **`min-content`** **的计算值。它可以运用于 CSS 中描述元素盒子大小的属性上，比如** **`width`** **、`min-width`** **、`max-width`** **等**。

## 最小尺寸和最小内容尺寸之间的关系

在 CSS 中，你可以使用 `min-width` 、`min-inline-size` 、`min-height` 、`min-block-size` 等属性给元素设置一个最小尺寸，比如：

```CSS
.box {
    min-width: 400px;
    min-height: 300px;
}

/* 或 */
.box {
    min-inline-size: 400px;
    min-block-size: 300px;
}
```

它将会告诉浏览器，`.box` 的最小尺寸是 `400px × 300px` ，即 `.box` 宽度（或内联尺寸）最小不能小于 `400px` ，高度（或块轴尺寸）最小不能小于 `300px` ：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/636a0ec270564b9fb3e06d520e0ba05e~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/gOdpmMd

元素上设置 `min-*` 相关属性可以起到一定的条件作用。当它和 `width` 、`height` 属性同时出现时，在某些环境之下，`min-*` 相关属性权重要更大。比如，元素同时设置了 `width` 和 `min-width` 属性，当 `width` 属性的值小于 `min-width` 的值时，浏览器将会选择 `min-width` 属性的值作为元素的宽度值：

```CSS
if (width < min-width) {
    // 元素的宽度值将取 min-width 属性的值
} else {
    // 元素的宽度值将取 width 属性的值
}
```

即：

```CSS
.box {
    width: 200px;
    min-width: 300px;
}
```

最终 `.box` 的宽度计算值是 `300px` 。

CSS 的 `min-*` 属性除了可以显式指定具体的长度值（`<length-percentage>` 值）之外，也可以是一些关键词值，比如 `auto` 、`min-content` 、`max-content` 、`fit-content` 等。其中 **`min-content`** **指的就是最小内容尺寸** ，它往往会被很多人认为就是 `min-*` 属性，事实上并非如此：

- 最小尺寸一般指的是 `min-*` 相关属性；
- 最小内容尺寸一般指的是内容中的最小值，即 `min-content` 关键词的计算值。

也就是说，**最小尺寸是属性，最小内容尺寸是一个尺寸值** 。只不过有意思的是，当盒子的最小尺寸设置的值小于最小内容尺寸时，浏览器最终会把最小内容尺寸的计算值作为盒子的最小尺寸。比如前面的示例，稍作调整，在 `.box` 上显式给 `min-width` 设置一个具体的值，比如 `200px` :

```CSS
.box {
    width: min-content;
    min-width: 200px; 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6725500135264378b273b4fe589b52fb~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/VwGLWwL

从上图中不难发现，盒子② 和盒子③ 的最小内容尺寸（即 `min-content` 的计算值）大于 `min-width` 属性的值 `200px` ，最终这两个盒子的最小尺寸分别是 `230px` （盒子②）和 `400px` （盒子③）；而盒子① 的最小内容尺寸（`44.59px`）小于 `min-width` 属性的值 `200px` ，所以盒子 ① 的最小尺寸 `200px` 。

从这个示例中，我们可以得知，**元素盒子的最小尺寸不会小于该盒最小内容的尺寸，即** **`min-content`**。

## Flexbox 和 Grid 中的最小内容尺寸

为了节省篇幅和更好描述问题，这里我们仅以元素 `min-width` 属性为例。从 [W3C 的规范](https://www.w3.org/TR/css-sizing-3/#min-size-properties)中，我们可以得知元素的 `min-width` 属性的初始值是 `auto` 。只不过浏览器对 `min-width: auto` 计算与 `width: auto` 是不一样的，**元素盒子上下文格式（视觉格式化模型）在没有发生变化的条件之下，`min-width`** **取值为** **`auto`** **时，浏览器计算出来的值是** **`0`** 。[这个描述也在 W3C 规范中有相关定义](https://www.w3.org/TR/css-sizing-3/#sizing-values)：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce9e77a7c47f4b53888063621a7cad1e~tplv-k3u1fbpfcp-zoom-1.image)

如果使用 CSS Flexbox 或 CSS Grid 来构建布局，我们就需要改变元素的 `display` 属性的值：

- CSS Flexbox 布局：`flex` 或 `inline-flex`； 
- CSS Grid 布局：`grid` 或 `inline-grid`。 

这样一来，就改变了元素盒子的视觉盒模型，其相应的子元素（Flex 项目或 Grid 项目）的 `min-width` 取值为 `auto` 时，浏览器计算出来的 `min-width` 的值不再是 `0` ，而是关键词 `auto` 。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59a5955ae37845d2968f3be2c3d8ac94~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/bGxdRKK

就因为这个原因，使用 CSS Flexbox 或 CSS Grid 布局时会产生很多血案，以致于很多 Web 开发者都不清楚其中原委。这是因为**在 Flexbox 和 Grid 布局中，Flex 项目和 Grid 项目的最小尺寸不会小于其最小内容尺寸（****`min-content`****）** 。

来到这里，你一定会感到好奇，究竟哪些场景会发生这样的事情呢？我们一起来看几个经典案例。

### 等宽布局

> 等宽布局又常称为均分列布局！

对于大部分 Web 开发者而言，都会认为：

- CSS Flexbox 布局时，只需要在所有 Flex 项目上设置 `flex:1` 就可以实现等宽布局；
- CSS Grid 布局时，只需要将所有列网格轨道尺寸设置为 `1fr` 就可以实现等宽布局。

事实上并非如此。我们来看一个简单示例：

```HTML
<footer>
    <div>
        <svg class="icon--home"></svg>首页
    </div>
    <div>
        <svg class="icon--hot"></svg>沸点
    </div>
    <div>
        <svg class="icon--discover"></svg>发现
    </div>
    <div>
        <svg class="icon--book"></svg>课程
    </div>
    <div>
        <svg class="icon--my"></svg>我
    </div>
</footer>
```

```CSS
/* CSS Flexbox Layout */
footer {
    display: flex;
}

footer > div {
    flex: 1 1 0%;
}

/* CSS Grid Layout */
footer {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e822075c6a5b47dd96e9a717b0403ba6~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/yLxNzJb

看上去很完美，每列宽度都相等。事实并非如此。我们手动来调整一下，比如把其中一列文字字数调整一下（把示例中的“课程”换成“掘金小册”），你会立马发现，现在每列的宽度并不相等了：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2529af7667744c3e91295d405308c7d5~tplv-k3u1fbpfcp-zoom-1.image)

不难发现，“掘金小册”一列的列宽大于其他列的列宽：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd017d07732b49e788bd33341537449b~tplv-k3u1fbpfcp-zoom-1.image)

### 长字符串无法断行

我们在开发 Web 页面或应用时，总是会碰到一些长字符串的情况，比如一个非常长的英文单词，一个 URL 地址之类的。这些长字符串很多时候可能会溢出其容器或者打破相应的 Web 布局，为了避免长字符串打破 Web 布局，Web 开发者常常使用 `overflow-wrap: break-word` 让长字符串断行。

```CSS
p {
    overflow-wrap: break-word;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2c0b1501dfd427ea72c0105099d6f20~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/dyqoJyR

让很多 Web 开发者意想不到的是，如果 Flex 项目或 Grid 项目出现长字符串时，即使在它们上面显式设置 `overflow-wrap: break-word;` ，也不能让长字符串断行。比如下面这个示例：

```HTML
<!-- Flexbox Layout -->
<div class="card card--flexbox">
    <img src="https://picsum.photos/400/300?random=2" alt="">
    <div class="card__content">
        <h3>防御式 CSS</h3>
        <p>内容中有一个长字符串 VeryVeryVeryVeryLooooooooooooooooooongWord</p>
    </div>
</div>

<!-- Grid Layout -->
<div class="card card--grid">
    <img src="https://picsum.photos/400/300?random=3" alt="">
    <h3>防御式 CSS</h3>
    <p>内容中有一个长字符串 VeryVeryVeryVeryLooooooooooooooooooongWord</p>
</div>
```

```CSS
/* CSS Flexbox Layout */
.card--flexbox {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.card__content {
    flex: 1 1 0%;
}

.card--flexbox p {
    margin-top: 10px;
    overflow-wrap: break-word;
}

/* CSS Grid Layout*/
.card--grid {
    display: grid;
    gap: 10px 1rem;
    grid-template-columns: 120px 1fr;
    grid-template-areas:
        "thumbnail title"
        "thumbnail description"
}

.card--grid img {
    grid-area: thumbnail;
}

.card--grid h3 {
    grid-area: title;
    align-self: end;
}

.card--grid p {
    grid-area: description;
    overflow-wrap: break-word;
    align-self: start;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76e336ac630b4e5480fc35209e02201f~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/VwGLrBP

你可能同样会感到困惑，为什么会如此？原因很简单，它和上一个示例（等宽布局）一样，都是因为 **Flex 项目和 Grid 项目在收缩的时候，最小尺寸不能****小于****其最小内容尺寸** 。如何解决，我们稍后放到一起来阐述。

### 撑破弹性布局

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4d93f911b3a43dcb57584812d4f7e61~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/rNZOBJJ

如果你曾阅读过《[现代 Web 布局](https://juejin.cn/book/7161370789680250917)》中的使用 [CSS Flexbox 构建 Web 经典布局](https://juejin.cn/book/7161370789680250917/section/7161623855054716935) 或 [使用 CSS Grid 构建 Web 经典布局](https://juejin.cn/book/7161370789680250917/section/7161624078397210638)，你就知道 CSS Flexbox 或 CSS Grid 能很轻易地实现上图的布局效果。

```HTML
<!-- CSS Flexbox Layout -->
<div class="flexbox">
    <header>.header</header>
    <section>
        <main>.main</main>
        <aside>.sidebar</aside>
    </section>
    <footer>.footer</footer>
</div>

<!-- CSS Grid Layout -->
<div class="grid">
    <header>.header</header>
    <main>.main</main>
    <aside>.sidebar</aside>
    <footer>.footer</footer>
</div>
```

```CSS
/* CSS Flexbox Layout*/
.flexbox {
    display: flex;
    flex-direction: column;
}

.flexbox section {
    display: flex;
    gap: 1rem;
    flex: 1 1 0%;
}

.flexbox aside {
    width: 280px;
    flex-shrink: 0;
}

.flexbox main {
    flex: 1 1 0%;
}

/* CSS Grid Layout */
.grid {
    display: grid;
    grid-template-columns: 1fr 280px;
    grid-template-rows: min-content 1fr min-content;
    grid-template-areas: 
        "header header"
        "main   sidebar"
        "footer footer";
    column-gap: 1rem;
}

.grid header {
    grid-area: header;
}

.grid main {
    grid-area: main;
}

.grid aside {
    grid-area: sidebar;
}

.grid footer {
    grid-area: footer;
}
```

正如上图所示，你调整浏览器视窗大小，整个布局看上去都是完美的，也符合你预期。但是，当你往 `<main>` 区域添加一个幻灯片（`.carousel`）组件：

```HTML
<main>
    <div class="carousel">
        <img src="https://picsum.photos/400/300?random=1" alt="">
        <img src="https://picsum.photos/400/300?random=2" alt="">
        <img src="https://picsum.photos/400/300?random=3" alt="">
        <img src="https://picsum.photos/400/300?random=4" alt="">
        <img src="https://picsum.photos/400/300?random=5" alt="">
        <img src="https://picsum.photos/400/300?random=6" alt="">
    </div>
</main>
```

```CSS
/* Carousel Component Style*/
.carousel {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
}
```

你会发现，`.carousel` 组件的出现，撑破了弹性布局：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e773bf43767c4bdd80bf820eebd29fa1~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/KKxdPRm

你可能已经想到了如何解决。是的，上面三个典型的 Web 布局出现问题，都是同一性质，即 **CSS Flexbox 或 CSS Grid 布局中，Flex 项目或 Grid 项目的最小尺寸不会小于其最小内容尺寸** 。其中根本原因，是由于 Flex 项目和 Grid 项目的 `min-width` 的计算值是 `auto` ，而不是 `0` 。

事实上，在 W3C 规范中对于 [Flex 项目](https://www.w3.org/TR/css-flexbox-1/#min-size-auto)和 [Grid 项目](https://www.w3.org/TR/css-grid-1/#min-size-auto)的**自动最小尺寸（Automatic Minimum Size ）** 的计算或者相应的解决方案有具体描述：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/406a55d2b388437a8510fce8c6b93e9a~tplv-k3u1fbpfcp-zoom-1.image)

从 W3C 规范中，我们不难获得，要解决上面这些“问题”，很简单。

先来看 CSS Flexbox 布局的解决方案，最简单的解决方法就是**在 Flex 项目上重置** **`min-width`** **属性的值为** **`0`** 。当然，该解决方案也适应用 CSS Grid 布局中。比如上面的等宽布局，我们只需要在 Flex 项目和 Grid 项目上设置 `min-width` 属性的值为 `0` ：

```CSS
header > div {
    min-width: 0; /* Flex 项目*/
}

footer > div {
    min-width: 0; /* Grid 项目*/
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7e00428c399473fa2226a1c4968147e~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/NWLGWdw

上示中的解决方案同样也适用于后面两个示例（“长字符串无法断行”和“撑破弹性布局”），但对于“长字符串无法断行”这个示例还有其他的解决方案。比如在 Flex 项目或 Grid 项目上显式设置 `overflow` 属性的值为非 `visible` 值，可以是 `hidden` 、`auto` 或 `scroll` ，只不过 `auto` 和 `scroll` 值可能会让 Flex（或 Grid）项目出现水平滚动条。

```CSS
/* CSS Flexbox Layout */
.card__content {
  flex: 1 1 0%;
  overflow: hidden; /* 或 auto 或 scroll*/
}

.card__content p {
    overflow-wrap: break-word;
}

/* CSS Grid Layout */
.card--grid p {
  overflow-wrap: break-word;
  overflow: hidden; /* 或 auto 或 scroll */
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/058058d3152a46fb99843bc4686d4ba0~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/gOdaOGW

这也正是在 Flex 项目或 Grid 项目运用 `text-overflow: ellipsis` 截取文本提供省略号指示器效果时，不需要显式设置 `min-width: 0` 的根本原因所在：

```CSS
/* 单行文本截取，末尾添加 ... */ 
.text-overflow { 
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
} 

/* 多行文本截取，末尾添加... */ 
.line-clamp { 
    --line-clamp: 1; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    display: -webkit-box; 
    -webkit-line-clamp: var(--line-clamp); 
    -webkit-box-orient: vertical; 
}
```

需要注意的是，我们这个示例有所不同，CSS Flexbox 布局长文本所在元素不是 Flex 项目，所以要用文本截取的效果，需要在 Flex 项目上显式设置 `min-width: 0` 或 `overflow:hidden` ，然后在其子元素 `<p>` 上使用 `text-overflow` ：

```CSS
/* CSS Flexbox Layout */
.card__content {
    flex: 1 1 0%;
    min-width: 0;
}

.card__content p {
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
}

/* CSS Grid Layout */
.card--grid p {
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e847916a9cf34dbb98c21ce682254aba~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/LYJpYmp

对于 CSS Grid 布局，它还有另一种解决方案，那就是**使用** **`minmax(0, 1fr)`** **来替代** **`1fr`** 。

在 CSS Grid 中，`1fr` 的底层实现逻辑其实就是 `minmax(auto,1fr)` （`minmax() 是用来设置网格轨道尺寸一个 CSS 函数`），意味着 `min=auto`（即`min-width: min-content`），`max=1fr`。这样一来，`minmax(0, 1fr)` 将 `1fr` 的默认`min-width` 从 `min-content` （即 `auto`）重置为 `0` 。这样就允许网格轨道尺寸保持在 `0` 至 `1f` 范围内（最小小到 `0` ，最大大到 `1fr`）。

就拿最后一个示例为例吧，在 Flexbox 布局的 Flex 项目上显式设置 `min-width: 0` ；在 Grid 布局上，除了可以在 Grid 项目上显式设置为 `min-width: 0` 之外，还可以把网格容器中的 `1fr` 替换为 `minmax(0, 1fr)` ：

```CSS
/* CSS Flexbox Layout */
.flexbox main {
    flex: 1 1 0%;
    min-width: 0;
}

/* CSS Grid Layout*/
.grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 280px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c19fcf2cd814a7a89026b8a8b408445~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/jOvbOQe

## 小结

虽然在 CSS Flexbox 布局中，我们可以在 Flex 项目上显式设置 `flex: 1 1 0%` ，让 Flex 项目根据 Flex 容器的剩余空间或不足空间进行收缩与扩展，但是即使是这样，我们在使用 `flex: 1 1 0%` 对 Flex 项目进行收缩时，仍需特别注意，**Flex 项目收缩之后的宽度不能小于 Flex 项目的最小内容尺寸（****`min-content`****）** 。

为了避免 `flex: 1 1 0%` 引起的不必要麻烦，我们在编写 CSS 时应该注意，**在使用** **`flex: 1 1 %`** **的 Flex 项目上**，**需要显式设置** **`min-width: 0`** **或** **`overflow: hidden`** **(也可以是** **`auto`** **或** **`scroll`** **)，只不过设置** **`overfow`** **时，需要根据具本需求来判断，如果不需要让 Flex 项目出现滚动条，建议** **`overflow`** **取** **`hidden`** **值** 。

同样的，在 CSS Grid 布局中，Grid 项目收缩的时候，其宽度同样不能小于其最小内容尺寸。只不过，在 CSS Grid 布局中，我们常使用 `1fr` 来设置网格轨道，让相应的网格项目根据网格容器可用空间来进行收缩。也就是说，如果你在定义网格轨道时，碰到了 `1fr` 设置网格轨道尺寸时，需要使用下面三种方式来确保 Grid 网格项目不产生问题：

- 在定义网格轨道尺寸时，使用 `minmax(0, 1fr)` 来替代 `1fr`； 
- 在设置为 `1fr` 网格轨道中的网格项目上显式设置 `min-width` 属性的值为 `0`； 
- 在设置为 `1fr` 网格轨道中的网格项目上显式设置 `overflow` 属性的值为 `hidden` 或 `auto` 或 `scroll` 。如果不希望网格项目出现滚动条，则建议将 `overflow` 属性的值设置为 `hidden`。 

虽然上面三种方式都可以避免 `1fr` 产生的问题，但我更建议使用 `minmax(0, 1fr)` 来替代 `1fr`。

最后简单地说，我们在编写 CSS 代码的时候，**只要碰到了** **`flex:1`** **（或** **`flex: 1 1 0%`** **或** **`flex: 1 1 100%`** **）和在网格轨道设置** **`1fr`** **时，最好在对应****的****项目（Flex 项目或网格项目）上显式设置** **`min-width`** **的值为** **`0`** **；而且使用** **`minmax(0, 1fr)`** **来替代** **`1fr`** 。这样你编写出的 CSS 更具防御性，代码也更健壮。

  