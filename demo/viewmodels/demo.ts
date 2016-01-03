class Demo extends BaseViewModel {

    localService: LocalService;

    constructor() {
        super();
        this.localService = new LocalService();
    }

    LoadData() {
        this.localService.GetReport(this);
    }

}

$().ready(() => {
    var demo = new Demo();
    demo.LoadData();
});