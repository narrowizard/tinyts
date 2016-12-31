import { View } from './view';

export class VirtualView extends View {

    LoadView(parent?: string | JQuery): boolean {
        return super.LoadView();
    }
}