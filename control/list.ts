import { View } from './view';

export class ListView<T> extends View {

    protected mData: T[];

    getTemplateView: (index: number, data: T) => string;

    /**
     * SetData 设置数据
     * @param data 数据
     */
    SetData(data: T[]) {
        if (!data) {
            data = [];
        }
        this.mData = data;
        this.RefreshView();
    }

    /**
     * RefreshView 刷新列表部分视图
     */
    RefreshView() {
        this.ClearView();
        if (!this.mData) {
            return;
        }
        for (var i = 0; i < this.Count(); i++) {
            this.append(this.GetView(i));
        }
        this.RegisterEvents();
    }

    /**
	 * 获取列表中某一个元素的html代码
	 * @param index 索引
	*/
    GetView(index: number): string {
        if (!this.getTemplateView) {
            console.error(this.id + "未定义getTemplateView方法");
        }
        return this.getTemplateView(index, this.mData[index]);
    };

    /**
     * 在列表的最后插入元素,请在子类中实现该方法
     * @param viewString 元素的html字符串
     */
    protected append(viewString: string) {
        this.target.append(viewString);
    }

    /**
     * ClearView 清空列表部分视图
     */
    ClearView() {
        this.target.html("");
    }

    /**
     * RegisterEvents 注册列表子元素的事件
     */
    RegisterEvents() {

    }

    /**
     * Count 获取列表长度
     */
    Count(): number {
        return this.mData.length;
    }

}
