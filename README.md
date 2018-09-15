# localStorage
对localStorage进行重新封装，支持过期时间、tag、删除同tag的所有缓存等。

支持存入`JSON`数据，在取出数据时，会自动解析。

本组件有一套独立的命名规则，与其他本地缓存不冲突。

#使用说明
引用`cache.js`即可。

```javascript
//获取缓存
var mycache=cache('name').get();

//使用方法
cache('name','tag','expires').set('your data');

//链试写法
cache('name').tag('youtag').days('expires').set('your data');

//删除缓存
cache('name').remove();
cache().remove('name');

//删除同Tag缓存
cache().clear('youtag');
cache().tag('youtag').clear();

//清除全部由cache写入的缓存
cache().clear();
```


