import {TextView} from '../core/TextView';

class FileUploader extends TextView {

    GetFile(): any {
        var files = this.target.prop("files");
        if (files.length != 0) {
            return files[0];
        }
        return null;
    }

    OnChange(handler: () => void) {
        this.target.change(handler);
    }
}