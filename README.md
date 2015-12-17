#tinyts使用说明
基于TypeScript的一个轻量级的MVVM Web框架

项目结构如下：
```
|-tinyts
  |-controls
    |-button.ts
    |-textBox.ts
    |-tableView.ts
    |-selectButton.ts
    |-radioButton.ts
    |-imageView.ts
    |-fileUploader.ts
    |-editDialog.ts
  |-core
    |-View.ts
    |-ViewGroup.ts
    |-TextView.ts
    |-ListView.ts
    |-ViewFilter.ts
    |-ViewBinder.ts
  |-interfaces
  |-models
  |-public
  |-third-party
|-application
  |-interfaces
  |-reference
  |-services
  |-viewmodels
  |-models
```
+  tinyts为框架主目录，本项目依赖Jquery
+  core中包含了框架的核心内容，包含四个控件基类和用于依赖注入的两个类。
+  控件基类的继承关系如下，其中View为控件基类，TextView为具有文本展示的简单控件，ViewGroup可以包含其他的View，ListView为列表控件：
```
View<-TextView
View<-ListView
View<-ViewGroup
```
+  ViewModel的初始化流程如下：
```
  ViewBinder.instantiate => View.constructor => ViewModel.constructor => View.LoadView => ViewModel.RegisterEvents
```
+  controls中定义了一些常用的控件，你也可以继承这些类（或继承以上四个基类）开发自己的控件   
这些控件中用到了第三方的开源js插件（jqueryui等）
+  application目录结构仅做参考，你也可以使用自己定义的结构

##项目示例
+  在使用前，需要配置好TypeScript环境，请参见[TypeScript官网](http://www.typescriptlang.org/)
+  Html代码
```
    <!DOCTYPE html>
    <html>
    <head>
      <script src="[YourTsPath]/public/require.js" data-main="[YourTsPath]/application/references/[YourRequireJsMain].js"></script>
      <meta charset="utf-8" />
    </head>
    <body>
      <button id="btnSubmit">提交</button>
    </body>
    </html>
```
+  RequireJS代码
```
    requirejs.config({
      baseUrl:"[YouTsPath]"
    });
    
    //根据你需要使用的控件加载核心文件
    requirejs(["core/ViewFilter","core/ViewBinder","core/View","core/TextView","controls/button","application/viewmodels/demo"],function(){
      
    });
```
+  TypeScript代码，[YouTsPath]/application/viewmodels/demo.ts
```
    class Demo implement IViewModel{
        
        @view(Button)
        btnSubmit:Button;
        
        /**
        * 请实现该方法，在该方法中注册ViewModel中控件的事件
        */
        RegisterEvents(){
          var me = this;
          me.btnSubmit.OnClick(()=>{
            //code here 
          });
        }
    }
    
    $().ready(()=>{
      var demo = ViewBinder.instantiate(Demo);
    });
```
+  请调用ViewBinder的instantiate方法来初始化你的ViewModel，   
这将会在你的HTML页面上（根据控件名称）寻找你在ViewModel中定义的控件，并进行依赖注入