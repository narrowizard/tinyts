import { View } from '../control/view';
/**
 * ValueContainer 依赖注入容器
 */
export class ValueContainer {

    protected static viewContainer: { [key: string]: { new (...args: any[]): View } }

    /**
     * RegisterViewContainer 注册View容器
     * @param name View名称
     * @param constructor View的构造函数
     */
    RegisterViewContainer(name: string, constructor: { new (...args: any[]): View }) {
        if (ValueContainer.viewContainer[name]) {
            console.warn(`${name} already registed!`);
            return;
        }
        ValueContainer.viewContainer[name] = constructor;
    }

    /**
     * GetView 根据View名称获取View对象
     * @param viewName View名称
     */
    GetView(viewName: string): View {
        var constructor = ValueContainer.viewContainer[viewName];
        if (constructor != null) {
            return new constructor();
        }
    }
}