import { View } from './view';

export class ListView<T> extends View {

    protected mData: T[];

    SetData(data: T[]) {
        this.mData = data;
    }
}