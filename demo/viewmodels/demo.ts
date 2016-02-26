class Demo extends BaseViewModel {

    @view(TextBox)
    txtInput: TextBox;

    @view(Button)
    btnSubmit: Button;

    RegisterEvents() {
        var me = this;
        this.btnSubmit.OnClick(() => {
            if (!me.txtInput.Validate()) {
                alert(me.txtInput.GetLastError());
            } else {
                alert(me.txtInput.Value());
            }
        });
    }

}

$().ready(() => {
    var demo = new Demo();
});