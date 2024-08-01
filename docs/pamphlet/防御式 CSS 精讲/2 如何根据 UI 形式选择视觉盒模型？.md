Web 开发者都知道，在 Web 中呈现给用户的 UI 形式，它主要由 HTML 和 CSS 组成。**Web 开发者使用 HTML 元素来构建 UI 的骨架，使用 CSS 规则来美化 UI**，看上去它们两者（HTML 和 CSS）分工明确，不会有任何的耦合或关联，事实上并非如此。对用户来说，在 Web 上渲染出来的 UI 只要好看即可，但对于一名优秀的 Web 开发者而言，在构建 UI 的时候，需要尽可能地根据 UI 形式来选择适合的 HTML 元素和视觉盒模型。

在接下来的内容中，我们一起来探讨，Web 开发者应该怎么做，才能根据 UI 呈现形式来选择合适的 HTML 元素和视觉盒模型。

## 什么是视觉盒模型？

大部分 Web 开发者都知道，在 CSS 的世界中，每一个元素都会被视为一个**盒子**，同时对 CSS 的盒模型较为熟悉，但很多人会对于视觉盒模型感到很陌生。孰不知，[**视觉盒模型**](https://www.w3.org/TR/CSS22/visuren.html) 也是 CSS 中的一个非常重要的基础概念。

简单地说，视觉盒模型也被称为**视觉格式化模型**，它会根据 CSS 盒模型将 HTML 文档中的元素转换为一个个盒子。它会根据盒子的包含块（Container Block）的边界来渲染盒子。其实，它也是我们常说的格式化上下文（Formatting Context），比如大家常听到的 BFC、IFC 等。

如此一来，在 CSS 中任何一个盒子就有了两种模型，其中一个是**盒模型（Box Model）** ，另一个就是**视觉盒模型（Visual Formatting Model）** 。它们有着明确的分工：

- **盒模型** ：主要用来计算盒子大小的，它主要包括了 CSS 的 `width` 、`height` 、`border` 、`padding` 和 `margin`； 
- **视觉盒模型** ：主要用来计算盒子位置，即用于布局。它主要由盒子的尺寸、盒子的类型、定位方案、文档树中的其它元素、浏览器视窗尺寸与位置、所包含的图片尺寸、其他的某些外部因素来决定。

## 为什么要选择合理的视觉盒模型？

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9c78ce0f63444319e9f4969a5aef83a~tplv-k3u1fbpfcp-zoom-1.image)

上图是一个很常见的表单注册页。抛开其他 UI 不说，我们只说上图中的 “**Sign Up**” 按钮。上图中左侧设计稿中的  “Sign Up” 按钮和右侧设计稿中的 “Sign Up”按钮最为明显的差异就是**宽度**不一样，其他样式是相似的。

针对按钮的还原，不同的 Web 开发者会选择不同的 HTML 元素。注重 Web 语义化的同学可能会选择 `<button>` 元素：

```HTML
<button class="button">Sign Up</button>
```

当然，不少 Web 开发者可能会根据 UI 形式来选择 HTML 元素：

```HTML
<!-- 左侧图中 Sign Up 按钮 -->
<span class="button">Sign Up</span>

<!-- 右侧图中 Sign Up 按钮 -->
<div class="button">Sign Up</div>
```

现实开发中，很多 Web 开发者既不关注 HTML 语义化标签的使用，也不会关注 UI 呈现的形式，基本上一个 `<div>` 标签梭哈了。即，不管 UI 的任何呈现形式，所有 Web 页面都只有 `<div>` 标签元素：

```HTML
<div class="button">Sign Up</div>
```

虽然说，如此使用 HTML 元素不会被认定为是一种错误方式，但会被认为是不合理的方式。即使不考虑语义化，也将会为编写 CSS 规则付出更多的代价（将产生冗余代码）。**需要根据 UI 呈现形式改变视觉盒模型** ，即 **显式调整格式化上下文（****[Formatting Context](https://drafts.csswg.org/css-display-3/#formatting-context)****）** 。HTML 中的标签元素主要分为：

- **块元素**：比如 `<div>` 、`<p>` 和 `<ul>` 等；
- **内联元素** ：比如 `<span>` 、`<a>` 和 `<strong>` 等；
- **不可替换元素** ：比如 `<img>`。

这些不同类型的 HTML 元素都有着自身默认的视觉盒模型格式，比如块元素被称为**块格式化上下文（Block Formatting Context）** 、内联元素被称为**行内格式化上下文（Inline Formatting Context）** 。简单地说，不同类型的元素的 `display` 是不一样的：

```CSS
.block-element {
    display: block;
}

.inline-element {
    display: inline;
}
```

抛开其理论不说，仅从呈现给用户的 UI 效果而言，块格式化上下文和行内格式化上下文所产生的盒子大小有着非常直观的差异：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88bc9e855c5048ee861a996d486caa17~tplv-k3u1fbpfcp-zoom-1.image)

简单地说：

- 块元素（块格式化上下文），它的默认宽度（`width`）会填满其包含块，即 `width: 100%`； 
- 内联元素（内联格式化上下文），它的默认宽度（`width`）和其内容有关，如果有足够多的内容时，它也会填满其包含块，否则相当于 `max-content`。 

所以，**在还原 Web UI 时，我们首先要根据设计稿中 UI 呈现形式来选择正确的** **HTML 标签元素（最好是能选择更具语义化的标签元素）**。

## 如何改变视觉盒模型的格式？

现在我们已经知道了，视觉盒模型会将 HTML 文档中的标签元素变成一个盒子，而且盒子有着不同类型。这样一来，Web 开发者根据 UI 呈现形式选择了正确的标签元素，也有可能会造成盒子的格式化模式不对。比如，上面表单中的 “Sign UP” 按钮，我们选择合适的语义化标签 `<button>` ，但无法满足布局所需。也就是说，我们很多时候需要基于语义化的标签元素，手动调整盒子的格式化模式。

在 CSS 中，我们可以通过 `display` 属性来手动调整盒子类型（视觉盒模型）。[CSS 的 display 属性](https://www.w3.org/TR/css-display-3/#the-display-properties)提供了多个不同类型的值：

| **`display`** **的简写** | **`display`** **全称**  | **生成的盒子**                                               |
| ------------------------ | ----------------------- | ------------------------------------------------------------ |
| `none`                   |                         | 从盒子树中移除，包括其所有后代元素                           |
| `contents`               |                         | 元素替换为盒子树中的内容                                     |
| `block`                  | `block flow`            | 正常流内的块级盒子                                           |
| `flow-root`              | `block flow-root`       | 定义一个 BFC 的块级盒子                                      |
| `inline`                 | `inline flow`           | 正常流内的内联级盒子                                         |
| `inline-block`           | `inline flow-root`      | 定义一个内联块级盒子，又称内联块                             |
| `run-in`                 | `run-in flow`           | 定义一个 run-in 盒子（具有特殊的盒子树修改规则的内联级盒子） |
| `list-item`              | `block flow list-item`  | 正常文档流和带有附加标记的块级盒子                           |
| `inline list-item`       | `inline flow list-item` | 正常文档流和带有附加标记的内联级盒子                         |
| `flex`                   | `block flex`            | 带有内部伸缩布局的块级盒子（块级伸缩容器）                   |
| `inline-flex`            | `inline flex`           | 带有内部伸缩布局的内联级盒子（内联级伸缩容器）               |
| `grid`                   | `block grid`            | 带有内部网格布局的块级盒子（块级网格容器）                   |
| `inline-grid`            | `inline grid`           | 带有内部网格布局的内联级盒子（内联级网格容器）               |
| `ruby`                   | `inline ruby`           | 内联级 ruby 容器                                             |
| `block ruby`             | `block ruby`            | 块级 ruby 容器                                               |
| `table`                  | `block table`           | 带有内部表格布局的块级盒子                                   |
| `inline-table`           | `inline table`          | 带有内部表格布局的内联级盒子                                 |

注意，上面表格中第一列是目前 `display` 的使用语法，第二列是 `display` 属性未来的使用语法，也被称为双值语法，即：

```CSS
.container {
    display: grid;
    
    /* 等同于 */
    display: block grid; /* 两个词之间有一个空格 */
}

.container {
    display: inline-grid;
    
    /* 等同于 */
    display: inline grid; /* 两个词之间有一个空格 */
}
```

当你在为选择合适的盒子类型（格式化盒子）感到困惑时，我们可以按照 `display` 属性的双语法规则来做出相应的选择：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8145ecc6bb01409bb23a8c93d4f1289a~tplv-k3u1fbpfcp-zoom-1.image)

如上图所示，我们可以根据 UI 形式，从第一列中选择相应文档流方式，可以是 `block` 或是 `inline` ；然后从第二列中选择布局方案，如果选择使用 CSS Flexbox 布局，则选择 `flex` ；如果选择使用 CSS Grid 布局，则选择 `grid`；如果 UI 是一个列表（可能带有标记符），则选择第三列中的 `list-item` 。

我们来看一个具体的案例：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/583a34a074d2449fa9bb3375bf8002ee~tplv-k3u1fbpfcp-zoom-1.image)

从上图中不难发现，左侧图中的 “Sign Up” 按钮的宽度没填充整个包含块（按钮宽度小于包含块的宽度），而右侧图中的 “Sign Up” 按钮宽度填充了整个包含块（按钮宽度等于包含块的宽度）。

如果从这个角度出发，左图中的 “Sign Up” 按钮更接近于一个内联级盒子，即 `inline` ，而右图中的 “Sign Up” 按钮更接近于一个块级盒子，即 `block` 。如果决定使用 CSS Flexbox 来布局的话，那么最终左图的按钮会选择 `inline flex` ，右图的按钮会选择 `block flex` ：

```HTML
<!-- 左图中的 Sign Up 按钮 -->
<button class="button button--left">Sign Up</button>

<!-- 右图中的 Sign Up 按钮 -->
<button class="button button--right">Sign Up</button>
.button--left {
    display: inline-flex;
    
    /* 等同于 */
    display: inline flex;
}

.button--right {
    display: flex;
    
    /* 等同于 */
    display: block flex;
}
```

你可以用下图来映射出 `display` 属性现有的值：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61325b6daebf4c75b51e5fea5f3b05e5~tplv-k3u1fbpfcp-zoom-1.image)

这样做（`display` 设置双值）能更好地帮助你理解更改 `display` 属性值时会发生什么。因为，当你在 CSS 中定义一个盒子的布局时，你是在定义这个盒子发生了什么，它又是如何与布局中的其他盒子产生关系的。你还定义了该盒子的所有子元素的行为。

## 案例：注册表单中的按钮

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b52adf7169d43bfaa08483a98d0beb0~tplv-k3u1fbpfcp-zoom-1.image)

继续拿上图中的按钮为例。按理来说，在 Web 中制作按钮，最好是使用带有语义化的 `<button>` 标签，不过我为了模拟现在互联网上现状，使用了不具任何语义化的标签 `<div>` 来制作按钮：

```HTML
<!-- 左图 -->
<div class="welcome">
  <h2>Loop Music</h2>
  <p>Loop Music is the best music streaming app to enjoy great music. Play any song of your favorite artist, album or playlist in high quality.</p>
  <div role="button" tabindex="-1" class="button button--primary">Sign Up</div>
  <div role="button" tabindex="-1" class="button button--secondary">Sign In</div>
</div>

<!-- 右图 -->
<form class="signup">
  <h2>Get Started</h2>
  <div class="control">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" placeholder="Toprak Efe Guvenc" >
  </div>
  <div class="control">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" placeholder="toprakefeguvenc@gmail.com" >
  </div>
  <div class="control">
    <label for="password">Password</label>
    <input type="password" id="password" name="password" placeholder="Enter your password" >
    <p>Must be at least 8 characters</p>
  </div>
  <div class="control">
    <div role="button" tabindex="-1" class="button button--primary">Sign Up</div>
  </div>
</form>
```

> 注意，上面代码中所示的 HTML 结构和设计稿中的不是完全一致！如果你感兴趣的话，可以将右图的结构进一步完善！

示例中的 `div.button` 默认的盒子类型（视觉盒模型格式化）是 `block` ，即 `display` 的值是 `block` 。不过，为了实现所需的布局效果，Web 开发者会采用 CSS Flexbox 或 CSS Grid 布局技术。也就是说，会手动将 `display` 的值改成 `inline-flex` 或 `flex` 。

可能你会问，应该将 `display` 属性的值设置为哪一个呢，是 `inline-flex` 还是 `flex`？

其实答案在前面就已经提到了，首先我们应该根据 UI 呈现形式来做出合适的选择。比如上图中左图的按钮，它在文档流是一个内联级盒子，那么将它的 `display` 属性值设置为 `inline-flex` 更合适；右图的按钮，它在文档流是一个块组级盒子，所以将它的 `display` 属性值设置为 `flex` 更合适。

可事实上，很多 Web 开发者在实际开发中时，并不会考虑到这一点，很多时候直接将 `display` 设置为 `flex` 。这样一来，很难满足 UI 还原的需要：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d1d633cf689413daca37a718414a10c~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/yLxLwWN

也就是说，没有选择合理的视觉盒模型，你可有需要增加额外的 CSS 代码。假设你选择 `display: flex` ，那么你需要给左图中的按钮设置一个最大宽度值：

```CSS
.button {
    display: flex;
}

.welcome .button {
    max-width: 280px;
    margin-inline: auto;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3975029d7014d948d84caff7fc78cb5~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/ababxXj

同样的，如果将 `display` 都设置为 `inine-flex` ，那么你需要给右图中的按钮设置宽度 `width` 为 `100%` ：

```CSS
.button {
    display: inline-flex;
}

.signup .button {
    width: 100%;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4a18ad2fa464789be9be8ad35736cad~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/LYJYvoq

正确的使用姿势应该是根据 UI 所需给 `display` 设置正确的值：

```CSS
.button {
    display: var(--display);
}

/* 左图按钮 */
.welcome .button {
    --display: inline-flex;
}

/* 右图按钮 */
.signup .button {
    --display: flex;
}
```

> Demo 地址：https://codepen.io/airen/full/xxaxevy

需要注意的是，上面这种现象同样存在于 CSS Grid 布局中。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/356474e26b194bd98f3dae2c41587813~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/qBMBGbv

如上图所示，当 Flexbox  容器或 Grid 容器的包含块（父元素）未显式定义 `display` 属性的值，Flexbox 容器和 Grid 容器在不同上下文格式之下有着不同的渲染（渲染盒子）： 

- 设置为 `flex` 格式，它的宽度和父容器等宽，即 `width` 为 `100%`，也称**块 Flexbox 容器**； 
- 设置为 `inline-flex` 格式，它的宽度是由其子元素（后代元素）的内容来决定，相当于 `width` 为 `auto`，也称**内联 Flexbox 容器**； 
- 设置为 `grid` 格式，它的宽度和父容器等宽，即 `width` 为 `100%` ， 也称**块 Grid 容器**；
- 设置为 `inline-grid` 格式，它的宽度将由其具有最大宽度（`max-content`）的子元素（网格项目）来决定，也称**内联 Grid 容器**。

不过，CSS Grid 中的 `grid` 、`inline-grid` 和 CSS Flexbox 中的 `flex` 、`inline-flex` 有着明显的区别： 

- Flexbox 布局中，不管是 `flex` 还是 `inline-flex`，默认情况下，都会让所有 Flex 项目排在主轴上（一行或一列）； 
- Grid 布局中，不管是 `grid` 还是 `inline-grid`，默认情况下，都不会改变 Grid 项目的排列方式，将按照 HTML 结构中的源顺序排列，除非你在声明网格容器的时候，显式使用 `grid-template-*`（比如，`grid-template-columns`、`grid-template-rows` 或 `grid-template-areas`）改变其排列方式。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/781e489da1744aea9d50498e6305bd5c~tplv-k3u1fbpfcp-zoom-1.image)

> 有关于这方面更详细的介绍，或者你想获得更多关于 CSS Flexbox 和 Grid 布局方面的知识，建议你移步阅读《[现代 Web 布局](https://s.juejin.cn/ds/BVngy56/)》。

## 小结

虽然在 Web 开发中，并没有明确的条文或规则要求我们根据 UI 呈现形式来选择合适的视觉盒模型。但在 CSS 中，视觉盒模型直接决定了 HTML 元素会生成一个什么类型的盒子，并且 CSS 视觉盒模型会直接影响 Web 布局。

正如文章中所示，如果你在开发的过程中，没有根据 UI 呈现形式选择合适的视觉盒模型，会让你的 CSS 代码变得更冗余，从而增加了编写和维护 CSS 代码的成本。

在此，强烈建议大家在还原 UI 界面时，首先根据 UI 界面中的对象选择更为合理（具有语义化）的 HTML 标签元素；同时也应该根据 UI 界面呈现形式选择合理的视觉盒模型，即给元素的 `display` 属性设置合适的值。**在正确的地方选择正确方法，才能实现正确的效果**。