class Demo implements IViewModel {

    @view(ScrollPageView)
    mainScrollPageView: ScrollPageView;

    init() {
        this.mainScrollPageView.NextPage();
    }

    RegisterEvents() {
        var me = this;
    }

}

$().ready(() => {
    var demo = ViewBinder.instantiate(Demo);
    demo.init();
});