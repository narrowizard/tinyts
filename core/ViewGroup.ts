abstract class ViewGroup<T> extends BaseViewModel {

    context: T;

    SetContext(context: T) {
        this.context = context;
    }

}