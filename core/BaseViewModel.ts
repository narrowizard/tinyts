import {inject} from './ViewFilter';

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

    OnLoad() {

    }
}