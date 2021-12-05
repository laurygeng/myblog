### Hooks ###  

React16.8的新特性，Hooks让函数组件有了状态，可以让你在不编写class的情况下使用state(useState, useReducer)，执行副作(useEffect, useLayoutEffect)。  

### Hooks主要优势 ###  

  + 组件间复用状态逻辑（无需修改组件结构）(自定义Hook)之前的方案：connect到store，render props，高阶组件（嵌套地狱）
  + Hooks并非强制按照生命周期划分，生命周期常常包含不相关的逻辑，例如在componentDidMount,componentDidUpdate中获取数据。但是同一个生命周期中也包含很多其他的逻辑，例如设置事件监听，完全不相关的代码在同一个方法中组合在一起，导致逻辑不一致
  + 解决上述Class组件，难以理解的问题：Hooks将组件中相互关联的部分拆成更小的函数（事件订阅，请求函数）而非强制按照生命周期划分。使用reducer来管理组件内部状态。
  + 在箭头函数没有出现之前，要到constructor里面去进行一次this的绑定

### Hooks规则 ###  
只能在函数最外层调用，不能在循环，条件判断，或者子函数中使用  
只能在React的函数组件和自定义Hooks中使用  
因为useState底层采用链表结构实现，有严格的顺序之分  

### Hooks常用API： ###    
改变状态值：  
+ useState  
+ useRecucer  

执行副作用：  

+ useEffect  

effect会在每轮组件渲染完成后执行（componentDidUpdate），一旦effect依赖发生变化就会被重新创建，在useEffect的第二个参数传[]，如果传入依赖项就会在依赖项变更的时候执（componentDidUpdate），这里的依赖项只能是基本类型，不能是指针类型，否则比较不出变化就会进入死循环。通常组件卸载时需要清除effect创建的诸如订阅或者计时器ID等资源，需要返回一个清除函数,防止内存泄露return()=>{}清除函数用来在组件卸载前执行。（componentWillUnmount）
useCallback的目的是在于缓存了每次渲染时inline callback的实例，方便配合子组件的shouldComponentUpdate或者React.memo起到减少不必要的渲染的作用。  

useLayoutEffect：
通过同步执行状态更新可以解决一些特殊场景下的页面闪烁问题，会阻塞渲染，等待useLayoutEffect内部状态修改后才执行，需要谨慎。

应用场景：
子组件用到了容器组件的某个引用类型的变量或者函数，当容器内部的state更新之后，这些变量和函数都会重新赋值，就会导致子组件使用了memo包裹，也会重新渲染，这个时候就需要使用useMemo和useCallback。  

### useMemo ###  
可以帮我们将变量缓存起来，useCallback可以缓存回调函数，它们的第二个参数和useEffect一样，是一个依赖项数组，通过配置依赖项数组来决定是否更新。  

useMemo（Function组件的pureComponet版本的实现，缓存参数）
为了避免在每次渲染时都进行高开销的计算，把“创建”函数和依赖项数组作为参数传入useMemo，仅会在某个依赖改变时才重新计算memoized的值，有助于优化  

### useCallback ###  
（缓存函数，比较依赖项有没有发生变化）  
把内联回调函数以及依赖数组作为参数传入useCallback，它将返回该回调函数的memoized版本，该回调函数仅在某个依赖项改变时才更新，优化非必要渲染的子组件时，将会非常有用。（shouldComponentUpdate）  

### useRef ###   
useRef返回一个可变的ref对象，其.current属性被初始化为传入的参数(initialValue)返回的ref对象在组件的整个生命周期内保持不变。
useImperativeHandle  

### 复用状态逻辑： ###  

自定义Hooks：  

是一个函数名称以use开头，函数内部可以调用其他的Hook  

useScroll
```
const useScroll = (scrollRef) =>{
  const [pos, setPos] = useState([0,0])
  useEffect(()=>{
  	function handleScroll(){
    	setPos([scrollRef.current.scrollLeft, scrollRef.current.scrollTop])
    }
    scrollRef.current.addEventListener("scroll", handleScroll, false) 
    return ()=>{
    	scrollRef.current.removeEventListener('scroll', handleScroll, false)}},[])
		}
  },[])
  return pos
}
export default useScroll
```
useUpdate: 自定义一个更新的hooks来优雅的实现组件的强制更新

```
const useUpdate = ()=>{
	const [, setFlag] = useState();
  const update = ()=>{
  	setFlag(Date.now())
  }
  return update
}
export default useUpdate
```
useState:自定义useState实现类似Class组件setState的方法（添加更新后的回调函数）：
useEffect+useRef来实现  
```
const useCallbackState=()=>{
  const [state, setState] = useState(initState);
	let isUpdate = useRef();
  const setCallbackState=(state, cb)=>{
  	setState(prev =>{
    	isUpdate.current = cb
      return typeof state === 'function'?state(prev):state
    })
  }
  useEffect(()=>{
  	if(isUpdate.current){
    	isUpdate.current()
    }
  })
  return [state, setCallbackState]
}
export default useCallbackState;
```
useContext和creatContext：用这两个API可以实现一个简单的redux  

```
const Context = createContext()
const Provider = (props)=>{
	const [state, dispatch] = useReducer(reducer, props.initialState || 0, init);
  return(
  <Context.Provider value={{state, dispatch}}>{props.children}</Context.Provider>)
  )
 export{Context, Provider}
}
```



