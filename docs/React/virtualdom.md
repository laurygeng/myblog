#### Virtual Dom ####  

JavaScript类库基于浏览器API实现的概念。UI以一种虚拟的形式存在于内存中，并通过ReactDom等类库于真实的DOM同步，这一过程叫reconcile（协调）DOM操作很慢，耗性能，JS对象处理起来更快更简单，通过Diff算法比对新老vdom之间的差异，可以批量的，最小化的执行dom操作，从而提高性能。 Fibers是一个内部对象，存放组件树的信息也被认为是Virtual DOM实现的一部分。  
ShadowDOM是一种浏览器技术，主要用于web组件封装变量和CSS。  

在React中组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM 
（virtual DOM，这是React探索性的创新）。只有当它插入文档以后，才会变成真实的 DOM 。根据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，这种算法叫做 DOM diff （详细了解diff 算法），它可以极大提高网页的性能表现。

Vue在2.0版本引入了vdom,?vue1.0中没有虚拟dom，但是细颗粒度开销大，在大型项目中不可接受。vue2.0选择了中颗粒度，每一个组件一个watcher实例，状态变化时只通知到组件，在通过引入虚拟DOM去进行比对和渲染。
其vdom是基于 snabbdom 库所做的修改。snabbdom是一个开源的vdom库。snabbdom的主要作用就是将传入的JS模拟的DOM结构转换成虚拟的DOM节点。先通过其中的 h函数 将JS模拟的DOM结构转换成虚拟DOM之后，再通过其中的 patch函数 将虚拟DOM转换成真实的DOM渲染到页面中。为了保证页面的最小化渲染，snabbdom引入了 Diff算法 ，通过Diff算法找出前后两个虚拟DOM之间的差异，只更新改变了的DOM节点，而不重新渲染为改变的DOM节点。
vue中的模板解析和渲染的核心就是：通过类似snabbdom的h()和patch()的函数，先将模板解析成vnode，如果是初次渲染，则通过patch(container,vnode)将vnode渲染至页面，如果是二次渲染，则通过patch(vnode,newVnode)，先通过Diff算法比较原vnode和newVnode的差异，以最小的代价重新渲染页面。