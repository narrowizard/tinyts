class Demo extends BaseViewModel {

    @view(Searcher)
    searcher: Searcher;

    init() {

    }

    RegisterEvents() {

    }

}

$().ready(() => {
    var demo = new Demo();
    demo.init();
});