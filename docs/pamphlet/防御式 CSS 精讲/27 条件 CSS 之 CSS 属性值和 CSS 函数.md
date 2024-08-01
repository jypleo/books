[通过上一节课程的学习](https://juejin.cn/book/7199571709102391328/section/7199845944760729632)，我们知道了 CSS 中的 `@` 规则，比如 `@media` 、`@supports` 和 `@container` ；CSS 的部分选择器，比如 `:has()` 、`:not()` 、`:focus-within` 和 `:empty` 等，这些是可以使 CSS 具备条件化能力的。

事实上，除了这些之外，CSS 中的部分属性和值也可以使 CSS 具备条件化能力，比如 CSS 自定义属性，[Flexbox 和 Grid 布局中的换行](https://juejin.cn/book/7199571709102391328/section/7199571708838150155)，[CSS 的比较函数和内在尺寸](https://juejin.cn/book/7199571709102391328/section/7199846286953512972)等。在这节课中，我们一起来看看 CSS 属性、属性值和 CSS 函数是如何使 CSS 具备条件化能力的。

## 条件化 CSS：CSS 属性

你可能会感到好奇，CSS 属性怎么就可以使 CSS 具备条件化能力。其实，CSS 的属性没有明确的 `if ... else ...` 相关能力，但部分 CSS 属性在特定的场景之下，是可以使 CSS 具备条件化相关能力的。比如，小册前面的课程《 [Flexobx 和 Grid 布局中的换行](https://juejin.cn/book/7199571709102391328/section/7199571708838150155)》所介绍换行技术，它们就有类似于 `if ... else ... ` 的身影存在。

除此之外，CSS 的自定义属性结合 `calc()` 函数时，可以完全使 CSS 具备条件化能力。假设有一个自定义属性 `--i`，当： 

- `--i` 的值为 `1` 时，表示真（即 `ON`）； 
- `--i` 的值为 `0` 时，表示假（即 `OFF`） 。

使用这个功能特性，你可以在 CSS 中**只使用一个 CSS 声明做两种状态的切换，从而实现****不同的效果，比如****在宽屏幕上，奇数和偶数项不同的效果**：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3a388f666684322bedcac0a1b474d21~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 集合：https://codepen.io/collection/DjmdjQ/（By [@Ana tudor](https://codepen.io/thebabydino)）

或者**收缩和扩展的动画效果**：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3c380bfba1743b7a70788bab288fe55~tplv-k3u1fbpfcp-zoom-1.image)

要是你对 CSS 自定义属性有足够多的了解，你还可以在 CSS 自定义属性中有效地使用无效变量，听起来有点绕口，但它却能帮助你在 CSS 中做到属性值的切换，**使用一个单一的属性值来开启或关闭多个不同的属性，甚至是多个CSS** **规则** 。

比如下面这个示例，当你将鼠标移动到按钮上，按钮从一个扁平的效果过渡到一个凸起（带有渐变，高亮，边框）的按钮：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3788326ff7fb4ee98a34e842b58b3fc6~tplv-k3u1fbpfcp-zoom-1.image)

代码很简单： 

```CSS
button { 
    --is-raised: ; /* off by default */
    border: 1px solid var(--is-raised, rgb(0 0 0 / 0.1)); 
    background: 
        var( --is-raised, linear-gradient(hsl(0 0% 100% / 0.3), transparent)) 
        hsl(200 100% 50%); 
    box-shadow: var( --is-raised, 0 1px hsl(0 0% 100% / 0.8) inset, 0 0.1em 0.1em -0.1em rgb(0 0 0 / 0.2) ); 
    text-shadow: var(--is-raised, 0 -1px 1px rgb(0 0 0 / 0.3)); 
} 

button:hover { 
    --is-raised: initial; /* turn on */ 
} 
```

`button` 在 `:hover` 状态时，自定义属性 `--is-raised` 从一个空字符串（`--is-raised: ;`）变成了 `initial`（`--is-raised: initial;`），就轻易地实现了两种状态的 UI 切换。 

它们是不是像极了其他程序语言中的 `if ... else ...` ，可以让你在 CSS 中轻易实现两种状态 UI 下的切换，甚至是自动切换，无需任何 JavaScript 脚本就可以实现。你是不是开始想知道其中的原委了？如果是的话，请继续往下阅读。我将会对以下三个知识点进行展开阐述：

- 自定义属性中有效的使用无效变量；
- 零和非零值之间的切换；
- 两个非零值之间的切换。

这将会涉及到很多关于 CSS 自定义属性相关的知识，在这里只会介绍一些关于这节课知识有关的方面，更多详细内容大家可以在课外自行学习。

### CSS 自定义属性简介

CSS 自定义属性也常被称为 **CSS 变量**，这主要还是源于 CSS 处理器或其他程序语言的一种叫法。CSS 自定义属性是以 `--` 前缀开始命名，比如 `--primary-color`，其中 `primary-color` 可以是任何字符串，它也被称为“变量名”。即 `--变量名`（比如 `--primary-color`）组合在一起才是“CSS自定义属性”。 

CSS自定义属性的声明和 Sass 的变量声明有所不同，在 Sass 中，我们可以在 `{}` 外声明，比如：

```SCSS
$primary-color: #0055fe; 
```

但 CSS 自定义属性声明需要放置在一个 `{}` 花括号内，比如：

```CSS
:root { 
    --primary-color: #0055fe; 
} 
```

除了在 `:root` 中之外，还可以是在其他的代码块中，比如：

```CSS
html { 
    --primary-color: #0055fe; 
} 

header { 
    --primary-color: #00fe55; 
} 
```

虽然按上面的方式在 CSS 中注册了 CSS 自定义属性，但如果没有被 `var()` 函数引用的话，它们不会有任何效果。比如下面这个示例，只有 `--primary-color` 被 `var()` 引用，而 `--gap` 虽已注册，但未被 `var()` 引用，它也就未运用到任何元素上：

```CSS
 :root { 
     --primary-color: #0055fe; 
     --gap: 20px; 
 } 
 
header { 
    color: var(--primary-color); 
} 
```

除了在 CSS 中使用 `--varName` 来注册一个 CSS 自定义属性之外，我们还可以使用 JavaScript 的`style.setProperty()` 动态注册一个 CSS 自定义属性，比如： 

```JavaScript
document.documentElement.style.setProperty('--primary-color', '#0055fe') 
```

执行完之后，在 `<html>` 元素上会添加 `style` 属性： 

```HTML
<html style="--primary-color: #0055fe"></html> 
```

在 CSS Houdini 中，我们还可以使用另外两种方式来注册 CSS 自定义属性（变量）。在 CSS 样式文件中可以使用 `@property` 注册自定义属性：

```CSS
 @property --primary-color { 
     syntax: '<color>'; 
     initial-value: #0055fe; 
     inherits: false; 
} 
```

在 JavaScript 中可以使用 `CSS.registerProperty()` 注册：

```JavaScript
CSS.registerProperty({ 
    name: '--primary-color', 
    syntax: '<color>', 
    inherits: false, 
    initialValue: '#0055fe' 
}) 
```

CSS Houdini 中注册好的 CSS 自定义属性同样只有被 `var()` 函数调用才能生效。 

有一点开发者需要特别注意，CSS 中注册的自定义属性是有大小写之分的，比如 `--on` 和 `--ON` 是两个不同的 CSS 自定义属性，比如：

```CSS
:root { 
    --ON: 1; 
} 

.box { 
    transform: rotate(calc(var(--ON) * 45deg)); 
    transition: transform 1s ease-in-out; 
} 

.box:hover { 
    transform: rotate(calc(var(--on) * 720deg)); 
} 

.box:last-of-type:hover{ 
    transform: rotate(calc(var(--ON) * 720deg)); 
} 
```

如果你把鼠标移动蓝色 `.box` 上，效果和我们预想的并不相同，没有旋转 `720deg`，反而旋转到了 `0deg`，即 `--on` 无效值；如果把鼠标移动到红色的 `.box` 上，可以看到元素从 `45deg` 旋转到 `720deg`：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39187b783c8841539fcd3076b309fc31~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/qBJOmJb

### CSS 自定义属性的回退值

在 CSS 中，使用 `var()` 函数调用 CSS 自定义属性时，该自定义属性在 `var()` 函数中就变成了 CSS 的变量：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a571afb3edfa401d928b227435d7ee69~tplv-k3u1fbpfcp-zoom-1.image)

而 `var()` 函数接受两个参数，其中第一个参数是自定义属性；第二个参数，如果提供的话是一个回退值，即**当被引用的自定义属性无效时，它被用作自定义属性的回退值** 。比如下面这个示例：

```CSS
.element { 
    color: var(--color, red) 
} 
```

就该示例而言，`--color` 并没有被定义，那么这个时候，`var()` 将会取其第二个参数 `red` 作为其回退值，并赋值给 `color`属性。 

另外一种情况是，在代码中显式声明了自定义属性，但该自定义属性运用于某些 CSS 属性上时，它是个无效值，比如：

```CSS
.element { 
    --color: 20; 
    border: 3px double var(--color, red); 
    color: var(--color, blue); 
} 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e017867feee7416582ea2b33e57507d0~tplv-k3u1fbpfcp-zoom-1.image)

这个示例中我们显式声明了 `--color` 自定义属性，而且其值是 `20`，对于 `--color` 自定义属性是个有效值，但 `var()` 引用 `--color` 时，`--color` 是有效的，此时 `var()` 的回退值就不会起作用。此时相当于： 

```CSS
.element { 
    border: 3px double 20; 
    color: 20; 
} 
```

它对于 `color` 和 `border` 来说是个无效的值，会被忽略。但对于 `color` 属性来说，虽然是无效，但这个时候浏览器在计算时，会继承其父元素的 `color` 值，该示例对应的是浏览器默认文本颜色，即 `#000`。 

乍一看似乎很混乱，但有充分的理由。第一个是技术原因：**浏览器引擎在“解析时间”（先发生）处理无效或未知的语法，但变量要到“计算值时间”（后发生）才会被解析** 。 

- 在解析时，无效语法的声明会被完全忽略（回退到之前的声明），而之前的声明会被丢弃； 
- 在计算值时，变量被编译为无效，但为时已晚（之前的声明已经被丢弃了）。 

根据规范，[无效的变量值](https://www.w3.org/TR/css-variables-1/#invalid-at-computed-value-time)和未设置的变量值会像 `unset` 一样解析。 这对于开发者而言是好事，因为它允许我们提供更复杂的回退值。更妙的是，这允许我们使用 `null`、`undefined` 状态来设置所需参数。 

另外规范中对“**要在一个属性的值中替换一个 `var()`** ”做出了明确的指导： 

- 如果 `var()` 函数的第一个参数命名的自定义属性被[动画污染（animation-tainted）](https://www.w3.org/TR/css-variables-1/#animation-tainted)，并且 `var()` 函数被用于动画属性（ `animation` ）或它的一个简写属性，那么本算法的其余部分将自定义属性视为具有初始值（`initial`） 。
- 如果 `var()` 函数的第一个参数命名的自定义属性的值不是初始值（`initial`），则用相应的自定义属性的值替换 `var()` 函数；否则，则用 `var()` 函数的第二个参数值（当然，`var()` 要显式设置了回退值）。如果`var()` 的回退值中引用了任何 `var()` 函数，使用原则是相同的；如果`var()` 没有回退值，那么 `var()` 函数的属性在计算值时是无效的。

也就是说： **`var()`** **函数是在计算值时间（Computed-Value）被替换的。如果一个声明，所有的** **`var()`** **函数都被替换进来，那么这个声明在计算值时间是无效的** 。 

### 保证无效值

如果自定义属性的值是 `initial`，那它就是一个**保证无效的值（Guaranteed-Invalid Value）** 。在 CSS 中，`var()` 将一个自定义属性值替换为 `initial`，将会使引用它的属性在计算值时无效。 

这个值序列化为空字符串，但实际上是在自定义属性中写一个空值，比如 `--foo: ;` 是一个有效的（空）值，而不是保证无效的值。不管出于什么原因，想要手动将一个变量重置为保证无效的值，只需要使用关键词 `initial` 就可以做到。 

说到自定义属性的空值就很有意思了，比如：

```CSS
:root { 
    --color: ;      /* 冒号(:)和分号(;) 之间有一个空格符 */
    --borderColor:; /* 冒号(:)和分号(;) 之间无任何内容，包括空格符 */
} 
```

示例中 `--color` 和 `--borderColor` 自定义属性都没有设置其他的值，唯一不同的是 `--color` 后面紧跟的冒号（`:`）和分号（`;`）之间有一个空格硬编码（记住，在编码的时候手动敲了一个空格），`--borderColor` 后面紧跟的冒号和分号之间却没有这个空格。

但它们同时被 `var()` 函数引用的时候，却有天壤之别，`--color` 是有一个有效的自定义属性，而 `--borderColor` 是一个无效的，如果 `var()` 函数提供回退值时，那么引用 `--borderColor` 变量的 `var()` 函数将会使用回退值替换 `--borderColor` 设置的值。 

```CSS
:root { 
    --color: ; 
    --borderColor:; 
} 

.element { 
    border: 3px double var(--borderColor, red); 
    color: var(--color, blue); 
} 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a907937b6bd470597edaa0848da523c~tplv-k3u1fbpfcp-zoom-1.image)

示例结果和我们前面描述是一致的。`--borderColor:;` 是一个保证无效的值（等同于 `--borderColor: initial`），因此会采用回退值 `red` 作为 `border-color` 的值，所以看到的边框颜色是 `red`；而 `--color: ;` 是一个有效值，这个时候即使 `var()` 函数提供了回退值 `blue`，也不会被使用。

`color` 取了一个空值，不过 `color` 会继承其父元素的 `color` 值（此例是 `#000`），因此你看到的文本颜色是黑色。 

虽然在自定义属性中使用 `--foo:;` 方式可以和使用 `--foo: initial;` 类似，让该自定义属性是一个保证无效的值，但使用 `--foo:;` 在可读性上不怎么好，甚至对于不了解该特性的同学来说会以为是一个错语；而使用 `--foo: initial;` 方式对于不了解该技术的同学来说同样会让人感到奇怪。因此，为了提高代码可读性，最好是在后面添加相应的代码注释。 

### 在计算值时间无效

如果一个声明包含一个引用了具有保证无效值的自定义属性的 `var()`，比如： 

```CSS
.element { 
    --color: initial; 
    color: var(--color, red); 
 } 
```

或者它使用了一个有效的自定义属性，但在替换了它的 `var()` 函数之后，属性值是无效的，比如：

```CSS
.element { 
    --color: 20; 
    color: var(--color); 
}     
```

那么这个声明在计算值时可能是无效的。当这种情况发生时，根据属性的类型，计算出的值是以下几种情形之一： 

- 该属性是非注册的自定义属性； 
- 该属性是一个注册的自定义属性，且具有通用语法，计算的值是保证无效值； 
- 否则，要么是属性的继承值，要么是它的初始值，分别取决于属性是否被继承，就像属性的值被指为 `unset` 关键词一样。 

比如：

```CSS
:root { 
    --not-a-color: 20px; 
} 

p { 
    background-color: red; 
} 

p { 
    background-color: var(--not-a-color); 
}
```

 `p` 元素的 `background-color` 计算值将是 `transparent`（因为 `background-color` 的初始值是`transparent` ）而不是 `red` ： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7dcc837a7ecb401cb81feb9e0b6825e6~tplv-k3u1fbpfcp-zoom-1.image)

如果自定义属性本身没有设置，或者包含一个无效的 `var()` 函数，也会发生同样的情况。 注意，这和开发者直接在样式中写 `background-color:20px` 的情况不同，因为在样式这样书写会被视为 CSS 语法错误，会导致该规则 `background-color` 被忽略（丢弃），因此会使用 `background-color: red` 规则。 

计算值时间无效的概念之所以存在，是因为变量不能像其他语法错误那样“**提前失效**”，所以当用户代理意识到一个属性值无效的时候，它已经把其他的级联值扔掉了（正如该示例中的 `p{background-color: red}` 就被扔掉了）。 

### 无效变量

了解了上面这些基本概念之后，再来理解 CSS 自定义属性中的“无效变量”就好理解了。[规范中这样描述“无效变量”](https://w3.org/TR/css-variables-1/#invalid-variables)：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1bb8bbe46dc34624a2d564e0a21beec5~tplv-k3u1fbpfcp-zoom-1.image)

**当一个自定义属性的值是 `initial`时，`var()` 函数不能使用它进行替换。除非指定了一个有效的回退值，否则会使声明在计算值时无效** 。 

也就是说，当一个自定义属性的值是一个保证无效的值时，`var()` 函数不能使用它进行替换。即一个声明包含一个引用了具有保证无效值的自定义属性的 `var()` 函数，或者它使用了一个有效的自定义属性，但在替换了它的 `var()` 函数之后，属性值是无效的，那么这个声明在计算值时可能是无效的。

当这种情况发生时，属性的计算值要么是属性的继承值，要么是它的初始值，分别取决于属性是否被继承，就像属性的值被指定为 `unset` 关键字一样。 

其中原因是继承的标准属性将初始化处理为 `unset` ，除了行为是“从根开始未设置”。而且前面也说过： 

> **级联值在计算值时间无效时就应该被扔掉** 。

比如下面这个示例： 

```HTML
<div class="element">Element</div>
```

```CSS
.element { 
    --color: red; 
    background-color: var(--color, orange); 
 }
 
 .element:hover {
     --color: initial;
 }
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45b857fe57ef417093f0f4f66fec4d07~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/xxyZBpV

示例中 `.element` 在悬浮状态（`:hover`）设置了 `--color` 自定属性的值为 `initial` ，它是一个无效值，所以你看到悬浮状态会引用其备用值 `orange` 。我想，通过这个示例，你对 CSS 自定义属性中的无效值有更深的了解了吧。如果没有理解的话，可以记住这两点： 

- 在同一作用域中，如果自定义属性的值是 `initial`，表示该自定义属性是一个保证无效值，那么它将会采用`var()` 回退值，如果 `var()` 未设置回退值，那么会根据属性的 `unset` 来设置值。 
- 如果不在同一作用域中，当自定义属性值是保证无效值时，会类似 JavaScript 事件冒泡机制，向上寻找同名称的自定义属性，如果未找到，则会采用 `var()` 的回退值，要是未设置回退值，将会根据属性的 `unset` 取值；如果向上找到同名称的自定义属性，将会采用父（祖先）同名的自定义属性的值。 

我们回过头来看 [@Lea Verou 提供的示例](https://lea.verou.me/2020/10/the-var-space-hack-to-toggle-multiple-values-with-one-custom-property/)： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbbc2f4b686348cba0f9bc9b09e7ce97~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/JjbvoYE

关键代码：

```CSS
button { 
    --is-raised: ; /* off by default */ 
    border: 1px solid var(--is-raised, rgb(0 0 0 / 0.1)); 
    background: var( --is-raised, linear-gradient(hsl(0 0% 100% / 0.3), transparent) ) hsl(200 100% 50%); 
    box-shadow: var( --is-raised, 0 1px hsl(0 0% 100% / 0.8) inset, 0 0.1em 0.1em -0.1em rgb(0 0 0 / 0.2) ); 
    text-shadow: var(--is-raised, 0 -1px 1px rgb(0 0 0 / 0.3)); 
} 

button:hover { 
    --is-raised: initial; / turn on */ 
} 
```

根据前面介绍的，当 `--is-raised` 的值是个空字符串（`  ` ）时，`--is-raised` 是个有效值，那么： 

- `border` 的值是 `1px solid ;`（`solid` 后面有一个空格符），`border-color` 的值为 `currentColor`；  
- `background` 的就是 ` hsl(200 100% 50%);`（`hsl` 前面有一个空格符）； 
- `box-shadow` 和 `text-shadow` 的值是 `  ` （空格符），最终的值将是它们的初始值 `none` 。

`button` 在悬浮状态（ `:hover` ）时 `--is-raised` 的值是 `initial` ，这个时候 `--is-raised` 是一个保证无效值，对应的： 

- `border` 的值是 `1px solid rgb(0 0 0 / 0.1);` ，即 `--is-raised` 取了 `var()` 函数的回退值`rgb(0 0 0 / 0.1)` ； 
- `background` 的值是 `linear-gradient(hsl(0 0% 100% / 0.3), transparent) hsl(200 100% 50%)`，即 `--is-raised` 取了 `var()` 函数的回退值 `linear-gradient(hsl(0 0% 100% / 0.3), transparent)`；  
- `box-shadow` 的值是 `0 1px hsl(0 0% 100% / 0.8) inset, 0 0.1em 0.1em -0.1em rgb(0 0 0 / 0.2)`，即 `--is-raised` 取了 `var()` 函数的回退值 `0 1px hsl(0 0% 100% / 0.8) inset, 0 0.1em 0.1em -0.1em rgb(0 0 0 / 0.2)`； 
- `text-shadow` 的值是 `0 -1px 1px rgb(0 0 0 / 0.3)`，即 `--is-raised` 取了 `var()` 函数的回退值 `0 -1px 1px rgb(0 0 0 / 0.3)`。 

实现了两种 UI 效果，在同一个属性上对两个值做了切换。虽然效果出来了，但 `--is-raised: ;` 和 `--is-raised: initial;` 不易于阅读和理解。而且 `--is-raised` 的值是从`   ` （空格符）到 `initial` 切换的状态（即开（`ON`)和关（`OFF`））切换，这样的话，可以将上面的 Demo 改成下面这样：

```CSS
:root { 
    --ON: initial; 
    --OFF: ; 
} 

button { 
    --is-raised: var(--OFF); 
    border: 1px solid var(--is-raised, rgb(0 0 0 / 0.1)); 
    background: var( --is-raised, linear-gradient(hsl(0 0% 100% / 0.3), transparent) ) hsl(200 100% 50%); 
    box-shadow: var( --is-raised, 0 1px hsl(0 0% 100% / 0.8) inset, 0 0.1em 0.1em -0.1em rgb(0 0 0 / 0.2) ); 
    text-shadow: var(--is-raised, 0 -1px 1px rgb(0 0 0 / 0.3)); } button:hover { --is-raised: var(--ON); 
} 

button:active { 
    box-shadow: var(--is-raised, 0 1px 0.2em black inset); 
} 
```

> Demo 地址：https://codepen.io/airen/full/zYmrbQB

在我们实际开发中，除了 UI 效果的切换之外，还会有一些状态的切换，比如说 iOS 的暗黑模式（暗色和亮色的切换），Switch 的切换，或者说不同屏幕之下组件字号、间距切换等。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f252e3e9915464499abeacc507cc18a~tplv-k3u1fbpfcp-zoom-1.image)

以往像下面这样就可以实现两种皮肤色的 UI 效果： 

```CSS
.nav { 
    /* Dark */ 
    --dark-color: rgba(156, 163, 175, 1); 
    --dark-bgcolor: rgba(17, 24, 39, 1); 
    --dark-active-bgcolor: rgba(55, 65, 81, 1); 
    
    /* Light */ 
    --light-color: rgba(55, 65, 81, 1); 
    --light-bgcolor: rgba(243, 244, 246, 1); 
    --light-active-bgcolor: rgba(209, 213, 219, 1); 
    
    color: var(--dark-color); 
    background-color: var(--dark-bgcolor); 
} 

a.active, 
a:hover { 
    background-color: var(--dark-active-bgcolor); 
} 

.nav.light { 
    color: var(--light-color); 
    background-color: var(--light-bgcolor); 
} 

.nav.light a.active, 
.nav.light a:hover { 
    background-color: var(--light-active-bgcolor); 
} 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81694f906370464b860ca68675442306~tplv-k3u1fbpfcp-zoom-1.image)

如果我们换成今天所介绍的技术来完成的话，我们可以像下面这样改造：

```CSS
/* 设置切换开关 */ 
:root { 
    --ON: initial; 
    --OFF: ; 
} 

/* 默认为Dark */ 
.nav, 
.dark { 
    --light: var(--OFF); 
    --dark: var(--ON); 
} 

/* 默认为Light */ 
.light { 
    --light: var(--ON); 
    --dark: var(--OFF); 
} 
```

再回过头来看我们的示例，颜色有变化的主要是： 

| **主题**          | **`nav`** **背景色** | **`nav`** **文本色** | **`a`** **当前状态和悬浮状态背景色** |
| ----------------- | -------------------- | -------------------- | ------------------------------------ |
| **暗色（Dark）**  | `--dark-bgcolor`     | `--dark-color`       | `--dark-active-bgcolor`              |
| **亮色（Light）** | `--light-bgcolr`     | `--light-color`      | `--light-active-bgcolor`             |

将这些自定义属性和前面定义的开关结合起来运用到对应的 CSS 属性中：

```CSS
.nav { 
    color: var(--light, var(--light-color)) var(--dark, var(--dark-color)); 
    background-color: var(--light, var(--light-bgcolor)) var(--dark, var(--dark-bgcolor)); 
}
```

同样的方式对 `a` 链接悬浮（`:hover`）状态和当前状态（`.active`）调整样式： 

```CSS
a.active, 
a:hover { 
    background-color: var(--light, var(--light-active-bgcolor)) var(--dark, var(--dark-active-bgcolor)); 
}
```

整个的代码如下：

```CSS
.nav { 
    --dark-color: rgba(156, 163, 175, 1); 
    --dark-bgcolor: rgba(17, 24, 39, 1); 
    --dark-active-bgcolor: rgba(55, 65, 81, 1); 
    --light-color: rgba(55, 65, 81, 1); 
    --light-bgcolor: rgba(243, 244, 246, 1); 
    --light-active-bgcolor: rgba(209, 213, 219, 1); 
    
    color: var(--light, var(--light-color)) var(--dark, var(--dark-color)); 
    background-color: var(--light, var(--light-bgcolor)) var(--dark, var(--dark-bgcolor)); 
} 

a.active, 
a:hover { 
    background-color: var(--light, var(--light-active-bgcolor)) var(--dark, var(--dark-active-bgcolor)); 
} 

/* 设置切换开关 */ 
:root { 
    --ON: initial; 
    --OFF: ; 
} 

/* 默认为Dark */ 
.nav, 
.dark { 
    --light: var(--OFF); 
    --dark: var(--ON); 
} 

/* 默认为Light */ 
.light { 
    --light: var(--ON); 
    --dark: var(--OFF); 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cfcc21344ef9410c876729fd67e98675~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/WNarWGe

简单回顾一下，就拿 `color` 为例吧：

```CSS
.nav { 
    color: var(--light, var(--light-color)) var(--dark, var(--dark-color)); 
} 
```

当 `--light` 取值为 `var(--ON)` 且 `--dark` 取值为 `var(--OFF)` 时： 

- `--light` 是一个保证无效值，因此会取 `var()` 的回退值 `var(--light-color)` ，对应的就是 `rgba(55, 65, 81, 1)`； 
- `--dark` 是一个有效值，因此 `--dark` 会取一个空值`   ` 。

此时，`color` 的值就是 `color: rgba(55, 65, 81, 1) ;`（`)` 右括号后面有一个空格符）。 

当 `--light` 取值为 `var(--OFF)` 且 `--dark` 取值为 `var(--ON)` 时： 

- `--light` 是一个有效值，此时 `--light` 会取一个空值`    ` ；
- `--dark` 是一个保证无效值，因此会取 `var()` 的回退值 `var(--dark-color)`，对应的就是 `rgba(156, 163, 175, 1)`。 

此时，`color` 的值就是 `color: rgba(156, 163, 175, 1);`（`r`字母前面有一个空格）。 

接着我们使用同样的方式来实现三种值的切换。

```CSS
.nav { 
    /* Dark */ 
    --dark-color: rgba(156, 163, 175, 1); 
    --dark-bgcolor: rgba(17, 24, 39, 1); 
    --dark-active-bgcolor: rgba(55, 65, 81, 1); 
    
    /* Light */ 
    --light-color: rgba(55, 65, 81, 1); 
    --light-bgcolor: rgba(243, 244, 246, 1); 
    --light-active-bgcolor: rgba(209, 213, 219, 1); 
    
    /* Blue */ 
    --blue-color: rgba(165, 180, 252, 1); 
    --blue-bgcolor: rgba(49, 46, 129, 1); 
    --blue-active-bgcolor: rgba(67, 56, 202, 1); 
    
    color: var(--light, var(--light-color)) var(--dark, var(--dark-color)) var(--blue, var(--blue-color)); 
    background-color: var(--light, var(--light-bgcolor)) var(--dark, var(--dark-bgcolor)) var(--blue, var(--blue-bgcolor)); 
} 

a.active, a:hover { 
    background-color: var(--light, var(--light-active-bgcolor)) var(--dark, var(--dark-active-bgcolor)) var(--blue, var(--blug-active-bgcolor)); 
} 

/* 设置切换开关 */ 
:root { 
    --ON: initial; 
    --OFF: ; 
} 

/* 默认为Dark */ 
.dark { 
    --light: var(--OFF); 
    --dark: var(--ON); 
    --blue: var(--OFF); 
} 

/* 默认为Light */ 
.light { 
    --light: var(--ON); 
    --dark: var(--OFF); 
    --blue: var(--OFF); 
} 

/* 默认为Blue */ 
.blue { 
    --light: var(--OFF); 
    --dark: var(--OFF); 
    --blue: var(--ON); 
 } 
```

你将看到效果如下：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f77d40441d643c3acff223422ff1687~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/bGmEJOV

在上面的示例上，稍微调整一下，就可以让用户选择自己需要的颜色，然后让导航根据用户的选择切换颜色： 

```CSS
label.dark { 
    background-color: var(--dark-bgcolor); 
} 

label.light { 
    background-color: var(--light-bgcolor); 
} 

label.blue { 
    background-color: var(--blue-bgcolor); 
} 

#dark:checked ~ div .dark , 
#light:checked ~ div .light , 
#blue:checked ~ div .blue { 
    box-shadow: 0 0 0 3px #2196f3; 
} 

.nav { 
    color: var(--light, var(--light-color)) var(--dark, var(--dark-color)) var(--blue, var(--blue-color)); 
    background-color: var(--light, var(--light-bgcolor)) var(--dark, var(--dark-bgcolor)) var(--blue, var(--blue-bgcolor)); 
} 

a.active, a:hover { 
    background-color: var(--light, var(--light-active-bgcolor)) var(--dark, var(--dark-active-bgcolor)) var(--blue, var(--blue-active-bgcolor)); 
} 

/* 设置切换开关 */ 
:root { 
    --ON: initial; 
    --OFF: ; 
    
    /* Dark */ 
    --dark-color: rgba(156, 163, 175, 1); 
    --dark-bgcolor: rgba(17, 24, 39, 1); 
    --dark-active-bgcolor: rgba(55, 65, 81, 1); 
    
    /* Light */ 
    --light-color: rgba(55, 65, 81, 1); 
    --light-bgcolor: rgba(243, 244, 246, 1); 
    --light-active-bgcolor: rgba(209, 213, 219, 1); 
    
    /* Blue */ 
    --blue-color: rgba(165, 180, 252, 1); 
    --blue-bgcolor: rgba(49, 46, 129, 1); 
    --blue-active-bgcolor: rgba(67, 56, 202, 1); 
} 

#dark:checked ~ .nav { 
    --light: var(--OFF); 
    --dark: var(--ON); 
    --blue: var(--OFF); 
} 

#light:checked ~ .nav { 
    --light: var(--ON); 
    --dark: var(--OFF); 
    --blue: var(--OFF); 
} 

#blue:checked ~ .nav { 
    --light: var(--OFF); 
    --dark: var(--OFF); 
    --blue: var(--ON); 
} 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f258c80f94044f548dfd255e80ebc748~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/eYPJooG

再来看一个示例，使用该方法来实现 Switch 按钮效果：

```CSS
:root { 
    --ON: initial; 
    --OFF: ; 
} 

.switch { 
    --checked-bg-color: #4cd964; 
    --checked-color: #fff; 
    --unchecked-color: rgba(0, 0, 0, 0.2); 
    --unchecked-bg-color: #ff3b30; 
    
    background: var(--checked, var(--checked-bg-color)) var(--unchecked, var(--unchecked-bg-color)); 
    color: var(--unchecked-color); 
 } 
 
 #no:checked ~ .switch { 
     --checked: var(--OFF); 
     --unchecked: var(--ON); 
} 

#yes:checked ~ .switch { 
    --checked: var(--ON); 
    --unchecked: var(--OFF); 
} 

#yes:checked ~ .switch label[for="yes"], 
#no:checked ~ .switch label[for="no"] { 
    color: var(--checked-color); 
} 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/770f13978a6c47f995eafa38b083a76a~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/BaqjEgN

### 零和非零值之间的切换

前面我们花了很长的篇幅向大家介绍了自定义属性如何有效使用无效变量。事实上，它最终还是归于 `ON` 和 `OFF` 这样的切换。它们之间的切换与其他程序中的 `1` （真）和 `0` （假）之间的切换是非常相似的。将该原理用于 CSS 属性上的切换的话，那就是从开关的切换，从 `0` （关）的状态切换到非零（开），比如 `1` 的状态。

就拿 [@Ana 在 2017 年写的一个阴阳旋转的动效为例](https://codepen.io/thebabydino/full/aJPMre)：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76c0dc46ff3a4660a7f955c28a90ee7b~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/thebabydino/full/aJPMre ，详细制作过程，请参阅 @Ana 的《[Creating Yin and Yang Loaders On the Web](https://css-tricks.com/creating-yin-yang-loaders-web/)》教程。

实现这个效果基于一个 `div` 元素和两个伪元素 `::before`、`::after`。 

```HTML
<div class="sym"></div>
```

对应的 CSS 代码很简单： 

```SCSS
$d: 65vmin; 
$f: .5; 
$t: 1s; 

.sym { 
    position: relative; 
    width: $d; 
    height: $d; 
    border-radius: 50%; 
    background: linear-gradient(white 50%, black 0); 
    animation: r 2*$t linear infinite; 
    
    &::before, &::after { 
        --i: 0; 
        
        // 最为关键的一部分 
        position: absolute; 
        top: 25%; 
        right: calc((1 - var(--i)) * 50%); 
        bottom: 25%; left: calc(var(--i) * 50%); 
        border: solid $d/6 hsl(0, 0%, calc(var(--i) * 100%)); 
        transform-origin: calc(var(--i) * 100%) 50%; 
        transform: scale($f); 
        background: hsl(0, 0%, calc((1 - var(--i)) * 100%)); 
        border-radius: 50%; 
        animation: s $t ease-in-out calc(var(--i)*#{-$t}) infinite alternate; 
        content: '' 
    } 
    
    &:after { 
        --i: 1; // 重置为1 
    } 
} 

@keyframes s { 
    to { 
        transform: scale(2 - $f) 
    } 
} 

@keyframes r { 
    to { 
        transform: rotate(1turn) 
    } 
} 
```

> 注意，这段代码是 SCSS （也称 Sass） 代码，CSS 常见处理器之一。

示例中，我们有一个 CSS自定义属性 `--i`，它的值在 `1` 和 `0` 之间进行切换。

也就是说，如果我们想让 CSS 属性的值在关闭（`--i:0`）和打开（`--i:1`）之间进行切换，那么就要使用开关值 `var(--i)` 乘以它。比如，假设角度值是 `30deg`，这是一个非零值，那么它们开关切换对应的值应该是： 

- 当开关切换到关闭状态，即 `--i:0`，那么对应的值，使用 `calc()` 计算可得：`calc(var(--i) * 30deg)` ，即 `0 * 30deg = 0deg` ；
- 当开关切换到打开状态，即 `--i:1`，那么对应的值是 `calc(var(--i) * 30deg)`，即 `1 * 30deg = 30deg` 。

然后，我们想把上面的状态做一个切换： **开关在关闭状态（****`--i:0`****）时，其值是一个非零的值，而在开关打开状态（****`--i:1`****），对应的值是一个** **`0`** **值。我们只需要这样做即可：**`calc(1 - var(--i))` **值再乘以其值**。 

同样的，角度值 `30deg` 对应的零和非零值就成下面这样了： 

- 当开关切换到关闭状态，即 `--i:0` ，那么对应的值是 `calc( (1 - var(--i)) * 30deg)` ，即 `(1 - 0) * 30deg = 30deg`；  
- 当开关切换到打开状态，即 `--i:1` ，那么对应的值是 `calc((1 - var(--i)) * 30deg)` ，即 `(1 - 1) * 30deg = 0deg`。  

用下图来说明这个概念，可能会更清晰一些：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a75d45ba6c2447748fbae298b8081c87~tplv-k3u1fbpfcp-zoom-1.image)

就上面的动画示例，阴阳图就两个颜色，非白即黑，和色相以及饱和度无关。也就是说它们是在黑和白之间切换，即亮度在 `0%` 和 `100%` 之间的切换： 

- 当开关处于关闭状态（`--i:0`），那么亮度的值为 `calc(1 - var(--i) * 100%)` ，即 `calc((1 - 0) * 100%) = 100%` ，颜色为白色； 
- 当开关处于打开状态（`--i:1`），那么亮度的值为 `calc(1 - var(--i) * 100%)` ，即 `calc((1 - 1) * 100%) = 0%`，颜色为黑色 。

对于 `background-color`、`left`、`right` 和 `animation-delay` 属性，我们可以使用同样的原理来做计算。实现零和非零值的切换。 

### 两个非零值之间的切换

利用同样的原理，我们还可以在**两个非零值之间进行切换**。比如，我们希望一个元素的 `background-color` 在：

- 开关关闭状态时（`--i:0`）是 `#ccc` 颜色；
- 开关打开状态时（`--i:1`）是 `#f90` 颜色。 

我们要做的第一件事是从十六进制颜色换到 `rgb()` 或 `hsl()`。因为在 CSS 中，十六进制的颜色是无法通过 `calc()` 函数来计算的，所以建议采用 `rgb()` 或 `hsl()` 的方式来进行管理。我个人更趋向于使用 `hsl()` 这种格式来管理你的颜色。 

因此，我们使用以下函数提取 `hsl()` 的三个参数值（新语法它包含四个值，但这里不阐述，超出我们这节课的范围），这些参数等价于我们的两个值（关闭状态 `$c0: #ccc` ，打开状态 `$c1: #f90`）： 

```SCSS
$c0: #ccc; // 关闭状态的值 
$c1: #f90; // 打开状态的值 

$h0: round(hue($c0) / 1deg); 
$s0: round(saturation($c0)); 
$l0: round(lightness($c0)); 

$h1: round(hue($c1) / 1deg); 
$s1: round(saturation($c1)); 
$l1: round(lightness($c1)); 
```

> 注意，上面的代码中运用了 Sass 中的一些函数，这里不做相关阐述。

 

根据开关的切换，我们可以得到： 

- 当开关关闭时（`--i:0`），`background` 值是 `hsl($h0, $s0, $l0)`； 
- 当开关打开时（`--i:1`），`background` 值是 `hsl($h1, $s1, $l1)`。 

我们可以把两个背景写成： 

- 当开关关闭时（`--i:0`），`background` 值是 `hsl(1*$h0 + 0*$h1, 1*$s0 + 0*$s1, 1*$l0 + 1*$l1)`； 
- 当开关打开时（`--i:1`），`background` 值是 `hsl(0*$h0 + 1*$h1, 0*$s0 + 1*$s1, 0*$l0 + 1*$l1)`。 

使用自定义属性 `--i` 进行切换，可以将 `background` 统一起来：

```SCSS
.element {
     --j: calc(1 - var(--i)); /* 根据 --i 的0 和 1 之间切换，--j 也会在0 和 1 之间切换 */
     
     background: hsl(
         calc(var(--j) * #{$h0} + var(--i) * #{$h1}), /* hsl() 中的 h 值*/
         calc(var(--j) * #{$s0} + var(--i) * #{$s1}), /* hsl() 中的 s 值*/
         calc(var(--j) * #{$l0} + var(--i) * #{$l1})  /* hsl() 中的 l 值*/
     );  
}
```

这里使用了另一个自定义属性 `--j`，来表示 `--i` 的余值。

- 当 `--i` 为 `0` 时，`--j` 为 `1`；
- 当 `--i` 为 `1` 时，`--j` 为 `0`。

同样用下图来向大家展示，两个非零值（`#ccc` 和 `#f90`）之间根据开关状态进行切换： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/adf25d480f63464184ebec6a66896364~tplv-k3u1fbpfcp-zoom-1.image)

类似地，在其他一些属性上也可以使用相似的计算公式。比如 `font-size` 的值在 `2rem`（开关关闭时 `--i:0`）和 `10vw`（开关打开时 `--i:1`）进行切换：

```CSS
.element {
     font-size: calc((1 - var(--i)) * 2rem + var(--i) * 10vw) 
}
```

相应的效果如下图所示： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb2bc89e65454c4f99e05c9c86b47b90~tplv-k3u1fbpfcp-zoom-1.image)

来看一个综合示例。接下来这个示例中有五张卡片，每个卡片对应的是一个 `div`，给它一个类名 `.card`。通过一些基本样式，让每张卡片看上去好看一点。

```CSS
.card {
    box-sizing: border-box;
    margin: 2em auto;
    border: 2px solid #f90;
    padding: .75em;
    max-width: 35rem;
    width: 80%;
    font: 900 1.25em 'segoe script', 'comic sans ms', cursive;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90dd9747aa844d4dbddc33b120dac08d~tplv-k3u1fbpfcp-zoom-1.image)

使用CSS Counters（计数器）给每张卡片添加序列号：

```CSS
.card { 
    counter-increment: count; 
}

.card::before { 
    content: counter(count, decimal-leading-zero); 
}
```

使用 CSS Flexbox 来布局，让卡片的序列号和卡片内容垂直居中：

```CSS
.card { 
    display: flex; 
    align-items: center; 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d791baba6294f73bb75d9054a50c557~tplv-k3u1fbpfcp-zoom-1.image)

我们来设置第一个开关 `--i`。用来改变偶数卡片上数字的位置： 

```CSS
.card { 
    /** 设置数字区域顺序的开关 
     * --i = 0, 开关关闭，数字区域的顺序 order=0 
     * --i = 1, 开关打开，数字区域的顺序 order=1 */
    
    --i: 0; 
}

.card::before { 
    order: var(--i); 
} 

.card:nth-child(2n) { 
    --i: 1; 
} 
```

为了让数字区域和文本内容有点间距，我们添加一个变量 `--gap`。然后在 `.card::before` 上设置 `margin` 的值等于这个变量。奇数卡片数字区域居左，所以对应的是 `margin-right: var(--gap)`；而偶数卡片数字区域居中，所以对应的是 `margin-left: var(--gap)`。

不管是 `margin-left` 还是 `margin-right`，它们的值都是一个非零的值。如果我们要使用开关来进行切换，那应该对应的是前面所学的——两个非零值的切换。这里我们同样引入 `--i` 这个开关： 

- 开关关闭 `--i:0`，`margin-left = calc(var(--i) * var(--gap)) = 0 * var(--gap) = 0` ， `margin-right = calc((1 - var(--i)) * var(--gap)) = 1 * var(--gap) = var(--gap)`； 
- 开关打开 `--i:1`，`margin-left = calc(var(--i) * var(--gap) = 1 * var(--gap) = var(--gap)` ， `margin-right = calc((1 - var(--i)) * var(--gap)) = 0 * var(--gap) = 0`。 

这样一来，对应的数字区域的 `margin-left` 和 `margin-right` 可以轻松进行切换：

```CSS
.card { 
    --gap:.75em; 
}

.card::before { 
    margin-left: calc(var(--i) * var(--gap)); 
    margin-right: calc((1 - var(--i)) * var(--gap)); 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c13924eb0f54b39a858c01bbea8508f~tplv-k3u1fbpfcp-zoom-1.image)

如果有多个地方要使用到这个互补值(`1 - var(--i)`)，那么可以重新再定义一个开关：`--j`，其值为 `calc(1 - var(--i))`。这样一来，上面代码可以修改成： 

```CSS
.card { 
    /* 设置关开 --i --i: 0; 
     * 当 --i = 0 => --j = 1 
     * 当 --i = 1 => --j = 0  
     */
    
    --j: calc(1 - var(--i));    
}

.card:nth-child(2n) { 
    --i: 1; 
} 

.card::before { 
    /** 
     * --i等于0，开关关闭，数字的顺序为 order=0 
     * --i等于1，开关打开，数字的顺序为 order=1 
     */
    
    order: var(--i); 
    
    /** 
     * 当 --i = 0 => margin-left = 0; --j = 1; margin-right = var(--gap) 
     * 当 --i = 1 => margin-left = var(--gap); --j = 0; margin-right = 0 
     */
    margin-left: calc(var(--i) * var(--gap)); 
    margin-right: calc(var(--j) * var(--gap)); 
}  
```

接下来希望卡片有个背景颜色，比如说是一个灰色（`#ccc` ）到橙色（`#f90`）的渐变颜色。同样的，奇数卡片渐变色是从左到右（`#ccc => #f90`），而偶数卡片是从右到左（`#f90 <= #ccc`）。同样是方向有一个切换。即 **渐变颜色都是灰色到橙色，只不过奇数卡片是 `to right`，而偶数卡片是 `to left`**。

在 CSS 的渐变中，对于 `to right` 对应的刚好是 `90deg`，反之，`to left` 对应的是 `-90deg`。如此一来，我们也可以借助 `--i` 这个开关来进行切换： 

- `--i:0`，开关关闭，渐变色 `#ccc` 到 `#f90` 是 `to right`（也就是 `90deg`）； 
- `--i:1`，开关打开，渐变色 `#ccc` 到 `#f90` 是 `to left`（也就是 `-90deg`）。 

一个是正 `90deg`，另一个是负`90deg`，也就是说它们的绝对值是相同的，都是 `90deg`。前面也提到过了，在 CSS 中没有 `power()` 这样的函数，所以我们要额外去做一个计算： 

- `--i:0`，奇数卡片，要做的是 `+1`； 
- `--i:1`，偶数卡片，要做的却是 `-1`。 

根据前面所学，我们可以设置另外一个开关来做这件事：

```CSS
.card {
    /** 
     * --i = 0 => 1 - 2 * 0 = 1 - 0 = 1 
     * --i = 1 => 1 - 2 * 1 = 1 - 2 = -1 
     */
    
    --s: calc(1 - 2 * var(--i)); 
}
```

有了这个公式，渐变颜色的 `90deg` 和 `-90deg` 就很好控制了：

```CSS
.card { 
    /** --i = 0 => 1 - 2 * 0 = 1 - 0 = 1 
     * --i = 1 => 1 - 2 * 1 = 1 - 2 = -1 
     */
     
    --s: calc(1 - 2 * var(--i)); 
    
    /* 给渐变色设置一个自定义属性 */
    --color-list: #ccc, #f90; 
    background:linear-gradient( calc(var(--s) * 90deg), var(--color-list) ) 
} 
```

如果把前面 `border` 样式注释掉，现在看到的效果如下： 

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef9d307cb00b4f9eab56bae0751c7803~tplv-k3u1fbpfcp-zoom-1.image)

接下来，再给卡片添加一点 `transform` 样式： 

- 奇数卡片：`translate(10%) rotate(5deg)`； 
- 偶数卡片：`translate(-10%) rotate(-5deg)`。 

这个和渐变实现方式是一样的： 

```CSS
.card { 
    transform: translate(calc(var(--s) * 10%)) rotate(calc(var(--s) * 5deg)); 
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef371aeadd8247d48c39691b132c7579~tplv-k3u1fbpfcp-zoom-1.image)

接着我们再给卡片添加圆角。同样的奇数卡片圆角在左边，偶数卡片圆角在右侧。只不过这里有一个小细节，由于我们并无法知道卡片的内容是多少，从而也无法确认卡片的高度是多少，如果圆角的半径想设置为卡片高度的一半，这无形之中是一个较大的难度，甚至是无法确定的值。所以这里的方案是给圆角预设一个较大的值，比如 `50vh`。

```CSS
.card { 
    --r: 50vh; 
    
    /** 
     * --i = 0 => --j = 1, --r0 = --r, --r1 = 0 
     * --i = 1 => --j = 0, --r0 = 0, --r1 = --r 
     */
    
    --r0: calc(var(--j) * var(--r)); 
    --r1: calc(var(--i) * var(--r)); 
    
    border-radius: var(--r0) var(--r1) var(--r1) var(--r0); 
} 
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7bfe84dc388940948b86c01b8679518d~tplv-k3u1fbpfcp-zoom-1.image)

到这一步可以看到一定的效果了。但上面涉及到的都是与数值之间的计算。接着来一些不是数值之间的切换。比如， `text-align` 属性，奇数卡片文本右对齐 `text-align:right`，偶数卡片文本左对齐 `text-align:left`。

对于 `text-align` 这样的属性而言，和前面提到的属性都不一样，它的有效值都是一些关键词，比如 `left`、`right` 等。因此，在这里没有办法使用一些数学计算的技巧来帮助我们。 

但幸运的是，我们可以使用 CSS 自定义属性另一个特性，在调用 CSS 自定义属性时设置一个回退值，关于这一点，前面也提到过。如果你没有任何印象的话，建议你重新回到前面的内容温故一下。

为了`text-align` 能根据不同的卡片（奇偶性）实现 `left` 和 `right` 之间的切换，我们新增一个自定义属性 `--p`。在偶数卡片中将其设置为 `1`。有一点不同之处，`--p` 不会像 `--i` 一样，显式设置一个值，因为我们希望这个变量的不同回退值用于不同的属性。 

至于 `--i`，我们也要略做一下调整，将其值设置为 `var(--p, 0)`，其中 `0` 作为 `--i` 的回退值。这个 `0` 是在一般情况下使用的值，因为我们从没有显式地设置 `--p` 的值。在这个示例中，只有偶数卡片中显式设置了 `--p` 的值为 `1`。

与此同时，`text-align` 的被设置为 `var(--p, right)`，其中回退值为 `right`。此时，对于偶数卡片时，`--p` 的值为 `1`，而这个 `1` 对于 `text-align` 属性又是一个无效值，因此这个时候 `text-align` 会是初始值，即 `left`。

回过头来看奇数卡片，`text-align: var(--p, right)`，因为在奇数卡片中没有显式设置 `--p` 值，所以这个时候会采用自定义属性的回退值，即 `right`。从而达到我们所要的目的：**奇数卡片文本右对齐，偶数卡片文本左对方**！ 

```CSS
.card { 
    --i: var(--p, 0); 
    text-align: var(--p, right); 
}

.card:nth-child(2n) { 
    --p: 1;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc2d8f76eac5460d936d2bb4d9d9d67b~tplv-k3u1fbpfcp-zoom-1.image)

最后再添加一点响应式主面的功能。对于宽屏，上面的效果已经 OK 了，现在我们需要给窄屏下的卡片添加一点样式，让其看起来好看一些： 

- 窄屏下去掉卡片圆角效果，即 `border-radius` 重置为 `0`； 
- 窄屏下，卡片不做任何位移和旋转，需重置 `transform` 的值； 
- 窄屏下，卡片区中数字顺序 `order` 和外距 `margin` 的重置； 
- 窄屏布局不是横排，变成竖排，即 `flex-direction` 由  `row` 变成 `column`； 
- 窄屏下，卡片文本内容字号的调整。 

为了完成这个效果，重新引入另外两个开关（CSS 自定义属性）`--wide` 和 `--k`，主要用于宽屏和窄屏之间的切换： 

```CSS
.card { 
    /* 宽屏和窄屏的切换 */
    --k: var(--wide, 0); 
}

@media (min-width: 440px) { 
    .card {
        --wide: 1 
    }
 }  
```

宽屏和窄屏时，卡片的 `border-radius` 会有所调整，也就是说 `--k` 会影响 `--r0` 和 `--r1` 的值：

```CSS
.card { 
    --r0: calc(var(--k) * var(--j) * var(--r)); 
    --r1: calc(var(--k) * var(--i) * var(--r)); 
} 
```

接着把 `transform` 和 `flex-direction` 等属性的值，也根据 `--k` 和 `--wide` 开关来做相应的切换：

```CSS
.card { 
    transform: translate(calc(var(--k) * var(--s) * 10%)) rotate(calc(var(--k) * var(--s) * 5deg)); 
    flex-direction: var(--wide, column); 
    font: 900 calc(var(--k) * .5em + .75em) 'segoe script', 'comic sans ms', cursive;
} 

.card::before { 
    order: calc(var(--k) * var(--i)); 
    margin-left: calc(var(--k) * var(--i) * var(--gap)); 
    margin-right: calc(var(--k) * var(--j) * var(--gap)); 
}
```

最终代码如下：

```CSS
.card {
    --gap: .75em;
    --r: 50vh;
    --i: var(--p, 0);
    --j: calc(1 - var(--i));
    --s: calc(1 - 2 * var(--i));
    --color-list: #ccc, #f90;
    --k: var(--wide, 0);
    --r0: calc(var(--k) * var(--j) * var(--r));
    --r1: calc(var(--k) * var(--i) * var(--r));
    --k: var(--wide, 0);
  
    box-sizing: border-box;
    margin: 2em auto;
    padding: 0.75em;
    max-width: 35rem;
    width: 80%;
    counter-increment: count;
    display: flex;
    align-items: center;
  
    background: linear-gradient(calc(var(--s) * 90deg), var(--color-list));
    transform: translate(calc(var(--k) * var(--s) * 10%)) rotate(calc(var(--k) * var(--s) * 5deg));
    flex-direction: var(--wide, column);
    font: 900 calc(var(--k) * .5em + .75em) 'segoe script', 'comic sans ms', cursive;
    border-radius: var(--r0) var(--r1) var(--r1) var(--r0);
    text-align: var(--p, right);
}

.card:nth-child(2n) {
    --p: 1;
}

.card::before {
    font-size: 2em;
    content: counter(count, decimal-leading-zero);
    
    order: calc(var(--k) * var(--i));
    margin-left: calc(var(--k) * var(--i) * var(--gap));
    margin-right: calc(var(--k) * var(--j) * var(--gap));
}

@media (min-width: 440px) {
    .card {
        --wide: 1 ;
    }
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/def24cdbcf294644b57b0310bd32a7d7~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/vYVGyrO

类似这样的技术实现的 Demo 效果还有很多。[@Ana Tudor 在 Codepen上有一个 Demo 集合](https://codepen.io/collection/DjmdjQ/)，感兴趣的同学可以自己去查看每个 Demo 的源码。

> 需要特别声明一点，如果你的 CSS 代码中不需要运用到一些三角函数功能，比如 `sin()` 、`cos()` 或随机函数 `round()` ，那么代码中的 SCSS （或 Sass）变量，完全可以使用 CSS 自定义属性替代。

通过 CSS 自定义属性，给 CSS 的属性值做开关切换，即**零和非零，两个非零值的切换，甚至采用 CSS 自定义属性中的回退值和 CSS 属性的无效属性值的结合**，还能做出一些更有意义的事情。

这样的特性是强大的，但也是费神的，对于初次接触的同学而言，这里面的内容是有一定难度的。但慢慢细读下来，其实也是非常的简单，无外乎涉及到一点点简单的数学运算。但有一点要知道，你必须对 CSS 的自定义属性有所了解以及对 CSS 的属性值有深入的理解。

额外再提一点，CSS 自定义属性除了可以使 CSS 具备 `if ... else ...` 能力之外，还可以使 CSS 具备其他的一些逻辑运算能力，比如与（`and`）、或（`or`）、非（`not`）以及一些三角函数的能力，比如 `abs()`、`sign()`、`round()` 和 `mod()` 等。我们可以使用这些特性，构建一些超炫特酷的效果：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7d23e3c4cc1440ba5810dec2a125418~tplv-k3u1fbpfcp-zoom-1.image)

这些知识已然超出本节课的范畴，如果你感兴趣的话，可以花一些时间阅读下面这些相关的教程：

- [DRY Switching with CSS Variables: The Difference of One Declaration](https://css-tricks.com/dry-switching-with-css-variables-the-difference-of-one-declaration/)
- [DRY State Switching With CSS Variables: Fallbacks and Invalid Values](https://css-tricks.com/dry-state-switching-with-css-variables-fallbacks-and-invalid-values/)
- [Logical Operations with CSS Variables](https://css-tricks.com/logical-operations-with-css-variables/)
- [Using Absolute Value, Sign, Rounding and Modulo in CSS Today](https://css-tricks.com/using-absolute-value-sign-rounding-and-modulo-in-css-today/)

### 其他具有条件化的 CSS 属性

正如前面所述，CSS 自定义属性是类似于 `if ... else ...` 能力（条件化 CSS 能力）的。其实，在 CSS 中除了自定义属性之外，还有一些属性也是备类条件化能力的。比如：

- `flex-wrap` ，当其取值为 `wrap` 或 `wrap-reverse` 时，允许 Flex 项目在没有足够空间的情况下换行至新行；
- `flex` 也可以有条件地使用，允许 Flex 项目根据容器空间来自动调整自身尺寸；
- CSS Grid 布局中的 RAM 技术，即 `repeat()` 、`minmax()` 、`auto-fit` 或 `auto-fill` ，也可以有条件地使用。

我们曾在在小册第二节课《[Flexbox 和 Grid 中的换行](https://juejin.cn/book/7199571709102391328/section/7199571708838150155)》中对 `flex-wrap` 和 RAM 技术有过详细的阐述，这里就不再重复介绍了。

这里来看一个 `flex-wrap` 和 `flex` 结合的示例。假设有下图这样的一个卡片（Card）组件：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/650cd822b6534cb293504e8140dd8660~tplv-k3u1fbpfcp-zoom-1.image)

```CSS
.card {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
}

.card img {
    max-width: 60px;
    aspect-ratio: 1;
    flex-shrink: 0;
}

.card h3 {
    flex-grow: 1;
    flex-basis: 370px;
    min-width: 0;
}

button {
    margin-left: auto;
    flex-shrink: 0;
}
```

当容器没有足够多的空间时，由于 `flex-wrap` 的值为 `wrap` ，Flex 项目会随着容器空间变小而换行。要是配合一下容器查询 `@container` ，卡片布局效果会更好一些：

```CSS
.card--container {
    container-type: inline-size;
}

@container (width < 440px){
    .card {
        justify-content: center;
    }
  
    button {
        margin-left: auto;
        margin-right: auto;
    }
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf5e0a6c33b44c0db9f69aea023e60cd~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/XWxdNvG

## 条件化 CSS：CSS 比较函数

上面我们主要围绕着具备条件化能力的 CSS 相关属性展开探讨，其实还有一些属性值也是具有条件化能力的。比如我们在 《[易碎的容器盒子：避免使用固定尺寸和长内容设置](https://juejin.cn/book/7199571709102391328/section/7199846286953512972)》一节课中提到的 CSS 比较函数和 CSS 内在尺寸，它们也可以使 CSS 具备条件化能力。

我们先来看 CSS 的比较函数。

CSS 的比较函数主要有 `min()` 、`max()` 和 `clamp()` ，它们可以使 CSS 属性具备条件化能力（可以接受比函数为值的 CSS 属性）。比如 `width` 、`height` 和 `border-radius` 等。就拿下面这个示例来说：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80691f9c65dc446096a2f6f48e3cf512~tplv-k3u1fbpfcp-zoom-1.image)

在一些设计方案中，圆角半径（`border-radius`）很大，但希望在移动端上更小一些。桌面端（宽屏）中卡片的圆角 `border-radius` 是 `8px`，移动端（窄屏）是 `0`。以往你可能是这样来写： 

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

使用 CSS 容器查询的话，你可以像下面这样编写代码：

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
        var(--radius) * 1000, 
        var(--max-radius) ); 
} 

div { 
    border-radius: var(--responsive-radius, 0); 
}
```

你也可以将 `min()` 和 `max()` 组合起来一起使用，达到 `clamp()` 相似的功能，即 `clamp(MIN, VAL, MAX)` 等同于 `max(MIN, min(VAL, MAX))` 。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/452c2fd23aa8443287b1bf096108ef37~tplv-k3u1fbpfcp-zoom-1.image)

> **注意，`min()`、`max()`** **函数中可以直接进行四则运算，不需要使用** **`calc()`** **函数。** 

```CSS
.box { 
    --min-radius: 0px; 
    --max-radius: 8px; 
    --ideal-radius: 4px; 
    border-radius: max( var(--min-radius), min(var(--max-radius), (100vw - var(--ideal-radius) - 100%) * 9999) ); 
}
```

使用 CSS 比较函数使 CSS 具有条件化的另一个有趣用例，即**根据项目是否换行，改变分隔符的方向和大小**。例如大屏幕下分隔线是条竖线，位于两项目水平方向之间：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f56e4de7ff944209475229ce790234a~tplv-k3u1fbpfcp-zoom-1.image)

在小屏幕的时候，分隔线变成一条横线，位于两项目垂直方向之间：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46e93903073442cd85f5be98dbf30b60~tplv-k3u1fbpfcp-zoom-1.image)

我们通过使用 `flex-wrap` 和 `clamp()` 可以实现这一点。

```CSS
.container {
    --breakpoint: 640px;
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
    justify-content: center;
}

.container:before {
    content: "";
    border: 2px solid lightgrey;
    width: clamp(0px, (var(--breakpoint) - 100%) * 999, 100%);
    border-image: linear-gradient(45deg, #3f51b5, #cddc39) 2;
    border-radius: 2px;
}

.section:nth-child(1) {
    order: -1;
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c39696b139a47f48fe086b23733a354~tplv-k3u1fbpfcp-zoom-1.image)

> Demo 地址：https://codepen.io/airen/full/PoyNWjO

## 条件化 CSS：内在尺寸

可以使 CSS 具备条件化能力的 CSS 属性值，除了 CSS 比较函数之外，还有 CSS 的内在尺寸，尤其是 `fit-content` 属性值。因为， `fit-content` 会检查可用空间（**`fill-available`**）与 `max-content` 和 `min-content` 大小，最后决定 `width` 取值：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb28fd9b151d4bd6a4dffd243bd3aa36~tplv-k3u1fbpfcp-zoom-1.image)

另外，从本质上讲，`fit-content` 是以下内容的简写模式：

```CSS
.box {
    width: fit-content;
}

/* 等同于 */
.box {
    width: auto;
    min-width: min-content;
    max-width: max-content;
}
```

## 小结

结合上一节课《[条件 CSS 之 @ 规则和 CSS 选择器](https://juejin.cn/book/7199571709102391328/section/7199845944760729632)》所介绍的内容，关于条件 CSS 就算全部介绍完了。就我个人而言，CSS 是具有超强能力的，因为它通过其条件功能使我能够做出许多更好的决策，这一方面甚至是比设计软件还要更强大。

另外，通过 CSS 创建条件规则是 CSS 强大特性之一，也是它脱颖而出的地方，使其在 Web 开发中非常强大。正如我们在课程中所介绍的那样，这使我们编写的 CSS 代码更具防御性，开发出来的 Web 应用或页面灵活性、适配性更强，不易于被动态输出的内容打破 Web 的布局，甚至是直接影响 Web UI 的美观以及用户的体验。