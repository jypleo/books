Web 开发者对于 CSS 的 `border-radius` 属性并不会感到陌生，因为 Web UI 的圆角效果几乎都是使用 `border-radius` 来实现的。虽然 Web 开发者对于 `border-radius` 的**基础**运用是手到擒来，但对于 `border-radius` 属性中的一些细节，有可能是知其然不知其所以然。比如：

- `border-radius` 的百分比值（`%`）相对于谁计算？
- `border-radius` 嵌套会发生什么？
- `border-radius` 半径重叠会发生什么？
- `border-radius` 遇到 `transform` 会发生什么？
- 条件 `border-radius` 又是如何实现（又称响应式圆角）？

我将在这节课中与大家一起探讨这些方面，希望能帮助大家更好理解和掌握 `border-radius` 属性中不为人知的一面。

## border-radius 的基础使用

就 `border-radius` 的基础使用来说，它是很简单的，但我还是想花一点点时间来和大家一起重温下。先上张图：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fdc3e850e0be4b46b5847e9f9cc133be~tplv-k3u1fbpfcp-zoom-1.image)

上图就是 `border-radius` 属性最基础的运用，它和 `padding` 、`margin` 等属性是有点相似的，可以接受 `1 ~ 4` 个值，不同的是，`border-radius` 值代表的是元素框的顶角的圆角半径：

- **一个值** ：矩形框四个顶角的圆角半径都相等；
- **两个值** ：第一个值是矩形框左上角和右下角的圆角半径；第二个值是矩形框右上角和左下角的圆角半径；
- **三个值** ：第一个值是矩形框左上角的圆角半径；第二个值是矩形框右上角和左下角的圆角半径；第三个值是矩形框右下角的圆角半径；
- **四个值** ：第一个值是矩形框左上角的圆角半径；第二个值是矩形框右上角的圆角半径；第三个值是矩形框右下角的圆角半径；第四个值是矩形框左下角的圆角半径。

另外，`border-radius` 设置圆角半径时，还可以使用斜杆（`/`）分隔符设置 `x` 轴和 `y` 轴的半径，其中 `/` 前表示 `x` 轴方向半径，`/` 后表示 `y` 轴方向半径。如果在 `border-radius` 中没有使用 `/` 分隔符，表示圆角的 `x` 轴和 `y` 轴半径相等。比如：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f146839ca66140f98e3c3d8a5e3dbb8d~tplv-k3u1fbpfcp-zoom-1.image)

注意，`/` 分隔符前后都可以是 `1 ~ 4` 个值，每个值所达的含义与不带 `/` 分隔是相同的，唯一差别就是 `/` 分隔符前是 `x` 轴方半径，分隔符后是 `y` 轴方向半径。

另外，在 `border-radius` 属性上要使用 `/` 分隔符时，建议你养成一个较好的习惯，在 `/` 分隔前后添加一个空格符。下图展示了 `border-radius` 取两个值时，有没有带分隔符的差异：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34dc6c62a97c4eed95655296d0159d99~tplv-k3u1fbpfcp-zoom-1.image)

`border-radius` 也是一个简写属性，它可以拆分为四个属性：

- `border-top-left-radius` ：设置左上角圆角半径；
- `border-top-right-radius` ：设置右上角圆角半径；
- `border-bottom-right-radius` ：设置右下角圆角半径；
- `border-bottom-left-radius` ：设置左下角圆角半径。

```CSS
.box {
    border-radius: 5rem 2rem 4rem 3rem;
    
    /* 等同于 */
    border-top-left-radius: 5rem;
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 4rem;
    border-bottom-left-radius: 3rem;
}
```

如果你只想给元素框某一个顶点设置圆角，那么就可以使用 `border-top-left-radius` 、`border-top-right-radius` 、`border-bottom-right-radius` 或 `border-bottom-left-radius` 四个属性中的一个。比如：

```CSS
.radius-top-left {
    border-top-left-radius: 2rem;
    
    /* 等同于 */
    border-radius: 2rem 0 0 0;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f35a86a1f5d540e99b6eb498c24dd2eb~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/YzOxJaJ

有一点需要注意的是，`border-radius` 的子属性有对应的逻辑属性：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82e8f054240d4b078df9f738d23bf1c3~tplv-k3u1fbpfcp-zoom-1.image)

但不幸的是，`border-radius` 并没有对应的逻辑属性。也就是说，在处理多语言 Web 应用或 Web 页面时，无法直接使用 `border-radius` （除非四个圆角半径相同）来给 UI 设置圆角，只能使用相应的子属性，只有这样才能让圆角匹配不同的书写模式和文本方向：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec5e1661a71049cab8bb8db0ab8f7a77~tplv-k3u1fbpfcp-zoom-1.image)

```CSS
.element {
    border-start-start-radius: 10px;
    border-start-end-radius: 20px;
    border-end-start-radius: 30px;
    border-end-end-radius: 40px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5a49d682cf345d58ec5f8b6b7e02bab~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/MWqvzOV

CSS 的 `border-radius` 除了可以实现带有圆角的 UI 效果之外，还可以使用它来绘制一些图形，比如圆形、椭圆形等，甚至还可以使用它来构建一些带有艺术创意的 UI ：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee799a73bddd4719904247af5ffc69b6~tplv-k3u1fbpfcp-zoom-1.image)

上面所介绍的是 CSS `border-radius` 最基础的知识以及其作用。接下来，我们来探讨一些大家不知道的方面。

## border-radius 百分值相对于谁计算?

`border-radius` 值可以是：

- **固定值** ：带有固定单位的长度值（`<length>`），比如 `px` 单位值；
- **相对值** ：带有相对单位的长度值，比如百分比值（`%`）、视窗单位值（`vw` 、`vh` 等）、容器查询单位（`cqw` 、`cqh` 等）、`rem` 和 `em` 等；
- **函数值** ：`calc()` 、`min()` 、`max()` 和 `clamp()` 等函数表达式值。

相比而言，`%` 的取值是最为复杂的。特别是对于初学者而言，可能不太了解 `border-radius` 值为 `%` 时，它是相对于谁做计算。

`border-radius` 使用 `%` 值时，它的相对值是需要分开来计算的，其中 **`x`** **轴的** **`%`** **值相对于元素的** **`width`** **值计算；**`y` **轴的** **`%`** **值相对于元素的** **`height`** **值计算**，比如：

```CSS
.element {
    width: 300px;
    height: 300px;
    border-radius: 30% 70% 20% 40%;
}
```

上面示例中 `border-radius: 30% 70% 20% 40%;` 对应的计算结果是：

```CSS
x = width = 300px
y = height = 300px

a: 左上角（border-top-left-radius）
    ⇒ border-top-left-radius: 30% 
    ⇒ a(x) = a(y) = 300px × 30% = 90px

b: 右上角（border-top-right-radius） 
    ⇒ border-top-right-radius: 70% 
    ⇒ b(x) = b(y) = 300px × 70% = 210px

c: 右下角（border-bottom-right-radius）
    ⇒ border-bottom-right-radius: 20% 
    ⇒ c(x) = c(y) = 300px × 20% = 60px

d: 左下角（border-bottom-left-radius）
    ⇒ border-bottom-left-radius: 40% 
    ⇒ d(x) = d(y) = 300px × 40% = 120px
```

 

效果看上去像下图这样：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed09c9d8ecfe4e06b7806c75ca7ba85d~tplv-k3u1fbpfcp-zoom-1.image)

如果元素 `width` 和 `height` 不相等时：

```CSS
.element {
    width: 600px;
    height: 300px;
    border-radius: 30% 70% 20% 40%;
}
```

这个时候，`border-radius: 30% 70% 20% 40%;` 对应的计算结果是：

```CSS
x = width = 600px
y = height = 300px

a: 左上角（border-top-left-radius）
    ⇒ border-top-left-radius: 30% 
    ⇒ a(x) = 600px × 30% = 180px
    ⇒ a(y) = 300px × 30% = 90px

b: 右上角（border-top-right-radius）
    ⇒ border-top-right-radius: 70% 
    ⇒ b(x) = 600px × 70% = 420px
    ⇒ b(y) = 300px × 70% = 210px

c: 右下角（border-bottom-right-radius）
    ⇒ border-bottom-right: 20% 
    ⇒ c(x) = 600px × 20% = 120px
    ⇒ c(y) = 300px × 20% = 60px

d: 左下角（border-bottom-left-radius）
    ⇒ border-bottom-left: 40% 
    ⇒ d(x) = 600px × 40% = 240px
    ⇒ d(y) = 300px × 40% = 120px
```

效果看上去像下图这样：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ac85492acc948a4b457f55d719ac9e7~tplv-k3u1fbpfcp-zoom-1.image)

如果元素的 `width` 和 `height` 相等，但 `border-radius` 属性的值是一个带 `/` 分隔符号的八个值：

```CSS
.element { 
    width: 300px; 
    height: 300px; 
    border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%; 
}
```

对应的计算如下：

```CSS
x = width = 300px
y = height = 300px

左上角（border-top-left-radius）
    ⇒ border-top-left-radius: 70% / 60% 
    ⇒ a = x = 300px × 70% = 210px 
    ⇒ e = y = 300px × 60% = 180px

右上角（border-top-right-radius）
    ⇒ border-top-right-radius: 30% / 40% 
    ⇒ b = x = 300px × 30% = 90px
    ⇒ f = y = 300px × 40% = 120px

右下角（border-bottom-right-radius）
    ⇒ border-bottom-right-radius: 30% / 60% 
    ⇒ c = x = 300px × 30% = 90px
    ⇒ g = y = 300px × 60% = 180px

左下角（border-bottom-left-radius） 
    ⇒ border-bottom-left-radius: 70% / 40% 
    ⇒ d = x = 300px × 70% = 210px
    ⇒ h = y = 300px × 40% = 120px
```

对应的效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d29f1d54df044f2482619e2490d24fc7~tplv-k3u1fbpfcp-zoom-1.image)

同样的，如果元素的 `width` 和 `height` 值不同时，计算方式相似：

```CSS
.element {
    width: 600px;
    height: 300px;
    border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%;
}
```

对应的计算如下：

```CSS
x = width = 600px
y = height = 300px

左上角（border-top-left-radius）
    ⇒ border-top-left-radius: 70% / 60% 
    ⇒ a = x = 600px × 70% = 420px
    ⇒ e = y = 300px × 60% = 180px

右上角（border-top-right-radius）
    ⇒ border-top-right-radius: 30% / 40% 
    ⇒ b = x = 600px × 30% = 180px
    ⇒ f = y = 300px × 40% = 120px

右下角（border-bottom-right-radius）
    ⇒ border-bottom-right-radius: 30% / 60% 
    ⇒ c = x = 600px × 30% = 180px
    ⇒ g = y = 300px × 60% = 180px

左下角（border-bottom-left-radius） 
    ⇒ border-bottom-left-radius: 70% / 40% 
    ⇒ d = x = 600px × 70% = 420px
    ⇒ h = y = 300px × 40% = 120px
```

对应的效果如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f69258c1eb04580bfa45274c4eebd21~tplv-k3u1fbpfcp-zoom-1.image)

我想你已经知道了 `border-radius` 取百分比值，它是相对于谁进行计算了。在实际使用过程中，万一碰到圆角效果未达到自己预期，也知道如何修复：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a95a8d9b88e5495fa4fdc37162116287~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/eYLGRxL

## border-radius 嵌套时会发生什么？

在 Web 开发过程中，在使用 `border-radius` 的时候，有时会产生圆角嵌套的视觉效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4db923709c644fdaafd38a060d3ec36f~tplv-k3u1fbpfcp-zoom-1.image)

同一个元素上，发生圆角嵌套的场景一般会有：

- 带有边框的圆角场景；
- 带有内距的圆角场景；
- 同时带有边框和内距的圆角场景。

比如：

```CSS
.box {
    border-radius: 50px;
}

.box--border {
    border: 30px solid #f90;
}

.box--padding {
    padding: 30px;
}

.box--border--padding {
    padding: 30px;
    border: 30px solid #f36;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98ad863dcd8a4cc29702296d5627e991~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/Jjaryrd

正如上面示例所示，它们都产生了圆角嵌套的效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b8cffbf5be94db9a42bc0390216e5a6~tplv-k3u1fbpfcp-zoom-1.image)

CSS 的 `border-radius` 定义了元素外圆角，以下几个场景将会发生内圆角：

- 当 `border-radius` 的值大于 `border-width` 时，会产生内圆角，并且内圆角的半径为 `border-radius - border-width`；
- 当 `border-radius` 的值大于 `padding` 时，也会产生内圆角，并且内圆角的半径为 `border-radius - padding`。

上面这两种场景刚好对应的是上图中的左图和中间图。另外，要是元素同时出现 `border-radius`、`border-width` 和 `padding` ，将会产生多重内嵌套圆角，如上图最右侧效果。

设置 `border-radius` 的元素，会不会产生内圆角，取决于：

- 如果 `border-radius` 的值大于 `border-width` 时，则会产生内圆角；
- 如果 `border-radius` 的值大于`padding` 时，则会产生内圆角；
- 如果 `border-radius` 的值等于或小于 `border-width` 的值（或 `padding` 值），则不会产生内圆角。

也就是说，当内圆角产生时，内圆角的半径（`r`）则是它们之间的差，即 `border-radius - border-width`、`border-radius - padding` 或 `border-radius - border-width - padding`。比如上例：

```CSS
r = border-radius - border-width = 50px - 30px = 20px
r = border-radius - padding = 50px - 30px = 20px
r = border-radius - border-width - padding = 50px - 30px - 30px = -10px 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f70a28c78954c9c9b8a9391cc5662ac~tplv-k3u1fbpfcp-zoom-1.image)

你可以尝试着在下面的示例中调整 `border-radius`、`padding` 和 `border-width` 的值，查看元素圆角上的变化：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77920b0d859b4c74ab8c017995646f32~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/LYJzjXb

如果 `border-width` 和 `padding` 每个方向取值不同，这个时候和 `border-radius` 产生的差值也将会不一样，也会出现内圆角的 `x` 轴和 `y` 的半径不同，内圆角的效果也将会类似于 `border-radius` 设置了 `x` 和 `y` 轴的半径，比如 `border-radius: 10px / 20px`。我们在上面的示例稍作调整，效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/875e1a0e13e045f6a7002332a7e72aec~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/LYJzjqb

尝试着调整示例中的相关参数，你可以看到相关变化。我将相应的圆角半径标注出来，从图中可以明白其中的变化：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0aacf56b4b144b5599eb211f5206ff03~tplv-k3u1fbpfcp-zoom-1.image)

从上图效果也不难发现，尽管设置 `border-width` 或 `padding`，以及同时设置这两个值，并且每个方向的值不同，如果 `border-radius` 和它们产生的差值大于 `0`， 就会产生内部圆角，而且圆角的半径就等于其差值。

前面，我们聊的是同一个元素上，`border-radius` 和 `border-width` 以及 `padding` 会让元素产生嵌套圆角。但是，Web 上有很多类似下图这种圆角嵌套的 UI 效果，一个圆角容器内嵌套一个圆角元素：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fde2203280624d99b857eeecd9a70b05~tplv-k3u1fbpfcp-zoom-1.image)

当两个元素的 `border-radius` 属性使用相同值时，圆角效果看上去会非常地奇怪：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d83063e35434758b6f89de741862a2a~tplv-k3u1fbpfcp-zoom-1.image)

```HTML
<div class="box--wrapper">
    <div class="box"></div>
</div>
.box--wrapper {
    border-radius: 32px;
    padding: 16px;
}

.box {
    border-radius: 32px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/515f6da0e1624794bf190a361648f230~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/yLxzzYB

你可能会感到困惑，两个元素的 `border-radius` 值都是 `32px` ，为什么两个元素的圆角没有匹配对呢？其实原因很简单，**它们在值上是匹配的（都是** **`32px`** **），但它们在数学上是不匹配的** 。因此，你所看到的嵌套圆角效果是不完美的，内部元素的圆角看起来笨拙或过大。

幸运的是，我们可以使用一个小公式来创建相对大小的完美圆角:

```CSS
R = P + r
```

或者：

```CSS
r = R - P
```

- **R** 是圆角容器的 `border-radius`； 
- **P** 是圆角容器与圆角元素之间的间距，比如圆角容器的内距 `padding`；
- **r** 是圆角元素的 `border-radius`。 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/faf78a04a70042e5894d3551b6647756~tplv-k3u1fbpfcp-zoom-1.image)

回到上面示例中，这三个参数分别对应着：

- `R` 对应着圆角容器 `.box--wrapper` 的 `border-radius`； 
- `P` 对应着圆角容器 `.box--wrapper` 的 `padding`； 
- `r` 对应着圆角元素 `.box` 的 `border-radius`。 

由于 `R` 和 `r` 是一对相对值，要么 `R` 相对于 `r` 计算（`R = P + r`），要么 `r` 相对于 `R` 计算（`r = R - P`）。一般情况下，首先会有 `R` 和 `P` ，所以我更建议选择 `r` 相对于 `R` 来计算。

不管是 `R = P + r` 还是 `r = R - P` ，它们只是一个数学表达式。我们可以使用 `calc()` 函数，将其运用于 CSS 中。另外，为了避免每次去计算，可以借助 CSS 的自定义属性让事情变得更简单一些：

```CSS
.box--wrapper {
    --R: 32px;
    --P: 10px;
    --r: calc(var(--R) - var(--P));
    
    padding: var(--P);
    border-radius: var(--R);
}

.box {
    border-radius: var(--r);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b23436b1627a4799920e79b692a090a4~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/RwYLjKX

上面展示的只是圆角容器有一个内距 `P` ，但是圆角容器的边框粗细（`border-width`）同样对 `border-radius` 有影响。如果把边框粗细考虑进来，我们可以把公式扩展为：

```Plaintext
r = R - B - P
```

或者：

```CSS
R = B + P + r
```

其中：

- `R` 是容器自身的 `border-radius` 的半径（外圆角半径）；
- `B` 是容器自身的 `border-width` 的值（边框粗细）；
- `P` 是容器自身的 `padding` 的值（内距）；
- `r` 是内容区域的 `border-radius` 的半径（内圆角的半径）。

如果是多个元素嵌套，且只在最外的容器显式设置 `border-radius` 值，那么第一层嵌套的子元素的圆角半径将按上面的公式计算获得，计算出来的半径值将成为第二层的子元素的圆角半径（`R`）。依此类推，直到计算出来的 `border-radius` 的值为 `0`（小于 `0` 的值会被视为 `0`）。

我想说的是，我们在还原 UI 的时候，需要考虑内外部元素之间的圆角半径之间的关系，这样在视觉的还原上会更协调。

## border-radius 重叠时会发生什么？

Web 中有一种 UI 风格，它看上去像“胶囊”的外形：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b857093e2d9c4e2b8272d74009134ff7~tplv-k3u1fbpfcp-zoom-1.image)

我们常把这种 UI 的风格称作“**胶囊 UI** ”，这种“胶囊 UI ”常用于一些 `button`、`checkbox` 和 `radio` 的元素上。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99341d783c38401e988325bd12ccd36a~tplv-k3u1fbpfcp-zoom-1.image)

为了能一劳永逸，CSS 实现胶囊 UI 时，会给元素指定一个很大的 `border-radius` 值，比如 `999rem`、`999vmax`之类的。这样做不管元素高度是多少，都可以实现胶囊 UI 的效果：

```CSS
.pill {
    border-radius: 999vmax;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/251d3494dbb34f47ac43159117946f6c~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/ZEMXaVR

这意味着我们不需要知道元素（矩形框）的尺寸，它也能正常的工作。不过，在某些边缘情况上，会遇到一些奇怪的行为。比如在上面的示例基础上稍作调整，就是把 `border-radius` 的值设置为：

```CSS
.pill {
    border-radius: 100px 999vmax 999vmax 100px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb80e5e99e81411b8d09f8d33535f1d2~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/poOWdBL

你会发现，`.pill` 的左上角和左下角并没有看到任何圆角效果，可代码中明明设置了 `border-top-left-radius` 和 `border-bottom-left-radius` 的值为 `100px` 。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59fa765edcf641fc959e264407ed8718~tplv-k3u1fbpfcp-zoom-1.image)

为什么 `border-top-left-radius: 100px` 和 `border-bottom-left-radius: 100px` 就消失了？它们去哪了？

[其实W3C规范中已经给出了答案](https://www.w3.org/TR/css-backgrounds-3/#corner-overlap)：

> **Let f = min(Li/Si), where i ∈ {top, right, bottom, left}, Si is the sum of the two corresponding radii of the corners on side i, and Ltop = Lbottom = the width of the box, and Lleft = Lright = the height of the box. If f < 1, then all corner radii are reduced by multiplying them by f.**

具体的解释请看下图：


![ch1-fig-36.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b094ea143ffb4e20a4b9f81ba1216117~tplv-k3u1fbpfcp-watermark.image?)

公式看上去令人感到困惑，甚至是令人头痛。但我们只需要记住一点：**这个公式的目的是防止** **`border-radius`** **（圆角半径）重叠**。简单地说：

> **客户端（浏览器）本质上是在想：“按比例缩小所有半径（****`border-radius`****），直到它们之间没有重叠”！**

我们来用简单的示例来阐述上述公式的一些基本原理，这样可以让大家更好的理解。

首先，它会计算矩形（元素）每条边的长度与与它接触的半径之和的比值：

```Plaintext
元素每条边宽度 ÷ (相邻圆角半径1 + 相邻圆角半径2)
```

比如元素 `.pill` 设置的样式：

```CSS
.pill {
    width: 600px;
    height: 200px;
    border-radius: 400px;
}
```

就该示例而言，按照上面提供的公式就可以“**计算出** **`.pill`** **元素每条边的长度与与它接触的半径之和的比率**”：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b9da1d9f1134ccca2cdea4b5cfbc25d~tplv-k3u1fbpfcp-zoom-1.image)

然后将所有圆角的半径去乘以这些比率值（每条边计算出来的比率值）中的**最小值**。上例中计算出来的比率值只有 `.75` 和 `.25`，取更小的值  **`.25`**，那么计算出来的圆角半径值则是：

```Plaintext
400px x .25 = 100px
```

元素 `.pill` 的 `height` 是 `200px`（**最短的边长**），计算出来的 `border-radius` 刚好是 `height` 的一半，即 **`100px`**。这也让我们实现了一个“胶囊” UI 效果。

为了能了解得更清楚一些，我们回到前面有问题的示例中，只不过我们用 `400px` 来替代 `999vmax`，比如：

```CSS
.pill {
    width: 600px;
    height: 200px;
    border-radius: 100px 400px 400px 100px;
}
```

同样根据上面的公式来计算出每边的比例：

> Ratio =  元素每条边宽度 ÷ (相邻圆角半径 1 + 相邻圆角半径 2)

```Plaintext
Top    » 600px ÷ (100px + 400px)  = 1.2
Right  » 200px ÷ (400px + 400px)  = 0.25
Bottom » 600px ÷ (400px + 100px)  = 1.2
Left   » 200px ÷ (100px + 100px)  = 1
```

四个方向最小的比率是 **`0.25`**，那么所有指定圆角半径乘以这个比例：

```Plaintext
Top-Left     » 100px × 0.25 = 25px
Top-Right    » 400px × 0.25 = 100px
Bottom-Right » 400px × 0.25 = 100px
Bottom-Left  » 100px × 0.25 = 25px
```

这样一来，运用于 `.pill` 元素的 `border-radius` 值为 `25px 100px 100px 25px`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/16603d89a48c493cbdbb3f11d9f5c3dc~tplv-k3u1fbpfcp-zoom-1.image)

[@Jay 在 Codepen 上提供了一个 Demo](https://codepen.io/jsit/full/WNrXLoL)。这是一个更丰富的例子，展示了在不同情况下发生了什么。较大的尺寸是代码中指定的半径，较小的尺寸是浏览器如何协调它们（半径），防止半径的重叠：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47054e9a8ef041f38b39f07b3de61870~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/MWqErEL

所说，如果有一天你也碰到 `border-radius` 在视觉上被丢失了，那就不要再感到困惑了。这一切都是因为半径重叠所造成的，它是一种正常现象。知道这个原因之后，你也能很快的修复，实现所需要的圆角效果。

## border-radius  遇到 transform 会发生什么？

有过 Web 动效开发经验的开发者，应该知道 CSS 中的 `transform` 会常用于动效开发中，但并不知道 `transform` 和 `border-radius` 一起使用的时候会发生什么？比如下面这个动效：

```HTML
<div class="box"></div>
.box {
    border-radius: 2rem;
    transition: all .2s linear;
}

.box:hover {
    transform: scaleX(1.5);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/347f61872e554885b14673c675f7ec25~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/BaOwYaO

这是一个简单的 Web 动效，使用 `transform` 来模拟元素 `.box` 的宽度或高度变化的动效。不难发现，指定 `border-radius` 的元素，在使用 `transform` 改变元素宽度或高度时，元素上的圆角并不会重新绘制，圆角仅随着 `transform` 被缩放了：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b8140516f16456081a2dea0fa6f6f57~tplv-k3u1fbpfcp-zoom-1.image)

如果圆角要重新绘制就需要渲染引擎能重绘（Repaint），但 GPU 不会这样处理，它只处理像素，而不是元素的内容。因为 GPU 非常羞于处理像素（GPU 只需要处理呈现该元素的像素），所以 `transform` 操作的速度非常快。这也是使用 `transform` 来处理元素宽度或高度动效的主要原因之一。

如果要避免这种现象出现，就需要采用一些技术手段来规避。比如 [@Rik Schennink](https://twitter.com/rikschennink) 在他的文章《[Animating CSS Width and Height Without the Squish Effect](https://pqina.nl/blog/animating-width-and-height-without-the-squish-effect/)》中提到的[九宫法（9-slice scaling）](https://en.wikipedia.org/wiki/9-slice_scaling)。我对 @Rik Schennink 的教程中的示例做了一些调整：

```HTML
<div class="radius">
    <div class="content"></div>
</div>
```

```CSS
.radius {
    height: 100px;
    display: flex;
    justify-content: flex-start;
}

.radius::before,
.radius::after {
content: "";
    width: 20px;
    background: #098fae;
}

.radius::before {
    border-radius: 20px 0 0 20px;
}

.content {
    background: #098fae;
    width: 1px;
    transform: scale3d(1, 1, 1);
    transform-origin: left;
}

.radius::after {
    border-radius: 0 20px 20px 0;
    transform: translate3d(0, 0, 0);
}

/* CSS Animation */

@keyframes right-animate {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(600px, 0, 0);
  }
}

@keyframes move {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-300px, 0, 0);
  }
}

@keyframes center-animate {
  0% {
    transform: scale3d(1, 1, 1);
  }
  100% {
    transform: scale3d(601, 1, 1);
  }
}

.content {
  animation: center-animate 10s linear infinite alternate;
}

.radius::after {
  animation: right-animate 10s linear infinite alternate;
}

.radius {
  animation: move 10s linear infinite alternate;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b750a3a41434f2d8bb3a980f8af18ba~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/QWVqmYq

虽然示例中展示的技术可以使圆角不会因为 `transform` 变形，但该技术方案相对而言比较繁琐，适应性较弱。尤其是那种不是纯色背景环境下，比如 `.radius` 的内容是一张图片，上面的示例的技术方案就无法满足需求了。

庆幸的是，还有一种更好的方案，使用 CSS Houdini 中的自定义属性 `@property` （也称 CSS Houdini 中的变量），`@property` 可以进一步扩展 CSS 的动效。比如上面示例，采用 `@property` 可以像下面这样来实现：

```CSS
@property --width {
    initial-value: 1px;
    inherits: false;
    syntax: "<length>";
}

@keyframes square {
    to {
        --width: 300px;
    }
}

.content {
    width: var(--width);
    animation: square 2s ease infinite alternate;
}
```

上面展示的只是示例用到的关键代码（`@property` 和 `@keyframes` 部分），[详细代码请查阅 Codepen上的示例](https://codepen.io/airen/full/qBMPYBe)。示例中左侧采用的是 CSS Flexbox 布局，右侧采用的是 CSS Grid 布局。但动效采用的是相同的方案，效果几乎是一样的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a1619ac363842b181e118eb86a378a6~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/qBMPYBe

## 条件圆角（响应式圆角）

在一些设计方案中，有些元素的圆角半径（`border-radius`）很大，但希望在移动端上更小一些。比如下图这个设计：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8acb618883d6458cb933002dd81c15f2~tplv-k3u1fbpfcp-zoom-1.image)

桌面端（宽屏）中卡片的圆角 `border-radius` 是 `8px`，移动端（窄屏）是 `0`。以往你可能是这样来写：

```CSS
.card { 
    border-radius: 0; 
} 

@media only screen and (min-width: 700px) { 
    .card { 
        border-radius: 8px; 
    } 
} 
```

未来你还可以使用 [CSS 容器查询](https://juejin.cn/book/7161370789680250917/section/7164357178164248612)，像下面这样编写代码：

```CSS
.card--container { 
    container-type: inline-size; 
} 

.card { 
    border-radius: 0; 
} 

@container (width > 700px) { 
    .card { 
        border-radius: 8px; 
    } 
}
```

其实，除了使用 CSS 查询特性之外，CSS 中还有一些其他的方式来实现上图的效果。简单地说，**根据上下文环境来改变属性的值** 。

比如，使用 CSS 的 `clamp()` 函数，就是一个不错的选择：

```CSS
:root { 
    --w: 760px; 
    --max-radius: 8px; 
    --min-radius: 0px; /* 这里的单位不能省略 */ 
    --radius: (100vw - var(--w)); 
    --responsive-radius: clamp( 
        var(--min-radius), 
        var(--radius)  1000, 
        var(--max-radius) ); 
} 

div { 
    border-radius: var(--responsive-radius, 0); 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b2b2ae18fcd440a8ab60f4b401945ce~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/vYzejxX

你也可以将 `min()` 和 `max()` 组合起来一起使用，达到 `clamp()` 相似的功能，即 `clamp(MIN, VAL, MAX)` 等同于 `max(MIN, min(VAL, MAX))` 。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ce3151b1a7f420382ce5639411dc073~tplv-k3u1fbpfcp-zoom-1.image)

> **注意，`min()`、`max()`  函数中可以直接进行四则运算，不需要使用 `calc()` 函数**。

```CSS
.box { 
    --min-radius: 0px; 
    --max-radius: 8px; 
    --ideal-radius: 4px; 
    
    border-radius: max( 
        var(--min-radius),
        min(
            var(--max-radius), 
            (100vw - var(--ideal-radius) - 100%) * 9999
        ) 
    ); 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53f939991eaf4198b4da7f7be8ad2a4f~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/OJoxZgx

在未来，还可以使用 CSS 的 `@when` 和 `@if` 规则来实现条件圆角：

```CSS
@when container(width >= 100vw) {
    .box {
        border-radius: 0;
    }
}
@else {
    .box{
        border-radius: 1em;
    }
}
```

关于 `@when` 和 `@if` 没有太多要说的，因为到目前为止，还没有浏览器实现它，而且可能需要一段时间才能使用它。相对而言，容器查询 `@container`是更符合乎逻辑的。

## 小结

CSS 的 `border-radius` 已经存在很多年了，我想很多同学在平时的开发中都会使用它来实现一些圆角效果，而且还会使用它制作一些有趣的 UI 效果。但我想很多同学在使用`border-radius`会碰到一些怪异的现象，比如课程中所提到的**圆角的嵌套，圆角重叠时按比例缩小**等。

通过这节课的学习，你能解答平时使用 `border-radius` 时碰到的一些怪异的现象，即 **使用**`border-radius`**怪异的现象！**