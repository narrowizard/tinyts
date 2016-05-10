import {View} from "../core/View";

class UEditor extends View {
    editor: UE;

    LoadView() {
        super.LoadView();
        var param = this.target.attr("data-param");
        this.editor = UE.getEditor(this.ViewId(), {
            initialFrameHeight: $(window).height() - 340
        });
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

    static SetHeight(height: number) {
        $(".edui-editor-iframeholder.edui-default").css("height", height);
    }

    SetContent(html: string) {
        this.editor.setContent(html);
    }

    GetContent(): string {
        return this.editor.getContent();
    }

    static ResizeEditor() {
        $(".edui-editor").css("width", "100%");
        $(".edui-editor").css("margin", "auto");
        $(".edui-editor-iframeholder").css("width", "100%");
    }
}