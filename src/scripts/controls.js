var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Album = (function (_super) {
    __extends(Album, _super);
    function Album() {
        _super.apply(this, arguments);
    }
    Album.prototype.SetPrefix = function (p) {
        this.prefix = p;
    };
    Album.prototype.GetView = function (index) {
        if (index < 0 || index > this.mData.length) {
            return "";
        }
        var html = "";
        html += "<div class='album-item'>";
        html += "<span data-index=" + index + ">×</span>";
        html += "<img src='" + this.prefix + this.mData[index].url + "' />";
        html += "</div>";
        return html;
    };
    Album.prototype.RefreshView = function () {
        _super.prototype.RefreshView.call(this);
        if (this.registerEvents) {
            this.registerEvents();
        }
    };
    return Album;
})(ListView);
//# sourceMappingURL=album.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        _super.apply(this, arguments);
    }
    Button.prototype.PerformClick = function () {
        if (this.target != null) {
            this.target.click();
        }
    };
    Button.prototype.Disable = function () {
        this.target.attr("disabled", "true");
    };
    Button.prototype.Enable = function () {
        this.target.removeAttr("disabled");
    };
    return Button;
})(TextView);
//# sourceMappingURL=button.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DatetimePicker = (function (_super) {
    __extends(DatetimePicker, _super);
    function DatetimePicker() {
        _super.apply(this, arguments);
    }
    DatetimePicker.prototype.DatePicker = function (config) {
        this.picker = this.target.datetimepicker(config);
    };
    return DatetimePicker;
})(TextBox);
//# sourceMappingURL=datetimePicker.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EditDialog = (function (_super) {
    __extends(EditDialog, _super);
    function EditDialog() {
        _super.apply(this, arguments);
    }
    EditDialog.prototype.MoveTo = function (x, y) {
        this.target.css("left", x);
        this.target.css("top", y);
    };
    EditDialog.prototype.SetTitle = function (title) {
        this.target.children(".title").text(title);
    };
    EditDialog.prototype.SetWidth = function (width) {
        this.target.width(width);
    };
    EditDialog.prototype.SetHeight = function (height) {
        this.target.height(height);
    };
    EditDialog.prototype.LoadView = function () {
        _super.prototype.LoadView.call(this);
        var masked = this.target.attr("data-mask");
        if (masked) {
            this.masked = true;
            this.initMask();
        }
        this.Hide();
    };
    EditDialog.prototype.Show = function () {
        this.target.css("display", "block");
        if (this.masked) {
            this.mask.css("display", "block");
        }
    };
    EditDialog.prototype.Hide = function () {
        this.target.css("display", "none");
        if (this.masked) {
            this.mask.css("display", "none");
        }
    };
    EditDialog.prototype.initMask = function () {
        var html = "<div class='dialog-mask'></div>";
        this.mask = $(html);
        this.mask.insertBefore(this.target);
        this.mask.css("position", "fixed");
        this.mask.css("top", "0");
        this.mask.css("bottom", "0");
        this.mask.css("left", "0");
        this.mask.css("right", "0");
        this.mask.css("background-color", "#353B4B");
        this.mask.css("z-index", "1000");
        this.target.css("z-index", "1001");
        this.mask.css("opacity", "0.5");
    };
    return EditDialog;
})(View);
//# sourceMappingURL=editDialog.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FileUploader = (function (_super) {
    __extends(FileUploader, _super);
    function FileUploader() {
        _super.apply(this, arguments);
    }
    FileUploader.prototype.GetFile = function () {
        var files = this.target.prop("files");
        if (files.length != 0) {
            return files[0];
        }
        return null;
    };
    return FileUploader;
})(TextView);
//# sourceMappingURL=fileUploader.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ImageView = (function (_super) {
    __extends(ImageView, _super);
    function ImageView() {
        _super.apply(this, arguments);
    }
    ImageView.prototype.SetUrl = function (url) {
        this.target.attr("src", url);
    };
    ImageView.prototype.SetSize = function (height, width) {
        if (height > 0) {
            this.target.css("height", height);
        }
        if (width > 0) {
            this.target.css("width", width);
        }
    };
    return ImageView;
})(View);
//# sourceMappingURL=imageView.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ItemList = (function (_super) {
    __extends(ItemList, _super);
    function ItemList() {
        _super.apply(this, arguments);
    }
    ItemList.prototype.GetView = function (index) {
        if (index < 0 || index >= this.Count()) {
            return "";
        }
        var html = "";
        html += "<li data-value='" + this.mData[index].value + "'>";
        html += this.mData[index].text;
        html += "</li>";
        return html;
    };
    ItemList.prototype.RefreshView = function () {
        var me = this;
        _super.prototype.RefreshView.call(this);
        if (me.onItemClick) {
            me.target.children("li").unbind("click");
            me.target.children("li").click(function (obj) {
                me.target.children("li").removeClass("active");
                $(obj.target).addClass("active");
                me.onItemClick(obj);
            });
        }
        if (this.Count() > 0) {
            me.target.children("li").eq(0).click();
        }
    };
    ItemList.prototype.RemoveSelected = function () {
        var index = this.target.children(".active").index();
        if (index == -1) {
            return;
        }
        this.Remove(index);
    };
    ItemList.prototype.append = function (html) {
        var me = this;
        _super.prototype.append.call(this, html);
        if (me.onItemClick) {
            me.target.children("li").unbind("click");
            me.target.children("li").click(function (obj) {
                me.target.children("li").removeClass("active");
                $(obj.target).addClass("active");
                me.onItemClick(obj);
            });
        }
    };
    return ItemList;
})(ListView);
//# sourceMappingURL=itemlist.js.map
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
    JsonList.prototype.SetJsonListModel = function (data) {
        this.mData = data;
        this.RefreshView();
    };
    JsonList.prototype.GetData = function () {
        return this.mData;
    };
    JsonList.prototype.LoadView = function () {
        _super.prototype.LoadView.call(this);
        this.editable = Boolean(this.target.attr("data-editable"));
    };
    JsonList.prototype.GetSummary = function () {
        var value = "";
        this.target.children("li").each(function (index, elem) {
            var name = $(elem).find("label").text();
            var v = $(elem).find(".active").text();
            if (name == "" || v == "")
                return "";
            value += (name + ":");
            value += (v + "|");
        });
        return value.substr(0, value.length - 1);
    };
    JsonList.prototype.GetLeafNodeId = function () {
        return +this.target.find("button.active").last().attr("data-id");
    };
    JsonList.prototype.GetView = function (data) {
        var html = "";
        if (data == null) {
            if (!this.editable) {
                return "";
            }
            html += "<li>";
            html += "<input type='text' placeholder='输入类别' data-id=" + data.Id + " />";
            html += "<ul>";
            html += "</ul>";
            html += "<button class='btnAddSpec' data-id=" + data.Id + ">+</button>";
            html += "</li>";
            return html;
        }
        if (data.Product && data.Product != 0) {
            return "<li>二级商品编号：" + data.Product + "</li>";
        }
        html += "<li>";
        if (this.editable) {
            html += "<input type='text' placeholder='输入类别' value='" + (data.Name == null ? "" : data.Name) + "' data-id=" + data.Id + " />";
        }
        else {
            html += "<label>" + data.Name + "</label>";
        }
        html += "<ul>";
        for (var i = 0; i < data.Children.length; i++) {
            var name = data.Children[i].Option == null ? "" : data.Children[i].Option;
            html += "<li>";
            html += "<button class='item' data-id=" + (data.Children[i].Id) + ">";
            if (this.editable) {
                // 内容编辑框
                html += "<input type='text' value='" + name + "' data-id=" + (data.Children[i].Id) + " />";
            }
            else {
                html += name;
            }
            if (this.editable) {
                //删除按钮
                html += "<span>×</span>";
            }
            html += "</button>";
            html += "</li>";
        }
        html += "</ul>";
        if (this.editable) {
            // 添加按钮
            html += "<button class='btnAddSpec' data-id=" + (data.Id) + ">+</button>";
        }
        html += "</li>";
        return html;
    };
    JsonList.prototype.RegisterEvents = function () {
        var _this = this;
        var me = this;
        //解除事件绑定
        this.target.find(".item").unbind("click");
        this.target.find(".btnAddSpec").unbind("click");
        this.target.find(".item span").unbind("click");
        this.target.children("li").children("input[type='text']").unbind("blur");
        this.target.find("ul button>input[type='text']").unbind("blur");
        this.target.find(".item").click(function (obj) {
            var t = $(obj.target);
            if (t.is("button")) {
                t.parent().parent().find(".item").removeClass("active");
                t.addClass("active");
                t.parent().parent().parent().nextAll("li").remove();
                _this.target.append(me.GetView(_this.mData.GetChild(+t.attr("data-id"))));
                if (me.onItemClick) {
                    me.onItemClick(t);
                }
                me.RegisterEvents();
            }
        });
        if (this.editable) {
            this.target.find(".btnAddSpec").click(function (obj) {
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
            this.target.find(".item span").click(function (obj) {
                var t = $(obj.target);
                var id = +t.parent().attr("data-id");
                if (t.parent().hasClass("active")) {
                    t.parent().parent().parent().parent().nextAll("li").remove();
                }
                if (me.mData.RemoveChild(id)) {
                    t.parent().remove();
                }
            });
            //类别
            this.target.children("li").children("input[type='text']").blur(function (obj) {
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
            this.target.find("ul button>input[type='text']").blur(function (obj) {
                var id = +$(obj.target).attr("data-id");
                var value = $(obj.target).val();
                if (value != "") {
                    var c = _this.mData.GetChild(id);
                    if (c != null) {
                        c.Option = value;
                    }
                }
            });
        }
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// 初始化会在每一个input:radio上加上name属性为radio + id
var RadioButton = (function (_super) {
    __extends(RadioButton, _super);
    function RadioButton() {
        _super.apply(this, arguments);
    }
    RadioButton.prototype.SetId = function (id) {
        _super.prototype.SetID.call(this, id);
        this.name = "radio_" + id;
    };
    RadioButton.prototype.LoadView = function () {
        _super.prototype.LoadView.call(this);
        var datas = this.target.find("input[type='radio']");
        if (!this.name) {
            this.name = "radio_" + this.ViewId();
        }
        for (var i = 0; i < datas.length; i++) {
            var model = new RadioModel($(datas[i]).val(), $(datas[i]).parent().text());
            this.Add(model);
            datas.parent().remove();
        }
    };
    RadioButton.prototype.SetName = function (name) {
        this.name = name;
    };
    RadioButton.prototype.GetView = function (index) {
        if (index < 0 || index > this.mData.length) {
            return "";
        }
        var html = "";
        html += "<input type='radio' value=" + this.mData[index].value + " name='" + this.name + "'/>" + this.mData[index].text;
        return html;
    };
    RadioButton.prototype.Value = function () {
        var r = $("input:radio[name=" + this.name + "]").filter(":checked");
        return r.val();
    };
    RadioButton.prototype.SetValue = function (value) {
        $("input:radio[name=" + this.name + "]").filter("[value=" + value + "]").prop("checked", true);
    };
    return RadioButton;
})(ListView);
//# sourceMappingURL=radioButton.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 鼠标滚动事件,需要JQuery MouseWheel的支持
 */
var ScrollPageView = (function (_super) {
    __extends(ScrollPageView, _super);
    function ScrollPageView() {
        _super.apply(this, arguments);
    }
    ScrollPageView.prototype.LoadView = function () {
        var _this = this;
        var me = this;
        _super.prototype.LoadView.call(this);
        this.mousewheel = Boolean(this.target.attr("data-mousewheel"));
        this.navigation = this.target.attr("data-page-nav");
        //页面导航
        if (this.navigation) {
            var html = "<ul id='" + this.navigation + "' class='scroll-page-nav'></ul>";
            this.target.append(html);
            this.nav = $("#" + this.navigation);
        }
        var pages = this.target.children("div[data-paged=true]");
        pages.each(function (index, elem) {
            var item = new ScrollPageModel();
            $(elem).addClass("tinyts-paged");
            item.target = $(elem);
            me.mData.push(item);
            if (_this.navigation) {
                var text = $(elem).attr("data-nav");
                if (text == null) {
                    text = "选项";
                }
                var html = "<li data-index=" + index + " >" + text + "</li>";
                _this.nav.append(html);
            }
        });
        //注册导航事件
        if (this.navigation) {
            $("#" + this.navigation + " li").click(function (obj) {
                var index = +$(obj.target).attr("data-index");
                me.ToPage(index);
            });
        }
        this.InitPage();
    };
    //添加自定义功能键
    ScrollPageView.prototype.CreateNavItem = function (text, callback) {
        if (this.navigation) {
            var html = "";
            html += "<li>" + text + "</li>";
            this.nav.append(html);
            this.nav.children("li").last().click(callback);
        }
    };
    ScrollPageView.prototype.SetContainer = function (container) {
        this.container = container;
    };
    ScrollPageView.prototype.InitPage = function () {
        var me = this;
        var h = $(window).height();
        for (var i = 0; i < this.Count(); i++) {
            this.mData[i].target.css("top", h * i);
            this.mData[i].target.css("height", h);
        }
        $(window).resize(function () {
            me.InitPage();
        });
        //绑定鼠标滚轮事件
        if (this.mousewheel) {
            this.curPage = 0;
            this.target.unbind("mousewheel");
            this.target.bind("mousewheel", function (event, delta, deltaX, deltaY) {
                if (deltaY > 0) {
                    me.LastPage();
                }
                else {
                    me.NextPage();
                }
                return false;
            });
            me.onScroll = false;
        }
    };
    ScrollPageView.prototype.LastPage = function () {
        if (!this.onScroll) {
            if (this.curPage == 0) {
                return;
            }
            this.ToPage(this.curPage - 1);
        }
    };
    ScrollPageView.prototype.NextPage = function () {
        if (!this.onScroll) {
            if (this.curPage == this.Count() - 1) {
                return;
            }
            this.ToPage(this.curPage + 1);
        }
    };
    ScrollPageView.prototype.ToPage = function (index) {
        var me = this;
        if (index < 0 || index > this.Count() - 1) {
            return;
        }
        var h = parseInt(this.GetItem(index).target.css("top"));
        me.onScroll = true;
        var selector = this.container == null ? "body,html" : this.container;
        $(selector).animate({ scrollTop: h }, 1000, function () {
            me.onScroll = false;
        });
        this.curPage = index;
        // this.GetItem(index).target.slideToggle(1000, () => { });
    };
    return ScrollPageView;
})(ListView);
//# sourceMappingURL=scrollPageView.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SelectButton = (function (_super) {
    __extends(SelectButton, _super);
    function SelectButton() {
        _super.apply(this, arguments);
        this.itemClasses = [];
    }
    SelectButton.prototype.LoadView = function () {
        _super.prototype.LoadView.call(this);
        var t = Boolean(this.target.attr("data-muilti-select"));
        if (t) {
            this.muiltiSelect = true;
        }
        else {
            this.muiltiSelect = false;
        }
    };
    SelectButton.prototype.Clear = function () {
        this.target.html("");
    };
    SelectButton.prototype.Add = function (model) {
        var me = this;
        _super.prototype.Add.call(this, model);
        for (var i = 0; i < this.itemClasses.length; i++) {
            this.target.find("button").last().addClass(this.itemClasses[i]);
        }
        if (me.onItemClick != null) {
            this.target.find("button").last().click(function (p) {
                me.onItemClick($(p.target));
            });
        }
    };
    SelectButton.prototype.GetView = function (index) {
        if (index < 0 || index > this.mData.length) {
            return "";
        }
        var html = "";
        html += "<button data-id=" + this.mData[index].value + ">";
        html += this.mData[index].text;
        html += "</button>";
        return html;
    };
    /**
     * 选择指定项
     * @param index 选择项的索引
     */
    SelectButton.prototype.Select = function (index) {
        this.target.find("button").eq(index).click();
    };
    /**
     * 获取选择项的id,仅单选时有效
     */
    SelectButton.prototype.GetSelectedItemId = function () {
        if (this.muiltiSelect) {
            return 0;
        }
        else {
            return +this.target.find("button").filter(".active").attr("data-id");
        }
    };
    /**
     * 获取选择项的文本内容,仅单选时有效
     */
    SelectButton.prototype.GetSelectedItemText = function () {
        if (this.muiltiSelect) {
            return "";
        }
        else {
            return this.target.find("button").filter(".active").text();
        }
    };
    SelectButton.prototype.RefreshView = function () {
        var _this = this;
        var me = this;
        _super.prototype.RefreshView.call(this);
        for (var i = 0; i < this.itemClasses.length; i++) {
            this.target.find("button").addClass(this.itemClasses[i]);
        }
        this.target.find("button").click(function (p) {
            if (_this.muiltiSelect) {
                if ($(p.target).hasClass("active")) {
                    $(p.target).removeClass("active");
                }
                else {
                    $(p.target).addClass("active");
                }
            }
            else {
                _this.target.find("button").removeClass("active");
                $(p.target).addClass("active");
            }
            if (me.onItemClick != null) {
                me.onItemClick($(p.target));
            }
        });
    };
    SelectButton.prototype.SetItemClass = function (className) {
        if (className.trim() == "") {
            return;
        }
        this.itemClasses.push(className);
    };
    return SelectButton;
})(ListView);
//# sourceMappingURL=selectButton.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Table = (function (_super) {
    __extends(Table, _super);
    function Table() {
        _super.apply(this, arguments);
    }
    Table.prototype.TurnToPage = function (hanlder) {
        var me = this;
        this.navBar.find(".nav-first-page").click(function () {
            hanlder(1, me.GetPageSize());
            me.curPage = 1;
        });
        this.navBar.find(".nav-last-page").click(function () {
            hanlder(me.pageCount, me.GetPageSize());
            me.curPage = me.pageCount;
        });
        this.navBar.find(".nav-next-page").click(function () {
            if (me.curPage == me.pageCount) {
                return;
            }
            hanlder(me.curPage + 1, me.GetPageSize());
            me.curPage = me.curPage + 1;
        });
        this.navBar.find(".nav-prev-page").click(function () {
            if (me.curPage == 1) {
                return;
            }
            hanlder(me.curPage - 1, me.GetPageSize());
            me.curPage = me.curPage - 1;
        });
        this.navBar.find(".nav-to-page").click(function () {
            var t = me.navBar.find(".page").val();
            if (t < 1 || t > me.pageCount) {
                return;
            }
            me.curPage = +t;
            hanlder(t, me.GetPageSize());
        });
    };
    /**
     * 设置总页数
     */
    Table.prototype.SetPageCount = function (count) {
        this.pageCount = count;
    };
    /**
     * 设置当前页
     */
    Table.prototype.SetCurPage = function (page) {
        if (page < 1 || page > this.pageCount) {
            return;
        }
        this.curPage = +page;
    };
    /**
     * 获取当前页码
     */
    Table.prototype.CurrentPage = function () {
        return this.curPage;
    };
    /**
     * 获取每页条数
     */
    Table.prototype.GetPageSize = function () {
        return this.navBar.find(".pagesize").val();
    };
    Table.prototype.ResetPage = function () {
        this.curPage = 1;
    };
    /**
     * 自定义table row可以继承该类,在自己的类中实现该方法
     * 如果采用继承的方法,请不要设置beforeAppend属性
     * @param index 索引
     */
    Table.prototype.BeforeAppend = function (index) {
        return "<td></td>";
    };
    Table.prototype.RegisterEvents = function () {
    };
    Table.prototype.Clear = function () {
        this.target.find("tbody").html("");
    };
    Table.prototype.GetItemId = function (index) {
        if (index < 0 || index > this.Count()) {
            return 0;
        }
        return this.mData[index].Id;
    };
    Table.prototype.GetView = function (index) {
        if (index < 0 || index > this.mData.length) {
            return "";
        }
        var html = "";
        //增加tr
        if (this.beforeAppend != null) {
            var res = this.beforeAppend(-1, this.mData[index]);
            if (res != "") {
                html += res;
            }
            else {
                html += "<tr data-id=" + this.GetItemId(index) + " >";
            }
        }
        else {
            html += "<tr data-id=" + this.GetItemId(index) + " >";
        }
        //增加td
        for (var i = 0; i < this.length; i++) {
            //首先判断是否是checkbox
            if (this.columns[i].checkBox) {
                html += "<td><input type='checkbox' data-id=" + this.mData[index].Id + " data-column-index=" + i + " /></td>";
                continue;
            }
            if (this.columns[i].dataBind) {
                var value = this.mData[index][this.columns[i].dataColumn];
                //data-column数据绑定
                if (value !== undefined) {
                    html += "<td>" + value + "</td>";
                }
                else {
                    html += "<td></td>";
                }
            }
            else {
                if (this.beforeAppend == null) {
                    html += this.BeforeAppend(index);
                }
                else {
                    html += this.beforeAppend(i, this.mData[index]);
                }
            }
        }
        html += "</tr>";
        return html;
    };
    Table.prototype.LoadView = function () {
        _super.prototype.LoadView.call(this);
        this.columns = [];
        var me = this;
        //列长度
        this.length = this.target.find("thead tr").children("th").length;
        //列绑定
        this.target.find("tr").eq(0).children("th").each(function (index, element) {
            var temp = new TableColumn();
            var c = $(element).attr("data-column");
            if (c) {
                temp.dataBind = true;
                temp.dataColumn = c;
            }
            if ($(element).attr("data-checkbox")) {
                $(element).append("<input type='checkbox' data-column-index='" + index + "' />");
                temp.checkBox = true;
            }
            me.columns[index] = temp;
        });
        //导航
        var naved = Boolean(this.target.attr("data-navigation"));
        if (naved) {
            //创建页面导航
            this.navBarId = this.ViewId() + "Navigation";
            var html = "<div id='" + this.navBarId + "'></div>";
            $(html).insertAfter(this.target);
            this.navBar = $("#" + this.navBarId);
            this.createNavigation();
        }
        //点击选中
        this.selectOnClick = Boolean(this.target.attr("data-select-on-click"));
    };
    Table.prototype.createNavigation = function () {
        var html = "";
        html += "<button class='btn btn-xs btn-info nav-first-page'>首页</button>";
        html += "<button class='btn btn-xs btn-info nav-prev-page'>上一页</button>";
        html += "<button class='btn btn-xs btn-info nav-next-page'>下一页</button>";
        html += "<button class='btn btn-xs btn-info nav-last-page'>末页</button>";
        html += "页次 <label class='curPage'></label>/<label class='totalPage'></label>";
        html += " 每页<input type='text' value='10' class='pagesize' />条";
        html += " 跳转到<input type='text' class='page' value='1'/>";
        html += "<button class='btn btn-xs btn-info nav-to-page'>跳转</button>";
        this.navBar.append(html);
    };
    /**
     * 遍历所有选中行的数据,如果return false,将终止遍历
     */
    Table.prototype.TraverseSelected = function (handler) {
        var me = this;
        this.target.find("tbody input[type='checkbox']").each(function (index, elem) {
            if ($(elem).prop("checked")) {
                if (!handler(index, me.mData[index])) {
                    return false;
                }
            }
        });
    };
    Table.prototype.RefreshView = function () {
        var me = this;
        _super.prototype.RefreshView.call(this);
        if (this.navBar) {
            this.navBar.find(".curPage").text(this.curPage);
            this.navBar.find(".totalPage").text(this.pageCount);
        }
        //注册item事件
        this.RegisterEvents();
        if (this.registerEvents != null) {
            this.registerEvents();
        }
        //注册全选事件
        this.target.find("thead input[type='checkbox']").click(function (obj) {
            var columnIndex = $(obj.target).attr("data-column-index");
            var state = $(obj.target).prop("checked");
            me.target.find("tbody input[type='checkbox'][data-column-index=" + columnIndex + "]").prop("checked", state);
        });
        //点击选中
        if (this.selectOnClick) {
            this.target.find("tbody tr").click(function (obj) {
                $(obj.target).find("input[type='checkbox']").each(function (index, elem) {
                    if ($(elem).prop("checked")) {
                        $(elem).prop("checked", false);
                    }
                    else {
                        $(elem).prop("checked", true);
                    }
                });
            });
        }
    };
    Table.prototype.TreeTable = function (config, force) {
        this.target.treetable(config, force);
    };
    Table.prototype.ExpandAll = function () {
        this.target.treetable("expandAll");
    };
    /** Sortable 将table设置为可排序
    * @param handler 排完序之后的回调
    */
    Table.prototype.Sortable = function (handler) {
        var _this = this;
        this.target.children("tbody").sortable({
            containerSelector: "table",
            itemPath: "> tbody",
            itemSelector: "tr",
            placeholder: "<tr class='placeholder' />",
            stop: function () {
                var tbody = _this.target.find("tbody");
                var ids = [];
                tbody.children("tr").each(function (index, elem) {
                    ids[index] = $(elem).attr("data-id");
                });
                var temp = [];
                for (var i = 0; i < ids.length; i++) {
                    temp[i] = _this.mData.where(function (p) { return p.Id == ids[i]; }).first();
                }
                _this.mData = temp;
                if (handler) {
                    handler();
                }
            }
        });
    };
    Table.prototype.append = function (viewString) {
        this.target.find("tbody").append(viewString);
    };
    return Table;
})(ListView);
//# sourceMappingURL=tableView.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextBox = (function (_super) {
    __extends(TextBox, _super);
    function TextBox() {
        _super.apply(this, arguments);
    }
    TextBox.prototype.LoadView = function () {
        _super.prototype.LoadView.call(this);
        this.required = Boolean(this.target.attr("data-required"));
        this.minLength = +this.target.attr("data-min-length");
        this.maxLength = +this.target.attr("data-max-length");
        this.validationArea = this.target.parent().children(".validation");
    };
    TextBox.prototype.Clear = function () {
        this.target.val("");
    };
    TextBox.prototype.Value = function () {
        var value = this.target.val();
        if (this.required) {
            if (!this.Required(value)) {
                this.SetErrorMsg("必须");
                this.ShowError();
                return null;
            }
        }
        if (this.minLength) {
            if (!this.MinLength(value)) {
                this.SetErrorMsg("长度必须大于等于" + this.minLength);
                this.ShowError();
                return null;
            }
        }
        if (this.maxLength) {
            if (!this.MaxLength(value)) {
                this.SetErrorMsg("长度必须小于等于" + this.maxLength);
                this.ShowError();
                return null;
            }
        }
        this.HideError();
        return value;
    };
    TextBox.prototype.ReadOnly = function (readonly) {
        if (readonly) {
            this.target.attr("readonly", "readonly");
        }
        else {
            this.target.removeAttr("readonly");
        }
    };
    TextBox.prototype.SetAcceptButton = function (p) {
        this.target.keydown(function (event) {
            if (event.keyCode == 13) {
                if (typeof p == "string") {
                    $("#" + p).click();
                }
                else if (typeof p == "object") {
                    p.PerformClick();
                }
            }
        });
    };
    TextBox.prototype.SetErrorMsg = function (msg) {
        this.validationArea.text(msg);
    };
    TextBox.prototype.ShowError = function () {
        this.validationArea.css("display", "block");
    };
    TextBox.prototype.HideError = function () {
        this.validationArea.css("display", "none");
    };
    TextBox.prototype.Required = function (value) {
        return value.trim() !== "";
    };
    TextBox.prototype.MinLength = function (value) {
        return value.length >= this.minLength;
    };
    TextBox.prototype.MaxLength = function (value) {
        return value.length <= this.maxLength;
    };
    TextBox.prototype.SetValue = function (value) {
        this.target.val(value);
    };
    // ColorPicker 将TextBox构造为一个ColorPicker
    // @param 当选择一个颜色之后的回调函数
    TextBox.prototype.ColorPicker = function (handler) {
        this.target.colorpicker({
            format: "hex"
        }).on("changeColor.colorpicker", handler);
    };
    TextBox.prototype.DatePicker = function (config) {
        this.target.datetimepicker(config);
    };
    return TextBox;
})(TextView);
//# sourceMappingURL=textBox.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UEditor = (function (_super) {
    __extends(UEditor, _super);
    function UEditor() {
        _super.apply(this, arguments);
    }
    UEditor.prototype.LoadView = function () {
        _super.prototype.LoadView.call(this);
        var param = this.target.attr("data-param");
        this.editor = UE.getEditor(this.ViewId(), {
            initialFrameHeight: $(window).height() - 340
        });
        //多个参数以|分割
        var ps = param.split("|");
        for (var i = 0; i < ps.length; i++) {
            var temp = ps[i].split(":");
            this.SetImageUploadParam(temp[0], temp[1]);
        }
    };
    UEditor.prototype.SetImageUploadParam = function (key, value) {
        var _this = this;
        this.editor.ready(function () {
            _this.editor.execCommand("serverparam", key, value);
        });
    };
    UEditor.prototype.ClearImageUploadParam = function () {
        var _this = this;
        this.editor.ready(function () {
            _this.editor.execCommand("serverparam");
        });
    };
    UEditor.SetHeight = function (height) {
        $(".edui-editor-iframeholder.edui-default").css("height", height);
    };
    UEditor.prototype.SetContent = function (html) {
        this.editor.setContent(html);
    };
    UEditor.prototype.GetContent = function () {
        return this.editor.getContent();
    };
    UEditor.ResizeEditor = function () {
        $(".edui-editor").css("width", "100%");
        $(".edui-editor").css("margin", "auto");
        $(".edui-editor-iframeholder").css("width", "100%");
    };
    return UEditor;
})(View);
//# sourceMappingURL=ueditor.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UMEditor = (function (_super) {
    __extends(UMEditor, _super);
    function UMEditor() {
        _super.apply(this, arguments);
    }
    UMEditor.prototype.LoadView = function () {
        var config = {
            toolbar: [
                'source | undo redo | bold italic underline strikethrough | superscript subscript | forecolor backcolor | removeformat |',
                'insertorderedlist insertunorderedlist | selectall cleardoc paragraph | fontfamily fontsize',
                '| justifyleft justifycenter justifyright justifyjustify |',
                'link unlink | image ',
                '| horizontal preview '
            ],
            zIndex: 98
        };
        this.editor = UE.getEditor(this.ViewId(), config);
    };
    UMEditor.ResizeEditor = function () {
        $(".edui-container").css("width", "95%");
        $(".edui-container").css("margin", "1%");
        $(".edui-body-container").css("width", "100%");
    };
    return UMEditor;
})(View);
//# sourceMappingURL=umeditor.js.map