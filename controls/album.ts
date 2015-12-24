class Album extends ListView<AlbumModel>{

    prefix: string;

    registerEvents: () => void;

    SetPrefix(p: string) {
        this.prefix = p;
    }

    GetView(index: number): string {
        if (index < 0 || index > this.mData.length) {
            return "";
        }
        var html = "";
        html += "<div class='album-item'>";
        html += "<span data-index=" + index + ">×</span>";
        html += "<img src='" + this.prefix + this.mData[index].url + "' />";
        html += "</div>";
        return html;
    }

    RefreshView() {
        super.RefreshView();
        if (this.registerEvents) {
            this.registerEvents();
        }
    }

}