import {View} from './View';
import {InputView} from './InputView';
import {IViewModel} from '../interfaces/IViewModel';
/**
 * BaseViewModel ViewModel的基类,该类实现了依赖注入
 * 可注入的类型有:
 * View
 * ViewGroup<T>
 * 
 * 在BaseViewModel被初始化的时候
 * 该ViewModel标注了@view或@partialView的属性将会被实例化并注入到该ViewModel中
 * 
 * 继承该类必须实现RegisterEvents方法,在该方法中绑定ViewModel属性的事件
 */
export abstract class BaseViewModel implements IViewModel {

    container: string;
    loading: string;

    constructor(container?: string, loading?: string) {
        if (!container) {
            container = "body";
        }
        if (!loading) {
            loading = "";
        }
        this.container = container;
        this.loading = loading;

        inject(this.constructor, this);
        //注入完成,隐藏loading,显示container
        $(this.loading).hide();
        $(this.container).show();
    }

    abstract RegisterEvents();

    OnValidateError(msg: string) {
        //控件验证的错误处理,请重载该函数
    }

    OnLoad() {

    }
}

/**
* ViewGroup<T> ViewModel中的一个子视图模型
* T: 上下文类型(父ViewModel的类型)
*/
export abstract class ViewGroup<T> extends BaseViewModel {

    context: T;

    SetContext(context: T) {
        this.context = context;
    }

}

export abstract class VirtualView<T> extends View implements IViewModel {

    context: T;

    template: string;

    container: string;

    loading: string;

    SetContext(context: T) {
        this.context = context;
    }

    LoadView() {
        this.SetTemplate();
        super.LoadView();
        this.target.html(this.template);

        //在这里注入control
        inject(this.constructor, this);
    }

    abstract SetTemplate();

    abstract RegisterEvents();

    OnValidateError(msg: string) {

    }

    OnLoad() { }

}

//根据Control的属性名称和类型
//自动初始化,绑定页面上的id
//并注入到ViewModel中

// 注入数据
// var data = {
//     __inject__: {
//         vmName: {
//             propertyName: Class,
//             constructor:Constructor
//         }
//     }
// }

/**
 * 用于某个控件
 */
export function view(Class: { new (...args: any[]): View }) {
    return function inject(target: IViewModel, decoratedPropertyName: string): void {
        const targetType: { __inject__?: Object } = target.constructor;
        // 目标viewmodel的名称
        var name = target.constructor.toString().match(/^function\s*([^\s(]+)/)[1];

        if (!targetType.hasOwnProperty(`__inject__`)) {
            targetType[`__inject__`] = {};
        }

        if (!targetType["__inject__"][name]) {
            targetType["__inject__"][name] = {
                constructor: target.constructor
            };
        }

        targetType[`__inject__`][name][decoratedPropertyName] = Class;
    }
}

/**
 * 用于封装的部分视图
 */
export function partialView<T>(Class: { new (...args: any[]): ViewGroup<T> }) {
    return function inject(target: T, decoratedPropertyName: string): void {
        const targetType: { __inject__?: Object } = target.constructor;

        var name = target.constructor.toString().match(/^function\s*([^\s(]+)/)[1];

        if (!targetType.hasOwnProperty(`__inject__`)) {
            targetType[`__inject__`] = {};
        }

        if (!targetType["__inject__"][name]) {
            targetType["__inject__"][name] = {
                constructor: target.constructor
            };
        }

        targetType[`__inject__`][name][decoratedPropertyName] = Class;
    }
}

/**
 * 注入
 * @param Class ViewModel's constructor
 * @param instance ViewModel instance
 */
function inject(Class: Function, instance: IViewModel) {
    if (Class["__inject__"]) {
        var properties = {};

        Object.keys(Class["__inject__"]).map((vmName: string) => {
            var c = Class["__inject__"][vmName]["constructor"];
            if (instance instanceof c) {
                // 注入
                properties = $.extend({}, properties, Class["__inject__"][vmName]);
            }
        });

        var result = Object.keys(properties)
            .map((propertyName: string) => {
                if (propertyName == "constructor") {
                    return null;
                }
                var temp: InjectionPoint = { propertyName: "", constructor: null };
                temp.propertyName = propertyName;
                temp.constructor = properties[propertyName];
                return temp;
            });
        for (let injectionPoint of result) {
            if (!injectionPoint) {
                continue;
            }
            var temp = new injectionPoint.constructor();
            if (temp instanceof VirtualView) {
                temp.SetContext(instance);
            }
            if (temp instanceof View) {
                //如果是View
                (temp as View).SetID(injectionPoint.propertyName);
                (temp as View).LoadView();
                if (temp instanceof InputView) {
                    //如果是InputView 注入ErrorHandler
                    (temp as InputView).SetErrorHandler(instance);
                }
            } else if (temp instanceof ViewGroup) {
                //如果是ViewGroup
                temp.SetContext(instance);
            }

            instance[injectionPoint.propertyName] = temp;
        }
    }

    instance.RegisterEvents();
    instance.OnLoad();
}

interface InjectionPoint {
    propertyName: string;
    constructor: { new (...args: any[]): any };
}
