### 居中对齐 ###  

居中对齐的所有方式  
+ 如果是行内元素：给父元素设置text-align:center  
块级元素：  
1. margin:0 auto  
2. display:flex  
justify-content:center  
3. display:table:margin:0 auto  
```
.son{
  position:absolute
  left:50%;
  transform:translate(-50%,0);
  
  //width:固定;
    left:50%;
    margin-left:-0.5宽度;
  
 // left:0;
    right:0;
    margin:0 auto;
}
```
垂直居中：
单行文本，设置line-height等于父元素高度
行内块元素:伪元素让内容块在容器中央

```
.parent::after, .son{
  display:inline-block;
  vertical-align:middle
}
.parent::after{
  content:"";
  height:100%;
}
```
元素高度不固定的时候：
可以用vertical-align属性，而vertical-align只有在父层为td或者th时，才会生效，对于其他块级元素，例如div、p等默认是不支持的。设置父元素display：table，子元素display:table-cell;vertical-align:middle  
```
.parent {
  display: flex;
  align-items: center;
}
```
可用transform，设置父元素position：relative，子元素css：
```
.son{
    position:absolute;
    top:50%;
    -webkit-transform: translate(0,-50%);  
    -ms-transform: translate(0,-50%);
    transform: translate(0,-50%);
                         
    //    height:固定;
    margin-top:-0.5高度;
                         
   //   height:固定;
    top:0;
    bottom:0;
    margin:auto 0;
}
```