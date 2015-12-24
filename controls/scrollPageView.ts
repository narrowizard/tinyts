/**
 * 需要JQuery MouseWheel的支持
 */
class ScrollPageView extends ListView<ScrollPageModel>{
    curPage: number;

    LoadView() {
        var me = this;
        super.LoadView();
        var pages = this.target.children("div[data-paged=true]");
        pages.each((index, elem) => {
            var item = new ScrollPageModel();
            $(elem).addClass("tinyts-paged");
            item.target = $(elem);
            me.mData.push(item);
        });
        this.InitPage();
    }

    InitPage() {
        var me = this;
        var h = $(window).height();
        for (var i = 0; i < this.Count(); i++) {
            this.mData[i].target.css("top", h * i);
            this.mData[i].target.css("height", h);
        }
        $(window).resize(() => {
            me.InitPage();
        });
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
    }

    LastPage() {
        if (this.curPage == 0) {
            return;
        }
        this.ToPage(--this.curPage);
    }

    NextPage() {
        if (this.curPage == this.Count() - 1) {
            return;
        }
        this.ToPage(++this.curPage);
    }

    ToPage(index: number) {
        if (index < 0 || index > this.Count() - 1) {
            return;
        }
        var h = parseInt(this.GetItem(index).target.css("top"));
        $("body,html").animate({ scrollTop: h }, 1000);
        // this.GetItem(index).target.slideToggle(1000, () => { });
    }


}