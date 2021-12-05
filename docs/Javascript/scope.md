### 作用域及作用域链 ###  
#### 什么是context？ ####   
代码运行时，会产生一个对应的执行环境，在这个环境中，所有变量会被事先提出来（变量提升）有的直接赋值，有的为默认值undefined，代码从上往下开始执行，就叫执行上下文。 

Javascript运行环境有三种：  
全局环境：代码首先进入的环境  
函数环境：函数被调用时执行的环境  
eval函数

#### 执行上下文的特点 ####    
单线程，在主进程上运行  
同步执行，从上往下按顺序执行
全局上下文只有一个，浏览器关闭时会被弹出栈
函数执行上下文没有数目限制
函数每被调用一次，都会产生一个新的执行上下文环境

执行上下文共分3个阶段，分别是：  
1.创建阶段  
　　　　　　(1).生成变量对象 (参数、变量、函数对象) 
　　　　　　(2).建立作用域链  （当前变量对象+所有父级变量对象）
　　　　　　(3).确定 this 指向  
 
　　　　2.执行阶段  
　　　　　　(1).变量赋值  
　　　　　　(2).函数引用  
　　　　　　(3).执行其他代码  
 
　　　　3.销毁阶段  
　　　　　　执行完毕出栈，等待回收被销毁    

作用域链相当于一个集合，这个集合里面包含了所有当前变量对象+所有父亲的变量对象，结合事件循环机制理解代码的执行  
浏览器先执行同步任务，把异步任务放到任务队列里。例如，执行栈在执行完所有的任务后在根据setTimeout的时间间隔执行  
在没有块级作用域之前，只有全局作用域这时候就需要闭包  
结合let var const的区别理解变量提升  
结合代码执行过程深入理解作用域和作用域量demo


#### 闭包 #### 
在理解作用域链之后，就可以理解闭包。全局执行上下文，books执行上下文，匿名函数执行上下文
闭包是函数和声明该函数的词法环境的组合（函数和函数体内可访问的变量的总和）  

```
function books(){
    var book = '语文'；
    return function(){
        console.log(book);
    }
}
var bag = books();
bag();

```
需要结合事件循环机制去理解
```
for(var i=0; i<5; i++){
    (function(x){
        setTimeout(function(){
        console.log(x++);
    },4000)
    })(i);
}

```
```
function Person(){
  var name = 'cxk';
  this.getName = function(){
  	return name;
  }
  this.setName = function(value){
    name = value;
  }
}
const cxk = new Person();
console.log(cxk.getName());
cxk.setName('xxx');
cxk.getName();//xxxx
console.log(name);//name is not defined
```

1. 闭包的作用：
隐藏变量，内部函数总是可以访问其所在的外部函数中声明的参数和变量，即使在其外部函数被返回了之后
Javascript可以实现私有变量，特权变量，储存变量。闭包的最大作用就是延长作用域的生命周期
变量在全局上下文中，不主动销毁，那么它的生存周期则永久的。变量如果是处于函数上下文中，它会随着函数调用的结束而被销毁。  
外部无法访问，相当于讲变量私有化
变量私有化的其他方法？Proxy代理，Symbol~

####  一段JavaScript代码是如何执行的？（执行机制）####   
详细参考EventLoop[手写new](/Browser/eventloop) 
Event Loop是JS的执行机制，也是JS实现异步执行的一种方法。
JS的执行和运行：
JS可以在不同的环境中执行，比如浏览器，node等，但是不同的环境执行方式是不同的。
但是不管在那种环境下JS运行是统一的，运行是指JS的解析引擎
<img src="/images/event.png" alt="图片替换文本" width="500" height="400" align="bottom" /> 

  如上图，当JS开始执行后，所有的同步任务进入主线程依次排队执行，异步任务则被送入Event Table中注册函数，当指定的事件完成后由被送入Event Queue中等待主线程执行栈的同步任务执行完后调取异步任务的函数执行。

#### 柯里化 ####  
只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数, 调用add之后，返回的函数就通过闭包的方式记住了add的第一个参数，所以说柯里化本身也是闭包的一种使用应用。
函数柯里化是一种思想，把函数的结果缓存起来。

```
var add = function(x){
  return function(y){
    retrun x+y;
  };
};
var increment = add(1);
var addTen = add(10);

increment(2);//3
addTen(2);//12
add(1)(2);//3
```

#### this #### 



