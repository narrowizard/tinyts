import {Table} from "../controls/TableView";


/**
 * TableExt Table控件的扩展插件
 */
export class TableExt<T extends IModel> {
    protected tableInstance: Table<T>;

    constructor(instance: Table<T>) {
        this.tableInstance = instance;
    }

    /**
     * 注册checkbox
     * prop: th data-checkbox=true
     */
    RegisterCheckBox() {
        var target = this.tableInstance.GetJqueryInstance();
        target.find("th").each((index: number, elem: Element) => {
            if ($(elem).attr("data-checkbox")) {
                // checkbox
                $(elem).html(`<input type="checkbox" data-column-index=${index} >`);
                // tbody
                target.find("tbody tr").each((i, elem) => {
                    $(elem).find("td").eq(index).html(`<input type="checkbox" data-column-index=${index} data-index=${i} >`);
                });
            }
        });
        //全选
        target.find("thead input[type='checkbox']").click((obj) => {
            var columnIndex = $(obj.target).attr("data-column-index");
            var state = $(obj.target).prop("checked");

            target.find("tbody input[type='checkbox'][data-column-index=" + columnIndex + "]").prop("checked", state);
        });
        //取消全选
        target.find("tbody input[type='checkbox']").click((obj) => {
            var state = $(obj.target).prop('checked');
            var columnIndex = $(obj.target).attr('data-column-index');
            var checkall = true;
            target.find(`tbody input[type='checkbox'][data-column-index=${columnIndex}]`).each((index, elem) => {
                if (!$(elem).prop("checked")) {
                    checkall = false;
                    return false;
                }
            });
            target.find(`thead input[type='checkbox'][data-column-index=${columnIndex}]`).prop("checked", checkall);
        });
    }

    /**
     * TraverseSelected 遍历选中的行
     * @param columnIndex 列索引
     * @param handler (index:number,data:T)=>boolean 遍历函数,如果返回false,将终止遍历
     */
    TraverseSelected(columnIndex: number, handler: (index: number, data: T) => boolean) {
        var target = this.tableInstance.GetJqueryInstance();
        var me = this;
        target.find(`tbody input[type='checkbox'][data-column-index=${columnIndex}]`).each((index, elem) => {
            var checkbox = $(elem);
            if (checkbox.prop("checked")) {
                var dataIndex = +checkbox.attr("data-index");
                if (!handler(dataIndex, me.tableInstance.GetItem(dataIndex))) {
                    return false;
                }
            }
        });
    }

    /**
     * Sortable 将table设置为可拖动排序
     * 请为tr定义唯一data-id属性,否则将造成数据与页面不统一
     * @param config 排序参数
     */
    Sortable(onMove?: () => void) {
        if (!$.fn.sortable) {
            console.error("sortable undefined, http://jqueryui.com");
            return;
        }
        var config: ISortableConfig = {
            containerSelector: "table",
            itemPath: "> tbody",
            itemSelector: "tr",
            placeholder: "<tr class='placeholder' />",
            stop: (event: Event, ui: { item: JQuery, sender: JQuery }) => {
                //调整table中的mData的order
                var tbody = this.tableInstance.GetJqueryInstance().find("tbody");
                var ids = [];
                tbody.children("tr").each((index, elem) => {
                    ids[index] = $(elem).attr("data-id");
                });
                var temp: T[] = [];
                for (var i = 0; i < ids.length; i++) {
                    temp[i] = Enumerable.from(this.tableInstance.mData).where((p: T) => { return p.Id == ids[i] }).firstOrDefault();
                    if (temp[i] == null) {
                        console.error("请为tr定义唯一data-id属性,否则将造成数据与页面不统一");
                        return;
                    }
                }
                this.tableInstance.mData = temp;
                if (onMove) {
                    onMove();
                }
            }
        };
        this.tableInstance.GetJqueryInstance().children("tbody").sortable(config);
    }

}