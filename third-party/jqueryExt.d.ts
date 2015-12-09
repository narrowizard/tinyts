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

interface JQuery {
	colorpicker(config?: colorpickerConfig): JQuery;
	draggable(config?: draggableConfig): JQuery;
	sortable(config?: sortableConfig);
}

interface JQueryEventObject {
	color: Color;
}

interface Color {
	toHex(): string;
}