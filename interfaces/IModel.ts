interface IModel {
	/**
	 * Id 唯一标志
	 */
	Id: any;
	/**
	 * OnValidateError 验证错误回调,model验证失败后被调用
	 */
	OnValidateError?: (msg: string) => void;
}