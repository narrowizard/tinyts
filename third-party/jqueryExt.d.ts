interface colorpickerConfig {
	format: string;
}

interface draggableConfig {
	containment: string;
	start: () => void;
}

interface sortableConfig {
	containerSelector: string,
	itemPath: string,
	itemSelector: string,
	placeholder: string,
	afterMove?: () => void,
	stop: () => void
}

interface zTreeConfig {
	data?: {
		simpleData: {
			enable: boolean,
			idKey: string,
			pIdKey: string
		},
		key: {
			checked: string,
			children?: string,
			name: string,
		}
	}
}

interface zTreeObj {
	getCheckedNodes(checked: boolean): any[];
}

interface JQuery {
	colorpicker(config?: colorpickerConfig): JQuery;
	draggable(config?: draggableConfig): JQuery;
	sortable(config?: sortableConfig);
	treetable(config?: any, force?: boolean);
	treetable(func: string);

}

interface JQueryStatic {
	zTree(obj: JQuery, config: any, data: any): zTreeObj;
}

interface JQueryEventObject {
	color: Color;
}

interface Color {
	toHex(): string;
}