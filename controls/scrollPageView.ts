/**
 * 鼠标滚动事件,需要JQuery MouseWheel的支持
 */
class ScrollPageView extends ListView<ScrollPageModel>{
    curPage: number;
    onScroll: boolean;
    container: string;
    mousewheel: boolean;
    navigation: string;
    navScrolled: boolean;
    nav: JQuery;

    LoadView() {
        var me = this;
        super.LoadView();
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
        pages.each((index, elem) => {
            var item = new ScrollPageModel();
            $(elem).addClass("tinyts-paged");
            item.target = $(elem);
            me.mData.push(item);

            if (this.navigation) {
                var text = $(elem).attr("data-nav");
                if (text == null) {
                    text = "选项";
                }
                var html = "<li data-index=" + index + " >" + text + "</li>";
                this.nav.append(html);
            }
        });
        //注册导航事件
        if (this.navigation) {
            $("#" + this.navigation + " li").click((obj: JQueryEventObject) => {
                var index = +$(obj.target).attr("data-index");
                me.ToPage(index);
            });
            //添加关闭按钮
            
        }
        $(window).resize(() => {
            me.InitPage();
        });
        this.InitPage();
    }

    //添加自定义功能键
    CreateNavItem(text: string, callback: (obj: JQueryEventObject) => void) {
        if (this.navigation) {
            var html = "";
            html += "<li>" + text + "</li>";
            this.nav.append(html);
            this.nav.children("li").last().click(callback);
        }
    }

    SetContainer(container: string) {
        this.container = container;
    }

    InitPage() {
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
            this.target.bind("mousewheel", (event, delta, deltaX, deltaY) => {
                if (deltaY > 0) {
                    me.LastPage();
                } else {
                    me.NextPage();
                }
                return false;
            });
            me.onScroll = false;
        }
    }

    LastPage() {
        if (!this.onScroll) {
            if (this.curPage == 0) {
                return;
            }
            this.ToPage(this.curPage - 1);
        }
    }

    NextPage() {
        if (!this.onScroll) {
            if (this.curPage == this.Count() - 1) {
                return;
            }
            this.ToPage(this.curPage + 1);
        }
    }

    ToPage(index: number) {
        var me = this;
        if (index < 0 || index > this.Count() - 1) {
            return;
        }
        var h = parseInt(this.GetItem(index).target.css("top"));
        var selector = this.container == null ? "body,html" : this.container;
        //滑动
        if (me.navScrolled) {
            me.onScroll = true;
            $(selector).animate({ scrollTop: h }, 1000, () => {
                me.onScroll = false;
            });
        } else {
            $(selector).scrollTop(h);
        }
        this.curPage = index;
        // this.GetItem(index).target.slideToggle(1000, () => { });
    }
}