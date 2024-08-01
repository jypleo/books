我们已经花了几节课的篇幅围绕着 Web 图片展开了阐述，但 Web 中使用图片还有很多 CSS 技巧，这些技巧可以帮助 Web 开发者用好图片，给用户更好的体验。在这节课中，我们来聊聊一些很容易被你忽略的可用于 Web 图片的技巧。

## 不要忘了 *-repeat

> **这里的** **`*-repeat`** **指的是 CSS 中的** **`background-repeat`** **和** **`mask-repeat`** ！

在 CSS 中，可以通过 `background-image` 给一个元素引入一张或多张背景图片；也可以通过 `mask-image` 给一个元素引入一张或多张遮罩图片。它们分别是 `background` 和 `mask` 属性的一个子属性，而 `background-repeat` 和 `mask-repeat` 也是 `background` 和 `mask` 的子属性之一，用来控制背景图片和遮罩图片的平铺方式。

就拿背景图片为例吧。`background-repeat` 取值不同时，背景在容器中的平铺方式也将不同，取得的效果也将不同。

简单地说，在元素的背景层设置背景图片时，默认情况下，背景图片会沿着容器的水平和垂直方向重复平铺，以填充整个背景层：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/465d32c142ef4ac7bde1c36c065d5b5d~tplv-k3u1fbpfcp-zoom-1.image)

我们可以显式调整 `background-repeat` 值来改变背景图片在容器背景层中的平铺方式：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0cc69420ec114033b9cbb3f863bfe353~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/abajagw>

接下来，花点时间来看每个不同值所起的作用以及差异。

### repeat

`background-repeat` 取值为 `repeat` 时，相当于是 `repeat repeat` ，表示背景图片会沿着元素背景层的水平方向（`x` 轴）和垂直方向（`y` 轴）重复平铺，直到铺满整个背景层的空间。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d08bffe445b4da3bb5ae9b33b6b7197~tplv-k3u1fbpfcp-zoom-1.image)

设置 `repeat` 值时，如果背景图片的尺寸和元素背景层空间不是倍数比例时，背景图片在最右侧和（或）最底部会被裁剪掉：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00044582ba6248fd9aff8296eb5a04c1~tplv-k3u1fbpfcp-zoom-1.image)

从上图中你可能已经发现了，如果值为 `repeat` 时，背景图片在平铺时，会铺满整个背景层的空间，而且背景图片剪切会一直延伸到元素的 `<border-box>`（延伸到边框的外边缘）。如果你不希望图片按这样的方式来对背景图片裁剪，可以通过 `background-clip` 来改变。

### repeat-x 和 repeat-y

`repeat` 可以根据平铺的方向分为 `repeat-x` 和 `repeat-y` ：

-   当 `background-repeat` 只显式设置 `repeat-x` 时，它相当于 `repeat no-repeat`，只会让背景图片在元素背景层中沿着 `x`轴进行重复平铺；
-   当 `background-repeat` 只显式设置 `repeat-y` 时，它相当于 `no-repeat repeat` ，只会让背景图片在元素背景层中沿着 `y` 轴进行重复平铺。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/672c08fffa4846f1b36d80b685b55dcd~tplv-k3u1fbpfcp-zoom-1.image)

### no-repeat

`no-repeat` 刚好和 `repeat` 相反，表示背景图片在元素背景层中不会被重复平铺：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a599b825f034a019f1ee393d9ac99a8~tplv-k3u1fbpfcp-zoom-1.image)

`background-repeat` 值为 `no-repeat` 时，如果背景图片尺寸小于容器背景层尺寸的话，那么背景图片无法填满整个背景层，在没有显式设置 `background-color` 值（它的初始值为 `transparent`）时，那么位于元素底部的内容就会被透出：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd689255d82c45fe95c0ebc5ac3ae189~tplv-k3u1fbpfcp-zoom-1.image)

反之，如果背景图片尺寸大于或等于容器背景层尺寸时，背景图片会填满整个背景层；当大于容器背景层尺寸时，背景图片还会被裁切掉：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b638d55b2a048b8b2680a6eca315f43~tplv-k3u1fbpfcp-zoom-1.image)

也就是说，`background-repeat` 取值为 `repeat-x`、`repeat-y` 和 `no-repeat` 时，背景图片都有可能不会（背景图片尺寸小于背景层尺寸）填满元素背景层。在这种情景中，它的位置是由 `background-position` 来决定的（默认是`0 0`位置）。

换句话说，`background-position` 的值会调整背景图片在背景层的位置，其实它也会影响 `background-repeat` 属性的其他值，包括接下来要介绍的 `space` 和 `round`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77d0aef3dc4c457ea645fddb975a7815~tplv-k3u1fbpfcp-zoom-1.image)

### space 和 round

`space` 和 `round` 是 `background-repeat` 新增的两个属性值，我想大多数开发者对它们并不了解，甚至从未使用过（其实我自己也很少用到它们），但它们的功能还是很有用处的。这里我们先来看 `space`。

`background-repeat` 取值为 `space` 时，背景图片在容器的背景层重复平铺的方式看上去像 `repeat`，但它有一个最大的特色，即**背景图片不会因为背景层的尺寸（空间）不匹配而被裁切**。换句话说，`space` 会让背景图片按整数倍（`n`）沿着容器背景层的 `x` 和 `y` 轴重复平铺。

-   如果背景层的宽度刚好是背景图片宽度的 `n` 倍，那么背景层的 `x` 轴方向有 `n` 张背景图重复平铺。

-   如果背景层的宽度不是背景图片宽度的 `n` 倍，那么浏览器会确保第一张和最后一张背景图固定在背景层 `x` 轴的最两端，同时每两张背景图之间会有一个空白的间距，这个空白的间距相等的，即 `(容器背景层宽度 - n × 背景图片宽度 ) ÷ (n - 1)`。

    -   假设元素背景层的宽度是 `570px`，背景图片宽度是 `100px`，在背景层 `x` 轴最多可以平铺 `5` 张背景图（因为 `6` 张需要 `6 x 100px = 600px`，无法容纳下），这样一来，相应的 `n` 就等于 `5`，根据相应的公式，可以计算出背景图片之间的间距是：`(570px - 5 × 100px) ÷ (5 - 1) = 17.5px`。

-   如果背景层的高度刚好是背景图片高度的 `n` 倍，那么背景层的 `y` 轴方向会有 `n` 张背景图平铺。

-   如果背景层的高度不是背景图片高度的 `n` 倍，那么浏览器同样会确保第一张和最后一张背景图固定在背景层 `y` 轴的两端，同时每两张背景图之间会有一个空间的间距，这个空白的间距也是相等的，即 `(容器背景层高度 - n x 背景图片高度) ÷ (n - 1)`。

    假设元素背景层的高度是 `246px`，背景图片高度是 `100px`，在背景层 `y` 轴最多可以平铺 `2` 张背景图（因为 `3` 张需要 `3 x 100px = 300px`，无法容纳下），这样一来，相应的 `n` 就等于 `2`，根据相应的公式，可以计算出背景图片之间的间距是：`(246px - 2 × 100px) ÷ (2 - 1) = 46px`。

上述示例中提到的效果，就会像下图所示这样：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09db37623401444293984b3a0c278c51~tplv-k3u1fbpfcp-zoom-1.image)

在 `background-repeat` 中显式设置一个 `space` 值时，它相当于 `space space` 。

前面我们提到过，`background-position` 的取值对 `background-repeat` 的平铺是有一定影响的，不过有一个细节需要注意的是，当 `background-repeat` 取值为 `space`，只有一个图片（或单行，或单列）无裁切地显示时，才会受 `background-position` 影响，否则 `background-position` 属性会被忽视。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/648fa0b20c14404db42cf0baf7a7b37b~tplv-k3u1fbpfcp-zoom-1.image)

另外，当 `background-repeat` 值为 `space` 时，只在一种情况下裁剪会发生，那就是图片太大了以至于没有足够的空间来完整显示一个图片。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83674a5b6a3b412f83511978b3c0350d~tplv-k3u1fbpfcp-zoom-1.image)

从渲染的结果上来看，`round` 是最接近 `repeat` 的。如果 `background-repeat` 取值为 `round` 时，背景图片会沿着元素背景层的 `x` 轴和 `y` 轴重复平铺，直到铺满整个背景层。它和 `repeat` 最大的差异**是** **`round`*** *会根据元素背景层尺寸和背景图的尺寸做一个自适应处理**。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f7b94396f7e443eb67a4c0443e44834~tplv-k3u1fbpfcp-zoom-1.image)

随着允许的空间在尺寸上的增长，被重复平铺的背景图片会伸展（不会像 `space` 留有空隙），直到有足够的空间来添加一个图片。当下一个图片被添加后，当前所有的图片会被压缩来腾出空间。

简单地说，`round` 会根据元素容器层尺寸和背景图片尺寸（以 `background-size` 设置的为准，如果未显式设置 `background-size`，将会以背景图片的原始尺寸为准）做取整计算，类似 JavaScript 的 `Math.floor()` 函数，向下取整。

来看一个简单的示例，当元素背景层的尺寸为 `624px x 277px`，背景图片的尺寸为 `100px x 100px`（显式使用 `background-size: 100px 100px` 重置背景图片尺寸），那么：

```
// » x轴 » 沿着元素背景层 x 轴方向（水平方向） 
624 ÷ 100 = 6.24 » Math.floor(624 / 100) = 6 
​
// » y轴 » 沿着元素背景层 y 轴方向（垂直方向） 
277 ÷ 100 = 2.77 » Math.floor(277 / 100) = 2 
```

即水平方向（`x`）会铺放 `6` 张；垂直方向（`y`）会铺放 `2` 张，如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7177eb2d468144f3808c79cda75e4472~tplv-k3u1fbpfcp-zoom-1.image)

注意，平铺之后的背景图尺寸不再是 `100px x 100px`（`background-size` 显式设置的值），因为浏览器的渲染引擎会重新计算背景图片的尺寸（根据 `background-size` 的计算规则计算出来的）。

就我们这个示例而言，相当于 `background-size: calc(100% / 6) calc(100% / 2)`。此时，重新计算尺寸之后的背景图片有可能会扭曲变形（宽高比例不一致）。要是观察仔细的话，上图中的背景图片就有点挤压变形了。

更有意思的是，当背景图片尺寸大于元素背景层尺寸，并且没有显式使用 `background-size` 重置背景图片尺寸（初始尺寸）时，`round` 依旧会让背景图片重新计算尺寸来填满元素背景层，确保背景图不会被裁剪。**`round`** **始终能确保背景图在平铺过程中不被裁剪，即使只有一张的时候也是如此**！

不过，`round` 并不是说，完全会让背景图片填充满整个背景层，在某些情况之下，是会留白的，它的表现形为有点类似于 `background-size` 的 `contain` 行为。这并不能说这种现象是错误的，反而能说它的表现行为是对的。因为 `round` 值在计算的时候，就是按照 `background-size` 规则计算的。

> 注意，上述运用于 `background-repeat` 的值表现，同样也适用于 `mask-repeat` ！

现在，我想你对 `background-repeat` （或 `mask-repeat`）有了一定的认识。但在 Web 开发的过程当中，我们有的时候并不知道使用的背景图片尺寸（它的尺寸有可能大于背景层尺寸，也有可能小于背景层尺寸）。

而且，大部分 Web 开发者都没有习惯去查看背景图片运用于大容器背景层中的结果。比如，当你使用尺寸比较大的图片作为背景图片时，你不会习惯性地去检查一下页面在大屏幕上的展示效果。如此一来，就很有可能留下一个坑。

通过上面的内容，我们都知道，`background-repeat` 的默认值是 `repeat`，即**默认情况之下，背景图片会在容器背景层中沿着** **`x`** **轴和** **`y`** **轴进行平铺**。由于笔记本电脑的屏幕较小（造成容器背景层尺寸较小），背景图片重复平铺的概率就很小；但在更大屏幕上，元素的尺寸可能随之变大，此时背景图片就有可能会在容器背景层重复平铺：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/190e886dc5b84ff589fae265a2c2475d~tplv-k3u1fbpfcp-zoom-1.image)

为了避免这种情况，我们需要显式设置 `background-repeat` 的值为 `no-repeat`:

```
.hero { 
    background-image: url('..'); 
    background-repeat: no-repeat; 
} 
```

注意，如果你在开发过程中，使用 CSS 的 `mask` 属性，那么这样的现象也会出现在 `mask-repeat` 上，需要将其设置为 `no-repeat`：

```
.hero { 
    mask-image: url('..'); 
    mask-repeat: no-repeat; 
} 
```

这样做虽然消除了背景平铺的现象，但也可能引来新的现象，比如背景图片无法填满整个容器的背景层。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7db90b47965846b1a8db08e6727f4f9b~tplv-k3u1fbpfcp-zoom-1.image)

因此，为了不影响 Web 应用（或页面）的美感，你应该还需要考虑使用 `background-size` 和（或）`background-position` 来调整背景图片尺寸和位置：

```
.element {
    background: url('...') no-repeat;
    background-position: center; /* 背景图片在容器背景层中心位置，在容器背景层中水平垂直居中 */
    background-size: cover;      /* 背景图片保留固定比例，并覆盖整个容器的背景层 */
}
```

## 背景图片吸附的黑魔法

这里所说的背景图片吸附指的是 `background-attachment` 如何控制背景图片（背景图层的背景图片）固定位置的行为。

在 CSS 中，如果显式使用 `background-image` 指定了背景图片（`<image>`），那么 `background-attachment` 属性将指定它们是相对于视口固定（`fixed`）还是随元素滚动（`scroll`）或相对于元素的内容是固定的（`local`）。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1e86e70494744309577f82ceb571726~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/eYLjPxV>

相对而言，`fixed` 使用的频率要更少。除此之外，有很多平台至今都对 `background-attachment: fixed` 不支持，尤其是在移动端上。这是因为，**固定背景导致重绘的成本很高，并且滚动表现也不尽人意，所以在一些移动端是被禁止的**。

虽然 `background-attachment` 属性很少运用 `fixed` 值，但当 `background-attachment` 取值为 `fixed` 时，可以帮助我们构建一些有创意的 Web 效果，比如视差滚动效果。

```
<section class="fixed-background img-1"> 
    <div class="content"> 
        <h2>Title here</h2> 
        <p>Lorem ipsum dolor sit amet, ...</p> 
    </div> 
</section> 
<section class="fixed-background img-2"> 
    <!-- ... --> 
</section>
.fixed-background { 
    --bg-image: url("https://picsum.photos/2016/1642?image=10"); 
    --start-color: #09f; 
    --stop-color: #90f; 
    background-position: center; 
    background-size: cover; 
    background-image: linear-gradient( to bottom, var(--start-color), var(--stop-color) ), var(--bg-image); 
    background-attachment: fixed; 
    background-blend-mode: overlay, exclusion; 
} 
​
.img-1 { 
    --start-color: #00deff; 
    --stop-color: #ff8c00; 
    --bg-image: url("https://picsum.photos/2016/1642?image=10"); 
} 
​
.img-2 { 
    --start-color: #111340; 
    --stop-color: #4800ff; 
    --bg-image: url("https://picsum.photos/2016/1642?image=20"); 
} 
​
.img-3 { 
    --start-color: #7c87a8; 
    --stop-color: #ff0028; 
    --bg-image: url("https://picsum.photos/2016/1642?image=30"); 
} 
​
.img-4 { 
    --start-color: #84a87c; 
    --stop-color: #1b6571; 
    --bg-image: url("https://picsum.photos/2016/1642?image=40"); 
} 
​
.img-5 { 
    --start-color: #5d4012; 
    --stop-color: #5d912a; 
    --bg-image: url("https://picsum.photos/2016/1642?image=50"); 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e94a12356fa405ab4bdf7f4bcd53ff7~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/qBMyJGg>

**用** **`background-attachment:fixed`** **并不受欢迎** 。

[@Murtuzaali Surti ](https://twitter.com/murtuza_surti)在 CSS-TRICKS 上发表过关于这个话题的一篇博文《[The Fixed Background Attachment Hack](https://css-tricks.com/the-fixed-background-attachment-hack/)》。详细地阐述了为什么 `background-attachment:fixed` 在移动端上渲染的时候存在问题以及如何使用CSS 黑魔法来实现类似 `background-attachment:fixed` 的效果。

@Murtuzaali Surti 在文中录制了相关的视频，向大家展示 `background-attachment:fixed` 在移动端渲染时的效果（并不是我们想要的）：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2cb7efbcd7c4919ac3c8815ffa822c1~tplv-k3u1fbpfcp-zoom-1.image)

> **渐变只是与其他内容一起滚动然后跳回来** ！

另一个需要注意的有趣的事情是，当 `background-attachment: fixed` 应用时，**即使我们明确指定了高度，它也会被忽略**。这是因为 `background-attachment` 计算固定背景的位置是相对于视口计算。 即使在 `body` 上显式设置 `height` 为 `100vh`，`background-attachment: fixed` 渲染出来的效果也不完全符合。

其中原委并不知。但有这样的一种观点：“**也许原因是** **`background-attachment: fixed`** **依赖于最小的视口，而元素依赖于最大的视口** ”。

[@David Bokan](https://developer.chrome.com/blog/url-bar-resizing/) 曾经这样说过：

> Lengths defined in viewport units (i.e. vh) will not resize in response to the URL bar being shown or hidden. Instead, vh units will be sized to the viewport height as if the URL bar is always hidden. That is, vh units will be sized to the “largest possible viewport”. This means 100vh will be larger than the visible height when the URL bar is shown.

大致意思是，“以视口单位（即 `vh`）定义的长度不会响应 URL 栏的显示或隐藏。相反， `vh` 单位将根据视口高度调整大小，就好像 URL 栏始终处于隐藏状态一样。也就是说， `vh` 单位将被调整为“最大可能的视口”。这意味着 `100vh` 将大于显示 URL 栏时的可见高度。”

其实[这些问题在 Caniuse 上也有相应的描述](https://caniuse.com/background-attachment)：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/40df73e61d0546299036069b97bd4a69~tplv-k3u1fbpfcp-zoom-1.image)

如果你碰到这个问题，在业务场景中又需要这样的效果，那么我们可以考虑下面这样的 Hack 手段来实现类似 `background-attachment:fixed` 的效果：

```
<div class="bg"></div> 
<div class="content"></div> 
.bg { 
    background: linear-gradient(335deg, rgba(255,140,107,1) 0%, rgba(255,228,168,1) 100%); 
    background-repeat: no-repeat; 
    background-position: center; 
    height: 100vh; 
    width: 100vw; 
    position: fixed; 
    z-index: -1; /* 可选项 */ 
} 
​
.content{ 
    position: absolute; 
    margin-top: 5rem; 
    left: 50%; 
    transform: translateX(-50%); 
    width: 80%; 
} 
```

> 注意，这段代码来自 [@Murtuzaali Surti](https://css-tricks.com/the-fixed-background-attachment-hack/)。

最终效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b7288021526443bbf0cb18970626060~tplv-k3u1fbpfcp-zoom-1.image)

效果已经很完美了。但上面的 CSS 代码我们还可以进一步的优化，我们可以使用伪元素 `::before` 或 `::after` 来替代 `.bg`：

```
<div class="content"></div>
.content { 
    width: 80%; 
    margin: auto; 
} 
​
body { 
    position: relative; 
} 
​
body::before { 
    content: ''; 
    background: linear-gradient(335deg, rgba(255,140,107,1) 0%, rgba(255,228,168,1) 100%); 
    background-repeat: no-repeat; 
    background-position: center; 
    height: 100vh; 
    width: 100vw; 
    position: fixed; 
    z-index: -1;
 } 
```

上面代码还可以进一步优化，只在移动端上使用伪元素定位：

```
body{ 
    background-image: url(image.png); 
    background-size:cover; 
    background-attachment:fixed; 
} 
​
/* 移动端响应*/ 
@media screen and (max-width:767px){ 
    body{ 
        background-position: -99999px -99999px; /* 移出可视区，也可以将其background-size设置为0 */ 
    } 
    
    body::before { 
        content: ""; 
        background-image: inherit; 
        position: fixed; 
        inset:0; 
        height: 100vh; 
        width: 100vw; 
        background-size: cover; 
        z-index: -1; 
    } 
} 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d311b26dc36048fda03ee43fa2003d1f~tplv-k3u1fbpfcp-zoom-1.image)
> Demo 地址：<https://codepen.io/airen/full/BaOPGKp>

简单地说，你在实际开发过程中，需要使用背景图片吸附时，建议使用伪元素的固定定位来替代，这样实现出来的效果更具兼容性。

## 为什么背景定位需要新特性？

在 CSS 中，我们可以使用 `background-position` 属性来指定背景图片在容器背景层的起始位置：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8fa31cfb6ca4921b01abd9a4ce42ead~tplv-k3u1fbpfcp-zoom-1.image)

大部分 Web 开发者只习惯（或只知道）于 `background-position` 属性设置一个或两个值：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e17ec3789b3b498dafcfbea2db396e0f~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/wvExQqe>

事实上，`background-position` 属性还可以指定三个值或四个值。当 `background-position` 属性指定三个值或四个值时，和前面所介绍的一个值或两个值还是有很大差异的。

我们首先来看 `background-position` 属性指定三个值。

`background-position` 同时使用三个关键词时，会被浏览器视为无效的 CSS 声明，比如：

```
 /* 无效样式规则 */ 
 .element { 
     background-position: left top center; 
 } 
```

`background-position` 使用三个值时，往往是将 `<length-percentage>` 和两个关键词组合在一起使用：

```
.element { 
    background-position: <keyword> <length-percentage> <keyword>; 
    background-position: <keyword> <keyword> <length-percentage>; 
 } 
 
 <keyword> = top | right | bottom | left 
```

即：

```
.element { 
    background-position: left 30% top; 
    background-position: right 30% bottom; 
    background-position: left top 30%; 
    background-position: right bottom 30%; 
}
```

也就是说，当 `<length-percentage>` 是 `background-position` 的第二个值时，它表示第一个值的偏移量，也就是水平方向（`x` 轴）的偏移：

```
.element { 
    background-position: left 30% top; 
} 
```

示例中的 `30%` 表示背景图片最左侧边缘距离背景层最左侧边缘的距离是 `30%`。

```
 .element { 
     background-position: right 300px bottom; 
} 
```

示例中的 `300px` 表示背景图片最右边距离背景层最右侧边缘的距离是 `300px`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/13aa8e7251234b3891cd98c6c19bc5b6~tplv-k3u1fbpfcp-zoom-1.image)

当 `<length-percentage>` 是 `background-position` 的第三个值时，它表示第二个值的偏移量，也就是垂直方向（`y`轴）的偏移：

```
 .element { 
     background-position: left top 30%; 
 } 
```

示例中的 `30%` 表示背景图片顶部边缘距离背景层顶部边缘的距离是 `30%`。

```
.element { 
    background-position: right bottom 300px; 
} 
```

示例中的 `300px` 表示背景图片最底部边缘距离背景层底部边缘的距离是 `300px`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d9b277446634cfaaef3c0dd1b9b8ec0~tplv-k3u1fbpfcp-zoom-1.image)

`background-position` 属性取两个关键词和一个 `<length-percentage>` 组合时，`<length-percentage>` 不要置于关键词前面，否则会被视为无效值：

```
 /* 无效 CSS 规则 */
 .element { 
     background-position: <length-percentage> <keyword> <keyword> 
 } 
 
 <keyword> = top | right | bottom | left
```

例如，浏览器将会视下面这个样式规则为无效的：

```
/* 无效 CSS 规则 */
.element { 
    background-position: 40em left top; 
}    
```

上面所示的示例用到的关键词都是围绕着 `top`、`right`、`bottom` 和 `left` 展开的。除了这四个关键词之外，还有 `center` 关键词。`background-position` 取三个值时，其中使用到关键词 `center` 时，后面不能紧跟 `<length-percentage>`，不然该规则也会被视为无效：

```
/* 无效 CSS 规则 */ 
.element { 
    background-position: center <length-percentage> <top | center | bottom>; 
    background-position: <left | center | right> center <length-percentage>; 
}    
```

但像下面这样使用是有效的：

```
.element { 
    background-position: <top | right | bottom | left>  <length-percentage> center; 
    background-position: center <top | right | bottom | left> <length-percentage> 
}    
```

比如：

```
.element { 
    background-position: center right 30%;  /* x » right 30%, y » center */ 
    background-position: center left 30%;   /* x » left 30%, y » center */ 
    background-position: center bottom 30%; /* » center, y » bottom 30% */ 
    background-position: center top 30%;    /* x » center, y » top 30% */ 
    background-position: bottom 30% center; /* x » center, y » bottom 30% */ 
    background-position: top 30% center;    /* x » center, y »  top 30% */ 
    background-position: right 30% center;  /* x » right 30%, y » center */ 
    background-position: left 30% center;   /* x » left 30%, y » center */ 
}
```

简单地说，`background-position` 属性取三个值时，在关键词 `center` 之后不能紧跟 `<length-percentage>`值，否则会被视为无效声明！ 前面说了，`background-position` 属性使用三个值时，如果三个都是关键词，那么它将是一个无效声明，除此之外，一个关键词和两个 `<length-percentage>` 值组合也会被视为无效声明：

```
 .element { 
     background-position: <length-percentage> <keyword> <length-percentage>; 
     background-position: <keyword> <length-percentage> <length-percentage>; 
     background-position: <length-percentage> <length-percentage> <keyword>; 
 } 
```

这样一来，`background-position` 取三个值时，像下面这样使用的话，都会被浏览器视为无效样式规则：

```
.element { 
    /* 三个值都是关键词组合 */ 
    background-position: <keyword> <keyword> <keyword>; 
    
    /* <length-percentage> 不能置于两个关键词的前面 */ 
    background-position: <length-percentage> <keyword> <keyword>; 
    
    /* center关键词后面不能紧跟<length-percentage>值 */ 
    background-position: center <length-percentage> <keyword>; 
    background-position: <keyword> center <length-percentage>; 
    
    /* 一个关键词和两个<length-percentage>值组合 */ 
    background-position: <length-percentage> <keyword> <length-percentage>; 
    background-position: <keyword> <length-percentage> <length-percentage>; 
    background-position: <length-percentage> <length-percentage> <keyword>; 
} 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/21c3144c988648cea0add6ef5c2ec5a7~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/wvExQEP>

`background-position` 指定四个值时要比指定三个值简单得多。`background-position` 在设置四个值的时候，一般是两个关键词与两个 `<length-percentage>` 值组合在一起使用。比如：

```
.element { 
    background-position: <keyword> <length-percentage> <keyword> <length-percentage> 
 } 
 
 <keyword> = top | right | bottom | left
```

例如：

```
.element { 
    background-position: top 30px right 50px;   /* x » right 50px, y » top 30px */ 
    background-position: top 30% left 50%;      /* x » left 50%,   y » top 30% */ 
    background-position: bottom 30px right 40vh;/* x » right 40vh, y » bottom 30px */ 
    background-position: bottom 30vh left 40%;  /* x » left 40%,   y » bottom 30vh */ 
    background-position: left 40px top 50%;     /* x » left 40px,  y » top 50% */ 
    background-position: left 40vh bottom 50px; /* x » left 40vh,  y » bottom 50px */ 
    background-position: right 50px top 30%;    /* x » right 50px, y » top 30% */ 
    background-position: right 40% bottom 20px; /* x » right 40%, y » bottom 20px */ 
}     
```

第一个值和第三个值是关键词 `top` 、 `right` 、`bottom` 和 `left` 之一，第二个和第四个值是 `<length-percentage>`，其中第二个值 `<length-percentage>` 是用来设置第一个值偏移量的，第四个值是用来设置第三个值的偏移量。

在使用关键词时，不能同时出现同一方向的值，比如 `left` 和 `right` ，或者 `top` 和 `bottom` 同时出现，否则样式规则会被视为无效规则：

```
/* 无效 CSS 规则 */
.element { 
    background-position: top 50px bottom 30px; 
    background-position: left 50% right 10px; 
}
```

另外，`background-position` 取四个值时，关键词不能是 `center`，否则也会被视为无效样式规则：

```
/* 无效 CSS 规则*/
.element { 
    background-position: center 50px top 50px; 
    background-position: center 50% bottom 30px; 
    background-position: left 30px center 40px; 
    background-position: right 30px center 40%; 
}
```

`background-position` 取四个值时，`<length-percentage>` 一定是跟随在 `<keyword>` 关键词之后，如果 `<length-percentage>` 放置在 `<keyword>` 之前，那么样式规则同样会被视为无效规则：

```
/* 无效 CSS 规则 */
 .element { 
     background-position: <length-percentage> <keyword> <length-percentage> <keyword> 
 } 
 
 <keyword> = top | right | bottom | left 
```

比如：

```
 /* 无效 CSS 规则*/
 .element { 
     background-position: 20px left 40% top; 
 } 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1d9b2555e4344d7b5d1afa1fa0843c5~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/oNPMQRL>

你可能会感到好奇，`background-position` 指定一个值或两个值就可以很好地设置背景图片在容器背景层中的位置了。那么，为什么还需要新增三个值和四个值的新特性呢？或者说，Web 开发者应该在什么时候使用三个值或四个值？

解答这个疑惑也并不难。CSS 的 `background-position` 属性最初只提供了一个值或两个值的语法规则，不管是一个值还是两个值，它们的作用都是用来设置背景图片在背景层中的位置。而且都是以左上角为相对计算的起始点。

也就是说，元素背景层有一个左顶点（`0 0` 位置），背景图片也有一个原始点，默认也是 `0 0` 位置，两个顶部之间产生的间距就是背景图片在元素背景层中的位置（`x` 和 `y` 轴的偏移值）。比如：

```
.element { 
    background-position: 100px 200px; 
} 
```

示例代码告诉我们，背景图片原点距离元素容器层原点，水平方向（`x` 轴）是 `100px`，垂直方向（`y` 轴）是 `200px`，如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07acd735fafc4bfbaf75e74d70c716f3~tplv-k3u1fbpfcp-zoom-1.image)

相当于背景图片从最左侧向右移了 `100px`，同时从最顶部向下移了 `200px` 。这对于距离左侧和距离顶部定位背景图片是很方便的。

不过，在实际开发中，很多时候，我们除了希望除距离左顶点来定位背景图片之外，还希望能根据其他几个顶点来定位背景图片，比如容器背景层的右上角、右下角和左下角等。比如下面这样的一个场景，我们希望背景图片最右侧边缘和最底部边缘距元素背景层右侧边缘和底部边缘分别是 `100px` 和 `200px`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8736f4cad5c42cfa932ec527e7ae58c~tplv-k3u1fbpfcp-zoom-1.image)

以往要实现这样的背景定位是有点让人头痛的。最早期 CSS 的 `calc()` 还未得到浏览器支持的时候，开发者需要知道元素大小、背景图片大小，然后根据这些尺寸去计算出背景图片距离左侧边缘和距离顶部边缘的大小。有了 `calc()` 之后，事情稍微变得简单些。

从 `background-position` 的基础知识中我们可以知道，背景图片在定位的时候，可以使用 `100% 100%` 或 `right bottom` 将背景图片放在背景层的右下角，这个时候，使用 `calc()` 函数，从中减去需要偏移的量，即：

```
.element { 
    background-position: calc(100% - 100px) calc(100% - 200px); 
} 
```

使用 `background-position` 新特性，可以更简单地实现上面的效果，我们可以使用 `right 100px` 和 `bottom 200px` 来告诉浏览器，背景图片需要从背景层最右侧边缘向左偏移 `100px`，最底部边缘向上偏移 `200px`：

```
.element { 
    background-position: right 100px bottom 200px 
} 
```

相当于移动了定位的坐标，从开始的左上角变成了右下角：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/003c44917801447ba0e464963e510e0a~tplv-k3u1fbpfcp-zoom-1.image)

这也意味着，`background-position` 新特性，开发者可以根据需要，指定背景图片另一侧边缘与背景层相应边缘之间的偏移量，比如：

-   `top <length-percentage>`，背景图片顶部边缘与背景层顶部边缘之间的偏移量是 `<length-percentage>`；
-   `right <length-percentage>`，背景图片右侧边缘与背景层右侧边缘之间的偏移量是 `<length-percentage>`；
-   `bottom <length-percentage>`，背景图片底部边缘与背景层底部边缘之间的偏移量是 `<length-percentage>`；
-   `left <length-percentage>`，背景图片左侧边缘与背景层左侧边缘之间的偏移量是 `<length-percentage>`。

换句话说，在新特性中，运用于 `background-position` 属性中的关键词（`top`、`right`、`bottom` 和 `left`）不再仅仅是用来计算背景图片的定位位置信息（坐标点），还可以用来指定背景图片的偏移原点，比如上面示例中 `right 100px bottom 200px`，就把偏移原点变成了右下角。

那么，这些关键词具体的含义和所起的作用应该根据其使用的场景来决定。

-   `top`：如果给出一个值或两个值，则用于计算背景图片的位置（垂直距离），计算值为 `0%`，比如 `background-position: top` 或 `background-position: left top`；否则将顶部边缘指定为下一个偏移的原点，比如 `background-position: left top 20%` 或 `background-position: left 20px top 200px`。
-   `right`：如果给出一个或两个值，则用于计算背景图片的位置（水平距离），计算值为 `100%`，比如 `background-position: right` 或 `background-position: right top`；否则将右边缘指定为下一个偏移的原点，比如 `background-position: right 100px top` 或 `background-position: right 100px bottom 200px`。
-   `bottom`：如果给出一个或两个值，则用于计算背景图片的位置（垂直距离），计算值为 `100%`，比如 `background-position: bottom` 或 `background-position: right bottom`；否则将底部边缘指定为下一个偏移的原点，比如 `background-position: left bottom 100px` 或 `background-position: left 10% bottom 30vh`。
-   `left`：如果给出一个或两个值，则用于计算背景图片的位置（水平距离），计算值为 `0%`，比如 `background-position: left` 或 `background-position: left bottom`；否则将左边缘指定为下一个偏移的原点，比如 `background-position: left 20px bottom` 或 `background-position: left 20vw top 30%`。

简单地说，关键词 `top`、`right`、`bottom` 和 `left` 用于 `background-position` 时，如果 `background-position` 只有一个值或两个值，那么它们则用于计算图片的位置；反之，`background-position` 有两个以上（三个或四个）值时，它们则用于指定偏移原点，不被计算为 `0%` 或 `100%`。

注意，`center` 关键词与它们不一样，它只能被用于计算位置，计算值为 `50%`，而且当 `background-position` 的值为 `center` 或 `center center`时，表示背景图片在背景层中是垂直居中的，此时，背景图片的中心原点和背景层的中心原点是重叠的。

既然和大家聊到了 `background-position` 属性，那么这里再多提一嘴，即 `background-position` 取百分比（`%`）值的计算方式。`background-position` 取百分比值时，会同时考虑容器的尺寸和背景图片的尺寸，即相对于两者尺寸做计算。

[W3C规范中是这样描述的](https://www.w3.org/TR/css3-background/#the-background-origin)：

> A percentage for the horizontal offset is relative to (width of background positioning area - width of background image). A percentage for the vertical offset is relative to (height of background positioning area - height of background image), where the size of the image is the size given by ‘background-size’.

简单地说，当背景图片尺寸（`background-size`）不做任何的重置（也就是`100% 100%`）时，水平百分比的值等于容器宽度百分比值减去背景图片宽度百分比值。垂直百分比的值等于容器高度百分比值减去背景图片高度百分比值。

即 `background-position` 取值为百分比值（`%`）时，它会先从相应的容器尺寸中减去背景图片尺寸，然后将结果值的百分比用作距左边界（或顶部）的直接偏移量。相应的计算公式如下：

```
(容器宽度 - 背景图片宽度) x (background-position-x设置的百分比值) = background-position-x 的计算值 
(容器高度 - 背景图片高度) x (background-position-y设置的百分比值) = background-position-y 的计算值 
```

即：

-   水平方向（`x` 轴），即 `background-position-x` 的 `%` 值是相对于元素的 `width` 与背景图片的 `width` 差计算；
-   垂直方向（`y` 轴），即 `background-position-y` 的 `%` 值是相对于元素的 `height` 与背景图片的 `height` 差计算。

特别声明，背景图片的大小将会受 `background-size` 值的影响，上面提到的图片的尺寸是指 `background-size` 的值为 `auto` 的情景下的尺寸，即背景图片的初始尺寸（原始尺寸）。 比如下面这个示例：

```
.element { 
    width: 500px; 
    height: 300px; 
    background-position: 70% 30% 
} 
```

在 `.element` 中使用像下面这样的一张背景图（图片原始尺寸：`280px x 180px`）：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dce1ceb41a6a4fa6b8f5fe7bfa18508e~tplv-k3u1fbpfcp-zoom-1.image)

按照上面所说的：

```
background-position-x: 70% ⇒ (500px - 280px) x 70% = 154px 
background-position-y: 30% ⇒ (300px - 180px) x 30% = 36px 
```

效果如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85891baadb994d1ebe40f89617fb3e5a~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/RwYBEoj>

## border-radius 对背景绘制区域的影响

从《[你不知道的 border-radius ](https://juejin.cn/book/7199571709102391328/section/7199845563389444099)》一节课中，我们可以获知，当元素设置了边框（`border-width`）和内距（`padding`）时，会触发嵌套圆角（`border-radius`）的现象。它会产生外圆和内圆角：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66b62fc7b51846688a4d31519d62743f~tplv-k3u1fbpfcp-zoom-1.image)

你可以给任何一个元素的每个方向设置不同的边框和内距尺寸，如果 `border-radius` 和它们产生的差值大于 `0` 就会产生内部圆角，而且圆角的半径就等于其差值。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/352b2647e6964b9f929f5a277b12664f~tplv-k3u1fbpfcp-zoom-1.image)

我们已然知道，背景图片可以绘制在边框区域（`<border-box>`）和内距区域（`<padding-box>` ）以及内容区域（`<content-box>`）。正如上图所示，当元素显式设置了 `border-radius` 时，就有可能会对背景的绘制区域产生相应的影响。

众所周知，圆角是由 `border-radius` 决定的（外圆角），而内距区域（`<padding-box>`）的圆角（内圆角）是由 `border-width` 和 `border-radius` 差值决定的。[@Ana Tudor 在 Codepen 上制作了一个 Demo](https://codepen.io/thebabydino/full/ZNeRbZ)，可以通过平面和3D状态来查看 `border-radius` 在这三种盒子框中，半径是如何计算的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a5e97ce2cce4e188deabc61b5ebc401~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/NWLBege>

如果将背景运用进来，并且调整同不同的 `border-width`、`padding` 和 `border-radius`，`background-clip` 在不同盒子框中的绘制效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46bd9f5e54a247d7a513ac0e515a9655~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/NWLBeve>

## 多背景的堆叠顺序

熟悉 CSS 层叠上下文的同学都知道，当元素触发了层叠上下文时，[可以使用 z-index 来控制它的层叠顺序](https://juejin.cn/book/7199571709102391328/section/7204402059225858052)。在同一个元素使用多背景时，它也会发生堆叠，只不过它的顺序不能使用 `z-index` 来控制，或者有一个类似 `background-index` 这样的属性。

多背景中的堆叠顺序是依赖于背景层出现的先后顺序来决定的，越早出现越在上面。或者说根据向右原则来判断，越靠左的越在上面，越靠右则越在下面。比如上面的示例：

```
 body { 
     background: 
         var(--cake) center bottom 55vh / 20vh auto no-repeat, 
         #557 var(--desk) center bottom / 80vh 80vh no-repeat; 
} 
```

最先出现的是 `--cake`（蛋糕）背景层，接着是 `--desk`（桌子）背景层，因此“蛋糕”（`--desk`）背景层是在“桌子”（`--desk`）背景层上面，最底下则是背景颜色（如果有的话）：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1306a452f2ce40db921d3441ea2c7f30~tplv-k3u1fbpfcp-zoom-1.image)

反过来，把上面的代码调整一下：

```
 body { 
     background: 
         var(--desk) center bottom / 80vh 80vh no-repeat, 
         #557 var(--cake) center bottom 55vh / 20vh auto no-repeat; 
} 
```

现在最先出现的是 `--desk`（桌子）背景层，接着是 `--cake`（蛋糕）背景层，因此“桌子”（`--desk`）背景层是在“蛋糕”（`--cake`）背景层上面，最底下则是背景颜色 `#557` 层：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe03e42b9fe548cbb863ae302b2db572~tplv-k3u1fbpfcp-zoom-1.image)

也就是说，多背景的堆叠顺序是像下图这样：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50347b7a094242f19758ed6b87a794b9~tplv-k3u1fbpfcp-zoom-1.image)

使用多背景时，如果多个背景的大小相同，位置也相同，则其中一个将覆盖另一个背景；如果第一个背景图片尺寸大于或等于容器尺寸，则会覆盖其他背景，在整个容器中只能看到一个背景。

> 注意，在 `mask` 中也可以使用多个遮罩图片，在使用多个遮罩图时，它的堆叠顺序和 `background` 是相似的。

## 可用于 background-image 的新函数

可用于 `background-image` 属性上，除了 `url()` 和 `<gradient>` （[渐变图片](https://juejin.cn/book/7199571709102391328/section/7199845781149810727)）之外，还可以使用 `image()` 、`element()` 和 `cross-fade()` 函数。这些新函数将会给 `background-image` 带来你所不熟悉的作用。

### image() 函数

`image()` 函数除了可以像 `url()` 一样给 `background-image` 设置值之外，还有着自己特殊的能力，比如：

-   **双向感知** ：指定图片的方向性，[类似于 HTML 元素的 dir 或 CSS 的 direction 特性](https://juejin.cn/book/7161370789680250917/section/7161625525763440647) ；
-   **图片片段** ：能够将媒体片段标识符添加到图片源上，只显示源图片的一部分，模仿 CSS Sprites（雪碧图）的方式 ；
-   **颜色回退** ：指定一个纯色作为回退，以防图片加载失败或没有图片可渲染；
-   **图片类型查询** ：根据浏览器的支持加载不同的类型的图片，类似于 `image-set()` 函数中的 `type()` 功能。

先来看双向感知。

Web 排版（或者说布局）时会因为语言不同，其阅读方式也会有所不同，常见的有 `ltr` （英文，中文）或 `rtl`（阿拉伯文或希伯来语）。

```
<ul> 
    <li dir="ltr" lang="en">Bullet is a right facing arrow on the left</li> 
    <li dir="rtl" lang="ar">الرمز النقطي هو سهم مواجه ↢ لليمين على اليسار</li> 
</ul>
```

如果给 `li` 添加标识符（可以使用 `list-style-image`，也可以使用 `background-image`，还可以使用伪元素 `::marker` 来设置），这里我们使用 `background-image` 。它的效果可能像下图这样：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a32e13678fe44e5a982fcd4bedddd47~tplv-k3u1fbpfcp-zoom-1.image)

以往要实现上图这样的效果，可能会使用两张图片：

```
li[dir="ltr"] { 
    background-image: url(ltr-arrow.png); 
} 
​
li[dir="rtl"] { 
    background-image: url(rtl-arrow.png); 
}
```

或者基于伪元素 `::before`、`::after` 或 `::marker` 做水平翻转：

```
li::before { 
    content: "↣"; 
} 
​
li[dir="rtl"]::before { 
    transform: scaleX(-1); 
    display: inline-flex; 
} 
```

如果我们使用 `image()` 函数实现上图的效果就会显得很容易：

```
li { 
    background-image: image(ltr 'arrow.png') 
}
```

在《[如何提高图片上文本可读性？](https://juejin.cn/book/7199571709102391328/section/7199845718343811076)》一文中，我们介绍了多种方法来提高图片上文本的可读性。这样做的原因之一就是，**防止图片加载失败影响文本的可读性**。以往的做法是，在 `img` 或背景图片下加一个 `background-color` ，比如：

```
img { 
    background-color: #444; 
} 
​
.element { 
    background-color: #444; 
    background-image: url('../images/black.png'); 
    color: #fff; 
} 
```

而 `image()` 函数就具备这样的能力：

```
 .element { 
     background-image: image("../images/black.png", #444); 
     color: #fff; 
 } 
```

当图片 `black.png` 加载失败或无法正常渲染时，将会把 `#444` 当作一个纯色和图片作为备用图片（相当于 `linear-gradient(to top, #444, #444)` 绘制的线色图片），这样就可以确保文本仍然可阅读。

我们还可以利用该特性，像 `<gradient>` 一样绘制纯色的图片：

```
.element { 
    background-image: image(rgb(0 0 0)); 
    
    /* 等同于 */ 
    background-image: linear-gradient(to bottom, rgb(0 0 0), rgb(0 0 0)); 
} 
```

还可以绘制带有一定透明度的纯色图片：

```
 .element { 
     background-image: image(rgb(0 0 0 / .5)); 
     
     /* 等同于 */ 
     background-image: linear-gradient(to bottom, rgb(0 0 0 / .5), rgb(0 0 0 / .5)); 
 } 
```

这样一来，[我们就又多了一种处理图片上文字效果的技术方案](https://juejin.cn/book/7199571709102391328/section/7199845718343811076)：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d394cdc0bdb4f36add494e02145ce03~tplv-k3u1fbpfcp-zoom-1.image)

上图中带透明的纯色层，就可以使用 `image()` 函数来实现，只不过，需要和 CSS 多背景结合起来一起使用：

```
.element { 
    background-image: image(rgb(0 234 255 / .4)), 
    url("avatar.svg"); 
} 
```

两个背景合成之后的效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/132d07ee9d9640d3aaaa77bc99438391~tplv-k3u1fbpfcp-zoom-1.image)

是不是很完美！

那么，在 CSS 中除了使用 `<gradient>` 构建纯色（或带有一定透明度的纯色）背景层之外，还可以使用 `image()`来构建，它们都和 `background-color` 不一样，因为 **`background-color`** **始终是在背景图片的下面**。

早期的 Web 开发过程中，为了节约资源的请求，Web 开发者喜欢将很多小图片（往往是一些图标）集合在一张图片上，并且通过不同的坐标来控制显示的图片：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2012c3e939f4da498fc97d8dd889216~tplv-k3u1fbpfcp-zoom-1.image)

```
.icon { 
    width: 48px; 
    height: 48px; 
    background-image: url('../images/icons.png'); 
    background-repeat: no-repeat; 
} 
​
.icon--facebook { 
    background-position: 0 0; 
} 
​
.icon--rss { 
    background-position: -57px 0; 
}
```

我们把这种技术称为 **CSS Sprites 技术，俗称雪碧图**。 `image()` 函数也具备类似的能力。就是给 `image()` 函数中引入的图片中添加一段媒体标识符（沿着 `x` 和 `y` 轴的起点以及宽度 `w` 和高度 `h`），只在元素背景层中显示背景图片中的一部分。

```
.element { 
    background-image: image('sprites.png#xywh=338,324,360,390') 
} 
```

其中 `sprites.png` 是引入的背景图片名称和相应的路径，和 `url()` 函数引入背景图片是一样的； `#xywh=xVal,yVal,wVal,hVal` 指的是媒体标识符，也就是需要显示的图片对应的 `x` 和 `y` 坐标以及宽度和高度：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c7269cb45804f408704134152c10efc~tplv-k3u1fbpfcp-zoom-1.image)

正如上图所示，它的使用和以前 CSS Sprites 是相似的，不同的只是使用媒体标识符来指定要显示的图片的坐标位置和大小。这也意味着，你可以通过 CSS 裁剪和加载图片的一部分。

> 注意，媒体标识符 `#xywh=xVal,yVal,wVal,hVal` 是向后兼容的，如果浏览器不理解媒体标识符，媒体标识符将会被忽略， `image()` 函数引入的图片将会被视为无效。另外，`url()` 函数中也可以使用媒体标识符，只不过浏览器不理解时会显示整张图片。

`image()` 函数还有另一个新功能，即给 `image()` 传入一组不同类型的（格式不同）图片，浏览器将按照 `image()` 中的写入的图片顺序做遍历，并使用它支持的第一个图片类型：

```
 .element { 
     background-image: image("avatar.avif", "avatar.webp", "avatar.jpg"); 
 } 
```

比如上面的示例，如果浏览器支持 `.avif` 格式的图片，将会使用 `avatar.avif`，否则会使用 `avatar.webp`，如果浏览器也不支持 `.webp` 格式图片，则会使用 `avatar.jpg`。

### element() 函数

`element()` 是一个非常有意思的函数，它可以将 HTML 的元素当作背景图片渲染。

```
element() = element(<id-selector>) 
```

其中 `<id-selector>` 为 CSS 选择器中的 `ID` 选择器。具体使用的时候也像在 CSS 中使用 `ID` 选择器一样，需要在前面添加 `#` 标识符，如 `element(#source)`。 使用 `element()` 函数将某个元素（包括其后代元素）当作另一个元素的背景图片时，如果该引用的元素外观发生变化，目标元素的背景层（背景图片）也会相应发生变化。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8bb3a340fafa47459cf379b7a94eadc8~tplv-k3u1fbpfcp-zoom-1.image)
> Demo 地址：<https://codepen.io/airen/full/OJowdyY> （请使用 Firefox 浏览器查看 Demo）

使用 `element()` 函数可以很容易实现视频所展示的效果：

```
 <div id="element-source" contenteditable="true">Please press me to enter the content you want!</div> 
 <div class="target"></div>  
.target { 
    background-repeat: no-repeat; 
    background-size: 100% 100%; 
    background-image: element(#element-source); 
}
```

这个示例将 `id` 为 `element-source` 当作 `element()` 函数的参数，成为目标元素 `.target` 元素的背景图片。简单地说，`element()` 可以把 HTML 中的任意元素，当作另一个元素的背景图片，而且神奇的是，只要元素修改了（样式或内容），那么对应的背景也会改变。

正如上面示例所示，`element()` 函数可以将任意 DOM 元素当作另一个元素的背景，使用该特性，开发者可以将 `<canvas>`、`<img>`、`<video>` 和 `<svg>` 元素当作背景图片，实现一些有创意的效果。比如实现像 Visual Studio Code 编辑器右侧预览的缩略图效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eae6037d01fe4ba2a36a3fd3a7b1730b~tplv-k3u1fbpfcp-zoom-1.image)

### cross-fade() 函数

2021年年底，[@Jake 花了很长的篇幅阐述了“目前为止为什么没有什么方法可以对任意两个 DOM 元素进行交叉淡入淡出”](https://jakearchibald.com/2021/dom-cross-fade/)：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33f52aa0baa34db99197916f27d92ab2~tplv-k3u1fbpfcp-zoom-1.image)

其实，CSS 中有一个 `cross-fade()` 函数可以解决该问题。

[W3C 规范是这样描述 cross-fade() 函数的](https://www.w3.org/TR/css-images-4/#cross-fade-function)：

> 在图片之间转换时，CSS 需要一种方法来显式引用中间图片，该中间图片是开始图片和结束图片的组合。这是通过 `cross-fade()` 函数完成的，该函数指示要组合的两个图片以及组合在过渡中的距离。

简单地说，`cross-fade()` 可以将两个或多个图片组合在一起生成一个新的图片，并且运用于元素的背景图层上。比如：

```
.element { 
    background-image: cross-fade( url(white.png) 0%, url(black.png) 100%); 
} 
```

正如示例中代码所示，我们可以在每张图片后面显式指定一个百分比值（`<percentage>`），用来定义在与其他图片混合时，每个图片在不透明度方面保留了多少。

**百分比值必须不带引号编码，必须包含** **`%`** **符号，并且其值必须介于** **`0%`** **和** **`100%`** **之间，其中** **`0%`** **的值表示图片完全透明，而** **`100%`** **的值表示图片完全不透明** 。如果省略了任何百分比，则将所有指定的百分比相加并从中减去 `100%`。如果结果大于 `0%`，则结果将平均分配给所有省略百分比的图片。

`cross-fade()` 函数的规范允许多个图片，每个图片具有独立于其他值的透明度值。不过，情况并非总是如此。在某些浏览器中已经实现的原始语法只允许使用两张图片，而这两张图片的透明度之和正好是 `100%`。 比如：

```
 .element { 
     background-image: cross-fade(url(white.png), url(black.png), 50%) 
 } 
```

这相当于设置了 `50%` 透明度（`opacity: .5`）的 `black.png` 图片盖在透明度为 `100%`（完全不透明）的 `white.png` 上。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97df2a09e80746e69f937764df2525e7~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/jOvpdVW>

从这几个函数展示的效果可以获知，在未来（有一天所有浏览器都支持了这几个函数），`background-image` 的值不再局限于 `url()` 和 `<gradient>`，我们可以使用这些新特性，让运用于元素背景层的图片更丰富，更灵活。

> 注意，这里提到的 `image()`、`element()` 和 `cross-fade()` 都是 `<image>` 的新类型，它们不局限于用在 `background-image` 属性上，只要是可运用 `<image>` 值类型的 CSS 属性都可以使用。

## img 底部的额外 4px

使用 `<img>` 将图片引入 Web 上，在默认情况之下，图片浏览器中展示时，底部分有大约 `4px` 的空白间距。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b2f53cff30147d79e09ee736fac124d~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/vYzabxv>

这是一个 bug 吗?当然不是，这是默认行为。

<img>元素默认情况之下是一个可替换元素（Replaced Element）。默认情况下，<img> 的底部与容器的基线（baseline）对齐。基线是像 a、 b、 c、 d 这样的字母所在的位置，这意味着像 g、j、 y 这样的字母，它们的一部分位于基线以下(顺便说一下，这些部分被称为"下降")。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb321c8ca11741929102f886b156471a~tplv-k3u1fbpfcp-zoom-1.image)

这就是你在默认情况下看到的大约 `4px` 的间隙，因为图片是在基线上渲染的，为下降线留出空间。 这个问题是由于图片相对于同一行其他元素的 `vertical-algin` 造成的，我们可以很容易地通过以下方式进行纠正:

-   更改 `vertical-align` 属性，比如显式设置非 `baseline` 的值（`baseline`是其默认值），如 `top`、`bottom` 或 `middle` 等，但该属性仅适用于内联元素；
-   更改 `display` 属性值，使 `<img>` 成为一个块元素而不是内联元素；
-   还有一些其他的技巧，包括设置父容器的 `line-height` 为 `0`，设置父容器的 `font-size` 为 `0`。

就我个人而言，我更喜欢在重置样式表中，给 `img` 添加一个全局的样式，避免 Web 上图片底部有这个 `4px` 额外空白间距出现：

```
 img { 
     display: block; 
 } 
```

注意，HTML 中的 `<iframe>` 和 `<video>` 元素，以及`<img>` 同类型的标签元素，在这些元素中同样会存在这种现象，在使用类似 `<img>` 可替换元素时，都建议在重置 CSS 的时候，显式设置 `display` 的值为 `block`。

## 暗黑模式下降低图片亮度

如果你的 Web 应用要具备暗黑模式，图片的处理也是一个不可忽略的细节。它们可能会直接影响用户的体验，太亮的图片可能会让用户感到困惑和不舒服。而且有人做过这方面相应的调查，大多数被调查的人在暗黑模式下更喜欢亮度低的图片。比如下面这张图：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/684d9e582e3a4b80be25e485c74fd89f~tplv-k3u1fbpfcp-zoom-1.image)

在一个小型的应用中，你可以使用 HTML5 的 `<picture>` 元素，为不同模式加载不同格式图片：

```
<picture> 
    <source srcset="settings-dark.png" media="(prefers-color-scheme: dark)"> 
    <source srcset="settings-light.png" media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"> 
    <img src="settings-light.png" id="screenshot" loading="lazy"> 
</picture>
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22f635c17f4a45ef8a23eb9ff7c352df~tplv-k3u1fbpfcp-zoom-1.image)
> Demo 地址：<https://codepen.io/airen/full/PodBVdw>

但这种使用方式对于一个中大型的 Web 应用来说，可能没有能力为 Web 应用提供两个版本的图片源。在这种情况之下，可以使用 CSS 的滤镜 `filter` 特性来降低图片的亮度，即 **在暗黑模式下降低图片亮度** ：

```
@media (prefers-color-scheme: dark) { 
    :root { 
        --image-filter: grayscale(50%); 
    } 
    
    img:not([src*=".svg"]) { 
        filter: var(--image-filter); 
    } 
}
```

使用 `filter` 降低图片的灰度（`grayscale(50%)`），这是暗模式下降低图片亮度的一个快速解决方案，不过，这不是最佳的方案。只有在不具备为暗黑模式提供专用图片的时候才推荐它。

在暗黑模式下，同样要对 Icon 图标做相应的处理。这里来看两种情景。 先来看第一种，那就是 `.svg` 文件和其他格式的图片一样通过 `<img>` 标签引入。由于该 Icon 很有可能是纯色的，因此在暗黑模式下，我们可以通过 `filter` 来做 `dark/light` 之间的切换：

```
/* dark.css */ 
:root { 
    --icon-filter: invert(100%);
    --icon-filter_hover: invert(40%); 
} 

img[src*=".svg"] { 
    filter: var(--icon-filter); 
} 

/* light.css */ 
:root { 
    --icon-filter_hover: invert(60%); 
} 

/* style.css */ 
img[src*=".svg"]:hover { 
    filter: var(--icon-filter_hover); 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b21fa461130741d9ad5ab681b99b0f1b~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/airen/full/ExepMqx>

该方法和处理图片的方法是类似的。

接下来我们再来看第二种方式。使用的 Icon 图标很有可能是内联的 SVG，针对这样的场景，我们可以使用 CSS 的`currentColor` 属性。`currentColor` 最大的特性就是可以根据 `color` 的值来决定元素的颜色，而对于 SVG 绘制的 Icon 图标，主要由 `path`、`circle`、`rect`这样的元素构成，这些元素可以通过 `fill`、`stroke`来决定填充色和描边色。

换句话说，我们在使用内联 SVG 时，将 SVG 中用到 `fill` 和 `stroke` 的属性值都强制设置成 `currentColor`，就像下面这样：

```
<svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewbox="0 0 24 24" fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > 
    <circle cx="12" cy="12" r="10"/> 
    <circle cx="12" cy="12" r="4"/> 
    <line x1="21.17" y1="8" x2="12" y2="8"/> 
    <line x1="3.95" y1="6.06" x2="8.54" y2="14"/> 
    <line x1="10.88" y1="21.94" x2="15.46" y2="14"/> 
</svg>
```

另外在媒体查询中设置：

```
@media (prefers-color-scheme: dark) { 
    :root { 
        --background-color: #111416; 
        --text-color: #ccc; 
        --link-color: #f96; 
    } 
    
    svg { 
        color: var(--text-color) 
    } 
} 
```

如果你分成多个文件的话，可能会像下面这样的：

```
 /* dark.css */ 
 :root { 
     --color: rgb(250, 250, 250); 
     --background-color: rgb(5, 5, 5); 
     --link-color: rgb(0, 188, 212); 
     --main-headline-color: rgb(233, 30, 99); 
     --accent-background-color: rgb(0, 188, 212); 
     --accent-color: rgb(5, 5, 5); 
 }
 
 /* light.css */ 
 :root { 
     --color: rgb(5, 5, 5); 
     --background-color: rgb(250, 250, 250); 
     --link-color: rgb(0, 0, 238); 
     --main-headline-color: rgb(0, 0, 192); 
     --accent-background-color: rgb(0, 0, 238); 
     --accent-color: rgb(250, 250, 250); 
 } 
 
 /* style.css */ 
 :root { 
     color-scheme: light dark; 
 } 
 
 body { 
     color: var(--color); 
     background-color: var(--background-color); 
} 
​
svg { 
    color: var(--color); 
} 
```

## 给 JPG 图片添加透明通道

如果你有一张很大的图片，需要在上面添加透明阴影效果。使用 `PNG` 文件又太大，但使用 `JPG` ，质量又不够好。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e655b361c4ee4bfd84f3e23523fd7c49~tplv-k3u1fbpfcp-zoom-1.image)

以往的技术是将一个常规的 `JPG` 和一个带有透明通道的 `8` 位 `PNG` 一起放到一个 SVG 的容器内。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fba28efaaa6642d8a87fefc19e91d3d4~tplv-k3u1fbpfcp-zoom-1.image)

```
<svg preserveAspectRatio="xMinYMin" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 560 1388"> 
    <defs> 
        <mask id="canTopMask"> 
            <image width="560" height="1388" xlink:href="img/can-top-alpha.png"></image> 
        </mask> 
    </defs> 
    <image mask="url(#canTopMask)" id="canTop" width="560" height="1388" xlink:href="can-top.jpg"></image> 
 </svg> 
```

在 HTML 或者 CSS 中可以调用这个 SVG 文件 ：

```
<img src="hero-image.svg" />
.element {
    background: url("hero-image.svg") 
}
```

这种技巧可以简单理解成：在 JPG 的文件上添加了一个 PNG 的蒙层，然后输出一个 SVG 文件，并且在 HTML 或者 CSS 中按正常调用图片的方式调用 SVG 文件。

但在现代 Web 开发中，你完全可以使用 CSS 的 `mask` 来处理：

```
<img src="imgage.jpg" />
img {
    mask-image: url(mask.png);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54a58130cdc04860be348b1dcb4ecef7~tplv-k3u1fbpfcp-zoom-1.image)

采用这种技术，可以给 Web 图片添加很多有创意的效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7b6f8f40682480c8dee259cfa00ed8c~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/DeeDee23/full/zYNGPpq> （该 Demo 来源于 [@Dion Dermott ](https://codepen.io/DeeDee23)）

再来看一个[ @Sergey 写的一个 Demo:](https://codepen.io/Semali)

```
<div class="mask-container">
    <div class="img-bw"></div>
    <img class="img-color" src="https://2arenanet2.staticwars.com/img/pages/home/panels/games/gw2-on.6753f436.jpg" alt=""></img>
</div>
.mask-container {
    position: relative;
    width: 100vh;
    max-width: 100%;
    margin: auto;
}
​
.img-color {
    display: block;
    max-width: 100%;
}
​
.img-bw {
    display: block;
    position: absolute;
    inset: 0;
    background-image: url(https://2arenanet2.staticwars.com/img/pages/home/panels/games/gw2-off.3100c4ff.jpg);
    background-size: contain;
    background-repeat: no-repeat;
​
    mask-image: url(https://i.ibb.co/xGR5019/mask-img.png);
    mask-position: 0% 0%;
    mask-size: cover;
    mask-repeat: no-repeat;
    transition: mask-position;
}
​
.mask-container:hover > .img-bw {
    animation: addColor 1200ms steps(32) forwards;
}
​
@keyframes addColor {
    0% {
        mask-position: 0 0;
    }
    100% {
        mask-position: 100% 0;
    }
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/951b4e55e3e34498b134b4a2bb3518a5~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：<https://codepen.io/Semali/full/JjBpVZy>

除此之外，@Ahmad Shadeed 在他的《[Aligning Logo Images in CSS](https://ishadeed.com/article/aligning-logos-css/)》教程中，介绍了一种“使用 CSS 混合模式去除白色背景”的方案。假设，你使用的一些 `JPG` 图片的背景是白色的，但你又期望它能变成是一个类似 `PNG` 图片，即，你不想（或不能）拿到一个透明版本的 Logo 图片，那么你可以使用 CSS 混合模式来完成。它会使用了黑魔法一样，把 `JPG` 图片中的白色背景去除掉。

```
.brands__item img {
    width: 130px;
    height: 75px;
    object-fit: contain;
    mix-blend-mode: multiply;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/788706f5b74d4919ae02a106ac84a36b~tplv-k3u1fbpfcp-zoom-1.image)

你也可以使用 CSS 属性选择器，只在 `.jpg` 和 `.png` 图片上应用混合模式，去除图片的白色背景：

```
.brands__item img[src$=".jpg"],
.brands__item img[src$=".png"] {
    mix-blend-mode: multiply;
}
```

## 小结

这节课主要向大家介绍了一些可用于 Web 图片的 CSS 技巧以及一些新特性。在 Web 中使用图片时，这些技巧和新特性可以使浏览器能更好地呈现图片。