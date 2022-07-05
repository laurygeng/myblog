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

webpack.config.js不能随便命名，因为它是webpack打包时的默认入口  

webpack打包的时候要先找到依赖图谱对象，然后去执行，plugin就是许多的执行的文件，src就是写源码的地方，a.js b.js
还需要学习快手小程序，支付宝小程序，那些。

public下的文件是静态文件，不会经过webpack打包，相当于一个外链资源
require的文件
var a = require('./a');
a.show();
此时webpack会将a.js打包进引用它的文件中

#### 如何编写一个loader ####   


#### 如何编写一个plugin ####     

webpack 插件是一个具有 apply 方法的 JavaScript 对象。  
apply方法会被webpack compiler调用，并且在整个编译生命周期都可以访问compiler对象。  

#### 性能优化 #### 

开启gzip,通过webpack插件compression-webpack-plugin可以在打包的时候生成.gz文件  
  
```
  configureWebpack: (config) => {
    // if (process.env.NODE_ENV === 'production') {
      // 仅在生产环境下启用该配置
      return {
        performance: {
          // 打包后最大文件大小限制
          maxAssetSize: 1024000
        },
        plugins: [
          new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 1024, // 只有大小大于该值的资源会被处理,当前配置为对于超过1k的数据进行处理，不足1k的可能会越压缩越大
            minRatio: 0.99, // 只有压缩率小于这个值的资源才会被处理
            // deleteOriginalAssets: true // 删除原文件
          })
        ]
      }
    // }
  },
```