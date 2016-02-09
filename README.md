#tinyts使用说明
基于TypeScript的一个轻量级的MVVM Web框架

项目结构如下：
```
|-tinyts
  |-src
    |-core.min.js
    |-models.min.js
    |-controls.min.js
  |-application
    |-interfaces
    |-reference
    |-services
    |-viewmodels
    |-models
```
+  tinyts为框架主目录，本项目依赖Jquery
+  core中包含了框架的核心内容，包含依赖注入类ViewFilter,控件基类View,TextView,ListView,ViewGroup,VirtualView,视图模型基类BaseViewModel以及服务池(service pool)的实现
+  控件基类的继承关系如下，其中View为控件基类，TextView为具有文本展示的简单控件，ViewGroup可以包含其他的View，ListView为列表控件,VirtualView为虚拟视图(在ts中设置template)：
```
View<-TextView
View<-ListView
View<-ViewGroup
View<-VirtualView
```
+  ViewModel的初始化流程如下：
```
  view decorator => View.constructor => BaseViewModel.constructor => View.LoadView => ViewModel.RegisterEvents
```
+  controls中定义了一些常用的控件，你也可以继承这些类（或继承以上几个基类）开发自己的控件   
这些控件中用到了第三方的开源js插件（jqueryui等）
+  application目录结构仅做参考，你也可以使用自己定义的结构

##项目示例
+  在使用前，需要配置好TypeScript环境，请参见[TypeScript官网](http://www.typescriptlang.org/)
+  Html代码
```
    <!DOCTYPE html>
    <html>
        <head>
            <script src="../../public/jquery.min.js"></script>
            <script src="../../src/core.min.js"></script>
            <script src="../../src/models.min.js"></script>
            <script src="../../src/controls.min.js"></script>
            
            <script src="../viewmodels/todolist.js"></script>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>Todo List</h1>
            <div>
                <input type="text" id="mInput">
                <ul id="mTodoList"></ul>
            </div>
        </body>
    </html>
```
+  TypeScript代码，[YouTsPath]/application/viewmodels/demo.ts
```
    class TodoList extends BaseViewModel {

        @view(TextBox)
        mInput: TextBox;

        @view(ItemList)
        mTodoList: ItemList;

        init() {
            var data = [];
            this.mTodoList.SetData(data);
        }

        RegisterEvents() {
            var me = this;
            me.mInput.On("keypress", (event) => {
                if (event.which == 13) {
                    me.mTodoList.Add(new RadioModel(0, me.mInput.Value()));
                }
            });

            me.mTodoList.onItemClick = (obj) => {
                $(obj.target).remove();
            };
        }
    }

    $().ready(() => {
        var tl = new TodoList();
        tl.init();
    });
```
