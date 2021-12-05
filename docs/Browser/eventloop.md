### 事件循环  ###  

进程：CPU资源分配的最小单位  
线程：CPU调度的最小单位（线程是建立在进程的基础上的一次程序运行单位，一个进程可以有多个线程）  
Js：单线程，为了提高系统资源（CPU，磁盘）利用率使用异步I/O方式完成并处理  

事件循环（Event loop）
在 Javascript 执行引擎之外，有一个任务队列，当在代码中调用 setTimeout() 方法时，注册的延时方法会交由浏览器内核其他模块（以 webkit 为例，是 webcore 模块）处理，当延时方法到达触发条件，即到达设置的延时时间时，这一延时方法被添加至任务队列里。这一过程由浏览器内核其他模块处理，与执行引擎主线程独立，执行引擎在主线程方法执行完毕，到达空闲状态时，会从任务队列中顺序获取任务来执行，这一过程是一个不断循环的过程，称为事件循环模型。

宏任务和微任务都有自己的Event Queue，各自进入自己的Event Queue中等待执行。上图是事件循环的整体示意图。当一段代码载入内存中开始执行后，整体代码作为第一个宏任务开始执行，如果有微任务的话送入对应的Event Queue中，宏任务执行完毕后再执行微任务，之后接着执行宏任务，就这样循环依次执行，称之为事件循环（JS的执行机制）。

macro-task（宏任务）： 整体JS代码、setTimeout、setInterval
micro-task（微任务）：Promise、process.nextTick  

```
console.log(1);
setTimeout(()=>{
  console.log(2);
  
	process.nextTick(()=>{
  	console.log('这是在nextTick中的代码')
  })
  new Promise(resolve=>{
    console.log('Promise函数在执行resolve方法前')
    resolve();
  }).then(
  	console.log('Promise函数在执行then方法')
  )
}, 2000)
```

user agent(浏览器端)用于协调用户交互（鼠标、键盘）脚本（JavaScript）渲染（HTML DOM CSS样式）网络等行为的一个机制。
user agent需要通过事件循环来与多种事件源交互

外部队列（TaskQueue）：
浏览器协调的各类事件的队列
DOM操作，
用户交互（鼠标键盘）
网络请求（Ajax）
History API 
定时器（SetTimeOut）
每一个外部事件源都会有一个对应的外部队列，不同事件源的队列可以有不同的优先级
内部队列（Microtask Queue）：
Promise的成功与失败
MutationObserver
Object.observe(废弃)
JavaScript内部执行的任务队列
实际上是Set，排到前面没有满足条件也不会先执行