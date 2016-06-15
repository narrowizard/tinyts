#tinyts
## 项目说明
+	本项目依赖jQuery、LinqJs。
+	本项目完全使用TypeScript开发。
+	本项目使用requirejs组织模块。
+	推荐使用nresource项目编译生成本项目。

## 项目目标
+ 为了解决javascript弱类型语言的特性引起的开发效率低下、js DOM操作的繁杂等问题，开发此框架。

## 环境配置
1. 配置[nodejs](http://nodejs.org/)环境(5.x)
1. 配置运行[nresource](http://github.com/narrowizard/nresource)项目(nodejs)
1. 在nresource根目录下创建content目录，结构如下：
```
|-content
    |-tinyts
    |-project
      |-demo
        |-models
        |-services
        |-viewmodels
        |-views
```
    + 其中tinyts文件夹为tinyts项目源码
    + project文件夹为tinyts项目目录
    + 每个tinyts项目下有以下文件夹，并可添加自定义文件夹
    + models：模型层
    + services：服务层
    + viewmodels：视图模型层
    + views：视图层
1. 在您的项目中编写html和css
1. 引用特定视图模型层的视图模型（ts文件）
http://nresourcehost/tinyts/{projectname}/{viewmodel}.js
1. 初始化视图模型
```
        <script>
            require(["project/{projectname}/viewmodels/{viewmodel}"],function(vm){
                var viewModel = new vm.ViewModelClassName();
            });
        </script>
```
其中projectname为项目文件夹名称，viewmodel为视图模型的文件名，ViewModelClassName为视图模型的类名。
1. 现在开始，您的项目就已经被tinyts托管了。

## 使用控件
+	在tinyts中，存在业务逻辑操作的html element都期望被托管为类（控件类）的实例。通过这些实例之间交互调用，完成整个业务的功能逻辑。tinyts中的类都是可扩展的，目前定义了大约十多个控件。
例如：要改变某个html element的text属性（输出helloworld），需要初始化一个TextView对象（该类用于处理一些具有文字展示功能的元素，例如：label）。然后调用该实例的SetText方法并将要输出的文字（hello world）作为参数传递给该函数即可。（当然，你需要先引用TextView这个类）
```
            import {TextView} from '../../../tinyts/core/TextView';

            var txtDemo = new TextView();
            txtDemo.SetText("Hello world!");
```
那么，你一定发现了这里并没有提及到这个txtDemo对象与html element之间的绑定关系。下面，我们将要处理这种绑定关系。
这行代码将txtDemo与id为some-label的元素绑定了起来。
```
        import {TextView} from '../../../tinyts/core/TextView';

        var txtDemo = new TextView();
        txtDemo.BindBySelector("#some-label");
        txtDemo.SetText("Hello world!");
```
+	到现在为止，你一定觉得（MD，智障？），一句代码能解决的问题却搞的如此复杂？ 
```
            $("#some-label").text("Hello world!");
```
+	是的，上述举例只是为了展示使用控件开发的方式。到此为止，我们还没有使用到tinyts框架的任何功能（至多使用了TextView的SetText方法而已）。下面，我将介绍tinyts整个目录结构（结构层次）的具体功能。

## 结构层次
+	service 
服务层，主要负责与服务器的交互(ajax请求)
+	model
模型层，用于定义项目元数据模型
+	viewmodel
视图模型层，主要负责前端的业务逻辑（一般是一个模块对应一个viewmodel）
+	view
视图层，主要用于封装一些视图模型层中可重用的逻辑，以及解决viewmodel逻辑过于繁杂的问题。

以上结构层次为tinyts的核心层，你也可以手动添加一些层（layer）。

## 服务（service）
1. 介绍与示例
服务层主要负责为项目提供数据，包括从服务器请求以及提供静态数据。一个单独的服务是一个类，提供相应的数据接口。以下是一个服务的示例：
```
        /**
        * SomeService 一个服务类
        */
        export class SomeService {

            /**
            * GetSomeStaticData 获取静态数据的示例
            * @param context 上下文
            * @param context.LoadData 获取数据的回调
            */
            GetSomeStaticData(context: { LoadData: (data) => void }) {
                context.LoadData({ name: "ali", age: 11 });
            }

            /**
            * GetSomeData 获取数据,这是一个请求服务器的示例 
            * @param data 请求参数
            * @param context 上下文
            * @param context.LoadData 获取数据的成功回调
            * @param context.OnFailed 获取数据的失败回调
            */
            GetSomeData(data: any, context: { LoadData: (data) => void, OnFailed: (res) => void }) {
                $.ajax({
                    url: "/segment/somedata",
                    data: data,
                    method: "GET",
                    success: (res) => {
                        context.LoadData(res);
                    },
                    error: (res) => {
                        context.OnFailed(res);
                    }
                });
            }
        }
```
示例中的service提供了两个数据接口，一个返回静态数据对象{ name: "ali", age: 11 }，另一个则通过ajax请求获取服务端的数据。  
注意，service层的数据返回都通过回调的方式完成（包括错误处理）。如何在viewmodel中调用service将在viewmodel模块中介绍。

1. 封装ajax请求
为了避免重复编写ajax请求部分的代码，可以对这些部分作一个简单的封装。  
```
        /**
        * HttpRequest 包含http post和http get两种ajax请求的类
        */
        export class HttpRequest {
            /**
            * Get httpget请求
            * @param url 请求地址
            * @param data 请求参数
            * @param success 成功回调
            * @param failed 失败回调(可选)
            */
            public static Get(url: string, data, success, failed?: (res) => void) {
                $.ajax({
                    url: url,
                    data: data,
                    type: "GET",
                    cache: false,
                    success: function (response) {
                        //在这里判断服务端返回值,确定请求是否成功
                        //如果请求成功,则调用成功回调
                        //否则,统一处理错误(服务端错误)
                    },
                    error: function (response) {
                        //在这里统一处理错误(网络错误)
                    }
                });
            }

            public static Post(url: string, data, success, failed?: (res) => void) {
                $.ajax({
                    url: url,
                    data: data,
                    type: "POST",
                    success: function (response) {
                        //在这里判断服务端返回值,确定请求是否成功
                        //如果请求成功,则调用成功回调
                        //否则,统一处理错误(服务端错误)
                    },
                    error: function (response) {
                        //在这里统一处理错误(网络错误)
                    }
                });
            }
        }
```
示例的HttpRequest类提供了Post和Get两个方法，并提供了一些逻辑处理的建议。（你也可以根据不同的需求，进行不同程度的封装）。

1. 限制频繁提交
在某些项目需求中，我们需要限制一个请求被频繁发送。tinyts的组件中提供了HttpUtils类，该类提供这样的功能：当一个请求被多次发送时，重复发送的请求（第二次及以后）将会被抛弃，除非第一次请求已经返回结果，或者请求的时间间隔超过一个阀值。注意：时间间隔的功能尚未完成。示例如下：
```
        import {HttpUtils} from '../../../tinyts/utils/Http';

        /**
        * SingleService 一个服务类,使用了频繁请求限制
        */
        export class SingleService {
            /**
            * GetSomeData 获取数据 
            * @param data 请求参数
            */
            GetSomeData(data: any) {
                HttpUtils.Go("/segment/somedata", (res) => {
                    //成功回调
                }, (res) => {
                    //失败回调
                }, { method: "GET", data: data });
            }
        }

        var ss = new SingleService();
        ss.GetSomeData({});
        ss.GetSomeData({});
```
示例中用到了HttpUtils.Go方法发送ajax请求，同时提交多次请求将会导致第二次请求被拦截。因此，示例只会向/segment/somedata发送一个请求。注意：请求是根据url唯一标志的，这意味着当你修改了url之后，请求仍然会被发送。本示例默认一次请求的时间大于程序执行的时间。（即当第二次发送请求时，第一次请求尚未返回结果）。

## 模型（model）
1.	介绍
数据模型层，在该层定义项目的数据结构。注意：tinyts默认每一个model包含一个Id的属性，该属性将会在很多的控件（controls）中被使用，请保证每个model满足这个条件，并且Id是一个唯一标志列。
1.	模型注入器
tinyts实现了一个模型注入器（ModelInjector）。模型注入器可以将视图模型（或子视图）中定义了data-property属性的控件对象的值注入到一个model中。也可以反向解析model，并将对应的值注入到相应的控件对象中。示例如下：

##	视图模型（viewmodel）
##	子视图（view）
##	表单验证（validate）
##	控件（controls）
##	控件开发
