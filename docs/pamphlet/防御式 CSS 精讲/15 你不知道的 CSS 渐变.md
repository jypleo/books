![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/107512b3276f46d3a06c66ea09e2e811~tplv-k3u1fbpfcp-zoom-1.image)

正如上图所示，渐变效果在现代 Web 设计中已随处可见。

以往 Web 中都是使用图片来呈现渐变效果的，当下我们可以不必再依赖图片，可以使用 CSS 渐变模块给 Web 添加渐变效果。这样做的好处是，CSS 绘制的渐变效果比图片渐变效果更灵活，更实惠，可以随时间应对 Web 设计师对渐变效果的调整。

不过，在使用 CSS 渐变相关特性绘制渐变效果时，还是有不少的细节需要掌握，否则就不能很好制作出符合预期的渐变效果。甚至有的时候，出现问题都不知道如何定位和排查。

通过这节课的学习，我们除了能更好地了解和掌握 CSS 渐变相关的理论知识之外，还能在实战中更好地用好 CSS 渐变。

## CSS 渐变简介

渐变一般指的是从一种颜色平滑地过渡到另一种颜色，而且用户代理（比如浏览器）将其渲染为图像，这个图像可以是背景图像（`background-image`）、边框图像（`border-image`）和遮罩图像（`mask-image`）等，即 CSS 中可以接受图像的任何属性。

CSS 的渐变主要分布在 **[CSS Images Module Level 3](https://www.w3.org/TR/css-images-3/#gradients)** 和 **[CSS Image Values and Replaced Content Module Level 4](https://www.w3.org/TR/css-images-4/#gradients)** 两个规范模块中，其中 Level 4 和 Level 3 相比，新增了 `conic-gradient()` 和 `repeating-conic-gradient()` 两个属性。在 CSS 中，渐变相当于图像，我们可以使用：

- **线性渐变** ：`linear-gradient()` 和 `repeating-linear-gradient()`； 
- **径向渐变** ：`radial-gradient()` 和 `repeating-radial-gradient()`； 
- **锥形渐变** ：`conic-gradient()` 和 `repeat-conic-gradient()`。 

事实上这三种渐变就相当于图像（可以是背景图像、边框图像和遮罩图像等），而且渐变通常是从一种颜色到另一种颜色的过渡。不过 CSS 允许你控制渐变中的每一个方面（渐变参数），比如，渐变方向、渐变颜色和渐变位置等。

```CSS
.linear-gradient {
    background-image: linear-gradient(#ff8a00, #e52e71);
}

.repeating-linear-gradient {
    background-image: repeating-linear-gradient(
        to right,
        #ff8a00 10%,
        #e52e71 20%
    );
}

.radial-gradient {
    background-image: radial-gradient(#ff8a00, #e52e71);
}

.repeating-radial-gradient {
    background-image: repeating-radial-gradient(circle, #ff8a00 10%, #e52e71 20%);
}

.conic-gradient {
    background-image: conic-gradient(#ff8a00, #e52e71);
}

.repeating-conic-gradient {
    background-image: repeating-conic-gradient(#ff8a00 10%, #e52e71 20%);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e2ce865868a4a33abaf9bd82aa1f9ff~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/abaGdQK

需要知道的是，渐变函数对应的值类型是 `<image>` ，也就是说，只要是可以接受 `<image>` 值的属性都可以使用渐变函数，比如我们熟悉的背景图像（`background-image`）、边框图像（`border-image`）、遮罩图像（`mask-image`）和列表项标记（`list-style-image`）等。

在一些情景中，我们还可以同时使用多个渐变函数，构建出复杂的 UI 效果，比如多背景场景：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce1b1429fe0c426abad5633b44c17c4c~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/ExeRLJb

## CSS 渐变使用场景

在 Web 开发中，很多地方都会使用到 CSS 渐变函数，Web 开发者可以使用它们来绘制 UI 图形、构建渐变文本和边框、绘制纹理背景等。

### CSS 渐变绘制 UI 图形

CSS 中有很多属性都可以直接用来绘制 UI 图形，比如 CSS 的 `border` 、`border-shadow` 和 `box-shadow` 等，除此之外，CSS 渐变函数也可以用来绘制 UI 图形。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0948bd1431a24de0b0a2cf2206f2ab94~tplv-k3u1fbpfcp-zoom-1.image)

我们来看一个具体的实例：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/177f4cc13093480ea8d87818d02ce893~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/PodevOz

实现上图的 UI 效果，将会用到多个背景，而且每个背景都是使用 CSS 渐变来绘制的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db1791520ac7470fa009c4bc37f67be9~tplv-k3u1fbpfcp-zoom-1.image)

```CSS
.card { 
    
    background-image: 
        radial-gradient(circle, rgba(255,255, 255, .2), rgba(255,255, 255, .2) 70%, rgba(255,255, 255,0) 70%), 
        radial-gradient(circle, rgba(255,255, 255, .2), rgba(255,255, 255, .2) 70%, rgba(255,255, 255,0) 70%), 
        radial-gradient(circle, rgba(255,255, 255, .3), rgba(255,255, 255, .3) 70%, rgba(255,255, 255,0) 70%), 
        linear-gradient(180deg, #ffe3ae 0%, #ffd34f 100%); 
    background-repeat: no-repeat; 
    background-size: 28px 28px, 49px 49px, 103px 103px, cover; 
    background-position: calc(100% - 20px) calc(100% - 20px), calc(100% + 10px) calc(100% + 10px), -34px -28px, 0 0; 
}
```

另外，使用 CSS 渐变还能不依赖任何图片，实现一些 UI 视觉丰富的 Web 组件：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06cfb5402a084ad1915aa0690f8730aa~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/dyqeEZx

### CSS 渐变文本

在 CSS 中，我们无法直接将渐变运用于 `color` 这样的属性上，但在实际开发中，总是会碰到需要给文本添加渐变效果的场景。我们可以使用 CSS 的渐变函数，并结合 CSS 的 `background-clip`、`text-fill-color` 和 `text-stroke` 来实现文本的渐变填充和渐变描边等效果：

```CSS
.gradient--text {
    background-clip: text;
    background-image: linear-gradient(to right, #09f1b8, #00a2ff, #ff00d2, #fed90f);
    color: var(--color-background);
    letter-spacing: var(--letter-spacing);
    -webkit-text-fill-color: transparent;
}

.gradient--strock {
    background-clip: text;
    background-image: linear-gradient(to right, #09f1b8, #00a2ff, #ff00d2, #fed90f);
    color: var(--color-background);
    letter-spacing: var(--letter-spacing);
    -webkit-text-stroke-color: transparent;
    -webkit-text-stroke-width: var(--stroke-width);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/875cf784158f42a6a025b8bd840f4ceb~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/wvEjbRe

在此基础上，使用 `@keyframes` 还可以给渐变文本添加动效：

```CSS
p {
    -webkit-text-fill-color: transparent;
    background: linear-gradient(-4deg, transparent, transparent 25%, #ffb6ff, #b344ff,transparent 75%, transparent);
        background-clip: text;
        background-size: 100% 400%;
        background-position: center 0;
        animation: textScroll 6s infinite linear alternate;
}

@keyframes textScroll {
    100% {
        background-position: center 100%;
    }
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7209659779c24b35af0dfd63a7389ea0~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/gOdzJVm

### 渐变边框

在业务开发中，渐变边框的效果也很常见。CSS 渐变除了可以被运用于 `background-image` 之外，还可以用于 `border-image`。简单地说，将渐变运用于 `border-image` 上可以绘制渐变边框：

```CSS
.gradient-border {
    --gradient: linear-gradient(red, gold);
    border-image: var(--gradient) 1;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff578f85325d471bbe5e030f7d25eb5b~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/qBMYzxN

实现渐变边框还可以结合 `background-clip`、`background-origin` 和多个渐变来实现。这种方式也常称为是嵌套渐变。例如：

```CSS
div {
    border: 10px solid transparent;
    background-image: linear-gradient(#222, #222), var(--gradient);
    background-origin: border-box;
    background-clip: padding-box, border-box; 
    border-radius: 10px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d47a2fd46ac4f71bcae6e624771e631~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/jOvxjzd

我们来看一个真实的案例，不过它是通过元素层叠来模拟渐变边框的效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6a8368a5e5e45fba2a6676b5668404c~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/WNgJqwJ （该 Demo 来源于 [@Medhat Dawoud](https://twitter.com/med7atdawoud) 的《[Gradient borders with curves and 3D animation in CSS](https://medhatdawoud.net/blog/gradient-borders-with-curves-and-3d-animation-in-css)》一文）

### CSS渐变创建纹理

在上面的示例中，我们其实已经看到了使用 CSS 渐变创建带有纹理效果的边框。使用 CSS 渐变可以创建很多有意思的背景纹理效果，只不过仅仅使用 CSS 的渐变是不够的，制作这些纹理效果还需要使用多背景、`background-size` 等特性。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71c635ebe50740e89f84714be629cace~tplv-k3u1fbpfcp-zoom-1.image)

上图是截取 **[MagicPattern网站](https://www.magicpattern.design/tools/css-backgrounds)** 的，除了这个，还有 [@Lea Verou写的一个纹理库](http://projects.verou.me/css3patterns/)：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b19a715847bc40d3bc69cbc5a00b5e63~tplv-k3u1fbpfcp-zoom-1.image)

我们来看一个最简单的示例，就是黑白相隔的纹理效果：

```CSS
body {
    background-color: #eee;
    background-image:
    linear-gradient(45deg, black 25%, transparent 25%, 
        transparent 75%, black 75%, black),
    linear-gradient(45deg, black 25%, transparent 25%, 
        transparent 75%, black 75%, black);
    background-size: 60px 60px;
    background-position: 0 0, 30px 30px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20511bb0048c4143a05cdf249797a473~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/ZEMogbQ

上面的效果，是类似下图这样的图片平铺出来的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f67b93760d1c4e6fb5f6f0d8b02ad8af~tplv-k3u1fbpfcp-zoom-1.image)

这个就是上面示例中 `background-size` 对应的一个盒子。如果我们使用 `repeating-conic-gradient()` ，可以很容易实现上图的效果：

```CSS
body {
    background-color: #eee;
    background: repeating-conic-gradient(#000 0% 25%, #eee 0% 50%) 50% / 60px 60px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b9afdea8acb4937bcfc96579d916f82~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/NWLMQpQ

使用 `repeating-conic-gradient()` 除了实现水平黑白间隔的纹理效果，还可以实现带有旋转的效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b0ad3c2efcd430eb991c8f9104e66b8~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/NWLMQjQ （该 Demo 来自于 @Ana Tudor 的《[Background Patterns, Simplified by Conic Gradients](https://css-tricks.com/background-patterns-simplified-by-conic-gradients/)》一文）。

### 渐变在蒙层上的运用

CSS 的渐变除了可以用于上面提到的 `border-image`、`background-image` 之外，还可以用于 `mask-image` 上。比如我们可以使用渐变将一张图片实现缕空效果：

```CSS
div {
    background: url(https://assets.codepen.io/489403/grand_canyon.jpeg) no-repeat
        center;
    background-size: cover;

    mask-image: linear-gradient(
        to right,
        #000,
        #000 50%,
        transparent 50%,
        transparent 100%
    );
    mask-size: 10vw 100%;
    mask-repeat: repeat;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0bdbab6dedb45329a23bcbe47312fcc~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/wvzvzrm

结合起来，还能构建出更有创意的 UI 效果。比如 @Temani Afif 的 《[A Fancy Hover Effect For Your Avatar](https://css-tricks.com/a-fancy-hover-effect-for-your-avatar/)》所展示的[用户头像悬停的动效](https://codepen.io/t_afif/full/zYLeOLM)：

```CSS
img {
    --s: 200px;    /* image size */
    --b: 6px;      /* border thickness */
    --c: #ae3ec9;  /* border color */
    --cb: #e9ecef; /* background color */
    --f: 1;        /* initial scale */
  
    width: var(--s);
    aspect-ratio: 1;
    padding-top: calc(var(--s)/5);
    cursor: pointer;
    border-radius: 0 0 999px 999px;
    --_g: 50%/calc(100%/var(--f)) 100% no-repeat content-box;
    --_o: calc((1/var(--f) - 1)*var(--s)/2 - var(--b));
    outline: var(--b) solid var(--c);
    outline-offset: var(--_o);
    background: 
        radial-gradient(
            circle closest-side,
            var(--cb) calc(99% - var(--b)),var(--c) calc(100% - var(--b)) 99%,#0000
        ) var(--_g);
    -webkit-mask:
        linear-gradient(#000 0 0) no-repeat
        50% calc(1px - var(--_o)) / calc(100%/var(--f) - 2*var(--b) - 2px) 50%,
        radial-gradient(circle closest-side,#000 99%,#0000) var(--_g);
    transform: scale(var(--f));
    transition: .5s;
}
img:hover {
    --f: 1.4; /* hover scale */
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b2cfe9616664a5583251ab6a1e8d996~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/VwGxoxG

事实上，使用 CSS 渐变函数还可以制作出很多有创意的效果，碍于篇幅的限制，这里就不再做更多的阐述。

## 你所不知道的 CSS 渐变

通过前面的内容学习，我想你对 CSS 渐变函数有了一定的了解。只不过，CSS 渐变函数在使用的时候也有一些边界和细节需要掌握。因为，只有掌握了这些知识，你才能更好的用好 CSS 的渐变。接下来，我们一起来探讨你所不知道的 CSS 渐变。

### 渐变中的计算

CSS 渐变中的每个色标由颜色和位置组成，每个颜色的位置可以使用百分比（`%`）来定义，比如：

```CSS
.linear-gradient {
    background-image: linear-gradient(
        90deg, 
        #FEBA0B 0%, 
        #EA441F 20.03%, 
        #18DE44 44.46%, 
        #8832D5 70.07%, 
        #FFE600 100%
    );
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f376464b4b5d4c25a3a938b144e00b85~tplv-k3u1fbpfcp-zoom-1.image)

在这个示例中，渐变的梯度线（也称为“渐变线”）是矩形的左侧边缘至右侧边缘，在这个渐变梯度线上有五个渐变色标，每个色标颜色的停止位置分别是 `0%`、`20.03%`、`444.46%`、`70.07%` 和 `100%`。颜色的停止位置使用的是百分比单位（`%`）。如果颜色停止位置是百分比，它的计算是根据起始点和结束点之间梯度线的长度来确定，起始点为 `0%`，结束点是 `100%`。梯度线长度从元素的起始点向终点方向沿梯度线测量。

CSS 中的百分比计算是个复杂的体系，假设我们把上面的线性渐变运用于一个宽度为 `1000px` 的容器中，它的渐变梯度线长度是 `1000px`，那么，对应的百分比位置的计算值（`px`）等于颜色停止位置的百分比值乘以渐变梯度线长度（元素的宽度 `width`）：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ceebb9bb0b2f44a1b003f25a8177f75d~tplv-k3u1fbpfcp-zoom-1.image)

注意，上面这个示例算是一个特殊的示例，渐变的角度是 `90`，但渐变的梯度线长度和渐变角度是有关的，比如下面这个示例，渐变角度是 `45deg`：

```CSS
.linear-gradient {
    background-image: linear-gradient(
        45deg, 
        rgb(56 0 253) 0%, 
        rgb(255 0 146) 20%, 
        rgb(255 111 177) 40%, 
        rgb(255 71 64) 80%, 
        rgb(30 90 88) 100%
    );
}
```

渐变梯度线长度就变了：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a07a74cab1fe4bc595013a67241d29e7~tplv-k3u1fbpfcp-zoom-1.image)

这个时候渐变梯度线长度的计算就复杂了，需要用到一定的数学知识。在这里就不做相关阐述了，如果你感兴趣的话，可以使用你掌握的相关数学知识计算出渐变梯度线长度。

在使用 CSS 渐变函数时，有很多时候不会对渐变色指定位置，比如：

```CSS
.linear-gradient {
    background-image: linear-gradient(
        to right, 
        #F5BB43, 
        #C668EC, 
        #E03CB0, 
        #9E6C6A,  
        #FCE44D
    );
}
```

这个时候，浏览器会给渐变色自动分配一个停止位置。颜色停止列表中的第一个或最后一个颜色停止分别被指定为渐变梯度线的 `0%` 位置（渐变梯度线起始位置）和渐变梯度线的 `100%` 位置（渐变梯度线终点位置）。

就该示例来说，由五个颜色组成的颜色停止列表，构建四个颜色区间，那么每个区间将会平均分配渐变梯度线的长度，也就是说示例中的第二个颜色的停止位置位于渐变梯度线的 `25%` 位置，第三个颜色的停止位置位于渐变梯度线的 `50%` 位置，第四个颜色的停止位置位于渐变梯度线的 `75%` 位置：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba96b8cb8f674cc19eae505276fab22a~tplv-k3u1fbpfcp-zoom-1.image)

这个过程是一个自动过程，并且这个过程也称为**颜色停止修正**。用户代理在解析每个色块（停止颜色）的使用位置时，会按下面的步骤来处理：

- ① 如果第一个停止颜色没有显式设置停止位置，将其停止位置设置为 `0%` ；如果最后一个停止颜色没有显式设置停止位置，将其停止位置设置为 `100%`；
- ② 如果一个停止颜色或过渡提示的位置，小于停止颜色列表中它前面的任何停止颜色或过渡提示的指定位置，则将其停止位置设置为等于它前面的任何停止颜色或过渡提示的指定位置的最大位置。
- ③ 如果任何停止颜色没有停止位置，那么它们的停止位置，会均分有停止位置的前后停止颜色之间的间隔。

应用这些规则，所有渐变颜色都将有明确的停止位置和停止颜色，并按升序排列。下面这几对渐变，每一对中的后者是前者的手工“修正”版本，通过应用上述规则获得。对于每一对，两个渐变渲染的结果都是相同的。每个箭头中的数字指定在转换中调用了哪些修正步骤。

```CSS
background-image: linear-gradient(to right, rgb(56, 0, 253) , rgb(255, 0, 146) 20%, rgb(255, 71, 64));
// = ① >> 
background-image: linear-gradient(to right, rgb(56, 0, 253) 0% , rgb(255, 0, 146) 20%, rgb(255, 71, 64) 100%);
```

根据“规则①”对第一个停止颜色和最后一个停止颜色做修正，第一个停止颜色的停止位置位于渐变线的 `0%`，最后一个停止颜色的停止位置位于渐变线的`100%`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/365aa68ea20c41af897368e0d30ca1b5~tplv-k3u1fbpfcp-zoom-1.image)

```CSS
background-image: linear-gradient(to right, rgb(56, 0, 253) 40% , rgb(255, 0, 146), rgb(255, 71, 64), rgb(188,188,90));

// = ①, ③>> 
background-image: linear-gradient(to right, rgb(56, 0, 253) 40% , rgb(255, 0, 146) 60%, rgb(255, 71, 64) 80%, rgb(188,188,90) 100%);
```

根据“规则①”，将最后一个停止颜色（`rgb(188, 188, 90)`）的停止位置修正为渐变线的 `100%` 位置，然后根据“规则③”对第二个停止颜色（`rgb(255, 0, 146)`）和第三个停止颜色（`rgb(255, 71, 64)`）的停止位置进行修正。

因为这两个停止颜色都没有显式设置停止位置，因此它会均分第一个停止颜色和最后一个停止颜色之间的间距（即渐变线的 `100% - 40% = 60%`），根据计算可以得到第二个停止颜色的停止位置位于渐变线的 `60%`，第三个停止颜色的停止位置位于渐变线的 `80%`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c393243b0a404d7cb795531b593633de~tplv-k3u1fbpfcp-zoom-1.image)

```CSS
background-image: linear-gradient(to right, rgb(56, 0, 253) -10% , rgb(255, 0, 146), rgb(255, 71, 64));

// = ①, ③ >> 
background-image: linear-gradient(to right, rgb(56, 0, 253) -10% , rgb(255, 0, 146) 45%, rgb(255, 71, 64) 100%);
```

这个示例也是根据“规则①, ③”来进行修正的，最后一个停止颜色的停止位置会位于渐变线的 `100%`，第二个停止颜色（`rgb(255, 0, 146)`）没有显式设置停止位置，将会均分第一个和最后一个停止颜色位于渐变线上的间距（即 `100% - (-10%) ÷ 2 = 55%`），也就是容器宽度的 `45%`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3956ce630d3d4a4e93c1ef6a40c35c7b~tplv-k3u1fbpfcp-zoom-1.image)

```CSS
background-image: linear-gradient(to right, rgb(56, 0, 253) -50px , rgb(255, 0, 146), rgb(255, 71, 64));

// = ①, ③ >> 
background-image: linear-gradient(to right, rgb(56, 0, 253) -50px , rgb(255, 0, 146) calc(50% - 25px), rgb(255, 71, 64) 100%);
```

这个示例和上面的示例是相似的，不同之处在于，停止颜色的停止位置有两种不同的单位（`px` 和 `%`），但修正规则是相同的，第二个停止颜色 `rgb(255, 0, 146)` 没有显式设置停止位置，它会是均分与其相邻两停止颜色位置之间的间距（即 `100% - (-50px) ÷ 2`），最终的值是 `100% - (-50px) ÷ 2 - 50px = 50% - 25px`，在 CSS 中不同单位之间的混合计算需要使用 `calc()` 函数来表达，即 `calc(50% - 25px)`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b113205f3aa24f21ac42cffd3a241acd~tplv-k3u1fbpfcp-zoom-1.image)

**注意：如果在渐变中停止颜色的停止位置使用混合单位值（比如** **`px`**，**`em`**，`vw` **或 **`%`**）时要多加小心，因为这可能会导正停止颜色在之前的停止颜色之前无意地移动**。

比如 `background-image: linear-gradient(yellow 100px, blue 50%)`，当容器高度不小于 `200px` 时，不会触发任何颜色停止位置的修正，然而，当容器高度是 `150px` 时，那么 `blue` 的停止位置就相当于 `75px`，位于 `yellow` 之前，根据前面“规则②”，`blue` 停止颜色的停止位置会得到修正，会修正为和 `yellow` 相同的停止位置，即 `100px`。

```CSS
background-image: linear-gradient(to right, rgb(56, 0, 253) 20%, rgb(255, 0, 146) 0%, rgb(255, 71, 64) 40%);

// = ② >> 
background-image: linear-gradient(to right, rgb(56, 0, 253) 20%, rgb(255, 0, 146) 20%, rgb(255, 71, 64) 40%);
```

在这个示例中，虽然三个停止颜色都显式指定了停止位置，但第二个停止颜色的停止位置设置了 `0%`，它比前面的停止颜色的停止位置要小，这个时候会根据“规则②”进行调整，会将其停止位置设置为前面最大的位置，即 `20%`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6369d9a63de544f5bab2d58aa710452b~tplv-k3u1fbpfcp-zoom-1.image)

再来看一个示例：

```CSS
background-image: linear-gradient(to right, rgb(56, 0, 253),  rgb(255, 0, 146) -20%, rgb(32,123,225) 50%,rgb(255, 111, 177) 120%, rgb(55, 71, 164));

// = ①, ② >> 
background-image: linear-gradient(to right, rgb(56, 0, 253) 0%,  rgb(255, 0, 146) 0%, rgb(32,123,225) 50%,rgb(255, 111, 177) 120%, rgb(55, 71, 164) 120%);
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/945c794adf184492a03c10493952ad61~tplv-k3u1fbpfcp-zoom-1.image)

上面我们都是以线性渐变为例向大家阐述了渐变中色标相关的细节，但在径向渐变和锥形渐变中色标的计算有所差异，我们先来以径向渐变为例：

```CSS
.radial-gradient {
    background-image: radial-gradient(
        50% 100%, 
        #FFFFFF 0%, 
        #972929 34%, 
        #3571DF 67%, 
        #C014CF 100%
    );
}
```

径向渐变和线性渐变的梯度线（渐变线）略有不同，径向渐变的渐变线长度是其半径，那么对应的百分比也是相对于其半径计算：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b3640291b6bf4b28ad7aeb5627894f65~tplv-k3u1fbpfcp-zoom-1.image)

如果径向渐变是一个椭圆形渐变：

```CSS
.radial-gradient {
    background-image: radial-gradient(
        50% 100%, 
        #FFFFFF 50%, 
        #972929 67%, 
        #3571DF 83%, 
        #C014CF 100%
    );
}
```

其停止颜色的百分比也是相对于其半径做计算：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5365736ca74941b5b3ef3a9010196622~tplv-k3u1fbpfcp-zoom-1.image)

其实，径向渐变（`radial-gradient()`）要比线性渐变（`linear-gradient()`）复杂得多。在径向渐变中，除了使用 `circle` 和 `ellipse` 关键词来决定径向渐变的形状之外，还可以使用 `<size>` 参数来决定。

`<size>` 参数可以用来决定渐变结束形状的大小。它除了 `<length>` 或 `<length-percentage>` 值之外，还可以是 `closest-side`、`farthest-side`、`closest-corner` 和 `farthest-corner` ，其默认值 `farthest-side` 。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05b1beadc5a74c01a8ddc489c7950561~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/dyqKdPQ

刚才提到过，在径向渐变中可以仅使用 `<size>` 参数（不显式使用 `circle` 或 `ellipse` )来决定渐变形状。只不过，`<size>` 为单个值（除关键词之外的值），则渐变结束形状默认是圆形，否则是椭圆形。要是 `<ending-shape>` （即 `circle` 或 `ellipse`）和 `<size>` 两个参数同时都省略时，径向渐变的形状则会根据容器尺寸（形状）自动匹配。如果容器是正方形，则是一个圆形渐变，否则是一个椭圆形渐变。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d842019501c411eb91c153354af8283~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/gOdKvMY

在 CSS 中使用 `radial-gradient()` 函数也有令人感到恶心或不解的地方。从前面的内容中可以知道的是：**在** **`radial-gradient()`** **函数的使用中，其** **`<position>`****、****`<size>`** **和** **`<ending-shape>`** **几个参数可以相互组合，但这些参数相互组合可能会产生半径为** **`0`** **的** **`circle`** **或** **`ellipse`**  。

比如，渐变的中心在渐变框的边缘上，并且指定了 `closest-side` 或 `closest-corner` ，或者明确指定了 `<size>` 和 `<ending-shape>` 值，且半径的任意一个为 `0`，就会发生这种情况。

```CSS
:root {
    --cyanHSL: hsl(180 100% 50%);
    --pinkHSL: hsl(328 100% 54%);
}

.radial-gradient {
    background-image: radial-gradient(
        var(--size),
        var(--cyanHSL),
        var(--pinkHSL)
    );
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d70387f42e2646e8bfe8ee544a5a8cae~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/BaOVYRj

针对于这些情况，其渲染规则是： 

- 如果 `<ending-shape>` 是半径为 `0` 的圆形，会将 `<ending-shape>` 渲染为一个圆，其半径是任意一个非常小的比零大的值。这会使得渐变仍然看起来像一个圆。
- 如果 `<ending-shape>` 的宽度为 `0`（无论高度如何），会将 `<ending-shape>` 渲染为一个椭圆，其高度是任意一个非常大的值，其宽度是任意一个非常小的比 `0` 大的值。这会使得渐变看起来类似于水平方向的渐变，并且关于椭圆中心对称。这也意味着，所有用百分比定义的颜色位置是相对于 `0px` 计算的，最终计算出的位置值是 `0` 。
- 如果 `<ending-shape>` 的高度为 `0` ，会将 `<ending-shape>` 渲染为一个椭圆，其宽度是任意一个非常大的值，其高度是任意一个非常小的比零大的值。这会使用渐变看起来像一个纯色的图片，其颜色为最后一个位置的颜色，或者如果它是重复的话，其颜色为渐变的平均色。

接着再来看 CSS 中的锥形渐变。在锥形渐变中，颜色停止就更独特一点，其渐变线是其周长，如果停止颜色的位置是百分比，那么它是相对于 `360deg` 来计算的：

```CSS
.conic-gradient {
    background-image: conic-gradient(
        at 50% 50%, 
        #FFFFFF 0%, 
        #972929 25%, 
        #3571DF 50%, 
        #B60A46 75%, 
        #3DD69F 100%
    );
}
```

第一个停止颜色（`#ffffff`）位置对应的是 `0deg`，第二个停止颜色（`#972929`）位置对应的是 `90deg`，第三个颜色（`#3571df`）对应的是 `180deg`，第四个颜色（`#b60a46`）对应的是 `270deg`，第四个颜色（`#3dd69f`）对应的是 `360deg`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e4756f4402e4c29bdece387e19a69aa~tplv-k3u1fbpfcp-zoom-1.image)

锥形渐变 `conic-gradient()` 和线性渐变 `linear-gradient()` 有点相似，渐变颜色没有显式指定停止位置时，也会按照渐变颜色数量将相应的圆周长分成相等的等份。比如：

```CSS
.conic-gradient {
    background-image: conic-gradient( red, yellow, lime, aqua, blue, magenta, red );
}

/* 等同于 */
.conic-gradient {
    background-image: conic-gradient(
        red 0%, 
        yellow 16.66%, 
        lime 33.33%, 
        aqua 50%, 
        blue 66.66%, 
        magenta 83.33%, 
        red 100%
    );
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8862994841774528bd9eca36d586b530~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/MWqXrVe

就该例而言，相当于将 `360deg` 均分了六份，每份是 `16.66%`，即 `60deg`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b35b1ac81c84d6e9f86b81e61df7aa0~tplv-k3u1fbpfcp-zoom-1.image)

 

不管是哪种类型的 CSS 渐变，每个渐变颜色都有相应的停止位置，即使未显式设置，只不过每个渐变颜色的停止位置计算方式都有所差异。

对于 CSS 渐变而言，除了渐变梯度（渐变线）会影响渐变效果之外，还有一个参数 `<angle>` （渐变角度）也会影响渐变效果。同样的，渐变中的角度对于渐变线的影响也是很复杂的。拿线性渐变为例吧：

```CSS
 :root { 
     --color-start: #09f; 
     --color-stop: #e52e71; 
     --linear-direction: to top right; 
} 

.linear-gradient { 
    background-image: linear-gradient(
        var(--linear-direction),
        var(--color-start),
        var(--color-stop)
    ); 
} 
```

这个示例渐变是从元素的左下角到右上角。此时渐变的角度会由元素的大小决定。对于一个正方形，它的角度正好是`45deg`。如果元素的宽高比发生变化，则渐变的角度调整为对角线的角度，例如宽高比为 `2:1` 的角度约为 `26.5deg`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84371d02045944adb6eb2094ee148090~tplv-k3u1fbpfcp-zoom-1.image)

这是一个反正切，它和正切之间的关系如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/477027c9f4fb4943ab39c076962063ed~tplv-k3u1fbpfcp-zoom-1.image)

我们把示例调整一下： 

```CSS
.linear-gradient { 
    background-image: linear-gradient(36deg, #f09, #3023AE, #0ff); 
}
```

我试着一步一步解释这个渐变角度意味着什么？ 

首先在元素上绘制一个垂直轴，并将它旋转 `36deg`。这条轴我们称为梯度轴： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4394550ebea74272be374f30dd18e6cf~tplv-k3u1fbpfcp-zoom-1.image)

接下来，我们绘制最接近渐变轴的矩形的对角线。在我们的例子中，这是从左下到右上的对角线。在这个对角线上，我们指定了颜色点：`#f09` 在 `0%`，`#3023AE` 在 `50%`，`#0ff` 在 `100%`。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f4862206c484066b29a8f70cdaaa264~tplv-k3u1fbpfcp-zoom-1.image)

现在还缺三条线，这两条线贯穿给定的颜色点，并且与梯度轴正交。我们把它们称为颜色停止轴。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c5887fb8410441fb4e4c1876d58623e~tplv-k3u1fbpfcp-zoom-1.image)

最后，可以绘制渐变。我们可以看到它精确地以指定的角度运行，但是在外部边缘可以看到定义为 `0` 和 `100%` 的颜色的一小部分：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33246be316514360a3882c2bbb0d5520~tplv-k3u1fbpfcp-zoom-1.image)

从上图中可以轻易发现，对角线，渐变轴和颜色停止轴构成了一个直角三角形。应用 **[泰勒斯定理](https://zh.wikipedia.org/wiki/泰勒斯定理)**，我们可以在这个三角形周围画一个圆。如果我们在剩下的三个角重复整个过程，就能得到一个有点像花的图形。当梯度旋转时，它的端点沿这个花形状的外线运行。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9ce69df95a14a92b86bbc6a051dd3d0~tplv-k3u1fbpfcp-zoom-1.image)

[@Nils Binder 在 Codepen 通过一个 Demo](https://codepen.io/enbee81/full/zYrXVGo)，完美实现了上述提到的每个过程：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd00ebd121ec4f998d91d95de1e3c021~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/ExeRoZZ

[其实在规范中也对渐变线做出了很详细的解释](https://dev.w3.org/csswg/css-images/#linear-gradient-syntax)。如果 `W` 是渐变容器的宽度，`H` 是渐变容器的高度，`A` 是渐变角度，那么渐变线的长度可以通过下面的公式计算：

```CSS
abs(W * sin(A)) + abs(H * cos(A)) 
```

 

### 为什么需要重复渐变？

`linear-gradient()` （线性渐变）、`radial-gradient()` （径向渐变）和 `conic-gradient()` （锥形渐变）都有一个以  **`repeating-`** 前缀的渐变函数，它们被称为**重复渐变**：

- **重复线性渐变** ：`repeating-linear-gradient()`； 
- **重复径向渐变** ：`repeating-radial-gradient()`； 
- **重复锥形渐变** ：`repeating-conic-gradient()`。 

重复渐变采用了一种技巧，可以在 `linear-gradient()`、`radiial-gradient()` 和 `conic-gradient()` 的基础上创造性地使用渐变颜色，并为我们所用。

我们可以使用它们创造出图案，并允许它们无限地重复。当渲染时，渐变颜色停止点（渐变颜色停止位置）在两个方向无限重复，它们的位置以最后一个指定的颜色停止位置与第一个指定的颜色停止位置之差的倍数移动。例如， `repeating-linear-gradient(red 10px, blue 50px)` 等同于 `linear-gradient(..., red -30px, blue 10px, red 10px, blue 50px, red 50px, blue 90px, ...)`。

请注意，最后一个颜色停止位置和第一个颜色停止位置总是在每一组的边界上重合，如果渐变的开始和结束颜色不相同，就会产生尖锐的过渡。比如： 

```CSS
.repeating-linear-gradient {
    background-image: repeating-linear-gradient( 
        to right, 
        red, 
        red 20px, 
        gold 20px, 
        gold 40px
    ); 
}

.repeating-radial-gradient {
    background-image: repeating-radial-gradient( 
        red, 
        red 20px, 
        gold 20px, 
        gold 40px 
    );
}

.repeating-conic-gradient {
    background-image: repeating-conic-gradient(red, gold 20deg); 
}
```

 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed774b880c604a32886cda6f11796daf~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/vYzrdzE

先来看一下它们的工作原理。以重复线性渐变为例吧。

```CSS
.linear-gradient {
    background-image: linear-gradient(90deg, red, gold)
}
```

这是一个简单的线性渐变，我们在该基础上添加一个 `background-size: 40px`，同时在 `x`轴 `repeat`：

```CSS
.linear-gradient {
    background-image: linear-gradient(90deg, red, gold);
    background-size: 40px;
    background-repeat: repeat-x;
}
```

 你将看到像下图这样的效果： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/017f16b92e684610bd604a1522a73adb~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/RwYJQvW

最终的效果经历了三个过程： 

- 使用 `linear-gradient(90deg, red, gold)` 绘制了一张渐变图像，该图像默认尺寸是容器的宽高 ；
- 接着使用 `background-size: 40px` 将 `linear-gradient(90deg, red, gold)` 创建的图像尺寸设置为宽度是 `40px`，高度是容器的高度； 
- 使用 `background-repeat: repeat-x`，将 `linear-gradient(90deg, red, gold)` 创建的图像沿着容器的 `x` 轴方向水平平铺，将会铺满整个容器。 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c04a631de204fc2b214aa977c91bdc9~tplv-k3u1fbpfcp-zoom-1.image)

将上面的示例稍作调整： 

```CSS
.linear-gradient { 
    background-image: linear-gradient( 
        90deg, 
        red, 
        red 50%, 
        gold 50%, 
        gold 100% 
    ); 
    background-size: 40px; 
    background-repeat: repeat-x; 
} 
```

整个效果会更清晰： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1daaf5c9349d4f3496fa1304f77112a3~tplv-k3u1fbpfcp-zoom-1.image)

这两个示例演示的效果，其实就是一种背景图像重排的效果。

也就是说，就这两个效果，我们可以使用 `repeating-linear-gradient()` 函数来实现： 

```CSS
.repeating-linear-gradient { 
    background-image: repeating-linear-gradient( 
        90deg, 
        red, 
        red 0, 
        gold 40px, 
        gold 40px 
     ); 
} 

.repeating-linear-gradient { 
    background-image: repeating-linear-gradient( 
        90deg, 
        red, 
        red 20px, 
        gold 20px, 
        gold 40px 
    ); 
} 
```

效果如下： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73ab094625cb4d4ba98f21bc052ce55c~tplv-k3u1fbpfcp-zoom-1.image)

如果我们把渐变容器宽度设置为 `40px` 时，这两个重复线性渐变效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8dc61a1ef1644a6aae55906a57f5449e~tplv-k3u1fbpfcp-zoom-1.image)

在 `repeating-linear-gradient()` 函数中，上面的效果也被称为**基准渐变长度**，它看上去像是 `background-size` 指定的长度。也就是说重复线性渐变中渐变颜色（色标位置）的偏移量都是基准渐变长度（最后一个色标和第一个色标的距离），这也是每次重复时的长度。

那么 `repeating-linear-gradient()` 函数会以这个基准渐变长度重复排列（有点类似于 `background-repeat`）。当容器宽度超过这个基准渐变长度时，那么 `repeating-linear-gradient()` 色标位置的偏移量就是这个基准渐变长度的倍数：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9568997c66048769013cba658cff4a7~tplv-k3u1fbpfcp-zoom-1.image)

因此，最后色标的色值应该与第一个色标的色值保持一致；如果不一致的话，会导致非常突兀的渐变效果。 

与其他渐变一样，`repeating-linear-gradient()` 也没有提供固定的尺寸；即，它没有原始尺寸或首选尺寸，也没有首选的比例。它将自适应于对应的元素的尺寸。

 就上面的示例而言，使用 `linear-gradient()` 和 `background-size` 相结合能实现类似于 `repeating-linear-gradient()` 的效果，那么为什么还需要 `repeating-linear-gradient()` 呢？ 

先来看一个示例：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9e0c71b64fa4eba929f1f19e449756b~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/yLxEKxr

你可能已经看到了看到它们之间的差异。

假设，我们把渐变角度调整为 `45deg` 。先把渐变容器尺寸宽度都调整为 `40px`，刚好是 `repeating-linear-gradient()` 的一个基准渐变长度：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c7e90150bef43e89197b0bed0207dd1~tplv-k3u1fbpfcp-zoom-1.image)

从上图中我们可以获知，如果用 `linear-gradient()` 和 `background-size` 实现 `repeating-linear-gradient()` 的效果，将需要使用 `linear-gradient()` 绘制下图：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9bbfb070473f4265ae1cc31ec8d50d23~tplv-k3u1fbpfcp-zoom-1.image)

这将会需要一定的数学知识：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8553d2a1c735484f9960ebe328e3ff3d~tplv-k3u1fbpfcp-zoom-1.image)

正如上图所示，需要计算出渐变线 `AD` 的长度，以及 `AB`（`AB'`）、`AC`（`AC'`）的长度，这样就可以知道 `B`（`B'`）点和 `C`（`C'`）点的位置。这样就可以使用 `linear-gradient()` 绘制出与 `repeating-linear-gradient()` 类似的斜纹效果。

除了上面这个公式之外，还有更简单的计算方式。我们所要的条纹效果，其实有点类似于使用了下图在容器中平铺得来：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30b3ba6c90d2483a97e098709a9769c8~tplv-k3u1fbpfcp-zoom-1.image)

它包含了四条纹理，而不是这里的两条，所以看起来像是无缝连接的。我们可以使用 `linear-gradient()` 描述类似上图的位图：

```CSS
 .linear-gradient { 
    background-image: linear-gradient(
        45deg, 
        red 25%, 
        gold 25%, 
        gold 50%, 
        red 50%, 
        red 75%, 
        gold 0
    ); 
    background-size: 40px 40px; 
} 

.repeating-linear-gradient {
    background-image: repeating-linear-gradient(
        45deg, 
        red 0,
        red 10px,
        gold 10px, 
        gold 20px
    ); 
}
```

虽然这样能实现类似于 `repeating-linear-gradient()` 创建的斜文效果，但是每条条纹看起来要小得多：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3788ea583f7e4469b4a0ed5960734a43~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/qBMKoGq

为了解释这个问题，我们需要使用学校里学到的勾股定理来计算直角三角形的各边变长。勾股定理指出，最长边等于其他两边的平方和。在直接三角形中，两条短边相等，所以最长边就等于：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/602e3c7a0e334af6a6ee46dfd692a185~tplv-k3u1fbpfcp-zoom-1.image)

在创建这个斜纹中，`background-size` 指定的就是三角形最长边的边长，因此纹理的宽度就是直角边的长度。在大小为 `40px` 时 ，`background-size` 的值为 `40 × √2`（即 `40 * Math.sqrt(2)`），大约等于 `56.5685px`。修正之后的： 

```CSS
.linear-gradient { 
    background-image: linear-gradient( 
        45deg, 
        red 25%, 
        gold 25%, 
        gold 50%, 
        red 50%, 
        red 75%, 
        gold 0 
    ); 
    background-size: 56.5685px 56.5685px; 
} 
```

效果如下： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7df5128da49b48b6bb5849fc9e043928~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/poOKVoX

现在虽然在视觉效果上看上去相似了，但决不能说 `linear-gradient()` 和 `background-size` 结合就可以替代 `repeating-linear-gradient()`。比如，我们角度换成一个 `30deg`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/194408ad98464028b1c248867887ee73~tplv-k3u1fbpfcp-zoom-1.image)

是不是惨不忍睹！换句话说，这个示例也从侧面告诉我们，在 CSS 中为什么需要重复渐变。

虽然说，`linear-gradient()` 和 `background-size` 很多时候可以模拟出 `repeating-linear-gradient()` 效果，但 `repeating-radial-gradient()` 和 `repeating-conic-gradient()` 就没那么容易了。

```CSS
.radial-gradient {
    background-image: radial-gradient( 
        circle at center, 
        red 25%, 
        gold 25%, 
        gold 50%, 
        red 50%, 
        red 75%, 
        gold 0 
    ); 
    background-size: 20% 20%;
    background-repeat: repeat;
}

.repeating-radial-gradient {
    background-image: repeating-radial-gradient(
        circle at center,
        red,
        red 20px,
        gold 20px,
        gold 40px
    );
}

.conic-gradient { 
    background-image: conic-gradient(
        red 0 33%, 
        gold 33% 66%, 
        #09f 66%
    ); 
    background-size: 20% 20%;
    background-repeat: repeat;
} 

.repeating-conic-gradient { 
    background-image: repeating-conic-gradient( 
        red 0 8.33%, 
        gold 8.33% 16.66%, 
        #09f 16.66% 24.999% 
    ); 
}    
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5af5613a1702459baa754d041b36ceab~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/GRXGdNB

另外，`reapeating-conic-gradient()` 和 `repeating-radial-gradient()` 语法也有点相似。像非重复的锥形渐变一样，**重复部分的大小是从最后一个颜色停止的角度减去的第一个颜色停止** ： 

```CSS
.repeating-radial-gradient { 
    background-image: repeating-radial-gradient( 
        red 0 8%, 
        gold 8% 16%, 
        #09f 16% 24% 
    ); 
} 

.repeating-conic-gradient { 
    background-image: repeating-conic-gradient( 
        red 0 8.33%, 
        gold 8.33% 16.66%, 
        #09f 16.66% 24.999% 
    ); 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a72be7d1ea684aa3981c4f9dcf05f360~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/ZEMRoaW

但是它们之间也有一定的差异：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a89ebd2d0d14f71a21a79a3b9200863~tplv-k3u1fbpfcp-zoom-1.image)

我想，现在你知道为什么需要重复渐变了。事实上，在 Web 开发中，重复渐变所起的作用也是很强的，它们可以构建出很多复杂的 UI 效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e09a292acd394385a179d60086dc7564~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/collection/DgYaMj/

### 缓动渐变

缓动渐变并不是 W3C 规范中的。但是缓动函数能给我们的渐变带来质的变化，就拿线性渐变来举例，线性渐变在开始和（或）结束的地方通常会硬边。我们可以通过缓动函数来控制颜色组合避免这种现象。 

在 CSS 中，缓动函数主要被运用于 `transition` 和 `animation` 中的 `transition-timing-function` 和 `animation-timing-function` 中。除了常见的 `linear`、`ease`、`ease-in`、`ease-out`、`ease-in-out` 和 `steps()` 等，还有 `cubic-bezier`。在将来或现在借助于 PostCSS 插件的能力，我们也可以在渐变中使用 [缓动函数](https://larsenwork.com/easing-gradients/)。 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f03b517c7eb54ddcb707cd7bc504ef45~tplv-k3u1fbpfcp-zoom-1.image)

对应的代码： 

```CSS
.ease-gradient { 
    background-image: linear-gradient( 
        to top left, 
        hsl(294 100% 45% / 0.48), 
        cubic-bezier(0.7, 0.04, 0, 0.89), 
        hsl(160 98% 43% / 1) 
    ); 
};
```

编译出来的代码： 

```CSS
.ease-gradient { 
    background-image: linear-gradient( 
        to top left, 
        hsl(294.00  100.00% 45.10% / 0.48) 0%, 
        hsl(293.30  80.68%  49.61% / 0.49) 12.2%, 
        hsl(292.45  75.26%  53.52% / 0.509) 21.3%, 
        hsl(291.37  69.66%  56.71% / 0.537) 27.7%, 
        hsl(289.80  62.60%  59.38% / 0.571) 32%, 
        hsl(287.27  54.11%  61.65% / 0.611) 34.8%, 
        hsl(282.77  44.32%  63.59% / 0.656) 36.6%, 
        hsl(273.82  33.39%  65.24% / 0.702) 38%, 
        hsl(252.05  21.60%  66.63% / 0.75) 39.6%, 
        hsl(206.45  18.85%  64.00% / 0.798) 41.8%, 
        hsl(173.58  23.29%  60.54% / 0.844) 45.2%, 
        hsl(161.14  36.33%  59.40% / 0.887) 50.4%, 
        hsl(156.93  48.21%  57.48% / 0.926) 57.9%, 
        hsl(155.95  58.42%  54.65% / 0.959) 68.3%, 
        hsl(156.83  66.73%  50.56% / 0.984) 82.2%, 
        hsl(159.91  98.17%  42.94%) 100% 
    ); 
} 
```

除了使用上面的在线编辑工具之外，还可以使用 PostCSS 的插件 **[postcss-easing-gradients](https://github.com/larsenwork/postcss-easing-gradients)** 。我们可以像下面这样引入该插件：

```CSS
 linear-gradient([ <direction>,]?<color>,<animation-timing-function>,<color>) 
```

我们就可以像下面这样使用： 

```CSS
.cubic-bezier { 
    background-image: linear-gradient(
        to bottom, 
        black, 
        cubic-bezier(0.48, 0.3, 0.64, 1), 
        transparent
    ); 
}
```

 编译出来的结果：

```CSS
.cubic-bezier{ 
    background-image: linear-gradient( 
        to bottom, 
        hsl(0 0% 0% / 0), 
        hsl(0 0% 0% / 0.94505) 7.9%, 
        hsl(0 0% 0% / 0.88294) 15.3%, 
        hsl(0 0% 0% / 0.81522) 22.2%, 
        hsl(0 0% 0% / 0.7426) 28.7%, 
        hsl(0 0% 0% / 0.66692) 34.8%, 
        hsl(0 0% 0% / 0.58891) 40.6%, 
        hsl(0 0% 0% / 0.50925) 46.2%, 
        hsl(0 0% 0% / 0.42866) 51.7%,
        hsl(0 0% 0% / 0.34817) 57.2%, 
        hsl(0 0% 0% / 0.2693) 62.8%, 
        hsl(0 0% 0% / 0.19309) 68.7%, 
        hsl(0 0% 0% / 0.12126) 75.2%, 
        hsl(0 0% 0% / 0.05882) 82.6%, 
        hsl(0 0% 0% / 0.01457) 91.2%, 
        hsl(0 0% 0% / 0) 
   ); 
} 
```

除了 PostCSS 插件之外，在一些设计软件中也有缓动渐变的插件：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42266421a4ca4602872f0532d8b5a69d~tplv-k3u1fbpfcp-zoom-1.image)

- Sketch 插件：[sketch-easing-gradient](https://github.com/larsenwork/sketch-easing-gradient)
- Figma 插件：[Easing Gradients](https://www.figma.com/community/plugin/781591244449826498)

比如 Figma 设置软件中，运用缓动渐变，可以像下面这样操作：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a86223d453a427188e6f8087bc885b4~tplv-k3u1fbpfcp-zoom-1.image)

```CSS
.ease-gradient {
    background-image: linear-gradient(
        98.83deg
        #FEBA0B, 
        cubic-bezier(0.00, 0.93, 1.00, 0.03), 
        #9308FF
    )  
}
```

转换出来的渐变：

```CSS
.ease-gradient {
    background-image: linear-gradient(
        98.83deg, 
        #FEBA0B -1.79%, 
        #ED9D32 -0.6%, 
        #E0884F 2.72%, 
        #D77964 7.87%, 
        #D16F71 14.5%, 
        #CE6A79 22.28%, 
        #CC677C 30.89%, 
        #CC667E 39.99%, 
        #CB657F 49.26%, 
        #CA6481 58.37%, 
        #C86085 66.97%, 
        #C45A8E 74.76%, 
        #BE4F9E 81.39%, 
        #B43EB4 86.53%, 
        #A627D4 89.86%, 
        #9308FF 91.04%
    );
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/67c27cbf27f7438ab27e70ffce34280a~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/KKxeBdR

从效果上来说，缓动渐变主要目的是构建一个细腻的渐变效果。其实，在使用渐变的时候，还有其他方式可以帮助我们构建相应的渐变效果。比如，可以用两个 `radial-gradient()` 来模拟一个 `linear-gradient()` 的效果。不过这个小技巧中有一个小小的限制，那就是两个 `radial-gradient()` 是相对角，这个模拟出来的效果要比 `linear-gradient()` 效果更柔和：

```CSS
.linear-gradient {
    background-image: 
        radial-gradient( 
            circle at top right, 
            hsl(var(--cyanHSL)), 
            hsl(var(--cyanHSL) / 0%) 
        ), 
        radial-gradient( 
            circle at bottom left, 
            hsl(var(--pinkHSL)), 
            hsl(var(--pinkHSL) / 0%
        ) 
     );
 } 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5fbe70a9001a425bb77261ad516fd0d1~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/QWVBEpQ

我们来看一个对比效果：

```CSS
.linear-gradient { 
    background-image: linear-gradient( 
        to top right, 
        var(--cyanHSL), 
        var(--pinkHSL) 
    ); 
} 

/* 两个径向渐变模拟出一个线性渐变 */
.radial-gradient { 
    background-image: 
        radial-gradient(
            circle at left bottom,
            var(--cyanHSL),
            var(--pinkHSL)
        ), 
        radial-gradient(
            circle at top right, 
            var(--cyanHSL), 
            var(--pinkHSL)
        ); 
 }
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/957db8f930724ce9a87840da7adf00a8~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/KKxBMme

除了径向渐变之外，我们可以使用锥形渐变来创建微妙的渐变效果。比如，[@Adam Argyle 设计的一个小型 CSS 库](https://www.conic.style/)，提供了很多好看的圆锥渐变，但它呈现出来的效果更像是线性渐变效果。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0be4ecfacf04db0b77861ebbfc7b88a~tplv-k3u1fbpfcp-zoom-1.image)

> Conic.css：https://www.conic.style/

正如《[如何构建响应式 UI？](https://juejin.cn/book/7161370789680250917/section/7165496907714789407)》一文所述，我们平时可能会像下面这样，给元素添加一个渐变背景效果：

```CSS
.element { 
    background: linear-gradient(135deg, #2c3e50, #2c3e50 60%, #3498db); 
}
```

但很少有同学会留意，上面的渐变效果在不同屏幕（或不同尺寸的元素上）的效果是有一定差异的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e52c65068374b128d366e6ae1a1e909~tplv-k3u1fbpfcp-zoom-1.image)

如果想让渐变的效果在桌面端和移动端上看上去基本一致，一般会使用媒体查询来调整渐变颜色的位置：

```CSS
.element { 
    background: linear-gradient(135deg, #2c3e50, #2c3e50 60%, #3498db); 
}

@media only screen and (max-width: 700px) { 
    .element { 
        background: linear-gradient(135deg, #2c3e50, #2c3e50 25%, #3498db); 
    } 
}
```

现在，我们可以使用 `min()` 函数，让事情变得更简单：

```CSS
.element { 
    background: linear-gradient(135deg, #2c3e50, #2c3e50 min(20vw, 60%), #3498db); 
} 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/540e471c5a3f4274bc46bcce82fe8dee~tplv-k3u1fbpfcp-zoom-1.image)

另外，[平时在处理图片上文字效果时，为了增强文本可阅读性](https://juejin.cn/book/7199571709102391328/section/7199845718343811076)，你可能会在文本和图片之间增加一层渐变效果。那么这个时候，使用 `max()` 函数控制渐变中透明颜色位置就会有意义得多：

```CSS
.element { 
    background: linear-gradient(to top, #000 0, transparent max(20%, 20vw)); 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/845b5ee8cb3941fcae86d64f17f3d634~tplv-k3u1fbpfcp-zoom-1.image)

### 渐变的“灰色死亡区”

CSS 渐变中有一个有趣的渐变现象。如果从一个颜色到另一个颜色渐变，在这两个渐变颜色之间会存在一个“灰色死亡区”：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e5afd2ac97440c591c5162cdbf712a9~tplv-k3u1fbpfcp-zoom-1.image)

这是真的。请看中间的灰色区域:

```CSS
body {
    background: linear-gradient(to right, yellow, blue);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/367482b84547411d9fc494428bac19dd~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/MWqBeQZ

你也可以看到颜色可能做不到这一点，比如这里的红色和蓝色正好穿过紫色，你可以在上面的颜色圈中看到。

```CSS
body {
    background: linear-gradient(to right, red, blue);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a7e08340cae46eb847b327393223ff2~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/xxaJOjx

针对这个现象，它有一个解决方案，那就是**绕道而不是直接穿过灰色地带** :

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7771cd8bec14023b857b4b9268441a9~tplv-k3u1fbpfcp-zoom-1.image)

```CSS
.linear-gradient {
    background: linear-gradient(
        90deg, 
        #1f005c, 
        #5b0060, 
        #870160, 
        #ac255e, 
        #ca485c, 
        #e16b5c, 
        #f39060, 
        #ffb56b
    );
}
```

简单地说，**使用不同的“插值模式”可以避免两个颜色之间的灰色死亡区，并通过选择精确的停止位置（渐变颜色的停止位置）来缓解渐变** 。在线的 [VIVID GRADIENT GENERATOR TOOL](https://www.learnui.design/tools/gradient-generator.html) 工具可以帮助你在两个渐变颜色之间使用插值模式：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9aaffdbb8bce4cdbafe0faa32972e2d4~tplv-k3u1fbpfcp-zoom-1.image)

> 工具地址：https://www.learnui.design/tools/gradient-generator.html

其实，上面所介绍的“缓动渐变”、两个径向渐变构建线性渐变和锥形渐变，都可以帮助我们使用线性渐变时，避免出现渐变之间的死亡灰色区。

### 缓解 CSS 渐变带

我们在使用 CSS 渐变时，个别浏览器在渲染渐变时会产生条纹：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4d602c0cd114e3e961a21974791efc6~tplv-k3u1fbpfcp-zoom-1.image)

这可能是个别浏览器在渲染渐变时存在的问题，我想有一天浏览器自身就能修复。如果你在使用渐变时碰到相似的现象，那么可以考虑使用“阶梯式渐变”来修复。

简单地说，阶梯式渐变不是从颜色 `A` 到颜色 `B` 之间的渐变，而是从颜色 `A` 到颜色 `A1` 的一系列渐变，然后是颜色 `A1` 到颜色 `A2` ，直到颜色 `An` 到颜色 `B` ，其中颜色 `Ax` 每次都更接近颜色 `B` 。

我们可以考虑 CSS 处理器，比如 SCSS 来帮助我们构建：

```SCSS
@import "compass/css3";

$g: transparent;
$bg-color: #09f;
$steps: 20;

@for $i from 3 to $steps {
    $g: append($g, fade-out($bg-color, 1 / $i) percentage($i / $steps), comma);
    $g: append($g, fade-out($bg-color, 1 / $i) percentage(($i + 0.6) / $steps), comma);
}

$g: append($g, $bg-color);

body {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right, $g);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/083b315ac8d74a30ad7b3f8a79ceebea~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/abajZev

注意，上面示例代码依赖于 SCSS 编译器 [compass](https://compass.kkbox.com/)。编译出来的 CSS 渐变代码如下：

```CSS
body {
    background: linear-gradient(
        to right, 
        rgba(0, 0, 0, 0), 
        rgba(0, 153, 255, 0.66667) 15%, 
        rgba(0, 153, 255, 0.66667) 18%, 
        rgba(0, 153, 255, 0.75) 20%, 
        rgba(0, 153, 255, 0.75) 23%, 
        rgba(0, 153, 255, 0.8) 25%, 
        rgba(0, 153, 255, 0.8) 28%, 
        rgba(0, 153, 255, 0.83333) 30%, 
        rgba(0, 153, 255, 0.83333) 33%, 
        rgba(0, 153, 255, 0.85714) 35%, 
        rgba(0, 153, 255, 0.85714) 38%, 
        rgba(0, 153, 255, 0.875) 40%, 
        rgba(0, 153, 255, 0.875) 43%, 
        rgba(0, 153, 255, 0.88889) 45%, 
        rgba(0, 153, 255, 0.88889) 48%, 
        rgba(0, 153, 255, 0.9) 50%, 
        rgba(0, 153, 255, 0.9) 53%, 
        rgba(0, 153, 255, 0.90909) 55%, 
        rgba(0, 153, 255, 0.90909) 58%, 
        rgba(0, 153, 255, 0.91667) 60%, 
        rgba(0, 153, 255, 0.91667) 63%, 
        rgba(0, 153, 255, 0.92308) 65%, 
        rgba(0, 153, 255, 0.92308) 68%, 
        rgba(0, 153, 255, 0.92857) 70%, 
        rgba(0, 153, 255, 0.92857) 73%, 
        rgba(0, 153, 255, 0.93333) 75%, 
        rgba(0, 153, 255, 0.93333) 78%, 
        rgba(0, 153, 255, 0.9375) 80%, 
        rgba(0, 153, 255, 0.9375) 83%, 
        rgba(0, 153, 255, 0.94118) 85%, 
        rgba(0, 153, 255, 0.94118) 88%, 
        rgba(0, 153, 255, 0.94444) 90%, 
        rgba(0, 153, 255, 0.94444) 93%, 
        rgba(0, 153, 255, 0.94737) 95%, 
        rgba(0, 153, 255, 0.94737) 98%, 
        #0099ff
    );
}
```

编译出来的代码看上去和缓动函数工具生成出来的代码是非常相似的。也就是说，如果你在构建 Web 时，没有使用 CSS 处理器，也可以使用上面所介绍的缓动渐变工具来避免这个现象。

### 关于渐变和“透明黑色”的一件事

我们在 CSS 中使用渐变的时候，经常会使用到从一个颜色到完全透明之间的渐变。比如，下面这个示例，从一个红色（`red`）到 `transparent` （透明）之间的渐变：

```CSS
.linear-gradient {
    background: linear-gradient(
        to bottom,
        red, 
        transparent
    );
}
```

我想很多 Web 开发者都习惯于使用 `transparent` 来代表完全透明。但它（`transparent`）运用于渐变中时，有这么一个现象，大家可能不知道（或忽略）。即，在 Safari （尤其是 iOS 系统中的 Safari）浏览器，会将 `transparent` 视为“透明黑”。因此，在 Chrome ，Firefox 看到的效果是红色到透明之间的渐变，而在 Safari 中看到的是红色到黑色之间的透明：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8986fc3690a54df2a72a03ed49da0ea0~tplv-k3u1fbpfcp-zoom-1.image)

要避免这个问题，你必须将颜色设置为该颜色的完全透明版本。如:

```CSS
.linear-gradient {
    background: linear-gradient(
        to bottom,
        red, 
        rgb(255 0 0 / 0) /* red 颜色对应的完全透明色 */
    );
}
```

对于十六进制代码来说，这并不总是那么容易，因为十六进制颜色并不像 `RGB` 或 `HSL` 等颜色函数，可以很容易在此基础上将其透明度设置为 `0` 。当然，在互联网上并不难找到将一个十六进制颜色转换为完全透明的颜色的方法，比如，浏览器的 Web 调试工具就能直接做到：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d17bf9336204d2f8b731766b2225a50~tplv-k3u1fbpfcp-zoom-1.image)

```CSS
.linear-gradient {
    background: linear-gradient(
        to bottom,
        #f00, 
        #f000
    );
}
```

在未来，你可以直接使用 [CSS Color Module Level 4 模块中的 color() 函数](https://www.w3.org/TR/css-color-4/#resolving-color-function-values)，会让这变得更容易，比如:

```CSS
.linear-gradient {
    background: linear-gradient(
        to bottom,
        #eb8fa9,
        color(#eb8fa9 alpha(0%))
    );
}
```

### 如何修复 body 中的渐变分隔带

我们时常会在 `body` 元素上运用 CSS 的渐变，但当 `body` 的 `height` 为 `100%` 时，运用于 `body` 上的渐变很易于产生明显的分隔带。

```CSS
html {
    height: 100vh;
}

body {
    height: 100%;
    background: linear-gradient(to bottom, red, blue);
}
```

当 `body` 元素内容变多出现滚动条时，运用于 `body` 的线性渐变就会有明显的分隔条出来：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b776e6ebbea54dd39e711b7ccfcdb2bd~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/dyqjpZZ

如果你在 `body` 上设置了 `background-repeat` 的值为 `no-repeat`，超出浏览器视窗高度时，将会以 `body` 的背景色呈现（默认是白色），即只第一屏幕有渐变效果：

```CSS
html {
    height: 100vh;
}

body {
    height: 100%;
    background: linear-gradient(to bottom, red, blue) no-repeat;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9db40de63e634458a5db86ab13a06f13~tplv-k3u1fbpfcp-zoom-1.image)

虽然，将 `html` 的 `height: 100vh` 调整为 `min-height: 100vh` ，可以避免运用于 `body` 的渐变出现明显的分隔带，但同时也改变运用于 `body` 的渐变效果，整个渐变效果会因 `body` 的高度变得不一样：

```CSS
html {
    min-height: 100vh;
}

body {
    height: 100%;
    background: linear-gradient(to bottom, red, blue);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5554423bb7d643ca80b12cef5ee100e0~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/oNPMzdo

虽然从效果上有了一定的改善，运用于 `body` 上的渐变不再有明显的分隔带，但运用于 `body` 的渐变也会随其内容高度而变化。这其实也并不符合期望的效果，我们所期望的是，**不管** **`body`** **内容如何改变，运用于** **`body`** **上的渐变效果都是一样的**：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9014f81586324bbb886325b2520216f5~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/BaOPLPb

要达到上图所期望的效果，我们可以在 `body` 中设置 `background-attachment: fixed;` ，让渐变图像不会随着滚动容器的滚动而滚动：

```CSS
html {
    min-height: 100vh;
}

body {
    height: 100%;
    background: linear-gradient(to bottom, red, blue);
    background-attachment: fixed;
}
```

这样可以使背景保持在一个固定的位置，这肯定会使你的页面看起来更好。

### CSS 渐变动效

熟悉 CSS 的 Web 开发者应该知道，在 Web 开发中，可以使用 CSS 的 `transition` 和 `animation` 给 Web 添加动画效果。但是给渐变添加动画效果目前还有很多局限性，如果不添加额外的元素或其他的渐变属性，有些效果是无法实现的，比如下面这个效果。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/321a5a70f87a45ac90cc38fa324d6966~tplv-k3u1fbpfcp-zoom-1.image)

只不过，按照常规的方式是无法实现上面动画效果的，比如：

```CSS
body { 
    background: linear-gradient(90deg, #f90 0%, #444 0) 50%/ 5em; 
    animation: blinds 1s ease-in-out infinite alternate; 
} 

@keyframes blinds { 
    to { 
        background-image: linear-gradient(90deg, #f90 100%, #444 0); 
    } 
}
```

而且，往往只能通过改变 `background-position` 的值来改变渐变效果，从而看上去得到一个渐变相关的动效：

```CSS
.button,
.button::after{
    background: linear-gradient(-45deg, #ffa63d, #ff3d77, #338aff, #3cf0c5);
    background-size: 600%;
    animation: anime 16s linear infinite;
}

@keyframes anime {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd46ae3e16774534adbee5a0d2f84dc7~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：[防御式 CSS--#206: Animated gradient button](https://codepen.io/airen/full/PodBbGM)

还有就是通过改变整个运用了渐变元素的效果，来实现类似渐变改变的动画效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c58c7a3328464e2088476778d3c68eb6~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/vYzayJM

庆幸的是，[CSS Properties and Values API Level 1](https://drafts.css-houdini.org/css-properties-values-api-1/#at-property-rule) 中的 `@property` 规则，可以让我们使用 CSS 自定义属性，即允许我们显式地定义属性的类型，这样浏览器就知道如何在值之间进行插件计算。

`@property` 的使用很简单：

```CSS
@property --css-custom-property-name {
    syntax: '<integer>';
    inherits: false;
    initial-value: 0;
}
```

我们只需要在渐变中使用 `@property` 定义的自定义属性，就可以将该自定义属性（变量）进行插件计算，让渐变因 `@property` 定义变量真的动起来。

也就是说，使用 `@property` 分别定义：

- `--color` 改变渐变颜色，让渐变颜色动起来；
- `--position` 改变渐变颜色停止位置，让渐变颜色动起来；
- `--angle` 改变渐变线方向，让渐变动起来。

拿 `--color` 为例：

```CSS
@property --c {
    syntax: '<color>';
    inherits: false;
    initial-value: red;
}

.box {
    --c:red; 
    background:linear-gradient(var(--c),blue);
    animation: animationColor 2s linear infinite;
}

@keyframes animationColor {
    from {
        --c: red;
    }
    to {
        --c: green;
    }
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f55b582ad3d041208cb532a77ead5188~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/vYzayQB

使用这种方式，就可以很轻易实现开始提到的动画效果：

```CSS
@property --pos {
    syntax: "<length-percentage>";
    initial-value: 0%;
    inherits: false;
}
@property --c0 {
    syntax: "<color>";
    initial-value: red;
    inherits: false;
}
@property --c1 {
    syntax: "<color>";
    initial-value: red;
    inherits: false;
}
body {
    --c0: #f90;
    --c1: #444;
    background: linear-gradient(90deg, var(--c0) var(--pos, 0%), var(--c1) 0) 50%/5em;
    animation: a 0s infinite;
    animation-name: c0, pos, c1;
    animation-duration: 2s, 1s;
    animation-timing-function: steps(1), ease-in-out;
}

@keyframes pos {
    90%, 100% {
        --pos: 100% ;
    }
}
@keyframes c0 {
    50% {
        --c0: #444 ;
    }
}
@keyframes c1 {
    50% {
        --c1: #f90 ;
    }
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fed5a7ea4670435d8e0d9c636fcd6953~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/XWPBNGB

我们还可以将它们运用于 `mask` ，让交互效果更具一定的创意：

```CSS
@property --conic-mask {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 0%;
}

figure::before {
    --conic-mask: 0%;
    mask: conic-gradient(from 0deg at 50% 50%, #000 var(--conic-mask), #0000);
    transition: --conic-mask 1s ease-out;
  background: linear-gradient(0deg, #09f2, #90f5);
}

figure:hover::before {
    --conic-mask: 100%;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/748a6314debe4ca7ad2ac0252fb910bb~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/ExepNBO

### 修复渐变中的锯齿

我们在使用 CSS 渐变时，会从一个颜色到另一个颜色硬过渡，比如：

```CSS
:root {
    --angle: 45deg;
}
body {
   background: linear-gradient(var(--angle), #000 50%, #f00 50%, #f00);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd7dc10ceffc4608a4bc9e93f3ee0b89~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/vYzagOO

两种颜色过渡间很易于产生锯齿：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41e47353fd67461584d47d9c57603948~tplv-k3u1fbpfcp-zoom-1.image)

有一个小技巧可以快速修复：

```CSS
body {
   background: linear-gradient(var(--angle), #000 49.95%, #f00 50.5%, #f00);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5944a74416694614b6f7f36d1253b7b4~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/dyqjNRY

除此之外，还有更高级的方法，那就是 **[Implementing FXAA](http://blog.simonrodriguez.fr/articles/2016/07/implementing_fxaa.html)** （Implementing FXAA 是什么，这里就不阐述了，已超出这节课的范畴  ）。比如下面这个示例，就是使用该方法来消除渐变锯齿的：

```CSS
:root {
    --angle: 45deg;
    --c1: #cd3f4f;
    --c2: #e6a964;
    --c3: #5996cc;
    --offsetX: 0.4px;
    --offsetY: -0.1px;
    --dark-alpha: 0.3;
    --light-alpha: 0.6;
    --line-width: 0.6px;
}

body {
    background-image: repeating-linear-gradient(
        var(--angle),
        var(--c1),
        var(--c1) 10px,
        var(--c2) 10px,
        var(--c2) 40px,
        var(--c1) 40px,
        var(--c1) 50px,
        var(--c3) 50px,
        var(--c3) 80px
    );
}
body::after {    
    content: '';
    position: absolute;
    top: var(--offsetY);
    left: var(--offsetX);
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-image: repeating-linear-gradient(
        var(--deg),
        var(--c3),
        transparent calc(0px + var(--line-width)),
        transparent calc(10px - var(--line-width)),
        var(--c2) 10px,
        var(--c1) 10px,
        transparent calc(10px + var(--line-width)),
        transparent calc(40px - var(--line-width)),
        var(--c1) 40px,
        var(--c2) 40px,
        transparent calc(40px + var(--line-width)),
        transparent calc(50px - var(--line-width)),
        var(--c3) 50px,
        var(--c1) 50px,
        transparent calc(50px + var(--line-width)),
        transparent calc(80px - var(--line-width)),
        var(--c1) 80px
    );
}    
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e01b8e968bb4d9d8ec9fdcd30d694ec~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/eYLjgMX

### 段落中每行渐变文本保持一致的渐变效果

前面介绍过，使用 CSS 的 `background-clip: text` 和 `text-fill-color` 构建渐变文本。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d1dae6e599043c4a9ea62a930a495ff~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/gOdjgZG

上图段落中的渐变文本有一个典型的特征，就是段落中每行文本渐变效果都是一样的。按照以往的技术手段，是无法实现的：

```CSS
p {
    background-image: linear-gradient(135deg, deeppink, dodgerblue);
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a45fccf36204e88b1340ef60d7fb985~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/MWqBJxR

怎么实现多行且不管任何填充角度都有相同效果？实现这个效果有一个关键的 CSS 属性：`box-decoration-break`，它有两个属性值：`slice` 和 `clone` ，其对应的效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be1547a393c144f29e488f53c0b2f2f1~tplv-k3u1fbpfcp-zoom-1.image)

用于一个段落中，其效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cdaffc36e07448b699db1850c51abb7f~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/qBMyrBa

正如你所看到的，使用 CSS 的 `background-clip:text`、`text-fill-color: transparent` （或 `color:transparent` )和 `box-decoration-break: clone` 能实现每行文本渐变填充的效果，而且每行效果相同。

## 小结

在 CSS 中，我们可以使用 `linear-gradient` （或 `repeating-linear-gradient`）、`radial-gradient` （或 `repeating-radial-gradient`）、`conic-gradient` （或 `repeating-conic-gradient`）绘制渐变。

使用它们绘制出来的渐变除了可以运用于背景（`background-image`）之外，还可以用于边框（`border-image`）、遮罩图像（`mask-image`) 等。它们除了能帮助 Web 开发者还原丰富的 UI 效果之外，还可以构建一些有创意的 UI 效果，比如渐变文本、镂空效果等。

渐变的使用其实很简单，但在使用渐变的过程中也有很多我们不熟知的一面，比如渐变中的百分比、角度计算、渐变中的灰色死亡区等。这节课向阐述了一些大家对渐变不太了解的知识，希望大家在使用 CSS 渐变时，就能考虑到这些，这样有助于浏览器渲染出来的渐变效果更易于达到预期。