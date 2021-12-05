### 手写代码_应用  ###


#### Promise ####  



#### Promise 实现并发控制 ####  

```
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

#### 节流与防抖 ####   
都是为了限制函数的执行频次，以优化函数触发频率过高导致的响应速度跟不上触发频率，出现延迟，假死或者卡顿的现象  
函数防抖：将多次操作合并为一次操作进行。原理是维护一个计时器，规定在delay时间后触发函数，但是在delay时间内再次触发的话，就会取消之前的计时器而重新设置。这样一来，只有最后一次操作能被触发。  
应用场景：防止按钮提交表单的时候多次调用，只提交最后一次  
函数节流：使得一定时间内只触发一次函数。原理是通过判断是否有延迟调用函数未执行。  
应用场景：高频次触发位置变动，拖拽，缩放  
区别： 函数节流不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数，而函数防抖只是在最后一次事件后才触发一次函数。 比如在页面的无限加载场景下，我们需要用户在滚动页面时，每隔一段时间发一次 Ajax 请求，而不是在用户停下滚动页面操作时才去请求数据。这样的场景，就适合用节流技术来实现。  
实现防抖函数  
触发高频事件后n秒内，函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间。  
每次触发事件时，设置一个延迟调用方法，并且取消之前的延时调用方法，如果事件在规定时间间隔内被不断的触发，则调动方法会被不断的延迟。  

```
function debounce(func, ms){
	let timeout;
  return function(){
    let context = this;
    let args = arguments;
    if(timeout)clearTimeout(timeout);
    timeout = setTimeout(()=>{func.apply(context,args)},ms);
  }
}
```
```
function useDebounce(fn, delay, dep=[]){
	const { current } = useRef({fn, timer:null});//useRef实现了react组件的缓存机制，每次渲染都会返回相同的引用
  useEffect(function(){
    current.fn = fn;
  },[fn]);
  return useCallback(function f(...args){
  	if(current.timer){
      clearTimout(current.timer);
    }
    current.timer = setTimeout(()=>{
    	current.fn.call(this, ...args);
    },delay);
  },dep)
}
```

实现节流函数
高频事件触发，但在n秒内只会执行一次，节流会稀释函数的执行频率
     实现方式：每次触发事件时，如果当前有等待执行的延时函数，则直接return

```
function throttle(func, ms){
  let previous = 0;
  return function(){
    let now = Date.now();
    let context = this;
    let args = arguments;
    if(now - previous > ms){
      func.apply(context, args);
      previous = now;
    }
  }
}
```

```
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