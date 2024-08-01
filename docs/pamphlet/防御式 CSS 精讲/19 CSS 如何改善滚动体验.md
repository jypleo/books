大多数 Web 页面不适合单屏显示，所以 Web 页面出现滚动条，被所有用户认为是理所当然的。对于 Web 开发者来说，跨浏览器提供良好的滚动体验，同时符合设计，无疑是一个挑战。尽管 Web 标准的发展速度远超从前，但代码的实现往往是落后的。

这节课将为你介绍一些可用于优化和改善用户滚动体验的 CSS 特性，使用这些特性可以使你的 Web 页面滚动更平滑、美观且性能更好。在此基础上，你可以检查一下你所用的解决方案是否能使用更优雅的方案所代替。 

## 为什么需要滚动？

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06c95c4ac3e846a6b50cf3e840ae7bc4~tplv-k3u1fbpfcp-zoom-1.image)

正如你所看到的，滚动在 Web 页面上随处可见，可以在页面中滚动，也可以在个别容器中滚动。它可以是垂直方向的滚动，也可以是水平方向的滚动：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8596865cbf07468abddc1f1590554ee8~tplv-k3u1fbpfcp-zoom-1.image)

这一切对于大家来说，既是那么的熟悉，又是那么的陌生。有同学可能会问，为什么需要滚动呢？又何时会出现滚动呢？

我们回到 CSS 的世界中来。

稍微对 CSS 有所了解的同学都知道，在 CSS 中，万物皆是一个盒子，而且盒子是有大小的，有可能没有足够多的空间来容纳其内容，CSS 把这种现象称为**内容溢出** ：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c211cbd41be640fc9ebb094a54ab18e2~tplv-k3u1fbpfcp-zoom-1.image)

上图中，左侧内容超出了容器，产生了内容溢出；右侧因内容少，未产生内容溢出。

默认情况下，内容溢出盒子是可见的，但你可以（如果愿意）以不同的方式来管理溢出的内容。例如，在容器上设置 `overflow` 属性的值为 `auto` 或 `scroll` ，它会为你的容器提供滚动条。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b96a6842ec940c18a28778629c06927~tplv-k3u1fbpfcp-zoom-1.image)

这可能不是你想要的（你不希望容器出现滚动条），但是在某些设计模式中，滚动容器是合适的。而且，CSS 选择默认使溢出内容可见（而不是隐藏），也是 CSS 设计的核心所在。

因为，在 CSS 中（和大多数地方一样），我们应该尽量避免数据丢失（通常说的是内容的丢失）。例如，你给容器的 `overflow` 指定一个 `hidden` 或 `clip` 值（或者[使用了其他的 CSS 裁剪术](https://juejin.cn/book/7199571709102391328/section/7199845888997457959)）时，溢出容器的内容就会消失（视觉上的消失）。这就意味着，用户可能会错过一些内容，甚至是重要的信息。

在某些情况下，内容消失会产生更大的、真正的问题。如果你开发的 Web 应用是脆弱的，比如，未考虑更多的场景或适配性，以至于表单的“提交按钮”位于容器的裁剪区域（填写表单的用户看不到这个按钮），这样就会使你的用户无法提交已填写的表单：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db430785677443cebb4f9a4c7f1ed7aa~tplv-k3u1fbpfcp-zoom-1.image)

如果页面因内容溢出打破了整个布局，你会发现它。或者，在更糟糕的情况下，使用该网站的人会发现它并让你知道。

比较严重的是，事情的消失并不总是那么明显。作为Web 开发者或设计师，你可能没有发现这个问题，特别是当它只发生在响应式 Web 设计中的特定视窗大小时（如上图所示）。你的用户可能没有发现问题，他们只是没有看到“提交按钮”（CTA），或者认为这是他们的问题，他们不能正常提交表单，所以离开了。

正因如此，为了避免因数据的丢失（内容视觉上不可见）造成不必要的损失，Web 页面或容器需要滚动，除非是你不希望滚动条出现。

## 如何创建滚动？

CSS 中关于滚动有一个专业术语，称为[可滚动溢出（Scrollable Overflow）](https://www.w3.org/TR/css-overflow-3/#scrollable-overflow) ，在 [W3C 的溢出模块](https://www.w3.org/TR/css-overflow-3/#overflow-concepts)中有明确的定义。简单地说，它是用来创建滚动容器的。

如果你希望某个容器变成一个滚动容器，那么它需要同时具备以下几个条件：

- 容器的尺寸受到上下文的限制或者你给容器指定了一个具体的尺寸；
- 容器的内容溢出，即内容的尺寸大于已指定的容器尺寸；
- 容器的 `overflow` 属性的值是一个非 `visible` 值。

虽然 CSS 的 `overflow` 属性是用来控制元素内容溢出的方式，但它会告诉浏览器你想怎么处理溢出。即，指定了一个盒子的内容是否被裁剪到它的内距盒子框（`<padding-box>`）的边缘，如果是的话，它是否是一个滚动容器，允许用户将其可滚动溢出区域的剪切部分滚动到滚动容器的视窗中。

> **滚动容器视觉视窗（可见区域）与它的内距盒子框（****`<padding-box>`****）边缘重合，被称为滚动视窗** 。 

也就是说，**一个元素是否是一个滚动容器，是由** **`overflow`** **（或****它****的子属性** **`overflow-x`** **和** **`overflow-y`****）的值来决定的** 。

 

`overflow` 可接受的值有 `visible` （默认值）、`hidden` 、`auto` 、`scroll` 和 `clip` ，不同值在浏览器中的表现如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9832d27992db489f8f1a1b1c39a31920~tplv-k3u1fbpfcp-zoom-1.image)

**只有元素的** **`overflow`** **属性的值为 **`hidden`** **、**`auto`** **或** **`scroll`** **时，该元素才是一个滚动容器**。只不过 `hidden`  和 `scroll` 与 `auto` 有所不同。

- `scroll` 会使滚动容器始终出现滚动条；
- `auto` 只有内容溢出时才会使滚动容器出现滚动条；
- `hidden` 始终不会让滚动容器出现滚动条，并且会对溢出容器的内容进行剪切（溢出容器盒子的内容不可见），同时容器也不会出现滚动条（用户无法滚动），但可以使用 `Element.scrollTop` 进行滚动。

当然，如果你希望控制一个元素溢出的方式能和书写模式紧密结合在一起，那么你可以使用 `overflow-x` 和 `overflow-y` 对应的 CSS 逻辑属性，即 `overflow-inline` 和 `overflow-block`。这两个属性都可以分别映射到 `overflow-x` 和 `overflow-y`，至于映射到哪个上面，取决于文档的书写模式： 

- 如果文档的书写模式是 `ltr` 或 `rtl`（即 `horizontal-tb`），那么 `overflow-inline` 映射到 `overflow-x` 上，`overflow-block` 映射到 `overflow-y` 上； 
- 如果文档的书写模式是 `vertical-lr` 或 `vertical-rl`，那么 `overflow-inline` 映射到 `overflow-y` 上，`overflow-block` 映射到 `overflow-x`上。 

需要注意的是，滚动容器的滚动条位置会因文档书写模式进行调整：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df3abe625c6a4820983e02b80e9c1e4d~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/eYLQedR

如果你不想思考过多，那么你只需要记住，**在容器元素上显式设置** **`overflow`** **属性的值为** **`auto`** **或** **`scroll`** **时，相应的就创建了滚动，只不过** **`auto`** **只有内容溢出容器时才会出现滚动条**。

## 滚动容器给 Web 带来哪些变化？

滚动容器给 Web 带来最直观的变化就是**容器出现滚动条**。滚动条的出现给 Web UI 和 Web 布局带来直接的影响。这主要是因为滚动条的类型、 UI 效果和尺寸大小和系统平台密不可分。

先来看滚动条的类型，它主分为**经典型滚动条**和**覆盖式滚动条**:

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0346a14634a14d51afa2de21ff2acf96~tplv-k3u1fbpfcp-zoom-1.image)

 

上图左侧是**覆盖式滚动条** ，在 iOS 或 Mac 系统上很常见，它被放置在内容之上。它们默认不显示，只在用户滚动的时候显示。为了保持滚动条下面的内容可见，它们都是半透明的，但这完全由用户代理（浏览器）来决定。在与它们互动时，其外观（包括大小）会有所不同。 

右侧的是**经典型滚动条** ，在 Windows 系统上很常见，它总是放置在一沟槽中（也称“滚动沟槽”），位于边框盒子（`<border-box>` ）内边缘和内距盒子（`<padding-box>`）外边缘之间。当出现时占用空间，通常是不透明的，会从相邻的内容中拿走一些空间（改变盒模型大小）。 

采用经典型滚动条，滚动条的出现会引起布局变化，产生重排和重绘，对于渲染性能来说是昂贵的。这是因为，滚动条的存在可能影响盒子尺寸的情况，所以 UA 必须从假设不需要滚动条开始，如果发现需要滚动条，则重新计算盒子尺寸。

在 macOS 系统中，用户可以根据自己的喜好来设置滚动条的类型：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3cf510b5d6bc48aaa731305c6dc96d0a~tplv-k3u1fbpfcp-zoom-1.image)

另外，不同系统下，滚动条的尺寸（一般指的是滚动沟槽）的大小也不一致，因而获取它的宽度并不容易。在 macOS 系统中，无论任何浏览器（滚动条）都是统一 `15px`，然而 Windows 系统可能会令开发者发狂：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b6c493731ae4278b2cdde7a02195518~tplv-k3u1fbpfcp-zoom-1.image)

除此之外，滚动条的 UI （外观）也会因系统不同，甚至同一系统在不同时间也有所差异，尤其是 Windows 系统中：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2095d651e02433397837d4f421f8f81~tplv-k3u1fbpfcp-zoom-1.image)

所以自定义滚动条 UI 的呼声越来越高：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a55377764196409184c39ee12596a19c~tplv-k3u1fbpfcp-zoom-1.image)

> 有关于自定义滚动条的相关介绍，将放到小册的下一节课中与大家一起探讨！

滚动条的出现，除了在 UI 和布局上给 Web 带来变化之外，给用户体验也带来不少的变化。比如**滚动穿透** 、**下拉刷新** 和**滚动卡顿**等。就拿滚动穿透为例：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3bc9518e426048aabd940417e90929ac~tplv-k3u1fbpfcp-zoom-1.image)

不难发现，模态框弹出之后，页面上有两个滚动条出现，一个是模态框的，另一个是页面（`body`）的。按理说，在模态框滚动时，它滚动到模态框底部时，溢出容器（模态框）应该停止滚动，因为没有更多内容要消费。换句话说，用户到了一个“滚动边界”。

但你仔细观察，如果用户继续滚动时，虽然模态框的滚动条滚动到底部无法继续滚动，但位于模态框底部的页面滚动条却依然在继续滚动，直到页面没有内容可消费时，滚动才会停止。

这种行为被称为**滚动穿透**，也是浏览器滚动内容的默认行为。通常情况下，默认行为是很好的，但有时它是不可取的，甚至是意想不到的。某些应用可能希望在用户触碰到滚动边界时提供不同的用户体验。

再来看下拉刷新。下拉刷新在移动应用中已经是很常见的一种交互效果了，但这也给用户带来一些不好的体验。比如用户滚动页面时，很容易就触发了下拉刷新：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/910a338d4ff04744863273610e2965db~tplv-k3u1fbpfcp-zoom-1.image)

虽然滚动是 Web 中必不可少的一种交互行为，但也给 Web 页面性能带来极大的影响。最为简单的，比如，你在做全屏滚动时，默认之下，它会一闪而过，或者闪过之时略带卡顿：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92374dea5b4d4c5b86611e00433b9e96~tplv-k3u1fbpfcp-zoom-1.image)

事实上，你期望给用户的是一个丝滑般的滚动体验：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99450645b8ce4b07a6cc214dffd1d18e~tplv-k3u1fbpfcp-zoom-1.image)

以往要实现这种滚动效果，我们不得不依赖于 JavaScript 脚本或其他第三方 JavaScript 库。庆幸的是，我们使用 CSS 可以解决上面所提到的各种问题，这也是我们这节课的重点部分。

## 改善用户体验的滚动新特性

CSS 特性随着时代的变更，也在不断的向前演进，这些新特性使 Web 开发者在实现一些 Web 效果不再需要依赖 JavaScript 脚本。这些 CSS 新特性中就包括了用来优化滚动体验相关的特性。

### 为滚动条保留空间

前面提到过，不同系统不同时间下，放置滚动条的空间大小（滚动沟槽）是不一样的。在经典型滚动条的状态下，很易于让 Web 产生回流（重排和重绘），尤其是滚动条出现之时，容器为了放置滚动条，会在滚动容器的边框盒子与内距盒子之间产生一个空间。此时，Web 页面布局就会产生变化，即产生回流：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa77e8b6d6e644c6a89595d535d5969e~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/XWPyZvM

现在，你可以**使用 CSS 的** **`scrollbar-gutter`** **属性为滚动条提前预留空间，避免页面布局的变化**。

> 注意，CSS 滚动沟槽只存在于经典型滚动条状态之下，如果你的操作系统是 macOS 系列，则需要将系统中“通用（General）”设置中的“显示滚动条（Show scroll bars）”选项设置为“始终（Always）”，才可以将覆盖式滚动条更换成经典型滚动条，就可以在浏览器中查看到 `scrollbar-gutter` 的效果。

`scrollbar-gutter` 属性可接受的值有 `auto` 、 `stable`  和 `both-edges` ，而且该属性需要和 `overflow` 属性结合在一起使用。`scrollbar-gutter` 同一个值与 `overflow` 属性不同值时，滚动条保留的空间也是有所差异的。

- **`auto`** ：当 `overflow` 为 `scroll` 或 `auto` 且有内容溢出时，经典型的滚动条会通过创建滚动沟槽来占用盒子（滚动容器）空间。
- **`stable`** ：当 `overflow` 为 `hidden`、`scroll` 或 `auto` 时，经典型滚动条会出现滚动沟槽（不管内容是否溢出容器）。
- **`stable  both-edges`** ：它是 `stable` 的一个扩展值。可以通过 `both-edges` 实现对称性，即**滚动容器两边都有滚动沟槽等同的空间**。 

分别来看它们的组合效果：

```CSS
.overflow {
    overflow: auto;
    scrollbar-gutter: var(--scrollbar-gutter);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a5a049864224141a40ec14e138e1baf~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/KKxrogM

把示例中的 `overflow` 的值换成 `scroll` ：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3d15fb867814e04aa97b67d7d477497~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/eYLQMjy

注意，`overflow` 取值为 `hidden` 时也能创建滚动容器，只是内容被裁剪，滚动条不会出现。但它和 `scrollbar-gutter` 不同值结合在一起时，效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cdab206971114e318f2ebd2b2866e37a~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/wvEQmQW

你会发现，`scrollbar-gutter` 取值为 `stable` 时，不会改变滚动条本身是否可见，只影响到沟槽的存在：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc4dc6fb527445a684f0b39b89080132~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/wvEQmOz

也就是说，在滚动容器上指 `scrollbar-gutter` 的值为 `stable`，可以让 UA 始终显示滚动沟槽，即使内容没有溢出滚动容器，也没有显示滚动条。这样我们就有了一个视觉上稳定的布局：“当内容开始溢出容器时，滚动条就会显示出来，但不会发生布局移动，因为它会告诉浏览器，要给滚动条预留一定空间（滚动沟槽）”。 

另外，当滚动沟槽存在而滚动条不存在时，滚动沟槽的背景会作为 `padding` 的延伸被绘制出来。 

最后我们可以用下面这个综合示例来展示 `scrollbar-gutter` 和 `overflow` 的交互作用，示例在浏览器中呈现的效果能更好地帮助你理解 `scrollbar-gutter` 是如何给滚动条预留空间的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/853bbd82b710494cb6bcbed26fb971a6~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/bGxQvPg

下图阐述经典型滚动条预留空间（滚动沟槽）是否应该存在：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e922c6b93e041b0a3245b1837d8ef24~tplv-k3u1fbpfcp-zoom-1.image)

不过，使用 `scrollbar-gutter` 有两个注意事项： 

- 像 `overflow` 属性一样，根元素（`<html>`）上设置的 `scrollbar-gutter` 会被应用到视窗中； 
- 与 `overflow` 属性不同的是，浏览器不会从 HTML 的 `<body>` 元素中传播 `scrollbar-gutter`。 

也就是说，如果你能预测容器是一个滚动容器，它有可能会出现滚动条，那么应该在滚动容器上设置 `scrollbar-gutter` 为 `stable` ：

```CSS
.scroll--container { 
    scrollbar-gutter: stable; 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/40ea5b09794b4b5799d0ea5847c2349f~tplv-k3u1fbpfcp-zoom-1.image)

### 在必要时显示滚动条

虽然说 `scrollbar-gutter` 可以给滚动条保留预定的空间，避免页面的回流，但我们还是应该尽可能地**在必要时显示滚动条** 。

因此，在内容比较长的情况下，更推荐将 `overflow` 的值设置为 `auto`。如果你将 `overflow` 显式设置为 `scroll` 时，不管容器内容长短，滚动条都会像下图这样展示出来：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9cdaf4c76f04480cb29ef45b0f471d06~tplv-k3u1fbpfcp-zoom-1.image)

这种效果并不友好，在非必要的情况下，滚动条不应该向用户展示。只需要在滚动容器中显式设置 `overflow` 为`auto` 即可改变这种现象：

```CSS
 .element { 
     overflow-y: auto; 
 } 
```

容器设置 `overflow-y` 为 `auto` 时，只有内容过长溢出滚动容器时，滚动条才会向用户展示，内容不溢出容器，则不会展示滚动条：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/060af4179c914ace95da4f16a73f36b5~tplv-k3u1fbpfcp-zoom-1.image)

### 阻止滚动穿透下拉刷新

带有滚动的模态框是滚动穿透的典型案例之一，模态框内容溢出时会出现滚动条。此时，Web 页面就会有两个滚动条出现，一个是模态框（子滚动容器，也被称为隐式滚动器），另一个是 `body` （称为根滚动器，每个 Web 页面只有一个根滚动器）。浏览器针对此场景时，其默认的滚动行为如下所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/701373f25c554915a61345d39889ade5~tplv-k3u1fbpfcp-zoom-1.image)

当模态框内容滚动到模态框底部时，模态框内容所在的滚动器（隐式滚动器）没有溢出可消费的内容，根滚动器（`body` 的滚动器）会开始滚动：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/561e845939cf440097dd86f9f4b3ac5c~tplv-k3u1fbpfcp-zoom-1.image)

浏览器这种默认行为通常是不需要的，并且会分散用户对模态框内容的注意力。以往为了改变这种行为，一般是借助 JavaScript 来完成。当模态框出现时，给 `html` 或 `body` 元素添加一个类名（比如 `.modal--open`），反之移除这个类名。然后在 `.modal--open` 类名上设置 `overflow: hidden` ：

```CSS
.modal--open {
    overflow: hidden;
}
```

不过，上面这段 CSS 代码在 iOS 的 Safari 中并不能很好地工作。如果要避免这个现象，你需要在此基础上设置 `position: fixed` ：

```CSS
.modal--open {
    position: fixed;
    overflow: hidden;
}
```

不幸的是，这又会引起新的问题出现，**它会导致浏览器滚动到页面顶部时，分散用户手头任务的注意力**。针对这一现象，[@Ben Frain 早在 2016 年就提供了相应的解决方案](https://benfrain.com/preventing-body-scroll-for-modals-in-ios/)。即，模态框弹出时，给 `body` 添加下面这段 CSS 代码：

```CSS
.bg-scrolling-element-when-modal-active {
    touch-action: none;
    -webkit-overflow-scrolling: none;
    overflow: hidden;
    overscroll-behavior: none;
 }
```

> 注意，该方案适用于 iOS 13+ 的系统，[具体效果可以点击这里查阅](https://codepen.io/benfrain/full/wvayeWq)。

如今，我们完全可以不依赖任何 JavaScript 脚本，仅使用 CSS 就可以阻止滚动穿透。**[W3C 的 CSS Overscroll Behavior Module Level 1](https://www.w3.org/TR/css-overscroll-1/#overscroll-behavior-properties)** 提供了一个名为 **`overscroll-behavior`** 的属性，让你可以控制浏览器过度滚动时的表现——也就是滚动到边界。

`overscroll-behavior` 属性和 `overflow` 相似，可以分别在 `x` 轴（`overscroll-behavior-x`）和 `y` 轴方向（`overscroll-behavior-y`）阻止滚动穿透。该属性提供了三个可选值，`auto` 、`contain` 和 `none` ，其中 `auto` 是其初始值，允许滚动穿透。

要是你给滚动容器指定 `overscroll-behavior` 属性的值为 `contain` ，默认的滚动边界行为不变（“滚动触底”或者刷新），但是可以阻止滚动穿透。比如，模态框滚动到底部时，位于其底下的 `body` 不会有滚动行为：

```CSS
.modal--content {
    overflow-y: auto;
    overscroll-behavior-y: contain;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f16f6e9979a48b4bd351d5bff24124c~tplv-k3u1fbpfcp-zoom-1.image)

我录制了一张 GIF 图来向大家呈现 `overscroll-behavior` 值为 `auto` 和 `contain` 的差异：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32486e90cdae4dfca32791b56aaf1838~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/RwYqejQ

除此之外，`overscroll-behavior` 还可以取 `none` 值，它除了可以帮助我们阻止滚动穿透之外，同时也会阻止滚动到边界时的反弹及刷新页面的效果，即移除滚动至顶部或底部的默认滚动特效（例如 Android 上的 Chrome 当滚动超过顶部边界时会刷新页面）。

```CSS
body {
    overscroll-behavior: none;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d49420cf7954328bc013ed31f7f5db4~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/qBMQJJX

注意，如果要移除滚动至顶部或底部的默认滚动特效，需要在 `html` 或 `body` 元素上设置 `overscroll-behavior` 的值为 `none` 。这也是禁用原生下拉刷新最有效的方案，而且它对于我们定制一个下拉刷新是非常有利的。否则就会出现两个下拉刷新的效果（一个是原生的，一个是定制的）。

未使用 `overscroll-behavior` 之前的效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/382a341240844bd98da958897502aff2~tplv-k3u1fbpfcp-zoom-1.image)

使用 `overscroll-behavior` 之后的效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3bbe40feb7d248f7a2a1ed3737a0a2af~tplv-k3u1fbpfcp-zoom-1.image)

> 详细代码可以查阅[ @ebidel 在 Github 上提供的相关示例](https://github.com/ebidel/demos/blob/master/chatbox.html)。

### 创建丝滑般的滚动

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb65d3dcd244490ea3912b4e5bc72d70~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/BaOGGxN

上图这种全屏滚动的效果在 Web 上很常见。我想你已经观察到了：

- 当 `scroll-behavior` 的值为 `auto` 时，整屏的滚动一闪而过，没有任何平滑过渡效果；
- 当 `scroll-behavior` 的值为 `smooth` 时，整屏滚动时明显要更丝滑。

是的，这就是 CSS 中创建丝滑般滚动特效方案之一。

`scroll-behavior` 允许你控制滚动容器的一些特殊行为。它可以为一个滚动容器指定滚动行为，其他任何的滚动，例如那些由于用户行为而产生的滚动，不受这个属性的影响。另外，在根元素中指定这个属性时，它反而适用于视窗。

```CSS
html {
    scroll-behavior: smooth;
}
```

当 `scroll-behavior` 取值为 `smooth` 时，滚动框将通过用户代理预定义的时长、使用预定义的时间函数，来实现平滑的滚动，用户代理应遵循其平台的约定，如果有的话。

再来看另一个实用性的案例：

```HTML
<body>
    <header>Header Section</header>
    <main>
        <article><!-- 文章内容 --></article>
        <div class="back-to-top-wrapper">
            <a href="#top" class="back-to-top-link" aria-label="Scroll to Top">🔝</a>
        </div>
    </main>
</body>
```

```CSS
html {
    scroll-behavior: smooth;
}

.back-to-top-link {
    position: sticky;
    pointer-events: all;
    top: calc(100vh - 5rem);
    transition: transform 80ms ease-in;
}
.back-to-top-link:hover,
.back-to-top-link:focus {
    transform: scale(1.1);
}
.back-to-top-link:focus {
    outline: none;
    box-shadow: 0 0 0 3px #4e85c0;
}
```

> Demo 地址：https://codepen.io/airen/full/yLxQGzq

效果是不是很棒！

这里有一个小技巧，你可以在所有滚动容器中设置 `scroll-behavior` 的值为 `smooth` ，尤其是在 `html` 和 `body` 元素上，这样做，可以让你的 Web 页面上所有滚动带有丝滑般的效果。

在 CSS 中，除了 `scroll-behavior` 用来改变滚动效果之外，还有滚动捕捉（`scroll-snap-*`）相关的特性。结合在一起，可以让你提供一个流式精确的滚动体验，有点类似于 [Swiper](https://idangero.us/swiper/) 的幻灯片效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f588dcd4340c44a38e00a5ed16876b61~tplv-k3u1fbpfcp-zoom-1.image)

你甚至可以将  `scroll-behavior` 和滚动捕捉结合起来，让滚动效果更完美一些。比如下面这个示例：

```HTML
<body>
    <section><!-- 区域中内容 --></section>
    <!-- 其他 section -->
</body>
```

```CSS
html {
    height: 100vh;
    width: 100vw;
    --scroll-behavior: auto;
    scroll-behavior: var(--scroll-behavior);
    scroll-snap-type: y mandatory;
}

section {
  position: relative;
  width: 100%;
  height: 100vh;
  scroll-snap-stop: always;
  scroll-snap-align: center;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01c2537c07594d3bb882fd875c4fee3b~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/vYzQvJL

代码中 `scroll-snap-*` 相关的属性就是滚动捕捉中的特性，有的用于滚动容器，有的用于滚动容器中的项目。由于篇幅的原因，在这节课中不对它们进行详细的阐述，因为我们在后面的课程中有专门一节课和大家探讨滚动捕捉方面的知识，敬请期待……

## 小结

滚动在 Web 应用（或页面）上随处可见，不同系统和平台对容器滚动的行为和 UI 渲染都有所不同，这也造成美观上有所差异，比如滚动条的 UI 效果。除此之外，一些默认的滚动行为并不能给用户提供较好的体验。

庆幸的是，CSS 提供了很多新特性，可以帮助我们提高用户的体验，比如：

- 将 `overflow` 设置为 `auto` ，使容器在必要时才出现滚动条；
- 将 `scrollbar-gutter` 设置为 `stable` ，可以给滚动条预留空间（如果有需要的话），可以避免滚动条出现时造成页面的回流，这对 Web 性能优化是很有帮助的；
- 可以在滚动容器上设置 `overscroll-behavior` 的值为 `contain` 或 `none` ，阻止滚动穿透和下拉刷新；
- 可以在滚动容器上设置 `scroll-behavior` 的值 `smooth` ，让滚动效果更丝滑。

即，你可以在滚动容器上使用下面这段代码：

```CSS
.scroll--container {
    overflow: auto; /* 可以是  overflow-x 或 overflow-y */
    scrollbar-gutter: stable; /* 如果有需要的就设置 */
    overscroll-behavior: contain; /* 如果要阻止下拉刷新的话，请使用 none */
    scroll-behavior: smooth; /* 提供丝滑般滚动效果 */
}
```

除此之外，我们还可以使用滚动捕捉为用户提供一个流式精确的滚动体验，还可以为滚动条定制个性化的 UI 。我将在后面的课程中与大家继续探讨这两个方面的知识。

最后，希望你能重新审阅你的代码，在滚动容器上加上课程中提到的 CSS 特性，为你的用户提供更好的体验。