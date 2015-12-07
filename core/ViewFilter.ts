
//根据Control的属性名称和类型
//自动初始化,绑定页面上的id
//并注入到ViewModel中
function view<T>(Class: { new (...args: any[]): T }) {
	return function inject(target: Object, decoratedPropertyName: string): void {
		const targetType: { __inject__?: Object } = target.constructor;
		
		if(!targetType.hasOwnProperty('__inject__')){
			targetType.__inject__ = {};
		}
		
		targetType.__inject__[decoratedPropertyName] = new Class(decoratedPropertyName);
	}
}
