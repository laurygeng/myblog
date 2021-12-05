#### webpack ####  
JavaScript应用程序的静态模块打包器（Module bundler），当webpack处理应用程序时，它会递归的构建一个依赖关系图（denpendency graph）  其中包含应用储蓄需要的每个模块，然后将所有这些模块打包成一个或多个bundle

#### webpack配置 ####  
+ chunk:代码块，一个chunk可能由多个模块组合而成，也用于代码合并分割    
+ bundle：资源经过webpack流程解析编译后最终输出的文件    
+ entry：入口起点，构建依赖图的起点  
+ output： 打包的输出配置，输出文件名、位置信息
+ loader：默认情况下，webpack仅支持.js .json文件通过loader，可以解析成其他类型的文件，只要有相应的loder就可以处理任何类型的文件  
常见loader：style-loader css-loader less-loader sass-loader ts-loader babel-loader file-loader eslint-loader
+ plugin：webapck打包过程是有生命周期概念钩子的，控制构建流程，执行特殊任务，作用于webpack打包整个过程
htmlwebpackplugin会在打包结束后，自动生成一个html文件，并把打包生成的js模块引入到该html中
+ mode：4.0开始，webpack支持零配置，mode指定打包的目标环境，便于启用webpack针对不同环境下内置的优化

#### 如何编写一个loader ####   


#### 如何编写一个plugin ####     



#### 性能优化 #### 
