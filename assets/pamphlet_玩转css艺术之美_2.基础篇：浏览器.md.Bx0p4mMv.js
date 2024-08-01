import{_ as e,c as o,o as s,a2 as a}from"./chunks/framework.D8Prfz4N.js";const u=JSON.parse('{"title":"2.基础篇：浏览器","description":"","frontmatter":{},"headers":[],"relativePath":"pamphlet/玩转css艺术之美/2.基础篇：浏览器.md","filePath":"pamphlet/玩转css艺术之美/2.基础篇：浏览器.md"}'),c={name:"pamphlet/玩转css艺术之美/2.基础篇：浏览器.md"},n=a(`<h1 id="_2-基础篇-浏览器" tabindex="-1">2.基础篇：浏览器 <a class="header-anchor" href="#_2-基础篇-浏览器" aria-label="Permalink to &quot;2.基础篇：浏览器&quot;">​</a></h1><h3 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h3><p>在学习<strong>CSS神操作骚技巧</strong>前，笔者会用几章内容讲解CSS的一些基础知识和核心原理，毕竟打下扎实的基本功才能把CSS玩得游刃有余。谈到CSS，就会想到兼容性，想到兼容性就会涉及到浏览器，浏览器是一切CSS的运行环境。</p><h3 id="浏览器" tabindex="-1">浏览器 <a class="header-anchor" href="#浏览器" aria-label="Permalink to &quot;浏览器&quot;">​</a></h3><p>浏览器这家伙是前端开发者每天都打交道的工具，正是它，才有了前端这个职业。<strong>浏览器</strong>指显示万维网上的媒体信息(文字、图像、音频、视频等)和处理用户交互操作的软件。</p><p>浏览器正是Internet时代的产物，随着<code>各种设备操作系统的普及</code>、<code>网络技术的全球化</code>以及<code>人们对信息需求的爆炸式增长</code>，为浏览器的诞生和兴起提供了强大的动力，同时它也标志着互联网时代的来临。</p><h5 id="组成" tabindex="-1">组成 <a class="header-anchor" href="#组成" aria-label="Permalink to &quot;组成&quot;">​</a></h5><p>虽然目前市场上的浏览器品牌众多，但是浏览器的结构还是由以下几部分组成。</p><ul><li><p><strong>地址栏</strong>：用于输入网站地址，通过识别地址信息跳转到对应网站</p></li><li><p><strong>菜单栏</strong>：包含设置内容和常用快捷操作，用户可自定义设置内容</p></li><li><p><strong>标签栏</strong>：包含一个或多个窗口，窗口的内容互不干扰，独立运行</p></li><li><p><strong>窗口栏</strong>：显示当前网站地址的访问内容，可为用户提供各种交互操作</p></li><li><p><strong>状态栏</strong>：用于实时显示当前操作和下载Web页面的进度情况</p></li></ul><h5 id="历史" tabindex="-1">历史 <a class="header-anchor" href="#历史" aria-label="Permalink to &quot;历史&quot;">​</a></h5><p>浏览器作为一个跨时代的科技产物，为现代网络人机交互的发展提供了强而有力的支持，历史的时刻不应该被忘记，以下简单列举一些浏览器的历史时刻。</p><ul><li><p><code>1993年</code>，<code>NCSA组织</code>发布了<strong>Mosaic浏览器</strong></p></li><li><p><code>1994年</code>，<code>网景公司</code>发布了<strong>Navigator浏览器</strong></p></li><li><p><code>1995年</code>，<code>微软公司</code>发布了<strong>IExplorer浏览器</strong>，并掀起了<code>浏览器之战</code></p></li><li><p><code>1996年</code>，Navigator浏览器的市场份额达到<code>86%</code>，微软公司开始将IExplorer浏览器整合到<code>Windows操作系统</code>中</p></li><li><p><code>1996年</code>，<code>ASA公司</code>发布了<strong>Opera浏览器</strong></p></li><li><p><code>1998年</code>，网景公司启动其开源产品，开始推出<code>Mozilla</code></p></li><li><p><code>2001年</code>，为人诟病的<code>IExplorer 6</code>发布，这货霸占国内市场十多年</p></li><li><p><code>2002年</code>，<code>网景公司</code>发布了<strong>Firefox浏览器</strong></p></li><li><p><code>2003年</code>，<code>苹果公司</code>发布了<strong>Safari浏览器</strong></p></li><li><p><code>2004年</code>，IExplorer浏览器的市场份额达到了历史顶峰<code>92%</code>，自此以后其市场份额开始下滑</p></li><li><p><code>2006年</code>，<code>Firefox 3</code>的发布创下了吉尼斯世界纪录，一天800万下载量</p></li><li><p><code>2008年</code>，<code>谷歌公司</code>发布了<strong>Chrome浏览器</strong></p></li></ul><p>至此，世界五大浏览器鼎立的格局逐渐形成，也为后期浏览器市场的多变提供了广大的技术支持。浏览器发展史并不久远，虽然只有短短的20多年，但是却不断在更新迭代，为广大互联网用户提供越来越强大的人机交互功能。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>世界五大浏览器：Chrome、Safari、Firefox、Opera、IExplorer/Edge</span></span></code></pre></div><h3 id="渲染引擎" tabindex="-1">渲染引擎 <a class="header-anchor" href="#渲染引擎" aria-label="Permalink to &quot;渲染引擎&quot;">​</a></h3><p><strong>渲染引擎</strong>又名<strong>浏览器内核</strong>，指负责对网页语法解析并渲染成一张可视化页面的解析器。它是浏览器最核心最重要的部位，不同内核对网页语法的解析也有不同，因此同一网页语法在不同内核的浏览器中的渲染效果也可能不同，这就是常说的<strong>浏览器差异性</strong>。</p><p>上述提到的世界五大浏览器，在自身的发展过程中都使用了一种或多种浏览器内核作为自身的渲染引擎。</p><ul><li><p><strong>Google Chrome</strong>：Webkit(前期)、Blink(后期)</p></li><li><p><strong>Apple Safari</strong>：Webkit</p></li><li><p><strong>Mozilla Firefox</strong>：Gecko</p></li><li><p><strong>ASA Opera</strong>：Presto(前期)、Blink(后期)</p></li><li><p><strong>Microsoft IExplorer</strong>：Trident</p></li><li><p><strong>Microsoft Edge</strong>：Trident(前期)、Blink(后期)</p></li></ul><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>IExplorer和Edge同是微软公司开发的浏览器产品，鉴于IExplorer存在很多为人诟病的问题，在后续的系统升级中逐渐使用Edge取代IExplorer在Windows上的位置</span></span></code></pre></div><p>因此20多年的浏览器发展史里，被大规模使用的浏览器内核也就这五个。</p><ul><li><p><strong>Blink内核</strong>：由谷歌公司和欧朋公司合作自研的内核，同时谷歌公司也将其作为开源内核架构<code>Chromium</code>的一部分发布，在<code>Chrome 28+</code>和<code>Opear 15+</code>中被使用。</p></li><li><p><strong>Webkit内核</strong>：由苹果公司自研的内核，同时也是<code>Blink内核</code>的原型，在<code>Chrome 1 ~ 28</code>和<code>Safari 1+</code>中被使用。</p></li><li><p><strong>Gecko内核</strong>：由网景公司自研的内核，先期在<code>Navigator</code>中使用，后期推广到<code>Firefox</code>上，在<code>Firefox 1+</code>中被使用。</p></li><li><p><strong>Presto内核</strong>：由欧朋公司自研的内核，其渲染性能达到极致但是牺牲了兼容性，目前已经废弃，在<code>Opear 7 ~ 14</code>中被使用。</p></li><li><p><strong>Trident内核</strong>：由微软公司自研的内核，由于其被包含在全世界使用率最高的<code>Windows操作系统</code>中，导致十多年时间里一直称霸浏览器内核界，在<code>IExplorer 4+</code>中被使用。</p></li></ul><hr><p>以下加插两个小故事，虽然不是什么大事件，但也是浏览器发展史里比较有趣的故事，了解了解也无妨。</p><p>Gecko内核由来</p><p><code>Gecko内核</code>的诞生其实跟<code>IExplorer</code>还是有点关系的，众所周知<code>IExplorer</code>无使用W3C标准，导致微软公司一些开发者的不满，他们与网景公司一些开发者共同创办了<code>Mozilla</code>，以当时的<code>Mosaic内核</code>为基础重新开发出<code>Gecko内核</code>。</p><p>浏览器大战</p><p>微软公司的<code>IExplorer</code>曾经与其他浏览器发生过两次<strong>世界大战</strong>，由于其垄断性质的操作也导致其在2014年后开始慢慢走向衰落。</p><p>第一次是在<code>1995年~1998年</code>，当时微软发布了<code>IExplorer</code>，但是网景公司的<code>Navigator</code>的市场份额达到<code>86%</code>，迫使微软公司将<code>IExplorer</code>植入到全世界使用率最高的<code>Windows操作系统</code>中，相当于买电脑送浏览器，这种操作让<code>IExplorer</code>在极短的时间内超过了<code>Navigator</code>的市场份额，导致后续与网景公司的<code>Navigator</code>大打出手，最后网景公司将<code>Navigator</code>卖给AOL公司为收场结束此次浏览器大战。</p><p>第二次是在<code>2003年后</code>，<code>IExplorer</code>通过其自身的优势取得了很好的市场成绩，巨大的使用量让其开始蚕食其他浏览器的市场份额。但是很多后起之秀的浏览器，例如<code>Safari</code>、<code>Firefox</code>、<code>Opera</code>，还有众多国产浏览器，都积极通过各种技术手段和推出更多用户功能的方式对抗<code>IExplorer</code>的打压。</p><hr><p>推荐一个统计互联网市场份额的网站<a href="https://gs.statcounter.com/" target="_blank" rel="noreferrer">StatCounter</a>，以后产品经理让你兼容<code>IExplorer</code>，你可把<code>浏览器市场份额统计数据</code>全盘搬出，大声并自信地告诉TA，<strong>现在几乎没人使用IExplorer了🤔</strong>。</p><h3 id="渲染过程" tabindex="-1">渲染过程 <a class="header-anchor" href="#渲染过程" aria-label="Permalink to &quot;渲染过程&quot;">​</a></h3><p>要了解浏览器页面的渲染过程，首先得知道<code>关键渲染路径</code>。<strong>关键渲染路径</strong>指浏览器从最初接收请求得到HTML、CSS、JS等资源，然后解析、构建、渲染、布局、绘制、合成，到最后呈现在用户眼前界面的整个过程。</p><p>笔者将关键渲染路径划分理解，页面的渲染过程分为以下几部分。</p><ul><li><p><strong>解析文件</strong></p></li><li><ul><li>将<code>html文件</code>转换为DOM树</li><li>将<code>css文件</code>转换为CSSOM树</li></ul></li><li><ul><li>将DOM树和CSSOM树合并生成渲染树</li></ul></li><li><p><strong>绘制图层</strong></p></li><li><ul><li>根据渲染树布局(<code>回流</code>)</li><li>根据布局绘制(<code>重绘</code>)</li></ul></li><li><p><strong>合成图层</strong>：合成图层显示在屏幕上</p></li></ul><h5 id="解析文件" tabindex="-1">解析文件 <a class="header-anchor" href="#解析文件" aria-label="Permalink to &quot;解析文件&quot;">​</a></h5><p>HTML文档描述一个页面的结构，浏览器通过<code>HTML解析器</code>将HTML解析成<code>DOM树</code>结构。HTML文档中所有内容皆为节点，各节点间拥有层级关系，彼此相连，构成DOM树。构建<code>DOM树</code>的过程：读取HTML文档的<strong>字节</strong>(Bytes)，将字节转换成<strong>字符</strong>(Chars)，依据字符确定<strong>标签</strong>(Tokens)，将标签转换成<strong>节点</strong>(Nodes)，以节点为基准构建<strong>DOM树</strong>。</p><p>CSS文档描述一个页面的表现，浏览器通过<code>CSS解析器</code>将CSS解析成<code>CSSOM树</code>结构，与DOM树结构比较像。CSS文档中所有内容皆为节点，与HTML文档中的节点一一对应，各节点间拥有层级关系，彼此相连，构成CSSOM树。构建<code>CSSOM树</code>的过程：读取CSS文档的<strong>字节</strong>(Bytes)，将字节转换成<strong>字符</strong>(Chars)，依据字符确定<strong>标签</strong>(Tokens)，将标签转换成<strong>节点</strong>(Nodes)，以节点为基准构建<strong>CSSOM树</strong>。与DOM树的构建过程完全一致。</p><p>在构建DOM树的过程中，当<code>HTML解析器</code>遇到<code>&lt;script&gt;</code>时会立即阻塞DOM树的构建，将控制权移交给浏览器的<code>JS引擎</code>，等到<code>JS引擎</code>运行完毕，浏览器才会从中断的地方恢复DOM树的构建。<code>&lt;script&gt;</code>的脚本加载完成后，<code>JS引擎</code>通过<code>DOM API</code>和<code>CSSOM API</code>操作DOM树和CSSOM树。为何会产生<strong>渲染阻塞</strong>呢？其根本原因在于：JS操作DOM后，浏览器无法预测未来DOM的具体内容，为了防止无效操作和节省资源，只能阻塞DOM树的构建。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/png/2985494/1607317679216-0d8f8e45-2ff9-4b0b-acf8-a5bf3da4b102.png" alt="img"></p><p>浏览器的<code>渲染引擎</code>将DOM树和CSSOM树合并生成渲染树，只渲染需显示的节点及其样式。<strong>DOM树</strong>、<strong>CSSOM树</strong>和<strong>渲染树</strong>三者的构建并无<code>先后条件</code>和<code>先后顺序</code>，并非完全独立而是会有交叉并行构建的情况。因此会形成一边加载，一边解析，一边渲染的工作现象。</p><h5 id="绘制图层" tabindex="-1">绘制图层 <a class="header-anchor" href="#绘制图层" aria-label="Permalink to &quot;绘制图层&quot;">​</a></h5><p>进入绘制阶段，遍历渲染树，调用渲染器的<code>paint()</code>在屏幕上绘制内容。根据渲染树布局计算样式，即每个节点在页面中的布局、尺寸等几何属性。HTML默认是流式布局，CSS和JS会打破这种布局，改变DOM的几何属性和外观属性。在绘制过程中，根据渲染树布局，再根据布局绘制，这就是常听常说的<strong>回流重绘</strong>。</p><p>在此涉及到两个核心概念：<strong>回流</strong>、<strong>重绘</strong>。笔者用两句精简的话分别概括它们。</p><ul><li><strong>回流</strong>：几何属性需改变的渲染</li><li><strong>重绘</strong>：更改外观属性而不影响几何属性的渲染</li></ul><p>当生成渲染树后，至少会渲染一次。在后续交互过程中，还会不断地重新渲染。这时只会<code>回流重绘</code>或<code>只有重绘</code>。因此引出一个定向法则：<strong>回流必定引发重绘，重绘不一定引发回流</strong>。</p><p>在下一章中，笔者会安排整章篇幅讲解<strong>回流重绘</strong>以及如何让回流重绘的影响最小化。相信下一章提及的<strong>属性排序</strong>应该比较少同学了解过或使用过，敬请期待。</p><h5 id="合成图层" tabindex="-1">合成图层 <a class="header-anchor" href="#合成图层" aria-label="Permalink to &quot;合成图层&quot;">​</a></h5><p>将回流重绘生成的图层逐张合并并显示在屏幕上。上述几个步骤并不是一次性顺序完成的，若DOM或CSSOM被修改，上述过程会被重复执行。实际上，CSS和JS往往会多次修改DOM或CSSOM，简单来说就是用户的交互操作引发了网页的重渲染。</p><h3 id="兼容性" tabindex="-1">兼容性 <a class="header-anchor" href="#兼容性" aria-label="Permalink to &quot;兼容性&quot;">​</a></h3><p><strong>兼容性</strong>又名<code>网站兼容性</code>或<code>网页兼容性</code>，指网页在各种浏览器上的显示效果可能不同而产生浏览器和网页间的兼容问题。</p><p>说到兼容性，就不得不推荐一个专门为前端开发者定制可查询<code>CSS/JS特性</code>在各种浏览器中兼容性的网站<a href="https://caniuse.com/" target="_blank" rel="noreferrer">Caniuse</a>，它可很好地保障网页在不同浏览器间的兼容性。有了这个工具可快速地了解使用到的代码在各个浏览器中的效果。所以后续使用VScode编码的过程中都会顺带使用<code>Caniuse</code>查看CSS属性以及选择器的兼容性。</p><p>产生浏览器间的兼容问题，正是上述谈到的<code>渲染引擎</code>而导致的。在网站的设计和开发中，做好浏览器兼容才能让网站在不同浏览器间都能显示正常。浏览器对标准的更好兼容能够给用户带来更好的使用体验，当然无法奢求浏览器厂商能统一所有浏览器标准，所以前端开发者只能自己着手解决。</p><p>以下聊聊处理CSS兼容性的三种方法，相对处理JS兼容性来说简单到不得了，这也是普遍前端开发者认为CSS简单的原因之一。通过以下方法处理，后续编码时就不会编写CSS私有属性了。</p><h5 id="磨平浏览器默认样式" tabindex="-1">磨平浏览器默认样式 <a class="header-anchor" href="#磨平浏览器默认样式" aria-label="Permalink to &quot;磨平浏览器默认样式&quot;">​</a></h5><p>每个浏览器的CSS默认样式不尽相同，所以最简单最有效的方法就是<code>对其默认样式初始化</code>。以下贴一个各位同学都会的初始化代码。简单暴力但是不明确，<code>*</code>通配符可是有执行性能问题的。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>* {</span></span>
<span class="line"><span>    margin: 0;</span></span>
<span class="line"><span>    padding: 0;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>以下推荐两种磨平浏览器默认样式的方法，在接入其他<code>css文件</code>前将其导入，天下太平，大家都不能拼爹了，都是在同一起跑线上，<code>IExplorer</code>同学你可别抢跑哇，大家都盯着你呢！</p><ul><li><a href="https://github.com/necolas/normalize.css" target="_blank" rel="noreferrer">normalize.css</a>：懒人必备的浏览器默认样式库，接近<code>40k</code>的Star，说明大部分人都是懒人</li><li><a href="https://github.com/JowayYoung/idea-css/blob/master/css/reset.css" target="_blank" rel="noreferrer">reset.css</a>：其实就是笔者自定义的默认样式，各位同学也可自行为项目撰写一份默认样式</li></ul><p>在项目入口文件的其他<code>css文件</code>前导入，若使用<code>burce-cli</code>，可能发现在<code>index.js</code>里已经提前导入了<code>reset.css</code>。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import &quot;path/to/normalize.css&quot;;</span></span>
<span class="line"><span>// 或</span></span>
<span class="line"><span>import &quot;path/to/reset.css&quot;;</span></span></code></pre></div><h5 id="插入浏览器私有属性" tabindex="-1">插入浏览器私有属性 <a class="header-anchor" href="#插入浏览器私有属性" aria-label="Permalink to &quot;插入浏览器私有属性&quot;">​</a></h5><p>通常编写CSS都会在一些CSS3属性前加入<code>-webkit-</code>、<code>-moz-</code>、<code>-ms-</code>或<code>-o-</code>，这些奇形怪状写到手软的东西就是<strong>浏览器私有属性</strong>。样式少还好，样式多那就欲哭无泪了😂。</p><p>出现这些私有属性，是因为制定CSS标准的W3C其动作就像蜗牛一样慢，量产一个CSS属性是需走一个很严格很复杂的流程。一个成熟且被大众肯定的属性，浏览器厂商会加大其支持力度而铺路，但是为了避免日后W3C公布标准时有所变更，就加入一个本厂商的私有属性提前支持该属性，待W3C公布该属性标准后，再让新版浏览器支持标准属性。</p><p>对于编写私有属性的顺序需特别注意：<strong>兼容性写法放到前面，标准写法放到最后</strong>。在浏览器解析CSS过程中，若标准属性无法使用则使用当前浏览器对应的私有属性。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* Chrome、Safari、New Opera、New Edge */</span></span>
<span class="line"><span>-webkit-transform: translate(10px, 10px);</span></span>
<span class="line"><span>/* Firefox */</span></span>
<span class="line"><span>-moz-transform: translate(10px, 10px);</span></span>
<span class="line"><span>/* IExplorer、Old Edge */</span></span>
<span class="line"><span>-ms-transform: translate(10px, 10px);</span></span>
<span class="line"><span>/* Old Opera */</span></span>
<span class="line"><span>-o-transform: translate(10px, 10px);</span></span>
<span class="line"><span>/* 标准 */</span></span>
<span class="line"><span>transform: translate(10px, 10px);</span></span></code></pre></div><p>当然不是所有的CSS3属性都需补齐<code>-webkit-</code>、<code>-moz-</code>、<code>-ms-</code>或<code>-o-</code>，上述Demo只是一个示例，真正的<code>transform</code>私有属性只有<code>-webkit-</code>和<code>-ms-</code>。这些需查看<code>Caniuse</code>确保正确的编写，若想偷懒也可全部写上。</p><p>每个CSS3属性都编写这么一堆兼容性代码，无疑是对生命最大的浪费。在使用Webpack打包项目代码的过程中，可接入<a href="https://github.com/postcss/postcss-loader" target="_blank" rel="noreferrer">postcss-loader</a>和<a href="https://github.com/csstools/postcss-preset-env" target="_blank" rel="noreferrer">postcss-preset-env</a>，<code>postcss-preset-env</code>内置了<code>autoprefixer</code>，它会依据<code>Caniuse</code>所提供的数据对代码里的CSS3属性批量添加私有属性。</p><p>若使用<code>bruce-cli</code>，那么也无需关注CSS私有属性的插入，因为其内置了<code>postcss-loader</code>和<code>postcss-preset-env</code>。自动化工具的好处就是为了解决一些重复而无趣的工作。</p><h5 id="css-hack" tabindex="-1">CSS Hack <a class="header-anchor" href="#css-hack" aria-label="Permalink to &quot;CSS Hack&quot;">​</a></h5><p><strong>CSS Hack</strong>指针对不同浏览器编写不同CSS，让它能够同时兼容不同浏览器，在不同浏览器中渲染想要的效果。当然也可反过来利用<code>CSS Hack</code>为不同版本的浏览器定制不同效果。</p><p>在一些老旧网站的<code>html文件</code>或<code>css文件</code>里可能会看到以下代码，没错，这就是<code>CSS Hack</code>。现在可能很多同学都不会遇到这种写法，毕竟很多公司的产品都放弃了<code>IExplorer 8</code>以下的兼容，这些痕迹都已经成为历史。很多同学没想过5年到10年前的前端开发者是多么苦逼的，光兼容<code>IExplorer</code>就已经够烦了，还连续兼容几个版本。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;!--[if IE]&gt;</span></span>
<span class="line"><span>    &lt;style&gt;</span></span>
<span class="line"><span>    .elem {</span></span>
<span class="line"><span>        background-color: #f66;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    &lt;/style&gt;</span></span>
<span class="line"><span>    &lt;![endif]--&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>.elem {</span></span>
<span class="line"><span>    background-color: #f66; /* IExplorer 8+ */</span></span>
<span class="line"><span>    *background-color: #f66; /* IExplorer 7 */</span></span>
<span class="line"><span>    _background-color: #f66; /* IExplorer 6 */</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>所以现在也不会推荐去学习这些<code>CSS Hack</code>，有一个基本的了解即可。上述<code>CSS Hack</code>写法只是最简单的几行代码，其实还存在一些更难的表达式。当然也不推荐这种写法，毕竟不符合大名鼎鼎的<strong>雅虎军规</strong>的<code>Avoid CSS Expressions</code>。</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>综上所述，结合【磨平浏览器默认样式】和【插入浏览器私有属性】这两种方法完成浏览器兼容性的处理即可</span></span></code></pre></div><p>IExplorer兼容性</p><p>在此也顺带提一个众多前端开发者觉得很头疼的问题，就是<code>IExplorer兼容性</code>。对于现在的同学来说还好，笔者在2014年转行前端时，面试的公司基本是要求前端兼容<code>IExplorer 5</code>和<code>IExplorer 6</code>的。试问一下，兼容一个90年代末00年代初的浏览器版本，是一个多费劲的事情啊，刚好又遇上HTML5和CSS3的迅速发展，是一个技术的取舍问题，要么原地踏步要么紧跟潮流，笔者最终还是选择了后者。</p><p>正是<code>IExplorer</code>的垄断性和大部分网站在早期是基于<code>IExplorer 6</code>开发和维护的，导致了后期的用户都是优先使用<code>IExplorer 6</code>浏览，也就造成了很多公司招聘前端开发者都是要标配处理<code>IExplorer 6</code>兼容性。笔者当时也是凭着这个处理<code>IExplorer 6</code>兼容性的技能才顺利转行，不然现在还蹲在医院当个苦逼的医生呢😂。</p><p><code>IExplorer</code>的垄断性使得<code>Trident内核</code>在十多年时间里一家独大，微软公司可能很有信心吧，在很长时间内都无更新<code>Trident内核</code>，导致其曾经与W3C标准完全脱节和大量安全隐患无法得到解决。看过Jquery源码的同学应该都知道，源码里包含了大量的<code>IExplorer兼容代码</code>，所以在移动端上使用<code>Jquery</code>操作DOM是一件很费力不讨好的事情，后面才出现一个叫<code>Zepto</code>的库代替<code>Jquery</code>在移动端上的使用，该库很小，因为删除了所有的<code>IExplorer兼容代码</code>。</p><p>在此笔者也建议，在业务需求允许的范围内尽量不要兼容<code>IExplorer</code>，毕竟兼容<code>IExplorer</code>需花费很多时间去维护，更何况微软公司已经宣布不再支持<code>IExplorer</code>的维护而转向<code>Edge</code>。</p><p>本小册的核心内容<strong>CSS神操作骚技巧</strong>都是基于CSS3和CSS4的标准下讲解，若需兼容<code>IExplorer</code>，那么笔者写本小册就无任何意义了。因为<code>IExplorer</code>压根不兼容后面提到的大部分<strong>CSS神操作骚技巧</strong>。笔者曾经在自己公众号粉丝群里与几位同学聊一些浏览器兼容问题，笔者简括了一句：<code>不搞IExplorer兼容，那就无兼容问题了</code>。当然这是笔者开的一个玩笑，实际情况还是得依据项目而言。</p><p>目前大部分国产浏览器是基于开源内核架构<code>Chromium</code>二次开发的，可认为是<code>Chrome</code>外面又包了一层外壳。另外可能有些国产浏览器打着双内核的旗号，在<code>Blink内核</code>的基础上又增加一个<code>Trident内核</code>。<code>Blink内核</code>对应着浏览器的<strong>极速模式</strong>，可访问一些比较现代化和超前技术的网站，例如<code>特效网站</code>和<code>可视化网站</code>；<code>Trident内核</code>对应着浏览器的<strong>兼容模式</strong>，可访问一些久经不衰的OG网站，例如<code>政务网站</code>和<code>金融网站</code>。</p>`,82),p=[n];function d(r,t,l,i,g,h){return s(),o("div",null,p)}const b=e(c,[["render",d]]);export{u as __pageData,b as default};
