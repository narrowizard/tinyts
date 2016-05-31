interface UE {
	ready(handler: () => void);
	execCommand(command: string, ...param: any[]);
	getContent(): string;
	setContent(html: string);
}

interface UESTATIC {
	getEditor(id: string, config?: any): UE;
}

declare var UE: UESTATIC;