CSS Flexbox 和 Grid 布局技术已经成为现代 Web 布局的主流技术之一。它们的强大特性给 Web 开发者带来很多的便利，也能更好地让 Web 开发者以最少的代码量实现带有各种创意性的 Web 布局。

不过，Web 开发者在使用 CSS Flexbox 或 CSS Grid 来实现 Web 布局时总是会碰到一些问题，比如因为空间不足，不会自动换行。其实类似这样的问题，在我们编写代码的时候就可以完美规避掉。

在这节课中，我们就主要探讨下如何更好地处理 Flexbox 和 Grid 布局中的换行，避免因不换行而打破 Web 布局。

## Flexbox 布局中的换行

CSS Flexbox 已然成为当前最受欢迎的布局技术之一。只需要在容器元素上显式设置 `display` 属性的值为 `flex` 或 `inline-flex` ，其子元素（包括其伪元素 `::before` 和 `::after` 以及匿名元素）会自动沿着 Flex 容器的主轴方向排成一行（或列）。但总是有一些因素会造成 Flex 容器无法容纳所有的 Flex 项目，比如：

- Web 内容的变多：原本设计稿模板提供的内容（Flex 项目）是三个，但服务端实际输出的内容可能比三个多；
- 终端设备视窗变小：Web 页面会在不同的终端设备上呈现，当终端设备的浏览器视窗宽度变窄时，也会造成 Flex 容器没有足够的空间来容纳所有 Flex 项目。

此时，它将会直接打破 Web 布局：**内容（Flex 项目）溢出容器（Flex 容器）或容器（Flex 容器）出现水平滚动条**。如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db80d9d0d58c4a8aa8e7ed5043de167b~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/oNPNrrp

在使用 CSS Flexbox 构建 Web 布局时，一旦将容器声明为 Flex 容器之后，其所有 Flex 项目就会排列成一行（或列），即使 Flex 容器没有足够空间容纳所有 Flex 项目时，Flex 项目也不会自动换行。

所以说，这种行为是一种预知的行为，并不能说是渲染问题，只不过它和我们预期或者说与设计师期望的效果不同。要解决这个问题，很简单，**只需要在 Flexbox 容器上显式设置** **`flex-wrap`** **的值为** **`wrap`** **或** **`wrap-reverse`（其默认值为** **`nowrap`）** ：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c769297b16924cc89a17ba0becc2fd81~tplv-k3u1fbpfcp-zoom-1.image)

```CSS
.card__content { 
    display: flex;
    flex-wrap: wrap;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/279886278b8c462fb7f7764206ca1fb2~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/poOvddB

因此，**在使用 CSS Flexbox 构建布局时，应该尽量在 Flexbox 容器上设置** **`flex-wrap:wrap`** **来避免意外布局的行为** 。这样编写的 CSS 或者构建的 Web 布局具有一定的防御性：

```CSS
/* 不具防御性的 CSS */
.flex-container {
    display: flex; /* 或 inline-flex */
}

/* 具有防御性的 CSS */
.flex-container {
    display: flex; /* 或 inline-flex */
    flex-wrap: wrap;
}
```

有一点需要注意是，**`flex-wrap: wrap`** **(或** **`flex-wrap: wrap-reverse`)只有在 Flex 容器没有足够空间容纳 Flex 项目时（即，同一 Flex 行所有 Flex 项目最小内容宽度总和大于 Flex 容器宽度），才会让 Flex 项目换行（或列）** 。

虽然在 Flexbox 容器中显式设置 `flex-wrap: wrap` 可以预防布局溢出，但并不代表着在所有 Flexbox 容器上都设置，我们应该在具体使用的过程中有一个心理预判。比如下面这个是使用了 `flex-wrap: wrap` 的效果：

```HTML
<div class="card">
    <img src="https://picsum.photos/400/300?random=1" alt="">
    <div class="content">
        <h4>防御式 CSS</h4>
        <p>如何编写防御式 CSS，使你的代码变得更健壮！</p>
    </div>
    <button>阅读全文</button>
</div>
.card {
    display: flex;
    flex-wrap: wrap;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bcb3fac0498a46f0b66827ab5a57c09e~tplv-k3u1fbpfcp-zoom-1.image)

事实上，更好的效果应该是下面这种：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3e3c42b706d49f8b69d1a1a0cee9145~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/vYzEWQp

关键的 CSS 代码如下：

```CSS
.card {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.card img {
    flex-shrink: 0; /* 防止图片因容器空间不足被挤压 */
}

.card .content {
    flex: 1 1 0%; /* 自动匹配 Flex 容器的剩余空间 */
    min-width: 0;
}

.card h4 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.card p {
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:2; 
    -webkit-box-orient:vertical;
}

.card button {
    margin-block: auto; /* 垂直居中 */
    margin-inline-start: auto; /* 居右对齐 */
}
```

## Grid 布局中的换行

现在我们知道了，CSS Flexbox 布局时，在 Flexbox 容器上设置 `flex-wrap:wrap` 可以实现换行，让 Web 布局具有相应的防御性能力。不过，它存在一定的缺陷。就拿卡片列并排布局为例，**当卡片（Flex 项目）显式设置了** **`flex: 1 1 0%`** **，并且卡片数量不是列数的倍数时，最后一排卡片宽度会自动扩展：**

```CSS
.cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.card {
    flex: 1 1 0%;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7a858ab212943babe0a97a5a6c357d4~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/RwYNyRB

正如上面效果所示，它并没有打破 Web 布局，但和设计师所期望的效果还是有一定差异的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/43ddba7f6e124a7e9af3c6e0897d06b6~tplv-k3u1fbpfcp-zoom-1.image)

当然，要在 CSS Flexbox 布局中规避这种现象也不是不可以，比如 @张鑫旭 老师的《[让CSS flex 布局最后一行列表左对齐的 N 种方法](https://www.zhangxinxu.com/wordpress/2019/08/css-flex-last-align/)》一文中就介绍了多种解决方案。只是相比于 CSS Grid 布局中的 RAM 布局方案要显得略差一点。

> **RAM 布局技术指的是在定义网格时，使用了** **`repeat()`** **和** **`minmax()`** **函数，并且在** **`repeat()`** **函数中使用** **`auto-fit`** **或** **`auto-fill`** **关键词来指定网格轨道数量** 。

RAM 布局技术对于[上面示例](https://codepen.io/airen/full/RwYNyRB)布局场景（称之为换行）具有天然的优势，而且它的使用也非常简单：

```CSS
.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c61d2ada4de44bcb8f6082f753c6977c~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/rNZavqz

这里有几个关键的技术点简单向大家介绍一下。首先是用于定义网格轨道的 `repeat()` 和 `minmax()` 函数。当你发现网格轨道的尺寸相同时，就可以使用 `repeat()` 函数来定义，比如：

```CSS
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    
    /* 等同于 */
    grid-template-columns: repeat(3, 1fr);
}
```

`minmax()` 可以给网格轨道尺寸指定一个 `MIN ~ MAX` 之间的区间值，比如：

```CSS
.grid {
    grid-template-columns: repeat(3, minmax(300px, 1fr));
}
```

注意，`fr` 是一个 CSS 单位，只可以用于 CSS Grid 中，将 `fr` 单位值和 `minmax()` 函数结合在一起定义网格轨道尺寸时是自动的 ，即**网格轨道尺寸是自动匹配的（在一个范围内）** 。

> 有关于 `fr` 更详细的介绍，可以移步阅读《[Grid 布局中的计算](https://juejin.cn/book/7161370789680250917/section/7161624007702216735)》一文。

前面提到了，RAM 布局技术有一个关键点，那就是要在 `repeat()` 函数中使用 `auto-fill` 或 `auto-fit` 关键词来替代具体的数值。它们会告诉浏览器处理网格轨道的大小和断行（或断列），以便当容器空间不足以容纳元素时，元素会自动换行（或列）而不会造成溢出。

不过， `auto-fill` 和 `auto-fit` 两者之间还是有一些细微差异的：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72fe9afbbf444b52ab513c48f5cc1ee1~tplv-k3u1fbpfcp-zoom-1.image)

- `auto-fill` ：当使用 `minmax()` 函数时，`auto-fill` 在不改变网格项目宽度的情况下保留可用空间；
- `auto-fit` ：当使用 `minmax()` 函数时，`auto-fit` 关键词将扩展网格项目来填充可用空间。

简单地说，**`auto-fit`** **将扩展网格项目以填补可用空间，而** **`auto-fill`** **不会扩展网格项目。相反，`auto-fill`将保留可用的空间，而不改变网格项目的宽度** 。

所以说，如果 `auto-fit` 和 `auto-fill` 使用不当，就有可能导致意想不到的结果。比如，在实际使用过程中，网格容器中有多个和仅有一个网格项目时，使用 `auto-fill` 与 `auto-fit` 的差异如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2626c877e984960b2862079796cfa88~tplv-k3u1fbpfcp-zoom-1.image)

我想你也已经感受到了该场景使用 RAM 技术优势所在。但它也有一定的缺陷，当浏览器视窗的宽度小于 `minmax(MIN, MAX)` 中的 `MIN` 值时，浏览器就会出现水平滚动条或溢出内容被裁剪：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1dd5c9f130541e7a476d17232551744~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/rNZavqz

如果你不想让卡片溢出容器或容器出现水平滚动条，只需要在 `minmax(MIN, MAX)` 函数中嵌套 CSS 的比较函数（`min()` 、`max()` 、`clamp()`），可以让该布局更为完美。比如，你可以在 `minmax(MIN, MAX)` 函数中嵌套一个 `min()` 函数：

```CSS
.grid {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e41a4edcdc1d4d92b6c4a3914e3fb002~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/OJoPEqm

如此一来，效果就比较完美了。如果你想更深入的了解这方面的知识，强烈建议你阅读《[可用于 Grid 布局中的函数](https://juejin.cn/book/7161370789680250917/section/7161624041885958151)》一文！

## 小结

文章中我们分别介绍了 CSS Flexbox 和 CSS Grid 布局中换行的技术方案。使用 Flexbox 布局时，请不要忘记在 Flex 容器中显式设置 `flex-wrap: wrap` ，这样做的好处是，你的布局不会因为动态内容输出（多输出）和视窗宽度变小，而打破布局的美感。

如果你使用 Grid 布局时，可以采用 RAM 布局技术来实现自动换行。只不过，Grid 的 RAM 自动换行更适用于多列相等的业务场景（等宽布局），如果不是等宽布局，则建议使用 CSS Flexbox 布局。