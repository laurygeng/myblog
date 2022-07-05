### 选择器的优先级： ###  

+ 继承得到的样式的优先级最低；  
+ 通用选择器（*）、子选择器（>）和相邻同胞选择器（+）它们的权值都为 0  
+ 标签选择器、伪元素选择器：1  
+ 类选择器、伪类选择器、属性选择器：10  
+ id 选择器：100  
+ 内联样式：1000  
+ !important声明的样式的优先级最高；
如果优先级相同，则最后出现的样式生效；
样式表的来源不同时，优先级顺序为：内联样式 > 内部样式 > 外部样式 > 浏览器用户自定义样式 > 浏览器默认样式。

### CSS中可继承与不可继承属性有哪些 ###
（1）不可继承性的属性
display：规定元素应该生成的框的类型
文本属性：
vertical-align：垂直文本对齐
text-decoration：规定添加到文本的装饰
text-shadow：文本阴影效果
white-space：空白符的处理
unicode-bidi：设置文本的方向
盒子模型的属性：width、height、margin、border、padding
背景属性：background、background-color、background-image、background-repeat、background-position、background-attachment
定位属性：float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index
生成内容属性：content、counter-reset、counter-increment
轮廓样式属性：outline-style、outline-width、outline-color、outline
页面样式属性：size、page-break-before、page-break-after
声音样式属性：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during

（2）继承性的属性
字体系列属性
font-family：字体系列
font-weight：字体的粗细
font-size：字体的大小
font-style：字体的风格
文本系列属性
text-indent：文本缩进
text-align：文本水平对齐
line-height：行高
word-spacing：单词之间的间距
letter-spacing：中文或者字母之间的间距
text-transform：控制文本大小写（就是uppercase、lowercase、capitalize这三个）
color：文本颜色
元素可见性
visibility：控制元素显示隐藏
列表布局属性
list-style：列表风格，包括list-style-type、list-style-image等
光标属性
cursor：光标显示为何种形态

### link和@import的区别 ###   
两者都是外部引用CSS的方式，它们的区别如下：
link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。
link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。
link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。
link支持使用Javascript控制DOM去改变样式；而@import不支持。

### 伪类和伪元素的区别： ###  
伪类是一个：作为前缀，被添加到一个选择器末尾的关键字，当你希望样式在特定状态下才被呈现到元素的时候，可以往元素的选择器后面加上对应的伪类
伪元素用于创建一些不在文档树中的元素，并为其添加样式，比如说::before来在一个元素前增加一些文本，并为这些文本添加样式，虽然用户可以看到这些文本，但是这些文本不在文档树中

### 原生CSS的优化 ###  

DOM渲染查找时的复杂度，嵌套要控制层数，规范选择器的书写，提高可维护性和健壮性  
不添加根元素  
不在生产环境使用通配符选择器  
拒绝成串的链式调用  
考虑是否有原生的标签自带样式  
less或者sass等预处理器的时候，最高嵌套层级为3层  
可以通过压缩代码，进行性能优化  
减少阻塞加载，比如少用import  
慎重选择性能消耗高的样式：box-shadows border-radius transparency transforms  
减少重排：  
在修改DOM的样式时，不要一条条的修改，而是写好所有的更换类名  
频繁修改的可以先将DOM display：none，最终样式好了，在最后将其显示出来  
将需要多次重排的元素，position设置为absolute，或者fixed，元素脱离了文档流，不会影响其他的元素。动画效果的就可以设置为绝对定位。  
不滥用浮动，一个页面不超过10次浮动  
不声明过多的font-size  
标准化浏览器前缀  
合理使用GPU加速  


###  CSS 优化和提高性能的方法有哪些？ ###   
加载性能：  
（1）css压缩：将写好的css进行打包压缩，可以减小文件体积。  
（2）css单一样式：当需要下边距和左边距的时候，很多时候会选择使用 margin:top 0 bottom 0；但margin-bottom:bottom;  margin-left:left;执行效率会更高。  
（3）减少使用@import，建议使用link，因为后者在页面加载时一起加载，前者是等待页面加载完成之后再进行加载。  
选择器性能：  
（1）关键选择器（key selector）。选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分）。CSS选择符是从右到左进行匹配的。当使用后代选择器的时候，浏览器会遍历所有子元素来确定是否是指定的元素等等；  
（2）如果规则拥有ID选择器作为其关键选择器，则不要为规则增加标签。过滤掉无关的规则（这样样式系统就不会浪费时间去匹配它们了）。  
（3）避免使用通配规则，如*{}计算次数惊人，只对需要用到的元素进行选择。  
（4）尽量少的去对标签进行选择，而是用class。  
（5）尽量少的去使用后代选择器，降低选择器的权重值。后代选择器的开销是最高的，尽量将选择器的深度降到最低，最高不要超过三层，更多的使用类来关联每一个标签元素。  
（6）了解哪些属性是可以通过继承而来的，然后避免对这些属性重复指定规则。  
渲染性能：  
（1）慎重使用高性能属性：浮动、定位。  
（2）尽量减少页面重排、重绘。  
（3）去除空规则：｛｝。空规则的产生原因一般来说是为了预留样式。去除这些空规则无疑能减少css文档体积。  
（4）属性值为0时，不加单位。  
（5）属性值为浮动小数0.**，可以省略小数点之前的0。  
（6）标准化各种浏览器前缀：带浏览器前缀的在前。标准属性在后。  
（7）不使用@import前缀，它会影响css的加载速度。  
（8）选择器优化嵌套，尽量避免层级过深。  
（9）css雪碧图，同一页面相近部分的小图标，方便使用，减少页面的请求次数，但是同时图片本身会变大，使用时，优劣考虑清楚，再使用。  
（10）正确使用display的属性，由于display的作用，某些样式组合会无效，徒增样式体积的同时也影响解析性能。  
（11）不滥用web字体。对于中文网站来说WebFonts可能很陌生，国外却很流行。web fonts通常体积庞大，而且一些浏览器在下载web fonts时会阻塞页面渲染损伤性能。  
可维护性、健壮性：  
（1）将具有相同属性的样式抽离出来，整合并通过class在页面中进行使用，提高css的可维护性。  
（2）样式与内容分离：将css代码定义到外部css中。  

### px、em、rem 英寸、 分辨率、 像素 ###   
px是固定的像素。
em和rem是相对长度单位，其长度不是固定的，更适用于响应式布局。
em是相对于其父元素来设置字体大小,rem是相对于根元素，这样就意味着，只需要在根元素确定一个参考值。

移动端的适配布局:
通过 js 来设置html 的 font-size
rem是根据根元素的font-size来做响应的元素

英寸是物理概念，设备屏幕的大小，手机屏幕左上角到右下角的对角线是英寸 一英寸-2.54厘米  
分辨率: 设置电脑的分辨率，屏幕是由多少个像素组成的屏幕的宽高  
1920*1080（横向和竖向的像素点分布（像素点组成的横向和纵向的宽高））  
分辨率越高越清晰？还要考虑屏幕尺寸的问题，同样屏幕尺寸的情况下，分辨率越高的越清晰  
像素是什么？像素是有自己的颜色和特定的位置的  
像素点少了，就会显得看到的效果变差了，粗糙  
4k屏2k屏，就是高清，屏幕清晰了，像素点高了  
超清，像素点是最多的（不是绝对单位）和英寸，里面，毫米都不一样  








