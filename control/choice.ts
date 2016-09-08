import { ListView } from './list';
import { InputView } from './input';

export abstract class ChoiceView<T> extends ListView<T> implements InputView {

    abstract Value();

    abstract SetValue(v: string);

    abstract Clear();
}