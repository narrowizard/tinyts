import {ListView} from '../core/ListView';
import {RadioModel} from '../models/RadioModel';
import {controlConfig} from '../config/TinytsConfig';

export class ItemList extends ListView<RadioModel>{

    GetChildren(): JQuery {
        return this.target.find("li");
    }

    onItemClick: (obj: JQueryEventObject) => void;

    GetView(index: number): string {
        if (index < 0 || index >= this.Count()) {
            return "";
        }
        var html = "";
        html += "<li data-value='" + this.mData[index].value + "'>";
        html += this.mData[index].text;
        html += "</li>";
        return html;
    }

    RefreshView() {
        var me = this;
        super.RefreshView();
        if (me.onItemClick) {
            me.target.children("li").unbind("click");
            me.target.children("li").click((obj) => {
                me.target.children("li").removeClass(controlConfig.itemlistActiveClass);
                $(obj.target).addClass(controlConfig.itemlistActiveClass);
                me.onItemClick(obj);
            });
        }
        if (this.Count() > 0) {
            me.target.children("li").eq(0).click();
        }
    }

    Select(index: number) {
        if (index < 0) {
            return;
        }
        this.target.children("li").eq(index).click();
    }

    SelectLast() {
        this.target.children("li").last().click();
    }

    RemoveSelected() {
        var index = this.target.children(`.${controlConfig.itemlistActiveClass}`).index();
        if (index == -1) {
            return;
        }
        this.Remove(index);
    }

    protected append(html: string) {
        var me = this;
        super.append(html);
        if (me.onItemClick) {
            me.target.children("li").unbind("click");
            me.target.children("li").click((obj) => {
                me.target.children("li").removeClass(controlConfig.itemlistActiveClass);
                $(obj.target).addClass(controlConfig.itemlistActiveClass);
                me.onItemClick(obj);
            });
        }
    }
}