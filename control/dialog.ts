import { View } from '../core/view';

/**
 * Dialog 
 * options
 * data-draggable
 * data-close 关闭按钮的选择器(限定在dialog内) click事件
 */
export class Dialog extends View {

    protected display: string;
    protected mouseX: number;
    protected mouseY: number;
    protected isMoving: boolean;

    LoadView(parent?: string) {
        var succ = super.LoadView(parent);
        if (succ) {
            var draggable = this.target.attr("data-draggable");
            if (draggable) {
                this.initDraggable();
            }
            var closeSelector = this.target.attr("data-close");
            if (closeSelector) {
                this.target.find(closeSelector).click(() => {
                    this.Hide();
                })
            }
            this.Hide();
        }
        return succ;
    }

    /**
     * Hide 隐藏Dialog
     * 当target初始display状态是none,且定义在style样式表中时,无法正确Show
     */
    Hide() {
        this.display = this.target.css("display");
        if (!this.display || this.display == "none") {
            this.display = "";
        }
        this.target.css("display", "none");
    }

    Show() {
        this.target.css("display", this.display);
    }

    protected initDraggable() {
        var me = this;

        this.target.mousedown((eventObject: JQueryMouseEventObject) => {
            if (eventObject.target instanceof HTMLInputElement || eventObject.target instanceof HTMLTextAreaElement || eventObject.target instanceof HTMLSelectElement) {
                return;
            }
            eventObject = (eventObject || window.event) as JQueryMouseEventObject;
            pauseEvent(eventObject);
            me.mouseX = eventObject.pageX - me.target.offset().left;
            me.mouseY = eventObject.pageY - me.target.offset().top;
            me.isMoving = true;
        });
        $(document).mousemove((eventObject: JQueryMouseEventObject) => {
            if (!me.isMoving) {
                return;
            }
            if (eventObject.target instanceof HTMLInputElement || eventObject.target instanceof HTMLTextAreaElement || eventObject.target instanceof HTMLSelectElement) {
                return;
            }
            eventObject = (eventObject || window.event) as JQueryMouseEventObject;
            pauseEvent(eventObject);
            if (me.isMoving) {
                var scroll = $(window).scrollTop();
                me.target.css("top", eventObject.pageY - scroll - me.mouseY);
                me.target.css("left", eventObject.pageX - me.mouseX);
            }
        });

        this.target.mouseup(() => {
            me.isMoving = false;
        });
    }
}

function pauseEvent(e: JQueryMouseEventObject) {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
}