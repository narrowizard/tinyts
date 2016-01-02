class Demo extends BaseViewModel {

    @partialView(AddDialog)
    addDialog: AddDialog;

}

$().ready(() => {
    var demo = new Demo();
});