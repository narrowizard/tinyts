# tinyts
## 项目说明
+	本项目依赖jQuery、LinqJs。
+	本项目完全使用TypeScript开发。
+	本项目使用requirejs组织模块。
+	推荐使用nresource项目编译生成本项目。
+   不兼容IE8的部分:router、FileUploader

## 项目目标
+ 为了解决javascript弱类型语言的特性引起的开发效率低下、js DOM操作的繁杂等问题，开发此框架。

## 环境配置
1. 配置[nodejs](http://nodejs.org/)环境(5.x)
2. 配置运行[nresource](http://github.com/narrowizard/nresource)项目(nodejs)
3. 在nresource根目录下创建content目录，结构如下：
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

4. 在您的项目中编写html和css
5. 引用特定视图模型层的视图模型（ts文件）
http://nresourcehost/tinyts/{projectname}/{viewmodel}.js
6. 初始化视图模型  
javascript:

        require(["project/{projectname}/viewmodels/{viewmodel}"],function(vm){
            var viewModel = new vm.ViewModelClassName();
        });
    其中projectname为项目文件夹名称，viewmodel为视图模型的文件名，ViewModelClassName为视图模型的类名。
7. 现在开始，您的项目就已经被tinyts托管了。