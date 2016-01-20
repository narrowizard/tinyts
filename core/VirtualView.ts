abstract class VirtualView extends View implements IViewModel {

    template: string;

    LoadView() {
        this.SetTemplate();
        super.LoadView();
        this.target.append(this.template);
        
        //在这里注入control
        var Class = this.constructor;
        if (Class["__inject__"]) {
            var result = Object.keys(Class["__inject__"])
                .map((propertyName: string) => {
                    var temp: InjectionPoint = { propertyName: "", constructor: null };
                    temp.propertyName = propertyName;
                    temp.constructor = Class["__inject__"][propertyName];
                    return temp;
                });
            for (let injectionPoint of result) {
                var temp = new injectionPoint.constructor();
                //如果是Control
                if (temp instanceof View) {
                    (temp as View).SetID(injectionPoint.propertyName);
                    (temp as View).LoadView();
                } else if (temp instanceof ViewGroup) {
                    //如果是View
                    temp.SetContext(this);
                }

                this[injectionPoint.propertyName] = temp;
            }
            this.RegisterEvents();
        }
    }

    abstract SetTemplate();

    abstract RegisterEvents();

}