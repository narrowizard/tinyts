import { View } from '../core/view';

/**
 * Dialog 
 * options
 * data-draggable
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
        }
        return succ;
    }

    Hide() {
        this.display = this.target.css("display");
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