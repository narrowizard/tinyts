interface UE {
	ready(handler: () => void);
	execCommand(command: string, ...param: any[]);
	getContent(): string;
	setContent(html: string);
	destroy: () => void;
}

interface UESTATIC {
	getEditor(id: string, config?: any): UE;
	delEditor: (id: string) => void;
}

declare var UE: UESTATIC;