import {ListView} from './ListView';

abstract class PageListView<T> extends ListView<T>{
    /**
     * 是否支持分页
     */
    protected pageable: boolean;
    /**
     * 总页数
     */
    protected pageCount: number;
    /**
     * 当前页码
     */
    protected curPage: number;
    /**
     * 每页条数
     */
    protected pageSize: number;
    /**
     * 总数据条数
     */
    protected itemCount: number;
    /**
     * 是否异步加载分页信息,默认为true
     */
    protected async: boolean;

    /**
     * 设置数据总条数,用于异步获取数据时的分页计算
     */
    SetItemCount(itemCount: number) {
        this.itemCount = itemCount;
    }

    /**
     * 设置数据,当数据为同步加载时,会同时设置数据总条数
     */
    SetData(data: T[]) {
        super.SetData(data);
        if (!this.async) {
            this.itemCount = data.length;
        }
    }

    constructor() {
        super();
        this.async = true;
    }

    LoadView() {
        super.LoadView();
        this.pageable = Boolean(this.target.attr("data-pageable"));
    }



}