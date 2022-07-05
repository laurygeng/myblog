### 手写代码应用

#### Promise

在实现 Promise 手写之前可以先了解一下 Promise 是什么，Promise 是一个对象，表示将来可能会用到的值。  
promise = new Promise(executor)，executor(Function, Function) -> any ，executor 是带有 resolve 和 reject 两个参数的函数，  
决定了 promise 是完成还是拒绝。Promise 的主要业务流程都在 executor 函数中执行。传入的执行器会立即执行
Promise 对于处理异步 API 很有用，Promise 的状态不可逆，promise 只能从 pending 到 rejected, 或者从 pending 到 fulfilled，状态一旦确认，就不会再改变；同时调用 resolve 函数和 reject 函数，默认会采取第一次调用的结果。

```js
const PENDING = "pending";
const FULLFILLED = "fullfiled";
const REJECTED = "rejected";

class myPromise = {
  //executor在构造函数中执行，将promise的状态改为fulfilled（完成）或rejected（失败）
  constructor(executor){
    try{
      // 立即执行，将 resolve 和 reject 函数传给使用者，executor的resolve或reject执行以后，Promise的状态就立刻改变（change synchronously）
      executor(this.resolve, this.reject)
    }catch(error){
      // 发生异常时执行失败逻辑
      this.reject(error)
    }
  }
  status = PENDING;
  value = null;
  reason = null;

  onFullfilledCallbacks = [];
  onRejectedCallbacks = [];

  //调用该函数完成promise
  resolve = (value)=>{
       // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
    if(this.status === PENDING){
      this.status = FULLFILLED;
      this.value = value;
      while(this.onFullfilledCallbacks.length){
        this.onFullfilledCallbacks.shift()(value)
      }
    }
  }
  //调用该函数拒绝promise
  reject = (reason)=>{
       // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
      if(this.status === PENDING){
      this.status = REJECTED;
      this.reason = reason;
      while(this.onRejectedCallbacks.length){
        this.onRejectedCallbacks.shift()(reason)
      }
    }
  }
  //实例成员-另外实例成员还有catch
  then(onFulfilled, onRejected){

    // promise 可以 then 多次，每次执行完 promise.then 方法后返回的都是一个“新的promise"；「规范 Promise/A+ 2.2.7」
    //为了链式调用这里创建一个mypromise return出去
    // 如果 promise 被完成，则会调用onFulfilled函数。函数的第一个参数是 promise 完成的值。
    // 如果 promise 被拒绝，则会调用onRejected函数。函数的第一个参数是 promise 被拒绝的原因。
    // 如果此函数返回的值不是 Promise，则返回值会作为完成 nextPromise 的值。如果返回值是 Promise，则 nextPromise 的值取决于 Promise 的内部状态。
    // 如果此函数抛出异常，nextPromise 会被拒绝。如果 onFulfilled 是 null，则它会被忽略。
      const promise2 = new myPromise((resolve, reject)=>{
      const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
      const realOnRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};
      const fullfilledMicrotask = ()=>{
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {// 模拟异步也可以用setTimeout(() => {})
                             // 如果你想实现 promise 的微任务，可以 mutationObserver 替代 seiTimeout 来实现微任务。
          try {
            // 获取成功回调函数的执行结果
            const x = realOnFulfilled(this.value);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        })
      }
      const rejectedMicrotask = ()=>{
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            const x = realOnFulfilled(this.reason);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        })
      }
      if(this.status === FULFILLED){
        fullfilledMicrotask()
      }else if(this.status === REJECTED){
        rejectedMicrotask()
      }else if(this.status === PENDING){
        // 不知道状态的变化情况，所以将成功回调和失败回调存储起来,等到执行成功失败函数的时候再传递
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    })
    return promise2
  }

  function resolvePromise(promise2, x, resolve, reject){
    //避免循环
    if(promise2 === x){
      return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    // 判断x是不是 MyPromise 实例对象
    if(x instanceof MyPromise) {
      // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
      // x.then(value => resolve(value), reason => reject(reason))
      // 简化之后
      x.then(resolve, reject)
    } else{
      // 普通值
      resolve(x)
    }
  }

  // resolve 静态方法-静态方法的好处就是不用实例化也可以直接调用
  static resolve (parameter) {
    // 如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter;
    }
    // 转成常规方式
    return new MyPromise(resolve =>  {
      resolve(parameter);
    });
  }
  // reject 静态方法
    // Promise.reject(reason)就是下面代码的语法糖形式：
  //   new Promise(function(resolve, reject){
  //     reject(reason);
  // });
  static reject (reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
  // 静态成员还有all和race
  // Promise.all(promises)如果所有 promises 都已完成，则返回完成的 promise；只要其中有一个 promise 是拒绝的，就返回拒绝的 promise
  // Promise.race(promises)只要其中一个 promise 被完成或拒绝，就会返回完成的 promise

}

```

#### Promise.all

```js
Promise.all = function (promises) {
	return new Promise((resolve, reject) => {
		const length = promises.length;
		if (length == 0) {
			return resolve([]);
		} else {
			const res = [];
			const count = 0;
			for (let i = 0; i < length; i++) {
				Promise.resolve(promises[i])
					.then((data) => {
						res[i] = data;
						if (++count == length) {
							resolve(res);
						}
					})
					.catch((err) => {
						reject(err);
					});
			}
		}
	});
};
```

#### Promise 实现并发控制

```js
class createLimitPromise(limitNum, promiseList){

	let resArr = [];
  let handling = 0;
  let resolveNum = 0;
  let promiseList = [...promiseList];
  let runTime = promiseList.length;

  return new Promise(resolve=>{
  	for(let i=1; i<=limitNum; i++){
    	run();
    }
  })
  function run(){
  	if(!promiseList.length)return
    handling +=1;
    console.log("current handling:"+ handling)
    handle(promiseList.shift()).then(res=>{
    	resArr.push(res);
    }).catch(e=>{
      console.log("catch error");
    }).finally(()=>{
    	handling -= 1;
      resolvedNum += 1;
      console.log(`resolvedNum:${resolvedNum}`);
      if(resolvedNum === runTime){
         resolve(resArr);
      }
      run();
    })
  }
  function handle(promise){
  	return new Promise((resolve, reject)=>{
    	promise.then(res=> resolve(res).catch(e=>reject(e)));
    })
  }
}
```

#### 节流与防抖

都是为了限制函数的执行频次，以优化函数触发频率过高导致的响应速度跟不上触发频率，出现延迟，假死或者卡顿的现象  
函数防抖：将多次操作合并为一次操作进行。原理是维护一个计时器，规定在 delay 时间后触发函数，但是在 delay 时间内再次触发的话，就会取消之前的计时器而重新设置。这样一来，只有最后一次操作能被触发。  
应用场景：防止按钮提交表单的时候多次调用，只提交最后一次  
函数节流：使得一定时间内只触发一次函数。原理是通过判断是否有延迟调用函数未执行。  
应用场景：高频次触发位置变动，拖拽，缩放  
区别： 函数节流不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数，而函数防抖只是在最后一次事件后才触发一次函数。 比如在页面的无限加载场景下，我们需要用户在滚动页面时，每隔一段时间发一次 Ajax 请求，而不是在用户停下滚动页面操作时才去请求数据。这样的场景，就适合用节流技术来实现。  
实现防抖函数  
触发高频事件后 n 秒内，函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间。  
每次触发事件时，设置一个延迟调用方法，并且取消之前的延时调用方法，如果事件在规定时间间隔内被不断的触发，则调动方法会被不断的延迟。

```js
function debounce(func, ms) {
	let timeout;
	return function () {
		let context = this;
		let args = arguments;
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			func.apply(context, args);
		}, ms);
	};
}
```

```js
function useDebounce(fn, delay, dep = []) {
	const { current } = useRef({ fn, timer: null }); //useRef实现了react组件的缓存机制，每次渲染都会返回相同的引用
	useEffect(
		function () {
			current.fn = fn;
		},
		[fn]
	);
	return useCallback(function f(...args) {
		if (current.timer) {
			clearTimout(current.timer);
		}
		current.timer = setTimeout(() => {
			current.fn.call(this, ...args);
		}, delay);
	}, dep);
}
```

实现节流函数
高频事件触发，但在 n 秒内只会执行一次，节流会稀释函数的执行频率
实现方式：每次触发事件时，如果当前有等待执行的延时函数，则直接 return

```js
function throttle(func, ms) {
	let previous = 0;
	return function () {
		let now = Date.now();
		let context = this;
		let args = arguments;
		if (now - previous > ms) {
			func.apply(context, args);
			previous = now;
		}
	};
}
```

```js
function useThrottle(fn, delay, dep=[]){
  const { current } = useRef({fn, timer:null});
  useEffect(()={
  	current.fn = fn;
  },[fn]);
  return useCallback((...args)=>{
  	if(!current.timer){
      const current.timer = setTimeout(()=>{
      	delete current.timer
      },delay);
      current.fn.call(this, ...args)
    }
  },dep);
}
```
