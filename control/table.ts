import { ListView } from './list';

export class Table<T> extends ListView<T>{

    protected append(viewString: string, elemIndex?: number) {
        if (this.multipart) {
            if (elemIndex == null) {
                elemIndex = 0;
            }
            this.target.eq(elemIndex).find("tbody").append(viewString);
        } else {
            this.target.find("tbody").append(viewString);
        }
    }
}