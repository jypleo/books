import{_ as s,c as e,o as a,a2 as i}from"./chunks/framework.D8Prfz4N.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"pamphlet/Babel 插件通关秘籍/15 工具介绍：VSCode Debugger 的使用.md","filePath":"pamphlet/Babel 插件通关秘籍/15 工具介绍：VSCode Debugger 的使用.md"}'),p={name:"pamphlet/Babel 插件通关秘籍/15 工具介绍：VSCode Debugger 的使用.md"},t=i(`<blockquote><p>想看懂复杂代码离不开 debugger，它是提升 Node.js 水平必备的能力。因为后面的案例代码都是有一定的复杂度的，建议同学们先学会使用 debugger 再去学后面的案例，结合 debugger 来看。</p></blockquote><p>这一节，我们来学习下 vscode debugger 的使用。</p><p>首先，我们把<a href="https://github.com/QuarkGluonPlasma/babel-plugin-exercize" target="_blank" rel="noreferrer">代码</a>下载下来后，可以看到又一个 .vscode 的目录，里面有个 launch.json 的配置，这里面就是调试的配置。</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d04026afef6d4761ac4ff3dcf5d2f84d~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p>这个文件就是调试的配置，点开 debugger 的窗口，就可以看到启动调试的按钮。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/205267d73fbc4e7dab7d76c9992b6a97~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p>可以在想断住的那一行左边点一下，就会打上断点，然后点击调试，就会以 debug 模式运行，到了断点就会停住，然后可以看到堆栈信息、断点等。</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbd7b6f296ea4235825cea8bda6b84c5~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p>这是 vscode debugger 的使用方式。</p><h2 id="vscode-debugger-的配置" tabindex="-1">vscode debugger 的配置 <a class="header-anchor" href="#vscode-debugger-的配置" aria-label="Permalink to &quot;vscode debugger 的配置&quot;">​</a></h2><p>会了怎么使用之后，我们来深入讲下怎么配置，希望能够让同学们的 nodejs 调试能力有所提升。</p><p>点击这个齿轮，会打开 .vscode/launch.json 的内容来编辑，在这里写各种配置。</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bfb71747d254624913047f5819c45a5~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p>点击右下角的按钮就会有一个菜单来选择配置的模版：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73942b78943f498fa4eb2190ca78e510~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p>运行环境有很多，比如 chrome、node.js 等，这里我们只需要 node.js 的环境。</p><p>然后启动方式分为 launch 和 attach 两种。为什么是这两种呢？</p><p>那是因为调试是分为客户端和服务端的，</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e25d1a7e7114b1497558a18f3219ea2~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p>我们如果是启动 node.js 的调试模式，需要加上 --inspect 或者 --inspect-brk（在首行断住）参数，之后会启动一个 websocket server，等待客户端链接。</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ff979331b7046faa1a0dc3a6ce28397~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p>两者之间是通过 v8 debug protocol 来通信的。</p><p>比如： 设置断点：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;seq&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">117</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;request&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;command&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;setbreakpoint&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;arguments&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;function&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;target&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;f&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>去掉断点：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;seq&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">117</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;request&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;command&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;clearbreakpoint&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;arguments&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;function&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;breakpoint&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>手动连接的话可以打开 chrome://inspect 页面，可以用 chrome devtools 的 debugger client 连上来调试。</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d72a6152fe1402ca424a7c02d530c9f~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/21ba7e5435b14b798581401553c4d89f~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p>但是，用 vscode 不用这么麻烦，直接在 .vscode/launch.json 里面配置下就可以。</p><p>前面提到 vsocde 的 debug 配置分为 launch 和 attach 两种：</p><ul><li>launch： 把 nodejs 代码跑起来，启动 debugger server，然后用 client 来连接</li><li>attach：已经有了 debugger server，只需要启动一个 debugger client 连接上就行</li></ul><p>所以就可以看到 launch 的配置要指定运行什么 js 代码：</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6aaf1a267e224baaa09704e8a2263a82~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p>而 attach 则只需要指定 连接到哪个端口：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e047d1180ea44589147859fcfd0bd92~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p>当然，小册里的代码都通过 launch 的配置就可以，如果添加的话也是类似上面的方式添加调试配置，然后就可以调试了。</p><p>vscode 提供了这几个控制按键（底层会发送 debug 协议的消息），点击按钮就可以让代码继续运行。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e3dbcb4cd2a4f39b1d433bff2cf58ff~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p>第一个是继续运行，到下一个断点停住</p><p>第二个是运行下一步（单步运行）</p><p>第三个可以在执行到某个函数调用的时候进入函数内部执行</p><p>第四个是跳出当前函数调用，然后往下执行</p><p>第五个是重新运行</p><p>第六个是终止运行</p><p>学会了 debugger 以后，api 不用记，打个断点都能看到： <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/408207297a514949b7b83ad0457ceedb~tplv-k3u1fbpfcp-watermark.image" alt=""></p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3699f18e54404278a6cc6f6ececd4029~tplv-k3u1fbpfcp-watermark.image" alt=""></p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>debug 能力是一种很重要的能力，比起 console.log 来能精确的知道每一步的运行结果，更容易读懂代码。</p><p>小册代码中有 vscode debugger 的配置，但是很多读者不会使用，所以这节来介绍了一下，主要是在 .vscode/launch.json 里面添加配置，然后在 debug 窗口来启动调试，之后就可以打断点和单步运行了。</p><p>vscode debugger 的使用分为这几步：</p><ol><li>在 .vscode/launch.json 里面添加对应 js 文件的调试配置</li><li>在要调试的那行左边打断点</li><li>点击调试窗口的调试按钮启动调试</li><li>点击下一步、下一个断点、进入函数内部等方式来部分执行代码</li></ol><p>debugger 的实现原理是分为一个 debugger server 和一个 debugger client，deubgger server 在 js 引擎里面，debugger client 包括 chrome devtools、vscode debugger 等，他们两者之间通过调试协议通信，比如 v8 debug protocol。</p><p>launch 的方式就是启动一个 debugger server（websocket），然后用 debugger client 连接上，发送消息来控制单步执行、打断点等。</p><p>而 attach 只是 启动 client，连上已有的 debugger server，后续流程一样。</p><p>node --inspect xxx.js 就可以看到 ws://sss:111 的地址，这就是 websocket 的 debugger server 的地址。客户端用 chrome. devtools. 可以，用 vscode 或者其他 ide 都可以，因为他们都实现了 v8 debug protocol 的 websocket client，只是做了各自的 ui。（当然，原理做了解即可，了解原理的目的是为了更好的使用工具）。</p><p>希望同学们能掌握 vscode debugger 的使用，对更好的理解案例代码有很大的帮助。</p><p>扩展阅读（想更深入 debugger 的同学可以看下）：</p><p><a href="https://juejin.cn/post/7010768454458277924" target="_blank" rel="noreferrer">用 VSCode 调试网页的 JS 代码有多香</a></p><p><a href="https://juejin.cn/post/7071219293249077256" target="_blank" rel="noreferrer">如何让 Vue、React 代码的调试变得更爽</a></p><p><a href="https://juejin.cn/post/6981820158046109703" target="_blank" rel="noreferrer">让你 nodejs 水平暴增的 debugger 技巧</a></p>`,61),n=[t];function l(c,r,h,k,o,g){return a(),e("div",null,n)}const b=s(p,[["render",l]]);export{u as __pageData,b as default};
