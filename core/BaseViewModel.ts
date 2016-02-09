/**
 * ViewModel的基类,该类实现了依赖注入
 */
abstract class BaseViewModel implements IViewModel {

    constructor() {
        inject(this.constructor, this);
    }

    abstract RegisterEvents();
}