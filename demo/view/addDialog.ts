class AddDialog extends ViewGroup {

    @view(Button)
    btnSubmit: Button;

    @view(TextBox)
    txtInput: TextBox;

    RegisterEvents() {
        var me = this;

        me.btnSubmit.OnClick(() => {
            alert(me.txtInput.Value());
        });
    }
}