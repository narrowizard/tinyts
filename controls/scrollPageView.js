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
        this.navScrolled = Boolean(this.target.attr("data-nav-scrolled"));
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
        $(window).resize(function () {
            me.InitPage();
        });
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
        var selector = this.container == null ? "body,html" : this.container;
        //滑动
        if (me.navScrolled) {
            me.onScroll = true;
            $(selector).animate({ scrollTop: h }, 1000, function () {
                me.onScroll = false;
            });
        }
        else {
            $(selector).scrollTop(h);
        }
        this.curPage = index;
        // this.GetItem(index).target.slideToggle(1000, () => { });
    };
    return ScrollPageView;
})(ListView);
//# sourceMappingURL=scrollPageView.js.map