/**
 * VirtualView<T> 虚拟视图
 * 依靠类中的template属性渲染试图
 * 
 * 继承该类必须实现SetTemplate方法,在该方法中设置视图的View(Html code)
 * 需要手动调用SetContext方法设置上下文
 */
abstract class VirtualView<T> extends View implements IViewModel {

    context: T;

    template: string;

    SetContext(context: T) {
        this.context = context;
    }

    LoadView() {
        this.SetTemplate();
        super.LoadView();
        this.target.append(this.template);
        
        //在这里注入control
        inject(this.constructor, this);
    }

    abstract SetTemplate();

    abstract RegisterEvents();

}