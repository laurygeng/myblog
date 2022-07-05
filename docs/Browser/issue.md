### 保存密码之后自动填充引发的问题 ###  

浏览器会提供自动保存密码，我刚刚输入了用户名和密码，单击了浏览器提供的保存密码。  
当访问另外一个页面的时候，因为存在一个type=password的input，在谷歌浏览器中，却在这里把我刚刚保存的用户名和密码显示出来了  

是因为type=password引起的，保存了密码之后，进入另一个页面的时候，如果有type=password，浏览器会寻找与它临近的input type=text，将用户名填上  
由此，解决方法有：仍然使用type=password，只是增加了fake input control，即在此之前加上<input type="text" style="display:none;" />用于混淆浏览器  