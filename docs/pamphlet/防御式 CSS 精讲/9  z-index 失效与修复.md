很多 Web 开发者可能会认为 Web 页面中的元素只存于一个二维空间，即只在内联轴（Inline Axis）和块轴（Block Axis）中控制元素的尺寸和位置。事实上并非如此，Web 页面中元素是在一个 3D 世界。也就是说，除了内联轴（或 `x` 轴）和块轴（或 `y` 轴）之外，还有一个 `z` 轴。

CSS 中的 `z-index` 属性可以帮助我们控制元素在 `z` 轴的顺序。只不过，Web 开发者在使用 `z-index` 给元素设置层叠顺序（`z` 轴的顺序）时并不起作用，很多人也不知道为啥不起作用。在接下来的内容中，将和大家一起探讨 `z-index` 为什么不起作用，以及又应该如何修复。

## z-index 相关的基础知识

既然要了解 `z-index` 在使用的时候为什么不生效，就有必要先了解 `z-index` 相关的基础知识以及相关概念。只有掌握了这些基础知识之后，你在使用 `z-index` 碰到问题时才能快速修复。

### z-index 是什么？

一般情况之下，`z-index` 属性没什么用。如果你不确定它到底是什么，那么可以看一下 [W3C 规范提供的描述](https://www.w3.org/TR/CSS22/visuren.html#propdef-z-index)：

> 在 CSS 中，每个元素盒子在三维空间都有一个位置。除了水平（内联轴）和垂直（块轴）上的位置之外，元素盒子还沿着 `z` 轴排列。当元素盒子在视觉上重叠时，`z` 轴的位置（顺序）就显得尤其重要。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10732ba137494f7987464f30fd272ce2~tplv-k3u1fbpfcp-zoom-1.image)

对于 `x` 和 `y` 轴我们很易于理解，一个向右，一个向下。但对于 `z` 轴，理解起来就较为费力。在 CSS 中要确定沿着 `z` 轴排列元素，表示的是用户与屏幕的这条看不见的垂直线：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8dc337b7881848019cb44836d8d41b35~tplv-k3u1fbpfcp-zoom-1.image)

文档中的元素盒子在 `z` 轴除了有默认的顺序之外，Web 开发者还可以使用 `z-index` 来改为元素盒子在 `z` 轴的顺序。使用 `z-index` 很简单，给它指定一个整数值即可（它可以是一个正整数，也可以是一个负整数）。元素的 `z-index` 值越高，表示该元素盒子在 `z` 轴的层级越高（越在顶层），离用户的眼睛越近。

然而，在层叠比较复杂的 HTML 元素上使用 `z-index` 时，结果可能会令你感到困惑，甚至不可思议。这主要是由复杂的元素排列规则导致的。

既然如此，我们就从 `z-index` 的默认行为开始吧。比如，Web 页面中有三个 `<div class="box">` 元素，在这三个元素上只设置了一些视觉 UI 的样式规则，并没有设置任何规则来改变元素的上下文格式：

```HTML
<body>
    <div class="box">Box ①</div>
    <div class="box">Box ②</div>
    <div class="box">Box ③</div>
</body>
```

```CSS
.box + .box {
    margin-top: -150px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/69cfb7f7e64748f0966c00e37c0d61a9~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/abaWmPE

上图展示的是 `z-index` 默认行为。如果元素没有显式设置 `z-index` 的值，那么它们的 `z-index` 属性的值都会是其默认值 `auto` 。浏览器会根据元素在 HTML 文档中的出现的先后顺序（源顺序）来计算其 `z-index` 的值。

在正常文档流中，元素默认都是静态定位元素，并不会创建层叠上下文（Stacking Contexts）。这个时候，如果你在元素上为 `z-index` 指定了一个特定的值，它也不会起任何的作用。换句话说，你要让 `z-index` 起作用，就需要为该元素创建一个层叠上下文。在 CSS 中创建层叠上下文的方法很多，最常见的方法就是给元素的 `position` 属性设置一个非 `static` 的值，比如：

```CSS
.box {
    position: relative;
}

.box:nth-child(1) {
    z-index: 3
}

.box:nth-child(2) {
    z-index: 1;
}

.box:nth-child(3) {
    z-index: 2;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/324c674a753a42d4988576cfc4f2c4ba~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/yLxbVzP

不过，如果元素是一个 Flex 项目或 Grid 项目的话，不需要额外去给它们创建一个层叠上下文，就可以让项目的 `z-index` 生效。比如：

```CSS
body {
    display: flex; /* 或 inline-flex */
}

/* 或者 */
body {
    display: grid; /* 或 inline-grid */
}

.box:nth-child(1) {
    z-index: 3
}

.box:nth-child(2) {
    z-index: 1;
}

.box:nth-child(3) {
    z-index: 2;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01cad00780b143ed8439a96a06cc9ed0~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/PodmbVb

`z-index` 还可以指定为一个负整数值。比如：

```CSS
.box:nth-child(2) {
    position: relative;
    z-index: -1;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c47059f1e7b54ad29e89fad5dc8b1d91~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/OJomWRj

### 创建层叠上下文

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f1c161558a6424ab562984522f5b9d7~tplv-k3u1fbpfcp-zoom-1.image)

我们假定用户正面向（浏览器）视窗或网页，而 HTML 元素沿着其相对于用户的一条虚构的 `z` 轴排开，层叠上下文就是对这些 HTML 元素的一个三维构想。众 HTML 元素基于其元素属性按照优先级顺序占据这个空间。

简单地说，CSS 中的层叠上下文（Stacking Contexts）是一组元素，它们有一个共同的父元素，并且在 `z` 轴一起上下移动。比如下面这个示例：

```HTML
<body>
    <div class="parent box--parent">
        Parent Element①: z-index: 2 
    </div>
    <div class="parent box--parent">
        Parent Element②: z-index: 1
        <div class="child box--child">Child Element②-①: z-index: 999</div>
    </div>
</body>
```

```CSS
.box {
    position: relative;
}

.parent:nth-child(1) {
    z-index: 2;
}

.parent:nth-child(2) {
    z-index: 1;
}

.parent:nth-child(2) > .child {
    z-index: 999;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04051584a8bf4a10a68e3b3b24874724~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/WNgjjWZ

尽管第二个元素的子元素（`.box--child`）的 `z-index` 指定的值是 `999`，它比第一个元素 `.parent:nth-child(1)` 的 `z-index` 值（`2`）要大得多，但它（`.box--child`）在 `z` 轴上的顺序仍然低于第一个元素 `.parent:nth-child(1)` 。

这是因为，第一个元素 `.parent:nth-child(1)` 和元素 `.box--child` 都有自己的层叠上下文（`.parent:nth-child(2)` 元素和 `.box--child` 元素在同一个层中），而且第一个元素（`.parent:nth-child(1)`）的 `z-index` 要比第二个元素（`.paernt:nth-child(2)`）的 `z-index` 更高，所以 `.box--child` 设置的 `z-index` 值即使是 `999` （高于 `.parent:nth-child(1)` 的 `z-index` 值），它也在 `.parent:nth-child(1)` 元素之下。

简单地说，**CSS 中的层叠上下文中元素的** **`z-index`** **总是相对于父元素在其自身层叠上下文中的当前顺序** 。

> 需要注意的是，`<html>` 元素（根元素）本身就是一个层叠上下文，没有任何元素还可以比它更低。

通过前面的内容可以获知，元素指定的 `z-index` 要生效，它必须要有一个前提条件，即 **设置** **`z-index`** **元素是一个层叠上下文**。在 CSS 中将元素变成一个层叠上下文（即创建层叠上下文）最简单的方法是在元素上设置 `position` 属性是一个非 `static` 值。除此之外，你还可以通过给元素添加其他的属性值，来创建一个新的层叠上下文，比如：

- Flex 项目或 Grid 项目，且 `z-index` 的值不是默认值 `auto`； 
- `opacity` 的值小于 `1`； 
- `mix-blend-mode` 的值不是 `normal`； 
- `transform` 、`filter` 、`backdrop-filter` 、`perspective` 、`clip-path` 和 `mask` 属性的值不是 `none`； 
- `isolation` 的值为 `isolate`； 
- `will-change` 值设定了任一属性，而该属性在非初始值（non-initial）值；
- `contain` 的值为 `layout` 、`paint` 或包含它们其中之一的合成值，比如 `contain: strict` 、`contain: content`。 

> **特别声明：上面所列创建层叠上下文的方法中，如果** **`position`** **的值是** **`relative`** **或** **`absolute`** **时，需要显式设置** **`z-index`** **的值才会创建一个层叠上下文，但** **`position`** **的值是** **`fixed`** **或** **`sticky`** **时，不需要显式设置** **`z-index`** **的值也同样会创建一个层叠上下文** 。

这些方法在 CSS 中可以创建一个新的复合层。

在层叠上下文中，子元素同样也按照上面的规则来创建层叠上下文。重要的是，其子级层叠上下文的 `z-index` 值只在父级中才有意义。子级层叠上下文被自动视为父级层叠上下文的一个独立单元。

简单小结一下：

- 层叠上下文可以包含在其他层叠上下文中，并且一起创建一个层叠上下文的层级；
- 每个层叠上下文都完全独立于它的兄弟元素：当处理层叠时只考虑子元素；
- 每个层叠上下文都是自包含的：当一个元素的内容发生层叠后，该元素将被作为整体，在父级层叠上下文中按顺序进行层叠。

## z-index 失效与修复

我想现在你已经知道 `z-index` 是什么，以及能起啥作用了，但在实际使用的时候，总是会碰到一些奇怪的现象，比如：

- 给元素指定了一个 `z-index` 值，怎么就不生效；
- 明明指定了一个更大的 `z-index` 值，怎么层级就是上不去；
- 明明给 `z-index` 指定了一个负值，怎么层级就下不去；
- ……

要是你在实际开发中碰到这些现象，需要怎么去修复呢？

先来看第一种现象，**给元素指定了一个** **`z-index`** **值** ，但未达到预期的效果。比如：

```HTML
<body>
    <div class="cat"></div>
    <div class="content">Content</div>
</body>
```

 

```CSS
.cat {
    z-index: 99;
}

.cat + .content {
    margin-top: -3rem;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b28bd410cf745c9b6cea3708456a383~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/mdGmMav

正如你所看到的，即使指定了 `.cat` 的 `z-index: 99` ，它在 `z` 轴上仍然位于 `.content` （它的 `z-index` 是 `auto` ）之下。

如果你在实际开发中碰到类似的现象，首先要排查的是，`.cat` 元素是不是一个层叠上下文。如果不是，那需要指定 `.cat` 元素的 `position` 属性值是一个非 `static` ，比如 `relative` （建议使用 `relative` 值，只要不显式设置 `top` 、`right` 、`bottom` 、 `left` 或 `inset` 等属性值，它的位置不会有任何的偏移。有关于这方面更详细的介绍，可以阅读《`positon: sticky 的失效与修复`》一文）：

```CSS
.cat {
    position: relative;
    z-index: 99;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5bf8c85b831c44de8b72659e606a6fe7~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/WNgjZpo

除此之外，还可以使用其他创建层叠上下文（复合层）的方法，比如：

- 在 `.cat` 元素上设置 `transform: translateZ(0)`； 
- 在 `.cat` 元素上设置 `will-change: transform`； 
- 在 `.cat` 元素上设置 `mask: url(#)`； 
- 在 `.cat` 元素上设置 `contain: layout`； 
- 在 `.cat` 元素上设置 `isolation:isolate`；
- 或者将 `.cat` 元素变成一个 Flex 项目（或 Grid 项目）；
- ……

只需要确保创建复合层的 CSS 属性不要影响其样式即可：

```CSS
.cat {
    z-index: 99;
}

/* 使用 positoin 创建层叠上下文（非 static） */
.cat {
    position: relative;
}

/* 使用 transform 创建层叠上下文 */
.cat {
    transform: translate3D(0, 0, 0);
}

/* 使用 will-change 创建层叠上下文 */
.cat {
    will-change: transform;
}

/* 使用 mask 创建层叠上下文 */
.cat {
    mask: linear-gradient(to bottom, black, black);
}

/* 使用 contain 创建层叠上下文 */
.cat {
    contain: layout;
}

/* 使用 isolation:isolate 创建层叠上下文 */
.cat {
    isolation:isolate;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/16d539a06c1d4cbe9e72bb5c037fdec6~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/MWqmEVQ

虽然上面这些方法都可以创建层叠上下文，但有些方法却会影响到其子元素或者自身的样式。比如：

- `opactiy` 会改为元素及其后代元素的透明度；
- `mix-blend-mode` 会改变元素及其后代元素的 UI 效果；
- `filter` 会改变元素及其后代元素的 UI 效果；
- ……

相比而言，我更喜欢 `isolation:isolate;` 。当使用这个属性时，它只做一件事情：**创建一个层叠上下文** 。反观其他创建方式，你会发它们都是通过一些其他修改来隐式创建的，而 `isolation` 则是显性创建：

- 不需要规定 `z-index` 的值；
- 可以作用到 `static` 元素；
- 不会影响到子元素。

比如下面这个示例，当你鼠标悬浮到卡片上时，它的层级会更高于相邻的卡片：

```CSS
.drop:hover {
    isolation: isolate;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b251174d5c6740dd81f9485128d44d00~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/WNgjXwM

你会发现，上面这个示例，并没有给 `.drop` 指定 `z-index` 属性值，但当鼠标悬浮到卡片上时，当前卡片在 `z` 轴的层级会比相邻的卡片更高。这种方式会比前面所介绍的方式（比如 `position: relative; z-index: 99`）更为灵活，它巧妙利用了**隔离**特性，不易于受到外界的影响。

不过，万事都是具有两面性的。有的时候， 我们期望达到下图这样的效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df60dc693054421ea85d0e6d585c1149~tplv-k3u1fbpfcp-zoom-1.image)

```HTML
<body>
    <div class="cat"></div>
    <div class="content">Content</div>
    <div class="cat" style="float: right"></div>
</body>
```

```CSS
.content {
    margin-block: -6rem;
    position: relative;
}
```

要是你一不小心，在 `.cat` 上触发了层叠上下文，比如给它添加了一个 `transform` 规则：

```CSS
.content {
    margin-block: -6rem;
    position: relative;
}

.cat {
    transform: rotate(45deg);
}
```

第二只猫在 `z` 轴的层级变得更高了：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b69e36c88f444ab3a816ff8fa2e47233~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/JjaNOZG

也就是说，当你发现元素在 `z` 轴的层级不符合你预期，又不知道是什么原因时，那就需要反向来排查，检测是不是其他 CSS 属性致使元素有独立的层级或变成一个复合层。如果是，就需要重置它们的 `z-index` 值。

CSS 中另一个使 `z-index` 不能达到预期的原因是**层叠等级造成的**。比如下面这个示例：

```HTML
<body>
    <header>Header</header>
    <main>
        Main
        <div class="tooltips" tooltips-content="Tooltips Content"><svg /></div>
    </main>
</body>
```

```CSS
body {
    display: grid;
}

header {
    z-index: 2;
}

main {
    z-index: 1;
}

.tooltips {
    position: relative;
    z-index: 999;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58df1cd332db4ad8a20197ca1f51dc33~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/bGxRypb

虽然 `.tooltips` 的 `z-index` 值大于 `header` 的 `z-index` 值，但由于 `.tooltips` 的父元素 `main` 的 `z-index` 的值小于 `header` 的 `z-index` 值，造成它（`.tooltips`）在 `z` 轴上的层级永远都不会高于 `header` ，即使是设置再大的值也无事于补。

因为**层叠等级需要在相同的层叠上下文中比较才有意义，不同层叠上下文中比较层叠等级是没有意义的**。如果这句话不易于理解，你可以拿设计软件中的图层概念来理解，比如 Photoshop 或 Figma 中图层：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36680c348a6a457080de3fc41ff7fd79~tplv-k3u1fbpfcp-zoom-1.image)

正如上图所示，`header` 和 `main` 是兄弟关系，并且 `header` 是 `main` 的大哥；而 `.tooltips` 和 `main` 是父子关系，其中 `main` 是父，`.tooltips` 是子。如此一来，`header` 就是 `.tooltips` 的大伯了，你想想这辈份摆在那，`.tooltips` 再怎么排名论辈，它始终大不过 `header` 。

也就是说，如果我们希望上面示例中 `.tooltips` 在 `z` 轴的级别更高，不要被 `header` 遮盖住，那就需要调整一下 `header` 和 `main` 的级别，比如把 `main` 的 `z-index` 设置的比 `header` 大一点：

```CSS
header {
    z-index: 1;
}

main {
    z-index: 2;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05697995e836447bbc48a07faa6bf2b0~tplv-k3u1fbpfcp-zoom-1.image)

现在看上去是达到我们预期想要的效果了，不过更好的修复方案不是去调整 `main` 的 `z-index` 值（设置一个比 `header` 的 `z-index` 更大的值），更好的修复方案是不在 `main` 元素上显式设置 `z-index` 的值。

```CSS
header {
    z-index: 2;
}

.tooltips {
    z-index: 999;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a6fcde5ce7b427e848f53d2b9172ddc~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/rNZwEBv

这就相当于把 `main` 的层叠删了，把 `.tooltips` 往上提了，如此一来，`.tooltips` 就直接和 `header` 比大小了。你或许会感到困惑，为什么 `main` 元素上不显式设置 `z-index` 属性值，它的层叠上下文就消失了呢？这就涉及到 CSS 中的层叠上下文的创建了。

在 CSS 中，很多时候制作一些特殊的 UI 效果，比如渐变阴影、渐变边框等，都会借助 CSS 的伪元素 `::before` 和 `::after` 来减少 HTML 结构。同时还需要将 `z-index` 的值设置为一个负值，让伪元素不会遮盖元素本身的内容：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71eec185553140c7a81783a2f0f97081~tplv-k3u1fbpfcp-zoom-1.image)

可是，元素 `z-index` 设置一个负值时，元素有可能会在视觉上被弄丢了，也有可能元素在 `z` 轴上没有达到预期效果，比如元素不会放置到内容层下面。那么，为什么会这样呢？我们先来看一个简单的示例：

```HTML
<div class="box">Box Element</div>
```

```CSS
.box::before {
    position: relative;
    z-index: -1;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/caf5495b0c7945499f4b84425d16f41f~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/qBMjejq

正如你所看到的，上图的效果是符合我们预期的。不过，当元素 `.box` 是一个层叠上下文时，效果就不是我们所期望的，比如：

```CSS
.box {
    position: relative;
    z-index: 0;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9739d909f1ca41df89c20f7ba2d109d0~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/ExeXqQy

也就是说，当你给元素的 `z-index` 指定了一个负值，但该元素并没有位于其父元素（或祖先元素）下面，你就需要看看，其父元素或祖先元素是不是一个层叠上下文，如果是，那就需要避开，即不创建一个层叠上下文。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ffd0c129efa040ccbd18439ab6ef7d33~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/MWqoNzw

在 CSS 中创建层叠上下文的方法有很多种，为了实现一些布局效果，可能会用到创建层叠上下文的相关 CSS 属性，就有可能引起指定负值的 `z-index` 无效。比如下面这个示例：

```HTML
<div class="card"></div>
```

为了让卡片始终位于浏览器视窗的中心位置，你可能选择了下面这种方式来实现：

```CSS
.card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)；
    z-index: 0;
}
```

代码中的 `transform` 属性（因为它不是 `none` 值）创建了一个层叠上下文，即 `.card` 是一个独立的层叠上下文。为了实现一些特殊的 UI 效果，可能会使用伪元素 `::before` ，并指定其 `z-index` 为一个负值，希望伪元素能位于 `.card` 下面（`z` 轴方向）：

```CSS
.card::before {
    position: absolute;
    top: 0;
    z-index: -1;
}
```

你可能已经想到了，实际上 `.card::before` 并没有位于 `.card` 下面：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/565321c37562401dbf18c684402095ee~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/dyqzbym

碰到这种现象，除了在 CSS 方面来修复，即 **避免会创建层叠上下文的 CSS 属性**，比如改用其他实现水平垂直居中的技术方案，还可以从 HTML 的结构上来做相应的调整，比如：

```HTML
<div class="card--wrapper"><!-- 创建层叠上下文 -->
    <div class="card"><!-- 避免创建层叠上下文 -->
        ::before
    </div>
</div>
```

```CSS
.card--wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
}

.card::before {
    position: absolute;
    z-index: -1;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b653c77c8a6b4ae6b7d47b47e73de0c8~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/dyqzbym

上面所列的是 `z-index` 失效的常见情景以及相应的修复方法。当然，有可能也会有其他的边缘条件，只不过我自己很少碰到。如果你在开发业务的时候，碰到 `z-index` 失效，又不知道如何排查和修复时，建议你使用一些调试工具。这些调试可以帮助你快速定位到问题，你也好选择相应的方案。

首推 Microsoft Edge 的 **[3D 视图（3D View）](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/3d-view/)** :

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9a7a597249b414ca01bd9bc1e108388~tplv-k3u1fbpfcp-zoom-1.image)

虽然在这个视图中很难找到一个特定的元素，但它能帮助你理解 Web 页面中层叠上下文。除此之外，还可以使用浏览器的插件，比如 [Chrome](https://chrome.google.com/webstore/detail/css-stacking-context-insp/apjeljpachdcjkgnamgppgfkmddadcki) 和 [Firefox](https://addons.mozilla.org/en-US/firefox/addon/css-stacking-context-inspector/) 的 CSS 层叠上下文检查器（CSS Stacking Context inspector）：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/861fd617629d4dffa5e01631ca068087~tplv-k3u1fbpfcp-zoom-1.image)

## 小结

综上所述，`z-index` 的大多数问题，都可以通过以下两个指导原则来解决:

- 检查元素是否创建层叠上下文和按正确的顺序设置了它们的 `z-index` ；
- 确保没有父元素限制其子元素的 `z-index` 级别。

额外有一点需要注意的是，当 `z-index` 的值是负值时，它只能位于非层叠上下文之下。也就是说，如果指定了 `z-index` 负值的元素只能位于一个未创建层叠上下文元素之下。

最后，希望这节课的内容能帮助到大家，尤其是使用 `z-index` 失效的情景之下。