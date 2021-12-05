### Redux ###  

JavaScript状态容器，提供可预测的状态管理。
Reducer是一个纯函数，定义了修改规则，初始化修改状态函数，它接受Action和当前State作为参数，返回一个新的State。  
State一旦变化，Store就会调用监听函数Store.subscribe(listener),listener可以通过store.getState()拿到最新的状态。  
如果使用是React，可以触发重新渲染View。  
dispatch是一个派发方法，提交更新，告诉store那些数据需要改变（只接受对象）  
用户发出Action，然后Store自动调用Reducer，并且传入两个参数：当前State和收到的Action。Reducer会返回新的State。  
subscribe变更订阅，callback当store中的，数据发生改变的时候，执行callback，可以调用forceUpdate让数据发生更改，或者重新render。  
store.subscribe()允许使用store设置监听函数，一旦State发生变化，就自动执行这个函数。  

默认只支持同步，实现异步任务的时候，比如延迟或者网络请求，需要中间件（Redux-thunk）的支持  

### 什么是纯函数？ ###  
相同的输入永远返回相同的输出  
不修改函数的输入值  
不依赖外部环境状态  
无任何副作用  
使用纯函数的优势：便于测试，有利重构  
```
function listerner(){
  let newState = store.getState();
  	component.setState(newState);
}
```
### React-Redux ###  
中间件函数，对store的dispatch方法进行改造，每次写getState和render太麻烦了，React-Redux提供了Provider为后代组件提供Store，
connect为组件提供数据和变更方法：connect方法把store注入到组件的props中，connect方法的第一个参数是一个函数，该函数的第一个参数就是store中的state，该函数的返回值将被结构赋值给props：this.props.items
Hook使用useSelector获取Store，useDispatch获取dispatch

