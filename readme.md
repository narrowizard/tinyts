# tinyts2
## target
es5

## libs
jquery  
multiplex(linq)  
es6 promise  
es6 proxy  
[mustache](https://github.com/janl/mustache.js)  
[systemjs](https://github.com/systemjs/systemjs)  
[class-validator](https://github.com/pleerock/class-validator)  

## directory
```shell
--| application // 测试项目
----| test // 测试文件目录(html)
----| ts // 测试项目ts文件
----| js // 编译测试产生的js文件
--| control // 控件
--| core // 核心文件
--| dist // 编译文件
--| ext // ts组件
--| libs // js组件
--| model // 与数据相关的模块文件
--| typings // ts第三方声明文件
```

## test
you should install http-server at first.  

```shell
npm install -g http-server
http-server {path to tinyts2}
```
