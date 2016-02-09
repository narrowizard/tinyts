abstract class VirtualView extends View implements IViewModel {
    
    template: string;

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