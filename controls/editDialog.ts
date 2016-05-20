import {View} from "../core/View";
import {controlConfig} from '../config/TinytsConfig';

export class EditDialog extends View {
    mask: JQuery;
    masked: boolean;
    closeOnClick: boolean;
    focus: View;
    protected width: number;
    protected mouseX: number;
    protected mouseY: number;
    protected isMoving: boolean;

    LoadView() {
        var me = this;
        super.LoadView();
        var draggable = this.target.attr("data-draggable");
        var masked = this.target.attr("data-mask");
        //焦点元素
        var focus = this.target.attr("data-focus");
        if (focus) {
            var temp: View = new View();
            temp.SetID(focus);
            temp.LoadView();
            this.focus = temp;
        }
        this.closeOnClick = Boolean(this.target.attr("data-close-on-click"));
        //遮罩
        if (masked) {
            this.masked = true;
            this.initMask();
        }
        this.Hide();
        //关闭按钮
        this.target.find(controlConfig.dialogCloseButtonSelector).click(() => {
            me.Hide();
        });
        //可拖动
        if (draggable) {
            this.initDraggable();
        }
    }

    /**
     * SetFocus 设置默认焦点
     * @param target 目标View
     * @param selector 目标选择器
     */
    SetFocus(target: View);
    SetFocus(selector: string);
    SetFocus(param: any) {
        if (typeof param == "string") {
            var temp: View = new View();
            temp.BindBySelector(param);
            this.focus = temp;
        } else if (typeof param == "object") {
            this.focus = param;
        }
    }

    /**
     * Show 显示editdialog
     */
    Show() {
        this.target.css("display", "block");
        if (this.masked) {
            this.mask.css("display", "block");
        }
        if (this.focus) {
            this.focus.Focus();
        }
    }

    /**
     * Hide 隐藏editdialog
     */
    Hide() {
        this.target.css("display", "none");
        if (this.masked) {
            this.mask.css("display", "none");
        }
    }

    /**
     * 需要添加mask的样式
     */
    protected initMask() {
        var html = `<div class='${controlConfig.dialogMaskClass}'></div>`;
        this.mask = $(html);
        // this.target.append(this.mask);
        this.mask.insertAfter(this.target);
        var me = this;
        if (this.closeOnClick) {
            this.mask.click(() => {
                me.Hide();
            });
        }
    }

    protected initDraggable() {
        var me = this;

        this.target.mousedown((eventObject: JQueryMouseEventObject) => {
            eventObject = (eventObject || window.event) as JQueryMouseEventObject;
            pauseEvent(eventObject);
            me.mouseX = eventObject.pageX - me.target.offset().left;
            me.mouseY = eventObject.pageY - me.target.offset().top;
            me.isMoving = true;
        });
        $(document).mousemove((eventObject: JQueryMouseEventObject) => {
            eventObject = (eventObject || window.event) as JQueryMouseEventObject;
            pauseEvent(eventObject);
            if (me.isMoving) {
                me.target.css("top", eventObject.pageY - me.mouseY);
                me.target.css("left", eventObject.pageX - me.mouseX);
            }
        });

        this.target.mouseup(() => {
            me.isMoving = false;
        });
    }
}

function pauseEvent(e) {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
}