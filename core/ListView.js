var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ListView = (function (_super) {
    __extends(ListView, _super);
    function ListView() {
        _super.apply(this, arguments);
    }
    /**
     * 设置数据,并刷新视图
     * @param data 数据集合
     */
    ListView.prototype.SetData = function (data) {
        this.mData = data;
        this.RefreshView();
    };
    /**
     * 添加数据,并刷新视图
     * @param T 数据元素
    */
    ListView.prototype.Add = function (model) {
        this.mData.push(model);
        this.append(this.GetView(this.mData.length - 1));
    };
    ListView.prototype.LoadView = function () {
        _super.prototype.LoadView.call(this);
        this.mData = [];
    };
    /**
     * 清空列表
    */
    ListView.prototype.Clear = function () {
        this.target.html("");
    };
    ;
    ListView.prototype.Remove = function (p) {
        if (typeof p == "number") {
            var index = p;
            if (index < 0 || index > this.mData.length) {
                return;
            }
            for (var i = index; i < this.mData.length - 1; i++) {
                this.mData[i] = this.mData[i + 1];
            }
            this.mData.pop();
        }
        else {
            var obj = p;
            for (var j = 0; j < this.mData.length; j++) {
                if (this.mData[j] == obj) {
                    for (var i = j; i < this.mData.length - 1; i++) {
                        this.mData[i] = this.mData[i + 1];
                    }
                    this.mData.pop();
                    break;
                }
            }
        }
        this.RefreshView();
    };
    ListView.prototype.GetItem = function (param) {
        if (typeof param == "number") {
            var index = param;
            if (index < 0 || index > this.mData.length) {
                return null;
            }
            return this.mData[index];
        }
        else if (typeof param == "function") {
            var predicate = param;
            return this.mData.where(predicate).first();
        }
    };
    ListView.prototype.SetItem = function (param, item) {
        if (typeof param == "number") {
            if (param < 0 || param >= this.Count()) {
                return;
            }
            this.mData[param] = item;
        }
        else if (typeof param == "function") {
            var predicate = param;
            for (var i = 0; i < this.Count(); i++) {
                if (predicate(this.mData[i])) {
                    this.mData[i] = item;
                    break;
                }
            }
        }
        this.RefreshView();
    };
    /**
     * 获取数组元素的长度
     */
    ListView.prototype.Count = function () {
        return this.mData.length;
    };
    /**
     * 获取指定索引元素的Id(唯一编号)
     * 未在该类中实现,请在子类中实现
     * @param index 索引
     */
    ListView.prototype.GetItemId = function (index) {
        return 0;
    };
    /**
     * 获取列表中某一个元素的html代码
     * @param index 索引
    */
    ListView.prototype.GetView = function (index) {
        return "";
    };
    ;
    /**
     * 刷新整个ListView的列表部分
     */
    ListView.prototype.RefreshView = function () {
        this.Clear();
        for (var i = 0; i < this.mData.length; i++) {
            this.append(this.GetView(i));
        }
    };
    /**
     * 在列表的最后插入元素,请在子类中实现该方法
     * @param viewString 元素的html字符串
     */
    ListView.prototype.append = function (viewString) {
        this.target.append(viewString);
    };
    return ListView;
})(View);
//# sourceMappingURL=ListView.js.map