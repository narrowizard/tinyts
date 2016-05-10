export class RadioModel implements IModel{
	value: any;
	text: string;
	Id:number;

	constructor(value: any, text: string) {
		this.value = value;
		this.text = text;
	}
}