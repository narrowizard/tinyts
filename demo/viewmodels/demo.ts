class Demo extends BaseViewModel {

    @view(Table)
    testTable: Table<User>;

    init() {
        var data = [];
        data.push(new User(1, "张三"));
        data.push(new User(2, "John"));
        data.push(new User(3, "Jobs"));
        this.testTable.SetData(data);

    }

    RegisterEvents() {

    }

}

$().ready(() => {
    var demo = new Demo();
    demo.init();
});