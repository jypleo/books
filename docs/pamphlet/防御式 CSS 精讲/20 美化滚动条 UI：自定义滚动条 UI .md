![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/330c02ac7632458f9c6806c3c4739467~tplv-k3u1fbpfcp-zoom-1.image)

从《[CSS 如何改善滚动体验](https://juejin.cn/book/7199571709102391328/section/7199845609447096358)》这节课中，我们可以获知**容器滚动条的 UI 会因不同系统（或平台）有所差异**。虽然这样的差异，对于用户甚至是部分 Web 开发和设计师来说，都认为是正常的，但对于有追求的 Web 设计师来说，他们更期望自己设计的作品不能因系统有所差异——**追求一致性**。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e1aae7d1c2f44c4afe24393328dc601~tplv-k3u1fbpfcp-zoom-1.image)

这种自定义滚动条可以使用 Web 应用程序或页面的 UI 在多个操作系统达到极度一致的效果。除此之外，Web 开发者不需像以往一样依赖任何 JavaScript 库，仅使用 CSS 就可以还原设计师提供的滚动条 UI。因此，自定义滚动条现在越来越受欢迎。

在接下来的课程中，我们就来讲讲 ，CSS 新旧语法是如何实现自定义滚动条的。

## 简介

要自定义滚动条，就需要先了解其结构：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3585b7d594334b8f91e625ea57cdfd84~tplv-k3u1fbpfcp-zoom-1.image)

这是滚动条最简单的组成部分:

- **滚动轨道（Scrollbar Track）** ：滚动轨道是滚动条的底部；
- **滚动滑块（Scrollbar Thumb）** ：滚动滑块是用户点击或拖动滚动的对象。

在 CSS 中对应着七个伪元素，可用来设置滚动条 UI 样式：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d40ddaa7a92341f08cb0074b909a3937~tplv-k3u1fbpfcp-zoom-1.image)

- `::-webkit-scrollbar` ：整个滚动条；
- `::-webkit-scrollbar-button` ：滚动条上的按钮（上下箭头）；
- `::-webkit-scrollbar-thumb` ：滚动条上的滚动滑块；
- `::-webkit-scrollbar-track` ：滚动条轨道；
- `::-webkit-scrollbar-track-piece` ：滚动条没有滑块的轨道部分；
- `::-webkit-scrollbar-corner` ：垂直滚动条和水平滚动条交汇的部分，通常是浏览器窗口的右下角；
- `::-webkit-resize` ：出现在某些元素底角的可拖动调整大小的滑块。

这些伪类选择器允许你做一些更具体的选择，比如当滚动条处于不同状态：

```CSS
:horizontal
:vertical
:decrement
:increment
:start
:end 
:double-button
:single-button
:no-button
:corner-present
:window-inactive
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a17eb8e74464c77a937d85156417e11~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：http://trac.webkit.org/export/41842/trunk/LayoutTests/scrollbars/overflow-scrollbar-combinations.html （你可能觉得很丑，这是有历史原因的，@Dave Hyatt 是在 2009 年的时候写的 Demo，如果你感兴趣的话，可以阅读 @Dave Hyatt 的《[Styling Scrollbars](https://www.webkit.org/blog/363/styling-scrollbars/)》）。

还有一点大家需要注意，滚动条可以是水平向的，也可以是垂直方向的，还可以同时两个方向都有滚动条，这主要取决于设计：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a0e493a88d63435ab0a422b63dab523b~tplv-k3u1fbpfcp-zoom-1.image)

当两个方向都有滚动条时，用户可以在垂直方向或水平方向滚动：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f047068760fe43659cd784be0b25c582~tplv-k3u1fbpfcp-zoom-1.image)

此外，[在开发一个从左到右(LTR)和从右到左(RTL)方向工作的多语言 Web 应用时](https://juejin.cn/book/7161370789680250917/section/7161625525763440647)，滚动条的位置也将会发生相应的变化：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a6c1463a1b94e70b259c9bedb52e5ec~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/eYLQedR

## 滚动条和布局

在 CSS 中，容器元素上指定 `overflow` 的值为 `scroll` 或 `auto` 时，该容器元素就是一个滚动容器了，滚动容器的右侧或底部（`ltr` 书写模式下）会（或可能）出现滚动条。

滚动条会占用一定的预留空间，预留空间位于边框盒子（`<border-box>`）内边缘和内距盒子（`<padding-box>`）外边缘之间。然而，为了背景定位区域和背景绘制区域的目的，这个保留空间被认为是内距盒子的一部分。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6286fa90456f4d77ba0074f203e2824d~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/LYJMNwO

上面示例中，`<aside>` 元素绝对位置和背景图片都被定位到容器的右上角。

> 注意，背景图片的起点位置（`background-origin`） 默认值是 `padding-box`，从边框盒子（`<border-box>`）内边缘开始（内距盒子 `<padding-box>` 外边缘开始）！ 

如果 `<article>`上没有滚动条，它们（定位元素和背景图）都会在容器右上角的内距外边缘重合（示例左侧所示）；如果有滚动条，那么 `<aside>` 右侧与滚动条左侧边缘相稳合，而背景图片内位于滚动条底部（背景图右侧与内距盒子外边缘相稳合）：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6aa734f98c064824b4fba9f92c6d4b7f~tplv-k3u1fbpfcp-zoom-1.image)

也就是说，滚动容器的滚动条会占用内距盒子（`padding-box`）的空间，如果是经典型滚动条而不是覆盖型滚动条，就会争夺空间。即 **滚动条预留空间会影响 CSS 盒模型尺寸的计算** ：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cba72477044247168cdf6d4038d56eb3~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/poOqbLN

正因为滚动条的存在可能影响盒子尺寸的情况，所以 UA 必须从假设不需要滚动条开始，如果发现需要滚动条，则重新计算盒子尺寸。 

从《[CSS 如何改善滚动体验](https://juejin.cn/book/7199571709102391328/section/7199845609447096358)》中可以知道，CSS 的 `scrollbar-gutter` 属性设置为 `stable` 可以为滚动条预留空间：

```CSS
.element { 
    scrollbar-gutter: stable; 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a18f8ab895be47fea52e8da18303c802~tplv-k3u1fbpfcp-zoom-1.image)

## 自定义滚动条

W3C 的  [CSS Scrollbars Styling Module Level 1 规范](https://www.w3.org/TR/css-scrollbars-1/)提供的 `scrollbar-color` 和 `scrollbar-width` 两个属性可以直接用来设置滚动条样式，只不过到目前为止，这两个属性仅得到了 Firefox 浏览器的支持。换句话说，现在要自定义滚动条的 UI ，还是需要使用旧的语法，即：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e59012b791414af4a399b663c2c83af7~tplv-k3u1fbpfcp-zoom-1.image)

不过，我们常用的是 `::-webkit-scrollbar` 、`::-webkit-scrollbar-track` 和 `::-webkit-scrollbar-thumb` 三个伪元素。

> 注意， `::-webkit-scrollbar` 以及 `::-webkit-scrollbar-*` 等伪元素，仅在基于 [Blink](https://www.chromium.org/blink) 或 [WebKit](https://webkit.org/) 的浏览器（例如，Chrome、Edge、Opera、Safari、iOS 上所有的浏览器，以及[其他基于 WebKit 的浏览器](https://zh.wikipedia.org/wiki/网页浏览器列表#基於WebKit排版引擎)）上可用。

我们通过一个简单的示例，向大家介绍如何使用这三个伪元素来自定义滚动条 UI。

```HTML
<section class="scrollbar--horizontal">
    <h3>水平滚动条</h3>
</sction>
<section class="scrollbar--vertical">
    <h3>垂直滚动条</h3>
</section>
```

基础 CSS 样式规则：

```CSS
.scrollbar--horizontal{
    max-width: 480px;
    overflow-x: auto;
}

.scrollbar--vertical {
    max-height: 380px;
    overflow-y: auto;
}
```

### 定义滚动条尺寸大小

首先，我们可以使用 `::-webkit-scrollbar` 来定义滚动条的大小：

- 水平滚动条则是高度 `height` ；
- 垂直滚动条则是宽度 `width` 。

```CSS
.scrollbar--horizontal::-webkit-scrollbar {
    height: 20px;
}
.scrollbar--vertical::-webkit-scrollbar {
    width: 20px;
}
```

![ch1-fig-36 (1).jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8250607f70494640ae78f6f383c9cf69~tplv-k3u1fbpfcp-watermark.image?)

其实除了 `width` 和 `height` 属性之外，其他可用来定义 UI 效果的 CSS 属性都可以用在 `::-webkit-scrollbar` ，比如 `background` 、`border` 、`box-shadow` 、`border-radius` 等：

```CSS
.scrollbar--horizontal::-webkit-scrollbar {
    height: 20px;
    background: linear-gradient(to right, #09f, #f90);
    border-radius: 99rem;
    box-shadow: inset 0 0 1px 1px rgb(0 0 0 / .35);
    border: 2px solid rgb(255 255 255 / .5);
}
.scrollbar--vertical::-webkit-scrollbar {
    width: 20px;
    background: radial-gradient(circle at top left, #9c27b0, #ff9800);
    border-radius: 99rem;
    box-shadow: inset 0 0 1px 1px rgb(0 0 0 / .35);
    border: 2px solid rgb(255 255 255 / .5);
}
```

![ch1-fig-36.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d17bd59c2dd466a825156b12ba14081~tplv-k3u1fbpfcp-watermark.image?)

> Demo 地址：https://codepen.io/airen/full/KKxbgoo

不过一般不这么做，因为你可以在滚动轨道上做这些事情。换句话说，只在 `::-webkit-scrollbar` 上定义滚动条的尺寸，仅设置 `width` 或 `height` 。

### 定义滚动轨道的样式

接着可以使用 `::-webkit-scrollbar-track` 伪元素定义滚动条轨道样式，即滚动条的底部样式风格。你可以给滚动条轨道添加背景颜色（包括渐变）、阴影（`box-shadow`）、圆角（`border-radius` ）和边框（`border`）等：

```CSS
.scrollbar--horizontal::-webkit-scrollbar-track {
    background: linear-gradient(135deg, #390eaf, #f36, #09f);
    border-radius: 99rem;
    border: 4px solid rgb(255 255 255 / .5);
    box-shadow: inset 0 0 0 2px rgb(0 0 0 / .35);
}

.scrollbar--vertical::-webkit-scrollbar-track {
    background: linear-gradient(-135deg, #390eaf, #f36, #09f);
    border-radius: 99rem;
    border: 4px solid rgb(255 255 255 / .5);
    box-shadow: inset 0 0 0 2px rgb(0 0 0 / .35);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/401566b305e34b979a2a5181439a8060~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/wvERogX

### 定义滚动滑块的样式

最后，使用 `::-webkit-scrollbar-thumb` 来定义滚动条滑块样式。

```CSS
.scrollbar--horizontal::-webkit-scrollbar-thumb {
    background: rgb(0 0 0 / .65);
    border-radius: 999rem;
    backdrop-filter: blur(10px);
    mix-blend-mode: luminosity;
}

.scrollbar--vertical::-webkit-scrollbar-thumb {
    background: rgb(0 0 0 / .65);
    border-radius: 999rem;
    backdrop-filter: blur(10px);
    mix-blend-mode: luminosity;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8d0ebf578e54515b32362007a9c2422~tplv-k3u1fbpfcp-zoom-1.image)

 

> Demo 地址：https://codepen.io/airen/full/OJorbZo

在此基础上，你可以发挥你的想象，给滚动条创建不同的 UI 效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4b6100642d64dda816997569ab3bdee~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/xxamgpW

## 指定自定义滚动条的范围

你可能已经发现了，上面的滚动条都分别用于 `.scrollbar--horizontal` 和 `.scrollbar--vertical` 两个元素上。可 Web 页面上很有可能不仅仅这两个元素是滚动容器，那么你就需要继续在别的滚动容器上重复自定义滚动条样式的定义。

换句话说，你期望的是有一个全局的方式，能让同一个 Web 应用中拥有统一的自定义滚动条样式，而且不用在每个滚动元素上重复定义。

你所期望的开发模式，在使用伪元素自定义滚动条样式时能很容易做到。只需要在 `::-webkit-scrollbar` 、`::-webkit-scroll-track` 和 `::-webkit-scrollbar-thumb` 伪元素前不指定任何选择器，就可以达到你所期望的：

```CSS
::-webkit-scrollbar {
    width: 12px; /* 指定垂直滚动条尺寸 */
    height: 12px; /* 指定水平滚动条尺寸 */
}

::-webkit-scrollbar-track {
    background-color: rgb(0 0 0 / .5);
    border-radius: 12px;
    box-shadow: 0 0 0 2px rgb(155 55 55 / .25);
}

::-webkit-scrollbar-thumb {
   background-image: radial-gradient(circle at top left, #9c27b0, #ff9800);
    border-radius: 12px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ca96fb837394651abf1a78f00928083~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/rNZojVW

## 自定义滚动条新语法

自定义滚动条新语法指的是W3C 的  [CSS Scrollbars Styling Module Level 1 规范](https://www.w3.org/TR/css-scrollbars-1/)提供的 `scrollbar-color` 和 `scrollbar-width` 两个属性：

- `scrollbar-color` 属性是用来定义滚动条颜色，它可以同时接受两个颜色值，第一个颜色值是用来定义滚动滑块的颜色，第二个颜色值是用来定义滚动轨道的颜色；
- `scrollbar-width` 属性是用来定义滚动条尺寸大小的，它可以接受 `none` 、`auto` 和 `thin` 三个值，其中 `auto` 是默认值，滚动条的尺寸和系统的一致；`thin` 与 `auto` 相比较，它比系统提供的滚动条更细瘦一点；`none` 则表示不显示滚动条，但是该元素依然可以滚动：

```CSS
.custom--scrollbar {
    scrollbar-color: red blue;
    scrollbar-width: thin;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/280c83c3da8840a1afe015a660dd4bb3~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/ExeGvje （请使用 Firefox 浏览器查看 Demo）。

尽管 `scrollbar-width` 和 `scrollbar-color` 两个属性的使用很简单，但它们的局限性也很大：

- `scrollbar-width` 不能像 `::-webkit-scrollbar` 中的 `width` （或 `height`）指定具体的数值，比如 `10px` ；
- `scrollbar-color` 只能使用纯色，也不能添加阴影、渐变、圆角之类。

相比之下，还是老语法能帮助你定制出更好看的滚动条 UI 效果。

虽然 `scrollbar-width` 和 `scroll-color` 仅在 Firefox 浏览器下有效，而且局限性较大，但我们可以将新旧语法结合起来给滚动条定制 UI 效果，甚至还可以和 CSS 自定义属性结合起来：

```CSS
:root {
    --scrollbar-size: 10px;
    --scrollbar-foreground: #d4aa70; 
    --scrollbar-background: #e4e4e4;
}

::-webkit-scrolbar {
    width: var(--scrollbar-size);
    height: var(--scrollbar-size);
}

::-webkit-scrollbar-track {
    background-color: var(--scrollbar-background);
}

::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-foreground);
}

.scrollbars--custom {
    scrollbar-color: var(--scrollbar-foreground) var(--scrollbar-background);
}
```

## 小结

虽然 CSS 的 `scrollbar-color` 和 `scrollbar-width` 可以用来定制滚动条 UI ，但它们的局限性太大，无法达到旧语法 `::-webkit-scrollbar` 、`::-webkit-scrollbar-track` 和 `::-webkit-scrollbar-thumb` 定制的滚动条 UI 。

如果你希望更灵活，更好的控制滚动条 UI，还是使用旧语法更好。在旧语法中，你可以使用 CSS 的其他属性，比如 `border` 、`border-radius` 、`box-shadow` 和渐变等，允许你定制出更符合需求的滚动条。