`position` 是 CSS 中一个很重要的属性，它在 Web 布局中也发挥着不可替代的作用。`position` 属性可以更改元素在文档正常流中的行为方式，以及它与其他元素的关系。简单地说，它可以**让元素脱离正常文档流，并使它具有不同的行为** ，例如放在另一个元素的上面，或者始终保持在浏览器视窗内的同一位置。

可用于 `position` 属性的值主要有 `static` 、`relative` 、`absolute` 、`fixed` 和 `sticky` 。其中 `sticky` 是近几年新增的值，它能很好地帮助 Web 开发者实现一些特殊的布局效果，比如粘性导航（Sticky Navigation）、粘性侧边栏（Sticky Sidebar）、滚动索引（Scrolling Index）等。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af7ccf8d847441b2816d5157e7d5d8ef~tplv-k3u1fbpfcp-zoom-1.image)

上图就是一个粘性导航的效果。以往要实现上图这样的布局效果，仅使用 CSS 是无法实现的，必须依赖一定的 JavaScript 脚本才能实现。如今，你只需要使用 `position` 的 `sticky` 就可以实现：

```CSS
.navigation {
    position: sticky;
    top: 0;
    z-index: 9999;
}
```

只是，在使用 `position:sticky` 时会在某些条件下失去作用，令很多 Web 开者感到困惑，甚至是不知道为什么失效了，又应该如何来修复和避免它失效。那么，这节课，我们就来一起探讨 `position:sticky` 在什么样的条件下才会失效，如果失效了又应该如何去修复。

## CSS position 的基础知识

简单地说，CSS 的 `position` 属性用于指定一个元素在文档中的定位方式，根据不同值的类型，设置了 `position` 属性的元素可以被称作：

- **定位元素** ：计算后位置 `position` 属性为 `relative` 、`absolute` 、`fixed` 或 `sticky` 的一个元素；
- **相对定位元素** ：计算后位置 `position` 属性为 `relative` 的元素；
- **绝对定位元素** ：计算后位置 `position` 属性为 `absolute` 或 `fixed` 的元素；
- **粘性定位元素** ：计算后位置 `position` 属性为 `sticky` 的元素。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e6a536033ab43e3b11f7357312bf5d0~tplv-k3u1fbpfcp-zoom-1.image)

CSS 中还可以通过 `top` （`inset-block-start`） 、`right` （`inset-inline-end`）、`bottom` （`inset-block-end`）和 `left` （`inset-inline-start`）给定位元素设置位置。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/431a2d37f1d34a0893c40a27ae2e9828~tplv-k3u1fbpfcp-zoom-1.image)

其中：

- `top` 、`right` 、`bottom` 和 `left` 属于 CSS 的物理属性；
- `inset-block-start` 、`inset-inline-end` 、`inset-block-end` 和 `inset-inline-start` 属于 CSS 的逻辑属性。其中 `inset-block-start` 和 `inset-block-end` 还可以简写为 `inset-block` ；`inset-inline-start` 和 `inset-inline-end` 可以简写为 `inset-inline`。

除此之外，还可以使用 `inset` 属性来设置定位元素的位置：

```CSS
.element {
    position: absolute;
    
    inset: 0;                   /* 等同于 top: 0; right: 0; bottom: 0; left: 0; */
    
    inset: 1rem 2rem;           /* 等同于 top: 1rem; right: 2rem; bottom: 1rem; left: 2rem; */
    
    inset: 1rem 2rem 3rem;      /* 等同于 top: 1rem; right: 2rem; bottom: 3rem; left: 2rem;` */
  
    inset: 1rem 2rem 3rem 4rem; /* 等同于 top: 1rem; right: 2rem; bottom: 3rem; left: 4rem;`*/ 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87784637c0384e409e1dfcf5db964dda~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/GRXrobo

虽然 `inset` 看上去和 `inset-*` 等逻辑属性很相似，但 CSS 的 `inset` 并没有定义块轴和内联轴方向的偏移量，相反，它定义的是物理方向的偏移量。换句话说，**`inset`** **是一个物理属性，它不会考虑元素的写入模式、方向和文本方向** 。它其实就是 `top` 、`right` 、`bottom` 和 `left` 等属性的一个简写属性，而且使用方式和 `padding` 、`margin` 、`border` 等简写属性一样，遵循 CSS TRBL 原则：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a218b3d144d1444ba2b6cd435c70e2ab~tplv-k3u1fbpfcp-zoom-1.image)

现在，你已经知道了 `position` 属性可以设置 `static` 、`relative` 、`absolute` 、`fixed` 和 `sticky` 等五个值。使用它们并不难，可它们之间还是有一定的差异，大家想必也想知道它们之间的差异是什么，下面我将使用几张图来简单阐述一下它们之间的差异。

### 静态定位

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84659bef798a4ff28895866c25703b2d~tplv-k3u1fbpfcp-zoom-1.image)

`static` 是 `position` 的默认属性。也就是说，元素默认就是静态定位，意味着“将元素放入它在文档布局流中的正常位置（不会脱离文档流）”。此时，元素即使设置 `top` 、`right` 、`bottom` 和 `left` 等属性的值，也不会有任何偏移。如果你想重置一个定位元素的话，就需要将 `position` 显式设置为 `static` ：

```CSS
.static {
    position: static; 
}
```

### 相对定位

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e0215cd8da942afbfb4c2e1942daddd~tplv-k3u1fbpfcp-zoom-1.image)

相对定位（`relative`）和静态定位（`static`）非常相似，在正常的文档流中占据着相应的位置。不同的是，相对定位开始有了图层的概念。在视觉上会看到相对定位元素跑到你设定的位置（通过 `top` 、`right` 、`bottom` 和 `left` 等属性设置的偏移量），但实际上，它在正常文档流的位置还是保持不变。

简单地说，相对定位它会与页面上其他元素重叠，但不会影响其他元素在文档流中的位置。另外，**相对定位是相对于元素自身进行偏移** 。

> 注意，`relative` （相对定位元素）要是没有设置任何偏移量，在视觉上的表现和 `static` （静态元素）是一样的。另外，它对 `table-*-group` 、`table-row` 、`table-column` 、`table-cell` 、`table-caption` 等元素无效。

### 绝对定位

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/429b6accccf94864a49bc70497a39984~tplv-k3u1fbpfcp-zoom-1.image)

绝对定位（`absolute`）会让元素脱离文档流，不会再为绝对定位元素预留空间，它有自己单独的一层，而且独立于一切。这在布局中是非常有用的，绝对定位元素相当于具备了一个隔离层 UI，它不会干扰页面上其他元素的位置。

可以像相对定位元素一样，在绝对定位元素上使用 `top`、`right` 、`bottom` 和 `left` 等属性设置它的偏移量；与相对定位元素不一样的是，绝对定位元素是相对于离自己最近的非 `static` 定位祖先元素的偏移，来确定元素位置。如果没有这样的一个元素（非 `static` 定位元素），那么绝对定位元素会相对于 `body` 元素进行偏移。

有意思的是，你可以在一个绝对定位元素上同时设置 `top` 、`right` 、`bottom` 和 `left` 的值来控制其尺寸，例如：

```HTML
<div class="container">
    <div class="box"></div>
</div>
```

```CSS
.container {
    width: 50vw;
    height: 50vh;
    position: relative;
}

.box {
    position: absolute;
    top: 1rem;
    right: 1rem;
    bottom: 1rem;
    left: 1rem;
    
    /* 相当于 */
    width: calc(100% - 2rem);
    height: calc(100% - 2rem);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/479b7a5f22ef4c4781ba17d9398f9611~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/GRXrqxX

另外，绝对定位的元素可以设置外边距（`margin`），且不会与其他 `margin` 合并。如果绝对定位元素显式设置了宽高（`width` 和 `height`），那么 `margin: auto` 配合 `inset:0` 可以实现水平垂直居中的效果：

```CSS
.container {
    position: relative;
}

.box {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 20cqw;
    aspect-ratio: 4 / 3;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0bbee025acc740db88969051eb18928e~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/poORbMy

### 固定定位

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/543311f166384d63a6e201501093d27a~tplv-k3u1fbpfcp-zoom-1.image)

固定定位（`fixed`）与绝对定位的工作方式完全相同，只有一个主要区别：绝对定位元素相对于其位置最近的非 `static` 定位祖先元素定位。而固定定位元素则是相对于浏览器视口本身定位，即使是屏幕在滚动时，也不会改变固定定位元素的位置。它可以在布局中实现一些特殊效果，比如，固定在浏览器视窗顶部的页头。

> 注意，如果固定定位元素的祖先元素上的 `transform`、`perspective`、`filter` 或 `backdrop-filter` 属性设置的值是非 `none` 时，那么固定定位元素的位置偏移计算不再相对浏览器视窗，而改变该祖先元素。

### 粘性定位

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb4b987bcefd48e7bd52f7aba5e8c193~tplv-k3u1fbpfcp-zoom-1.image)

粘性定位（`sticky`）基本上是相对定位（`relative`）和固定定位（`fixed`）的混合体，它允许被定位的元素表现得像相对定位一样，直到它滚动到某个阈值点为止，此后它表现得就像是固定定位一样。例如：

```CSS
.submenu {
    position: sticky; 
    top: 0; 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50e1a0f91f6f4b85883d5baec5a46f9f~tplv-k3u1fbpfcp-zoom-1.image)

浏览器还未滚动时，粘性定位元素（`.submenu`）距离浏览器视窗顶部边缘大于 `0px` ，它表现得像相对定位；当浏览器向下滚动，并且滚动到某个阈值（比如，粘性定位元素距离浏览器视窗顶部边缘距离是 `0`）时，它表现得像固定定位。

上面所介绍的就是 CSS 的 `position` 属性的基础知识，它的每个值的表现如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e132a2f741a54452a975e211a72a1c37~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/poORGYx

## 粘性定位如何真正起作用的？

对于大部分 Web 开发者来说，都会认为只要在元素上显式设置了 `position` 的值为 `sticky` ，并且指定一个阈值，那么该元素就会是一个粘性定位元素。即粘性定位元素将会吸附在浏览器视窗指定位置。

```HTML
<body>
    <header>Header Content</header>
    <div class="sticky">Sticky Element</div>
    <main>Main Content</main>
</body>
```

```CSS
.sticky {
    position: sticky;
    top: 0;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9505d5c791104617922773ab7226cf5e~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/eYLgqvv

问题是，有时候这个代码能正常工作，有时候又不能正常工作。比如，我们在上面示例的 `div.sticky` 外面添加一个 `div.container` 容器：

```HTML
<body>
    <header>Header Content</header>
    <div class="container">
        <div class="sticky">Sticky Element</div>
    </div>
    <main>Main Content</main>
</body>
```

CSS 代码不变。你会发现，`position: sticky` 就不能正常工作：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/189235ccafd44276957c69a077c5eb14~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/RwYKXZv

但是当 `.container` 有其他内容（有足够多的内容），会触发页面滚动，你又会发现粘性定位元素只在该容器（`.container`）可滚动范围内有效：

```HTML
<body>
    <header>Header Content</header>
    <div class="container">
        <div class="sticky">Sticky Element</div>
        <div class="box">Box Content</div>
    </div>
    <main>Main Content</main>
</body>
```

```CSS
.sticky {
    position: sticky;
    top: 0;
}

.box {
    min-height: 100vh;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/259b5dfe59bd4fde99fc91e3b8475122~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/gOdmYOa

这是为什么呢？

因为每当一个元素是一个**粘性定位元素**时，粘性定位元素的容器是唯一可以粘附的区域。简单地说，粘性定位主要有两个部分组成：

- **粘附项目**：就是粘性定位元素，即设置了 `position: sticky` 的元素。当浏览器视窗位置与定义的位置相匹配时，比如 `top: 0` ，此时，粘附项目就会脱离文档流，会被放置在一个单独的层中。
- **粘附容器**：即粘性定位元素的容器。这是粘附项目脱离文档流之后可浮动的最大范围区域。

**当****你****定义了带有** **`position: sticky`** **的元素时，将自动定义其父元素为粘附容器**！这一点需要记住，非常重要！粘附容器是粘附项目的范围，粘附项目不能脱离其对应粘附容器的范围。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9bc948fb2944f6b9daca25cfdd576d9~tplv-k3u1fbpfcp-zoom-1.image)

## Sticky 失效与修复

我们花了较大的篇幅阐述了 CSS 的 `position` 的基础以及 `position: sticky` 的工作原理。现在我们回到这节课的真正主题上来，即元素显式设置 `position: sticky` 时为何不能正常工作，以及又应该如何修复，使其能真正的工作。

我们在使用 `position: sticky` 时，如果碰到下面这几种情形，那么 `sticky` 将会失效：

- 粘性定位元素（即显式设置 `position: sticky` 元素）的父元素（只要是它的祖先元素）显式设置了 `overflow` 属性的值为 `hidden` 、`scroll` 或 `auto`； 
- 粘性定位元素没有指定一个阈值；
- 粘附容器（即粘性定位元素的父元素）的高度（`height`）或其高度的计算值和粘性定位元素高度一样。

先来看第一种情形。

[MDN ](https://developer.mozilla.org/en-US/docs/Web/CSS/position)上介绍 `sticky` 时，有这样一句话：

> Note that a sticky element "sticks" to its nearest ancestor that has a "scrolling mechanism" (created when `overflow` is `hidden`, `scroll`, `auto`, or `overlay`), even if that ancestor isn't the nearest actually scrolling ancestor.

大致的意思是说，一个粘性定位元素会“固定”在离它最近的一个拥有“滚动机制”的祖先上（当该祖先的 `overflow` 是 `hidden`、`scroll`、`auto` 或 `overlay` 时），即便这个祖先不是最近的真实可滚动祖先。这有效地抑制了任何 “sticky” 行为（详情见 [Github issue on W3C CSSWG](https://github.com/w3c/csswg-drafts/issues/865)）。

在构建 Web 布局时，难免会使用到 `overflow` ，并且它的值可能是 `hidden` 、`scroll` 、`auto` 或 `overlay` 中的一个。比如，我们在 `body` 元素上设置了一个 `overflow-x` 的值为 `hidden` ，此时，`body` 后代设置 `position: sticky` 的元素将会失效。

比如下面这个简单的示例：

```HTML
<body>
    <div class="container">
        <section>01</section>
        <section>02</section>
        <!-- 省去其他 section -->
    </div>
</body>
```

```CSS
.container {
    overflow-x: hidden;
}

section {
    position: sticky;
    top: 0;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af5b8a182fb143528839d5c8a2cfaef3~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/yLxMpqg

正如上面示例所示，在实际开发业务的过程中，如果你避不开要使用 `overflow` 的 `hidden` 值时，又不希望让其后代粘性定位元素失效时，我们可以使用 `clip` 来替代 `hidden` 。

`clip` 是 `overflow` 新增的一个属性值，它在视觉上的表现形式和 `hidden` 是相同的。都会对溢出的内容进行剪切，但它们之间有着本质的区别：

- `overflow` 取 `hidden` 值时，容器是一个滚动容器，但取 `clip` 值时，容器不是一个滚动容器；
- `overflow` 取 `hidden` 值时，可以使用 `Element.scrollTop` 进行滚动，但取 `clip` 值不行；
- `overflow` 取 `hidden` 值时，会创建一个新的格式化上下文，但取 `clip` 值不会。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73c0ab85e3d24e1cafcf15d825a9eabb~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/GRXWQRR

点击示例中改变滚动容器的 `scrollTop` 的值，你会发现设置 `overflow:hidden` 的容器滚动到了底部，而设置了`overflow: clip` 的容器没有任何效果。

也就是说，上面这个示例，我们可以修改成这样：

```CSS
.container {
    overflow-x: clip;
}

section {
    position: sticky;
    top: 0;
}
```

如此一来，既达到了裁剪内容的效果，又达到了粘性定位的效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/037acba83d354b8cb8750c60f8cf0829~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/XWPMZbq

但碰到 `overflow` 取值为 `auto` 或 `scroll` 时，还希望让粘性定位生效，那使用 `clip` 就行不通了。因此，我们需要采用另一种解决方案：“在溢出容器上设置一个高度（`height`）”。

```CSS
.container {
    height: 100vh;
    overflow-x: hidden;
}

section {
    position: sticky;
    top: 0;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0742ad3388b642be85af96bd80ccb2a0~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/MWqpQbQ

正如你所看到的，我们可以使用上面示例的方法，制作出一些简单的视差滚动的布局效果。甚至是一些更复杂的布局效果。比如 [@Dannie Vinther 在 Codepen 上写的一个日历的效果](https://codepen.io/dannievinther/full/pGdjPV)：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1cb8d6b61014403924f046e06d72b82~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/MWqpQoV （详细制作过程请阅读 @Dannie Vinther 的教程《[Position: stuck; — and a way to fix it](https://uxdesign.cc/position-stuck-96c9f55d9526)》）

接着我们再来看第二种让粘性定位失效的场景：**没有给粘性定位元素设置一个阈值**，即粘性定位元素上没有设置任何的偏移量：

```CSS
header {
    position: sticky;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cebd6f219e00447b9374043e21340c6a~tplv-k3u1fbpfcp-zoom-1.image)

你也看到了，虽然我们在 `header` 上显式设置了 `position: sticky` ，但并没有在该元素上显式设置 `top` 、`right` 、`bottom` 、`left` 或 `inset` 属性中的任何一个值。这是因为，只有设置了这个阈值，才能使粘性定位元素在超过指定阈值时充当固定定位，否则将会充当相对定位。

因此，大家在使用 `position: sticky` 时，至少要设置 `top` 、`right` 、`bottom` 、`left` 中的一个属性值。比如：

```CSS
header {
    position: sticky;
    top: 0;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8ae29c079504722a809b00d6357960e~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/abaJqVX

设置 `top` 、`bottom` 、`right` 和 `left` 时，有一个小细节，大家需要注意，如果是垂直滚动时，设置 `top` （吸顶）或 `bottom` （吸底）；如果是水平滚动，设置 `left` 或 `right` 。

第三种致使粘性定位失效的原因是**粘附容器（粘性定位元素的父容器）高度没有大于粘附项目（粘性定位元素）的高度**。这种现象在 CSS Flexbox 和 CSS Grid 布局中非常常见。比如，我们要制作一个侧边栏吸附的效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/218bba5a75af4f92bb21a271358667cf~tplv-k3u1fbpfcp-zoom-1.image)

熟悉 [CSS Flexbox 或 CSS Grid 布局](https://s.juejin.cn/ds/Sj4YvCG/)的同学构建上图这样的布局都能轻而易举。比如，使用 CSS Flexbox 布局，它所需的 HTML 结构会像下面这样：

```HTML
<body>
    <header>Header</header>
    <section class="container">
        <main>Main</main>
        <aside>Sidebar</aside>
    </section>
    <footer>Footer</footer>
</body>
```

```CSS
body {
    display: grid;
    gap: 1rem;
    grid-template-rows: min-content minmax(0, 1fr) min-content;
}

.container {
    display: flex;
    gap: 1.5rem;
}

main {
    flex: 1 1 0%
}

aside {
    max-width: 320px;
    position: sticky;
    top: 160px;
}
```

你会发现，即将 `aside` 定义为粘性定位，但它却没有生效：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca4563bc66054a0d87b147e5c633fd8e~tplv-k3u1fbpfcp-zoom-1.image)

由于 `main` 和 `aside` 都是 Flex 项目，默认情况下，Flex 容器的 `algin-items` 的默认值是 `stretch` ，它们拉伸 Flex 项目，使 `main` 和 `aside` 等高，并且也和其容器 `.container` （Flex 容器）高度相等：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8b84adb8bbe47e487b94bb84fab7eb2~tplv-k3u1fbpfcp-zoom-1.image)

这也是造成粘性定位失效的根本原因：**粘附容器** **`.container`****（它也是 Flex 容器）高度和粘附项目** **`aside`****（它也是 Flex 项目）高度相等**。要改变这种现象，我们可以重置 Flex 容器的 `align-items` 属性的初始值：

```CSS
.container {
    display: flex;
    align-items: flex-start;
}

aside {
    position: sticky;
    top: 160px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23ff8e67482c490fa4ba65cb63ae4e07~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/abaJqee

当然，你也可以不重置 Flex 容器的 `align-items` 属性的默认值，你可以将 `aside` 的 `align-self` 设置 `flex-start`， 或 `margin-bottom` 设置为 `auto` 。它们都能让粘性项目 `aside` 和粘附容器 `.container` 不等高：

```CSS
.container {
    display: flex;
} 

aside {
    position: sticky;
    top: 160px;
    
    align-self: flex-start; 
}

/* 或者 */
aside {
    position: sticky;
    top: 160px;
    
    margin-bottom: auto; 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b229bd1a3f64f50bb0a2aaf81bfdd21~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/dyqvmZv

上面这种现象同样存在于 CSS Grid 布局中。把上面示例调整为 CSS Grid 布局：

```HTML
<body>
    <header>Header</header>
    <main>Main</main>
    <aside>Sticky Sidebar</aside>
    <footer>Footer</footer>
</body>
```

```CSS
body {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: minmax(0, 1fr) 320px;
}

aside {
    position: sticky;
    top: 160px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf5e18f434cc4410aa186776ede6d786~tplv-k3u1fbpfcp-zoom-1.image)

解决方案与 CSS Flexbox 布局是一样的：

```CSS
body {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: minmax(0, 1fr) 320px;
}

aside {
    position: sticky;
    top: 160px;
}

/* 方案一 */
.body {
    align-items: start;
}

/* 方案二 */
aside {
    align-self: start;
}

/* 方案三 */

aside {
    margin-bottom: auto;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5697bbcc2a0d4cc89f7bff6b230194b2~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/xxaqWJE

不过在 CSS Grid 布局中有一种比较特殊情况，要使粘性定位生效，只能在粘性定位元素上使用 `align-self: start` 才能达到预期的效果。看下面这种布局。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8942f1a705343b19cf06785bb666bcb~tplv-k3u1fbpfcp-zoom-1.image)

我们希望页面滚动的时候，`<section>` 中的标题 `<h3>` 只在相应的 `<section>` 滚动的时候滚动到顶部固定住。这个时候在 `<h3>` 中使用 `algin-self: start` 更为妥当：

```CSS
section {
    display: grid;
    grid-template-columns: 200px minmax(0, 1fr);
    gap: 2rem;
}

section h3 {
    position: sticky;
    top: 130px;
    align-self: start;
}
```

> Demo 地址： https://codepen.io/airen/full/KKxWoYO

这个示例也被称为滚动索引。使用 `position: sticky` 实现滚动索引的效果，对 HTML 结构要求比较严格：

```HTML
<section>
    <h3> Section Title </h3>
    <div> Section Content</div>
</section>
<section>
    <h3> Section Title </h3>
    <div> Section Content</div>
</section>
<!-- 多个 Section > h3 + div 的结构 -->
```

在正常布局流中，`<h3>` 元素将随内容滚动。当我们在 `<h3>` 元素上添加 `position: sticky` ，并将 `top` 的值设置为 `0`，当标题滚动到视口的顶部时，标题会粘贴到那个位置。随后，每个后续标题将替换前一个标题，直到它向上滚动到该位置。

如果，我们这里的 HTML 结构做调整，标题都是平级的，如下：

```HTML
<section>
    <h3> Title </h3>
    <div> Content </div>
    
    <h3> Title </h3>
    <div> Content </div>
    
    <!-- 多个 h3 + div 的结构 -->
</section>
```

则最终效果是所有粘性定位的标题 `<h3>` 都会重叠在一起，这并不是我们想要的效果。所以，记住了，`position:sticky` 布局的时候，使用合适的 HTML 结构很重要。

```CSS
section h3 {
    position: sticky;
    top: 0;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/edf0dd4c8f154828a21a57580755c775~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/jOvBvyE

## 小结

CSS 的 `position` 同样是 Web 布局中不可或缺的部分，在一些特殊的布局中是离不开 `position` 的能力的。该功能模块提供了多种不同的定位方式，比如 `relative` 、`absolute` 、`fixed` 和 `sticky` 。尤其是新增的 `sitcky` 定位，它可以让 Web 开发者不依赖任何 JavaScript 脚本就可以实现吸附效果，比如吸顶效果。

只不过，在使用 `position: sticky` 时，有时候能正常工作，有时候又无法正常工作，这令很多 Web 开发者在使用 `position: sticky` 时感到很困惑。在这节课中，我们除了阐述了 CSS `position` 的基础知识之外，还着重阐述了 `sticky` 失效的原因以及相应的修复方式。

- 尽量避开粘性定位元素的祖先元素的 `overflow` 属性为 `auto` 、`scroll` 、`hidden` 和 `overlay` 。如果布局无法避免使用 `overflow` 的话，也应该尽可能使用 `clip` 来替代 `hidden` ；另外，还可以在溢出容器上显式设置一个高度值，避免粘性定位失效。
- 在使用 `position: sticky` 时，一定要记得显式设置一个阈值，即 使用 `top` 、`right` 、`bottom` 或 `left` 来设置粘性定位的位置。
- 要确保粘附容器的高度大于粘附项目的高度，尤其是 CSS Flexbox 和 CSS Grid 布局时，记得在 Flex 容器（或 Grid 容器）上重置 `align-items` 的初始值（比如设置为 `flex-start` 或 `start`）；或者在粘附项目上重置 `align-self` 的值为 `flex-start` （Flexbox 布局）或 `start` （Grid 布局）；或者在粘附项目上重置 `margin` 的值为 `auto` ，比如吸顶时，设置 `margin-bottom: auto` ，吸底时，设置 `margin-top: auto`。 

掌握了上面这几点，你在使用 `position: sticky` 不再会碰到粘性定位失效的情景，即使碰到了，也可以快速定位到原因和快速修复。