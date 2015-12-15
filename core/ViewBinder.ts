class ViewBinder {

	private static getInjectionPoints<T>(Class: { __inject__?: {[prop: string]: View}}): Array<InjectionPoint> {
		var result: Array<InjectionPoint> = [];

		if (Class.__inject__) {
			result = Object.keys(Class.__inject__)
				.map((propertyName: string) => {
					return {
						propertyName: propertyName,
						instance: Class.__inject__[propertyName]
					}
				});
		}

		return result;
	}

	static instantiate<T extends IViewModel>(Class: { new (...args: any[]): T }): T {
		const instance: T = new Class();

		for (let injectionPoint of this.getInjectionPoints(Class)) {
			injectionPoint.instance.LoadView();
			instance[injectionPoint.propertyName] = injectionPoint.instance;
		}
		
		instance.RegisterEvents();
		return instance;
	}
}

interface InjectionPoint {
	propertyName: string;
	instance: View;
}