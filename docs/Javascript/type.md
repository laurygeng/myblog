## 数据类型 ##  

语言类型javascript是一种（弱类型）动态类型语言，在运行过程中需要检查数据类型的语言，还可以发生隐式类型转换  

8种,7种基本数据类型和1种引用类型  

1.undefined(未定义)（常量）  
2.null（空对象）（保留关键字）  
3.number  
4.string  
5.boolean  
6.symbol（唯一的常量，用于对象属性保持唯一性，避免被覆盖的情况，实例唯一且不可变）symbol的应用主要在三个方面，防止XSS，私有变量，防止属性被污染  
7.bigint  
8.object（Date，Array，Set，RegExp，Function, Error）  

基本数据类型，存放在栈里，栈的空间大小固定，在变量定义的时候就分配好了内存空间，原始类型是不可变的，操作之后会产生新的值。
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
● 基本实现
  ○ 递归能力
● 循环引用
  ○ 考虑问题的全面性
  ○ 理解weakmap的真正意义
● 多种类型
  ○ 考虑问题的严谨性
  ○ 创建各种引用类型的方法，JS API的熟练程度
  ○ 准确的判断数据类型，对数据类型的理解程度
● 通用遍历：
  ○ 写代码可以考虑性能优化
  ○ 了解集中遍历的效率
  ○ 代码抽象能力
● 拷贝函数：
  ○ 箭头函数和普通函数的区别
  ○ 正则表达式熟练程度




