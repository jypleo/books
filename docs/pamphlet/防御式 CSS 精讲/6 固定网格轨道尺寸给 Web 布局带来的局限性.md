CSS 中可用于尺寸属性的值有很多种类型，大家最为熟悉的是固定值和相对值类型，它们的区别主要是通过 CSS 单值类型来划分。以固定单位为值的称为固定值，比如 `px` 单位值；以相对单位为值的称为相对值，比如 `%` 、`vw` 、`vh` 、`em` 和 `fr` 等单位值。除此之外，还有一些关键词，比如 `auto` 、`min-content` 、`max-content` 等内在尺寸。

这些单位值和关键词值除了可以用于长度属性（比如 `width` 和 `height` 等）之外，它们也可以用于网格轨道尺寸的设置。只不过，在网格轨道上使用固定值会给 Web 布局带来一定的局限性。在接下来的内容中，我们将一起来探讨，固定网格轨道尺寸会给 Web 布局带来哪些局限性，以及我们在使用网格布局时，应该如何设置网格轨道尺寸更恰当，使 Web 布局更具灵活性。

## 什么是网格轨道？

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59acdd23ddf844b1b0314842ca26d756~tplv-k3u1fbpfcp-zoom-1.image)

网格轨道是 CSS Grid 布局中的一个专业术语，简单地说，它类于表格中的行（Row）和列（Column）。即，在 CSS Grid 中，它也有行和列，其中行称为**行网格轨道（Row Track）** ，列称为**列网格轨道（Column Track）** 。

## 如何定义网格轨道的尺寸？

[CSS Grid 模块](https://www.w3.org/TR/css-grid-2/)中提供了四个属性用来定义网格轨道的尺寸：

- `grid-template-columns` 定义显式列网格轨道尺寸；
- `grid-template-rows` 定义显式行网格轨道尺寸；
- `grid-auto-columns` 定义隐式列网格轨道尺寸；
- `grid-auto-rows` 定义隐式行网格轨道尺寸。

比如，我们可以像下面这样来定义一个显式网格：

```CSS
.grid {
    display: grid;
    grid-template-columns: 220px minmax(0, 1fr) 220px;
    grid-template-rows: min-content auto min-content;
    gap: 1rem;
}
```

也可以像下面这样来定义一个隐式网格：

```CSS
.grid {
    display: grid;
    grid-auto-columns: 220px minmax(0, 1fr) 220px;
    grid-auto-rows: min-content auto min-content;
    gap: 1rem;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ab3fc2e66fb4b22b339bb704099da73~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/JjaGRLb

从上面示例代码中可以看到，用于网格轨道尺寸设置的值中有 `px` 、`fr` 等单位值，有关键词 `min-content` 、`auto` 等值，还有函数值 `minmax()` 。也就是说，定义网格轨道尺寸的时候，可以是：

- 带有长度单位的值，比如 `220px` 、`10rem` 等；
- 关键词，比如 `auto` 、`min-content` 等；
- CSS 函数，比如 `calc()` 、`minmax()` 、`fit-content()` 、`min()` 、`max()` 、`clamp()` 和 `repeat()` 等。

我们从[ W3C 的单位和值的模块（Level 3 版本）中](https://www.w3.org/TR/css-values-3/)可以获知可用于 CSS 长度的单位值有：

- 相对于字体大小（`font-size`）的单位：`em` 、`rem` 、`ex` 和 `ch` 等；
- 相对于视窗大小的单位：`vw` 、`vh` 、`vmax` 、`vmin` 、`vi` 、`vb` 、`lvw` 、 `lvh` 、 `lvi` 、 `lvb` 、 `lvmin` 、 `lvmax` 、`svw` 、`svh` 、`svi` 、`svb` 、`svmin` 、`svmax` 、`dvw` 、`dvh` 、`dvi` 、`dvb` 、`dvmin` 和 `dvmax` 等；
- 相对于容器尺寸的单位：`cqw` 、`cqh` 、`cqi` 、`cqb` 、`cqmin` 和 `cqmax` 等（容器查询单位可以在 [W3C 的 CSS Containment Module Level 3](https://www.w3.org/TR/css-contain-3/#container-lengths) 中获取）；
- 固定单位：`cm` 、`mm` 、`in` 、`pt` 、`pc` 和 `px` 等；
- 百分比单位：`%`。 

在该[模块的 Levle 4 版本](https://www.w3.org/TR/css-values-4/#math)中，我们还可以获取可用于长度值的函数有 `calc()` 、`min()` 、`max()` 、`clamp()` 等。

另外，从 [CSS 盒模型模块（Level 3 版本）](https://www.w3.org/TR/css-sizing-3/)中可以得知，设置尺寸还可以使用 `auto` 、`min-content` 、`max-content` 、`fit-content()` 给长度属性定义值。

除此之外，在 CSS 网格中，还有一些仅用于网格轨道尺寸设置的函数和单位，比如 `minmax()` 、`repeat()` 和 `fr` 等。 

换句话说，上面可用于尺寸属性的值，都可以用于网格轨道尺寸的设置，比如：

```CSS
/* px */
.grid {
    grid-template-columns: 200px 520px 200px;
}

/* rem */
.grid {
    grid-template-columns: 10rem 15rem 20rem;
}

/* em */
.grid {
    grid-template-columns: 10em 15em 20em;
}

/* 视窗单位 */
.grid {
    grid-template-columns: 20vw 30vh 40vmax;
}

/* % */
.grid {
    grid-template-columns: 30% 30% 40%;
}

/* ch or ex */
.grid {
    grid-template-columns: 20ch 30ex 50ch;
}

/* fr */
.grid {
    grid-template-columns: 1fr 3fr 1fr;
}

/* auto */
.grid {
    grid-template-columns: auto auto auto;
}

/* min-content 、max-content 、fit-content() */
.grid {
    grid-template-columns: min-content max-content fit-content(10rem);
}

/* repeat() & minmax()*/
.grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

/* min()、max() or clamp() */
.grid {
    grid-template-columns: repeat(auto-fill, minmax(clamp(100px, 20vw, 300px), 1fr));
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1277c5be3b724dcda5dd15b667241317~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/XWPXpNB

## 固定网格轨道尺寸给 Web 布局带来的局限性

熟悉内在 Web 设计或曾接触过多语言 Web 布局（CSS 的书写模式）的同学应该晓得，Web 设计师提供的设计稿是静态的，但 Web 的内容是动态输出的。如果你在还原 UI 的时候，给元素设置固定尺寸，动态输出的内容就很有可能会打破 Web 布局，即使是没有打破 Web 布局的效果，也会让你的 Web 页面变得不美观。如果你需要构建一个多语言的 Web 网站或应用，这种现象更容易出现。

来看一个真实案例，比如 [Facebook 的登录页中的“新建帐户”按钮](https://zh-cn.facebook.com/)：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/876c8e12fd924fad8024b43b596f4abb~tplv-k3u1fbpfcp-zoom-1.image)

不管是给按钮设置宽度为 `104px` 或 `219px`，都不是最佳的。

- 如果设置最小值 `104px` ，其他语言版本就会内容溢出；
- 如果设置最大值 `219px` ，其他语言版本就有可能会有很大的空白空间。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/496cae802e0e4bf8b8bfd48ee2ec12dc~tplv-k3u1fbpfcp-zoom-1.image)

这种现象同样存在于 CSS Grid 网格布局中。即，**如果给网格轨道尺寸设置一个固定值，可能会造成网格项目内容溢出或者网格轨道有较大的空白空间存在** ，最终影响到 Web UI 的美观，同时让你的 Web 布局灵活性、扩展性不强。

我们来看一个简单的示例：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de42e55086d7431cae269b33b43fc50d~tplv-k3u1fbpfcp-zoom-1.image)

上图中的卡片 UI 效果常出现在 Web 页面上。拿上图中左侧的卡片为例，从设计稿上，你可以获取到相关 UI 元素的尺寸大小：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be3636825c6846638c13288da7d231b9~tplv-k3u1fbpfcp-zoom-1.image)

还原上图这张卡片的 UI 效果，可能需要一个像下面这样的 HTML 结构：

```HTML
<div class="card">
    <img src="thumnail.png" alt="User's profile figure" />
    <h3>大漠_W3cplus</h3>
    <ul>
        <li><svg class="icon icon--location"></svg>Location</li>
        <li><svg class="icon icon--link"></svg>w3cplus.com</li>
    </ul>
    <button>view profile</button>
</div>
```

我们将使用 CSS Grid 和 Flexbox 相结合的布局方案来实现该卡片效果。布局相关的关键代码如下：

```CSS
.card {
    display: grid;
    gap: 20px 32px;
    grid-template-columns: 136px auto 200px; /* 使用固定尺寸定义列网格轨道尺寸 */
    grid-template-areas: 
        "thumnail title action"
        "thumnail tags  action";
    align-items: center;
}

.card img {
    grid-area: thumnail;
}

.card h3 {
    grid-area: title;
    align-self: end;
}

.card ul {
    grid-area: tags;
    align-self: start;
    
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
}

.card li {
    display: inline-flex;
    gap: 4px;
    align-items: center;
}

.card button {
    grid-area: action;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/965ef79dc6ce48f2bb68f476649ed827~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/GRXodmM

效果看上去还不错。但是，要是有一天需求说，用户头像尺寸要更换成 `88px x 88px` ，按钮文案也需要更换成“查看”。这个时候，实现的效果就会变成：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65fd56bfa9fb472a9c82a148d8858c53~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/jOvWxvR

不难发现，调整内容后的 UI 效果并不是那么完美，网格项目有很多空白空间存在。要是输出的内容尺寸大于网格轨道的尺寸，还会造成内容溢出的现象：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38ef6a55d57e40628d4417fc485b55e0~tplv-k3u1fbpfcp-zoom-1.image)

该示例向大家演示了固定网格轨道尺寸给 Web 布局带来的局限性与缺陷。前面也说过了，在 CSS Grid 网格中，我们有很多种方式可用于网格轨道尺寸的设置。**如果希望构建出来的 Web 布局更具灵活性，那么我们就需要尽可能****地****使用内在尺寸来定义 UI 元素尺寸** 。这样构建出来的 Web 布局或者 UI，它是具有一定防御性的，不会轻易被动态输出的内容而打破。

换句话说，我们在给网格轨道设置尺寸时，应该尽可能的使用 `min-content` 、`max-content` 、`fit-content()` 、`auto` 和 `minmax(0, 1fr)` 等关键词和函数。我们使用它们来改造上面示例中的网格轨道尺寸的定义：

```CSS
.card {
    grid-template-columns: min-content minmax(0, 1fr) min-content;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c2d63f321944a2285c9b86df9b45a20~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/RwYrBpw

你会发现，这个时候网格轨道的尺寸和内容大小是紧密相结合的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/572eb7632f2e4888b2906a4b9f603004~tplv-k3u1fbpfcp-zoom-1.image)

其实我们还可以做得更好一些。比如说，当按钮内容输出较少时，我们希望它有一个最小尺寸，让按钮看起来更好看一些（更趋于整体性）。实现这一点也不难，可以将 `clamp()` 、`minmax()` 、`min-content` 等结合起来使用。比如：

```CSS
.card {
    grid-template-columns: min-content minmax(0, 1fr) minmax(min-content, clamp(120px, 10vw, 200px));
}
```

效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a1396584889449abe5bac4143ec998a~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/jOvWpxa

`minmax(min-content, clamp(120px, 10vw, 200px))` 的意思是：

- 给 `minmax(MIN, MAX)` 函数传了两个值，其中 `MIN` 值是 `min-content` ，表示元素的最小内容尺寸；`MAX` 是 `clamp(120px, 10vw, 200px)` 。最终返回的是在 `MIN ~ MAX` 之间的一个范围值；
- `clamp(120px, 10vw, 200px)` 是 CSS 中的一个比较函数，返回的值不会小于 `120px` ，不会大于 `200px` ，而且 `10vw` 会根据浏览器视窗宽度计算出一个固定值与 `120px` 和 `200px` 做比较，最终返回一个最佳值。

像上面示例这种定义网格轨道尺寸的方式，它的最大好处是能让 Web 布局和 UI 更灵活，易于扩展，易于匹配动态输出的内容等。而且，Web 上随处都可以使用这种布局能力。比如：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8987a09ec640438f8c961463b59be591~tplv-k3u1fbpfcp-zoom-1.image)

上图是一个响应式 Web 布局效果，它有以下几个特征：

- 页面容器 `.container` 总是水平居中；
- 页面容器 `.container` 左右两侧边缘距离浏览器视窗左右两侧边缘的间距是动态的；
- 页面容器 `.container` 有一个最大宽度。

在以前，我们需要依赖 CSS 媒体查询才能实现上图这样的布局效果：

```CSS
.container {
    max-width: 1024px;
}

/* Mobile */
.container {
    margin-left: 1rem;  /* 左侧间距 */
    margin-right: 1rem; /* 左侧间距 */
    width: calc(100% - 1rem * 2);
}

/* Tablet */
@media only screen and (min-width: 768px) {
    .container {
        margin-left: 1.5rem; /* 左侧间距 */
        margin-right: 1.5rem; /* 右侧间距 */
        width: calc(100% - 1.5rem * 2);
    }
}

/* Desktop */
@media only screen and (min-width: 1024px) {
    .container {
        margin-left: auto;
        margin-right: auto;
        width: 100%;
    }
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f37016ff69f42fba881298d4f988726~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/VwGeGpm

如果换成 CSS Grid 来实现的话，它要容易得多：

```CSS
body {
    display: grid;
    grid-template-columns: 
        minmax(1rem, 1fr) 
        minmax(min(100% - 1rem * 2, 320px), 1024px)
        minmax(1rem, 1fr);
    grid-template-areas: ".  container  .";
}

.container {
    grid-area: container;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5490577beff94214a99add5d19f0a8d1~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/BaOjOOP

是不是灵活多了。其实，上面这个布局效果是 Web 中的一个经典布局，常称为 Full-Bleed 布局。上面这个示例中，要是把 CSS 自定义属性引入进来，你随时可以根据设计需求来调整相关的参数，比如最小宽度、最大宽度、最小间距等：

```CSS
body {
    --limit-max-container-width: 1024;
    --limit-min-container-width: 320;
    --gutter: 1rem;

    display: grid;
    grid-template-columns:
        minmax(var(--gutter), 1fr)
        minmax(
            min(var(--limit-min-container-width), 100% - var(--gutter) * 2),
            var(--limit-max-container-width)
        )
        minmax(var(--gutter), 1fr);
     grid-template-areas: ".  container  .";
}

.container {
    grid-area: container;
}
```

> 要是你想更进一步了解 Full-Bleed 的布局，可以移步阅读《[网格项目放置和层叠](https://juejin.cn/book/7161370789680250917/section/7161623932439625758)》一文。

## 小结

阅读到这里，我想你知道了，给网格轨道设置固定尺寸会给 Web 布局带来什么，同时你也知道了应该如何设置网格轨道尺寸，会让构建的 Web 布局或 UI 更完美。

简单地说，使用内在尺寸，弹性单位值（比如 `fr` 、`vw` 等）和 CSS 函数（比如 `min()` 、`clamp()` 和 `minmax()`）相结合给网格轨道定义尺寸，要比使用固定单位（比如 `px` ）定义网格轨道尺寸强很多，可以尽可能地让 Web 布局具有一定的防御性，同时也使 Web 上的 UI 更完美 。