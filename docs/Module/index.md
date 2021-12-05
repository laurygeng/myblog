### 模块化 ###  

模块化解决的问题是：全局变量污染，命名冲突，文件依赖

#### commonjs #### 
同步阻塞的方式，主要用于服务端Node.js,不会返回promise或者回调 
输出的是值的copy， 
是运行时加载， 
只能是单个， 
是动态语法可以写在判断里， 
this是当前模块 
语法：require（）和module.exports 

#### ES modules ####  
是javascript官方标准化模块系统  
ES6的模块输出的是值的引用，  
编译时加载，  
可以是多个，  
静态语法可以写在顶层，但是可以动态加载？？（可以异步动态import）  
this是undefined??  
语法：import和export，还有export default  
2015年6月ECMAScript2015，ES6发布，本质上是运行时解析（之前加载的时候会生成一个只读引用，等到脚本真正执行时，才会通过引用模块中获取值，如果值发生了变化，导入的地方也会跟着变化，并不会缓存值），成为浏览器和服务器的通用解决方案  

命名空间，立即执行函数，依赖注入（设计模式）  

#### cmd与amd ####  
规范	推崇	代表作
AMD	依赖前置	requirejs
CMD	依赖就近	seajs
cmd是延迟执行，as lazy as possible尽可能的懒加载，