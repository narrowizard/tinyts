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

    constructor() {
        inject(this.constructor, this);
    }

    abstract RegisterEvents();
}