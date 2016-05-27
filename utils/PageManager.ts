import {ListView} from '../core/ListView';
import {controlConfig} from '../config/TinytsConfig';

interface PageContext {
    GetData: (index: number, pagesize: number) => void;
}

// PAGEMODE 分页模式
// SYNC 同步分页
// ASYNC 异步分页
enum PAGEMODE { SYNC, ASYNC };

export class PageManager<T extends IModel> {

    /**
     * mData 同步分页模式的数据(异步时无效)
     */
    protected mData: T[];

    /**
     * SetData 设置数据,当模式为同步分页模式时,可以直接调用该函数将数据交给PageManager
     * @param data 数据,同时会更新total和pageCount
     */
    SetData(data: T[]) {
        if (!data) {
            return;
        }
        this.mData = data;
        this.SetRecordCount(this.mData.length);
    }

    /**
     * SetContext 设置上下文
     * @param context 数据获取器
     */
    SetContext(context: PageContext) {
        this.context = context;
    }

    protected context: PageContext;

    protected targetList: ListView<T>;

    constructor(instance: ListView<T>) {
        this.targetList = instance;
        this.pageSize = controlConfig.defaultPageSize;
        this.curPage = 1;
    }

    protected pageMode: PAGEMODE;

    SetPageMode(mode: PAGEMODE) {
        this.pageMode = mode;
    }

    protected curPage: number;

    protected pageSize: number;

    /**
     * SetPageSize 设置每页条数
     * @param pagesize 每页条数
     */
    SetPageSize(pagesize: number) {
        this.pageSize = pagesize;
    }

    protected total: number;

    /**
     * SetRecordCount 设置记录总条数,同时设置pageCount
     * @param count 记录总数量
     */
    SetRecordCount(count: number) {
        this.total = count;
        this.pageCount = Math.ceil(this.total / this.pageSize);
    }

    protected pageCount: number;

    /**
     * SetPageCount 设置总页数
     * @param count 总页数
     */
    SetPageCount(count: number) {
        this.pageCount = count;
    }

    /**
     * GetCurPage 获取当前页的数据
     */
    protected GetCurPage() {
        if (this.pageMode == PAGEMODE.SYNC) {
            //同步分页模式,直接将数据交给ListView
            this.targetList.SetData(Enumerable.from(this.mData).skip((this.curPage - 1) * this.pageSize).take(this.pageSize).toArray());
        } else if (this.pageMode == PAGEMODE.ASYNC) {
            if (!this.context) {
                throw "context has not been set!";
            }
            //异步分页模式,请求服务器
            this.context.GetData(this.curPage, this.pageSize);
        }
    }

    /**
     * FirstPage 首页
     */
    FirstPage() {
        this.curPage = 1;
        this.GetCurPage();
    }

    /**
     * PrevPage 上一页
     */
    PrevPage() {
        if (this.curPage <= 1) {
            return;
        }
        this.curPage--;
        this.GetCurPage();
    }

    /**
     * NextPage 下一页
     */
    NextPage() {
        if (this.curPage >= this.pageCount) {
            return;
        }
        this.curPage++;
        this.GetCurPage();
    }

    /**
     * LastPage 末页
     */
    LastPage() {
        this.curPage = this.pageCount;
        this.GetCurPage();
    }

    /**
     * TurnToPage 跳转到某页
     * @param index 页码
     */
    TurnToPage(index: number) {
        if (index < 1 || index > this.pageCount) {
            return;
        }
        this.curPage = index;
        this.GetCurPage();
    }

}