class Demo extends BaseViewModel {

    @partialView(Test)
    test: Test;

    localService: LocalService;

    constructor() {
        super();
        this.localService = new LocalService();
    }

    LoadData() {
        this.localService.GetReport(this);
    }

    RegisterEvents() {

    }

}

$().ready(() => {
    var demo = new Demo();
    demo.LoadData();
});