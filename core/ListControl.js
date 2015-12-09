var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ListControl = (function (_super) {
    __extends(ListControl, _super);
    function ListControl(id) {
        _super.call(this, id);
    }
    ListControl.prototype.SetData = function (data) {
        this.mData = data;
        this.RefreshView();
    };
    ListControl.prototype.Add = function (model) {
        this.mData.push(model);
        this.target.append(this.GetView(this.mData.length));
    };
    ListControl.prototype.Remove = function (p) {
        if (typeof p == "number") {
            var index = p;
            if (index < 0 || index > this.mData.length) {
                return;
            }
            for (var i = index; i < this.mData.length - 1; i++) {
                this.mData[i] = this.mData[i + 1];
            }
        }
        else {
            var obj = p;
            for (var j = 0; j < this.mData.length; j++) {
                if (this.mData[j] == obj) {
                    for (var i = j; i < this.mData.length - 1; i++) {
                        this.mData[i] = this.mData[i + 1];
                    }
                    return;
                }
            }
        }
    };
    ListControl.prototype.GetItem = function (param) {
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
    ListControl.prototype.GetItemId = function (index) {
        if (index < 0 || index > this.mData.length) {
            return 0;
        }
        else {
            return this.mData[index].Id;
        }
    };
    ListControl.prototype.Count = function () {
        return this.mData.length;
    };
    return ListControl;
})(BaseControl);
//# sourceMappingURL=ListControl.js.map