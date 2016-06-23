export class RadioModel implements IModel {
	value: any;
	text: string;
	Id: number;

	constructor(value: any, text: string) {
		this.value = value;
		this.text = text;
	}
}

export class SelectButtonModel implements IModel {
	Id: number;
	value: any;
	text: string;
	status: boolean;
}