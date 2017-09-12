interface AncView extends View {
    constructor(selector?: string);
}

/**
 *  v decorator 用于标记一个通过ID绑定的View
 * @param T 目标视图的类型(如果是ViewG,则要求视图实现T的方法,如果是View则不限制)
 * @param c View的构造函数
 * @param selector 选择器
 * @return [[PropertyDecorator]]
 */
declare function v<T>(c: { new(...args: any[]): ViewG<T> | View }, selector?: string): PropertyDecorator;

/**
 * f decorator 用于声明虚拟视图的html文件
 * @param url html文件的url地址
 * @return [[PropertyDecorator]]
 */
declare function f(url: string): (constructor: { new(...args: any[]): ViewV<any> }) => void;

/**
 * s decorator 用于声明需要注入的service
 * @param s service的构造函数
 * @return [[PropertyDecorator]]
 */
declare function s<T>(s: { new(...args: any[]): T }): PropertyDecorator;