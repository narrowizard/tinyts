export class RadioModel implements IModel {
	Value: any;
	Text: string;
	Id: number;

	constructor(value: any, text: string) {
		this.Value = value;
		this.Text = text;
	}
}

export class SelectButtonModel implements IModel {
	Id: number;
	Text: string;
	Status: boolean;
}