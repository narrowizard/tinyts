enum ViewState {
    /**
     * UNLOAD 尚未加载(未调用LoadView)
     */
    UNLOAD,
    /**
     * LOADSUCC 加载成功,这时候可以通过View.IsMultiparted获取该视图是否绑定多个元素
     */
    LOADSUCC,
    /**
     * LOADFAIL 调用了LoadView,但是加载失败了
     */
    LOADFAIL
}

enum BindType {
    /**
     * OVONIC 双向绑定
     */
    OVONIC,
    MODELTOVIEW,
    VIEWTOMODEL
}

/**
 * View 视图类,管理一个Html Element
 */
interface View {

    /**
     * LoadView 建立对象与Html Element之间的关联关系
     * @param selector 选择器或本元素
     * @param parent 父元素
     * @return TRUE if build succ, False otherwise.
     */
    LoadView(selector: string | JQuery, parent?: JQuery): boolean;

    BeforeInject();
    /**
     * Inject 注入内部元素
     */
    Inject();

    AfterInject();
}

/**
 * ViewG 提供上下文关联的[[View]]
 */
interface ViewG<T> extends View {
    /**
     * SetContext 设置上下文,设置上下文后可以通过this.context来引用
     * @param context 上下文
     */
    SetContext(context: T);
}

/**
 * ViewV 支持内部设置html的[[ViewG]]
 */
interface ViewV<T> extends ViewG<T> {

    /**
     * GetViewString 设置ViewV的html内容
     * 如果没有为该类设置@f decorator,请务必重写此方法来设置ViewV的html
     */
    GetViewString(): string;

    /**
     * SetTemplateView 调用此方法将ViewV的html设置到页面上去
     */
    SetTemplateView(): Promise<void>;
}