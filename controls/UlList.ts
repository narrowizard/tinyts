import {ListView} from '../core/ListView';

export class UlList<T extends IModel> extends ListView<T> {
    GetChildren(): JQuery {
        return this.target.find("li");
    }
}
