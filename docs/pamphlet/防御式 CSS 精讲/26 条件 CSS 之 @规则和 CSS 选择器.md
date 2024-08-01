一直以来，CSS 都被认为是一种声明式语言，它一直被视为样式 Web 页面的一种方式，即给 Web 页面添加样式，来美化 Web 页面，使其在外观上看起来更美观。

然而，近几年 CSS 发展非常的快速，已经发展到了具备条件规则的程度。有趣的是，CSS 规则中并没有像其他程序语言的 `if ... else ...` ，但 CSS 中的功能却具备了条件化的能力。

在这节课中，我将介绍一些我们常用的 CSS 功能，并展示它们的条件性。此外，我将比较一些例子，其中 CSS 比设计工具更强大。

## 什么是条件化 CSS？

简单来说，它是指具有特定条件的设计。当满足一个或多个条件时，设计会因此而发生变化。

例如，向设计中添加新的部分，必须将其他元素推到其下面。在下图中，当添加新的项目时，下面的其他项目必须向下移动。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c36bc3165685490c8e46eae0ab765691~tplv-k3u1fbpfcp-zoom-1.image)

在逻辑上，这听起来是预期且正常的。在设计工具中，我们在几年前就有了这个功能。在 Figma 中，我们拥有“[自动布局](https://goodpractices.design/figma-autolayout)”功能来执行上述操作。在 Web 上，即使没有 CSS，我们从第一天就已经实现了这一点。

## 条件化 CSS

熟悉 CSS 的 Web 开发者都知道，CSS 并不具备其他程序语言（比如 JavaScript）的能力，就拿条件化来说，CSS 并不能像 JavaScript 一样，具备 `if ... else ...` ：

```JavaScript
if(条件) {
    // 符合条件该干嘛
} else {
    // 不符合条件该干嘛
}

if(条件1 && 条件2) {
    // 符合条件1 和条件2 该干嘛
} else {
    // 不符合条件1 和条件2 该干嘛
}
```

虽然说，在 CSS 中没有像 JavaScript 这种程序语言的 `if ... else ...` 能力，但是一些 CSS 属性能在特定条件或情况下起作用，达到类似其他编程语言中的 ` if ... else ...  ` 效果。例如，大家熟悉的 `@media` 或 `@supports` ，它们就能使 CSS 变得具备条件化 CSS 能力：

```CSS
.section {
    display: flex;
    flex-direction: column;
}

@media only screen and  (width > 768px) {
    .section {
        flex-direction: row;
    }
}
```

上面代码就是具备一定条件化能力的。如果浏览器视窗宽度大于或等于 `768px` ，那么 `.section` 的 `flex-direction` 就会从 `column` 变成 `row` 。

这其实就是明确的 `if` 语句，不是吗?

再来看一个 `@supports` 相关的示例：

```CSS
/* ❌ 它的值总是 false */
@supports selector(:has()) {
    /* … */
}

/* ✅ 这将在支持 :has() 的浏览器中求值为 true */
@supports selector(:has(*)) {
    /* … */
}
```

你可能也已经注意到了，这里并没有 `if ... else ...` 相关的任何语句，但这里是真的具有条件性设计的间接表达。在接下来的部分，我将和大家一起探讨一些 CSS 功能，其工作方式就类似于 `if ... else ...` 语句。

我们这样做的目标是，要让你对所编写的 CSS 有更强的理解和期望。我是说，你能够仅仅通过查看组件或页面的 CSS，就能够发现其中的条件化 CSS。从另一点而言呢，希望你借助条件化 CSS 的能力，使你的 CSS 代码具备一定的防御性能力，使你的 CSS 代码更具健壮性，不至于那么容易遭到破坏。

## CSS VS. Figma

CSS 是用来还原设计稿的主要手段之一，而 Figma 又是现在最为流行的 UI 设计软件之一。所以我这里拿 CSS 和 Figma 进行比较是一个不错的主意。比如，这样的一个示例，你有一组徽标标签（`<Badge>`），它们是横向显示的。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0eb7eda19f8343448e61ce5c4e31d66a~tplv-k3u1fbpfcp-zoom-1.image)

当你深入思考时，你会发现 CSS 和 Figma 有一些重要的差异。例如，在 CSS 中：

*   如果列表项容器没有足够空间时，列表项可以换行；
*   适用于 LTR 和 RTL；
*   间距可以用于行和列。

事实上，在 CSS 中，发生了三个条件规则：

*   如果在列表项容器设置了 `flex-wrap:wrap` ，则列表项容器没有可用空间时，列表项会自动换行；
*   如果列表项换到新的一行时，间距 `gap` 将用于水平和垂直方向，即对应着 `row-gap` 和 `column-gap`；
*   如果 Web 页面方向是 `RTL` （从右到左），列表项将切换其顺序（例如，设计将成为从右侧开始的第一个）。

这是 CSS 中最常见的一个示例。接下来，让我们探讨一些 CSS 可能是条件化的情况。

## 条件化 CSS ：@ 规则

在 W3C 规范中，有一个功能模块是专门针对于 CSS 条件定义的，即 **[CSS Conditional Rules Module Level 3](https://www.w3.org/TR/css-conditional-3/)** 模块。对应着 CSS 的 `@media` 和 `@supports` 规则，可以说，它们是 CSS 中最早接近于 `if ... else ...` 的。

不过，随着 [CSS 的容器查询](https://www.w3.org/TR/css-contain-3/#container-queries)（尺寸查询和样式查询）功能出现之后，CSS 中继 `@media` 、`@supports` ，又有一个接近于 ` if ... else ...  ` 功能的 CSS 功能模块，即 `@container` 。简单地说，`@media` 、`@supports` 和 `@container` 三个 `@` 规则是最接于条件化 CSS 的。

### 媒体查询：@media

说实话，讨论条件化 CSS 时，我最早想到的就是 CSS 的媒体查询（`@meida`）。说实话，它应该是 CSS 中最早、也是最接近于 `if ... else ...` 的功能模块。而且，早期中的 CSS ，一直使用它来根据媒体类型和媒体条件来调整 CSS 样式规则。例如：

```CSS
.section {
    display: flex;
    flex-direction: column;
}

@media only screen and (width > 768px) {
    .section {
        flex-direction: row;
    }
}
```

上面这段代码就具备条件化 CSS 。它的意思是：

```JavaScript
if (width < 768px) {
    // flex-direction: column
} 

if (width > 768px) {
    // flex-direction: row
}
```

也就是说，当浏览器视窗宽度小于 `768px` 时，`.section` 的 `flex-direciotn` 为 `column` ，对应着移动端的布局；当浏览器视窗宽度大于或等于 `768px` 时，`section` 的 `flex-direction` 为 `row` ，对应着平板或桌面端的布局。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19997a804c5c4e33aed3873edb614924~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/YzOmNNz

同样的原理也适用于像 `@media (hover: hover)` 这样的媒体查询。在下面的 CSS 中，只有在用户使用鼠标或触摸板时，悬停样式才会被应用。

```CSS
@media (hover: hover) {
    .card:hover {
        background-color: #d4d2d2;
    }
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/710df0f8a1594c5b8e877277e3f4cce6~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/VwGoPrY

### 容器查询之尺寸查询

容器查询是 CSS 新增的一个特性，也是一直以来 Web 开发者最期待的特性之一。它分为尺寸查询和样式查询。

Web 开发者可以通过容器查询来检查组件的父级是否具有特定的大小，并相应地为子组件进行设计。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb64a62babbc49509f5d2ad0acd52468~tplv-k3u1fbpfcp-zoom-1.image)

当卡片组件（`.card`）被放在一个容器（`.card__container`）中时，代表着它被包含在该容器中，比如上面代码中的 `.card__container`。这也意味着，我们可以使用 CSS 的 `container` 来查询 `.card__container` 的宽度，并在 `@container` 对 `.card` 设置不同的样式规则，从而达到设计师真正的意图，比如，容器宽度（`.card__container`）分别在默认（`<650px`）、 `>650px`和`>820px` 时，为 `.card` 设置不同样式：

```HTML
<div class="card__container">
    <!-- Card 组件需要的 HTML 结构 -->
    <div class="card">
        <figure>
            <img src="thumbnail.jpg" alt="thumbnail" />
        </figure>
        <ul class="badges">
            <li class="badge">gluten free</li>
            <li class="badge">main dish</li>
        </ul>
        <h3 class="title">Card Title</h3>
        <div class="votes">
            <svg></svg>
            <svg></svg>
            <svg></svg>
            <svg></svg>
            <svg></svg>
            <span>(12 votes)</span>
        </div>
        <p class="description">Card Description</p>
        <button>
            <svg></svg> Save
        </button>
        <dl class="lists">
            <dt>Preparation Time: </dt>
            <dd>3 hours</dd>
            <dt>Cooking time:</dt>
            <dd>25 min</dd>
            <dt>Serving:</dt>
            <dd>4-6 persons</dd>
            <dt>Cost:</dt>
            <dd>$3/person</dd>
        </dl>
    </div>
</div>
```

```CSS
.card__container {
    min-width: 300px;
    width: 360px;
    overflow: hidden;
    resize: horizontal;
}

.card {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: auto;
    grid-template-rows: min-content auto auto auto minmax(0, 1fr);
    grid-template-areas:
        "thumbnail"
        "badges"
        "title"
        "votes"
        "description";
}

.card figure {
    border-radius: 8px 8px 0 0;
    overflow: hidden;
    aspect-ratio: 4 / 3;
}

.card figure {
    grid-area: thumbnail;
}

.card .badges {
    grid-area: badges;
}

.card .title {
    grid-area: title;
}

.card .votes {
    grid-area: votes;
}

.card .description {
    grid-area: description;
}

.badges {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 1rem;
    gap: 5px;
}

.badges li {
    display: inline-flex;
    border: 1px solid currentColor;
    padding: 0.3em 0.5em 0.15em;
    color: #e05d26;
    border-radius: 3px;
    text-transform: uppercase;
    font-size: 85%;
    align-items: center;
    justify-content: center;
    line-height: 1;
}

.card .title {
    padding: 0 1rem;
    font-size: clamp(1.25em, 2vw + 1.35rem, 1.75em);
}

.card .votes {
    padding: 0 1rem;
    display: flex;
    gap: 2px;
    align-items: center;
    color: #e05d26;
}

.votes span {
    color: #666;
}

.card .description {
    padding: 0 1rem 1rem;
    font-size: 90%;
    line-height: 1.6;
    color: #666;
}

.card button {
    -webkit-appearance: button;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 14px 6px 12px;
    border-radius: 4px;
    border: 2px solid currentColor;
    color: #e05d26;
    background: #fff;
    cursor: pointer;
    font-weight: bold;
    gap: 5px;
    transition: all 0.2s linear;
    box-shadow: 0 0 0.2em 0.2em rgb(0 0 0 / 15%);
}

.card button:hover {
    opacity: 0.8;
} 

.card button:focus {
    outline-offset: 2px;
}

.card button {
    grid-area: thumbnail;
    justify-self: end;
    align-self: start;
    margin-top: 1rem;
    margin-right: 1rem;
}

.card .lists {
    display: none;
}

/* Container Queries Layout*/
.card__container {
    container-type: inline-size;
}

/* .card__container 宽度大于 650px */
@container (inline-size > 650px) {
    .card {
        grid-template-columns: 300px minmax(0, 1fr);
        grid-template-rows: 1rem repeat(5, auto) minmax(0, 1fr);
        grid-template-areas:
            "thumbnail  ."
            "thumbnail  badges"
            "thumbnail  title"
            "thumbnail  votes"
            "thumbnail  description"
            "thumbnail  button"
            "thumbnail  .";
        column-gap: 1.5rem;
    }

    .card button {
        grid-area: button;
        justify-self: start;
        align-self: center;
        margin: 0;
    }

    .card figure {
        border-radius: 8px 0 0 8px;
        aspect-ratio: 1;
    }

    .card .title,
    .card .badges,
    .card .votes,
    .card .description {
        padding: 0 1rem 0 0;
    }
}

/* .card__container 宽度大于 820px */

@container (inline-size > 820px) {
    .card {
        grid-template-columns: 420px minmax(0, 1fr) auto;
        grid-template-areas:
            "thumbnail  .            ."
            "thumbnail  badges       lists"
            "thumbnail  title        lists"
            "thumbnail  votes        lists"
            "thumbnail  description  lists"
            "thumbnail  button       lists"
            "thumbnail  .            .";
    }

    .card .lists {
        display: flex;
        flex-direction: column;
        padding-right: 1rem;
        grid-area: lists;
        gap: 0.5rem;
    }

    .lists dt {
        font-size: 1rem;
    }

    .lists dd {
        font-size: 85%;
        color: #666;
    }

    .card .title,
    .card .badges,
    .card .votes,
    .card .description {
        padding: 0;
    }

    .card figure {
        aspect-ratio: 4 / 3;
    }
}
```

改变 `.card__container` 容器大小，你可以看到卡片组件（`.card`）UI 效果的变化：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1350d76f7e5a4df4a6f1b1e9e0298320~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/LYJwxwG

`@container` 规则，其工作方式与使用 `@media` 的媒体查询类似，不同的是，`@container` 查询父容器以获取信息，而不是视口和浏览器的 UserAgent。

当然，容器查询的出现并不是用来替代媒体查询的，它们两者应该是共存的关系。容器查询特性的出现，我们可以不再局限于视窗断点来调整布局或 UI 样式，还可以基于容器断点来调整布局或 UI 。换句话说，**媒体查询是一种宏观的布局（Macro Layout），可以用于整体页面布局；而容器查询可以调整组件的每个元素，创建了一种微观的布局（Micro Layout）** 。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5db4fdd306a4bc78c8741084b9186f3~tplv-k3u1fbpfcp-zoom-1.image)

### 容器查询之样式查询

在 CSS 中除了媒体查询、容器查询之外，现在又新增了一个 **样式查询（Style Queries）** 。就在最近，Chrome 团队发布了对**样式查询**的实验性支持。简而言之，**样式查询允许我们查询容器的 CSS 属性或 CSS 自定义属性（CSS 变量）** 。

```CSS
@container style(border-color: lightblue) {
    button {
        border-color: lightblue;
    }
}
```

理想情况下，上述代码应该可以工作，但是 Chrome Canary 中，当前的样式查询原型仅限于 CSS 变量。样式查询有望在 [Chrome M111](https://groups.google.com/a/chromium.org/g/blink-dev/c/ACL23q_nbK0/m/PaNJ81\_qDAAJ?pli=1) 中发布。

现在，我们可以检查变量 `——boxed: true` 是否被添加到容器中，如果是，则可以基于此更改子元素的样式。

```CSS
.card__container {
    --boxed: true;
}

@container style(--boxed: true) {
    .card {
        /* CSS ... */
    }
}
```

请看下图。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7c4b249cb424efd838f391c138c0083~tplv-k3u1fbpfcp-zoom-1.image)

请注意，容器查询和样式查询的主要区别在于，**容器查询用于查询容器尺寸大小，样式查询用于查询容器样式** 。你可能会感到好奇，既然可以查询容器尺寸大小了，为什么还需要查询容器样式呢？

其实，在容器查询中，查询容器尺寸大小，允许我们根据组件的父容器（或祖先容器）的尺寸来控制组件样式，这非常有用。只不过，在某些情况下，我们可能不需要去查询容器尺寸大小，相反的是，我们想要查询容器的计算样式。那么，在这种情况之下，样式查询就会很有用处。

它用于主题切换（比如暗黑模式）、多语言 Web 网站等，会起更大的作用。比如下面这个卡片组件：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6013a2f1b4ec4a91a5f1aa2a2c58d44a~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/LYJwWGZ （请使用 Chrome Canary 查看 ）

先上 HTML 结构：

```HTML
<div class="card__container" dir="ltr" lang="zh-Hans">
    <div class="card">
        <h3>现代 Web 布局</h3>
        <p>现代 Web 布局中的最后一节课，下一代响应式 Web 设计中的容器响应，就是容器查询！</p>
        <span><svg t="1673340802729" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2667" width="200" height="200"></svg></span>
    </div>
</div>

<div class="card__container" dir="rtl" lang="ar">
    <div class="card">
        <h3>تصميم Web الحديثة</h3>
        <p>الدرس الأخير في تصميم Web الحديثة، والجيل التالي من استجابة الحاويات في تصميم Web، هو البحث عن الحاويات!</p>
        <span><svg t="1673340802729" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2667" width="200" height="200"></svg></span>
    </div>
 </div>
```

对于 LTR 的布局，我们可以这样写：

```CSS
.card {
    --bg-angle: to right;
    --bg: linear-gradient(var(--bg-angle), #5521c3, #5893eb);
    background: var(--bg, lightgrey);
    border-radius: 12px;
}

.card {
    display: grid;
    grid-template-columns: minmax(0, 1fr) max-content;
    grid-template-areas:
        "title       icon"
        "description icon";
    gap: .5rem;
    padding: 18px;
}

.card h3 {
    grid-area: title;
    font-size: clamp(1.25rem, 5cqw + 1.5rem, 1.875rem);
}

.card p {
    grid-area: description;
}

.card span {
    grid-area: icon;
    place-self: center;
    font-size: 3rem;
}

.card svg {
    display: block;
    width: 1em;
    height: 2em;
}
```

RTL 和 LTR 不同之处是，渐变背景颜色刚好相反，另外 ICON 图标是带有方向性的，因此在 RTL 布局下，需要对其做一个水平镜像处理。我们使用样式查询来完成它：

```CSS
.card__container[dir="rtl"] {
    --dir: rtl;
    direction: var(--dir);
}


@container style(--dir: rtl) {
    .card {
        --bg-angle: to left; /* 改变渐变方向 */
    }

    svg {
        transform: scaleX(-1); /* 水平镜像 */
    }
}
```

就这样搞定。你可以想想，如果没有样式查询，会是如何实现？它们有什么样的差异？这两个问题的答案就留给大家自己去寻找和思考了！

> 注意，有关于容器查询更详细的介绍，可移步阅读《[下一代响应式 Web 设计：容器查询](https://juejin.cn/book/7161370789680250917/section/7164357178164248612)》！

### CSS 的 @supports

`@supports` 规则是条件 CSS 中的另一种，也是一条件组规则，其条件测试用户代理是否支持 CSS 属性/值对。它可以用于编写样式表，这些样式表在可用时使用新特性，但在不支持这些特性时，可以优雅地降级。

拿一个首字下沉的案例，我们以前做首字下沉一般都是这样来做：

```CSS
 p::first-letter { 
     float: left; 
     font-size: 5em; 
     line-height: 1; 
     font-weight: bold; 
     margin-right: .2em; 
     color: #00FFFF; 
     font-family: serif; 
 } 
```

但在 CSS 中有一个 `initial-letter` 属性，可以更轻松地实现首字下沉的效果。只是目前浏览器支持度非常非常的少。那么使用 `@supports` ，我们可以这样来处理：

```CSS
 @supports (initial-letter: 5) or (-webkit-initial-letter: 5) { 
     p::first-letter { 
         -webkit-initial-letter: 5; 
         initial-letter: 5; 
         color: #00FFFF; 
         font-weight: bold; 
         margin-right: 0.5em; 
         font-family: serif; 
     } 
} 
```

一旦有一天，浏览器支持了 `initial-letter` 属性，你的浏览器将会渲染 `@supports` 中的代码块，实现首字下沉效果。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6df13c23888f4bdab8115c14b0e89a1b~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/RwYXpgL

我们也可以测试特定选择器的支持，如 `:has`。如果你正在使用 `@supports` 检测 `:has()`，你必须将一个选择器传递到 `:has()` 中。这可以是 `*`，但是如果你的代码依赖于在 `:has()` 中使用的相对选择器，请改用 `@supports selector(:has(+ *))` ：

```CSS
/* ❌ 它的值总是 false */
@supports selector(:has()) {
    /* … */
}

/* ✅ 这将在支持 :has() 的浏览器中求值为 true */
@supports selector(:has(*)) {
    /* … */
}

@supports selector(:has(+ * )){
    /* ... */
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d56ed09fac23495496c338c2429d3b21~tplv-k3u1fbpfcp-zoom-1.image)

> 图片来源于：https://twitter.com/bramusblog/status/1610732878974812173

## 条件化 CSS：CSS 选择器

W3C 的 [Selectors Level 4](https://drafts.csswg.org/selectors-4) 新增了很多强大的 CSS 选择器，其中有很多伪类选择器就带有条件化 CSS 的功能，比如 `:not()` 、`:is()` 、`:where()` 、`:has()` 、`:empty` 等。除此之外，CSS 的通用兄弟选择器（`E ~ F`），相邻兄弟选择器（`E + F`）、状态选择器等组合在一起使用，也能让 CSS 带有条件化的功能。

### :not() 选择器

在小册的《[如何灵活设置元素之间的间距？](https://juejin.cn/book/7199571709102391328/section/7199845459563642913)》课程中就有介绍过，使用 `:not()` 伪类选择器有条件的给元素设置 `margin-bottom` 。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1f47ed23ef44c1b805562f9426c52ac~tplv-k3u1fbpfcp-zoom-1.image)

正如上图所示，如果我们每一个 `.card` 都指定一个 `margin-bottom` 值，那么就会出现上图中左侧所呈现的效果，无法达到 Web 设计师预期的效果。这个时候，我们使用 `:not()` 伪类选择器就可以很好地避免这个现象：

```CSS
.cards {
    padding: 20px;
}

.card:not(:first-child){
    margin-top: 20px;
}

/* 或者 */
.card:not(:last-child) {
    margin-bottom: 20px;
}
```

上面代码意思很简单：

*   `.card:not(:first-child)` 表示除了第一个 `.card` 之外的所有 `.card` 都指定 `margin-top` 的值为 `20px`；
*   `.card:not(:last-child)` 则表示除了最后一个 `.card` 之外的所有 `.card` 都指定 `margin-bottom` 的值为 `20px`。

当然，你也可以使用相邻兄弟选择器（`E + F`）达到与 `:not()` 相同的效果：

```CSS
.cards {
    padding: 20px;
}

.card + .card {
    margin-top: 20px;
}
```

`.card + .card` 表示，与 `.card` 相邻的 `.card` 元素，等同于 `.card:not(:first-child)` ：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1eb1e9984cae434b8d67ed23373b544f~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/vYzobPM

### :has() 选择器

> CSS 的 `:has()` 选择器被称为 **CSS 的父选择器**！它和 CSS 的容器查询特性一样，一直以来是 Web 开发者最想要的 CSS 功能。

就我个人而言，CSS 的 `:has()` 是最接近 `if ... else ...` 功能的。比如：

```CSS
figure:has(> img) {
    padding: 0;
}
```

它的意思是，如果 `figure` 有子元素 `img` ，那么 `figure` 就指定一个 `padding` 值为 `0` 。它和 HTML 结构有紧密关联：

```HTML
<figure>
    <img src="thumbnail.jpg" alt="" />
    <figcaption>An elephant at sunset</figcaption>
</figure>

<figure>
    <figcaption>An elephant at sunset</figcaption>
</figure>

<figure>
    <div class="media__object">
        <img src="thumbnail.jpg" alt="" />
    </div>
    <figcaption>An elephant at sunset</figcaption>
</figure>
```

上面三个结构，只有第一个结构才与 `figure:has(> img)` 相匹配：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/613d763bda134afd8c130ebcecfd3b36~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/YzOmgpm

这只是 `:has()` 选择器最简单的使用，你还可以给 `:has()` 选择器传递任何选择器作为其参数。比如：

```CSS
.card:has(img) {
    /* 选择有 img 作为后代元素的 .card 元素 */  
}  

.card:has(> img) {
    /* 选择有 img 作为子元素的 .card 元素 */
}  

.card:has(.card__thumb) {
    /* 选择有类名为 .card__thumb 作为后代元素的 .card 元素 */
}  

.card:has(h2 + p) {
    /* 选择有一个 h2 元素后紧跟一个 p 元素的 .card 元素 */
}  

.card:has(h2 ~ p){
    /* 选择有一个 h2 元素，且后面有 p 元素的 .card 元素 */
} 
```

简单地说，有了 `:has()` 选择器，能更好地帮助你做很多类似条件化 CSS 的事情。也能使你编写的 CSS 代码更简洁，还原出来的 UI 更灵活。

我们来看几个简单的示例。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a786c9072fe341f0aa201f620bea88e2~tplv-k3u1fbpfcp-zoom-1.image)

就如上图中所展示的三组卡片，每组卡片之间输出的数据不同（DOM 不同），每组卡片会因为数据字段不同，UI 风格也会略有不同，甚至会有较大的 UI 风格差异。

以往我们要实现这样的 UI 效果，需要在不同的元素上添加不一样的类名。就拿第一组来说吧，两张卡片相比，上面的卡片多了描述文本（它可能是一个 `<p>` 元素）和一组媒体信息（它可有是一个 `<ul>` ），但最终呈现给用户的 UI 风格来说，一张是竖排，另一张是横排。按以往开发模式，可能会在两个不同的卡片上添加不一样的类名：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3061a23635a94116ad66ceb4ea9ab8c1~tplv-k3u1fbpfcp-zoom-1.image)

也就是说，如果希望根据一个元素的存在与否来给一个特定的父级或元素设置不同的样式是不可能的。我们需要像上图那样添加额外的类名，并根据 UI 的需要来切换它们。就拿上图来说吧，它的 DOM 结构可能像下面这样：

```HTML
<!-- ①: 带有描述信息和媒体信息的卡片 --> 
<div class="card card—vertical"> 
    <div class="card__media"> 
        <div class="media__object"> 
            <img src="https://picsum.photos/400/400?random=2" alt="" class="media__thumb"> 
        </div> 
        <div class="media__content"> 
            <h3 class="media__title">Kenneth Erickson</h3> 
        </div> 
        <div class="media__action"> <svg class="icon--more"></svg> </div> 
    </div> 
    <div class="card__body"> 
        <p class="card__description">The word "coffee" entered the English language in 1582 via the Ddutch koffie</p> 
    </div> 
    <div class="card__footer"> 
        <ul class="card__social"> 
            <li> <svg class="icon--like"></svg> 783 Likes </li> 
            <li> <svg class="icon--comment"></svg> 67 Comments </li> 
         </ul> 
     </div> 
</div> 

<!-- ②: 带有子标题，没有描述和媒体信息  --> 
<div class="card card—horizontal"> 
    <div class="card__media"> 
        <div class="media__object"> 
            <img src="https://picsum.photos/400/400?random=2" alt="" class="media__thumb"> 
        </div> 
        <div class="media__content"> 
            <h3 class="media__title">Kenneth Erickson</h3> 
            <h5 class="media__subtitle">San Diego,CA</h5> 
        </div> 
        <div class="media__action"> <svg class="icon--more"></svg> </div> 
    </div> 
</div> 
```

或许你会通过不同的类名来改变 Flexbox 的布局，比如：

```CSS
/* 默认水平排列，且垂直居中 */ 
.card { 
    display: flex; 
    align-items: center; 
} 

/* 在卡片 ① 上使用下面代码，将水平排列换成垂直排列 */ 
.card—vertical { 
    flex-direction: column; 
    align-items: flex-start; 
} 
```

问题是，如果 CSS 自身就具备条件判断，那就不需要像上面那样额外添加类名。那么，关系型伪类 `:has()` 在这样的场景之下就有用武之地了。 正如前面所介绍，我们可以使用 `:has()` 来做一定的条件判断，比如说，如果 `.card` 元素中包含了 `p` 元素或包含一个 `ul` 元素，我们就改变 Flexbox 的布局方式：

```CSS
.card { 
    display: flex; 
    align-items: center; 
} 

.card:has(p, ul) { 
    flex-direction: column; 
    align-items: flex-start; 
} 
```

当然，你也可以使用相关的类选择器：

```CSS
.card:has(.card__description, .card__social) { 
    flex-direction: column; 
    align-items: flex-start; 
} 
```

这个示例中，卡片 ② 中没有任何元素命名类名为 `.card__description` 或 `.card__social`。示例使用 `:has()` 的选择器的代码：

```CSS
.card:has(p, ul) { 
    flex-direction: column; 
    align-items: flex-start; 
} 

.card:has(p, ul) .media__object { 
    width: 32px; 
} 
 
.card__media:not(:has(.media__subtitle)) { 
     font-size: 12px; 
} 

.card__media:not(:has(.media__subtitle)) .icon--more { 
    font-size: 24px; 
} 

@supports not selector(:has(works)) { 
    .card { 
        flex-direction: column; 
        align-items: flex-start; 
    } 
 } 
```

具有差异化 UI 效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0cc62b0408464e6097fd95e7e62cc34c~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/RwYXdea

再来看一个状态切换的样式变化的示例：

```CSS
form button { 
    /* 按钮默认样式，比如未选中状态的样式 */ 
} 

form:has(input[type="checkbox"]:checked) button { 
    /* 复选框选中状态的按钮样式 */ 
} 
```

上面示例代码中，使用 `:has()` 改变按钮 `button` 样式，比如一个注册表单，只有用户同意相关注册协议（表单中的筛选框被选中），创建账号的按钮才高亮，变成可用状态，否则就是处于禁用状态：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9402b7324968463e8a7cdae132920d1f~tplv-k3u1fbpfcp-zoom-1.image)

这个示例告诉大家，`:has()` 可以根据子元素（后代元素）的状态（比如我们熟悉的 `:hover`、`:active`、`:visited`、`:focus`等）来设计不一样的样式。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b5d8050e9b14edba16ef897cae4c20a~tplv-k3u1fbpfcp-zoom-1.image)

你甚至还可以与一些表单验证相关的 CSS 伪类结合在一起，重新定义表单的样式：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2db7ebdb0dc342ee873b895d3391a682~tplv-k3u1fbpfcp-zoom-1.image)

比如有条件显示或隐藏表单元素：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e106d89fa7bb4cf0ae9a971df09b3ab3~tplv-k3u1fbpfcp-zoom-1.image)

我们在设计“问卷调查”相关的表单时，有的时候会提供一个“其他”选项让用户选择，当用户选择其他选项时，将会显示一个输出框出来。也应该是说，我们可能需要根据之前的回答或选择来显示一个特定的表单字段。就如上图所示，当你选择下拉框中的 “Other” 选项时，会显示一个输出框，供用户输入想要的内容。

通过 `:has()` 选择器，我们可以检查 `<select>` 中的 `<option>` 或 `input[type="radio"]` 中的其他项是否选中（`:checked`），如果选中，就把输入框显示出来：

```CSS
.control--other { 
    display: none; 
} 

form:has(option[value="Other"]:checked) .control--other, 
form:has(input[type="radio"][id="other"]:checked) .control--other { 
    display: block; 
} 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8761fc4c2c1b4008be1a12849f681bbc~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/OJoKqYg

### :not() 选择器和 :has() 选择器的组合

从这几个例子中，可以看出关系型伪类选择器 `:has()` 是多么通用、强大和实用。它甚至可以与其他伪类结合起来（比如 `:not()`）创建更复杂的关系选择器。比如：

```CSS
 /* 选择不包含空元素的卡片元素 */ 
 .card:not(:has(*:empty)) {} 
 
 /* 选择至少有一个复选框未选中的表单元素 */ 
 form:has(input[type="checkbox"]:not(:checked)){} 
 
 /* 选择不包含标题元素的卡片元素 */ 
 .card:not(:has(h1, h2, h3, h4, h5, h6)){}
```

当 `:has()` 和 `:not()` 组合在一起使用的时候，两者的排序非常的重要，即两者的嵌套直接会影响最终匹配的结果。比如下面这两个组合：

```CSS
/* 匹配不包含任何标题元素的 section 元素 */ 
section:not(:has(h1, h2, h3, h4, h5, h6)){} 
 
/* 匹配任何包含非标题元素的 section 元素 */ 
section:has(:not(h1, h2, h3, h4, h5, h6)){} 
```

### :has() 选择器和结构型伪类选择器的组合

在 CSS 中，以 `:nth-` 开头的选择器被称为结构型伪类选择器，比如 `:nth-child()` 、`:nth-of-type()` 等。你可以使用 `:has()` 伪类选择器与结构型伪类选择器组合在一起达到条件化 CSS 的能力，比如：

```CSS
section > div { 
    flex: 1 1 calc((100% - 10px * 2) / 3); 
} 

section:has(div:nth-child(3n + 1):last-child)::after { 
    flex: 1 1 calc(((100% - 10px * 2) / 3) * 2 + 10px); 
} 

section:has(div:nth-child(3n + 2):last-child)::after { 
    flex: 1 1 calc((100% - 10px * 2) / 3); 
} 
```

根据在 `<section>` 中的 `<div>` 元素数量，给 `section` 的 `::after` 元素设置不同的 `flex-basis` 的值。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47057acf466f4d6a80b1d790714a5241~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/WNgVWvJ

上面示例的方法也同样适用于 CSS 网格布局中。比如根据网格项目的数量显示并更改网格中的列宽度：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae5d09caaa444ed385e1d6481605b72f~tplv-k3u1fbpfcp-zoom-1.image)

```CSS
.container {
    --item-size: 200px;
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(var(--item-size), 1fr));
    gap: 1rem;
}

.container:has(.item:nth-last-child(n + 5)) {
    --item-size: 120px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb028ac76f5b4ed696859f15fa55f863~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/KKxOjpm

注意，示例中的 `:nth-child(3n + 1):last-child` 、 `:nth-child(3n + 2):last-child` 和 `:nth-last-child(n + 5)` 是结构伪类选择器的一种特性，这种特性被称为**数量查询** （也称为**范围选择器** ）。它们组合在一起本身就是一种条件化 CSS 。

在 CSS 中，你可以通过数量和兄弟选择器来控制样式，这是一个强大的特性，但它有一个致命的缺陷，那就是无法对未知长度的列表做控制。例如，可以通过结合 `:nth-last-child(3n)` 和 `:first-child` 两个选择器来模拟一个 CSS 取模查询（Mod Query）。

比如下面的代码，选择一切能被 `3` 整除的列表：

```CSS
/*选择列表中所有能被3整除的列表*/ 
li:nth-last-child(3n):first-child, 
li:nth-last-child(3n):first-child ~ li { } 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f61f41a367fd4989bca791d38b2304fe~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/oNPKrer

简单解释一下该选择器。

*   ①：`li:nth-last-child(3n)` ，从列表项最后一项开始计，位于第 `3n` 的列表项都会被选中；
*   ②：`li:nth-last-child(3n):first-child` ，列表项总数被 `3` 整除，并且结合 `:first-child` 选中第一个列表项。即选中被 `3` 整除的列表中的第一列表项；
*   ③：`li:nth-last-child(3n):first-child ~ li` ，通用兄弟选择器，选中被 `3` 整除的列表中的非第一个列表项之外所有列表项；
*   ④：`li:nth-last-child(3n):first-child` 和 `li:nth-last-child(3n):first-child ~ li` 组合在一起，将选中能被 `3` 整除的列表中的所有列表项。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90c9db072c4942beaa4f16a3ac237d13~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/VwGoJqL

你只需要改变 `:nth-last-child(3n)` 中 `3n` ，就可以获得不同数值的整数倍，比如分别被 `2` 、`3` 、`4` 和 `5` 整除：

```CSS
/* 列表项总数被 2 整除 */
li:nth-last-child(2n):first-child,
li:nth-last-child(2n):first-child ~ li {
    background-color: cadetblue;
    border-color: #2d9782;
}

/* 列表项总数被 3 整除 */
li:nth-last-child(3n):first-child,
li:nth-last-child(3n):first-child ~ li {
    background-color: #d49200;
    border-color: #784e1c;
}

/* 列表项总数被 4 整除 */
li:nth-last-child(4n):first-child,
li:nth-last-child(4n):first-child ~ li {
    background-color: #53742d;
    border-color: #4e8e51;
}

/* 列表项总数被 5 整除 */
li:nth-last-child(5n):first-child,
li:nth-last-child(5n):first-child ~ li {
    background-color: #801137;
    border-color: #4d1414;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f24b4c730cdc4c2fa0ada35351f91363~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/yLxmmLR

通过取模查询（Mod Query），如果列表项总数能被 `3` 整除的列表项都能选中，但列表项总数不能被 `3` 整除时，也就是有余数的时候，需要给列表一个不同的样式。

如果余数为 `1` 的时候，只需要从倒数第二个开始计数，而不是最后一个。如此一来只需要在查询中简单的 `+1` 就可以。

```CSS
/* Mod查询，列表长度能被3整除余数1 */
li:nth-last-child(3n+1):first-child,
li:nth-last-child(3n+1):first-child ~ li {
    transform: rotate(45deg);
}
```

同上，如果余数是 `2`，只需要换成 `+2` 即可：

```CSS
/* Mod查询，列表长度能被3整除余数2 */
li:nth-last-child(3n+2):first-child,
li:nth-last-child(3n+2):first-child ~ li {
    transform: rotate(-45deg);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45186bb4308443f9b1e6bea2ce28fb0e~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/oNPKrer

按同样的原理，我们可以结合 `:nth-child(n)`（一切大于 `n`）和 `:nth-child(-n)`（一切小于 `n`）两个选择器实现一个范围选择器。假设要选择列表中的第 `3` 至 `5` 这几个列表项，可以这样使用：

```CSS
li:nth-child(n+3):nth-child(-n+5){ 
    background-color: #f36; 
} 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/02ed971ee0bf41ca92d15009e0bf841f~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/rNqBBBe

有了这些功能之后，查询最终并不像我预期想的那么困难，只需要把取模和范围选择器组合在一起。

```CSS
li:nth-last-child(3n):first-child  ~ li:nth-child(n + 3):nth-child(-n + 5){ 
     
} 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3117a8085b0941b49f240f0020f36ed2~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/KKGPPNw

### :is() 和 :where() 选择器

你在编写 CSS 代码的时候，可能会像下面这样使用长列表选择器来选择多个元素：

```CSS
article > h1,
article > h2,
article > h3,
article > h4,
article > h5,
article > h6 {
    margin: 0;
}
```

如果换成 `:is()` 选择器，代码会变得简洁：

```CSS
article > :is(h1, h2, h3, h4, h5, h6) {
    margin: 0;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/972e97cf3fdd4a4ea60a2093bfe159d3~tplv-k3u1fbpfcp-zoom-1.image)

可读性和更短的选择器仅是 `:is()` 和 `:where()` 为 CSS 带来的价值的一部分。它们更大的价值是可以改变选择器的权重计算。

*   `:is()` 选择器权重是根据其参数，即列表选择器中最高权重的选择器来决定的；
*   `:where()` 选择器权重永远为 `0` 。

先来看 `:is()` 选择器。

```CSS
p:is(.foo, #bar) { 
    color: hotpink; 
} 

p.foo { 
    color: lime; 
} 
```

上面代码中，最终是哪个选择器获胜呢？

我们借助 [Polypane 的 CSS 选择器权重计算工具](https://polypane.app/css-specificity-calculator/)来测算每个选择器的权重。`:is()` 中的参数是一个选择器列表，即 `.foo` 和 `#bar`，另外是在 `:is()` 选择器之外的 `p.foo`，它们的权重分别是：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b35cd7b9cb0745bc939429fa0623456d~tplv-k3u1fbpfcp-zoom-1.image)

很明显，`#bar` 选择器获胜，它是一个 ID 选择器。如果将 `p:is(.foo, #bar)` 和 `p.foo` 两个选择器来对比：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11412eab5cd2480084a22d2b2160ddc5~tplv-k3u1fbpfcp-zoom-1.image)

从上图中不难发现，`p:is(.foo, #bar)` 获胜。对应的 `p` 元素的文本颜色是 `hotpink` 。

更为有意思的是，以往要使 ID 选择器生效，必须在 HTML 中给标签元素设置一个 `id` 值，否则在 CSS 中即使设置了 `#id` 样式规则，也无法找到相匹配的元素：

```HTML
<div id="foo"></div>
```

```CSS
#baz {
    color: lime; /* 在 HTML 中没有定义 id 名为 baz 的元素 */
}

#foo {
    color: lime;
}
```

但使用 `:is()` 增加权重时，其列表参数中的 `id` 名可以不在 HTML 中的标签元素上显式设置。例如：

```HTML
<p class="foo">Class name is foo</p>
<p id="bar">ID name is bar</p>
<p id="faz" class="foo">Class name is foo and Id name is faz</p>
<p>Not has class name and id name</p>
```

```CSS
.foo {
  color: lime;
}

#bar {
  color: hotpink;
}

p:is(#baz#boo, .foo) {
  color: yellow;
}

#faz {
  color: orange;
}
```

你会发现，`:is(#baz#boo,.foo)` 中的 `#baz#boo` 在 HTML 中并没有定义，但它还是生效了。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e2e97253181451b9133c96bdee3d01c~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/LYgPeLG

你也可能发现了，`p:is(#baz#boo, .foo)` 选择器并没有成功地匹配到 `p#bar` 和 `p` (没有任何 `id` 名和类名)。

其实，`:is()` 这一特性将成为 CSS 的一个小技巧，**在不选择任何元素的情况下增加选择器权重** 。比如，你想用 `.button` 类来选择，可以使用 `:is()` 来给其增加选择器权重：

```CSS
:is(.button, #increase#specificity) { 
    color: hotpink; 
} 
 
.button { 
    color: lime; 
} 
```

即使你的 HTML 文档中没有任何地方出现过 ID 名： `#increase` 和 `#specificity` 同样能增加 `.button` 选择器权重：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5e87902fb0b4d688bfde66ad1b9ec88~tplv-k3u1fbpfcp-zoom-1.image)

它看起来有点类似于在属性值后面加 `!important` 来增加权重。

```HTML
<button class="button" id="button">With ID's</button>
<button class="button important">With !important</button>
<button class="button">Button</button>
```

```CSS
:is(.button, #increase#specificity){
    --background-color: #E91E63;
    --border-color: #8d2649;
}

:is(.button, #increase#specificity):hover{
    --background-color: #8d143d;
    --border-color: #bc6280;
}

.button {
    --background-color: #42b72a;
    --border-color: transparent;
    background-color: var(--background-color);
    border-color: var(--border-color);
}

.button:hover {
    --background-color: #36a420;
    --border-color: #36a420;
}

#button {
    --background-color: #2196F3;
    --border-color: #257cc1;
}

#button:hover {
    --background-color: #1977c2;
    --border-color: #0e4877;
}

.important {
    --background-color: #FF9800 !important;
    --border-color: #df8a0c !important;
}

.important:hover {
    --background-color: #d08415 !important;
    --border-color: #c3862c !important;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/805e737106f149eead687720bc5797e6~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/VwEZyEb

`:where()` 刚好与 `:is()` 相反，它可以使选择器权重始终是 `0` 。比如：

```CSS
:where(.foo, #bar) { 
    /* CSS Code */ 
} 

:where(p.foo, #bar, p#bar, $css:rocks) { 
    /* CSS Code */ 
} 

:where(p.foo, .foo, p#bar, #bar, #foo#bar) { 
    /* CSS Code */ 
} 
```

不管 `:where()` 选择器中参数（一个列表选择器）的选择器权重是多大，最终 `:where()` 的权重都是 `0`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73354edc3f364a5995244a9e1209c9a6~tplv-k3u1fbpfcp-zoom-1.image)

这对那些正在建立框架、主题和设计系统的人来说非常有益。使用 `:where()` 可以让选择器的权重为 `0`，而下游的开发者可以轻易地覆盖或扩展，而不需再担心因选择器权重产生冲突。这一特性，我已经在 [@argyleink 的 open-props ](https://github.com/argyleink/open-props)看到了：

```CSS
:where(html) { 
    --ease-1: cubic-bezier(.25, 0, .5, 1); 
    --ease-2: cubic-bezier(.25, 0, .4, 1); 
    --ease-3: cubic-bezier(.25, 0, .3, 1); 
    --ease-4: cubic-bezier(.25, 0, .2, 1); 
 }
```

`:where(html)` 选择器比 `:root` 和 `html` 选择器权重都要低：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e3f482fb31d4edaab06c22a8f374c9b~tplv-k3u1fbpfcp-zoom-1.image)

另外，`:where()` 用在重置的 CSS 中也非常有益：

```CSS
:where(:not(iframe, canvas, img, svg, video):not(svg *, symbol *)) { 
    all: unset; 
    display: revert; 
}
```

我们来看一个 `:where()` 的示例，比如下面这个运用于 `<img>` 的样式，你认为图片边框会是什么颜色：

```CSS
:where(article img:not(:first-child)) { 
    border: 5px solid red; 
} 

:where(article) img { 
    border: 5px solid green; 
} 

img { 
    border: 5px solid orange; 
}
```

第一条规则的选择器权重为 `(0,0,0)`，因为整个选择器都被包含在 `:where()` 中；第二条规则的选择器权重是 `(0,0,1)`，其中 `img` 不在 `:where()` 选择器中；第三条规则的选择器权重是 `(0,0,1)` ：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5ad0dcaecf3421082d22e71c18d8e87~tplv-k3u1fbpfcp-zoom-1.image)

就这个示例而言，第二条规则和第三条规则的选择器权重是相等的，但第三条规则位于第二条规则之后，因此第三条规则的获胜，所以运用到 `img` 的边框颜色是 `orange`，而不是 `green`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5544e11b204b4395be13bb513fd83eb4~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/XWxrZWX

### :focus-within 和 :focus-visible 选择器

`:focus-within` 最类似于父选择器 `:has()` ，但它仅适用于非常特定的条件。当附加到一个包含元素和一个匹配 `:focus` 的子元素时，可以向包含元素或容器内的任何其他元素添加样式。检查某个输入框（`<input>`）是否处于聚焦状态，如果是，就在其父元素添加边框。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2030229016d48e1910ba16c8f01c87b~tplv-k3u1fbpfcp-zoom-1.image)

我们有一个搜索组件。当输入框（`<input>`）被聚焦时，整个容器（`.form`）应该有一个轮廓线。使用 `:focus-within`，我们可以检查输入框是否处于聚焦状态，并进行相应的样式设置。

```HTML
<div class="form">
    <input type="search" name="search" class="search" />
    <button>Search</button>
</div>
```

```CSS
.form:focus-within {
    box-shadow: 0 0 0 5px rgb(233 29 99 / 50%);
}

.form:focus-within .search:focus {
    outline: none;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6549989764240f19849a1fe2c3d474b~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/YzJzwrW

你会发现，按钮 `button` 得到焦点时，其容器 `.form` 同样会有一个轮廓线（`box-shadow` 制作的轮廓线）。

使用 `:focus-within` 这一特性，我们可以实现很多有创意的交互效果，比如抽屉式导航菜单（Off-Screen Nav）效果：

```CSS
#nav-container:focus-within .bg { 
    visibility: visible; 
    opacity: .6; 
} 

#nav-container:focus-within .button { 
    pointer-events: none; 
} 

#nav-container:focus-within .icon-bar:nth-of-type(1) { 
    transform: translate3d(0,8px,0) rotate(45deg); 
} 

#nav-container:focus-within .icon-bar:nth-of-type(2) { 
    opacity: 0; 
} 

#nav-container:focus-within .icon-bar:nth-of-type(3) { 
    transform: translate3d(0,-8px,0) rotate(-45deg); 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09b88f0d50a44c1a83048cad83d05d66~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/zYmYrbx

你还可以使用 `:focus-within` 给表单添加一些动效：

```HTML
<form class="form">
    <div class="form-group">
        <input type="text" placeholder="Name" />
    </div>
</form>
```

```CSS
.form-group {
    margin: 25px 0;
    position: relative;
}

.form-group::after {
    content: "";
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: royalblue;
    height: 2px;
    transition: transform 200ms ease;
    transform: scaleX(0);
    transform-origin: left;
}

.form-group:focus-within::after {
    transform: scaleX(1);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6798ca41007c411786c703eeca21b414~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/mdzdVZq

最后再来看一个搜索表单收缩与展开的动画效果，这个效果也是使用 `:focus-within` 来实现的：

```HTML
<div class="search">
    <input type="text" placeholder="Search...">
    <button class="btn">
        <i class="fas fa-search"></i>
    </button>
</div>
```

```CSS
.search{
    position:relative;
    height:50px;
}

.search input{
    height:50px;
    width:50px;
    transition: width 0.3s ease;
}

.btn{
    position:absolute;
    transform:translate(-50%);
    top:0%;
    left:50%;
    height:80px;
    width:80px;
    transition:
        transform 0.3s ease, 
        width 0.3s  cubic-bezier(0.68, -0.55, 0.265, 1.55),
        height 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55),
        left 0.3s  ease;
}

:focus-visible {
    outline: none;
}

.search:focus-within input{
    width:300px;
}
.search:focus-within .btn{
    top:10%;
    left:88%;
    height:70px;
    width:70px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 0px 0px 0px, rgba(0, 0, 0, 0.2) 0px 0px 0px inset;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/358f84d7829b4f89a014ac7e0b807096~tplv-k3u1fbpfcp-zoom-1.image)

> Demo  地址：https://codepen.io/airen/full/QWZWNWY

如果你足够仔细的话，在上面的示例中你会发现，我们使用了一个 `:focus-visible` 的伪类选择器。在 CSS 中，它和 `:focus` 和 `:focus-within` 都是用来管理元素获得焦点时的样式规则。

*   `:focus`：当用户使用鼠标点击焦点元素或使用键盘的 `Tab` 键（或快捷键）触发焦点元素焦点环的样式；
*   `:focus-visible`：只有使用键盘的 `Tab` 键（或快捷键）触发焦点元素焦点环的样式。如果仅使用 `:focus-visible` 设置焦点环样式的话，那么用户使用鼠标点击焦点元素时，不会触发焦点环样式；
*   `:focus-within`：表示一个元素获得焦点，或该元素的后代元素获得焦点。这也意味着，它或它的后代获得焦点，都可以触发 `:focus-within`。

来看一个简单的示例：

```CSS
.button:focus { 
    outline: 2px dotted #09f; 
    outline-offset: 2px; 
}

.button:focus-visible { 
    outline: 2px solid #f36; 
    outline-offset: 2px; 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e15edb18145d44d2bd409bba18e23f34~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/zYmYqEK

你会发现，分别使用鼠标点击按钮和按 `Tab` 让按钮获得焦点时焦点环样式效果不同。不过需要注意的是，`:focus` 和 `:focus-visible` 也会涉及到选择器权重的问题，就上面的示例来说，如果我们把 `:focus` 选择器对应的样式放置到 `:focus-visible` 之后：

```CSS
button:focus-visible { 
    outline: 2px solid #f36; 
    outline-offset: 2px; 
} 

button:focus { 
    outline: 2px dotted #09f; 
    outline-offset: 2px; 
}
```

这个时候，你会发现不管用户使用键盘 `Tab` 键还是鼠标让 `<button>` 获得焦点时，焦点样式都会采用 `:focus` 对应的样式：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3828a74642a0411bbf9c20b7877c3e6d~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/PoyoNeX

如果我们要让 `:focus` 和 `:focus-visible` 可以有独自的样式，可以借助 CSS 选择器中的 `:not()` 来处理：

```CSS
button:focus:not(:focus-visible) { 
    outline: 2px dotted #416dea; 
    outline-offset: 2px; 
    box-shadow: 0px 1px 1px #416dea; 
} 

button:focus-visible { 
    outline: 2px solid #416dea; 
    outline-offset: 2px; 
    box-shadow: 0px 1px 1px #416dea; 
}
```

这个时候按 `Tab` 键盘和鼠标点击时，焦点环样式就有相应的差异：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f37c0e37e8843c3a153d7f9f09c914f~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/LYgYNJe

或许你想到这样的场景了，如果你在做 A11Y 方面的优化，希望在移动端和 PC 端上对焦点元素设置不同的焦点环样式，那用上面这种方案来说就会非常的灵活。

### **:placeholder-shown 选择器**

`:placeholder-show` 是一个 CSS 伪类，它允许你对具有占位符文本的 `<input>` 或 `<textarea>` 应用样式。

```HTML
<input type="text" placeholder="CSS Placeholder Shown" />
```

```CSS
input:placeholder-shown {
    background-color: #89faee;
    box-shadow: 0 0 0 3px rgb(0 0 0 / .5);
    text-overflow: ellipsis;
    color: #333;
}
```

在上面的代码片段中：

*   如果用户尚未输入任何内容，则显示的占位符的背景颜色将为海蓝色（`#89faee`），文本带有指示溢出等；
*   当用户已经输入了内容时，不会显示占位符，并且背景颜色将是酒红色（`#f36`）。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/819c897f1eda43948e7245c4208b803d~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/MWPWbra

需要注意的是，**如果没有占位符文本，`:placeholder-shown`** 将不起作用，即它允许你对具有占位符文本的  `<input>` 或 `<textarea>` 应用样式。

```HTML
<!-- 没有占位符文本 -->
<input type="text"  />
<input type="text" value="No Placeholder" />
<input type="text" value="This is also considered no placeholder text" placeholder=""/>

<!-- 有占位符文本 -->
<input type="text" placeholder="CSS Placeholder Shown" />
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e18466d573ba4b18badd468991e80ad2~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/YzJzpMO

你会发现，在 `:placeholder-shown` 中设置了 `color: #333` ，但并未生效。这是因为 `:placeholder-shown` 只会对目标输入框（具有占位符文本的 `<input>`）本身生效。但对于实际的占位符文本，必须使用伪元素 `::placeholder`。

```CSS
input::placeholder {
    color: #333;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/035e796966594fb59038cc3805adb03b~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/jOeOyBM

有一点需要注意，`::placeholder` 还不是一个标准的选择器，针对不同的浏览器内核需要添加不同的前缀，而且还不能使用长列表选择器模式：

```CSS
/* 有效 CSS 规则 */
::-webkit-input-placeholder { 
    /* Chrome/Opera/Safari */ 
    color: #333; 
} 

::-moz-placeholder { 
    /* Firefox 19+ */ 
    color: #333; 
} 

:-ms-input-placeholder { 
    /* IE 10+ */ 
    color: #333; 
} 

:-moz-placeholder { 
    /* Firefox 18- */ 
    color: #333; 
}

/* 无效 CSS 规则 */
::-webkit-input-placeholder, 
::-moz-placeholder, 
:-ms-input-placeholder, 
:-moz-placeholder { 
    color: #333; 
}
```

同样的，即使你使用 `:is()` 缩短长列表选择器，也将是无效选择器：

```CSS
:is(
   ::-webkit-input-placeholder, 
    ::-moz-placeholder, 
    :-ms-input-placeholder, 
    :-moz-placeholder 
) {
    color: #333;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da03421d7db549f082a8f905c13bf858~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/abRbpYj

有意思的是，在 `:placeholder-shown` 中设置 `color` 无效，但设置其它样式是有效的，比如：

```CSS
input:placeholder-shown {
    font-style: italic;
    text-transform: uppercase;
    letter-spacing: 5px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/800c88d5eb3d40bea86fe305cbd18cfe~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/OJBJWaN

同样的，我们使用 `:placeholder-shown` 和其他 CSS 选择器可以制作一些很酷的效果。如果显示了占位符文本，那么它意味着该元素是空的。例如，前面的搜索表单的示例，如果用户没有在输入框（`<input>`）中输入任何东西，与其相邻的按钮处于禁用状态，一旦用户在输入框中输入内容，按钮则是可用状态：

```HTML
<div class="form">
    <input type="search" placeholder="What are you looking for?" id="srach" name="search" class="search" />
    <button>Search</button>
</div>
```

```CSS
.search:placeholder-shown + button {
    --background-color: #a19196;
    --border-color: #4f4246;
    cursor: not-allowed;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fc58eda9af24376af78ba5382863f7f~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/xxyxdjd

另外，我们制作表单时，为了满足一些 Web 设计师的需求，会将 `label` 省略不写。虽然这样做能满足设计的需求，但对于 Web 可访问性是致命的伤害。换句话说，使用占位符 `placeholder` 而不使用 `label` 的一个问题是 Web 可访问性。因为一旦用户开始在输入框中输入内容时，占位符文本就会消失。这可能会使用户感到困惑。

一个非常好的解决方案是“显示占位符文本时，标签不显示；一旦用户在文本框中输入内容时，标签就显示”。这样，你仍然可以保持表单的整洁，而且还不会损害用户体验或 Web 可访问性。这是一种双赢的结果。

要实现这种效果，我们只需要将 `:placeholder-shown` 、`:not()` 和相邻兄弟选择器（`+`）结合起来即可。

```HTML
<form class="form">
    <div class="form-group">
        <input type="text" placeholder="Name" name="name" id="name" />
        <label for="name">Name:</label>
    </div>
</div>
```

```CSS
input:not(:placeholder-shown) + label {
    opacity: 1;
    transform: scale(1);
    bottom: 100%;
}

input:not(:placeholder-shown) {
    border: 1px solid #ccc;
    border-radius: 4px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0cda59ca00814ce89911526e23455f7b~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/QWZWvow

### :target 选择器

在某些文档语言中，文档的 `URL` 可以通过 `URL` 的片段进一步指向文档中的特定元素。以这种方式指向的元素是文档的目标元素。 其中片段标识符是 `URL` 中紧跟 `#` 的部分，例如 `#top` 或 `#footnote1`。你可能已经使用它们创建页面内导航，比如大家常见的“跳转链接”。

有了 `:target` 伪类选择器，我们可以突出显示与该片段对应的文档部分，而且无需 JavaScript 也可以做到这一点。 借助 `:target` 强大的特性，我们可以使用它实现一些带有交互功能的 Web 组件（这些组件以往是需要 JavaScript 脚本辅助才能实现），比如 Tab、Accordion 和 Modal 组件。

我们先来看一个 `:target` 伪类选择器实现手风琴（Accordion）组件的案例。先看 HTML 代码：

```HTML
<dl>
    <dt>
        <a href="#kittens">Cat Ipsum really speaks to people who own felines.</a>
    </dt>
    <dd id="kittens">
        <p>
            <img src="http://placekitten.com/50/50" />
            Kitten Ipsum fire cute wonderful cold cat heart loving hearts cat healing prrrrr favorite caturday rescue kitty cats chuf cake day family buddy, whisker sneak spoon belly.
        </p>
    </dd>
    <dt>
        <a href="#batman">You're taller than you look in the tabIoids, Mr. Wayne.</a>
    </dt>
    <dd id="batman">
     <p>But a man who doesn't care about the world doesn't spend half his fortune on a plan to save it. And isn't so wounded when it fails that he goes into hiding.</p>
    </dd>
</dl>
```

使用 `:target` 伪类选择器，有一个必要条件，那就是 HTML 文档中有相应的 `URL` 标识符，并且它们有相应的对应关系。比如上面示例中：

*   `dd` 元素中使用 `id` 来定义一个标识符，如 `id="kittens"`；
*   `a` 元素中使用 `href` 来指定 URL 标识符，一般是 `#` 加 `id` 名，比如 `#kittens`。

在 CSS 中将 `dd` 的 `max-height` 设置为 `0` ，也就是手风琴未展开时（`dd:not(:target)`）。当用户点击手风琴标题时，与之匹配的内容就会展开，`dd` 元素的 `max-height` 就是 `100px` ，即 `dd:target` ：

```CSS
dd {
    overflow: hidden;
    transition: max-height .5s;
}
dd:not(:target) {
    max-height: 0;
}
dd:target {
    max-height: 100px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2243e70b8a4c4073a56f2587ca183efd~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/PxYxap

注意，这种方案有一个较大的缺陷是，`max-height` 属性设置一个固定值时，很难与手风琴内容高度相匹配，有可能会造成溢出内容，或被裁剪，或有额外的空白空间存在。如果不给 `max-height` 设置一个固定值，而是改变一个内在尺寸，比如 `min-content` 或 `max-content` ，那么手风琴内容展开的动效就会失去。

再来看一个 `:target` 制作的模态框组件（Modal）：

```HTML
<a href="#target-content" id="button">Open CSS Modal via <code>:target</code></a>
<div id="target-content">
    <a href="#" class="close"></a>
    <div id="target-inner">
        <h2>CSS Modal</h2>
    </div>
</div>
```

```CSS
#target-content {
    pointer-events: none;
    opacity: 0;
    transition: opacity 200ms;
}
#target-content:target {
    pointer-events: all;
    opacity: 1;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/975cf84d16a2473b993ab430beb820dc~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/PoyqdQZ

### 表单伪类选择器

CSS 选择器中还有一类是专用于表单控件的伪类选择器，比如 `:required` 、 `:optional` 、 `:disabled` 、 `:read-only` 、 `:valid` 、 `:invalid`  `:in-range` 、 `:out-of-range` 和  `:checked` 等，它们除了可以帮助你美化表单控件的 UI 外观之外，还可以为表单控件验证时提供相应的结果。

另一个有意思的是，这些表单伪类选择器也可以让 CSS 具有 `if ... else ...` 的能力。比如：

*   `:valid` 和 `:invalid` ：根据用户输入的数据内容进行判断，并给用户提供不同的反馈结果，有效和无效数据可以具备不同的 UI 风格；
*   `:required` 和 `:optional` ：为用户提供不同的 UI，可以告诉用户哪些项是必填，哪些项是可选填；
*   ……

比如：

```CSS
input:required + .help-text::before {
    content: '*Required';
}

input:optional + .help-text::before {
    content: '*Optional';
}

input:read-only {
    border-color: var(--gray-lighter) !important;
    color: var(--gray);
    cursor: not-allowed;
}

input:valid {
    border-color: var(--color-primary);
    background-image: url("data:image/svg+xml,%3Csvg width='45px' height='34px' viewBox='0 0 45 34' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg transform='translate%28-56.000000, -59.000000%29' fill='%232EEC96'%3E%3Cpolygon points='70.1468531 85.8671329 97.013986 59 100.58042 62.5664336 70.1468531 93 56 78.8531469 59.5664336 75.2867133'%3E%3C/polygon%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
}

input:invalid {
    border-color: var(--color-error);
    background-image: url("data:image/svg+xml,%3Csvg width='30px' height='30px' viewBox='0 0 30 30' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg transform='translate%28-128.000000, -59.000000%29' fill='%23F44336'%3E%3Cpolygon points='157.848404 61.9920213 145.980053 73.8603723 157.848404 85.7287234 154.856383 88.7207447 142.988032 76.8523936 131.119681 88.7207447 128.12766 85.7287234 139.996011 73.8603723 128.12766 61.9920213 131.119681 59 142.988032 70.8683511 154.856383 59'%3E%3C/polygon%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
}

input:invalid:focus {
    border-color: var(--color-error);
}

input:invalid + .help-text {
    color: var(--color-error);
}

input[type='email']:invalid + .help-text::before {
    content: 'You must enter a valid email.'
} 

input:out-of-range + .help-text::before {
    content: 'Out of range';
}

input[type='checkbox'] + label {
    user-select: none;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e78da6ebb18b4e1ca02db88ad58cbf2e~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/qVRZbb

### :empty 和 :blank 选择器

你在开发 Web 应用或页面时，是否碰到上图这种现象：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55a0f2daa81a4510ab6b5120ad0602f7~tplv-k3u1fbpfcp-zoom-1.image)

在元素上设置了一个 `padding` 值，比如：

```CSS
.alert {
    padding: 1rem;
    background-color: #D1ECF1;
}
```

但由于某些原因，内容并没有输出来，由于元素设置了 `padding` 值，在页面上始终能看到一个带有背景的空白盒子。

如果你碰到这种现象，那么你就可以使用 `:empty` 或 `:blank` 伪类选择器。它们可以检查元素的内容是否是空内容，如此一来，你可以在空内容状态下设置一个样式：

```CSS
.alert:empty {
    display: none;
}
```

或者也可以和 `:not()` 选择器结合起来使用：

```CSS
.alert:not(:empty) {
    padding: 1rem;
    background-color: #D1ECF1;
}
```

不过，使用 `:empty` 伪类选择器时，它有一个必要条件：**元素没有任何内容，如果它有任何类型的字符，即使是空格**，**那么该元素也不被认为是空的**。

```HTML
<!-- 空元素：无任何任何 --> 
<div class="alert alert--info"></div>
<div class="alert alert--info"><!-- 我是一个注释 --></div> 

<!-- 非空元素 --> 
<div class="alert alert-info"> <!-- 我是一个注释 --></div> 
<div class="alert alert-info"><!-- 我是一个注释 --> </div> 
<div class="alert alert-info"> <!-- 我是一个注释 --> </div>
```

`:blank` 和 `:empty` 类似，可以用来选择空内容的元素，但 `:blank` 比 `:empty` 更灵活一些。`:blank` 可以匹配带有 `spaces`（空格）、 `tabs`（缩进符） 和 `segment breaks`（片段分割） 内容的元素。 比如：

```HTML
<div class="alert alert-info"> </div> 
```

```CSS
/* 无效，因为 HTML 元素中有一个空格符 */
.alert:empty {
    display: none;
}

/* 有效 */
.alert:blank {
    display: none;
}
```

需要注意的是，即使你使用 JavaScript 的 `removeChild` 来删除元素，也还是会产生空格符的，因为 `removeChild` 删除元素时会生成包含空格的 HTML（即使它可能不会在浏览器的检查器中显示）。我们可以使用 `childNodes` 属性来检查文本节点是否存在。可以在浏览器模拟一下这样的场景：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8cf42548fb144a20ad38b822f5a4b9bb~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/EdzeKX

所以说，你在使用 JavaScript 删除元素时，为了确保 HTML 元素的内容中不存在任何空字符串，还需要使用 `element.innerHTML=''` 来清除空字符串。例如，上面这个示例中，在 `ul.children.length === 0` 的时候，使用 `ul.innerHTML=''` 清理 `<ul>` 中的空格。

```JavaScript
const ul = document.querySelector('ul') 
const li = ul.children[0] 
ul.removeChild(li) 

if (ul.children.length === 0) { 
    ul.innerHTML = '' 
}
```

虽然 `:blank` 没有这些烦恼，也不需要你额外去操作什么，但不幸运的是，到写这节课的时候，`:blank 还没得到任何主流浏览器的支持`。

不过从字面上来理解，它们都指的是**空**。在实际的运用之中，不管是 `:empty` 和 `:blank` 都是有用的，比如说： 给**空元素添加样式**和**创建空的状态** 。比如，[@Heydon 的写的 ToDoList 组件](https://inclusive-components.design/a-todo-list/)就使用了 `:empty` 伪类选择器：

`ToDoList` 组件中有待办项时的 HTML 结构：

```HTML
<ul> 
    <li>To do list1</li> 
    <li>To do list2</li> 
    <li>To do list3</li> 
</ul> 
<div class="empty-state"></div> 
```

没有任何待办事项，对应的结构就变成这样了：

```HTML
<ul></ul> 
<div class="empty-state"></div> 
```

你的 CSS 就可以这么写：

```CSS
ul:empty, .empty-state {
    display: none;
}

ul:empty + .empty-state {
    display: block;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/480e7b1a10fd4b339a7f22214d8a0015~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/heydon/full/VpVNKW （By [@Heydon](https://inclusive-components.design/a-todo-list/)）

再来看另一场景，稍微复杂一点，假设我们的项目中有这样的一个效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97ae0ade42b74a2bba0e7662a5ce63cf~tplv-k3u1fbpfcp-zoom-1.image)

```HTML
<div class="blue"></div> 
<div class="box"> 
    <div class="lime"></div> 
    <div class="red"></div> 
</div>
```

当 `.lime` 有内容的时候，`.red` 距离 `.blue` 更远（`margin-top`），而当 `.red` 如果没有字段输出的时候，`.red` 距离 `.blue` 更近。处理这样的两个场景，`:empty` 能灵巧得多了。

```CSS
/* 实现左图的效果 */ 
.red {
    margin-top: 30px; 
} 

/* 实现右图的效果 */ 
.lime:empty { 
    display: none; 
} 

.lime:empty + .red { 
    margin-top: 10px; 
} 
```

是不是觉得轻松多了。

## 小结

到目前为止，在 CSS 中不能像其他程序语言，具有真正的 `if ... else ...` ，即条件化 CSS。但有意思的是，CSS 中有很多特性，表面上看不具有条件化能力，但它们实际的能力是具备条件能力的。比如，这节课中所介绍的 CSS 的 `@` 规则（`@media` 、`@supports` 和 `@container` 等）以及 CSS 的一些选择器，比如最新的 `:not()` 、`:has()` 等，甚至是一些老的，我们熟悉的 CSS 选择器，比如 `:checked` 、`:focus-within` 、`:empty` 等。

除此之外，CSS 中的属性和属性值，以及一些 CSS 的函数，同样也能让 CSS 具备条件化的能力，有关于这一部分的内容，我们将在下一节课中与大家一起讨论！
