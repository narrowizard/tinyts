var AlbumModel = (function () {
    function AlbumModel() {
    }
    return AlbumModel;
})();
//# sourceMappingURL=albumModel.js.map
var JsonListModel = (function () {
    function JsonListModel() {
        this.Name = "";
        this.Options = [];
        this.Children = [];
    }
    JsonListModel.prototype.SetData = function (obj, pid, name) {
        if (!this.Id) {
            this.Id = JsonListModel.curId++;
            this.PId = pid;
            this.Option = name;
        }
        //二级商品
        if (obj.Options == null) {
            this.Product = obj.Product;
            return;
        }
        //需要解析
        this.Name = obj.Name;
        this.Options = obj.Options;
        for (var i = 0; i < this.Options.length; i++) {
            var o = obj[this.Options[i]];
            var temp = new JsonListModel();
            temp.SetData(obj[this.Options[i]], this.Id, this.Options[i]);
            this.Children.push(temp);
        }
    };
    JsonListModel.prototype.GetChild = function (id) {
        if (this.Id == id)
            return this;
        if (this.Children == null) {
            return null;
        }
        var target = this.Children.where(function (p) { return p.Id == id; }).first();
        if (target == null) {
            for (var i = 0; i < this.Children.length; i++) {
                target = this.Children[i].GetChild(id);
                if (target != null) {
                    return target;
                }
            }
        }
        else {
            return target;
        }
    };
    JsonListModel.prototype.AddChild = function (c) {
        this.Children.push(c);
    };
    JsonListModel.prototype.RemoveChild = function (id) {
        if (this.Id == id) {
        }
        if (this.Children == null) {
            return false;
        }
        for (var i = 0; i < this.Children.length; i++) {
            if (this.Children[i].Id == id) {
                for (var j = i; j < this.Children.length - 1; j++) {
                    this.Children[j] = this.Children[j + 1];
                }
                this.Children.pop();
                return true;
            }
        }
        for (var i = 0; i < this.Children.length; i++) {
            var r = this.Children[i].RemoveChild(id);
            if (r) {
                return true;
            }
        }
        return false;
    };
    JsonListModel.prototype.SetOption = function (option) {
        this.Option = option;
    };
    JsonListModel.prototype.SetProduct = function (id) {
        this.Product = id;
    };
    JsonListModel.prototype.ToJsonObj = function () {
        var obj = new Object();
        if (this.Product > 0) {
            //二级商品
            obj["Product"] = this.Product;
            return obj;
        }
        if (this.Name == "" && this.Children.length == 0) {
            return obj;
        }
        obj["Name"] = this.Name;
        this.Options = [];
        for (var i = 0; i < this.Children.length; i++) {
            var temp = this.Children[i].ToJsonObj();
            if (temp != null) {
                this.Options.push(this.Children[i].Option);
                obj[this.Children[i].Option] = temp;
            }
        }
        obj["Options"] = this.Options;
        return obj;
    };
    JsonListModel.prototype.ToJsonString = function () {
        return JSON.stringify(this.ToJsonObj());
    };
    JsonListModel.curId = 1;
    return JsonListModel;
})();
//# sourceMappingURL=jsonListModel.js.map
var RadioModel = (function () {
    function RadioModel(value, text) {
        this.value = value;
        this.text = text;
    }
    return RadioModel;
})();
//# sourceMappingURL=radioModel.js.map
var ScrollPageModel = (function () {
    function ScrollPageModel() {
    }
    return ScrollPageModel;
})();
//# sourceMappingURL=scrollPageModel.js.map
var TableColumn = (function () {
    function TableColumn() {
    }
    return TableColumn;
})();
//# sourceMappingURL=tableColumn.js.map