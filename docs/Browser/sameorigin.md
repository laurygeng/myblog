### 同源策略 ###  

同源策略限制了从同一个源加载的文档或脚本如何与另一个源的资源进行交互。这是浏览器的一个用于隔离潜在恶意文件的重要的安全机制。同源指的是：协议、端口号、域名必须一致。  

同源策略：protocol（协议）、domain（域名）、port（端口）三者必须一致。  
同源政策主要限制了三个方面：  

当前域下的 js 脚本不能够访问其他域下的 cookie、localStorage 和 indexDB。  
当前域下的 js 脚本不能够操作访问操作其他域下的 DOM。  
当前域下 ajax 无法发送跨域请求。  

同源政策的目的主要是为了保证用户的信息安全，它只是对 js 脚本的一种限制，并不是对浏览器的限制，对于一般的 img、或者script 脚本请求都不会有跨域的限制，这是因为这些操作都不会通过响应结果来进行可能出现安全问题的操作。

### 解决跨域的方法： ###
1. 服务端设置跨域：  
Access-Control-Allow-Origin: http://xxx  // 允许跨域的源地址  
Access-Control-Allow-Methods: GET, POST, PUT // 服务器支持的所有跨域请求的方法  
Access-Control-Allow-Headers: X-Custom-Header  // 服务器支持的所有头信息字段  
Access-Control-Allow-Credentials: true   // 表示是否允许发送Cookie  
Access-Control-Max-Age: 1728000  // 用来指定本次预检请求的有效期，单位为秒  

2. JSONP
3. postMessage 跨域
4. Nginx代理跨域  
5. NodeJs中间件代理跨域  
6. Vue框架跨域  
7. iframe跨域  
8. WebSocket协议跨域  

### CORS ###  
CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）  
实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信
非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）  

CORS与JSONP的使用目的相同，但是比JSONP更强大。  
JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。  
