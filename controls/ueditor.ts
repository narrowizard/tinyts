class UEditor extends View {
    editor: UE;

    LoadView() {
        debugger;
        super.LoadView();
        var param = this.target.attr("data-param");
        this.editor = UE.getEditor(this.ViewId());
        //多个参数以|分割
        var ps = param.split("|");
        for (var i = 0; i < ps.length; i++) {
            var temp = ps[i].split(":");
            this.SetImageUploadParam(temp[0], temp[1]);
        }
    }

    SetImageUploadParam(key: string, value: any) {
        this.editor.ready(() => {
            this.editor.execCommand("serverparam", key, value);
        });

    }

    ClearImageUploadParam() {
        this.editor.ready(() => {
            this.editor.execCommand("serverparam");
        });
    }

    SetContent(html: string) {
        this.editor.setContent(html);
    }

    GetContent(): string {
        return this.editor.getContent();
    }

    static ResizeEditor() {
        $(".edui-editor").css("width", "95%");
        $(".edui-editor").css("margin-left", "1%");
        $(".edui-editor-iframeholder").css("width", "100%");
    }
}