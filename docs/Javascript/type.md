## 数据类型 ##  

语言类型javascript是一种（弱类型）动态类型语言，在运行过程中需要检查数据类型的语言，还可以发生隐式类型转换  

8种,7种基本数据类型和1种引用类型  

1.undefined(未定义)（常量）  
2.null（空对象）（保留关键字）  
3.number  
4.string  
5.boolean  
6.symbol（唯一的常量，用于对象属性保持唯一性，避免被覆盖的情况，实例唯一且不可变）  
symbol的应用主要在三个方面，防止XSS，私有变量，防止属性被污染  
7.bigint  
8.object（Date，Array，Set，RegExp，Function, Error）  

基本数据类型，存放在栈里，栈的空间大小固定，在变量定义的时候就分配好了内存空间，原始类型是不可变的，操作之后会产生新的值。
```
var str = 'abc';
str.slice(1);
str.substr(1);
str.trim(1);
str.toLowerCase(1);
str[0] = 1;
console.log(str);  // abc

```
引用类型，存放在堆里，存储空间的大小不固定可以动态调整。空间较大，运行效率低。  
引用类型的值实际存储在堆内存中，在栈里存放固定长度的地址，地址指向堆内存中的值。  
存放引用的地址是因为引用类型数据比较大，在栈里影响上下文切换的效率以及整个程序执行的效率。引用类型就不再是不可变的了

## 判断数据类型有那些方法？利弊？  ## 
#### typeof #### 
判断所有变量的类型，返回值有number，boolean，string，function，object，undefined  
typeof对于丰富的对象实例，只能返回"Object"字符串  
null和数组的判断都是不正确的  
typeof null //object  
typeof undefined //undefined  
typeof [] //object  
typeof new Date()//object  
typeof new RegExp()//object  

#### instanceof ####  
[手写instanceof](/Javascript/code1)  
用来判断对象，代码形式为obj1 instanceof obj2（obj1是否是obj2的实例）  
如果是则返回true，否则返回false，obj2必须为对象，否则会报错！  
instanceof检测的是原型，内部机制是通过判断对象的原型链中是否有类型的原型  

```
function instance(left,right){
    let prototype = right.prototype;  //获取类型的原型
    let proto = left.__proto__;       //获取对象的原型
    while(true){    //循环判断对象的原型是否等于类型的原型，直到对象原型为null，因为原型链最终为null
       if (proto === null || proto === undefined){
           return false;
       }
       if (proto === prototype){
           return true;
       }
       proto = proto.__proto__;
     }
}
```

#### toString()  ####

是Object的原型方法，调用该方法，默认返回当前对象的[[Class]]。这是一个内部属性，其格式为[object Xxx],其中Xxx就是对象的类型。对于Object对象，直接调用toString()就能返回[object Object],而对于其他对象，则需要通过call、apply来调用才能返回正确的类型信息。

==typeof==只能检测基本数据类型，对于null还有Bug；  
==instanceof==适用于检测对象，它是基于原型链运作的；  
==constructor==指向的是最初创建者，而且容易伪造，不适合做类型判断；  
==Object.prototype.toString==适用于ECMA内置JavaScript类型（包括基本数据类型和内置对象）的类型判断；
基于引用判等的类型检查都有跨窗口问题，比如instanceof和constructor。  
总之，如果你要判断的是基本数据类型或JavaScript内置对象，使用toString； 如果要判断的时自定义类型，请使用instanceof。

## 深copy和浅copy ## 
[手写深copy](/Javascript/code1)  
复制一个变量到另一个变量时，原始类型和引用类型的表现是不一样的
复制一个基本类型的时候，在内存中创建了一块新的空间存储，虽然两者是相同的，但是两者指向的内存空间完全不同，这两个变量参与任何操作都互不影响。
当我们复制引用类型的变量时，实际复制的是栈中存储的地址，所以复制出来的新对象和原来的对象指向堆中的同一个对象，因此，改变其中的任何一个变量的值，另一个变量都会受到影响，这就出现了深拷贝和浅拷贝的区别。
浅拷贝只复制对象的第一层属性，深拷贝是对对象的属性进行递归复制
Object.assign()是浅拷贝

```
function clone (target) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        for (const key in target) {
            cloneTarget[key] = clone(target[key]);
        }
        return cloneTarget;
    } else {
        return target;
    }
};

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8]
};

console.log(clone(target));

```
## 函数是值传递 ## 
ECMAScript 中所有的函数参数都是按值传递的
当变量是原始类型的时候，这个副本就是值本身，当变量是引用类型时，这个副本就是指向堆内存的地址




