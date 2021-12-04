#### Diff ####  

策略：深度优先，同级比较，借助key判断元素在不同渲染下能保持稳定，有批量新增和删除。
当节点类型不同时，会卸载老的节点，创建新的节点，触发一个完整的重建流程。卸载老树的时候，老的DOM节点会被销毁，组件实例会执行componentWillUnMount, 创建新树的时候，也会有新的DOM节点插入组件实例会执行componetWillMount和componentDidMount，老树相关的state也会被消除
同类型DOM元素，对比新旧元素的属性，保留旧的属性，更新改变的属性，处理完该DOM节点后，递归遍历子节点
同类型组件元素，React更新该组件实例的props，调用componentWillReceiveProps和ComponentWillUpdate，render被调用，diff算法递归遍历新老树
 删除：newNode不存在
替换：vnode和newVnode类型不不同或key不不同时														
更新：有相同的key和类型，但是vnode和newnode不同的时候
Fiber架构，做到了增量渲染，防止掉帧。缺点是单链表结构导致diff不能从两端开始，实现不了双向查找，在时间复杂度有待优化。递归遍历子节点，查看reconcileChildFibers,这个方法相关的源码：单链表的结构，映射了一个map图，mapRemainingChildren图表用key值当做key，value就是Fiber当前元素。ES6把链表结构变成了map结构。根据key值或index的值，查找和删除。老的map有，新的没有就直接删除，初次渲染直接新增。key是标识唯一性，如果新老key值和type值都相同直接复用，不需要重绘。