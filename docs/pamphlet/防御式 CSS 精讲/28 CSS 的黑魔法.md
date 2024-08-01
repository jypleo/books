来到这里，有关于防御式 CSS 的介绍和学习就要接近尾声了，我们花了二十多节课程向大家详细阐述了防御式 CSS 所需要掌握的相关理念和知识。在最后这节课中，我想和大家再探讨一些 CSS 相关的黑魔法，掌握这些黑魔法（或者说 CSS 技巧），也能使你编写出来的 CSS 更具备防御性。

## 避免 100vh 的天坑

就我个人而言，我在给一个 Web 应用或页面编写 CSS 代码的时候，总是喜欢在 `html` 和 `body` 设置 `min-height` 的值为 `100vh` ：

```CSS
html, body {
    min-height: 100vh;
}
```

孰不知，`100vh` 在 iOS上的 Safari 存在一个长期存在且非常恼人的问题，它无法正确处理 `vh` 单位。例如，将容器设置为 `100vh` 实际上会导致元素略微太高： 移动端中的 Safari 在计算 `100vh` 时忽略了其 UI 的某些部分。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b511aebdf4354a0ab0a48d9c50266e95~tplv-k3u1fbpfcp-zoom-1.image)

过去，大多是使用 [Viewport Units Buggyfill](https://www.bram.us/2016/09/12/making-viewport-units-work-properly-in-mobile-safari/) 或 [@Louis Hoebregts 的 CSS 自定义属性 Hack ](https://css-tricks.com/the-trick-to-viewport-units-on-mobile/)来修复此行为。

```JavaScript
const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

window.addEventListener('load', setVh);
window.addEventListener('resize', setVh);
body {
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
}
```

我很高兴看到 [@Matt Smith 最近找到了一种使用 CSS 让 Mobile Safari 将元素设置为 100vh 的方法](https://twitter.com/AllThingsSmitty/status/1254151507412496384)：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f7357b7d3f74f348aa3fe6585ef12e6~tplv-k3u1fbpfcp-zoom-1.image)

> URL 地址：https://twitter.com/AllThingsSmitty/status/1254151507412496384

```CSS
body {
    height: 100vh;
}

@supports (-webkit-touch-callout: none) {
    body {
        height: -webkit-fill-available;
    }
}
```

但这不是最佳的方案，因为使用 `-webkit-fill-available` 仅适用于实现 `100vh`。例如，如果你想要实现完美的 `50vh`，`-webkit-fill-available` 将无法使用在 `calc()` 中。例如 `height:calc(-webkit-fill-available * 0.5)` 就是无效的 CSS。即使有一天允许这样做，如果目标元素在 DOM 树的深层嵌套中，并且其中一个父元素已经设置了高度，则它将无效。

庆幸的是，CSS 在原有的 `vw` 、`vh` 、`vmin` 和 `vmax` 基础上推出了一系列新的视窗单位，即 `l*` 、`s*` 和 `d*` 对已有 `vw` 、`vh` 、`vmin` 和 `vmax` 单位的补充。这样做的主要原因是，原有的 `vw` 、`vh` 、`vmin` 和 `vmax` 没有明确的定义，完全取决于 UA （浏览器）定义其行为。一些浏览器`vh` 的行为像 `svh` （就像当前的 Safari 一样），而其他浏览器`vh` 的行为像 `lvh` 。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a39510e9a60240e291355b57b32c20a5~tplv-k3u1fbpfcp-zoom-1.image)

更为有意思的是，`dvw`、`dvh`、`dvi`、`dvb`、`dvmin` 和 `dvmax`，它们的大小被限制在它们的 `lv` 和 `sv` 对应单位之间。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82f785df16514e1e9d08f5dff5fe32ca~tplv-k3u1fbpfcp-zoom-1.image)

也就是说，如果你在实际编码时，如果要用到 `100vh` 的话，那么使用 `100dvh` 会是更佳的选择。这是一种原生的解决方案，不是一种 Hack 手段。

## 并集选择器

对于同时作用到不同浏览器的样式，并不推荐使用并集选择器。比如，设置 `input` 中 `placeholder` 的样式时，需要为每种浏览器使用对应的选择器。根据 W3C 的规定，我们如果在这种场景下使用了并集选择器，那么整个样式规则是不合法的。下面的代码是不推荐的。

```CSS
/* 无效 CSS 规则 */
::-webkit-input-placeholder, 
::-moz-placeholder, 
:-ms-input-placeholder, 
:-moz-placeholder { 
    color: #333; 
}
```

下面的代码是推荐的：

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

## 自定义属性备用值

CSS 自定义属性 (变量) 被越来越多地用于 Web 开发中。为了避免破坏用户体验，我们需要做一些额外的处理，以防 CSS 自定义属性的值因某种原因为空。 特别是使用 JavaScript 设置 CSS 自定义属性的值时，要更加注意自定义属性的值无效的情况。比如下面的例子： 

```CSS
.message__bubble { 
    max-width: calc(100% - var(--actions-width)); 
} 
```

`calc()` 函数中使用了自定义属性 `--actions-width`，并且它的值由 JavaScript 代码提供。假如在某些情况下，Javascript 代码执行失败，那么 `max-width` 的值会被计算为 `none`。 

为了避免发生这种问题，要用 `var()` 来设置一个备用值，当自定义属性的值无效时，这个备用值就会生效。 

```CSS
.message__bubble { 
    max-width: calc(100% - var(--actions-width, 70px)); 
} 
```

这样，如果自定义属性 `--actions-width` 未被定义，就会使用备用值 `70px`。这个方法用于自定义属性值可能会失败的场景，比如这个值来自于 JavaScript。在其它场景中，它并不是必需的。 

使用 CSS 自定义属性备用值，还可以起到其他的一些作用。

- 如果 CSS 自定义属性不被浏览器支持，那么可以提供一个降级的参数以备浏览器识别； 
- 如果浏览器支持 CSS 自定义属性，但并没有显式声明该 CSS 自定义属性的值，则会选择降级的参数； 
- 如果浏览器支持 CSS 自定义属性，而且显式声明了该 CSS 自定义属性的值，则会选择 CSS 自定义属性的值，不会选择降级的参数。 

比如下面这个示例： 

```CSS
:root { 
    --color: #f36; 
} 

.box { 
    width: var(--w, 100px); 
    color: var(--color, #fff); 
    border-width: var(--color, 2px); 
} 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae509a73d017400a96b79f79fe7025fa~tplv-k3u1fbpfcp-zoom-1.image)

还有另外一个情景，虽然在调用已声明的 CSS 自定义属性是一个无效的值，但提供了一个降级值，而且该降级的值是一个有效的值，那么就不会采用 `initial` 值，而是会采用降级值，比如：

```CSS
:root { 
    --color: 20px; 
} 

p { 
    color: var(--color, blue); 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/394589985e0242799dc3913da0ff039d~tplv-k3u1fbpfcp-zoom-1.image)

## 垂直媒体查询

有接触过[响应式 Web](https://juejin.cn/book/7161370789680250917/section/7165845190614188062) 开发的同学都知道，要是没有媒体查询，就很难构建出响应式 Web 页面。即使是这样，很多 Web 开发者更广泛地使用 `min-width` 和 `max-width` 来对媒体进行查询，往往忽略了 `min-height` 和 `max-height` 这样的垂直查询。

事实上，在一些场景中，垂直媒体查询是非常有用的。例如，有些 Web 页面有很多个部分，而且每个部分都会占据整个浏览器视窗高度。在 CSS 中，最简单的方法是使用视窗单位 `vh` ：

```CSS
section {
    height: 100vh;
}
```

如果每个部分有一个几乎填充其容器的内容，在较小的视窗高度中，这将导致重叠问题，因此我们会注意到每个部分的内容出现在另一个部分之上。

解决方法是仅在高度大于指定值时应用 `height: 100vh`，测试你的设计，当你注意到有问题时，添加一个断点。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6fb145685e5440b1be137c82a3675607~tplv-k3u1fbpfcp-zoom-1.image)

现在，该部分默认高度将由其内部的内容确定，如果视口高度大于 `400px` 且宽度大于 `500px`，则部分高度将为`100vh`（视窗高度的 `100%`）。

```CSS
@media (min-height: 400px) and (min-width: 500px) {
    section {
        height: 100vh;
    }
}
```

固定页头和页脚也是 Web 设计中的一种趋势。我个人不喜欢它们，因为它们占据了屏幕空间，特别是如果高度有点高。在较小的视口屏幕上，例如移动设备的横屏模式，为什么不要使用固定页头或页脚呢？因为它们会占据相应空间，在较小空间屏幕上无法向用户呈现尽可能多的内容。

我们可以这样做，只有在超过一定高度后才固定，这样我们就可以确保它不会占据太多的屏幕空间。

```CSS
header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 60px;
    background: #4ea7ea;
}

@media (min-height: 400px) {
    header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }
}

footer {
    background: rgba(0,0,0,0.7);
}

@media (min-height: 600px) {
    footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
    }
}
```

有的时候你还可以通过垂直媒体查询来查询一些移动终端，例如，使用最小高度来查询 iPhone 14 Pro Max:

```CSS
@media only screen and (min-height: 932px){ 
    /* Your Styles... */ 
}
```

## 移动端上的意外悬停

Web 上充满了很多互动，而我们选择展示与元素交互的方式往往是使用鼠标悬停。毕竟，当用户将鼠标悬浮在元素上时，稍微改变元素是交互或非交互的一个很好指示器。只是由于移动设备（如手机和平板电脑）没有像桌面电脑和笔记本电脑那样具备鼠标悬浮的交互操作，因此它们在你触摸元素时才会显示悬停状态。即使你不再触摸元素，它们仍然保持悬停状态。比如下面这个示例：

```HTML
<a href="/" class="button">Hove Me</a>
<button class="button">Hove Me</button>
<span class="button">Hove Me</span>
```

```CSS
.button {
    padding: 0.5em 1em;
    font-size: 1.125rem;
    border-radius: 0.6em;
    background-color: coral;
    font-weight: bold;
    border: 1px solid transparent;
    text-decoration: none;
    color: #fff;
    cursor: pointer;
    transition: background-color 200ms ease-in-out;
}

.button:hover {
    background-color: hotpink;
}
```

在桌面端电脑或平板电脑上，你将鼠标悬浮到按钮（`.button`）上时，它的背景颜色会从 `coral` 过渡到 `hotpink` ，符合我们所需要的一个交互效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7af3a338cd9b47b98005fa957a7225ec~tplv-k3u1fbpfcp-zoom-1.image)

当你在移动终端，比如手机或平板电脑上，你触摸按钮元素（`.button`）时，它的背景颜色同样也会从 `coral` 过渡到 `hotpink` 。可是，在有些元素上，它始终会让按钮背景颜色保持 `hotpink` 颜色：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fac79a00ce624b6d9c4092fd821f902b~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/eYPZLdJ

虽然看上去并无大碍，但会使用户的整体体验变得混乱，因为你的网站或 Web 应用程序没有提供正确的反馈。

上面这个示例仅仅是造成用户体验变得混乱，但有些场景会使应用变得不可用。比如下面这个卡片：

```HTML
<article class="card">
  <img
    class="card__background"
    src="https://picsum.photos/800/400/?random=11"
    alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
  />
  <div class="card__content ">
    <div class="card__content--container">
      <h2 class="card__title">Colombia</h2>
      <p class="card__description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum in
        labore laudantium deserunt fugiat numquam.
      </p>
    </div>
    <button class="card__button">Read more</button>
  </div>
</article>
```

```CSS
:root {
    --brand-color: hsl(46, 100%, 50%);
    --black: hsl(0, 0%, 0%);
    --white: hsl(0, 0%, 100%);
    --font-title: "Montserrat", sans-serif;
    --font-text: "Lato", sans-serif;
}

.card {
    display: grid;
    place-items: center;
    width: 80vw;
    max-width: 21.875rem;
    height: 31.25rem;
    overflow: hidden;
    border-radius: 0.625rem;
    box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
    cursor: pointer;
}

.card > * {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
}

.card__background {
    display: block;
    object-fit: cover;
    object-position: center;
    max-width: 100%;
    height: 100%;
}

.card__content {
    --flow-space: 0.9375rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-self: flex-end;
    height: 55%;
    padding: 12% 1.25rem 1.875rem;
    background: linear-gradient(
        180deg,
        hsla(0, 0%, 0%, 0) 0%,
        hsla(0, 0%, 0%, 0.3) 10%,
        hsl(0, 0%, 0%) 100%
    );
    row-gap: var(--flow-space, 1em);
}

.card__content--container {
    --flow-space: 1.25rem;
}

.card__title {
    position: relative;
    width: fit-content;
    font-size: 2.25rem;
    font-family: var(--font-title);
    color: var(--white);
    line-height: 1.1;
}

.card__title::after {
    content: "";
    position: absolute;
    height: 0.3125rem;
    width: calc(100% + 1.25rem);
    bottom: calc((1.25rem - 0.5rem) * -1);
    left: -1.25rem;
    background-color: var(--brand-color);
}

.card__description {
    font-family: var(--font-text);
    font-size: 1rem;
    line-height: 1.5;
    color: var(--white);
    margin-top: var(--flow-space, 1em);
}

.card__button {
    padding: 0.75em 1.6em;
    width: fit-content;
    font-variant: small-caps;
    font-weight: bold;
    border-radius: 0.45em;
    border: none;
    background-color: var(--brand-color);
    font-family: var(--font-title);
    font-size: 1.125rem;
    color: var(--black);
}

.card__button:focus {
    outline: 2px solid black;
    outline-offset: -5px;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a90dcf33c694daba3ad6a22887a0be2~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/BaqKOWM

你们发现，卡片在所有终端的效果都是一样的，用户体验也是一样的。但是，设计师突然跟你说，需要给卡片添加一些动效：

- 最初，只有标题（没有下划线）可见。
- 当用户悬停在卡片上时，它会向上移动，显示出其他的内容。
- 卡片也会略微增大，背景图像也会放大。
- 然后，下划线将出现在左侧，并扩展到标题的末尾。
- 当下划线动画结束后，文本和按钮将淡入淡出。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/69f5c78b1611411aa6ffeb576420571c~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/BaqKOWM

假设，你按照往常一样的方式给卡片添加设计所需要的动画效果，并期望着能在所有终端上有着相同的效果。

```CSS
.card__content {
    transform: translateY(62%);
    transition: transform 500ms ease-out;
    transition-delay: 500ms;
}

.card__title::after {
    opacity: 0;
    transform: scaleX(0);
    transition: opacity 1000ms ease-in, transform 500ms ease-out;
    transition-delay: 500ms;
    transform-origin: right;
}

.card__background {
    transition: transform 500ms ease-in;
}

.card__content--container > :not(.card__title),
.card__button {
    opacity: 0;
    transition: transform 500ms ease-out, opacity 500ms ease-out;
}

.card:hover,
.card:focus-within {
    transform: scale(1.05);
    transition: transform 500ms ease-in;
}

.card:hover .card__content,
.card:focus-within .card__content {
    transform: translateY(0);
    transition: transform 500ms ease-in;
}

.card:focus-within .card__content {
    transition-duration: 0ms;
}

.card:hover .card__background,
.card:focus-within .card__background {
    transform: scale(1.3);
}

.card:hover .card__content--container > :not(.card__title),
.card:hover .card__button,
.card:focus-within .card__content--container > :not(.card__title),
.card:focus-within .card__button {
    opacity: 1;
    transition: opacity 500ms ease-in;
    transition-delay: 1000ms;
}

.card:hover .card__title::after,
.card:focus-within .card__title::after {
    opacity: 1;
    transform: scaleX(1);
    transform-origin: left;
    transition: opacity 500ms ease-in, transform 500ms ease-in;
    transition-delay: 500ms;
}
```

实际效果却与你想象的并不一致：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4ef7c7cfa7d04146bac8f86b3ced13c5~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/BaqKOWM

在支持鼠标悬浮的设备上，效果是你所期望的，但在不支持鼠标悬浮的设备上（比如移动手机和平板电脑），就事与愿违了：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/112f7c5754fe43a296ccaa6ff258d996~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/BaqKOWM

你可能发现了，在移动端上需要用户触摸卡片，才能触动相关的动效，以及看到相关的内容。正如示例所示，在没有任何信息提示之下，用户很有可能是不知道需要自己主动触摸卡片，才能浏览到隐藏的内容。甚至有的时候，用户无意之间触摸到卡片，触发了卡片上的动效，可能会给用户带来一些惊吓而不是惊喜。

也就是说，上面示例中的带有动效的卡片效果，在具有悬浮功能的设备上，这似乎完全没有问题，但是对于没有悬浮功能的设备，用户必须轻触才能查看卡片的信息，这可能对那种设备来说是尴尬和不直观的。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b23cbf5ee5f04fa686934c089b2249d4~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/BaqKOWM

为了避免在触摸设备上显示悬停样式，你可以采用以下策略之一：

```CSS
@media (hover: hover) {
    .button:hover {
        background-color: hotpink;
    }
}
```

或者：

```CSS
.button:hover {
    background-color: hotpink;
}

@media (hover: none) {
    .button:hover {
        background-color: coral;
    }
}
```

在支持悬停的设备上，你将看到相应的悬浮效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f1b179e563f4010a9334ba19591c337~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/mdzEyjz

在不支持悬停的设备上，也不会因为 `:hover` 的效果给用户的体验造成混乱：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de1231d3f31849f7b17fdf4caf48d85a~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/mdzEyjz

这里我们使用了 CSS 媒体查询中的 `hover` 查询条件，它允许我们检测用户的主要输入机制是否能够悬停在元素上。它可以接受两个值：

- `none` 检测主要输入机制不能悬停或不能方便地悬停，如大多数手机和平板电脑；
- `hover` 检测主要输入机制能够悬停在元素上（例如，台式电脑、笔记本电脑和带有触控笔的智能手机）。

请记住，正如你前面所看到的一样，在移动端设备上，比如大多数手机和平板电脑，是没有可以悬停在元素上的输入机制的，但可以通过轻触来或长按来模拟此功能，这可能不太方便并且会引起一些可用性的问题，比如前面示例所展示的用户体验混乱的问题。

回到前面所展示的卡片组件的示例，我们解决这个问题的最佳方法是将所有动画相关的规则放在 `hover` 媒体查询中，如下所示：

```CSS
@media (hover: hover) {
    .card__content {
        transform: translateY(62%);
        transition: transform 500ms ease-out;
        transition-delay: 500ms;
    }

    .card__title::after {
        opacity: 0;
        transform: scaleX(0);
        transition: opacity 1000ms ease-in, transform 500ms ease-out;
        transition-delay: 500ms;
        transform-origin: right;
    }

    .card__background {
        transition: transform 500ms ease-in;
    }

    .card__content--container > :not(.card__title),
    .card__button {
        opacity: 0;
        transition: transform 500ms ease-out, opacity 500ms ease-out;
    }

    .card:hover,
    .card:focus-within {
        transform: scale(1.05);
        transition: transform 500ms ease-in;
    }

    .card:hover .card__content,
    .card:focus-within .card__content {
        transform: translateY(0);
        transition: transform 500ms ease-in;
    }

    .card:focus-within .card__content {
        transition-duration: 0ms;
    }

    .card:hover .card__background,
    .card:focus-within .card__background {
        transform: scale(1.3);
    }

    .card:hover .card__content--container > :not(.card__title),
    .card:hover .card__button,
    .card:focus-within .card__content--container > :not(.card__title),
    .card:focus-within .card__button {
        opacity: 1;
        transition: opacity 500ms ease-in;
        transition-delay: 1000ms;
    }

    .card:hover .card__title::after,
    .card:focus-within .card__title::after {
        opacity: 1;
        transform: scaleX(1);
        transform-origin: left;
        transition: opacity 500ms ease-in, transform 500ms ease-in;
        transition-delay: 500ms;
    }
}
```

如此一来，在支持悬停的设备上，卡片的效果如下所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f1a7aa100895426784654813946cc330~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/jOerEdb

在不支持悬停的设备上，卡片组件不会有任何动效，同时用户可以访问到卡片上的所有有信息：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/edc28ca1d87346518386aec14f477103~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/jOerEdb

这两个示例告诉我们，在构建响应式 Web 应用或网站时，如果你希望元素在桌面端电脑或笔记本电脑上悬浮（`:hover`）效果，或者基于悬浮制作一些动画效果，那么就需要考虑到这样做在移动手机或平板上给用户带来的相关困惑，甚至是应用的不可用性。其最简单的解决方法是，**将元素悬浮状态下的效果都放置在** **`@media (hover:hover) {}`** **媒体查询块中**。

## 移动设备安全区域的适配

自从苹果公司推出 iPhone X 系列之后，Web 开发者需要面对一个新的适配问题，那就是安全区域的适配。因为，自 iPhone X 系列之后，很多新的不同终端设备硬件自身就带有刘海：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d58eaa4c2aa741b0a031aac9970ce531~tplv-k3u1fbpfcp-zoom-1.image)

基于设备硬件上的改变，它会将网站限制在一个“安全区域”。而在屏幕上的安全区域中，造成网站左边或右边有空白区域。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/935fc7d1dca64888a4c51894bea5f507~tplv-k3u1fbpfcp-zoom-1.image)

而且，iOS11 与早期的版本有个不同的地方，Webview 内容将会尊重所谓的安全区域。这意味着，如果你有一个标题栏固定在顶部（`position:fixed;top:0`）。它将会在屏幕顶部下面的 `20px` 开始渲染。当你向下滚动时，它会移动到状态栏的后面。当你向上滚动时，它会再次下降到状态栏下面（在 `20px` 的间隙中，内容会透出，这是一个很尴尬的间隙，让人无法接受）。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/998a09ea17d7437ebfa77d7e38d0a221~tplv-k3u1fbpfcp-zoom-1.image)

作为 Web 开发者的你，就需要考虑你开发的 Web 应用或页面如何才能适配这个安全区域。你可以按以下几个步骤来处理。

首先，需要在你的 HTML 文档中添加下面这个 `<meta>` 标签：

```HTML
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" /> 
```

通过修改 `<meta>` 标签中的 `viewport-fit`可以设置可视视窗的大小，也就是可以控制剪切区域。修改 `viewport` 为 `cover`，可以让 Viewport 全屏。但在具有刘海的设备上（比如 iPhone X）会出现内容被刘海遮挡的现象，如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/141a566516f74239afeea415b443e203~tplv-k3u1fbpfcp-zoom-1.image)

此时，需要在 `<body>` 中添加安全区域独有的函数 `constant()`： 

- `constant(safe-area-inset-top)`：在 Viewport 顶部的安全区域内设置量（CSS像素） ；
- `constant(safe-area-inset-bottom)`：在 Viewport 底部的安全区域内设置量（CSS像素）； 
- `constant(safe-area-inset-left)`：在 Viewport 左边的安全区域内设置量（CSS像素）； 
- `constant(safe-area-inset-right)`：在 Viewport 右边的安全区域内设置量（CSS像素）。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e813bad576d41dc8092814ee24bad19~tplv-k3u1fbpfcp-zoom-1.image)

Webkit 在 iOS11 中新增 [CSS Functions](https://github.com/w3c/csswg-drafts/pull/1817): `env()` 替代 `constant()`，文档中推荐使用 `env()`，而 `constant()` 从 Safari Techology Preview 41 和 iOS11.2 Beta 开始会被弃用。

`env()` 用法如同 `var()`，在不支持 `env()` 的浏览器中，会自动忽略这一样式规则，不影响网页正常的渲染: 

```CSS
body { 
    /* iOS 11 */ 
    padding-bottom: constant(safe-area-inset-bottom); 
    padding-top: constant(safe-area-inset-top); 
    
    /* iOS 11.2+ */ 
    padding-bottom: env(safe-area-inset-bottom); 
    padding-top: env(safe-area-inset-top); 
}
```

就拿 iPhone X 为例吧，`constant(safe-area-inset-bottom)` 对应 `34px`，`constant(safe-area-inset-top)` 对应 `44px`，而刘海区域的实际高度是 `32px`，也就是安全高度比刘海高了 `12px`，如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4ba2bf089fc945b1886ab40e0de036e5~tplv-k3u1fbpfcp-zoom-1.image)

例如，处理 Header Bar 的时候（如果你的 Header Bar 是固定定位），那你可以这样处理：

```CSS
 #header{ 
     /* iOS < 11 */ 
     padding-top: 20px; 
     
     /* iOS 11 */ 
     padding-top: constant(safe-area-inset-top); 
     
     /* iOS 11.2+ */ 
     padding-top: env(safe-area-inset-top); 
} 
```

当然，你也可以结合 CSS 自定义属性一起来使用。我们可以在 `:root` 使用 CSS 自定义属性： 

```CSS
:root{ 
    --safe-area-inset-top: 44px; 
    --safe-area-inset-bottom: 34px; 
    --safe-area-inset-left: 0px; 
    --safe-area-inset-right: 0px; 
} 
```

如此一来就可以配合 `var()` 函数去做安全区域的处理。有了这样的 CSS 变量后，我们就可以在 CSS 里拿到对应的安全区域来做适配了，利用 CSS 变量的覆盖我们可以实现一段兼容代码：

```CSS
/* 默认的安全区域是0 */ 
:root{ 
    --origin-safe-area-inset-top: 0; 
    --origin-safe-area-inset-bottom: 0; 
} 

/* iPhoneX 等支持 constant 的适配 */ 
@supports (width: constant(safe-area-inset-top)){ 
    :root{ 
        --origin-safe-area-inset-top: constant(safe-area-inset-top); 
        --origin-safe-area-inset-bottom: constant(safe-area-inset-bottom); 
    } 
}

/* iPhoneX 等支持 evn 的适配 */ 
@supports (width: env(safe-area-inset-top)){ 
    :root{ 
        --origin-safe-area-inset-top: env(safe-area-inset-top); 
        --origin-safe-area-inset-bottom: env(safe-area-inset-bottom); 
    } 
}  

/* 后续使用 */ 
#header{ 
    padding-top: var(--origin-safe-area-inset-top); 
} 

#tabbar{ 
    padding-bottom: var(--origin-safe-area-inset-bottom); 
} 
```

在一些设备上（比如 iPhone X ）设置网页边距的时候，可能会遇到这样的情形：我们通过 `env(safe-area-inset-left)` 和 `env(safe-area-inset-right)` 设置了页面展示左右边距：

```CSS
.post {
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
}
```

在横屏状态下显示正常，但是在竖屏状态下，常量 `safe-area-inset-left` 和 `safe-area-inset-right` 都为 `0`，所以会导致页面展示左右边距为 `0px`，如下图左，正常情况应该是如下图右，竖屏状态下页面左右也有边距。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f1703385acc45c39333fda094618005~tplv-k3u1fbpfcp-zoom-1.image)

针对此现象，我们可以使用 CSS 的比较函数 `min()` 、 `max()` 或 `clamp()` 来解决这个问题：

```CSS
.post {
    padding-left: max(12px, env(safe-area-inset-left));
    padding-right: max(12px, env(safe-area-inset-right));
}
```

上面这样操作是可以帮助你处理移动端设备安全区域的适配，但有一些细节点还是不能忽略的。

第一个点就是，**设置了** **`viewport-fit=cover`** **后，**`height: 100%` **不能撑满整个视口**。 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2526114932d49fe94645a0db2b1f932~tplv-k3u1fbpfcp-zoom-1.image)

如上图蓝色区域所示，当设置了 `viewport-fit=cover` 时，给 `<html>` 和 `<body>` 设置了`height:100%`，高度并不等于视口高度，而是留出了 `constant(safe-area-inset-top)` 的高度，实际上就是整个页面被往上提了`constant(safe-area-inset-top)` 的高度。

这时 `fixed` 定位的元素即使设置 `bottom: 0` ，它也会距离底部 `constant(safe-area-inset-top)` 的高度，通过给 `<body>` 设置 `height: 100vh` 可以解决：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ba37638065d4c17a5b6875ac751ecdb~tplv-k3u1fbpfcp-zoom-1.image)

当然，`<body>` 高度大于 `100vh` 时，`bottom: 0` 的 `fixed` 元素也可以正常吸底，这就很奇怪了，例如某个页面的高度是由内容撑起来的，并且又有底部导航，那么一旦页面高度小于 `100vh` 时，底部导航就无法吸底，而一旦高度变高了，又会突然吸底，如下图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/273427696672429e9f88a2f1ea8f5f74~tplv-k3u1fbpfcp-zoom-1.image)

所以如果页面有吸底的 `fixed` 元素，最好给页面设置一个 `100vh` 的最小高度： 

```CSS
body { 
    min-height: 100vh; 
} 
```

需要注意的第二点是，**`<body>`** **的背景色不受** **`<body>`** **高度的限制** 。 

虽然当页面本身的高度小于 `100vh` 时，`<body>` 的高度没有扩展到底部，但是 `<html>` 或者 `<body>` 的背景色是可以延伸到底部的，如下图所示，蓝色区域是 `<body>` 的高度，绿色是 `<body>` 的背景色： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de4da00c74ab460581132cd81fe42a8c~tplv-k3u1fbpfcp-zoom-1.image)

第三点是，**当页面高度小于** **`100vh`** **时，**`fixed` **元素超出** **`<body>`** **区域的部分不可见**。 

按前文说的，当页面本身的高度小于 `100vh` ，`fixed` 元素的 `bottom` 属性的计算参考不是整个视口，而是有 `constant(safe-area-inset-top)` 的偏差，如果这个时候我们给固定元素设置一个负的 `bottom` 值，则这部分超出的区域将不可见，如下图，其中的绿色边框为 `<body>` 的区域，蓝色区域为 `fixed` 元素，可以看到超出`<body>` 的区域部分已经不见了（实际高度是底部红色元素的 `2` 倍），即使这个区域还在视口内： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7951745182341d5ad11fd94f834bb74~tplv-k3u1fbpfcp-zoom-1.image)

实际上这和 `fixed` 元素的特性是符合的，负值部分本来就是超出视口的部分，正常情况下就是不可见的，只是 `body` 的背景色又可以溢出显示，这就有点矛盾了，如下图中灰色部分就是 `<body>` 的背景，可以溢出显示，而 `fixed` 元素被截去了一部分：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e59a22c61b64ab0add0f6e8b103e77a~tplv-k3u1fbpfcp-zoom-1.image)

最后还需要注意的就是**固定定位元素相关的细节** 。`fixed` 完全吸底元素（ `bottom = 0`），比如下图这两种情况： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29478d9d20e940bcaa107894d224886b~tplv-k3u1fbpfcp-zoom-1.image)

可以通过加内边距 `padding` 扩展高度：

```CSS
.footbar { 
    padding-bottom: constant(safe-area-inset-bottom); 
    padding-bottom: env(safe-area-inset-bottom); 
}
```

或者通过计算函数 `calc()` 覆盖原来高度：

```CSS
.footbar { 
    height: calc(60px(假设值) + constant(safe-area-inset-bottom)); 
    height: calc(60px(假设值) + env(safe-area-inset-bottom)); 
} 
```

> 注意，这个方案需要吸底条必须是有背景色的，因为扩展的部分背景是跟随外容器的，否则会出现镂空情况。 

还有一种方案就是，可以通过新增一个新的元素（空的颜色块，主要用于小黑条高度的占位），然后吸底元素可以不改变高度只需要调整位置，像这样：

```CSS
.newEle{ 
    margin-bottom: constant(safe-area-inset-bottom); 
    margin-bottom: env(safe-area-inset-bottom); 
}
```

空的颜色块： 

```CSS
.fixed-element {
    position: fixed; 
    bottom: 0; 
    width: 100%; 
    height: constant(safe-area-inset-bottom); 
    height: env(safe-area-inset-bottom); 
    background-color: #fff; 
}
```

`fixed` 非完全吸底元素（`bottom ≠ 0`），比如 “返回顶部”、“侧边广告” 等。像这种只是位置需要对应向上调整，可以仅通过外边距 `margin` 来处理： 

```CSS
.fixedEle { 
    margin-bottom: constant(safe-area-inset-bottom); 
    margin-bottom: env(safe-area-inset-bottom); 
} 
```

或者，你也可以通过计算函数 `calc()` 覆盖原来 `bottom` 值：

```CSS
.fixedEle { 
    bottom: calc(50px(假设值) + constant(safe-area-inset-bottom)); 
    bottom: calc(50px(假设值) + env(safe-area-inset-bottom)); 
} 
```

## iOS Safari 中 `input` 的缩放

我们在构建响应式 Web 页面的时候，通常会在 `<head>` 中添加一个 `<meta>` 标签：

```HTML
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
```

这样的设置并没有让人感到有啥不一样，都认为是理所当然的。但自从 iOS 10 起，Safari 禁用了 Web 开发者提供用户缩放的能力。这也引起了另一个问题，当用户在任何表单字段中点击时，网页会自动缩放。

简单地说，在 iOS Safari 中输入框获得焦点时，默认情况下整个页面将会缩放：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fb04d88ef9f4b0b9cf592dc2c40de47~tplv-k3u1fbpfcp-zoom-1.image)

这很烦人，当缩放页面时，因为输入框不再聚焦，所以无法缩小页面。这种现象（缩放交互）会非常分散用户的注意力。

我现在确信的是，iOS Safari 推荐保持此功能不变，有的时候是尊重客户的请求，但有时这种缩放会在 UI 中引起不必要的麻烦。例如，如果在移动端设备上放大输入框，很有可能会破坏 Web UI 的美观。

你可能会好奇，为啥会这样呢？这是因为，在默认情况下，所有移动浏览器都会强制表单控件按照它们的工作方式进行工作。但是，当 Web 开发者将任何表单元素的字体大小（`font-size`）设置小于 `16px` 时，移动浏览器就会干预并强制 UI 或页面进行缩放，以便文本足够可读。

换句话说，如果你在构建 Web 表单时，在移动端碰到此现象，最简单的解决方案就是给表单控件设置 `font-size` 大于等于 `16px` ，不能小于 `16px` ：

```CSS
input[type="color"],
input[type="date"],
input[type="datetime"],
input[type="datetime-local"],
input[type="email"],
input[type="month"],
input[type="number"],
input[type="password"],
input[type="search"],
input[type="tel"],
input[type="text"],
input[type="time"],
input[type="url"],
input[type="week"],
select:focus,
textarea {
    font-size: 16px;
}
```

或者：

```CSS
body { 
    font-size: 16px; 
}
input[type="color"],
input[type="date"],
input[type="datetime"],
input[type="datetime-local"],
input[type="email"],
input[type="month"],
input[type="number"],
input[type="password"],
input[type="search"],
input[type="tel"],
input[type="text"],
input[type="time"],
input[type="url"],
input[type="week"],
select:focus,
textarea { 
    font-size: 100%; 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0cde57430ce483fa47956613c615250~tplv-k3u1fbpfcp-zoom-1.image)

顺便提一下，页面缩放是一件好事。一些用户可能更喜欢在大字体下查看他们所输入的内容，但个人觉得令人烦恼的是 Safari 只会放大页面，而用户需要自己找出如何缩小。这就是为什么我更喜欢将它提前重置的原因。

## 有效快速缩放 UI 组件

如果你阅读过《[如何构建响应式 UI](https://juejin.cn/book/7161370789680250917/section/7165496907714789407)》一文，我想你肯定就知道如何使用 `clamp()` 和 `calc()` 函数使 UI 进行缩放。除此之外，Web  UI 组件快速有效缩放还有另一个方案，即在构建 UI 的时候都使用 CSS 的 `em` 单位。

相对而言，`em` 单位可以更好地维护和扩展组件的大小，例如控制组件大小的属性，`width`、`height`、`padding` 和 `border-width` 等使用 `em` 作为单位时，如果要调整组件大小，可以直接调整组件的 `font-size`（要是元素自己未设置 `font-size` 时，可以调整其祖先元素的 `font-size`）。比如下图所示，调整 `font-size` 可以很灵活地控制组件的大小：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b417e5cde50f4307b731e875ba0d2daf~tplv-k3u1fbpfcp-zoom-1.image)

只不过，CSS 中的 `em` 单位计算相对而言复杂一些。也就是说，你需要对 `em` 单位有一些了解。

简单地说，CSS 的 `em` 单位最初基于大写字母 `M` 的尺寸计算的。当改变 `font-family` 时，它的尺寸不会发生任何改变，但是在改变 `font-size` 的大小时，它的尺寸就会发生变化。 在 CSS 中，如果没有任何 CSS 规则影响的前提之下，`1em` 的长度是： 

```CSS
1em = 16px = 0.17in = 12pt = 1pc = 4.mm = 0.42cm 
```

众所周知，每个浏览器都有一个默认的 `font-size` 大小，而这个值通常是 `16px`（用户未修改浏览器字号时）。这也就是为什么 `1em = 16px` 的原理所在。 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38c2a2f89cee4a24bf9002771329f651~tplv-k3u1fbpfcp-zoom-1.image)

`em` 还有一点很重要：`em` 和它们的祖先元素的 `font-size` 有关系。因此，如果祖先元素的 `font-size` 设置为 `0.5em` ，同时它的子元素的 `font-size` 设置为 `1em` ，在这一情景之下计算出来的 `font-size` 将会是 `16 x 0.5 = 8px`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/403d13729a684446b2b34d7fbba6210f~tplv-k3u1fbpfcp-zoom-1.image)

从上面的简单示例，我们可以得知，随着 DOM 元素的嵌套加深，同时不同层级都显式设置 `font-size` 的值为 `em` ，那将会增加 `em` 计算和转换的复杂度，比如：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f141ffdacfa4d5c8be521bbeaf28ca2~tplv-k3u1fbpfcp-zoom-1.image)

在 `px` 和 `em` 之间的转换有一定的公式，如下：

```CSS
 1 ÷ 父元素的font-size × 需要转换的像素值 = em值 
```

## 颜色对比度

在 Web 开发中，往往关注的是文本颜色（前景色）和背景色两者之间能够保持足够高的对比度，用来达到 WCAG 颜色可访问的标准。早期大多是借助于JavaScript 相关的能力来实现。 

```JavaScript
function setForegroundColor(color) { 
    let sep = color.indexOf(",") > -1 ? "," : " "; 
    color = color.substr(4).split(")")[0].split(sep); 
    
    const sum = Math.round( (parseInt(color[0]) * 299 + parseInt(color[1]) * 587 + parseInt(color[2]) * 114) / 1000 ); 
    return sum > 128 ? "black" : "white"; 
} 
```

上面的代码只是用 RGB 颜色为例。 `setForegroundColor()` 函数将传入的 `color`（一个 RGB 颜色）颜色的 `r`、`g`、`b` 通道的值乘以一些特殊的数字（`r * 299`、`g * 587` 和 `b * 144`），将它们的和除以 `1000`。如果得到的值大于 `128` 时，返回黑色，否则就会返回白色。 

```CSS
((R x 299) + (G x 587) + (B x 114)) / 1000 
```

注意：这个算法是从 RGB 值转换为 YIQ 值的公式中得到的。此亮度值给出颜色的感知亮度(Luma)。 对于两个颜色的色差可以按下面的公式来计算：

```CSS
 (maximum (R1, R2) - minimum (R1, R2)) + (maximum (G1, G2) - minimum (G1, G2)) + (maximum (B1, B2) - minimum (B1, B2)) 
```

颜色亮度差的范围是 `125`，色差的范围是 `500`。 这样一来，在改变元素背景色时，就可以自动匹配相应的前景色（主要是 `#000` 和 `#fff` 二选一）： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/915080915f1849d09cbf283222aa7f88~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/gOaaKxJ

上面的案例使用了JavaScript 来动态改变背景色的 `R`、`G` 和 `B` 通道值。但我们在实际开发中一般是在 CSS 中通过 `background-color` 和 `color` 来赋予元素的色彩：

```CSS
.element { 
    color: rgb(255 255 255); 
    background-color: rgb(255 0 0);
} 
```

早期的 CSS 在动态改变（比如说重新创建颜色值）值时，也无法动态处理像 `if` 这样语句。幸运的是，CSS 的自定义属性的出现让这件事情变得简单得多，而且结合 `calc()` 函数，可以让我们在 CSS 中做一些简单的计算。这样一来，上面的公式，我们就可以使用 `calc()` 来完成： 

```CSS
calc((r * 299 + g * 587 + b * 144) / 1000) 
```

这个时候把上面公式中的 `r`、`g` 和 `b` 几个参数换成 CSS 自定义属性（因为 CSS 中并没有 `r`、`g` 和 `b` 这样的属性和值）：

```CSS
:root { 
    --r: 255; 
    --g: 0; 
    --b: 0; 
} 
```

使用 `var()` 函数，将 `:root` 中声明的自定义属性替换公式中的 `r` 、 `g` 和 `b` ： 

```CSS
calc((var(--r) * 299 + var(--g) * 587 + var(--b) * 144) / 1000)
```

 

为了每次在使用的时候能少写一点代码，我们可以将上面的公式赋值给一个自定义属性，比如 `--a11yColor`： 

```CSS
:root { 
    --r: 255; 
    --g: 0; 
    --b: 0; 
    --a11yColor: calc((var(--r) * 299 + var(--g) * 587 + var(--b) * 144) / 1000) 
} 
```

你可能已经发现了，在 JavaScript 版本中，我们将计算出来的值和 `128` 做了一个比较，然后才输出正确的值。那么问题来了，在 CSS 中怎么实现类似的功能呢？不要过于担心，我们同样借助 CSS 的自定义属性，可以实现类似于`true`（`1`）和 `false`（`0`）这样的简单逻辑： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cff24efd86fe42e581c536e2d8b86d3f~tplv-k3u1fbpfcp-zoom-1.image)

我们继续回到颜色的计算中来。众所周知，RGB 颜色模式的值是 `0 ~ 255`（也可以是 `0% ~ 100%`）之间，为了不让事情变得复杂化，这里以 `0 ~ 255` 为例。在使用 `rgb()` 函数来设置一个颜色时，它的值只能是在 `0 ~ 255` 的区间内，虽然规范上是这样定义的，但实际上，取值小于 `0` 和大于 `255` 也是有效值，比如 `rgb(-255 300 220)` 是一个有效值，只不过浏览器将该值渲染为 `rgb(0 255 220)`：


![Frame 258.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b0fdf2eb85344b1bbc32dc54d86936b~tplv-k3u1fbpfcp-watermark.image?)


从浏览器的渲染结果中我们不难发现：小于 `0` 时会取其下限值 `0`，大于 `255` 时会取其上限值 `255` 。接下来，我们要处理的是“总值是否大于 `128`”。在 `calc()` 函数的计算中是无法做比较的，我们只需要做的是从总和中减去 `128` 即可，从而得到一个正整数或负整数。然后，如果我们将它乘以一个大的负值，比如 `-1000`，将会得到一个非常大的正值或负值。最后把这些值传给 `rgb()`函数：

```CSS
:root { 
    --r: 255; 
    --g: 0; 
    --b: 0; 
    --a11yColor: calc((((var(--r) * 299 + var(--g) * 587 + var(--b) * 114) / 1000) - 128) * -1000); 
} 

.element { 
    color: rgb(var(--a11yColor) var(--a11yColor) var(--a11yColor)); 
    background-color: rgb(var(--r) var(--g) var(--b)) 
 } 
```

效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d1aa16dbdaee424f8eb7fa52a36a25a0~tplv-k3u1fbpfcp-zoom-1.image)

我们可以基于这个原理，将上面的 JavaScript 计算的 Demo 换成 CSS 计算的方式：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2eca7b99cdc74aaca13dfb4c60a91289~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/VwEjajq

前面我们提到过，不管是设计师还是开发人员，更喜欢使用 HSL 来定义颜色。同样的，我们除了JavaScript 方案也可以类似于 RGB 一样，使用纯 CSS 的方案，实现颜色具有较好的可访问性。 和 RGB 一样，同样可以将 HSL 和 CSS 自定义属性结合起来。使用 HSL 给背景色设置颜色值（同样使用 CSS 自定义属性来声明 HSL）。这样做的好处是允许我们使用一种非常简单的方法来确定颜色的亮度，并将其用于条件语句。 

```CSS
:root { 
    --h: 220; 
    --s: 50; 
    --l: 80; 
} 

.element { 
    background-color: hsl(var(--h) calc(var(--s) * 1%) calc(var(--l) * 1%)); 
}
```

 效果如下： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c952930232de4dbd98e203493140ed24~tplv-k3u1fbpfcp-zoom-1.image)

这里有一点需要特别提出，CSS 中的 HSL 和 RGB 类似，如果 `h`、`l` 和 `s` 的值低于最低值（`0` 或 `0%`），会以 `0`（或 `0%` )计算；高于最高值时，`h` 是 `360` 度，会以 `360` 计算，`l` 和 `s` 都会以 `100%`计算。换句话说，当 `h`、`s` 和 `l` 的值都为 `0` 时，颜色为黑色，当超过最高值时为白色：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f94bbdc301d14495a31a208111b6420a~tplv-k3u1fbpfcp-zoom-1.image)

因此，我们可以将颜色声明为 HSL 模式，从 `l`（亮度）在数中减去所需的阈值，然后乘以 `100%` 以迫使它超过其中一个限制（低于 `0` 或高于 `100%`）。因为我们需要负的结果以白色表示，正的结果以黑色表示，所以我们还需要将结果乘以 `-1`。 

```CSS
:root { 
    --l: 80; 
    --threshold: 60; /* 颜色亮度l的阈值被认为是0 ~ 100之间的整数，但建议采用50~70之间 */ 
} 

.element { 
    /* 任何低于阈值的亮度值将导致颜色为白色，反之为黑色 */ 
    --switch: calc((var(--l) - var(--threshold))  -100%); 
    color: hsl(0, 0%, var(--switch)); 
} 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da4a76ecd33941edba85d0438e799c1c~tplv-k3u1fbpfcp-zoom-1.image)

如果你对颜色稍微了解（或者多几次尝试改变上面自定义属性的值)，不难发现，当一个元素的背景变得太亮时，它很容易在白色背景下不可见。为了在非常浅的颜色上提供更好的 UI，可以基于相同的背景颜色上设置可见的边框（颜色更深一些）。这样的场景非常适合按钮一类的 UI。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b8f89a995ee4d4787e1a3aff1244ad2~tplv-k3u1fbpfcp-zoom-1.image)

为了实现这个效果，我们可以使用相同的技术，但是要将它应用到 HSLA 颜色模式中的 `A`（透明）通道。这样，我们可以根据需要调整颜色，然后选择完全透明或完全不透明。

```CSS
:root { 
    --h: 85; 
    --s: 50; 
    --l: 60; 
    --border-threshold: 60; 
    --threshold: 60 
} 

.element { 
    --border-l: calc(var(--l) * 0.7%); 
    --border-alpha: calc((var(--l) - var(--border-threshold)) * 10); 
    --switch: calc((var(--l) - var(--threshold)) * -100%); 
    
    color: hsl(0, 0%, var(--switch)); 
    border: 2vh solid hsla(var(--l), clac(var(--s) * 1%), var(--border-l), var(--border-alpha)); 
    background-color: hsl(var(--h) calc(var(--s) * 1%) calc(var(--l) * 1%)); 
} 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/326c927a77fe4a8b9accedae026a1aab~tplv-k3u1fbpfcp-zoom-1.image)

同样的，基于 HSL 颜色模式脱离任何 JavaScript 库，同样能实现具有可访问性的颜色。比如下面这个 Demo： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/737e30c92fbf4c448d9371332c8061c7~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/BaqzKdo

前面我们多次提到过感知亮度（Luma），在颜色空间中感知亮度和 HSL 颜色模式中的亮度 `L` 是不一样的。这样一来，我们可以基于 RGB 颜色模式，使用感知亮度来较正三原色，让颜色更能让人类的眼睛识别。到目前为止，计算感知亮度的公式有两种。第一种就是前面提到的（也是 [W3C 规范](https://www.w3.org/TR/AERT/#color-contrast)中提供的）：

```CSS
L = (r * 0.299 + g * 0.587 + b * 0.144) / 255
```

如果用 CSS 的 `calc()` 函数来描述的话，像下面这样：

```CSS
L = calc((var(--r) * 0.299 + var(--g) * 0.587 + var(--b) * 0.114) / 255)
```

另一个公式是由 [ITU](https://en.wikipedia.org/wiki/Rec._709) 提供的： 

```CSS
L = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255
```

同样的，CSS 表述的话如下：

```CSS
 L = calc((var(--r) * 0.2126 + var(--g) * 0.7152 + var(--b) * 0.0722) / 255)
```

如果在颜色计算中引入感知亮度 Luma 的话，那我们就不能再基于 HSL 来描述颜色了，因为 Luma 的计算离不开 RGB 颜色各通道的值。 主要是在 CSS 中，我们很难将 HSL 颜色转换成 RGB 。 下面我们简单看看引入 Luma 的颜色对比度计算怎么使用。请直接看代码：

```CSS
:root { 
    /* 使用rgb模式来描述颜色，eg. rgb(255 0 0) */ 
    --r: 255; 
    --g: 0; 
    --b: 0; 
    
    /* 颜色亮度l的阈值(范围0~1)，建议设置在0.5~0.5间 */ 
    --threshold: 0.55; 
    
    /* 深颜色边框的阈值(范围0~1)，建议设置在0.8+ */ 
    --border-threshold: 0.8; 
} 

.element { 
    background-color: rgb(var(--r) var(--g) var(--b)); 
    
    /** 
     * 使用sRGB Luma方法计算感知亮度Luma: 
     * L = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255 
     * L = calc((var(--r) * 0.2126 + var(--g) * 0.7152 + var(--b) * 0.0722) / 255) 
     */ 
     --luma: calc((var(--r)  0.2126 + var(--g) * 0.7152 + var(--b) * 0.0722) / 255); 
     color: hsl(0 0% calc((var(--luma) - var(--threshold)) * -10000000%)); 
     
     /* 如果亮度高于边框阈值，则应用较暗的边框 */ 
     --border-alpha: calc((var(--luma) - var(--border-threshold))  100); 
     border: 3vmin solid rgba(calc(var(--r) - 50), calc(var(--g) - 50), calc(var(--b) - 50), var(--border-alpha)); 
}
```

 改变 `--r`、`--g` 和 `--b` 就可以得到不一样的结果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e48bb3f3bab4b40a0899903cb358027~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/xxyOVpa

在不久的未来，我们没有必要这么麻烦来处理颜色对比度。我们可以直接使用 CSS 的 `color-contrast()` 。 `color-contrast()` 函数比较有意思，特别是在用于构建可访问性 Web 的时候特别有用。因为它可以帮助我们提高 Web 可访问性方面的能力（更好地控制文本色和背景色的对比度）。其主要作用是获取一个颜色值，并将其与其他颜色的列表进行比较，从列表中选择对比度最高的一个。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2380cc821a6041a5bb2ab74daffce690~tplv-k3u1fbpfcp-zoom-1.image)

比如 `color-contrast(white vs red, white, green)` ，分别会拿 `red` 、`white` 和 `green` 与 `white` 进行对比，其中 `green` 和 `white` 对比度最高，最终会取 `green` 颜色：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04f7248caaa640c58d85a44717fa2d16~tplv-k3u1fbpfcp-zoom-1.image)

你也还可以像这样使用：`color-contrast(wheat vs tan, sienna, #d2691e to AA-large)` 。它会将 `wheat` 与 `tan` 、`sienna` 和 `#d2691e` 进行对比，最终 `sienna` 颜色获胜，因为它与 `wheat` 颜色的对比度为 `4.273` ，超过了 `AA-large` 的阈值。

## 确保可点击区域符合用户体验

可点击区域是否合理直接影响了用户和你的产品的交互，特别是在移动端。大家可能有碰到过，有些产品在按钮、链接、复选框或单选框等操作上就是失效，要点击很多次才能有效果。造成这种行为就是因为点击区域过小。

特别是在一些带可点击操作的图标上，Icon 图标的实际尺寸并不适合一些系统的设计规范，在 iOS 上提供的 Icon 图标可点击区域应该是 `48px x 48px`，如果你使用的图标小于该区域的话，我们就应该通过别的方式来进行扩展。那么伪元素是一个较好的方式。比如下面这个示例：

```CSS
.menu-2 {
    appearance: none;
    position: absolute;
    right: 50%;
    top: 100px;
    transform: translateX(-50%);
    width: 28px;
    height: 18px;
    font-size: 0;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
}
.menu-2:after {
    content: "";
    position: absolute;
    left: -12px;
    top: -16px;
    z-index: -1;
    width: 50px;
    height: 50px;
    background: #E83474;
    border-radius: 7px;
    opacity: 0.5;
    transition: 0.3s ease-out;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ef0d8f7ebed43599e295c611bf1ddb7~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/bGmepzg

[@Ahmad Shadeed](https://ishadeed.com/article/clickable-area/) 和 [@hankchizljaw](https://hankchizljaw.com/wrote/create-a-semantic-breakout-button-to-make-an-entire-element-clickable/) 有过一个共同的观点。比如在一个卡片上，可以让整个卡片都具有可点击效应（`click` 事件绑定在 `button` 或一个 `<a>`）元素之上。如下图所示：

```CSS
.box {
    color: #fff;
    padding: 2rem;
    max-width: 30rem;
    background: #252525;
    position: relative;
    box-shadow: none;
    transition: transform 300ms ease-in-out, box-shadow 400ms ease, background 100ms ease;
}

.box:hover,
.box:focus-within {
    background: #111111;
    box-shadow: 0 1rem 1rem rgba(0,0,0,0.3);
    transform: translateY(-0.5rem);
}

.box > * + * {
    margin-top: 1em;
}


.breakout-button {
    font: inherit;
    font-weight: 600;
    padding: 0.6rem 2rem;
    background: transparent;
    color: currentcolor;
    border: 1px solid;
    transition: background 100ms ease;
    position: static;
}

.breakout-button,
.breakout-button::before {
    cursor: pointer;
}

.breakout-button::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.breakout-button:focus {
    outline: none;
}

.breakout-button:hover {
    background: #333333;
}

.breakout-button:focus::before {
    outline: 1px solid #ffffff;
    outline-offset: -0.8rem;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7f680387602494f83f419a290ffd2ab~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/xxyOVeM

## 小结

在这节课中，主要向大家阐述了十个有关于 CSS 方面的黑魔法（小技巧），这只是 CSS 中常见的一些小技巧，希望对大家有所帮助。其实，在 CSS 中可能还有很多类似的小技巧，这里很有可能没有罗列全面，如果你有类似的小技巧，希望在评论中与大家一起分享，我们可以进一步完善和扩展 CSS 方面的小技巧。