#### lifecycle  ####    
React生命周期

#### componentDidMount ####
不推荐直接在这个阶段直接调用setState，componentDidMount本身处于一次更新中，我们又调用了一次setState，就会在未来再进行一次render，造成不必要的性能浪费，大多数情况可以设置初始值来搞定。  

当然在componentDidMount我们可以调用接口，再回调中去修改state，这是正确的做法。  

当state初始值依赖dom属性时，在componentDidMount中setState是无法避免的。  

#### render #### 
该方法会执行两次，state改变，或者父组件重新render，props发生改变会在重新render
ReactFiberWorkLoop
construct:
在ReactFiberBeginWork的时候
第一次初始化
constructClassInstance(workInProgress, Component, nextProps)
const instance = new ctor(props, context)-获取当前的实例

getDerivedStateFromProps（在挂载阶段和更新阶段都会用到）
这是一个static属性，是不能被实例对象（instance，需要通过ctor（类）来获得）获取到的
处理state，prevState，partialState
不为空就要合并，然后替换

shouldUpdate在初始化阶段必须是true，
在更新阶段nextUnitofWork：每次完成当前单元的执行之后，就会拿到一个nextUnitofWork

Render是dom渲染完成了，render完了就把child放到nextUnitofWork
ReactUpdateQueue里面

commitRootImpl，最终是要调用这个函数的，在commit之前一定会调用这个函数
CommponentDidMount是组件挂在完成，是在提交阶段
在ReactFiberCommitWork，阶段CommitLifeCycle里面
卸载只能发生一次

更新的时候：setState，forceUpdate，或者props发生改变的时候（New Props）
生命周期分成三个阶段：挂载时，更新时，卸载时
类，所以会先走到constructor里面

<img src="/images/reactlifecycle1.png" alt="图片替换文本"  align="bottom" /> 
<img src="/images/reactlifecycle2.png" alt="图片替换文本"  align="bottom" /> 
v16.4之后
v17可能会废弃的三个生命周期用getDervedStateFromProps替代
componentWillMount
componentWillReceiveProps
componentWillUpdate
废弃的原因是Fiber结构，Fiber出现以后，任务可以中断，可以分解多次执行，will的会被多次执行，不符合设计逻辑。增量渲染（把渲染任务拆分成块，匀到多帧）
引入两个新的生命周期函数：
static getDervedStateFromProps
getSnapshotBeforeUpdate-在最近一次渲染输出之前调用，此生命周期的任何返回值将作为参数传递给componentDidUpdate(preProps, preState, snapshot)
这两个方法都是在constructor之后执行的，但是在这个方法里面拿不到实例对象，设计者希望可以成为一个纯函数，不要在这个方法里面去改变逻辑

