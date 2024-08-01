![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b61f136a8fad4f6ebf73fa0a47108cc0~tplv-k3u1fbpfcp-zoom-1.image)

类似上图这样的 `<Carousel>` 组件（旋转木马）在 Web 应用或页面上是很常见的。在早期的 Web 开发中，需要依赖 JavaScript 库来才能完成，比如 [Swiper](https://www.swiper.com.cn/)。

随着 CSS 滚动捕捉（CSS Scroll Snap）的出现，你现在可以不需要借助任何 JavaScript 脚本，使用它就可以实现 `<Carousel>` 组件的效果。CSS 滚动捕捉增强了用户体验，并使其更容易实现[滚动体验](https://juejin.cn/book/7199571709102391328/section/7199845609447096358)。

## 为什么要使用 CSS 滚动捕捉？

随着移动终端的兴起，我们需要构建可以轻触的组件，比如 `<ImageCarousel>` 组件。用户可以轻松地向左或向右滑动以查看更多的图片：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e89954dd91654e479de41564bb6cca7c~tplv-k3u1fbpfcp-zoom-1.image)

在不使用 JavaScript 库和没有 CSS 滚动捕捉特性之下，如果我们需要滚动图片列表，必须小心翼翼，尽可能地让某一滚动项目紧贴滚动容器的边界。因为，每次滚动时，我们想看到的是每个滚动项目的完整内容，而不是一部分。有了 CSS 滚动捕捉特性之后，我们只需要滚动项目的 `50%` ，然后，剩下的交给浏览器处理就好。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5a2999be40f49bd86b7c2157fd44d71~tplv-k3u1fbpfcp-zoom-1.image)

正如 [W3C 规范所述](https://www.w3.org/TR/css-scroll-snap-1/#intro)，为开发者提供良好控制的滚动体验是引入 **CSS 滚动捕捉（CSS Scroll Snap）**的主要原因之一。它增强了用户体验，并使其更容易实现滚动体验。

> 注意，CSS 滚动捕捉只是改善滚动体验特性之一，在 CSS 中还有其他可用于改善滚动体验的特性，有关于这方面更详细的介绍，可以阅读小册前面的课程：《[CSS 如何改善滚动体验](https://juejin.cn/book/7199571709102391328/section/7199845609447096358)》。

## 滚动容器的基础知识

在开始聊 CSS 滚动捕捉之前，先花一点时间来了解一些基础知识，这样有利于大家理解 CSS 滚动捕捉。

### 容器和容器空间

CSS 中万物皆是一个盒子，也是一个容器，在容器中可以放置你喜欢的事物（内容），而且每个容器都有各自的尺寸大小，这个大小就是容器的空间。容器空间又可分为**可用空间**和**不可用空间**：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4cb62834ae94ee18fcac15ba7940ebd~tplv-k3u1fbpfcp-zoom-1.image)

### 滚动容器

我们在构建 [Web 布局](https://juejin.cn/book/7161370789680250917?utm_source=profile_book)的时候，容器中的内容有可能会溢出容器，有可能不会溢出容器。但在容器中显式地设置 `overflow` 的值为 `auto` 或 `scroll` 属性值时，可以创建滚动容器。比如： 

```CSS
.container { 
    overflow: auto; /* 或者 overflow: scroll */
    width: 50vw; 
}
```

简单地说，创建滚动容器需要具备两个必要条件：

- 容器的 `overflow` 属性的值为 `auto` 或 `scroll` ；
- 容器的内容溢出容器。

比如下面这个示例，在容器 `.carousel` 中显式设置了 `overflow-x: auto;`，当内容溢出容器时，就创建了一个滚动容器：

```HTML
<div class="carousels">
    <figure class="carousel">
        <img src="carousel--item.jpg" alt="Carousel" />
    </figure>
    <!-- 其他 figure -->
</div>
```

```CSS
.carousels {
    display: flex;
    overflow-x: auto;
    max-width: 60vw;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82a6292c11924d9dabd61f01b86c0e93~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/VwGgqKg

### 滚动容器的轴线

滚动容器的轴线指的是滚动容器的滚动方向，它可以是水平或垂直的，`x` 值表示水平滚动，而 `y` 表示垂直滚动。CSS 的 `overflow` 属性有两个子属性，分别对应的是 `x` 轴和 `y` 轴： 

- 水平滚动，`overflow-x` 的值为 `auto` 或 `scroll`； 
- 垂直滚动，`overflow-y` 的值为 `auto` 或 `scroll`。 

但 `overflow-x` 和 `overflow-y` 只是分别表示水平方向和垂直方向有可能会有滚动条出现，但并没有滚动轴线的概念。只在 CSS 滚动捕捉特性出现之后，才有了滚动容器的轴线，即使用 `scroll-snap-type` 属性指定的值，相当于指定了滚动容器的轴线：

```CSS
/* 水平滚动轴线 */ 
.container-x { 
    overflow-x: auto; /* 或 scroll*/ 
    scroll-snap-type: x; 
} 

/* 垂直滚动轴线 */ 
.container-y { 
    overflow-y: auto; /* 或 scroll */ 
    scroll-snap-type: y; 
}
```

让它们在滚动时紧贴容器的边界。

### 捕捉

使用过类似 AutoCAD 软件的同学应该有这样的印象，在屏幕中绘制图形时，移动一个对象时，对象总能自动吸附在栅格线上，使得对象只能落在栅格上的确定位置上，这就是栅格捕捉。或者这样说，在一个普通的量尺上，规定你的画笔只能落在 `1mm` 和 `2mm` 的刻度上，而不能落在它们之间。

### 滚动捕捉

我们把“在滚动时对滚动位置进行捕捉”称为滚动捕捉。在 [W3C 中通过两个示例向我们阐述了滚动捕捉的概念](https://www.w3.org/TR/css-scroll-snap-1/#examples)。

首先，在前面示例的滚动容器上添加:

```CSS
.carousels {
    display: flex;
    overflow-x: auto;
    max-width: 60vw;
    
    /* 要求每次滚动的结束的位置精确地落在捕捉点上 */ 
    scroll-snap-type: x mandatory;
}

.carousel {
    /* 指定每张图片的捕捉位置与滚动容器可视区域 x 轴中心的位置对齐 */ 
    scroll-snap-align: none center;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/26efa84aa0e44b7da811ddcf2aad5701~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/MWqLLwq

正如你所看到的，通过使用基于元素的位置捕捉，使得滚动结束时某个图片的位置将始终落在滚动视口（滚动容器可视区域）的中心位置。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a31425bba4334bcfb7e31b26ff09f9e4~tplv-k3u1fbpfcp-zoom-1.image)

图中的红色区域即为可滚动容器的可视区域（也称捕捉视口），图片黄色框的地方被称为捕捉区域。我们在图片元素 `.carousel`（黄色框）设置了 `scroll-snap-align: none center; `指定了横轴捕捉点为中心位置（图像的中心位置）。此时将在捕捉视口区域中心（红色虚线）以及捕捉区域中心（黄色虚线）形成捕捉点。

把上面的示例稍做调整，换成垂直滚动：

```CSS
.carousels {
    display: flex;
    overflow-y: auto;
    max-width: 60vw;
    
    /* 使用非精确捕捉，能允许滚动最终停止在捕捉点的附近而不需要进一步的调整 */
    scroll-snap-type: y proximity;
}

.carousel {
    /* 指定每张图片的捕捉位置与滚动容器可视区域 y 轴的开始边缘位置对齐 */ 
    scroll-snap-align: start none;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc14c52b5b4b420d907f7ed071758843~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/zYJebxr

在本例中，在靠近滚动容器的开始（顶部）边缘可以捕捉每张图的停止位置。这种非精确的捕捉能够让上一张图片的末尾出现在捕捉点（容器边缘）的附近，让用户能够感知到还没有到达所有图片的最顶部的效果。

并且使用非精确的捕捉能够让用户在滚动中途随时停止，而不会像精确捕捉一样会强制将滚动位置修正到捕捉点上。然而在使用非精确捕捉时，如果滚动结束点已经位于捕捉点的附近，浏览器将会把最终的滚动点修改为指定的捕捉点上。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00c07d1dd26b48f78009cd052622dfa9~tplv-k3u1fbpfcp-zoom-1.image)

## 滚动捕捉的简介

CSS 滚动捕捉为我们提供了一种方法，**可以在用户滚动浏览文档时，将其滚动到特定的点（位置）** 。这对于在移动设备上，甚至在桌面端上为某些类型的应用程序（比如 `<Carousel>` 件）创造一个更类似于应用程序（原生客户端）的体验是很有帮助的。 简而言之，CSS 滚动捕捉可以： 

- 防止滚动时出现尴尬的滚动位置 ；
- 创建更好的滚动体验 。

CSS 滚动捕捉相关的属性和 CSS 的 Flexbox、Grid 属性类似，分为**作用于容器（滚动容器）属性**和**作用于定位子项（滚动容器子元素）属性**。其中作用于滚动容器的属性主要有 `scroll-snap-type` 、 `scroll-padding` 和 `scroll-snap-stop` ；作用于定位子项的属性主要有 `scroll-margin` 和 `scroll-snap-align`。

现在，让我们深入研究 CSS 滚动捕捉（CSS Scroll Snap）的属性。

## 滚动捕捉的基础使用

接下来分别讲讲**滚动捕捉类型（****`scroll-snap-type`****）** 、**滚动捕捉停止位置（****`scroll-snap-stop`****）** 、**滚动捕捉容器内边距（****`scroll-snap-padding`****）** 、**滚动项目的停止位置的对齐方式（****`scroll-snap-align`****）** 和 **滚动项目之间的间距（****`scroll-margin`****）。**

### 滚动捕捉类型：scroll-snap-type

**`scroll-snap-type`**  属性定义在滚动容器中的一个捕捉点（Snap Point）如何被严格的执行。它主要做了两件事情：

- 定义滚动容器的轴线；
- 定义滚动捕捉的严格性。

简单地说，它定义了滚动捕捉的方向和执行的严格程度。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/117608625dd84bf28de6215477043ab0~tplv-k3u1fbpfcp-zoom-1.image)

前半部分指定滚动容器轴线，用于指定滚动方向： 

- `x` ：即 `scroll-snap-type: x`，表示滚动容器只捕捉其水平轴上（`x` 轴）的捕捉位置； 
- `y` ：即 `scroll-snap-type: y`，表示滚动容器只捕捉其垂直轴上（`y` 轴）的捕捉位置； 
- `block` ：即 `scroll-snap-type: block`，表示滚动容器只捕捉其块轴（Block Axis）的捕捉位置 ；
- `inline` ：即 `scroll-snap-type: inline`，表示滚动容器只捕捉其内联轴（Inline Axis）的捕捉位置 ；
- `both` ：即 `scroll-snap-type: both`，表示滚动容器会独立捕捉到其两个轴上的捕捉位置（可能会捕捉到每个轴上的不同元素）。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fff650e3779249109bd5528007a1f0bc~tplv-k3u1fbpfcp-zoom-1.image)

> 注意，`block` 和 `inline` 是 CSS 逻辑属性中提出的概念，它和 CSS 的书写方式有关，因此上图中你会看到 `block` 和 `inline` 会在不同的方向，因为它们会随着 CSS 的 `writing-mode`、`direction` 和 HTML 的 `dir` 属性变化。如果你正在[构建一个多语言 Web 应用或网站](https://juejin.cn/book/7161370789680250917/section/7161625525763440647)时，那么 `block` 和 `inline` 非常有益。

```CSS
.carousels--x {
  overflow-x: auto;
  scroll-snap-type: x;
  width: 300px;
}

.carousels--y {
  overflow-x: auto;
  scroll-snap-type: y;
  height: 70vh;
}

.carousels--both {
  overflow: auto;
  scroll-snap-type: both;
  width: 480px;
  aspect-ratio: 1;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/beb197c1971f4ee19ad80f0e2d0a5d81~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/qBMggqB

`scroll-snap-type` 的后部分取值主要用来定义滚动容器中滚动捕捉执行的严格程度： 

- `mandatory` ：即 `scroll-snap-type: mandatory`，表示强制定位。如果它当前没有被滚动，这个滚动容器的可视窗口将静止在临时点（捕捉点）上。意思就是当滚动动作结束，如果可能，它会临时在那个点上。如果内容被添加、移动、删除或者重置大小，滚动偏移将被调整为保持静止在临时点（捕捉点）上。 
- `proximity` ：即 `scroll-snap-type: proximity`，表示可能定位。如果它当前没有被滚动，这个滚动容器的可视窗口将基于用户代理滚动的参数去到临时点（捕捉点）上。如果内容被添加、移动、删除或者重置大小，滚动偏移将被调整为保持静止在临时点（捕捉点）上。

```CSS
.carousels {
    overflow-x: auto;
    width: 40vw;
}
.carousels--mandatory {
    scroll-snap-type: x mandatory;
}

.carousels--proximity {
    scroll-snap-type: x proximity;
}

.carousel {
    scroll-snap-align: start;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f488874477b459b80572ab95843d9ab~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/PodVLBL

`mandatory` 和 `proximity` 的主要差异是，前者在用户停止滚动时，**浏览器必须** 滚动到一个捕捉点；后者就没有 `mandatory` 那么严格——除非当前滚动的位置合适，否则 **不会强制浏览器** 滚动到捕捉点。

你可以这样来理解，如果 `scroll-snap-type` 取值为 `mandatory` 时，滚动项目（`.carousel`）越过自身宽度的 `51%`（`x` 或 `inline` 轴）或高度的 `51%`（`y` 或 `block` 轴），滚动项目会继续向前滚动；而 `scroll-snap-type` 取值为 `proximity` 时，项目几乎要越过自身宽度或高度，项目才会继续向前滚动。

实质上按规范的阐述来说，两者是有区别的，比如下图所展示效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20e6829d4343414fb62a81de0a0f7c31~tplv-k3u1fbpfcp-zoom-1.image)

另外，`scroll-snap-type` 取值为 `mandatory` 能给用户提供更一致的用户体验。但是，[规范中也指出](https://www.w3.org/TR/css-scroll-snap-1/#valdef-scroll-snap-type-mandatory)，在遇到内容元素比滚动容器还高的情况，使用这个值就有点危险。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/902c73822565407e89b8e6f815998c67~tplv-k3u1fbpfcp-zoom-1.image)

如果这里的容器元素设置了 `scroll-snap-type: y mandatory`，它总是会吸附到元素的顶部或下面元素的顶部，使得这个超高元素的中间部分内容很难完整查看。

需要注意的是，如果在 `body` 上使用 `scroll-snap-type: y mandatory` 时，[将会触发 iOS 上的一个 Bug ，即打破 body 的滚动](https://developer.apple.com/forums/thread/24954)。针对这个 Bug，[@Denys Mishunov](https://twitter.com/mishunov) 提供了一个相应的解决方案：

```CSS
body {
    height: 100vh;
    overflow-y: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
}
```

我个人建议，最好是在使用 `scroll-snap-stype` 的滚动容器上都设置 `-webkit-overflow-scrolling: touch` ，来避免 iOS 可能产生的问题。

### 滚动捕捉容器内距：scroll-padding

`scroll-padding` 属性**用来指定滚动项目距离滚动容器的偏移量** ，这些偏移量定义了滚动视口的最佳浏览区域，即**作为目标区域的区域，用于将东西放置在用户的视野中**。简单地说，该属性主要用于滚动容器上，用于设置所有侧面的滚动距离。

`scroll-padding` 属性类似于 `padding` 的工作方式。它可以按方向拆分成多个属性：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe72088f87ee4caea7a6da8038e69062~tplv-k3u1fbpfcp-zoom-1.image)

来看一个简单的示例：

```CSS
.carousels {
    overflow-x: auto;
    width: 40vw;
    scroll-snap-type: x mandatory;
    padding: 1rem;
    scroll-padding-left: 1rem;
}

.carousel {
    scroll-snap-align: start;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/caaef49143134bed8de1d2542721baa7~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/XWPOwdO

在这个示例中，虽然在滚动容器 `.carousels` 设置了 `padding: 1rem` ，但不难发现，`scroll-snap-type` 致使滚动容器的 `padding-left` 在视觉上丢失了。庆幸的是，在滚动容器上设置 `scroll-padding-left` 可以修复这个视觉上的差异。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b466ce0a0bc04dc0946428d467cfad63~tplv-k3u1fbpfcp-zoom-1.image)

这个属性在某些场景特别的有用，允许开发者排除被其他内容（如固定位置的工具栏或侧边栏）遮挡的滚动区域，或者只是在滚动项目和滚动容器边缘之间留出更多的空间。

### 滚动捕捉停止位置：scroll-snap-stop

在一个滚动容器中按预定方向滚动时，滚动容器可以“通过”几个可能的滚动捕捉位置（如果滚动操作使用相同的方向，但距离较小，则可以有效地捕捉到这些位置），然后到达滚动操作的自然终点并选择其最终滚动位置。通俗来说，滚动太快可能会跳过多个滚动项目，如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4e74a571b554f03b9662083554a406f~tplv-k3u1fbpfcp-zoom-1.image)

你可能需要一种方法来防止用户在滚动时意外跳过一些重要的滚动项，其中 `scroll-snap-stop` 就是你需要的方法。`scroll-snap-stop` 属性允许用户可以一次滚动到一个捕捉点，迫使滚动容器在滚动操作自然结束之前停止。这种方式有助于避免跳过重要内容：

```CSS
.carousels {
    overflow-x: auto;
    width: 40vw;
    scroll-snap-type: x mandatory;
    padding: 1rem;
    scroll-padding-left: 1rem;
}

.carousel {
    scroll-snap-align: start;
    scroll-snap-stop: always;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bdfd8ee707764e36960f1c66a43f615f~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/bGxzyXm

而且我们使用 `scroll-snap-stop: always` 实现一些特殊的效果，比如下面这个示例，每次向前（或回退时）滚动两张图片：

```CSS
.carousels {
    overflow-x: auto;
    width: 40vw;
    scroll-snap-type: x mandatory;
    padding: 1rem;
    scroll-padding-left: 1rem;
}

.carousel {
    scroll-snap-align: start;
}

.carousel:nth-of-type(2n + 1) {
    scroll-snap-stop: always;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0489ab897ec43d7ba9367495d8cf092~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/wvENLKY

### 滚动捕捉的对齐方式：scroll-snap-align

`scroll-snap-align` 是作用在滚动项目（滚动容器子元素）上的，用来指定捕捉点的位置，即**捕捉点是在滚动项目的起点、中间还是结束点** 。该属性接受的值有： 

- `none` ：默认值，不指定捕捉点位置 ；
- `start` ：起始位置对齐，例如水平滚动，滚动项目的左侧边缘和滚动容器的左侧边缘对齐； 
- `center` ：居中对齐，例如水平滚动，滚动项目的水平中心位置和滚动容器的水平中心位置一致；
- `end` ：结束位置对齐，例如水平滚动，滚动项目的右侧边缘和滚动容器的右侧边缘对齐 。

例如：

```CSS
.carousels {
    overflow-x: auto;
    width: 40vw;
    scroll-snap-type: x mandatory;
    padding: 1rem;
    scroll-padding: 1rem;
}

.carousel {
    scroll-snap-align: start;
    scroll-snap-stop: always;
    scroll-snap-align: var(--align, start); /* 还可以是 center 或 end */
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8dcd901b259040a2a499fe7f828c3cbf~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/YzOBoJj

如果滚动容器的轴线是 `y` 轴，其相应的效果如下：

```CSS
.carousels {
    overflow-y: auto;
    height: 70vh;
    scroll-snap-type: y mandatory;
    padding: 1rem;
    scroll-padding: 1rem;
}

.carousel {
    scroll-snap-align: start;
    scroll-snap-stop: always;
    scroll-snap-align: var(--align, start); /* 还可以是 center 或 end */
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/adc212b6cb0444d4b5bce7f5af803b9a~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/ExerqVo

需要特别注意的是，`scroll-snap-align` 还支持同时使用两个属性值，比如：

```CSS
.carousel {
    scroll-snap-align: start center; 
}
```

如果 `scroll-snap-align` 只显式设置一个值的话，那么第二个值和第一个值相同：

```CSS
.carousel { 
    scroll-snap-align: start; 
    
    /* 等同于 */ 
    scroll-snap-align: start start;
}
```

### 滚动项目的外边距：scroll-margin

`scroll-margin` 和 `scroll-padding` 有点相似，不同的是，`scroll-margin` 用于滚动项目上。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e09c63954c74bf39532689fa11675e1~tplv-k3u1fbpfcp-zoom-1.image)

它可以用来设置滚动容器的子项之间的间距。 在向元素添加边距时，滚动将根据边距对齐：

```CSS
.carousels {
    overflow-x: auto;
    width: 40vw;
    scroll-snap-type: x mandatory;
    padding: 1rem;
}

.carousel {
    scroll-snap-align: start;
    scroll-sanp-stop: always;
    scroll-margin-left: 1rem;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/daef0c6f85814ab793ee09fb60f2b190~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：[防御式 CSS--#291: scroll-margin](https://codepen.io/airen/full/GRXzVxg)

`scroll-margin` 和 `scroll-padding` 一样，可以修复滚动容器视觉上丢失的 `padding-left` ：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86a6228b9705422793be37ae8454be50~tplv-k3u1fbpfcp-zoom-1.image)

## 滚动捕捉的实例

前面我们花了较长的篇幅向大家展示了滚动捕捉相关的特性。接下来我们由易到难，来看看 CSS 滚动捕捉能帮我们做哪些事情。接下来会从简单的示例着手，慢慢过渡到更为复杂的用例。

### 滚动列表

拿手淘首页频道列表为例：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4dbfa016dee347fc8e7d4f03b28c4318~tplv-k3u1fbpfcp-zoom-1.image)

不难发现，手淘官方效果是没有使用滚动捕捉的，所以它的效果并不很好。我们使用滚动捕捉来对其优化：

```HTML
<div class="channels">
    <figure class="channel">
        <img src="tianmao.jpg" alt="天猫新品" />
        <figcaption>天猫新品</figcaption>
    </figure>
    <!-- 其他 Channel -->
</div>
```

```CSS
.channels {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding: 0.03rem;
    display: grid;
    grid-template-columns: repeat(8, 100px);
    place-items: center;
}

.channel {
    scroll-snap-stop: always;
    scroll-snap-align: start;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9fd773ebca1411b9c9bc90828448b9f~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/WNgmebZ

滚动容器使用 CSS Grid 布局，并且在该容器指定了滚动捕捉的类型，再给每个频道上设置 `scroll-snap-stop: always` 和 `scroll-snap-align: start` 。每次只能滚动一列，并且滚动项目与滚动容器在开始边缘对齐。

### 全屏滚动

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1ba1020306846ab9c1f3253012ef774~tplv-k3u1fbpfcp-zoom-1.image)

全屏滚动主要分为**水平方向**和**垂直方向**两种。它们都有一个共同的特性，**滚动项目和滚动容器的宽高都相等**。我们曾在《[CSS 如何改善滚动体验](https://juejin.cn/book/7199571709102391328/section/7199845609447096358)》的课程中就介绍过全屏滚动体验的优化，其中有一个案例就用到了滚动捕捉相关的特性。

```HTML
<div class="carousels">
    <figure class="carousel">
        <img src="carousel.jpg" alt="" />
    </figure>
    <!-- 其他 Figure -->
</div>
```

```CSS
/* 全屏滚动之水平方向 */
.carousels--horizontal {
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
}

/* 全屏滚动之垂直方向 */
.carousels--vertical {
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: y mandatory;
}

.carousels {
    display: flex;
    width: 230px;
    height: 500px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 45px;
    border-radius: 30px;
}

.carousel {
    margin: 0;
    padding: 0;
    width: 230px;
    height: 500px;
    object-fit: cover;
    object-position: center;

    scroll-snap-align: center;
    scroll-snap-stop: always;
}

.carousel img {
    display: block;
    width: 230px;
    height: 500px;
    object-fit: cover;
    object-position: center;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9daf644582a43a681db40fa87262b1f~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/poOYzKq

### iOS 日期时间选择器 

有了 CSS 滚动捕捉器的特性，我们可以在多个滚动容器中使用该特性来实现 iOS 日期时间选择器效果： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb104b726a924de492b1cec581d7621a~tplv-k3u1fbpfcp-zoom-1.image)

实现日期时间选择器的效果其实很简单，需要三个滚动容器，并使用相应的滚动特性即可。先来看 HTML: 

```HTML
<div class="picker"> 
    <span class="dates" title="DAY"> 
        <date>Fri 24 Jul</date> 
        <!-- ... --> 
        <date>Thu 14 Aug</date> 
    </span> 
    <span class="hours" title="HOUR"> 
        <time>0</time> 
        <!-- ... --> 
        <time>23</time> 
    </span> 
    <span class="minutes" title="MIN"> 
        <time>0</time> 
        <!-- ... --> 
        <time>59</time> 
    </span> 
</div> 
```

分别在 `.dates`、`.hours` 和 `.minutes` 中创建三个滚动容器，同时在这三个滚动容器上设置 `scroll-snap-type` 设置值为 `y mandatory`，然后在滚动项目中使用 `scroll-snap-align: center` 让每个滚动项目在滚动容器中居中显示。最终关键的代码如下：

```CSS
.picker > * { 
    overflow-y: auto; 
    scroll-snap-type: y mandatory; 
    overscroll-behavior-y: contain; 
    scroll-behavior: smooth;
} 

.picker > * > * { 
    scroll-snap-align: center; 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4ac657e314246b9af35e1676b70b335~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/VwGRwMQ （该示例来自于 Codepen 上 [@Adam Argyle 写的 Demo: Scroll Snap Date Time Picker](https://codepen.io/argyleink/full/MWKxMyb)。）

### iOS 列表左滑显示按钮的交互效果

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bba9357a24f6466d89e6db97210ddecc~tplv-k3u1fbpfcp-zoom-1.image)

上图的效果是截取于 iOS 中短信列表向左滑动显示按钮的交互效果，而且这样的交互效果到目前来说也是一种主流的交互效果。在这要告诉大家的是，我们使用纯 CSS 就能实现该效果。 其中 [@张鑫旭 老师就使用 CSS 滚动捕捉实现微信列表左滑显示按钮的交互效果](https://www.zhangxinxu.com/wordpress/2020/12/css-touch-scroll-show-button/)。这里我们就使用该特性来模拟实现上图的效果。 

```HTML
<div class="container"> 
    <ul class="snap__container--y"> 
        <li class="snap__container"> 
            <div class="media"> 
                <div class="media__object"> 
                    <img src="https://picsum.photos/180/180?random=1" alt="" /> 
                </div> 
                <div class="media__body"> 
                    <div class="media__heading"> 
                        <h4 class="media__title">106575360560</h4> 
                        <time>14:32</time> 
                    </div> 
                    <div class="media__content"> 
                        <p>在赣州过大年，大年三...</p> 
                    </div> 
                </div> 
            </div> 
            <button class="button button__bell"> 
                <svg t="1618147439338" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2522" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"> <path d="M832 720..."></path> </svg> </button> <button class="button button__delete"> <svg t="1618147388483" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1112" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"> <path d="M133.521504 339.666..."></path> </svg> 
            </button> 
            <s class="space"></s> 
         </li> 
     </ul> 
 </div>
 ```
 
 ```CSS
.snap__container--y { 
     height: 100%; 
     overflow-x: hidden; 
     overflow-x: auto; 
     scroll-snap-type: y mandatory; 
     overscroll-behavior-y: contain; 
 } 
 
.snap__container--y li { 
     scroll-snap-align: start; 
 } 
 
.snap__container { 
     overflow-y: hidden; 
     overflow-x: auto; 
     scroll-snap-type: x mandatory; 
     overscroll-behavior-x: contain; 
 } 
 
.snap__container .space { 
     scroll-snap-align: end; 
 } 
 
.snap__container .media { 
    scroll-snap-align: start; 
} 
```

效果如下： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3d9dd0a5cbb485f920e1e2e823a8935~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/OJoqJEq

在这个示例中，我们有两个滚动容器，一个是列表项的容器（`.snap__container--y`），它有一个垂直滚动的效果，另一个是列表项（每个列表项向左滑动），即 `.snap__container`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4df4c943cce4607a44ca88251f5fdb4~tplv-k3u1fbpfcp-zoom-1.image)

在对应的滚动容器上设置相应的 `scroll-snap-type` 的值，并且在滚动项上设置 `scroll-snap-align` 的值，这样就可以得到上面示例的效果。

### 模拟 Instagram Stories 交互效果

> **特别声明，这个示例的效果来自于 @Adam Argyle 的 《****[Building a Stories component](https://web.dev/building-a-stories-component/)****》一文** 。 

具体的效果如下： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c74a8377a2c4b99b78155e444235dd2~tplv-k3u1fbpfcp-zoom-1.image)

上图演示的效果被称为故事组件（Stories），在 Snapchat Stories 和 Instagram Stories 都类似于这样的效果。

对于这样的交互效果有着自己的 UX 术语。 Stories 通常只是一种只用于移动的、以点击为中心的模式，用于浏览多个订阅。比如，在 Instagram 上，用户打开一个朋友的故事（Stories），然后浏览其中的图片，他们一般会同时对很多朋友进行这样的操作。

通过点击设备的右侧，用户就会提前跳转到该朋友的下一个故事。通过向右滑动，用户就会向前跳转到不同的朋友那里。故事组件与幻灯片组件有点类似，但允许浏览一个多维数组，而不是单维数组。就好像每个转盘里面都有一个转盘一样。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa129340d7b940c9bfdd2a2eba8a28ac~tplv-k3u1fbpfcp-zoom-1.image)

刚才提到过，这个 Stories 组件效果其实有两种交互行为：点击设备的右侧 和 向右滑动 。 众所周知， 很难用纯 CSS 来实现点击效果（它没有点击事件），但有了 CSS 滚动捕捉，就可以更好地优化向右滑动的效果。

也就是说，上面视频展示的效果，实现向右滑动时，就有 CSS 滚动捕捉的相关特性。我们来看看怎么实现这样的一个效果。 

```HTML
<div class="stories"> 
    <section class="user"> 
        <article class="story" style="--bg: url(https://picsum.photos/480/841?random=1);"></article> 
        <article class="story" style="--bg: url(https://picsum.photos/480/841?random=2);"></article> 
        <article class="story" style="--bg: url(https://picsum.photos/480/841?random=3);"></article> 
    </section> 
    
    <section class="user"> 
        <article class="story" style="--bg: url(https://picsum.photos/480/841?random=12);"></article> 
        <article class="story" style="--bg: url(https://picsum.photos/480/841?random=22);"></article> 
        <article class="story" style="--bg: url(https://picsum.photos/480/841?random=32);"></article> 
        <article class="story" style="--bg: url(https://picsum.photos/480/841?random=42);"></article> 
    </section> 
    
    <section class="user"> 
        <article class="story" style="--bg: url(https://picsum.photos/480/841?random=6412);"></article> 
    </section> 
    
    <section class="user"> 
        <article class="story" style="--bg: url(https://picsum.photos/480/841?random=412);"></article> 
        <article class="story" style="--bg: url(https://picsum.photos/480/841?random=422);"></article> 
        <article class="story" style="--bg: url(https://picsum.photos/480/841?random=432);"></article> 
        <article class="story" style="--bg: url(https://picsum.photos/480/841?random=442);"></article> 
    </section> 
</div> 
```

用户向右滑动时，会进入不同的朋友故事中。简单地说，`.stories` 是一个水平滚动容器，可以通过 CSS 滚动捕捉特性让水平滚动体验更好：

```CSS
 .stories { 
     width: 100vw; 
     height: 100vh; 
     box-shadow: 0 5px 2.5px hsla(200, 95%, 3%, 0.037), 0 12px 6.5px hsla(200, 95%, 3%, 0.053), 0 22.5px 13px hsla(200, 95%, 3%, 0.065), 0 40.2px 24px hsla(200, 95%, 3%, 0.077), 0 75.2px 44px hsla(200, 95%, 3%, 0.093), 0 180px 80px hsla(200, 95%, 3%, 0.13); 
     display: grid; grid: 1fr / auto-flow 100%; 
     grid-gap: 1ch; gap: 1ch; 
     overflow-x: auto; 
     scroll-snap-type: x mandatory; 
     overscroll-behavior: contain; 
     touch-action: pan-x; 
} 

.user { 
    scroll-snap-align: start; 
    scroll-snap-stop: always; 
    display: grid; 
    grid: [story] 1fr / [story] 1fr; 
 }
```

CSS 滚动捕捉相关的属性主要有： 

```CSS
.stories { 
    overflow-x: auto; 
    scroll-snap-type: x mandatory; 
    overscroll-behavior: contain; 
    touch-action: pan-x; 
} 

.user { 
    scroll-snap-align: start; 
    scroll-snap-stop: always; 
} 
```

这个效果和全屏水平滚动捕捉效果是相似的。对于点击事件，那就需要借助相应的 JavaScript 代码了。最终就可以看到下面这个效果： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5207e7d64ff4400ba0ac6955e42a5555~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/WNgmbev

注意，示例中使用了 CSS 媒体查询相关的特性，你将在不同的终端下看到不同的效果： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27cf0d7a38674ad79a5dc9d0acb3d749~tplv-k3u1fbpfcp-zoom-1.image)

## 小结

这节课主要介绍了 CSS 滚动捕捉这个特性，这个特性其实有一些年头了，到目前为止，该特性已经得到了主流浏览器的支持。在滚动容器和滚动项目中运用滚动捕捉相关的属性，可以帮助我们改善用户的体验。甚至可以实现一些特殊的效果，比如使用 CSS 来模拟一些特殊的效果（`<Carousel>` 组件），甚至可以取替 JavaScript。