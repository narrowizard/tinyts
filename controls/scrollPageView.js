var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 需要JQuery MouseWheel的支持
 */
var ScrollPageView = (function (_super) {
    __extends(ScrollPageView, _super);
    function ScrollPageView() {
        _super.apply(this, arguments);
    }
    ScrollPageView.prototype.LoadView = function () {
        var me = this;
        _super.prototype.LoadView.call(this);
        var pages = this.target.children("div[data-paged=true]");
        pages.each(function (index, elem) {
            var item = new ScrollPageModel();
            $(elem).addClass("tinyts-paged");
            item.target = $(elem);
            me.mData.push(item);
        });
        this.InitPage();
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
    };
    ScrollPageView.prototype.LastPage = function () {
        if (!this.onScroll) {
            if (this.curPage == 0) {
                return;
            }
            this.ToPage(--this.curPage);
        }
    };
    ScrollPageView.prototype.NextPage = function () {
        if (!this.onScroll) {
            if (this.curPage == this.Count() - 1) {
                return;
            }
            this.ToPage(++this.curPage);
        }
    };
    ScrollPageView.prototype.ToPage = function (index) {
        var me = this;
        if (index < 0 || index > this.Count() - 1) {
            return;
        }
        var h = parseInt(this.GetItem(index).target.css("top"));
        me.onScroll = true;
        $("body,html").animate({ scrollTop: h }, 1000, function () {
            me.onScroll = false;
        });
        // this.GetItem(index).target.slideToggle(1000, () => { });
    };
    return ScrollPageView;
})(ListView);
//# sourceMappingURL=scrollPageView.js.map