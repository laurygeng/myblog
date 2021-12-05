### 定位 ###  

+ absolute生成绝对定位的元素，相对于static定位以外的一个父元素进行定位。元素的位置通过left、top、right、bottom属性进行规定。  + + + relative生成相对定位的元素，相对于其原来的位置进行定位。元素的位置通过left、top、right、bottom属性进行规定。  
+ fixed生成绝对定位的元素，指定元素相对于屏幕视⼝（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变，⽐如回到顶部的按钮⼀般都是⽤此定位⽅式。  
+ static默认值，没有定位，元素出现在正常的文档流中，会忽略 top, bottom, left, right 或者 z-index 声明，块级元素从上往下纵向排布，⾏级元素从左向右排列。inherit规定从父元素继承position属性的值

### display、float、position的优先级 ###
（1）首先判断display属性是否为none，如果为none，则position和float属性的值不影响元素最后的表现。  
（2）然后判断position的值是否为absolute或者fixed，如果是，则float属性失效，并且display的值应该被设置为table或者block，具体转换需要看初始转换值。  
（3）如果position的值不为absolute或者fixed，则判断float属性的值是否为none，如果不是，则display的值则按上面的规则转换。注意，如果position的值为relative并且float属性的值存在，则relative相对于浮动后的最终位置定位。  
（4）如果float的值为none，则判断元素是否为根元素，如果是根元素则display属性按照上面的规则转换，如果不是，则保持指定的display属性值不变。  
总的来说，可以把它看作是一个类似优先级的机制，"position:absolute"和"position:fixed"优先级最高，有它存在的时候，浮动不起作用，'display'的值也需要调整；其次，元素的'float'特性的值不是"none"的时候或者它是根元素的时候，调整'display'的值；最后，非根元素，并且非浮动元素，并且非绝对定位的元素，'display'特性值同设置值。  
### absolute与fixed共同点与不同点 ###  
共同点：
改变行内元素的呈现方式，将display置为inline-block  
使元素脱离普通文档流，不再占据文档物理空间
覆盖非定位文档元素

不同点：
abuselute与fixed的根元素不同，abuselute的根元素可以设置，fixed根元素是浏览器。
在有滚动条的页面中，absolute会跟着父元素进行移动，fixed固定在页面的具体位置。


### 清除浮动的方式如下： ###  

+ 给父级div定义height属性
+ 最后一个浮动元素之后添加一个空的div标签，并添加clear:both样式
+ 包含浮动元素的父级标签添加overflow:hidden或者overflow:auto
+ 使用 :after 伪元素。由于IE6-7不支持 :after，使用 zoom:1 触发 hasLayout**

```
.clearfix:after{
    content: "\200B";
    display: table; 
    height: 0;
    clear: both;
  }
  .clearfix{
    *zoom: 1;
  }
  ```