## 继承的方法及优缺点 ##  

#### 原型继承  ####  
在一个类上创建两个实例，在一个实例对象上修改属性，另一个实例上的属性也会被修改。  
```
function Parent() {   
    this.name = "parent"  
    this.arr = [1, 2, 3]  
}
 
function Child() {
    this.type = 'child'
} 

Child.prototype = new Parent()  
let s1 = new Child()  
let s2 = new Child()  
s1.arr.push(2222)  
console.log(s2.arr)//[ 1, 2, 3, 2222 ]  
console.log(s1.arr)//[ 1, 2, 3, 2222 ]
```    

#### 构造函数继承  ####  

解决了引用类型共享的问题，缺点是子类无法继承父类的方法。  
必须在构造函数中定义方法，函数不能重用，而且子类也不能访问父类原型上的方法，因此也基本不能单独使用  

```
function Child() {
    Parent.call(this)//父级构造函数的那个类指向子构造函数的实例上(原理)
        //定义自己的属性
    this.value = 'test'
}  
let child1 = new Child()
let child2 = new Child()
child1.color.push("white")
console.log(child1)
name: undefined,
color: ['pink', 'red', 'white'],
value: 'test'
console.log(child2) //Child { name: undefined, color: [ 'pink', 'red' ], value: 'test' }
```      
#### 组合继承  ####
核心是在子类的构造函数中通过Parent.call(this)继承父类的属性，然后改变子类的原型为new Parent()来继承父类的函数。这种继承的方式优点在于构造函数可以传参，不会与父类引用属性共享，可以复用父类的函数，但是也存在一个缺点就是在继承父类函数的时候调用了父类构造函数，导致子类的原型上多了不需要的父类属性，存在内存上的浪费。
```
function Child(value){
  Parent.call(this, value)
}
Child.prototype = new Parent();
```    

#### 寄生组合继承  ####
将父类的原型赋值给子类，并且将构造函数设置为子类，这样既解决了无用的父类属性问题，还能正确的找到子类的构造函数。ES5通过增加Object.creat()方法将原型式继承的概念规范化了。这个方法接收两个参数：作为新对象原型的对象，以及给对象定义额外属性的对象（第二个可选）是引用类型继承的最佳模式 			 	 

```
function Child(value){
  Parent.call(this, value)
}
Child.prototype = Object.create(Parent.prototype,{
  constructor:{
		value: Child,
    enumerabble:false,
    writable: true,
    configrable: true
}})
```

#### Class继承  ####  
class还是一个语法糖，其本质还是函数，核心是使用关键字extends 并在子类中使用关键字super   

```
class Person = {}
console.log(typeof Person)//function
class Parent{
	constructor(value){
    this.val = value
  }
  getValue(){
    console.log(this.val)
  }
}
class Child extends Parent{//extends则表示原型链对象来自Parent
  constructor(value){
    super(value)//调用父类的构造方法-相当于Parent.call(this, value)
    this.val = value
  }
}
let child = new Child(2);
child.getValue();//2
console.log(child instanceof Parent)//true
```

React中已经抛弃了混入模式，转向了组合模式，把方法提取到独立的类和辅助对象中，然后把他们组合起来，但不继承，软件设计原则，组合胜过继承，composition over inheritance, 这个设计原则被很多人遵循在代码设计中能提供极大的灵活性。

