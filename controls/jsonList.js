var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JsonList = (function (_super) {
    __extends(JsonList, _super);
    function JsonList() {
        _super.apply(this, arguments);
    }
    JsonList.prototype.SetData = function (obj) {
        this.mData = new JsonListModel();
        this.mData.SetData(obj, 0, "Root");
        //顶级数据
        this.RefreshView();
    };
    JsonList.prototype.GetView = function (data) {
        var html = "";
        if (data == null) {
            html += "<li>";
            html += "<input type='text' placeholder='输入类别' data-id=" + data.Id + " />";
            html += "<ul>";
            html += "</ul>";
            html += "<button class='btnAddSpec' data-id=" + data.Id + ">+</button>";
            html += "</li>";
            return html;
        }
        if (data.Product && data.Product != 0) {
            return "<li>已经绑定到二级商品了</li>";
        }
        html += "<li>";
        html += "<input type='text' placeholder='输入类别' value='" + (data.Name == null ? "" : data.Name) + "' data-id=" + data.Id + " />";
        html += "<ul>";
        for (var i = 0; i < data.Children.length; i++) {
            var name = data.Children[i].Option == null ? "" : data.Children[i].Option;
            html += "<li>";
            html += "<button class='item' data-id=" + (data.Children[i].Id) + ">";
            html += "<input type='text' value='" + name + "' data-id=" + (data.Children[i].Id) + " />";
            html += "<span>×</span>";
            html += "</button>";
            html += "</li>";
        }
        html += "</ul>";
        html += "<button class='btnAddSpec' data-id=" + (data.Id) + ">+</button>";
        html += "</li>";
        return html;
    };
    JsonList.prototype.RegisterEvents = function () {
        var _this = this;
        var me = this;
        //解除事件绑定
        $(".item").unbind("click");
        $(".btnAddSpec").unbind("click");
        $(".item span").unbind("click");
        $("#specification>li>input[type='text']").unbind("blur");
        $("#specification ul button>input[type='text']").unbind("blur");
        $(".item").click(function (obj) {
            var t = $(obj.target);
            if (t.is("button")) {
                t.parent().parent().find(".item").removeClass("active");
                t.addClass("active");
                t.parent().parent().parent().nextAll("li").remove();
                _this.target.append(me.GetView(_this.mData.GetChild(+t.attr("data-id"))));
                me.RegisterEvents();
            }
        });
        $(".btnAddSpec").click(function (obj) {
            var t = $(obj.target);
            var id = +t.attr("data-id");
            var model = _this.mData.GetChild(id);
            //添加数据
            var temp = new JsonListModel();
            temp.PId = id;
            temp.Id = JsonListModel.curId++;
            model.AddChild(temp);
            var html = "<li><button class='item' data-id=" + temp.Id + "><input type='text' data-id=" + temp.Id + " /><span>×</span></button></li>";
            t.parent().children("ul").append(html);
            //添加后注册事件
            me.RegisterEvents();
        });
        $(".item span").click(function (obj) {
            var t = $(obj.target);
            var id = +t.parent().attr("data-id");
            if (t.parent().hasClass("active")) {
                t.parent().parent().parent().parent().nextAll("li").remove();
            }
            debugger;
            if (me.mData.RemoveChild(id)) {
                t.parent().remove();
            }
        });
        //类别
        $("#specification>li>input[type='text']").blur(function (obj) {
            var id = +$(obj.target).attr("data-id");
            var value = $(obj.target).val();
            if (value != "") {
                var c = _this.mData.GetChild(id);
                if (c != null) {
                    c.Name = value;
                }
            }
        });
        //名称
        $("#specification ul button>input[type='text']").blur(function (obj) {
            var id = +$(obj.target).attr("data-id");
            var value = $(obj.target).val();
            if (value != "") {
                var c = _this.mData.GetChild(id);
                if (c != null) {
                    c.Option = value;
                }
            }
        });
    };
    JsonList.prototype.GetJsonString = function () {
        return this.mData.ToJsonString();
    };
    JsonList.prototype.Clear = function () {
        this.target.html("");
    };
    JsonList.prototype.RefreshView = function () {
        this.Clear();
        this.target.html(this.GetView(this.mData));
        this.RegisterEvents();
    };
    return JsonList;
})(View);
//# sourceMappingURL=jsonList.js.map