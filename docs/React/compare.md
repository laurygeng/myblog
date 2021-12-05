### 对比Vue&React ###  

### Vue模板语法 ###  
在Vue中，插值表达式和指令对于数据的操作又称为模板语法，基于抽象语法树 AST，实现解析模版指令  
编译分为三个步骤：解析、优化、生成  
解析器将模板解析为抽象语法树，基于AST可以做优化或者代码生成工作  
优化器的作用是在AST中找出静态子树（永远不变的节点，比如文本节点），并打上标签  
虚拟DOM patch的时候可以跳过静态子树，将AST转换成渲染函数  
Vue.js 使用了基于 HTML 的模版语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据  
所有 Vue.js 的模板都是合法的 HTML ，所以能被遵循规范的浏览器和 HTML 解析器解析  
### Vue的指令 ###

+ v-bind:动态地绑定一个或多个 html属性，或一个组件 prop 到表达式（组件单项数据流使用）
+ v-once:绑定只渲染元素和组件 一次 的特性或prop表达式。
+ v-model:在表单控件或者组件上创建双向绑定，代替value值。
+ v-text:更新元素的 textContent。
+ v-html:更新元素的 innerHTML。注意：内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译 。
+ v-on:绑定事件监听器，通过v-on给dom元素绑定事件，Vue解析组件模板后，在绑定更新 v-on 指令时会为DOM元素绑定事件 ，vue事件处理函数的this默认指向组件实例
+ v-if / v-else / v-show:条件渲染。
+ v-for:列表渲染。
+ v-pre:跳过这个元素和它的子元素的编译过程。v-cloak:这个指令保持在元素上直到关联实例结束编译。  

在Vue中事件有两方面的内容，一方面是自定义事件，一方面是为DOM绑定事件  
Vue自定义事件是为组件间通信设计，自定义事件提供了 $on、$off、$once、$emit、$broadcast、$dispatch 几个 api，非常简洁  


### JSX ###
React发明了JSX，利用HTML语法来创建虚拟DOM。  
React的核心机制之一就是可以在内存中创建虚拟的DOM元素。  
以此来减少对实际DOM的操作从而提升性能。  

JSX 即Javascript XML，它是对JavaScript 语法扩展。  
React 使用 JSX 来替代常规的 JavaScript。  
你也可以认为JSX其实就是JavaScript。当遇到<，JSX就当HTML解析，遇到{就当JavaScript解析。  

使用 JSX 的书写是为了让我们能更直观地看到组件的 DOM 结果，其最终还是通过解析器转化为 JavaScript 代码才能在浏览器端执行。  
比如我们写了如下一段代码：  
```
var msg = <h1 width="10px">hello hangge.com</h1>;   
``` 
babel会预编译JSX为React.creatElement  

```
var msg = React.createElement("h1", {width: "10px"}, "hello hangge.com");
```

也就是说我们每写一个标签，就相当于调用一次 React.createElement 方法并最后返回一个 ReactElement 对象给我们。  

React基于虚拟DOM实现了一个合成事件层，我们所定义的事件处理器会接收到一个合成事件对象的实例，它完全符合 W3C 标准，不会存在任何IE标准的兼容问题。  
React内部实现事件委托，不把事件处理函数直接绑定在真实的节点上，而是把所有的事件绑定到结构的最外层，使用统一的事件监听和处理函数。当组件挂载或者卸载时，只在这个统一的事件监听器处理，在后在映射表里找到真正的事件处理函数并调用。简化了事件处理和回收机制，提高了效率。  
记录事件执行的上下文（ExecutionContext），根据优先级处理，实现React增量渲染，预防掉帧，达到更好的用户体验。参考源码   :react-reconciler/src/ReactFiberWorkLoop.js。  
事件委托，把所有的事件都注册到最外层（document）映射表（用键值对的方式找到属性值就是合成事件）  
当使用ES6 class语法来定义一个组件的时候，事件处理器会成为类的一个方法，需要显式的绑定this。  
尽量不要混用合成事件和原生事件，只有在使用 React 合成事件无法解决问题的这一场景，才去使用原生事件。因为两种混用非常容易导致问题。对于原生事件一定要手动移除，否则很有可能会出现内存泄露问题。一般在componentDidMound() 中注册原生事件，在componentWillUnMount()方法中移除事件  

由于语法的灵活，在编译时无法区分变化的部分，React缺少编译时的优化手段，所以在运行时需要付出更多的努力  

### 设计理念 ###  
Vue响应式，数据可变，通过每一个属性建立watcher来监听，当属性变化的时候，响应式的更新对应的虚拟DOM
Vue 进行数据拦截/代理，它对侦测数据的变化更敏感、更精确，相比之下，Vue 由于采用依赖追踪，默认就是优化状态：你改变多少数据，就触发多少更新。
Vue 需要在预编译阶段静态分析模版，分析出视图依赖了哪些数据，进行响应式处理。
当你把一个普通的 JavaScript 对象传给 Vue 实例的 data 选项，Vue 将遍历此对象所有的属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter(实现了数据劫持)。并采用发布-订阅者设计模式，利用一系列watcher对象监听数据变化，追踪依赖，在属性被访问和修改时通知变化，并通知DOM更新。
<img src="/images/vue.png" alt="图片替换文本"  align="bottom" /> 
￼
Vue 2.0 对象响应化，遍历每个Key，定义getter和Setter，数组的响应化：覆盖数组的原型方法，额外添加通知逻辑
Vue的性能优化是自动的，当state特别多的时候，watcher会很多。递归遍历消耗大，新增删除无法监听。Map，Set，Class无法响应式，修改语法有限制。
Vue3中引用Proxy，对数据响应式改进、编译器中对于静态内容的改进都会让vue更加高效



React 推崇函数式，它直接进行局部重新刷新（或者重新渲染），但是 React 并不知道什么时候“应该去刷新”，  
触发局部重新变化是由开发者手动调用 setState ，forceUpdate，render等API完成。  

当有更新发生时，Reconciler会完成如下工作：  
1.调用函数组件、class组件的render方法，返回jsx转换为虚拟dom  
2.将虚拟dom和上次更新的虚拟dom做对比  
3.通过对比找出本次更新变化的虚拟dom  
4.通知render将变化的虚拟dom渲染到页面  
React 负责的就是一堆递归 React.createElement 的执行调用，它无法从模版层面进行静态分析  
React 对数据变化毫无感知，它就提供 React.createElement 调用已生成 virtual dom  



如果是一个很大，层级很深的组件。react渲染需要几十甚至几百毫秒，react一直占用浏览器主线程，其他任何操作都无法执行（用户点击等交互）  


React16架构（Fiber）就是为了解决这个问题：（无法在预编译阶段做到更多，时间分片优化）  
Scheduler(调度器):调度任务的优先级，高优先级的先进入Reconciler  
Reconciler(协调器)：负责找出变化的组件  
Render（渲染器）：负责将变化的组件渲染到页面上  

另外 React 为了弥补不必要的更新，会对 setState 的行为进行合并操作。因此 setState 有时候会是异步更新，但并不是总是“异步”。  
React的性能优化，需要手动去做, 为了达到更好的性能，React 暴露给开发者 shouldComponentUpdate 这个生命周期 hook，来避免不需要的重新渲染  
