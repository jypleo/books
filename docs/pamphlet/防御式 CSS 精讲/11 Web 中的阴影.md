在现代 Web 中，阴影已经成为主要设计要素之一，甚至是随处可见。 阴影增加了质感、透视，并强调物体的尺寸。在 Web 设计中，使用光和影子可以增加物理上的真实感，并且可以用来制作丰富的、可触摸的 UI 界面。

从 CSS 技术角度来说，在 Web 中给 UI 添加阴影效果有多种不同的技术方案，但从实现阴影效果的 CSS 属性来说，常见的主要有 `text-shadow`（文本阴影）、`box-shadow`（盒子阴影）和 `filter`的`drop-shadow()`（不规则阴影）。

它们的使用并不复杂，但在具体使用中，使用阴影时往往不能达到预期的效果。接下来，我们就一起来探讨这方面的细节。

## Web 中的阴影

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0f7a94558e0427cb112d2efc25ffef6~tplv-k3u1fbpfcp-zoom-1.image)

阴影是一门复杂而又深奥的学科，它与**光** 、**颜色** 、**投影** 、**形体** 、**光源定位** 、**阴影分层** 和 **阴影模糊度** 等都有关。只不过，这些理论知识已超出这节课的范畴，因此不在这里做过多的阐述。如果你对这些理论知识感兴趣的话，强烈建议你花一些时间阅读下面这些资料：

- [Lights and Shadows](https://ciechanow.ski/lights-and-shadows/) (光和阴影)；
- [光和阴影相关的漫画图](https://www.drawinghowtodraw.com/stepbystepdrawinglessons/2010/02/how-to-use-shadows-and-shading-in-comics-cartoons-drawing-lesson/)；
- [了解设计中的光影视界](https://www.zcool.com.cn/article/ZMTE3NDM4NA==.html)。

**[Google 的 Material Design 设计系统](https://material.io/)** 是 Web 阴影设计中最典型案例。我想你肯定感受到了 Material Design 中阴影给 Web UI 带来的美感，因为在 Google 的产品上，几乎都能看到这样的设计：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bca1faa10f9a47b4be91ecdb2a8ce9ab~tplv-k3u1fbpfcp-zoom-1.image)

除了 Material Design 这种经典案例之外，阴影在一些新的 UI 设计中也起着关键性的作用，比如 Glassmorphism UI 和 Neumorphism UI ：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45db9b269dcc4356a76558848fc4ed34~tplv-k3u1fbpfcp-zoom-1.image)

## 阴影的分类

就阴影而言，可分为**外阴影**和**内阴影**。在 Web UI 中，内阴影相对较少见。它的参数与外阴影相同，但它出现在实物的内部，可以达到下沉的效果。

相对于外阴影来说，它并不怎么流行（用得较少），主要是因为大多数的 Web UI 界面是多个面层叠在一起的。基于这个因素，外阴影相对来说更有意义，因为它提供了深度（海拔）。内阴影会暗示物体上有一个洞，就会破坏堆栈的视觉结构。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5e2f8b0da9447278d6be85c8b605437~tplv-k3u1fbpfcp-zoom-1.image)

内阴影的风格使用较多的场景是在表单控件上，比如输入框（包括单选按钮和复选框等）。另外，要是你接触过 Neumorphism UI 的话，你会发现，这种风格的 UI 最大的特征就是使用内阴影设计，达到一种类似挤压的 UI  效果。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06a89b500bd649199f977e1bb8828ca4~tplv-k3u1fbpfcp-zoom-1.image)

> Neumorphism UI 的主要问题是使用内阴影和挤压的形状作为“选中”状态的概念。默认状态和选中状态之间可感知的差异非常小，甚至非视力障碍的用户有时也会完全忽略它。这也反过来导致了 Neumorphism UI 最大的缺陷，可访问性很差！

如果从实现手段来分的话，阴影又分为：

- 文本阴影，对应着 CSS 的 `text-shadow`； 
- 盒子阴影，对应着 CSS 的 `box-shadow`。 

除此之外，CSS 的 `filter` 的 `drop-shadow()` 也可以实现阴影效果，它除了可以给文本和盒子添加阴影之外，还有与众不同的功能，**给不规则形状添加阴影** 。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce6d692b7170407eb0f6330fbdb9fea0~tplv-k3u1fbpfcp-zoom-1.image)

## CSS 阴影的基础知识

在 CSS 中，主要使用 `text-shadow` 、`box-shadow` 和 `filter` 中的 `drop-shadow()`  来实现阴影效果。我们先花一点时间了解下，CSS 中制作阴影相关的基础知识。

### 文本阴影 text-shadow

`text-shadow` 是 **[CSS Text Decoration Module Level 3](https://www.w3.org/TR/css-text-decor-3/#text-shadow-property)** 规范中的一个属性。主要用来给 Web 中的文本添加阴影。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/425105b89faa42d7ace6abca59894d44~tplv-k3u1fbpfcp-zoom-1.image)

`text-shadow` 的使用很简单：

```CSS
.text-shadow {
    text-shadow: 5px 5px 5px #09faa0;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9421cd5e10f428486a1ed1c27fc6483~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/qBMPJpP

`text-shadow` 属性中的 `x-offset`、`y-offset` 和 `blur` 三个参数的值是个 `<length>` 值（不接受百分比值）。相对而言，使用 `em` 单位要比其他单位更灵活一些，因为 `em` 单位会相对于元素的 `font-size` 计算。

CSS 的 `text-shadow` 可以接受以逗号（`,`）作为分隔的多个阴影，比如：

```CSS
.multiple-text-shadow {
    text-shadow: 2px 2px 1px #09fa, 3px 3px 1px #90f;
}
```

使用多个阴影可以制作 3D 的文本效果：

```CSS
.text-3d {
    text-shadow: 
        0.25px 0.25px #20666D, 
        0.5px 0.5px #20666D, 
        0.75px 0.75px #20666D, 
        1px 1px #20666D, 
        1.25px 1.25px #20666D, 
        1.5px 1.5px #20666D, 
        1.75px 1.75px #20666D, 
        2px 2px #20666D, 
        2.25px 2.25px #20666D, 
        2.5px 2.5px #20666D, 
        2.75px 2.75px #20666D, 
        3px 3px #20666D, 
        3.25px 3.25px #20666D, 
        3.5px 3.5px #20666D, 
        3.75px 3.75px #20666D, 
        4px 4px #20666D, 
        4.25px 4.25px #20666D, 
        4.5px 4.5px #20666D, 
        4.75px 4.75px #20666D, 
        5px 5px #20666D, 
        5.25px 5.25px #20666D, 
        5.5px 5.5px #20666D, 
        5.75px 5.75px #20666D, 
        6px 6px #20666D;
}
```

效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38cfe25a9fb84ba7bb7e98a8164c9e63~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/ExewdLm

发挥你的想象，你可以使用 `text-shadow` 创作出很多与众不同的效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58bd52e14e7744bc8ea3abeb7b1e154d~tplv-k3u1fbpfcp-zoom-1.image)

### 盒子阴影 box-shadow

CSS 的 `box-shadow` 属性和 `text-shadow` 属性并不隶属于同一个模块中，`box-shadow` 属性是在 **[CSS Backgrounds and Borders Module Level 3](https://www.w3.org/TR/css-backgrounds-3/#box-shadow)** 模块中定义的。它的使用和 `text-shadow` 非常相似：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7616ea75c4b44169bfb8a41652d9c82~tplv-k3u1fbpfcp-zoom-1.image)

`box-shadow` 和 `text-shadow` 属性有几个参数是相似的，即 `<x-offset>`、`<y-offset>`、`<blur>` 和 `<color>`，不同之处是，`box-shadow` 在 `text-shadow` 属性上新增了另外两个参数。

- `inset`：是一个可选值。如果显示指定了该值，表示阴影是一个内阴影（阴影落在盒子内部，看起来就像是内容被压低了），阴影在边框之内（即使是透明边框）、背景之上、内容之下；如果未显式指定，阴影在边框外，即阴影向外扩散。`box-shadow` 之下不会显式设置 `inset` 值。
- `<spread>`：可选值。和 `<blur>` 类似，也是一个 `<length>` 值，默认值为 `0`（即，阴影与元素同样大）。指阴影扩散半径，取值为正值时，阴影扩散（阴影放大）；取负值时，阴影收缩。

例如：

```CSS
.outer-shadow {
    box-shadow: 5px 5px 5px 5px #09fa00;
}

.inner-shadow {
    box-shadow: inset 5px 5px 5px 5px #09fa00;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1360806cd0b44cb6a4ed7c7f459aa8ca~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/OJoxBqe

`box-shadow` 属性值也可以使用逗号（`,`）分隔多个值，来创建多阴影效果。利用多阴影的特性可以构建一些 3D 的效果：

```CSS
.box--3d {
    box-shadow: 
        1px 1px #111, 
        2px 2px #111, 
        3px 3px #111, 
        4px 4px #111,
        5px 5px #111, 
        6px 6px #111, 
        7px 7px #111, 
        8px 8px #111, 
        9px 9px #111,
        10px 10px #111, 
        12px 12px #111, 
        13px 13px #111, 
        14px 14px #111,
        15px 15px #111, 
        16px 16px #111, 
        17px 17px #111, 
        18px 18px #111,
        19px 19px #111, 
        20px 20px #111;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f92a956c4574d05bc0f8f8373204687~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/zYJEmVE

在使用 `box-shadow` 时，只需调整其参数，可以实现很多阴影效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d720cc6c8d7444c2a6bd9ec606fca38d~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/RwYLqwd

CSS 的 `box-shadow` 除了能给元素添加阴影效果之外，还可以像 `border`、`border-radius` 等属性一样，绘制 CSS 的视觉效果。比如 **[A Single Div](https://a.singlediv.com/)** 很多案例的效果都有 `box-shadow` 的影子：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd6125cbb2984a0b9d12433538757009~tplv-k3u1fbpfcp-zoom-1.image)

`box-shadow` 有自己独特之处，相比于 `text-shadow`，它除了有外阴影之外，还有内阴影（`inset`）和对阴影进行扩展（`<spread>`）。另外，`box-shadow` 也有自己一些细节之处。

- `box-shadow` 投出的阴影是外阴影时（未显式设置`inset`），该阴影就像元素的边界框（`border-box`）是不透明的。假设阴影的扩展半径（`<spread>`）是 `0`，它的周长与边界框（`border-box`）的大小和形状完全相同。阴影只在边框（`border-box`）外绘制：它被裁剪在元素的边框内（`border-box`）。
- `box-shadow` 投射的阴影是内阴影时（显式设置`inset`），该阴影就像元素的内距框（`padding-box`）之外的所有东西，都是不透明的。假设阴影的扩展半径（`<spread>`）是 `0`，它的周长与内距框（`padding-box`）的大小和形状完全相同。阴影只在内距框（`padding-box`）内绘制：它被裁剪在元素的内距框外（`padding-box`）。
- 如果定义了扩展半径（`<spread>`），那么上面定义的阴影周长将向外扩展（`box-shadow` 是外阴影）或向内收缩（`box-shadow` 是内阴影），方法是将阴影的直角边缘按扩展距离外延（对于内阴影则内延），并且产生的宽度和高度都是`0`（这里所说的宽度和高度是指阴影的宽度和高度）。

比如下面示例：

```CSS
.box {
    border: 5px solid blue;
    background-color: orange;
    width: 140px;
    aspect-ratio: 1 / 1;
}

.box-with-radius {
    border-radius: 20px;
}

.box-without-radius {
    border-radius: 0;
}
```

按上面的描述，设置不同的 `box-shadow`：

```CSS
.box1 {
    box-shadow: 10px 10px rgb(0 0 0 / .4); /* 无模糊半径和扩展半径的外阴影 */
}

.box2 {
    box-shadow: inset 10px 10px rgb(0 0 0 / .4); /* 无模糊半径和扩展半径的内阴影 */
}

.box3 {
    box-shadow: 10px 10px 0 10px rgb(0 0 0 / .4); /* 无模糊半径却有扩展半径的外阴影 */
}

.box4 {
    box-shadow: inset 10px 10px 0 10px rgb(0 0 0 / .4); /* 无模糊半径却有扩展半径的内阴影 */
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2efdff35312e41c3abc53e04766a1ad7~tplv-k3u1fbpfcp-zoom-1.image)

就上面示例而言，当 `box-shadow` 运用了扩展半径时，为了保持盒子的形状，设有 `box-radius` 的盒子的阴影半径随着变化，外阴影的圆角半径会增加，内阴影的半径会减少，它们的增加（或减少）都会基于阴影的扩展半径来计算。

然而，为了在 `border-radius` 较小的时候创造一个更尖锐的圆角（从而确保圆角和尖角之间的连续性），当边框半径（`border-radius`）小于阴影扩展半径（`box-shadow`），或者在内阴影的情况下，小于负值扩展半径的绝对值时，可以按下面的公式计算扩展阴影圆角半径：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68ade892d6104b5e821083c5c6e6b138~tplv-k3u1fbpfcp-zoom-1.image)

上面示例中圆角半径（`border-radius`）是 `20px`，阴影（`box-shadow`）扩展半径是 `10px`，按照上面公式，可以计算出它的比例  `r = 20 / 10 = 2`。即：

```Plaintext
20 + 10 × (1 + Math.pow((20 ÷ 10 - 1), 3)) = 40
```

即，扩展阴影的半径是 `40px`。

> 注意，上面的计算只适用于无模糊半径的 `box-shadow` 。如果 `box-shadow` 显式设置模糊半径为非 `0` ，则表示所产生的阴影会被模糊化。那么带有阴影的圆角半径也会产生变化，而且在规范中并没有定义确切的算法。

### 不规则阴影 drop-shadow()

在实际开发过程中，除了要给盒子（CSS 中每个元素盒子都是矩形盒子）添加阴影效果之外，也有需要给不规则的图形添加阴影的情况，比如下图：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7cca78cd395b4674b66def4b1faba828~tplv-k3u1fbpfcp-zoom-1.image)

如果依旧使用  `box-shadow` 的话，其阴影效果并不能紧挨着图形的边缘来添加：

```CSS
.box-shadow {
    box-shadow: 5px 5px 5vmin 5vmin rgb(250 20 20 / 0.5);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/865a51af1ff6476e8d064f75d11be28b~tplv-k3u1fbpfcp-zoom-1.image)

实际上，我们需要的阴影的效果是像下图这样的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b78c921dfa284fbf96d3991fe3699ef2~tplv-k3u1fbpfcp-zoom-1.image)

`box-shadow` 无法实现上图的效果。不过，使用 CSS 的 `filter` 中的 `drop-shadow()` 函数可以实现：

```CSS
filter: drop-shadow()
drop-shadow() = drop-shadow( <color>? && <length>{2,3} )
```

`drop-shadow()` 投影实际上是输入图像的 Alpha 蒙板的一个模糊、偏移的版本，用特定的颜色绘制并合成在图像下面。简单地说，`box-shadow` 在元素的整个框后面创建一个矩形阴影，而 `drop-shadow()` 过滤器则是创建一个符合图像本身形状（Alpha 通道）的阴影。

```CSS
.box-shadow {
    box-shadow: 5px 5px 5vmin 5vmin rgb(250 20 20 / 0.5);
}

.drop-shadow {
    filter: drop-shadow(5px 5px 5vmin rgb(250 20 20 / 0.5));
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/376545a5cfdf449bb47a1f78a69e0cc2~tplv-k3u1fbpfcp-zoom-1.image)

`drop-shadow()` 函数的参数和 `box-shadow` 基本相似。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91a9ef5eba9147c3acb76783edc37784~tplv-k3u1fbpfcp-zoom-1.image)

但需要特别注意阴影扩展半径（`<spread>`）。当阴影扩展半径的值为正值时，会导致阴影扩大，反则之会导致阴影缩小。如果未指定，则默认为 `0`，阴影的大小将与输入的图像相同。另外，在大多数浏览器中还不支持这个参数，效果不会呈现。因此，在使用 `drop-shadow()` 时，还不能添加扩展半径，否则将会无效。

`drop-shadow()` 同样有多阴影的概念，只是使用方法和 `text-shadow` 、`box-shadow` 不同，即在 `filter` 属性使用多个 `drop-shadow()` 函数，并且以空格符隔开：

```CSS
.text-shadow {
    text-shadow: 
        1px 1px 0 rgb(0 0 0 / .5),
        -1px -1px 0 rgb(0 0 0 / .5);
}

.box-shadow {
    box-shadow: 
        1px 1px 0 0 rgb(0 0 0 / .5),
        -1px -1px 0 0  rgb(0 0 0 / .5);
}

.drop-shadow {
    filter: 
        drop-shadow(1px 1px 0 rgb(0 0 0 / .5))
        drop-shadow(-1px -1px 0 rgb(0 0 0 / .5));
}
```

另外，`drop-shadow()`没有内阴影，即 `inset` 在 `drop-shadow()` 函数中是不存在的。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/332913fe369944c49c96f474f7be3dc7~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/MWqEzBQ

## 阴影的分层

Web UI 中的阴影和现实中的阴影相似，同一个元素不局限于只有一个阴影， 不管是 `text-shadow` 、 `box-shadow`  还是 `drop-shadow()` 都可以同时存在多个阴影。

使用多层阴影，可以构建一些 3D 的 UI 效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64bab6083f714e0bb377ff06cc8357fe~tplv-k3u1fbpfcp-zoom-1.image)

除此之外，对多个阴影进行分层，还可以创造出一点现实生活中阴影的微妙效果。比如 `box-shadow` ：

> **通过改变**`box-shadow` **的偏移量（**`x` **和** **`y`** **轴位置）、模糊半径、扩展半径和颜色**，**来模糊真实世界中光线照射到一个物体上并投下阴影的微妙效果（真实效果）**。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/922c9df5710e4cba975e643f863b7a2b~tplv-k3u1fbpfcp-zoom-1.image)

主要是因为阴影的外观取决于光的方向、光的强度，以及物体和投射阴影的表面之间的距离。光线越强，影子就越暗、越清晰。光线越柔和（弱），影子就越微弱、越柔和。在某些情况下，对于定向光，我们会得到两个不同的影子。暗影（Umbra）是光线被阻挡的地方，半影（Penumbra）是光线被投下的地方。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e17100aa66264083aab8821f82825b95~tplv-k3u1fbpfcp-zoom-1.image)

当然，这种模拟并无法真正地表达现实生活中阴影复杂性和细微差别。

前面也说过，阴影分层就是在阴影的属性中使用逗号（`,`） 分割（放置）多个描述阴影的值。正是这种简单的分层技术，让我们对阴影的渲染有了更多的控制，有了它，我们可以微调锐度（Sharpness）、距离（Distance）和扩散（Spread）。例如，你可以增加或减少阴影的数量来创造一个更小或更大的扩散。

```CSS
.shadow {
    box-shadow: 
        0 1px 1px rgb(0 0 0 / 0.15), 
        0 2px 2px rgb(0 0 0 / 0.15), 
        0 4px 4px rgb(0 0 0 / 0.15), 
        0 8px 8px rgb(0 0 0 / 0.15);
}

.shadow {
    box-shadow: 
        0 1px 1px rgb(0 0 0 / 0.11), 
        0 2px 2px rgb(0 0 0 / 0.11), 
        0 4px 4px rgb(0 0 0 / 0.11), 
        0 8px 8px rgb(0 0 0 / 0.11), 
        0 16px 16px rgb(0 0 0 / 0.11), 
        0 32px 32px rgb(0 0 0 / 0.11);
}
```

上面示例中的两个盒子阴影，一个是有四层，另一个是六层。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/527e54da49a343909693dedcf7de1842~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/bGxvWjL

只不过，上面两个阴影并不是最佳的分层技术。如果想让效果更接近真实生活中的阴影，还是需要做一些微小的处理。每个阴影层的颜色透明度值和模糊半径值，使用不同的值，来改变阴影的深度。比如：

```CSS
.shadow-sharp {
    box-shadow: 
        0 1px 1px rgb(0 0 0 / 0.25), 
        0 2px 2px rgb(0 0 0 / 0.20), 
        0 4px 4px rgb(0 0 0 / 0.15), 
        0 8px 8px rgb(0 0 0 / 0.10),
        0 16px 16px rgb(0 0 0 / 0.05);
}

.shadow-diffuse {
    box-shadow: 
        0 1px 1px rgb(0 0 0 / 0.08), 
        0 2px 2px rgb(0 0 0 / 0.12), 
        0 4px 4px rgb(0 0 0 / 0.16), 
        0 8px 8px rgb(0 0 0 / 0.20);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3b44f0892464247b0bee805b0760fb5~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/dyqmWrp

正如上面示例所示，我们可以让阴影颜色透明值随着每一层的增加而减少或增加，以创造更多或更少的扩散阴影。除此之外，也可以以更高的增量增加模糊度，以增加扩散并创造更柔和的、近乎梦幻的效果：

```CSS
.shadow-dreamy {
     box-shadow:
        2.8px 2.8px 2.2px rgb(0 0 0 / 0.02),
        6.7px 6.7px 5.3px rgb(0 0 0 / 0.028),
        12.5px 12.5px 10px rgb(0 0  0 / 0.035),
        22.3px 22.3px 17.9px rgb(0 0  0 / 0.042),
        41.8px 41.8px 33.4px rgb(0 0  0 / 0.05),
        100px 100px 80px rgb(0 0 0 / 0.07);
}
```

这样的多层阴影看上去就像带有线性变化（或者说类似缓动函数）的阴影。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1aacee6dcc2042859d16892899e10a7b~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/XWPEgrW

为了简化阴影参数值的设置，同时构建更具真实生活中阴影的效果（也就是所谓平滑阴影效果），[@brumm](https://twitter.com/funkensturm) 为大家构建了一个[阴影配置工具](https://shadows.brumm.af/)。在这个工具上，你可以像下面的视频一样操作，配置出更平滑、友好、真实、梦幻的阴影效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae6936400cf44f65b13d708eed6aa854~tplv-k3u1fbpfcp-zoom-1.image)

在 `text-shadow` 和 `box-shadow` 中使用多层阴影时，每个阴影层都是有顺序的。即 **阴影堆叠在彼此之上，且按照它们被声明的顺序，最上面的阴影会在最上面**。拿 `box-shadow` 来举例：

```CSS
.shadow {
    box-shadow:
        20px 0 0 0 red,
        40px 0 0 0 blue,
        60px 0 0 0 orange;
}

.shadow {
    box-shadow: 
        0 -20px 0 0 orange,
        0 -40px 0 0 blue,
        0 -60px 0 0 red;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/060d81090e124cd8a4580d74646aaefa~tplv-k3u1fbpfcp-zoom-1.image)

虽然 `text-shadow` 和 `box-shadow` 属性的阴影分层顺序是相同的，但 `drop-shadow()` 的工作方式与它们是不同的。其阴影是以指数形式添加的，即 `(2^（阴影数） – 1)`。比如：

- 一个阴影等于 `(2^1 – 1)`，即一个阴影被渲染出来；
- 两人阴影等于 `(2^2 – 1)`，即三个阴影被渲染出来；
- 三个阴影等于 `(2^3 – 1)`，即七个阴影被渲染出来。

以此类推。其中一个阴影指的是一个 `drop-shadow()`，两个阴影是指用空格分开的两个 `drop-shadow()`，如下面代码所示：

```CSS
/* 渲染出一个阴影 (2^1 – 1) */
.one-drop-shadow {
    filter: drop-shadow(10px 10px 0 red) 
}

/* 渲染出三个阴影 (2^2 – 1) */
.two-drop-shadow {
    filter: 
        drop-shadow(10px 10px 0 red) 
        drop-shadow(20px 20px 0 orange)
}

/* 渲染出七个阴影 (2^3 – 1) */
.two-drop-shadow {
    filter: 
        drop-shadow(10px 10px 0 red) 
        drop-shadow(20px 20px 0 orange)
        drop-shadow(30px 30px 0 blue)
}
```

## 阴影的选择

开发者有多种方式（多种 CSS 属性和函数）来创建阴影，但选择正确的阴影类型是有效使用阴影的关键。我们可以按下面的方式来做选择：

- **`text-shadow`** ：专门为文本创建阴影；
- **`box-shadow`** ：可以创建符合元素边界框的阴影（矩形框阴影）；
- **`drop-shadow()`** ：它不是 CSS 的属性，是一个 CSS 函数，只是 `filter` 属性中的一个值。它和 `box-shadow` 的不同之处在于，它遵循任何元素（包括伪元素）的渲染形状（可以是任何规则形状）。

> 如果你在 Web 中使用 SVG 的话，还可以使用 `<feDropShadow>` 给 SVG 元素创建阴影，但这不是我们今天要讨论的范畴。

如果你掌握了不同类型的阴影和每一种阴影的独特创造能力，阴影效果的可能性就会变得无限大。从简单的给元素投影，到给元素添加内阴影等，甚至还可以创建有趣的视觉效果，为 UI 添加额外的意义或价值。

## 阴影中你可能不知道的一些事情

正如前面所述，CSS 实现阴影有多种方式，不同的方式运用于不同的场景，并且能得到不同的效果。但在创建阴影的时候，有些细节可能容易忽略。

### 图片和盒子阴影

很多时候会在图片元素上使用 `box-shadow` 来制作一些效果，比如“晕影”（Vignette）和 图像遮罩（Image Color Screen）等：

- 晕影：一种摄影技术，图片的边缘柔和地淡化到背景中，这有助于突出图片的主题；
- 图像遮罩：指的是在图片上添加一层淡颜色层（比如带有一定透明度的纯颜色），这样做可以让放在图片上的文本有一定的对比度，提高可阅读性，也可以在一组不相关的图片中创造视觉一致性。

但是，CSS 的 `box-shadow` 直接运用于 `<img>` 上时，并不能处处如你所愿，比如内阴影直接运用于 `<img>` 上时：

```CSS
img {
    box-shadow:inset 5px 5px 5px 5px #09fa00;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9b543de567343b7ac3142ab044448be~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/bGxYNyj

造成现象的主要原因是**它（****`<img>`****）被认为是一个“空”元素，而不是容器元素**。

> 注意，HTML 中，除了 `<img>` 元素是一个可替换元素（Replaced Element）之外，还有 `<iframe>`、`<video>`、`<embed>` 等。除此之外，有些元素在特定情况下也会被视为可替换元素，比如 `<option>` 、`<audio>` 、`<canvas>`、`<object>` 和 `<applet>` 等。
>
> 另外，HTML规范也说了，`<input>` 元素可替换，因为 `image` 类型的 `<input>` 元素就像 `<img>` 一样被替换。但是其他形式的控制元素，包括其他类型的 `<input>` 元素，被明确地列为非可替换元素（non-replaced elements）。

虽然可替换元素有很多个，但 `box-shadow` 的内阴影（`inset`）用于这些可替换元素时，会被视为空元素的只有 `<img>`、`<video>`、`<iframe>` 和 `<embed>`。比如，你在 `<video>` 上使用 `box-shadow` 内阴影时，它的表现和 `<img>` 一样。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e27f44581e654d5187831c56569d9dff~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/gOdXbVv

要避开这个现象，我们要在 `<img>` 和 `<video>` 外套上一个容器元素，比如 `div`，并且在该元素上使用内阴影：

```CSS
.media--wrapper {
    box-shadow: inset 0 0 4vmin 3vmin rgb(0 0 0 / .5);
}

img, video {
    position: relative;
    z-index: -1;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d71184b1ebd446383ee59fafe3fa1ef~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/BaOmNBV

对于图片而言，把图片运用于 `background-image` 才是更好的方案，但对于`<video>`，上面的解决方案已是较佳的解决方案了。

这里就不演示使用 `box-shadow` 来给图片添加遮罩效果了，我个人认为这不是一个较佳的方案。对于在图片或视频上添加一个颜色透明层，让图片或视频上的文本更具阅读性，更好的解决方案是借助 CSS 的伪元素，比如 `::before` 或 `::after`。

### 阴影碰到 overflow

稍微了解 CSS 的同学都知道，当内容溢出的盒子的时候，使用 `overflow` 非 `visible` 值可以让内容不溢出盒子，溢出的内容可能被截剪、被隐藏，也有可能会出现滚动条。而阴影从视觉上来看是会在盒子外面（除内阴影），那么，当阴影碰到 `overflow` 为 `hidden` 的时候，它的表现形式会是什么呢？

在回答这个问题之前，我们明确知道，盒子阴影（`box-shadow`）或者说 `drop-shadow()`  函数构建的投影是不会参与 CSS 盒子尺寸计算的，阴影只是视觉上在盒子的外面。

当带有盒子阴影的元素显式设置了 `overflow` 为 `hidden` 时，阴影并不会被截取。需要注意的是，如果阴影元素的父容器显式设置了 `overflow` 为 `hidden`，阴影则会被截取。比如下面这个示例:

```HTML
<div class="shadow box-shadow">
    <img src="shadow.jpg" alt="" />
</div>

<div class="shadow">
    <img src="shadow.jpg" class="box-shadow" alt="" />
</div>
```

```CSS
.shadow {
    overflow: hidden;
}

.box-shadow {
    box-shadow: 10px 10px 10px 10px #09fa00;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/533f6051dea846458e35a73fbd633b08~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/eYLeNJm

上面这个示例中，左侧是 `box-shadow` 运用于在图片的容器上，右侧是 `box-shadow` 直接运用于图片上，当图片容器的 `overflow` 为 `hidden` 时，运用于图片上的阴影会被截取。

同样的，`drop-shadow()` 产生的阴影超过 `overflow` 容器时，阴影也会被截取：

```CSS
.shadow {
    overflow: hidden;
}

.box-shadow {
    filter: drop-shadow(10px 10px 10px #09fa00);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d72de5c525a94d20a7500f647f1e9a4a~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/qBMVdar

### 阴影碰到 Clipping 和 Masking

从视觉呈现的角度来看，除了 `overflow` 属性为 `hidden` 时将溢出的内容被裁剪之外，还可以使用  `clip-path` 或  `mask`属性来“剪辑”或屏蔽一个元素（视觉上有点类似于 `overflow:hidden` 效果）。

```CSS
:root {
    --x-offset: 20px;
    --y-offset: 20px;
    --blur-radius: 5vw;
    --spread-radius: 5vw;
    --color: #09fa00;
}

.box-shadow {
    box-shadow: var(--x-offset) var(--y-offset) var(--blur-radius) var(--spread-radius) var(--color);
}

.drop-shadow {
    --blur-radius: 5vh;
    --x-offset: 5vw;
    --y-offset: 5vw;
    --color: #f36;
    filter: drop-shadow(
        var(--x-offset) var(--y-offset) var(--blur-radius) var(--color)
    );
}

.clip-path {
    clip-path: inset(0 0 0 0);
}

.mask {
    mask-image: linear-gradient(to bottom, #000, #000);
    mask-size: cover;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d713880bc9a4a749fb4631236646e3e~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/abaVOpm

不过，在`clip-path` 构建的不规则图形中使用 `drop-shadow()` 构建的投影时，`drop-shadow()` 可用于剪切元素的父容器上，则投影不会被裁剪：

```CSS
.drop-shadow {
    --blur-radius: 10px;
    --x-offset: 15px;
    --y-offset: 15px;
    --color: rgb(250 250 22 / 0.75);
    filter: drop-shadow(
        var(--x-offset) var(--y-offset) var(--blur-radius) var(--color)
    );
}

.clip-path {
    --path: polygon(50% 0%, 0% 100%, 100% 100%);
    clip-path: var(--path);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42f9a7f3643b4790ad9b53cd64cbee3d~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/KKxypqO

对于 `mask` 也是类似的，把 `drop-shadow()` 用于 `mask` 的父元素上：

```CSS
:root {
    --x-offset: 10px;
    --y-offset: 10px;
    --blur-radius: 10px;
    --color: #f36;
    --shadow: var(--x-offset) var(--y-offset) var(--blur-radius) var(--color);
}

.mask-parent {
    filter: drop-shadow(var(--shadow));
}

.mask {
    mask-image: radial-gradient(circle, #000 50%, transparent 50%);
    mask-size: cover;
    mask-position: center;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7c79f2b914c4a3699871873b0ab1fc9~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/LYJOVzj

从上面示例我们不难发现，虽然在剪切元素的父元素上使用 `box-shadow` 可以显示阴影，但这个阴影是一个盒子阴影，效果不佳，更合理的方式是使用 `drop-shadow` 来设置剪切元素（特别是运用了 `clip-path` 和 `mask` 属性的元素）。

### 分组元素上的阴影

有时候 Web 布局会有元素重叠的布局需求。如果我们给整个重叠在一起的元素组上设置阴影的话，使用 `box-shadow` 添加盒子阴影，就会留下空位（看上去阴影缺失），如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cfcfea0ff9e94de88ed2f0f778a9efa9~tplv-k3u1fbpfcp-zoom-1.image)

如果我们给每个元素单独添加一个 `box-shadow` ，那么每个元素都会有自己的盒子阴影，这可能更不是我们想要的效果。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c23539d70bc462488feb5e16ca3cccb~tplv-k3u1fbpfcp-zoom-1.image)

面对这样的场景，我们使用  `drop-shadow()`  可以完美解决这个问题：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9e05e7c23fd4ae5b1d021861d07557a~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/xxaPGWd

上面示例中，左侧的卡片是采用 `box-shadow` 创建的阴影，右侧的卡片使用的是 `drop-shadow()` 创建的阴影，相比这下，效果哪个更好是不是立马可见。

### 阴影和性能

虽然阴影能让视觉效果变得更厚重，更具有质感，但对于 Web 的性能来说是致命的。就拿 `drop-shadow()` 来说吧，虽然能开启浏览器的硬件加速，会创建一个新的合成器层（开启 GUP 渲染），但你也可能不希望这样的独立合成器层过多，因为它会占用有限的 GPU 内存，并最终会降低 Web 的渲染性能。

不管哪种阴影类型，它们都有可能会设置模糊半径（阴影的模糊度），而这个模糊度又是一个昂贵的消费。当你给阴影添加了模糊半径时，相当于某样东西会变得模糊（阴影层），这个模糊层混合了输出像素周围的像素的颜色，产生一个模糊的结果。

比如，你阴影的模糊半径为 `2px`，那么过滤器需要在每个像素周围的每个方向上查看两个像素来生成混合颜色。这发生在每个输出像素上，也意味着浏览器渲染引擎需要大量的计算，这个计算可能会呈指数级别增长。所以，模糊半径的值越大，需要的计算量就越大，这也就是具有大的模糊半径的阴影要比具有小的模糊半径阴影渲染慢的原因之一。

为此，在使用阴影的时候，应该尽可能少用模糊半径，即使要用，该值也应该尽可能的小。

除了使用小的模糊半径之外，我们还应该尽可能避免使用多个阴影值（有些同学喜欢使用多个阴影来构建立体效果）。因为，值越多，浏览器渲染引擎需要的计算量也就越多，渲染就会越慢。

还有，我们要尽可能在动画中避免改变阴影的值，特别是少用 `box-shadow`。可以考虑在动画中使用 `filter`的 `drop-shadow()`，用它来做动画更有表现力，渲染性能也相对会更好一点。注意，这也只是一个相对值。

如果不希望阴影影响 Web 的性能，但又不可避免使用阴影，特别是多个阴影效果时，或者在 `transition` 或 `animation` 中改变阴影来提高交互的可识别性，那么我们可以使用一个黑魔法，就是使用伪元素 `::before` 或 `::after` 来构建阴影层，并对其 `opacity` 进行动画处理。

有关于这方面详细的介绍，可以阅读 [@tobiasahlin](https://twitter.com/tobiasahlin) 的《[How to animate box-shadow with silky smooth performance](https://tobiasahlin.com/blog/how-to-animate-box-shadow/)》一文。[@Rob 在 Codepen 提供了一个示例](https://codepen.io/robjoeol/full/JjRwmJZ)，展示了不同类型阴影动效之间的性能差异：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f756fbccb2684ecea7426aa5d3efce12~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/robjoeol/full/JjRwmJZ

## 小结

如果只是掌握 CSS 阴影相关的属性（`text-shadow` 和 `box-shadow`）或函数（`drop-shadow()`）的基本使用，其实很简单。但要真正的把阴影用好，或者说设计出较好的阴影效果，那涉及的东西就多了。比如要对光和阴影有一定的认知，因为光源直接影响了阴影的效果。

除此之外，阴影还与 Web 的性能都相关联，阴影能增加 UI 的质感和厚重感，但对性能是有较大影响的，很多时候不能鱼和熊掌兼得。最后特别要提出的是，如果在动效中使用阴影，应该尽可能借助伪元素来完成，这样除了性能更好之外，动效也更细腻。