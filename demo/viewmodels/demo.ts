class Demo extends BaseViewModel {

    @view(Searcher)
    searcher: Searcher;
    
    @partialView(Test)
    test:Test;

    init() {

    }

    RegisterEvents() {

    }

}

$().ready(() => {
    var demo = new Demo();
    demo.init();
});