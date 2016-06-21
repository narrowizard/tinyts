# tinyts
## 项目说明
+	本项目依赖jQuery、LinqJs。
+	本项目完全使用TypeScript开发。
+	本项目使用requirejs组织模块。
+	推荐使用nresource项目编译生成本项目。

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

## 使用控件
+	在tinyts中，存在业务逻辑操作的html element都期望被托管为类（控件类）的实例。通过这些实例之间交互调用，完成整个业务的功能逻辑。tinyts中的类都是可扩展的，目前定义了大约十多个控件。
例如：要改变某个html element的text属性（输出helloworld），需要初始化一个TextView对象（该类用于处理一些具有文字展示功能的元素，例如：label）。然后调用该实例的SetText方法并将要输出的文字（hello world）作为参数传递给该函数即可。（当然，你需要先引用TextView这个类）  
Typescript:

        import {TextView} from '../../../tinyts/core/TextView';
    
        var txtDemo = new TextView();
        txtDemo.SetText("Hello world!");

    那么，你一定发现了这里并没有提及到这个txtDemo对象与html element之间的绑定关系。下面，我们将要处理这种绑定关系。
    这行代码将txtDemo与id为some-label的元素绑定了起来。  
    Typescript:

        import {TextView} from '../../../tinyts/core/TextView';

        var txtDemo = new TextView();
        txtDemo.BindBySelector("#some-label");
        txtDemo.SetText("Hello world!");

+	到现在为止，你一定觉得（MD，智障？），一句代码能解决的问题却搞的如此复杂？   
    Javascript:

        $("#some-label").text("Hello world!");

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
服务层主要负责为项目提供数据，包括从服务器请求以及提供静态数据。一个单独的服务是一个类，提供相应的数据接口。以下是一个服务的示例  
Typescript:

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

    示例中的service提供了两个数据接口，一个返回静态数据对象{ name: "ali", age: 11 }，另一个则通过ajax请求获取服务端的数据。  
    注意，service层的数据返回都通过回调的方式完成（包括错误处理）。如何在viewmodel中调用service将在viewmodel模块中介绍。

2. 封装ajax请求  
为了避免重复编写ajax请求部分的代码，可以对这些部分作一个简单的封装。  
Typescript:

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

    示例的HttpRequest类提供了Post和Get两个方法，并提供了一些逻辑处理的建议。（你也可以根据不同的需求，进行不同程度的封装）。

3. 限制频繁提交  
在某些项目需求中，我们需要限制一个请求被频繁发送。tinyts的组件中提供了HttpUtils类，该类提供这样的功能：当一个请求被多次发送时，重复发送的请求（第二次及以后）将会被抛弃，除非第一次请求已经返回结果，或者请求的时间间隔超过一个阀值。注意：时间间隔的功能尚未完成。示例如下：  
Typescript:

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

    示例中用到了HttpUtils.Go方法发送ajax请求，同时提交多次请求将会导致第二次请求被拦截。因此，示例只会向/segment/somedata发送一个请求。注意：请求是根据url唯一标志的，这意味着当你修改了url之后，请求仍然会被发送。本示例默认一次请求的时间大于程序执行的时间。（即当第二次发送请求时，第一次请求尚未返回结果）。

##	视图模型（viewmodel）
1. 介绍  
视图模型(viewmodel)是tinyts的核心部分，我们所有的代码编写都将围绕着viewmodel展开。在tinyts中，一个viewmodel代表着一个业务逻辑模块，我们将在viewmodel中处理该模块的所有的业务逻辑（包括界面逻辑）。例如，一个登录模块，我们将在viewmodel中获取用户输入（将在model中介绍获取用户输入的方法），验证用户输入（将在验证模块中详细介绍），调用service发送服务端请求，以及处理服务端返回，并做出相应的页面操作。
2. 视图模型基类(BaseViewModel)  
在tinyts核心库中，有一个BaseViewModel类，该类实现了控件注入、页面加载提示的功能，并且有OnValidateError和RegisterEvents两个虚方法，其中RegisterEvents方法用于定义viewmodel的事件绑定，OnValidateError则是验证错误（在Validate模块中会详细介绍）的回调。另外，BaseViewModel还包含OnLoad方法，该方法在页面加载注入完成后被调用，请在viewmodel中重写该方法以实现具体的功能。下面定义了一个viewmodel类（不包含任何功能）  
Typescript：

        import {BaseViewModel} from '../../../tinyts/core/Core';
        
        export class DemoModel extends BaseViewModel {
        
            RegisterEvents() {
                //在这里注册控件的事件
            }
        
            OnValidateError(msg: string) {
                //在这里处理验证错误
            }
        }

3. 引用  
接下来，你需要在html文件中引用该viewmodel，让这个viewmodel能够处理这个html页面的所有业务逻辑。  
html:

        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Document</title>
        </head>
        <body>
            <!--注意:这里localhost:8124为本地的nresource服务地址-->
            <script src="http://localhost:8124/static/js/linq.min.js"></script>
            <script src="http://localhost:8124/static/js/require.js"></script>
            <script src="http://localhost:8124/static/js/jquery-1.12.3.min.js"></script>
            <script src="http://localhost:8124/tinyts/demo/demo.js"></script>
            <script>
                require(["project/demo/viewmodels/demo"],function(vm){
                    var dm = new vm.DemoModel();
                });
            </script>
        </body>
        </html>
    不过，现在在这个html页面上没有任何的元素。接下来，让我们在页面上添加一个文本框，一个label标签和一个按钮。  
    html：
    
        <input type="text" id="sInput">
        <label id="sText"></label>
        <button type="button" id="btnText">click me!</button>
        
    那么，我们要怎么在viewmodel中操作这些html元素呢？像前面提到的一个个元素绑定再操作吗？显然不是。在学习如何操作html元素之前，让我们先学习一个新的概念——装饰器。
4. 装饰器(decorator)  
在typescript中，有一个新的特性叫做装饰器，他的用法就是在一个元素（可以是类、类的方法、类的属性、方法的参数等）之前使用@加装饰器名。在tinyts的核心库中，实现了两个装饰器，他们分别是view装饰器和partialView装饰器，这两个装饰器都用于viewmodel类的属性。
    + view  
    view装饰器装饰一个控件（control），viewmodel会自动初始化该控件，并根据控件的名字（即viewmodel中的属性名）对html中的元素进行id绑定。关于控件的具体用法，参见控件章节。
    + partialView  
    partialView装饰器装饰一个子视图（view），子视图是一种包含了一定业务逻辑的小型视图模型单元，partialView装饰器会根据子视图的定义，对html元素进行相关的绑定，关于子视图的详细用法，参见子视图章节。  
5. 绑定  
    接下来，我们将刚才在html中新添加的几个元素绑定到viewmodel中。添加绑定后的viewmodel代码如下：  
Typescript：

        import {BaseViewModel, view} from '../../../tinyts/core/Core';
        import {TextBox} from '../../../tinyts/controls/TextBox';
        import {Button} from '../../../tinyts/controls/Button';
        import {TextView} from '../../../tinyts/core/TextView';
        
        export class DemoModel extends BaseViewModel {
        
            @view(TextBox)
            sInput: TextBox;
        
            @view(TextView)
            sText: TextView;
        
            @view(Button)
            btnSubmit: Button;
        
            RegisterEvents() {
                //在这里注册控件的事件
            }
        
            OnValidateError(msg: string) {
                //在这里处理验证错误
            }
        }
    在这里，对于不同的html element，我使用了不同的控件（input[type='text']使用了TextBox,label使用了TextView,button使用了Button），这些选择是根据该html element需要的功能来确定的，具体的控件功能参见控件章节。
6. 处理业务逻辑  
    接下来，在RegisterEvents中注册按钮的点击事件，使得点击按钮时，将input里的值输出到label中。代码如下：  
Typescript:

        RegisterEvents() {
            var me = this;
            //在这里注册控件的事件
            me.btnSubmit.OnClick(() => {
                me.sText.SetText(me.sInput.Value());
            });
        }
    需要注意的是，这里我定义了`var me = this`，这是为了解决编译后的js中this指针的问题。因为在闭包（上述的点击回调）中，this会指向被点击的button。
7. 使用服务(service)  
    正如之前介绍的，我们需要在viewmodel中调用服务的接口，以获得服务端返回的数据或者是提交数据到服务端。那么，我们就要在viewmodel中引用服务。按照一般的逻辑，首先，我们需要引用一个服务，`import {SomeService} from '../services/demo'`，并且在viewmodel中定义并初始化一个服务，然后调用服务示例的相关方法来完成对数据的操作。代码如下：  
Typescript：

        import {BaseViewModel} from '../../../tinyts/core/Core';
        import {SomeService} from '../services/demo';
        
        export class ServiceModel extends BaseViewModel {
        
            RegisterEvents() {
        
            }
        
            OnValidateError(msg: string) {
                //在这里处理验证错误
            }
        
            OnLoad() {
                var service = new SomeService();
                service.GetSomeData({}, this);
            }
        
            LoadData(data) {
                //在这里处理数据
            }
        
            OnFailed(error) {
                //在这里处理错误
            }
        }
    此例中，我们重写了BaseViewModel的OnLoad方法，在页面加载完成后，调用service的`GetSomeData`方法。值得注意的是，调用`GetSomeData`方法的第二个参数传递了`this`，回顾service章节中SomeService的定义可以发现，`GetSomeData`的第二个参数是一个context，用来处理请求的返回值。那么现在，我们应该理解service的回调确实应该在viewmodel中处理，这属于业务逻辑的一部分。仔细观察可以发现，此例中，viewmodel多定义了两个方法LoadData和OnFailed，细心的你一定已经知道，这两个方法就是Service中被调用的成功回调以及错误回调。
8. 使用服务池  
到此你可能觉得这样处理service并没有多大的问题。确实，这是一种很普通的方式，定义一个对象，调用他的方法。但是，当你需要编写很多模块的时候，你会发现这样的方法非常繁杂，并且大量的service会变得难以维护（例如，两个模块同时会引用一个service，那么该service会被定义两次，造成一定的资源浪费）。为了解决这个问题，tinyts实现了一个服务池。服务池是一个单例，他维护一个服务列表，并且保证服务是唯一的。你只需要调用他的GetService方法，就可以获取一个你需要的服务。示例如下：  
Typescript：

        import {BaseViewModel} from '../../../tinyts/core/Core';
        import {ServicePoolInstance} from '../../../tinyts/core/ServicePool';
        import {SomeService} from '../services/demo';
        
        export class ServiceModel extends BaseViewModel {
        
            RegisterEvents() {
        
            }
        
            OnValidateError(msg: string) {
                //在这里处理验证错误
            }
        
            OnLoad() {
                ServicePoolInstance.GetService(SomeService).GetSomeData({}, this);
                // var service = new SomeService();
                // service.GetSomeData({}, this);
            }
        
            LoadData(data) {
                //在这里处理数据
            }
        
            OnFailed(error) {
                //在这里处理错误
            }
        }

## 模型（model）
1.	介绍  
数据模型层，在该层定义项目的数据结构。注意：tinyts默认每一个model包含一个Id的属性，该属性将会在很多的控件（controls）中被使用，请保证每个model满足这个条件，并且Id是一个唯一标志列。
2.	模型注入器  
tinyts实现了一个模型注入器（ModelInjector）。模型注入器可以将视图模型（或子视图）中定义了data-property属性的控件对象的值注入到一个model中。也可以反向解析model，并将对应的值注入到相应的控件对象中。示例如下：  
    html:

        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Document</title>
        </head>
        <body>
            <input type="text" id="sName" data-property="Name" >
            <input type="text" id="sNickName" data-property="NickName" >
            <button type="button" id="btnSubmit">submit</button>
        </body>
        </html>
    Typescript:
    
        import {BaseViewModel, view} from '../../../tinyts/core/Core';
        import {TextBox} from '../../../tinyts/controls/TextBox';
        import {Button} from '../../../tinyts/controls/Button';
        import {ModelInjector} from '../../../tinyts/utils/Model';

        /**
         * User 模型
         */
        class User {
            Name: string;
            NickName: string;
        }
        
        export class ModelInjectorDemo extends BaseViewModel {
        
            @view(TextBox)
            sName: TextBox;
        
            @view(TextBox)
            sNickName: TextBox;
        
            @view(Button)
            btnSubmit: Button;
        
            InjectModel() {
                //ModelInjector.InjectModel会将控件的value注入到user中
                var user: User = ModelInjector.InjectModel(this);
                user.Name;  //这里得到input#sName的value
                user.NickName; //这里得到input#sNickName的value
            }
        
            ResolveModel() {
                var user: User;
                user.Name = "sari";
                user.NickName = "sara";
                //ModelInjector.ResolveModel会将model中的值注入到控件中
                ModelInjector.ResolveModel(user, this);
            }
        
            OnValidateError() {
        
            }
        
            RegisterEvents() {
        
            }
        }

##	子视图（view）
1. 介绍  
在某种情况下，我们需要对某一部分的逻辑进行封装。例如，某个天气管理系统中，在多个模块都用到了地址选择的功能，并且这些地址选择都是级联的（province-city-district），如果在每个模块的viewmodel中处理这个逻辑，则需要编写很多冗余的代码。这个时候，就可以使用子视图来解决这个问题。子视图相当于一个简单的视图模型，也支持控件的自动注入，可以处理内部逻辑，并且能被多个模块引用。使用子视图还有一个优势，他可以简化viewmodel的逻辑，避免出现一个viewmodel包含上千行代码的情况。
2. 视图容器(ViewGroup)  
使用子视图需要继承自类ViewGroup，也可以说ViewGroup是子视图的基类。具体用法示例如下:  
html:  

        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <title>Document</title>
        </head>
        
        <body>
            <!--这部分控件存在于viewmodel-->
            <input type="text" id="sInput">
            <label id="sText"></label>
            <button type="button" id="btnText">click me!</button>
            
            <!--div中的控件存在于view-->
            <div>
                <input type="text" id="sChildInput">
                <label id="sChildText"></label>
                <button type="button" id="btnChildText">click me!</button>
            </div>
        
            <!--注意:这里localhost:8124为本地的nresource服务地址-->
            <script src="http://localhost:8124/static/js/linq.min.js"></script>
            <script src="http://localhost:8124/static/js/require.js"></script>
            <script src="http://localhost:8124/static/js/jquery-1.12.3.min.js"></script>
            <script src="http://localhost:8124/tinyts/demo/viewTestModel.js"></script>
            <script>
                require(["project/demo/viewmodels/demo"],function(vm){
                    var dm = new vm.ViewTestModel();
                });
            </script>
        </body>
        
        </html>
    我们在之前的viewmodel示例的基础上添加了一个div，接下来，我们将该div中的html element托管于view中。  
Typescript:
        
        //viewTestModel.ts
        import {BaseViewModel, view, partialView} from '../../../tinyts/core/Core';
        import {TextBox} from '../../../tinyts/controls/TextBox';
        import {Button} from '../../../tinyts/controls/Button';
        import {TextView} from '../../../tinyts/core/TextView';
        import {DemoView} from '../views/demoView';
        
        export class ViewTestModel extends BaseViewModel {
        
            @view(TextBox)
            sInput: TextBox;
        
            @view(TextView)
            sText: TextView;
        
            @view(Button)
            btnSubmit: Button;
        
            // 在这里使用partialView引用了DemoView
            @partialView(DemoView)
            demoView: DemoView;
        
            RegisterEvents() {
                var me = this;
                //在这里注册控件的事件
                me.btnSubmit.OnClick(() => {
                    me.sText.SetText(me.sInput.Value());
                });
            }
        
            OnValidateError(msg: string) {
                //在这里处理验证错误
            }
        
        }
        
        //demoView.ts
        import {ViewGroup, view} from '../../../tinyts/core/Core';
        import {ViewTestModel} from '../viewmodels/viewTestModel';
        import {TextBox} from '../../../tinyts/controls/TextBox';
        import {Button} from '../../../tinyts/controls/Button';
        import {TextView} from '../../../tinyts/core/TextView';
        
        export class DemoView extends ViewGroup<ViewTestModel>{
        
            @view(TextBox)
            sChildInput: TextBox;
        
            @view(TextView)
            sChildText: TextView;
        
            @view(Button)
            btnChildSubmit: Button;
        
            OnValidateError() {
        
            }
        
            RegisterEvents() {
                var me = this;
                //在这里注册控件的事件
                me.btnChildSubmit.OnClick(() => {
                    me.sChildText.SetText(me.sChildInput.Value());
                });
            }
        }
    可以看到的是，我们在viewmodel中通过partialView装饰器注入了DemoView的一个实例。而view层的开发，在很大程度上与viewmodel是相仿的。示例中，viewmodel和view各自维护各自的逻辑，两者不存在交互（例如：要在DemoView中获取到sInput的值，或者在ViewTestModel中需要改变sChildText的值）。接下来，我们将解决这两个问题。  
    首先，在ViewTestModel中需要改变sChildText的值，这其实是相对较为容易的，我们在ViewTestModel中存在着对DemoView的引用。只需要直接访问view的属性即可：`this.demoView.sChildText.SetText("I can reach view's property!")`。  
    那么，如何在view中访问viewmodel的属性呢？不知道你有没有发现，我们在实现DemoView继承ViewGroup的时候，有一个泛型参数`ViewGroup<ViewTestModel>`，并且参数就是引用他的ViewModel类。没错，这就是为了解决这个问题而实现的。  
    在此之前，我要介绍一下ViewGroup类的实现，ViewGroup继承自BaseViewModel，因此他具有BaseViewModel的所有功能。另外，他有一个context属性，context指向引用他的上一级视图（可以是viewmodel，也可以是其他的view，以后将统称为视图。也就是viewgroup是支持嵌套引用的）。这个引用关系，在注入子视图属性的时候自动完成。  
    回到刚才的问题，那么我们在view层中就可以通过这个context来引用viewmodel的属性了：`var value = this.context.sInput.Value();`。
3. 视图重用  
正如上文中提到的，子视图除了封装逻辑功能之外，还有一个非常实用的特点在于，他可以被重用。但是根据上文介绍的使用方法，一个View似乎只能被一种固定的视图所引用。不过，使用接口（interface）就可以轻易地打破这个限制。  
Typescript：

        import {ViewGroup, view} from '../../../tinyts/core/Core';
        import {ViewTestModel} from '../viewmodels/viewTestModel';
        import {TextBox} from '../../../tinyts/controls/TextBox';
        import {Button} from '../../../tinyts/controls/Button';
        import {TextView} from '../../../tinyts/core/TextView';
        
        interface DemoViewModel {
            sInput: TextBox;
            //some other property or method
            LoadData: (data) => void;
        }
        
        export class DemoView extends ViewGroup<DemoViewModel>{
        
            @view(TextBox)
            sChildInput: TextBox;
        
            @view(TextView)
            sChildText: TextView;
        
            @view(Button)
            btnChildSubmit: Button;
        
            OnValidateError() {
        
            }
        
            RegisterEvents() {
                var me = this;
                //在这里注册控件的事件
                me.btnChildSubmit.OnClick(() => {
                    me.sChildText.SetText(me.sChildInput.Value());
                });
            }
        
            OnLoad() {
                var value = this.context.sInput.Value();
            }
        }
    在这里，我们将ViewGroup的泛型参数从一个具体的类ViewTestModel修改成了一个接口DemoViewModel，因此，只要满足接口条件的所有视图都可以作为这个子视图的父视图。
4. 虚拟视图(VirtualView)  
增加了视图重用之后，我们又会发现，每次使用一个子视图都需要重复编写一份相同的html代码供子视图引用，这不但降低了开发效率，也不利于后期维护。在这里，我将介绍tinyts核心库中最后一个类——虚拟视图（VirtualView）。  
顾名思义，虚拟视图是指：在viewmodel创建时，该视图在html document中尚未存在的视图。虚拟视图将会在注入到其他视图时被创建并添加到文档（document）中去。  
VirtualView有一个 template属性，该属性指示了该视图的html结构。除了OnValidateError和RegisterEvents方法外，VirtualView还有一个SetTemplate虚方法，我们需要在该方法中设置template属性。  
Typescript：

        import {VirtualView, view} from '../../../tinyts/core/Core';
        import {TextBox} from '../../../tinyts/controls/TextBox';
        import {Button} from '../../../tinyts/controls/Button';
        import {TextView} from '../../../tinyts/core/TextView';
        
        interface DemoViewModel {
            sInput: TextBox;
            //some other property or method
            LoadData: (data) => void;
        }
        
        class VirtualViewDemo extends VirtualView<DemoViewModel>{
        
            @view(TextBox)
            sChildInput: TextBox;
        
            @view(TextView)
            sChildText: TextView;
        
            @view(Button)
            btnChildSubmit: Button;
        
            OnValidateError() {
        
            }
        
            RegisterEvents() {
        
            }
        
            SetTemplate() {
                this.template = `<input type="text" id="sChildInput">
                                <label id="sChildText"></label>
                                <button type="button" id="btnChildText">click me!</button>`;
            }
        }
    在viewmodel中，也是通过paritialView来引用VirtualView的。与ViewGroup不同的是，VirtualView被引用的时候也需要通过id绑定。html代码中应该存在如下代码：`<div id="mVirtualView"></div>`，而父视图在引用虚拟视图时的代码为：  
    
        @partialView(VirtualViewDemo)
        mVirtualView: VirtualViewDemo;

##	表单验证（validate）
1. 示例  
tinyts中实现了一个表单验证器。现在假设我们要验证一个登录表单。示例如下：  
html：  

        <form action="/user/login">
            <div>username:<input type="text" id="sUserName"></div>
            <div>password:<input type="password" id="sPassword"></div>
            <div><button type="button" id="btnSubmit">提交</button></div>
        </form>

    Typescript:  

        import {BaseViewModel, view} from '../../../tinyts/core/Core';
        import {TextBox} from '../../../tinyts/controls/TextBox';
        import {Button} from '../../../tinyts/controls/Button';
        
        export class ValidateModel extends BaseViewModel {
        
            @view(TextBox)
            sUserName: TextBox;
        
            @view(TextBox)
            sPassword: TextBox;
        
            @view(Button)
            btnSubmit: Button;
        
            OnValidateError() {
        
            }
        
            RegisterEvents() {
                var me = this;
                this.btnSubmit.OnClick(() => {
                    var username = me.sUserName.Value();
                    var password = me.sPassword.Value();
                    //在这里验证用户输入
                    
                });
        
            }
        }
        
    上述示例是没有使用验证器的情况，我们需要在获取控件数据后进行手动验证。这种方法比较繁杂低效，也影响到代码的可读性。接下来我将介绍如何使用验证器。  
    假设我们的密码必须是6-20位，用户名不能为空。我们在tinyts中已经预定义了几个验证器，现在可以直接使用。首先，我们需要在html中定义验证规则（实际上是指定了使用哪些验证器，将会在自定义验证器节中详细说明），代码如下：  
    html:  
    
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <title>Document</title>
        </head>
        
        <body>
            <form action="/user/login">
                <div>username:<input type="text" id="sUserName" data-validate-required="true" data-tag="用户名"></div>
                <div>password:<input type="password" id="sPassword" data-validate-min-length=6 data-validate-max-length=20 data-tag="密码"></div>
                <div><button type="button" id="btnSubmit">提交</button></div>
            </form>
        </body>
        
        </html>
    注意，我们在sUserName上定义了data-validate-required属性，在sPassword上定义了data-validate-min-length和data-validate-max-length属性，这分别对应了是VRequired验证器、VMinLength验证器和VMaxLength验证器。细心地你可以发现，我们在上述两个input上都添加了data-tag属性，这个属性是用于提供错误提示的。接下来，查看我们的viewmodel代码有什么变化。  
    Typescript：  
    
        import {BaseViewModel, view} from '../../../tinyts/core/Core';
        import {TextBox} from '../../../tinyts/controls/TextBox';
        import {Button} from '../../../tinyts/controls/Button';
        
        export class ValidateModel extends BaseViewModel {
        
            @view(TextBox)
            sUserName: TextBox;
        
            @view(TextBox)
            sPassword: TextBox;
        
            @view(Button)
            btnSubmit: Button;
        
            OnValidateError(msg: string) {
                //验证错误会调用此方法
                alert(msg);
            }
        
            RegisterEvents() {
                var me = this;
                this.btnSubmit.OnClick(() => {
                    var username = me.sUserName.ValidatedValue();
                    var password = me.sPassword.ValidatedValue();
                    //在这里已经确认得到的值是经过验证的
                });
        
            }
        }
    这里唯一的变化就是，原本获取TextBox值调用的Value方法变成了ValidatedValue，这样可以保证获取到的值是经过验证的。若验证失败，则会调用context（这里是viewmodel）的OnValidateError方法。
    
2. 使用ModelInjector  
    你是否还记得，我们在model章节中提到的ModelInjector，可以用于注入控件的值到相应的model。结合这里的验证器，ModelInjector提供了一个`InjectModelDistrict`方法，该方法在注入数据之前，会先对数据进行验证。在这里就不具体举例了。
3. 自定义验证器  
    考虑到tinyts只提供了极其有限的验证器，你必须掌握编写自定义验证器的方法。我们首先来看一下示例验证器是如何实现的：  
Typescript：  

        import {validator, IValidator} from './IValidator';
        
        @validator
        export class VMaxLength implements IValidator<string>{
        
            constructor(private tag: string, private maxLength: number) {
            }
        
            GetMessage() {
                return `${this.tag}不能超过${this.maxLength}个字符.`;
            }
        
            Validate(input: string): boolean {
                return input.length <= this.maxLength;
            }
        }
        
        @validator
        export class VMinLength implements IValidator<string>{
        
            constructor(private tag: string, private minLength: number) {
        
            }
        
            GetMessage() {
                return `${this.tag}至少${this.minLength}个字符.`;
            }
        
            Validate(input: string): boolean {
                return input.length >= this.minLength;
            }
        
        }
        
        @validator
        export class VRequired implements IValidator<string>{
        
            constructor(private tag: string) {
        
            }
        
            GetMessage() {
                return `${this.tag}不能为空.`;
            }
        
            Validate(input: string): boolean {
                return input != "";
            }
        }
        
        export function Register() {
        
        };
    在tinyts中，验证器定义在一个数据类型上（上述提供的示例验证器都是定义在string上的，他可以验证一个string）。验证器实现一个IValidator接口。该接口的定义如下：  
    Typescript：  

        /**
         * IValidator 验证器接口
         * T: 验证的类型
         */
        export interface IValidator<T> {
            /**
             * Validate 验证方法,返回是否验证成功
             */
            Validate(input: T): boolean;
            /**
             * GetMessage 获取验证的错误信息
             */
            GetMessage(): string;
        }
    这意味着你必须在验证器中实现Validate方法和GetMessage方法，这两个方法的详细注释都已经在代码中呈现。实现完一个验证器之后，你要做的事情就是在该验证器类上加上一个装饰器@validator来告诉tinyts这是一个验证器即可。  
    最后要说明的是验证器和html属性的对应关系。验证器的类名为V加上验证器名，例如VMaxLength，对应的html属性为data-validate-max-length。而该html属性的值将会在调用验证器的构造函数时被传递（第一个参数为data-tag的值，第二个为对应验证器属性的值）。

## 工具（utils）
1. cookie类。参见源代码及其注释。
2. router  
    在tinyts的Http工具包中，提供了一个Router类，该类主要提供html5 router的功能。在使用这个类的时候，你需要先通过调用SetContext方法设置上下文。Router类有以下方法：  
    + GoTo方法。该方法首先更新当前url并将目标url的State记录到history中，然后触发Context的OnRouteChange事件。
    + ReplaceCurrentState方法。该方法更新当前url并替换当前history的State为目标url，然后触发Context的OnRouteChange事件。
    + Context的OnRoutePopState方法将在触发浏览器的back方法或forward方法时被调用，参数为目标url的State。
3. urlparser类。参见源代码及其注释。
4. 分页  
    在tinyts中，分页被集成在某些具体的控件类中（TableView）。经过仔细的斟酌考虑，我们把分页作为ListView的一个插件，实现为PageManager类。  
    PageManager类有一个泛型参数T，表示他要托管数据的元数据。在使用PageManager之前，你需要先初始化一个PageManager的实例，并将被托管的ListView对象作为PageManager构造函数的参数传递进去，要求ListView和PageManager的泛型参数是同一个类型。PageManager支持两种分页模式，同步分页和异步分页，你可以通过SetPageMode来设置不同的分页模式。下面将介绍每种分页模式的使用方法。  
    同步分页是一种较为简单的分页模式，你需要调用PageManager的SetData方法，将被托管的数据交给PagaManager。接下来只需要调用PageManager的调页函数（FirstPage、PrevPage、NextPage、LastPage、TurnToPage）就可以完成分页控制了。  
    异步分页需要每次从服务端获取数据，比同步分页更为复杂。使用异步分页之前，你需要通过SetContext方法设置Context，Context必须包含一个GetData方法，用于获取服务端的数据。在每次服务端返回数据的时候，你需要手动调用SetRecordCount或者SetPageCount（两者选其一）来设置总页数。设置完成后，同样只需要调用PageManager的调页函数来完成分页控制。另外，你还可以调用PageManager的SetPageSize来设置每页条数。

##	控件（controls）
1. 控件基类  
    我们在tinyts中定义了一组控件基类，分别实现不同的功能。几个核心类之间的继承关系大致如下：  
    View<-TextView<-InputView  
    View<-ListView  
    目前已实现的具体控件类的继承关系如下:  
    View<-CheckBox  
    View<-UEditor  
    View<-ImageView  
    View<-EditDialog<-ConfirmDialog  
    TextView<-FileUploader  
    TextView<-Button  
    InputView<-TextBox  
    ListView<-ItemList  
    ListView<-RadioButton  
    ListView<-SelectButton  
    ListView<-TableView  
    ListView<-UlList  
    关于View、TextView、InputView和ListView的具体实现将会在下一节详细介绍。
2. View、TextView、InputView与ListView
    + View  
        View是所有控件的基类，View在tinyts中代表一个控件视图。一般情况下，View绑定到一个html element。View实现了一个基础控件所具有的所有功能。View的功能接口请查阅文件注释，下面介绍与框架相关的接口：  
        + SetID方法。设置View的唯一标志ID，一般情况下，该ID与html element的id保持一致。
        + LoadView方法。该方法将会根据View的ID查找html document中的元素，并进行绑定。  
        + Attr方法与SetAttr方法。我们为tinyts中的每个View实现了一个键值对属性。可以通过SetAttr方法设置这些属性，用Attr获取这些属性。
    + TextView    
        TextView代表具备文字展示功能的View。
    + InputView  
        InputView表示具备数据验证功能的View，是一个抽象基类，必须实现Value方法。该控件需要配合验证器（Validator）使用。具体使用方式参见验证器章节。
        + Value方法返回该控件的值（未经验证的值，原始值）。
    + ListView  
        ListView表示一个列表控件。ListView有一个泛型参数T，T表示该列表控件的元数据。  
        + getTemplateView方法。该方法将在渲染ListView的时候被调用，用于生成列表项的视图。
        + RegisterEvents方法。该方法将在渲染ListView完成后被调用，用于绑定列表项事件。
        + append方法。该方法将在渲染ListView的时候被调用，向列表视图的末尾添加一项。
        + RefreshView方法。该方法将在ListView的Data改变时被调用，刷新列表视图，也可以手动调用该方法来刷新整个列表视图。
3. 控件注入过程  
    在这里介绍一下tinyts注入控件的具体过程。  
    页面加载完成后，tinyts将viewmodel中装饰了view或partialView装饰器的属性（属性名和属性类型）注入到viewmodel中。viewmodel初始化的时候，会逐个初始化这些属性（控件），然后调用View的SetID方法，将这些View的ID设置为属性名，接着调用LoadView方法，绑定View与Html element之间的绑定关系。等这些操作全部完成之后，tinyts调用viewmodel的RegisterEvents方法注册事件与OnLoad方法。到此为止，viewmodel初始化完成。
3. Button
4. CheckBox
5. ConfirmDialog
6. EditDialog
7. FileUploader
8. ImageView
9. ItemList
10. RadioButton
11. SelectButton
12. TableView
13. TextBox
14. UEditor
15. UlList

##	控件开发
1. 扩展控件功能
2. 开发新控件
