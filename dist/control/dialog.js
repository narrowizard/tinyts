"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("../core/view");
/**
 * Dialog
 * options
 * data-draggable
 * data-close 关闭按钮的选择器(限定在dialog内) click事件
 */
var Dialog = /** @class */ (function (_super) {
    __extends(Dialog, _super);
    function Dialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dialog.prototype.LoadView = function (parent) {
        var _this = this;
        var succ = _super.prototype.LoadView.call(this, parent);
        if (succ) {
            var draggable = this.target.attr("data-draggable");
            if (draggable) {
                this.initDraggable();
            }
            var closeSelector = this.target.attr("data-close");
            if (closeSelector) {
                this.target.find(closeSelector).click(function () {
                    _this.Hide();
                });
            }
            this.Hide();
        }
        return succ;
    };
    /**
     * Hide 隐藏Dialog
     * 当target初始display状态是none,且定义在style样式表中时,无法正确Show
     */
    Dialog.prototype.Hide = function () {
        this.display = this.target.css("display");
        if (!this.display || this.display == "none") {
            this.display = "";
        }
        this.target.css("display", "none");
    };
    Dialog.prototype.Show = function () {
        this.target.css("display", this.display);
    };
    Dialog.prototype.initDraggable = function () {
        var me = this;
        this.target.mousedown(function (eventObject) {
            if (eventObject.target instanceof HTMLInputElement || eventObject.target instanceof HTMLTextAreaElement || eventObject.target instanceof HTMLSelectElement) {
                return;
            }
            eventObject = (eventObject || window.event);
            pauseEvent(eventObject);
            me.mouseX = eventObject.pageX - me.target.offset().left;
            me.mouseY = eventObject.pageY - me.target.offset().top;
            me.isMoving = true;
        });
        $(document).mousemove(function (eventObject) {
            if (!me.isMoving) {
                return;
            }
            if (eventObject.target instanceof HTMLInputElement || eventObject.target instanceof HTMLTextAreaElement || eventObject.target instanceof HTMLSelectElement) {
                return;
            }
            eventObject = (eventObject || window.event);
            pauseEvent(eventObject);
            if (me.isMoving) {
                var scroll = $(window).scrollTop();
                me.target.css("top", eventObject.pageY - scroll - me.mouseY);
                me.target.css("left", eventObject.pageX - me.mouseX);
            }
        });
        this.target.mouseup(function () {
            me.isMoving = false;
        });
    };
    return Dialog;
}(view_1.View));
exports.Dialog = Dialog;
function pauseEvent(e) {
    if (e.stopPropagation)
        e.stopPropagation();
    if (e.preventDefault)
        e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
}
