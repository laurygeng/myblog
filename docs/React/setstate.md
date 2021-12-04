#### setState ####  

setState在原生事件、setTimeout是同步  
react合成事件、生命周期中是异步（批量处理batchUpdate）它们的执行上下文不同  
为什么要batchUpdate？setState接受的参数是对象或者function（function要return一个对象）返回的state会和原来的state进行对比生成一个新的state，这样做的目的是避免子组件被多次渲染，提升性能。  
（原生事件ExecutionContext=0，立即执行了flushSyncCallbackQueue）  
（批量处理ExecutionContext=6）  

#### State和Props ####  
props和state都是普通的JavaScript对象，都用来保存数据，数据驱动组件的渲染。  
props是传递给组件的（函数的形参）是组件的属性值，由父组件传递给子组件，组件不能自己改变props，但是可以把子组件的props放在一起统一管理。  
State是在组件内被组件自己管理的（函数内声明变量），在当前组件有效，可以使用setState进行更改，class组件中会引发组件的重新渲染。  
函数组件可以使用useState（在调用useState里面的回调方法的时候就会触发useEffect重新渲染），useReducer，与class组件中setState不同的是，前后两次的值相同的时候，Hook会放弃更新，不会引起重新渲染  

#### React合成事件 ####  
React采用自己定义的合成事件，使开发者不需要关注浏览器的兼容性问题，统一管理事件。  
React内部实现事件委托，不把事件处理函数直接绑定在真实的节点上，而是把所有的事件绑定到结构的最外层，使用统一的事件监听和处理函数。  
当组件挂载或者卸载时，只在这个统一的事件监听器处理，然后在映射表里找到真正的事件处理函数并调用。简化了事件处理和回收机制，提高了效率。  
记录事件执行的上下文（ExecutionContext），根据优先级处理，实现React增量渲染，预防掉帧，达到更好的用户体验。参考源码   :react-reconciler/src/ReactFiberWorkLoop.js。
事件委托，把所有的事件都注册到最外层（document）映射表（用键值对的方式找到属性值就是合成事件）  
映射表如何生成？事件如何注册？事件派发  
react-dom：ReactDomClientInjection  
injectEventPlugin  
ReactDOMComponet  
discreteEvent  
discreatUpdate(执行上下文)  
dispatchEvent  
ExcutionContext记录当前事件执行环境，不同的阶段（对环境进行赋值）  
component-setInitDomProperties（初始化）  

