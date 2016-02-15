class Searcher extends VirtualView<Demo> {

    @view(TextBox)
    sInput: TextBox;

    @view(Button)
    btnSubmit: Button;

    SetTemplate() {
        this.template = `<div>
                            <h1>标题</h1>
                            <div>内容内容内容</div>
                            <input type='text' id='sInput' />
                            <button type='button' id='btnSubmit'>提交</button>
                        </div>`;
    }

    RegisterEvents() {
        var me = this;
        this.btnSubmit.OnClick(() => {
            alert("hello" + me.sInput.Value());
        });
    }

}