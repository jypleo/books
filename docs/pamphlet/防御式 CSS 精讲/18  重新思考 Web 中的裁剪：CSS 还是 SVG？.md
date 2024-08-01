在《[图片的裁剪术](https://juejin.cn/book/7199571709102391328/section/7199845888997457959)》一节中，我们一起探讨了 CSS 中可用于裁剪图片（或其他元素）的技术方案。比如，你可以使用 `clip-path` 、`object-view-box` 和 `mask` 来裁剪图片或其他元素。这些裁剪术都各有利弊。在 Web 开发时，除了图片需要进行裁剪之外，有些 Web 组件也带有裁剪效果。比如 Facebook 用户头像组件（`<UserAvatar>`）：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0990d3b25081490b93c29e9183bd65cb~tplv-k3u1fbpfcp-zoom-1.image)

事实上，这种镂空的裁剪 UI 效果，在 Web 上很多地方都可见：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6576deecabb64b68998ec8935f005108~tplv-k3u1fbpfcp-zoom-1.image)

我想，你可能知道如何使用 CSS 来实现这种镂空的 UI 效果。即使如此，我还是建议你能继续往下阅读，在接下来的内容中，我将和大家探讨 CSS 和 SVG 是如何实现该效果，并且希望大家在课程的示例中能寻找到最佳的解决方案。

为了更好地阐述相关的解决方案，接下来的内容主要以用户头像组件（`<UserAvatar>`）为例，因为开发该组件需要考虑更多的事情，比如尺寸、状态等：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ce4fd2e93b34fd991ad0936a167a033~tplv-k3u1fbpfcp-zoom-1.image)

> 注意，上图来源于 @Roman Kamushken 的《[Avatar UI design](https://setproduct.com/blog/avatar-ui-design)》一文，这篇文章从设计的角度介绍了用户头像。

## 你可能是这样来实现的？

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ece0c7c69a9c471dabbe0c14aa9639a3~tplv-k3u1fbpfcp-zoom-1.image)

实现上图中用户头像的 UI 效果，你可能会考虑添加一个空的 HTML 标签或 CSS 的伪元素来制作用户头像右下方的小圆点，并且通过定位方式，将小圆点盖在用户头像之上。这或许是大部分 Web 开发者首先想到的技术方案。如果你使用浏览器开发者工具，去审查 Facebook 官网的代码，很容易就发现，Facebook 的工程师采用的也是这种方案：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bdab800eb1242a9a1f43d3cc9ad0930~tplv-k3u1fbpfcp-zoom-1.image)

即，你可能需要像下面这样的 HTML 结构：

```HTML
<!-- 使用一个空标签 -->
<figure class="avatar">
    <img class="avatar.jpg" alt="User Avatar" />
    <div class="avatar--dot"></div>
</figure>

<!-- 使用 CSS 的伪元素 ::before 或 ::after -->
<figure class="avatar">
    <img class="avatar.jpg" alt="User Avatar" />
    ::after
</figure>
```

我个人更趋向于选择使用 CSS 的伪元素 `::before` 或 `::after`，这样不需要添加额外的 HTML 标签，能让 HTML 代码更干净一些。对应的 CSS 代码如下所示：

```CSS
.avatar {
    border: 4px solid #ddd;
    width: 148px;
    aspect-ratio: 1;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

/* 用户头像右下角圆点 */
.avatar::after {
    content: "";
    position: absolute;
    width: 16px;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: currentColor;
    border: 2px solid currentColor;
    color: #2D46B0;
    box-shadow: 0 0 0 3px #fff;
    right: 0px;
    bottom: 20px;
}

.avatar:nth-child(2)::after {
    background-color: #fff;
}

.avatar img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
}

.avatar svg {
    display: block;
    width: 88px;
    height: 88px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/794379e938704924b310e82a7dc9c536~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/Podywde

它的基本原理如下所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1640ba9209934c36b841bc059bcb5159~tplv-k3u1fbpfcp-zoom-1.image)

> Demoe 地址：https://codepen.io/airen/full/wvEYaGO

看上去似乎是 OK! 其实，还是有不少的缺陷存在。 比如你的组件支持了暗黑模式，在亮色（Light）和暗色（Dark）两色系切换过程中，用户头像右下角的圆点颜色并没有跟着切换：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c49daa97c25d4fe4a4865a461a2d8d1a~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/BaOqojo

当然，你可以在 `light` 和 `dark` 两种模式下调整圆点的颜色，但这并不是最佳的方案。还有，即使我们按照《[Web 中的阴影](https://juejin.cn/book/7199571709102391328/section/7199844993455325216)》中所介绍的，使用 `drop-shadow()` 给组合元素添加阴影，效果也不是很好：

```CSS
.avatar--box-shadow {
    box-shadow: 0 0 10px 4px rgb(0 0 0 / .135);
}

.avatar--drop-shadow {
    filter: drop-shadow(2px 2px 5px rgb(0 0 0 / .35));
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df1279fc72d54645919f6f0f8af7c0f4~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/qBMJbRO

接下来， 我们来看看，有哪些方案可以帮助我们做得更好。

## 解决方案

我们有多种方案可以解决上面所提到的问题。简单地说，使用 CSS 的 `clip-path` 和 `mask` 都可以解决。只不过，除了 CSS 之外，还可以借助 SVG 的 `<clipPath>` ，让我们的方案变得更完美一些。另外，在这里还会向大家介绍如何使用 SVG 的 `<mask>` （即 SVG 的蒙板）来解决问题。

### CSS 的 clip-path 和 SVG 的 clipPath 相结合

如果你有阅读过 《[图片的裁剪术](https://juejin.cn/book/7199571709102391328/section/7199845888997457959)》 的内容，我想你对 CSS 的 `clip-path` 并不会感到陌生。它可以使用 `inset()` 、`circle()` 、`ellipse()` 、`polygon()` 和 `url()` 对图片源（或其他元素）进行裁剪：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b19d46d7e02844ebbefab4ce93b83961~tplv-k3u1fbpfcp-zoom-1.image)

其中，`inset()` 、`circle()` 、`ellipse()` 和 `polygon()` 都无法让 `clip-path` 实现上图所示的平滑且不规则的裁剪形状。庆幸的是，可以使用 `url()` 函数引用 SVG 的 `<clipPath>` 定义的裁剪路径来实现上图的效果。

`<clipPath>` 是 SVG 中的一个标签元素，它可以用来定义一条剪切路径，并且定义的剪切路径可以用于 CSS 的 `clip-path` 属性。它定义的剪切路径会限制图形的可见范围。从概念上来说，如果图形超出了当前剪切路径所包围的区域，那么超出部分将不会绘制。

也就是说，剪切路径等于给引用元素设置了一个自定义的可视区域。因此，它虽然会影响一个元素的绘制，但不会影响这个元素本身的几何形状，比如被剪切元素（通过 `clip-path` 属性引用了 `<clipPath>` 的元素及其子元素）的包围盒和没有被剪切时相同。

回到用户头像组件的示例中来。如果使用该方案来实现带镂空裁剪的用户头像组件，那么就需要使用 SVG 的 `<clipPath>` 来创建下图这样的一个路径：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a73f587a9b741b1b2c8bb2fd545bcb5~tplv-k3u1fbpfcp-zoom-1.image)

你可以使用一些矢量图相关的设计软件（比如 Sketch，Figma）来帮助你构建这样的图形，并且将其导出成一个 `.svg` 文件。就拿 Figma 为例吧：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1188406ab7f4507a3b1802813089ef4~tplv-k3u1fbpfcp-zoom-1.image)

打开导出的 `.svg` 文件，你可以看到相应的 SVG 代码：

```HTML
<svg fill="none" height="562" viewBox="0 0 562 562" width="562" xmlns="http://www.w3.org/2000/svg">
    <path clip-rule="evenodd" d="m517.339 433.066c28.261-43.833 44.661-96.034 44.661-152.066 0-155.192-125.808-281-281-281s-281 125.808-281 281 125.808 281 281 281c64.192 0 123.356-21.524 170.67-57.749-8.462-8.731-13.67-20.633-13.67-33.751 0-26.786 21.714-48.5 48.5-48.5 11.713 0 22.457 4.152 30.839 11.066z" fill="#0e0a0a" fill-rule="evenodd"/>
</svg>
```

正如你所看到的，导出的 SVG 代码中并没有 `<clipPath>` 。

不过，不要着急，只需要将 `<path>` 代码复制出来，并且放到 `<clipPath>` 中。只不过，中间还需要将 SVG 路径点的值转换为相对单位。这是因为，SVG 路径点的值默认是绝对的。这意味着，如果宽度和高度发生变化，它们就会拉伸。为了提前解决这个问题，我们可以使用[这个强大的工具（Convert SVG absolute clip-path to relative）](https://yoksel.github.io/relative-clip-path/)。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84ed9035ca10499cbb8caee3ad613d69~tplv-k3u1fbpfcp-zoom-1.image)

> Convert SVG absolute clip-path to relative：https://yoksel.github.io/relative-clip-path/

然后，将该路径作为 `<clipPath>` 节点加入到页面里的内联 SVG 中。

```HTML
<svg class="svg">
  <clipPath id="circle" clipPathUnits="objectBoundingBox"><path d="m0.921,0.771 c0.05,-0.078,0.079,-0.171,0.079,-0.271 c0,-0.276,-0.224,-0.5,-0.5,-0.5 s-0.5,0.224,-0.5,0.5 s0.224,0.5,0.5,0.5 c0.114,0,0.219,-0.038,0.304,-0.103 c-0.015,-0.016,-0.024,-0.037,-0.024,-0.06 c0,-0.048,0.039,-0.086,0.086,-0.086 c0.021,0,0.04,0.007,0.055,0.02"></path></clipPath>
</svg>
```

`clipPathUnits` 属性的值 `objectBoundingBox` 意味着路径内的值**是相对于** **`clip-path`** **所应用**元素的**边界框的**。

我们在 `img` 上使用 `clip-path` ，并且使用 `url(#circle)` 引入 SVG 的 `<clipPath>` 绘制的剪切路径：

```CSS
.avatar {
  width: 148px;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.avatar img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  clip-path: url(#circle);
}

.avatar::after {
  content: "";
  position: absolute;
  width: 16px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: currentColor;
  border: 2px solid currentColor;
  color: #2D46B0;
  box-shadow: 0 0 0 3px #fff;
  right: 10px;
  bottom: 15px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d06f9ecddb70465e9cc792b5be83e538~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/pen/LYJgZNM

如果你使用伪元素（比如 `::before` 或 `::after`）给用户头像添加一个[内边框](https://juejin.cn/book/7199571709102391328/section/7199845356845629472)，你会发现边框出现了不应该出现的地方：

```CSS
.avatar::before {
    content: "";
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 3px solid;
    border-radius: 50%;
    z-index: 2;
    opacity: .2;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0490fde3c4804f89a4899feff2ff894d~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/RwYeGNG

你只需要在 `.avatar::before` 上（[绘制内边框](https://juejin.cn/book/7199571709102391328/section/7199845356845629472)）再次使用 `<clipPath>` 剪切路径即可解决：

```CSS
.avatar::before {
    clip-path: url(#circle);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b5f7d99ac4e44408f058a63960ad38a~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/JjamREd

接着，我们再来验证阴影效果：

```CSS
.avatar--box-shadow {
    box-shadow: 0 0 2px 3px rgb(55 55 255 / .5);
}

.avatar--drop-shadow {
    filter:drop-shadow(2px 2px 3px rgb(55 55 255 / .5)) drop-shadow(-2px -2px 3px rgb(55 55 255 / .5));
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2522508e643439790f418b92b271d35~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/oNPazWx

使用 `filter` 的 `drop-shadow` 制作阴影要比 `box-shadow` 效果好很多，它可以给整个组件的元素组添加阴影，有关于这方面的具体介绍，可以阅读《[Web 中的阴影](https://juejin.cn/book/7199571709102391328/section/7199844993455325216)》。

如果你跟着课程实战过一回，该方案的利弊也一目了然：

- **利** ：兼容性好，适用于一些基本的示例；
- **弊** ：制作剪切路径需要具备一些设计软件实战经验，而且组件 UI 不同时，需要重新制作剪切路径；另外，该方案可能会因边框和阴影而变得更复杂。

### CSS 的 mask

使用 CSS 的 `mask` 特性，你可以非常容易得到一个镂空（挖洞）的效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa246c74ae1844348a64eed73fbb75fe~tplv-k3u1fbpfcp-zoom-1.image)

而且，你可以直接使用 CSS 的径向渐变当作蒙板层。比如，使用 CSS 的 `radial-gradient()` 绘制一个圆形：

```CSS
.avatar {
    background-image: radial-gradient(circle 20px at calc(100% - 30px) calc(100% - 30px), black 30px, #09f 0);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74911a3ed84f46469d59c13a42b5158b~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/GRXYNqX

从《[图片的裁剪术](https://juejin.cn/book/7199571709102391328/section/7199845888997457959)》课程中，我们得知，CSS 遮罩分为**高亮**和 **Alpha** 两种模式：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3d374e4f88049afbe9fc86f1fca12ce~tplv-k3u1fbpfcp-zoom-1.image)

根据该原理，我们需要调整一下径向渐变的颜色，把前面示例中的圆点调为透明色（`transparent` ），另一个调整黑色（`rgb(0 0 0)` ，对应着带 Alpha 通道遮罩模式）或白色（`rgb(255 255 255)` ，对应着高亮遮罩模式）：

```CSS
.avatar--alpha {
    background-image: radial-gradient(circle 20px at calc(100% - 30px) calc(100% - 30px), rgb(0 0 0 / 0) 30px, rgb(0 0 0) 0);
}

.avatar--luminance{
    background-image: radial-gradient(circle 20px at calc(100% - 30px) calc(100% - 30px), rgb(255 255 255 / 0) 30px, rgb(255 255 255) 0);
}
```

> 注意，如果渐变颜色中有使用到透明颜色时，有一个细节需要注意，尽量不要使用关键词 `transparent` ，而应该使用与其相邻的渐变颜色值，并将其透明值设置为 `0` 。比如上面示例中的渐变是从一个完全透明色到 `rgb(0 0 0)` 之间渐变，使用 `rgb(0 0 0 / 0)` 替代 `transparent` 会更好。这样可以避免个别浏览器产生透明黑的现象。有关于这方面的详细介绍，请参阅《[你不知道的 CSS 渐变](https://juejin.cn/book/7199571709102391328/section/7199845781149810727)》。

同时给需要运用 `mask` 的元素（比如 `.avatar` ）添加 `border-radius: 50%` ，将用户头像变成一个圆，同时将整个遮罩图也变成一个圆：

```CSS
.avatar {
    border-radius: 50%;
}
.avatar--alpha {
    background-image: radial-gradient(circle 20px at calc(100% - 30px) calc(100% - 30px), rgb(0 0 0 / 0) 30px, rgb(0 0 0) 0);
}

.avatar--luminance{
    background-image: radial-gradient(circle 20px at calc(100% - 30px) calc(100% - 30px), rgb(255 255 255 / 0) 30px, rgb(255 255 255) 0);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d13a98bbc2d24ecc9a1daf5c081c2550~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/Podybdv

现在只需要将 `radial-gradient` 绘制的径向渐变用于 `mask-image` ：

```CSS
.avatar {
    mask-repeat: no-repeat;
}
.avatar--alpha {
    mask-image: radial-gradient(circle 20px at calc(100% - 30px) calc(100% - 30px), rgb(0 0 0 / 0) 30px, rgb(0 0 0) 0);
}

.avatar--luminance{
    mask-image: radial-gradient(circle 20px at calc(100% - 30px) calc(100% - 30px), rgb(255 255 255 / 0) 30px, rgb(255 255 255) 0);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1939ee9fc1245ba9784bf26cc4f5446~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/WNgaKQw

你们看到镂空的效果已出现：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78a84c4cbad44841b506be98ecc1136e~tplv-k3u1fbpfcp-zoom-1.image)

你可以像前面的 `clip-path` 示例一样，给组件添加阴影和边框，你看到的效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd9b3b7a709140c5b95e5b19c2e710d5~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/ExedpXR

`mask` 和 `clip-path` 相比，除了兼容性好，适用于一些基本用例之外，`mask` 的遮罩层（相当于 `clip-path` 使用的 `<clipPath>` 绘制的剪切路径）更为灵活，除了引用遮罩图片之外，还可以是 CSS 径向渐变。另外，`mask` 中还有一个比 `clip-path` 强大的是，它有一个合成功能，即 `mask-composite` 。

简单地说，**遮罩合成指的是我们可以使用不同的操作将多个不同的遮罩层合并成一个独立的遮罩层**。比如，我们有两个遮罩层，在这两个遮罩层中取每对对应的像素，在它们的通道上应用特定的合成操作，并为最终层获得第三个像素。如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/13f36b60580b438ca3cb53b1272f0d86~tplv-k3u1fbpfcp-zoom-1.image)

上图中左上图和左下图合层起来成了右侧的层。而左上图被称为源（Source），左下图被称为目标层（Destination），这对我们来说没有多大的意义，因为给我的感觉，一个是输入源，一个是输出结果（事实上，这两个都是输入）。但是，就上图的结果而言，这两个层（源和目标层）却做了一个合层的操作（也被称为合层计算），从而得到最终的结果（上图右侧的合并层）。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c6491f7ebb442af943760f072482e6c~tplv-k3u1fbpfcp-zoom-1.image)

上面演示的是仅有两个层合并，而事实上呢？我们可能会有两个以上的层合并，当有这种情形时，合层是分阶段完成的，从底部开始。 

在第一阶段，从底部开始的第二层是源，从底部开始的第一层是目标，这两层被合成，结果成为第二阶段的目标，接着和从底部开始的第三层（源）合并。通过合成前两层的结果合成第三层，我们就得到了第三阶的目标，接着再从底部开始的第四层（源）合并。如下图这样的一个合并过程： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35534b28ebf3460da90a0d6a30c32234~tplv-k3u1fbpfcp-zoom-1.image)

以此类推，直到我们达到最后一个阶段，在这里，最顶层由下面所有层的合成结果组成。 

如果上面太过于理论，不易于理解，不要紧。因为 `mask` 中的合成计算和我们常用的设计软件合成是相似的。换句话说，`mask-composite` 对应的值，比如 `add`、`subtract`、`intersect` 和 `exclude` 可以指定遮罩层的合成计算，它们分别对应设计软件中的联集（`add`）、减去顶层（`subtract`）、交集（`intersect`）和差集（`exclude`）：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39d50393a144459fb00d6c3292cf74c3~tplv-k3u1fbpfcp-zoom-1.image)

来看一个简单示例：

```CSS
.card {
    mask-image: 
        radial-gradient(circle at 50px 10px, transparent 10px, red 10.5px), 
        radial-gradient(closest-side circle at 50%, red 99%, transparent 100%);
    mask-size: 100%, 4px 12px;
    mask-repeat: repeat, repeat-y;
    mask-position: 0 -10px, 48px;
    -webkit-mask-composite: source-out;
    mask-composite: subtract;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/16b9ca2640db402f912cb1301816d9d9~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/rNZqZGg

正如你所看到的，使用 `mask` 的合成功能（`mask-composite`）可以在不使用任何图片之下，就可以实现各式各样的优惠券（Coupon） UI 效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b640b2cc915c469ea87351db92db5b91~tplv-k3u1fbpfcp-zoom-1.image)

> 上图录制于 [@xboxyan](https://github.com/XboxYan) 的 [Coupon.io](https://coupon.codelabo.cn/)，该工具可以帮助你快速生成优惠券 UI。

有意思的是，`mask` 也可以像 `clip-path` 一样，在 `mask-image` 属性的 `url()` 函数中引用 SVG 的 `<mask>` 绘制路径：

```HTML
<svg class="svg">
    <def>
        <mask id="mask" maskContentUnits="objectBoundingBox">
            <path d="m0.921,0.771 c0.05,-0.078,0.079,-0.171,0.079,-0.271 c0,-0.276,-0.224,-0.5,-0.5,-0.5 s-0.5,0.224,-0.5,0.5 s0.224,0.5,0.5,0.5 c0.114,0,0.219,-0.038,0.304,-0.103 c-0.015,-0.016,-0.024,-0.037,-0.024,-0.06 c0,-0.048,0.039,-0.086,0.086,-0.086 c0.021,0,0.04,0.007,0.055,0.02" fill="#ffffff"></path> 
        </mask>
    </def>
    <clipPath id="clip-path" clipPathUnits="objectBoundingBox"><path d="m0.921,0.771 c0.05,-0.078,0.079,-0.171,0.079,-0.271 c0,-0.276,-0.224,-0.5,-0.5,-0.5 s-0.5,0.224,-0.5,0.5 s0.224,0.5,0.5,0.5 c0.114,0,0.219,-0.038,0.304,-0.103 c-0.015,-0.016,-0.024,-0.037,-0.024,-0.06 c0,-0.048,0.039,-0.086,0.086,-0.086 c0.021,0,0.04,0.007,0.055,0.02"></path></clipPath>
</svg>
```

```CSS
.avatar--clip-path img,
.avatar--clip-path::before {
    clip-path: url(#clip-path);
}

.avatar--mask img,
.avatar--mask::before {
    mask: url(#mask);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6fa6f9133fa48c0b296928ae9115d3b~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/gOdBddX （请使用 Firefox 查看 Demo）。

这种方法的优点是可以对任何 HTML 元素应用遮罩，而不仅限于图像。不幸的是，到目前为止（写这节课的时候）， Firefox 是唯一支持这种方法的浏览器。

但是我们并没有损失，因为对于最常见的遮罩图像场景，我们可以将图像包含在 SVG 中。这就是接下来要和大家聊的第三种解决方案。

### SVG 的 mask

> 这里的 `mask` 指的是 SVG 的 `<mask>` 标签元素！

课程接下来的内容会涉及到 SVG 相关的知识，如果你从未接触过 SVG 的话，又想获取这方面的知识，那么下面几个链接提供的资料可以帮到你：

- [A Practical Guide To SVG And Design Tools](https://www.smashingmagazine.com/2019/05/svg-design-tools-practical-guide/)
- [An in-depth SVG tutorial](https://flaviocopes.com/svg/)

既然是 SVG 的 `<mask>` 解决方案（用来裁剪图片或其他元素），那么就先来了解一下 `<mask>` 吧。先上代码：

```HTML
<svg width="200px" height="200px">
    <mask id="circle">
        <circle fill="currentColor" cx="100" cy="100" r="100"></circle>
    </mask>
</svg>
```

你会发现，在浏览器中什么也看不到。

> 注意，在 SVG 中，绘制图形的元素，比如 `<line>` 、`<rect>` 、`<polygon>` 、`<ellipse>` 和 `<path>` 都可以像示例代码中的 `<circle>` 放在 `<mask>` 标签元素中。

如果我们在上面示例代码的基础中，引入一个 `<image>` 标签元素，并且使用 `xlink:href` 引入图片路径。然后给 `<image>` 元素设置 `mask` 属性，同样像 CSS 的 `mask` 一样，使用 `url()` 函数引用 `<mask>` 中的 `id` 名：

```HTML
<svg width="200px" height="200px">
    <mask id="circle">
        <circle fill="currentColor" cx="100" cy="100" r="100"></circle>
    </mask>
    <image height="100%" width="100%" xlink:href="avatar.jpg" mask="url(#circle)"></image>
</svg>
```

此时，它相当于在一张图片上使用了一个圆形的遮罩层，最终合成的效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/266228de24f243179bbf991a058ed601~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/RwYeeQY

看上去，它就是被一个圆遮罩罩起来的图片。在 SVG 中，它与 CSS 蒙版（`mask`）不同：

- 首先，在 SVG 的 `<mask>` 元素中使用 `<circle>` 绘制了一个圆（这个圆在浏览器中你是看不到的），并且在 `<mask>` 上定义了一个名为 `circle` 的 `id` 值；
- 然后，在 SVG 的 `<image>` 元素上设置了 `mask` 属性，该属性的值是 `url(#circle)`。 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90bdbbb078ef4f4296b55a4b62be28a0~tplv-k3u1fbpfcp-zoom-1.image)

 

而且，在 `<mask>` 标签元素中还可以使用多个元素，比如在 `<mask>` 中放大小、位置不同的圆（`<circle>`）：

```HTML
<svg width="200px" height="200px">
    <mask id="circle">
        <circle fill="currentColor" cx="100" cy="100" r="100"></circle>
        <circle fill="currentColor" cx="86%" cy="86%" r="20"></circle>
    </mask>
    <image height="100%" width="100%" xlink:href="https://picsum.photos/200/200?random=1" mask="url(#circle)"></image>
</svg>
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cdc28a869c80464988eab87cb5fd732a~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/qBMJJwo

整个过程如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd3cb280d1be40c5b1595077277b0ccb~tplv-k3u1fbpfcp-zoom-1.image)

正如你所看到的，新添加的小圆和大圆结合在一起，并没有起到裁剪的效果，反而突出来了。你可能会问，应该怎么操作，在大圆的基础上挖一个小圆呢？在回答在这个问题之前，我们来动态改变 `<mask>` 中 `<circle>` 填充颜色，即 `fill` 的值。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae30c256ad8e47558e7b0468406d1b9f~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/OJoBavN

你可能已经发现了，当 `fill` 的值从 `#fff` 慢慢过渡到 `#000` 时，整个图片都看不到了。要是我们只调整小圆的颜色呢？

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b045fd01313e426fb71fc1edcb29eeba~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/KKxGrxX

不难发现，在 SVG 的蒙版（`<mask>`）中，填充为白色（`fill="#ffffff"`）的对象（比如大圆）代表**我们想要显示**的区域。而填充为黑色（`fill="#000000`）的对象（比如小圆）代表**我们想要隐藏**的区域。很有趣，对吧？

> 注意，这和 CSS 中的 `mask` 是不相同的，在 CSS 的 `mask` 中，带 **Alpha 通道的遮罩和高亮的遮罩都能让对象显示。**

把上面代码稍微调整一下，大圆和小圆的 `fill` 分别设置为 `#ffffff` 和 `#000000` ：

```HTML
<svg width="200px" height="200px">
    <mask id="circle">
        <circle fill="#ffffff" cx="100" cy="100" r="100"></circle>
        <circle fill="#000000" cx="86%" cy="86%" r="20"></circle>
    </mask>
    <image height="100%" width="100%" xlink:href="https://picsum.photos/200/200?random=1" mask="url(#circle)"></image>
</svg>
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b0868d6bca140648db3b14a1631b6a0~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/yLxRQZv

其实，它就有点像设计软件（比如 Figma）中的合成工具，相当于 CSS 的 `mask-composite` 功能：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b36773523f974d33b1656b3229e787a4~tplv-k3u1fbpfcp-zoom-1.image)

当 `<mask>` 标签都是**白色**时，会导致类似于**合并两个形状**（相当于 `mask-composite` 的 `add` ）的结果。如果其中一个是白色，另一个是黑色，则是一个形状将从**另一个中减去**（相当于 `mask-composite` 的 `subtract`）。

这个诀窍非常有用，可以为 Web 开发者提供更多可能。

前面花了一定的篇幅向大家阐述了 SVG 的 `<mask>` 是如何实现裁剪（比如镂空）的。现在，我们回到我们的目标中来（`<UserAvatar>` 组件）。

你可以结合 SVG 来构建 `<UserAvatar>` 组件：

```HTML
<div class="avatar">
    <svg width="200px" height="200px">
        <mask id="circle">
            <circle fill="#ffffff" cx="100" cy="100" r="100"></circle>
            <circle fill="#00000" cx="86%" cy="86%" r="20"></circle>
        </mask>
        <image height="100%" width="100%" xlink:href="https://picsum.photos/200/200?random=1" mask="url(#circle)"></image>
    </svg>
</div>
```

```CSS
.avatar {
    width: 200px;
    aspect-ratio: 1;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    filter:drop-shadow(2px 2px 3px rgb(55 55 255 / .5)) drop-shadow(-2px -2px 3px rgb(55 55 255 / .5));
}

/* 右下角圆点 */
.avatar::after {
    content: "";
    position: absolute;
    width: 26px;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: currentColor;
    border: 2px solid currentColor;
    color: #2D46B0;
    box-shadow: 0 0 0 3px #fff;
    right: 15px;
    bottom: 15.5px;
}

/* 内边框 */
.avatar::before {
    content: "";
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 3px solid;
    border-radius: 50%;
    z-index: 2;
    opacity: .2;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12359c85d9b141b9b730c87011c023b3~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/xxaymVv

你可能已经发现了，示例呈现的效果并不符合预期。不过，我们还是有办法可以修正的，将内边框也放到 SVG 中来构建：

```HTML
<div class="avatar">
    <svg width="200px" height="200px">
        <mask id="circle">
            <circle fill="#ffffff" cx="100" cy="100" r="100"></circle>
            <circle fill="#00000" cx="86%" cy="86%" r="20"></circle>
        </mask>
        <image height="100%" width="100%" xlink:href="https://picsum.photos/200/200?random=1" mask="url(#circle)"></image>
      <circle fill="none" cx="100" cy="100" r="100" stroke="rgba(255, 255, 255,0.2)" stroke-width="2">
    </svg>
</div>
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d14202eaa9242ddb505b8b1745bb4da~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/vYzVvey

甚至是右下角的小圆点也可以直接在 SVG 中完成。感兴趣的同学，不妨自己实战一把。

SVG 的 `<mask>` 和前面两个方案相比，它的灵活性、兼容性是最好的，对于 Web 开发者而言，简单且易于维护。不足的是，你需要对 SVG 知识有一定的认识，而且要让其适配性更好，需要对 SVG 的 `viewBox` 和 `preserveAspectRatio` 有很深的认识。

> 有关于 `viewBox` 和 `preserveAspectRatio` ，这里不做详细阐述，因为它们已完全超出这节课的范畴，如果你感兴趣的话，可以移步阅读 @Sara 写的系列教程《Understanding SVG Coordinate Systems & Transformations: [Part1](https://www.sarasoueidan.com/blog/svg-coordinate-systems/) 、[Part2](http://sarasoueidan.com/blog/svg-transformations) 、[Part3](http://sarasoueidan.com/blog/nesting-svgs)》和《[Art-Directing SVG Images With The viewBox Attribute: How-To, Notes, Tips and Why We Need A viewBox Property in CSS](https://www.sarasoueidan.com/blog/svg-art-direction-using-viewbox/)》。

上面都是实现单个用户头像的解决方案。我们在 Web 开发时，会有像下图这样的 UI 效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/713096ec5b41402abffef8998ace1185~tplv-k3u1fbpfcp-zoom-1.image)

用户头像一个挨着一个，并且相互重叠。

以往实现上图所示的效果时，从未考虑过用户头像需要裁剪，只会沿着水平方向移动，让它们重叠。我自己也是如此思考的：

```HTML
<ul class="avatars">
    <li class="avatar">
        <img src="avatar.jpg" alt="avatar" />
    </li>
    <!-- 多个 li -->
</ul>
```

```CSS
.avatar {
    width: 88px;
    aspect-ratio: 1;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.avatar img {
    display: block;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
}

.avatar::before {
    content: "";
    position: absolute;
    inset: 0;
    border: 4px solid;
    border-radius: 50%;
    width: 100%;
    aspect-ratio: 1;
}

.flexbox {
    display: flex;
}

.flexbox li:not(:first-child) {
    margin-left: -2rem;
}

.flex--right  {
    flex-direction: row-reverse;
    margin-left: 2rem;
}

.flex--right li:not(:last-child) {
    margin-left: -2rem;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d4cb0790265451aa9d45d2e6046c7f8~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/dyqgaKm

上面这个示例，用户头像只是相互重叠了，并没有任何的裁剪。这是很普通的一种技术方案。

不过，我们可以尝试着使用新的技术方案，那就是可以把位于底层头像视作被裁剪过：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3daa393f4522449fbb8fd9825c7aa490~tplv-k3u1fbpfcp-zoom-1.image)

这就跟前面的  `<UserAvatar>` 镂空非常相似了，也就是说，前面所介绍的三种方案都可以用于这个效果。只不过，每种方案各有利弊。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b267462140014520904585b63e3b8671~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/JjamVmG

上面是 `clip-path` 和 `<clipPath>` 的效果，即使是像前面的示例，使用的是 `<clipPath>` 的相对值，也无法避免用户头像的变形。具体原委涉及到 SVG 更深入的知识，不在这里阐述。如果你感兴趣的话，可以自己花时间去深入探讨一下。

也就是说，`clip-path` 和 `<clipPath>` 方案你可以选择放弃了！

`mask` 相对 `clip-path` 更具可行性，而且更简单，你可以：

- 选择使用径向渐变绘制一个遮罩层；
- 选择在设计软件中设计一个遮罩层。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/283c4d1c3eb041f3b8a5003453d73b3e~tplv-k3u1fbpfcp-zoom-1.image)

关键性的 CSS 代码：

```CSS
.avatars {
    display: flex;
}

.avatar {
    z-index: var(--index);
}

.mask--radial .avatar:not(:first-child) {
    mask-image: radial-gradient(ellipse 54px 135px at 11px center, #0000 30px, #000 30.5px);
    margin-left: -54px;
}

.mask--svg .avatar:not(:last-child) {
    mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjY0IiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDI2NCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjY0IDUyLjUwNzNDMjQxLjU1NiA3OC43MjY3IDIyOCAxMTIuNzggMjI4IDE1MEMyMjggMTg3LjIyIDI0MS41NTYgMjIxLjI3MyAyNjQgMjQ3LjQ5M0MyMzYuNDg5IDI3OS42MzIgMTk1LjYyMyAzMDAgMTUwIDMwMEM2Ny4xNTczIDMwMCAwIDIzMi44NDMgMCAxNTBDMCA2Ny4xNTczIDY3LjE1NzMgMCAxNTAgMEMxOTUuNjIzIDAgMjM2LjQ4OSAyMC4zNjgyIDI2NCA1Mi41MDczWiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==");
    mask-repeat: no-repeat;
    mask-size: contain;
}

.mask--svg .avatar:not(:first-child) {
    margin-left: -48px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05a5d6b19f7848369596f7d8e0884c03~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/ExedBPQ

注意，这里有两个细节需要注意。使用径向渐变制作遮罩层时，在边缘会产生锯齿，你可以依照《[Web 图片：你不应该遗忘的 CSS 技巧](https://juejin.cn/book/7199571709102391328/section/7199845838103773195)》课程中提供的方案，避免渐变产生锯齿。第二个细节是，如果叠加顺序是从左往右（上图中第一个示例效果），就需要调整每个 Flex 项目的 `z-index` 值，从左（第一个 Flex 项目）往右（最后一个 Flex 项目） `z-index` 的值依次变小。

> 我们在《`z-index 失效与修复`》课程中详细阐述了 CSS 的 `z-index` 的相关原理！

就 `mask` 技术方面而言，还有更强大的。你可以使用 `mask` 的 `mask-composite` 功能，可以像下面这样做合成处理：

```CSS
.avatar {
    mask-image: 
        url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iMTk1IiB2aWV3Qm94PSIwIDAgNzIgMTk1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTM2IDE5NC45ODVDNTguNDQ0IDE2OC43NjYgNzIgMTM0LjcxMiA3MiA5Ny40OTI3QzcyIDYwLjI3MyA1OC40NDQgMjYuMjE5NCAzNiAwQzEzLjU1NiAyNi4yMTk0IDAgNjAuMjczIDAgOTcuNDkyN0MwIDEzNC43MTIgMTMuNTU2IDE2OC43NjYgMzYgMTk0Ljk4NVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo="), 
        linear-gradient(#000, #000);
    mask-repeat: no-repeat;
    mask-position: -26px 54%, 100% 100%;
    mask-size: 80px 140px, 100% 100%;
    mask-composite: exclude;
    -webkit-mask-composite: destination-out;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2dd96c5c27824b73a25bc21785d5c6fc~tplv-k3u1fbpfcp-zoom-1.image)

使用该方案，你只需要调整 `mask-position` 和 `mask-size` 值，就可以制作出下面效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64af515b075643649f44c6650ba940bd~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/PodyMqW 

我想你已经猜到了，同样可以使用 SVG 的 `<mask>` 来实现上面示例所展示的效果。

```HTML
<svg  class="avatar" width="200" height="200" viewBox="0 0 200 200">
    <mask id="cut">
        <circle cx="100" cy="100" r="100" fill="white"></circle>
        <circle fill="black" cx="-40" cy="100" r="100"></circle>
    </mask>
    <g mask="url(#cut)">
        <image x="0" y="0" height="100%" width="100%" xlink:href="https://picsum.photos/200/200?random=1"></image>
        <circle fill="none" stroke="rgba(0,0,0,0.5)" stroke-width="4" cx="100" cy="100" r="100"></circle>
    </g>
</svg>
```

如果是多个 `<svg>` 调用同一个 `<mask>` ，则可以将其提取出来：

```HTML
<svg  class="mask" width="200" height="200" viewBox="0 0 200 200">
    <defs>
        <mask id="cut">
            <circle cx="100" cy="100" r="100" fill="white"></circle>
            <circle fill="black" cx="-40" cy="100" r="100"></circle>
        </mask>
    </defs>
</svg>

<div class="avatars">
    <svg  class="avatar" width="200" height="200" viewBox="0 0 200 200">
        <g mask="url(#cut)">
            <image x="0" y="0" height="100%" width="100%" xlink:href="https://picsum.photos/200/200?random=1"></image>
            <circle fill="none" stroke="rgba(0,0,0,0.5)" stroke-width="4" cx="100" cy="100" r="100"></circle>
        </g>
    </svg>
    <svg  class="avatar" width="200" height="200" viewBox="0 0 200 200">
        <g mask="url(#cut)">
            <image x="0" y="0" height="100%" width="100%" xlink:href="https://picsum.photos/200/200?random=1"></image>
            <circle fill="none" stroke="rgba(0,0,0,0.5)" stroke-width="4" cx="100" cy="100" r="100"></circle>
        </g>
    </svg>
</div>
```

在此基础上，你只需要添加几行 CSS 代码即可实现所要的效果：

```CSS
.avatars {
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar {
    width: 200px;
    height: 200px;
    z-index: var(--index);
}

.avatar:not(:first-child) {
    margin-left: -80px;
}

.mask {
    clip-path: inset(50%);
    position: absolute;
    top: -9999rem;
    left: -9999rem;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ed6b3dbc11a418dbbc80ef13e5ccaf1~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/ZEMmzzz

我们再深入一点，如果用户头像尺寸、`<mask>` 的 `<circle>` 的 `cx` 和 `cy` 等值都是可变的，那么就可以使用 CSS 的自定义属性来定义。比如：

```CSS
.avatar {
    --size: 100px; /* 定义用户头像尺寸大小 */
    width: var(--size);
    height: var(--size);
}

/* 使用定义好的用户头像尺寸 --size 来计算 cx,cy 和 r 的值 */
.avatar-circle {
    cx: calc(var(--size) / 4 * -1);
    cy: calc(var(--size) / 2);
    r: calc(var(--size) / 2);
}

/* 要定义两个头像之间的负边距值，我们需要将 size 除以 5.5  再乘以 -1。 */
.avatar-item {
    margin-left: calc(var(--size) / 5.5 * -1);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b3040e0f6de40ceb9c713eee602f1cd~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/OJoaLKe

你也可以按类似的方法，调整自定义属性参数，构建一个在线的制作工具。这样一来，今后的工作中，你就能快速获取到相关的代码。

## 小结

阅读到这里，我们这节课就要结束了。在这节课中，我们详细介绍了 CSS 和 SVG 结合在一起的裁剪术：

- CSS 的 `clip-path` 可以直接引用 SVG 的 `<clipPath>` 定义的裁剪路径。它能获取到 `clip-path` 中的 `inset()` 、`circle()` 、`ellipse()` 和 `polygon()` 不能提供的剪切路径；
- CSS 的 `mask` 除了使用图片当作遮罩层之外，还可以使用 CSS 的渐变以及两者组合的遮罩层，甚至还可以使用 SVG 的 `<mask>` 作为遮罩层（只是该功能目前仅 Firefox 支持）；
- 独立使用 SVG 的 `<mask>` 功能对元素进行裁剪是最为灵活的，只不过你需要具备一些 SVG 相关的知识。

使用这些裁剪技术，你可以开发出各式各样，包括不规则且线条平滑的 UI 效果，比如下图中的页头效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6f7af5110be4f1d81b56c5b87455a3c~tplv-k3u1fbpfcp-zoom-1.image)