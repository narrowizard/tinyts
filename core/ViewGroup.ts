/**
 * ViewGroup<T> ViewModel中的一个子视图模型
 * T: 上下文类型(父ViewModel的类型)
 */
abstract class ViewGroup<T> extends BaseViewModel {

    context: T;

    SetContext(context: T) {
        this.context = context;
    }

}