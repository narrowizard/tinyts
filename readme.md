# tinyts2
## target
es5

## support
+ modern browser: chrome,firefox,ms edge
+ To support IE(9+):  
    + IE 11: add es6-shim polyfill and promise polyfill.
    + IE 9,10: add es6-sham polyfill and ie11 polyfill.
    + IE 9: do not support router(you can implement one based on [history](https://github.com/browserstate/history.js))

you can find the polyfill file both in the `/libs` directory in this project and their own repositories(metioned in next section **libs**).

## libs
+ [jquery](https://github.com/jquery/jquery/tree/1.12-stable)  
+ [multiplexjs(linq)](https://github.com/multiplex/multiplex.js)
+ [es6-shim](https://github.com/paulmillr/es6-shim) 
+ [promise](https://github.com/taylorhakes/promise-polyfill)
+ [mustache](https://github.com/janl/mustache.js)  
+ [systemjs](https://github.com/systemjs/systemjs)  
+ [class-validator](https://github.com/pleerock/class-validator)  

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
