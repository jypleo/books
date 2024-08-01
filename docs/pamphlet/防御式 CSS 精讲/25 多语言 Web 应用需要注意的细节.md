在一个越来越连通的世界中，多语言 Web 应用或网站越来越普遍。它可以使你的应用或产品国际化，而国际化没有一个单一的规范定义，但 W3C 提供了以下指导：

> Internationalisation is the design and development of a product, application or document that enables easy localisation for target audiences that vary in culture, region, or language.

大致意思是说“**国际化是设计和开发一个产品、应用或文档，以便为在文化、地区或语言上各异的目标受众轻松本地化**”。

但在开发它们时，将要涉及到比你想象的更多的事情。在这个过程中，大部分 Web 开发者都认为 CSS 与开发一个多语言 Web 应用或网站是没有任何关系。事实上呢？多语言 Web 应用或网站不仅仅是将你的 Web 应用或网站上的内容翻译成多种语言就结束。多语言 Web 应用或网站在呈现内容方面有各种微妙之处，这会影响到一个母语使用者在你的应用上的体验。

这是需要覆盖许多内容，包括 Unicode 和字符编码的使用，提供翻译内容的技术实现，以及该内容的呈现方式。今天，我只会和大家一起探讨多语言 Web 应用或网站开发中与 CSS 相关方面的细节与注意事项。

CSS 用于描述 Web 页面的呈现方式，通过告诉浏览器页面上的元素应该如何进行样式和布局。我们可以使用几种方法来使用 CSS 在多语言页面上应用不同样式。比如，CSS Flexbox 和 Grid 布局都是基于文档书写模式设计，天然地能实现 LTR 和 RTL 的翻转设计。

构建一个多语言的 Web 布局，它所涉及的不仅是 LTR 和 RTL 的翻转设计，其中还会涉及很多布局、排版、设计等相关知识。这节课，主要和大家一起探讨 Web 布局中 LTR 切换到 RTL 常见的错误以及一些设计上需要注意的细节，希望能帮助大家从设计阶段就构建好一个多语言的 Web 网站或应用。

## 字间距 letter-spacing

在 CSS 中，我们可以通过 `letter-spacing` 属性来给英文字母间增加间距（它也被称为**活版印刷跟踪** ）。比如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/21fa24e608ac4b9ca7f65acc58eaa164~tplv-k3u1fbpfcp-zoom-1.image)

上图中的第二行使用了 `letter-spacing` 给字母间增加了间距，它看起来是正常的。但是，如果将相同的 `letter-spacing` 样式添加到阿拉伯语系的内容中，效果看起来就会非常的奇怪。比如下面这个示例：

```CSS
[dir="ltr"] .media {
    letter-spacing: 4px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dba4c8bdab2e4f778980e45530a6fd29~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/NWLQNmR

正如上图所示，设置 `letter-spacing` 的阿拉伯语中，每个单词的字母看起来彼此不相连，这是不正确的。阿拉伯字母看起来应该是连在一起的（像上图中 `letter-spacing: normal` 的那样），而英文（拉丁语体系）中使用 `letter-spacing` 增加字母之间间距，对于阅读体验来说是更佳的。

```CSS
[dir="ltr"] {
    letter-spacing: 1px;
}

[dir="rtl"] {
    letter-spacing: 0;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/911a0de98c4e4ce98c6ff063cffb2fc8~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/gOdVrJb

因此，**在阿拉伯语中（RTL）中应该确保** **`letter-spacing`** **的值为** **`0`** 。

## 文本的透明度

在 Web 开发中，给文本增加一定的透明度是很常见的一种行为。这在拉丁语体系（比如英语）和汉语体系（比如中文）都是可行的。然而，当内容是阿拉伯语体系（比如阿拉伯文）时，渲染出来的文本会给人一种怪怪的感觉：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27b99f16b16b4412b8bface8bd623b83~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/RwYXazb

你会发现字母之间有一些不同颜色的区域。看上去是有层叠区域造成的颜色不一致：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d7ea60115a644a198ad4aba325d93e4~tplv-k3u1fbpfcp-zoom-1.image)

在这个例子中，字母间距没有调整，所以这个问题与字母间距无关。解决方案很简单，**设置不带透明度的颜色值，也不给文本设置透明度** 。

## 不同语言之间字（词）大小差异

不同语言中的字大小是有一定差异的。比如说英文翻译成阿拉伯文后，有些单词就会变大或变小，因此元素的大小也会发生变化（内容容器）。比如：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec18b3e5da474f91ac52c4a2faf9fd6f~tplv-k3u1fbpfcp-zoom-1.image)

正如上图所示，当英文网站翻译成阿拉伯语时，由于翻译后一些单词变大或变小，元素的大小也会发生变化。比如说：

- `div.menu_login_container` 容器（登录表单）在英文版本时，它的宽度大约是 `393px` ，阿拉伯语版本时，它的宽度因词变宽，它的宽度也变大了，大约是 `441px`； 
- `input` （登录按钮）在英文版本时，它的宽度大约是 `36.47px` ，在阿拉伯语版本中大约是 `84.66px`。 

事实上，这种差异不只存在于拉丁语体系与阿拉伯语体系之间，它们也同样存在于汉语体系中。有些单词在不同语系中宽度有些相同，有些更大，也有一些更小：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cccb003d8e8245beb21de5869232535f~tplv-k3u1fbpfcp-zoom-1.image)

在这种语言不同，内容长度（大小）不同的情况下，要是在容器上显式设置宽度，就会造成内容被溢出，或断行；如果容器被设置了 `overflow: hidden`，还会造成内容被裁剪等现象。来看一个真实案例，比如 [Facebook 的登录页中的“新建帐户”按钮](https://zh-cn.facebook.com/)：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d744918157de4a2ea983734f543c5771~tplv-k3u1fbpfcp-zoom-1.image)

不管是给按钮设置宽度为 `104px` 或 `219px` 都不是最佳的。

- 如果设置最小值 `104px` ，其他语言版本就会内容溢出。
- 如果设置最大值 `219px` ，其他语言版本就有可能会有很大的空白空间。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/864e041d01084c6c8d1323e7e9d64b80~tplv-k3u1fbpfcp-zoom-1.image)

针对这样的场景，更好的做法是，使用 CSS 的内在尺寸来定义元素容器的大小，比如可以将按钮设置的宽度为 `auto` 、`min-content` 或 `max-content` ，这样使不同版本语言下都有一个较好的宽度：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2200515938b245d4b891f118279a8230~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/yLxmOmz

面对多语言的 Web 布局时，给元素设置尺寸大小，使用 `auto` 、`min-content` 和 `max-content` 要比具体尺寸更为合适。但有的场景也会让你的 UI 看上去不太完美。就拿下图为例：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/70abd421dd564759a4b7ffece9363584~tplv-k3u1fbpfcp-zoom-1.image)

英文版本“Done”按钮，在英文版本下，它视觉上，甚至可点击区域都是符合 Web 设计的，但它一到阿拉伯语言版本中，“Done”被翻译成“إنجاز”，不管是 UI 视觉还是按钮可点击区域都变小了，有可能它不符合 Web 设计需求，比如按钮可点击区域要求是 `44px x 44px` 。

因此，除了给按钮设置宽度为 `auto` 或 `min-content` 或 `max-content` 时，最好也同时给按钮设置一个 `min-width` 值，比如上图中的 “Done”按钮：

```CSS
.button {
    width: auto; /* 或 min-content */
    
    /* 或者 */
    inline-size: auto; /* 或 min-content */
    
    /* 最好加上 min-width 或 min-inline-size */
    min-width: 100px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42c5008f788742a49d05fa3b0239ebad~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/qBMeZeL

## 文本截取

在 CSS 中需要对文本进行截取，并且在被截取的末尾添加相应的省略指示器，一般会使用 `text-overflow: ellipsis` 来实现：

```CSS
.text-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
}
```

或者：

```CSS
.line-clamp {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0a2ca6262084e00932341380accceaa~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/jOvgrNm

上面的效果应该是符合我们预期的。如果不慎在拉丁语体系和汉语体系中设置了 `dir="rtl"` 时，效果和我们阅读习惯就不同了，甚至是一种错误的表现行为：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0001ed69cde549a3984da2f9ddbc3c5d~tplv-k3u1fbpfcp-zoom-1.image)

正如上图所示，英文和中文文本的截断不正确。它应该在元素的末尾，而不是开头。要解决这个问题，`dir` 需要根据语言的正确阅读方式来设置正确的值。如果你不清楚语言的阅读方式或者无法预判用户会将应用切换到何种语言的话，建议将 `dir` 的值设置为 `auto`。这样一来，浏览器会自动根据语言的阅读方式来处理文本截取的效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47dffa970bf84b01991e2a90893801eb~tplv-k3u1fbpfcp-zoom-1.image)

当然，这种情况一般会发生在混合排版中，比如：

```HTML
<!-- 阿拉伯语为主，里面混合汉语或拉丁语 -->
<html lang="ar" dir="rtl">
    <body>
        <p dir="auto">Web إلى اليمين واليسار، CSS العائمة، Flexbox و GRID، تتأثر بنماذج الكتابة والقراءة.Web إلى اليمين واليسار، CSS العائمة، Flexbox و GRID، تتأثر بنماذج الكتابة والقراءة.</p>
        <p dir="auto">Web and left to right, CSS floating layout, Flexbox layout and Grid layout, influenced by book template and reading mode.</p>
    </body>
</html>

<!-- 汉语或拉丁语中为主，里面混合阿拉伯语 -->
<html lang="ar" dir="ltr">
    <body>
        <p dir="auto">Web إلى اليمين واليسار، CSS العائمة، Flexbox و GRID، تتأثر بنماذج الكتابة والقراءة.Web إلى اليمين واليسار، CSS العائمة، Flexbox و GRID، تتأثر بنماذج الكتابة والقراءة.</p>
        <p dir="auto">Web and left to right, CSS floating layout, Flexbox layout and Grid layout, influenced by book template and reading mode.</p>
    </body>
</html>
```

## 给 RTL 选择一个糟糕的字体

对于大部分 Web 开发者，在开发多语言 Web 网站或应用时，很少会根据语言版本来选择不同的字体，为了避免麻烦，习惯性地选择系统默认字体。但事实上，这并不是一种较好的选择，尤其是 RTL 版本的设计，还是需要精心选择对应的字体，这样才能确保它具有良好的可读性。就拿 “Twitter” 这个词为例：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a15e17b25d849ffa5900d2bcfd83293~tplv-k3u1fbpfcp-zoom-1.image)

英文版本和阿拉伯语版本选择同一字体，但对于使用阿拉伯语的用户而言，“تغريد”这个词很难，原因如下:

- 字体不好；
- 加粗影响了可读性；
- 这个单词的点很小，非常接近字母。

针对这种情形，应该为阿拉伯语（LTR 版本）选择一个更为适合的字体。比如：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b04c915efb8d47efb0479689d624befa~tplv-k3u1fbpfcp-zoom-1.image)

不完美的方法是**为每个方向使用特定的字体**。我们可以采用的第一种方法是依赖于给定元素（通常是 `<html>` 元素，因此会在全局上设置方向）上的方向（`dir`）属性：

```CSS
/* LTR */
[dir=ltr] body {
    font-family: "Roboto", sans-serif;
}

/* RTL */
[dir=rtl] body {
    font-family: "Amiri", sans-serif;
}
```

另外一种做法是选择使用 [Web 安全字体（Web Safe Fonts）](https://www.tderflinger.com/en/best-multilingual-web-fonts)，即**使用一种支持两种语言的单一字体**：

```CSS
/* LTR & RTL */
body {
    font-family: Arial, Roboto,"Noto Sans"，"Arial Unicode MS",Monospace,Cursive,serif,sans-serif;
}
```

然而，从我的个人经验来看，两种语言只使用一个字体会限制创造力和使用不同字体的自由。根据 [MDN 的说法](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family)：

> Font selection does not simply stop at the first font in the list that is on the user’s system. Rather, font selection is done one character at a time, so that if an available font does not have a glyph for a needed character, the latter fonts are tried.

大致意思是说：“字体选择不仅仅停留在用户系统上的第一个字体，而是逐个字符进行选择，因此如果一个可用的字体没有所需字符的字形，则会尝试后面的字体”。

也就是说，我们仍然可以使用 `font-family` 属性，但在第一个字体没有字符的字形时，使用该属性的回退选项。这实际上解决了上面提到的两个问题，一举两得！

```CSS
body {
    font-family: 'Roboto', 'Amiri', 'Galada', sans-serif;
}
```

## 不宜设置相同的 line-height

如果需要更好的阅读体验，可能会为不同的语言（LTR 或 RTL）设置不同的布局。但是 LTR 和 RTL 排版设置相同的 `line-height` 的话，阅读体验就有可能达不到你预期的效果。比如给英文和阿拉伯文设置相同的 `line-height` ，在阿拉伯文中看上去行与行的间距要更小：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b2e5473f61542a889c4e008064eab00~tplv-k3u1fbpfcp-zoom-1.image)

如果想改变这样的现象，需要考虑为阿拉伯语的内容提供一个更适合的 `line-height`。比如：

```CSS
/* LTR: Left To Right */
[dir="ltr"] {
    line-height: 1.5;
}

/* RTL: Right To Left */
[dir="rtl"] {
    line-height: 1.8;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ea95287dd554e9a832130a4ce58e011~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/GRXVqjo

另外建议 `line-height` 不要使用固定单位的值，这样在一些语言的切换状态下很容易造成文本展示不全（类似被截）。比如下图的效果： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/131f6b4b63e14ea88232eb7bd945af3c~tplv-k3u1fbpfcp-zoom-1.image)

## 不采用默认的文本下划线

有些文本会带有默认下划线的效果，比如 `<a>` 链接。在阿拉伯语言的文本中，默认的文本下划线会让阅读变得很困难。这种现象的产生，与阿拉伯语单词和字母的书写方式有关。如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4ded0698fb13440db071c654fc2c4638~tplv-k3u1fbpfcp-zoom-1.image)

你会发现，文本下划线会和一些文本重叠，比如单词中的一些点：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4120e0a1e1a4789b41412e359f736bc~tplv-k3u1fbpfcp-zoom-1.image)

另外，采用默认的文本下划线，不同的浏览器渲染出的效果也会有所差异：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e75c0c24b9b4feb8d5568a85858d4e2~tplv-k3u1fbpfcp-zoom-1.image)

很明显，Chrome 和 Firefox 浏览器不会出现我们上面所说的现象（在这方面可能做了一定的优化），但是在 Safari 浏览器中，就出现了上面所描述的现象。另外可能在一些 UI 效果上趋向于风格的统一。所以在给文本加下划线的时候，更建议采用自定义的下划线风格。

在 CSS 中有很多种不同的方案来实现自定义下划线的效果，比如 `border-bottom`、`box-shadow`、`background-image`等，还可以给文本添加 SVG 的下划线。除此之外，[CSS Text Decoration Module Level 4](https://drafts.csswg.org/css-text-decor-4/) 提供的一系列 `text-decoration-*` 属性也可以实现一些个性化的下划线效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff418b87102242b295e8741e03258649~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/dyKrxYL

简单地说，可以使用 `text-decoration-*` 来设置下划线样式：

```CSS
a:hover { 
    text-decoration: underline;
    text-decoration-color: rgba(21, 132, 196, 0.2); 
    text-decoration-skip-ink: auto;
    text-decoration-style: wavy; 
    text-underline-offset: 4px; 
    text-decoration-thickness: 2px; 
    text-decoration: underline;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65db62f754d1450b9618a1615bdb6818~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/ZEMgOBR

## 断行需要独立处理 

如果使用断行处理相关样式，比如 `word-break`，那么在阿拉伯语的应用中需要进行单独的测试，因为它可能会破坏阿拉伯语单词。如下图所示： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6147f8d3a1b142bea1d9b7d6d432db7b~tplv-k3u1fbpfcp-zoom-1.image)

上图中圈出的部分是由于断句带来的影响。**在阿拉伯语中，没有断字这回事** 。一个单词的字母是相互联系的，所以不可能打破一个单词。

## 尽量避免给文本加粗和使用斜体文本 

在大多数 RTL 语言（比如阿拉伯语）的应用中，应该尽量避免使用粗体（`font-weight`）和斜体（`font-style: italic`）。因为大多数 RTL 语言中，粗体文本会让应用的可读性变得更为困难，而斜体几乎是不被使用。同样的，在 RTL 语言中，几乎会忽略大写字母。 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05303ed00ec940d3b118f3dee448cfac~tplv-k3u1fbpfcp-zoom-1.image)

## 用于国际化的 CSS 

如果你认为 CSS 与开发一个多语言 Web 应用或网站（国际化）没有任何关系的话，那么将是大错特错的。因为开发一个多语言 Web 应用或网站是离不开可用于国际化相关的 CSS 特性，比如 CSS 的书写模式（`writing-mode`）、阅读方向（`direction`）和 CSS 逻辑属性等。

接下来简单地了解一下，可用于国际化的 CSS有哪些。

### 与语言相关的样式

不知道你平时有没有直接使用 Google 翻译来翻译 Web 页面的内容，如果有的话，你对下图不会感到陌生：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ffc8b614462140289134c1818ce6b392~tplv-k3u1fbpfcp-zoom-1.image)

 这是因为在 `<html>` 元素上有 `lang` 属性。

`lang` 属性是一个非常重要的属性，因为它用于识别 Web 上的文本内容的语言，这一信息在许多地方都有使用。如上述的 Chrome 内置翻译，针对特定语言内容的搜索引擎以及屏幕阅读器。

与语言相关的样式，关键在于在页面标记中适当使用 `lang` 属性。

> `lang` 属性使用了一个名为 [BCP 47 的 IETF 规范](https://www.w3.org/International/questions/qa-html-language-declarations)，这个规范在很大程度上基于 [ISO 639](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)。

对于大多数情况，你会使用两个字母的代码，如中文的 `zh`，但中文（以及其他语言例如阿拉伯语）被认为是一个宏语言，它包括了许多具有更具体的主要语言子标签的语言。请参考《[HTML 和 XML 中的语言标签](https://www.w3.org/International/articles/language-tags/)》以获得深入的关于如何构建语言标签的解释。

总体指导是 `html` 元素必须始终设置 `lang` 属性，其他所有元素都会继承该属性。

```HTML
<html lang="zh">
</html>
```

在 Web 页面中还能看到不同语言混合在一起。在这种情况下，你可以用其他的 HTML 标签元素（比如 `div` 或 `span` ）将内容包裹起来，并将正确的 `lang` 属性应用到该包装元素上。例如：

```HTML
<html lang="en">
    <body>
        <p>The fourth animal in the Chinese Zodiac is Rabbit (<span lang="zh">兔子</span>).</p>
    </body>
</html>
```

### :lang() 伪类选择器

CSS 的 `:lang()` 伪类选择器并不为人所知。但它在多语言 Web 应用的开发中，这个伪类选择器非常棒，因为它识别内容的语言，即使语言被声明在元素之外。

比如，我们以往都是通过 CSS 的属性选择器给多语言 Web 应用设置不同的样式规则：

```CSS
[lang="en"] body {
    font-family: "Roboto", sans-serif;
}

[lang="ar"] body {
    font-family: "Amiri", sans-serif;
}
```

有了 `:lang()` 伪类选择器之后，可以像下面这样设置样式规则：

```CSS
body:lang(en) {
    font-family: "Roboto", sans-serif;
}

body:lang(ar) {
    font-family: "Amiri", sans-serif;
}
```

我们来看一个简单的示例：

```HTML
<p>We use <em>italics</em> to emphasise words in English, <span lang="zh">但是中文则是用<em>着重号</em></span>.</p>
```

```CSS
em:lang(zh) {
    font-style: normal;
    text-emphasis: dot;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f1393229bfec4708b72e298587f577ec~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/BaOXzxZ

如果你的浏览器支持 `text-emphasis` 属性，你应该能够看到在标签中的每个中文字符上添加了强调符号。但是问题在于，`lang` 属性并没有应用在元素（`<em>`）上，而是应用在它的父元素（`<span>`）上。但伪类仍然有效。如果我们使用更普遍的属性选择器，例如 `[lang=“zh”]`，这个属性必须应用在元素上才能生效。

### dir 属性和 :dir() 伪类选择器

`dir` 属性和 `lang` 属性类似，一般在 `<html>` 上显式设置 `dir` 属性，而且根据 `lang` 属性设置的语言来决定 `dir` 的值，比如：

```HTML
<html lang="zh" dir="ltr">
</html>

<html lang="en" dir="ltr">
</html>

<html lang="ar" dir="rtl">
</html>
```

同样的，如果是多语言混合排版时，`dir` 也可以在相应的标签元素上指定。例如：

```HTML
<html lang="ar" dir="rtl"> 
    <body>
        <p>الحيوان الرابع في البروج الصينية هو الأرنب (<span lang="zh" dir="ltr">兔子</span>).</p>
    </body>
</html>
```

`:dir()` 伪类选择器有点类似于 `:lang()` 伪类选择器。`:dir()` 主要用于匹配符合某个方向性的元素，例如 `:dir(ltr)` 和 `:dir(rtl)` ，其中：

- `ltr` 是 left to right 简写，表示从左向右，对应着元素的 `dir="ltr"`； 
- `rtl` 是 right to left 简写，表示从右向左，对应着元素的 `dir="rtl"`。

使用 `:dir()` 匹配元素和使用 `[dir="ltr"]` 或 `[dir="rtl"]` 在某种程度上是一样的效果，其区别是 `[dir=""]` 无法匹配到没有显式声明 `dir` 的元素，但 `:dir()` 却可以匹配到由浏览器计算得到或者继承来的 `dir` 属性的元素。

因此，如果我们有明确地对某个元素声明 `dir`，那么属性选择器 `[dir=""]` 就可以匹配到对应的元素，但如果我们只单纯地从父元素继承来而的 `dir`，就需要使用伪选择器 `:dir()`来匹配。

```CSS
[dir="ltr"] { 
    color: green; 
    border-color: green; 
} 

[dir="rtl"]{ 
    color: #f36; 
    border-color: #f36; 
} 

body :dir(ltr) { 
    color: orange; 
    border: 2px solid orange; 
} 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9eb418969aab45daa6c877f8f36cb9be~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/eYLqzLb

### CSS 书写模式和 CSS 逻辑属性

可以说，CSS 的书写模式 `writing-mode` 、阅读方向 `direction` 和 CSS 逻辑属性是构建多语言 Web 应用必不可少的 CSS 特性。

- **更好的代码可维护性** ：使用逻辑属性可以将不同语言环境下的布局和样式都包含在一个样式表中，无需使用多个样式表处理各种语言环境。这简化了网站的代码结构，使代码更易于维护。而在使用传统的物理属性时，可能需要为每种语言环境维护多个版本的样式表，这将增加代码的复杂性。
- **更加精确的布局和样式** ：使用逻辑属性，可以自动适应文本的书写方向并调整 Web 布局和 UI 样式，无需进行人工处理。这确保了界面的一致性，并可以避免因处理哪种语言而导致的布局问题。
- **更高的可读性** ：使用逻辑属性可以使代码更具可读性，因为代码中的属性名称可以更直接地反映元素在文本方向上的布局。而在使用传统的物理属性时，代码需要进行语言或书写方向的调整，这可能会导致代码的可读性变差。
- **更具可扩展性** ：逻辑属性适用于各种语言环境，无论是从左到右还是从右到左，都可以精确的控制 Web 布局。这为 Web 开发者提供了更广泛的可扩展性，因为他们可以使用相同的代码为不同的语言环境创建布局，并且也更容易添加新的语言支持。

总之，**使用 CSS 逻辑属性可以为多语言 Web 应用或网站开发带来更高的效率和可维护性，更加精确的布局和样式，更好的代码可读性和可扩展性** 。

> 有关于这部分更详细的介绍可以阅读《[使用逻辑属性替代物理属性](https://juejin.cn/book/7199571709102391328/section/7199846215167508492)》一节课。

### 其他可用于国际化的 CSS 

除了上面所述之外，还有一些可用于国际化的 CSS ，例如：

- 字体（`font-family`）：尽量使用支持所有语言字符集的字体（Web 安全字体），如 Arial Unicode MS、Noto Sans等。
- 文字排版：为了支持从右到左的语言，如阿拉伯语、波斯语等，应使用 `direction` 属性。
- 文字大小：不同语言使用不同字符集，因此字符显示的大小也不同。因此，应选择合适的字体大小，以确保在所有语言环境下都能正常显示。
- 行高：不同语言间字符间距不同，因此行间距应根据语言环境来调整，确保不同语言的文本在不同的终端上都可以清晰可读。
- 颜色：颜色对于正确显示中文、日文、俄文以及其他非拉丁字母语言等是十分关键的，应该根据不同语言的文字特征和国家文化，选择最合适的颜色排版。
- 布局：由于不同语言的阅读方向和书写方向不同，Web 应用或网站的布局也会有所不同。因此，布局应根据需要调整，使用户能够更轻松地阅读。
- 特殊符号和标点：不同语言的标点符号和特殊符号也不一样，应根据语言环境选择合适的标点符号或特殊符号。

总的来说，CSS 的应用对于国际化很重要。CSS 的设计应该能够支持不同语言文本特性，例如不同字符集、字体大小、行高和阅读方向。这样才能更好满足不同文化背景和语言环境下用户的需要。

## 双向语言的最佳用户体验 

这里所谓的双向语言指的是 LTR 和 RTL 的输入顺序（语言）和文本显示布局的能力。前面我们花了一些时间和大家聊了聊双向语言在 Web 网站或应用中的差异，以及开发者切入到 RTL 中会碰到的一些问题。

事实上除了开发者，对于设计师以及用户体验，双向语言都会有很多细节需要我们注意，或者说有很多问题需要我们一起面对。如果仅从 UI 布局上来看，**双向语言（LTR 和 RTL）的 UI 布局是一种镜向的布局效果**。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/132ca35afabe43c39606311ddaa1cc52~tplv-k3u1fbpfcp-zoom-1.image)

表面看上去是一种反向的切换，但事实上，这里面有很多细节是需要我们注意或者单独处理的。接下来，我们来看看需要注意的一些细节（主要围绕着 UX 来展开）。

### 图标 

在现代 Web 中开发中，图标的应用非常广泛，正所谓“一图胜过千言万言”，对于图标（Icon 图标）的使用也是如此，很多时候，图标能很明确地告诉用户所代表的含义，比起文本的描述要更具效果。但在 RTL 开发中，图标的使用要比 LTR 复杂得多，也麻烦得多。 

> 在 RTL 语言中，有些具有较强的宗教信仰，民俗民风也较强，因此图标的使用也需要特别注意，因为一不小心就可能会冒犯到你的用户。

这是很复杂的事情，我们先抛开这个体系，只聊聊技术上实现的差异。 

Web 中的图标有些是没有方向性的，有些是带有方向性。比如下图所示的图标，图标中心线左右两侧是对称的，可以说是没有任何方向性：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12ab1306daf647ce99aad0dfa7892425~tplv-k3u1fbpfcp-zoom-1.image)

像上述这种对称性的图标，用在双向语言中，你不需要对这些图标做任何的处理（比如翻转）。

在双向语言系统中，有些图标是具有方向性的。也就是说，在 LTR 和 RTL 中要改变它们的方向，而且这一点对于用户来说是非常重要的，可以更清楚地理解图标的含义。比如：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/004b6218ab8d4872ba7360f85dc8ec7a~tplv-k3u1fbpfcp-zoom-1.image)

对于需要镜像的图标，仅仅使用 `dir` (或 `direction` )无法达到所要的效果：

```HTML
<!-- LTR: Left To Right -->
<div class="icons" dir="ltr">
    <svg></svg>
</div>

<!-- RTL: Right To Left -->
<div class="icons" dir="rtl">
    <svg></svg>
</div>
```

```CSS
[dir="rtl"] {
    direction: rtl;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f992a6d40f314ae6ae157237ed88d558~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/zYJgBXV

你可能已经发现了，`dir` 和 `direction` 只是对图片的排列顺序做了调整， RTL 版本中的图标没有水平翻转。要让 RTL 版本下的图片真的符合需求，需要对它们做一些额外的处理。

在 CSS 中，可以使用 `transform` 的 `scaleX(-1)` 让 RTL 版本下的图标做水平翻转：

```CSS
[dir="rtl"] svg {
    transform: scaleX(-1);
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03d0df7acdb04fe6baa96042b22a744e~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址： https://codepen.io/airen/full/VwGojOj

也就是说，我们在 LTR 和 RTL 版本中使用图标时，应该尽可能像下图这样来使用：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/40b3fa43b5f24ff38c82e84d4da4cda2~tplv-k3u1fbpfcp-zoom-1.image)

然而，总是有例外的。根据 [Material Design 指南](https://m2.material.io/design/usability/bidirectionality.html)，如果一个图标代表一个可以用右手拿着的对象，那么它不需要翻转。例如，搜索图标的手柄通常位于右下角，因为大多数用户都是右撇子。在使用 RTL 语言的国家，大多数用户也是右撇子，所以这样的图标不应该被镜像。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9561ac2e092d4482b2268f3bf77029aa~tplv-k3u1fbpfcp-zoom-1.image)

还有一些图标是通用的，也不需要翻转它们。例如，播放器上的一些图标，它代表的是磁带播放的方向，而不是时间方向，所以不必要对它们做翻转。下图是 Spotify 应用程序的英语和阿拉伯语版本:

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a6e9bcf7d2d4338bb59290a07a85a2c~tplv-k3u1fbpfcp-zoom-1.image)

所以说，在 LTR 和 RTL 下使用图标时，需要根据实际环境做出最合适的选择。

### 带图标的按钮和表单控件 

通常有些按钮会带上相应的 Icon 图标。在这种情况下，在 RTL 布局中，图标的位置也需要进行翻转： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a95cb343cd24c57aa3704a8c7f8b163~tplv-k3u1fbpfcp-zoom-1.image)

对于表单控件也是如此，特别是对于输入型的 `input` 表单控件，还应该保持输入的方向性：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ffb724f82dd74451a7a85e8caeead621~tplv-k3u1fbpfcp-zoom-1.image)

在 RTL 中，有些表单输入应该保持左对齐，例如电子邮件和手机号码。值得注意的是，如果占位符内容是阿拉伯语或其他 RTL 语言，那么占位符应该向右对齐。一旦输入框获得焦点，用户开始输入，对齐方式将翻转到左侧。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6937e01c332e47d99c58ea6c16e41dae~tplv-k3u1fbpfcp-zoom-1.image)

在多语言 Web 中，Icon 图标的使用还需要注意以下几个问题：

- **意义的转化** ：不同语言和文化对于图标的意义会有不同的解读，如“红圆点”在中国文化中表示“未读消息” ，而在日本文化中表示“已读”。因此，在选择 Icon 图标时需要有全面考虑，以及在不同语言和文化间进行充分的测试。
- **语言需求** ：在多语言 Web 中，要为 Icon 图标准备对应语言版本。比如，在不同的语言和地区，对于图标和符号的解读和理解会有所不同，所以在选择 Icon 图标时，必须考虑到这一点，并将它们与对应语言相关联起来，以确保用户能够正确理解和使用。
- **适应性与一致性** ：Icon 图标的使用应适应多种分辨率屏幕、平台和设备，从而产生相同的用户体验，同时在整个应用程序中保持一致的图标风格和设计。
- **辅助文字描述** ：为确保盲人和视觉障碍者的可访问性，为 Icon 图标添加辅助文字描述很必要，保证其有语音提示或屏幕阅读器等工具能够读出对应信息。
- **充足的测试和反馈** ：在多语言 Web 中的 Icon 图标使用，需要充足的测试和反馈。测试需要考虑到多语言和文化的差异，以及在不同条件下的兼容性测试，反馈则需要常常与用户交流，了解用户对图标使用的反馈和意见，以便及时提升使用体验。

总的来说，在多语言 Web 中的 Icon 图标使用，需要考虑不同文化差异和语言需求，保证适应性和一致性，在图标上增加辅助文字描述，保持充足的测试和反馈。

### 导航菜单和面包屑 

对于导航菜单以及页头，还有面包屑等 UI 的设计在双向语言中是 UI 的镜像。 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2d499365abe4eb29a28eb9c979aa0ea~tplv-k3u1fbpfcp-zoom-1.image)

### 数字顺序 

在双向语言中，对于数字的顺序（比如电话号码、门牌号等），不需要做镜像的处理。但要是带有图标的话，对应的图标还是需要做镜像处理的。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57b7f92c0b4745e4b6a1421dc7f5a883~tplv-k3u1fbpfcp-zoom-1.image)

在多语言 Web 应用中，电话号码和邮箱地址是关键的联系方式，因此需要注意以下几个问题：

- **国际化** ：电话号码和邮箱地址需要根据不同地区和语言进行格式化。例如，在中国，电话号码格式为从左到右分别分成 `3` 段、`4` 位数字，而在美国则是 `3` 段、`3` 位数字。同样的，邮箱地址的域名也有不同的国别代码。
- **显示格式** ：为了避免电话号码和邮箱地址的长度和格式难以理解或混淆，应该为其提供恰当的格式化。针对电话号码，可以用区号和号码之间使用括号表示，也可以用 `±` 号表示为国际格式，针对邮箱地址，应该使用合适的通用格式。
- **语言的变化** ：当用户改变网站语言时，电话号码的格式也必须相应地进行变化。例如，从阿拉伯语改为英语，电话号码的书写方式将发生变化，需要在不同的语言环境下进行正确的格式化。
- **可访问性** ：为了使电话号码和邮箱地址易于发现和使用，在网页中，可以将它们放置在容易找到的位置上，并用链接等方式增加响应性，提高可访问性。同时，对于视觉障碍者可以使用 JavaScript、样式表和其他工具，以改进这些联系方式的可访问性并提供另外的可辨认性。
- **保护隐私** ：在使用电话号码和邮箱地址时，需要注意用户的个人隐私。一般应该对电子邮件地址和电话号码进行加密或脱敏处理，或通过输入数据时获取用户授权，再将这些联系方式提供给第三方使用。

总结来说，为了在多语言 Web 应用中正确使用电话号码和电子邮件地址，需要考虑到国际化、显示格式、语言的变化、可访问性和个人隐私保护的问题，以使用户更加便利和安全地使用联系方式。

### 组件的翻转

在处理一些组件时，我们需要一种快速翻转它们的方法。在 Sketch 应用中，我们将复制一个组件，然后用“flip” 命令翻转它。同样的功能也可以在 Adobe XD 和 Figma 中使用。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65b6d3ee95ab408fbd35a0ea2dab5248~tplv-k3u1fbpfcp-zoom-1.image)

而我们在 Web 中构建 Web 组件时，大部分通过 HTML 的 `dir` 或 CSS 的 `direction` 就可以实现水平翻转的效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7465cffae9c54895b5302a908409f63e~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/BaOXLBJ

构建翻转的 Web 组件，我们这里采用的基本上是 CSS Flexbox 和 CSS Grid 布局技术，只不过在设置与方向有关的属性，我们尽可能地使用了 CSS 的逻辑属性，比如：

```CSS
/* RTL 需要水平翻转的图标 */
[dir="rtl"] svg {
    transform: scaleX(-1);
}

figure {
    max-inline-size: 160px;
}

/* 自定义下划线，更符合 RTL 排版 */
header .active,
header a:hover {
    text-decoration: underline;
    text-decoration-color: #03a9f4;
    text-decoration-skip-ink: auto;
    text-decoration-style: wavy;
    text-underline-offset: 4px;
    text-decoration-thickness: 2px;
}

.tabs li.active::after {
    content: "";
    position: absolute;
    inset-inline-start: 0;
    inset-inline-end: 0;
    inset-block-end: 0;
    block-size: 5px;
}

.toasts svg:last-child {
    margin-inline-start: auto;
}
```

## 实际案例

先来看一个简单示例，看看 LTR 和 RTL 两个版本的 Web 布局要如何处理。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e0075f2704a431592860cbf18194130~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/ZEMgpzZ

构建 LTR 和 RTL 布局，它们在 HTML 结构上最大的差异在最外边的容器，比如示例中的 `.page` （往往单独的页面，可以设置在 `<html>` 和 `<body>`）显式设置了 `dir` 的值：

```HTML
<!-- LTR -->
<div class="page" dir="ltr">
    <header></header>
    <div class="sub__title"></div>
    <main></main>
</div>

<!-- RTL -->
<div class="page" dir="rtl">
    <header></header>
    <div class="sub__title"></div>
    <main></main>
</div>
```

这样做的好处就是，我们可以提前设置 LTR 和 RTL 语言的的内联流（文档流）和块流的方向。尤其是我们使用 CSS Flexbox 和 CSS Grid 布局时，可以很好地匹配 LTR 和 RTL，那是因为这两种布局技术都是基于书写模式设计的布局。

先来看页头 `header` 的布局，它主要包含了 `.logo` 、`.nav` 和 `.user--profile` 三个部分：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64cb4b96228f4d16b0540a36ae9fd43a~tplv-k3u1fbpfcp-zoom-1.image)

我们在 `header` 中使用 CSS Flexbox 布局，它可以自动适配 LTR 和 RTL 的布局：

```CSS
header {
    display: flex;
    align-items: center;
    gap: 1rem;
}
```

注意，在主轴（Main Axis）并没有使用 `justify-content` 来控制这三个部分的对齐，示例中在 `.user--profile` 使用了逻辑属性 `margin-inline-start` 来控制它：

- LTR 中居右；
- RTL 中居左。

```CSS
.user--profile {
    margin-inline-start: auto;
}
```

第二部分 `.sub__title` 和 `header` 采用的是相同的布局方式：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/159491eb685f4e4290527054d8aca331~tplv-k3u1fbpfcp-zoom-1.image)

```CSS
.sub__title {
    display: flex;
    align-items: center;
}

.sub__title form {
    margin-inline-start: auto;
}
```

对于主内容区域 `main` 中的卡片，我在这里使用了 CSS Grid 中的 RAM 布局技术，它也能很好匹配 LTR 和 RTL ：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3d66223d6bc4d54a017a7588baf5c26~tplv-k3u1fbpfcp-zoom-1.image)

```CSS
main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100% - 2rem, 460px), 1fr));
}
```

对于单张卡片，在这个示例中没有使用 CSS Grid 中的 `subgrid` 来构建布局，选择的还是 CSS Flexbox 来布局：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ac34f3dae0a4a8c8ed6ef0c7d08e091~tplv-k3u1fbpfcp-zoom-1.image)

```CSS
.media {
    display: flex;
    gap: 1rem;
}

.media__content {
    flex: 1 1 0%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
}
```

同样的，在卡片的按钮上使用逻辑属性，让按钮靠近底部放着：

```CSS
.media button {
    margin-inline-start: auto;
}
```

在我们这个示例中，很好地利用了 CSS Flexbox 和 CSS Grid 中的 `gap` 属性，来设置元素之间的间距：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a9c110b9cc5453196391829926f5db2~tplv-k3u1fbpfcp-zoom-1.image)

如果不使用 `gap` 属性，很有可能需要使用到 `margin` 对应的逻辑属性，比如：

```CSS
.logo {
    margin-inline-end: 1rem;
}

.user--profile span {
    margin-inline-start: 10px;
}

.sub__title dd span {
    maing-inline: 10px;
}
```

其实到这，LTR 和 RTL 布局基本上已经完成。不过，我还对示例中的图标做了些处理，比如：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4dde54acce341b0aa76b6652b180fbe~tplv-k3u1fbpfcp-zoom-1.image)

```CSS
[dir="rtl"] .sub__title a svg,
[dir="rtl"] .media button svg {
    transform: scaleX(-1);
}
```

这是一个关于 LTR 和 RTL 最基本的示例。你可能会说这是一个不真实的示例，那接下来，就以 [Facebook 的登录页](https://zh-cn.facebook.com/)为例：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/daebd62c2ca541ae8ef2d894202719a6~tplv-k3u1fbpfcp-zoom-1.image)

构建一个这样的登录页，你可能需要的 HTML 结构：

```HTML
<!-- LTR: 中文简体 -->
<html lang="zh-Hans" dir="ltr">
    <body>
        <div class="page__sloga">
            <h1 class="logo">
                <a href="https://zh-cn.facebook.com/">
                    <svg class="icon__logo"></svg>
                </a>
            </h1>
            <p class="sloga">联系你我，分享生活，尽在 Facebook</p>
        </div>
        <div class="form--wrapper">
            <form class="login">
                <div class="control">
                    <input type="text" placeholder="邮箱或手机号" name="user" />
                </div>
                <div class="control">
                    <input type="password" placeholder="密码" name="password" />
                </div>
                <div class="control">
                    <button class="button button--primary">登录</button>
                </div>
                <div class="control">
                    <a href="">忘记密码？</a>
                </div>
                <div class="control">
                    <button class="button button--secondary">新建帐户</button>
                </div>
            </form>
            <p class="help--message">
                为名人、品牌或公司<a href="">创建公共主页</a>。
            </p>
        </div>
    </body>
</html>
```

对于日文或英文版本来说，它们的 HTML 结构和中文版本是一样的，对应的内容换成了日文或英文。唯一的差别是 `<html>` 元素的 `lang` 值替换成 `ja` （日文）或 `en` （英文），而 `dir` 依旧是 `ltr` ，因为它们的书写模式和阅读模式也是 LTR ：

```HTML
<!-- LTR: 日文 -->
<html lang="jp" dir="ltr">
    <body>
        <div class="page__sloga">
            <h1 class="logo">
                <a href="https://zh-cn.facebook.com/">
                    <svg class="icon__logo"></svg>
                </a>
            </h1>
            <p class="sloga">Facebookを使うと、友達や同僚、同級生、仲間たちとつながりを深められます。ケータイ、スマートフォンからもアクセスできます。</p>
        </div>
        <div class="form--wrapper">
            <form class="login">
                <div class="control">
                    <input type="text" placeholder="メールアドレスまたは電話番号" name="user" />
                </div>
                <div class="control">
                    <input type="password" placeholder="パスワード" name="password" />
                </div>
                <div class="control">
                    <button class="button button--primary">ログイン</button>
                </div>
                <div class="control">
                    <a href="">パスワードを忘れた場合</a>
                </div>
                <div class="control">
                    <button class="button button--secondary">新しいアカウントを作成</button>
                </div>
            </form>
            <p class="help--message">
                有名人、ブランドまたはビジネスのために<a href="">Facebookページを作成</a>できます。
            </p>
        </div>
    </body>
</html>
```

对于阿拉伯语体系，比如阿拉伯语，它的 HTML 结构除了内容变了之外，`<html>` 元素的 `lang` 要求被设置为 `ar` ，还需要将 `dir` 的值设置为 `rtl` ，因为阿拉伯语的书写模式和阅读模式是 LRT ，刚好和拉丁语体系的英文、汉语体系的中文或日文相反，因为它们都是 LTR：

```HTML
<!-- RTL: 阿拉伯语 -->
<html lang="ar" dir="rtl">
    <body>
        <div class="page__sloga">
            <h1 class="logo">
                <a href="https://zh-cn.facebook.com/">
                    <svg class="icon__logo"></svg>
                </a>
            </h1>
            <p class="sloga">يمنحك فيسبوك إمكانية التواصل مع الأشخاص ومشاركة ما تريد معهم.</p>
        </div>
        <div class="form--wrapper">
            <form class="login">
                <div class="control">
                    <input type="text" placeholder="البريد الإلكتروني أو رقم الهاتف" name="user" />
                </div>
                <div class="control">
                    <input type="password" placeholder="كلمة السر" name="password" />
                </div>
                <div class="control">
                    <button class="button button--primary">تسجيل الدخول</button>
                </div>
                <div class="control">
                    <a href="">هل نسيت كلمة السر؟</a>
                </div>
                <div class="control">
                    <button class="button button--secondary">إنشاء حساب جديد</button>
                </div>
            </form>
            <p class="help--message">
                &rlm;<a href="">إنشاء صفحة</a>&rlm;لشخصية مشهورة أو علامة تجارية أو نشاط تجاري.
            </p>
        </div>
    </body>
</html>
```

基本样式，这里不做阐述。先看页面级的布局，在这里使用 CSS Grid 的 Full-Bleed 技术来构建整体的页面级布局：

```CSS
body {
  display: grid;
  place-content: start center;
  grid-template-columns: 
      minmax(1rem, 1fr) 
      minmax(min(100% - 2rem, 960px), 1fr) 
      minmax(1rem, 1fr);
}

body > * {
  grid-column: 2;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5473ba82ee0f4e05a831e16428bbbcce~tplv-k3u1fbpfcp-zoom-1.image)

对于页面的口号（Sloga）和登录表单两个部分自动换行，这里在它的容器 `section` 中使用 CSS Grid 的 RAM 布局技术，并限制了每个部分的最小宽度（`min-inline-size`）：

```CSS
section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100% - 2rem, 400px), 1fr));
    gap: 1rem;
}

section > * {
    max-inline-size: 400px;
}

@media only screen and (min-width: 514px) {
    section {
        justify-items: center;
    }

    .login {
        min-inline-size: 400px;
    }
}

@media only screen and (min-width: 760px) {
    .form--wrapper {
        justify-self: end;
    }

    .login {
        min-inline-size: 400px;
    }
}
```

对于组件级，都采用了 CSS Flexbox 来构建的布局：

```CSS
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.login input {
    display: flex;
    align-items: center;
    inline-size: 100%;
}

.login button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
.page__sloga {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

@media only screen and (min-width: 760px) {
    .page__sloga {
        align-items: flex-start;
        text-align: start;
        align-self: center;
    }
}
```

 这个时候，你将看到基本布局效果就出来了，而且能很好匹配 LTR 和 RTL 语言版本：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c4713f2a24b44f88539c0ec31e1994e~tplv-k3u1fbpfcp-zoom-1.image)

当然，在开发 LTR 和 RTL （多语言版本）的 Web 网站或应用时，应该尽可能避免使用 CSS 的物理属性，我们这个示例中尽可能使用 CSS 的逻辑属性来替代其对应的物理属性：

```CSS
.logo svg {
    block-size: 106px;
    margin-inline-start: -28px;
    margin-inline-end: -28px;
    margin-block-start: -28px;
    margin-block-end: -28px;
}

h1 {
    margin-block-start: 0;
}

.login {
    border-radius: 8px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
    
    padding-inline: 20px;
    padding-block: 20px;
    max-inline-size: 400px;
    min-inline-size: calc(100% - 2rem);
  
}

.login .control {
    inline-size: 100%;
    text-align: center;
}

.login .control:last-of-type {
    padding-block-start: 1.625rem;
    border-block-start: 1px solid #dddfe2;
}

.login input {
    padding-inline: 16px;
    padding-block: 14px;
    border-radius: 6px;
    inline-size: 100%;
}

.login input:focus {
    box-shadow: 0 0 0 2px #e7f3ff;
}

.login button {
    border-radius: 6px;
  
    padding-block: 0;
    padding-inline: 16px;
    min-block-size: 3rem;
}

.login .button--primary {
    inline-size: 100%;
}

.help--message {
    text-align: center;
    margin-block-start: 28px;
}

section > * {
    max-inline-size: 400px;
}

.page__sloga {
    text-align: center;
}

@media only screen and (min-width: 514px) {
    .login {
        min-inline-size: 400px;
    }
}

@media only screen and (min-width: 760px) {
    .page__sloga {
        text-align: start;
    }
    
    .login {
        min-inline-size: 400px;
    }
}
```

不过在使用 CSS 逻辑属性也会面临一个新问题。在 CSS 中有很多属性是可以简写的，比如 CSS 盒模型中的 `margin` 、`padding` 、`border` 以及 `border-radius` 之类的属性。在开发多语言版本 Web 网站或应用时，如果我们使用简写属性，比如 `margin` :

```CSS
.box {
    margin: 10px 20px 8px 5px;
}
```

你无法预测人们会怎么解读它。如果网站使用物理属性，这些值会被相应地解读成：

```CSS
.box {
    margin-top: 10px;
    margin-right: 20px;
    margin-bottom: 8px;
    margin-left: 5px;
}
```

如果网站使用逻辑属性，这些值就会被解读为：

```CSS
.box {
    margin-block-start: 10px;
    margin-inline-end: 20px;
    margin-block-end: 8px;
    margin-inline-start: 5px;
}
```

在英文网站中，物理属性和逻辑属性以相同的方式工作。在其他语言中，当我们使用 `margin` 等简写方式时，目的是根据 `direction` 或 `dir` 属性或新的 `writing-mode` 属性来工作。

对于开发者来说是件不易的事情，因为一些物理属性和逻辑属性是易于记忆的，像 `margin` 、`padding` 之类，但有一些是不易于记忆的，比如 `border` 和 `border-radius` 。就拿 `border-radius` 为例吧，与之对应的逻辑属性，在 `dir` 或 `direction` 和 `writing-mode` 下工作如下图所示：


![Frame 300.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a85c939059c8415a840455d7e0f45d5a~tplv-k3u1fbpfcp-watermark.image?)

这里我把以前整理的 `width` 、`hieght` 、`border` 、`padding` 、`top` 、`left` 、`bottom` 和 `right` 对应逻辑属性在 `dir` 、`direction` 和 `writing-mode` 下的工作情形用图来展示，希望有利于大家理解：


![4a9278a674ca499da38d87ba2a1a0bef~tplv-k3u1fbpfcp-zoom-in-crop-mark_3024_0_0_0 1.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1f3f15098a94bde811e97c3b93494f7~tplv-k3u1fbpfcp-watermark.image?)

![Frame 300.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3659018c8fe9486fa09abbef620b9b79~tplv-k3u1fbpfcp-watermark.image?)

最后，要是你记不住 CSS 逻辑属性和物理属性之间的对应关系记也不要紧，查看下图即可：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9da9c6165b64c8894f6930b4b38a65a~tplv-k3u1fbpfcp-zoom-1.image)

另外，需要注意的是，我们的示例在媒体查询中并没有使用 CSS 的逻辑属性，比如 `min-inline-size` ，那是因为到目前为止，它还不能作为媒体查询中的媒体条件。比如，下面这段代码是无法正常工作的：

```CSS
@media only screen and (min-inline-size: 514px) {
    .login {
        min-inline-size: 400px;
    }
}

@media only screen and (min-inline-size: 760px) {
    .page__sloga {
        text-align: start;
    }
    
    .login {
        min-inline-size: 400px;
    }
}
```

在这个示例中，我们不需要处理图标相关的事情，但根据前面所介绍的内容，我们应该在 LTR 和 RTL 版本中设置不同的行高 `line-height` ，给链接下划线设置不同的样式：

```CSS
section[dir="ltr"] {
    line-height: 1.625;
}

section[dir="rtl"] {
    line-height: 1.325;
}

section[dir="rtl"] .form--wrapper a:hover {
      text-decoration: underline;
      text-decoration-color: rgba(21, 132, 196, 0.2);
      text-decoration-skip-ink: auto;
      text-underline-offset: 4px;
      text-decoration-thickness: 2px;
      text-decoration: underline;
}
```

最终你看到的效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5acb82be888f45ef9f3b94f8e75606e5~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/RwYXGWg

## 小结 

我希望这些技术可以帮助你更轻松地创建多语言 Web 网站或应用。这节课向大家介绍了 LTR 和 RTL 中排版或 Web 布局中常出的一些小问题以及设计上需要注意的细节。虽然罗列的所有注意项目不是最全面的，但希望这些能帮助你从设计的阶段就避免一些常识性的错误。

另外，在示例中，我们学习了一些用来为这特定语言应用样式的 CSS 技巧，比如 `[dir="..."]` 、`[lang="..."]` 、`:dir(...)` 和 `:lang(...)` 。其中还介绍了 CSS 中的逻辑属性，以及它们如何适应文档的书写模式 `writing-mode` 、`direction` （或 HTML 的 `dir` 属性）。这比为不同语言版本编写额外的 CSS 样式规则要实用得多，而且还让你更易于维护一个多语言 Web 网站或应用的样式规则。

最后需要再次强调的是，**在构建一个多语言 Web 网站或应用时，首选的** **[Web 布局技术是 CSS Flexbox 和 CSS Grid](https://juejin.cn/book/7161370789680250917?utm_source=profile_book)**，因为它们天然的能与文档书写模式相结合 。除此之外，应该尽可能 **[使用 CSS 逻辑属性来替换物理属性](https://juejin.cn/book/7199571709102391328/section/7199846215167508492)**，尤其是涉及到方向性的属性，更应该使用逻辑属性。

对于不同语言版本的差异化的样式规则，可以考虑使用前面提到的 CSS 属性选择器 `[dir="..."]` 、`[lang="..."]` 或伪类选择器 `:dir(...)` 、`:lang(...)` 额外处理。

当然，在为特定语言优化网站时，可能还有其他需求需要考虑，但我们这里介绍的内容应该可以为你提供创建健壮 Web 布局所需的所有能力，以适应任何数量的语言和书写模式。

换句话说，掌握课程中的内容，构建一个多语言 Web 网站或应用对于你来说已不是一件难事，但差异化的处理，还是需要针对实际场景运用课程中所介绍的知识，做进一步的优化。