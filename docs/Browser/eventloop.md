### 事件循环

进程：CPU 资源分配的最小单位  
线程：CPU 调度的最小单位（线程是建立在进程的基础上的一次程序运行单位，一个进程可以有多个线程）  
Js：单线程，为了提高系统资源（CPU，磁盘）利用率使用异步 I/O 方式完成并处理  
浏览器不是单线程，一般是多线程的，chrome 一个页就是一个独立的进程，javascript 的执行是其中的一个线程，里面还包括了很多其他线程
GUI 渲染线程，http 请求线程，定时器触发线程，事件触发线程，图片等资源加载线程

事件循环（Event loop）
在 Javascript 执行引擎之外，有一个任务队列，当在代码中调用 setTimeout() 方法时，注册的延时方法会交由浏览器内核其他模块（以 webkit 为例，是 webcore 模块）处理，当延时方法到达触发条件，即到达设置的延时时间时，这一延时方法被添加至任务队列里。这一过程由浏览器内核其他模块处理，与执行引擎主线程独立，执行引擎在主线程方法执行完毕，到达空闲状态时，会从任务队列中顺序获取任务来执行，这一过程是一个不断循环的过程，称为事件循环模型。

同步：就是执行栈(主线程)执行的代码，形成一个执行栈，在主线程上排队执行任务，前一个任务完成才能执行后一个任务
异步：就是在异步队列中的代码，形成一个“任务队列”，不进入主线程，而是进入任务队列，只有任务队列通知主线程，某个异步任务可以执行了，改任务才会进入主线程执行，任务队列中存放的是回调函数一旦“执行栈”中所有同步任务执行完毕，系统就会读取任务队列

### 为什么要有宏任务和微任务

因为任务队列是先进先出的原则，无法控制事件被添加到队伍里的位置，如果一个事件想要优先于其他的任务执行。只有宏任务是无法实现的，为了执行优先级比较高的任务，就引入了微任务的概念  
宏任务是由宿主发起的(浏览器和 Node)，微任务是由 JS 自身发起的。因为同步任务都是宏任务，所以需要理解哪些异步任务是宏任务哪些是微任务？
宏任务和微任务都有自己的 Event Queue，各自进入自己的 Event Queue 中等待执行。当一段代码载入内存中开始执行后，整体代码作为第一个宏任务开始执行，如果有微任务的话送入对应的 Event Queue 中，宏任务执行完毕后再执行微任务，之后接着执行宏任务，就这样循环依次执行，称之为事件循环（JS 的执行机制）。

macro-task（宏任务）： 整体 JS 代码、setTimeout、setInterval、IO 操作、MessageChannel  
micro-task（微任务）：new Promise().then、catch、finally 里的回调、process.nextTick（Node 环境）， MutaionOberver（浏览器环境），queueMicrotask

### queueMicrotask 为什么我们需要这个 api？

从微任务本身的概念来说的话，就是当我们期望某段代码，不阻塞当前执行的同步代码，同时又期望它尽可能快地执行时，我们就需要它。
一般情况下，如果是编写业务代码，我觉得很少会遇到这样的需求，唯一能想到的情况可能存在于一些对即时反馈有性能要求的场景，比如搜索，当输入关键字后发送异步请求获取搜索信息之后，我们可能会在前端对搜索结果进行一些处理，比如排序或者分组，但是这些操作可能不是优先级最高的任务，但它们又比较耗时（比如排序），因此我们可能期望推迟它们的执行，但又期望它们尽可能早地执行。通过引入 queueMicrotask()，可以避免通过 promise 去创建微任务而带来的风险。举例来说，当使用 promise 创建微任务时，由回调抛出的异常被报告为 rejected promises 而不是标准异常。同时，创建和销毁 promise 带来了事件和内存方面的额外开销，这是正确入列微任务的函数应该避免的。

```js
setTimeout(() => {
	console.log('setTimeOut');
}, 0);

queueMicrotask(() => {
	console.log('queMicroTask1');
});

Promise.resolve().then(() => {
	console.log('queMicroTask2');
});
// queMicroTask1 queMicroTask2 setTimeOut
```

```js
console.log('a');
setTimeout(() => {
	console.log('b');
}, 0);
console.log('c');
Promise.resolve()
	.then(() => {
		console.log('d');
	})
	.then(() => {
		console.log('e');
	});
console.log('f');

// a -> c -> f -> d -> e -> b
```

上面这题的分析过程是：先执行主线程上的同步任务输出：acf, 然后把 b 这个异步任务放到了任务队列中去，要到在后面一轮宏任务的时候在执行。de 都是微任务会在 b（下一轮宏任务）之前执行。

```js
console.log(1);
new Promise((resolve) => {
	console.log('Promise函数在执行resolve方法前');
	resolve();
	setTimeout(() => {
		console.log('promise方法里面的setTimout');
	});
	// console.log('Promise2函数在执行then方法后')
}).then(console.log('Promise函数在执行then方法'));
console.log(3);
```

这道题比较容易造成混乱的点就是分不清楚异步任务、微任务、同步任务的关系  
1 是同步任务，“Promise 函数在执行 resolve 方法前”也是同步的，而且都是宏任务，“Promise 函数在执行 then 方法” 是微任务， 3 是同步任务是宏任务，“promise 方法里面的 setTimout”是异步任务而且是在第一轮宏任务执行的时候，需要先放到任务队列里面，等第一轮宏任务和微任务都执行完了之后第二轮宏任务开始的时候才能执行的

```js
console.log(1);
setTimeout(() => {
	console.log(2);

	process.nextTick(() => {
		console.log('这是在nextTick中的代码');
	});
	new Promise((resolve) => {
		console.log('Promise函数在执行resolve方法前');
		resolve();
	}).then(console.log('Promise函数在执行then方法'));
}, 2000);
```

vue 在修改数据后，视图不会立即更新，而是等同一事件循环中所有数据完成变化后在统一进行视图更新
user agent(浏览器端)用于协调用户交互（鼠标、键盘）脚本（JavaScript）渲染（HTML DOM CSS 样式）网络等行为的一个机制。
user agent 需要通过事件循环来与多种事件源交互
外部队列（TaskQueue）：
浏览器协调的各类事件的队列
DOM 操作，
用户交互（鼠标键盘）
网络请求（Ajax）
History API
定时器（SetTimeOut）
每一个外部事件源都会有一个对应的外部队列，不同事件源的队列可以有不同的优先级
内部队列（Microtask Queue）：
Promise 的成功与失败
MutationObserver
Object.observe(废弃)
JavaScript 内部执行的任务队列
实际上是 Set，排到前面没有满足条件也不会先执行
