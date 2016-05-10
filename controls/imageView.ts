import {View} from "../core/View";

class ImageView extends View {

    SetUrl(url: string) {
        this.target.attr("src", url);
    }

    SetSize(height: number, width: number) {
        if (height > 0) {
            this.target.css("height", height);
        }
        if (width > 0) {
            this.target.css("width", width);
        }
    }
}