interface IViewModel {
	/**
	 * RegisterEvents 在此事件中注册viewmodel属性的事件
	 * 此函数会在注入完成后被调用
	 */
	RegisterEvents();

	/**
	 * OnLoad 在此函数中完成ViewModel最后的初始化
	 * 此函数会在RegisterEvents之后被调用
	 */
	OnLoad();

	/**
	 * OnValidateError 验证失败回调
	 * @param msg 错误信息
	 */
	OnValidateError(msg: string);
}