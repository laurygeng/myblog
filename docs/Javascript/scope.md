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
结合代码执行过程深入理解作用域和作用域链

```
var b = "boy";
console.log(b);
function fighting () {
    console.log(a);
    console.log(c);
    if (a === 'apple') {
        a = "Alice"
    } else {
        a = 'Ada'
    }
    var a = "Andy";
    console.log(a);
    middle();
    function middle () {
        console.log(c++);
        var c = 100;
        console.log(++c);
        small()
        function small () {
            console.log(a);
        }
    }
    var c = a = 88;
    function bottom () {
        console.log(this.b)
        var b = 'baby'
        console.log(b)
    }
    bottom();
}
fighting();
console.log(b);

```

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
详细参考EventLoop[事件循环](/Browser/eventloop) 
Event Loop是JS的执行机制，也是JS实现异步执行的一种方法。
JS的执行和运行：
JS可以在不同的环境中执行，比如浏览器，node等，但是不同的环境执行方式是不同的。
但是不管在那种环境下JS运行是统一的，运行是指JS的解析引擎
<img src="/images/event.png" alt="图片替换文本" width="500" height="500" align="bottom" /> 

  如上图，当JS开始执行后，所有的同步任务进入主线程依次排队执行，异步任务则被送入Event Table中注册函数，当指定的事件完成后由被送入Event Queue中等待主线程执行栈的同步任务执行完后调取异步任务的函数执行。

#### 柯里化 ####  

柯里化的用途是什么呢？参数复用
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

```
function check(reg, txt){
	return reg.test(txt);
}
check(/\d+/g,'test');
check(/[a-z]+/g,'test');

after currying:
function curryingCheck(){
	return function(txt){
  	return reg.test(txt);
  }
}
var hasNumber = curryingCheck(/\d+/g);
var hasLetter = curryingCheck(/[a-z]+/g);
hasNumber('test');
hasLetter('test');
```

#### this #### 

 * this is all about context.

 * this就是找拥有当前上下文（context）的对象（context object）
    可以分为六层，层数越高权力越大，this只会认最大的
+ 第一层：权利最小的大佬就是作为备胎的存在，在普通情况下就是全局，浏览器就是window。在use strict的情况下就是undefined。
+ 第二层：this就是函数前面的. -点(context obj)（这个就是对应详细章节的隐式this，显式this,函数调用模式）  
方法调用模式：  
当一个函数被保存为对象的一个方法时，如果调用表达式包含一个提取属性的动作，那么它就是被当做一个方法来调用，此时的this被绑定到这个对象  

```
var a = 1
var obj1 = {
    a:2,
    fn:function(){
        console.log(this.a)
    }
}
obj1.fn();

obj1.fn.call(obj1);

```

谁调用的函数，this就是谁
DOM对象绑定事件也属于方法调用模式，因此它绑定this就是事件源DOM对象


```
document.addEventListener('click', function(e){
    console.log("点击事件的-也就是延迟函数调用环境中的this"+this);
    //这里的this是根据上下文来决定的
    var self = this;
    setTimeout(function(){
        console.log("点击事件在setTimeout中的this"+self);   // this指向事件源DOM对象
        console.log("延迟函数中的this"+this); // 第二个this，指向window，我心永恒，从未改变
    }, 200);
}, false);

```  
当 foo() 被调用时，它的落脚点确实指向 obj 对象。  
当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象。  
因为调 用 foo() 时 this 被绑定到 obj，因此 this.a 和 obj.a 是一样的。  
隐式绑定必须在对象内部，包含一个指向函数的属性，并通过这个属性间接引用函数，从而把this（隐式）绑定到这个对象上  
普通的函数调用，this绑定到window  

```
function baz() {
	// 当前调用栈是:baz
	// 因此，当前调用位置是全局作用域
	console.log('baz')
	bar() // <-- bar 的调用位置
	console.log('baz函数里的this:' + this)
}

function bar() {
	// 当前调用栈是 baz -> bar
	// 因此，当前调用位置在 baz 中
    console.log('bar');
    this.a = "xxx";
	foo() // <-- foo 的调用位置
	console.log('bar函数里的this:' + this)
}
function foo() {
 	// 当前调用栈是 baz -> bar -> foo // 因此，当前调用位置在 bar 中
 	console.log('foo')
 	console.log('foo函数里的this:' + this)
 }
function foo() {
      console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
obj.foo(); // 2

baz()
```
+ 第三层：使用call和apply，通过参数指定this（第三层和第四层对应章节的改变this，就是call,apply和bind）
+ 第四层：bind通过一个新的函数提供永久绑定，在后面再使用call或者apply会被覆盖掉就不起作用了。（同上）
+ 第五层：new一个函数的时候，就会把this绑定在新对象上，在调用函数的时候，会覆盖bind的绑定（对应new对象，构造器调用模式）
+ 第六层：箭头函数，this被永远封印在词法作用域当中，在代码运行前就可以确定（只要看它在哪里创建的就可以了），没有其他可以覆盖
+ 默认绑定，隐式，显式，new绑定，这四条规则的优先级由上到下以此递减

详细参考[手写bind，call，apply](/Javascript/code1) 
