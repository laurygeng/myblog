### BFC ###  

block Formatting Context  
块级格式化上下文，页面中的一块渲染区域，有一套渲染规则，决定了子元素如何定位，以及和其他元素的关系和相互作用，处于BFC内部的元素和外部的元素相互隔离  

作用：
+ 防止margin发生重叠
+ 两栏布局防止文字环绕
+ 防止元素塌陷

那些元素会生成BFC：（block-level box 设置inline-block会产生BFC）
+ 根元素
+ float属性不为none
+ position为absolute或者fixed
+ display：inline-block，table-cell，table-caption，flex，inline-flex
+ overflow：不为visible  

BFC的布局规格：
+ 内部box会在垂直方向一个接一个的放置
+ Box垂直方向的距离由margin决定，属于同一个bfc的两个相邻的box的margin会发生折叠
+ BFC的区域不会与float box重叠
+ 计算BFC的高度时，浮动元素也参与计算
+ BFC就是页面上一个隔离的独立容器，子元素不会影响到外面，反之亦然
+ 每个元素的margin box左边与包含块的border box的左边重叠