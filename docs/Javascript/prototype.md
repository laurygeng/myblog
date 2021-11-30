## 什么是原型链？  ##  
每个对象（实例）都有一个_proto_属性（隐式原型），此属性指向该对象的构造函数原型，对象通过_proto_与上游构造函数原型对象链接起来，组成原型链。  
实例能够访问在构造函数原型中定义的属性和方法。
prototype是对象（构造函数）特有的属性，原型属性，这个属性是一个指针，指向原型对象，原型对象包含所有实例共享的属性和方法。  
原型对象有一个属性是constructor,这个属性包含了一个指针，指回原构造函数。
简单的说，构造函数、原型和实例的关系是：每个构造函数都有一个原型对象，原型有一个属性指回构造函数，而实例有一个内部指针指向原型。

<img src="/images/proto.png" alt="图片替换文本" width="500" height="313" align="bottom" /> 

## 构造函数  ##  
构造函数：
构造函数的首字母都会大写，以函数的形式为自己的对象定义属性和方法
在内存中创建一个对象
## new一个对象的过程？  ##
[手写new](/Javascript/code1)  
1.创建一个新对象  
2.新对象会被执行prototype连接：son._proto_=mother.prototype  
3.新对象和函数调用的this会绑定起来Mother.call(son, "xxx")  
4.执行构造函数中的代码Son.lastName

```
function mother(lastName){
    this.lastName = lastName
    return this
}
var son = new Mother(lastName)
```

新对象内部的[[prototype]]属性被赋值为构造函数的prototype属性
构造函数内部的this被赋值为这个对象（this指向新对象）
每个原型都会创建一个[[prototype]]属性（指向原型对象），这个对象包括了所有实例共享的属性和方法
Person.prototype.constructor指向Person构造函数  

   



ES6之前都是用函数+原型链的方式来模拟定义类，缺少静态类型检查  
用对象字面量的方法来创建原型方法，会破坏原型链，这样做相当于重写了原型链。  
缺点：原型之间的引用值会在所有实例之间共享，这就是为什么属性通常会定义在构造函数上而不是定义在原型上。  
子类型在实例化的时候不能给父类型传参，上述两条导致了原型链基本不能单独直接使用



