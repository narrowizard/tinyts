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