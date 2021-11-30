## 选择器的优先级： ##  

标签选择器、伪元素选择器：1  
类选择器、伪类选择器、属性选择器：10  
id 选择器：100  
内联样式：1000  

注意事项：  

!important声明的样式的优先级最高；
如果优先级相同，则最后出现的样式生效；
继承得到的样式的优先级最低；
通用选择器（*）、子选择器（>）和相邻同胞选择器（+）并不在这四个等级中，所以它们的权值都为 0 ；
样式表的来源不同时，优先级顺序为：内联样式 > 内部样式 > 外部样式 > 浏览器用户自定义样式 > 浏览器默认样式。

## CSS中可继承与不可继承属性有哪些 ##
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

## link和@import的区别 ##   
两者都是外部引用CSS的方式，它们的区别如下：

link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。
link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。
link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。
link支持使用Javascript控制DOM去改变样式；而@import不支持。





