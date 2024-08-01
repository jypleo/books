Web 开发者习惯于使用 CSS 的 `border` 属性给元素添加边框效果，包括图片（`img`）元素。在设计软件中（比如 Figma）给对象（图形）添加边框时，它分为**外边框（Outside）** 、**内边框（Inside）** 和**居中边框（Center）** 三种，可是，CSS 中并没有相关属性来定义它们。

如此一来，如果要在 Web 中实现与设计软件中相同的边框效果，就变得很棘手。你可能会问，那么有没有办法可以模拟出呢？答案是肯定的。接下来，我们就来看看如何给元素添加内边框、外边框和中间边框效果。

## 设计软件中的边框类型

就拿 Figma 设计软件为例吧。在 Figma 中，可以给任何图形对象添加边框效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/888bae89bf234678be855c6edf507267~tplv-k3u1fbpfcp-zoom-1.image)

它们（即 Outside、Inside 和 Center）用到一个图形对象上时，效果如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e1f5dbfac914651a43de761d7deaca2~tplv-k3u1fbpfcp-zoom-1.image)

尝试着从 Figma 中导出它们对应的 CSS 代码：

```CSS
.outside {
    width: 400px;
    height: 300px;

    border: 10px solid #000000;
}

.inside {
    box-sizing: border-box;

    width: 400px;
    height: 300px;

    border: 10px solid #000000;
}

.center {
    width: 400px;
    height: 300px;

    border: 10px solid #000000;
}
```

从导出代码来看，它们都设置了 `border: 10px solid #000` ，不同的是 **Inside 多了一个** **`box-sizing: border-box`** 。可在设计软件上看，它们在视觉呈现上还是有很大差异的：

- Outside: 边框向外扩展，盒子变大；
- Inside：边框向内扩展，盒子大小不变；
- Center：边框同时向内外扩展，盒子变大。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e606086b3faa42768f11703b5c7c1f53~tplv-k3u1fbpfcp-zoom-1.image)

将 Figma 中导出来的 CSS 代码运用到 `img` 元素上，你看到的效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c153a9434ed438690403b7f3ffe07cd~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/qBMoXEo

如果 Web 设计师要求精确还原 UI （也就是大家所说的百分之百还原），那么上面 CSS 代码渲染出来的效果是没有达到 Web 设计师期望的，最起码 Center 下的效果没有达到。

## CSS 中的边框（border）

在具体阐述如何精确还原设计软件中的边框效果之前，我们先花一点时间来简单介绍下 CSS 中的边框。

CSS 中，可以使用 `border` 属性给元素设置边框效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b008479a53c747ecbcc6549078c3d178~tplv-k3u1fbpfcp-zoom-1.image)

`border` 是一个简写属性，它可以分为：

- **边框粗细** : `border-width` ；
- **边框样式** ：`border-style` ；
- **边框颜色** ：`border-color` 。

即：

```CSS
.border {
    border: 20px solid #b2d6ff;
    
    /* 等同于 */
    border-width: 20px;    /* 设置边框粗细 */
    border-style: solid;   /* 设置边框样式 */
    border-color: #b2d6ff; /* 设置边框颜色 */
}
```

`border-width` 、`border-style` 、 `border-color` 和它们的简写属性 `border` ，与 CSS 盒模型中的 `margin` 、`padding` 属性相似，也遵循 TRBL 原则：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c59bff51d5f4b31bb7b055d122e958a~tplv-k3u1fbpfcp-zoom-1.image)

- `border-top` 包括 `border-top-width` 、`border-top-style` 和 `border-top-color`； 
- `border-right` 包括 `border-right-width` 、`border-right-style` 和 `border-right-color`； 
- `border-bottom` 包括 `border-bottom-width` 、`border-bottom-style` 和 `border-bottom-color`； 
- `border-left` 包括 `border-left-width` 、`border-left-style` 和 `border-left-color`。 

上面所列的都是物理边框（物理边框属性），它们有对应的逻辑边框（逻辑边框属性）：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2958b68fd510482ca584a468e8266505~tplv-k3u1fbpfcp-zoom-1.image)

`border` 以及它的子属性的使用很简单，只不过 `border-style` 值在不同的浏览器中渲染的边框风格有一定的差异：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51801447eb3943f7b8bc69d7f07e2bd4~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/VwGXrpz

`border` 除了可以用来设置元素的边框风格之外，它还会影响元素尺寸（每个元素都是一个独立的盒子）大小。

> CSS 的 `border-width` 和 `padding` 都会影响一个盒子的尺寸大小。

就拿一个 `div` 元素为例吧：

```HTML
<div class="box">CSS Box</div>
```

假设 `.box` 运用了下面这段 CSS 代码：

```CSS
.box {
    width: 400px;
    aspect-ratio: 4 / 3;
    border: 10px solid;
}
```

浏览器计算出来的盒子尺寸是：

```CSS
计算出来的盒子宽度 = width + border-left-width + border-right-width = 400px + 10px + 10px = 420px
计算出来的盒子高度 = height + border-top-width + border-bottom-width = 300px + 10px + 10px = 320px
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b576ed77d1f487498c76c87cd8e300d~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/abaYEaj

上图展示的是 CSS 中盒子尺寸的计算方式（同样的，`padding` 和 `border` 一样，会影响盒子最终尺寸）。

有意思的是，CSS 的 `box-sizing` 属性可以决定元素盒子尺寸的计算模式：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10ce829079a049558ffb2af856a3ea61~tplv-k3u1fbpfcp-zoom-1.image)

切换下面这个示例中的 `box-sizing` 值，你将会看到 `.box` 盒子尺寸的变化：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25eefa6bd92c4f64828666a5763a0ed8~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/MWqVQEq

如果你仔细观察的话，不难发现，`box-sizing` 取值为 `content-box` （默认值）时，`padding` 和 `border` 向元素盒子外扩展；`box-sizing` 取值为 `border-box` 时，`padding` 和 `border` 向元素盒子内收缩：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ebde5b456b74f958a4f625ed84064d3~tplv-k3u1fbpfcp-zoom-1.image)

## 外边框 vs. 内边框

通过前面内容的介绍，我想你对 CSS 的 `border` 和 `box-sizing` 有了一定的认知。有了这个基础之后，我们就可以来聊元素的外边框和内边框了。

设计软件（比如 Figma）中的外边框（Outside）和内边框（Inside）最大的区别是：**外边框向外扩展，元素总宽度和总高度会因边框的宽度变得更大；内边框向内收缩，元素盒子自身的总宽度和总高度不变，但元素内容的宽度和高度会因边框的宽度变得更小** 。

它们和 CSS 的盒模型尺寸计算很匹配。比如：

```HTML
<div class="box"></div>
<div class="box1"></div>
```

```CSS
.box {
    box-sizing: content-box; /* box-sizing 的默认值 */
    height: 100px;
    width: 100px;
    padding: 10px;
    border: 5px solid #5040b7;
}

.box1 {
    box-sizing: border-box; /* 重置 box-sizing */
    height: 100px;
    width: 100px;
    padding: 10px;
    border: 5px solid #5040b7;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7cb4a4e7d6d402fae5766b71282b9b9~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/yLxjBep

正如你所看到的，元素盒子尺寸的计算和 CSS 的 `box-sizing` 会有直接关系：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58d96bfe84134795aa612947aab6f644~tplv-k3u1fbpfcp-zoom-1.image)

CSS 的 `box-sizing` 可以用来决定元素盒子尺寸（`width` 和 `height`）的计算方式。简单地说，就是我们要以哪里为测量基准来丈量元素盒子的宽高。其主要作用的值有两个：

- **`content-box`** ：是 `box-sizing` 的默认值。元素盒子的 `width` 和 `height` 指的是它内容本身的宽和高，不会包括元素盒子的边框宽度（`border-width`）、内距（`padding`）和外距（`margin`）。注意，边框、内距和外距都在这个元素盒子的外部，向外扩展。
- **`border-box`** ：元素盒子的 `width` 和 `height` 包括了内容本身的宽和高，同时也包括了元素盒子的边框宽度（`border-width`）和内距（`padding`），但它不包括元素盒子的外距（`margin`）。注意，边框和内距都在这个元素盒子的内部，向内收缩。

也就是说，在 CSS 中使用 `border` 给元素盒子添加边框的话，可以直接通过 `box-sizing` 的 `content-box` 和 `border-box` 来匹配设计软件中的外边框和内边框：

- 外边框：需要将 `box-sizing` 属性的值设置为 `content-box`； 
- 内边框：需要将 `box-sizing` 属性的值设置为 `border-box`。 

即：

```CSS
.border--outside {
    border: 10px solid;
}

.border--inside {
    box-sizing: border-box;
    border: 10px solid;
}
```

在 CSS 中，除了 `border` 属性可以给元素盒子添加边框之外，还可以使用 `box-shadow` 和 `outline` 给元素盒子添加一个边框，只不过它们给元素盒子添加的边框只是视觉上的效果，不会参与到元素盒子尺寸的计算中。

先来看 `box-shadow` 和 `outline` 是如何给元素盒子添加一个外边框的：

```CSS
.outside-box-shadow {
    box-shadow: 0 0 0 10px #09f;
}

.outside-outline {
    outline: 10px solid #09f;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bcf9fd40d3da44f995efabc8b2c36966~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/qBMYWVe

要注意的是，`box-shadow` 和 `outline` 都只是在视觉上给元素盒子添加了外边框效果。它们都位于容器的顶部，且不占用任何空间。要是相邻元素较近的话，`box-shadow` 和 `outline` 绘制的边框会遮盖住其他元素。

另外，`box-shadow` 用来模拟边框效果时，不能设置任何模糊值，不然绘制出来的边框不是实边（带有一定模糊效果）。最简单的方式是，只给 `box-shadow` 的扩展模糊参数（`<spread>`）和阴影颜色设置值，其中 `<spread>` 相当于 `border-width` ，阴影颜色相当于 `border-color` 。

`box-shadow` 绘制边框最大的缺陷是无法模拟出 `border-style` （边框风格）。除此之外，如果每边粗细不同时，需要用到多个阴影来完成，会显得繁琐些。

> 注意，`box-shadow` 所涉及的知识较多，这节课不做相关阐述。如果你对 Web 中的阴影知识不太熟悉的话，建议你移步阅读本小册《[Web 中的阴影](https://juejin.cn/book/7199571709102391328/section/7199844993455325216)》。

同样的，`outline` 绘制边框时也是有一定缺陷的，最大缺陷是，个别浏览器中的 `outline` 不会参与圆角的渲染。比如给上面的示例添加一个 `border-radius: 10px` ，你会发现 Safari 浏览器的 `outline` 不会带有圆角效果（至少到写这节课的时候，它还是这样的表现）：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5756535047cd4775ba3bf0d0b9d1ded1~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/vYzjBPy

`box-shadow` 和 `outline` 除了可以模拟盒子外边框之外，同样也可以模拟出内边框。不同的是，`box-shadow` 需要使用内阴影（`inset`），`outline` 需要结合 `outline-offset` 一起使用：

```CSS
.inside-box-shadow {
    box-shadow:inset 0 0 0 10px #09f;
}

.insdie-outline {
    outline: 10px solid #09f;
    outline-offset: -10px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4edd45411d2540168b4c3f21baf6cf16~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/rNZvBEg

不幸运的是，你不能直接给图片（`img`）这样的可替换元素上使用 `box-shadow` 来模拟内边框。从 [Web 中的阴影](https://juejin.cn/book/7199571709102391328/section/7199844993455325216)一节中，我们可以获知，`box-shadow` 的内阴影运用于图片上是会失效的。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/252d75ce5d554b0287364ccfed5a89ef~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/NWLMWWz

如果要避免这个现象，就需要在 `<img>` 外面添加一个容器元素，并且把 `box-shadow` 运用到这个容器元素上：

```HTML
<div class="box">
    <img src="box-thumbnail.jpg" alt="Insdier Border for img" />
</div>
```

```CSS
.box {
    box-shadow:inset 0 0 0 10px #09f;
}

.box img {
    display: block;
    max-width: 100%;
    object-fit: cover;
    object-position: center;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35922ade9e4f4aff8e0d9d4add62a78d~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/VwGxwvP

我想你现在应该知道了，在 CSS 中可以使用 `box-sizing` 、`outline` 和 `box-shadow` 给元素盒子设置内边框：

- `box-sizing` 属性用于限制所添加边框的扩展；
- `outline` 属性与 `outline-offset` 结合使用，用于添加轮廓作为内边框；
- `box-shadow` 属性在 `inset` 帮助下用于指定阴影向内扩展，从而添加硬阴影作为内边框。

相比下来，使用 `border` 和 `box-sizing` 绘制盒子内边框是最简易和灵活的。而且在大多数设计软件中，给图形对象添加边框都是内边框。所以说，我们在编码的时候，可以在 CSS 中将所有元素的 `box-sizing` 定义为 `border-box` ，这样一来，元素添加的边框都相当于是一个内边框：

```CSS
html {
    box-sizing: border-box;
}

*,*::before,*::after {
    box-sizing: inherit;
}
```

这样做的好处是，元素的边框不是内边框时，只需要在相应元素上重置 `box-sizing` 属性的值为 `content-box` 即可。

## 中间边框

中间边框（Center）和外边框（Outside）、内边框（Inside）都有所不同，在 Figma 设计软件中，中间边框的视觉呈现是，它将边框宽度均分成两等份，一半向元素盒子外扩展，一半向元素盒内收缩：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e220d4db169444578d7560f8d2ded3d1~tplv-k3u1fbpfcp-zoom-1.image)

但在 CSS 中，使用 `border` 是无法直接实现中间边框效果的。换句话说，如果你要使用 CSS 来还原一个中间边框效果，则需要将多个 CSS 属性结合起来，比如 ：

- `border` 和 `box-shadow` 的组合；
- `border` 和 `outline` 的组合；
- `box-shadow` 和 `outline` 的组合。

```CSS
.center-border-box-shadow {
    border: 5px solid #5040b7;
    box-shadow: 0 0 0 5px #5040b7;
}

.center-box-shadow-outline {
    box-shadow:inset 0 0 0 5px #5040b7;
    outline: 5px solid #5040b7;
}

.center-border-outline {
    outline: 5px solid #5040b7;;
    border: 5px solid #5040b7;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a64940ccef5d42e2a70967d61ddd4293~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/jOvxOwJ

## 内边框的使用场景

拿用户头像组件（`<UserAvatars>`）为例吧。因为在 Web 中，以一种清晰的方式来呈现用户头像还是具有一定挑战性的。这是**因为有些图像颜色太浅了，因此它可能会与背影颜色融为一体**。比如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8fb20486f554aff8a0401e901f31745~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/qBMYBMm

请注意看，左侧紫色框中第二个头像是如何与白色背景混合的。当我们给元素添加边框时，效果就要好多了。

我们在 Web 开发时，可以提前防止这种情况，并为图像添加一个内边框。不仅如此，我们还可以考虑暗黑模式!

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5917b6c6ae5d420c814d8c376b32b439~tplv-k3u1fbpfcp-zoom-1.image)

前面我们也介绍过，可以使用 `box-shadow` 给元素添加内边框。只不过，它有一个致命的缺陷，无法直接给 `<img>` 元素使用内阴影。庆幸的是，我们除了使用 `border` 和 `box-sizing` 构建内边框之外，我们还可以通过添加 HTML 标签构建内边框。简单地说，我们可以在 `<img>` 元素外添加一个容器元素 `div` ，并对其应用 `box-shadow` 。

```HTML
<div class="avatar">
    <img src="assets/shadeed.jpg" alt="" />
    <div class="avatar--border"></div>
</div>
```

```CSS
.avatar {
    position: relative;
}

.avatar img {
    display: block;
    width: 148px;
    aspect-ratio: 1;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
}

.avatar--border {
    position: absolute;
    inset: 0;
    width: 148px;
    aspect-ratio: 1;
    border: 2px solid #000;
    border-radius: 50%;
    opacity: 0.1;
}
```

就这个示例而言，你也可以使用 CSS 的伪元素 `::before` 或 `::after` 来替代示例中的 `.avatar--border` 元素：

```CSS
.avatar::after {
    content: "";
    position: absolute;
    inset: 0;
    width: 148px;
    aspect-ratio: 1;
    border: 2px solid #000;
    border-radius: 50%;
    opacity: 0.1;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e104e79a23340db843ad000702fc3bd~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/MWqGwaQ

## 小结

虽然这节课的标题定义为“图片的内边框”，但我们从设计软件（比如 Figma 设计软件）为出发点，引出了设计中关于边框设计的三个主要类型，即 **内边框（Inside）** 、**外边框（Outside）** 和 **中间边框（Center）** 。在此基础上，我们一起探讨了 CSS 中实现它们的技术方案。

在 CSS 中，我们可以结合 CSS 的 `border` 、`outline` 和 `box-shadow` 很好地还原出设计软件中的内边框、外边框和中间边框，只不过 `outline` 和 `box-shadow` 在还原这些边框的中会有一定的缺陷存在。而且，在 Web 设计的过程中大多采用的是内在边框，它能给我们带来更好的 UI 美感，也能给用户更好的体验。

作为一名 Web 开发人员，我们在开发 Web 组件时，就要有一定的防御思维，给一些组件添加内边框，比如课程中提到的用户头像组件。

最后，希望这节课的内容能帮助大家更好理解 CSS 的边框，以及在开发 Web 的过程中，给用户提供更美的 UI 效果。